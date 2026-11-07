import UIKit
import UniformTypeIdentifiers

@MainActor
final class ShareViewController: UIViewController {
    private var started = false
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        guard !started else { return }; started = true
        let providers = (extensionContext?.inputItems as? [NSExtensionItem] ?? []).flatMap { $0.attachments ?? [] }
        guard providers.count == 1, let provider = providers.first else { fail(); return }
        let types = [UTType.zip.identifier, UTType.plainText.identifier]
        guard let type = types.first(where: { provider.hasItemConformingToTypeIdentifier($0) }) else { fail(); return }
        provider.loadFileRepresentation(forTypeIdentifier: type) { [weak self] source, _ in
            // The provider URL expires after this callback: copy synchronously before returning.
            var success = false
            if let source {
                do {
                    guard let container = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.org.chatharbor.shared") else { throw CocoaError(.fileNoSuchFile) }
                    let handle = try FileHandle(forReadingFrom: source); defer { try? handle.close() }
                    let bytes = try handle.read(upToCount: 32 * 1024 * 1024 + 1) ?? Data()
                    guard !bytes.isEmpty, bytes.count <= 32 * 1024 * 1024 else { throw CocoaError(.fileReadTooLarge) }
                    let inbox = container.appendingPathComponent("Inbox", isDirectory: true)
                    try FileManager.default.createDirectory(at: inbox, withIntermediateDirectories: true)
                    let existing = try FileManager.default.contentsOfDirectory(at: inbox, includingPropertiesForKeys: [.fileSizeKey])
                    let total = try existing.reduce(0) { sum, url in sum + (try url.resourceValues(forKeys: [.fileSizeKey]).fileSize ?? 0) }
                    guard existing.count < 16, total + bytes.count <= 128 * 1024 * 1024 else { throw CocoaError(.fileWriteOutOfSpace) }
                    let suffix = type == UTType.zip.identifier ? "zip" : "txt"
                    let target = inbox.appendingPathComponent(UUID().uuidString).appendingPathExtension(suffix)
                    try bytes.write(to: target, options: [.atomic, .completeFileProtection])
                    var excluded = target
                    var attributes = URLResourceValues(); attributes.isExcludedFromBackup = true
                    try excluded.setResourceValues(attributes)
                    success = true
                } catch { /* Never log source paths or chat content. */ }
            }
            let completed = success
            Task { @MainActor [weak self] in
                if completed {
                    self?.extensionContext?.completeRequest(returningItems: nil)
                } else { self?.fail() }
            }
        }
    }
    private func fail() {
        extensionContext?.cancelRequest(withError: NSError(domain: "ChatHarborImport", code: 1,
            userInfo: [NSLocalizedDescriptionKey: "Import not staged. Share one TXT/ZIP under 32 MiB; verify available storage and App Group setup."]))
    }
}
