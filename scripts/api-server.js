/**
 * scripts/api-server.js — Microservicio API para recepción de Leads y Métricas de FunnelMaster.
 * Funciona de forma 100% nativa con node:http (cero dependencias).
 */

const http = require('http');
const url = require('url');
const { saveLead, getLeads } = require('./db');

const PORT = process.env.API_PORT || 3004;

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  // 1. POST /api/lead — Guardar Lead
  if (req.method === 'POST' && parsedUrl.pathname === '/api/lead') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (!data.email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email es requerido' }));
          return;
        }

        const saved = saveLead(data);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, lead: saved }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'JSON inválido', message: err.message }));
      }
    });
    return;
  }

  // 2. GET /api/leads — Listar Leads (JSON)
  if (req.method === 'GET' && parsedUrl.pathname === '/api/leads') {
    try {
      const leads = getLeads(100);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, count: leads.length, leads }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // 3. GET /api/leads.csv — Exportar Leads en CSV
  if (req.method === 'GET' && parsedUrl.pathname === '/api/leads.csv') {
    try {
      const leads = getLeads(500);
      let csv = 'ID,Nombre,Email,Score,UTM_Source,UTM_Campaign,Fecha\n';
      leads.forEach(l => {
        csv += `"${l.id}","${l.name || ''}","${l.email}","${l.score || 0}","${l.utm_source || ''}","${l.utm_campaign || ''}","${l.created_at}"\n`;
      });
      res.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="leads.csv"'
      });
      res.end(csv);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`[api-server] FunnelMaster Lead API running on port ${PORT}`);
  });
}

module.exports = { server, PORT };
