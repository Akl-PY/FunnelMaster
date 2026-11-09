/**
 * scripts/agent.js — Agente Autónomo Interactivo de FunnelMaster.
 * Permite a cualquier usuario interactuar con el agente en lenguaje natural,
 * configurar sus modelos de IA (Gemini, OpenAI, Claude, Groq) y generar embudos completos desde cero.
 */

const readline = require('readline');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { getActiveProvider, generateAiText, saveApiKeyToEnv } = require('./llm');
const { calculateFunnelEconomics, printEconomicsReport } = require('./simulate-roas');
const { saveNiche, saveOffer, logAutomation } = require('./db');

function clearScreen() {
  process.stdout.write('\x1Bc');
}

function showBanner() {
  const { provider } = getActiveProvider();
  const providerLabel = {
    gemini: 'Google Gemini (Activo 🟢)',
    openai: 'OpenAI GPT-4o (Activo 🟢)',
    anthropic: 'Claude 3.5 (Activo 🟢)',
    groq: 'Groq Llama 3 (Activo 🟢)',
    heuristic: 'Motor Heurístico Local (Sin API Key 🟡)'
  }[provider] || 'Heurístico Local';

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                🤖 FUNNELMASTER AGENT CLI                     ║
║      Copiloto Autónomo de Embudos de Conversión con IA       ║
╚══════════════════════════════════════════════════════════════╝
  Motor de Inteligencia Artificial: [ ${providerLabel} ]
  Repositorio: FunnelMaster (11 Pasos Automatizados)
`);
}

function showMenu() {
  console.log(`Selecciona el modo de interacción con el agente:

  [1] 🤖 Crear Nuevo Embudo desde Cero (Asistente Guiado de Nicho & Avatar)
  [2] 💬 Chat Conversacional con el Agente FunnelMaster
  [3] ⚡ Ejecutar Pipeline Completo (1-Click para el Nicho Activo)
  [4] 🌐 Iniciar Servidor Web & Dashboard (Puertos 3003 y 3004)
  [5] 🔑 Configurar API Key de IA (Gemini / OpenAI / Claude / Groq)
  [6] 📊 Simular Rentabilidad, AOV y ROAS
  
  [0] Salir
`);
}

function runCommand(title, command) {
  console.log(`\n======================================================`);
  console.log(`▶ AGENTE EJECUTANDO: ${title}`);
  console.log(`======================================================`);
  try {
    execSync(command, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log(`✓ ${title} completado.\n`);
    return true;
  } catch (err) {
    console.error(`✗ Error:`, err.message);
    return false;
  }
}

// Modo 1: Crear nuevo embudo con preguntas guiadas
async function createNewFunnelWizard(rl) {
  console.log('\n--- 🎯 CREAR NUEVO EMBUDO CON EL AGENTE ---');
  console.log('El agente te guiará para configurar tu nuevo producto:\n');

  rl.question('1. ¿Cuál es tu nicho o idea de negocio? (ej. "Adiestramiento de perros reactivos"): ', async (nicheAnswer) => {
    const nicheName = nicheAnswer.trim() || 'Salud Hormonal y Perimenopausia (+35/+40)';

    rl.question('2. ¿Quién es tu cliente ideal / avatar? (ej. "Dueños de perros que tiran de la correa"): ', async (avatarAnswer) => {
      const targetAvatar = avatarAnswer.trim() || 'Mujeres de 35 a 55 años con fatiga y cambios metabólicos';

      rl.question('3. ¿Cuál es el dolor o frustración número 1 que quieren resolver?: ', async (painAnswer) => {
        const corePain = painAnswer.trim() || 'Cansancio constante, hinchazón y falta de respuesta médica clara';

        rl.question('4. ¿Precio deseado para el producto frontend en USD? (default: $37): ', async (priceAnswer) => {
          const price = parseFloat(priceAnswer) || 37;

          console.log('\n🤖 Agente procesando tu nicho...');

          // Guardar el nuevo nicho en la base de datos
          const newNiche = saveNiche({
            niche_name: nicheName,
            macro_niche: 'General',
            target_avatar: targetAvatar,
            core_pain: corePain,
            active_ads_count: 50,
            validation_status: 'super_winner',
            competitor_url: 'https://ejemplo-competidor.com/vsl'
          });

          // Actualizar DATA.md
          const dataMdPath = path.join(__dirname, '..', 'DATA.md');
          let dataMd = fs.readFileSync(dataMdPath, 'utf8');
          dataMd = dataMd.replace(/- \*\*Nicho Activo\*\*:\s*.+/g, `- **Nicho Activo**: ${nicheName}`);
          fs.writeFileSync(dataMdPath, dataMd, 'utf8');

          // Guardar active_niche.json
          fs.writeFileSync(
            path.join(__dirname, '..', 'data', 'active_niche.json'),
            JSON.stringify(newNiche, null, 2),
            'utf8'
          );

          console.log(`\n✓ Nicho "${nicheName}" persistido en SQLite.`);
          console.log('🚀 Ejecutando agentes generadores para tu nuevo embudo...\n');

          // Ejecutar generadores
          runCommand('Rediseño de Oferta & Mecanismo Único', 'node agents/skills/offer-reengineer/scripts/reengineer.js');
          runCommand('Copy Persuasivo (11 Bloques)', 'node agents/skills/funnel-copywriter/scripts/write-copy.js');
          runCommand('Prompt para Constructores Web IA', 'node agents/skills/prompt-web-maker/scripts/generate-prompt.js');
          runCommand('Landing Page y Quiz en Astro', 'node agents/skills/landing-builder/scripts/build-funnel.js');
          runCommand('Contenido del Infoproducto y 4 Bonos', 'node agents/skills/product-generator/scripts/generate-product.js');
          runCommand('Campaña Meta Ads y Setup Checkout', 'node agents/skills/traffic-launcher/scripts/generate-campaign.js');
          runCommand('Contenido Orgánico y Secuencia de Email', 'node agents/skills/content-creator/scripts/generate-content.js');
          runCommand('ManyChat y WhatsApp Recovery', 'node agents/skills/dm-automation/scripts/generate-flows.js ; node agents/skills/cart-recovery/scripts/generate-recovery.js');
          runCommand('Compilación de Entregables a PDF/HTML', 'node scripts/export-docs.js');

          console.log('\n🎉 ¡EMBUDO CREADO CON ÉXITO PARA TU NUEVO NICHO!');
          console.log(`Puedes verlo en vivo en: http://localhost:3003`);
          promptUser(rl);
        });
      });
    });
  });
}

// Modo 2: Chat conversacional libre con el agente
function startChatMode(rl) {
  console.log('\n--- 💬 CHAT CONVERSACIONAL CON EL AGENTE FUNNELMASTER ---');
  console.log('Escribe tus preguntas sobre funnels, copys, ofertas o pídele redactar algo.');
  console.log('Escribe "menu" o "salir" para regresar al menú principal.\n');

  function chatLoop() {
    rl.question('Tú > ', async (input) => {
      const trimmed = input.trim();
      if (trimmed.toLowerCase() === 'salir' || trimmed.toLowerCase() === 'menu' || trimmed.toLowerCase() === 'exit') {
        promptUser(rl);
        return;
      }

      if (!trimmed) {
        chatLoop();
        return;
      }

      process.stdout.write('\n🤖 Agente pensando...');
      
      const systemPrompt = `Eres FunnelMaster AI, un estratega senior de embudos de venta, copywriting de respuesta directa y media buying.
Tu estilo es directo, analítico, persuasivo y accionable (estilo Anti-LLM: sin clichés, sin rodeos, respuestas claras y concisas).
Ayuda al usuario a optimizar ofertas, ganchos de anuncios, titulares, páginas de venta y mecánicas de conversión.`;

      const aiResponse = await generateAiText(trimmed, systemPrompt);

      if (aiResponse) {
        process.stdout.write('\r\x1b[K');
        console.log(`\n🤖 FunnelMaster >\n${aiResponse}\n`);
      } else {
        process.stdout.write('\r\x1b[K');
        console.log(`\n🤖 FunnelMaster (Modo Local) >
Entendido. Para darte respuestas generadas con IA en tiempo real en este chat de terminal, configura tu clave de Gemini, OpenAI o Claude en la opción [5] del menú principal.
Mientras tanto, puedes usar la opción [1] para generar automáticamente todos los copys y componentes de tu embudo.\n`);
      }

      chatLoop();
    });
  }

  chatLoop();
}

// Modo 5: Configurar API Key
function configureApiKey(rl) {
  console.log('\n--- 🔑 CONFIGURAR API KEY DE INTELIGENCIA ARTIFICIAL ---');
  console.log('Puedes usar cualquiera de estos proveedores:');
  console.log('  1. Google Gemini (GEMINI_API_KEY) — https://aistudio.google.com/');
  console.log('  2. OpenAI (OPENAI_API_KEY) — https://platform.openai.com/');
  console.log('  3. Anthropic Claude (ANTHROPIC_API_KEY) — https://console.anthropic.com/');
  console.log('  4. Groq Llama 3 (GROQ_API_KEY) — https://console.groq.com/\n');

  rl.question('¿Qué proveedor quieres configurar? [gemini/openai/anthropic/groq]: ', (providerAnswer) => {
    const prov = providerAnswer.trim().toLowerCase();
    let envVarName = 'GEMINI_API_KEY';

    if (prov === 'openai') envVarName = 'OPENAI_API_KEY';
    else if (prov === 'anthropic' || prov === 'claude') envVarName = 'ANTHROPIC_API_KEY';
    else if (prov === 'groq') envVarName = 'GROQ_API_KEY';

    rl.question(`Introduce tu ${envVarName}: `, (keyVal) => {
      const cleanKey = keyVal.trim();
      if (cleanKey) {
        saveApiKeyToEnv(envVarName, cleanKey);
        console.log(`✓ Clave configurada. Los agentes ahora usarán este modelo.`);
      } else {
        console.log('Operación cancelada.');
      }
      promptUser(rl);
    });
  });
}

// Manejador del menú
function handleOption(option, rl) {
  switch (option.trim()) {
    case '1':
      createNewFunnelWizard(rl);
      break;
    case '2':
      startChatMode(rl);
      break;
    case '3':
      runCommand('Pipeline Autónomo Completo', 'node scripts/wizard.js 11');
      promptUser(rl);
      break;
    case '4':
      console.log('\nLevantando servidores en segundo plano...');
      console.log('Landing & Dashboard: http://localhost:3003');
      console.log('Leads API: http://localhost:3004');
      runCommand('Astro Dev Server', 'cd funnel ; npx astro preview --port 3003 --host');
      promptUser(rl);
      break;
    case '5':
      configureApiKey(rl);
      break;
    case '6':
      printEconomicsReport(calculateFunnelEconomics());
      promptUser(rl);
      break;
    case '0':
      console.log('\n¡Hasta pronto! Tus embudos están listos en /funnel.');
      rl.close();
      process.exit(0);
      break;
    default:
      console.log('\nOpción no válida. Ingresa un número del 0 al 6.');
      promptUser(rl);
      break;
  }
}

function promptUser(rl) {
  showMenu();
  rl.question('Elige una opción [0-6]: ', (answer) => {
    handleOption(answer, rl);
  });
}

function startAgentCli() {
  clearScreen();
  showBanner();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  promptUser(rl);
}

if (require.main === module) {
  startAgentCli();
}

module.exports = {
  startAgentCli,
  handleOption
};
