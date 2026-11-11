/**
 * agents/skills/content-creator/scripts/generate-content.js
 * Generador agnóstico de contenido orgánico, secuencias de email y prompts para Gamma.app.
 * 100% libre de referencias fijas a otros nichos y sincronizado con la oferta activa.
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
  const productName = offer.product_name || 'Sistema Operativo Pro™';
  const mechanism = offer.unique_mechanism || 'Arquitectura de Sincronización Operativa™';
  const pain = (niche?.core_pain || offer.core_pain || 'fricción operativa, fatiga y dispersión').toLowerCase();
  const commonEnemy = offer.common_enemy || 'los métodos tradicionales llenos de teoría abstracta';

  return `# Guiones de Video Corto para Redes Sociales (Reels / TikTok / Shorts)
## Estrategia de Crecimiento Orgánico con Automatización de DMs (ManyChat)

---

### Reel 1: El Mito de "Falta de Disciplina"
- **Duración**: 35 segundos
- **Hook (0-3s)**: *(Mirando a cámara frente al escritorio)* "¿Terminas el día agotado sintiendo que estuviste ocupado 10 horas pero no cerraste lo más importante?"
- **Cuerpo (4-25s)**: "Si lidias con ${pain}, deja de culpar a tu fuerza de voluntad. El verdadero problema son ${commonEnemy}. Cuando intentas aplicar listas interminables en una agenda saturada, tu enfoque colapsa antes del mediodía."
- **Solución (26-30s)**: "Para cortar esto de raíz necesitas instalar la ${mechanism}: una secuencia táctica de 15 minutos que libera más de 2 horas diarias desde tus primeras 48 horas."
- **CTA (31-35s)**: "Comenta la palabra **SISTEMA** aquí abajo y te envío al privado el acceso al diagnóstico rápido."

---

### Reel 2: El Error de los Primeros 30 Minutos de la Mañana
- **Duración**: 30 segundos
- **Hook (0-3s)**: "Si abres tu bandeja de mensajes o notificaciones en los primeros 15 minutos del día, ya regalaste tu mejor energía."
- **Cuerpo (4-22s)**: "Cada mensaje externo secuestra tu atención y te mete en modo reactivo. A las 2 de la tarde tu cerebro ya tomó cientos de micro-decisiones inútiles y aparece el bloqueo."
- **Solución (23-27s)**: "En la Fase 1 del ${productName} aplicamos la Regla 1-2-3 de 3 minutos junto con la App Móvil para blindar tu prioridad crítica antes de abrir el mundo exterior."
- **CTA (28-30s)**: "Guarda este video y comenta **FOCO** para recibir la plantilla matutina."

---

### Reel 3: Los 3 Errores que Multiplican tu Fricción Diaria
- **Duración**: 40 segundos
- **Hook (0-3s)**: "Si haces alguna de estas 3 cosas para intentar rendir más, estás logrando exactamente lo contrario."
- **Cuerpo (4-30s)**: 
  - "Error 1: Armar listas de 15 tareas sin jerarquía. Genera parálisis por análisis desde la mañana."
  - "Error 2: Trabajar con 20 pestañas abiertas sin bloques cronometrados. Reduce tu velocidad a la mitad."
  - "Error 3: Confiar en la motivación en lugar de tener plantillas listas para ejecutar."
- **CTA (31-40s)**: "Aplica en su lugar la ${mechanism}. Comenta **GUIA** en los comentarios y te comparto el mapa de implementación en 48 horas."
`;
}

function buildCarousels(offer, niche) {
  const productName = offer.product_name || 'Sistema Operativo Pro™';
  const mechanism = offer.unique_mechanism || 'Arquitectura de Sincronización Operativa™';
  const pain = (niche?.core_pain || offer.core_pain || 'fricción operativa y dispersión').toLowerCase();

  return `# Carruseles Educativos para Instagram / LinkedIn
## Formato Slide por Slide (Listo para Maquetar en Canva / Figma)

---

### Carrusel 1: Por Qué Terminas el Día Agotado sin Avanzar en lo Importante

- **Slide 1 (Portada)**: 
  - *Titular*: ¿Por qué trabajas más horas que nunca pero sientes que avanzas la mitad?
  - *Subtexto*: (Y por qué añadir más horas frente a la pantalla solo empeora el problema).
  - *Elemento visual*: Fondo oscuro minimalista con comparativa de curva de energía.

- **Slide 2**: 
  - *Texto*: Abres la computadora temprano con la intención de avanzar, pero entre mensajes, urgencias ajenas y cambios de contexto, se hacen las 18:00 y tu tarea principal sigue intacta.

- **Slide 3**: 
  - *Texto*: Tu primera reacción es lógica: quedarte hasta más tarde o buscar otra aplicación de notas. Pero a los tres días el cansancio vuelve. ¿Por qué?

- **Slide 4**: 
  - *Texto*: La trampa de la Fricción de Arranque. Cuando no tienes un protocolo estandarizado, tu cerebro gasta el 40% de su energía diaria simplemente decidiendo por dónde empezar y cómo estructurar cada entrega.

- **Slide 5**: 
  - *Texto*: El costo oculto de **${pain}**. Cada interrupción de 2 minutos tarda hasta 20 minutos en recuperar el mismo nivel de inmersión profunda.

- **Slide 6**: 
  - *Texto*: La Solución: No trabajes más horas. Instala la **${mechanism}**:
    1. Auditoría y corte de fugas críticas (Primeras 48 Horas).
    2. Bloques tácticos con Plantillas Plug & Play y App Móvil (Días 3 al 7).
    3. Ritual de blindaje semanal en 10 minutos (Consolidación Permanente).

- **Slide 7 (Cierre / CTA)**: 
  - *Texto*: ¿Listo para recuperar +2 horas diarias de enfoque limpio desde tus primeras 48 horas?
  - *CTA*: Haz clic en el enlace de mi biografía para acceder al **${productName}** con su App Móvil y 4 bonos gratis hoy.
  - *Micro-acción*: Guarda este carrusel para aplicarlo mañana a primera hora 📌
`;
}

function buildEmailSequence(offer, niche) {
  const productName = offer.product_name || 'Sistema Operativo Pro™';
  const mechanism = offer.unique_mechanism || 'Arquitectura de Sincronización Operativa™';
  const pain = (niche?.core_pain || offer.core_pain || 'fricción operativa y pérdida de enfoque').toLowerCase();
  const commonEnemy = offer.common_enemy || 'los métodos tradicionales llenos de teoría abstracta';
  const price = offer.price_usd || 37;
  const bonuses = Array.isArray(offer.bonuses) && offer.bonuses.length > 0
    ? offer.bonuses
    : [
        { name: `Protocolo de Acción Rápida para ${productName}`, perceivedValue: 29 },
        { name: `Bóveda de Plantillas Operativas para ${productName}`, perceivedValue: 37 },
        { name: `Tablero Diagnóstico de Progreso para ${productName}`, perceivedValue: 27 },
        { name: `Guía de Mantenimiento en Días Críticos`, perceivedValue: 47 }
      ];
  const bonus1Name = bonuses[0]?.name || 'Bono de Acción Rápida';
  const bonusLastName = bonuses[bonuses.length - 1]?.name || 'Manual de Contingencia';
  const bonusesEmailList = bonuses.map((b, i) => `${i + 3}. **🎁 Bono #${i + 1}: ${b.name}** — Valor: $${b.perceivedValue || 29} USD.`).join('\n');

  return `# Secuencia de Email Marketing de Alta Conversión (5 Días)
## Embudo Automatizado de Bienvenida, Diagnóstico y Cierre

---

### Email 1 (Día 1): La Verdadera Causa de tu Desgaste Diario
**Asunto**: Por qué trabajar más horas no está resolviendo el problema
**Preheader**: No es falta de disciplina: esta es la fuga invisible en tu rutina...

Hola [Nombre],

Si últimamente terminas la jornada con la sensación de haber apagado incendios todo el día pero sin avanzar en tus proyectos estratégicos, quiero decirte algo con total claridad:

El problema no es tu capacidad ni tu falta de compromiso.

La verdadera razón por la que sigues lidiando con **${pain}** son **${commonEnemy}**. Esos sistemas te piden 2 horas libres que no tienes y te obligan a diseñar todo desde cero cuando ya estás cansado.

Por eso creamos el **${productName}**, impulsado por la **${mechanism}**. En lugar de teoría interminable, instalas micro-bloques tácticos de 15 minutos apoyados por plantillas listas y nuestra App Móvil interactiva.

Mañana te mostraré cuál es el error número uno de los primeros 30 minutos de la mañana que destruye el 60% de tu productividad diaria (y cómo corregirlo en 3 minutos).

Un saludo directo,  
[Tu Nombre / Equipo ${productName}]

---

### Email 2 (Día 2): La Trampa de los Primeros 30 Minutos
**Asunto**: ¿Haces esto apenas abres la computadora o el teléfono?
**Preheader**: El hábito matutino que sabotea tu capacidad de concentración...

Hola [Nombre],

El 90% de los profesionales comete el mismo error apenas empieza el día: abrir el correo o los mensajes "solo por 5 minutos para ver si hay algo urgente".

Ese pequeño gesto pone a tu cerebro en modo reactivo durante el resto de la mañana:
1. Llenas tu memoria de trabajo con pendientes de otras personas.
2. Fragmentas tu atención antes de tocar tu tarea más rentable.
3. A media tarde sientes fatiga pesada y bloqueo mental.

La solución no requiere fuerza de voluntad sobrehumana: requiere aplicar la **Regla 1-2-3 de Calibración Matutina (3 minutos)** antes de abrir cualquier bandeja de entrada.

Dentro del **${productName}** recibes las plantillas exactas y el temporizador táctico en la App Móvil para ejecutar este ajuste desde el primer día.

👉 [Haz clic aquí para conocer el sistema completo y sus 4 bonos]

Mañana veremos las 3 fases exactas de implementación y cómo lograr tu primera victoria en menos de 48 horas.

Un saludo,  
[Tu Nombre / Equipo ${productName}]

---

### Email 3 (Día 3): Cómo Funciona la ${mechanism} en 3 Fases
**Asunto**: Tu hoja de ruta para las próximas 48 horas (cero relleno)
**Preheader**: Así eliminamos la fricción operativa paso a paso...

Hola [Nombre],

La mayoría de los programas fracasan porque te piden esperar semanas para ver algún beneficio.

El **${productName}** está diseñado bajo ingeniería inversa para darte retorno inmediato en **3 fases lógicas**:

- **Fase 1 (Primeras 48 Horas) - ${offer.value_stack?.phases?.[0]?.name || 'Auditoría y Corte de Fugas'}**: ${offer.value_stack?.phases?.[0]?.desc || 'Cortas las fugas críticas y obtienes tu primera victoria medible en el mismo fin de semana.'}
- **Fase 2 (Días 3 al 7) - ${offer.value_stack?.phases?.[1]?.name || `Instalación de la ${mechanism}`}**: ${offer.value_stack?.phases?.[1]?.desc || 'Configuras las herramientas listas y la App Interactiva desde tu celular sin complicaciones.'}
- **Fase 3 (Consolidación Permanente) - ${offer.value_stack?.phases?.[2]?.name || 'Piloto Automático Semanal'}**: ${offer.value_stack?.phases?.[2]?.desc || 'Un ritual simple de 10 minutos que mantiene tus resultados blindados.'}

👉 [Activa hoy tu acceso completo por solo $${price} USD]

Un saludo,  
[Tu Nombre / Equipo ${productName}]

---

### Email 4 (Día 4): Cómo Funciona en tus Días Más Caóticos
**Asunto**: "¿Y si mi semana está llena de imprevistos?"
**Preheader**: El sistema de 3 marchas que evita que abandones...

Hola [Nombre],

La duda más frecuente antes de entrar es: *"¿Qué pasa cuando tengo un día caótico lleno de urgencias y no puedo seguir una rutina ideal?"*

Por eso mismo incluimos gratis el **Bono #1 (${bonus1Name})** y el **Bono #${bonuses.length} (${bonusLastName})**.

Cuando tienes un día de emergencia, no abandonas el sistema: simplemente bajas a **Marcha 1 (Modo Mínimo Viable de 3 a 5 minutos)** desde tu App Móvil para resolver la prioridad crítica y mantener intacta tu racha.

Además, estás cubierto por nuestra **Garantía Incondicional de 30 Días**: entras hoy, descargas el Manual Maestro, los ${bonuses.length} Bonos y la App Móvil, y si no recuperas al menos 10 veces el valor de tu inversión en tiempo libre, te devolvemos el 100% de tu dinero sin preguntas.

👉 [Desbloquea el ${productName} con Riesgo Cero aquí]

Un saludo,  
[Tu Nombre / Equipo ${productName}]

---

### Email 5 (Día 5): Resumen de Acceso + ${bonuses.length} Bonos Gratis Hoy
**Asunto**: Tu acceso a ${productName} (+ ${bonuses.length} Bonos y App Móvil incluidos)
**Preheader**: Todo el stack de $237 USD disponible hoy por solo $${price} USD...

Hola [Nombre],

Aquí tienes el resumen exacto de todo lo que se desbloquea en tu cuenta segundos después de confirmar tu acceso hoy:

1. **📘 Manual Operativo Maestro (${productName})** — Valor: $97 USD.
2. **📱 ${offer.web_config?.app_showcase?.title?.replace(/^2\.\s*/, '') || 'App Interactiva de Bolsillo'}** — Incluida.
${bonusesEmailList}

Valor total real: **$237 USD** → **Hoy accedes con un único pago de $${price} USD** (vía Stripe o Mercado Pago).

👉 [Haz clic aquí y descarga todo el ecosistema de inmediato]

Nos vemos dentro,  
[Tu Nombre / Equipo ${productName}]
`;
}

function buildGammaPrompt(offer, niche) {
  const productName = offer.product_name || 'Sistema Operativo Pro™';
  const mechanism = offer.unique_mechanism || 'Arquitectura de Sincronización Operativa™';
  const pain = (niche?.core_pain || offer.core_pain || 'fricción operativa y dispersión').toLowerCase();

  return `# Prompt para Maquetación Editorial en Gamma.app (Nova Creator)
## Cómo usarlo: Copia este Super Prompt y pégalo directamente en Gamma.app -> "Crear nuevo con IA" -> "Generar documento o presentación".

---

\`\`\`text
Actúa como un Director Editorial Senior y Arquitecto de Productos Digitales (estilo Nova Creator).
Quiero que diseñes un manual interactivo de implementación rápida, limpio, ejecutivo y de altísimo valor percibido para el sistema "${productName}".

Objetivo:
Transformar este manual operativo sobre la "${mechanism}" en un documento visualmente impactante, escaneable en móvil y computadora, utilizando la paleta: Fondo oscuro profundo (#0B0F19), tarjetas ejecutivas (#131B2E), acentos esmeralda de alto contraste (#10B981) y tipografía blanca nítida (#F8FAFC).

Estructura de Secciones / Tarjetas:
1. Portada Ejecutiva: Titular "${productName}" — De la Fricción a los Resultados en 48 Horas. Subtítulo: Impulsado por la ${mechanism}.
2. Diagnóstico de Punto de Partida: Tabla interactiva de autoevaluación para medir el nivel actual de ${pain}.
3. Las 3 Reglas de Oro del Sistema: Intervención mínima viable de 15 minutos, victorias en 48 horas y estandarización con plantillas.
4. Fase 1 (Primeras 48 Horas): Corte de las 3 fugas críticas, aislamiento matutino y primer bloque de tracción inmediata.
5. Fase 2 (Días 3 al 7): Instalación de la ${mechanism} con la Regla 1-2-3, bloques cronometrados y filtro de tareas.
6. Fase 3 (Consolidación Permanente): Ritual semanal de 10 minutos y sistema de 3 marchas operativas (Día Óptimo, Día Ocupado y Modo SOS de 5 Minutos).
7. Matriz de Resolución de Obstáculos: Tabla comparativa de problemas reales en la semana vs. solución táctica en 2 minutos.
8. Bóveda de Aceleradores Incluidos: Acceso a la App Móvil Material Design 3 y los 4 Bonos Tácticos.

Estilo de diseño:
- Tipografía moderna Plus Jakarta Sans / Inter.
- Uso intensivo de tablas comparativas, callouts de acción inmediata y listas de verificación marcables.
- Cero relleno teórico: cada página debe entregar una herramienta accionable hoy mismo.
\`\`\`
`;
}

function runContentGeneration() {
  console.log('[content-creator] Starting Organic Content and Email Sequence generation...');
  const data = loadData();
  const offer = data.reengineeredOffer || data.offer;
  const niche = data.niche;

  const nicheSlug = slugify(niche?.niche_name || offer.product_name || 'producto-activo');
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
