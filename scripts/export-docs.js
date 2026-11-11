/**
 * scripts/export-docs.js — Compila entregables Markdown a HTML maquetados para impresión / PDF
 * con soporte completo de tablas editoriales y sincronización automática en /funnel/public/docs/.
 */

const fs = require('fs');
const path = require('path');

function parseMarkdownTables(md) {
  const lines = md.split('\n');
  const out = [];
  let inTable = false;
  let tableRows = [];

  function flushTable() {
    if (tableRows.length < 2) {
      out.push(...tableRows);
      tableRows = [];
      inTable = false;
      return;
    }
    const headerCells = tableRows[0]
      .split('|')
      .map(c => c.trim())
      .filter(Boolean);
    const bodyLines = tableRows.slice(2);
    let tableHtml = '<table class="doc-table"><thead><tr>';
    headerCells.forEach(h => {
      tableHtml += `<th>${h}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';
    bodyLines.forEach(r => {
      const cells = r
        .split('|')
        .map(c => c.trim())
        .filter(Boolean);
      if (cells.length > 0) {
        tableHtml += '<tr>';
        cells.forEach(c => {
          tableHtml += `<td>${c}</td>`;
        });
        tableHtml += '</tr>';
      }
    });
    tableHtml += '</tbody></table>';
    out.push(tableHtml);
    tableRows = [];
    inTable = false;
  }

  for (const line of lines) {
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      inTable = true;
      tableRows.push(line.trim());
    } else {
      if (inTable) flushTable();
      out.push(line);
    }
  }
  if (inTable) flushTable();
  return out.join('\n');
}

function markdownToHtml(md) {
  let html = parseMarkdownTables(md)
    // Encabezados
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Negrita, código e itálica
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Checklists
    .replace(/- \[ \] (.*$)/gim, '<div class="check-item"><span class="box">☐</span> $1</div>')
    .replace(/- \[x\] (.*$)/gim, '<div class="check-item"><span class="box">☑</span> $1</div>')
    // Listas viñetas
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    // Citas
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    // Separador
    .replace(/^---/gim, '<hr/>')
    // Párrafos simples
    .replace(/\n\n/gim, '</p><p>');

  return `<p>${html}</p>`;
}

function wrapHtmlTemplate(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
    
    body {
      font-family: 'Lora', Georgia, serif;
      font-size: 11.5pt;
      line-height: 1.68;
      color: #0f172a;
      max-width: 840px;
      margin: 0 auto;
      padding: 40px 24px;
      background: #f8fafc;
    }

    .doc-sheet {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 44px 48px;
      box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08);
    }
    
    h1, h2, h3, h4, .brand-font {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #0f172a;
    }

    h1 {
      font-size: 24pt;
      font-weight: 800;
      letter-spacing: -0.02em;
      border-bottom: 3px solid #10b981;
      padding-bottom: 10px;
      margin-top: 0;
    }

    h2 {
      font-size: 15.5pt;
      font-weight: 800;
      color: #047857;
      margin-top: 32px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
    }

    h3 {
      font-size: 12.5pt;
      font-weight: 700;
      margin-top: 22px;
      color: #1e293b;
    }

    h4 {
      font-size: 11pt;
      font-weight: 700;
      margin-top: 16px;
      color: #334155;
    }

    code {
      font-family: monospace;
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10pt;
      color: #0f766e;
    }

    .doc-table {
      width: 100%;
      border-collapse: collapse;
      margin: 18px 0;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 9.8pt;
    }

    .doc-table th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 10px 12px;
      font-weight: 700;
    }

    .doc-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 10px 12px;
      vertical-align: top;
      color: #334155;
    }

    .doc-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    .check-item {
      margin: 8px 0;
      padding: 8px 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 10.2pt;
    }

    .box {
      font-size: 13pt;
      color: #10b981;
      margin-right: 8px;
      font-weight: bold;
    }

    blockquote {
      border-left: 4px solid #10b981;
      margin: 18px 0;
      padding: 12px 18px;
      background: #ecfdf5;
      border-radius: 0 8px 8px 0;
      font-style: normal;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 10.2pt;
    }

    li {
      margin-bottom: 6px;
    }

    hr {
      border: 0;
      height: 1px;
      background: #e2e8f0;
      margin: 28px 0;
    }

    .print-bar {
      position: sticky;
      top: 12px;
      background: #0f172a;
      color: white;
      padding: 12px 20px;
      border-radius: 12px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
      z-index: 50;
    }

    .print-actions {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .back-link {
      color: #94a3b8;
      text-decoration: none;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 9.5pt;
      font-weight: 600;
    }

    .print-btn {
      background: #10b981;
      color: #022c22;
      border: none;
      padding: 9px 18px;
      font-weight: 800;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 9.5pt;
    }

    @media print {
      .print-bar { display: none; }
      body { padding: 0; background: #ffffff; }
      .doc-sheet { border: none; box-shadow: none; padding: 0; }
      h2 { page-break-after: avoid; }
      .check-item, .doc-table { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <span class="brand-font font-bold">📘 ${title} · Edición Ejecutiva Imprimible</span>
    <div class="print-actions">
      <a href="/app/index.html" class="back-link">← Volver a la App</a>
      <button class="print-btn" onclick="window.print()">🖨️ Descargar / Guardar como PDF</button>
    </div>
  </div>
  <div class="doc-sheet">
    ${bodyHtml}
  </div>
</body>
</html>`;
}

function exportAllProductsToHtml() {
  const rootDir = path.join(__dirname, '..');
  const productsRoot = path.join(rootDir, 'products');
  if (!fs.existsSync(productsRoot)) {
    console.warn('[export-docs] No existe la carpeta products/.');
    return [];
  }

  const funnelPublicDocs = path.join(rootDir, 'funnel', 'public', 'docs');
  const funnelDistDocs = path.join(rootDir, 'funnel', 'dist', 'docs');
  if (fs.existsSync(path.join(rootDir, 'funnel'))) {
    if (!fs.existsSync(funnelPublicDocs)) fs.mkdirSync(funnelPublicDocs, { recursive: true });
    if (fs.existsSync(path.join(rootDir, 'funnel', 'dist')) && !fs.existsSync(funnelDistDocs)) {
      fs.mkdirSync(funnelDistDocs, { recursive: true });
    }
  }

  const generatedFiles = [];
  const niches = fs.readdirSync(productsRoot);

  for (const niche of niches) {
    const nicheDir = path.join(productsRoot, niche);
    if (!fs.statSync(nicheDir).isDirectory()) continue;

    const distDir = path.join(nicheDir, 'dist_html');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // 1. Exportar master-guide.md
    const masterPath = path.join(nicheDir, 'master-guide.md');
    if (fs.existsSync(masterPath)) {
      const content = fs.readFileSync(masterPath, 'utf8');
      const firstLine = (content.split('\n')[0] || '').replace(/^#\s*/, '').trim() || 'Manual Operativo Maestro';
      const html = wrapHtmlTemplate(`${firstLine} — Manual Operativo Maestro`, markdownToHtml(content));
      const outPath = path.join(distDir, 'master-guide.html');
      fs.writeFileSync(outPath, html, 'utf8');
      if (fs.existsSync(funnelPublicDocs)) {
        fs.writeFileSync(path.join(funnelPublicDocs, 'master-guide.html'), html, 'utf8');
      }
      if (fs.existsSync(funnelDistDocs)) {
        fs.writeFileSync(path.join(funnelDistDocs, 'master-guide.html'), html, 'utf8');
      }
      generatedFiles.push(outPath);
      console.log(`[export-docs] Generado: ${outPath}`);
    }

    // 2. Exportar bonos
    const bonusesDir = path.join(nicheDir, 'bonuses');
    if (fs.existsSync(bonusesDir)) {
      const bonuses = fs.readdirSync(bonusesDir).filter(f => f.endsWith('.md')).sort();
      bonuses.forEach((bonusFile, idx) => {
        const bPath = path.join(bonusesDir, bonusFile);
        const bContent = fs.readFileSync(bPath, 'utf8');
        const bTitle = (bContent.split('\n')[0] || '').replace(/^#\s*/, '').trim() || `Bono #${idx + 1}`;
        const bHtml = wrapHtmlTemplate(bTitle, markdownToHtml(bContent));
        const outPath = path.join(distDir, bonusFile.replace('.md', '.html'));
        fs.writeFileSync(outPath, bHtml, 'utf8');
        const canonicalName = `bono-${idx + 1}.html`;
        fs.writeFileSync(path.join(distDir, canonicalName), bHtml, 'utf8');
        if (fs.existsSync(funnelPublicDocs)) {
          fs.writeFileSync(path.join(funnelPublicDocs, canonicalName), bHtml, 'utf8');
        }
        if (fs.existsSync(funnelDistDocs)) {
          fs.writeFileSync(path.join(funnelDistDocs, canonicalName), bHtml, 'utf8');
        }
        generatedFiles.push(outPath);
        console.log(`[export-docs] Generado: ${outPath} (-> /docs/${canonicalName})`);
      });
    }
  }

  return generatedFiles;
}

if (require.main === module) {
  exportAllProductsToHtml();
}

module.exports = {
  markdownToHtml,
  wrapHtmlTemplate,
  exportAllProductsToHtml
};
