/**
 * generate-app.js — Generador de Aplicaciones Móviles Interactivas con Google Material Design 3 (Material You).
 * Crea una Mobile WebApp / PWA en /app/ y compila en /app/dist/ con almacenamiento local,
 * Material Symbols Rounded, tokens M3 (--md-sys-color-*), M3 Navigation Bar con píldora activa,
 * M3 Extended FAB, efecto Material Ripple y genera el Super Prompt M3 para constructores de IA.
 */

const fs = require('fs');
const path = require('path');
const { logAutomation } = require('../../../../scripts/db');
const { getArchetypeForNiche } = require('../../landing-builder/scripts/archetypes');

function loadActiveData() {
  const offerJsonPath = path.join(__dirname, '..', '..', '..', '..', 'data', 'active_offer.json');
  if (fs.existsSync(offerJsonPath)) {
    return JSON.parse(fs.readFileSync(offerJsonPath, 'utf8'));
  }
  return null;
}

function generateAppSuperPrompt(offer, niche, archetype) {
  const productName = offer?.product_name || 'App Móvil de Acompañamiento';
  const mechanism = offer?.unique_mechanism || 'Arquitectura de Ejecución Guiada™';
  const promise = offer?.main_promise || 'Resultados medibles desde las primeras 48 horas';
  const pain = niche?.core_pain || offer?.core_pain || 'fricción operativa y sobrecarga';
  const rawPhases = (Array.isArray(offer?.phases) && offer.phases.length >= 3)
    ? offer.phases
    : (Array.isArray(offer?.reengineeredOffer?.value_stack?.phases) && offer.reengineeredOffer.value_stack.phases.length >= 3)
    ? offer.reengineeredOffer.value_stack.phases
    : null;
  const phases = rawPhases
    ? rawPhases.map(p => ({
        phase: p.phase || p.timeframe || `Fase ${p.step || 1}`,
        title: p.title || p.name || 'Fase del Método',
        description: p.description || p.desc || 'Aplica las herramientas de esta fase.',
        deliverable: p.deliverable || 'Entregable Práctico'
      }))
    : [
        { phase: 'Fase 1 · Primeras 48 Horas', title: 'Auditoría de Fricción y Desbloqueo Rápido', deliverable: 'Mapa de Diagnóstico Operativo' },
        { phase: 'Fase 2 · Días 3 al 7', title: `Instalación del ${mechanism}`, deliverable: 'Plantillas de Ejecución Guiada' },
        { phase: 'Fase 3 · Consolidación Permanente', title: 'Automatización de Flujo y Blindaje', deliverable: 'Tablero de Mantenimiento' }
      ];
  const colors = archetype?.colors || {
    bgMain: '#0B0F19',
    bgCard: '#131B2E',
    borderCard: '#24304D',
    accentPrimary: '#10B981',
    accentGradientFrom: '#10B981',
    accentGradientTo: '#059669',
    textPrimary: '#F8FAFC'
  };

  return `# Super Prompt de Especificación para Aplicación Móvil — Google Material Design 3 (Material You)
### Generado para: ${productName}
**Target AI Tools**: v0.dev, Lovable.dev, Bolt.new, Cursor AI, Flutter / Expo / React Native Paper (M3)

---

## 🎯 Instrucciones de Rol y Contexto para la IA de Código

Actúa como un **Principal Mobile Architect & Google Material Design 3 (Material You) Specialist** con experiencia diseñando aplicaciones premiadas en Google Play (estilo Google Fit, Duolingo, Endel y Todoist M3).

Debes construir la aplicación móvil completa de acompañamiento interactivo (PWA / Mobile App) para el sistema **"${productName}"**.
La aplicación tiene como objetivo erradicar **"${pain}"** y garantizar el cumplimiento de **"${promise}"** utilizando el **"${mechanism}"**.

---

## 🎨 Sistema de Diseño Oficial: Google Material Design 3 (M3 / Material You)

1. **Tokens de Color y Superficies Tonales M3 (\`--md-sys-color-*\`)**:
   - \`--md-sys-color-surface\`: \`${colors.bgMain}\` (Superficie base OLED Dark)
   - \`--md-sys-color-surface-container-low\`: \`#0F1626\`
   - \`--md-sys-color-surface-container\`: \`${colors.bgCard}\` (Tarjetas M3 Filled / Elevated)
   - \`--md-sys-color-surface-container-high\`: \`#1C2742\`
   - \`--md-sys-color-primary\`: \`${colors.accentPrimary}\`
   - \`--md-sys-color-on-primary\`: \`#052E16\`
   - \`--md-sys-color-secondary-container\`: \`${colors.accentPrimary}29\` (Píldora activa de navegación M3 y chips seleccionados)
   - \`--md-sys-color-on-secondary-container\`: \`${colors.accentPrimary}\`
   - \`--md-sys-color-outline-variant\`: \`${colors.borderCard}\`
2. **Iconografía Oficial de Google**:
   - Utiliza exclusivamente **Material Symbols Rounded** (\`https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200\`).
   - En estado inactivo usa \`'FILL' 0, 'wght' 400\`; en estado activo usa \`'FILL' 1, 'wght' 600\`.
3. **Geometría y Componentes M3**:
   - **M3 Top App Bar**: Barra superior con elevación tonal al hacer scroll, chip tonal de racha (\`local_fire_department\`) e insignia PRO.
   - **M3 Cards**: Bordes redondeados \`24px\` (\`rounded-[24px]\`) y \`28px\` (\`rounded-[28px]\`) con elevación tonal M3.
   - **M3 Extended FAB**: Botón flotante de acción principal con radio \`16px\`, icono \`play_arrow\` / \`pause\` y efecto **Material Ripple**.
   - **M3 Navigation Bar**: Barra inferior de \`80px\` con 5 destinos y **píldora indicadora activa de \`64px × 32px\`** (\`rounded-full\`).
   - **M3 Snackbar**: Notificaciones flotantes inferiores con bordes redondeados y elevación nivel 3.

---

## 📱 Arquitectura de 5 Pantallas M3 (Bottom Navigation Bar)

### Destino 1: "Hoy" (\`icon: today\` o icono temático) — Dashboard de Acción y Avance
1. **Tarjeta M3 Filled de Cumplimiento**: Muestra porcentaje diario con **M3 Linear Progress Indicator** de \`8px\` de alto y bordes redondeados.
2. **Acción Rápida Guiada / Temporizador del Método**: Disparador táctico interactivo con display tipográfico Display Medium + **M3 Extended FAB** y persistencia en \`localStorage\`.
3. **Checklist M3 de Micro-Acciones del Método**: Tarjetas interactivas con casillas M3 (\`check_circle\`), efecto Material Ripple y guardado automático.

### Destino 2: "Herramienta Táctica" (\`icon: tune\` o icono temático) — Simulador / Calculadora del Mecanismo (\${mechanism})
1. **Controles Reactivos en Tiempo Real**: Sliders o selectores numéricos que permiten al usuario simular, calcular o auditar su caso particular frente a "\${pain}".
2. **Tablero de Resultados Inmediatos**: Tarjetas de resultados tangibles con contraste M3 y desglose numérico claro.
3. **Herramienta Rápida de Acción / Guion Copiable**: Atajo de ejecución con botón copiable en 1 toque.

### Destino 3: "Guías" (\`icon: menu_book\`) — Biblioteca de Fases y Bonos
1. **Acordeones M3 Outlined** sincronizados con las 3 fases reales del sistema:
   - *\${phases[0].phase}*: \${phases[0].title} (\${phases[0].deliverable})
   - *\${phases[1].phase}*: \${phases[1].title} (\${phases[1].deliverable})
   - *\${phases[2].phase}*: \${phases[2].title} (\${phases[2].deliverable})
2. **Acceso Rápido a los Bonos Tácticos** incluidos en la oferta.

### Destino 4: "Progreso" (\`icon: monitoring\` o icono temático) — Analítica e Insignias
1. **Gráfico de Evolución M3**: Barras tonales interactivas que reflejan el avance acumulado.
2. **Bóveda de Insignias M3**: Medallas con iconos Material Symbols (\`emoji_events\`, \`military_tech\`, \`workspace_premium\`).

### Destino 5: "Ajustes" (\`icon: settings\`) — Modo Nativo PWA
1. **Tarjeta M3 de Instalación Nativa**: Guía interactiva para añadir a pantalla de inicio en iOS y Android (\`install_mobile\`).
2. **Switches M3** de notificaciones y guardado local, más botón de reinicio seguro.

---

## 🚀 Prompt Listo para Copiar y Pegar en Lovable / v0 / Bolt

> *"Construye una aplicación móvil PWA completa utilizando estrictamente el sistema de diseño Google Material Design 3 (Material You) para '\${productName}'. Usa la fuente Google Material Symbols Rounded para todos los iconos, variables '--md-sys-color-*' con superficie oscura (\${colors.bgMain}) y color primario (\${colors.accentPrimary}), tarjetas M3 con radio de 24px/28px, efecto Material Ripple al tocar, M3 Extended FAB y una M3 Navigation Bar inferior de 80px con píldora indicadora activa (64x32px). Incluye las 5 pestañas funcionales: Hoy (panel interactivo con indicador de avance y checklist persistente en localStorage), Herramienta Táctica (simulador/calculadora reactivo con sliders del método '\${mechanism}'), Guías (acordeones de las 3 fases y bonos), Progreso (gráfico de evolución e insignias desbloqueables) y Ajustes (instalador PWA y switches M3)."*
`;
}

function buildMobileApp(offer, niche, archetype) {
  const productName = offer?.product_name || 'App Acompañante';
  const mechanism = offer?.unique_mechanism || 'Arquitectura de Ejecución Guiada™';
  const pain = niche?.core_pain || offer?.core_pain || 'dispersión y sobrecarga operativa';
  const rawPhases = (Array.isArray(offer?.phases) && offer.phases.length >= 3)
    ? offer.phases
    : (Array.isArray(offer?.reengineeredOffer?.value_stack?.phases) && offer.reengineeredOffer.value_stack.phases.length >= 3)
    ? offer.reengineeredOffer.value_stack.phases
    : null;
  const phases = rawPhases
    ? rawPhases.map(p => ({
        phase: p.phase || p.timeframe || `Fase ${p.step || 1}`,
        title: p.title || p.name || 'Fase del Método',
        description: p.description || p.desc || 'Aplica las herramientas de esta fase.',
        deliverable: p.deliverable || 'Entregable Práctico'
      }))
    : [
        {
          phase: 'Fase 1 · Primeras 48 Horas',
          title: 'Auditoría de Fricción y Desbloqueo Rápido',
          description: 'Identifica las fugas críticas que drenan tu energía y aplica el ajuste inicial en menos de 15 minutos.',
          deliverable: 'Mapa de Diagnóstico Operativo'
        },
        {
          phase: 'Fase 2 · Días 3 al 7',
          title: `Instalación Guiada del ${mechanism}`,
          description: 'Configura la secuencia paso a paso con plantillas listas para copiar y ejecutar sin fricción.',
          deliverable: 'Plantillas de Ejecución Guiada'
        },
        {
          phase: 'Fase 3 · Consolidación Permanente',
          title: 'Automatización de Flujo y Blindaje Anti-Recaídas',
          description: 'Convierte el nuevo estándar en tu rutina predeterminada con métricas semanales simples.',
          deliverable: 'Tablero de Mantenimiento Sostenible'
        }
      ];

  const colors = archetype?.colors || {
    bgMain: '#0B0F19',
    bgCard: '#131B2E',
    borderCard: '#24304D',
    accentPrimary: '#10B981',
    accentGradientFrom: '#10B981',
    accentGradientTo: '#059669',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8'
  };

  const appConfig = offer?.app_config || offer?.reengineeredOffer?.app_config || {};
  const isFinanceApp = appConfig?.tool_type === 'finance_vaults_and_debt_simulator' || archetype?.id === 'wealth_sovereignty';
  const headerIcon = appConfig?.header_icon || (isFinanceApp ? 'account_balance_wallet' : 'bolt');
  const headerBadge = appConfig?.header_badge || archetype?.badge || 'Centro de Control Móvil';

  const navTabs = {
    today: {
      label: appConfig?.tabs?.today?.label || (isFinanceApp ? 'Bóvedas' : 'Hoy'),
      icon: appConfig?.tabs?.today?.icon || (isFinanceApp ? 'account_balance_wallet' : 'today')
    },
    tools: {
      label: appConfig?.tabs?.tools?.label || (isFinanceApp ? 'Deudas' : 'Simulador'),
      icon: appConfig?.tabs?.tools?.icon || (isFinanceApp ? 'trending_down' : 'tune')
    },
    guides: {
      label: appConfig?.tabs?.guides?.label || (isFinanceApp ? 'Guías PDF' : 'Guías'),
      icon: appConfig?.tabs?.guides?.icon || 'menu_book'
    },
    progress: {
      label: appConfig?.tabs?.progress?.label || (isFinanceApp ? 'Liquidez' : 'Progreso'),
      icon: appConfig?.tabs?.progress?.icon || (isFinanceApp ? 'savings' : 'monitoring')
    },
    settings: {
      label: 'Ajustes',
      icon: 'settings'
    }
  };

  const progressTitle = appConfig?.progress_title || (isFinanceApp ? 'Evolución de Liquidez y Reducción de Deuda' : 'Evolución Semanal de Resultados');
  const progressDesc = appConfig?.progress_desc || (isFinanceApp ? 'Proyección de flujo libre recuperado al aplicar las 4 Bóvedas ABAI™:' : 'Mantén tu aplicación constante del método para desbloquear logros:');
  const milestones = Array.isArray(appConfig?.milestones) && appConfig.milestones.length >= 3
    ? appConfig.milestones
    : [
        { title: isFinanceApp ? 'Fugas Cortadas' : 'Fase 1 Lista', status: 'Activo', icon: 'emoji_events' },
        { title: isFinanceApp ? '4 Bóvedas' : 'Sistema Activo', status: 'Activo', icon: 'military_tech' },
        { title: isFinanceApp ? 'Deuda Cero' : 'Consolidado', status: 'En ruta', icon: 'workspace_premium' }
      ];

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${productName} · App Interactiva</title>
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="${colors.bgMain}">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --md-sys-color-surface: ${colors.bgMain};
      --md-sys-color-surface-container-low: #0F1626;
      --md-sys-color-surface-container: ${colors.bgCard};
      --md-sys-color-surface-container-high: #1B263F;
      --md-sys-color-primary: ${colors.accentPrimary};
      --md-sys-color-on-primary: #042619;
      --md-sys-color-secondary-container: ${colors.accentPrimary}26;
      --md-sys-color-on-secondary-container: ${colors.accentPrimary};
      --md-sys-color-outline-variant: ${colors.borderCard};
      --md-sys-motion-easing-emphasized: cubic-bezier(0.2, 0, 0, 1);
    }
    body {
      background-color: var(--md-sys-color-surface);
      color: ${colors.textPrimary};
      font-family: 'Plus Jakarta Sans', 'Roboto', sans-serif;
      -webkit-tap-highlight-color: transparent;
    }
    .material-symbols-rounded {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
      transition: font-variation-settings 0.25s var(--md-sys-motion-easing-emphasized);
    }
    .material-symbols-rounded.filled {
      font-variation-settings: 'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24;
    }
    .tab-content { display: none; }
    .tab-content.active {
      display: block;
      animation: m3FadeThrough 0.28s var(--md-sys-motion-easing-emphasized) both;
    }
    @keyframes m3FadeThrough {
      from { opacity: 0; transform: translateY(8px) scale(0.99); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    /* Google Material 3 Ripple & Elevation */
    .m3-card-elevated {
      background-color: var(--md-sys-color-surface-container);
      border-radius: 28px;
      border: 1px solid var(--md-sys-color-outline-variant);
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.45);
    }
    .m3-card-filled {
      background-color: var(--md-sys-color-surface-container-high);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .m3-card-outlined {
      background-color: var(--md-sys-color-surface-container-low);
      border-radius: 20px;
      border: 1px solid var(--md-sys-color-outline-variant);
    }
    .m3-ripple {
      position: relative;
      overflow: hidden;
      transition: transform 0.15s var(--md-sys-motion-easing-emphasized), background-color 0.2s ease;
    }
    .m3-ripple:active {
      transform: scale(0.97);
    }
    .m3-nav-pill {
      width: 64px;
      height: 32px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.25s var(--md-sys-motion-easing-emphasized), transform 0.25s var(--md-sys-motion-easing-emphasized);
    }
    .m3-nav-pill.active {
      background-color: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }
  </style>
</head>
<body class="antialiased min-h-screen flex flex-col justify-between max-w-md mx-auto border-x border-slate-800/80 shadow-2xl relative pb-28">

  <!-- Top App Bar -->
  <header class="px-4 py-3.5 bg-[#0F1626]/90 border-b border-slate-800/70 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between">
    <div class="flex items-center gap-3 min-w-0">
      <div class="w-10 h-10 rounded-2xl bg-[${colors.accentPrimary}]/15 border border-[${colors.accentPrimary}]/30 flex items-center justify-center text-[${colors.accentPrimary}] shrink-0">
        <span class="material-symbols-rounded filled text-[22px]">${headerIcon}</span>
      </div>
      <div class="min-w-0">
        <span class="text-[10px] font-bold uppercase tracking-widest text-[${colors.accentPrimary}] block">${headerBadge}</span>
        <h1 class="text-sm font-extrabold text-white truncate">${productName}</h1>
      </div>
    </div>
    <div class="flex items-center gap-2 shrink-0">
      <div id="streak-badge" class="text-xs font-extrabold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full flex items-center gap-1">
        <span class="material-symbols-rounded filled text-amber-400 text-[16px]">local_fire_department</span>
        <span id="streak-num">1</span>d
      </div>
      <div class="w-8 h-8 rounded-full bg-[${colors.accentPrimary}]/20 border border-[${colors.accentPrimary}]/40 flex items-center justify-center text-[${colors.accentPrimary}]" title="Acceso Activo">
        <span class="material-symbols-rounded filled text-[18px]">verified</span>
      </div>
    </div>
  </header>

  <!-- Contenedor Principal de Vistas -->
  <main class="flex-1 px-4 pt-5 space-y-5">

    <!-- ==================== PESTAÑA 1: PANEL PRINCIPAL DEL MÉTODO ==================== -->
    <div id="view-today" class="tab-content active space-y-5">
      ${isFinanceApp ? `
      <!-- Distribuidor Interactivo de Sueldo en 4 Bóvedas ABAI™ -->
      <div class="m3-card-elevated p-5 relative overflow-hidden">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-rounded filled text-[${colors.accentPrimary}] text-[20px]">account_balance_wallet</span>
            <span class="text-xs font-extrabold text-white uppercase tracking-wider">Mis 4 Bóvedas de Sueldo</span>
          </div>
          <span id="app-salary-label" class="text-sm font-extrabold text-emerald-400 bg-emerald-950 px-3 py-0.5 rounded-full border border-emerald-800/50">$1,600 USD</span>
        </div>
        <p class="text-xs text-slate-400 mb-3">Desliza tu ingreso mensual neto para calcular cuánto transferir a cada bóveda el día que cobras:</p>
        <input id="app-salary-slider" type="range" min="500" max="6000" step="100" value="1600" oninput="updateAppVaults()" class="w-full accent-[${colors.accentPrimary}] cursor-pointer mb-4" />

        <div class="grid grid-cols-2 gap-2.5 text-left">
          <div class="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">1. Bóveda Vital (50%)</span>
            <span id="app-v1" class="text-base font-extrabold text-white">$800 USD</span>
            <span class="text-[10px] text-slate-500 block">Vivienda, comida y fijos</span>
          </div>
          <div class="p-3 rounded-2xl bg-emerald-950/35 border border-emerald-500/40">
            <span class="text-[10px] font-bold uppercase text-emerald-400 block">2. Ataque ABAI™ (20%)</span>
            <span id="app-v2" class="text-base font-extrabold text-emerald-300">$320 USD</span>
            <span class="text-[10px] text-emerald-400/80 block">Liquida tarjeta más cara</span>
          </div>
          <div class="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30">
            <span class="text-[10px] font-bold uppercase text-amber-400 block">3. Paz Mental (15%)</span>
            <span id="app-v3" class="text-base font-extrabold text-amber-300">$240 USD</span>
            <span class="text-[10px] text-amber-400/80 block">Escudo anti-imprevistos</span>
          </div>
          <div class="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <span class="text-[10px] font-bold uppercase text-slate-300 block">4. Margen Libre (15%)</span>
            <span id="app-v4" class="text-base font-extrabold text-white">$240 USD</span>
            <span class="text-[10px] text-slate-500 block">Disfrute sin culpa</span>
          </div>
        </div>
      </div>

      <!-- Progreso de Blindaje Financiero -->
      <div class="m3-card-filled p-5 relative overflow-hidden">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-slate-200 uppercase tracking-wider">Checklist de Blindaje de Cobro</span>
          <span id="pct-label" class="text-sm font-extrabold text-[${colors.accentPrimary}] bg-[${colors.accentPrimary}]/15 px-2.5 py-0.5 rounded-full">0%</span>
        </div>
        <div class="w-full bg-slate-900/90 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div id="progress-bar" class="bg-gradient-to-r from-[${colors.accentGradientFrom}] to-[${colors.accentGradientTo}] h-full w-0 rounded-full transition-all duration-500"></div>
        </div>
        <div class="flex items-center justify-between mt-2 text-xs text-slate-400">
          <p id="progress-label">0 de 4 acciones completadas</p>
          <span class="text-[11px] text-emerald-400 font-semibold">Meta: Sueldo Blindado</span>
        </div>
      </div>

      <div class="space-y-2.5">
        <div onclick="toggleCheck(1)" class="m3-card-outlined m3-ripple p-4 flex items-center justify-between cursor-pointer">
          <div class="flex items-center gap-3.5 pr-2">
            <div id="box-1" class="w-6 h-6 rounded-lg border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-slate-950 shrink-0 transition-colors"></div>
            <div>
              <span class="text-sm font-semibold text-slate-100 block">1. Separar el ingreso en las 4 Bóvedas</span>
              <span class="text-[11px] text-slate-400">Transferir los porcentajes antes de pagar gastos variables</span>
            </div>
          </div>
          <span class="text-[11px] font-bold text-emerald-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">Día 1</span>
        </div>

        <div onclick="toggleCheck(2)" class="m3-card-outlined m3-ripple p-4 flex items-center justify-between cursor-pointer">
          <div class="flex items-center gap-3.5 pr-2">
            <div id="box-2" class="w-6 h-6 rounded-lg border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-slate-950 shrink-0 transition-colors"></div>
            <div>
              <span class="text-sm font-semibold text-slate-100 block">2. Auditar y dar de baja 3 fugas del resumen</span>
              <span class="text-[11px] text-slate-400">Cortar seguros duplicados, comisiones y suscripciones sin uso</span>
            </div>
          </div>
          <span class="text-[11px] font-bold text-amber-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">+$150 USD</span>
        </div>

        <div onclick="toggleCheck(3)" class="m3-card-outlined m3-ripple p-4 flex items-center justify-between cursor-pointer">
          <div class="flex items-center gap-3.5 pr-2">
            <div id="box-3" class="w-6 h-6 rounded-lg border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-slate-950 shrink-0 transition-colors"></div>
            <div>
              <span class="text-sm font-semibold text-slate-100 block">3. Aplicar Guion Bancario de tasa fija</span>
              <span class="text-[11px] text-slate-400">Frenar intereses rotativos de la tarjeta más cara</span>
            </div>
          </div>
          <span class="text-[11px] font-bold text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">15 min</span>
        </div>

        <div onclick="toggleCheck(4)" class="m3-card-outlined m3-ripple p-4 flex items-center justify-between cursor-pointer">
          <div class="flex items-center gap-3.5 pr-2">
            <div id="box-4" class="w-6 h-6 rounded-lg border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-slate-950 shrink-0 transition-colors"></div>
            <div>
              <span class="text-sm font-semibold text-slate-100 block">4. Inyectar cuota de Avalancha Inversa ABAI™</span>
              <span class="text-[11px] text-slate-400">Acelerar la cancelación de capital sin usar pago mínimo</span>
            </div>
          </div>
          <span class="text-[11px] font-bold text-emerald-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">Mensual</span>
        </div>
      </div>

      <!-- Métricas de Desahogo Financiero Inmediato -->
      <div class="m3-card-outlined p-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="material-symbols-rounded text-emerald-400 text-2xl">account_balance_wallet</span>
          <div>
            <span class="text-[10px] font-bold uppercase text-[${colors.accentPrimary}] block">Liquidez Mensual Rescatada</span>
            <div class="text-lg font-mono font-extrabold text-white">+$380 a $650 USD</div>
          </div>
        </div>
        <div class="text-right">
          <span class="text-[10px] font-bold uppercase text-slate-400 block">Próximo Cobro</span>
          <span class="text-xs font-bold text-emerald-400">4 Bóvedas Listas ✓</span>
        </div>
      </div>
      ` : `
      <!-- Tarjeta de Cumplimiento Diario -->
      <div class="m3-card-filled p-5 relative overflow-hidden">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-rounded filled text-[${colors.accentPrimary}] text-[20px]">track_changes</span>
            <span class="text-xs font-bold text-slate-200 uppercase tracking-wider">Progreso de Hoy</span>
          </div>
          <span id="pct-label" class="text-sm font-extrabold text-[${colors.accentPrimary}] bg-[${colors.accentPrimary}]/15 px-2.5 py-0.5 rounded-full">0%</span>
        </div>
        <div class="w-full bg-slate-900/90 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div id="progress-bar" class="bg-gradient-to-r from-[${colors.accentGradientFrom}] to-[${colors.accentGradientTo}] h-full w-0 rounded-full transition-all duration-500"></div>
        </div>
        <div class="flex items-center justify-between mt-2.5 text-xs text-slate-400">
          <p id="progress-label">0 de 4 acciones completadas</p>
          <span class="text-[11px] text-slate-500">Meta: 100%</span>
        </div>
      </div>

      <div class="m3-card-elevated p-6 text-center relative overflow-hidden">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[${colors.accentPrimary}]/10 border border-[${colors.accentPrimary}]/25 text-[${colors.accentPrimary}] text-[11px] font-bold uppercase tracking-wider mb-3">
          <span class="material-symbols-rounded text-[15px]">timer</span>
          Sesión Guiada del Método
        </div>
        <div id="timer-display" class="text-5xl font-mono font-extrabold text-white tracking-tight my-2">15:00</div>
        <p class="text-xs text-slate-400 max-w-xs mx-auto mb-5">Aplicación práctica para resolver ${pain.slice(0, 48)}.</p>
        <div class="flex justify-center items-center gap-3">
          <button id="btn-start" onclick="toggleTimer()" class="m3-ripple inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[${colors.accentPrimary}] text-slate-950 font-extrabold text-sm shadow-lg shadow-[${colors.accentPrimary}]/25">
            <span id="btn-start-icon" class="material-symbols-rounded filled text-[20px]">play_arrow</span>
            <span id="btn-start-text">Iniciar Sesión</span>
          </button>
          <button onclick="resetTimer()" class="m3-ripple w-12 h-12 rounded-2xl bg-slate-800/90 text-slate-300 border border-slate-700 flex items-center justify-center hover:text-white">
            <span class="material-symbols-rounded text-[22px]">restart_alt</span>
          </button>
        </div>
      </div>

      <div class="space-y-2.5">
        <div onclick="toggleCheck(1)" class="m3-card-outlined m3-ripple p-4 flex items-center justify-between cursor-pointer">
          <div class="flex items-center gap-3.5 pr-2">
            <div id="box-1" class="w-6 h-6 rounded-lg border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-slate-950 shrink-0 transition-colors"></div>
            <div>
              <span class="text-sm font-semibold text-slate-100 block">1. Diagnóstico inicial del día</span>
              <span class="text-[11px] text-slate-400">Identifica el punto crítico antes de comenzar</span>
            </div>
          </div>
          <span class="text-[11px] font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">Paso 1</span>
        </div>
        <div onclick="toggleCheck(2)" class="m3-card-outlined m3-ripple p-4 flex items-center justify-between cursor-pointer">
          <div class="flex items-center gap-3.5 pr-2">
            <div id="box-2" class="w-6 h-6 rounded-lg border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-slate-950 shrink-0 transition-colors"></div>
            <div>
              <span class="text-sm font-semibold text-slate-100 block">2. Ejecución de ${mechanism.slice(0, 28)}</span>
              <span class="text-[11px] text-slate-400">Aplica la herramienta principal de la Fase 2</span>
            </div>
          </div>
          <span class="text-[11px] font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">Paso 2</span>
        </div>
        <div onclick="toggleCheck(3)" class="m3-card-outlined m3-ripple p-4 flex items-center justify-between cursor-pointer">
          <div class="flex items-center gap-3.5 pr-2">
            <div id="box-3" class="w-6 h-6 rounded-lg border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-slate-950 shrink-0 transition-colors"></div>
            <div>
              <span class="text-sm font-semibold text-slate-100 block">3. Ajuste rápido con plantillas del sistema</span>
              <span class="text-[11px] text-slate-400">Verifica indicadores sin fricción</span>
            </div>
          </div>
          <span class="text-[11px] font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">Paso 3</span>
        </div>
        <div onclick="toggleCheck(4)" class="m3-card-outlined m3-ripple p-4 flex items-center justify-between cursor-pointer">
          <div class="flex items-center gap-3.5 pr-2">
            <div id="box-4" class="w-6 h-6 rounded-lg border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-slate-950 shrink-0 transition-colors"></div>
            <div>
              <span class="text-sm font-semibold text-slate-100 block">4. Registro de avance y blindaje</span>
              <span class="text-[11px] text-slate-400">Consolida el resultado alcanzado hoy</span>
            </div>
          </div>
          <span class="text-[11px] font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">Paso 4</span>
        </div>
      </div>
      `}
    </div>

    <!-- ==================== PESTAÑA 2: SIMULADOR ESPECÍFICO DEL MÉTODO ==================== -->
    <div id="view-tools" class="tab-content space-y-5">
      ${isFinanceApp ? `
      <!-- Simulador de Liquidación de Tarjetas: Avalancha Inversa ABAI™ -->
      <div class="m3-card-elevated p-5 space-y-4">
        <div class="flex items-center gap-2.5">
          <span class="material-symbols-rounded filled text-[${colors.accentPrimary}]">trending_down</span>
          <div>
            <h2 class="text-base font-bold text-white">Simulador de Salida de Deudas ABAI™</h2>
            <p class="text-[11px] text-slate-400">Calcula cuántos meses e intereses ahorras frente al pago mínimo</p>
          </div>
        </div>

        <div class="space-y-3 pt-1">
          <div>
            <div class="flex justify-between text-xs font-bold text-slate-300 mb-1">
              <span>Deuda total en tarjetas / préstamos:</span>
              <span id="sim-debt-label" class="text-amber-400 font-extrabold">$3,000 USD</span>
            </div>
            <input id="sim-debt" type="range" min="300" max="15000" step="100" value="3000" oninput="updateDebtSim()" class="w-full accent-amber-400 cursor-pointer" />
          </div>

          <div>
            <div class="flex justify-between text-xs font-bold text-slate-300 mb-1">
              <span>Cuota mensual destinada (Bóveda ABAI™):</span>
              <span id="sim-pay-label" class="text-emerald-400 font-extrabold">$350 USD/mes</span>
            </div>
            <input id="sim-pay" type="range" min="100" max="2000" step="25" value="350" oninput="updateDebtSim()" class="w-full accent-[${colors.accentPrimary}] cursor-pointer" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 pt-2">
          <div class="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">Libre de Deudas en</span>
            <span id="sim-months-out" class="text-xl font-extrabold text-emerald-400 mt-0.5 block">8.6 Meses</span>
            <span class="text-[10px] text-emerald-400/80">vs. +36 meses pagando mínimo</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 text-center">
            <span class="text-[10px] font-bold uppercase text-slate-400 block">Intereses Ahorrados</span>
            <span id="sim-saved-out" class="text-xl font-extrabold text-amber-300 mt-0.5 block">+$1,440 USD</span>
            <span class="text-[10px] text-slate-400">Dinero que queda en tu bolsillo</span>
          </div>
        </div>
      </div>

      <!-- Escáner Interactivo de Fugas Mensuales ($ USD) -->
      <div class="m3-card-filled p-5 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-rounded text-emerald-400 text-[20px]"> radar </span>
            <h3 class="text-xs font-bold text-white uppercase tracking-wider">Escáner de Fugas Silenciosas</h3>
          </div>
          <span class="text-[11px] text-slate-400">Toca las que detectes</span>
        </div>

        <div class="grid grid-cols-1 gap-2 text-xs">
          <button type="button" onclick="toggleLeak(this, 38)" class="leak-chip active m3-ripple p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 flex items-center justify-between text-left text-white font-semibold">
            <span>✓ Seguros duplicados y cargos en resumen</span>
            <span class="text-emerald-400 font-extrabold">+$38 USD/mes</span>
          </button>
          <button type="button" onclick="toggleLeak(this, 45)" class="leak-chip active m3-ripple p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 flex items-center justify-between text-left text-white font-semibold">
            <span>✓ Suscripciones automáticas que no usas</span>
            <span class="text-emerald-400 font-extrabold">+$45 USD/mes</span>
          </button>
          <button type="button" onclick="toggleLeak(this, 110)" class="leak-chip active m3-ripple p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 flex items-center justify-between text-left text-white font-semibold">
            <span>✓ Intereses rotativos congelables con Guion #1</span>
            <span class="text-emerald-400 font-extrabold">+$110 USD/mes</span>
          </button>
          <button type="button" onclick="toggleLeak(this, 65)" class="leak-chip m3-ripple p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-left text-slate-300 font-semibold">
            <span>+ Compras por impulso sin Bóveda Libre</span>
            <span class="text-slate-400 font-extrabold">+$65 USD/mes</span>
          </button>
        </div>

        <div class="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs mt-2">
          <span class="text-slate-300 font-semibold">Liquidez Anual Rescatada:</span>
          <span id="leak-yearly-total" class="font-extrabold text-base text-emerald-400">+$2,316 USD / año</span>
        </div>
      </div>

      <!-- Copiador Rápido de Guion Bancario -->
      <div class="m3-card-outlined p-4 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-amber-400">📞 Guion Rápido: Congelar Tasa de Tarjeta</span>
          <button type="button" onclick="copyBankScript()" class="m3-ripple px-3 py-1 rounded-lg bg-[${colors.accentPrimary}] text-slate-950 font-extrabold text-[11px]">
            Copiar Texto
          </button>
        </div>
        <p id="bank-script-text" class="text-[11px] text-slate-300 italic leading-relaxed">
          "Hola, me comunico con el sector de retención. Quiero cancelar el saldo total de mi tarjeta pero la tasa rotativa actual me impide continuar; solicito un plan de reestructuración a tasa fija reducida y la bonificación del cargo de mantenimiento."
        </p>
      </div>
      ` : `
      <div class="m3-card-elevated p-5">
        <div class="flex items-center gap-2.5 mb-2">
          <span class="material-symbols-rounded filled text-[${colors.accentPrimary}]">tune</span>
          <h2 class="text-base font-bold text-white">Configurador de ${mechanism}</h2>
        </div>
        <p class="text-xs text-slate-400 mb-4">Selecciona la modalidad operativa según el tiempo que tengas disponible hoy:</p>

        <div class="grid grid-cols-3 gap-2.5 mb-4">
          <button onclick="setTimerDuration(5)" class="m3-ripple py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5">
            <span class="material-symbols-rounded text-[16px] text-[${colors.accentPrimary}]">bolt</span> 5 Min SOS
          </button>
          <button onclick="setTimerDuration(15)" class="m3-ripple py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5">
            <span class="material-symbols-rounded text-[16px] text-[${colors.accentPrimary}]">schedule</span> 15 Min Estándar
          </button>
          <button onclick="setTimerDuration(30)" class="m3-ripple py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5">
            <span class="material-symbols-rounded text-[16px] text-[${colors.accentPrimary}]">auto_awesome</span> 30 Min Profundo
          </button>
        </div>
      </div>
      `}
    </div>

    <!-- ==================== PESTAÑA 3: BIBLIOTECA DE GUÍAS (M3) ==================== -->
    <div id="view-guides" class="tab-content space-y-4">
      <div class="flex items-center justify-between px-1">
        <h2 class="text-sm font-bold text-white">Manuales Interactivos por Fase</h2>
        <span class="text-[11px] text-[${colors.accentPrimary}] font-semibold">3 Fases Activas</span>
      </div>

      <div class="m3-card-outlined m3-ripple p-4 cursor-pointer" onclick="toggleAccordion('acc-1')">
        <div class="flex justify-between items-center">
          <span class="text-[11px] font-extrabold text-[${colors.accentPrimary}] uppercase tracking-wider">${phases[0].phase}</span>
          <span class="material-symbols-rounded text-slate-400 text-[20px]">expand_more</span>
        </div>
        <h3 class="text-sm font-bold text-white mt-1">${phases[0].title}</h3>
        <div id="acc-1" class="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-2">
          <p>${phases[0].description || 'Identifica y corta de raíz las fugas de tiempo y atención desde el primer día.'}</p>
          <div class="inline-flex items-center gap-1.5 text-[11px] text-[${colors.accentPrimary}] font-semibold bg-[${colors.accentPrimary}]/10 px-2.5 py-1 rounded-lg">
            <span class="material-symbols-rounded text-[15px]">task_alt</span>
            Entregable: ${phases[0].deliverable || 'Mapa de Diagnóstico Rápido'}
          </div>
        </div>
      </div>

      <div class="m3-card-outlined m3-ripple p-4 cursor-pointer" onclick="toggleAccordion('acc-2')">
        <div class="flex justify-between items-center">
          <span class="text-[11px] font-extrabold text-[${colors.accentPrimary}] uppercase tracking-wider">${phases[1].phase}</span>
          <span class="material-symbols-rounded text-slate-400 text-[20px]">expand_more</span>
        </div>
        <h3 class="text-sm font-bold text-white mt-1">${phases[1].title}</h3>
        <div id="acc-2" class="hidden mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-2">
          <p>${phases[1].description || 'Aplica las plantillas paso a paso para ejecutar en la mitad de tiempo.'}</p>
          <div class="inline-flex items-center gap-1.5 text-[11px] text-[${colors.accentPrimary}] font-semibold bg-[${colors.accentPrimary}]/10 px-2.5 py-1 rounded-lg">
            <span class="material-symbols-rounded text-[15px]">task_alt</span>
            Entregable: ${phases[1].deliverable || 'Plantillas de Ejecución'}
          </div>
        </div>
      </div>

      <div class="m3-card-outlined m3-ripple p-4 cursor-pointer" onclick="toggleAccordion('acc-3')">
        <div class="flex justify-between items-center">
          <span class="text-[11px] font-extrabold text-[${colors.accentPrimary}] uppercase tracking-wider">${phases[2].phase}</span>
          <span class="material-symbols-rounded text-slate-400 text-[20px]">expand_more</span>
        </div>
        <h3 class="text-sm font-bold text-white mt-1">${phases[2].title}</h3>
        <div id="acc-3" class="hidden mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-2">
          <p>${phases[2].description || 'Consolida tu flujo semanal y activa el protocolo de prevención de recaídas.'}</p>
          <div class="inline-flex items-center gap-1.5 text-[11px] text-[${colors.accentPrimary}] font-semibold bg-[${colors.accentPrimary}]/10 px-2.5 py-1 rounded-lg">
            <span class="material-symbols-rounded text-[15px]">task_alt</span>
            Entregable: ${phases[2].deliverable || 'Tablero de Mantenimiento'}
          </div>
        </div>
      </div>

      <!-- Bóveda de Manuales y Bonos Completos (Lectura / PDF) -->
      <div class="m3-card-elevated p-5 space-y-3 mt-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-rounded filled text-[${colors.accentPrimary}]">folder_special</span>
            <h3 class="text-sm font-bold text-white">Bóveda de Manuales y Bonos (PDF)</h3>
          </div>
          <span class="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800/50">5 Documentos</span>
        </div>
        <p class="text-xs text-slate-400">Abre cualquier documento para leerlo completo o guardarlo en PDF:</p>

        <div class="space-y-2 text-xs">
          <a href="/docs/master-guide.html" target="_blank" class="m3-ripple p-3 rounded-xl bg-slate-900/90 border border-[${colors.accentPrimary}]/40 flex items-center justify-between text-white font-bold hover:bg-slate-800 transition">
            <span class="flex items-center gap-2"><span class="material-symbols-rounded text-[${colors.accentPrimary}] text-[18px]">menu_book</span> Manual Operativo Maestro ($97 USD)</span>
            <span class="material-symbols-rounded text-[18px] text-[${colors.accentPrimary}]">open_in_new</span>
          </a>
          ${(Array.isArray(offer?.bonuses) && offer.bonuses.length > 0
            ? offer.bonuses
            : (Array.isArray(offer?.reengineeredOffer?.bonuses) && offer.reengineeredOffer.bonuses.length > 0)
            ? offer.reengineeredOffer.bonuses
            : [
            { name: 'Recurso Acelerador #1' },
            { name: 'Recurso Acelerador #2' },
            { name: 'Recurso Acelerador #3' },
            { name: 'Recurso Acelerador #4' }
          ]).map((b, idx) => `
          <a href="/docs/bono-${idx + 1}.html" target="_blank" class="m3-ripple p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-slate-200 hover:bg-slate-800 transition">
            <span class="flex items-center gap-2"><span class="material-symbols-rounded text-[${colors.accentPrimary}] text-[18px]">redeem</span> Bono #${idx + 1}: ${b.title || b.name}</span>
            <span class="material-symbols-rounded text-[16px] text-slate-400">open_in_new</span>
          </a>`).join('')}
        </div>
      </div>
    </div>

    <!-- ==================== PESTAÑA 4: MI PROGRESO ==================== -->
    <div id="view-progress" class="tab-content space-y-5">
      <div class="m3-card-elevated p-5">
        <div class="flex items-center justify-between mb-1">
          <h2 class="text-sm font-bold text-white">${progressTitle}</h2>
          <span class="material-symbols-rounded text-[${colors.accentPrimary}]">monitoring</span>
        </div>
        <p class="text-xs text-slate-400 mb-4">${progressDesc}</p>

        <div class="flex justify-between items-end h-28 pt-4 pb-2 px-3 border-b border-slate-800">
          <div class="flex flex-col items-center gap-1.5"><div class="w-7 bg-[${colors.accentPrimary}]/35 h-10 rounded-t-lg"></div><span class="text-[10px] text-slate-400">M1</span></div>
          <div class="flex flex-col items-center gap-1.5"><div class="w-7 bg-[${colors.accentPrimary}]/55 h-14 rounded-t-lg"></div><span class="text-[10px] text-slate-400">M2</span></div>
          <div class="flex flex-col items-center gap-1.5"><div class="w-7 bg-[${colors.accentPrimary}]/65 h-16 rounded-t-lg"></div><span class="text-[10px] text-slate-400">M3</span></div>
          <div class="flex flex-col items-center gap-1.5"><div class="w-7 bg-[${colors.accentPrimary}]/80 h-20 rounded-t-lg"></div><span class="text-[10px] text-slate-400">M4</span></div>
          <div class="flex flex-col items-center gap-1.5"><div class="w-7 bg-[${colors.accentPrimary}]/90 h-22 rounded-t-lg"></div><span class="text-[10px] text-slate-400">M5</span></div>
          <div class="flex flex-col items-center gap-1.5"><div class="w-7 bg-[${colors.accentPrimary}] h-24 rounded-t-lg shadow-lg shadow-[${colors.accentPrimary}]/30"></div><span class="text-[10px] text-white font-bold">M6</span></div>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Hitos del Sistema</h3>
        <div class="grid grid-cols-3 gap-3">
          ${milestones.map(m => `
          <div class="m3-card-outlined p-3.5 text-center">
            <span class="material-symbols-rounded filled text-amber-400 text-3xl block mb-1">${m.icon || 'emoji_events'}</span>
            <span class="text-[11px] font-bold text-white block">${m.title}</span>
            <span class="text-[9px] text-[${colors.accentPrimary}] font-semibold">${m.status || 'Activo'}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- ==================== PESTAÑA 5: AJUSTES ==================== -->
    <div id="view-settings" class="tab-content space-y-4">
      <div class="m3-card-elevated p-5 space-y-4">
        <div class="flex items-center gap-2">
          <span class="material-symbols-rounded text-[${colors.accentPrimary}]">settings</span>
          <h2 class="text-sm font-bold text-white">Configuración de tu App</h2>
        </div>

        <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="material-symbols-rounded text-[${colors.accentPrimary}]">install_mobile</span>
            <div>
              <span class="text-xs font-bold text-white block">Agregar a Pantalla de Inicio</span>
              <span class="text-[11px] text-slate-400">Acceso rápido en 1 toque desde tu celular</span>
            </div>
          </div>
          <button onclick="installPwa()" class="m3-ripple px-4 py-2 rounded-full bg-[${colors.accentPrimary}] text-slate-950 font-extrabold text-xs">
            Instalar
          </button>
        </div>

        <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="material-symbols-rounded text-emerald-400">cloud_done</span>
            <div>
              <span class="text-xs font-bold text-white block">Guardado Automático Privado</span>
              <span class="text-[11px] text-emerald-400">Tus cálculos se guardan solo en tu teléfono</span>
            </div>
          </div>
        </div>

        <button onclick="resetAllProgress()" class="m3-ripple w-full py-3 rounded-2xl bg-rose-950/40 text-rose-300 border border-rose-800/40 text-xs font-bold hover:bg-rose-900/50 transition flex items-center justify-center gap-2">
          <span class="material-symbols-rounded text-[18px]">delete_sweep</span>
          Reiniciar Datos Guardados
        </button>
      </div>
    </div>

  </main>

  <!-- Snackbar Notification -->
  <div id="m3-snackbar" class="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-slate-100 text-slate-950 px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between text-xs font-semibold z-50 transition-all duration-300 opacity-0 pointer-events-none translate-y-4">
    <span id="m3-snackbar-text">Acción guardada</span>
    <span class="material-symbols-rounded text-[18px] text-emerald-700">check_circle</span>
  </div>

  <!-- Bottom Navigation Bar -->
  <nav class="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-[#0F1626]/95 border-t border-slate-800/80 backdrop-blur-2xl px-2 flex justify-around items-center text-xs font-medium text-slate-400 z-50">
    <button onclick="switchTab('today')" id="tab-today" class="flex flex-col items-center gap-1 text-[${colors.accentPrimary}] font-bold transition">
      <div id="pill-today" class="m3-nav-pill active">
        <span id="icon-today" class="material-symbols-rounded filled text-[22px]">${navTabs.today.icon}</span>
      </div>
      <span class="text-[11px]">${navTabs.today.label}</span>
    </button>
    <button onclick="switchTab('tools')" id="tab-tools" class="flex flex-col items-center gap-1 hover:text-white transition">
      <div id="pill-tools" class="m3-nav-pill">
        <span id="icon-tools" class="material-symbols-rounded text-[22px]">${navTabs.tools.icon}</span>
      </div>
      <span class="text-[11px]">${navTabs.tools.label}</span>
    </button>
    <button onclick="switchTab('guides')" id="tab-guides" class="flex flex-col items-center gap-1 hover:text-white transition">
      <div id="pill-guides" class="m3-nav-pill">
        <span id="icon-guides" class="material-symbols-rounded text-[22px]">${navTabs.guides.icon}</span>
      </div>
      <span class="text-[11px]">${navTabs.guides.label}</span>
    </button>
    <button onclick="switchTab('progress')" id="tab-progress" class="flex flex-col items-center gap-1 hover:text-white transition">
      <div id="pill-progress" class="m3-nav-pill">
        <span id="icon-progress" class="material-symbols-rounded text-[22px]">${navTabs.progress.icon}</span>
      </div>
      <span class="text-[11px]">${navTabs.progress.label}</span>
    </button>
    <button onclick="switchTab('settings')" id="tab-settings" class="flex flex-col items-center gap-1 hover:text-white transition">
      <div id="pill-settings" class="m3-nav-pill">
        <span id="icon-settings" class="material-symbols-rounded text-[22px]">${navTabs.settings.icon}</span>
      </div>
      <span class="text-[11px]">${navTabs.settings.label}</span>
    </button>
  </nav>

  <!-- Script Interactivo -->
  <script>
    let timerSeconds = 900;
    let timerTotal = 900;
    let timerInterval = null;
    let checks = { 1: false, 2: false, 3: false, 4: false };
    let snackbarTimeout = null;

    try {
      const saved = localStorage.getItem('app_progress_v2');
      if (saved) checks = JSON.parse(saved);
    } catch(e) {}

    function showSnackbar(message) {
      const bar = document.getElementById('m3-snackbar');
      const txt = document.getElementById('m3-snackbar-text');
      if (!bar || !txt) return;
      txt.innerText = message;
      bar.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
      clearTimeout(snackbarTimeout);
      snackbarTimeout = setTimeout(() => {
        bar.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
      }, 2600);
    }

    function switchTab(tabName) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      const activeView = document.getElementById('view-' + tabName);
      if (activeView) activeView.classList.add('active');

      ['today', 'tools', 'guides', 'progress', 'settings'].forEach(name => {
        const btn = document.getElementById('tab-' + name);
        const pill = document.getElementById('pill-' + name);
        const icon = document.getElementById('icon-' + name);
        if (name === tabName) {
          btn?.classList.remove('text-slate-400');
          btn?.classList.add('text-[${colors.accentPrimary}]', 'font-bold');
          pill?.classList.add('active');
          icon?.classList.add('filled');
        } else {
          btn?.classList.remove('text-[${colors.accentPrimary}]', 'font-bold');
          btn?.classList.add('text-slate-400');
          pill?.classList.remove('active');
          icon?.classList.remove('filled');
        }
      });
    }

    function toggleAccordion(id) {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('hidden');
    }

    function updateUi() {
      let count = 0;
      for (let i = 1; i <= 4; i++) {
        const box = document.getElementById('box-' + i);
        if (box) {
          if (checks[i]) {
            count++;
            box.innerHTML = '<span class="material-symbols-rounded filled text-[16px]">check</span>';
            box.style.backgroundColor = '${colors.accentPrimary}';
            box.style.borderColor = '${colors.accentPrimary}';
          } else {
            box.innerHTML = '';
            box.style.backgroundColor = 'transparent';
            box.style.borderColor = '#475569';
          }
        }
      }
      const pct = Math.round((count / 4) * 100);
      const progressBar = document.getElementById('progress-bar');
      const progressLabel = document.getElementById('progress-label');
      const pctLabel = document.getElementById('pct-label');
      if (progressBar) progressBar.style.width = pct + '%';
      if (progressLabel) progressLabel.innerText = count + ' de 4 acciones completadas';
      if (pctLabel) pctLabel.innerText = pct + '%';

      localStorage.setItem('app_progress_v2', JSON.stringify(checks));
    }

    function toggleCheck(id) {
      checks[id] = !checks[id];
      updateUi();
      if (checks[id]) showSnackbar('Micro-acción completada y guardada');
    }

    function playBeep() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } catch(e) {}
    }

    function toggleTimer() {
      const btnText = document.getElementById('btn-start-text');
      const btnIcon = document.getElementById('btn-start-icon');
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        if (btnText) btnText.innerText = 'Continuar';
        if (btnIcon) btnIcon.innerText = 'play_arrow';
      } else {
        if (btnText) btnText.innerText = 'Pausar';
        if (btnIcon) btnIcon.innerText = 'pause';
        timerInterval = setInterval(() => {
          if (timerSeconds > 0) {
            timerSeconds--;
            const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
            const secs = (timerSeconds % 60).toString().padStart(2, '0');
            document.getElementById('timer-display').innerText = mins + ':' + secs;
          } else {
            clearInterval(timerInterval);
            timerInterval = null;
            if (btnText) btnText.innerText = '¡Completado!';
            if (btnIcon) btnIcon.innerText = 'check';
            playBeep();
            showSnackbar('¡Sesión de enfoque completada con éxito!');
          }
        }, 1000);
      }
    }

    function resetTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
      timerSeconds = timerTotal;
      const mins = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
      const secs = (timerSeconds % 60).toString().padStart(2, '0');
      document.getElementById('timer-display').innerText = mins + ':' + secs;
      const btnText = document.getElementById('btn-start-text');
      const btnIcon = document.getElementById('btn-start-icon');
      if (btnText) btnText.innerText = 'Iniciar Rutina';
      if (btnIcon) btnIcon.innerText = 'play_arrow';
    }

    function setTimerDuration(mins) {
      timerTotal = mins * 60;
      timerSeconds = timerTotal;
      resetTimer();
      switchTab('today');
      showSnackbar('Temporizador ajustado a ' + mins + ' minutos');
    }



    let currentMonthlyLeak = 193; // 38 + 45 + 110 initial active chips

    function updateAppVaults() {
      const slider = document.getElementById('app-salary-slider');
      if (!slider) return;
      const val = parseFloat(slider.value) || 1600;
      const lbl = document.getElementById('app-salary-label');
      if (lbl) lbl.innerText = '$' + val.toLocaleString() + ' USD';
      const v1 = document.getElementById('app-v1');
      const v2 = document.getElementById('app-v2');
      const v3 = document.getElementById('app-v3');
      const v4 = document.getElementById('app-v4');
      if (v1) v1.innerText = '$' + Math.round(val * 0.50).toLocaleString() + ' USD';
      if (v2) v2.innerText = '$' + Math.round(val * 0.20).toLocaleString() + ' USD';
      if (v3) v3.innerText = '$' + Math.round(val * 0.15).toLocaleString() + ' USD';
      if (v4) v4.innerText = '$' + Math.round(val * 0.15).toLocaleString() + ' USD';
    }

    function updateDebtSim() {
      const debtEl = document.getElementById('sim-debt');
      const payEl = document.getElementById('sim-pay');
      if (!debtEl || !payEl) return;
      const debt = parseFloat(debtEl.value) || 3000;
      const pay = parseFloat(payEl.value) || 350;
      document.getElementById('sim-debt-label').innerText = '$' + debt.toLocaleString() + ' USD';
      document.getElementById('sim-pay-label').innerText = '$' + pay.toLocaleString() + ' USD/mes';
      const months = Math.max(1.0, (debt / pay)).toFixed(1);
      const savedInterest = Math.round(debt * 0.48);
      document.getElementById('sim-months-out').innerText = months + ' Meses';
      document.getElementById('sim-saved-out').innerText = '+$' + savedInterest.toLocaleString() + ' USD';
    }

    function toggleLeak(btn, amount) {
      const isActive = btn.classList.contains('active');
      if (isActive) {
        btn.classList.remove('active', 'bg-emerald-950/50', 'border-emerald-500/50', 'text-white');
        btn.classList.add('bg-slate-900', 'border-slate-800', 'text-slate-300');
        currentMonthlyLeak = Math.max(0, currentMonthlyLeak - amount);
      } else {
        btn.classList.add('active', 'bg-emerald-950/50', 'border-emerald-500/50', 'text-white');
        btn.classList.remove('bg-slate-900', 'border-slate-800', 'text-slate-300');
        currentMonthlyLeak += amount;
      }
      const totalEl = document.getElementById('leak-yearly-total');
      if (totalEl) totalEl.innerText = '+$' + (currentMonthlyLeak * 12).toLocaleString() + ' USD / año';
      showSnackbar('Ahorro anual actualizado: +$' + (currentMonthlyLeak * 12).toLocaleString() + ' USD');
    }

    function copyBankScript() {
      const txt = document.getElementById('bank-script-text')?.innerText || '';
      if (navigator.clipboard && txt) {
        navigator.clipboard.writeText(txt.replace(/^"|"$/g, '')).catch(() => {});
      }
      showSnackbar('Guion bancario copiado al portapapeles');
    }

    function installPwa() {
      showSnackbar('En iOS: Compartir > Añadir a Inicio. En Android: Menú > Instalar App.');
    }

    function resetAllProgress() {
      checks = { 1: false, 2: false, 3: false, 4: false };
      localStorage.removeItem('app_progress_v2');
      updateUi();
      showSnackbar('Datos reiniciados');
    }

    updateUi();
  </script>
</body>
</html>`;
}

function runGenerateApp() {
  console.log('[app-maker] Starting Google Material Design 3 mobile companion app generation...');
  const data = loadActiveData();
  const offer = data?.reengineeredOffer || data?.offer || {
    product_name: 'Sistema Productividad y Trabajo Remoto Pro™',
    unique_mechanism: 'Arquitectura de Sincronización Productividad-Trabajo (SPTP)™',
    main_promise: 'Elimina la dispersión y recupera tu enfoque diario'
  };
  const niche = data?.niche || {
    niche_name: 'Productividad y Trabajo Remoto',
    core_pain: 'fatiga y distracciones continuas'
  };

  const archetype = getArchetypeForNiche(niche.niche_name || offer.product_name);
  console.log(`[app-maker] Selected Visual Archetype: ${archetype.name} (Material Design 3)`);

  const rootDir = path.join(__dirname, '..', '..', '..', '..');
  const appDir = path.join(rootDir, 'app');
  const distDir = path.join(appDir, 'dist');

  [appDir, distDir].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  // 1. Generar App HTML interactiva con Material Design 3
  const appHtml = buildMobileApp(offer, niche, archetype);
  fs.writeFileSync(path.join(appDir, 'index.html'), appHtml, 'utf8');
  fs.writeFileSync(path.join(distDir, 'index.html'), appHtml, 'utf8');

  // 2. Generar manifest.json PWA
  const manifest = {
    name: `${offer.product_name} · Material You App`,
    short_name: offer.product_name.slice(0, 16),
    description: `Aplicación móvil interactiva Material Design 3 para ${offer.product_name}.`,
    start_url: './index.html',
    display: 'standalone',
    background_color: archetype.colors.bgMain,
    theme_color: archetype.colors.bgMain,
    icons: [
      {
        src: 'https://cdn-icons-png.flaticon.com/512/888/888879.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
  fs.writeFileSync(path.join(appDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  fs.writeFileSync(path.join(distDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  // 3. Generar Super Prompt M3 para constructores de apps de IA
  const superPrompt = generateAppSuperPrompt(offer, niche, archetype);
  fs.writeFileSync(path.join(appDir, 'app-super-prompt.md'), superPrompt, 'utf8');
  fs.writeFileSync(path.join(distDir, 'app-super-prompt.md'), superPrompt, 'utf8');

  // 4. Copiar a funnel/public/app si funnel existe para despliegue
  const funnelPublicApp = path.join(rootDir, 'funnel', 'public', 'app');
  if (fs.existsSync(path.join(rootDir, 'funnel'))) {
    if (!fs.existsSync(funnelPublicApp)) fs.mkdirSync(funnelPublicApp, { recursive: true });
    fs.writeFileSync(path.join(funnelPublicApp, 'index.html'), appHtml, 'utf8');
    fs.writeFileSync(path.join(funnelPublicApp, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
    fs.writeFileSync(path.join(funnelPublicApp, 'app-super-prompt.md'), superPrompt, 'utf8');
  }

  // 5. Registrar en logs
  try {
    logAutomation('app-maker', 'generate_app', 'success', {
      productName: offer.product_name,
      designSystem: 'Google Material Design 3',
      archetype: archetype.name,
      outputFiles: ['app/index.html', 'app/dist/index.html', 'app/app-super-prompt.md', 'app/manifest.json']
    });
  } catch (e) {
    console.warn('[app-maker] DB log skipped:', e.message);
  }

  console.log(`[app-maker] Material Design 3 Mobile App & Super Prompt created at /app/ and /app/dist/`);

  return {
    appDir,
    distDir,
    archetype: archetype.name
  };
}

if (require.main === module) {
  runGenerateApp();
}

module.exports = {
  buildMobileApp,
  generateAppSuperPrompt,
  runGenerateApp
};
