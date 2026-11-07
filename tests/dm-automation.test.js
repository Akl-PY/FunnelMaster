const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const {
  buildManychatJson,
  buildManychatGuide
} = require('../agents/skills/dm-automation/scripts/generate-flows');

describe('DM Automation & ManyChat Flows', () => {
  const mockOffer = {
    product_name: 'Protocolo Test 21',
    unique_mechanism: 'Sistema Test (ST)'
  };
  const mockNiche = { core_pain: 'Fatiga' };

  test('buildManychatJson produces valid JSON schema with nodes and keywords', () => {
    const json = buildManychatJson(mockOffer, mockNiche);
    assert.strictEqual(json.version, '2.0');
    assert.ok(json.triggers.length >= 3);
    assert.ok(json.nodes.length >= 4);

    const greeting = json.nodes.find(n => n.id === 'node_1_greeting');
    assert.ok(greeting);
    assert.match(greeting.text, /Protocolo Test 21/);
  });

  test('buildManychatGuide contains operational setup instructions', () => {
    const guide = buildManychatGuide(mockOffer, mockNiche);
    assert.match(guide, /ManyChat & Instagram/i);
    assert.match(guide, /RESET/);
    assert.match(guide, /utm_source=instagram/);
  });

  test('Physical automation files exist in automations directory', () => {
    const autoDir = path.join(__dirname, '..', 'automations');
    assert.strictEqual(fs.existsSync(autoDir), true);
    const subdirs = fs.readdirSync(autoDir);
    assert.ok(subdirs.length > 0);
    const activeDir = path.join(autoDir, subdirs[0]);
    assert.strictEqual(fs.existsSync(path.join(activeDir, 'manychat-flow.json')), true);
    assert.strictEqual(fs.existsSync(path.join(activeDir, 'manychat-guide.md')), true);
  });
});
