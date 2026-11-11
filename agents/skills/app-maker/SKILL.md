---
name: app-maker
description: Genera aplicaciones web y móviles interactivas de acompañamiento para infoproductos (PWA / Mobile WebApp) con Google Material Design 3 (Material You) en /app y compila el entregable en /app/dist.
allowed-tools: Bash(node:*) read_file write_file edit_file
---

# App Maker 📱 — Arquitecto de Super Prompts y Aplicaciones Móviles con Google Material Design 3 (Material You)

Esta skill transforma un infoproducto estático en un **ecosistema móvil nativo de alto valor percibido**, creando tanto el **Super Prompt de Ingeniería de App con Google Material Design 3** (para constructores de IA como Lovable, Bolt, v0, Cursor o Expo/React Native) como la **Aplicación Móvil Interactiva (PWA M3)** compilada y funcional en `/app` y `/app/dist`.

---

## 1. Sistema de Diseño Mandatorio: Google Material Design 3 (M3 / Material You)

Toda aplicación móvil generada por esta skill **DEBE** implementar la especificación oficial de **Google Material Design 3**:

1. **Iconografía Oficial de Google (`Material Symbols Rounded`)**:
   - Carga desde Google Fonts: `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`.
   - Prohibido usar emojis planos en la barra de navegación inferior o en controles principales; todos los iconos usan `<span class="material-symbols-rounded">...</span>` con transición `font-variation-settings: 'FILL' 1` al estar activos.
2. **Tokens de Color y Superficies Tonales M3 (`--md-sys-color-*`)**:
   - `--md-sys-color-surface`: Superficie base OLED-friendly del arquetipo.
   - `--md-sys-color-surface-container-low` / `--md-sys-color-surface-container` / `--md-sys-color-surface-container-high`: Jerarquía de elevación tonal sin depender únicamente de sombras pesadas.
   - `--md-sys-color-primary` & `--md-sys-color-on-primary`: Acciones primarias, botones Filled y controles activos.
   - `--md-sys-color-secondary-container` & `--md-sys-color-on-secondary-container`: Píldora activa de navegación M3 (`64px × 32px`), chips seleccionados y badges tonales.
   - `--md-sys-color-outline-variant`: Bordes sutiles de `1px` para tarjetas Outlined y divisores.
3. **Componentes M3 Nativos Obligatorios**:
   - **M3 Top App Bar**: Barra superior fija con elevación tonal dinámica, avatar de estado y chip tonal de racha diaria (`local_fire_department`).
   - **M3 Cards (`Elevated`, `Filled`, `Outlined`)**: Bordes con radio `24px` (`rounded-[24px]`) y `28px` (`rounded-[28px]`), padding generoso y capas de estado (*state layers*).
   - **M3 Circular & Linear Progress Indicators**: Anillo SVG de progreso y barra lineal M3 con pista tonal.
   - **M3 Extended FAB (Floating Action Button)**: Botón flotante o de acción principal con radio `16px`, sombra de elevación nivel 3 y efecto **Material Ripple** (`md-ripple`) al tocar.
   - **M3 Filter & Assist Chips**: Chips con radio `8px` (`rounded-lg`) para seleccionar intervalos de foco y categorías.
   - **M3 Navigation Bar**: Barra inferior de `80px` con 5 destinos, donde el ícono activo se envuelve en la **píldora indicadora M3 (`w-16 h-8 rounded-full`)** con transición elástica.

---

## 2. Arquitectura en 2 Etapas (Prompt-First → Execution)

### Etapa 1: Generación del Super Prompt Maestro de App (`app/app-super-prompt.md`)
Antes de compilar el código, la skill diseña un **Super Prompt de Ingeniería Móvil Material Design 3** adaptado específicamente al nicho activo, al avatar y al Mecanismo Único de `DATA.md`:

> *"Actúa como un Principal Android/Flutter & Mobile Web Architect en Google especializado en Material Design 3 (Material You). Necesito que construyas una aplicación móvil PWA completa y funcional de acompañamiento para los compradores de nuestro sistema.*
> *Prohibido entregar pantallas vacías o botones de adorno. La app debe incluir:*
> 1. *Sistema de diseño Google Material Design 3 completo: variables `--md-sys-color-*`, tipografía Roboto / Google Sans, iconografía oficial `Material Symbols Rounded` con variación `FILL 0 -> 1`, tarjetas M3 con radio de 24px/28px, efecto Material Ripple en cada botón y M3 Navigation Bar inferior de 80px con indicador activo en forma de píldora (`64x32px`).*
> 2. *Motor de persistencia local (`localStorage`) que guarde la racha de días activos, el progreso porcentual y las tareas completadas hoy.*
> 3. *Herramienta Táctica Interactiva del Mecanismo Único: Simulador interactivo, calculadora o herramienta táctica diseñada específicamente para resolver el dolor central del nicho y ejecutar el Mecanismo Único (con controles en tiempo real, sliders o selectores y persistencia local).*
> 4. *Biblioteca interactiva sincronizada con las fases reales del método y los 4 bonos desbloqueables in-app.*
> 5. *Manifiesto PWA (`manifest.json`), Snackbar M3 de notificaciones en pantalla e instalador directo en pantalla de inicio para iOS y Android."*

### Etapa 2: Compilación de la App Interactiva en `/app` y `/app/dist` (100% Adaptada a la Utilidad del Nicho — Regla #25)
- **PROHIBIDO hacer todas las apps iguales**: Queda terminantemente prohibido poner un "cronómetro Pomodoro" o un "generador de audio 432Hz" en nichos donde no tiene sentido (como finanzas personales, eliminación de deudas, cocina, adiestramiento canino o ventas).
- **PROHIBIDO mostrar jerga de desarrollador al usuario final**: El estilo visual usa Google Material Design 3 (tokens `--md-sys-color-*`, `Material Symbols Rounded`, `m3-nav-pill`, `m3-ripple`), pero los títulos y descripciones visibles para el comprador jamás deben decir *"Con Google Material You"* ni jerga técnica; deben hablar en el lenguaje del beneficio real del cliente.
- Las **5 pantallas interactivas** de la app se generan con total libertad y adaptación dinámica según los datos específicos de la oferta (`offer.app_config` en `data/active_offer.json` o derivada algorítmicamente del Mecanismo Único):
  1. **Pestaña 1 — Panel Principal de Acción**: Checklist interactivo de ejecución diaria del método (persistido en `localStorage`), indicador de racha/progreso y disparador de acción principal de la oferta.
  2. **Pestaña 2 — Herramienta Táctica / Simulador del Mecanismo Único**: Simulador interactivo, calculadora de resultados, escáner de fricción o tablero táctico con controles reactivos generados 100% a medida para resolver el dolor del comprador.
  3. **Pestaña 3 — Bóveda de Guías y Entregables (PDFs)**: Acordeones de las 3 fases reales del método + acceso directo para abrir y descargar el Manual Maestro y los 4 Bonos específicos de la oferta.
  4. **Pestaña 4 — Métricas y Progreso**: Evolución y logros desbloqueados por el usuario al aplicar el sistema.
  5. **Pestaña 5 — Ajustes e Instalación**: Notificaciones, instalación directa en la pantalla de inicio del teléfono (PWA) y reinicio de datos.

---

## 3. Comandos Operativos y Sincronización

```bash
node agents/skills/app-maker/scripts/generate-app.js
```

- Genera `/app/index.html`, `/app/manifest.json` y `/app/app-super-prompt.md`.
- Compila la distribución limpia en `/app/dist/` y la sincroniza en `/funnel/public/app/` y `/funnel/dist/app/` para que esté disponible en vivo dentro del embudo (`/app`).
