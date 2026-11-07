const { test, describe } = require('node:test');
const assert = require('node:assert');
const { evaluateAdVolume, validateNicheCriteria } = require('../agents/skills/niche-discovery/scripts/validator');

describe('Niche Discovery & Validation Rules', () => {
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

  test('Niche criteria validation must enforce required fields and valid macro-niche', () => {
    const valid = validateNicheCriteria({
      nicheName: 'Cualquier Nicho Dinámico',
      macroNiche: 'Dinero',
      targetAvatar: 'Profesional buscando automatizar',
      corePain: 'Falta de tiempo y ventas inconsistentes'
    });
    assert.strictEqual(valid.valid, true);

    const invalidMacro = validateNicheCriteria({
      nicheName: 'X',
      macroNiche: 'CriptomonedasRandom',
      targetAvatar: 'Y',
      corePain: 'Z'
    });
    assert.strictEqual(invalidMacro.valid, false);

    const missingField = validateNicheCriteria({
      nicheName: '',
      macroNiche: 'Salud',
      targetAvatar: 'Y',
      corePain: 'Z'
    });
    assert.strictEqual(missingField.valid, false);
  });
});
