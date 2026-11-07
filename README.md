# FunnelMaster 🚀

Sistema autónomo impulsado por agentes de IA para el análisis, construcción, auditoría y automatización de embudos de conversión (funnels), captación de leads y validación de flujos comerciales.

El repositorio está diseñado para ser operado directamente por agentes de codificación (Antigravity, Claude Code, Devin, etc.) mediante **Skills** ejecutables, interfaces CLI y perfiles de automatización.

---

## 🏛 Arquitectura y Componentes

El proyecto sigue una arquitectura desacoplada basada en directrices claras:

- **`AGENTS.md`**: Reglas maestras, políticas de autonomía, directrices anti-alucinación y protocolos de barreras humanas.
- **`ADR.md`**: Decisiones de arquitectura (skill architecture, aislamiento de navegador con Playwright, persistencia, manejo de estado).
- **`DATA.md`**: Diccionario de datos y modelo de dominio (funnels, etapas, leads, conversiones, analítica y perfiles de estilo).
- **`DESIGN.md`**: Directrices de diseño para skills, salidas de scripts y estándares de código sin fricción visual (agent-first).
- **`agents/skills/`**: Directorio de skills y capacidades operativas modulares.

---

## 🛠 Skills Disponibles

### `browser-automation` (`agents/skills/browser-automation`)
Motor de navegación y automatización web basado en Playwright CLI y wrappers en Node.js:
- **Aislamiento de sesión**: Perfiles persistentes (`.browser-profile`) para retener cookies y sesiones autenticadas.
- **Soporte Headless / Headed**: Ejecución eficiente en background y elevación a headed sólo ante bloqueos, logins o captchas.
- **Guías específicas por sitio (`sites/`)**: Selectores y flujos testeados para evitar fallos de interacción en formularios y páginas dinámicas.
- **Modos de ejecución**:
  ```bash
  # Abrir una URL en el navegador controlado
  node agents/skills/browser-automation/scripts/browser.js open <url> [--headless|--headed]

  # Navegar a una nueva dirección
  node agents/skills/browser-automation/scripts/browser.js goto <url>

  # Ejecutar comandos de playwright CLI
  node agents/skills/browser-automation/scripts/browser.js exec snapshot
  ```

---

## 🚀 Requisitos y Puesta en Marcha

1. **Node.js**: Versión 18 o superior recomendada.
2. **Dependencias del navegador**:
   ```bash
   npm install -D playwright-cli
   ```
3. **Ejecución vía agentes**:
   Los agentes leen `AGENTS.md` antes de actuar y ejecutan las skills documentadas según la tarea asignada.
