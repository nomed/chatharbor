import Foundation
import CryptoKit

public enum ArchiveError: Error { case invalidArchive, unsafePath, tooLarge, invalidKey }

public struct FileRecord: Codable, Equatable, Sendable {
    public let path: String
    public let byteCount: Int
    public let sha256: String
}

/// Source exports are opaque original bytes. Parsing never establishes history completeness.
public struct ConversationArchive: Codable, Sendable {
    public let formatVersion: Int
    public let files: [String: Data]
    public let manifest: [FileRecord]
    public let warnings: [String]
    public let registry: RecoveryRegistry
    public static let maximumBytes = 32 * 1024 * 1024
    public static let maximumEncodedBytes = 48 * 1024 * 1024

    public init(files: [String: Data], registry: RecoveryRegistry = .init()) throws {
        guard !files.isEmpty, files.count <= 256 else { throw ArchiveError.invalidArchive }
        var total = 0
        for (path, bytes) in files {
            try Self.validatePath(path)
            guard bytes.count <= Self.maximumBytes - total else { throw ArchiveError.tooLarge }
            total += bytes.count
        }
        self.formatVersion = 1
        self.files = files
        self.manifest = files.keys.sorted().map {
            FileRecord(path: $0, byteCount: files[$0]!.count, sha256: Self.digest(files[$0]!))
        }
        self.warnings = [
            "History completeness is unknown. Only user-supplied bytes are preserved.",
            "ZIP exports remain opaque: media extraction and transcript parsing are not implemented."
        ]
        self.registry = registry
        try verify()
    }

    public func verify() throws {
        guard formatVersion == 1, !files.isEmpty, files.count <= 256,
              manifest.count == files.count,
              Set(manifest.map(\.path)).count == manifest.count,
              Set(manifest.map(\.path)) == Set(files.keys) else { throw ArchiveError.invalidArchive }
        var total = 0
        for entry in manifest {
            try Self.validatePath(entry.path)
            guard let bytes = files[entry.path], bytes.count <= Self.maximumBytes - total,
                  bytes.count == entry.byteCount, Self.digest(bytes) == entry.sha256 else {
                throw ArchiveError.invalidArchive
            }
            total += bytes.count
        }
        try registry.verify()
    }

    public func encoded() throws -> Data {
        try verify()
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys]
        let result = try encoder.encode(self)
        guard result.count <= Self.maximumEncodedBytes else { throw ArchiveError.tooLarge }
        return result
    }

    public static func decode(_ data: Data) throws -> Self {
        guard data.count <= maximumEncodedBytes else { throw ArchiveError.tooLarge }
        let archive = try JSONDecoder().decode(Self.self, from: data)
        try archive.verify()
        return archive
    }

    public static func validatePath(_ path: String) throws {
        // Deliberately flat namespace in v1. Never extract user ZIP entries here.
        guard !path.isEmpty, path.utf8.count <= 180,
              path != ".", path != "..", !path.contains("/"), !path.contains("\\"),
              !path.unicodeScalars.contains(where: { $0.value < 32 || $0.value == 127 }) else {
            throw ArchiveError.unsafePath
        }
    }

    public static func digest(_ data: Data) -> String {
        SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined()
    }
}
