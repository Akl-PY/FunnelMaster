/**
 * scripts/simulate-roas.js
 * Calculadora y simulador de Unit Economics, AOV y ROAS para embudos de conversión.
 */

const fs = require('fs');
const path = require('path');

function calculateFunnelEconomics(params = {}) {
  const {
    frontendPrice = 37,
    orderBumpPrice = 17,
    orderBumpTakeRate = 0.35, // 35% de los compradores toman el bump
    upsellPrice = 67,
    upsellTakeRate = 0.15, // 15% de los compradores toman el upsell
    estimatedCpc = 0.35, // $0.35 por clic en Meta Ads
    conversionRate = 0.02, // 2.0% de visitantes a compra
    dailyAdSpend = 100 // $100 USD/día de presupuesto publicitario
  } = params;

  // 1. Average Order Value (AOV)
  const aov = frontendPrice + (orderBumpPrice * orderBumpTakeRate) + (upsellPrice * upsellTakeRate);

  // 2. Traffic & Conversion Metrics
  const estimatedClicks = Math.floor(dailyAdSpend / estimatedCpc);
  const estimatedPurchases = Math.max(1, Math.round(estimatedClicks * conversionRate));
  const cac = dailyAdSpend / estimatedPurchases;

  // 3. Financial Return
  const grossRevenue = estimatedPurchases * aov;
  const netProfit = grossRevenue - dailyAdSpend;
  const roas = grossRevenue / dailyAdSpend;
  const breakEvenRoas = 1.0;
  const maxCacAllowed = aov; // Punto de equilibrio a nivel frontend

  return {
    frontendPrice,
    orderBumpPrice,
    orderBumpTakeRate,
    upsellPrice,
    upsellTakeRate,
    aov: Number(aov.toFixed(2)),
    dailyAdSpend,
    estimatedClicks,
    estimatedPurchases,
    cac: Number(cac.toFixed(2)),
    maxCacAllowed: Number(maxCacAllowed.toFixed(2)),
    grossRevenue: Number(grossRevenue.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
    roas: Number(roas.toFixed(2)),
    breakEvenRoas,
    isProfitable: roas > 1.0
  };
}

function printEconomicsReport(report) {
  console.log('\n======================================================');
  console.log('       FUNNELMASTER - SIMULADOR DE UNIT ECONOMICS     ');
  console.log('======================================================\n');
  console.log(`[+] Precio Frontend:          $${report.frontendPrice} USD`);
  console.log(`[+] Order Bump ($${report.orderBumpPrice} @ ${Math.round(report.orderBumpTakeRate * 100)}%):    +$${(report.orderBumpPrice * report.orderBumpTakeRate).toFixed(2)} USD`);
  console.log(`[+] Upsell ($${report.upsellPrice} @ ${Math.round(report.upsellTakeRate * 100)}%):        +$${(report.upsellPrice * report.upsellTakeRate).toFixed(2)} USD`);
  console.log(`------------------------------------------------------`);
  console.log(`[★] AOV Real (Ticket Promedio): $${report.aov} USD`);
  console.log(`[★] CAC Máximo de Equilibrio:  $${report.maxCacAllowed} USD`);
  console.log(`------------------------------------------------------`);
  console.log(`[>] Inversión Diaria en Ads:   $${report.dailyAdSpend} USD`);
  console.log(`[>] Clics Estimados (a $${0.35}): ${report.estimatedClicks}`);
  console.log(`[>] Ventas Diarias Estimadas:  ${report.estimatedPurchases}`);
  console.log(`[>] Costo por Adquisición (CAC): $${report.cac} USD`);
  console.log(`------------------------------------------------------`);
  console.log(`[$] Facturación Bruta Diaria:  $${report.grossRevenue} USD`);
  console.log(`[$] Beneficio Neto Diario:     $${report.netProfit} USD`);
  console.log(`[⚡] ROAS Proyectado:           ${report.roas}x  (${report.isProfitable ? 'RENTABLE ✓' : 'NO RENTABLE ✗'})`);
  console.log('======================================================\n');
}

if (require.main === module) {
  const report = calculateFunnelEconomics();
  printEconomicsReport(report);
}

module.exports = {
  calculateFunnelEconomics,
  printEconomicsReport
};
