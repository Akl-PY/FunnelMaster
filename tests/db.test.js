const { test, describe, after } = require('node:test');
const assert = require('node:assert');
const { initDb, saveNiche, getLatestNiche, saveOffer, getLatestOffer, logAutomation, closeDb } = require('../scripts/db');

describe('Database Persistence Layer (SQLite / Postgres)', () => {
  after(() => {
    try {
      const db = require('../scripts/db').getDbInstance().client;
      db.prepare("DELETE FROM niches WHERE niche_name LIKE 'Test Dynamic Niche%'").run();
      db.prepare("DELETE FROM offers WHERE product_name = 'Método Automatizador Exprés'").run();
    } catch (_) {}
    closeDb();
  });

  test('initDb must successfully initialize database schema', () => {
    const res = initDb();
    assert.strictEqual(res.success, true);
    assert.strictEqual(['sqlite', 'postgres'].includes(res.driver), true);
  });

  test('saveNiche and getLatestNiche must persist and retrieve niche data', () => {
    const testNiche = {
      niche_name: 'Test Dynamic Niche ' + Date.now(),
      macro_niche: 'Dinero',
      target_avatar: 'Emprendedor digital',
      core_pain: 'Ventas irregulares y sin automatización',
      active_ads_count: 45,
      validation_status: 'scaled',
      competitor_url: 'https://example.com/test-landing'
    };

    const saved = saveNiche(testNiche);
    assert.strictEqual(typeof saved.id, 'number');

    const latest = getLatestNiche();
    assert.strictEqual(latest.niche_name, testNiche.niche_name);
    assert.strictEqual(latest.macro_niche, 'Dinero');
    assert.strictEqual(latest.active_ads_count, 45);
  });

  test('saveOffer and getLatestOffer must persist offer details and bonuses', () => {
    const testOffer = {
      niche_id: 1,
      product_name: 'Método Automatizador Exprés',
      main_promise: 'Activa tus ventas en 48 horas sin equipo',
      unique_mechanism: 'Protocolo FunnelMaster™',
      bonuses: [
        { name: 'Guía Rápida', perceivedValue: 27 },
        { name: 'Plantillas de Anuncios', perceivedValue: 47 }
      ],
      price_usd: 47.0,
      guarantee_days: 30
    };

    const saved = saveOffer(testOffer);
    assert.strictEqual(typeof saved.id, 'number');

    const latest = getLatestOffer();
    assert.strictEqual(latest.product_name, testOffer.product_name);
    assert.strictEqual(latest.unique_mechanism, 'Protocolo FunnelMaster™');
    assert.strictEqual(latest.price_usd, 47.0);
  });

  test('logAutomation must record execution traces', () => {
    const logId = logAutomation('niche-discovery', 'audit_ads', 'success', { adsFound: 32 });
    assert.strictEqual(typeof logId, 'number');
  });
});
