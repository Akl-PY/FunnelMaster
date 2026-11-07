const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('Prompt Web Maker & Offer Re-Engineer Validation', () => {
  const promptWebMakerMd = path.join(__dirname, '..', 'agents', 'skills', 'prompt-web-maker', 'SKILL.md');
  const offerReengineerMd = path.join(__dirname, '..', 'agents', 'skills', 'offer-reengineer', 'SKILL.md');

  test('prompt-web-maker must require detailed tokens, hex colors and microanimations', () => {
    const content = fs.readFileSync(promptWebMakerMd, 'utf8');
    assert.match(content, /Paleta de Colores/i);
    assert.match(content, /Microanimaciones/i);
    assert.match(content, /responsive/i);
    assert.match(content, /Lovable/i);
  });

  test('offer-reengineer must mandate unique mechanism and value stack', () => {
    const content = fs.readFileSync(offerReengineerMd, 'utf8');
    assert.match(content, /Mecanismo [ÚU]nico/i);
    assert.match(content, /Pila de Bonos/i);
    assert.match(content, /Anclaje de Valor/i);
    assert.match(content, /DATA\.md/);
  });

  test('Value stack calculation helper must compute total perceived value and discount correctly', () => {
    function computeOfferStack(mainProductPrice, bonuses) {
      const totalBonusValue = bonuses.reduce((acc, b) => acc + b.perceivedValue, 0);
      const totalPerceivedValue = mainProductPrice + totalBonusValue;
      return {
        totalPerceivedValue,
        offerPrice: mainProductPrice,
        bonusesCount: bonuses.length
      };
    }

    const bonuses = [
      { name: 'Guía de Automatización Rápida', perceivedValue: 47 },
      { name: 'Plantillas de Copies Persuasivos', perceivedValue: 97 },
      { name: 'Sesión de Auditoría Grabada', perceivedValue: 197 }
    ];

    const result = computeOfferStack(47, bonuses);
    assert.strictEqual(result.totalPerceivedValue, 388);
    assert.strictEqual(result.offerPrice, 47);
    assert.strictEqual(result.bonusesCount, 3);
  });
});
