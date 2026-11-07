---
name: prompt-web-maker
description: Genera el Perfect Prompt meticuloso y ultra-especificado para constructores web con IA (Lovable.dev, v0, Bolt), integrando el copy persuasivo, paleta cromática, microanimaciones, mockups y diseño responsive sin resultados genéricos (Paso #8 del plan de 48h).
allowed-tools: read_file write_file
---

# Prompt Web Maker (Paso #8)

Esta skill toma el copy redactado por `funnel-copywriter` y la identidad definida en `DATA.md` para producir un **"Perfect Prompt" ultra-específico para constructores web basados en IA (Lovable.dev, v0.dev, Bolt.new, etc.)**.

El objetivo es eliminar páginas web genéricas, especificando al detalle:
- Tokens de diseño (colores HEX primarios, fondos oscuros/claros, acentos de destello).
- Tipografía, tracking (espaciado entre letras) y jerarquía visual.
- Layouts responsive (móvil y desktop) con espaciados y paddings milimétricos.
- Microanimaciones interactivas (hover en botones CTA, destellos de gradiente, contadores regresivos).
- Integración exacta de los 11 bloques de copy del embudo.

---

## Estructura del Perfect Prompt

El prompt generado debe componerse de las siguientes secciones técnicas:

### 1. Rol y Stack Tecnológico
- Indicación de arquitectura: Single Page Application en React + Tailwind CSS + Lucide Icons + Framer Motion.
- Mobile-First: Optimización obligatoria para pantallas móviles (390px - 428px) donde ocurrirá el 80% del tráfico de Meta Ads.

### 2. Design System & Tokens
- **Paleta de Colores**:
  - Background principal y secundario (modo oscuro elegante o contraste blanco/puro según el nicho).
  - Color de acento de alta conversión para botones CTA (ej.: verde esmeralda `#10B981` o naranja cálido `#F97316`).
  - Color de alerta/urgencia para banners de descuento o countdown timers.
- **Tipografía**:
  - Encabezados: Sans-serif moderna con tracking ajustado (`tracking-tight`, peso `font-extrabold`).
  - Cuerpo: Legible (`text-slate-300` o `text-slate-600`), interlineado cómodo (`leading-relaxed`).

### 3. Efectos Visuales y Microanimaciones
- Destellos de fondo sutiles (glow effects mediante gradientes radiales `bg-gradient-to-r from-.../20 to-.../20 blur-3xl`).
- Botones CTA con efecto de pulso suave o reflejo de luz (shimmer effect).
- Tarjetas de bonos con bordes iluminados (`border border-slate-700 hover:border-accent/50 transition-all`).

### 4. Estructura Sección por Sección (Injecting Copy)
El prompt debe incluir el texto exacto redactado para cada uno de los 11 bloques:
1. **Hero**: Headline, subheadline, mockup 3D flotante, badge social y botón primario.
2. **Pain Points / Story**: Tarjetas de dolor con iconografía clara y narrativa del lead.
3. **Mecanismo Único**: Diagrama visual o timeline de las fases del método.
4. **Who is this for**: Grid de 2 columnas (Para ti vs No es para ti) con checks y cruces.
5. **Stack de Bonos**: Cards individuales con valor tachado y badge de "GRATIS".
6. **Pricing Stack**: Tarjeta de oferta destacada con anclaje de precio, garantía y botón checkout.
7. **FAQ**: Acordeón interactivo desplegable.

---

## Salida de la Skill
El prompt final se guarda en `funnels/<niche-slug>/web-builder-prompt.txt` listo para que el usuario o el agente lo copie y ejecute directamente en el generador web deseado.
