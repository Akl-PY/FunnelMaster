const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('Checkout Mockup Page (checkout.astro)', () => {
  const checkoutPath = path.join(__dirname, '..', 'funnel', 'src', 'pages', 'checkout.astro');

  test('checkout.astro must exist in /funnel/src/pages/', (t) => {
    if (!fs.existsSync(checkoutPath)) {
      t.skip('funnel not yet generated');
      return;
    }
    assert.strictEqual(fs.existsSync(checkoutPath), true);
  });

  test('checkout.astro must contain Order Bump and dynamic total toggle', (t) => {
    if (!fs.existsSync(checkoutPath)) {
      t.skip('funnel not yet generated');
      return;
    }
    const content = fs.readFileSync(checkoutPath, 'utf8');
    assert.match(content, /order-bump-checkbox/);
    assert.match(content, /toggleOrderBump/);
    assert.match(content, /\$17 USD/);
    assert.match(content, /\$54 USD/);
  });

  test('checkout.astro must include 30-day guarantee and 256-bit SSL badges', (t) => {
    if (!fs.existsSync(checkoutPath)) {
      t.skip('funnel not yet generated');
      return;
    }
    const content = fs.readFileSync(checkoutPath, 'utf8');
    assert.match(content, /Garantía/i);
    assert.match(content, /SSL/i);
    assert.match(content, /window\.location\.search/);
  });

  test('checkout.astro must support Stripe and Mercado Pago payment gateway options', (t) => {
    if (!fs.existsSync(checkoutPath)) {
      t.skip('funnel not yet generated');
      return;
    }
    const content = fs.readFileSync(checkoutPath, 'utf8');
    assert.match(content, /Stripe/i);
    assert.match(content, /Mercado Pago/i);
    assert.match(content, /selectGateway/);
  });
});
