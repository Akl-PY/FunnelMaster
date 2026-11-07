/**
 * scripts/export-docs.js — Compila entregables Markdown a HTML maquetados para impresión / PDF.
 */

const fs = require('fs');
const path = require('path');

function markdownToHtml(md) {
  let html = md
    // Encabezados
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Negrita e itálica
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
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
  <title>${title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
    
    body {
      font-family: 'Lora', Georgia, serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1a202c;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      background: #ffffff;
    }
    
    h1, h2, h3, .brand-font {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #0f172a;
    }

    h1 {
      font-size: 24pt;
      border-bottom: 2px solid #10b981;
      padding-bottom: 8px;
      margin-top: 0;
    }

    h2 {
      font-size: 16pt;
      color: #047857;
      margin-top: 28px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
    }

    h3 {
      font-size: 13pt;
      margin-top: 20px;
    }

    .check-item {
      margin: 6px 0;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 10pt;
    }

    .box {
      font-size: 14pt;
      color: #10b981;
      margin-right: 6px;
    }

    blockquote {
      border-left: 4px solid #10b981;
      margin: 16px 0;
      padding: 8px 16px;
      background: #f0fdf4;
      font-style: italic;
    }

    li {
      margin-bottom: 4px;
    }

    hr {
      border: 0;
      height: 1px;
      background: #e2e8f0;
      margin: 24px 0;
    }

    .print-bar {
      position: sticky;
      top: 10px;
      background: #0f172a;
      color: white;
      padding: 12px 20px;
      border-radius: 12px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    }

    .print-btn {
      background: #10b981;
      color: #022c22;
      border: none;
      padding: 8px 16px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    @media print {
      .print-bar { display: none; }
      body { padding: 0; }
      h2 { page-break-after: avoid; }
      .check-item { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <span class="brand-font font-bold">FunnelMaster Docs · Listo para Entregar</span>
    <button class="print-btn" onclick="window.print()">🖨️ Imprimir / Guardar como PDF</button>
  </div>
  ${bodyHtml}
</body>
</html>`;
}

function exportAllProductsToHtml() {
  const productsRoot = path.join(__dirname, '..', 'products');
  if (!fs.existsSync(productsRoot)) {
    console.warn('[export-docs] No existe la carpeta products/.');
    return [];
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
      const html = wrapHtmlTemplate('Guía Maestra 21 Días', markdownToHtml(content));
      const outPath = path.join(distDir, 'master-guide.html');
      fs.writeFileSync(outPath, html, 'utf8');
      generatedFiles.push(outPath);
      console.log(`[export-docs] Generado: ${outPath}`);
    }

    // 2. Exportar bonos
    const bonusesDir = path.join(nicheDir, 'bonuses');
    if (fs.existsSync(bonusesDir)) {
      const bonuses = fs.readdirSync(bonusesDir);
      for (const bonusFile of bonuses) {
        if (!bonusFile.endsWith('.md')) continue;
        const bPath = path.join(bonusesDir, bonusFile);
        const bContent = fs.readFileSync(bPath, 'utf8');
        const bHtml = wrapHtmlTemplate(bonusFile.replace('.md', ''), markdownToHtml(bContent));
        const outPath = path.join(distDir, bonusFile.replace('.md', '.html'));
        fs.writeFileSync(outPath, bHtml, 'utf8');
        generatedFiles.push(outPath);
        console.log(`[export-docs] Generado: ${outPath}`);
      }
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
