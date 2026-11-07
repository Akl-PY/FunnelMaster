/**
 * scripts/wizard.js — Master CLI Wizard para FunnelMaster.
 * Permite a cualquier usuario operar el generador de embudos paso a paso o en modo autónomo.
 */

const readline = require('readline');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { calculateFunnelEconomics, printEconomicsReport } = require('./simulate-roas');

function runStep(title, command) {
  console.log(`\n======================================================`);
  console.log(`▶ EJECUTANDO: ${title}`);
  console.log(`Comando: ${command}`);
  console.log(`======================================================`);
  try {
    execSync(command, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log(`✓ ${title} completado con éxito.\n`);
    return true;
  } catch (err) {
    console.error(`✗ Error al ejecutar ${title}:`, err.message);
    return false;
  }
}

function showMenu() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    FUNNELMASTER CLI 🚀                       ║
║        Framework de Generación Rápida de Embudos con IA      ║
╚══════════════════════════════════════════════════════════════╝

Selecciona una opción:

  [1]  Investigar y Auditar Nicho en Meta Ads (Pasos #1-#4)
  [2]  Rediseñar Oferta, Mecanismo Único y Bonos (Pasos #5-#6)
  [3]  Generar Copy Persuasivo de 11 Bloques (Paso #7)
  [4]  Generar Perfect Prompt para Lovable/v0 (Paso #8A)
  [5]  Construir Landing Page y Quiz en Astro (Paso #8B)
  [6]  Crear Contenido del Infoproducto y 4 Bonos (Paso #9)
  [7]  Generar Setup de Checkout y Campaña Meta Ads (Pasos #10-#11)
  [8]  Generar Contenido Orgánico y Secuencia de Email
  [9]  Generar Flujos ManyChat y Recuperación por WhatsApp
  [10] Simular Métricas Financieras, AOV y ROAS
  
  [11] ⚡ EJECUTAR PIPELINE COMPLETO DE PUNTA A PUNTA (1-Click)
  [0]  Salir
`);
}

function runFullPipeline() {
  console.log('\n🚀 INICIANDO EJECUCIÓN COMPLETA DEL PIPELINE AUTÓNOMO...');
  const steps = [
    { title: 'Auditoría de Nicho en Meta Ads', cmd: 'node agents/skills/niche-discovery/scripts/audit-niche.js' },
    { title: 'Rediseño de Oferta y Mecanismo Único', cmd: 'node agents/skills/offer-reengineer/scripts/reengineer.js' },
    { title: 'Redacción de Copy Persuasivo (11 Bloques)', cmd: 'node agents/skills/funnel-copywriter/scripts/write-copy.js' },
    { title: 'Generación de Prompt para Constructores Web IA', cmd: 'node agents/skills/prompt-web-maker/scripts/generate-prompt.js' },
    { title: 'Construcción de Landing Page y Quiz en Astro', cmd: 'node agents/skills/landing-builder/scripts/build-funnel.js' },
    { title: 'Creación de Producto Digital y Bonos', cmd: 'node agents/skills/product-generator/scripts/generate-product.js' },
    { title: 'Setup de Checkout y Campaña Meta Ads', cmd: 'node agents/skills/traffic-launcher/scripts/generate-campaign.js' },
    { title: 'Generación de Contenido Orgánico y Email Marketing', cmd: 'node agents/skills/content-creator/scripts/generate-content.js' },
    { title: 'Automatización de ManyChat y Recuperación WhatsApp', cmd: 'node agents/skills/dm-automation/scripts/generate-flows.js ; node agents/skills/cart-recovery/scripts/generate-recovery.js' }
  ];

  for (const step of steps) {
    const ok = runStep(step.title, step.cmd);
    if (!ok) {
      console.error(`\n⚠️ Pipeline detenido debido a un error en: ${step.title}`);
      return false;
    }
  }

  console.log('\n✨ ¡PIPELINE COMPLETO EJECUTADO CON ÉXITO AL 100%!');
  printEconomicsReport(calculateFunnelEconomics());
  return true;
}

function handleOption(option, rl) {
  switch (option.trim()) {
    case '1':
      runStep('Auditoría de Nicho', 'node agents/skills/niche-discovery/scripts/audit-niche.js');
      promptUser(rl);
      break;
    case '2':
      runStep('Rediseño de Oferta', 'node agents/skills/offer-reengineer/scripts/reengineer.js');
      promptUser(rl);
      break;
    case '3':
      runStep('Copy Persuasivo', 'node agents/skills/funnel-copywriter/scripts/write-copy.js');
      promptUser(rl);
      break;
    case '4':
      runStep('Prompt Web Maker', 'node agents/skills/prompt-web-maker/scripts/generate-prompt.js');
      promptUser(rl);
      break;
    case '5':
      runStep('Landing Builder', 'node agents/skills/landing-builder/scripts/build-funnel.js');
      promptUser(rl);
      break;
    case '6':
      runStep('Product Generator', 'node agents/skills/product-generator/scripts/generate-product.js');
      promptUser(rl);
      break;
    case '7':
      runStep('Campaña Meta Ads y Checkout', 'node agents/skills/traffic-launcher/scripts/generate-campaign.js');
      promptUser(rl);
      break;
    case '8':
      runStep('Contenido Orgánico y Email', 'node agents/skills/content-creator/scripts/generate-content.js');
      promptUser(rl);
      break;
    case '9':
      runStep('ManyChat y WhatsApp', 'node agents/skills/dm-automation/scripts/generate-flows.js ; node agents/skills/cart-recovery/scripts/generate-recovery.js');
      promptUser(rl);
      break;
    case '10':
      printEconomicsReport(calculateFunnelEconomics());
      promptUser(rl);
      break;
    case '11':
      runFullPipeline();
      promptUser(rl);
      break;
    case '0':
      console.log('\n¡Hasta pronto! Recuerda que tu landing está lista en /funnel.');
      rl.close();
      break;
    default:
      console.log('\nOpción no válida. Por favor ingresa un número del 0 al 11.');
      promptUser(rl);
      break;
  }
}

function promptUser(rl) {
  showMenu();
  rl.question('Ingresa tu opción [0-11]: ', (answer) => {
    handleOption(answer, rl);
  });
}

function startCli() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  promptUser(rl);
}

if (require.main === module) {
  startCli();
}

module.exports = {
  runFullPipeline,
  runStep,
  handleOption
};
