const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('Orchestrator Skill & Contingency Rules', () => {
  const orchestratorMd = path.join(__dirname, '..', 'agents', 'skills', 'orchestrator', 'SKILL.md');

  test('orchestrator SKILL.md must exist and have frontmatter', () => {
    assert.strictEqual(fs.existsSync(orchestratorMd), true);
    const content = fs.readFileSync(orchestratorMd, 'utf8');
    assert.match(content, /^---\r?\nname:\s*orchestrator/m);
    assert.match(content, /description:\s*.+/m);
  });

  test('orchestrator must document /browser contingency for headless/sandbox limitations', () => {
    const content = fs.readFileSync(orchestratorMd, 'utf8');
    assert.match(content, /\/browser/);
    assert.match(content, /Sandbox/i);
    assert.match(content, /Cloudflare|captcha/i);
  });

  test('orchestrator must guide user on SQLite and PostgreSQL database persistence', () => {
    const content = fs.readFileSync(orchestratorMd, 'utf8');
    assert.match(content, /SQLite/i);
    assert.match(content, /PostgreSQL/i);
    assert.match(content, /DATABASE_URL/i);
  });

  test('orchestrator must cover the 4 pipeline phases of the 48h plan', () => {
    const content = fs.readFileSync(orchestratorMd, 'utf8');
    assert.match(content, /Fase 1/i);
    assert.match(content, /Fase 2/i);
    assert.match(content, /Fase 3/i);
    assert.match(content, /Fase 4/i);
  });

  test('orchestrator must strictly mandate execution-first and forbid chat simulations', () => {
    const content = fs.readFileSync(orchestratorMd, 'utf8');
    assert.match(content, /Prohibido Simular/i);
    assert.match(content, /Cero Simulaci[oó]n/i);
  });

  test('orchestrator must mandate guided Vercel deployment with /browser', () => {
    const content = fs.readFileSync(orchestratorMd, 'utf8');
    assert.match(content, /Fase 5/i);
    assert.match(content, /Vercel/i);
    assert.match(content, /\/browser/);
  });

  test('AGENTS.md and orchestrator must mandate plain language for non-programmers (Rule #16)', () => {
    const agentsMd = fs.readFileSync(path.join(__dirname, '..', 'AGENTS.md'), 'utf8');
    assert.match(agentsMd, /Regla.*16|16 — Comunicación Clara para No-Programadores/i);
    assert.match(agentsMd, /Cero Jerga T[ée]cnica/i);
    assert.match(agentsMd, /Prohibido mencionar nombres de archivos/i);

    const content = fs.readFileSync(orchestratorMd, 'utf8');
    assert.match(content, /No-Code First|Cero Jerga/i);
    assert.match(content, /Tu P[aá]gina de Ventas/i);
  });

  test('AGENTS.md and orchestrator must forbid hardcoded niche menus and enforce open discovery (Rule #17)', () => {
    const agentsMd = fs.readFileSync(path.join(__dirname, '..', 'AGENTS.md'), 'utf8');
    assert.match(agentsMd, /Regla.*17|17 — Prohibici[oó]n Absoluta de Men[uú]s Fijos/i);
    assert.match(agentsMd, /Open Market Discovery/i);
    assert.match(agentsMd, /Prohibido presentar men[uú]s cerrados/i);

    const content = fs.readFileSync(orchestratorMd, 'utf8');
    assert.match(content, /Regla 17|Inicio 100% Abierto/i);
  });
});
