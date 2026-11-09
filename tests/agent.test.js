const { test, describe } = require('node:test');
const assert = require('node:assert');
const { getActiveProvider, saveApiKeyToEnv } = require('../scripts/llm');
const { handleOption } = require('../scripts/agent');

describe('Autonomous Agent Engine & LLM Provider (scripts/agent.js & scripts/llm.js)', () => {
  test('getActiveProvider returns a valid provider state', () => {
    const active = getActiveProvider();
    assert.strictEqual(typeof active.provider, 'string');
    assert.ok(['gemini', 'openai', 'anthropic', 'groq', 'openrouter', 'heuristic'].includes(active.provider));
  });

  test('saveApiKeyToEnv records key properly', () => {
    saveApiKeyToEnv('TEST_MOCK_KEY', 'test_secret_123');
    assert.strictEqual(process.env.TEST_MOCK_KEY, 'test_secret_123');
  });

  test('agent.js exports callable handleOption', () => {
    assert.strictEqual(typeof handleOption, 'function');
  });
});
