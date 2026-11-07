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
  const productName = offer.product_name;
  const price = offer.price_usd || 37;
  const guarantee = offer.guarantee_days || 30;
  const bonuses = offer.bonuses || [];

  return `# Configuración de Checkout y Embudo de Ventas (Paso #10)
## Producto Principal: ${productName}

---

## 1. Ficha Técnica para Plataforma (Hotmart / Shopify / LemonSqueezy)

| Parámetro | Valor Configurado |
| :--- | :--- |
| **Nombre del Producto** | ${productName} |
| **Categoría** | Salud / Bienestar / Estilo de Vida |
| **Precio Frontend** | $${price} USD |
| **Moneda** | USD (con conversión local automática activada) |
| **Tipo de Pago** | Pago único / Acceso de por vida |
| **Garantía Incondicional** | ${guarantee} días |
| **Formato de Entrega** | Área de miembros Hotmart Club o descarga directa protegida |

---

## 2. Configuración de Entregables en Checkout

Asignar los siguientes archivos generados en \`products/\`:
1. **Archivo Core**: \`master-guide.md\` (Guía Maestra de 21 Días).
${bonuses.map((b, i) => `${i + 2}. **Bono ${b.id || i + 1}**: ${b.name} (Valor: $${b.perceivedValue} USD)`).join('\n')}

---

## 3. Estrategia de Maximizadores de Beneficio (AOV Boosters)

### Order Bump (En la misma página de pago - Checkbox 1-Click)
- **Producto**: *Pack de 10 Audios Guiados de Desactivación del Cortisol Nocturno (5 Minutos)*
- **Precio**: $17 USD
- **Copy de Activación**:
  > *"Sí, quiero añadir los Audios SOS de Activación Vagal por solo $17 USD (Descuento del 60%). Ayuda a inducir el sueño delta en menos de 7 minutos sin pantallas."*
- **Tasa de Adopción Estimada**: 35% - 45% de los compradores.

### Upsell 1 (One-Click Upsell tras la compra)
- **Producto**: *Comunidad VIP de Soporte y Sesiones Quincenales de Preguntas y Respuestas (Acceso Trimestral)*
- **Precio**: $67 USD (o 3 cuotas de $25)
- **Promesa**: *Acceso directo a resolución de dudas sobre analíticas, recetas personalizadas y acompañamiento.*

---

## 4. Configuración de Tracking y Webhooks
- **Pixel de Meta Ads**: Evento \`InitiateCheckout\` en la carga del formulario y \`Purchase\` en la página de agradecimiento.
- **Parámetros UTM obligatorios**: Asegurar que la pasarela reciba y devuelva \`utm_source\`, \`utm_medium\`, \`utm_campaign\` y \`utm_content\` en el webhook de compra para atribución exacta de ROAS.
`;
}

function buildMetaCampaign(offer, niche) {
  const productName = offer.product_name;
  const mechanism = offer.unique_mechanism;
  const pain = niche.core_pain;
  const avatar = offer.target_avatar;
  const price = offer.price_usd || 37;

  return `# Estrategia de Tráfico Directo y Creativos Meta Ads (Paso #11)
## Campaña: Lanzamiento y Escala para ${productName}

---

## 1. Arquitectura de Campaña en Meta Ads Manager

- **Objetivo de Campaña**: Ventas (Conversión a compra en el evento \`Purchase\`).
- **Estructura de Presupuesto**:
  - **Fase de Testeo (Días 1 a 3)**: CBO (Advantage Campaign Budget) con $30 a $50 USD/día.
  - **Estructura de Anuncios**: 1 Conjunto de Anuncios Abierto (Broad Target) con Metodología Dinámica **3:2:2** (3 videos distintos, 2 textos principales, 2 titulares).
- **Segmentación Demográfica**:
  - **Ubicación**: España, México, Colombia, Chile, Estados Unidos (hispanohablantes), Argentina, Perú.
  - **Edad**: Mujeres de 35 a 58 años.
  - **Intereses**: Broad abierto (sin intereses restrictivos; el algoritmo de Meta segmenta mediante el gancho del video).
  - **Exclusiones Obligatorias**: Excluir lista de clientes y personas que hayan comprado en los últimos 180 días.

---

## 2. Batería de 5 Guiones UGC (User Generated Content)

### Video 1: "Tus Análisis Están Normales" (Ángulo de Validación del Dolor)
**Formato**: Mujer de ~40 años hablando a cámara frontal en la cocina con luz natural, tono conversacional sin impostación.
- **0:00 - 0:03 (Gancho Visual y Verbal)**: *(Sosteniendo una hoja de papel)* "¿Tu médico también te dijo que 'tus análisis están completamente normales', pero tú te sientes agotada y con el vientre hinchado como si tuvieras 4 meses de embarazo?"
- **0:03 - 0:15 (Agitación)**: "Si tienes más de 35 años y sientes que tu cuerpo cambió de reglas de un día para otro, no es tu culpa y no te estás volviendo loca. El problema es que los análisis convencionales miden patologías graves, no la desincronización ovárica ni el cortisol silencioso de la perimenopausia."
- **0:15 - 0:30 (Mecanismo)**: "Por eso matarte a cardio o recortar calorías solo empeora las cosas. En lugar de pasar hambre, necesitas el ${mechanism}: un protocolo diario de 21 días que desinflama tu hígado y equilibra tu insulina sin medicación innecesaria."
- **0:30 - 0:45 (CTA)**: "Toca el botón aquí abajo para descargar el ${productName} con sus 4 bonos por solo $${price} USD. Pruébalo sin riesgo con nuestra garantía de 30 días."

---

### Video 2: "Los 3 Alimentos que Crees Sanos pero Bloquean tu Vientre" (Ángulo Contraintuitivo)
**Formato**: Mostrando la despensa o mesa con ingredientes cotidianos.
- **0:00 - 0:03 (Gancho)**: "Si desayunas avena con fruta o tomas café con leche vegetal para desinflamarte y sigues con pesadez... tienes que ver esto."
- **0:03 - 0:16 (Agitación)**: "A partir de los 35 años, las caídas de estrógenos reducen tu tolerancia a los picos de glucosa. Esos carbohidratos 'saludables' tomados a primera hora disparan la insulina y le ordenan a tu cuerpo almacenar grasa abdominal en lugar de quemarla."
- **0:16 - 0:32 (Mecanismo)**: "No tienes que dejar de comer lo que te gusta, solo tienes que cambiar el orden y aplicar el ${mechanism}. Al combinar los nutrientes en la secuencia correcta, frenas el pico de glucosa un 40% y recuperas tu energía en 24 horas."
- **0:32 - 0:45 (CTA)**: "El paso a paso exacto está listo en el ${productName}. Haz clic abajo y descarga tu guía hoy mismo."

---

### Video 3: "La Regla de las 3:00 AM" (Ángulo del Insomnio y la Niebla Mental)
**Formato**: Tono íntimo, sentada en la cama con iluminación suave matutina.
- **0:00 - 0:03 (Gancho)**: "¿Te despiertas sistemáticamente a las 3:00 de la madrugada con calor o con el corazón latiendo rápido?"
- **0:03 - 0:15 (Agitación)**: "No es falta de sueño ni insomnio común. Es tu hígado protestando por un exceso de estrógenos que no puede eliminar y una caída brusca de azúcar que obliga a tus glándulas a soltar un disparo de adrenalina nocturna."
- **0:15 - 0:30 (Mecanismo)**: "En la primera semana del ${productName}, activamos una infusión y un reseteo hepático que te permite volver a dormir 7 horas de corrido desde la segunda noche."
- **0:30 - 0:45 (CTA)**: "Toca el enlace en este video para acceder a la guía completa y el Bono SOS Insomnio antes de que termine la oferta."

---

### Video 4: "Unboxing del Protocolo en Pantalla" (Ángulo Visual de Contenido y Claridad)
**Formato**: Grabación de pantalla de tablet o teléfono mostrando las hojas de acción y recetas.
- **0:00 - 0:03 (Gancho)**: "Esto es exactamente lo que recibes en tu móvil al acceder al ${productName}."
- **0:03 - 0:16 (Demostración)**: "Cero teoría aburrida: un calendario diario de 3 semanas, la lista de supermercado organizada por pasillos para que no gastes de más y recetas listas en menos de 15 minutos."
- **0:16 - 0:32 (Prueba)**: "Diseñado para mujeres ocupadas que no tienen tiempo de pasar dos horas cocinando ni quieren contar calorías en una aplicación."
- **0:32 - 0:45 (CTA)**: "Accede ahora mismo por solo $${price} USD y empieza hoy mismo tu reseteo."

---

### Video 5: "Por Qué el Cardio Te Está Engordando Tras los 35" (Ángulo Anti-Mito)
**Formato**: Ropa casual, desmitificando un mito arraigado con autoridad amigable.
- **0:00 - 0:03 (Gancho)**: "Deja de matarte en la cinta de correr si tienes más de 35 años y quieres bajar la barriga."
- **0:03 - 0:16 (Explicación)**: "El cardio extenuante eleva el cortisol. Si tus suprarrenales ya están fatigadas por los cambios hormonales, el cortisol alto le da una orden directa a tus células: 'conserva la grasa del vientre por supervivencia'."
- **0:16 - 0:32 (Solución)**: "Con micropíldoras de activación muscular de solo 8 minutos al día señalizas a tu cuerpo que queme grasa sin activar la alarma del estrés."
- **0:32 - 0:45 (CTA)**: "Descubre cómo implementarlo paso a paso haciendo clic en el botón de abajo."

---

## 3. Copys para Anuncios (Primary Texts & Headlines)

### Opción de Copy 1: Storytelling Empático (Largo)
\`\`\`text
Si tienes más de 35 años y sientes que tu metabolismo cambió las reglas de un día para otro... no te estás volviendo loca.

Te levantas con cansancio, el vientre se te inflama con un vaso de agua y por las tardes una niebla mental te roba la concentración. Vas al médico y la respuesta de siempre es: "Tus análisis están normales, es la edad".

Pero tú sabes que tu cuerpo no funciona igual.

El verdadero culpable no es tu edad: es la desincronización hormonal y la resistencia al cortisol. Cuando intentas arreglarlo pasando hambre o haciendo cardio extenuante, tu hígado se estresa y bloquea la quema de grasa.

El ${productName} es el mapa de ruta de 21 días basado en el ${mechanism} para reactivar tu vitalidad, regular tu sueño y desinflamar tu cuerpo desde casa.

✅ Plan diario de 3 semanas sin pasar hambre
✅ 4 Bonos exclusivos incluidos (Recetario 15 min, SOS Insomnio, Calculadora de Compras)
✅ Garantía incondicional de satisfacción por 30 días

Haz clic en el enlace y empieza tu transformación hoy mismo por solo $${price} USD.
\`\`\`

### Opción de Copy 2: Directo y Práctico (Corto)
\`\`\`text
¿Hinchazón abdominal, fatiga constante y desvelos a las 3:00 AM? 

No es falta de fuerza de voluntad ni "cosas de la edad". Es una señal clara de resistencia metabólica en la perimenopausia.

Descarga el ${productName} y aplica el método de 3 fases para equilibrar tus hormonas y despertar con energía en menos de 21 días.

👉 Toca el botón para acceder con el 80% de descuento por tiempo limitado.
\`\`\`

### Titulares de Alto CTR (Headlines)
1. **Desactiva la Inflamación Silenciosa en 21 Días**
2. **¿Tus Análisis Salen "Normales"? Lee Esto**
3. **El Protocolo de 21 Días para Regular tus Hormonas**
4. **Vuelve a Despertar con Energía (Sin Pasar Hambre)**

### Descripciones de Enlace
- *Acceso Inmediato y de por Vida · Garantía de 30 Días*
- *Más de 4 Bonos de Implementación Incluidos Hoy*
`;
}

function runTrafficCampaignGeneration() {
  console.log('[traffic-launcher] Starting Traffic Campaign and Checkout Pack generation...');
  const data = loadActiveData();
  const offer = data.reengineeredOffer || data.offer;
  const niche = data.niche;

  const nicheSlug = slugify(niche.niche_name || 'salud-hormonal');
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
