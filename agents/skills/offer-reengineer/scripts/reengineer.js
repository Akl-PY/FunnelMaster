/**
 * reengineer.js — Motor de Ingeniería Inversa y Rediseño de Oferta (Pasos #5 y #6).
 * Lee el nicho activo, rediseña la oferta con mecanismo único y pila de bonos,
 * y persiste el resultado en la base de datos, JSON y DATA.md.
 */

const fs = require('fs');
const path = require('path');
const { getLatestNiche, getActiveValidatedNiche, saveOffer, logAutomation } = require('../../../../scripts/db');

function runOfferReengineering(requestedNicheId = null) {
  let currentNiche = null;
  const db = require('../../../../scripts/db').getDbInstance();

  if (requestedNicheId) {
    currentNiche = db.client.prepare('SELECT * FROM niches WHERE id = ?').get(Number(requestedNicheId));
  }

  if (!currentNiche) {
    // Buscar nicho activo coincidente con DATA.md si existe
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

  // Desglose de la oferta modelada de la competencia (Paso #5)
  const competitorAnalysis = {
    detectedPromise: 'Desinflama tu abdomen y equilibra tus hormonas en la menopausia',
    weaknesses: [
      'Enfoque teórico genérico sobre hormonas sin plan de acción diario',
      'Falta de un mecanismo único memorable (parece una dieta keto más)',
      'Bonos débiles o inexistentes (cero aceleradores de implementación)',
      'Poco anclaje de valor antes del precio'
    ]
  };

  // Rediseño estratégico de la oferta superior (Paso #6)
  const reengineeredOffer = {
    niche_id: currentNiche.id,
    product_name: 'Protocolo Reset Hormonal 21™',
    main_promise: 'Desactiva la inflamación silenciosa y reactiva tu energía en 21 días sin pasar hambre ni medicación innecesaria',
    unique_mechanism: 'Sistema de Sincronización Metabólica por Fases (SMPF)™',
    target_avatar: currentNiche.target_avatar,
    price_usd: 37.0,
    guarantee_days: 30,
    bonuses: [
      {
        id: 1,
        name: 'Guía Rápida SOS: Eliminador de Sofocos e Insomnio Nocturno',
        perceivedValue: 29.0,
        purpose: 'Victoria rápida en las primeras 48 horas para dormir 7 horas continuas.'
      },
      {
        id: 2,
        name: 'Recetario Antiinflamatorio de 15 Minutos para Mujeres Ocupadas',
        perceivedValue: 37.0,
        purpose: 'Elimina la fricción de cocinar; 30 comidas fáciles de preparar.'
      },
      {
        id: 3,
        name: 'Calculadora de Balance Glucémico & Lista de Supermercado Anti-Niebla',
        perceivedValue: 27.0,
        purpose: 'Evita picos de insulina y quita la ansiedad de picotear entre comidas.'
      },
      {
        id: 4,
        name: 'Checklist de Análisis Clínicos: Qué pedirle a tu médico y cómo interpretarlo',
        perceivedValue: 47.0,
        purpose: 'Empodera a la mujer ante su consulta médica con preguntas específicas.'
      }
    ]
  };

  const totalBonusesValue = reengineeredOffer.bonuses.reduce((acc, b) => acc + b.perceivedValue, 0);
  const totalPerceivedValue = 97.0 + totalBonusesValue; // Producto base ($97) + Bonos ($140) = $237

  reengineeredOffer.value_stack = {
    core_product_perceived: 97.0,
    total_bonuses_perceived: totalBonusesValue,
    total_perceived_value: totalPerceivedValue,
    offer_price: reengineeredOffer.price_usd,
    discount_percentage: Math.round(((totalPerceivedValue - reengineeredOffer.price_usd) / totalPerceivedValue) * 100)
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
  const dataDir = path.join(__dirname, '..', '..', '..', '..', 'data');
  const offerJsonPath = path.join(dataDir, 'active_offer.json');
  fs.writeFileSync(offerJsonPath, JSON.stringify({
    niche: currentNiche,
    competitorAnalysis,
    reengineeredOffer
  }, null, 2), 'utf8');

  // Persistir en DATA.md
  const dataMdPath = path.join(__dirname, '..', '..', '..', '..', 'DATA.md');
  if (fs.existsSync(dataMdPath)) {
    let dataMd = fs.readFileSync(dataMdPath, 'utf8');
    const offerSection = `
## 2.1 Oferta Rediseñada Activa (\`active_offer\`)

- **Producto**: ${reengineeredOffer.product_name}
- **Nueva Promesa Transformadora**: ${reengineeredOffer.main_promise}
- **Mecanismo Único**: ${reengineeredOffer.unique_mechanism}
- **Precio Frontend**: $${reengineeredOffer.price_usd} USD (Valor total acumulado: $${totalPerceivedValue} USD - Descuento del ${reengineeredOffer.value_stack.discount_percentage}%)
- **Garantía Incondicional**: ${reengineeredOffer.guarantee_days} días de riesgo cero
- **Pila de Bonos**:
${reengineeredOffer.bonuses.map((b, i) => `  ${i + 1}. **${b.name}** (Valor: $${b.perceivedValue} USD) — ${b.purpose}`).join('\n')}
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

module.exports = { runOfferReengineering };
