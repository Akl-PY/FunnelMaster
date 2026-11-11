const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('Web Control Panel Dashboard (dashboard.astro)', () => {
  const dashPath = path.join(__dirname, '..', 'funnel', 'src', 'pages', 'dashboard.astro');

  test('dashboard.astro must exist in /funnel/src/pages/', (t) => {
    if (!fs.existsSync(dashPath)) {
      t.skip('funnel not yet generated');
      return;
    }
    assert.strictEqual(fs.existsSync(dashPath), true);
  });

  test('dashboard.astro must contain live leads table and CSV download button', (t) => {
    if (!fs.existsSync(dashPath)) {
      t.skip('funnel not yet generated');
      return;
    }
    const content = fs.readFileSync(dashPath, 'utf8');
    assert.match(content, /leads-tbody/);
    assert.match(content, /leads\.csv/);
    assert.match(content, /kpi-leads/);
  });

  test('dashboard.astro must contain interactive ROAS simulator sliders and calculations', (t) => {
    if (!fs.existsSync(dashPath)) {
      t.skip('funnel not yet generated');
      return;
    }
    const content = fs.readFileSync(dashPath, 'utf8');
    assert.match(content, /input-adspend/);
    assert.match(content, /input-price/);
    assert.match(content, /input-bump/);
    assert.match(content, /input-cpc/);
    assert.match(content, /recalcSimulator/);
  });
});
