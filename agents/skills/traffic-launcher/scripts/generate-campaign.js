/**
 * agents/skills/traffic-launcher/scripts/generate-campaign.js
 * Generador agnóstico de creativos, guiones y estrategia para Meta Ads (Paso #11).
 * También genera la especificación de Checkout & Funnel Upsells (Paso #10).
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

function loadActiveData() {
  const offerJsonPath = path.join(__dirname, '..', '..', '..', '..', 'data', 'active_offer.json');
  if (!fs.existsSync(offerJsonPath)) {
    throw new Error('No se encontro data/active_offer.json. Ejecuta primero offer-reengineer.');
  }
  return JSON.parse(fs.readFileSync(offerJsonPath, 'utf8'));
}

function buildCheckoutPack(offer, niche) {
  const productName = offer.product_name || 'Sistema Operativo Pro™';
  const uniqueMech = offer.unique_mechanism || 'Arquitectura de Sincronización Operativa™';
  const nicheName = niche?.niche_name || offer.niche_name || 'Productividad y Ejecución';
  const price = offer.price_usd || 37;
  const guarantee = offer.guarantee_days || 30;
  const bonuses = offer.bonuses || [];

  return `# Configuración de Checkout y Embudo de Ventas (Paso #10)
## Producto Principal: ${productName}

---

## 1. Ficha Técnica para Pasarelas (Stripe / Mercado Pago / Hotmart / LemonSqueezy)

| Parámetro | Valor Configurado |
| :--- | :--- |
| **Nombre del Producto** | ${productName} |
| **Vertical / Mercado** | ${nicheName} |
| **Precio Frontend** | $${price} USD |
| **Moneda** | USD (Stripe Internacional) y Moneda Local / Cuotas (Mercado Pago LATAM) |
| **Tipo de Pago** | Pago único · Acceso inmediato y de por vida |
| **Garantía Incondicional** | ${guarantee} días (Riesgo Cero) |
| **Formato de Entrega** | App Móvil Interactiva Material Design 3 + 5 Manuales PDF/HTML Imprimibles |

---

## 2. Configuración de Entregables en Checkout

Asignar los siguientes activos generados en \`products/\` y \`/app\`:
1. **Archivo Core**: \`master-guide.md\` / \`/docs/master-guide.html\` (Manual Operativo Maestro en 3 Fases).
2. **Aplicación Móvil Interactiva**: \`/app/index.html\` (PWA Google Material Design 3 con Temporizador y Audio 432Hz).
${bonuses.map((b, i) => `${i + 3}. **Bono ${b.id || i + 1}**: ${b.name || b.title} (Valor: $${b.perceivedValue || 29} USD)`).join('\n')}

---

## 3. Estrategia de Maximizadores de Beneficio (AOV Boosters)

### Order Bump (En la misma página de pago - Checkbox 1-Click)
- **Producto**: *Pack SOS de Implementación Acelerada en 3 Minutos + Plantillas Ejecutivas Extra*
- **Precio**: $17 USD
- **Copy de Activación**:
  > *"⚡ ¡SÍ! Quiero añadir el Pack SOS de Implementación Acelerada para ${nicheName} por solo $17 USD (Descuento del 60%). Incluye hojas de chequeo rápido y plantillas de rescate para días de máxima urgencia."*
- **Tasa de Adopción Estimada**: 35% - 45% de los compradores.

### Upsell 1 (One-Click Upsell tras la compra)
- **Producto**: *Bóveda VIP de Auditoría y Casos Avanzados de la ${uniqueMech}*
- **Precio**: $67 USD (o 3 cuotas de $25)
- **Promesa**: *Acceso directo a protocolos avanzados de automatización, plantillas de escala y actualizaciones prioritarias.*

---

## 4. Configuración de Tracking y Webhooks
- **Pixel de Meta Ads**: Evento \`InitiateCheckout\` en la carga del formulario y \`Purchase\` en la confirmación de orden.
- **Parámetros UTM obligatorios**: Asegurar que la pasarela reciba y devuelva \`utm_source\`, \`utm_medium\`, \`utm_campaign\` y \`utm_content\` en el webhook de compra para atribución exacta de ROAS.
`;
}

function buildMetaCampaign(offer, niche) {
  const productName = offer.product_name || 'Sistema Operativo Pro™';
  const mechanism = offer.unique_mechanism || 'Arquitectura de Sincronización Operativa™';
  const pain = niche?.core_pain || offer.core_pain || 'fricción operativa, fatiga y pérdida de enfoque';
  const painLower = pain.charAt(0).toLowerCase() + pain.slice(1).replace(/\.$/, '');
  const avatar = offer.target_avatar || 'Profesionales y emprendedores';
  const commonEnemy = offer.common_enemy || 'los métodos tradicionales llenos de teoría abstracta que exigen horas libres';
  const price = offer.price_usd || 37;

  return `# Estrategia de Tráfico Directo y Creativos Meta Ads (Paso #11)
## Campaña: Lanzamiento y Escala para ${productName}

---

## 1. Arquitectura de Campaña en Meta Ads Manager

- **Objetivo de Campaña**: Ventas (Conversión a compra en el evento \`Purchase\`).
- **Estructura de Presupuesto**:
  - **Fase de Testeo (Primeras 72h)**: CBO (Advantage Campaign Budget) con $30 a $50 USD/día.
  - **Estructura de Anuncios**: 1 Conjunto de Anuncios Abierto (Broad Target) con Metodología Dinámica **3:2:2** (3 videos distintos, 2 textos principales, 2 titulares).
- **Segmentación Demográfica**:
  - **Ubicación**: España, México, Colombia, Chile, Estados Unidos (hispanohablantes), Argentina, Perú.
  - **Audiencia Objetivo**: ${avatar}.
  - **Intereses**: Broad abierto (sin intereses restrictivos; el algoritmo de Meta segmenta automáticamente mediante el gancho de los primeros 3 segundos del video).
  - **Exclusiones Obligatorias**: Excluir lista de compradores de los últimos 180 días.

---

## 2. Batería de 5 Guiones UGC (User Generated Content — Formato 9:16)

### Video 1: "El Mito de la Fuerza de Voluntad" (Ángulo de Validación del Dolor)
**Formato**: Hablando a cámara frontal en escritorio o espacio de trabajo con luz natural, tono directo y empático.
- **0:00 - 0:03 (Gancho Visual y Verbal)**: "¿Terminas el día agotado frente a la pantalla sintiendo que estuviste ocupado todo el día pero no avanzaste en lo importante?"
- **0:03 - 0:15 (Agitación)**: "Si lidias con ${painLower}, deja de culpar a tu disciplina. El verdadero problema son ${commonEnemy}."
- **0:15 - 0:30 (Mecanismo)**: "Por eso diseñamos la ${mechanism}: un sistema táctico de 15 minutos al día que corta las fugas de energía y te devuelve el control desde tus primeras 48 horas."
- **0:30 - 0:45 (CTA)**: "Toca el botón aquí abajo para descargar el ${productName} con su App Móvil y 4 bonos gratis por solo $${price} USD. Garantía de 30 días."

---

### Video 2: "Los 3 Errores que Drenan tu Rendimiento Antes del Mediodía" (Ángulo Contraintuitivo)
**Formato**: Mostrando pantalla de trabajo o pizarra con 3 puntos tachados.
- **0:00 - 0:03 (Gancho)**: "Si haces alguna de estas 3 cosas en tus primeros 30 minutos de la mañana, estás saboteando todo tu día."
- **0:03 - 0:16 (Agitación)**: "Abrir mensajes apenas despiertas, armar listas interminables de 15 tareas y trabajar sin bloques de aislamiento dispara tu fatiga cognitiva antes del mediodía."
- **0:16 - 0:32 (Mecanismo)**: "No necesitas trabajar más horas; necesitas cambiar la secuencia y aplicar la ${mechanism}. Con un solo ajuste de 15 minutos recuperas más de 2 horas limpias al día."
- **0:32 - 0:45 (CTA)**: "El paso a paso y las plantillas listas están dentro del ${productName}. Haz clic abajo y actívalo hoy mismo."

---

### Video 3: "La Regla de los 15 Minutos" (Ángulo de Velocidad en 48 Horas)
**Formato**: Mostrando la App Móvil Material Design 3 con el cronómetro en marcha.
- **0:00 - 0:03 (Gancho)**: "¿No tienes 2 horas libres para estudiar cursos eternos? Mira cómo funciona este bloque de 15 minutos."
- **0:03 - 0:15 (Agitación)**: "Cuando estás saturado por ${painLower}, lo último que necesitas es otro curso teórico de 40 videos que vas a abandonar al tercer día."
- **0:15 - 0:30 (Mecanismo)**: "Con el ${productName} abres tu App Móvil, activas la onda de enfoque de 432Hz y sigues la plantilla 1-2-3 para lograr tu primera victoria medible en menos de 48 horas."
- **0:30 - 0:45 (CTA)**: "Toca el enlace de este video para desbloquear tu acceso completo y el Bono SOS de 5 minutos hoy."

---

### Video 4: "Recorrido por Dentro del Sistema" (Ángulo Demostración Visual)
**Formato**: Grabación de pantalla mostrando el Manual Maestro, la Calculadora y la App Móvil.
- **0:00 - 0:03 (Gancho)**: "Esto es exactamente lo que recibes en tu teléfono y computadora al entrar al ${productName}."
- **0:03 - 0:16 (Demostración)**: "Cero paja teórica: recibes el Manual Operativo en 3 fases, la App Móvil Material Design 3 con temporizador y tracker de racha, y los 4 bonos con plantillas listas para copiar."
- **0:16 - 0:32 (Prueba)**: "Creado específicamente para ${avatar.toLowerCase()} que necesitan resultados reales sin complicarse."
- **0:32 - 0:45 (CTA)**: "Accede ahora mismo por solo $${price} USD con pago único y garantía de 30 días."

---

### Video 5: "Cuánto te Cuesta Seguir Igual" (Ángulo Calculadora de ROI)
**Formato**: Mostrando la calculadora interactiva de la página de ventas.
- **0:00 - 0:03 (Gancho)**: "Perder 2 horas al día por dispersión y fatiga te está costando más de 45 horas de vida todos los meses."
- **0:03 - 0:16 (Explicación)**: "Cuando óperas con agotamiento acumulado, cada tarea te toma el doble de tiempo y terminas llevándote preocupaciones a la noche."
- **0:16 - 0:32 (Solución)**: "Al instalar la ${mechanism}, blindas tus bloques de mayor impacto en 15 minutos diarios y cierras tu jornada con la mente despejada."
- **0:32 - 0:45 (CTA)**: "Haz clic en el botón de abajo, haz el diagnóstico de 60 segundos o descarga el sistema completo hoy."

---

## 3. Copys para Anuncios (Primary Texts & Headlines)

### Opción de Copy 1: Narrativa de Contraste (Largo)
\`\`\`text
Si sientes que pasas el día apagando incendios, lidiando con ${painLower} y terminando agotado sin haber cerrado lo verdaderamente importante... el problema no es tu falta de disciplina.

El verdadero culpable son ${commonEnemy}.

Cuando intentas aplicar consejos genéricos en una agenda saturada, el sistema colapsa a los pocos días.

Por eso creamos el ${productName}, impulsado por la ${mechanism} para que recuperes el control desde tus primeras 48 horas con bloques tácticos de 15 minutos al día:

✅ Manual Operativo Maestro en 3 Fases (Cero relleno teórico)
✅ App Móvil Interactiva Material Design 3 (Temporizador + Audio 432Hz + Racha)
✅ 4 Bonos Gratis hoy (Protocolo SOS 5 min, Kit de Plantillas, Calculadora 100 pts y Blindaje Anti-Recaídas)
✅ Garantía Incondicional de 30 Días (Riesgo 100% nuestro)

Haz clic en el enlace y desbloquea todo el ecosistema hoy por un único pago de $${price} USD.
\`\`\`

### Opción de Copy 2: Directo al Dolor y Solución (Corto)
\`\`\`text
¿Cansado de perder tus mejores horas por ${painLower}?

No necesitas cursos eternos ni más horas de trabajo. Necesitas instalar la ${mechanism} en solo 15 minutos al día.

Descarga hoy el ${productName} + App Móvil + 4 Bonos de Aceleración y consigue tu primera victoria medible en menos de 48 horas.

👉 Toca el botón para acceder con el 84% de descuento y Garantía de 30 Días.
\`\`\`

### Titulares de Alto CTR (Headlines)
1. **Recupera +2 Horas Diarias en tus Primeras 48 Horas**
2. **El Sistema Táctico de 15 Minutos (+ App Móvil Incluida)**
3. **Elimina la Fricción Operativa sin Cursos Eternos**
4. **Acceso Inmediato + 4 Bonos Gratis Hoy ($${price} USD)**

### Descripciones de Enlace
- *Acceso Instantáneo · Incluye App Móvil y Garantía de 30 Días*
- *Pago Único Seguro vía Stripe o Mercado Pago*
`;
}

function runTrafficCampaignGeneration() {
  console.log('[traffic-launcher] Starting Traffic Campaign and Checkout Pack generation...');
  const data = loadActiveData();
  const offer = data.reengineeredOffer || data.offer;
  const niche = data.niche;

  const nicheSlug = slugify(niche?.niche_name || offer.product_name || 'producto-activo');
  const trafficDir = path.join(__dirname, '..', '..', '..', '..', 'traffic', nicheSlug);

  if (!fs.existsSync(trafficDir)) {
    fs.mkdirSync(trafficDir, { recursive: true });
  }

  // 1. Generar Estrategia de Checkout & Upsells (Paso #10)
  const checkoutPackContent = buildCheckoutPack(offer, niche);
  const checkoutFilePath = path.join(trafficDir, 'checkout-setup.md');
  fs.writeFileSync(checkoutFilePath, checkoutPackContent, 'utf8');
  console.log(`[traffic-launcher] Checkout Pack generated at: ${checkoutFilePath}`);

  // 2. Generar Campaña y Creativos Meta Ads (Paso #11)
  const metaCampaignContent = buildMetaCampaign(offer, niche);
  const campaignFilePath = path.join(trafficDir, 'meta-ads-campaign.md');
  fs.writeFileSync(campaignFilePath, metaCampaignContent, 'utf8');
  console.log(`[traffic-launcher] Meta Ads Campaign generated at: ${campaignFilePath}`);

  // 3. Persistir en base de datos
  try {
    logAutomation('traffic-launcher', 'generate_campaign', 'success', {
      productName: offer.product_name,
      nicheSlug,
      checkoutSetup: 'checkout-setup.md',
      campaignFile: 'meta-ads-campaign.md',
      anglesCount: 5
    });
  } catch (e) {
    console.warn('[traffic-launcher] DB log skipped:', e.message);
  }

  console.log('[traffic-launcher] Traffic Campaign generation completed successfully.');
  return {
    trafficDir,
    checkoutFilePath,
    campaignFilePath
  };
}

if (require.main === module) {
  try {
    runTrafficCampaignGeneration();
  } catch (err) {
    console.error('[traffic-launcher] Error:', err.message);
    process.exit(1);
  }
}

module.exports = {
  runTrafficCampaignGeneration,
  buildCheckoutPack,
  buildMetaCampaign
};
