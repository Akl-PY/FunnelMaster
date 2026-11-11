/**
 * generate-prompt.js — Generador del Perfect Prompt técnico para Lovable.dev, v0 y Bolt.new (Paso #8).
 * Impulsado por el Playbook de 48hs con arquitectura dinámica y anti-estructuras rígidas.
 */

const fs = require('fs');
const path = require('path');
const { logAutomation } = require('../../../../scripts/db');
const { getArchetypeForNiche } = require('../../landing-builder/scripts/archetypes');

function runGeneratePrompt(slug = null) {
  const offerJsonPath = path.join(__dirname, '..', '..', '..', '..', 'data', 'active_offer.json');
  let offerData = null;
  if (fs.existsSync(offerJsonPath)) {
    offerData = JSON.parse(fs.readFileSync(offerJsonPath, 'utf8'));
  }

  let targetSlug = slug;
  if (!targetSlug && offerData?.reengineeredOffer?.product_name) {
    const derived = offerData.reengineeredOffer.product_name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const candidateDir = path.join(__dirname, '..', '..', '..', '..', 'funnels', derived);
    if (fs.existsSync(candidateDir)) {
      targetSlug = derived;
    }
  }
  if (!targetSlug) {
    const funnelsRoot = path.join(__dirname, '..', '..', '..', '..', 'funnels');
    if (fs.existsSync(funnelsRoot)) {
      const dirs = fs.readdirSync(funnelsRoot);
      if (dirs.length > 0) targetSlug = dirs[dirs.length - 1];
    }
  }
  if (!targetSlug) targetSlug = 'sistema-productividad-y-trabajo-remoto-pro';

  const funnelsDir = path.join(__dirname, '..', '..', '..', '..', 'funnels', targetSlug);
  const copyPath = path.join(funnelsDir, 'copy.md');

  if (!fs.existsSync(copyPath)) {
    throw new Error(`Copy file not found at ${copyPath}. Run funnel-copywriter first.`);
  }

  const copyText = fs.readFileSync(copyPath, 'utf8');

  const nicheName = offerData?.niche?.niche_name || targetSlug;
  const avatar = offerData?.reengineeredOffer?.target_avatar || 'Emprendedores y Profesionales';
  const pain = offerData?.niche?.core_pain || 'Falta de foco y dispersión constante';
  const productName = offerData?.reengineeredOffer?.product_name || 'Protocolo Digital de Alto Rendimiento';
  const promise = offerData?.reengineeredOffer?.main_promise || 'Multiplica tu productividad y enfoque diario';
  const uniqueMech = offerData?.reengineeredOffer?.unique_mechanism || 'Sistema de Bloques de Concentración Profunda (BCP)™';
  const price = offerData?.reengineeredOffer?.price_usd || 37;
  const totalValue = offerData?.reengineeredOffer?.value_stack?.total_perceived_value || 237;

  const archetype = getArchetypeForNiche(nicheName, avatar, pain);

  const perfectPrompt = `
# SUPER PROMPT DE IA: PÁGINA DE VENTAS DE ALTA CONVERSIÓN (PLAYBOOK DE 48 HORAS - PASO #8)

> **DIRECTRIZ MAESTRA DEL PLAYBOOK DE 48HS (PASO #8)**:
> "A partir de ahora, necesito que me crees un perfect prompt para Lovable [v0 / Bolt / Cursor]. Con los copies que me pasaste de la página web, quiero que me crees una página web completa. Pero necesito que te tomes el tiempo de explicarlo de la forma más detallada posible, porque Lovable siempre me entrega una página genérica. Necesito que coloques todos los detalles de animación, de colores, de destellos, que sea responsive para computadora, para celular... Todo de la forma más meticulosa posible, los movimientos, necesito que lo detalles, inclusive los espacios entre las letras, qué tan grandes, qué tan chicos los márgenes a los costados, los mockups, las imágenes. Necesito que me crees un perfect prompt detallado con el branding y los copies que estuvimos hablando dentro de este chat."

---

## 1. ROL Y MISIÓN DEL CONSTRUCTOR WEB
Actúa como un Diseñador Web de Respuesta Directa e Ingeniero Frontend de Élite especializado en páginas de ventas millonarias de infoproductos. Construye una Single Page Application (SPA) en React + Tailwind CSS con microinteracciones de alta gama.

**REGLA DE ORO DE ARQUITECTURA**: Prohibido crear una plantilla genérica, plana o una secuencia de cajas rígidas repetitivas. La composición debe respirar dinamismo, fluidez y adaptarse exclusivamente al nicho de **${nicheName}** y al arquetipo visual **${archetype.name}**.

---

## 2. DESIGN SYSTEM & TOKENS VISUALES (${archetype.name.toUpperCase()})

- **Paleta Cromática de Alto Contraste**:
  - Fondo Primario: \`${archetype.colors.bgMain}\` con gradiente radial de ambiente en la parte superior.
  - Tarjetas y Contenedores: \`${archetype.colors.bgCard}\` con borde \`1px solid ${archetype.colors.borderCard}\` y \`backdrop-blur-md\`.
  - Texto Primario (Títulos y Kicker): \`${archetype.colors.textPrimary}\` (blanco o contraste máximo).
  - Texto Secundario (Descripciones): \`${archetype.colors.textSecondary}\` (legibilidad sin fatiga).
  - Botón de Acción Principal (CTA): Gradiente dinámico de \`${archetype.colors.accentGradientFrom}\` a \`${archetype.colors.accentGradientTo}\` con hover de pulso e iluminación perimetral \`${archetype.colors.accentGlow}\`.
  - Color de Alerta y Garantía: \`${archetype.colors.urgencyAccent}\` para badges de descuento y garantía de 30 días.
- **Micro-Espaciado y Tipografía**:
  - Fuente: Plus Jakarta Sans o Inter.
  - Títulos H1 y H2: \`font-extrabold\`, letter-spacing exacto de \`-0.025em\` (\`tracking-tight\`), line-height ajustado (\`leading-tight\`).
  - Cuerpo de texto: \`leading-relaxed\` (1.65), márgenes laterales simétricos en móvil (\`px-4 sm:px-6\`), ancho máximo central \`max-w-4xl mx-auto\`.
- **Efectos Visuales, Tailwind CSS y Animaciones en Scroll con la Última Especificación Oficial de CSS**:
  - **Tailwind CSS Mandatorio**: Maquetar grillas asimétricas, superficies \`backdrop-blur-xl\`, gradientes y estados interactivos íntegramente con clases de utilidad de Tailwind CSS.
  - **CSS Scroll-Driven Animations Nativas (W3C Official Spec — Cero JS de Scroll)**:
    - Barra superior de lectura con \`animation-timeline: scroll(root block)\`.
    - Revelado progresivo de bloques y tarjetas al entrar en el viewport usando \`animation-timeline: view()\` y \`animation-range: entry 0% cover 28%\` (declarando \`animation-timeline\` después de \`animation\` y envolviendo en \`@supports (animation-timeline: view())\` y \`@media (prefers-reduced-motion: no-preference)\`).
  - Destello ambiental en el Hero: Gradiente radial elíptico con desenfoque de 80px (\`blur-3xl\`) con opacidad al 15%.
  - Shimmer sweep en botones CTA: Reflejo sutil de barrido al pasar el cursor (\`hover:scale-[1.02] transition-transform duration-200\`).
  - Tarjetas de bonos con bordes reactivos: Iluminación de borde en hover (\`border-${archetype.colors.accentPrimary}/50\`).

---

## 3. COMPOSICIÓN DINÁMICA DE LA PÁGINA (ZERO ESTRUCTURAS RÍGIDAS)

En lugar de bloques clónicos estáticos, distribuye la experiencia en este flujo orgánico de alta conversión:

1. **Hero de Alto Impacto con Doble Vía de Conversión**:
   - Badge superior del arquetipo: \`"${archetype.badge}"\`.
   - Titular principal transformador: *" ${promise} "*
   - Subtitular emocional que apunta al dolor de ${avatar}.
   - Doble botón de acción: Botón principal de compra (\`$${price} USD\`) y botón secundario hacia el test interactivo de diagnóstico: \`"🎯 Hacer Test de Diagnóstico (60s)"\`.
   - Micro-insignia de confianza: Acceso inmediato · Garantía incondicional de 30 días.

2. **Auditoría de Dolor & Transformación Visual**:
   - Tarjeta elegante de agitación emocional explicando por qué las soluciones tradicionales fallan.
   - Diagnóstico enfocado en ${pain.toLowerCase()} para generar empatía visceral sin clichés.

3. **Sección Especializada del Arquetipo Visual**:
   - Título: \`"${archetype.specialSectionTitle}"\`
   - Subtítulo: \`"${archetype.specialSectionSubtitle}"\`
   - Grid interactivo con las métricas clave de la industria (${archetype.specialMetrics.map(m => m.label).join(', ')}).

4. **Mecanismo Único Interactivo en 3 Fases**:
   - Presentación de: **${uniqueMech}**
   - 3 tarjetas interactivas de progresión (Fase 1: Choque y Desbloqueo, Fase 2: Calibración Acelerada, Fase 3: Blindaje y Hábito Sostenible) con bordes iluminados.

5. **Pila de Valor Irresistible & Bonos de Regalo**:
   - Desglose de los 4 bonos de aceleración con badges de \`"GRATIS HOY"\` y valor individual tachado.
   - Tarjeta de pricing destacada: Comparativa visual de \`$${totalValue} USD\` tachado vs \`$${price} USD\` final.
   - Selector visual de pasarelas de pago: **Stripe** (Tarjetas internacionales) y **Mercado Pago** (LATAM / Cuotas locales).
   - Sello oficial de Garantía Incondicional de 30 Días (riesgo cero para el cliente).

6. **Acordeón FAQ con Microdatos & Sticky Bar Móvil**:
   - Acordeón colapsable para resolver las 5 objeciones principales del avatar.
   - Barra flotante inferior en pantallas móviles que aparece tras pasar el Hero con botón rápido al checkout.

---

## 4. COPY PERSUASIVO COMPLETO PARA INYECTAR EN LOS BLOQUES

Utiliza el siguiente texto de respuesta directa para poblar cada sección:

\`\`\`markdown
${copyText}
\`\`\`

---

## 5. REGLAS DE RESPONSIVIDAD Y PRESERVACIÓN DE UTMS
- Mobile-First prioritario (375px a 430px). Todo el diseño debe verse impecable con una sola mano.
- Preservar parámetros de URL (\`utm_source\`, \`utm_campaign\`, etc.) en todos los botones hacia \`/checkout\`.
`;

  const outputPath = path.join(funnelsDir, 'web-builder-prompt.txt');
  fs.writeFileSync(outputPath, perfectPrompt.trim(), 'utf8');

  logAutomation('prompt-web-maker', 'generate_prompt', 'success', {
    slug,
    outputPath,
    promptLength: perfectPrompt.length
  });

  console.log(`[prompt-web-maker] Perfect Prompt generated successfully from 48hs playbook.`);
  console.log(`[prompt-web-maker] Output: ${outputPath}`);
  return {
    outputPath,
    perfectPrompt
  };
}

if (require.main === module) {
  try {
    runGeneratePrompt();
    process.exit(0);
  } catch (err) {
    console.error('[prompt-web-maker] Error:', err.message);
    process.exit(1);
  }
}

module.exports = { runGeneratePrompt };
