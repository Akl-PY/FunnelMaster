---
name: cart-recovery
description: Genera secuencias de recuperación de carritos abandonados para WhatsApp y SMS. Aumenta la conversión del checkout mediante guiones persuasivos, manejo de objeciones y respuestas rápidas.
allowed-tools: read_file write_file
---

# Cart Recovery Agent 📱 — Psicología de Recuperación de Ventas por WhatsApp y SMS

Esta skill maximiza el retorno sobre la inversión publicitaria (ROAS) recuperando entre el 25% y el 40% de las personas que visitan `/checkout` pero abandonan antes de completar el pago en Stripe o Mercado Pago.

---

## 1. Cadencia Conductual de 3 Toques (`whatsapp-recovery-sequences.md`)

Los mensajes se adaptan dinámicamente al producto activo, su promesa, su precio y sus bonos:

### Toque 1 — Minuto 15 (Enfoque de Servicio al Cliente, Cero Presión)
- **Objetivo**: Detectar fallos técnicos en la tarjeta o dudas simples de acceso.
- **Estructura**: Saludo cercano por nombre, confirmación de que su acceso al sistema y a los 4 bonos quedó reservado temporalmente, y pregunta abierta de una sola línea (*"¿Tuviste algún inconveniente con el enlace de pago o te quedó alguna duda sobre cómo funciona el sistema?"*).

### Toque 2 — Hora 2 (Derribo de la Objeción Principal + Victoria en 48h)
- **Objetivo**: Desactivar el miedo a "comprar algo más que no voy a usar".
- **Estructura**: Recordatorio de que el método está diseñado para ejecutarse en bloques de 10-15 minutos usando la App móvil incluida, más énfasis en el **Bono #1 de acción inmediata** y la **Garantía Incondicional de 30 Días**.

### Toque 3 — Hora 24 (Aversión a la Pérdida Ética y Liberación de Cupo)
- **Objetivo**: Cerrar a los indecisos antes de expirar los bonos gratuitos de lanzamiento.
- **Estructura**: Aviso directo y respetuoso indicando que el paquete de 4 bonos gratuitos + precio especial de `$37 USD` está por cerrarse para su reserva, con enlace directo al checkout con sus datos pre-cargados.

---

## 2. Matriz de Respuestas Rápidas para Cierre por Chat (WhatsApp Quick Replies)

Incluye guiones listos para copiar/pegar en WhatsApp Business ante las 4 preguntas más frecuentes antes de pagar:
- `/tiempo`: Respuesta para quienes dicen *"no tengo tiempo en el día"*.
- `/garantia`: Explicación transparente del reembolso en 1 clic durante 30 días.
- `/metodos-pago`: Instrucciones para pagar con tarjeta internacional (Stripe) o moneda local/cuotas (Mercado Pago).
- `/interior`: Resumen de acceso inmediato al Manual Maestro, los 4 Bonos y la App Móvil.

---

## 3. Secuencia Corta por SMS (<160 caracteres)
- 3 mensajes ultra-concisos con enlace directo de retorno al checkout para recuperación omnicanal.

---

## 4. Ejecución

```bash
node agents/skills/cart-recovery/scripts/generate-recovery.js
```
