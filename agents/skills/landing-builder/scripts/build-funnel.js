/**
 * build-funnel.js — Constructor de Landing Page desde cero en /funnel con Astro + Tailwind CSS.
 * Lee los bloques de copy de funnels/<slug>/copy.md y genera la estructura modular completa.
 */

const fs = require('fs');
const path = require('path');
const { logAutomation } = require('../../../../scripts/db');
const { getArchetypeForNiche } = require('./archetypes');

function runBuildFunnel(slug = null) {
  const rootDir = path.join(__dirname, '..', '..', '..', '..');
  const offerJsonPath = path.join(rootDir, 'data', 'active_offer.json');
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
    const candidateDir = path.join(rootDir, 'funnels', derived);
    if (fs.existsSync(candidateDir)) {
      targetSlug = derived;
    }
  }
  if (!targetSlug) {
    const funnelsRoot = path.join(rootDir, 'funnels');
    if (fs.existsSync(funnelsRoot)) {
      const dirs = fs.readdirSync(funnelsRoot);
      if (dirs.length > 0) targetSlug = dirs[dirs.length - 1];
    }
  }
  if (!targetSlug) {
    throw new Error('No active funnel slug found. Define niche/currency/ticket with the user and run niche-discovery -> offer-reengineer -> funnel-copywriter first.');
  }

  const funnelDir = path.join(rootDir, 'funnel');
  const copyPath = path.join(rootDir, 'funnels', targetSlug, 'copy.md');

  if (!fs.existsSync(copyPath)) {
    throw new Error(`Copy file not found at ${copyPath}. Run funnel-copywriter first.`);
  }

  const copyRaw = fs.readFileSync(copyPath, 'utf8');

  // Parser de secciones de copy.md
  function parseCopyFile(raw) {
    const sections = {};
    const regex = /##\s+(\d+)\.\s+([a-z_]+)([\s\S]*?)(?=(?:##\s+\d+\.|$))/g;
    let m;
    while ((m = regex.exec(raw)) !== null) {
      sections[m[2].trim()] = m[3].trim();
    }

    const headlineSec = sections['headline'] || '';
    const kickerMatch = headlineSec.match(/\*\*Kicker[^*]*\*\*:\s*([^\n]+)/i);
    const h1Match = headlineSec.match(/\*\*Titular Principal[^*]*\*\*:\s*([^\n]+)/i);
    const subheadlineMatch = headlineSec.match(/\*\*Subtitular[^*]*\*\*:\s*([^\n]+)/i);

    const leadPain = (sections['lead_pain'] || '').replace(/^###?\s+[^\n]+\n*/mg, '').replace(/^---+\s*$/mg, '');
    const leadPainParas = leadPain
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p && !p.startsWith('---'));

    const targetAudience = sections['target_audience'] || '';
    const yesMatch = targetAudience.match(/\*\*PARA QUI[EÉ]N S[IÍ] ES\*\*:([\s\S]*?)(?=\*\*PARA QUI[EÉ]N NO ES\*\*|$)/i);
    const noMatch = targetAudience.match(/\*\*PARA QUI[EÉ]N NO ES\*\*:([\s\S]*?)$/i);

    const forWhoYes = yesMatch
      ? yesMatch[1].split('\n').map(s => s.replace(/^[-*]\s*/, '').trim()).filter(s => s && !s.startsWith('#'))
      : [];
    const forWhoNo = noMatch
      ? noMatch[1].split('\n').map(s => s.replace(/^[-*]\s*/, '').trim()).filter(s => s && !s.startsWith('#'))
      : [];

    const authorityBio = sections['authority_bio'] || '';
    const bioMatch = authorityBio.match(/###\s*([^\n]+)/);
    const bioTitle = bioMatch ? bioMatch[1].trim() : '';
    const bioText = authorityBio.replace(/###\s*[^\n]+/, '').replace(/^---+\s*$/mg, '').trim();

    const faqSec = sections['faq'] || '';
    const faqItems = [];
    const faqRegex = /\d+\.\s+\*\*([^*]+)\*\*\s*\n+([\s\S]*?)(?=(?:\d+\.\s+\*\*|$))/g;
    let fq;
    while ((fq = faqRegex.exec(faqSec)) !== null) {
      faqItems.push({
        q: fq[1].trim(),
        a: fq[2].trim().replace(/\n+/g, ' ')
      });
    }

    return {
      kicker: kickerMatch ? kickerMatch[1].trim() : '',
      h1: h1Match ? h1Match[1].trim() : '',
      subheadline: subheadlineMatch ? subheadlineMatch[1].trim() : '',
      leadPainParas,
      forWhoYes,
      forWhoNo,
      bioTitle,
      bioText,
      faqItems
    };
  }

  const parsedCopy = parseCopyFile(copyRaw);

  const nicheName = offerData?.niche?.niche_name || targetSlug;
  const avatar = offerData?.reengineeredOffer?.target_avatar || 'Profesionales y emprendedores';
  const avatarLower = avatar.charAt(0).toLowerCase() + avatar.slice(1).replace(/\.$/, '');
  const pain = offerData?.niche?.core_pain || 'Fricción operativa y desgaste diario';
  const painLower = pain.charAt(0).toLowerCase() + pain.slice(1).replace(/\.$/, '');
  const productName = offerData?.reengineeredOffer?.product_name || `Sistema ${nicheName} Pro™`;
  const promise = offerData?.reengineeredOffer?.main_promise || `Elimina de raíz ${painLower} desde tus primeras 48 horas`;
  const uniqueMech = offerData?.reengineeredOffer?.unique_mechanism || 'Arquitectura de Sincronización Operativa™';
  const commonEnemy = offerData?.reengineeredOffer?.common_enemy || 'los métodos tradicionales llenos de teoría abstracta y parches superficiales';
  const price = offerData?.reengineeredOffer?.price_usd || 37;
  const totalValue = offerData?.reengineeredOffer?.value_stack?.total_perceived_value || 237;
  const discountPct = offerData?.reengineeredOffer?.value_stack?.discount_percentage || 84;

  // Obtener arquetipo visual y de componentes especializados
  const archetype = getArchetypeForNiche(nicheName, avatar, pain);
  console.log(`[landing-builder] Applying Visual Archetype: "${archetype.name}" for niche: "${nicheName}"`);

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

  // astro.config.mjs
  fs.writeFileSync(path.join(funnelDir, 'astro.config.mjs'), `import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()]
});
`, 'utf8');

  // tailwind.config.mjs con tokens dinámicos del arquetipo
  fs.writeFileSync(path.join(funnelDir, 'tailwind.config.mjs'), `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        themeBg: '${archetype.colors.bgMain}',
        themeCard: '${archetype.colors.bgCard}',
        themeBorder: '${archetype.colors.borderCard}',
        themeAccent: '${archetype.colors.accentPrimary}',
        themeText: '${archetype.colors.textPrimary}',
        themeMuted: '${archetype.colors.textSecondary}'
      }
    },
  },
  plugins: [],
};
`, 'utf8');

  // 2. BaseLayout.astro (con Tailwind CSS, CSS Scroll-Driven Animations nativas y preservación de UTMs)
  const baseLayoutCode = `---
interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="es" class="scroll-smooth bg-[${archetype.colors.bgMain}] text-[${archetype.colors.textPrimary}]">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style is:global>
      /* ==========================================================================
         W3C Official CSS Scroll-Driven Animations (animation-timeline: scroll/view)
         Zero-JS GPU-composited animations using the latest CSS specification
         ========================================================================== */
      @keyframes cssScrollProgressBar {
        from { transform: scaleX(0); }
        to { transform: scaleX(1); }
      }
      @keyframes cssRevealUp {
        from {
          opacity: 0;
          transform: translateY(38px) scale(0.97);
          filter: blur(4px);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }
      }
      @keyframes cssRevealScale {
        from {
          opacity: 0;
          transform: scale(0.92) translateY(24px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      @keyframes cssRevealLeft {
        from {
          opacity: 0;
          transform: translateX(-32px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes cssRevealRight {
        from {
          opacity: 0;
          transform: translateX(32px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @media (prefers-reduced-motion: no-preference) {
        @supports (animation-timeline: scroll()) {
          .css-scroll-progress-bar {
            transform-origin: 0% 50%;
            animation: cssScrollProgressBar 1ms linear both;
            animation-timeline: scroll(root block);
          }
        }
        @supports (animation-timeline: view()) {
          .css-scroll-reveal {
            animation: cssRevealUp 1ms cubic-bezier(0.22, 1, 0.36, 1) both;
            animation-timeline: view();
            animation-range: entry 0% cover 26%;
          }
          .css-scroll-scale {
            animation: cssRevealScale 1ms cubic-bezier(0.22, 1, 0.36, 1) both;
            animation-timeline: view();
            animation-range: entry 0% cover 28%;
          }
          .css-scroll-left {
            animation: cssRevealLeft 1ms cubic-bezier(0.22, 1, 0.36, 1) both;
            animation-timeline: view();
            animation-range: entry 0% cover 26%;
          }
          .css-scroll-right {
            animation: cssRevealRight 1ms cubic-bezier(0.22, 1, 0.36, 1) both;
            animation-timeline: view();
            animation-range: entry 0% cover 26%;
          }
        }
      }
    </style>
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
  <body class="font-['Plus_Jakarta_Sans',sans-serif] antialiased selection:bg-[${archetype.colors.accentPrimary}] selection:text-black">
    <!-- Native CSS Scroll-Driven Progress Bar (animation-timeline: scroll(root block)) -->
    <div class="fixed top-0 left-0 right-0 h-1 z-[100] bg-slate-900/50 pointer-events-none">
      <div class="css-scroll-progress-bar h-full w-full bg-gradient-to-r from-[${archetype.colors.accentGradientFrom}] via-[${archetype.colors.accentPrimary}] to-[${archetype.colors.accentGradientTo}] shadow-[0_0_12px_${archetype.colors.accentGlow}]"></div>
    </div>
    <slot />
  </body>
</html>`;
  fs.writeFileSync(path.join(layoutsDir, 'BaseLayout.astro'), baseLayoutCode, 'utf8');

  const phases = offerData?.reengineeredOffer?.value_stack?.phases || [
    {
      step: 1,
      timeframe: 'Fase 1 · Primeras 48 Horas',
      name: `Auditoría de Raíz y Desbloqueo de Choque`,
      desc: `Identifica y corta de inmediato los disparadores invisibles que provocan ${painLower}, logrando tu primera victoria medible en menos de 48 horas.`,
      deliverable: `Matriz de Diagnóstico Rápido + Protocolo SOS de 5 Minutos`
    },
    {
      step: 2,
      timeframe: 'Fase 2 · Días 3 al 7',
      name: `Instalación de la ${uniqueMech}`,
      desc: `Reemplaza la fricción diaria por micro-bloques estructurados de 15 minutos que multiplican tu capacidad de respuesta sin exigir horas libres.`,
      deliverable: `Plantillas Operativas Plug & Play + Temporizador Táctico en App`
    },
    {
      step: 3,
      timeframe: 'Fase 3 · Consolidación Permanente',
      name: `Automatización y Blindaje Anti-Recaídas`,
      desc: `Deja instalado un entorno blindado que sostiene tus resultados en piloto automático incluso en tus semanas de mayor carga o estrés.`,
      deliverable: `Dashboard de Seguimiento + Protocolo de Mantenimiento en 1 Clic`
    }
  ];

  const comparisonTable = offerData?.reengineeredOffer?.value_stack?.comparison_table || [
    {
      dimension: 'Tiempo requerido al día',
      traditional: '1 a 2 horas de teoría densa y rutinas imposibles de sostener',
      newMechanism: '15 minutos tácticos guiados por la App Móvil y plantillas listas'
    },
    {
      dimension: 'Primer resultado tangible',
      traditional: 'Semanas o meses de prueba y error frustrante',
      newMechanism: 'Alivio y desbloqueo medible dentro de las primeras 48 horas'
    },
    {
      dimension: 'Enfoque del método',
      traditional: 'Ataca síntomas superficiales pidiéndote más fuerza de voluntad',
      newMechanism: `Corrige la causa estructural mediante la ${uniqueMech}`
    },
    {
      dimension: 'Herramientas incluidas',
      traditional: 'Solo texto estático o videos largos de relleno',
      newMechanism: 'Sistema Operativo + 4 Bonos Tácticos + App Móvil Interactiva (PWA)'
    }
  ];

  const bonuses = offerData?.reengineeredOffer?.bonuses || [
    {
      id: 1,
      name: `Protocolo SOS de Intervención en 5 Minutos para ${nicheName}`,
      perceivedValue: 29,
      objectionDestroyed: '“No tengo tiempo libre en el día para aplicar algo complejo”',
      purpose: 'Secuencia de emergencia para desactivar el bloqueo agudo y recuperar claridad en 5 minutos.'
    },
    {
      id: 2,
      name: `Kit de Plantillas y Frameworks Listos para Copiar en ${nicheName}`,
      perceivedValue: 37,
      objectionDestroyed: '“No sé por dónde empezar ni quiero diseñar todo desde cero”',
      purpose: 'Estructuras pre-armadas de aplicación inmediata desde el día 1.'
    },
    {
      id: 3,
      name: `Calculadora Interactiva de Impacto & Auditoría de Fugas`,
      perceivedValue: 27,
      objectionDestroyed: '“No sé cómo medir si realmente estoy avanzando cada semana”',
      purpose: 'Herramienta objetiva para cuantificar tu progreso diario en 60 segundos.'
    },
    {
      id: 4,
      name: `Manual de Blindaje y Prevención de Recaídas en Días Críticos`,
      perceivedValue: 47,
      objectionDestroyed: '“Ya probé otros métodos antes y terminé abandonando”',
      purpose: 'Plan de contingencia exacto para sostener resultados en semanas de máxima presión.'
    }
  ];

  const webConfig = offerData?.reengineeredOffer?.web_config || {};
  const heroPills = Array.isArray(webConfig.hero_pills) && webConfig.hero_pills.length >= 3
    ? webConfig.hero_pills
    : [
        `Resultados medibles en 48 horas`,
        `Sistema práctico de 15 minutos`,
        `App Interactiva + Plantillas Listas`
      ];
  const topBannerText = webConfig.top_banner || `EDICIÓN ACTUALIZADA: Incluye Manual Maestro + 4 Bonos Gratis + App Interactiva de Bolsillo`;
  const appShowcaseTitle = webConfig.app_showcase?.title || `2. App Interactiva de Bolsillo`;
  const appShowcaseDesc = webConfig.app_showcase?.desc || `Tu centro de control desde el celular: simuladores interactivos del método, seguimiento paso a paso y acceso directo a tus guías y bonos.`;

  const hasInteractiveHeroWidget = Boolean(webConfig.hero_widget_title || webConfig.calculator || archetype.id === 'wealth_sovereignty');
  const heroRightWidgetHtml = hasInteractiveHeroWidget
    ? `
      <div class="bg-gradient-to-b from-[${archetype.colors.bgCard}] to-[#040908] border border-[${archetype.colors.borderCard}] rounded-3xl p-5 sm:p-6 shadow-2xl relative">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-[#1B332C]">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-widest text-[${archetype.colors.accentPrimary}]">Simulador Interactivo en Vivo</span>
            <h2 class="text-base font-extrabold text-white">${webConfig.hero_widget_title || 'Simulador de Asignación Estratégica'}</h2>
          </div>
          <span class="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50">
            ● En Vivo
          </span>
        </div>

        <div class="mb-4 p-3.5 rounded-2xl bg-slate-950/90 border border-[#1B332C]">
          <div class="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
            <span>Tu ingreso mensual neto:</span>
            <span id="hero-salary-val" class="text-emerald-400 text-sm font-extrabold">$1,600 USD</span>
          </div>
          <input id="hero-salary-input" type="range" min="600" max="5000" step="100" value="1600" oninput="updateHeroVaults()" class="w-full accent-[${archetype.colors.accentPrimary}] cursor-pointer" />
        </div>

        <div class="grid grid-cols-2 gap-2.5 mb-4">
          <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div class="text-[10px] font-bold uppercase text-slate-400">1. Bóveda Vital (50%)</div>
            <div id="vault-1-val" class="text-base font-extrabold text-white mt-0.5">$800 USD</div>
            <div class="text-[10px] text-slate-400">Gastos fijos blindados</div>
          </div>
          <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
            <div class="text-[10px] font-bold uppercase text-emerald-400">2. Acelerador de Salida (20%)</div>
            <div id="vault-2-val" class="text-base font-extrabold text-emerald-300 mt-0.5">$320 USD</div>
            <div class="text-[10px] text-emerald-400/80">Liquida deuda más cara</div>
          </div>
          <div class="p-3 rounded-xl bg-amber-950/25 border border-amber-500/30">
            <div class="text-[10px] font-bold uppercase text-amber-400">3. Paz Mental (15%)</div>
            <div id="vault-3-val" class="text-base font-extrabold text-amber-300 mt-0.5">$240 USD</div>
            <div class="text-[10px] text-amber-400/80">Fondo anti-imprevistos</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div class="text-[10px] font-bold uppercase text-slate-300">4. Margen Libre (15%)</div>
            <div id="vault-4-val" class="text-base font-extrabold text-white mt-0.5">$240 USD</div>
            <div class="text-[10px] text-slate-400">Disfrute sin culpa</div>
          </div>
        </div>

        <div class="p-3.5 rounded-xl bg-[${archetype.colors.accentPrimary}]/10 border border-[${archetype.colors.accentPrimary}]/30 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">📱 Calculadora Móvil de Liquidez y Deudas</div>
            <div class="text-[11px] text-slate-300">4 Bóvedas + Simulador de Tarjetas + Escáner de Fugas</div>
          </div>
          <a href="/app" class="px-3 py-1.5 rounded-lg bg-[${archetype.colors.accentPrimary}] text-slate-950 font-extrabold text-xs hover:opacity-90 transition shrink-0">
            Abrir App →
          </a>
        </div>
        <script is:inline>
          window.updateHeroVaults = function() {
            const val = parseFloat(document.getElementById('hero-salary-input').value) || 1600;
            document.getElementById('hero-salary-val').innerText = '$' + val.toLocaleString() + ' USD';
            document.getElementById('vault-1-val').innerText = '$' + Math.round(val * 0.50).toLocaleString() + ' USD';
            document.getElementById('vault-2-val').innerText = '$' + Math.round(val * 0.20).toLocaleString() + ' USD';
            document.getElementById('vault-3-val').innerText = '$' + Math.round(val * 0.15).toLocaleString() + ' USD';
            document.getElementById('vault-4-val').innerText = '$' + Math.round(val * 0.15).toLocaleString() + ' USD';
          };
        </script>
      </div>`
    : `
      <div class="bg-gradient-to-b from-[${archetype.colors.bgCard}] to-slate-950 border border-[${archetype.colors.borderCard}] rounded-2xl p-5 sm:p-6 shadow-2xl relative">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-widest text-[${archetype.colors.accentPrimary}]">Vista Previa del Sistema</span>
            <h2 class="text-base font-extrabold text-white">${productName}</h2>
          </div>
          <span class="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50">
            ● Sistema Activo
          </span>
        </div>

        <div class="space-y-3 mb-5">
          ${phases.map((p) => `
          <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-[${archetype.colors.accentPrimary}]/50 transition">
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="font-bold text-[${archetype.colors.accentPrimary}]">${p.timeframe}</span>
              <span class="text-[11px] text-emerald-400 font-semibold">✓ Incluido</span>
            </div>
            <div class="text-sm font-bold text-white">${p.name}</div>
            <div class="text-xs text-slate-400 mt-0.5">📦 ${p.deliverable}</div>
          </div>`).join('')}
        </div>

        <div class="p-3.5 rounded-xl bg-[${archetype.colors.accentPrimary}]/10 border border-[${archetype.colors.accentPrimary}]/30 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">📱 App Interactiva de Bolsillo Incluida</div>
            <div class="text-[11px] text-slate-300">Simulador del método + Seguimiento + Guías en 1 toque</div>
          </div>
          <a href="/app" class="px-3 py-1.5 rounded-lg bg-[${archetype.colors.accentPrimary}] text-slate-950 font-extrabold text-xs hover:opacity-90 transition">
            Abrir App →
          </a>
        </div>
      </div>`;

  // 3. HeroSection.astro (Top Status Bar + Split Hero + Live Interactive System Preview)
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
<!-- Top Urgency & Ecosystem Bar -->
<div class="bg-gradient-to-r from-[${archetype.colors.bgCard}] via-slate-900 to-[${archetype.colors.bgCard}] border-b border-[${archetype.colors.borderCard}] py-2.5 px-4 text-center text-xs sm:text-sm font-medium text-slate-300">
  <span class="inline-flex items-center gap-2">
    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    <span class="text-white font-semibold">${topBannerText}</span> · <a href="/app" class="text-[${archetype.colors.accentPrimary}] underline font-bold hover:opacity-80">Ver App en Vivo</a>
  </span>
</div>

<section class="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
  <!-- Ambient Radial Glow -->
  <div class="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[580px] h-[320px] rounded-full bg-[${archetype.colors.accentPrimary}]/15 blur-3xl"></div>

  <div class="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
    <!-- Columna Izquierda: Copy de Conversión Directa -->
    <div class="lg:col-span-7 text-left">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 text-xs font-bold tracking-wider uppercase rounded-full bg-[${archetype.colors.accentPrimary}]/10 text-[${archetype.colors.accentPrimary}] border border-[${archetype.colors.accentPrimary}]/30">
        <span>⚡ ${archetype.badge}</span>
        <span class="text-slate-500">·</span>
        <span class="text-slate-300">{kicker}</span>
      </div>

      <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-5 leading-[1.12]">
        {headline}
      </h1>

      <p class="text-base sm:text-lg text-[${archetype.colors.textSecondary}] mb-6 leading-relaxed">
        {subheadline}
      </p>

      <!-- Micro-Pills de Beneficio Inmediato -->
      <div class="flex flex-wrap gap-2.5 mb-7 text-xs sm:text-sm text-slate-200">
        ${heroPills.map(pill => `
        <span class="px-3 py-1.5 rounded-lg bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] flex items-center gap-1.5">
          <span class="text-emerald-400 font-bold">✓</span> ${pill}
        </span>`).join('')}
      </div>

      <!-- Doble Vía de Conversión -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
        <a href={checkoutUrl} class="checkout-btn text-center px-7 py-4 text-base sm:text-lg font-extrabold rounded-xl bg-gradient-to-r from-[${archetype.colors.accentGradientFrom}] to-[${archetype.colors.accentGradientTo}] hover:opacity-95 text-slate-950 shadow-[0_0_35px_${archetype.colors.accentGlow}] transition-all duration-300 hover:scale-[1.01]">
          {ctaText} →
        </a>
        <a href="/quiz" class="text-center px-5 py-4 text-sm sm:text-base font-bold rounded-xl bg-[${archetype.colors.bgCard}] hover:bg-slate-800 text-white border border-[${archetype.colors.borderCard}] transition duration-200">
          🎯 Hacer Test de Diagnóstico (60s)
        </a>
      </div>

      <!-- Barra de Prueba Social y Confianza -->
      <div class="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
        <div class="flex items-center gap-1 text-amber-400 font-bold">
          <span>★★★★★</span>
          <span class="text-white ml-1">4.9/5</span>
        </div>
        <span>+400 casos auditados con la ${uniqueMech}</span>
        <span class="text-emerald-400 font-semibold">🛡️ Garantía Blindada 30 Días</span>
      </div>
    </div>

    <!-- Columna Derecha: Simulador / Mockup Interactivo del Ecosistema -->
    <div class="lg:col-span-5">
      ${heroRightWidgetHtml}
    </div>
  </div>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'HeroSection.astro'), heroCode, 'utf8');

  // 4. PainPoints.astro (Auditoría Interactiva de Síntomas + Raíz del Problema)
  const symptomsList = Array.isArray(webConfig.symptoms) && webConfig.symptoms.length >= 4
    ? webConfig.symptoms
    : [
        {
          title: `Fuga constante por ${painLower.slice(0, 45)}`,
          desc: `Intentas resolverlo sobre la marcha, pero el desgaste diario consume tu margen de maniobra.`
        },
        {
          title: `Esfuerzo alto sin resultados proporcionales`,
          desc: `Cumples con tus obligaciones cada semana, pero sientes que el avance real se estanca.`
        },
        {
          title: `Frustración con métodos complejos o teóricos`,
          desc: `Probaste soluciones largas que exigían demasiado tiempo y terminaste abandonándolas a los pocos días.`
        },
        {
          title: `Falta de un sistema automático ante imprevistos`,
          desc: `Cualquier urgencia en la semana desarma tu planificación y te obliga a empezar de cero.`
        }
      ];

  const painCode = `---
---
<section class="w-full h-full css-scroll-reveal flex flex-col">
  <div class="h-full bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="text-xs font-bold text-rose-400 uppercase tracking-widest">Diagnóstico de Situación Actual</span>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-2">
        ¿Te resulta familiar esta escena al mirar el saldo de tu cuenta?
      </h2>
      <p class="text-sm text-[${archetype.colors.textSecondary}] mt-2">
        Marca las casillas que describen tu realidad actual para medir tu nivel de urgencia:
      </p>
    </div>

    <!-- Escena Visceral del Copy -->
    ${parsedCopy.leadPainParas && parsedCopy.leadPainParas.length > 0 ? `
    <div class="mb-8 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
      <div class="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
        <span class="text-base">🌙</span> La realidad silenciosa a mitad de mes
      </div>
      <p class="text-white font-medium italic">
        "${parsedCopy.leadPainParas[0].replace(/^["']|["']$/g, '')}"
      </p>
      ${parsedCopy.leadPainParas[1] ? `<p class="text-slate-300 text-sm">${parsedCopy.leadPainParas[1]}</p>` : ''}
    </div>` : ''}

    <!-- 4 Tarjetas Interactivas de Síntomas del Nicho -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
      ${symptomsList.map((sym, idx) => `
      <label class="symptom-card ${idx % 2 === 0 ? 'css-scroll-left' : 'css-scroll-right'} cursor-pointer p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 transition flex items-start gap-3">
        <input type="checkbox" onchange="updateSymptomCount()" class="symptom-check mt-1 w-4 h-4 accent-rose-500 rounded" ${idx < 2 ? 'checked' : ''} />
        <span class="text-sm text-slate-200 leading-snug">
          <strong class="text-white block mb-0.5">${sym.title}</strong>
          ${sym.desc}
        </span>
      </label>`).join('')}
    </div>

    <div id="symptom-status" class="mb-8 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-center text-xs sm:text-sm text-rose-200 font-semibold">
      ⚠️ Has marcado <span id="symptom-count" class="font-extrabold text-white">2</span> de 4 indicadores críticos. Actuar en las próximas 48h cortará esta fuga de raíz.
    </div>

    <!-- Narrativa Empática y Revelación del Enemigo Común -->
    <div class="space-y-4 text-[${archetype.colors.textSecondary}] text-base leading-relaxed border-t border-slate-800 pt-6">
      <h3 class="text-base font-bold text-white">Por qué los métodos tradicionales solo empeoran el problema:</h3>
      <p>
        El mayor error es creer que esto se soluciona con más sacrificio o fuerza de voluntad aislada. <strong class="text-white">El problema nunca fue tu disciplina</strong>, sino que ${commonEnemy}.
      </p>
      <div class="p-4 rounded-xl bg-[${archetype.colors.accentPrimary}]/10 border-l-4 border-[${archetype.colors.accentPrimary}] text-slate-200 text-sm sm:text-base font-medium">
        💡 <strong>El cambio de paradigma:</strong> Cuando instalas la <strong>${uniqueMech}</strong>, reemplazas el desgaste diario por una estructura automática que produce resultados medibles desde las primeras 48 horas.
      </div>
    </div>
  </div>

  <script is:inline>
    window.updateSymptomCount = function() {
      const checks = document.querySelectorAll('.symptom-check:checked').length;
      const el = document.getElementById('symptom-count');
      if (el) el.innerText = checks;
    };
  </script>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'PainPoints.astro'), painCode, 'utf8');

  // 4b. QuickWins.astro (Timeline de Victorias Rápidas)
  const quickWinsList = Array.isArray(webConfig.quick_wins) && webConfig.quick_wins.length >= 3
    ? webConfig.quick_wins
    : [
        {
          badge: '⏱️ En tus primeras 2 horas',
          title: phases[0]?.name || 'Auditoría y Corte de Fugas',
          desc: `Aplicas el diagnóstico inicial para frenar en seco el síntoma más urgente de ${painLower}.`
        },
        {
          badge: '⚡ En las primeras 48 horas',
          title: phases[1]?.name || 'Instalación del Sistema Base',
          desc: `Configuras las herramientas listas para usar y obtienes tu primera victoria cuantificable.`
        },
        {
          badge: '🛡️ Al completar el Día 7',
          title: phases[2]?.name || 'Piloto Automático Activo',
          desc: `La ${uniqueMech} y tu App de Bolsillo sostienen tus resultados sin depender de fuerza de voluntad.`
        }
      ];

  const badgeColors = [
    'bg-emerald-950 text-emerald-400 border-emerald-800/50',
    'bg-blue-950 text-blue-400 border-blue-800/50',
    'bg-amber-950 text-amber-400 border-amber-800/50'
  ];

  const quickWinsCode = `---
---
<section class="py-12 px-4 sm:px-6 max-w-4xl mx-auto css-scroll-reveal">
  <div class="text-center mb-8">
    <span class="text-xs font-bold text-[${archetype.colors.accentPrimary}] uppercase tracking-widest">Velocidad de Implementación</span>
    <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-1">
      Lo que ocurre desde el momento en que activas tu acceso
    </h2>
    <p class="text-sm text-[${archetype.colors.textSecondary}] mt-2">
      Diseñado para entregarte victorias rápidas y medibles sin esperar meses:
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    ${quickWinsList.map((qw, idx) => `
    <div class="css-scroll-scale bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] rounded-2xl p-6 relative">
      <span class="inline-block px-3 py-1 rounded-full text-xs font-extrabold ${badgeColors[idx] || badgeColors[0]} border mb-3">
        ${qw.badge}
      </span>
      <h3 class="text-lg font-bold text-white mb-2">${qw.title}</h3>
      <p class="text-sm text-[${archetype.colors.textSecondary}] leading-relaxed">
        ${qw.desc}
      </p>
    </div>`).join('')}
  </div>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'QuickWins.astro'), quickWinsCode, 'utf8');

  // 5. SpecialSection.astro (Simulador / Calculadora Interactiva en Vivo + Métricas del Arquetipo)
  const metricsHtml = archetype.specialMetrics.map(m => `
      <div class="bg-[${archetype.colors.bgMain}]/80 border border-[${archetype.colors.borderCard}] p-4 rounded-xl flex items-center justify-between">
        <span class="text-xs sm:text-sm text-slate-300 font-medium">${m.label}</span>
        <span class="font-extrabold ${m.color} text-xs sm:text-sm">${m.value}</span>
      </div>`).join('\n');

  const calcConfig = webConfig.calculator || {
    slider1_label: 'Tu ingreso mensual neto ($ USD):',
    slider1_min: 600,
    slider1_max: 5000,
    slider1_step: 100,
    slider1_default: 1500,
    slider1_unit: 'USD/mes',
    slider2_label: 'Deuda total en tarjetas / préstamos ($ USD):',
    slider2_min: 500,
    slider2_max: 15000,
    slider2_step: 250,
    slider2_default: 3000,
    slider2_unit: 'USD',
    out1_label: 'Liquidez Mensual Liberada',
    out2_label: 'Intereses y Fugas Ahorrados (Año)',
    out3_label: 'Tiempo Estimado a Deuda Cero'
  };

  const specialSectionCode = `---
---
<section class="w-full h-full css-scroll-scale flex flex-col">
  <div class="h-full bg-gradient-to-br from-[${archetype.colors.bgCard}] to-[${archetype.colors.bgMain}] border border-[${archetype.colors.borderCard}] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
    <div class="text-xs font-bold text-[${archetype.colors.accentPrimary}] uppercase tracking-widest mb-2">
      ${archetype.badge} · Simulador Interactivo en Vivo
    </div>
    <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-2">
      ${archetype.specialSectionTitle}
    </h2>
    <p class="text-sm text-[${archetype.colors.textSecondary}] mb-6">
      ${archetype.specialSectionSubtitle}
    </p>

    <!-- Calculadora / Simulador Interactivo en Vivo -->
    <div class="bg-slate-950/90 border border-[${archetype.colors.borderCard}] rounded-2xl p-5 sm:p-6 mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <div class="flex justify-between text-xs font-bold text-slate-300 mb-2">
            <span>${calcConfig.slider1_label}</span>
            <span id="calc-income-val" class="text-[${archetype.colors.accentPrimary}]">$${Number(calcConfig.slider1_default).toLocaleString()} ${calcConfig.slider1_unit || ''}</span>
          </div>
          <input id="calc-income" type="range" min="${calcConfig.slider1_min}" max="${calcConfig.slider1_max}" step="${calcConfig.slider1_step}" value="${calcConfig.slider1_default}" oninput="updateImpactCalc()" class="w-full accent-[${archetype.colors.accentPrimary}] cursor-pointer" />
        </div>
        <div>
          <div class="flex justify-between text-xs font-bold text-slate-300 mb-2">
            <span>${calcConfig.slider2_label}</span>
            <span id="calc-debt-val" class="text-amber-400">$${Number(calcConfig.slider2_default).toLocaleString()} ${calcConfig.slider2_unit || ''}</span>
          </div>
          <input id="calc-debt" type="range" min="${calcConfig.slider2_min}" max="${calcConfig.slider2_max}" step="${calcConfig.slider2_step}" value="${calcConfig.slider2_default}" oninput="updateImpactCalc()" class="w-full accent-amber-400 cursor-pointer" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-center">
        <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div class="text-[11px] text-slate-400 uppercase font-semibold">${calcConfig.out1_label || 'Resultado Directo'}</div>
          <div id="calc-out-monthly" class="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1">+$345 USD/mes</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div class="text-[11px] text-slate-400 uppercase font-semibold">${calcConfig.out2_label || 'Impacto Anual Proyectado'}</div>
          <div id="calc-out-yearly" class="text-xl sm:text-2xl font-extrabold text-white mt-1">+$4,140 USD</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div class="text-[11px] text-slate-400 uppercase font-semibold">${calcConfig.out3_label || 'Tiempo Estimado'}</div>
          <div id="calc-out-months" class="text-xl sm:text-2xl font-extrabold text-amber-400 mt-1">5.5 meses</div>
        </div>
      </div>
    </div>

    <div class="space-y-2.5">
      ${metricsHtml}
    </div>
  </div>

  <script is:inline>
    window.updateImpactCalc = function() {
      const income = parseFloat(document.getElementById('calc-income').value) || 1500;
      const debt = parseFloat(document.getElementById('calc-debt').value) || 3000;
      document.getElementById('calc-income-val').innerText = '$' + income.toLocaleString() + ' ${calcConfig.slider1_unit || ''}';
      document.getElementById('calc-debt-val').innerText = '$' + debt.toLocaleString() + ' ${calcConfig.slider2_unit || ''}';

      // Cálculo de recuperación proporcional al valor de entrada
      const monthlyFreed = Math.round(income * 0.18 + debt * 0.025);
      const yearlySaved = monthlyFreed * 12;
      const attackQuota = Math.max(120, Math.round(income * 0.20) + Math.round(monthlyFreed * 0.5));
      const monthsToZero = Math.max(1.5, (debt / attackQuota)).toFixed(1);

      document.getElementById('calc-out-monthly').innerText = '+$' + monthlyFreed.toLocaleString() + ' USD/mes';
      document.getElementById('calc-out-yearly').innerText = '+$' + yearlySaved.toLocaleString() + ' USD';
      document.getElementById('calc-out-months').innerText = monthsToZero + ' meses';
    };
  </script>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'SpecialSection.astro'), specialSectionCode, 'utf8');

  // 6. UniqueMechanism.astro (Matriz Comparativa Viejo vs Nuevo + 3 Fases Detalladas)
  const comparisonRowsHtml = comparisonTable.map(row => `
    <tr class="border-b border-slate-800/80">
      <td class="py-3.5 px-4 font-bold text-white text-xs sm:text-sm">${row.dimension}</td>
      <td class="py-3.5 px-4 text-rose-300/90 text-xs sm:text-sm bg-rose-950/20">❌ ${row.traditional}</td>
      <td class="py-3.5 px-4 text-emerald-300 font-semibold text-xs sm:text-sm bg-emerald-950/20">✓ ${row.newMechanism}</td>
    </tr>
  `).join('\n');

  const mechanismCode = `---
---
<section class="w-full h-full css-scroll-reveal flex flex-col justify-between bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] rounded-3xl p-6 sm:p-8 shadow-xl">
  <div class="text-center mb-8">
    <span class="text-xs font-bold text-[${archetype.colors.accentPrimary}] uppercase tracking-widest">El Mecanismo Único</span>
    <h2 class="text-2xl sm:text-4xl font-extrabold text-white mt-1 mb-3">${uniqueMech}</h2>
    <p class="text-sm sm:text-base text-[${archetype.colors.textSecondary}] max-w-2xl mx-auto">
      Por qué las soluciones convencionales fallan y cómo nuestra arquitectura de 3 fases resuelve el problema desde la raíz:
    </p>
  </div>

  <!-- Tabla Comparativa de Alto Contraste -->
  <div class="css-scroll-scale overflow-x-auto rounded-2xl border border-[${archetype.colors.borderCard}] bg-[${archetype.colors.bgCard}] shadow-xl mb-10">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b border-slate-800 bg-slate-900/90 text-[11px] sm:text-xs uppercase tracking-wider text-slate-400">
          <th class="py-3.5 px-4">Criterio</th>
          <th class="py-3.5 px-4 text-rose-400">Soluciones Tradicionales</th>
          <th class="py-3.5 px-4 text-emerald-400">${productName}</th>
        </tr>
      </thead>
      <tbody>
        ${comparisonRowsHtml}
      </tbody>
    </table>
  </div>

  <!-- 3 Fases Progresivas con Entregables -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
    ${phases.map((p, idx) => `
    <div class="css-scroll-reveal bg-[${archetype.colors.bgCard}] p-6 rounded-2xl border border-[${archetype.colors.borderCard}] flex flex-col justify-between hover:border-[${archetype.colors.accentPrimary}]/50 transition">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-extrabold uppercase tracking-wider text-[${archetype.colors.accentPrimary}]">${p.timeframe}</span>
          <span class="w-7 h-7 rounded-full bg-[${archetype.colors.accentPrimary}]/15 text-[${archetype.colors.accentPrimary}] font-extrabold text-xs flex items-center justify-center">0${idx + 1}</span>
        </div>
        <h3 class="text-lg font-extrabold text-white mb-2">${p.name}</h3>
        <p class="text-sm text-[${archetype.colors.textSecondary}] leading-relaxed">${p.desc}</p>
      </div>
      <div class="mt-5 pt-3 border-t border-slate-800/80 text-xs text-emerald-400 font-semibold">
        📦 Entregable: ${p.deliverable}
      </div>
    </div>`).join('\n')}
  </div>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'UniqueMechanism.astro'), mechanismCode, 'utf8');

  // 6a-extra. TargetAudience.astro (Filtro de Calificación de 2 Columnas)
  const yesList = (parsedCopy.forWhoYes && parsedCopy.forWhoYes.length > 0)
    ? parsedCopy.forWhoYes
    : [
        `Buscas eliminar ${painLower} con un sistema práctico y directo al grano.`,
        `Prefieres herramientas listas para usar y una App de Bolsillo en vez de cursos eternos llenos de teoría.`,
        `Quieres ver tu primera victoria tangible dentro de tus primeras 48 horas.`,
        `Valoras contar con una Garantía Incondicional de 30 Días con riesgo cero.`
      ];

  const noList = (parsedCopy.forWhoNo && parsedCopy.forWhoNo.length > 0)
    ? parsedCopy.forWhoNo
    : [
        `Buscas soluciones mágicas sin dedicar siquiera 15 minutos a configurar el paso a paso.`,
        `Prefieres acumular teoría académica en lugar de aplicar herramientas concretas.`,
        `No estás dispuesto a reemplazar viejos métodos ineficientes por una estructura probada.`,
        `Crees que seguir haciendo exactamente lo mismo resolverá tu situación actual.`
      ];

  const targetAudienceCode = `---
---
<section class="w-full h-full css-scroll-reveal flex flex-col">
  <div class="h-full grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="css-scroll-left bg-[${archetype.colors.bgCard}] border border-emerald-800/40 rounded-2xl p-6 sm:p-8">
      <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">Perfil Ideal</span>
      <h3 class="text-xl font-extrabold text-white mt-1 mb-4">Este sistema SÍ es para ti si:</h3>
      <ul class="space-y-3 text-sm text-slate-200">
        ${yesList.map(item => `
        <li class="flex items-start gap-2.5">
          <span class="text-emerald-400 font-bold shrink-0">✓</span>
          <span>${item}</span>
        </li>`).join('')}
      </ul>
    </div>

    <div class="css-scroll-right bg-[${archetype.colors.bgCard}] border border-rose-900/40 rounded-2xl p-6 sm:p-8">
      <span class="text-xs font-bold uppercase tracking-widest text-rose-400">Filtro de Exclusión</span>
      <h3 class="text-xl font-extrabold text-white mt-1 mb-4">Este sistema NO es para ti si:</h3>
      <ul class="space-y-3 text-sm text-slate-300">
        ${noList.map(item => `
        <li class="flex items-start gap-2.5">
          <span class="text-rose-400 font-bold shrink-0">✕</span>
          <span>${item}</span>
        </li>`).join('')}
      </ul>
    </div>
  </div>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'TargetAudience.astro'), targetAudienceCode, 'utf8');

  // 6b-extra. SolutionShowcase.astro (Radiografía Interna del Producto + App Móvil sin jerga técnica)
  const solutionShowcaseCode = `---
---
<section class="w-full h-full css-scroll-scale flex flex-col">
  <div class="h-full bg-gradient-to-br from-slate-900 via-[${archetype.colors.bgCard}] to-slate-950 border border-[${archetype.colors.borderCard}] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="text-xs font-bold text-[${archetype.colors.accentPrimary}] uppercase tracking-widest">Radiografía por Dentro</span>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-1">
        Todo lo que recibes en tu cuenta al instante
      </h2>
      <p class="text-sm text-[${archetype.colors.textSecondary}] mt-2">
        Un sistema práctico listo para usar desde tu celular, tablet o computadora:
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="css-scroll-reveal p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
        <div class="text-2xl mb-2">📘</div>
        <h3 class="text-base font-extrabold text-white mb-1">1. Manual Operativo Maestro</h3>
        <p class="text-xs text-slate-400 leading-relaxed">
          Guía paso a paso libre de relleno con las 3 fases de la ${uniqueMech}, hojas de ruta y listas de verificación descargables en PDF.
        </p>
      </div>

      <div class="css-scroll-reveal p-5 rounded-2xl bg-slate-950/80 border border-[${archetype.colors.accentPrimary}]/40">
        <div class="text-2xl mb-2">📱</div>
        <h3 class="text-base font-extrabold text-white mb-1">${appShowcaseTitle}</h3>
        <p class="text-xs text-slate-400 leading-relaxed mb-3">
          ${appShowcaseDesc}
        </p>
        <a href="/app" class="inline-block text-xs font-bold text-[${archetype.colors.accentPrimary}] underline">Abrir App en vivo →</a>
      </div>

      <div class="css-scroll-reveal p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
        <div class="text-2xl mb-2">⚡</div>
        <h3 class="text-base font-extrabold text-white mb-1">3. Los 4 Bonos de Aceleración</h3>
        <p class="text-xs text-slate-400 leading-relaxed">
          ${bonuses.map(b => b.name).slice(0, 2).join(' + ')} y más herramientas listas para usar hoy mismo.
        </p>
      </div>
    </div>
  </div>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'SolutionShowcase.astro'), solutionShowcaseCode, 'utf8');

  // 6c-extra. SocialProof.astro (3 Casos de Estudio Cuantificados del Nicho)
  const caseStudiesList = Array.isArray(webConfig.case_studies) && webConfig.case_studies.length >= 3
    ? webConfig.case_studies
    : [
        {
          metric: 'Resultado en 48h',
          quote: `Apliqué el diagnóstico de la Fase 1 el fin de semana y corté de inmediato las fugas que me tenían estancado.`,
          author: 'Martín G. · 36 años',
          role: 'Profesional Independiente'
        },
        {
          metric: '100% Aplicable',
          quote: `Odiaba los cursos largos llenos de teoría. La App del celular y los pasos de 15 minutos hicieron que instalar el método fuera automático.`,
          author: 'Valeria R. · 31 años',
          role: 'Consultora & Especialista'
        },
        {
          metric: 'Retorno Inmediato',
          quote: `Solo con aplicar el Bono #1 recuperé en la primera semana más de diez veces lo que pagué por todo el sistema.`,
          author: 'Diego M. · 41 años',
          role: 'Profesional & Padre de Familia'
        }
      ];

  const socialProofCode = `---
---
<section class="w-full h-full css-scroll-reveal flex flex-col justify-between bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] rounded-3xl p-6 sm:p-8 shadow-xl">
  <div class="mb-6">
    <span class="text-xs font-bold text-[${archetype.colors.accentPrimary}] uppercase tracking-widest">Resultados Verificados</span>
    <h2 class="text-2xl font-extrabold text-white mt-1">
      Historias reales de personas que recuperaron su tranquilidad
    </h2>
  </div>

  <div class="space-y-3.5">
    ${caseStudiesList.map(cs => `
    <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
      <div class="flex items-center justify-between text-xs mb-1.5">
        <span class="text-amber-400 font-bold">★★★★★</span>
        <span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px]">${cs.metric}</span>
      </div>
      <p class="text-xs text-slate-200 leading-relaxed italic mb-2">
        "${cs.quote}"
      </p>
      <div class="text-[11px] text-slate-400 font-medium">
        <strong class="text-white">${cs.author}</strong> · ${cs.role}
      </div>
    </div>`).join('')}
  </div>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'SocialProof.astro'), socialProofCode, 'utf8');

  // 6d. BonusStack.astro (4 Bonos Mata-Objeciones con Objeción Derribada)
  const bonusCardsHtml = bonuses.map((b, i) => `
    <div class="css-scroll-scale bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] p-6 rounded-2xl flex flex-col justify-between hover:border-[${archetype.colors.accentPrimary}]/50 transition duration-200">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-extrabold text-[${archetype.colors.accentPrimary}] uppercase tracking-wider">Bono Táctico #${i + 1}</span>
          <span class="text-xs font-extrabold text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-800/50">HOY GRATIS</span>
        </div>
        <h3 class="text-base sm:text-lg font-extrabold text-white mb-2">${b.title || b.name}</h3>
        <p class="text-xs sm:text-sm text-[${archetype.colors.textSecondary}] leading-relaxed mb-3">${b.purpose || 'Herramienta de aceleración práctica.'}</p>
      </div>
      <div>
        <div class="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-amber-300 mb-3">
          🛡️ <strong>Destruye la excusa:</strong> ${b.objectionDestroyed || '“No sé cómo empezar rápido”'}
        </div>
        <div class="pt-3 border-t border-slate-800 text-xs text-slate-400 flex justify-between items-center">
          <span>Valor vendido por separado:</span>
          <span class="line-through text-slate-400 font-bold">$${b.perceivedValue || 29} USD</span>
        </div>
      </div>
    </div>
  `).join('\n');

  const bonusStackCode = `---
---
<section class="py-12 px-4 sm:px-6 max-w-4xl mx-auto css-scroll-reveal">
  <div class="text-center mb-8">
    <span class="text-xs font-bold text-[${archetype.colors.accentPrimary}] uppercase tracking-widest">Pila de Bonos Mata-Objeciones</span>
    <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-1">4 Aceleradores Gratis al Unirte Hoy</h2>
    <p class="text-sm text-[${archetype.colors.textSecondary}] mt-2 max-w-xl mx-auto">Cada bono fue creado específicamente para derribar un obstáculo y entregarte resultados más rápido.</p>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    ${bonusCardsHtml}
  </div>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'BonusStack.astro'), bonusStackCode, 'utf8');

  // 7. PricingOffer.astro (Recibo Completo de Valor + Pasarelas Stripe/MP + Garantía 30 Días)
  const stackItemsHtml = bonuses.map((b, i) => `
        <div class="flex justify-between items-center py-2.5 border-b border-slate-800/80 text-xs sm:text-sm">
          <span class="text-slate-300">🎁 Bono #${i + 1}: ${b.title || b.name}</span>
          <span class="text-slate-400 line-through font-semibold">$${b.perceivedValue || 29} USD</span>
        </div>`).join('\n');

  const pricingCode = `---
interface Props {
  price: number;
  totalValue: number;
  checkoutUrl: string;
}
const { price, totalValue, checkoutUrl } = Astro.props;
---
<section class="py-16 px-4 sm:px-6 max-w-3xl mx-auto css-scroll-scale" id="oferta">
  <div class="bg-gradient-to-b from-[${archetype.colors.bgCard}] to-slate-950 border-2 border-[${archetype.colors.accentPrimary}]/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
    <div class="text-center">
      <div class="inline-block px-4 py-1 mb-4 text-xs font-extrabold uppercase rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
        🔥 OFERTA DE ACCESO INMEDIATO · AHORRAS ${discountPct}% HOY
      </div>
      <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-2">${productName}</h2>
      <p class="text-sm text-[${archetype.colors.textSecondary}] mb-6">Resumen completo de todo lo que desbloqueas hoy con un único pago:</p>
    </div>

    <!-- Desglose Matemático del Stack de Valor -->
    <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-6 text-left">
      <div class="flex justify-between items-center py-2.5 border-b border-slate-800 text-xs sm:text-sm font-bold">
        <span class="text-white">📘 ${productName} (Sistema Maestro en 3 Fases)</span>
        <span class="text-slate-400 line-through">$97 USD</span>
      </div>
      <div class="flex justify-between items-center py-2.5 border-b border-slate-800 text-xs sm:text-sm font-bold">
        <span class="text-emerald-400">📱 ${appShowcaseTitle.replace(/^2\.\s*/, '')} (Celular / Computadora)</span>
        <span class="text-emerald-400">INCLUIDA</span>
      </div>
      ${stackItemsHtml}
      <div class="flex justify-between items-center pt-3 mt-1 text-sm sm:text-base font-extrabold">
        <span class="text-slate-300">Valor Total Acumulado:</span>
        <span class="text-rose-400 line-through">\${totalValue} USD</span>
      </div>
    </div>

    <div class="text-center">
      <div class="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Pago Único Hoy (Sin Suscripciones):</div>
      <div class="text-5xl sm:text-6xl font-extrabold text-[${archetype.colors.accentPrimary}] mb-6">
        \${price} <span class="text-xl text-slate-300 font-normal">USD</span>
      </div>

      <a href={checkoutUrl} class="checkout-btn block w-full py-4 sm:py-5 text-lg sm:text-xl font-extrabold rounded-xl bg-gradient-to-r from-[${archetype.colors.accentGradientFrom}] to-[${archetype.colors.accentGradientTo}] hover:opacity-95 text-slate-950 shadow-[0_0_35px_${archetype.colors.accentGlow}] transition-all duration-300 hover:scale-[1.01]">
        DESBLOQUEAR ACCESO COMPLETO AHORA →
      </a>

      <!-- Pasarelas de Pago Disponibles -->
      <div class="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
        <span class="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">💳 <strong>Stripe</strong> (Tarjetas Internacionales)</span>
        <span class="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">🤝 <strong>Mercado Pago</strong> (Moneda Local & Cuotas)</span>
      </div>
    </div>

    <!-- Bóveda de Garantía Blindada de 30 Días -->
    <div class="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-4 text-left bg-slate-900/50 p-4 rounded-2xl">
      <div class="text-3xl sm:text-4xl">🛡️</div>
      <div>
        <h3 class="text-sm sm:text-base font-extrabold text-white">Garantía Incondicional de 30 Días (Riesgo 100% Nuestro)</h3>
        <p class="text-xs text-slate-400 leading-relaxed mt-1">
          Entra hoy, descarga el manual, usa la App Móvil y aplica el protocolo de 48 horas. Si no sientes que vale al menos 10 veces tu inversión, te devolvemos el 100% de tu dinero sin preguntas.
        </p>
      </div>
    </div>
  </div>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'PricingOffer.astro'), pricingCode, 'utf8');

  // 7b. CreatorBio.astro (Autoridad de Campo)
  const bioTitleText = parsedCopy.bioTitle || `¿Por qué funciona la ${uniqueMech}?`;
  const bioParagraphs = (parsedCopy.bioText && parsedCopy.bioText.length > 20)
    ? parsedCopy.bioText.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
    : [
        `Este sistema fue sintetizado tras auditar en campo los bloqueos reales que enfrentan quienes lidian con ${painLower}. Eliminamos toda la paja teórica y conservamos únicamente las intervenciones estratégicas que generan el 80% de los resultados desde los primeros dos días.`
      ];
  const bioHtml = bioParagraphs.map(p => `<p class="text-sm text-[${archetype.colors.textSecondary}] leading-relaxed mb-3">${p}</p>`).join('\n');

  const creatorBioCode = `---
---
<section class="py-10 px-4 sm:px-6 max-w-3xl mx-auto css-scroll-reveal">
  <div class="bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] rounded-2xl p-6 sm:p-8">
    <span class="text-xs font-bold text-[${archetype.colors.accentPrimary}] uppercase tracking-widest">Respaldo Metodológico</span>
    <h3 class="text-lg sm:text-xl font-extrabold text-white mt-1 mb-3">${bioTitleText}</h3>
    ${bioHtml}
  </div>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'CreatorBio.astro'), creatorBioCode, 'utf8');

  // 7c. FaqAccordion.astro (6 Preguntas Mata-Objeciones)
  const faqs = (parsedCopy.faqItems && parsedCopy.faqItems.length > 0)
    ? parsedCopy.faqItems
    : [
        {
          q: `1. ¿Cuánto tiempo necesito realmente para aplicar el ${productName}?`,
          a: `Solo necesitas 15 minutos iniciales para configurar el sistema. Además, cuentas con el Bono #1 (${bonuses[0]?.name || 'Acelerador de Acción Rápida'}) diseñado específicamente para obtener tu primera victoria de inmediato.`
        },
        {
          q: `2. ¿Cuándo y cómo recibo el acceso a los materiales y a la App Móvil?`,
          a: `El acceso es 100% instantáneo. Apenas completas tu orden segura, se desbloquea en pantalla y en tu correo el Manual Maestro, los 4 Bonos y el acceso directo a la Aplicación Móvil Interactiva.`
        },
        {
          q: `3. ¿Necesito conocimientos técnicos o instalar programas complicados?`,
          a: `En absoluto. Todo el sistema está diseñado en lenguaje claro y directo. Las plantillas vienen listas para usar y la App Móvil se abre directo en tu teléfono con un toque.`
        },
        {
          q: `4. ¿En qué se diferencia de otros cursos o información gratuita?`,
          a: `La información suelta te satura de teoría pero no te da estructura. Aquí recibes la ${uniqueMech} ordenada en 3 fases lógicas, con herramientas interactivas que te guían paso a paso sin adivinar qué hacer.`
        },
        {
          q: `5. ¿Puedo pagar con tarjeta internacional o en mi moneda local?`,
          a: `Sí. En la pasarela de pago puedes elegir entre Stripe (para cualquier tarjeta de crédito o débito internacional) o Mercado Pago (para cobros locales y cuotas en Latinoamérica).`
        },
        {
          q: `6. ¿Qué ocurre si pruebo el sistema y siento que no es para mí?`,
          a: `Estás protegido por nuestra Garantía Blindada de 30 Días. Puedes revisar todo el material por dentro y, si no estás 100% satisfecho, solicitas el reembolso total con un solo mensaje.`
        }
      ];

  const faqItemsHtml = faqs.map((f, i) => `
    <div class="css-scroll-reveal border border-[${archetype.colors.borderCard}] rounded-xl overflow-hidden bg-[${archetype.colors.bgCard}]">
      <button type="button" onclick="toggleFaq(${i})" class="w-full text-left p-4 sm:p-5 font-bold text-white flex justify-between items-center hover:bg-slate-800/40 transition text-sm sm:text-base">
        <span>${f.q}</span>
        <span id="faq-icon-${i}" class="text-[${archetype.colors.accentPrimary}] text-xl ml-2">${i === 0 ? '−' : '+'}</span>
      </button>
      <div id="faq-answer-${i}" class="${i === 0 ? '' : 'hidden'} p-4 sm:p-5 pt-2 text-xs sm:text-sm text-[${archetype.colors.textSecondary}] leading-relaxed border-t border-slate-800/60">
        ${f.a}
      </div>
    </div>
  `).join('\n');

  const faqAccordionCode = `---
---
<section class="py-12 pb-24 px-4 sm:px-6 max-w-3xl mx-auto css-scroll-reveal">
  <div class="text-center mb-8">
    <span class="text-xs font-bold text-[${archetype.colors.accentPrimary}] uppercase tracking-widest">Resolución de Dudas</span>
    <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-1">Preguntas Frecuentes</h2>
  </div>
  <div class="space-y-3">
    ${faqItemsHtml}
  </div>
  <script is:inline>
    window.toggleFaq = function(idx) {
      const el = document.getElementById('faq-answer-' + idx);
      const icon = document.getElementById('faq-icon-' + idx);
      if (el) {
        const isHidden = el.classList.contains('hidden');
        el.classList.toggle('hidden');
        if (icon) icon.innerText = isHidden ? '−' : '+';
      }
    };
  </script>
</section>`;
  fs.writeFileSync(path.join(componentsDir, 'FaqAccordion.astro'), faqAccordionCode, 'utf8');

  // 7d. StickyMobileCTA.astro (Barra flotante inferior para conversión móvil)
  const stickyMobileCode = `---
interface Props {
  price: number;
  checkoutUrl: string;
}
const { price, checkoutUrl } = Astro.props;
---
<div class="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 px-4 flex items-center justify-between shadow-2xl">
  <div>
    <div class="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">Acceso + 4 Bonos + App</div>
    <div class="text-lg font-extrabold text-white">Solo \\\${price} USD <span class="text-xs text-slate-400 line-through font-normal">$${totalValue}</span></div>
  </div>
  <a href={checkoutUrl} class="checkout-btn px-5 py-3 rounded-xl bg-gradient-to-r from-[${archetype.colors.accentGradientFrom}] to-[${archetype.colors.accentGradientTo}] text-slate-950 font-extrabold text-xs shadow-lg">
    Acceder Ahora →
  </a>
</div>`;
  fs.writeFileSync(path.join(componentsDir, 'StickyMobileCTA.astro'), stickyMobileCode, 'utf8');

  const heroKicker = parsedCopy.kicker || (offerData?.reengineeredOffer?.web_config?.top_banner) || '⚡ Salida Acelerada de Deudas & Blindaje de Sueldo';
  const heroHeadline = parsedCopy.h1 || promise;
  const heroSubheadline = parsedCopy.subheadline || `El sistema operativo paso a paso impulsado por la ${uniqueMech} para erradicar ${painLower} sin teoría de relleno, con plantillas listas y App Móvil de acompañamiento.`;

  // 8. index.astro ensamblado con arquitectura Bento Grid Asimétrica de Alta Conversión
  const indexPageCode = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import HeroSection from '../components/HeroSection.astro';
import PainPoints from '../components/PainPoints.astro';
import QuickWins from '../components/QuickWins.astro';
import SpecialSection from '../components/SpecialSection.astro';
import UniqueMechanism from '../components/UniqueMechanism.astro';
import TargetAudience from '../components/TargetAudience.astro';
import SolutionShowcase from '../components/SolutionShowcase.astro';
import SocialProof from '../components/SocialProof.astro';
import BonusStack from '../components/BonusStack.astro';
import PricingOffer from '../components/PricingOffer.astro';
import CreatorBio from '../components/CreatorBio.astro';
import FaqAccordion from '../components/FaqAccordion.astro';
import StickyMobileCTA from '../components/StickyMobileCTA.astro';

const checkoutUrl = "/checkout";
---
<BaseLayout 
  title="${productName.replace(/"/g, '\\"')} | Salida Acelerada de Deudas y Blindaje de Sueldo"
  description="${heroHeadline.replace(/"/g, '\\"')}. ${heroSubheadline.replace(/"/g, '\\"')}">
  <main class="min-h-screen">
    <HeroSection 
      kicker="${heroKicker.replace(/"/g, '\\"')}"
      headline="${heroHeadline.replace(/"/g, '\\"')}"
      subheadline="${heroSubheadline.replace(/"/g, '\\"')}"
      ctaText="Quiero Acceder al Sistema Hoy por $${price} USD"
      checkoutUrl={checkoutUrl}
    />

    <!-- Modern Asymmetric Bento Grid Showcase -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 my-10 pb-24">
      
      <!-- Bento Row 1: Diagnóstico Visceral de Dolor (7 cols) + Simulador/Calculadora Interactivo (5 cols) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div class="lg:col-span-7 flex flex-col justify-stretch">
          <PainPoints />
        </div>
        <div class="lg:col-span-5 flex flex-col justify-stretch">
          <SpecialSection />
        </div>
      </div>

      <!-- Bento Row 2: Victorias Rápidas (Timeline Horizontal) -->
      <div class="w-full">
        <QuickWins />
      </div>

      <!-- Bento Row 3: Mecanismo Único (7 cols) + Radiografía por Dentro de la App Móvil (5 cols) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div class="lg:col-span-7 flex flex-col justify-stretch">
          <UniqueMechanism />
        </div>
        <div class="lg:col-span-5 flex flex-col justify-stretch">
          <SolutionShowcase />
        </div>
      </div>

      <!-- Bento Row 4: Filtro de Calificación (6 cols) + Casos de Estudio Verificados (6 cols) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div class="lg:col-span-6 flex flex-col justify-stretch">
          <TargetAudience />
        </div>
        <div class="lg:col-span-6 flex flex-col justify-stretch">
          <SocialProof />
        </div>
      </div>

      <!-- Bento Row 5: Bóveda de Bonos de Regalo -->
      <div class="w-full">
        <BonusStack />
      </div>

      <!-- Bento Row 6: Pasarela de Pago, Selector Stripe & Mercado Pago y Garantía de 30 Días -->
      <div class="max-w-3xl mx-auto w-full">
        <PricingOffer price={${price}} totalValue={${totalValue}} checkoutUrl={checkoutUrl} />
      </div>

      <!-- Bento Row 7: Respaldo Metodológico + Preguntas Frecuentes -->
      <div class="max-w-3xl mx-auto w-full space-y-6">
        <CreatorBio />
        <FaqAccordion />
      </div>

    </div>

    <StickyMobileCTA price={${price}} checkoutUrl={checkoutUrl} />
  </main>
</BaseLayout>`;
  fs.writeFileSync(path.join(pagesDir, 'index.astro'), indexPageCode, 'utf8');

  // 9. quiz.astro personalizado con preguntas del arquetipo
  const quizStepsHtml = archetype.quizQuestions.map((q, i) => `
      <!-- Question ${i + 1} -->
      <div id="${q.id}" class="quiz-step ${i > 0 ? 'hidden' : ''}">
        <h2 class="text-lg sm:text-xl font-bold text-white mb-6">
          ${q.title}
        </h2>
        <div class="space-y-3">
          ${q.options.map(opt => `
          <button type="button" onclick="selectAnswer(${i + 1}, ${opt.score})" class="quiz-opt w-full text-left p-4 rounded-xl bg-slate-800/60 hover:bg-[${archetype.colors.accentPrimary}]/20 hover:border-[${archetype.colors.accentPrimary}]/60 border border-slate-700/60 transition duration-150 text-slate-200">
            ${opt.text}
          </button>`).join('')}
        </div>
      </div>`).join('\n');

  const quizPageCode = `---
import BaseLayout from '../layouts/BaseLayout.astro';

const checkoutUrl = "/checkout";
---
<BaseLayout 
  title="Test de Diagnóstico en 60 Segundos | ${productName}"
  description="Descubre tu diagnóstico personalizado para ${nicheName}.">
  
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto flex flex-col justify-center">
    <!-- Header -->
    <div class="text-center mb-8">
      <span class="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[${archetype.colors.accentPrimary}] bg-[${archetype.colors.accentPrimary}]/10 border border-[${archetype.colors.accentPrimary}]/30 rounded-full mb-3">
        ${archetype.badge} · Evaluación de 60 Segundos
      </span>
      <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
        Diagnóstico Personalizado de ${nicheName}
      </h1>
      <p class="mt-2 text-slate-400 text-sm sm:text-base">
        Responde estas 5 preguntas para identificar la causa raíz de tu situación y tu plan de choque recomendado.
      </p>

      <!-- Progress bar -->
      <div class="w-full bg-slate-800 h-2 rounded-full mt-6 overflow-hidden">
        <div id="progress-bar" class="bg-gradient-to-r from-[${archetype.colors.accentGradientFrom}] to-[${archetype.colors.accentGradientTo}] h-2 transition-all duration-300 w-1/5"></div>
      </div>
      <p id="step-counter" class="text-xs text-slate-500 mt-2 font-medium">Pregunta 1 de 5</p>
    </div>

    <!-- Quiz Card Container -->
    <div class="bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm relative">
      ${quizStepsHtml}

      <!-- Lead Capture Step -->
      <div id="lead-step" class="quiz-step hidden">
        <span class="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/50 rounded-full mb-3">
          ¡Evaluación Completa!
        </span>
        <h2 class="text-xl sm:text-2xl font-bold text-white mb-2">
          Ingresa tus datos para calcular tu reporte personalizado
        </h2>
        <p class="text-slate-400 text-sm mb-6">
          Te enviaremos el desglose de tu puntuación y las recomendaciones específicas del ${productName}.
        </p>

        <form id="lead-form" onsubmit="submitQuiz(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Tu Nombre</label>
            <input type="text" id="lead-name" required placeholder="Ej: Daniel" class="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[${archetype.colors.accentPrimary}] transition" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Tu Correo Principal</label>
            <input type="email" id="lead-email" required placeholder="tu@correo.com" class="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[${archetype.colors.accentPrimary}] transition" />
          </div>
          <button type="submit" class="w-full py-4 rounded-xl bg-gradient-to-r from-[${archetype.colors.accentGradientFrom}] to-[${archetype.colors.accentGradientTo}] text-slate-950 font-extrabold text-base transition duration-200 shadow-lg shadow-[${archetype.colors.accentGlow}]">
            Ver Mi Diagnóstico y Protocolo Recomendado →
          </button>
        </form>
      </div>

      <!-- Result Screen -->
      <div id="result-screen" class="quiz-step hidden text-center">
        <span class="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-400 bg-rose-950/60 border border-rose-800/50 rounded-full mb-3">
          Diagnóstico Detectado: Nivel de Sobrecarga Crítica
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-4">
          Hola <span id="display-name" class="text-[${archetype.colors.accentPrimary}]"></span>, tu situación requiere intervención guiada
        </h2>
        <div class="text-left bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 mb-6 space-y-3 text-sm text-slate-300">
          <p>
            ❌ <strong>Por qué los métodos tradicionales fallaron:</strong> Estás atacando síntomas superficiales con ${commonEnemy} sin corregir la raíz operativa que provoca ${painLower}.
          </p>
          <p class="text-[${archetype.colors.accentPrimary}] font-semibold pt-2 border-t border-slate-700">
            ✓ <strong>Solución Inmediata Recomendada:</strong> Instalar la ${uniqueMech} en bloques tácticos de 15 minutos para recuperar el control desde tus primeras 48 horas.
          </p>
        </div>

        <a id="result-cta" href={checkoutUrl} class="checkout-btn inline-block w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[${archetype.colors.accentGradientFrom}] to-[${archetype.colors.accentGradientTo}] text-slate-950 font-extrabold text-lg transition duration-200 shadow-xl shadow-[${archetype.colors.accentGlow}]">
          Quiero Descargar el ${productName} ($${price} USD) →
        </a>
        <p class="text-xs text-slate-500 mt-3">
          Incluye los 4 Bonos de Implementación Inmediata · Garantía Incondicional de 30 Días
        </p>
      </div>
    </div>

    <div class="text-center mt-6">
      <a href="/" class="text-xs text-slate-500 hover:text-slate-300 underline transition">
        ← Volver a la página principal del embudo
      </a>
    </div>
  </div>

  <script is:inline>
    let currentStep = 1;
    let totalScore = 0;

    window.selectAnswer = function(questionNum, score) {
      totalScore += score;
      document.getElementById('q' + questionNum).classList.add('hidden');
      
      if (questionNum < 5) {
        currentStep = questionNum + 1;
        document.getElementById('q' + currentStep).classList.remove('hidden');
        document.getElementById('progress-bar').style.width = ((currentStep / 5) * 100) + '%';
        document.getElementById('step-counter').innerText = 'Pregunta ' + currentStep + ' de 5';
      } else {
        document.getElementById('lead-step').classList.remove('hidden');
        document.getElementById('progress-bar').style.width = '100%';
        document.getElementById('step-counter').innerText = 'Paso Final';
      }
    };

    window.submitQuiz = function(event) {
      event.preventDefault();
      const name = document.getElementById('lead-name').value;
      const email = document.getElementById('lead-email').value;

      document.getElementById('display-name').innerText = name;
      document.getElementById('lead-step').classList.add('hidden');
      document.getElementById('result-screen').classList.remove('hidden');

      // Preservar UTMs en el CTA del resultado
      const params = new URLSearchParams(window.location.search);
      const cta = document.getElementById('result-cta');
      if (params.toString() && cta) {
        const url = new URL(cta.href, window.location.origin);
        params.forEach((val, key) => url.searchParams.set(key, val));
        cta.href = url.toString();
      }

      // Enviar lead a la base de datos de FunnelMaster
      try {
        fetch('http://localhost:3004/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            score: totalScore,
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || ''
          })
        }).catch(() => {});
      } catch (e) {}
    };
  </script>
</BaseLayout>`;
  fs.writeFileSync(path.join(pagesDir, 'quiz.astro'), quizPageCode, 'utf8');

  // 10. checkout.astro con soporte para Order Bump y diseño del arquetipo
  const checkoutPageCode = `---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout 
  title="Finalizar Orden Segura | ${productName}"
  description="Página de pago seguro con cifrado SSL de 256 bits y garantía incondicional de 30 días.">
  
  <div class="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
    <!-- Header de Pago Seguro -->
    <div class="flex items-center justify-between border-b border-[${archetype.colors.borderCard}] pb-6 mb-8">
      <div class="flex items-center gap-3">
        <span class="text-2xl">🔒</span>
        <div>
          <h1 class="text-lg font-bold text-white">Pago Seguro Cifrado (SSL 256-bit)</h1>
          <p class="text-xs text-slate-400">Transacción protegida con estándar bancario internacional</p>
        </div>
      </div>
      <div class="hidden sm:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg">
        <span>🛡️ Garantía de 30 Días</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Columna Izquierda: Formulario de Pago Mockup -->
      <div class="lg:col-span-7 space-y-6">
        <div class="bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] rounded-2xl p-6 shadow-xl">
          <h2 class="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-[${archetype.colors.accentPrimary}] text-slate-950 text-xs flex items-center justify-center font-extrabold">1</span>
            Datos del Comprador
          </h2>
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase mb-1">Nombre Completo</label>
              <input type="text" id="cust-name" placeholder="Tu nombre y apellido" class="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[${archetype.colors.accentPrimary}] text-sm" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase mb-1">Correo Electrónico (para recibir accesos)</label>
              <input type="email" id="cust-email" placeholder="tu@correo.com" class="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[${archetype.colors.accentPrimary}] text-sm" />
            </div>
          </div>
        </div>

        <!-- Selector de Métodos de Pago (Stripe & Mercado Pago) -->
        <div class="bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] rounded-2xl p-6 shadow-xl space-y-4">
          <h2 class="text-base font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-[${archetype.colors.accentPrimary}] text-slate-950 text-xs flex items-center justify-center font-extrabold">2</span>
            Método de Pago Seguro
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label class="cursor-pointer border-2 border-[${archetype.colors.accentPrimary}] bg-[${archetype.colors.accentPrimary}]/10 rounded-xl p-4 flex flex-col justify-between transition hover:border-[${archetype.colors.accentPrimary}]" id="opt-stripe" onclick="selectGateway('stripe')">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-extrabold uppercase text-white flex items-center gap-2">
                  <input type="radio" name="payment-method" value="stripe" checked class="text-[${archetype.colors.accentPrimary}]" />
                  Stripe (Global)
                </span>
                <span class="text-lg">💳</span>
              </div>
              <p class="text-[11px] text-slate-400">Tarjetas de Crédito y Débito Internacionales (Visa, Mastercard, AMEX).</p>
            </label>

            <label class="cursor-pointer border border-slate-700 bg-slate-800/40 rounded-xl p-4 flex flex-col justify-between transition hover:border-[${archetype.colors.accentPrimary}]" id="opt-mercadopago" onclick="selectGateway('mercadopago')">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-extrabold uppercase text-white flex items-center gap-2">
                  <input type="radio" name="payment-method" value="mercadopago" class="text-[${archetype.colors.accentPrimary}]" />
                  Mercado Pago (LATAM)
                </span>
                <span class="text-lg">🟢</span>
              </div>
              <p class="text-[11px] text-slate-400">Tarjetas locales, Débito, Efectivo (OXXO/PagoFácil) y Transferencias.</p>
            </label>
          </div>
        </div>

        <!-- Order Bump -->
        <div class="bg-amber-950/20 border-2 border-dashed border-amber-500/60 rounded-2xl p-5 relative overflow-hidden">
          <div class="flex items-start gap-3">
            <input type="checkbox" id="order-bump-checkbox" onchange="toggleOrderBump(this)" class="mt-1 h-5 w-5 rounded border-amber-400 text-amber-500 focus:ring-amber-400 cursor-pointer" />
            <div class="text-sm">
              <label for="order-bump-checkbox" class="font-extrabold text-amber-300 cursor-pointer block mb-1">
                ⚡ ¡SÍ! Agregar Pack SOS de Implementación Acelerada por solo $17 USD (Descuento 60%)
              </label>
              <p class="text-xs text-slate-300 leading-relaxed">
                Incluye checklist imprimible de emergencia en 3 minutos y guía de bolsillo. Solo disponible en este paso.
              </p>
            </div>
          </div>
        </div>

        <!-- Botón de Pago -->
        <button type="button" onclick="completeOrder()" class="w-full py-4 rounded-xl bg-gradient-to-r from-[${archetype.colors.accentGradientFrom}] to-[${archetype.colors.accentGradientTo}] hover:opacity-90 text-slate-950 font-extrabold text-lg transition duration-200 shadow-xl shadow-[${archetype.colors.accentGlow}] flex items-center justify-center gap-2">
          <span>PAGAR DE FORMA SEGURA <span id="btn-total">$37 USD</span> →</span>
        </button>

        <!-- Modal de Conexión de Pasarela (Guía Asistida) -->
        <div id="payment-modal" class="hidden fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div class="bg-[#111827] border border-[#1E293B] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <span>⚙️</span> Conectar Pasarela de Pagos Real
              </h3>
              <button onclick="closeModal()" class="text-slate-400 hover:text-white text-lg">✕</button>
            </div>

            <p class="text-xs text-slate-300 leading-relaxed">
              Tu embudo está listo para recibir pagos reales. Para conectar tu cuenta de <strong>Stripe</strong> o <strong>Mercado Pago</strong> en 2 minutos:
            </p>

            <div class="space-y-2 text-xs">
              <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span class="font-bold text-white block mb-0.5">Opción A: Stripe Payment Link</span>
                <span class="text-slate-400">1. Entra a tu dashboard de Stripe > Productos > Payment Links.<br>2. Crea un enlace por $37 USD y pégalo en tu archivo <code>.env</code> como:</span>
                <code class="block mt-1 text-[11px] text-emerald-400 font-mono bg-slate-950 p-1.5 rounded">STRIPE_PAYMENT_LINK="https://buy.stripe.com/..."</code>
              </div>

              <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span class="font-bold text-white block mb-0.5">Opción B: Mercado Pago Link de Cobro</span>
                <span class="text-slate-400">1. En tu app de Mercado Pago, crea un link de cobro por el monto.<br>2. Pégalo en tu <code>.env</code> como:</span>
                <code class="block mt-1 text-[11px] text-cyan-400 font-mono bg-slate-950 p-1.5 rounded">MP_CHECKOUT_URL="https://mpago.la/..."</code>
              </div>
            </div>

            <div class="pt-2 flex flex-col sm:flex-row gap-2">
              <button onclick="simulateSuccessOrder()" class="flex-1 py-2.5 rounded-xl bg-[${archetype.colors.accentPrimary}] text-slate-950 font-bold text-xs">
                Probar Compra en Modo Sandbox →
              </button>
              <button onclick="closeModal()" class="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna Derecha: Resumen de Orden con Stack de Valor Completo -->
      <div class="lg:col-span-5 space-y-6">
        <div class="bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] rounded-2xl p-6 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-bold text-white uppercase tracking-wider">Resumen de tu Acceso</h2>
            <span class="text-[11px] font-extrabold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800/50">Ahorras ${discountPct}%</span>
          </div>
          
          <div class="space-y-2.5 border-b border-slate-700/60 pb-4 text-xs sm:text-sm">
            <div class="flex justify-between text-slate-200 font-semibold">
              <span>📘 ${productName} (Manual Maestro)</span>
              <span class="text-slate-400 line-through">$97 USD</span>
            </div>
            <div class="flex justify-between text-emerald-400 font-semibold">
              <span>📱 ${appShowcaseTitle.replace(/^2\.\s*/, '')}</span>
              <span>GRATIS</span>
            </div>
            ${bonuses.map((b, idx) => `
            <div class="flex justify-between text-slate-300">
              <span>🎁 Bono #${idx + 1}: ${b.title || b.name}</span>
              <span class="text-slate-400 line-through">$${b.perceivedValue || 29} USD</span>
            </div>`).join('')}
            <div class="flex justify-between text-slate-400 pt-2 border-t border-slate-800 text-xs">
              <span>Valor Real Acumulado:</span>
              <span class="line-through text-rose-400 font-bold">$${totalValue} USD</span>
            </div>
            <div id="order-bump-row" class="hidden flex justify-between text-amber-300 pt-1 font-bold">
              <span>⚡ Order Bump: Pack SOS Acelerador</span>
              <span>+$17 USD</span>
            </div>
          </div>

          <div class="pt-4 flex justify-between items-center text-base font-bold text-white">
            <span>Total Único Hoy:</span>
            <span id="final-total" class="text-2xl text-[${archetype.colors.accentPrimary}] font-extrabold">$37 USD</span>
          </div>

          <div class="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-300 space-y-2">
            <p class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Cifrado bancario SSL 256 bits verificado</p>
            <p class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Garantía Incondicional de 30 Días (Riesgo Cero)</p>
            <p class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Desbloqueo instantáneo de App + 5 PDFs Imprimibles</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script is:inline>
    const currentUtmParams = window.location.search;
    let hasOrderBump = false;
    let selectedGateway = 'stripe';

    window.selectGateway = function(gateway) {
      selectedGateway = gateway;
      const optStripe = document.getElementById('opt-stripe');
      const optMp = document.getElementById('opt-mercadopago');
      if (gateway === 'stripe') {
        optStripe.classList.add('border-2', 'border-[${archetype.colors.accentPrimary}]', 'bg-[${archetype.colors.accentPrimary}]/10');
        optStripe.classList.remove('border-slate-700', 'bg-slate-800/40');
        optMp.classList.remove('border-2', 'border-[${archetype.colors.accentPrimary}]', 'bg-[${archetype.colors.accentPrimary}]/10');
        optMp.classList.add('border-slate-700', 'bg-slate-800/40');
      } else {
        optMp.classList.add('border-2', 'border-[${archetype.colors.accentPrimary}]', 'bg-[${archetype.colors.accentPrimary}]/10');
        optMp.classList.remove('border-slate-700', 'bg-slate-800/40');
        optStripe.classList.remove('border-2', 'border-[${archetype.colors.accentPrimary}]', 'bg-[${archetype.colors.accentPrimary}]/10');
        optStripe.classList.add('border-slate-700', 'bg-slate-800/40');
      }
    };

    window.toggleOrderBump = function(checkbox) {
      hasOrderBump = checkbox.checked;
      const bumpRow = document.getElementById('order-bump-row');
      const finalTotal = document.getElementById('final-total');
      const btnTotal = document.getElementById('btn-total');

      if (hasOrderBump) {
        bumpRow.classList.remove('hidden');
        finalTotal.innerText = '$54 USD';
        btnTotal.innerText = '$54 USD';
      } else {
        bumpRow.classList.add('hidden');
        finalTotal.innerText = '$37 USD';
        btnTotal.innerText = '$37 USD';
      }
    };

    window.closeModal = function() {
      const modal = document.getElementById('payment-modal');
      if (modal) modal.classList.add('hidden');
    };

    window.completeOrder = function() {
      const name = document.getElementById('cust-name').value || 'Cliente';
      const email = document.getElementById('cust-email').value || '';
      const total = hasOrderBump ? 54 : 37;

      // Si existen variables de pasarela configuradas en window o entorno
      const stripeUrl = window.STRIPE_PAYMENT_LINK;
      const mpUrl = window.MP_CHECKOUT_URL;

      if (selectedGateway === 'stripe' && stripeUrl) {
        window.location.href = stripeUrl + (hasOrderBump ? '?bump=true' : '');
        return;
      }
      if (selectedGateway === 'mercadopago' && mpUrl) {
        window.location.href = mpUrl;
        return;
      }

      // Si no están configuradas aún, mostrar el modal de guía asistida
      const modal = document.getElementById('payment-modal');
      if (modal) {
        modal.classList.remove('hidden');
      } else {
        simulateSuccessOrder();
      }
    };

    window.simulateSuccessOrder = function() {
      const name = document.getElementById('cust-name').value || 'Cliente Demo';
      const email = document.getElementById('cust-email').value || 'cliente@demo.com';
      const total = hasOrderBump ? 54 : 37;

      // Registrar lead comprador en backend si está disponible
      fetch('http://localhost:3004/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          score: 100,
          utm_source: 'checkout_direct',
          utm_medium: selectedGateway,
          utm_campaign: hasOrderBump ? 'order_bump_included' : 'standard_order'
        })
      }).catch(() => {});

      alert('¡Pago Confirmado por $' + total + ' USD (' + selectedGateway.toUpperCase() + ')!\\n\\nCliente: ' + name + '\\nTus accesos digitales inmediatos y la App Móvil han sido desbloqueados.');
      closeModal();
      window.location.href = '/app/';
    };
  </script>
</BaseLayout>`;
  fs.writeFileSync(path.join(pagesDir, 'checkout.astro'), checkoutPageCode, 'utf8');

  // 11. dashboard.astro con panel de leads y simulador ROAS
  const dashPageCode = `---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout 
  title="Panel de Control & ROAS | FunnelMaster"
  description="Dashboard ejecutivo con métricas de conversión, base de leads capturados y simulador dinámico de ROAS.">
  
  <div class="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[${archetype.colors.borderCard}] gap-4">
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-[${archetype.colors.accentPrimary}]">${productName}</span>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Panel de Control & Métricas de Conversión</h1>
      </div>
      <div class="flex items-center gap-3">
        <a href="/api/leads.csv" download class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-2">
          📥 Descargar leads.csv
        </a>
        <a href="/" class="px-4 py-2 rounded-xl bg-[${archetype.colors.accentPrimary}] text-slate-950 text-xs font-extrabold">
          Ver Landing →
        </a>
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
      <div class="bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] p-5 rounded-2xl">
        <span class="text-xs text-slate-400 uppercase font-semibold">Leads Totales</span>
        <div id="kpi-leads" class="text-3xl font-extrabold text-white mt-1">0</div>
      </div>
      <div class="bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] p-5 rounded-2xl">
        <span class="text-xs text-slate-400 uppercase font-semibold">Precio Frontend</span>
        <div class="text-3xl font-extrabold text-[${archetype.colors.accentPrimary}] mt-1">$37 USD</div>
      </div>
      <div class="bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] p-5 rounded-2xl">
        <span class="text-xs text-slate-400 uppercase font-semibold">Order Bump</span>
        <div class="text-3xl font-extrabold text-amber-400 mt-1">+$17 USD</div>
      </div>
      <div class="bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] p-5 rounded-2xl">
        <span class="text-xs text-slate-400 uppercase font-semibold">AOV Estimado</span>
        <div id="kpi-aov" class="text-3xl font-extrabold text-cyan-400 mt-1">$58.40</div>
      </div>
    </div>

    <!-- Simulador Dinámico de ROAS -->
    <div class="bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
      <h2 class="text-lg font-bold text-white mb-6">Simulador Interactivo de Unit Economics & ROAS</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase mb-2">Presupuesto AdSpend ($USD)</label>
          <input type="number" id="input-adspend" value="1000" oninput="recalcSimulator()" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase mb-2">Precio Frontend ($USD)</label>
          <input type="number" id="input-price" value="37" oninput="recalcSimulator()" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase mb-2">Order Bump ($USD)</label>
          <input type="number" id="input-bump" value="17" oninput="recalcSimulator()" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase mb-2">Costo por Clic ($CPC USD)</label>
          <input type="number" step="0.05" id="input-cpc" value="0.35" oninput="recalcSimulator()" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
        <div class="bg-slate-800/50 p-4 rounded-xl">
          <span class="text-xs text-slate-400 uppercase">Facturación Estimada</span>
          <div id="sim-revenue" class="text-2xl font-extrabold text-emerald-400 mt-1">$4,166 USD</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-xl">
          <span class="text-xs text-slate-400 uppercase">Beneficio Neto</span>
          <div id="sim-profit" class="text-2xl font-extrabold text-white mt-1">+$3,166 USD</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-xl">
          <span class="text-xs text-slate-400 uppercase">ROAS Estimado</span>
          <div id="sim-roas" class="text-2xl font-extrabold text-emerald-300 mt-1">4.17x</div>
        </div>
      </div>
    </div>

    <!-- Tabla de Leads en Tiempo Real -->
    <div class="bg-[${archetype.colors.bgCard}] border border-[${archetype.colors.borderCard}] rounded-2xl p-6 shadow-xl">
      <h2 class="text-base font-bold text-white uppercase tracking-wider mb-4">Leads Capturados en el Embudo</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-300">
          <thead class="text-xs text-slate-400 uppercase bg-slate-800/60 border-b border-slate-700">
            <tr>
              <th class="py-3 px-4">Nombre</th>
              <th class="py-3 px-4">Email</th>
              <th class="py-3 px-4">Score</th>
              <th class="py-3 px-4">UTM Source</th>
              <th class="py-3 px-4">Fecha</th>
            </tr>
          </thead>
          <tbody id="leads-tbody" class="divide-y divide-slate-800">
            <tr>
              <td colspan="5" class="py-6 text-center text-slate-500 text-xs">
                Aún no hay leads registrados. Completa el Quiz en <a href="/quiz" class="text-[${archetype.colors.accentPrimary}] underline">/quiz</a> para ver registros en vivo.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <script is:inline>
    window.recalcSimulator = function() {
      const spend = parseFloat(document.getElementById('input-adspend').value) || 1000;
      const price = parseFloat(document.getElementById('input-price').value) || 37;
      const bump = parseFloat(document.getElementById('input-bump').value) || 17;
      const cpc = parseFloat(document.getElementById('input-cpc').value) || 0.35;

      const clicks = spend / cpc;
      const convRate = 0.025; // 2.5%
      const orders = clicks * convRate;
      const aov = price + (bump * 0.38) + (67 * 0.22); // AOV con bump y upsell
      const revenue = orders * aov;
      const profit = revenue - spend;
      const roas = spend > 0 ? (revenue / spend).toFixed(2) : 0;

      document.getElementById('sim-revenue').innerText = '$' + Math.round(revenue).toLocaleString() + ' USD';
      document.getElementById('sim-profit').innerText = (profit >= 0 ? '+' : '') + '$' + Math.round(profit).toLocaleString() + ' USD';
      document.getElementById('sim-roas').innerText = roas + 'x';
    };

    // Cargar leads desde API si está disponible
    fetch('http://localhost:3004/api/leads')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          document.getElementById('kpi-leads').innerText = data.length;
          const tbody = document.getElementById('leads-tbody');
          tbody.innerHTML = data.map(lead => \`
            <tr class="hover:bg-slate-800/40">
              <td class="py-3 px-4 font-semibold text-white">\${lead.first_name || 'Anónimo'}</td>
              <td class="py-3 px-4 text-slate-300">\${lead.email}</td>
              <td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-xs font-bold">\${lead.metadata?.quizScore || '-'} pts</span></td>
              <td class="py-3 px-4 text-xs text-slate-400">\${lead.metadata?.utm_source || 'direct'}</td>
              <td class="py-3 px-4 text-xs text-slate-500">\${lead.created_at ? lead.created_at.slice(0,10) : 'Hoy'}</td>
            </tr>
          \`).join('');
        }
      })
      .catch(() => {});
  </script>
</BaseLayout>`;
  fs.writeFileSync(path.join(pagesDir, 'dashboard.astro'), dashPageCode, 'utf8');

  // Registrar en automation_logs
  logAutomation('landing-builder', 'build_funnel', 'success', {
    slug: targetSlug,
    funnelDir,
    archetype: archetype.name,
    framework: 'Astro + Tailwind',
    checkoutUrl: '/checkout',
    utmPreservationEnabled: true
  });

  console.log(`[landing-builder] Clean customized landing structure built successfully at /funnel (Archetype: ${archetype.name})`);
  return {
    funnelDir,
    archetype: archetype.name,
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
