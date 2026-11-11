---
name: prompt-web-maker
description: Genera el Perfect Prompt meticuloso y ultra-especificado para constructores web con IA (Lovable.dev, v0, Bolt), integrando el copy persuasivo, paleta cromática, microanimaciones, mockups y diseño responsive sin resultados genéricos (Paso #8 del plan de 48h).
allowed-tools: read_file write_file
---

# Prompt Web Maker — Arquitecto del Super Prompt Web (Paso #8 del Playbook de 48 Horas)

Esta skill actúa como el **Cerebro de Diseño e Ingeniería UI/UX** entre el copy persuasivo (`funnel-copywriter`) y el constructor de páginas (`landing-builder` o herramientas externas como Lovable.dev, v0.dev, Bolt.new y Cursor).

Su misión es erradicar por completo las páginas web planas, genéricas o repetitivas aplicando la instrucción maestra del **Paso #8 del Playbook de 48hs**:

> *"A partir de ahora, necesito que me crees un perfect prompt para Lovable. Con los copies que me pasaste de la página web, quiero que me crees una página web completa. Pero necesito que te tomes el tiempo de explicarlo de la forma más detallada posible, porque Lovable siempre me entrega una página genérica. Necesito que coloques todos los detalles de animación, de colores, de destellos, que sea responsive para computadora, para celular... Todo de la forma más meticulosa posible, los movimientos, necesito que lo detalles, inclusive los espacios entre las letras, qué tan grandes, qué tan chicos los márgenes a los costados, los mockups, las imágenes. Necesito que me crees un perfect prompt detallado con el branding y los copies que estuvimos hablando dentro de este chat."*

---

## 1. Cadena de Super Prompts (Cómo alimenta a `landing-builder`)

1. Lee la oferta activa (`data/active_offer.json`) y el copy completo de los 11 bloques (`funnels/<slug>/copy.md`).
2. Detecta el **Arquetipo Visual** del nicho (`archetypes.js`) y define la arquitectura de componentes interactivos más efectiva para ese mercado.
3. Genera un **Super Prompt Maestro de Ingeniería Web** en `funnels/<slug>/web-builder-prompt.txt` que especifica:
   - Paleta de Colores exacta en HEX/RGBA con jerarquía de superficies y contrastes.
   - Escala tipográfica, `letter-spacing` (`tracking-tight` `-0.03em`), `line-height` y márgenes laterales milimétricos para móvil y desktop.
   - Microanimaciones, efectos de luz ambiente (radial glows, glassmorphism, shimmer sweeps en botones CTA).
   - Especificación interactiva del **Simulador / Calculadora en Vivo** del arquetipo.
   - Especificación de la **Tabla Comparativa de Alto Contraste** (*Método Tradicional Fallido vs. Nuevo Mecanismo Único*).
   - Inyección íntegra de los 11 bloques del copy persuasivo.
4. Pasa este plano directamente a `landing-builder` para que construya la aplicación web real en `/funnel`.

---

## 2. Especificaciones Obligatorias del Super Prompt

### A. Design System & Paleta de Colores por Arquetipo
- **Fondos con Profundidad**: Prohibido usar fondos planos aburridos. Combinar color base oscuro/claro (`bgMain`) con mallas sutiles (`bg-[radial-gradient(...)]`) y tarjetas translúcidas (`backdrop-blur-md`).
- **Jerarquía de Bordes y Destellos**: Bordes de `1px` con iluminación progresiva en hover y sombras cromáticas (`shadow-[0_0_35px_glow]`).
- **Tipografía de Alta Conversión**:
  - Títulos: `Plus Jakarta Sans` o `Inter`, peso `800` (`font-extrabold`), tracking `-0.025em` a `-0.035em`.
  - Cuerpo de lectura: `16px` a `18px` en móvil, interlineado `1.65`, ancho de línea controlado (`60ch-70ch`) para lectura veloz sin fatiga visual.

### B. Microanimaciones, Tailwind CSS y Animaciones en Scroll Nativas con CSS Oficial
- **Tailwind CSS Mandatorio**:
  - Todo el sistema de layout, grillas asimétricas (`grid-cols-1 lg:grid-cols-12`), espaciados (`py-16 md:py-24`), bordes translúcidos (`border-slate-800/80`), efectos de cristal (`backdrop-blur-xl`) y estados interactivos (`hover:-translate-y-1`, `active:scale-95`) debe escribirse con **Tailwind CSS**.
- **Animaciones en Scroll Nativas con la Última Especificación Oficial de CSS (W3C CSS Scroll-Driven Animations)**:
  - Prohibido depender de librerías pesadas de JavaScript para animar el scroll. El Super Prompt y la página compilada deben utilizar las propiedades nativas de la última versión oficial de CSS:
    1. **`animation-timeline: scroll(root block)`**: Para la barra superior de progreso de lectura que avanza de `0%` a `100%` en tiempo real conforme el usuario baja por la página.
    2. **`animation-timeline: view()` + `animation-range: entry 0% cover 28%`**: Para revelar orgánicamente cada bloque, tarjeta de síntoma, fila de comparativa, calculadora, testimonio y bono a medida que entran en el viewport del navegador (`css-scroll-reveal`, `css-scroll-scale`, `css-scroll-slide`).
    3. **Orden de Declaración y Accesibilidad**: Declarar siempre `animation-timeline` **después** del shorthand `animation`, envolviendo las reglas en `@supports (animation-timeline: view())` y `@media (prefers-reduced-motion: no-preference)`.
- **85%+ del tráfico proviene de anuncios en el móvil**:
  - Márgenes laterales de seguridad: `px-4 sm:px-6 lg:px-8`.
  - Botones táctiles de pulgar: altura mínima de `54px`, ancho `100%` en móvil con reflejo de luz e indicador de seguridad debajo.
  - Barra inferior flotante (`StickyMobileCTA`) con precio, garantía e ir al checkout en 1 toque.

### C. Arquitectura de 12 Módulos Interactivos (Anti-Estructuras Rígidas)
El prompt exige construir una experiencia completa y jamás un esqueleto de 4 cajas:
1. **Top Status Bar**: Aviso superior con estado de edición, acceso inmediato y bono activo.
2. **Split Hero con Widget Interactivo en Vivo**: Titular + Subtitular + Doble CTA a la izquierda, y **Vista Previa Interactiva del Sistema / Dashboard en Vivo** a la derecha.
3. **Auditoría Visceral de Dolor (4 Tarjetas de Síntomas + Diagnóstico de Raíz)**: Escenas cotidianas donde el cliente se identifica en 3 segundos.
4. **Timeline de Victorias Rápidas (Quick Wins en 2h, 48h y 7 Días)**: Qué logra desde el primer día sin esperar semanas.
5. **Simulador / Calculadora Interactiva del Nicho**: Widget con controles deslizantes (sliders) o selector interactivo que calcula el impacto real en tiempo, salud o dinero para el usuario.
6. **Matriz Comparativa de Contraste**: Tabla comparando las *Soluciones Tradicionales* (lentas, caras, frustrantes) contra el *Nuevo Mecanismo Único*.
7. **Arquitectura del Mecanismo Único en 3 Fases**: Tarjetas numeradas con el qué, el cómo y el entregable de cada fase.
8. **Filtro de Calificación de Audiencia (2 Columnas)**: *Para quién ES* (checks esmeralda) vs. *Para quién NO es* (cruces rojas).
9. **Radiografía del Producto + App Móvil de Bolsillo (PWA)**: Mockup interactivo mostrando los módulos descargables y las 5 pantallas de la App incluida.
10. **Muro de Casos de Estudio Cuantificados**: 3 tarjetas de clientes con situación inicial, acción tomada y métrica lograda.
11. **Pila de Bonos (Bonus Stack) + Bóveda de Oferta y Garantía de 30 Días**: Desglose de bonos con la objeción que eliminan + caja de oferta con valor tachado y pasarelas Stripe / Mercado Pago.
12. **Acordeón FAQ de 6 Objeciones + Sticky Mobile Bar**: Cierre de dudas frecuentes con apertura suave.
