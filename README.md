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

### 1. `niche-discovery` (`agents/skills/niche-discovery`)
Motor de búsqueda y validación objetiva de nichos para los **Pasos #1 y #4**:
- Filtros de nicho: Demanda, escalabilidad digital, tendencias de 180 días y conexión visceral.
- Auditoría de Meta Ads Library: Medición del número de anuncios activos (3-10 comenzando, 10-30 validado, 30-100 escalado, +100 ganador absoluto).
- Persistencia automática: Registro del nicho confirmado y su competidor modelado en `DATA.md`.

### 2. `offer-reengineer` (`agents/skills/offer-reengineer`)
Ingeniería inversa de ofertas para los **Pasos #5 y #6**:
- Captura e inspección del DOM de la página de venta ganadora con `browser-automation`.
- Desglose de promesa, avatar, gatillos y precios.
- Creación de una versión superior con nuevo mecanismo único y pila de bonos irresistibles.

### 3. `funnel-copywriter` (`agents/skills/funnel-copywriter`)
Redactor de páginas de venta para el **Paso #7**:
- Arquitectura completa de 11 bloques del *Hero's Journey*.
- Estilo estricto Anti-LLM: tono conversacional, persuasivo y sin clichés de IA.

### 4. `prompt-web-maker` (`agents/skills/prompt-web-maker`)
Generador del *Perfect Prompt* para Lovable, v0 o Bolt (Paso #8):
- Especificación técnica milimétrica (paleta HEX, responsive, destellos, microanimaciones, mockups).
- Inyección directa del copy de los 11 bloques para evitar páginas genéricas.

### 5. `landing-builder` (`agents/skills/landing-builder`)
Constructor de landings desde cero en `/funnel` con **Astro** o **Next.js**:
- Arquitectura modular basada en los 11 bloques del Hero's Journey (`HeroSection`, `PainPoints`, `UniqueMechanism`, `PricingOffer`, etc.).
- Preservación obligatoria de parámetros UTM hacia pasarelas de pago (Hotmart, Shopify, Stripe).
- Enfoque Mobile-First radical y velocidad de carga ultrarrápida (Core Web Vitals).

### 6. `product-generator` (`agents/skills/product-generator`)
Generador de contenidos del infoproducto digital para el **Paso #9**:
- Estructura modular de contenidos y entregables basada en el mecanismo único.
- Redacción completa de las guías y la pila de bonos complementarios.

### 7. `browser-automation` (`agents/skills/browser-automation`)
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
3. **Ejecutar Suite de Tests**:
   ```bash
   npm test
   ```
4. **Ejecución vía agentes**:
   Los agentes leen `AGENTS.md` antes de actuar y ejecutan las skills documentadas según la tarea asignada.
