const { test, describe } = require('node:test');
const assert = require('node:assert');
const { checkAntiLlmRules, checkRequiredBlocks, REQUIRED_BLOCKS } = require('../agents/skills/funnel-copywriter/scripts/linter');

describe('Funnel Copywriter & Anti-LLM Linter', () => {
  test('Clean, persuasive copy must pass Anti-LLM check', () => {
    const naturalCopy = `
      Si pasas más de 3 horas al día respondiendo mensajes en frío sin cerrar ni una llamada,
      el problema no es tu precio: es tu mecanismo de prospección.
      Con este método automatizas el 80% de la calificación antes de que agenden en tu calendario.
    `;
    const result = checkAntiLlmRules(naturalCopy);
    assert.strictEqual(result.passed, true);
    assert.strictEqual(result.violations.length, 0);
  });

  test('Clichés like "desbloquea tu potencial" or "en el vertiginoso mundo" must be blocked', () => {
    const aiCopy = 'En el vertiginoso mundo actual, desbloquea tu potencial y lleva tu negocio al siguiente nivel.';
    const result = checkAntiLlmRules(aiCopy);
    assert.strictEqual(result.passed, false);
    assert.strictEqual(result.violations.length >= 2, true);
  });

  test('Excessive em-dashes must be flagged', () => {
    const dashedCopy = 'Esto es una prueba — con una pausa — y otra pausa — y otra más — que satura el texto.';
    const result = checkAntiLlmRules(dashedCopy);
    assert.strictEqual(result.passed, false);
    assert.match(result.violations[0], /em-dashes/);
  });

  test('All 11 blocks of Hero Journey must be present', () => {
    const validBlocks = {};
    for (const b of REQUIRED_BLOCKS) {
      validBlocks[b] = 'Contenido representativo';
    }

    const check = checkRequiredBlocks(validBlocks);
    assert.strictEqual(check.complete, true);
    assert.strictEqual(check.missing.length, 0);
  });

  test('Missing blocks must be identified accurately', () => {
    const incompleteBlocks = {
      headline: 'Título ganador',
      lead_pain: 'Dolor del avatar'
    };

    const check = checkRequiredBlocks(incompleteBlocks);
    assert.strictEqual(check.complete, false);
    assert.strictEqual(check.missing.includes('faq'), true);
    assert.strictEqual(check.missing.includes('value_stack_offer'), true);
  });
});
