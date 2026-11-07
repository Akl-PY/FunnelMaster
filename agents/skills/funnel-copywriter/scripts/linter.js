/**
 * Anti-LLM and Structure Linter for sales funnels.
 * Asegura que ningún copy caiga en lugares comunes de IA y contenga los 11 bloques.
 */

const FORBIDDEN_CLICHES = [
  'desbloquea tu potencial',
  'en el vertiginoso mundo actual',
  'en el vertiginoso mundo de hoy',
  'sin duda alguna',
  'lleva tu negocio al siguiente nivel',
  'embarcate en este viaje',
  'revolucionario metodo',
  'un tapiz de posibilidades'
];

const REQUIRED_BLOCKS = [
  'headline',
  'lead_pain',
  'quick_wins',
  'about_product',
  'target_audience',
  'social_proof',
  'solution_demo',
  'bonuses',
  'value_stack_offer',
  'authority_bio',
  'faq'
];

function checkAntiLlmRules(copyText) {
  if (!copyText || typeof copyText !== 'string') {
    return { passed: false, violations: ['Copy must be a non-empty string'] };
  }

  const lower = copyText.toLowerCase();
  const violations = [];

  for (const cliche of FORBIDDEN_CLICHES) {
    if (lower.includes(cliche)) {
      violations.push(`Contiene cliché prohibido de IA: "${cliche}"`);
    }
  }

  // Count em-dashes
  const emDashCount = (copyText.match(/—/g) || []).length;
  if (emDashCount > 3) {
    violations.push(`Uso excesivo de em-dashes (—): detectados ${emDashCount}, máximo permitido 3.`);
  }

  return {
    passed: violations.length === 0,
    violations
  };
}

function checkRequiredBlocks(blocksObject) {
  const missing = [];
  for (const block of REQUIRED_BLOCKS) {
    if (!blocksObject[block]) {
      missing.push(block);
    }
  }

  return {
    complete: missing.length === 0,
    missing
  };
}

module.exports = {
  checkAntiLlmRules,
  checkRequiredBlocks,
  REQUIRED_BLOCKS,
  FORBIDDEN_CLICHES
};
