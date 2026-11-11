---
name: traffic-launcher
description: Genera la estrategia y batería completa de creativos publicitarios para Meta Ads (Pasos #10 y #11 del plan de 48h). Produce guiones UGC/VSL segundo a segundo, copys persuasivos bajo Anti-LLM, ángulos de dolor, checkout setup y estructura de campaña de tráfico directo.
allowed-tools: read_file write_file
---

# Traffic Launcher & Checkout Strategist (Pasos #10 y #11 del Playbook de 48hs)

Esta skill toma el nicho activo, el dolor visceral, el Mecanismo Único y la oferta de [`DATA.md`](../../../DATA.md) para construir dos activos fundamentales de monetización:
1. **La Ingeniería del Checkout, Order Bump, Upsell y Pasarelas de Pago (Paso #10)**.
2. **La Batería de Creativos y Estructura de Campaña en Meta Ads (Paso #11)**.

---

## 1. Super Prompt Maestro — Paso #10 y #11: Monetización y Tráfico Directo (Playbook 48hs)

> *"Actúa como un Media Buyer Senior y Director Creativo de Respuesta Directa que administra presupuestos de +$100k USD/mes en Meta Ads y TikTok Ads. Necesito que diseñes:*
> 1. *La arquitectura de maximización de valor por cliente (AOV) en el checkout: Order Bump de impulso ($17 USD) y One-Click Upsell ($67 USD) con tasas de conversión proyectadas, más la guía de conexión rápida con Stripe y Mercado Pago.*
> 2. *Una batería de 5 ángulos publicitarios psicológicamente distintos para testear en frío (CBO/ABO 3:2:2), con sus respectivos guiones de video UGC/VSL desglosados segundo a segundo (0-3s Hook de interrupción, 4-15s Agitación visceral, 16-35s Revelación del Mecanismo Único, 36-45s Oferta y CTA con riesgo cero) y copys persuasivos libres de clichés de IA."*

---

## 2. Arquitectura Universal de 5 Ángulos Publicitarios (100% Agnóstica del Nicho)

Prohibido usar ángulos fijos de un solo nicho. Los 5 ángulos se generan dinámicamente a partir de los datos reales de la oferta activa:

1. **Ángulo 1 — Síntoma Silencioso / Dolor Directo**:
   - Expone la frustración cotidiana exacta que sufre el avatar y por qué ignorarla empeora el problema cada semana.
2. **Ángulo 2 — El Enemigo Común (Por qué las soluciones típicas fallan)**:
   - Desmitifica el consejo convencional de la industria y revela por qué solo actúa como un parche temporal.
3. **Ángulo 3 — Demostración del Mecanismo Único**:
   - Muestra cómo el nuevo sistema ataca la raíz del problema en 3 fases lógicas y en minutos al día.
4. **Ángulo 4 — Caso de Estudio / Antes vs. Después Cuantificado**:
   - Historia concreta de transición desde el bloqueo inicial hasta el resultado medible en las primeras 48-72 horas.
5. **Ángulo 5 — Choque Contraintuitivo + Pila de Valor Irresistible**:
   - Gancho paradójico seguido de la demostración por dentro del sistema, la App móvil incluida y los 4 bonos gratuitos.

---

## 3. Estructura de Guiones de Video UGC/Reels (Segundo a Segundo)

Cada guion generado en `traffic/<niche-slug>/meta-ads-campaign.md` especifica:
- **00:00 - 00:03 (Hook Visual + Verbal)**: Acción física en cámara (interrupción de scroll) + titular sobreimpreso en zona segura 9:16.
- **00:04 - 00:15 (Agitación Empática)**: Descripción del síntoma diario que hace decir al prospecto *"me está hablando a mí"*.
- **00:16 - 00:32 (Puente y Mecanismo Único)**: Introducción del método propietario y sus 3 fases.
- **00:33 - 00:45 (Oferta + Garantía + CTA)**: Anclaje de valor, mención de los 4 bonos + App móvil y llamado a hacer clic con Garantía de 30 días.

---

## 4. Configuración de Checkout y Pasarelas (`checkout-setup.md` y `stripe-mercadopago-setup.md`)

- **Producto Principal (Frontend)**: `$37 USD`.
- **Order Bump en el Checkout (1-clic checkbox)**: `$17 USD` (herramienta aceleradora que complementa la compra sin fricción).
- **Upsell Post-Compra**: `$67 USD` (implementación avanzada o auditoría).
- **Pasarelas Soportadas**:
  - **Stripe** (`STRIPE_PAYMENT_LINK`) para cobros internacionales con tarjeta en 1 clic.
  - **Mercado Pago** (`MP_CHECKOUT_URL`) para cobros locales en Latinoamérica (cuotas, transferencia, efectivo).

---

## 5. Ejecución

```bash
node agents/skills/traffic-launcher/scripts/generate-campaign.js
```
