---
name: funnel-copywriter
description: Redacta el copy completo y persuasivo para páginas de venta (PV/Quiz) siguiendo la arquitectura de 11 bloques del Hero's Journey y reglas estrictas Anti-LLM (Paso #7 del plan de 48h).
allowed-tools: read_file write_file
---

# Funnel Copywriter — Narrativa de Respuesta Directa (Paso #7 del Playbook de 48hs)

Esta skill consume el Blueprint estratégico generado por `offer-reengineer` (`data/active_offer.json` y [`DATA.md`](../../../DATA.md)) y redacta una carta de ventas completa, visceral, específica y de alta conversión, lista para ser transformada en diseño por `prompt-web-maker` y compilada por `landing-builder`.

---

## 1. Super Prompt Maestro — Paso #7: Copywriting con Hero's Journey y Gatillos Reptilianos (Playbook 48hs)

La redacción de cada bloque se rige por la directriz maestra del **Paso #7 del Playbook de 48hs**:

> *"Basado en toda la ingeniería de la oferta, arma la narrativa completa de la página de ventas siguiendo los elementos del Hero's Journey y conectando visceralmente con el avatar. Toca gatillos mentales (especificidad, autoridad, prueba social cuantificada, aversión a la pérdida, contraste) y gatillos reptilianos (alivio del dolor, control inmediato, certidumbre). Prohibido escribir párrafos genéricos de 2 líneas o frases de relleno que sirvan para cualquier producto. Cada bloque debe describir escenas cotidianas reales del avatar, síntomas exactos, comparativas concretas contra el enemigo común y beneficios medibles."*

---

## 2. Reglas Estrictas de Calidad Copywriting (Anti-LLM & Anti-Mad-Libs)

1. **Gramática y Concordancia Impecables**:
   - **Prohibido** interpolar variables crudas en plural dentro de frases en singular (ej.: jamás escribir *"Si eres Profesionales y trabajadores..."*).
   - Adaptar siempre la redacción de forma natural: *"Si trabajas frente a una pantalla..."* o *"Para profesionales que enfrentan..."*.
2. **Prohibición de Clichés de IA**:
   - Prohibido usar: *"en el vertiginoso mundo actual"*, *"desbloquea tu máximo potencial"*, *"lleva tu vida al siguiente nivel"*, *"sin duda alguna"*, ni abusar de guiones largos (`—`).
3. **Prohibición de Bloques Esqueléticos**:
   - Ningún bloque del copy puede tener solo 1 o 2 frases genéricas. Cada sección debe desarrollar el argumento psicológico completo con ejemplos concretos del nicho activo.

---

## 3. Arquitectura Profunda de los 11 Bloques Persuasivos

El archivo `funnels/<slug>/copy.md` debe contener estos 11 bloques ricos en contenido:

### 1. `headline` — Gancho Magnético + Subheadline Mata-Objeciones
- **Kicker de hiper-segmentación**: Llamado directo al perfil exacto y su dolor principal.
- **Headline**: Promesa cuantificada + Mecanismo Único + Eliminación del sacrificio odiado.
- **Subheadline**: Cómo funciona en minutos al día con resultados desde las primeras 48 horas.
- **Micro-compromiso**: Acceso instantáneo + Garantía de 30 días + Link al Diagnóstico de 60s.

### 2. `lead_pain` — Escena Visceral del Dolor + El "Enemigo Común"
- Descripción cinematográfica de un día frustrante en la vida del avatar (qué siente a las 11:00 AM, a las 4:00 PM y al terminar el día).
- Por qué las soluciones tradicionales (parches superficiales, fuerza de voluntad, consejos genéricos) solo empeoran la fatiga y hacen perder tiempo.
- El cambio de paradigma: No es culpa de su disciplina, es un fallo en el sistema operativo diario.

### 3. `quick_wins` — Línea de Tiempo de Victorias Inmediatas
- **Primeras 2 horas**: Acción de choque inmediata que apaga el síntoma más urgente.
- **Primeras 48 horas**: Desbloqueo del cuello de botella principal y recuperación de control.
- **Primera semana**: Sistema instalado funcionando en piloto automático sin fricción.

### 4. `about_product` — El Mecanismo Único y sus 3 Fases Operativas
- Explicación clara y científica/táctica del **Mecanismo Único**.
- Desglose detallado de las **3 Fases** con el objetivo exacto, la herramienta utilizada y el resultado medible de cada fase.

### 5. `target_audience` — Filtro de Calificación (Para Quién ES vs. Para Quién NO Es)
- **4 perfiles específicos para quienes SÍ fue diseñado** (con situaciones concretas del nicho).
- **4 criterios de exclusión rotundos** (filtrando curiosos que buscan magia sin aplicar un sistema de 15 minutos).

### 6. `social_proof` — 3 Casos de Estudio Cuantificados
- Tres historias de transformación con nombre, rol profesional real, situación crítica inicial ("Antes"), fase del método que más les impactó y métrica exacta alcanzada ("Después").

### 7. `solution_demo` — Radiografía del Sistema por Dentro + App Móvil
- Qué recibe exactamente al entrar: Manual Operativo Interactivo, Plantillas listas para usar y acceso a la **Aplicación Móvil de Acompañamiento (PWA)** con temporizador táctico, generador acústico de foco y tracker de progreso.

### 8. `bonuses` — Pila de 4 Bonos Mata-Objeciones (100% Dinámicos del Nicho Activo — Regla #24)
- Presentación individual de los 4 bonos gratuitos hoy leídos dinámicamente desde `data/active_offer.json`, indicando: Valor en USD, Qué objeción destruye y Qué resultado entrega en minutos.
- **PROHIBIDO copiar nombres de bonos de ejemplo de los archivos `.md`**: Todos los ejemplos de bonos en la documentación son puramente ilustrativos. Cada embudo debe presentar bonos bautizados específicamente para las herramientas y dolores del nicho activo.

### 9. `value_stack_offer` — Anclaje Matemático de Precio, Garantía y CTA
- Suma transparente de cada componente + bonos vs. Precio único de lanzamiento.
- Garantía Incondicional de 30 Días ("Pruébalo por dentro, aplica las fases y si no recuperas con creces tu inversión, te devolvemos el 100%").

### 10. `authority_bio` — Autoridad Basada en Resultados de Campo
- Por qué se creó este método tras auditar cientos de casos reales en la industria, priorizando la ejecución práctica sobre la teoría académica.

### 11. `faq` — 6 Preguntas Frecuentes que Derriban Objeciones de Compra
- Respuestas detalladas y persuasivas sobre: falta de tiempo diario, nivel de experiencia requerido, formato de entrega + App móvil, métodos de pago locales/internacionales (Stripe y Mercado Pago), diferenciación frente a cursos largos y activación de la garantía.
