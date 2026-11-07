const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { buildRecoveryPack } = require('../agents/skills/cart-recovery/scripts/generate-recovery');

describe('Cart Recovery Agent (WhatsApp & SMS)', () => {
  const mockOffer = {
    product_name: 'Protocolo Test 21',
    price_usd: 37,
    guarantee_days: 30
  };
  const mockNiche = { core_pain: 'Dolor y fatiga' };

  test('buildRecoveryPack generates 3-stage cadence with empathy and urgency', () => {
    const pack = buildRecoveryPack(mockOffer, mockNiche);
    assert.match(pack, /Mensaje 1 \(15 Minutos/);
    assert.match(pack, /Mensaje 2 \(2 Horas/);
    assert.match(pack, /Mensaje 3 \(24 Horas/);
    assert.match(pack, /30 días de garantía/i);
    assert.match(pack, /\$37 USD/);
  });

  test('buildRecoveryPack provides quick replies and short SMS copy', () => {
    const pack = buildRecoveryPack(mockOffer, mockNiche);
    assert.match(pack, /Quick Replies/i);
    assert.match(pack, /\/garantia/);
    assert.match(pack, /\/metodos/);
    assert.match(pack, /SMS 1/);
  });

  test('Physical recovery files exist in recovery directory', () => {
    const recDir = path.join(__dirname, '..', 'recovery');
    assert.strictEqual(fs.existsSync(recDir), true);
    const subdirs = fs.readdirSync(recDir);
    assert.ok(subdirs.length > 0);
    const activeDir = path.join(recDir, subdirs[0]);
    assert.strictEqual(fs.existsSync(path.join(activeDir, 'whatsapp-recovery-sequences.md')), true);
  });
});
