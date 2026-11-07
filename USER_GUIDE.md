# Manual de Uso de FunnelMaster 🚀
### Cómo crear, validar y lanzar un embudo de ventas en menos de 48 horas con IA

Este documento está diseñado para que cualquier persona (creador, copywriter, media buyer o dueño de negocio) pueda utilizar **FunnelMaster** de principio a fin, incluso sin conocimientos avanzados de programación.

---

## 1. Inicio Rápido (En 1 Solo Comando)

Clona o abre este repositorio en tu terminal y ejecuta:

```bash
npm start
```
*(O también: `npm run wizard`)*

Aparecerá el menú interactivo de FunnelMaster:

```text
╔══════════════════════════════════════════════════════════════╗
║                    FUNNELMASTER CLI 🚀                       ║
║        Framework de Generación Rápida de Embudos con IA      ║
╚══════════════════════════════════════════════════════════════╝

Selecciona una opción:

  [1]  Investigar y Auditar Nicho en Meta Ads (Pasos #1-#4)
  [2]  Rediseñar Oferta, Mecanismo Único y Bonos (Pasos #5-#6)
  [3]  Generar Copy Persuasivo de 11 Bloques (Paso #7)
  [4]  Generar Perfect Prompt para Lovable/v0 (Paso #8A)
  [5]  Construir Landing Page y Quiz en Astro (Paso #8B)
  [6]  Crear Contenido del Infoproducto y 4 Bonos (Paso #9)
  [7]  Generar Setup de Checkout y Campaña Meta Ads (Pasos #10-#11)
  [8]  Generar Contenido Orgánico y Secuencia de Email
  [9]  Generar Flujos ManyChat y Recuperación por WhatsApp
  [10] Simular Métricas Financieras, AOV y ROAS
  
  [11] ⚡ EJECUTAR PIPELINE COMPLETO DE PUNTA A PUNTA (1-Click)
  [0]  Salir
```

> **Consejo Pro**: Si seleccionas la opción **[11]**, el sistema ejecutará todo el embudo automáticamente de forma secuencial.

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
- **Embudo Quiz**: [http://localhost:3003/quiz](http://localhost:3003/quiz)

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
