/**
 * agents/skills/content-creator/scripts/generate-content.js
 * Generador agnóstico de contenido orgánico, secuencias de email y prompts para Gamma.app.
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

function buildReelsScripts(offer, niche) {
  const productName = offer.product_name;
  const mechanism = offer.unique_mechanism;
  const avatar = offer.target_avatar;

  return `# Guiones de Video Corto para Redes Sociales (Reels / TikTok / Shorts)
## Estrategia de Crecimiento Orgánico con Automatización de DMs (ManyChat)

---

### Reel 1: El Mito de "Todo Está Bien en tus Análisis"
- **Duración**: 35 segundos
- **Hook (0-3s)**: *(Mirando a cámara seria con un papel de análisis)* "¿Te dijeron que tus análisis de sangre están normales pero tú no te reconoces en el espejo?"
- **Cuerpo (4-25s)**: "A partir de los 35 años, tus estrógenos empiezan a fluctuar. El problema es que los laboratorios buscan patologías severas, no desequilibrios hormonales tempranos. Por eso tus hormonas bajan, el cortisol sube y tu cuerpo empieza a acumular grasa en el abdomen aunque comas menos ensaladas."
- **Solución (26-30s)**: "Para frenar esto necesitas aplicar el ${mechanism}: una secuencia de 3 fases que desinflama tu hígado y equilibra tu insulina sin medicación."
- **CTA (31-35s)**: "Comenta la palabra **RESET** aquí abajo y te envío al privado la guía de inicio rápido en 24 horas."

---

### Reel 2: El Desvelo de las 3:00 AM
- **Duración**: 30 segundos
- **Hook (0-3s)**: "¿Te despiertas sistemáticamente a las 3 de la mañana sintiendo calor o ansiedad?"
- **Cuerpo (4-22s)**: "No es falta de sueño. Cuando tu hígado está saturado de toxinas y metabolitos estrogénicos, a las 3:00 AM sufre un pico de cortisol que dispara tu ritmo cardíaco y te arranca del sueño profundo."
- **Solución (23-27s)**: "En la primera semana del ${productName} usamos una infusión y un protocolo de 3 pasos que te devuelven 7 horas de descanso continuo."
- **CTA (28-30s)**: "Guarda este video y comenta **SUEÑO** para recibir el protocolo SOS nocturno."

---

### Reel 3: Los 3 Errores al Intentar Bajar de Peso tras los 35
- **Duración**: 40 segundos
- **Hook (0-3s)**: "Si tienes más de 35 años y haces esto para desinflamarte, estás logrando exactamente lo contrario."
- **Cuerpo (4-30s)**: 
  - "Error 1: Comer menos de 1.200 calorías. Tu tiroides interpreta hambruna y ralentiza tu gasto metabólico un 30%."
  - "Error 2: Matarte a cardio extenuante. Dispara el cortisol y le ordena a tus células guardar grasa abdominal."
  - "Error 3: Desayunar fruta o carbohidratos solos. Provoca un pico de insulina brutal que te deja sin energía a las 15:00."
- **CTA (31-40s)**: "Aplica en su lugar el ${mechanism}. Escribe **GUIA** en los comentarios y te comparto el plan de acción de 21 días."
`;
}

function buildCarousels(offer, niche) {
  const productName = offer.product_name;
  const mechanism = offer.unique_mechanism;

  return `# Carruseles Educativos para Instagram / LinkedIn
## Formato Slide por Slide (Listo para Maquetar en Canva / Figma)

---

### Carrusel 1: Por Qué tu Abdomen se Inflama Aunque Comas Sano

- **Slide 1 (Portada)**: 
  - *Titular*: ¿Por qué tu abdomen se inflama con un vaso de agua después de los 35?
  - *Subtexto*: (Y por qué seguir comiendo menos solo empeora las cosas).
  - *Elemento visual*: Fondo oscuro minimalista con icono de alarma o gráfico de curva hormonal.

- **Slide 2**: 
  - *Texto*: Notas que la ropa que antes te quedaba holgada hoy te aprieta. Te levantas con el vientre plano, pero a las 16:00 parece que tienes 4 meses de embarazo.

- **Slide 3**: 
  - *Texto*: Tu primera reacción es lógica: recortar carbohidratos, cenar ensalada y hacer más ejercicio. Pero la balanza no se mueve. ¿Por qué?

- **Slide 4**: 
  - *Texto*: La trampa del Cortisol. En la perimenopausia, reducir calorías drásticamente estresa tus glándulas suprarrenales. El cortisol elevado bloquea la conversión de la hormona tiroidea T4 en T3 activa. Resultado: tu metabolismo se frena.

- **Slide 5**: 
  - *Texto*: El hígado sobrecargado. Si tu hígado está ocupado procesando estrés y digestiones pesadas, no puede eliminar el exceso de estrógenos libres, provocando retención hídrica y pesadez constante.

- **Slide 6**: 
  - *Texto*: La Solución: No pases hambre. Aplica el **${mechanism}**:
    1. Drenaje hepático con fitoestrógenos moduladores (Días 1 a 7).
    2. Calibración del orden de comidas para aplanar la glucosa (Días 8 a 14).
    3. Activación mitocondrial con micropíldoras de 8 min (Días 15 a 21).

- **Slide 7 (Cierre / CTA)**: 
  - *Texto*: ¿Lista para recuperar tu vitalidad y desinflamar tu cuerpo en 21 días?
  - *CTA*: Haz clic en el enlace de mi biografía para acceder al **${productName}** con sus 4 bonos completos antes de que termine la oferta.
  - *Micro-acción*: Guarda este carrusel para no perder la información 📌
`;
}

function buildEmailSequence(offer, niche) {
  const productName = offer.product_name;
  const mechanism = offer.unique_mechanism;
  const price = offer.price_usd || 37;

  return `# Secuencia de Email Marketing de Alta Conversión (5 Días)
## Embudo Automatizado de Bienvenida y Nutrición

---

### Email 1 (Día 1): La Verdad Detrás de "Tus Análisis Están Normales"
**Asunto**: La respuesta que tu médico no te dio sobre tu cansancio
**Preheader**: No te estás volviendo loca: esto es lo que le pasa a tu cuerpo después de los 35...

Hola [Nombre],

Si en los últimos meses has ido a consulta médica sintiéndote agotada, sin poder dormir o con el vientre inflamado, y la respuesta fue un frío *"Tus análisis están completamente normales, es el estrés o la edad"*, déjame decirte algo directo:

No te estás volviendo loca. Y no es falta de fuerza de voluntad.

Los rangos de laboratorio convencionales miden la ausencia de enfermedad aguda clínica (como una diabetes declarada o un fallo orgánico severo), pero no detectan los desequilibrios funcionales tempranos de la perimenopausia.

A partir de los 35 años, tus niveles de progesterona empiezan a caer mientras los estrógenos suben y bajan de forma caótica. Si intentas resolver esto pasando hambre o entrenando hasta el agotamiento, solo consigues elevar el cortisol y bloquear tu tiroides.

Por eso diseñé el **${productName}**, basado en el **${mechanism}**. En las próximas semanas aprenderás cómo sincronizar tu organismo para volver a despertar con energía sin medicación innecesaria.

Mañana te contaré cuál es el error más común que comete el 90% de las mujeres a las 16:00 y cómo evitarlo con un ajuste simple en tu cocina.

Un abrazo,  
[Tu Nombre / Marca]

---

### Email 2 (Día 2): El Error del Desayuno Saludable
**Asunto**: ¿Tomas esto por la mañana pensando que es sano?
**Preheader**: El hábito cotidiano que dispara tu insulina y te causa niebla mental...

Hola [Nombre],

Casi todas hemos caído en esta trampa: empezar el día con un tazón grande de avena con fruta, un zumo de naranja o un café con leche vegetal creyendo que estamos nutriendo nuestro cuerpo.

Pero después de los 35 años, tus receptores de insulina se vuelven mucho más sensibles a las subidas de glucosa.

Cuando tomas carbohidratos "desnudos" a primera hora:
1. Disparas un pico violento de glucosa en sangre.
2. Tu páncreas libera un torrente de insulina para bajarla.
3. A las dos horas sufres una caída en picado: sobreviene la fatiga, la irritabilidad y unas ganas incontrolables de dulce a media tarde.

La solución no es dejar de comer carbohidratos, sino cambiar el orden de ingesta y priorizar la proteína y la fibra al despertar.

En el **${productName}** te entrego la guía paso a paso con las combinaciones exactas de alimentos que aplanan la glucosa sin privarte de nada.

👉 [Haz clic aquí para ver el método completo]

Mañana te explicaré las 3 fases exactas del protocolo y por qué funciona en solo 21 días.

Un abrazo,  
[Tu Nombre / Marca]

---

### Email 3 (Día 3): Cómo Funciona el SMPF™ en 3 Fases
**Asunto**: El mapa de 21 días (sin dietas de hambre)
**Preheader**: Así reprogramamos tu metabolismo paso a paso...

Hola [Nombre],

La mayoría de los programas de salud fallan por una sola razón: te exigen cambios extremos de la noche a la mañana.

El **${productName}** no funciona así. Está construido sobre el **${mechanism}**, estructurado en 3 fases de 7 días:

- **Fase 1 (Días 1 al 7) - Drenaje Hepático**: Apoyamos a tu hígado para eliminar el exceso de metabolitos estrogénicos estancados. Aquí es donde notas la desinflamación en tus primeras 48 horas.
- **Fase 2 (Días 8 al 14) - Calibración Glucémica**: Reordenamos tus comidas para estabilizar la energía y cortar de raíz la grasa abdominal.
- **Fase 3 (Días 15 al 21) - Blindaje Mitocondrial**: Rutinas suaves de 8 minutos que le devuelven la vitalidad a tus células sin disparar el cortisol.

Todo está pensado para mujeres con trabajo, familia y poco tiempo: recetas de 15 minutos, listas de compra ordenadas por pasillos y guías directas sin rodeos teóricos.

👉 [Accede hoy al Protocolo por solo $${price} USD]

Un abrazo,  
[Tu Nombre / Marca]

---

### Email 4 (Día 4): Caso Real y Resolución de Dudas
**Asunto**: "¿Y si yo ya lo he intentado todo?"
**Preheader**: La duda que casi le impide a Laura recuperar su energía...

Hola [Nombre],

Uno de los mensajes que más recibo es: *"Ya probé la dieta keto, el ayuno intermitente y caminar 10.000 pasos al día, pero mi barriga sigue inflamada y me siento agotada. ¿Por qué esto sería diferente?"*

La respuesta es simple: las dietas de moda fueron diseñadas para perfiles metabólicos masculinos o mujeres jóvenes de 20 años.

Cuando tienes más de 35 años, el ayuno prolongado o recortar calorías en exceso es interpretado por tu cuerpo como una amenaza de inanición, reteniendo cada gramo de grasa por supervivencia.

El **${productName}** no te pide que pases hambre. Al contrario: te enseña a comer con saciedad para que tu tiroides reciba la señal de que está a salvo.

Además, cuentas con 30 días enteros de garantía incondicional. Si no sientes una mejora tangible en tu energía y desinflamación, te devolvemos el 100% de tu dinero con un solo clic.

👉 [Comienza tu reseteo de 21 días aquí]

Un abrazo,  
[Tu Nombre / Marca]

---

### Email 5 (Día 5): Última Llamada y 4 Bonos Exclusivos
**Asunto**: Cierre de acceso a la oferta especial de $${price} USD
**Preheader**: Los 4 bonos de implementación incluidos hoy...

Hola [Nombre],

Hoy finaliza la oportunidad de acceder al **${productName}** con el 84% de descuento y los 4 bonos de regalo incluidos:

1. **Guía Rápida SOS Insomnio** (Protocolo 3-2-1 para dormir 7 horas seguidas).
2. **Recetario Antiinflamatorio de 15 Minutos** (30 platos rápidos para mujeres ocupadas).
3. **Calculadora Glucémica & Lista de Supermercado**.
4. **Checklist de Análisis Clínicos** (Qué pedirle a tu médico y cómo interpretarlo).

Un valor total de $237 USD por solo **$${price} USD (pago único y acceso de por vida)**.

No dejes que pasen otros 6 meses levantándote con fatiga y sintiendo que tu cuerpo no te responde. Tu bienestar no puede esperar al "momento perfecto".

👉 [Haz clic aquí y descarga todo el material de inmediato]

Un abrazo,  
[Tu Nombre / Marca]
`;
}

function buildGammaPrompt(offer, niche) {
  const productName = offer.product_name;
  const mechanism = offer.unique_mechanism;

  return `# Prompt para Maquetación en Gamma.app (Nova Creator)
## Cómo usarlo: Copia este prompt y pégalo directamente en Gamma.app -> "Crear nuevo con IA" -> "Generar presentación o documento".

---

\`\`\`text
Actúa como un diseñador editorial y estratega de producto digital senior (estilo Nova Creator). 
Quiero que crees un manual visual interactivo moderno, limpio y premium para el infoproducto "${productName}".

Objetivo:
Convertir una guía de salud metabólica femenina en un documento visualmente impactante, legible en móvil y con alta retención, utilizando la paleta: Fondo oscuro slate (#0B0F19), acentos esmeralda antiinflamatorio (#10B981) y blanco nítido (#F8FAFC).

Estructura de Diapositivas / Tarjetas:
1. Portada: Titular "${productName}" - Manual de 21 Días. Subtítulo: Basado en el ${mechanism}.
2. El Problema: "Tus análisis están normales pero tu cuerpo cambió de reglas". Iconografía de fatiga, insomnio y niebla mental.
3. Las 3 Reglas de Oro: Comer con saciedad, respetar el ritmo circadiano y medir victorias funcionales.
4. Fase 1 (Días 1 a 7): Drenaje Hepático. Alimentos estrella (crucíferas, aceite de oliva virgen extra) y alimentos en pausa temporal.
5. Fase 2 (Días 8 a 14): Calibración Glucémica Inteligente. La regla del orden de comidas (Fibra -> Proteína -> Carbohidratos).
6. Fase 3 (Días 15 a 21): Blindaje Mitocondrial. Rutina de 8 minutos diarios de activación muscular suave.
7. Matriz de Solución de Obstáculos: Qué hacer ante dolores de cabeza, antojos dulces o insomnio a las 3:00 AM.
8. Página de Bonos: SOS Insomnio, Recetario de 15 Minutos, Calculadora Glucémica y Checklist Médico.

Estilo de diseño:
- Tipografía moderna sans-serif.
- Sin bloques densos de texto: usar viñetas, tarjetas comparativas y badges destacados.
- Tono directo, humano y empático.
\`\`\`
`;
}

function runContentGeneration() {
  console.log('[content-creator] Starting Organic Content and Email Sequence generation...');
  const data = loadData();
  const offer = data.reengineeredOffer || data.offer;
  const niche = data.niche;

  const nicheSlug = slugify(niche.niche_name || 'salud-hormonal');
  const contentDir = path.join(__dirname, '..', '..', '..', '..', 'content', nicheSlug);

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  // 1. Reels / TikToks
  const reelsContent = buildReelsScripts(offer, niche);
  const reelsPath = path.join(contentDir, 'social-reels-scripts.md');
  fs.writeFileSync(reelsPath, reelsContent, 'utf8');
  console.log(`[content-creator] Reels scripts generated at: ${reelsPath}`);

  // 2. Carruseles
  const carouselsContent = buildCarousels(offer, niche);
  const carouselsPath = path.join(contentDir, 'instagram-carousels.md');
  fs.writeFileSync(carouselsPath, carouselsContent, 'utf8');
  console.log(`[content-creator] Instagram carousels generated at: ${carouselsPath}`);

  // 3. Email Sequence
  const emailContent = buildEmailSequence(offer, niche);
  const emailPath = path.join(contentDir, 'email-sequence-5days.md');
  fs.writeFileSync(emailPath, emailContent, 'utf8');
  console.log(`[content-creator] 5-day email sequence generated at: ${emailPath}`);

  // 4. Gamma.app Prompt
  const gammaContent = buildGammaPrompt(offer, niche);
  const gammaPath = path.join(contentDir, 'gamma-presentation-prompt.md');
  fs.writeFileSync(gammaPath, gammaContent, 'utf8');
  console.log(`[content-creator] Gamma.app prompt generated at: ${gammaPath}`);

  // 5. DB Log
  try {
    logAutomation('content-creator', 'generate_content', 'success', {
      productName: offer.product_name,
      nicheSlug,
      filesGenerated: [
        'social-reels-scripts.md',
        'instagram-carousels.md',
        'email-sequence-5days.md',
        'gamma-presentation-prompt.md'
      ]
    });
  } catch (e) {
    console.warn('[content-creator] DB log skipped:', e.message);
  }

  console.log('[content-creator] Content generation completed successfully.');
  return {
    contentDir,
    reelsPath,
    carouselsPath,
    emailPath,
    gammaPath
  };
}

if (require.main === module) {
  try {
    runContentGeneration();
  } catch (err) {
    console.error('[content-creator] Error:', err.message);
    process.exit(1);
  }
}

module.exports = {
  runContentGeneration,
  buildReelsScripts,
  buildCarousels,
  buildEmailSequence,
  buildGammaPrompt
};
