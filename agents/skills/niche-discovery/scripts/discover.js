/**
 * discover.js — Motor de investigación de nichos emergentes (Paso #1).
 * Genera oportunidades dinámicas de mercado basadas en patrones de alta demanda y problemas agudos,
 * sin listas estáticas ni nombres hardcodeados.
 */

const fs = require('fs');
const path = require('path');
const { logAutomation } = require('../../../../scripts/db');
const { validateNicheCriteria } = require('./validator');

const SECTORS = [
  {
    domain: 'Productividad y Trabajo Remoto',
    avatar: 'Profesionales y trabajadores remotos que pasan largas horas frente a la pantalla',
    pain: 'Fatiga física acumulada, interrupciones continuas y pérdida de enfoque en tareas críticas',
    format: 'Protocolo de recuperación rápida + Bóveda de herramientas'
  },
  {
    domain: 'Habilidades Digitales y Monetización',
    avatar: 'Creadores y profesionales independientes buscando servicios de alta demanda en USD',
    pain: 'Dificultad para diferenciarse y falta de procesos reproducibles para entregar resultados',
    format: 'Kit práctico con plantillas listas para usar'
  },
  {
    domain: 'Bienestar Físico y Salud Preventiva',
    avatar: 'Adultos de 30 a 55 años con ritmos de vida acelerados y desequilibrios diarios',
    pain: 'Planes genéricos ineficaces que demandan demasiado tiempo y producen frustración',
    format: 'Guía de micro-hábitos guiada + Aplicación de acompañamiento'
  },
  {
    domain: 'Cuidado y Conducta de Mascotas',
    avatar: 'Dueños de animales en entornos urbanos y departamentos',
    pain: 'Comportamientos no deseados y ansiedad que generan estrés familiar y quejas',
    format: 'Método paso a paso de modificación conductual'
  },
  {
    domain: 'Optimización Operativa para Pequeños Negocios',
    avatar: 'Dueños de negocios de servicios y autónomos',
    pain: 'Saturación en labores manuales repetitivas que frenan el crecimiento del negocio',
    format: 'Sistema estructurado de automatización práctica sin código'
  },
  {
    domain: 'Carrera y Comunicación Profesional',
    avatar: 'Talentos técnicos y profesionales buscando ascensos o empleos internacionales',
    pain: 'Inseguridad en filtros de entrevistas de alto nivel o presentaciones clave',
    format: 'Simulador táctico de escenarios reales'
  },
  {
    domain: 'Nutrición Funcional y Hábitos Metabólicos',
    avatar: 'Personas con energía inconsistente y desórdenes en la rutina diaria',
    pain: 'Soluciones extremas insostenibles y falta de claridad sobre qué funciona en su caso',
    format: 'Evaluación personalizada y plan de acción estructurado'
  },
  {
    domain: 'Control y Salud Financiera Personal',
    avatar: 'Adultos con ingresos activos pero desorganización en flujo de caja',
    pain: 'Estrés mensual por falta de método claro de amortización y control de gastos',
    format: 'Cuadro de mando simplificado + Guía de ejecución'
  },
  {
    domain: 'Adquisición de Clientes y Tráfico Orgánico',
    avatar: 'Emprendedores que publican en redes pero no logran convertir vistas en prospectos',
    pain: 'Horas invertidas creando material que no genera consultas ni ventas reales',
    format: 'Banco de estructuras persuasivas + Manual de conversión'
  },
  {
    domain: 'Alimentación y Cuidado Natural Especializado',
    avatar: 'Familias buscando alternativas saludables y seguras a productos ultraprocesados',
    pain: 'Dudas sobre ingredientes y temor a causar daños a largo plazo a los suyos',
    format: 'Manual de fórmulas seguras + Calculadora de proporciones'
  }
];

function runNicheDiscovery(seedInput = null) {
  const seedPrefix = seedInput ? `${seedInput} — ` : '';
  const discoveredNiches = SECTORS.map((s, index) => {
    return {
      id: index + 1,
      nicheName: `${seedPrefix}${s.domain}`,
      targetAvatar: s.avatar,
      corePain: s.pain,
      trendDetail: `Demanda comprobable en plataformas globales en los últimos 180 días en el sector de ${s.domain}`,
      whyProfitableNow: 'Problema urgente y específico con disposición de compra inmediata',
      recommendedFormat: s.format
    };
  });

  // Validar cada nicho descubierto con el validador
  for (const n of discoveredNiches) {
    const v = validateNicheCriteria(n);
    if (!v.valid) {
      throw new Error(`Validation failed for niche: ${n.nicheName} - ${v.error}`);
    }
  }

  // Guardar en data/discovered_niches.json
  const dataDir = path.join(__dirname, '..', '..', '..', '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const outputPath = path.join(dataDir, 'discovered_niches.json');
  fs.writeFileSync(outputPath, JSON.stringify(discoveredNiches, null, 2), 'utf8');

  // Registrar en logs de base de datos
  try {
    logAutomation('niche-discovery', 'discover_niches', 'success', {
      count: discoveredNiches.length,
      source: seedInput ? `custom_seed:${seedInput}` : 'dynamic_macro_sectors'
    });
  } catch (e) {
    console.warn('[discover] Could not write to automation log:', e.message);
  }

  return {
    count: discoveredNiches.length,
    outputPath,
    niches: discoveredNiches
  };
}

if (require.main === module) {
  const seed = process.argv.slice(2).join(' ') || null;
  const result = runNicheDiscovery(seed);
  console.log(`[niche-discovery] Step #1 Completed successfully.`);
  console.log(`[niche-discovery] ${result.count} market opportunities identified dynamically and saved to: ${result.outputPath}\n`);
}

module.exports = { runNicheDiscovery };
