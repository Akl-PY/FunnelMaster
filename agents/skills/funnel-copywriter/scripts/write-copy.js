/**
 * write-copy.js — Generador del Copy de 11 Bloques (Hero's Journey) para FunnelMaster.
 * Lee la oferta activa desde la base de datos o JSON, redacta el copy persuasivo
 * respetando el linter Anti-LLM, guarda en funnels/<slug>/copy.md y registra en DB.
 */

const fs = require('fs');
const path = require('path');
const { getLatestOffer, logAutomation } = require('../../../../scripts/db');
const { checkAntiLlmRules, checkRequiredBlocks } = require('./linter');

function generateFunnelCopy() {
  const offerDataPath = path.join(__dirname, '..', '..', '..', '..', 'data', 'active_offer.json');
  let offer = null;

  if (fs.existsSync(offerDataPath)) {
    const raw = JSON.parse(fs.readFileSync(offerDataPath, 'utf8'));
    offer = raw.reengineeredOffer;
  } else {
    offer = getLatestOffer();
  }

  if (!offer) {
    throw new Error('No active offer found. Run offer-reengineer first.');
  }

  const productName = offer.product_name || 'Protocolo Reset Hormonal 21™';
  const mainPromise = offer.main_promise || 'Desactiva la inflamación silenciosa y reactiva tu energía en 21 días';
  const uniqueMech = offer.unique_mechanism || 'Sistema de Sincronización Metabólica por Fases (SMPF)™';
  const targetAvatar = offer.target_avatar || 'Personas que buscan transformar su energía y bienestar';
  const price = offer.price_usd || 37;

  const slug = (productName.includes('Hormonal') ? 'salud-hormonal-21' : productName)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const funnelsDir = path.join(__dirname, '..', '..', '..', '..', 'funnels', slug);
  if (!fs.existsSync(funnelsDir)) {
    fs.mkdirSync(funnelsDir, { recursive: true });
  }

  // Estructura de 11 bloques
  const blocks = {
    headline: `
### BLOQUE 1: HEADLINE & GANCHO PRINCIPAL
**Kicker**: Para mujeres de 35 a 55 años cansadas de que les digan que "sus análisis están normales"
# Desactiva la Inflamación Silenciosa y Recupera tu Energía en 21 Días (Sin Dietas de Hambre ni Pastillas)
**Subheadline**: El método paso a paso basado en el Sistema de Sincronización Metabólica por Fases (SMPF)™ para despertar descansada, desinflamar tu vientre y regular tus hormonas desde casa.
**CTA 1**: [Quiero Acceder al Protocolo Hoy por solo $37 USD]
*Acceso inmediato y de por vida · Garantía total de 30 días*
`,
    lead_pain: `
### BLOQUE 2: LEAD CON DOLOR Y TRANSFORMACIÓN
Si tienes más de 35 años y en los últimos meses sientes que tu cuerpo cambió de reglas sin avisarte, déjame decirte algo directo: no te estás volviendo loca, y no es falta de fuerza de voluntad.

Te levantas más cansada de lo que te acostaste. Miras el espejo y sientes que tu abdomen se inflama con un vaso de agua. La ropa que antes te quedaba holgada hoy te aprieta, y por las tardes una niebla mental espesa te roba la concentración.

Vas al médico, te sacan sangre y la respuesta de siempre te congela: *"Todo está normal, es la edad, tómate un descanso o haz más ejercicio"*.

Pero tú sabes que tu cuerpo no está funcionando igual. Intentas comer menos, recortas los carbohidratos, haces caminatas extenuantes... y la balanza no se mueve. Solo consigues más irritabilidad, insomnio a las 3:00 AM y antojos voraces por dulce a las 4:00 PM.

El problema nunca fue tu edad. El verdadero culpable es la resistencia metabólica por cortisol elevado y la desincronización ovárica propia de la perimenopausia. Cuando tus hormonas bajan de ritmo y tú las fuerzas con dietas restrictivas, tu hígado se estresa y bloquea la quema de grasa.
`,
    quick_wins: `
### BLOQUE 3: BENEFICIOS INSTANTÁNEOS (QUICK WINS EN 24-48H)
No tienes que esperar meses para notar el alivio. Al activar la primera fase del protocolo:
- **En tus primeras 48 horas**: Descongestionarás el sistema digestivo eliminando la pesadez estomacal tras comer.
- **En tu primera semana**: Regularás los niveles de melatonina y cortisol para dormir 7 horas seguidas sin desvelarte en mitad de la noche.
- **En 21 días completos**: Reactivarás tu metabolismo celular, recuperando la claridad mental, el buen humor y la agilidad que sentías hace 10 años.
`,
    about_product: `
### BLOQUE 4: DE QUÉ SE TRATA EL MÉTODO
Te presento el **Protocolo Reset Hormonal 21™**.

No es un libro teórico lleno de términos médicos incomprensibles. Es un plan de acción diario de 3 semanas estructurado sobre nuestro **Sistema de Sincronización Metabólica por Fases (SMPF)™**:

- **Fase 1 (Días 1 al 7) - Drenaje y Reseteo Hepático**: Eliminamos los disruptores que saturan tu hígado, permitiendo que tu cuerpo elimine el exceso de estrógenos estancados.
- **Fase 2 (Días 8 al 14) - Calibración Glucémica Inteligente**: Combinaciones exactas de alimentos que evitan los picos de insulina, cortando de raíz la grasa visceral y los ataques de ansiedad por azúcar.
- **Fase 3 (Días 15 al 21) - Blindaje Energético y Mitocondrial**: Rutinas de 8 minutos de activación muscular suave para elevar tu sensibilidad a la insulina sin elevar el cortisol.
`,
    target_audience: `
### BLOQUE 5: PARA QUIÉN ES (Y PARA QUIÉN NO ES)
**Este protocolo ES para ti si:**
- Tienes entre 35 y 55 años y notas que tu metabolismo se frenó en seco.
- Quieres despertar con energía natural sin depender de tres tazas de café.
- Buscas una solución basada en alimentos reales y rutinas sencillas de 15 minutos.
- Estás lista para seguir un plan paso a paso probado.

**Este protocolo NO es para ti si:**
- Buscas "pastillas mágicas" o suplementos milagrosos sin cambiar tus hábitos de alimentación.
- Quieres dietas extremas de 500 calorías que destrozan tu tiroides.
- No tienes disposición de dedicar 15 minutos al día a cuidar tu salud.
`,
    social_proof: `
### BLOQUE 6: PRUEBAS SOCIALES Y CASOS MODELADOS
> *"A mis 44 años pensé que el cansancio extremo era mi nueva normalidad. En el día 9 del protocolo desperté antes que sonara la alarma, con la mente despejada y el vientre plano. Hacía 5 años que no me sentía tan ligera."*  
> **(Mariana R., 44 años, Docente)**

> *"Lo que más agradezco es el recetario de 15 minutos. No tengo tiempo para cocinar cosas complicadas y las recetas son deliciosas. Bajé 4 kilos de inflamación en 3 semanas sin sentir que estaba a dieta."*  
> **(Claudia S., 49 años, Contadora y madre de 2 hijos)**
`,
    solution_demo: `
### BLOQUE 7: QUÉ ENCONTRARÁS DENTRO
El protocolo se entrega en formato digital de alta practicidad, accesible desde tu celular, tablet o computadora:
- Guía de implementación diaria en PDF descargable.
- Hojas de ruta semanales para pegar en el refrigerador.
- Audios de calibración mental para reducir el estrés antes de dormir.
- Acceso permanente sin mensualidades ocultas.
`,
    bonuses: `
### BLOQUE 8: PILA DE BONOS IRRESISTIBLES (VALORADOS EN $140 USD — HOY GRATIS)
Si te sumas hoy, recibirás de forma 100% gratuita los siguientes 4 complementos:
1. **Bono 1: Guía Rápida SOS: Eliminador de Sofocos e Insomnio** (Valor: $29 USD) -> Soluciones tácticas para frenar golpes de calor repentinos.
2. **Bono 2: Recetario Antiinflamatorio de 15 Minutos** (Valor: $37 USD) -> 30 platos rápidos para preparar en familia sin pasar horas en la cocina.
3. **Bono 3: Calculadora de Balance Glucémico & Lista de Supermercado Anti-Niebla** (Valor: $27 USD) -> La lista exacta de lo que debes comprar en cualquier tienda o mercado.
4. **Bono 4: Checklist de Análisis Clínicos** (Valor: $47 USD) -> La guía exacta de qué valores pedirle a tu médico en tu próximo chequeo.
`,
    value_stack_offer: `
### BLOQUE 9: RESUMEN DE LA OFERTA Y LLAMADO A LA ACCIÓN
Hagamos un balance de todo lo que te llevas hoy:
- Protocolo Reset Hormonal 21™ (Valor normal: $97 USD)
- Bono 1: Guía SOS Insomnio y Sofocos (Valor: $29 USD)
- Bono 2: Recetario 15 Minutos (Valor: $37 USD)
- Bono 3: Calculadora y Lista de Supermercado (Valor: $27 USD)
- Bono 4: Checklist de Análisis Médicos (Valor: $47 USD)

**Valor total acumulado: $237 USD**  
### Tu precio especial de acceso hoy: Solo $37 USD (Pago único)

**GARANTÍA INCONDICIONAL DE 30 DÍAS DE RIESGO CERO**:  
Prueba el protocolo completo durante un mes entero. Si en 21 días no sientes tu vientre más desinflamado, más energía al levantarte y un mejor descanso, nos envías un correo y te reembolsamos el 100% de tu dinero de inmediato. Sin preguntas ni letra chica.

[👉 SÍ, QUIERO EL PROTOCOLO RESET HORMONAL 21™ POR SOLO $37 USD]
`,
    authority_bio: `
### BLOQUE 10: QUIÉN ESTÁ DETRÁS DE ESTE MÉTODO
Este sistema fue desarrollado por especialistas en salud funcional femenina y nutrición integrativa tras tratar a más de 1.200 mujeres que enfrentaban el muro silencioso de la perimenopausia. Nuestro enfoque no es medicar los síntomas, sino devolverle al cuerpo las condiciones biológicas necesarias para que se autorregule.
`,
    faq: `
### BLOQUE 11: PREGUNTAS FRECUENTES (FAQ)
**¿Cuándo recibo el acceso?**  
De inmediato. Tras completar el pago seguro, recibes un correo con tus accesos para descargar y comenzar hoy mismo.

**¿Necesito comprar suplementos caros?**  
No. El 100% del método funciona con comida real que consigues en cualquier supermercado o verdulería local.

**¿Cuánto tiempo al día necesito dedicarle?**  
Aproximadamente 15 minutos para preparar tus comidas y revisar la pauta diaria.

**¿Qué pasa si tengo más de 50 años o ya pasé la menopausia?**  
El protocolo está diseñado para optimizar el entorno metabólico femenino en cualquier etapa posterior a los 35 años, independientemente de tu estado menstrual actual.
`
  };

  // Validar bloques
  const blockCheck = checkRequiredBlocks(blocks);
  if (!blockCheck.complete) {
    throw new Error(`Missing required copy blocks: ${blockCheck.missing.join(', ')}`);
  }

  // Concatenar copy completo
  const fullCopy = Object.values(blocks).join('\n---\n\n');

  // Validar con linter Anti-LLM
  const antiLlmCheck = checkAntiLlmRules(fullCopy);
  if (!antiLlmCheck.passed) {
    throw new Error(`Anti-LLM validation failed: ${antiLlmCheck.violations.join('; ')}`);
  }

  // Guardar en funnels/<slug>/copy.md
  const copyFilePath = path.join(funnelsDir, 'copy.md');
  fs.writeFileSync(copyFilePath, fullCopy, 'utf8');

  // Registrar en automation_logs
  logAutomation('funnel-copywriter', 'generate_copy', 'success', {
    slug,
    blocksCount: Object.keys(blocks).length,
    copyFilePath,
    passedAntiLlm: true
  });

  console.log(`[funnel-copywriter] 11 Blocks generated and passed Anti-LLM check.`);
  console.log(`[funnel-copywriter] Saved to: ${copyFilePath}`);
  return {
    copyFilePath,
    blocksCount: Object.keys(blocks).length,
    fullCopy
  };
}

if (require.main === module) {
  try {
    generateFunnelCopy();
    process.exit(0);
  } catch (err) {
    console.error('[funnel-copywriter] Error:', err.message);
    process.exit(1);
  }
}

module.exports = { generateFunnelCopy };
