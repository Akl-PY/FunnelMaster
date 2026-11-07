/**
 * Niche validation logic according to 48h execution playbook (Steps #1 and #4).
 * Agnóstica: no hardcodea nichos, recibe métricas y devuelve veredictos.
 */

function evaluateAdVolume(activeAdsCount) {
  if (typeof activeAdsCount !== 'number' || activeAdsCount < 0) {
    throw new Error('activeAdsCount must be a non-negative number');
  }

  if (activeAdsCount <= 2) {
    return {
      status: 'rejected',
      label: 'Rechazado',
      action: 'Descartar nicho por falta de tracción comercial demostrable en anuncios activos.',
      canScale: false
    };
  }

  if (activeAdsCount <= 10) {
    return {
      status: 'testing',
      label: 'Comenzando',
      action: 'Nivel inicial de validación. Monitorear crecimiento de creativos.',
      canScale: false
    };
  }

  if (activeAdsCount <= 30) {
    return {
      status: 'validated',
      label: 'Validado',
      action: 'Oferta con ventas diarias sostenidas. Apta para modelar.',
      canScale: true
    };
  }

  if (activeAdsCount <= 100) {
    return {
      status: 'scaled',
      label: 'Oferta Escalada',
      action: 'Oferta madura y validada con alto volumen de presupuesto publicitario.',
      canScale: true
    };
  }

  return {
    status: 'super_winner',
    label: 'Ganador Absoluto (+100 anuncios)',
    action: 'Prioridad máxima: modelar de inmediato, factura +$100.000 USD/mes comprobables.',
    canScale: true
  };
}

function validateNicheCriteria(nicheData) {
  const requiredFields = ['nicheName', 'targetAvatar', 'corePain'];
  for (const field of requiredFields) {
    if (!nicheData[field] || typeof nicheData[field] !== 'string' || !nicheData[field].trim()) {
      return { valid: false, error: `Missing or invalid required field: ${field}` };
    }
  }

  // 100% agnóstico: no hay lista cerrada de macronichos ni nichos permitidos
  return { valid: true, error: null };
}

module.exports = {
  evaluateAdVolume,
  validateNicheCriteria
};
