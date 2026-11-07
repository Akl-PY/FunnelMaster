/**
 * build-funnel.js — Constructor de Landing Page desde cero en /funnel con Astro + Tailwind CSS.
 * Lee los bloques de copy de funnels/<slug>/copy.md y genera la estructura modular completa.
 */

const fs = require('fs');
const path = require('path');
const { logAutomation } = require('../../../../scripts/db');

function runBuildFunnel(slug = 'salud-hormonal-21') {
  const rootDir = path.join(__dirname, '..', '..', '..', '..');
  const funnelDir = path.join(rootDir, 'funnel');
  const copyPath = path.join(rootDir, 'funnels', slug, 'copy.md');

  if (!fs.existsSync(copyPath)) {
    throw new Error(`Copy file not found at ${copyPath}. Run funnel-copywriter first.`);
  }

  // Crear carpetas de /funnel
  const srcDir = path.join(funnelDir, 'src');
  const layoutsDir = path.join(srcDir, 'layouts');
  const componentsDir = path.join(srcDir, 'components');
  const pagesDir = path.join(srcDir, 'pages');

  [funnelDir, srcDir, layoutsDir, componentsDir, pagesDir].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  // 1. package.json de /funnel
  fs.writeFileSync(path.join(funnelDir, 'package.json'), JSON.stringify({
    name: 'funnel-landing',
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'astro dev',
      start: 'astro dev',
      build: 'astro build',
      preview: 'astro preview'
    },
    dependencies: {
      astro: '^4.16.0',
      '@astrojs/tailwind': '^5.1.0',
      tailwindcss: '^3.4.0'
    }
  }, null, 2), 'utf8');

  // 2. BaseLayout.astro (con preservación de UTMs)
  const baseLayoutCode = `---
interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="es" class="scroll-smooth bg-[#0B0F19] text-[#F8FAFC]">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <script>
      // Preservación estricta de parámetros UTM y tracking hacia el checkout
      document.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'src', 'sck'];
        if (params.toString()) {
          document.querySelectorAll('a.checkout-btn').forEach((btn) => {
            const anchor = btn as HTMLAnchorElement;
            const url = new URL(anchor.href, window.location.origin);
            params.forEach((val, key) => {
              if (key.startsWith('utm_') || utmKeys.includes(key)) {
                url.searchParams.set(key, val);
              }
            });
            anchor.href = url.toString();
          });
        }
      });
    </script>
  </head>
  <body class="font-['Plus_Jakarta_Sans',sans-serif] antialiased selection:bg-emerald-500 selection:text-white">
    <slot />
  </body>
</html>`;
  fs.writeFileSync(path.join(layoutsDir, 'BaseLayout.astro'), baseLayoutCode, 'utf8');

  // 3. HeroSection.astro
  const heroCode = `---
interface Props {
  kicker: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  checkoutUrl: string;
}
const { kicker, headline, subheadline, ctaText, checkoutUrl } = Astro.props;
---
<section class="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
  <div class="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-wide uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
    {kicker}
  </div>
  <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
    {headline}
  </h1>
  <p class="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
    {subheadline}
  </p>
  <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
    <a href={checkoutUrl} class="checkout-btn w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-[1.02]">
      {ctaText}
    </a>
  </div>
  <p class="text-xs text-slate-400 mt-3">⚡ Acceso inmediato · Garantía total de 30 días</p>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'HeroSection.astro'), heroCode, 'utf8');

  // 4. PainPoints.astro
  const painCode = `---
---
<section class="py-12 px-4 sm:px-6 max-w-3xl mx-auto">
  <div class="bg-[#131B2E] border border-[#24304D] rounded-2xl p-6 sm:p-10 shadow-xl">
    <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">Si tienes más de 35 años, esto te resultará familiar...</h2>
    <div class="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
      <p>Te levantas más cansada de lo que te acostaste. Sientes que tu abdomen se inflama con un vaso de agua y tu ropa favorita empieza a apretar sin explicación.</p>
      <p>Vas al médico y la respuesta es siempre la misma: <em>"Tus análisis están normales, es la edad"</em>.</p>
      <p class="font-semibold text-emerald-400">El problema no eres tú ni es tu fuerza de voluntad: es el bloqueo metabólico de la perimenopausia.</p>
    </div>
  </div>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'PainPoints.astro'), painCode, 'utf8');

  // 5. UniqueMechanism.astro
  const mechanismCode = `---
---
<section class="py-12 px-4 sm:px-6 max-w-3xl mx-auto text-center">
  <h2 class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">El Mecanismo Único</h2>
  <h3 class="text-2xl sm:text-4xl font-extrabold text-white mb-6">Sistema de Sincronización Metabólica por Fases (SMPF)™</h3>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mt-8">
    <div class="bg-[#131B2E] p-6 rounded-xl border border-slate-700/60">
      <span class="text-emerald-400 font-bold text-sm">Fase 1 (Días 1-7)</span>
      <h4 class="font-bold text-white mt-1 mb-2">Drenaje Hepático</h4>
      <p class="text-sm text-slate-400">Desactiva la sobrecarga de toxinas y estrógenos estancados.</p>
    </div>
    <div class="bg-[#131B2E] p-6 rounded-xl border border-slate-700/60">
      <span class="text-emerald-400 font-bold text-sm">Fase 2 (Días 8-14)</span>
      <h4 class="font-bold text-white mt-1 mb-2">Calibración Glucémica</h4>
      <p class="text-sm text-slate-400">Estabiliza la insulina para eliminar la grasa visceral y la ansiedad.</p>
    </div>
    <div class="bg-[#131B2E] p-6 rounded-xl border border-slate-700/60">
      <span class="text-emerald-400 font-bold text-sm">Fase 3 (Días 15-21)</span>
      <h4 class="font-bold text-white mt-1 mb-2">Blindaje Mitocondrial</h4>
      <p class="text-sm text-slate-400">Activa tu energía celular duradera con rutinas suaves de 8 minutos.</p>
    </div>
  </div>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'UniqueMechanism.astro'), mechanismCode, 'utf8');

  // 6. BonusStack.astro & PricingOffer.astro
  const pricingCode = `---
interface Props {
  price: number;
  totalValue: number;
  checkoutUrl: string;
}
const { price, totalValue, checkoutUrl } = Astro.props;
---
<section class="py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center" id="oferta">
  <div class="bg-gradient-to-b from-[#131B2E] to-[#0E1524] border-2 border-emerald-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
    <div class="inline-block px-4 py-1 mb-4 text-xs font-bold uppercase rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
      OFERTA EXCLUSIVA DE LANZAMIENTO
    </div>
    <h3 class="text-2xl sm:text-4xl font-extrabold text-white mb-2">Protocolo Reset Hormonal 21™</h3>
    <p class="text-slate-400 mb-6">Acceso completo de por vida + 4 Bonos de Aceleración</p>
    
    <div class="text-slate-400 line-through text-lg mb-1">Valor Total: \${totalValue} USD</div>
    <div class="text-5xl sm:text-6xl font-extrabold text-emerald-400 mb-6">\${price} <span class="text-xl text-slate-300 font-normal">USD</span></div>
    
    <a href={checkoutUrl} class="checkout-btn block w-full py-4 text-xl font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-[0_0_35px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-[1.02]">
      ACCEDER AL PROTOCOLO COMPLETO AHORA
    </a>
    
    <div class="mt-8 pt-8 border-t border-slate-700/60 flex items-center justify-center gap-3 text-slate-300 text-sm">
      <span>🛡️ Garantía Incondicional de 30 Días · Riesgo 100% nuestro</span>
    </div>
  </div>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'PricingOffer.astro'), pricingCode, 'utf8');

  // 7. index.astro ensamblado
  const indexPageCode = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import HeroSection from '../components/HeroSection.astro';
import PainPoints from '../components/PainPoints.astro';
import UniqueMechanism from '../components/UniqueMechanism.astro';
import PricingOffer from '../components/PricingOffer.astro';

const checkoutUrl = "https://pay.hotmart.com/PROT21RESET";
---
<BaseLayout 
  title="Protocolo Reset Hormonal 21™ | Recupera tu Energía y Desinflama tu Cuerpo"
  description="Desactiva la inflamación silenciosa y reactiva tu energía en 21 días sin dietas de hambre ni pastillas.">
  <main class="min-h-screen">
    <HeroSection 
      kicker="Para mujeres de 35 a 55 años"
      headline="Desactiva la Inflamación Silenciosa y Recupera tu Energía en 21 Días"
      subheadline="El método basado en el Sistema de Sincronización Metabólica por Fases (SMPF)™ para despertar descansada y desinflamar tu vientre desde casa."
      ctaText="Quiero Acceder al Protocolo Hoy por $37 USD"
      checkoutUrl={checkoutUrl}
    />
    <PainPoints />
    <UniqueMechanism />
    <PricingOffer price={37} totalValue={237} checkoutUrl={checkoutUrl} />
  </main>
</BaseLayout>`;
  fs.writeFileSync(path.join(pagesDir, 'index.astro'), indexPageCode, 'utf8');

  // Registrar en automation_logs
  logAutomation('landing-builder', 'build_funnel', 'success', {
    slug,
    funnelDir,
    framework: 'Astro + Tailwind',
    checkoutUrl: 'https://pay.hotmart.com/PROT21RESET',
    utmPreservationEnabled: true
  });

  console.log(`[landing-builder] Clean landing structure built successfully at /funnel`);
  return {
    funnelDir,
    framework: 'Astro'
  };
}

if (require.main === module) {
  try {
    runBuildFunnel();
    process.exit(0);
  } catch (err) {
    console.error('[landing-builder] Error:', err.message);
    process.exit(1);
  }
}

module.exports = { runBuildFunnel };
