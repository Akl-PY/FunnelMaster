# FunnelMaster 🚀
### Framework Autónomo de Embudos de Conversión Operado por Agentes de IA

**FunnelMaster** es un entorno de trabajo concebido para ser operado directamente por **Agentes de IA de nueva generación** (Google Antigravity, OpenAI Codex, Claude Code, Cursor, Devin).

> [!IMPORTANT]
> **Modelo Operativo (Zero External API Keys)**:
> Este repositorio **NO requiere claves de API externas** (`OPENAI_API_KEY`, etc.) ni ejecuta chatbots aislados en terminal. La Inteligencia Artificial es la propia aplicación anfitriona (Antigravity o Codex) en la que abres este proyecto.
> 
> El Agente de tu IDE lee `AGENTS.md`, descubre automáticamente las skills en `.agents/skills/`, y tú lo diriges hablando en el chat del editor. El agente ejecuta las herramientas de terminal (`run_command`), audita competidores con Playwright, redacta los copys, compila las páginas en Astro y persiste el estado en `DATA.md` y SQLite.

> [!TIP]
> **Diseñado para Personas que NUNCA han Programado**:
> No necesitas saber de código, ni abrir archivos técnicos, ni tocar la terminal. Hablas con el Agente en español cotidiano y él construye todo tu negocio digital por ti: tu página web con diseño único, tu cuestionario interactivo, tus guías en PDF y tus anuncios de venta listos para usar.

---

## 🎯 Cómo Operar el Repositorio con Antigravity / Codex

Abre este repositorio en tu aplicación de agentes (Antigravity, Codex o Cursor) y pídele al Agente en el chat lo que necesitas:

| Qué le dices al Agente en el Chat | Qué hace el Agente por ti (Bajo el capó) |
| :--- | :--- |
| *"Agente, descubre 5 nichos ganadores"* | Investiga tendencias reales de los últimos 180 días y te presenta las mejores oportunidades. |
| *"Audita este nicho en Meta Ads"* | Consulta los anuncios activos en Meta Ads Library y confirma si tiene alta demanda de compra. |
| *"Rediseña la oferta para mi producto"* | Diseña tu oferta irresistible: define una promesa atractiva, un mecanismo único y 4 bonos de regalo. |
| *"Redacta el texto de ventas sin clichés de IA"* | Escribe el copy persuasivo completo de tu página siguiendo técnicas de respuesta directa y tono natural. |
| *"Construye la página web y el cuestionario"* | Maqueta tu página de ventas y tu test diagnóstico con un diseño visual único y adaptado a tu sector. |
| *"Genera los contenidos del producto y los bonos"* | Redacta tu manual de 21 días y los 4 libros de regalo listos para entregar a tus clientes en PDF. |
| *"Genera los anuncios, emails y WhatsApp"* | Prepara los guiones en video para TikTok/Reels, correos de venta y mensajes de recuperación. |
| *"Acompáñame a subir mi embudo a Vercel"* | Te invita a usar **/browser**, abre el navegador frente a ti, te guía en el registro y publica tu web con enlace HTTPS gratuito. |
| *"Ejecuta todo el plan completo para mi nicho"* | El agente construye todo tu negocio digital de principio a fin sin que tengas que programar nada. |

---

## 🚀 Despliegue Asistido a Producción en Vercel con `/browser`

Una vez construido el embudo en `/funnel`, el Agente no te deja solo con el código en tu máquina:
1. El Agente te invita proactivamente a activar el comando:  
   👉 **/browser**
2. Se abre Chromium controlado por el Agente para navegar a `https://vercel.com/signup`.
3. Creas tu cuenta o inicias sesión con GitHub/Google (respetando tu privacidad y contraseñas mediante el protocolo de barrera humana).
4. El Agente despliega el proyecto `/funnel` a Vercel (`npx vercel --cwd funnel` o vinculando tu repositorio).
5. El Agente valida que la URL en vivo con HTTPS funcione correctamente con el Quiz y el Checkout, y te entrega el enlace final listo para recibir pauta publicitaria.

---

## 💻 Visualización y Servidores de Desarrollo

Para ver y probar las páginas generadas en tu navegador:

```bash
# Levantar la Landing Page, Quiz, Checkout y Dashboard (Puerto 3003)
npm run dev

# Exportar todos los productos y bonos a HTML imprimibles / PDF
npm run export:docs

# Simular métricas unitarias y ROAS estimado
npm run roas

# Ejecutar la batería de tests automatizados (100% obligatorio)
npm test
```

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

### 0. `orchestrator` (`agents/skills/orchestrator`) 🎯
**Skill maestra y punto de entrada principal**:
- Guía al usuario paso a paso en el plan de 48 horas.
- Coordina la ejecución y transición entre todas las skills especializadas.
- Gestiona la persistencia automática en base de datos (**SQLite** local por defecto o **PostgreSQL** con `DATABASE_URL`).
- Asiste al usuario en la resolución de desafíos o captchas instruyendo el uso del subagente nativo `/browser`.

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
Motor de navegación y automatización web basado en Playwright CLI y wrappers en Node.js.

### 8. `traffic-launcher` (`agents/skills/traffic-launcher`)
Estrategia publicitaria para Meta Ads, 5 guiones UGC/VSL y configuración completa de checkout con Order Bump y Upsell.

### 9. `content-creator` (`agents/skills/content-creator`)
Generador de contenidos orgánicos para redes (Reels, TikTok, carruseles educativos) y secuencia de nutrición por email de 5 días.

### 10. `dm-automation` (`agents/skills/dm-automation`)
Automatización de respuestas directas en Instagram y ManyChat con entrega inmediata de enlaces desde comentarios.

### 11. `cart-recovery` (`agents/skills/cart-recovery`)
Secuencias de recuperación de compras abandonadas en 3 fases para WhatsApp y SMS.

### 12. `app-maker` (`agents/skills/app-maker`)
Generador de aplicaciones móviles web interactivas (PWA) de acompañamiento en `/app` e instalables directamente en teléfonos.

### 13. `video-editor` (`agents/skills/video-editor`)
Motor de procesamiento de video vertical 9:16 con FFmpeg, ganchos animados en los primeros 3 segundos y renderizado en lote.

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
