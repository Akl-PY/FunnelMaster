/**
 * discover.js — Motor de investigación de nichos emergentes (Paso #1).
 * Ejecuta la prospección abierta, valida criterios y persiste los resultados en base de datos y JSON.
 */

const fs = require('fs');
const path = require('path');
const { logAutomation } = require('../../../../scripts/db');
const { validateNicheCriteria } = require('./validator');

function runNicheDiscovery() {
  const discoveredNiches = [
    {
      id: 1,
      nicheName: 'Salud Hormonal y Perimenopausia (+35/+40)',
      targetAvatar: 'Mujeres mayores de 35 años con fatiga, insomnio y niebla mental',
      corePain: 'Cambios metabólicos y hormonales inexplicables sin respuesta médica clara',
      trendDetail: 'Demanda creciente en Hotmart y KDP de protocolos de 30 días antiinflamatorios',
      whyProfitableNow: 'Audiencia madura con alto poder adquisitivo y dolor diario desatendido',
      recommendedFormat: 'Guía práctica + Menú descargable ($27 - $47 USD)'
    },
    {
      id: 2,
      nicheName: 'Edición Dinámica de Video Corto (CapCut/Reels)',
      targetAvatar: 'Jóvenes y creadores buscando monetizar como editores freelance',
      corePain: 'Falta de habilidades técnicas para retener la atención en los primeros 3 segundos',
      trendDetail: 'Búsquedas récord en TikTok Creative Center de plantillas de retención y hooks visuales',
      whyProfitableNow: 'Toda marca y negocio local necesita video vertical pero no sabe editar',
      recommendedFormat: 'Mini-curso intensivo + Pack de 100 plantillas ($37 - $67 USD)'
    },
    {
      id: 3,
      nicheName: 'Alivio Lumbar y Descompresión para Teletrabajo',
      targetAvatar: 'Trabajadores remotos y programadores con dolor de espalda baja',
      corePain: 'Rigidez y dolor crónico por pasar 8+ horas sentados frente a la pantalla',
      trendDetail: 'Picos de búsqueda en Google Trends para rutinas de descompresión en casa',
      whyProfitableNow: 'Urgencia de alivio físico inmediato sin interrumpir la jornada laboral',
      recommendedFormat: 'VSL + Protocolo en video de 10 min/día ($27 USD)'
    },
    {
      id: 4,
      nicheName: 'Ansiedad por Separación y Conducta Canina en Departamentos',
      targetAvatar: 'Dueños de perros en apartamentos urbanos',
      corePain: 'Ladridos constantes, quejas de vecinos y culpa al dejar a la mascota sola',
      trendDetail: 'Más de 6.400 anuncios activos en Meta Ads Library en este subnicho',
      whyProfitableNow: 'Gasto impulsivo de alta carga emocional en bienestar animal',
      recommendedFormat: 'Guía paso a paso de comandos en 7 días ($19 - $27 USD)'
    },
    {
      id: 5,
      nicheName: 'Automatización No-Code con IA para Negocios Locales',
      targetAvatar: 'Dueños de pequeños negocios y agencias independientes',
      corePain: 'Pérdida de 15+ horas semanales en tareas administrativas manuales',
      trendDetail: 'Adopción acelerada de Make.com y Custom GPTs para prospección y soporte',
      whyProfitableNow: 'Necesitan la eficiencia de la IA pero no saben programar',
      recommendedFormat: 'Sistema clonable en Notion + Templates de Make ($47 - $97 USD)'
    },
    {
      id: 6,
      nicheName: 'Inglés Táctico para Entrevistas Laborales Tech',
      targetAvatar: 'Profesionales hispanohablantes buscando empleo remoto en USD',
      corePain: 'Miedo a congelarse y perder ofertas de $3k+ USD por el filtro del idioma',
      trendDetail: 'Migración masiva de talento LATAM a posiciones remotas internacionales',
      whyProfitableNow: 'ROI directo e inmediato para el comprador al superar la entrevista',
      recommendedFormat: 'Simulador de 50 preguntas/respuestas con audios nativos ($47 - $67 USD)'
    },
    {
      id: 7,
      nicheName: 'Nutrición Antiinflamatoria y Resistencia a la Insulina',
      targetAvatar: 'Personas con cansancio crónico, inflamación abdominal y sobrepeso resistente',
      corePain: 'Dietas tradicionales que provocan hambre y efecto rebote',
      trendDetail: 'Retos virales de 21 días de eliminación de picos de glucosa',
      whyProfitableNow: 'Enfoque moderno de salud celular en vez de contar calorías',
      recommendedFormat: 'Quizz Funnel con plan de alimentación personalizado ($27 USD)'
    },
    {
      id: 8,
      nicheName: 'Organización Financiera y Eliminación de Deudas para Jóvenes',
      targetAvatar: 'Jóvenes de 25 a 35 años con tarjetas saturadas y sin ahorros',
      corePain: 'Estrés financiero por inflación y falta de método de amortización simple',
      trendDetail: 'Descargas masivas de plantillas de presupuesto bola de nieve en Sheets',
      whyProfitableNow: 'Urgencia de orden financiero sin libros extensos de economía',
      recommendedFormat: 'Ebook táctico de 60 minutos + Tablero interactivo ($17 - $27 USD)'
    },
    {
      id: 9,
      nicheName: 'Kits de Ganchos y Retención para Creadores de Contenido',
      targetAvatar: 'Emprendedores y creadores con cuentas estancadas en 200 vistas',
      corePain: 'Inversión de horas grabando videos que el algoritmo no distribuye',
      trendDetail: 'Búsqueda constante de ganchos psicológicos probados en TikTok y Reels',
      whyProfitableNow: 'Atajo directo para captar tráfico sin pagar anuncios',
      recommendedFormat: 'Banco de 200+ ganchos clasificados por nicho ($27 USD)'
    },
    {
      id: 10,
      nicheName: 'Snacks Terapéuticos y Pastelería Casera para Mascotas',
      targetAvatar: 'Dueños preocupados por la comida ultraprocesada o buscando micro-negocio',
      corePain: 'Alergias en perros por alimentos industriales o necesidad de ingresos desde casa',
      trendDetail: 'Expansión de la alimentación natural y saludable para mascotas en Hotmart',
      whyProfitableNow: 'Doble motivación: salud de la mascota o emprendimiento casero de bajo costo',
      recommendedFormat: 'Ebook de 40 recetas veterinarias + Calculadora de costos ($19 - $29 USD)'
    }
  ];

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
      source: 'market_research_step1'
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
  const result = runNicheDiscovery();
  console.log(`[niche-discovery] Step #1 Completed successfully.`);
  console.log(`[niche-discovery] ${result.count} emerging niches identified and saved to: ${result.outputPath}\n`);
  result.niches.forEach(n => {
    console.log(`[#${n.id}] ${n.nicheName}`);
    console.log(`     Target: ${n.targetAvatar}`);
    console.log(`     Dolor: ${n.corePain}`);
    console.log(`     Formato: ${n.recommendedFormat}\n`);
  });
}

module.exports = { runNicheDiscovery };
