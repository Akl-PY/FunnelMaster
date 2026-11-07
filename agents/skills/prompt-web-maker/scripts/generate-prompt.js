/**
 * generate-prompt.js — Generador del Perfect Prompt técnico para Lovable.dev, v0 y Bolt.new (Paso #8).
 * Inyecta el copy de los 11 bloques y define especificaciones exactas de diseño y microanimaciones.
 */

const fs = require('fs');
const path = require('path');
const { logAutomation } = require('../../../../scripts/db');

function runGeneratePrompt(slug = 'salud-hormonal-21') {
  const funnelsDir = path.join(__dirname, '..', '..', '..', '..', 'funnels', slug);
  const copyPath = path.join(funnelsDir, 'copy.md');

  if (!fs.existsSync(copyPath)) {
    throw new Error(`Copy file not found at ${copyPath}. Run funnel-copywriter first.`);
  }

  const copyText = fs.readFileSync(copyPath, 'utf8');

  const perfectPrompt = `
# PERFECT PROMPT: High-Converting Sales Funnel Landing Page (Direct Response)

You are an elite Lead UI/UX Engineer and Direct-Response Web Designer. Create a complete, production-ready, ultra-fast and pixel-perfect Single Page Application (SPA) for a high-converting digital product funnel.

DO NOT create a generic, flat landing page. Follow these strict architectural, visual, and behavioral specifications:

---

## 1. DESIGN SYSTEM & TOKENS

- **Color Palette**:
  - Background (Dominant): Deep Slate / Midnight (#0B0F19) with subtle warm radial gradients.
  - Surface & Cards: #131B2E with 1px border (#24304D) and subtle backdrop-blur.
  - Text Primary: #F8FAFC (Pure High-Contrast White).
  - Text Secondary: #94A3B8 (Readable Slate).
  - Primary CTA / Accent: Emerald Green (#10B981) to Mint (#34D399) gradient with hover pulse.
  - Alert / Urgency Accent: Coral Gold (#F59E0B) for discounts and countdown badges.
- **Typography & Tracking**:
  - Headings: Inter or Plus Jakarta Sans with -0.025em letter-spacing (tracking-tight) and font-extrabold.
  - Body: Inter, line-height 1.65 (leading-relaxed) for effortless mobile reading.
- **Micro-Animations & Lighting**:
  - Subtle breathing glow effects: 'bg-radial-gradient from-emerald-500/10 via-transparent to-transparent'.
  - CTA Buttons: Shimmer sweep light effect ('hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-300').
  - Bonus Cards: 'hover:-translate-y-1 hover:border-emerald-500/40 transition-transform duration-200'.

---

## 2. MOBILE-FIRST RESPONSIVE ARCHITECTURE (375px - 430px Priority)

- 85% of traffic comes from mobile Meta Ads:
  - Container: max-w-4xl mx-auto px-4 sm:px-6 lg:px-8.
  - Sticky Bottom CTA: Floating checkout bar on mobile when scrolling past the Hero section.
  - Accordion FAQ: Smooth height transition with chevron rotation.
  - Video / Mockup placeholder: 16:9 aspect ratio with glowing border frame.

---

## 3. PAGE SECTIONS & COPY INJECTION (11 HERO'S JOURNEY BLOCKS)

Inject the following exact persuasive copy into the corresponding modular sections:

\`\`\`markdown
${copyText}
\`\`\`

---

## 4. CONVERSION & TRACKING IMPLEMENTATION

- Every CTA button must route to the checkout link preserving all inbound query parameters (UTMs):
  \`const params = new URLSearchParams(window.location.search);\`
- Embed clean accessible FAQ microdata (JSON-LD Schema).
- Fast load speed: zero blocking scripts, optimized SVG icons (Lucide React).
`;

  const outputPath = path.join(funnelsDir, 'web-builder-prompt.txt');
  fs.writeFileSync(outputPath, perfectPrompt.trim(), 'utf8');

  logAutomation('prompt-web-maker', 'generate_prompt', 'success', {
    slug,
    outputPath,
    promptLength: perfectPrompt.length
  });

  console.log(`[prompt-web-maker] Perfect Prompt generated successfully.`);
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
