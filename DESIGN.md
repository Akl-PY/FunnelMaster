# DESIGN.md — Principios de Diseño

## Principios Fundamentales

Este repositorio está concebido con filosofía **Agent-First**. Es consumido principalmente por agentes de codificación a través de markdown estructurado, comandos CLI y scripts automatizados en Node.js.

1. **Máxima densidad informativa por token**: Documentación directa, sin prosa decorativa innecesaria ni rodeos.
2. **Determinismo operativo**: Todo comando y paso debe ser reproducible y predecible.
3. **Aislamiento**: Cada skill debe ser autocontenida, con dependencias claras y guías reproducibles.

---

## Formato de Skills

Toda nueva skill agregada a `agents/skills/<nombre>` debe cumplir con:
- **`SKILL.md` obligatorio** con frontmatter YAML:
  ```yaml
  ---
  name: nombre-de-la-skill
  description: Descripción precisa de cuándo y cómo utilizar la skill.
  ---
  ```
- **Markdown estructurado**:
  - Listas de verificación accionables con `- [ ]`.
  - Tablas para datos comparativos y esquemas.
  - Bloques de código con sintaxis exacta para Bash / Node.js.

---

## Reglas de Diseño de Skills

1. **Agnósticas de Nicho**: Una skill nunca asume un nicho fijo. Todos los parámetros se leen de `DATA.md` o por flags de ejecución (`--niche`, `--competitor`).
2. **Empíricas (Cero Alucinación)**: La skill debe guiar al agente para extraer datos reales del DOM, red o APIs públicas. Prohibido usar datos inventados como ejemplos finales o registros persistidos.
3. **Browser Automation First**: Si la skill requiere inspección de páginas web, formular los comandos llamando a `node agents/skills/browser-automation/scripts/browser.js`.

---

## Convenciones de Nomenclatura

- **Skills**: kebab-case (ej.: `browser-automation`, `funnel-auditor`).
- **Scripts y wrappers**: kebab-case o nombres funcionales (ej.: `browser.js`, `helper.js`).
- **Tablas y columnas de BD**: snake_case (ej.: `funnel_steps`, `current_step_id`).
- **Claves JSONB / Config**: snake_case (ej.: `step_order`, `target_audience`).
- **Documentos raíz de arquitectura**: MAYÚSCULAS (`README.md`, `AGENTS.md`, `ADR.md`, `DATA.md`, `DESIGN.md`).

---

## Extensiones Futuras de Interfaz de Usuario (UI)

Si en fases posteriores se incorpora una interfaz gráfica o dashboard web para humanos:
- **Stack UI**: Framework reactivo minimalista (ej.: Tailwind CSS + Vite / Next.js).
- **Design Tokens**:
  - Paleta sobria (modo oscuro preferente para dashboards de funnels y analítica).
  - Estados explícitos de componentes: `loading`, `error`, `empty`, `success`.
- **Accesibilidad**: Cumplimiento de estándares WCAG AA en contrastes y navegación por teclado.
