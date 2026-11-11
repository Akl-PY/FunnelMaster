# Super Prompt de Especificación para Aplicación Móvil — Google Material Design 3 (Material You)
### Generado para: Sistema Liquidez Soberana & Cero Deudas™
**Target AI Tools**: v0.dev, Lovable.dev, Bolt.new, Cursor AI, Flutter / Expo / React Native Paper (M3)

---

## 🎯 Instrucciones de Rol y Contexto para la IA de Código

Actúa como un **Principal Mobile Architect & Google Material Design 3 (Material You) Specialist** con experiencia diseñando aplicaciones premiadas en Google Play (estilo Google Fit, Duolingo, Endel y Todoist M3).

Debes construir la aplicación móvil completa de acompañamiento interactivo (PWA / Mobile App) para el sistema **"Sistema Liquidez Soberana & Cero Deudas™"**.
La aplicación tiene como objetivo erradicar **"asfixia financiera a mitad de mes, intereses bancarios que crecen sin control y frustración de cobrar el sueldo solo para pagar deudas sin capacidad de ahorro"** y garantizar el cumplimiento de **"Corta el sangrado de intereses bancarios, libera entre $300 y $650 USD al mes de tu mismo sueldo desde tus primeras 48 horas y liquida tus tarjetas en la mitad de tiempo sin usar planillas de Excel eternas"** utilizando el **"Arquitectura de Blindaje de Sueldo y Avalancha Inversa (ABAI)™"**.

---

## 🎨 Sistema de Diseño Oficial: Google Material Design 3 (M3 / Material You)

1. **Tokens de Color y Superficies Tonales M3 (`--md-sys-color-*`)**:
   - `--md-sys-color-surface`: `#050D0A` (Superficie base OLED Dark)
   - `--md-sys-color-surface-container-low`: `#0F1626`
   - `--md-sys-color-surface-container`: `#0C1A15` (Tarjetas M3 Filled / Elevated)
   - `--md-sys-color-surface-container-high`: `#1C2742`
   - `--md-sys-color-primary`: `#10B981`
   - `--md-sys-color-on-primary`: `#052E16`
   - `--md-sys-color-secondary-container`: `#10B98129` (Píldora activa de navegación M3 y chips seleccionados)
   - `--md-sys-color-on-secondary-container`: `#10B981`
   - `--md-sys-color-outline-variant`: `#18382E`
2. **Iconografía Oficial de Google**:
   - Utiliza exclusivamente **Material Symbols Rounded** (`https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`).
   - En estado inactivo usa `'FILL' 0, 'wght' 400`; en estado activo usa `'FILL' 1, 'wght' 600`.
3. **Geometría y Componentes M3**:
   - **M3 Top App Bar**: Barra superior con elevación tonal al hacer scroll, chip tonal de racha (`local_fire_department`) e insignia PRO.
   - **M3 Cards**: Bordes redondeados `24px` (`rounded-[24px]`) y `28px` (`rounded-[28px]`) con elevación tonal M3.
   - **M3 Extended FAB**: Botón flotante de acción principal con radio `16px`, icono `play_arrow` / `pause` y efecto **Material Ripple**.
   - **M3 Navigation Bar**: Barra inferior de `80px` con 5 destinos y **píldora indicadora activa de `64px × 32px`** (`rounded-full`).
   - **M3 Snackbar**: Notificaciones flotantes inferiores con bordes redondeados y elevación nivel 3.

---

## 📱 Arquitectura de 5 Pantallas M3 (Bottom Navigation Bar)

### Destino 1: "Hoy" (`icon: today` o icono temático) — Dashboard de Acción y Avance
1. **Tarjeta M3 Filled de Cumplimiento**: Muestra porcentaje diario con **M3 Linear Progress Indicator** de `8px` de alto y bordes redondeados.
2. **Acción Rápida Guiada / Temporizador del Método**: Disparador táctico interactivo con display tipográfico Display Medium + **M3 Extended FAB** y persistencia en `localStorage`.
3. **Checklist M3 de Micro-Acciones del Método**: Tarjetas interactivas con casillas M3 (`check_circle`), efecto Material Ripple y guardado automático.

### Destino 2: "Herramienta Táctica" (`icon: tune` o icono temático) — Simulador / Calculadora del Mecanismo (${mechanism})
1. **Controles Reactivos en Tiempo Real**: Sliders o selectores numéricos que permiten al usuario simular, calcular o auditar su caso particular frente a "${pain}".
2. **Tablero de Resultados Inmediatos**: Tarjetas de resultados tangibles con contraste M3 y desglose numérico claro.
3. **Herramienta Rápida de Acción / Guion Copiable**: Atajo de ejecución con botón copiable en 1 toque.

### Destino 3: "Guías" (`icon: menu_book`) — Biblioteca de Fases y Bonos
1. **Acordeones M3 Outlined** sincronizados con las 3 fases reales del sistema:
   - *${phases[0].phase}*: ${phases[0].title} (${phases[0].deliverable})
   - *${phases[1].phase}*: ${phases[1].title} (${phases[1].deliverable})
   - *${phases[2].phase}*: ${phases[2].title} (${phases[2].deliverable})
2. **Acceso Rápido a los Bonos Tácticos** incluidos en la oferta.

### Destino 4: "Progreso" (`icon: monitoring` o icono temático) — Analítica e Insignias
1. **Gráfico de Evolución M3**: Barras tonales interactivas que reflejan el avance acumulado.
2. **Bóveda de Insignias M3**: Medallas con iconos Material Symbols (`emoji_events`, `military_tech`, `workspace_premium`).

### Destino 5: "Ajustes" (`icon: settings`) — Modo Nativo PWA
1. **Tarjeta M3 de Instalación Nativa**: Guía interactiva para añadir a pantalla de inicio en iOS y Android (`install_mobile`).
2. **Switches M3** de notificaciones y guardado local, más botón de reinicio seguro.

---

## 🚀 Prompt Listo para Copiar y Pegar en Lovable / v0 / Bolt

> *"Construye una aplicación móvil PWA completa utilizando estrictamente el sistema de diseño Google Material Design 3 (Material You) para '${productName}'. Usa la fuente Google Material Symbols Rounded para todos los iconos, variables '--md-sys-color-*' con superficie oscura (${colors.bgMain}) y color primario (${colors.accentPrimary}), tarjetas M3 con radio de 24px/28px, efecto Material Ripple al tocar, M3 Extended FAB y una M3 Navigation Bar inferior de 80px con píldora indicadora activa (64x32px). Incluye las 5 pestañas funcionales: Hoy (panel interactivo con indicador de avance y checklist persistente en localStorage), Herramienta Táctica (simulador/calculadora reactivo con sliders del método '${mechanism}'), Guías (acordeones de las 3 fases y bonos), Progreso (gráfico de evolución e insignias desbloqueables) y Ajustes (instalador PWA y switches M3)."*
