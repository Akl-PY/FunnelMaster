const { test, describe, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { evaluateAdVolume, validateNicheCriteria } = require('../agents/skills/niche-discovery/scripts/validator');
const { runNicheDiscovery } = require('../agents/skills/niche-discovery/scripts/discover');

describe('Niche Discovery & Validation Rules', () => {
  const discoveredPath = path.join(__dirname, '..', 'data', 'discovered_niches.json');
  const hadDiscoveredBefore = fs.existsSync(discoveredPath);

  after(() => {
    if (!hadDiscoveredBefore && fs.existsSync(discoveredPath)) {
      fs.unlinkSync(discoveredPath);
    }
  });
  test('runNicheDiscovery must execute step 1 and generate structured dynamic output', () => {
    const res = runNicheDiscovery();
    assert.strictEqual(res.count, 10);
    assert.strictEqual(fs.existsSync(res.outputPath), true);
    assert.strictEqual(res.niches.length, 10);
  });
  test('0 to 2 ads must be rejected', () => {
    const result0 = evaluateAdVolume(0);
    assert.strictEqual(result0.status, 'rejected');
    assert.strictEqual(result0.canScale, false);

    const result2 = evaluateAdVolume(2);
    assert.strictEqual(result2.status, 'rejected');
  });

  test('3 to 10 ads must be testing', () => {
    const result3 = evaluateAdVolume(3);
    assert.strictEqual(result3.status, 'testing');

    const result10 = evaluateAdVolume(10);
    assert.strictEqual(result10.status, 'testing');
  });

  test('10 to 30 ads must be validated', () => {
    const result15 = evaluateAdVolume(15);
    assert.strictEqual(result15.status, 'validated');
    assert.strictEqual(result15.canScale, true);
  });

  test('30 to 100 ads must be scaled', () => {
    const result50 = evaluateAdVolume(50);
    assert.strictEqual(result50.status, 'scaled');
    assert.strictEqual(result50.canScale, true);
  });

  test('+100 ads must be classified as super_winner', () => {
    const result120 = evaluateAdVolume(120);
    assert.strictEqual(result120.status, 'super_winner');
    assert.strictEqual(result120.canScale, true);
    assert.match(result120.action, /\+\$100\.000/);
  });

  test('Niche criteria validation must enforce required fields and accept any dynamic niche without hardcoded restrictions', () => {
    const valid = validateNicheCriteria({
      nicheName: 'Cualquier Nicho Dinámico Descubierto',
      targetAvatar: 'Profesional buscando automatizar',
      corePain: 'Falta de tiempo y ventas inconsistentes'
    });
    assert.strictEqual(valid.valid, true);

    const validAnyIndustry = validateNicheCriteria({
      nicheName: 'Apicultura Urbana de Precisión',
      targetAvatar: 'Apicultores aficionados',
      corePain: 'Pérdida de colmenas en invierno'
    });
    assert.strictEqual(validAnyIndustry.valid, true);

    const missingField = validateNicheCriteria({
      nicheName: '',
      targetAvatar: 'Y',
      corePain: 'Z'
    });
    assert.strictEqual(missingField.valid, false);
  });
});
