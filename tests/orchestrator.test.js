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
});
