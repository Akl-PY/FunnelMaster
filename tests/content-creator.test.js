const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const {
  buildReelsScripts,
  buildCarousels,
  buildEmailSequence,
  buildGammaPrompt
} = require('../agents/skills/content-creator/scripts/generate-content');

describe('Content Creator Agent (Organic & Email Nurturing)', () => {
  const mockOffer = {
    product_name: 'Protocolo Test 21',
    unique_mechanism: 'Sistema de Sincronizacion Test (SST)',
    price_usd: 37,
    target_avatar: 'Mujeres ocupadas'
  };

  const mockNiche = {
    core_pain: 'Fatiga e insomnio'
  };

  test('buildReelsScripts generates high-retention video scripts with ManyChat CTAs', () => {
    const reels = buildReelsScripts(mockOffer, mockNiche);
    assert.match(reels, /Reel 1/);
    assert.match(reels, /Reel 2/);
    assert.match(reels, /Reel 3/);
    assert.match(reels, /Hook \(0-3s\)/);
    assert.match(reels, /Comenta/i);
  });

  test('buildCarousels creates educational slide-by-slide posts for Instagram', () => {
    const carousels = buildCarousels(mockOffer, mockNiche);
    assert.match(carousels, /Slide 1 \(Portada\)/);
    assert.match(carousels, /Slide 6/);
    assert.match(carousels, /Guarda este carrusel/i);
  });

  test('buildEmailSequence creates 5 complete nurturing emails with Anti-LLM compliance', () => {
    const emails = buildEmailSequence(mockOffer, mockNiche);
    assert.match(emails, /Email 1 \(Día 1\)/);
    assert.match(emails, /Email 2 \(Día 2\)/);
    assert.match(emails, /Email 3 \(Día 3\)/);
    assert.match(emails, /Email 4 \(Día 4\)/);
    assert.match(emails, /Email 5 \(Día 5\)/);

    const lower = emails.toLowerCase();
    assert.strictEqual(lower.includes('desbloquea tu potencial'), false);
    assert.strictEqual(lower.includes('en el vertiginoso mundo'), false);
  });

  test('buildGammaPrompt produces formatted prompt for Nova Creator in Gamma.app', () => {
    const gamma = buildGammaPrompt(mockOffer, mockNiche);
    assert.match(gamma, /Gamma\.app/);
    assert.match(gamma, /Nova Creator/);
    assert.match(gamma, /#0B0F19/);
    assert.match(gamma, /Fase 1/);
  });

  test('Physical content files exist in content directory', (t) => {
    const contentDir = path.join(__dirname, '..', 'content');
    if (!fs.existsSync(contentDir)) {
      t.skip('content/ directory not yet generated');
      return;
    }
    const subdirs = fs.readdirSync(contentDir);
    assert.ok(subdirs.length > 0, 'content/ must have at least one niche output');

    const activeContentDir = path.join(contentDir, subdirs[0]);
    assert.strictEqual(fs.existsSync(path.join(activeContentDir, 'social-reels-scripts.md')), true);
    assert.strictEqual(fs.existsSync(path.join(activeContentDir, 'instagram-carousels.md')), true);
    assert.strictEqual(fs.existsSync(path.join(activeContentDir, 'email-sequence-5days.md')), true);
    assert.strictEqual(fs.existsSync(path.join(activeContentDir, 'gamma-presentation-prompt.md')), true);
  });
});
