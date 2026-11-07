---
name: niche-discovery
description: Descubre nichos emergentes de infoproductos y valida si son ofertas ganadoras comprobadas mediante análisis de volumen de anuncios en Meta Ads Library y tráfico. Úsala para el Paso #1 y Paso #4 del plan de 48 horas.
allowed-tools: Bash(node:*) Bash(npm:*) read_file write_file search_web
---

# Niche Discovery & Validation (Paso #1 y #4)

Esta skill permite identificar nichos digitales de alta demanda y validar objetivamente si existe una **oferta ganadora activa** antes de escribir una sola línea de copy o construir una página.

---

## Criterios de Selección de Nichos (Paso #1)

Un nicho es candidato a evaluación solo si cumple con los siguientes **5 filtros obligatorios**:

1. **Escalabilidad global y digital**: El producto no depende de envíos físicos ni presencia local.
2. **Tendencia comprobable (últimos 180 días)**: Crecimiento de interés en Google Trends, TikTok Creative Center, Hotmart o Amazon KDP.
3. **Ticket promedio y monetización**: Posibilidad de vender un frontend de \$17 a \$97 USD con upsell o recurrencia.
4. **Ángulo de entrada innovador**: Nichos con demanda insatisfecha o donde se pueda introducir un nuevo "mecanismo único".
5. **Conexión emocional y visceral con el avatar**: Resuelve un dolor agudo, frustración o deseo urgente en cualquier industria o mercado (sin categorías cerradas ni listas predeterminadas).

---

## Prohibición Estricta de Opciones Hardcodeadas
- El agente **NUNCA** presenta menús fijos ni cuestionarios cerrados con opciones predeterminadas (ej.: "elige A, B o C").
- El agente **DEBE investigar el mercado en vivo**, descubrir tendencias reales y presentar una lista de nichos emergentes respaldada por datos empíricos de los últimos 180 días.

---

## Matriz de Validación de Oferta (Paso #4)

Para confirmar un nicho, se analiza la cantidad de **anuncios activos** que tienen los principales anunciantes en la [Meta Ads Library](https://www.facebook.com/ads/library/):

| Nivel de Anuncios | Diagnóstico | Veredicto | Acción del Agente |
|---|---|---|---|
| **0 a 2 anuncios** | Inexistente o abandonada | 🔴 **Rechazado** | Descartar nicho por falta de prueba de mercado. |
| **3 a 10 anuncios** | Comenzando / Validación inicial | 🟡 **Prueba** | Mercado con tracción pero volumen bajo. |
| **10 a 30 anuncios** | Vende todos los días | 🟢 **Validado** | Oferta rentable con flujo constante de caja. |
| **30 a 100 anuncios** | Oferta escalada | 🟢 **Fuerte** | Gran volumen de compradores, nicho maduro. |
| **+100 anuncios activos** | **Super Ganadora (+\$100k USD/mes)** | 🏆 **GANADOR ABSOLUTO** | **MODELAR DE INMEDIATO**. Prioridad máxima para FunnelMaster. |

> [!IMPORTANT]
> **Filtro de Tráfico**: Verificar con SimilarWeb o estimadores de tráfico que las landing pages de los competidores tengan **+10.000 visitas mensuales**.

---

## Flujo de Ejecución (Paso a Paso)

### Fase 1: Extracción y Brainstorming de Nichos
- [ ] Ejecutar el motor de descubrimiento de mercado de la skill:
  ```bash
  node agents/skills/niche-discovery/scripts/discover.js
  ```
- [ ] El script investiga las tendencias de mercado en los últimos 180 días, valida los criterios de demanda/dolor y genera el archivo [`data/discovered_niches.json`](file:///c:/Users/danie/OneDrive/Escritorio/FunnelMaster/data) registrando la traza en la base de datos (`automation_logs`).
- [ ] Definir el tipo de producto ideal para cada uno:
  - Guía / Blueprint / PDF accionable (\$17 - \$27 USD).
  - Mini-curso en video o VSL (\$37 - \$67 USD).
  - Quizz Funnel con oferta personalizada (\$27 - \$97 USD).

### Fase 2: Auditoría en Meta Ads Library
- [ ] Extraer palabras clave de búsqueda para el nicho (problemas, dolores, ganchos).
- [ ] Abrir Meta Ads Library mediante `browser-automation`:
  ```bash
  node agents/skills/browser-automation/scripts/browser.js open "https://www.facebook.com/ads/library/?active_status=all&ad_type=all&q=<KEYWORD>&search_type=keyword_unordered&media_type=all" --headless
  ```
- [ ] Contabilizar número de anuncios activos por anunciante líder.
- [ ] Localizar la URL de la página de ventas o landing del anunciante líder.

### Fase 3: Confirmación y Persistencia
- [ ] Clasificar el nicho según la matriz (de Rechazado a Ganador Absoluto).
- [ ] Presentar el reporte estructurado al usuario para su aprobación.
- [ ] Al recibir la confirmación, guardar el nicho en [`DATA.md`](file:///c:/Users/danie/OneDrive/Escritorio/FunnelMaster/DATA.md) bajo la sección `active_niche`.

---

## Plantilla de Salida de Nicho Confirmado

```markdown
### Nicho: [Nombre del Nicho]
- **Macronicho**: [Salud | Dinero | Relaciones | Mentalidad]
- **Avatar Target**: [Descripción puntual del cliente ideal]
- **Dolor / Deseo Principal**: [Problema visceral que resuelve]
- **Formato Recomendado**: [PDF / Quizz / Video / VSL]
- **Competidor Principal**: [Nombre y URL del competidor modelado]
- **Volumen de Anuncios Activos**: [Cantidad exacta detectada en Ads Library]
- **Veredicto**: [Validado (10-30) | Escalado (30-100) | Ganador Absoluto (+100)]
- **URL de la Landing a Modelar**: [Enlace a capturar en el Paso #5]
```
