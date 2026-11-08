# Proposed acquisition/parser adapter protocol v1

Status: design only; blocked for implementation/bundling by #20, work #21. No Python or device-tool executable is invoked by the current app.

The trusted Rust host starts an allowlisted, packaged executable without a shell. Use private local pipes for a versioned newline-delimited JSON control stream, explicit maximum record size (64 KiB), request IDs and protocol-version negotiation. Operations are discover-devices, acquire-snapshot, parse-snapshot, cancel and capabilities. Backend capabilities must reflect actual device support, not the UI platform.

Large backup/archive bytes go to an operation-scoped private staging directory controlled by the host, never base64 through IPC. The host grants only the directory for that operation, rejects symlink escapes and publishes results atomically after verification. Existing device backups are read-only and never used as output. Automatic cleanup targets only owned temporary work, not the source backup.

Events: started, progress (phase + current + total when known), warning (stable code), failed (stable code, retryability) and completed (relative manifest reference + original byte/file counts + completeness unknown). Do not fabricate percentages when total is unknown. Cancellation must leave explicit incomplete state; never report success merely because the child exited zero.

Passwords, pairing records and keys must not appear in command arguments, normal control messages, stdout/stderr, environment dumps or logs. A reviewed dedicated private credential channel is required before encrypted acquisition is enabled; no secret transport is implemented yet. GUI prompts are initiated by the host with the device/profile context visible to the user. Credentials are never requested through web UI served from an arbitrary origin.

Fail closed on unknown major version, malformed/oversized messages, duplicate terminal events, unexpected paths, child crash, timeout, disconnect or unsupported encryption. Sanitized diagnostics contain operation phase/error code/tool version; no chat text, contacts, file names, backup paths or invitation URLs. The future adapter is tested using a synthetic child process with failure injection before actual phone testing.
