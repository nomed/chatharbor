import SwiftUI
import UniformTypeIdentifiers
import ChatHarborCore

struct VaultDocument: FileDocument {
    static var readableContentTypes: [UTType] { [.json] }
    var bytes: Data
    init(bytes: Data) { self.bytes = bytes }
    init(configuration: ReadConfiguration) throws {
        guard let data = configuration.file.regularFileContents else { throw ArchiveError.invalidArchive }
        bytes = data
    }
    func fileWrapper(configuration: WriteConfiguration) throws -> FileWrapper {
        FileWrapper(regularFileWithContents: bytes)
    }
}

@main
struct ChatHarborApp: App {
    var body: some Scene { WindowGroup { ArchiveView() } }
}

struct ArchiveView: View {
    @State private var archive: ConversationArchive?
    @State private var importing = false
    @State private var exporting = false
    @State private var document = VaultDocument(bytes: Data())
    @State private var recoveryKey = ""
    @State private var message = "Import a user-created WhatsApp TXT or ZIP export."
    @State private var keySaved = false
    var body: some View {
        NavigationStack {
            Form {
                Section("Archive") {
                    Text(message)
                    Button("Import from Files") { importing = true }
                    Button("Read Share Extension inbox") { readInbox() }
                    if let archive {
                        ForEach(archive.manifest, id: \.path) { file in
                            Text("\(file.path): \(file.byteCount) bytes\nSHA-256 \(file.sha256)")
                                .font(.caption).textSelection(.enabled)
                        }
                        ForEach(archive.warnings, id: \.self) { Text($0).font(.caption) }
                    }
                }
                Section("Encrypted external copy") {
                    Text("Keep the recovery key outside this iPhone, separately from the Vault. Losing it makes recovery impossible. This preview keeps the archive and key in memory only.")
                    if !recoveryKey.isEmpty {
                        Text(recoveryKey).font(.caption.monospaced()).textSelection(.enabled)
                        Toggle("I saved the key independently", isOn: $keySaved)
                        Button("Export encrypted Vault") { prepareExport() }.disabled(!keySaved)
                    } else {
                        Button("Generate recovery key") { recoveryKey = Vault.generateRecoveryKey() }
                            .disabled(archive == nil)
                    }
                    Text("An export is not a verified backup. Run the independent restore tool on another computer.")
                }
                Section("Group recovery") {
                    Text("Group contact editing is not available in this preview. Group recovery will require your own independently verified contacts and manual steps.")
                }
            }
            .navigationTitle("ChatHarbor Preview")
            .fileImporter(isPresented: $importing, allowedContentTypes: [.plainText, .zip]) { result in
                do {
                    let url = try result.get()
                    let access = url.startAccessingSecurityScopedResource()
                    defer { if access { url.stopAccessingSecurityScopedResource() } }
                    try importFile(url)
                } catch { message = "Import failed. No archive committed; check file type and 32 MiB limit." }
            }
            .fileExporter(isPresented: $exporting, document: document, contentType: .json,
                          defaultFilename: "ChatHarbor.vault") { result in
                switch result {
                case .success: message = "Vault exported. Verify it independently before relying on recovery."
                case .failure: message = "External copy was not confirmed. Keep your original export."
                }
            }
            .privacySensitive()
        }
    }
    private func importFile(_ url: URL) throws {
        guard ["txt", "zip"].contains(url.pathExtension.lowercased()) else { throw ArchiveError.invalidArchive }
        let handle = try FileHandle(forReadingFrom: url); defer { try? handle.close() }
        let data = try handle.read(upToCount: ConversationArchive.maximumBytes + 1) ?? Data()
        guard !data.isEmpty else { throw ArchiveError.invalidArchive }
        let candidate = try ConversationArchive(files: [url.lastPathComponent: data])
        archive = candidate; message = "Original bytes verified. History completeness is unknown."
    }
    private func readInbox() {
        guard let container = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.org.chatharbor.shared") else {
            message = "Shared container unavailable. Device signing and App Group setup are required."; return
        }
        do {
            let inbox = container.appendingPathComponent("Inbox", isDirectory: true)
            let files = try FileManager.default.contentsOfDirectory(at: inbox, includingPropertiesForKeys: nil)
                .filter { ["txt", "zip"].contains($0.pathExtension.lowercased()) }.sorted { $0.lastPathComponent < $1.lastPathComponent }
            guard let file = files.first else { message = "No staged export."; return }
            try importFile(file)
            // Preserve staged source until a separately reviewed retention policy is implemented.
        } catch { message = "Shared import failed. Source remains in the inbox." }
    }
    private func prepareExport() {
        guard let archive else { return }
        do {
            document = VaultDocument(bytes: try Vault.seal(archive, recoveryKey: recoveryKey))
            exporting = true
        } catch { message = "Vault generation failed; no external copy created." }
    }
}
