# Configuración de Checkout y Embudo de Ventas (Paso #10)
## Producto Principal: Sistema Liquidez Soberana & Cero Deudas™

---

## 1. Ficha Técnica para Pasarelas (Stripe / Mercado Pago / Hotmart / LemonSqueezy)

| Parámetro | Valor Configurado |
| :--- | :--- |
| **Nombre del Producto** | Sistema Liquidez Soberana & Cero Deudas™ |
| **Vertical / Mercado** | Finanzas Personales y Eliminación de Deudas |
| **Precio Frontend** | $37 USD |
| **Moneda** | USD (Stripe Internacional) y Moneda Local / Cuotas (Mercado Pago LATAM) |
| **Tipo de Pago** | Pago único · Acceso inmediato y de por vida |
| **Garantía Incondicional** | 30 días (Riesgo Cero) |
| **Formato de Entrega** | App Móvil Interactiva Material Design 3 + 5 Manuales PDF/HTML Imprimibles |

---

## 2. Configuración de Entregables en Checkout

Asignar los siguientes activos generados en `products/` y `/app`:
1. **Archivo Core**: `master-guide.md` / `/docs/master-guide.html` (Manual Operativo Maestro en 3 Fases).
2. **Aplicación Móvil Interactiva**: `/app/index.html` (PWA Google Material Design 3 con Temporizador y Audio 432Hz).
3. **Bono 1**: Guiones de Negociación Bancaria para Congelar Intereses y Quitas de Deuda (Valor: $29 USD)
4. **Bono 2**: Kit de Automatización de Sueldo en 4 Bóvedas (Sin Excel ni Anotar Gastos Diarios) (Valor: $37 USD)
5. **Bono 3**: Simulador Matemático de Liquidación Acelerada: Bola de Nieve vs. Avalancha Inversa (Valor: $27 USD)
6. **Bono 4**: Protocolo de Blindaje para Meses de Vacas Flacas, Imprevistos o Ingresos Variables (Valor: $47 USD)

---

## 3. Estrategia de Maximizadores de Beneficio (AOV Boosters)

### Order Bump (En la misma página de pago - Checkbox 1-Click)
- **Producto**: *Pack SOS de Implementación Acelerada en 3 Minutos + Plantillas Ejecutivas Extra*
- **Precio**: $17 USD
- **Copy de Activación**:
  > *"⚡ ¡SÍ! Quiero añadir el Pack SOS de Implementación Acelerada para Finanzas Personales y Eliminación de Deudas por solo $17 USD (Descuento del 60%). Incluye hojas de chequeo rápido y plantillas de rescate para días de máxima urgencia."*
- **Tasa de Adopción Estimada**: 35% - 45% de los compradores.

### Upsell 1 (One-Click Upsell tras la compra)
- **Producto**: *Bóveda VIP de Auditoría y Casos Avanzados de la Arquitectura de Blindaje de Sueldo y Avalancha Inversa (ABAI)™*
- **Precio**: $67 USD (o 3 cuotas de $25)
- **Promesa**: *Acceso directo a protocolos avanzados de automatización, plantillas de escala y actualizaciones prioritarias.*

---

## 4. Configuración de Tracking y Webhooks
- **Pixel de Meta Ads**: Evento `InitiateCheckout` en la carga del formulario y `Purchase` en la confirmación de orden.
- **Parámetros UTM obligatorios**: Asegurar que la pasarela reciba y devuelva `utm_source`, `utm_medium`, `utm_campaign` y `utm_content` en el webhook de compra para atribución exacta de ROAS.
