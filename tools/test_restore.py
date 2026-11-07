import base64
import copy
import hashlib
import json
import tempfile
import unittest
from pathlib import Path
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from restore_vault import load

class RestoreTests(unittest.TestCase):
    def test_synthetic_restore_and_rejections(self):
        data = b'Synthetic only\n'
        archive = dict(formatVersion=1, files={'chat.txt': base64.b64encode(data).decode()},
                       manifest=[dict(path='chat.txt', byteCount=len(data), sha256=hashlib.sha256(data).hexdigest())],
                       registry=dict(formatVersion=1, groups=[]), warnings=['Completeness unknown'])
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp); vault=root/'fixture'; keyfile=root/'key'
            key=AESGCM.generate_key(256); keyfile.write_text(key.hex())
            def save(value):
                nonce=b'\x01'*12 # fixed synthetic test nonce; production uses random nonces
                box=nonce+AESGCM(key).encrypt(nonce,json.dumps(value).encode(),b'ChatHarbor.vault.v1')
                vault.write_text(json.dumps(dict(formatVersion=1,cipher='AES-256-GCM',sealed=base64.b64encode(box).decode())))
            save(archive)
            self.assertEqual(load(vault,keyfile)[1]['chat.txt'],data)
            keyfile.write_text(AESGCM.generate_key(256).hex())
            with self.assertRaises(Exception): load(vault,keyfile)
            keyfile.write_text(key.hex())
            for change in ['hash','path','count','version']:
                broken=copy.deepcopy(archive)
                if change=='hash': broken['manifest'][0]['sha256']='0'*64
                if change=='path':
                    broken['files']={'../escape':broken['files']['chat.txt']}; broken['manifest'][0]['path']='../escape'
                if change=='count': broken['manifest'][0]['byteCount']+=1
                if change=='version': broken['formatVersion']=2
                save(broken)
                with self.assertRaises(ValueError): load(vault,keyfile)

if __name__=='__main__': unittest.main()
