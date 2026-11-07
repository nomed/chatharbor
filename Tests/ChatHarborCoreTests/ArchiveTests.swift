import XCTest
@testable import ChatHarborCore

final class ArchiveTests: XCTestCase {
    func fixture() throws -> ConversationArchive {
        let registry = RecoveryRegistry(groups: [RecoveryGroup(
            name: "Synthetic group", role: "member",
            contacts: [.init(displayName: "Synthetic admin", independentChannel: "admin@example.invalid")],
            manualRecoverySteps: ["Contact admin independently and request a permitted invitation."]
        )])
        return try ConversationArchive(files: ["chat.txt": Data("[01/11/26, 10:00] Alice: Hello 🌊\nsecond line".utf8),
                                                "attachment.bin": Data([0, 1, 2, 255])], registry: registry)
    }
    func testManifestPreservesBytesAndRegistry() throws {
        let archive = try fixture()
        let decoded = try ConversationArchive.decode(archive.encoded())
        XCTAssertEqual(decoded.files, archive.files)
        XCTAssertEqual(decoded.registry, archive.registry)
        XCTAssertFalse(decoded.warnings.isEmpty)
        XCTAssertEqual(ConversationArchive.digest(Data("abc".utf8)),
                       "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad")
    }
    func testUnsafePathsAndBounds() throws {
        for name in ["../chat.txt", "/chat.txt", "a\\b", "..", "", "a\u{0000}b"] {
            XCTAssertThrowsError(try ConversationArchive(files: [name: Data()]))
        }
        XCTAssertThrowsError(try ConversationArchive(files: [:]))
        XCTAssertThrowsError(try ConversationArchive(files: ["large": Data(count: ConversationArchive.maximumBytes + 1)]))
    }
    func testTamperedManifestAndUnsupportedVersion() throws {
        let bytes = try fixture().encoded()
        var json = try XCTUnwrap(JSONSerialization.jsonObject(with: bytes) as? [String: Any])
        json["formatVersion"] = 2
        XCTAssertThrowsError(try ConversationArchive.decode(JSONSerialization.data(withJSONObject: json)))
        json["formatVersion"] = 1
        var records = try XCTUnwrap(json["manifest"] as? [[String: Any]])
        records[0]["sha256"] = String(repeating: "0", count: 64); json["manifest"] = records
        XCTAssertThrowsError(try ConversationArchive.decode(JSONSerialization.data(withJSONObject: json)))
        json["manifest"] = [records[0], records[0]]
        XCTAssertThrowsError(try ConversationArchive.decode(JSONSerialization.data(withJSONObject: json)))
    }
    func testVaultRoundTripWrongKeyAndTampering() throws {
        let key = Vault.generateRecoveryKey()
        let archive = try fixture()
        let encrypted = try Vault.seal(archive, recoveryKey: key)
        let another = try Vault.seal(archive, recoveryKey: key)
        XCTAssertNotEqual(encrypted, another) // fresh nonce
        XCTAssertEqual(try Vault.open(encrypted, recoveryKey: key).files, archive.files)
        XCTAssertThrowsError(try Vault.open(encrypted, recoveryKey: Vault.generateRecoveryKey()))
        XCTAssertThrowsError(try Vault.open(encrypted, recoveryKey: "short"))
        var json = try XCTUnwrap(JSONSerialization.jsonObject(with: encrypted) as? [String: Any])
        var sealed = try XCTUnwrap(Data(base64Encoded: try XCTUnwrap(json["sealed"] as? String)))
        sealed[sealed.count - 1] ^= 1; json["sealed"] = sealed.base64EncodedString()
        XCTAssertThrowsError(try Vault.open(JSONSerialization.data(withJSONObject: json), recoveryKey: key))
    }
    /// Produces only synthetic artifacts for the independent Python decrypt/verify job.
    func testIndependentRestoreFixture() throws {
        guard let destination = ProcessInfo.processInfo.environment["CHATHARBOR_DRILL_OUTPUT"] else { return }
        let directory = URL(fileURLWithPath: destination)
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        let key = Vault.generateRecoveryKey()
        try Vault.seal(fixture(), recoveryKey: key).write(to: directory.appendingPathComponent("synthetic.vault"))
        try Data(key.utf8).write(to: directory.appendingPathComponent("synthetic.recovery-key"))
    }
}
