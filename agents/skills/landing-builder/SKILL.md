---
name: landing-builder
description: Genera una landing page de alta conversión desde cero en /funnel utilizando Astro o Next.js con Tailwind CSS, integrando el copy de 11 bloques del embudo, componentes modulares y preservación de UTMs.
allowed-tools: Bash(node:*) Bash(npm:*) read_file write_file edit_file
---

# Landing Builder (Astro + Tailwind CSS) — Compilador Web de Nivel Agencia

Esta skill consume el **Super Prompt de Ingeniería Web** (`funnels/<slug>/web-builder-prompt.txt`) generado por `prompt-web-maker` y el **Copy Persuasivo de 11 Bloques** (`funnels/<slug>/copy.md`) generado por `funnel-copywriter` para construir y compilar un embudo completo de alta conversión en `/funnel`.

---

## 1. Reglas Inquebrantables de Construcción (Anti-Genérico)

1. **Consumo Real de `copy.md` y `active_offer.json` (Prohibido Ignorar el Copy)**:
   - `build-funnel.js` **DEBE leer y parsear los bloques reales de `copy.md`** e inyectar sus textos, beneficios, casos de estudio y preguntas frecuentes dentro de los componentes de Astro.
   - Queda terminantemente prohibido generar componentes vacíos de 10 líneas o textos estáticos desconectados de la oferta.
2. **Prohibición de Gramática Rota y Cliché de "21 Días"**:
   - Jamás interpolar cadenas crudas que rompan la sintaxis en español (ej.: prohibido *"Si eres Profesionales..."*).
   - Prohibido forzar "21 días" cuando la oferta define fases operativas reales.
3. **Ubicación Exclusiva en `/funnel`**:
   - Todo el código fuente y compilado estático reside en `/funnel` (`/funnel/src/` y `/funnel/dist/`).
4. **Preservación Obligatoria de UTMs**:
   - Todo enlace o botón hacia `/checkout` o `/quiz` preserva automáticamente `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `src` y `sck`.
5. **Interactividad Real en Cliente**:
   - La página principal debe incluir un **Simulador / Calculadora Interactiva funcional** (con sliders o botones reactivos en JavaScript nativo ligero), acordeón FAQ interactivo, tabla comparativa antes/después y barra flotante móvil (`StickyMobileCTA`).
6. **Tailwind CSS + Animaciones en Scroll Nativas con CSS Oficial (`animation-timeline`)**:
   - Todo el estilizado visual se construye con **Tailwind CSS**.
   - `BaseLayout.astro` y los 12 componentes modulares deben incluir **Animaciones en Scroll Nativas de la Última Especificación Oficial de CSS (W3C CSS Scroll-driven Animations)** sin librerías pesadas externas:
     - Barra superior de lectura con `animation-timeline: scroll(root block)`.
     - Clases `.css-scroll-reveal`, `.css-scroll-scale`, `.css-scroll-left` y `.css-scroll-right` impulsadas por `animation-timeline: view()` y `animation-range: entry 0% cover 28%` dentro de `@supports (animation-timeline: view())` y `@media (prefers-reduced-motion: no-preference)`.
7. **Libertad Creativa por Nicho y Prohibición de Jerga Técnica o Textos de Productividad Reciclados (Regla #25)**:
   - **PROHIBIDO** escribir nombres de frameworks o sistemas de diseño (`"Google Material Design 3"`, `"Google Material You"`, `"PWA"`, `"Tailwind"`, `"432Hz"`) en los textos comerciales visibles para el comprador final.
   - **PROHIBIDO** dejar textos fijos de productividad (*"arranque con neblina"*, *"horas perdidas frente a la pantalla"*, *"valor de tu hora productiva"*) cuando el nicho activo es otro.
   - Cada página web debe renderizar **los síntomas reales, la calculadora interactiva propia del rubro, el widget interactivo del Hero, la descripción funcional real de la app y los casos de estudio reales** del nicho activo (`offer.web_config` y `copy.md`), variando libremente la disposición visual (layouts Bento, paneles financieros interactivos, tarjetas asimétricas, etc.) según la personalidad del mercado.

---

## 2. Arquitectura Completa de 12 Componentes Modulares en `/funnel`

El constructor genera y ensambla todos los componentes dentro de `/funnel/src/`:

```text
funnel/
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
└── src/
    ├── layouts/
    │   └── BaseLayout.astro       # SEO, tipografía Plus Jakarta Sans, ambient glow y script de UTMs
    ├── components/
    │   ├── HeroSection.astro      # Top bar + Split Hero + Simulador/Preview en vivo + Doble CTA
    │   ├── PainPoints.astro       # Auditoría visual de 4 síntomas + Raíz del problema + Narrativa del copy
    │   ├── QuickWins.astro        # Timeline de victorias en 2 horas, 48 horas y 7 días
    │   ├── SpecialSection.astro   # Calculadora / Simulador Interactivo con Sliders según el Arquetipo
    │   ├── UniqueMechanism.astro  # Matriz comparativa (Viejo vs Nuevo) + 3 Fases detalladas del Mecanismo
    │   ├── TargetAudience.astro   # Grid de 2 columnas: Para quién ES vs. Para quién NO es
    │   ├── SocialProof.astro      # 3 Casos de estudio verificados con métricas y transformación
    │   ├── SolutionShowcase.astro # Radiografía interna del sistema + Preview de la App Móvil (PWA)
    │   ├── BonusStack.astro       # 4 Tarjetas de Bonos con valor tachado y objeción que destruyen
    │   ├── PricingOffer.astro     # Pila de valor completa, anclaje matemático, Garantía 30 días y pasarelas
    │   ├── CreatorBio.astro       # Bloque de autoridad y respaldo metodológico
    │   ├── FaqAccordion.astro     # Acordeón interactivo con 6 preguntas clave mata-objeciones
    │   └── StickyMobileCTA.astro  # Barra inferior fija para conversión móvil con 1 toque
    └── pages/
        ├── index.astro            # Ensamblaje completo de los 12 módulos de conversión
        ├── quiz.astro             # Test de diagnóstico interactivo de 5 pasos con captura de lead
        ├── checkout.astro         # Pasarela de pago con Stripe, Mercado Pago, Order Bump y Sandbox
        └── dashboard.astro        # Panel de control con tabla de leads en vivo y simulador ROAS
```

---

## 3. Script Preservador de UTMs Obligatorio

```javascript
const params = new URLSearchParams(window.location.search);
document.querySelectorAll('a.checkout-btn').forEach(btn => {
  const url = new URL(btn.href, window.location.origin);
  params.forEach((val, key) => url.searchParams.set(key, val));
  btn.href = url.toString();
});
```

---

## 4. Flujo de Compilación y Verificación

1. Ejecutar el generador de la landing:
   ```bash
   node agents/skills/landing-builder/scripts/build-funnel.js
   ```
2. Compilar el proyecto estático en `/funnel/dist` y sincronizar la App móvil en `/funnel/dist/app`:
   ```bash
   npm --prefix funnel run build
   ```
3. Verificar que `npm test` pase al 100%.
