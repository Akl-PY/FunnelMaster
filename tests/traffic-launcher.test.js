const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const {
  buildCheckoutPack,
  buildMetaCampaign
} = require('../agents/skills/traffic-launcher/scripts/generate-campaign');

describe('Traffic Launcher & Checkout Strategy (Pasos #10 & #11)', () => {
  const mockOffer = {
    product_name: 'Protocolo Test 21',
    unique_mechanism: 'Sistema de Sincronizacion Test (SST)',
    price_usd: 37,
    guarantee_days: 30,
    target_avatar: 'Mujeres ocupadas',
    bonuses: [
      { id: 1, name: 'Bono Test 1', perceivedValue: 29 }
    ]
  };

  const mockNiche = {
    core_pain: 'Fatiga constante'
  };

  test('buildCheckoutPack generates complete checkout configuration with order bump and upsell', () => {
    const pack = buildCheckoutPack(mockOffer, mockNiche);
    assert.match(pack, /Protocolo Test 21/);
    assert.match(pack, /\$37 USD/);
    assert.match(pack, /Order Bump/i);
    assert.match(pack, /Upsell 1/i);
    assert.match(pack, /utm_source/i);
  });

  test('buildMetaCampaign produces 5 distinct UGC video scripts with timestamps', () => {
    const campaign = buildMetaCampaign(mockOffer, mockNiche);
    assert.match(campaign, /Video 1/);
    assert.match(campaign, /Video 2/);
    assert.match(campaign, /Video 3/);
    assert.match(campaign, /Video 4/);
    assert.match(campaign, /Video 5/);
    assert.match(campaign, /0:00 - 0:03/);
    assert.match(campaign, /3:2:2/);
  });

  test('buildMetaCampaign respects Anti-LLM guidelines in ad copys', () => {
    const campaign = buildMetaCampaign(mockOffer, mockNiche).toLowerCase();
    assert.strictEqual(campaign.includes('desbloquea tu potencial'), false);
    assert.strictEqual(campaign.includes('en el vertiginoso mundo'), false);
    assert.strictEqual(campaign.includes('sin duda alguna'), false);
  });

  test('Physical traffic files exist on disk in traffic directory', () => {
    const trafficDir = path.join(__dirname, '..', 'traffic');
    assert.strictEqual(fs.existsSync(trafficDir), true, 'traffic/ directory must exist');

    const subdirs = fs.readdirSync(trafficDir);
    assert.ok(subdirs.length > 0, 'traffic/ should contain at least one niche output folder');

    const activeTrafficDir = path.join(trafficDir, subdirs[0]);
    const checkoutFile = path.join(activeTrafficDir, 'checkout-setup.md');
    const campaignFile = path.join(activeTrafficDir, 'meta-ads-campaign.md');

    assert.strictEqual(fs.existsSync(checkoutFile), true, 'checkout-setup.md must exist');
    assert.strictEqual(fs.existsSync(campaignFile), true, 'meta-ads-campaign.md must exist');
  });
});
