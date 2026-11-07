/**
 * agents/skills/dm-automation/scripts/generate-flows.js
 * Genera especificaciones y JSON de flujos para ManyChat e Instagram DMs.
 */

const fs = require('fs');
const path = require('path');
const { logAutomation } = require('../../../../scripts/db');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function loadData() {
  const offerJsonPath = path.join(__dirname, '..', '..', '..', '..', 'data', 'active_offer.json');
  if (!fs.existsSync(offerJsonPath)) {
    throw new Error('No se encontro data/active_offer.json.');
  }
  return JSON.parse(fs.readFileSync(offerJsonPath, 'utf8'));
}

function buildManychatJson(offer, niche) {
  const productName = offer.product_name;
  const mechanism = offer.unique_mechanism;

  return {
    version: '2.0',
    name: `Funnel DM Automation - ${productName}`,
    triggers: [
      { type: 'keyword', value: 'RESET' },
      { type: 'keyword', value: 'SUENO' },
      { type: 'keyword', value: 'GUIA' },
      { type: 'comment_reply', post_type: 'reels_and_posts' }
    ],
    nodes: [
      {
        id: 'node_1_greeting',
        type: 'send_message',
        text: `¡Hola! 👋 Vi tu comentario pidiendo el acceso al ${productName}.`,
        quick_replies: [
          { text: 'Quiero ver el test 🎯', next_node: 'node_2_quiz' },
          { text: 'Ver la guía completa 📖', next_node: 'node_3_landing' }
        ]
      },
      {
        id: 'node_2_quiz',
        type: 'send_message',
        text: `Genial. Primero te recomiendo hacer el Test de Diagnóstico de 60 segundos para saber exactamente cómo está tu ritmo hormonal:\n\n👉 https://tudominio.com/quiz?utm_source=instagram&utm_medium=dm_manychat&utm_campaign=keyword_reset`,
        next_node: 'node_followup'
      },
      {
        id: 'node_3_landing',
        type: 'send_message',
        text: `Aquí tienes la página completa con el método ${mechanism} y sus 4 bonos de implementación:\n\n👉 https://tudominio.com/?utm_source=instagram&utm_medium=dm_manychat&utm_campaign=keyword_reset`,
        next_node: 'node_followup'
      },
      {
        id: 'node_followup',
        type: 'delay',
        time_minutes: 120,
        next_node: 'node_check'
      },
      {
        id: 'node_check',
        type: 'send_message',
        text: `¿Pudiste abrir el enlace o prefieres que te responda alguna duda por aquí? Cuéntame y te ayudo 😊`
      }
    ]
  };
}

function buildManychatGuide(offer, niche) {
  const productName = offer.product_name;

  return `# Guía Operativa de Automatización DM (ManyChat & Instagram)
## Embudo de Conversión por Mensaje Privado

---

## 1. Disparadores Clave para ManyChat
Configura estos triggers en tu cuenta de ManyChat conectada a tu cuenta profesional de Instagram:

- **Trigger 1**: Comentario en publicación o Reel que contenga la palabra \`RESET\`, \`SUEÑO\` o \`GUIA\`.
- **Trigger 2**: Mensaje Directo iniciado por el usuario con cualquiera de esas palabras clave.
- **Trigger 3**: Respuesta a historias donde se hable de fatiga, cortisol o desinflamación.

---

## 2. Guion de Conversación Paso a Paso

### Mensaje 1 (Inmediato - 5 segundos tras el comentario)
> *"¡Hola [Nombre]! 👋 Vi tu comentario en mi video sobre el reseteo hormonal.\n\nPara enviarte el recurso correcto: ¿prefieres hacer el Test Diagnóstico de 60 segundos para evaluar tus síntomas, o quieres ir directo a la guía de 21 días?"*

**Botones de respuesta rápida**:
- [Hacer el Test de 60s]
- [Ver la Guía de 21 Días]

### Mensaje 2A (Si elige el Test)
> *"Perfecto, aquí tienes el enlace directo:\n👉 https://tudominio.com/quiz?utm_source=instagram&utm_medium=dm_quiz\n\nResponde las 5 preguntas y al final te mostrará tu índice de resistencia metabólica."*

### Mensaje 2B (Si elige la Guía)
> *"Excelente, aquí tienes el detalle completo del método y los 4 bonos incluidos hoy:\n👉 https://tudominio.com/?utm_source=instagram&utm_medium=dm_landing"*

### Mensaje 3 (Seguimiento automático a las 2 horas)
> *"Hola [Nombre], ¿pudiste ver la información o tienes alguna consulta puntual sobre tu caso? Avísame y con gusto te oriento 😊"*

---

## 3. Atribución y Tracking UTM
Cada enlace enviado por mensaje privado contiene etiquetas UTM pre-configuradas para medir en Google Analytics y en el checkout exactamente cuántas ventas se originaron desde ManyChat.
`;
}

function runDmAutomationGeneration() {
  console.log('[dm-automation] Starting DM Automation generation...');
  const data = loadData();
  const offer = data.reengineeredOffer || data.offer;
  const niche = data.niche;

  const nicheSlug = slugify(niche.niche_name || 'salud-hormonal');
  const automationsDir = path.join(__dirname, '..', '..', '..', '..', 'automations', nicheSlug);

  if (!fs.existsSync(automationsDir)) {
    fs.mkdirSync(automationsDir, { recursive: true });
  }

  // 1. JSON de Manychat
  const jsonFlow = buildManychatJson(offer, niche);
  const jsonPath = path.join(automationsDir, 'manychat-flow.json');
  fs.writeFileSync(jsonPath, JSON.stringify(jsonFlow, null, 2), 'utf8');
  console.log(`[dm-automation] Manychat JSON flow generated at: ${jsonPath}`);

  // 2. Guía de configuración
  const guideContent = buildManychatGuide(offer, niche);
  const guidePath = path.join(automationsDir, 'manychat-guide.md');
  fs.writeFileSync(guidePath, guideContent, 'utf8');
  console.log(`[dm-automation] Manychat Guide generated at: ${guidePath}`);

  // 3. Log en BD
  try {
    logAutomation('dm-automation', 'generate_flows', 'success', {
      productName: offer.product_name,
      nicheSlug,
      flowFile: 'manychat-flow.json',
      guideFile: 'manychat-guide.md'
    });
  } catch (e) {
    console.warn('[dm-automation] DB log skipped:', e.message);
  }

  console.log('[dm-automation] DM Automation completed successfully.');
  return {
    automationsDir,
    jsonPath,
    guidePath
  };
}

if (require.main === module) {
  try {
    runDmAutomationGeneration();
  } catch (err) {
    console.error('[dm-automation] Error:', err.message);
    process.exit(1);
  }
}

module.exports = {
  runDmAutomationGeneration,
  buildManychatJson,
  buildManychatGuide
};
