/**
 * scripts/llm.js — Motor Unificado de Inteligencia Artificial para FunnelMaster.
 * Soporta Google Gemini, OpenAI, Anthropic Claude, Groq y OpenRouter de forma nativa (cero dependencias).
 */

const fs = require('fs');
const path = require('path');

// Cargar variables de .env si existe
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...vals] = trimmed.split('=');
      const val = vals.join('=').replace(/(^["']|["']$)/g, '');
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = val.trim();
      }
    }
  }
}

loadEnv();

function getActiveProvider() {
  loadEnv();
  if (process.env.GEMINI_API_KEY) return { provider: 'gemini', key: process.env.GEMINI_API_KEY };
  if (process.env.OPENAI_API_KEY) return { provider: 'openai', key: process.env.OPENAI_API_KEY };
  if (process.env.ANTHROPIC_API_KEY) return { provider: 'anthropic', key: process.env.ANTHROPIC_API_KEY };
  if (process.env.GROQ_API_KEY) return { provider: 'groq', key: process.env.GROQ_API_KEY };
  if (process.env.OPENROUTER_API_KEY) return { provider: 'openrouter', key: process.env.OPENROUTER_API_KEY };
  return { provider: 'heuristic', key: null };
}

async function callGemini(prompt, systemPrompt, apiKey) {
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `${systemPrompt ? systemPrompt + '\n\n' : ''}${prompt}` }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2500
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API Error (${res.status}): ${errText}`);
  }

  const json = await res.json();
  return json.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callOpenAI(prompt, systemPrompt, apiKey) {
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const url = 'https://api.openai.com/v1/chat/completions';

  const messages = [];
  if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
  messages.push({ role: 'user', content: prompt });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ model, messages, temperature: 0.7 })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API Error (${res.status}): ${errText}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content || '';
}

async function callAnthropic(prompt, systemPrompt, apiKey) {
  const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022';
  const url = 'https://api.anthropic.com/v1/messages';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 2500,
      system: systemPrompt || 'Eres un estratega experto de embudos de venta y copywriting.',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic API Error (${res.status}): ${errText}`);
  }

  const json = await res.json();
  return json.content?.[0]?.text || '';
}

async function callGroq(prompt, systemPrompt, apiKey) {
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const messages = [];
  if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
  messages.push({ role: 'user', content: prompt });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ model, messages, temperature: 0.7 })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API Error (${res.status}): ${errText}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content || '';
}

/**
 * Función principal para generar texto usando la IA configurada.
 */
async function generateAiText(prompt, systemPrompt = '') {
  const { provider, key } = getActiveProvider();

  try {
    if (provider === 'gemini' && key) {
      return await callGemini(prompt, systemPrompt, key);
    }
    if (provider === 'openai' && key) {
      return await callOpenAI(prompt, systemPrompt, key);
    }
    if (provider === 'anthropic' && key) {
      return await callAnthropic(prompt, systemPrompt, key);
    }
    if (provider === 'groq' && key) {
      return await callGroq(prompt, systemPrompt, key);
    }
  } catch (err) {
    console.warn(`[llm] Falló la llamada al proveedor ${provider}: ${err.message}. Usando motor heurístico.`);
  }

  // Fallback heurístico inteligente
  return null;
}

function saveApiKeyToEnv(keyName, keyValue) {
  const envPath = path.join(__dirname, '..', '.env');
  let currentContent = '';
  if (fs.existsSync(envPath)) {
    currentContent = fs.readFileSync(envPath, 'utf8');
  }

  const regex = new RegExp(`^${keyName}=.*$`, 'm');
  if (regex.test(currentContent)) {
    currentContent = currentContent.replace(regex, `${keyName}=${keyValue}`);
  } else {
    currentContent += (currentContent.endsWith('\n') ? '' : '\n') + `${keyName}=${keyValue}\n`;
  }

  fs.writeFileSync(envPath, currentContent, 'utf8');
  process.env[keyName] = keyValue;
  console.log(`[llm] ${keyName} guardada correctamente en .env.`);
}

module.exports = {
  loadEnv,
  getActiveProvider,
  generateAiText,
  saveApiKeyToEnv
};
