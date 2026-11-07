const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const {
  generateMasterGuide,
  generateBonusContent
} = require('../agents/skills/product-generator/scripts/generate-product');

describe('Product Generator (Paso #9)', () => {
  const mockOffer = {
    product_name: 'Protocolo Test 21',
    unique_mechanism: 'Sistema de Sincronizacion Test (SST)',
    main_promise: 'Prueba de desinflamacion en 21 dias',
    target_avatar: 'Personas ocupadas'
  };

  const mockBonus = {
    id: 1,
    name: 'Guia Rapida SOS: Eliminador de Insomnio',
    perceivedValue: 29,
    purpose: 'Victoria rapida en 48 horas para dormir continuo.'
  };

  test('generateMasterGuide produces 3 structured actionable phases', () => {
    const guide = generateMasterGuide(mockOffer, { niche_name: 'Test Niche' });
    assert.match(guide, /Fase 1/);
    assert.match(guide, /Fase 2/);
    assert.match(guide, /Fase 3/);
    assert.match(guide, /Checklist Diario/i);
    assert.match(guide, /Protocolo Diario/i);
  });

  test('generateMasterGuide respects Anti-LLM tone without clichés', () => {
    const guide = generateMasterGuide(mockOffer, { niche_name: 'Test Niche' }).toLowerCase();
    assert.strictEqual(guide.includes('desbloquea tu potencial'), false);
    assert.strictEqual(guide.includes('en el vertiginoso mundo'), false);
    assert.strictEqual(guide.includes('sin duda alguna'), false);
  });

  test('generateBonusContent creates practical implementation guides', () => {
    const bonusText = generateBonusContent(mockBonus);
    assert.match(bonusText, /Guia Rapida SOS/);
    assert.match(bonusText, /Valor Percibido: \$29 USD/);
    assert.match(bonusText, /Protocolo 3-2-1/);
  });

  test('Physical products directory contains master guide and bonuses', () => {
    const productsRoot = path.join(__dirname, '..', 'products');
    assert.strictEqual(fs.existsSync(productsRoot), true, 'products/ directory must exist');

    const subdirs = fs.readdirSync(productsRoot);
    assert.ok(subdirs.length > 0, 'products/ should contain at least one niche output');

    const activeProductDir = path.join(productsRoot, subdirs[0]);
    const masterGuidePath = path.join(activeProductDir, 'master-guide.md');
    assert.strictEqual(fs.existsSync(masterGuidePath), true, 'master-guide.md must exist in generated product');

    const bonusesDir = path.join(activeProductDir, 'bonuses');
    assert.strictEqual(fs.existsSync(bonusesDir), true, 'bonuses/ must exist');
    const bonuses = fs.readdirSync(bonusesDir);
    assert.ok(bonuses.length >= 4, 'Must have at least 4 bonus deliverables generated');
  });
});
