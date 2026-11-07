---
name: landing-builder
description: Genera una landing page de alta conversión desde cero en /funnel utilizando Astro o Next.js con Tailwind CSS, integrando el copy de 11 bloques del embudo, componentes modulares y preservación de UTMs.
allowed-tools: Bash(node:*) Bash(npm:*) read_file write_file edit_file
---

# Landing Builder (Astro / Next.js)

Esta skill crea y compila una landing page de conversión ultrarrápida desde cero dentro del directorio `/funnel` (o `/funnel/<niche-slug>`), utilizando **Astro** (por defecto por su rendimiento de cero JS innecesario) o **Next.js** con **Tailwind CSS**.

---

## Reglas Obligatorias de la Skill

1. **Cero Hardcoding**:
   - Todo el contenido de la landing se inyecta dinámicamente desde el copy generado por `funnel-copywriter` (`funnels/<niche-slug>/copy.md`) y la configuración de `DATA.md`.
   - Prohibido dejar textos de prueba, datos de nichos predeterminados o links de checkout inventados.
2. **Ubicación Exclusiva**:
   - Todo el código de la landing generada se almacena en el directorio raíz `/funnel` (ej.: `/funnel/src/` o `/funnel/<niche-slug>/`).
3. **Preservación Obligatoria de UTMs**:
   - Todo botón CTA o enlace a la pasarela de pago (Hotmart, Shopify, Stripe) debe incluir un script ligero que capture los parámetros `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` y `utm_term` de la URL y los reenvíe intactos al checkout.
4. **Mobile-First Radical**:
   - El 85%+ del tráfico de Meta Ads ocurre en smartphones. El diseño, fuentes, paddings y botones deben estar optimizados para pantallas de 375px a 430px antes de desktop.
5. **Velocidad Extrema (Core Web Vitals)**:
   - Tiempo de carga < 1.2s. Astro es la opción preferida por generar HTML estático sin sobrecarga de JavaScript del lado del cliente salvo interactividad requerida (acordeón FAQ, timers).

---

## Estructura Modular de Componentes (11 Bloques)

La landing debe ensamblarse dividiendo la página en componentes independientes en `src/components/`:

```text
funnel/
├── package.json
├── astro.config.mjs (o next.config.js)
├── tailwind.config.mjs
└── src/
    ├── layouts/
    │   └── BaseLayout.astro      # Metadata, OpenGraph, Pixel placeholder y UTM script
    ├── components/
    │   ├── HeroSection.astro     # Kicker, Headline, Subheadline, CTA primario
    │   ├── PainPoints.astro      # Lead con dolor y transformación del avatar
    │   ├── QuickWins.astro       # Beneficios inmediatos en 24-48h
    │   ├── UniqueMechanism.astro # Explicación visual del método único
    │   ├── TargetAudience.astro  # Para quién es vs Para quién no es
    │   ├── SocialProof.astro     # Testimonios / Casos de estudio
    │   ├── SolutionShowcase.astro# Vista previa del producto digital
    │   ├── BonusStack.astro      # Tarjetas de bonos con valor tachado y badge GRATIS
    │   ├── PricingOffer.astro    # Value stack, anclaje de precios, garantía y checkout
    │   ├── CreatorBio.astro      # Autoridad y empatía
    │   ├── FaqAccordion.astro    # Acordeón de preguntas frecuentes
    │   └── StickyMobileCTA.astro # Barra flotante con botón de compra para móvil
    └── pages/
        └── index.astro           # Composición secuencial de los 11 bloques
```

---

## Flujo de Ejecución Paso a Paso

### Paso 1: Lectura de Fuentes de Datos
- [ ] Leer `DATA.md` para extraer `active_niche` y los datos de `active_offer`.
- [ ] Leer el copy estructurado desde `funnels/<niche-slug>/copy.md`. Si no existe, invocar `funnel-copywriter` primero.

### Paso 2: Inicialización del Directorio `/funnel`
- [ ] Crear el directorio `/funnel` si no existe.
- [ ] Configurar `package.json`, scripts de build/dev y configuración de Tailwind CSS.

### Paso 3: Generación de Componentes y Páginas
- [ ] Crear `BaseLayout` con meta tags de viewport, fuentes y script UTM:
  ```javascript
  // Script preservador de UTMs en botones de compra
  const params = new URLSearchParams(window.location.search);
  document.querySelectorAll('a.checkout-btn').forEach(btn => {
    const url = new URL(btn.href);
    params.forEach((val, key) => url.searchParams.set(key, val));
    btn.href = url.toString();
  });
  ```
- [ ] Inyectar el texto de cada uno de los 11 bloques en sus componentes correspondientes.

### Paso 4: Verificación y Compilación
- [ ] Ejecutar comprobación de sintaxis y build:
  ```bash
  npm --prefix funnel run build
  ```
- [ ] Correr tests automatizados para validar que no existan broken links ni textos vacíos.
