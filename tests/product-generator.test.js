const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const {
  generateMasterGuide,
  generateBonusContent
} = require('../agents/skills/product-generator/scripts/generate-product');

describe('Product Generator (Paso #9 — High-Value Non-Cloned Deliverables)', () => {
  const mockOffer = {
    product_name: 'Sistema Productividad Pro™',
    unique_mechanism: 'Arquitectura de Sincronizacion Test (AST)',
    main_promise: 'Elimina la friccion diaria desde tus primeras 48 horas',
    target_avatar: 'Profesionales ocupados'
  };

  test('generateMasterGuide produces 3 structured actionable phases without 21-days cliche', () => {
    const guide = generateMasterGuide(mockOffer, { niche_name: 'Test Niche' });
    assert.match(guide, /Fase 1/);
    assert.match(guide, /Fase 2/);
    assert.match(guide, /Fase 3/);
    assert.match(guide, /Checklist de Verificación/i);
    assert.match(guide, /Protocolo Operativo/i);
    assert.strictEqual(guide.includes('Manual Operativo de 21 Días'), false);
  });

  test('generateMasterGuide respects Anti-LLM tone without clichés', () => {
    const guide = generateMasterGuide(mockOffer, { niche_name: 'Test Niche' }).toLowerCase();
    assert.strictEqual(guide.includes('desbloquea tu potencial'), false);
    assert.strictEqual(guide.includes('en el vertiginoso mundo'), false);
    assert.strictEqual(guide.includes('sin duda alguna'), false);
  });

  test('generateBonusContent creates 4 completely distinct, non-cloned implementation guides', () => {
    const b1 = generateBonusContent({ id: 1, name: 'Protocolo SOS en 5 Minutos', perceivedValue: 29 }, 0, mockOffer);
    const b2 = generateBonusContent({ id: 2, name: 'Kit de Plantillas Plug & Play', perceivedValue: 37 }, 1, mockOffer);
    const b3 = generateBonusContent({ id: 3, name: 'Calculadora & Auditoría', perceivedValue: 27 }, 2, mockOffer);
    const b4 = generateBonusContent({ id: 4, name: 'Manual de Blindaje', perceivedValue: 47 }, 3, mockOffer);

    assert.match(b1, /Minuto 01/);
    assert.match(b2, /Plantilla #1: Tablero Diario de Prioridad Única/);
    assert.match(b3, /Test de Auditoría Operativa sobre 100 Puntos/);
    assert.match(b4, /3 Marchas Operativas/);

    // Verify they are not cloned
    assert.notStrictEqual(b1, b2);
    assert.notStrictEqual(b2, b3);
    assert.notStrictEqual(b3, b4);
  });

  test('Physical products directory contains master guide and 4 distinct bonuses', (t) => {
    const productsRoot = path.join(__dirname, '..', 'products');
    if (!fs.existsSync(productsRoot)) {
      t.skip('products/ directory not yet generated');
      return;
    }

    const subdirs = fs.readdirSync(productsRoot);
    if (subdirs.length === 0) {
      t.skip('No products generated yet');
      return;
    }

    const activeProductDir = path.join(productsRoot, subdirs[0]);
    const masterGuidePath = path.join(activeProductDir, 'master-guide.md');
    assert.strictEqual(fs.existsSync(masterGuidePath), true, 'master-guide.md must exist in generated product');

    const bonusesDir = path.join(activeProductDir, 'bonuses');
    assert.strictEqual(fs.existsSync(bonusesDir), true, 'bonuses/ must exist');
    const bonuses = fs.readdirSync(bonusesDir).filter(f => f.endsWith('.md'));
    assert.ok(bonuses.length >= 4, 'Must have at least 4 bonus deliverables generated');
  });
});
