const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { buildMobileApp, generateAppSuperPrompt, runGenerateApp } = require('../agents/skills/app-maker/scripts/generate-app');

describe('App Maker Agent (Mobile Companion App - Google Material Design 3)', () => {
  const mockOffer = {
    product_name: 'App Alivio Lumbar',
    unique_mechanism: 'Sistema Interactivo MDAP'
  };
  const mockNiche = {
    niche_name: 'Alivio Lumbar',
    core_pain: 'Dolor y rigidez'
  };
  const mockArchetype = {
    name: 'Biomechanical Engineering',
    badge: 'Herramienta de Bolsillo',
    colors: {
      bgMain: '#080E1A',
      bgCard: '#0F1A2E',
      borderCard: '#1E2F4D',
      accentPrimary: '#00D2FF',
      accentGradientFrom: '#00D2FF',
      accentGradientTo: '#0077FF',
      textPrimary: '#F1F5F9',
      textSecondary: '#94A3B8'
    }
  };

  test('buildMobileApp generates complete interactive Google Material Design 3 PWA HTML', () => {
    const html = buildMobileApp(mockOffer, mockNiche, mockArchetype);
    assert.match(html, /manifest\.json/);
    assert.match(html, /App Alivio Lumbar/);
    assert.match(html, /Material\+Symbols\+Rounded/);
    assert.match(html, /--md-sys-color-surface/);
    assert.match(html, /--md-sys-color-secondary-container/);
    assert.match(html, /m3-nav-pill/);
    assert.match(html, /m3-ripple/);
    assert.match(html, /toggleTimer/);
    assert.match(html, /localStorage/);
    assert.match(html, /#00D2FF/);
  });

  test('generateAppSuperPrompt specifies Google Material Design 3 (Material You)', () => {
    const prompt = generateAppSuperPrompt(mockOffer, mockNiche, mockArchetype);
    assert.match(prompt, /Google Material Design 3/i);
    assert.match(prompt, /Material Symbols Rounded/i);
    assert.match(prompt, /--md-sys-color-surface/);
  });

  test('runGenerateApp generates /app and /app/dist files', () => {
    const result = runGenerateApp();
    assert.strictEqual(fs.existsSync(result.appDir), true);
    assert.strictEqual(fs.existsSync(result.distDir), true);
    assert.strictEqual(fs.existsSync(path.join(result.appDir, 'index.html')), true);
    assert.strictEqual(fs.existsSync(path.join(result.appDir, 'manifest.json')), true);
    assert.strictEqual(fs.existsSync(path.join(result.distDir, 'index.html')), true);
  });
});
