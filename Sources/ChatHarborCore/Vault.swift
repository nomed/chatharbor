import Foundation
import CryptoKit

/// Portable v1 envelope: AES-256-GCM, random 96-bit nonce, 128-bit tag.
/// Recovery key is 32 random bytes, separately retained by the user. No password KDF.
public struct Vault: Codable, Sendable {
    public let formatVersion: Int
    public let cipher: String
    public let sealed: Data
    private static let aad = Data("ChatHarbor.vault.v1".utf8)
    public static func generateRecoveryKey() -> String {
        SymmetricKey(size: .bits256).withUnsafeBytes { bytes in
            bytes.map { String(format: "%02x", $0) }.joined()
        }
    }
    private static func key(_ hex: String) throws -> SymmetricKey {
        guard hex.utf8.count == 64, hex.allSatisfy({ $0.isASCII && $0.isHexDigit }) else {
            throw ArchiveError.invalidKey
        }
        var bytes = Data(); var position = hex.startIndex
        while position < hex.endIndex {
            let end = hex.index(position, offsetBy: 2)
            guard let byte = UInt8(hex[position..<end], radix: 16) else { throw ArchiveError.invalidKey }
            bytes.append(byte); position = end
        }
        return SymmetricKey(data: bytes)
    }
    public static func seal(_ archive: ConversationArchive, recoveryKey: String) throws -> Data {
        let box = try AES.GCM.seal(archive.encoded(), using: key(recoveryKey), authenticating: aad)
        guard let combined = box.combined else { throw ArchiveError.invalidArchive }
        let envelope = Self(formatVersion: 1, cipher: "AES-256-GCM", sealed: combined)
        let encoder = JSONEncoder(); encoder.outputFormatting = [.sortedKeys]
        return try encoder.encode(envelope)
    }
    public static func open(_ data: Data, recoveryKey: String) throws -> ConversationArchive {
        guard data.count <= 68 * 1024 * 1024 else { throw ArchiveError.tooLarge }
        let envelope = try JSONDecoder().decode(Self.self, from: data)
        guard envelope.formatVersion == 1, envelope.cipher == "AES-256-GCM" else {
            throw ArchiveError.invalidArchive
        }
        let clear = try AES.GCM.open(AES.GCM.SealedBox(combined: envelope.sealed),
                                     using: key(recoveryKey), authenticating: aad)
        return try ConversationArchive.decode(clear)
    }
}
