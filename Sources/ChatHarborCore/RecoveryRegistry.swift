import Foundation

public struct RecoveryContact: Codable, Equatable, Sendable {
    public let displayName: String
    /// User-curated channel, e.g. email. Never require WhatsApp for recovery.
    public let independentChannel: String
    public init(displayName: String, independentChannel: String) {
        self.displayName = displayName
        self.independentChannel = independentChannel
    }
}

public struct RecoveryGroup: Codable, Equatable, Identifiable, Sendable {
    public let id: UUID
    public let name: String
    public let community: String?
    public let role: String
    public let contacts: [RecoveryContact]
    public let invitationURL: String?
    public let invitationExpiresAt: String?
    public let lastVerifiedAt: String?
    public let manualRecoverySteps: [String]
    public init(id: UUID = UUID(), name: String, community: String? = nil, role: String,
                contacts: [RecoveryContact], invitationURL: String? = nil,
                invitationExpiresAt: String? = nil, lastVerifiedAt: String? = nil,
                manualRecoverySteps: [String]) {
        self.id = id; self.name = name; self.community = community; self.role = role
        self.contacts = contacts; self.invitationURL = invitationURL
        self.invitationExpiresAt = invitationExpiresAt; self.lastVerifiedAt = lastVerifiedAt
        self.manualRecoverySteps = manualRecoverySteps
    }
    /// Unknown dates, absent contacts and expired invitations require manual review.
    public var needsManualReview: Bool { lastVerifiedAt == nil || contacts.isEmpty || invitationURL != nil }
}

public struct RecoveryRegistry: Codable, Equatable, Sendable {
    public let formatVersion: Int
    public var groups: [RecoveryGroup]
    public init(groups: [RecoveryGroup] = []) { self.formatVersion = 1; self.groups = groups }
    public func verify() throws {
        guard formatVersion == 1, groups.count <= 1000,
              Set(groups.map(\.id)).count == groups.count else { throw ArchiveError.invalidArchive }
        for group in groups {
            guard !group.name.isEmpty, group.name.utf8.count <= 1000,
                  group.contacts.count <= 100, group.manualRecoverySteps.count <= 100 else {
                throw ArchiveError.invalidArchive
            }
        }
    }
}
