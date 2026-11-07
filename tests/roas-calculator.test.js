const { test, describe } = require('node:test');
const assert = require('node:assert');
const { calculateFunnelEconomics } = require('../scripts/simulate-roas');

describe('Funnel Unit Economics & ROAS Calculator', () => {
  test('calculateFunnelEconomics accurately computes AOV with Bump and Upsell take rates', () => {
    // 37 + (17 * 0.35 = 5.95) + (67 * 0.15 = 10.05) = 53.00
    const report = calculateFunnelEconomics({
      frontendPrice: 37,
      orderBumpPrice: 17,
      orderBumpTakeRate: 0.35,
      upsellPrice: 67,
      upsellTakeRate: 0.15,
      dailyAdSpend: 100
    });

    assert.strictEqual(report.aov, 53);
    assert.strictEqual(report.maxCacAllowed, 53);
    assert.ok(report.estimatedPurchases >= 1);
    assert.strictEqual(report.breakEvenRoas, 1.0);
    assert.strictEqual(typeof report.roas, 'number');
  });

  test('isProfitable flags correctly based on ROAS > 1.0', () => {
    const profitable = calculateFunnelEconomics({
      dailyAdSpend: 50,
      conversionRate: 0.05,
      estimatedCpc: 0.20
    });
    assert.strictEqual(profitable.isProfitable, true);
  });
});
