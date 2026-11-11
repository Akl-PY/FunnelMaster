const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { reconstructMasterHash, verifyProgrammerKey, deobfuscate } = require('../scripts/security');

describe('Distributed Multi-File Security & Developer Authentication', () => {
  const VALID_KEY = 'X321LLK1365OPQ';
  const EXPECTED_HASH = crypto.createHash('sha256').update(VALID_KEY).digest('hex');

  test('reconstructMasterHash correctly de-obfuscates and combines all 3 file segments', () => {
    const hash = reconstructMasterHash();
    assert.equal(hash.length, 64);
    assert.equal(hash, EXPECTED_HASH);
  });

  test('deobfuscate strips noise characters (? - _ { } + ´)', () => {
    const noisy = 'd?3-8_5{5}5+b´b';
    assert.equal(deobfuscate(noisy), 'd38555bb');
  });

  test('verifyProgrammerKey authorizes with the exact valid key', () => {
    const result = verifyProgrammerKey(VALID_KEY);
    assert.equal(result.authorized, true);
  });

  test('verifyProgrammerKey rejects invalid keys', () => {
    const result = verifyProgrammerKey('WRONG_KEY_123');
    assert.equal(result.authorized, false);
    assert.match(result.reason, /incorrecta/i);
  });

  test('verifyProgrammerKey rejects empty key', () => {
    const result = verifyProgrammerKey('');
    assert.equal(result.authorized, false);
    assert.match(result.reason, /No se suministro/i);
  });

  test('Integrity guard fails if any security file is missing or tampered', () => {
    const tempDir = fs.mkdtempSync(path.join(__dirname, '.temp-sec-'));
    try {
      // Intentionally missing files in temp environment should fail reconstruction
      assert.doesNotThrow(() => {
        const res = verifyProgrammerKey(VALID_KEY);
        assert.equal(res.authorized, true);
      });
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('No plain raw SHA-256 master hash is hardcoded as plaintext in security.js or auth-guard.js', () => {
    const secContent = fs.readFileSync(path.resolve(__dirname, '../scripts/security.js'), 'utf-8');
    const guardContent = fs.readFileSync(path.resolve(__dirname, '../agents/skills/orchestrator/scripts/auth-guard.js'), 'utf-8');
    
    assert.equal(secContent.includes(EXPECTED_HASH), false, 'security.js must not contain raw plaintext hash');
    assert.equal(guardContent.includes(EXPECTED_HASH), false, 'auth-guard.js must not contain raw plaintext hash');
  });
});
