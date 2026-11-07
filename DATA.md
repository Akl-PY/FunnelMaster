# DATA.md — Modelo y Mapa de Datos

Fuente única de verdad sobre los datos, entidades y esquemas manejados por FunnelMaster.
Los agentes consultan este documento para conocer la estructura y ubicación de la información antes de leer o escribir registros.

---

## 1. Entidades Principales

### `funnels`
Representa los embudos de conversión configurados en el sistema.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | VARCHAR / UUID | Identificador único del funnel |
| `name` | VARCHAR | Nombre descriptivo del embudo |
| `status` | VARCHAR | `draft`, `active`, `paused`, `archived` |
| `target_audience` | TEXT | Definición del perfil de cliente ideal (ICP) |
| `config` | JSONB | Parámetros específicos del funnel (URLs de entrada, webhooks, tags) |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Última actualización |

---

### `funnel_steps`
Etapas o pasos que componen un funnel (ej.: Landing page, Opt-in, VSL, Checkout, Thank You page).

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | VARCHAR / UUID | Identificador del paso |
| `funnel_id` | VARCHAR / UUID | FK a `funnels.id` |
| `step_order` | INTEGER | Posición secuencial en el flujo (1, 2, 3...) |
| `step_type` | VARCHAR | `landing`, `optin_form`, `survey`, `checkout`, `calendar_booking`, `thank_you` |
| `url` | TEXT | URL de destino o landing del paso |
| `selectors` | JSONB | Selectores DOM clave para validación y testing (inputs, botones CTA) |

---

### `leads`
Contactos y prospectos captados o procesados a través del embudo.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | VARCHAR / UUID | Identificador único del lead |
| `email` | VARCHAR | Correo electrónico principal |
| `first_name` | VARCHAR | Nombre del prospecto |
| `last_name` | VARCHAR | Apellido del prospecto |
| `phone` | VARCHAR | Teléfono / WhatsApp (opcional) |
| `funnel_id` | VARCHAR / UUID | FK al funnel de origen |
| `current_step_id` | VARCHAR / UUID | FK a la última etapa alcanzada |
| `status` | VARCHAR | `new`, `contacted`, `qualified`, `converted`, `lost` |
| `metadata` | JSONB | Atributos adicionales (respuestas a formularios, UTM tags, scoring) |

---

### `automation_logs`
Historial de ejecuciones de las skills y pruebas de navegación.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | VARCHAR / UUID | Identificador de la ejecución |
| `skill` | VARCHAR | Nombre de la skill (`browser-automation`, etc.) |
| `target_url` | TEXT | URL evaluada |
| `status` | VARCHAR | `success`, `failed`, `blocked_by_captcha`, `pending_auth` |
| `details` | JSONB | Diagnóstico de ejecución, tiempo de respuesta, errores capturados |
| `created_at` | TIMESTAMP | Timestamp del log |

---

## 2. Nicho y Oferta Activa (`active_niche`)

- **Nicho Activo**: Salud Hormonal y Perimenopausia (+35/+40)
- **Avatar Target**: Mujeres mayores de 35 años con fatiga, insomnio y niebla mental
- **Dolor Principal**: Cambios metabólicos y hormonales inexplicables sin respuesta médica clara
- **Volumen de Anuncios Activos**: ~28000 anuncios detectados en Meta Ads Library
- **Veredicto**: Ganador Absoluto (+100 anuncios) (super_winner)
- **Acción Estratégica**: Prioridad máxima: modelar de inmediato, factura +$100.000 USD/mes comprobables.
- **Competidor / Landing de Referencia**: https://balancehormonal.com/protocolo-vsl
- **Fecha de Validación**: 2026-11-07T19:19:53.014Z


## 2.1 Oferta Rediseñada Activa (`active_offer`)

- **Producto**: Protocolo Reset Hormonal 21™
- **Nueva Promesa Transformadora**: Desactiva la inflamación silenciosa y reactiva tu energía en 21 días sin pasar hambre ni medicación innecesaria
- **Mecanismo Único**: Sistema de Sincronización Metabólica por Fases (SMPF)™
- **Precio Frontend**: $37 USD (Valor total acumulado: $237 USD - Descuento del 84%)
- **Garantía Incondicional**: 30 días de riesgo cero
- **Pila de Bonos**:
  1. **Guía Rápida SOS: Eliminador de Sofocos e Insomnio Nocturno** (Valor: $29 USD) — Victoria rápida en las primeras 48 horas para dormir 7 horas continuas.
  2. **Recetario Antiinflamatorio de 15 Minutos para Mujeres Ocupadas** (Valor: $37 USD) — Elimina la fricción de cocinar; 30 comidas fáciles de preparar.
  3. **Calculadora de Balance Glucémico & Lista de Supermercado Anti-Niebla** (Valor: $27 USD) — Evita picos de insulina y quita la ansiedad de picotear entre comidas.
  4. **Checklist de Análisis Clínicos: Qué pedirle a tu médico y cómo interpretarlo** (Valor: $47 USD) — Empodera a la mujer ante su consulta médica con preguntas específicas.

## 3. Variables de Entorno (`.env`)

| Variable | Requerida | Propósito |
|---|---|---|
| `DATABASE_URL` | Opcional | Cadena de conexión PostgreSQL (en caso de persistencia relacional) |
| `BROWSER_HEADLESS` | Opcional | `true` (por defecto) o `false` para navegación visible |
| `LOG_LEVEL` | Opcional | Nivel de logging (`info`, `debug`, `error`) |
