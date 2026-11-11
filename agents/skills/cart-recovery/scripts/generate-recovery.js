/**
 * agents/skills/cart-recovery/scripts/generate-recovery.js
 * Genera secuencias de WhatsApp, SMS y respuestas rápidas para recuperación de carritos 100% agnósticas.
 */

const fs = require('fs');
const path = require('path');
const { logAutomation } = require('../../../../scripts/db');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function loadData() {
  const offerJsonPath = path.join(__dirname, '..', '..', '..', '..', 'data', 'active_offer.json');
  if (!fs.existsSync(offerJsonPath)) {
    throw new Error('No se encontro data/active_offer.json.');
  }
  return JSON.parse(fs.readFileSync(offerJsonPath, 'utf8'));
}

function buildRecoveryPack(offer, niche) {
  const productName = offer.product_name || 'Sistema Operativo Pro™';
  const mechanism = offer.unique_mechanism || 'Arquitectura de Sincronización Operativa™';
  const pain = (niche?.core_pain || offer.core_pain || 'fricción operativa, fatiga y dispersión').toLowerCase();
  const price = offer.price_usd || 37;
  const guarantee = offer.guarantee_days || 30;

  return `# Secuencias de Recuperación por WhatsApp y SMS
## Embudo de Conversión de Carrito Abandonado para: ${productName}

---

## 1. Secuencia Automatizada de WhatsApp (3 Toques)

### Mensaje 1 (15 Minutos Después del Abandono)
*Objetivo: Soporte empático, cero presión de venta.*

> "¡Hola [Nombre]! 👋\n\nSoy [Tu Nombre/Equipo] de ${productName}. Vi que estabas completando tu acceso pero no llegó a confirmarse el pago.\n\n¿Tuviste algún problema con la pasarela o la tarjeta? A veces los bancos solicitan confirmación adicional en compras online.\n\nSi necesitas ayuda para completar tu registro o prefieres abonar por otro medio (Stripe con tarjeta internacional o Mercado Pago en moneda local y cuotas), escríbeme por aquí y te paso el enlace directo 😊"

---

### Mensaje 2 (2 Horas Después)
*Objetivo: Derribar el miedo al riesgo (Garantía de ${guarantee} Días + App Móvil).*

> "Hola [Nombre], quería avisarte que tu acceso con el 84% de descuento ($${price} USD), la **App Móvil Material Design 3** y los **4 bonos exclusivos** sigue reservado a tu nombre por unas horas.\n\nRecuerda que no asumes ningún riesgo: tienes **${guarantee} días de garantía total**. Puedes entrar hoy, aplicar la Fase 1 de la ${mechanism} durante tus primeras 48 horas y, si no notas una mejora medible en tu enfoque y tiempo libre, nos mandas un mensaje y te devolvemos el 100% al instante.\n\n👉 Puedes reactivar tu pedido aquí: [Enlace_Checkout_Recuperacion]\n\n¿Tienes alguna duda sobre lo que incluye el sistema?"

---

### Mensaje 3 (24 Horas Después)
*Objetivo: Urgencia ética y despedida respetuosa.*

> "Último aviso, [Nombre] ⏳\n\nEn un rato liberaremos los accesos promocionales del ${productName} con los 4 bonos gratuitos.\n\nSi de verdad quieres cortar de raíz ${pain} con un sistema táctico de 15 minutos al día, este es el momento: luego el paquete volverá a su valor regular sin los aceleradores incluidos.\n\n👉 Accede antes del cierre: [Enlace_Checkout_Final]\n\nCualquier consulta estaré por aquí. ¡Te deseo un excelente día!"

---

## 2. Mensajes SMS de Alta Apertura (160 Caracteres)

### SMS 1 (A los 30 Minutos)
> "[Nombre], ¿tuviste problemas con tu pedido de ${productName}? Tu acceso + App + 4 bonos sigue reservado aquí: [link_corto]"

### SMS 2 (A las 6 Horas)
> "Garantía de ${guarantee} días activada para ti en ${productName}. Pruébalo sin riesgo hoy por $${price} USD: [link_corto]"

---

## 3. Respuestas Rápidas de WhatsApp Business (Quick Replies)

Configura estos atajos en los ajustes de WhatsApp Business para responder al instante:

- **/garantia**:
  > "Cuentas con ${guarantee} días de garantía incondicional. Si no te convence el método o no sientes resultados desde tus primeras 48 horas, te reembolsamos el 100% de tu dinero sin preguntas."
- **/metodos**:
  > "Aceptamos todas las tarjetas de crédito y débito vía Stripe, y pagos en moneda local, cuotas, transferencia o efectivo (OXXO, PagoFácil, Rapipago) vía Mercado Pago."
- **/entrega**:
  > "El acceso es 100% digital e inmediato. Apenas confirmas tu orden se desbloquean en pantalla y en tu correo el Manual Maestro, los 4 Bonos en PDF imprimible y la App Móvil Interactiva."
`;
}

function runRecoveryGeneration() {
  console.log('[cart-recovery] Starting Cart Recovery generation...');
  const data = loadData();
  const offer = data.reengineeredOffer || data.offer;
  const niche = data.niche;

  const nicheSlug = slugify(niche?.niche_name || offer.product_name || 'producto-activo');
  const recoveryDir = path.join(__dirname, '..', '..', '..', '..', 'recovery', nicheSlug);

  if (!fs.existsSync(recoveryDir)) {
    fs.mkdirSync(recoveryDir, { recursive: true });
  }

  const recoveryPack = buildRecoveryPack(offer, niche);
  const recoveryFilePath = path.join(recoveryDir, 'whatsapp-recovery-sequences.md');
  fs.writeFileSync(recoveryFilePath, recoveryPack, 'utf8');
  console.log(`[cart-recovery] Recovery Pack generated at: ${recoveryFilePath}`);

  try {
    logAutomation('cart-recovery', 'generate_recovery', 'success', {
      productName: offer.product_name,
      nicheSlug,
      file: 'whatsapp-recovery-sequences.md'
    });
  } catch (e) {
    console.warn('[cart-recovery] DB log skipped:', e.message);
  }

  console.log('[cart-recovery] Cart Recovery completed successfully.');
  return {
    recoveryDir,
    recoveryFilePath
  };
}

if (require.main === module) {
  try {
    runRecoveryGeneration();
  } catch (err) {
    console.error('[cart-recovery] Error:', err.message);
    process.exit(1);
  }
}

module.exports = {
  runRecoveryGeneration,
  buildRecoveryPack
};
