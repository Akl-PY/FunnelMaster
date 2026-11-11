---
name: orchestrator
description: Orquestador maestro de FunnelMaster. Guía al usuario en el plan de 48 horas, coordina la ejecución de las skills especializadas, gestiona la persistencia en base de datos (SQLite/PostgreSQL) y asiste ante restricciones de navegador con /browser.
allowed-tools: Bash(node:*) Bash(npm:*) read_file write_file edit_file
---

# FunnelMaster Orchestrator 🎯

Skill central de orquestación. Actúa como el copiloto director del flujo completo, guiando al usuario paso a paso, gestionando las transiciones entre skills y asegurando la persistencia de datos y la resolución de contingencias.

---

## 0. Protocolo de Seguridad, Roles y Blindaje de Código (Regla #27)

> [!IMPORTANT]
> **Detección de Roles y Autenticación Criptográfica**:
> 1. **Premisa de Usuario por Defecto**: Cualquier saludo o inicio de sesión proviene por defecto de un **Usuario Creador / Emprendedor No-Programador**. El orquestador opera 100% en lenguaje de negocios amigable (Regla #16).
> 2. **Blindaje de Código Crítico**: Si el usuario NO está autenticado como "El Programador", el orquestador tiene **TERMINANTEMENTE PROHIBIDO** modificar la arquitectura del repositorio, alterar código fuente crítico en `agents/skills/*/scripts/`, compiladores o suites de tests. Solo puede ejecutar comandos existentes para generar embudos y guardar configuraciones en `DATA.md` y `data/`.
> 3. **Autenticación de El Programador**: Solo si el usuario envía la frase:
>    `soy El Programador [codigo]`
>    el agente calcula el hash SHA-256 (`crypto.createHash('sha256').update(codigo).digest('hex')`) y lo compara contra `PROGRAMMER_KEY_HASH` en `.env`. Únicamente si el hash coincide con `d38555bbc78605db32c7ea4f96ad7497161451898a6c090b070e8f3c79c6b903`, se habilitan permisos para modificar código fuente crítico, arquitectura o infraestructura.

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

## 2. Protocolo de Navegador Guiado, Sandbox y Contingencias (`/browser`)

> [!IMPORTANT]
> **Aislamiento de Terminal Sandbox y Subagente `/browser` para Acompañamiento Visual y Despliegues**:
> Si al ejecutar navegaciones el navegador en modo visual (`--headed`) no aparece en pantalla (debido a las restricciones de renderizado GUI dentro del sandbox de Antigravity), o para asistir en despliegues a producción en Vercel, el orquestador cuenta con el subagente nativo de navegación visual de Antigravity. El orquestador **DEBE invitar proactivamente al usuario a utilizar `/browser`** en dos momentos cruciales:
> 
> 1. **Acompañamiento en Despliegue en Vercel (Producción)**:  
>    Para crear la cuenta en Vercel, iniciar sesión, conectar el repositorio y dejar el embudo publicado en internet con HTTPS sin fricciones técnicas.
> 2. **Superación de Barreras Humanas, Cloudflare y Captchas**:  
>    Si al inspeccionar páginas protegidas por Cloudflare o requerir autenticación manual el navegador headless queda bloqueado en el sandbox, el orquestador instruye al usuario a activar:
>    👉 **/browser**
>    Esto permite interactuar visualmente con la página, resolver captchas o completar formularios respetando la privacidad del usuario.

---

## 3. Mandato de Ejecución Fáctica por Terminal (Cero Simulación)

> [!CAUTION]
> **Prohibido Simular Ejecuciones en el Chat**:
> El orquestador tiene estrictamente prohibido responder con texto improvisado o resultados que no provengan de la ejecución real de un script. Cada paso del embudo DEBE ser ejecutado mediante comandos de terminal reales (`run_command`), verificando código de salida 0 y persistencia física en `data/` y en la base de datos SQLite/Postgres antes de mostrar nada al usuario.

---

## 4. Hoja de Ruta de Orquestación (Flujo de 48h)

El orquestador guía al usuario siguiendo esta secuencia estructurada:

### Fase 1: Selección, Moneda, Ticket y Validación de Nicho
- [ ] Inicializar la base de datos (`scripts/db.js`).
- [ ] **Inicio 100% Abierto (Regla 17)**: Prohibido ofrecer menús cerrados o listas prefijadas de nichos (ej.: "Opción A, B, C o D"). Preguntar al usuario qué mercado, habilidad, producto o cliente desea abordar, o permitirle ingresar cualquier palabra clave libre.
- [ ] **Calibración de Moneda y Ticket (Regla 26)**: Preguntar al usuario en qué moneda desea operar (USD $, EUR €, MXN $, ARS $, COP $, etc.) y a qué rango de ticket apunta su oferta (Low-ticket de impulso $17–$37, Mid-ticket $47–$147, o Ticket superior con acompañamiento).
- [ ] **Precios Realistas**: Asesorar con puntos de precio de alta conversión y anclajes matemáticos creíbles (evitar cifras absurdas o infladas que arruinen la credibilidad).
- [ ] Si el usuario pide exploración autónoma, investigar tendencias en vivo o sobre la industria que él indique, sin recitar nichos hardcodeados de plantillas.
- [ ] Ejecutar [`niche-discovery`](../niche-discovery/SKILL.md) para auditar anunciantes en vivo en Meta Ads Library mediante `browser-automation`.
- [ ] Si los anuncios activos son $\ge 10$ (validado) o $+100$ (ganador absoluto), persistir el registro con `saveNiche()`.

### Fase 2: Ingeniería Inversa y Rediseño de Oferta
- [ ] Tomar la URL de la página de venta del competidor validado.
- [ ] Invocar [`offer-reengineer`](../offer-reengineer/SKILL.md).
- [ ] Extraer DOM con `browser-automation` o `/browser`.
- [ ] Desglosar la oferta y construir la nueva promesa, mecanismo único, pila de bonos específicos y precios adaptados a la moneda y ticket seleccionados.
- [ ] Persistir la oferta rediseñada con `saveOffer()`.

### Fase 3: Redacción del Copy del Embudo
- [ ] Invocar [`funnel-copywriter`](../funnel-copywriter/SKILL.md).
- [ ] Redactar los 11 bloques del *Hero's Journey* bajo reglas estrictas Anti-LLM.
- [ ] Guardar el documento en `funnels/<niche-slug>/copy.md`.

### Fase 4: Construcción Web Dinámica (Playbook de 48hs) y Lanzamiento
- [ ] Invocar [`prompt-web-maker`](../prompt-web-maker/SKILL.md) para generar el *Perfect Prompt* meticuloso del Paso #8 del Playbook de 48hs en `funnels/<niche-slug>/web-builder-prompt.txt`.
- [ ] Invocar [`landing-builder`](../landing-builder/SKILL.md) para generar la landing page interactiva en `/funnel` con arquitectura dinámica, diseño visual por arquetipo, integración de checkout con pasarelas globales y locales (Stripe y Mercado Pago) y preservación estricta de UTMs.
- [ ] Invocar [`app-maker`](../app-maker/SKILL.md) para construir la aplicación móvil de acompañamiento en `/app` y su Super Prompt de IA en `/app/app-super-prompt.md`.
- [ ] Invocar [`product-generator`](../product-generator/SKILL.md) para redactar el infoproducto y los entregables de los bonos.

### Fase 5: Despliegue Asistido a Producción en Vercel con `/browser`
- [ ] Invitar proactivamente al usuario a publicar su embudo en la nube con Vercel.
- [ ] Instruir o invocar el comando especial:
  👉 **/browser**
- [ ] Acompañar visualmente al usuario:
  1. Abrir `https://vercel.com/signup` en el navegador para registro o login con GitHub/Google.
  2. Ejecutar el despliegue del proyecto `/funnel` mediante Vercel CLI (`npx vercel --cwd funnel`) o vinculación de repositorio.
  3. Verificar la URL pública HTTPS generada y comprobar que el Quiz, Checkout y preservación de UTMs funcionen en producción.
  4. Entregar el enlace público final al usuario listo para recibir tráfico de Meta Ads.

---

## 5. Comunicación Amigable para Personas sin Conocimientos de Programación (No-Code First)
- El orquestador debe comunicarse siempre con lenguaje claro, cercano, comprensible y 100% orientado a negocios. El usuario final nunca ha programado ni tiene por qué lidiar con tecnicismos.
- **Prohibido mencionar nombres de archivos con extensión (`.js`, `.ts`, `.astro`, `.json`, rutas relativas o comandos confusos)** al dirigirse al usuario en el chat.
- Referirse a los entregables por su valor real de negocio:
  - *Tu Página de Ventas* (en vez de hablar de archivos o código de landing)
  - *Tu Test de Diagnóstico Interactivo* (en vez de scripts de quiz)
  - *Tu Pasarela de Pago y Ofertas de Compra Rápida* (en vez de scripts de checkout)
  - *Tu Sistema de Implementación y Bonos de Regalo* (en vez de scripts de producto)
  - *Tu Aplicación Móvil de Bolsillo* (en vez de archivos PWA)
  - *Tus Anuncios para Redes Sociales con Guiones en Video* (en vez de scripts de tráfico)
  - *Tus Correos de Venta y Nutrición Automáticos* (en vez de secuencias de email en código)
  - *Tus Mensajes de WhatsApp y Respuestas Automáticas en Instagram* (en vez de JSONs o flujos)
  - *Tu Panel de Control y Registro de Clientes* (en vez de base de datos)
- Presentar avances claros, resúmenes en lenguaje cotidiano y enlaces directos para hacer clic y ver el resultado en pantalla.

---

## 6. Arquitectura de Cadena de Super Prompts y Filtro Anti-Genérico (Reglas 20 y 21)

El orquestador garantiza que cada skill estratégica genere un **Super Prompt / Blueprint Maestro** y lo pase a la siguiente skill ejecutora:
1. **Prohibido el Cliché de "21 Días" y Plantillas Mad-Libs**: Ninguna oferta, titular o componente puede usar rellenos mecánicos como *"Resuelve [Dolor] en 21 días"* ni nombres terminados en *"21™"*, ni concatenaciones gramaticales rotas (*"Si eres Profesionales..."*).
2. **Inyección Real de Copy y Super Prompt**: `landing-builder` debe leer e inyectar íntegramente `copy.md` y las especificaciones de `web-builder-prompt.txt` para construir los **12 módulos interactivos de alta conversión** (Top Status Bar, Split Hero con Simulador en Vivo, Auditoría de 4 Síntomas, Timeline de Victorias Rápidas, Calculadora/Simulador Interactivo del Arquetipo, Matriz Comparativa Viejo vs. Nuevo, Mecanismo Único en 3 Fases, Filtro de Audiencia 2 Columnas, Radiografía del Sistema + App Móvil, 3 Casos de Estudio Cuantificados, Pila de Bonos + Bóveda de Oferta Stripe/Mercado Pago, y Acordeón FAQ de 6 Objeciones + Sticky Mobile CTA).

---

## 7. Prohibición de Reciclar Bonos y Ejemplos Ilustrativos de los `.md` (Regla #24)
- **Todo bono, mecanismo, fase, calculadora o gancho escrito dentro de `AGENTS.md` o de cualquier `SKILL.md` es ESTRICTAMENTE UN EJEMPLO ILUSTRATIVO** para explicar el formato y nivel de profundidad esperado.
- **Queda terminantemente prohibido copiar o reutilizar los mismos nombres de bonos** entre un proyecto/nicho y otro. Cada vez que se diseñe una oferta desde cero, los bonos, fases y entregables deben inventarse 100% a medida del dolor, vocabulario y objeciones reales de ese nicho específico.

---

## 8. Validación Obligatoria de Calidad
Antes de cerrar cualquier etapa, el orquestador verifica:
1. Que no existan datos ficticios, nichos hardcodeados, bonos reciclados de ejemplos ni textos genéricos de 2 líneas.
2. Que los tests unitarios e integrados pasen al 100%:
   ```bash
   npm test
   ```
