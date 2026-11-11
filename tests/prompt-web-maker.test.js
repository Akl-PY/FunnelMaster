const { test, describe, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('Prompt Web Maker & Offer Re-Engineer Validation', () => {
  const promptWebMakerMd = path.join(__dirname, '..', 'agents', 'skills', 'prompt-web-maker', 'SKILL.md');
  const offerReengineerMd = path.join(__dirname, '..', 'agents', 'skills', 'offer-reengineer', 'SKILL.md');
  const dataMdPath = path.join(__dirname, '..', 'DATA.md');
  const activeOfferPath = path.join(__dirname, '..', 'data', 'active_offer.json');
  const originalDataMd = fs.existsSync(dataMdPath) ? fs.readFileSync(dataMdPath, 'utf8') : null;
  const originalOfferJson = fs.existsSync(activeOfferPath) ? fs.readFileSync(activeOfferPath, 'utf8') : null;
  const testSlug = '__test_prompt_funnel__';
  const testFunnelDir = path.join(__dirname, '..', 'funnels', testSlug);
  let createdNicheId = null;

  after(() => {
    try {
      const db = require('../scripts/db').getDbInstance().client;
      if (createdNicheId) {
        db.prepare('DELETE FROM offers WHERE niche_id = ?').run(createdNicheId);
        db.prepare('DELETE FROM niches WHERE id = ?').run(createdNicheId);
      }
      require('../scripts/db').closeDb();
    } catch (_) {}
    if (fs.existsSync(testFunnelDir)) {
      fs.rmSync(testFunnelDir, { recursive: true, force: true });
    }
    if (originalDataMd !== null) {
      fs.writeFileSync(dataMdPath, originalDataMd, 'utf8');
    }
    if (originalOfferJson !== null) {
      fs.writeFileSync(activeOfferPath, originalOfferJson, 'utf8');
    } else if (fs.existsSync(activeOfferPath)) {
      fs.unlinkSync(activeOfferPath);
    }
  });

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

  test('runOfferReengineering must execute and output structured offer data with dynamic currency and ticket', () => {
    const { saveNiche } = require('../scripts/db');
    const savedNiche = saveNiche({
      niche_name: 'Apicultura Urbana de Precisión Test',
      macro_niche: 'Oficios & Naturaleza',
      target_avatar: 'Apicultores urbanos principiantes',
      core_pain: 'Pérdida de colmenas en época invernal',
      active_ads_count: 25,
      validation_status: 'validated',
      competitor_url: 'https://example.com/test'
    });
    createdNicheId = savedNiche.id;

    const { runOfferReengineering } = require('../agents/skills/offer-reengineer/scripts/reengineer');
    const res = runOfferReengineering(createdNicheId, { currency: 'EUR', price: 47 });
    assert.strictEqual(typeof res.savedOffer.id, 'number');
    assert.strictEqual(res.reengineeredOffer.bonuses.length, 4);
    assert.strictEqual(typeof res.reengineeredOffer.unique_mechanism, 'string');
    assert.strictEqual(res.reengineeredOffer.currency, 'EUR');
    assert.strictEqual(res.reengineeredOffer.currency_symbol, '€');
    assert.strictEqual(res.reengineeredOffer.offer_price, 47);
  });

  test('runGeneratePrompt generates 48hs Playbook Perfect Prompt and enforces Rule #20', () => {
    fs.mkdirSync(testFunnelDir, { recursive: true });
    fs.writeFileSync(path.join(testFunnelDir, 'copy.md'), '# Copy Test\n\nBloque de prueba persuasiva.', 'utf8');

    const { runGeneratePrompt } = require('../agents/skills/prompt-web-maker/scripts/generate-prompt');
    const res = runGeneratePrompt(testSlug);
    assert.strictEqual(typeof res.outputPath, 'string');
    assert.strictEqual(fs.existsSync(res.outputPath), true);
    assert.match(res.perfectPrompt, /DIRECTRIZ MAESTRA DEL PLAYBOOK DE 48HS/i);
    assert.match(res.perfectPrompt, /Lovable/i);
    assert.match(res.perfectPrompt, /P\u00c1GINA DE VENTAS DE ALTA CONVERSI\u00d3N/i);

    // Rule 20 in AGENTS.md
    const agentsMd = path.join(__dirname, '..', 'AGENTS.md');
    const agentsContent = fs.readFileSync(agentsMd, 'utf8');
    assert.match(agentsContent, /20 \u2014 Arquitectura Web Din\u00e1mica y Perfect Prompt del Playbook de 48hs/i);
    assert.match(agentsContent, /Anti-Estructuras R\u00edgidas/i);
  });
});
