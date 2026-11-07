/**
 * agents/skills/cart-recovery/scripts/generate-recovery.js
 * Genera secuencias de WhatsApp, SMS y respuestas rápidas para recuperación de carritos.
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
  const productName = offer.product_name;
  const price = offer.price_usd || 37;
  const guarantee = offer.guarantee_days || 30;

  return `# Secuencias de Recuperación por WhatsApp y SMS
## Embudo de Conversión de Carrito Abandonado para: ${productName}

---

## 1. Secuencia Automatizada de WhatsApp (3 Toques)

### Mensaje 1 (15 Minutos Después del Abandono)
*Objetivo: Soporte empático, cero presión de venta.*

> "¡Hola [Nombre]! 👋\n\nSoy [Tu Nombre/Equipo] de ${productName}. Vi que estabas completando tu acceso pero no llegó a confirmarse el pago.\n\n¿Tuviste algún problema con la pasarela o la tarjeta? A veces los bancos bloquean compras internacionales por seguridad.\n\nSi necesitas ayuda para completar tu registro o prefieres pagar por otro medio (PayPal, transferencia local o efectivo), escríbeme y te genero un enlace alternativo 😊"

---

### Mensaje 2 (2 Horas Después)
*Objetivo: Derribar el miedo al fracaso o pérdida de dinero (Garantía).*

> "Hola [Nombre], quería avisarte que tu acceso con el 84% de descuento ($${price} USD) y los **4 bonos exclusivos** sigue reservado a tu nombre por unas horas.\n\nRecuerda que no asumes ningún riesgo: tienes **${guarantee} días de garantía total**. Puedes entrar, probar la Fase 1 del protocolo durante 3 semanas enteras y, si no notas una mejora tangible en tu inflamación y energía, nos mandas un mensaje y te devolvemos el 100% al instante.\n\n👉 Puedes reactivar tu pedido aquí: [Enlace_Checkout_Recuperacion]\n\n¿Tienes alguna duda sobre los contenidos de la guía?"

---

### Mensaje 3 (24 Horas Después)
*Objetivo: Urgencia ética y despedida respetuosa.*

> "Último aviso, [Nombre] ⏳\n\nEn un rato liberaremos los cupos promocionales del ${productName} para las personas en lista de espera.\n\nSi de verdad quieres dejar atrás la fatiga, el insomnio y la hinchazón abdominal, este es el momento: el precio volverá a su valor estándar sin los bonos incluidos.\n\n👉 Accede antes del cierre: [Enlace_Checkout_Final]\n\nCualquier consulta estaré por aquí. ¡Te deseo un excelente día!"

---

## 2. Mensajes SMS de Alta Apertura (160 Caracteres)

### SMS 1 (A los 30 Minutos)
> "[Nombre], ¿tuviste problemas con tu pedido de ${productName}? Tu cupo con 4 bonos sigue reservado aquí: [link_corto]"

### SMS 2 (A las 6 Horas)
> "Garantía de ${guarantee} días activada para ti en ${productName}. Pruébalo sin riesgo hoy por $${price} USD: [link_corto]"

---

## 3. Respuestas Rápidas de WhatsApp Business (Quick Replies)

Configura estos atajos en los ajustes de WhatsApp Business para responder al instante:

- **/garantia**:
  > "Cuentas con ${guarantee} días de garantía incondicional. Si no te convence el método o no sientes resultados, te reembolsamos el 100% de tu dinero sin preguntas."
- **/metodos**:
  > "Aceptamos tarjetas de crédito, débito, PayPal y según tu país también pagos en efectivo locales (OXXO en México, Efecty en Colombia, PagoFácil en Argentina, etc.)."
- **/entrega**:
  > "El acceso es 100% digital e inmediato. Recibes un correo electrónico con tu usuario y contraseña segundos después de confirmar tu pago para descargar el material a tu móvil o computadora."
`;
}

function runRecoveryGeneration() {
  console.log('[cart-recovery] Starting Cart Recovery generation...');
  const data = loadData();
  const offer = data.reengineeredOffer || data.offer;
  const niche = data.niche;

  const nicheSlug = slugify(niche.niche_name || 'salud-hormonal');
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
