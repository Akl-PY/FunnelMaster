# Configuración de Checkout y Embudo de Ventas (Paso #10)
## Producto Principal: Protocolo Reset Hormonal 21™

---

## 1. Ficha Técnica para Plataforma (Hotmart / Shopify / LemonSqueezy)

| Parámetro | Valor Configurado |
| :--- | :--- |
| **Nombre del Producto** | Protocolo Reset Hormonal 21™ |
| **Categoría** | Salud / Bienestar / Estilo de Vida |
| **Precio Frontend** | $37 USD |
| **Moneda** | USD (con conversión local automática activada) |
| **Tipo de Pago** | Pago único / Acceso de por vida |
| **Garantía Incondicional** | 30 días |
| **Formato de Entrega** | Área de miembros Hotmart Club o descarga directa protegida |

---

## 2. Configuración de Entregables en Checkout

Asignar los siguientes archivos generados en `products/`:
1. **Archivo Core**: `master-guide.md` (Guía Maestra de 21 Días).
2. **Bono 1**: Guía Rápida SOS: Eliminador de Sofocos e Insomnio Nocturno (Valor: $29 USD)
3. **Bono 2**: Recetario Antiinflamatorio de 15 Minutos para Mujeres Ocupadas (Valor: $37 USD)
4. **Bono 3**: Calculadora de Balance Glucémico & Lista de Supermercado Anti-Niebla (Valor: $27 USD)
5. **Bono 4**: Checklist de Análisis Clínicos: Qué pedirle a tu médico y cómo interpretarlo (Valor: $47 USD)

---

## 3. Estrategia de Maximizadores de Beneficio (AOV Boosters)

### Order Bump (En la misma página de pago - Checkbox 1-Click)
- **Producto**: *Pack de 10 Audios Guiados de Desactivación del Cortisol Nocturno (5 Minutos)*
- **Precio**: $17 USD
- **Copy de Activación**:
  > *"Sí, quiero añadir los Audios SOS de Activación Vagal por solo $17 USD (Descuento del 60%). Ayuda a inducir el sueño delta en menos de 7 minutos sin pantallas."*
- **Tasa de Adopción Estimada**: 35% - 45% de los compradores.

### Upsell 1 (One-Click Upsell tras la compra)
- **Producto**: *Comunidad VIP de Soporte y Sesiones Quincenales de Preguntas y Respuestas (Acceso Trimestral)*
- **Precio**: $67 USD (o 3 cuotas de $25)
- **Promesa**: *Acceso directo a resolución de dudas sobre analíticas, recetas personalizadas y acompañamiento.*

---

## 4. Configuración de Tracking y Webhooks
- **Pixel de Meta Ads**: Evento `InitiateCheckout` en la carga del formulario y `Purchase` en la página de agradecimiento.
- **Parámetros UTM obligatorios**: Asegurar que la pasarela reciba y devuelva `utm_source`, `utm_medium`, `utm_campaign` y `utm_content` en el webhook de compra para atribución exacta de ROAS.
