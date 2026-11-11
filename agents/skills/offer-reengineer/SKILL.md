---
name: offer-reengineer
description: Captura páginas de venta de competidores validados y aplica ingeniería inversa para rediseñar una oferta superior con nuevo mecanismo único, pila de bonos y gatillos de conversión (Pasos #5 y #6 del plan de 48h).
allowed-tools: Bash(node:*) read_file write_file
---

# Offer Re-Engineer — Ingeniería Inversa y Neuroventas (Pasos #5 y #6 del Playbook de 48hs)

Esta skill toma el nicho validado y la página del competidor, deconstruye sus puntos débiles y diseña una **Oferta Irresistible de Respuesta Directa** con un Mecanismo Único propietario, promesas cuantificadas y una Pila de Bonos mata-objeciones.

---

## 1. Super Prompt Maestro — Paso #6: Rediseño Estratégico de la Oferta (Playbook 48hs)

Toda generación de oferta en esta skill obedece la directriz maestra del **Paso #6 del Playbook de 48hs**:

> *"Actúa como un estratega jefe en marketing de respuesta directa con dominio avanzado en copywriting persuasivo, diseño de ofertas irresistibles y neuroventas. Analiza a fondo la propuesta del mercado actual en este nicho para superarla en todas sus dimensiones:*
> 1. **Auditoría de la Competencia**:
>    - Detecta su promesa principal, subpromesas, mecanismo actual, avatar y puntos ciegos (por qué el cliente sigue frustrado con las soluciones actuales).
> 2. **Elevación Emocional y Neuroventas**:
>    - Conecta con el dolor visceral reprimido del avatar (lo que no le cuenta a nadie pero sufre cada día).
>    - Activa gatillos reptilianos profundos: **Control, Certidumbre, Alivio Inmediato, Estatus, Libertad de Tiempo y Seguridad**.
> 3. **Creación del Mecanismo Único**:
>    - Bautiza el sistema con un nombre científico, técnico o propietario memorable que explique: (a) Por qué todo lo que intentó antes falló (el 'Enemigo Común') y (b) Por qué este nuevo vehículo produce resultados en una fracción del tiempo.
> 4. **Arquitectura de Fases Lógicas (Prohibido el Cliché de '21 Días')**:
>    - Prohibido usar el cliché quemado de '21 días' o nombres como 'Protocolo X 21™'.
>    - Estructura el sistema en 3 fases operativas con plazos reales y creíbles (ej.: Fase 1: Auditoría y Desbloqueo en 48h; Fase 2: Instalación del Sistema Nucleo; Fase 3: Automatización y Blindaje Permanente).
> 5. **Pila de 4 Bonos Mata-Objeciones (Anclaje de Valor)**:
>    - Cada bono debe existir únicamente para destruir una objeción específica (falta de tiempo, falta de claridad técnica, miedo a recaer, pereza de empezar de cero) y tener un entregable tangible (Calculadora, Plantilla Plug & Play, Protocolo SOS de 5 minutos, Matriz de Diagnóstico)."*

---

## 2. Reglas Anti-Genéricas de Diseño de Oferta (Regla #21)

- **Prohibido el relleno tipo "Mad-Libs"**:
  - ❌ **PROHIBIDO**: `"Resuelve [dolor] en 21 días de forma guiada y sin complicaciones"`.
  - ✅ **OBLIGATORIO**: Promesas específicas, cuantificadas y con eliminación de la fricción principal (ej.: *"Recupera 2.5 horas diarias de concentración profunda y elimina la fatiga frente a la pantalla en tus primeras 72 horas sin cambiar de trabajo ni usar apps complejas"*).
- **Prohibido el sufijo "21™"**:
  - Los nombres de productos deben reflejar autoridad y precisión técnica (ej.: *Sistema DeepWork OS™*, *Arquitectura de Foco Ejecutivo™*, *Protocolo de Descompresión Axial Activa™*).
- **Mapa de Objeciones en los Bonos (Cero Repetición de Ejemplos)**:
  - ⚠️ **REGLA CRÍTICA (Regla #24)**: Todos los nombres de productos, fases y bonos citados en este documento (como *"Protocolo SOS"*, *"Calculadora"*, *"Plantillas Plug & Play"*, *"DeepWork OS"*, etc.) son **ÚNICAMENTE EJEMPLOS ILUSTRATIVOS**.
  - Queda terminantemente prohibido reutilizar esos mismos nombres de bonos cuando se diseñe una oferta para un nuevo nicho. Cada nicho debe tener bonos bautizados con el vocabulario real y específico de su mercado (ej. ilustrativo: si es adiestramiento canino, un bono sobre paseos sin tirones; si es pastelería, una calculadora de costos por porción; si es finanzas, un rastreador de fugas de gastos).
  - Cada bono en `active_offer.json` y `DATA.md` debe incluir: `name`, `perceivedValue`, `objectionDestroyed` (qué excusa elimina) y `purpose` (resultado rápido que entrega).

---

## 3. Esquema del Blueprint de Salida (Handoff a `funnel-copywriter`, `prompt-web-maker` y `app-maker`)

El script `reengineer.js` y el agente persisten en `data/active_offer.json`, SQLite y [`DATA.md`](../../../DATA.md) una estructura rica que alimenta al resto de skills:

- **Producto Principal**: Nombre propietario + subtítulo de autoridad.
- **Promesa Principal**: Resultado tangible + marco temporal corto + "sin [objeción #1]".
- **Enemigo Común**: Por qué las soluciones tradicionales fracasan en este nicho.
- **Mecanismo Único**: Nombre del método + explicación lógica de su superioridad.
- **3 Fases de Implementación**: Con nombre, marco temporal realista, acción concreta y métrica de éxito.
- **4 Bonos Tácticos**: Con nombre de alto valor, valor en USD, objeción que derriba y descripción práctica.
- **Anclaje de Valor y Precios Realistas (Regla 26)**:
  - Los precios y anclajes se calibran dinámicamente según la moneda (USD, EUR, MXN, ARS, COP, etc.) y el rango de ticket acordado con el usuario:
    - *Low-ticket de entrada rápida*: Precio de oferta ($17–$37 USD o equivalente local) + Order Bump inmediato ($9–$19 USD) + Upsell de aceleración ($47–$97 USD).
    - *Mid-ticket de sistema completo*: Precio de oferta ($47–$147 USD o equivalente local) + Order Bump ($27–$47 USD) + Upsell de acompañamiento ($147–$297 USD).
  - Prohibido inflar valores de forma inverosímil (ej.: un producto de $27 USD tiene un anclaje percibido de ~$150 a $300 USD respaldado por sus bonos y herramientas, nunca cifras absurdas de $10,000 USD que destruyan la confianza del comprador).
  - Toda cifra debe incluir la divisa seleccionada y contar con Garantía Incondicional de 30 Días.
