# FunnelMaster — Reglas para Agentes

Este archivo define las políticas operativas y de comportamiento que todo agente de IA que interactúe con este repositorio debe obedecer estrictamente.

---

## Reglas de Oro

### 1 — Agente ejecutor y estratégico, no mero espectador
El agente debe evaluar el impacto de cada cambio en los funnels, automatizaciones o código. No emitir respuestas condescendientes ni generar ruido innecesario. Proponer y ejecutar soluciones directas y comprobables.

### 2 — Máxima autonomía
Solo solicitar intervención del usuario para:
1. **Credenciales ausentes** que no se puedan deducir ni obtener por variables de entorno.
2. **Logins manuales o 2FA físico** que requieran interacción humana directa.
3. **Validación de decisiones estratégicas de negocio** cuando existan múltiples alternativas divergentes de alto impacto.

Si el agente puede resolver la tarea autónomamente (inspeccionar el DOM, extraer selectores, resolver errores de ejecución, reintentar comandos), **DEBE** hacerlo sin interrumpir al usuario.

### 3 — Persistencia de preferencias y estado
Toda decisión de configuración, credencial permitida, regla de negocio o dato de cliente debe persistirse inmediatamente en los archivos de configuración (`.env`, `DATA.md` o base de datos), nunca quedar atrapada únicamente en el contexto temporal de la conversación.

### 4 — Protocolo de barreras humanas
- **Login / Auth**: Levantar navegador con interfaz gráfica (`--headed`), notificar al usuario para completar el login y esperar confirmación.
- **Captcha / Cloudflare**: No intentar evadir de forma destructiva; elevar a modo `headed`, notificar al usuario para resolver el desafío y continuar.
- **Datos faltantes**: Verificar primero en los archivos de datos y variables de entorno; si falta un dato crítico, pedirlo puntualmente, persistirlo y proseguir.

### 5 — Aislamiento y control del navegador
Toda interacción web debe canalizarse a través del wrapper oficial:
```bash
node agents/skills/browser-automation/scripts/browser.js open <url>
```
- **Nunca** utilizar navegadores personales ni perfiles no aislados.
- Respetar `.browser-profile` para conservar el estado de sesión sin contaminar el entorno global.
- Antes de interactuar con el DOM de un sitio crítico, revisar si existe una guía en `agents/skills/browser-automation/sites/<site>/guide.md`.

### 6 — Estilo Anti-LLM en Copies y Comunicaciones
Cualquier copy para landing pages, correos de seguimiento, DMs o secuencias de nutrición generado por el agente debe:
- Evitar clichés de IA (ej.: "desbloquea tu potencial", "en el vertiginoso mundo actual", "sin duda alguna").
- Evitar el uso excesivo de em-dashes (`—`) y viñetas repetitivas en comunicaciones directas.
- Mantener tono conversacional, directo, persuasivo y adaptado al target del funnel.

### 7 — Repositorio agnóstico de datos privados
El código fuente y las plantillas no deben contener credenciales hardcodeadas, emails personales, tokens de API ni números de teléfono reales. Todo dato sensible se lee desde variables de entorno (`.env`) o almacenes de datos seguros.

### 8 — Cero Hardcoding: Skills y Scripts 100% Agnósticos
- **Prohibido hardcodear** nombres de nichos, productos, avatares, copys fijos o URLs de competidores dentro del código fuente de scripts o skills.
- Todo dato operativo se lee y escribe dinámicamente desde [`DATA.md`](file:///c:/Users/danie/OneDrive/Escritorio/FunnelMaster/DATA.md) (sección `active_niche` o entidades de datos) o vía argumentos CLI.
- Las skills son motores de ejecución abstractos y universales reutilizables para cualquier industria o producto.

### 9 — Búsquedas reales y verificables (Cero Datos Inventados)
- El agente y las skills **nunca** inventan resultados de mercado, anunciantes ficticios, conteos falsos de anuncios ni métricas inventadas de SimilarWeb.
- Toda validación de nicho u oferta debe realizarse mediante búsquedas reales y verificables.
- Si una búsqueda en Meta Ads Library no arroja anuncios activos suficientes, el veredicto es 0 y se rechaza el nicho; bajo ningún concepto se alucinan competidores o cifras infladas.

### 10 — Navegación web mandatoria vía `browser-automation`
Toda tarea que requiera investigar anuncios, capturar páginas de la competencia o auditar funnels debe usar exclusivamente [`agents/skills/browser-automation`](file:///c:/Users/danie/OneDrive/Escritorio/FunnelMaster/agents/skills/browser-automation).
- Emplear modo `--headless` por defecto para velocidad.
- Almacenar snapshots y dumps en directorios limpios o temporales sin ensuciar el árbol principal.

### 11 — Ejecución Mandatoria de Tests (Test-Driven Validation)
Toda skill, script, generador o cambio de código **DEBE** contar con sus correspondientes tests unitarios/de integración y el agente está obligado a **ejecutarlos y verificar que pasen al 100%** antes de dar la tarea por finalizada:
- Comando de ejecución: `npm test` o `node --test tests/**/*.test.js`.
- Los tests deben verificar que no haya valores hardcodeados, que se respete la estructura de esquemas de `DATA.md`, y que los outputs cumplan con las reglas de negocio y calidad (como filtros Anti-LLM y sintaxis de componentes).
- Queda prohibido asumir que el código funciona sin haber visto la salida exitosa del runner de tests.

### 12 — Prohibición Absoluta de Respuestas Simuladas (Execution-First Mandate)
- **Queda estrictamente prohibido simular o fingir la ejecución de una skill** redactando respuestas directamente en el chat sin haber ejecutado fácticamente el script correspondiente en la terminal.
- Cada paso debe ejecutarse mediante su comando CLI real (ej.: `node agents/skills/<skill>/scripts/<script>.js`).
- El agente solo puede responder al usuario **DESPUÉS** de haber ejecutado el comando, haber comprobado que terminó con código de salida 0, y haber confirmado que los datos se persistieron en la base de datos (`data/funnel_master.db`) o en el sistema de archivos (`data/`).
- Toda violación a esta regla es considerada un fallo crítico de comportamiento del agente.

### 13 — Modelo Operativo: Agente Host Nativo (Antigravity, Codex, Cursor, Claude Code)
- **El Agente de IA es la aplicación anfitriona** (Google Antigravity, OpenAI Codex, Claude Code o Cursor). El repositorio **NO** debe implementar llamadas HTTP a APIs de LLM externas (`OPENAI_API_KEY`, `GEMINI_API_KEY`, etc.) dentro de sus scripts para funcionar.
- El usuario opera el sistema interactuando directamente en el chat de Antigravity/Codex.
- El agente anfitrión lee `AGENTS.md`, consulta las skills en `.agents/skills/` y ejecuta los scripts de soporte (compiladores, base de datos SQLite, Playwright) a través de sus herramientas de terminal (`run_command`), escribiendo y editando los archivos del embudo.
- Los comandos como `npm start` o `npm run dev` son únicamente utilitarios para levantar los servidores web de previsualización (puerto 3003) y endpoints locales de persistencia, **nunca** agentes conversacionales alternativos por terminal.
