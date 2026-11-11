/**
 * reengineer.js — Motor de Ingeniería Inversa y Rediseño Estratégico de Oferta (Pasos #5 y #6 del Playbook de 48hs).
 * Lee el nicho activo, sintetiza una oferta de respuesta directa sin clichés ("cero 21 días", "cero mad-libs"),
 * construye el Mecanismo Único, las 3 fases lógicas y los 4 bonos mata-objeciones,
 * y persiste el Blueprint en SQLite, data/active_offer.json y DATA.md.
 */

const fs = require('fs');
const path = require('path');
const { getLatestNiche, getActiveValidatedNiche, saveOffer, logAutomation } = require('../../../../scripts/db');

/**
 * Sintetiza de forma algorítmica y lingüística un Blueprint de oferta de alta conversión
 * adaptado a la semántica real del nicho, avatar y dolor (sin condicionales por nicho fijo).
 */
function synthesizeEliteOfferBlueprint(niche) {
  const rawName = (niche.niche_name || 'Alto Rendimiento Operativo').trim();
  const cleanName = rawName.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, '').trim();
  const rawPain = (niche.core_pain || 'fricción operativa, desgaste diario y falta de resultados consistentes').trim();
  const painLower = rawPain.charAt(0).toLowerCase() + rawPain.slice(1).replace(/\.$/, '');
  const rawAvatar = (niche.target_avatar || 'profesionales y emprendedores').trim();

  // Extraer palabras clave nucleares del nicho y dolor para construir acrónimos y conceptos técnicos
  const stopWords = new Set(['para', 'como', 'con', 'sin', 'por', 'los', 'las', 'del', 'una', 'uno', 'que', 'mas', 'sobre', 'entre', 'hacia', 'desde', 'frente', 'largas', 'horas', 'tareas', 'continuas']);
  const words = `${cleanName} ${rawPain}`
    .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 4 && !stopWords.has(w.toLowerCase()));

  const primaryConcept = words[0] ? words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase() : 'Ejecución';
  const secondaryConcept = words[1] ? words[1].charAt(0).toUpperCase() + words[1].slice(1).toLowerCase() : 'Profunda';
  const tertiaryConcept = words[2] ? words[2].charAt(0).toUpperCase() + words[2].slice(1).toLowerCase() : primaryConcept;
  const acronym = `S${primaryConcept.charAt(0)}${secondaryConcept.charAt(0)}P`;

  const productName = `Sistema ${cleanName} Pro™`;
  const mainPromise = `Elimina de raíz ${painLower} y recupera el control total de tu rendimiento diario desde tus primeras 48 horas con un sistema táctico de 15 minutos al día`;
  const uniqueMech = `Arquitectura de Sincronización ${primaryConcept}-${secondaryConcept} (${acronym})™`;
  const commonEnemy = `Los métodos convencionales basados en fuerza de voluntad bruta, teoría interminable y parches superficiales que ignoran la raíz real de ${painLower}`;

  const phases = [
    {
      step: 1,
      timeframe: 'Fase 1 · Primeras 48 Horas',
      name: `Auditoría de Raíz y Desbloqueo de ${primaryConcept}`,
      desc: `Identifica y corta de inmediato los disparadores invisibles que provocan ${painLower}, logrando tu primera victoria medible en menos de 48 horas.`,
      deliverable: `Matriz de Diagnóstico ${acronym} + Protocolo de Choque en 5 Minutos`
    },
    {
      step: 2,
      timeframe: 'Fase 2 · Días 3 al 7',
      name: `Instalación de la ${uniqueMech}`,
      desc: `Reemplaza la fricción diaria por micro-bloques estructurados de 15 minutos que multiplican tu capacidad de respuesta sin exigir horas libres.`,
      deliverable: `Plantillas de ${primaryConcept} y ${secondaryConcept} + Temporizador Táctico en App`
    },
    {
      step: 3,
      timeframe: 'Fase 3 · Consolidación Permanente',
      name: `Estandarización de ${secondaryConcept} y Blindaje Operativo`,
      desc: `Deja instalado un entorno blindado que sostiene tus resultados en piloto automático incluso en tus semanas de mayor carga o estrés.`,
      deliverable: `Tablero Semanal ${acronym} + Protocolo de Mantenimiento en 1 Clic`
    }
  ];

  const bonuses = [
    {
      id: 1,
      name: `Protocolo de Acción en 5 Minutos: Desbloqueo de ${primaryConcept} en ${cleanName}`,
      perceivedValue: 29.0,
      objectionDestroyed: '“No tengo tiempo libre en el día para aplicar algo complejo”',
      purpose: `Secuencia de choque rápido para cortar ${painLower} y activar ${primaryConcept.toLowerCase()} en menos de 5 minutos.`
    },
    {
      id: 2,
      name: `Bóveda de Plantillas y Guiones de ${primaryConcept} & ${secondaryConcept} (${cleanName})`,
      perceivedValue: 37.0,
      objectionDestroyed: '“No sé por dónde empezar ni quiero diseñar todo desde cero”',
      purpose: `Estructuras pre-armadas de aplicación inmediata para ${rawAvatar.toLowerCase()} que eliminan el síndrome de la hoja en blanco desde el día 1.`
    },
    {
      id: 3,
      name: `Tablero Diagnóstico y Calculadora de ${primaryConcept} (${acronym})`,
      perceivedValue: 27.0,
      objectionDestroyed: '“No sé cómo medir si realmente estoy avanzando cada semana”',
      purpose: `Herramienta de medición objetiva para cuantificar tu avance en ${cleanName.toLowerCase()} y detectar fugas de ${tertiaryConcept.toLowerCase()} en 60 segundos.`
    },
    {
      id: 4,
      name: `Manual de Contingencia y Blindaje de ${secondaryConcept} en Días Críticos`,
      perceivedValue: 47.0,
      objectionDestroyed: '“Ya probé otros métodos antes y siempre termino abandonando a la segunda semana”',
      purpose: `El plan de rescate exacto con 3 marchas operativas para sostener tus resultados en ${cleanName.toLowerCase()} cuando surgen imprevistos.`
    }
  ];

  const comparisonTable = [
    {
      dimension: 'Tiempo requerido al día',
      traditional: '1 a 2 horas de teoría densa y rutinas imposibles de sostener',
      newMechanism: '15 minutos tácticos guiados por la App Móvil y plantillas listas'
    },
    {
      dimension: 'Primer resultado tangible',
      traditional: 'Semanas o meses de prueba y error frustrante',
      newMechanism: 'Alivio y desbloqueo medible dentro de las primeras 48 horas'
    },
    {
      dimension: 'Enfoque del método',
      traditional: 'Ataca síntomas superficiales pidiéndote más fuerza de voluntad',
      newMechanism: `Corrige la causa estructural mediante la ${uniqueMech}`
    },
    {
      dimension: 'Herramientas incluidas',
      traditional: 'Solo texto estático o videos largos de relleno',
      newMechanism: 'Sistema Operativo + 4 Bonos Tácticos + App Móvil Interactiva (PWA)'
    }
  ];

  return {
    cleanName,
    rawAvatar,
    painLower,
    productName,
    mainPromise,
    uniqueMech,
    commonEnemy,
    phases,
    bonuses,
    comparisonTable
  };
}

function runOfferReengineering(requestedNicheId = null) {
  let currentNiche = null;
  const db = require('../../../../scripts/db').getDbInstance();

  if (requestedNicheId) {
    currentNiche = db.client.prepare('SELECT * FROM niches WHERE id = ?').get(Number(requestedNicheId));
  }

  if (!currentNiche) {
    const dataMdPath = path.join(__dirname, '..', '..', '..', '..', 'DATA.md');
    if (fs.existsSync(dataMdPath)) {
      const match = fs.readFileSync(dataMdPath, 'utf8').match(/- \*\*Nicho Activo\*\*:\s*(.+)/);
      if (match) {
        const activeName = match[1].trim();
        currentNiche = db.client.prepare('SELECT * FROM niches WHERE niche_name = ? ORDER BY id DESC LIMIT 1').get(activeName);
      }
    }
  }

  if (!currentNiche) {
    currentNiche = getActiveValidatedNiche() || getLatestNiche();
  }

  if (!currentNiche) {
    throw new Error('No active niche found in database. Run niche audit first.');
  }

  console.log(`[offer-reengineer] Running Step #5 & #6 for Niche: "${currentNiche.niche_name}"`);

  const dataDir = path.join(__dirname, '..', '..', '..', '..', 'data');
  const offerJsonPath = path.join(dataDir, 'active_offer.json');
  let existingData = null;
  if (fs.existsSync(offerJsonPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(offerJsonPath, 'utf8'));
      if (parsed?.niche?.niche_name === currentNiche.niche_name && parsed?.reengineeredOffer?.bonuses?.length >= 4) {
        existingData = parsed;
      }
    } catch (_) {}
  }

  const blueprint = synthesizeEliteOfferBlueprint(currentNiche);

  const competitorAnalysis = existingData?.competitorAnalysis || {
    detectedPromise: `Soluciones tradicionales y cursos teóricos sobre ${currentNiche.niche_name}`,
    commonEnemy: blueprint.commonEnemy,
    weaknesses: [
      'Exceso de teoría abstracta sin herramientas de ejecución en 15 minutos',
      'Ausencia de un Mecanismo Único que ataque la causa raíz del problema',
      'Sin aplicación móvil interactiva de bolsillo para acompañar el hábito diario',
      'Bonos genéricos que no destruyen las objeciones reales de tiempo y constancia'
    ]
  };

  const totalBonusesValue = (existingData?.reengineeredOffer?.bonuses || blueprint.bonuses).reduce((acc, b) => acc + b.perceivedValue, 0);
  const totalPerceivedValue = 97.0 + totalBonusesValue; // Producto base ($97) + Bonos ($140) = $237

  const reengineeredOffer = existingData?.reengineeredOffer || {
    niche_id: currentNiche.id,
    product_name: blueprint.productName,
    main_promise: blueprint.mainPromise,
    unique_mechanism: blueprint.uniqueMech,
    common_enemy: blueprint.commonEnemy,
    target_avatar: currentNiche.target_avatar,
    price_usd: 37.0,
    guarantee_days: 30,
    bonuses: blueprint.bonuses,
    value_stack: {
      core_product_perceived: 97.0,
      total_bonuses_perceived: totalBonusesValue,
      total_perceived_value: totalPerceivedValue,
      offer_price: 37.0,
      discount_percentage: Math.round(((totalPerceivedValue - 37.0) / totalPerceivedValue) * 100),
      phases: blueprint.phases,
      comparison_table: blueprint.comparisonTable
    }
  };

  // Persistir en SQLite
  const savedOffer = saveOffer({
    niche_id: currentNiche.id,
    product_name: reengineeredOffer.product_name,
    main_promise: reengineeredOffer.main_promise,
    unique_mechanism: reengineeredOffer.unique_mechanism,
    bonuses: reengineeredOffer.bonuses,
    price_usd: reengineeredOffer.price_usd,
    guarantee_days: reengineeredOffer.guarantee_days
  });

  // Guardar en data/active_offer.json
  fs.writeFileSync(offerJsonPath, JSON.stringify({
    niche: currentNiche,
    competitorAnalysis,
    reengineeredOffer
  }, null, 2), 'utf8');

  // Persistir en DATA.md
  const dataMdPath = path.join(__dirname, '..', '..', '..', '..', 'DATA.md');
  if (fs.existsSync(dataMdPath)) {
    let dataMd = fs.readFileSync(dataMdPath, 'utf8');
    const activePhases = reengineeredOffer.value_stack?.phases || blueprint.phases;
    const offerSection = `
## 2.1 Oferta Rediseñada Activa (\`active_offer\`)

- **Producto**: ${reengineeredOffer.product_name}
- **Nueva Promesa Transformadora**: ${reengineeredOffer.main_promise}
- **Mecanismo Único**: ${reengineeredOffer.unique_mechanism}
- **Enemigo Común Derribado**: ${reengineeredOffer.common_enemy}
- **Precio Frontend**: $${reengineeredOffer.price_usd} USD (Valor total acumulado: $${totalPerceivedValue} USD - Descuento del ${reengineeredOffer.value_stack.discount_percentage}%)
- **Garantía Incondicional**: ${reengineeredOffer.guarantee_days} días de riesgo cero
- **Fases del Sistema**:
${activePhases.map(p => `  - **${p.timeframe} (${p.name})**: ${p.desc}`).join('\n')}
- **Pila de Bonos Mata-Objeciones**:
${reengineeredOffer.bonuses.map((b, i) => `  ${i + 1}. **${b.name}** (Valor: $${b.perceivedValue} USD) — *Destruye objeción: ${b.objectionDestroyed}* — ${b.purpose}`).join('\n')}
`;
    if (dataMd.includes('## 2.1 Oferta Rediseñada Activa')) {
      dataMd = dataMd.replace(/## 2\.1 Oferta Rediseñada Activa[\s\S]*?(?=## 3\. Variables de Entorno)/, offerSection.trim() + '\n\n');
    } else {
      dataMd = dataMd.replace(/(## 2\. Nicho y Oferta Activa[\s\S]*?)(## 3\. Variables de Entorno)/, `$1\n${offerSection.trim()}\n\n$2`);
    }
    fs.writeFileSync(dataMdPath, dataMd, 'utf8');
  }

  // Registrar en automation_logs
  logAutomation('offer-reengineer', 'reengineer_offer', 'success', {
    offerId: savedOffer.id,
    productName: reengineeredOffer.product_name,
    bonusesCount: reengineeredOffer.bonuses.length,
    priceUsd: reengineeredOffer.price_usd
  });

  console.log(`[offer-reengineer] Successfully saved offer #${savedOffer.id} to DB, JSON, and DATA.md`);
  return {
    savedOffer,
    reengineeredOffer,
    competitorAnalysis
  };
}

if (require.main === module) {
  try {
    const res = runOfferReengineering();
    console.log(`[offer-reengineer] Completed: ${res.reengineeredOffer.product_name}`);
    process.exit(0);
  } catch (err) {
    console.error('[offer-reengineer] Error:', err.message);
    process.exit(1);
  }
}

module.exports = { runOfferReengineering, synthesizeEliteOfferBlueprint };
