import { describe, expect, it } from 'vitest';
import fixture from '../public/fixtures/synthetic-archive.json';
import { MAX_INPUT, MAX_ORIGINALS, originalText, recoveryNeedsReview, safeName, verifyArchive, type RecoveryGroup } from './archive';
const mutate = (edit: (v: typeof fixture) => void) => { const value = structuredClone(fixture); edit(value); return JSON.stringify(value); };
describe('archive verification', () => {
  it('preserves and verifies the shared v1 originals', async () => {
    const result = await verifyArchive(JSON.stringify(fixture));
    expect(result.originals.size).toBe(3);
    expect(originalText(result.originals.get('Porto - gruppo sintetico.txt')!)).toContain('faro');
  });
  it('rejects mismatched digests, counts and duplicate manifest entries', async () => {
    for (const raw of [mutate(v => v.manifest[0].sha256 = '0'.repeat(64)), mutate(v => v.manifest[0].byteCount++),
      mutate(v => v.manifest[1] = v.manifest[0])]) await expect(verifyArchive(raw)).rejects.toThrow();
  });
  it('rejects unknown versions, invalid registry and unexpected files', async () => {
    for (const raw of [mutate(v => v.formatVersion = 2), mutate(v => v.registry.groups[0].id = 'bad'),
      mutate(v => Object.assign(v.files, { 'extra.txt': 'YQ==' }))]) await expect(verifyArchive(raw)).rejects.toThrow();
  });
  it('rejects malformed input and oversized payloads before presentation', async () => {
    await expect(verifyArchive('not JSON')).rejects.toThrow();
    await expect(verifyArchive(' '.repeat(MAX_INPUT + 1))).rejects.toThrow('8 MiB');
    const encoded = btoa('a'.repeat(MAX_ORIGINALS + 1));
    const value = { formatVersion: 1, files: { 'large.txt': encoded }, manifest: [{path: 'large.txt', byteCount: MAX_ORIGINALS + 1, sha256: '0'.repeat(64)}], warnings: [], registry: {formatVersion: 1, groups: []} };
    await expect(verifyArchive(JSON.stringify(value))).rejects.toThrow('5 MiB');
  });
  it('rejects invalid and noncanonical base64', async () => {
    await expect(verifyArchive(mutate(v => v.files['nota-sintetica.txt'] = '*bad*'))).rejects.toThrow('base64');
  });
  it('rejects unsafe flat filenames and invalid UTF-8 previews', () => {
    for (const name of ['../escape', 'a/b', 'a\\b', '', '.', '..', 'a\0b']) expect(safeName(name)).toBe(false);
    expect(originalText(new Uint8Array([255]))).toBeNull();
  });
  it('requires manual review for missing, stale or unusable recovery contacts', () => {
    const group = fixture.registry.groups[0] as RecoveryGroup;
    const now = new Date('2026-11-08T00:00:00Z');
    expect(recoveryNeedsReview(group, now)).toBe(false);
    expect(recoveryNeedsReview({...group, lastVerifiedAt: 'bad'}, now)).toBe(true);
    expect(recoveryNeedsReview({...group, lastVerifiedAt: '2020-01-01'}, now)).toBe(true);
    expect(recoveryNeedsReview({...group, contacts: []}, now)).toBe(true);
    expect(recoveryNeedsReview({...group, invitationURL: 'https://example.invalid/invite'}, now)).toBe(true);
  });
});
