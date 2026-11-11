/**
 * agents/skills/product-generator/scripts/generate-product.js
 * Generador autónomo y agnóstico de contenidos de infoproductos de alto valor percibido (Paso #9).
 * Lee los datos de la oferta activa y redacta la Guía Maestra y 4 Bonos 100% diferenciados (Cero Bonos Clónicos).
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

function loadOfferData() {
  const offerJsonPath = path.join(__dirname, '..', '..', '..', '..', 'data', 'active_offer.json');
  if (fs.existsSync(offerJsonPath)) {
    return JSON.parse(fs.readFileSync(offerJsonPath, 'utf8'));
  }
  throw new Error('No se encontro data/active_offer.json. Ejecuta primero offer-reengineer.');
}

function generateMasterGuide(offer, niche) {
  const productName = offer.product_name || 'Sistema Operativo de Alto Rendimiento Pro™';
  const uniqueMech = offer.unique_mechanism || 'Arquitectura de Sincronización Operativa™';
  const promise = offer.main_promise || 'Elimina la fricción diaria y recupera el control desde las primeras 48 horas';
  const avatar = offer.target_avatar || 'Profesionales comprometidos con resultados medibles';
  const nicheName = niche?.niche_name || offer.niche_name || 'Productividad y Ejecución';
  const corePain = niche?.core_pain || offer.core_pain || 'la sobrecarga operativa y dispersión continua';
  const corePainLower = corePain.charAt(0).toLowerCase() + corePain.slice(1).replace(/\.$/, '');
  const commonEnemy = offer.common_enemy || 'los métodos tradicionales llenos de teoría densa que exigen horas libres que hoy no tienes';

  const phases = offer?.value_stack?.phases || [
    {
      timeframe: 'Fase 1 · Primeras 48 Horas',
      name: 'Auditoría de Raíz y Desbloqueo de Choque',
      desc: `Identifica y neutraliza de inmediato las fugas ocultas que provocan ${corePainLower}, logrando tu primera victoria medible en menos de 48 horas.`,
      deliverable: 'Matriz de Diagnóstico Rápido + Protocolo SOS de 5 Minutos'
    },
    {
      timeframe: 'Fase 2 · Días 3 al 7',
      name: `Instalación Operativa de la ${uniqueMech}`,
      desc: 'Sustituye la improvisación diaria por bloques tácticos de 15 minutos con plantillas listas para ejecutar.',
      deliverable: 'Plantillas Operativas Plug & Play + Secuencia Guiada en App'
    },
    {
      timeframe: 'Fase 3 · Consolidación Permanente',
      name: 'Automatización de Flujo y Blindaje Anti-Recaídas',
      desc: 'Deja instalado un estándar sostenible que mantiene tus resultados incluso en semanas de alta carga o imprevistos.',
      deliverable: 'Tablero de Mantenimiento Semanal en 10 Minutos'
    }
  ];

  return `# ${productName}
## Manual Operativo Maestro: De la Fricción a los Resultados Medibles desde tus Primeras 48 Horas

**Mecanismo Propietario**: ${uniqueMech}  
**Promesa Ejecutiva**: ${promise}  
**Diseñado específicamente para**: ${avatar}  
**Foco de Intervención**: Erradicación estructural de ${corePainLower}  
**Valor Individual del Manual**: $97 USD (Incluido en tu acceso completo)

---

## 1. Manifiesto de Implementación Rápida (Cero Relleno Teórico)

Bienvenido/a al **${productName}**. Este documento no es un libro académico para leer pasivamente ni un tratado teórico de 300 páginas. Es un **manual de operaciones en campo** diseñado para que obtengas tu primera victoria cuantificable dentro de las próximas **24 a 48 horas**.

La razón por la que la mayoría fracasa al intentar resolver **${corePainLower}** no es la falta de capacidad ni de disciplina; el verdadero culpable son **${commonEnemy}**. Cuando intentas aplicar consejos genéricos que te piden 2 horas libres al día, tu sistema nervioso y tu agenda colapsan al tercer día.

### Las 3 Reglas de Oro de la ${uniqueMech}:
1. **Intervención Mínima Viable (15 Minutos al Día)**: Más vale ejecutar un bloque quirúrgico de 15 minutos con cero distracciones que planificar sesiones maratónicas imposibles de cumplir.
2. **Victorias en 48 Horas, No en Meses**: No esperes semanas para ver cambios; al aplicar el corte de fugas de la Fase 1 hoy mismo, liberarás entre 60 y 120 minutos de carga mental desde mañana.
3. **Estandarización antes que Fuerza de Voluntad**: Usa siempre las plantillas de este manual y tu **Aplicación Móvil Material Design 3** para no gastar energía decidiendo por dónde empezar.

---

## 2. Diagnóstico Inicial de Línea Base (Completa Antes de Empezar)

Antes de ejecutar la Fase 1, califica del **1 al 5** (donde 1 = Nunca y 5 = Todos los días) tu situación actual para tener un punto de comparación objetivo a los 7 días:

| Indicador de Fricción Actual | Puntaje Hoy (1-5) | Meta Día 7 (1-5) |
| :--- | :--- | :--- |
| 1. Inicio el día respondiendo urgencias externas antes de avanzar en mi prioridad clave | [ ___ ] | ≤ 1 |
| 2. Siento fatiga acumulada o bloqueo mental a mitad de la jornada por exceso de micro-decisiones | [ ___ ] | ≤ 2 |
| 3. Pierdo más de 90 minutos diarios por interrupciones, cambios de contexto o falta de estructura | [ ___ ] | ≤ 1 |
| 4. Termino el día con la sensación de haber estado ocupado pero sin cerrar lo importante | [ ___ ] | ≤ 1 |

> **Interpretación rápida**: Si tu suma supera los **10 puntos**, estás operando con una fuga severa de energía. Ve directamente al paso de corte de hemorragia en la Fase 1.

---

## 3. ${phases[0].timeframe}: ${phases[0].name}

### Objetivo Táctico de la Fase 1
${phases[0].desc}

### Protocolo Operativo Paso a Paso (Primeras 48 Horas)

#### Paso 1.1 — El Corte de las 3 Fugas Críticas (Duración: 10 Minutos Hoy)
El 80% de **${corePainLower}** proviene de tres disparadores que ocurren durante la primera hora de tu mañana. Ejecuta este ajuste ahora mismo:
1. **Aislamiento de Entrada (Primeros 30 min del día)**: Prohibido abrir bandeja de correo, mensajería o redes antes de definir el **Único Entregable Crítico (UEC)** de la jornada.
2. **Despeje Visual y Digital**: Cierra todas las ventanas, pestañas o documentos que no pertenezcan al bloque que estás ejecutando en este instante.
3. **Definición del Criterio de Victoria**: Escribe en una sola línea: *"Hoy es un día ganado si antes de las 13:00 dejo completado: [____________________]"*.

#### Paso 1.2 — El Bloque de Tracción Inmediata (Duración: 15 Minutos)
- Abre tu **Aplicación Móvil de Acompañamiento** en la pestaña **Hoy**.
- Activa el cronómetro guiado y ejecuta los primeros 15 minutos sobre tu Entregable Crítico sin editar ni perfeccionar sobre la marcha.
- Si sientes resistencia al arrancar, activa la **Onda Binaural de 432Hz** en la pestaña *Mecanismo* de la App para aislar el ruido externo.

#### Paso 1.3 — Pausa de Descompresión Activa (Duración: 90 Segundos cada 90 Minutos)
- Antes de que aparezca el agotamiento, levántate de la silla o cambia de postura durante 90 segundos, hidrátate y realiza 3 respiraciones profundas (inhalación de 4s, retención de 2s, exhalación de 6s) para resetear la carga cognitiva.

### Checklist de Verificación — Fase 1 (Primeras 48 Horas)
- [ ] Diagnóstico de línea base completado con puntaje inicial.
- [ ] Único Entregable Crítico (UEC) definido antes de abrir mensajes.
- [ ] Primer bloque de 15 minutos ejecutado con el temporizador de la App Móvil.
- [ ] Al menos 2 pausas de descompresión de 90 segundos aplicadas en el día.
- [ ] Primera victoria tangible registrada al cierre de las primeras 24–48 horas.

---

## 4. ${phases[1].timeframe}: ${phases[1].name}

### Objetivo Táctico de la Fase 2
${phases[1].desc}

### Arquitectura de Ejecución en 3 Movimientos Diarios

| Momento del Día | Acción Exacta a Ejecutar | Tiempo Requerido | Herramienta Asociada |
| :--- | :--- | :--- | :--- |
| **1. Calibración Matutina** | Selección de 1 Prioridad Principal + 2 Tareas Secundarias | 3 Minutos | Plantilla #1 (Bono 2) + App Tab 1 |
| **2. Bloque de Inmersión SPTP** | Ejecución profunda sin notificaciones ni multitarea | 25 a 50 Minutos | Temporizador M3 + Audio 432Hz |
| **3. Cierre y Descarga Nocturna** | Registro de avance y preparación del día siguiente | 2 Minutos | Checklist de Cierre en App |

### Cómo Aplicar el Filtro de Eliminación de Tareas Basura
Cada vez que surja una tarea imprevista durante los Días 3 al 7, pásala por este filtro de 3 preguntas en 10 segundos:
1. **¿Impacta directamente en el resultado principal de esta semana?** Si la respuesta es NO → Pospón o descarta.
2. **¿Puede resolverse en menos de 2 minutos al final de la tarde?** Si la respuesta es SÍ → Agrupa todas las micro-tareas en un solo bloque de 15 minutos a última hora.
3. **¿Se repite todas las semanas?** Si la respuesta es SÍ → Conviértela en una lista de pasos fijos usando las plantillas del Bono #2.

### Checklist de Verificación — Fase 2 (Días 3 al 7)
- [ ] Calibración matutina de 3 minutos ejecutada durante 5 días consecutivos.
- [ ] Al menos 1 bloque diario de inmersión completado con cero interrupciones.
- [ ] Agrupación de correos, mensajes y pendientes menores en un único bloque vespertino.
- [ ] Reducción medible de al menos un 50% en la sensación de fatiga al terminar el día.

---

## 5. ${phases[2].timeframe}: ${phases[2].name}

### Objetivo Táctico de la Fase 3
${phases[2].desc}

### El Ritual Semanal de Calibración en 10 Minutos (Viernes o Domingo)
Para que este sistema funcione en piloto automático mes tras mes sin depender de motivación momentánea, ejecuta esta revisión de 10 minutos una vez por semana:
1. **Minutos 1 a 3 (Auditoría de Métricas)**: Abre el Bono #3 (Calculadora y Matriz Semanal) y anota cuántas horas de enfoque limpio lograste esta semana.
2. **Minutos 4 a 7 (Detección de Cuellos de Botella)**: Identifica qué día de la semana tuviste mayor fricción y cuál fue la causa exacta.
3. **Minutos 8 a 10 (Blindaje de la Semana Entrante)**: Deja definidos tus 3 bloques intocables en el calendario antes de que empiece el lunes.

### Checklist de Verificación — Fase 3 (Consolidación Permanente)
- [ ] Ritual semanal de 10 minutos agendado de forma fija en el calendario.
- [ ] Racha activa registrada en la pestaña *Progreso* de la App Móvil.
- [ ] Protocolo de contingencia (Bono #4) listo para días de emergencia o sobrecarga.
- [ ] Comparativa de puntaje Día 1 vs. Día 7 completada con mejora verificable.

---

## 6. Matriz Maestra de Resolución de Obstáculos en Campo

| Obstáculo Real en tu Semana | Causa Raíz Exacta | Intervención Táctica en 2 Minutos |
| :--- | :--- | :--- |
| **Día caótico lleno de urgencias imprevistas** | Intentar aplicar el bloque largo en medio de una crisis | Cambia al **Modo Mínimo Viable de 5 Minutos** (Bono #1 y Bono #4) para no cortar tu racha |
| **Fatiga pesada después del mediodía** | Acumulación de micro-decisiones sin pausas de descarga | Aplica la pausa activa de 90 segundos + 15 minutos con Onda Binaural 432Hz en tareas mecánicas |
| **Interrupciones constantes de clientes o equipo** | Disponibilidad reactiva permanente sin ventanas definidas | Establece 2 ventanas fijas de respuesta al día y silencia notificaciones durante tu bloque de 25 min |
| **Pérdida de constancia tras un fin de semana o viaje** | Querer recuperar todo el trabajo atrasado de golpe | Aplica la **Regla de Reactivación en 24h** (elige 1 sola tarea de 10 minutos para recuperar tracción hoy) |
`;
}

function generateBonusContent(bonus, index, offer, niche) {
  const { id, name, purpose, perceivedValue, objectionDestroyed } = bonus;
  const bonusNum = id || index + 1;
  const uniqueMech = offer?.unique_mechanism || 'Arquitectura de Sincronización Operativa™';
  const nicheName = niche?.niche_name || offer?.niche_name || 'Productividad y Trabajo Remoto';
  const corePain = (niche?.core_pain || offer?.core_pain || 'fricción operativa y dispersión').toLowerCase();

  // BONO 1: PROTOCOLO SOS DE INTERVENCIÓN EN 5 MINUTOS
  if (bonusNum === 1) {
    return `# Bono #1: ${name}
### Herramienta Táctica de Emergencia · Valor Individual: $${perceivedValue || 29} USD (Incluido Gratis)

**Propósito Operativo**: ${purpose || 'Secuencia de choque para desactivar el bloqueo agudo y recuperar el control en menos de 5 minutos.'}  
**Objeción que Elimina de Raíz**: ${objectionDestroyed || '“No tengo tiempo libre en el día para aplicar un sistema largo”'}

---

## 1. Cuándo Activar este Protocolo SOS

Este manual de bolsillo fue diseñado para tus **peores días**: esas mañanas donde te despiertas tarde, tienes 15 mensajes urgentes esperando, sientes la mente saturada por **${corePain}** y estás a punto de dar el día por perdido.

En lugar de abandonar tu progreso, ejecuta esta **Secuencia Cronometrada de 5 Minutos**.

---

## 2. Secuencia Cronometrada Minuto a Minuto (Protocolo de 5 Minutos)

| Minuto | Fase de Choque | Acción Exacta a Ejecutar Ahora Mismo |
| :--- | :--- | :--- |
| **Minuto 01** | **Corte Físico y Sensorial** | Cierra todas las pestañas salvo una. Pon el teléfono boca abajo en modo No Molestar y realiza 3 exhalaciones largas de 6 segundos. |
| **Minuto 02** | **Vaciado de Ruido Mental** | Escribe en un papel las 3 cosas que te están generando presión ahora mismo. Sacarlas de tu memoria de trabajo reduce la ansiedad un 40% al instante. |
| **Minuto 03** | **Aislamiento de la Palanca Única** | De esas 3 cosas, tacha 2 temporalmente y encierra en un círculo la única que, si se resuelve hoy, destraba el resto. |
| **Minuto 04** | **Reducción al Micro-Paso de 120s** | Divide esa tarea en una acción ridículamente pequeña que puedas empezar en los próximos 60 segundos (ej.: redactar solo el primer párrafo o estructura). |
| **Minuto 05** | **Disparo con Temporizador M3** | Abre tu App Móvil, pulsa *Iniciar Rutina (03:00)* y arranca sin detenerte hasta que suene la señal auditiva. |

---

## 3. Matriz de Respuesta Rápida ante Síntomas Agudos

- **Si sientes parálisis por exceso de pendientes**:
  - *Acción en 60s*: Oculta tu lista general. Crea una nota limpia con una sola línea y prohíbete mirar el resto por los próximos 25 minutos.
- **Si sufres agotamiento visual o neblina mental a media tarde**:
  - *Acción en 60s*: Aléjate de la pantalla 3 metros, bebe un vaso completo de agua e inicia el bloque con el generador binaural de 432Hz en la App.
- **Si una urgencia externa destruyó tu agenda de la mañana**:
  - *Acción en 60s*: Declara un "Nuevo Mediodía". Divide la tarde como si fuera un día nuevo y aplica un único bloque de 15 minutos antes de las 16:00.

---

## 4. Tarjeta de Bolsillo SOS (Lista de Verificación en 60 Segundos)

- [ ] Notificaciones silenciadas y pestañas secundarias cerradas.
- [ ] Las 3 urgencias descargadas en papel fuera de la cabeza.
- [ ] 1 sola prioridad seleccionada para los próximos 15 minutos.
- [ ] Temporizador de la App Móvil en marcha.
`;
  }

  // BONO 2: KIT DE PLANTILLAS Y FRAMEWORKS PLUG & PLAY
  if (bonusNum === 2) {
    return `# Bono #2: ${name}
### Banco de Plantillas Copiables · Valor Individual: $${perceivedValue || 37} USD (Incluido Gratis)

**Propósito Operativo**: ${purpose || 'Estructuras pre-armadas listas para copiar, rellenar y ejecutar sin pensar desde cero.'}  
**Objeción que Elimina de Raíz**: ${objectionDestroyed || '“No sé por dónde empezar ni quiero perder tiempo diseñando mi propio sistema”'}

---

## 1. Plantilla #1: Tablero Diario de Prioridad Única (Regla 1-2-3)

Copia esta estructura cada mañana (en papel, Notion, Notes o junto a tu App Móvil) en menos de 3 minutos:

> **FECHA**: [ ___ / ___ / 2026 ] · **NIVEL DE ENERGÍA INICIAL (1-10)**: [ ___ ]
>
> **🎯 1 ENTREGABLE CRÍTICO INNEGOCIABLE (60% de tu impacto de hoy)**:
> - [ ] __________________________________________________________________
> - *Bloque asignado*: De [ __:__ ] a [ __:__ ] (Sin correo ni teléfono)
>
> **⚡ 2 TAREAS DE IMPULSO COMPLEMENTARIO**:
> - [ ] 1. _______________________________________________________________
> - [ ] 2. _______________________________________________________________
>
> **🧹 3 MICRO-PENDIENTES OPERATIVOS (Agrupados al final de la tarde en 15 min)**:
> - [ ] A. ___________________ · [ ] B. ___________________ · [ ] C. ___________________

---

## 2. Plantilla #2: Guion de Bloque de Inmersión con ${uniqueMech}

Utiliza esta secuencia cada vez que te sientes a ejecutar un bloque de 25 o 50 minutos:

| Etapa del Bloque | Minutos | Qué Hacer Exactamente |
| :--- | :--- | :--- |
| **1. Preparación de Cabina** | Min 00 a 02 | Abrir únicamente el archivo de trabajo, activar Onda 432Hz en la App y definir qué debe quedar listo al terminar el reloj. |
| **2. Tracción Bruta (Cero Edición)** | Min 02 a 20 | Avanzar a máxima velocidad sobre el entregable sin corregir detalles estéticos ni cambiar de ventana. |
| **3. Pulido y Cierre con Sello** | Min 20 a 25 | Revisar el resultado, guardar cambios y dejar anotado el siguiente paso exacto para el próximo bloque. |

---

## 3. Plantilla #3: Mensajes Pre-Redactados para Blindar tu Tiempo sin Fricción

Copia y pega estos mensajes para proteger tus bloques de concentración frente a clientes, jefes o colegas sin parecer inaccesible:

- **Guion A (Respuesta rápida para diferir una solicitud no urgente)**:
  > *"¡Hola [Nombre]! Recibido. Ahora mismo estoy cerrando una entrega prioritaria para tenerla lista a tiempo. Apenas termine mi bloque a las [Hora, ej: 12:30] lo reviso con calma y te doy respuesta."*
- **Guion B (Para evitar reuniones innecesarias de 45 minutos)**:
  > *"Para avanzar más rápido hoy sin esperar a coincidir en agenda: ¿me envías por aquí un audio de 2 minutos o 3 puntos con lo clave y te devuelvo la solución resuelta antes de las [Hora]?"*

---

## 4. Checklist de Uso de Plantillas

- [ ] Plantilla 1-2-3 rellenada antes de revisar el teléfono por la mañana.
- [ ] Bloques de inmersión ejecutados separando creación bruta de corrección.
- [ ] Mensajes de blindaje aplicados para evitar interrupciones en horario pico.
`;
  }

  // BONO 3: CALCULADORA Y MATRIZ DE AUDITORÍA SEMANAL
  if (bonusNum === 3) {
    return `# Bono #3: ${name}
### Sistema de Medición y Auditoría · Valor Individual: $${perceivedValue || 27} USD (Incluido Gratis)

**Propósito Operativo**: ${purpose || 'Herramienta cuantitativa para medir tu progreso real en horas recuperadas, claridad y retorno económico.'}  
**Objeción que Elimina de Raíz**: ${objectionDestroyed || '“No sé cómo medir si realmente estoy mejorando cada semana”'}

---

## 1. Test de Auditoría Operativa sobre 100 Puntos

Suma **10 puntos** por cada afirmación cumplida durante los últimos 7 días:

- [ ] **+10 pts**: Completé mi Entregable Crítico antes del mediodía al menos 4 días de esta semana.
- [ ] **+10 pts**: Pasé los primeros 30 minutos de la mañana sin abrir redes sociales ni bandejas de entrada reactivas.
- [ ] **+10 pts**: Ejecuté al menos 1 bloque diario cronometrado desde la App Móvil.
- [ ] **+10 pts**: Apliqué pausas breves de descompresión antes de llegar al agotamiento mental.
- [ ] **+10 pts**: Agrupé los mensajes, correos y trámites menores en un solo bloque por la tarde.
- [ ] **+10 pts**: Utilicé el Protocolo SOS de 5 minutos cuando surgió un imprevisto en vez de abandonar el día.
- [ ] **+10 pts**: Cerré mi jornada a una hora definida registrando mi victoria diaria.
- [ ] **+10 pts**: Reduje visiblemente las horas perdidas en multitarea o pestañas abiertas sin propósito.
- [ ] **+10 pts**: Mantuve mi racha activa en la App Móvil durante la semana.
- [ ] **+10 pts**: Terminé la semana con mayor claridad mental y energía disponible que la semana anterior.

### Tabla de Diagnóstico según tu Puntuación Total:

| Rango de Puntos | Nivel Operativo | Acción Recomendada para los Próximos 7 Días |
| :--- | :--- | :--- |
| **0 a 40 Puntos** | **Fuga Crítica** | No intentes hacer todo a la vez. Aplica únicamente el Paso 1.1 de la Guía Maestra y el Bono #1 (SOS 5 min) durante 3 días. |
| **50 a 70 Puntos** | **Tracción en Marcha** | Ya cortaste las fugas principales. Incorpora la Plantilla 1-2-3 del Bono #2 cada mañana para subir al 80%. |
| **80 a 100 Puntos** | **Alto Rendimiento SPTP** | Tu sistema opera en piloto automático. Mantén el ritual de calibración de 10 minutos los viernes. |

---

## 2. Fórmula de Cálculo de Tiempo y Valor Económico Recuperado

Completa esta ecuación simple al final de cada semana para cuantificar tu retorno de inversión:

1. **Horas diarias recuperadas de dispersión/fatiga**: \`[ A ]\` horas/día (Promedio: \`1.5\` a \`2.5\` h)
2. **Horas recuperadas al mes** (\`A × 22 días hábiles\`): \`[ B ]\` horas/mes
3. **Valor de tu hora profesional en USD**: \`$[ C ]\` USD/hora
4. **Valor Económico Mensual Recuperado (\`B × C\`)**: **\`$[ _________ ] USD / mes\`**

---

## 3. Registro de Evolución de 4 Semanas

| Semana | Puntaje Auditoría (0-100) | Bloques Completados | Horas Libres Recuperadas | Victoria Principal Lograda |
| :--- | :--- | :--- | :--- | :--- |
| **Semana 1** | _____ / 100 | _____ bloques | _____ hrs | ___________________________ |
| **Semana 2** | _____ / 100 | _____ bloques | _____ hrs | ___________________________ |
| **Semana 3** | _____ / 100 | _____ bloques | _____ hrs | ___________________________ |
| **Semana 4** | _____ / 100 | _____ bloques | _____ hrs | ___________________________ |
`;
  }

  // BONO 4: MANUAL DE BLINDAJE Y PREVENCIÓN DE RECAÍDAS
  return `# Bono #4: ${name}
### Sistema de Mantenimiento y Anti-Frágil · Valor Individual: $${perceivedValue || 47} USD (Incluido Gratis)

**Propósito Operativo**: ${purpose || 'Plan de blindaje para mantener tus resultados en semanas de máxima presión, viajes o imprevistos.'}  
**Objeción que Elimina de Raíz**: ${objectionDestroyed || '“Ya probé otros métodos antes y terminé abandonando a las pocas semanas”'}

---

## 1. Por Qué Fallan los Hábitos Tradicionales (Y Cómo Blindar el Tuyo)

La razón número uno por la que las personas abandonan cualquier sistema es la **mentalidad de "Todo o Nada"**: creen que si un martes caótico no pueden hacer su rutina perfecta de 45 minutos, ya "rompieron el método" y abandonan por completo.

Con la **${uniqueMech}**, jamás dependes de tener un día perfecto. Tienes **3 Marchas Operativas** según tu nivel de energía y tiempo disponible:

| Marcha Operativa | Cuándo Usarla | Qué Haces Exactamente (Tiempo Total) |
| :--- | :--- | :--- |
| **🟢 Marcha 3 (Día Óptimo)** | Días normales con agenda bajo control | Calibración 1-2-3 (3m) + 2 Bloques de Inmersión (50m) + Cierre nocturno (2m). |
| **🟡 Marcha 2 (Día Ocupado)** | Días con muchas reuniones o entregas | Calibración rápida (2m) + 1 Bloque Táctico (25m) + Checklist en App. |
| **🔴 Marcha 1 (Día de Caos / SOS)** | Emergencias, viajes, enfermedad o agotamiento extremo | **Modo Mínimo Viable**: 1 sola micro-acción de **3 a 5 minutos** para mantener viva tu racha. |

---

## 2. Los 4 Disparadores de Recaída y su Antídoto Inmediato

1. **Disparador #1: "Hoy me levanté sin ganas ni energía"**
   - *Antídoto*: Reduce la barra de entrada. No te pidas terminar el proyecto entero; comprométete únicamente a encender el cronómetro de 3 minutos en la App Móvil. El movimiento genera la energía, no al revés.
2. **Disparador #2: "Acumulé 2 días sin aplicar el sistema por una urgencia"**
   - *Antídoto*: Aplica la **Regla de Cero Culpa y Reinicio en 15 Minutos**. Prohibido intentar "recuperar el doble de trabajo" el tercer día. Retoma en Marcha 1 o Marcha 2 con una sola tarea ganadora.
3. **Disparador #3: "El entorno en casa o la oficina vuelve a interrumpirme"**
   - *Antídoto*: Reactiva la señal física (auriculares puestos + Onda 432Hz + mensaje automático del Bono #2) durante una ventana corta de 25 minutos.
4. **Disparador #4: "Siento que vuelvo a llenarme de tareas secundarias"**
   - *Antídoto*: Haz una purga de 5 minutos tachando o posponiendo todo lo que no mueva la aguja de esta semana.

---

## 3. Contrato de Blindaje y Continuidad

- [ ] Acepto usar la **Marcha 1 (3 a 5 minutos)** en mis días difíciles en lugar de abandonar.
- [ ] Nunca permitiré pasar 2 días consecutivos sin registrar al menos una micro-victoria en mi App Móvil.
- [ ] Revisaré mi matriz de puntaje (Bono #3) cada viernes en menos de 10 minutos.
`;
}

function runProductGeneration() {
  console.log('[product-generator] Starting high-value product content generation...');
  const data = loadOfferData();
  const offer = data.reengineeredOffer || data.offer;
  const niche = data.niche;

  const nicheSlug = slugify(niche?.niche_name || offer.product_name || 'producto-activo');
  const productsDir = path.join(__dirname, '..', '..', '..', '..', 'products', nicheSlug);
  const bonusesDir = path.join(productsDir, 'bonuses');

  if (!fs.existsSync(bonusesDir)) {
    fs.mkdirSync(bonusesDir, { recursive: true });
  } else {
    fs.readdirSync(bonusesDir).forEach(f => {
      if (f.endsWith('.md')) fs.unlinkSync(path.join(bonusesDir, f));
    });
  }
  const distHtmlDir = path.join(productsDir, 'dist_html');
  if (fs.existsSync(distHtmlDir)) {
    fs.readdirSync(distHtmlDir).forEach(f => {
      if (f.endsWith('.html')) fs.unlinkSync(path.join(distHtmlDir, f));
    });
  }

  // 1. Generar Guía Maestra
  const masterGuideContent = generateMasterGuide(offer, niche);
  const masterGuidePath = path.join(productsDir, 'master-guide.md');
  fs.writeFileSync(masterGuidePath, masterGuideContent, 'utf8');
  console.log(`[product-generator] Master guide generated at: ${masterGuidePath}`);

  // 2. Generar los 4 Bonos Diferenciados
  const generatedBonuses = [];
  const bonuses = offer.bonuses || [];
  bonuses.forEach((bonus, index) => {
    const bonusSlug = `bono-${bonus.id || index + 1}-${slugify(bonus.name || bonus.title || 'acelerador').slice(0, 25)}`;
    const bonusContent = generateBonusContent(bonus, index, offer, niche);
    const bonusFilePath = path.join(bonusesDir, `${bonusSlug}.md`);
    fs.writeFileSync(bonusFilePath, bonusContent, 'utf8');
    generatedBonuses.push({ file: `${bonusSlug}.md`, name: bonus.name || bonus.title });
    console.log(`[product-generator] Bonus generated: ${bonusFilePath}`);
  });

  // 3. Registrar en logs de automatización
  try {
    logAutomation('product-generator', 'generate_product', 'success', {
      productName: offer.product_name,
      nicheSlug,
      bonusesCount: generatedBonuses.length,
      masterGuide: 'master-guide.md'
    });
  } catch (e) {
    console.warn('[product-generator] DB log skipped:', e.message);
  }

  console.log('[product-generator] Product generation completed successfully.');
  return {
    productsDir,
    masterGuidePath,
    generatedBonuses
  };
}

if (require.main === module) {
  try {
    runProductGeneration();
  } catch (err) {
    console.error('[product-generator] Error:', err.message);
    process.exit(1);
  }
}

module.exports = {
  runProductGeneration,
  generateMasterGuide,
  generateBonusContent
};
