# Manual de Uso de FunnelMaster 🚀
### Cómo operar el framework con Google Antigravity, OpenAI Codex, Claude Code o Cursor

**FunnelMaster** es un repositorio agentic-first: está diseñado específicamente para que lo abras dentro de tu **asistente de codificación de IA (Antigravity, Codex, Cursor o Claude Code)** y le delegues la creación, validación y lanzamiento de tus embudos conversando con él.

> [!IMPORTANT]
> **Sin claves de API externas ni configuraciones complejas**:
> No tienes que configurar OpenAI ni Gemini por tu cuenta ni instalar bots en la terminal. El agente de IA es el propio asistente de tu entorno (Antigravity / Codex), que ya cuenta con herramientas para leer archivos, navegar por la web, ejecutar comandos en terminal y redactar copys de alta conversión.

---

## 1. Flujo de Trabajo en el Chat de Antigravity / Codex

Simplemente abre esta carpeta en tu editor y escribe en el chat lo que deseas que el Agente haga:

### Paso 1: Descubrimiento y Validación de Nicho
> **Tú en el chat**:  
> *"Agente, investiga y valida 3 nichos emergentes escalables para el mercado hispano."*
- El Agente ejecutará `agents/skills/niche-discovery`, consultará Meta Ads Library con Playwright y te presentará los datos reales de anunciantes activos.

### Paso 2: Rediseño de Oferta y Mecanismo Único
> **Tú en el chat**:  
> *"Rediseña la oferta para [mi nicho o el nicho ganador]: define la nueva promesa visceral, un mecanismo único memorable y 4 bonos irresistibles."*
- El Agente ejecutará `agents/skills/offer-reengineer`, persistirá la oferta en `data/funnel_master.db` y actualizará `DATA.md`.

### Paso 3: Redacción del Copy de 11 Bloques (Hero's Journey)
> **Tú en el chat**:  
> *"Redacta el copy completo de la página de ventas aplicando la regla Anti-LLM."*
- El Agente ejecutará `agents/skills/funnel-copywriter`, pasará el linter para evitar clichés de IA y guardará `copy.md`.

### Paso 4: Construcción de la Landing y el Quiz
> **Tú en el chat**:  
> *"Construye la landing en Astro con Tailwind, preservación de UTMs y agrega el quiz interactivo de diagnóstico."*
- El Agente compilará los componentes en `/funnel/src/pages/` (`index.astro`, `quiz.astro`, `checkout.astro`, `dashboard.astro`).

### Paso 5: Creación del Infoproducto y Campaña Publicitaria
> **Tú en el chat**:  
> *"Genera la guía maestra del producto, los 4 bonos terminados, los guiones de video UGC para Meta Ads y la secuencia de 5 emails."*
- El Agente generará todos los entregables en `products/`, `traffic/`, `content/` y compilará los HTMLs imprimibles listos para subir a Hotmart o Shopify.

### Ejecución Todo-en-Uno (El Plan de 48 Horas)
> **Tú en el chat**:  
> *"Agente, ejecuta el plan completo de 48 horas de punta a punta para [Nicho/Idea]."*
- El agente orquestará todos los pasos de forma secuencial sin detenerse hasta dejar el embudo terminado.

---

## 2. Visualización Local en el Navegador

Cuando quieras ver el resultado visual de tu embudo en vivo, solo ejecuta en tu terminal:

```bash
npm run dev
```

Y abre en tu navegador:
- **Página de Ventas**: [http://localhost:3003](http://localhost:3003)
- **Embudo Quiz**: [http://localhost:3003/quiz](http://localhost:3003/quiz)
- **Checkout con Order Bump Reactivo**: [http://localhost:3003/checkout](http://localhost:3003/checkout)
- **Panel de Control / Dashboard**: [http://localhost:3003/dashboard](http://localhost:3003/dashboard)

---

## 3. Comandos de Soporte y Utilidades

El proyecto incluye scripts que tanto tú como el Agente pueden ejecutar en cualquier momento:

- `npm run export:docs`: Compila todos los entregables (`master-guide.md` y los 4 bonos) a HTML imprimible para guardarlos como PDF en 1 clic.
- `npm run roas`: Simula los Unit Economics, AOV y el retorno publicitario proyectado.
- `npm test`: Ejecuta la suite de 68 pruebas automatizadas para verificar que todo esté en regla antes de lanzar.

---

## 2. Mapa de Activos Generados en tu Proyecto

Una vez ejecutado el pipeline, encontrarás todos los activos organizados en carpetas limpias:

```text
FunnelMaster/
├── data/
│   ├── active_niche.json            # Nicho auditado en Meta Ads con volumen de competencia
│   ├── active_offer.json            # Oferta rediseñada, mecanismo único y desglose de bonos
│   └── funnel_master.db             # Base de datos SQLite local (cero configuración externa)
├── funnel/                          # Código fuente de tu Landing Page y Quiz (Astro + Tailwind)
│   ├── src/pages/index.astro        # Página de ventas principal (PV)
│   └── src/pages/quiz.astro         # Embudo Quiz interactivo de 5 preguntas
├── funnels/<nicho>/
│   ├── copy.md                      # Copy persuasivo de 11 bloques (Hero's Journey)
│   └── web-builder-prompt.txt       # Perfect Prompt para Lovable.dev, v0 o Bolt
├── products/<nicho>/
│   ├── master-guide.md              # Manual operativo de 21 días (listo para entregar)
│   └── bonuses/                     # 4 Bonos de implementación inmediata terminados
├── traffic/<nicho>/
│   ├── checkout-setup.md            # Parámetros para Hotmart/Shopify, Order Bump y Upsell
│   └── meta-ads-campaign.md         # 5 guiones de video UGC segundo a segundo y copys
├── content/<nicho>/
│   ├── social-reels-scripts.md      # Guiones para Reels/TikToks con llamadas a la acción
│   ├── instagram-carousels.md       # Carruseles educativos slide por slide
│   ├── email-sequence-5days.md      # Secuencia de nutrición y venta de 5 emails
│   └── gamma-presentation-prompt.md # Prompt para maquetar el PDF/diapositivas en Gamma.app
├── automations/<nicho>/
│   ├── manychat-flow.json           # Flujo de mensajes importable en ManyChat
│   └── manychat-guide.md            # Guía para conectar palabras clave en Instagram
└── recovery/<nicho>/
    └── whatsapp-recovery-sequences.md # 3 mensajes de WhatsApp y SMS para carritos abandonados
```

---

## 3. Cómo Visualizar tu Landing Page y Quiz Localmente

Para ver tu embudo en vivo en tu navegador:

```bash
cd funnel
npm run preview -- --port 3003
```

Abre en tu navegador:
- **Página de Ventas**: [http://localhost:3003](http://localhost:3003)
- **Embudo Quiz (Captura de Leads)**: [http://localhost:3003/quiz](http://localhost:3003/quiz)
- **Página de Checkout con Order Bump**: [http://localhost:3003/checkout](http://localhost:3003/checkout)
- **Panel de Control & Dashboard de Métricas**: [http://localhost:3003/dashboard](http://localhost:3003/dashboard)

### Captura de Leads y Exportación
Cada vez que un visitante completa el Quiz en `/quiz`, sus respuestas y datos se guardan en la base de datos SQLite. Puedes descargar todos tus prospectos en un archivo Excel/CSV con:
```bash
node scripts/export-leads.js
```
O descargarlo directamente desde el botón en el Dashboard web.

---

## 4. Compilación de tu Producto a PDF para Entrega Inmediata

No necesitas abrir Canva ni herramientas de diseño para maquetar tu infoproducto y los 4 bonos:

```bash
npm run export:docs
```
Esto compilará todos los entregables en archivos HTML elegantes en `products/<nicho>/dist_html/`. Ábrelos en cualquier navegador y presiona `Ctrl + P` para guardarlos como PDF profesional listos para subir a Hotmart o Shopify.

### Prueba de Tracking UTM
Si pruebas ingresar con parámetros de seguimiento, por ejemplo:
`http://localhost:3003/?utm_source=facebook&utm_campaign=retargeting_vsl`
El sistema inyectará automáticamente esas etiquetas en todos los botones que conducen al checkout de Hotmart/Shopify.

---

## 4. Cómo Simular la Rentabilidad de tu Campaña (ROAS)

Para conocer tus números antes de gastar un solo dólar en publicidad:

```bash
npm run roas
```

Calcula automáticamente:
- **AOV (Ticket Promedio)** sumando el producto frontend ($37), el Order Bump ($17) y el Upsell ($67).
- **CAC Máximo permitido** (punto de equilibrio).
- **ROAS estimado** según presupuesto diario.

---

## 5. Cómo Desplegar tu Embudo a Internet (Producción)

La carpeta `/funnel` está construida sobre Astro, lo que permite desplegarla en menos de 2 minutos de forma 100% gratuita en cualquier hosting moderno:

### Opción A: Vercel
1. Instala el CLI de Vercel: `npm i -g vercel`.
2. Desde la carpeta `/funnel`, ejecuta: `vercel`.
3. Sigue las instrucciones y tendrás tu dominio HTTPS activo en segundos.

### Opción B: Netlify
1. Arrastra la carpeta `/funnel/dist` directamente a [Netlify Drop](https://app.netlify.com/drop).
2. O conecta tu repositorio de GitHub para despliegue continuo.

---

## 6. Ejecución de Tests de Calidad

Para verificar que todos los componentes, reglas Anti-LLM, esquemas de datos y archivos físicos están en orden:

```bash
npm test
```
Debe mostrar `58 pass, 0 fail`.
