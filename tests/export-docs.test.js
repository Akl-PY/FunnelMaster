const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { markdownToHtml, wrapHtmlTemplate } = require('../scripts/export-docs');

describe('Deliverables Document Exporter (export-docs.js)', () => {
  test('markdownToHtml converts markdown formatting to semantic HTML tags', () => {
    const md = '# Titulo Principal\n\n## Subtitulo\n\n- [ ] Checklist item\n\n**Importante**: texto';
    const html = markdownToHtml(md);
    assert.match(html, /<h1>Titulo Principal<\/h1>/);
    assert.match(html, /<h2>Subtitulo<\/h2>/);
    assert.match(html, /class="check-item"/);
    assert.match(html, /<strong>Importante<\/strong>/);
  });

  test('wrapHtmlTemplate includes print styles and window.print button', () => {
    const wrapped = wrapHtmlTemplate('Guía Test', '<p>Contenido</p>');
    assert.match(wrapped, /@media print/);
    assert.match(wrapped, /window\.print\(\)/);
    assert.match(wrapped, /<title>Guía Test<\/title>/);
  });

  test('Physical dist_html directory exists with compiled HTML files', (t) => {
    const productsRoot = path.join(__dirname, '..', 'products');
    if (!fs.existsSync(productsRoot)) {
      t.skip('products/ directory not yet generated');
      return;
    }
    const subdirs = fs.readdirSync(productsRoot);
    if (subdirs.length === 0) {
      t.skip('No products generated yet');
      return;
    }

    const distDir = path.join(productsRoot, subdirs[0], 'dist_html');
    assert.strictEqual(fs.existsSync(distDir), true, 'dist_html must exist');

    const htmlFiles = fs.readdirSync(distDir);
    assert.ok(htmlFiles.length >= 4, 'Must have at least 4 compiled HTML files in dist_html');
    assert.ok(htmlFiles.includes('master-guide.html'));
  });
});
