#!/usr/bin/env python3
"""Independent v1 restore. Key comes from a file, never a command-line value.
Requires cryptography==46.0.3. Only use trusted local files; output is private.
"""
import argparse
import base64
import hashlib
import json
import os
from pathlib import Path
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

MAX_INPUT = 68 * 1024 * 1024
MAX_PAYLOAD = 48 * 1024 * 1024
MAX_BYTES = 32 * 1024 * 1024

def unique_object(pairs):
    result = {}
    for k, v in pairs:
        if k in result:
            raise ValueError('duplicate JSON key')
        result[k] = v
    return result

def read_bounded(path, limit):
    with path.open('rb') as source:
        data = source.read(limit + 1)
    if len(data) > limit:
        raise ValueError('input limit exceeded')
    return data

def decode64(value):
    return base64.b64decode(value, validate=True)

def load(path, key_path):
    envelope = json.loads(read_bounded(path, MAX_INPUT), object_pairs_hook=unique_object)
    if envelope['formatVersion'] != 1 or envelope['cipher'] != 'AES-256-GCM':
        raise ValueError('unsupported envelope')
    key_text = read_bounded(key_path, 128).decode('ascii').strip()
    if len(key_text) != 64 or any(c not in '0123456789abcdefABCDEF' for c in key_text):
        raise ValueError('invalid recovery key')
    sealed = decode64(envelope['sealed'])
    clear = AESGCM(bytes.fromhex(key_text)).decrypt(sealed[:12], sealed[12:], b'ChatHarbor.vault.v1')
    if len(clear) > MAX_PAYLOAD:
        raise ValueError('payload limit exceeded')
    archive = json.loads(clear, object_pairs_hook=unique_object)
    files = archive['files']; records = archive['manifest']; registry = archive['registry']
    if archive['formatVersion'] != 1 or not 0 < len(files) <= 256 or len(records) != len(files):
        raise ValueError('invalid manifest')
    if registry['formatVersion'] != 1 or len(registry['groups']) > 1000:
        raise ValueError('invalid registry')
    names = [record['path'] for record in records]
    if len(set(names)) != len(names) or set(names) != set(files):
        raise ValueError('manifest file set mismatch')
    result = {}; total = 0
    for record in records:
        name = record['path']
        if (not name or len(name.encode()) > 180 or name in ('.', '..') or '/' in name
                or '\\' in name or any(ord(c) < 32 or ord(c) == 127 for c in name)):
            raise ValueError('unsafe path')
        data = decode64(files[name]); total += len(data)
        if total > MAX_BYTES or len(data) != record['byteCount'] or hashlib.sha256(data).hexdigest() != record['sha256']:
            raise ValueError('integrity failure')
        result[name] = data
    return archive, result

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('vault', type=Path)
    parser.add_argument('--key-file', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    archive, files = load(args.vault, args.key_file)
    # Verify everything before creating output. Never merge into an existing directory.
    os.umask(0o077)
    args.output.mkdir(mode=0o700, parents=False, exist_ok=False)
    originals = args.output / 'originals'; originals.mkdir(mode=0o700)
    for name, data in files.items():
        with (originals / name).open('xb') as target:
            target.write(data)
    for filename, value in [('manifest.json', archive['manifest']), ('registry.json', archive['registry']),
                            ('warnings.json', archive['warnings'])]:
        with (args.output / filename).open('x') as target:
            json.dump(value, target, indent=2)
    print(f"Verified and restored {len(files)} original files; history completeness remains unknown.")

if __name__ == '__main__':
    main()
