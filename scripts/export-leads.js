/**
 * scripts/export-leads.js — Exportador de leads a archivo CSV local en data/leads.csv
 */

const fs = require('fs');
const path = require('path');
const { getLeads } = require('./db');

function exportLeadsToCsv() {
  const leads = getLeads(1000);
  const outDir = path.join(__dirname, '..', 'data');
  const outFile = path.join(outDir, 'leads.csv');

  let csv = 'ID,Nombre,Email,Score,UTM_Source,UTM_Campaign,Fecha\n';
  leads.forEach(l => {
    csv += `"${l.id}","${l.name || ''}","${l.email}","${l.score || 0}","${l.utm_source || ''}","${l.utm_campaign || ''}","${l.created_at}"\n`;
  });

  fs.writeFileSync(outFile, csv, 'utf8');
  console.log(`[export-leads] Exportados ${leads.length} leads a: ${outFile}`);
  return { count: leads.length, outFile };
}

if (require.main === module) {
  exportLeadsToCsv();
}

module.exports = { exportLeadsToCsv };
