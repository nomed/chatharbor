export const MAX_INPUT = 8 * 1024 * 1024;
export const MAX_ORIGINALS = 5 * 1024 * 1024;
export interface FileRecord { path: string; byteCount: number; sha256: string }
export interface RecoveryGroup {
  id: string; name: string; community?: string | null; role: string;
  contacts: { displayName: string; independentChannel: string }[];
  invitationURL?: string | null; invitationExpiresAt?: string | null;
  lastVerifiedAt?: string | null; manualRecoverySteps: string[];
}
export interface Archive {
  formatVersion: number; files: Record<string, string>; manifest: FileRecord[];
  warnings: string[]; registry: { formatVersion: number; groups: RecoveryGroup[] };
}
export interface VerifiedArchive { archive: Archive; originals: Map<string, Uint8Array> }
const object = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value);
const string = (value: unknown): value is string => typeof value === 'string' && value.length <= 16000;
const optionalString = (value: unknown) => value === undefined || value === null || string(value);
const strings = (value: unknown, max: number): value is string[] => Array.isArray(value) && value.length <= max && value.every(string);
export function safeName(path: string): boolean {
  return path.length > 0 && new TextEncoder().encode(path).length <= 180 && !['.', '..'].includes(path) && !/[\\/\x00-\x1f\x7f]/.test(path);
}
function validate(value: unknown): asserts value is Archive {
  if (!object(value) || value.formatVersion !== 1 || !object(value.files) || !Array.isArray(value.manifest)
    || !strings(value.warnings, 100) || !object(value.registry) || value.registry.formatVersion !== 1
    || !Array.isArray(value.registry.groups) || value.registry.groups.length > 1000) throw new Error('Formato archivio non supportato. Seleziona un archivio JSON v1, non un backup iPhone o un Vault cifrato.');
  const names = Object.keys(value.files);
  if (names.length === 0 || names.length > 256 || value.manifest.length !== names.length) throw new Error('Manifest incompleto.');
  const seen = new Set<string>();
  for (const entry of value.manifest) {
    if (!object(entry) || !string(entry.path) || !safeName(entry.path) || seen.has(entry.path)
      || !Object.hasOwn(value.files, entry.path) || typeof value.files[entry.path] !== 'string'
      || !Number.isSafeInteger(entry.byteCount) || Number(entry.byteCount) < 0
      || typeof entry.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(entry.sha256)) throw new Error('Manifest non valido o nome file non sicuro.');
    seen.add(entry.path);
  }
  const ids = new Set<string>();
  for (const group of value.registry.groups) {
    if (!object(group) || !string(group.id) || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(group.id)
      || ids.has(group.id.toLowerCase()) || !string(group.name) || !group.name || !string(group.role)
      || !optionalString(group.community) || !optionalString(group.invitationURL) || !optionalString(group.invitationExpiresAt)
      || !optionalString(group.lastVerifiedAt) || !strings(group.manualRecoverySteps, 100)
      || !Array.isArray(group.contacts) || group.contacts.length > 100
      || !group.contacts.every(c => object(c) && string(c.displayName) && string(c.independentChannel))) throw new Error('Registro di recupero non valido.');
    ids.add(group.id.toLowerCase());
  }
}
export async function verifyArchive(text: string): Promise<VerifiedArchive> {
  if (new TextEncoder().encode(text).length > MAX_INPUT) throw new Error('Archivio troppo grande: limite preview 8 MiB.');
  let value: unknown;
  try { value = JSON.parse(text); } catch { throw new Error('Il file non contiene JSON valido.'); }
  validate(value);
  const originals = new Map<string, Uint8Array>();
  let total = 0;
  for (const entry of value.manifest) {
    const encoded = value.files[entry.path];
    let decoded: string;
    try {
      decoded = atob(encoded);
      if (btoa(decoded) !== encoded) throw new Error();
    } catch { throw new Error('Contenuto base64 non valido.'); }
    const bytes = Uint8Array.from(decoded, c => c.charCodeAt(0));
    total += bytes.length;
    if (total > MAX_ORIGINALS) throw new Error('Originali troppo grandi: limite preview 5 MiB.');
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    const digest = Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join('');
    if (bytes.length !== entry.byteCount || digest !== entry.sha256) throw new Error('Verifica integrità fallita. L’archivio precedente resta aperto.');
    originals.set(entry.path, bytes);
  }
  return { archive: value, originals };
}
export function originalText(bytes: Uint8Array): string | null {
  try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); } catch { return null; }
}
export function recoveryNeedsReview(group: RecoveryGroup, now = new Date()): boolean {
  const verified = group.lastVerifiedAt ? Date.parse(group.lastVerifiedAt) : NaN;
  const expiry = group.invitationExpiresAt ? Date.parse(group.invitationExpiresAt) : NaN;
  return !Number.isFinite(verified) || verified > now.getTime() || now.getTime() - verified > 90 * 86400000
    || group.contacts.length === 0 || group.contacts.every(c => !c.independentChannel.trim())
    || !!group.invitationURL && (!Number.isFinite(expiry) || expiry <= now.getTime());
}
