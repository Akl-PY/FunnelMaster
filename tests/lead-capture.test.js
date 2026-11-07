const { test, describe } = require('node:test');
const assert = require('node:assert');
const { saveLead, getLeads } = require('../scripts/db');

describe('Lead Persistence & Capture Engine', () => {
  test('saveLead persists contact info, quiz score and UTM parameters', () => {
    const testLead = {
      name: 'Sofia Gomez',
      email: `sofia_${Date.now()}@test.com`,
      score: 42,
      utm_source: 'meta_ads',
      utm_campaign: 'retargeting_vsl'
    };

    const saved = saveLead(testLead);
    assert.strictEqual(typeof saved.id, 'number');
    assert.strictEqual(saved.email, testLead.email);

    const leads = getLeads(10);
    const found = leads.find(l => l.email === testLead.email);
    assert.ok(found, 'Lead must be found in getLeads');
    assert.strictEqual(found.name, 'Sofia Gomez');
    assert.strictEqual(found.score, 42);
    assert.strictEqual(found.utm_source, 'meta_ads');
  });
});
