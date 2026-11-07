---
name: orchestrator
description: Orquestador maestro de FunnelMaster. Guía al usuario en el plan de 48 horas, coordina la ejecución de las skills especializadas, gestiona la persistencia en base de datos (SQLite/PostgreSQL) y asiste ante restricciones de navegador con /browser.
allowed-tools: Bash(node:*) Bash(npm:*) read_file write_file edit_file
---

# FunnelMaster Orchestrator 🎯

Skill central de orquestación. Actúa como el copiloto director del flujo completo, guiando al usuario paso a paso, gestionando las transiciones entre skills y asegurando la persistencia de datos y la resolución de contingencias.

---

## 1. Protocolo de Persistencia en Base de Datos

El orquestador garantiza que toda la información recuperada o generada se guarde en base de datos:

### A. Configuración por Defecto (SQLite Local — Cero Fricción)
- No requiere instalar nada ni crear cuentas externas.
- El archivo vive en `data/funnel_master.db`.
- Para inicializarla o verificarla:
  ```bash
  npm run db:init
  ```
- Todas las operaciones se realizan a través de `scripts/db.js` (`saveNiche`, `saveOffer`, `logAutomation`).

### B. Configuración con PostgreSQL (Cloud / Producción)
Si el usuario prefiere una base de datos en la nube (Neon, Supabase o Postgres local):
1. Crear un archivo `.env` en la raíz del proyecto.
2. Añadir la variable de conexión:
   ```env
   DATABASE_URL="postgres://usuario:password@host:5432/funnel_master?sslmode=require"
   ```
3. Ejecutar:
   ```bash
   npm run db:init
   ```

---

## 2. Protocolo de Contingencia de Navegador (`/browser`)

> [!IMPORTANT]
> **Aislamiento de Terminal Sandbox**: Si al ejecutar navegaciones el navegador en modo visual (`--headed`) no aparece en pantalla (debido a las restricciones de renderizado GUI dentro del sandbox de Antigravity), el orquestador **DEBE** instruir de inmediato al usuario:
> 1. Activar el comando especial:  
>    👉 **/browser**
> 2. Esto invoca el subagente nativo de Chrome DevTools integrado en Antigravity para interactuar con páginas protegidas por Cloudflare, realizar logins manuales o superar captchas de forma visual.

---

## 3. Hoja de Ruta de Orquestación (Flujo de 48h)

El orquestador guía al usuario siguiendo esta secuencia estructurada:

### Fase 1: Selección y Validación de Nicho
- [ ] Inicializar la base de datos (`scripts/db.js`).
- [ ] Ejecutar investigación de mercado en tiempo real sin opciones hardcodeadas ni menús preestablecidos.
- [ ] Presentar lista curada de nichos emergentes descubiertos mediante datos de los últimos 180 días.
- [ ] Ejecutar [`niche-discovery`](file:///c:/Users/danie/OneDrive/Escritorio/FunnelMaster/agents/skills/niche-discovery/SKILL.md) para auditar anunciantes en vivo en Meta Ads Library mediante `browser-automation`.
- [ ] Si los anuncios activos son $\ge 10$ (validado) o $+100$ (ganador absoluto), persistir el registro con `saveNiche()`.

### Fase 2: Ingeniería Inversa y Rediseño de Oferta
- [ ] Tomar la URL de la página de venta del competidor validado.
- [ ] Invocar [`offer-reengineer`](file:///c:/Users/danie/OneDrive/Escritorio/FunnelMaster/agents/skills/offer-reengineer/SKILL.md).
- [ ] Extraer DOM con `browser-automation` o `/browser`.
- [ ] Desglosar la oferta y construir la nueva promesa, mecanismo único y pila de 3 a 5 bonos.
- [ ] Persistir la oferta rediseñada con `saveOffer()`.

### Fase 3: Redacción del Copy del Embudo
- [ ] Invocar [`funnel-copywriter`](file:///c:/Users/danie/OneDrive/Escritorio/FunnelMaster/agents/skills/funnel-copywriter/SKILL.md).
- [ ] Redactar los 11 bloques del *Hero's Journey* bajo reglas estrictas Anti-LLM.
- [ ] Guardar el documento en `funnels/<niche-slug>/copy.md`.

### Fase 4: Construcción Web y Lanzamiento
- [ ] **Opción A (Código Propio)**: Invocar [`landing-builder`](file:///c:/Users/danie/OneDrive/Escritorio/FunnelMaster/agents/skills/landing-builder/SKILL.md) para generar la landing en `/funnel` con Astro/Next.js y preservación de UTMs.
- [ ] **Opción B (Generador con IA)**: Invocar [`prompt-web-maker`](file:///c:/Users/danie/OneDrive/Escritorio/FunnelMaster/agents/skills/prompt-web-maker/SKILL.md) para entregar el *Perfect Prompt* a Lovable, v0 o Bolt.
- [ ] Invocar [`product-generator`](file:///c:/Users/danie/OneDrive/Escritorio/FunnelMaster/agents/skills/product-generator/SKILL.md) para redactar el infoproducto y los entregables de los bonos.

---

## 4. Validación Obligatoria de Calidad
Antes de cerrar cualquier etapa, el orquestador verifica:
1. Que no existan datos ficticios ni nichos hardcodeados.
2. Que los tests unitarios e integrados pasen al 100%:
   ```bash
   npm test
   ```
