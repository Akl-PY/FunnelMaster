/**
 * FunnelMaster Security Core
 * Distributed multi-file obfuscated hash validator for developer authorization.
 * 
 * Verifies developer credentials against obfuscated repository fragments.
 * Eliminates reliance on .env for the expected hash (which any user could modify).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Malformed obfuscated hash fragment A with noise symbols (? - _ { } + ´)
const SEC_FRAGMENT_A = 'd?3-8_5{5}5+b´b_c-7?8+6{0}5_d?b-3{2}+c´7_e-a?4+f';

/**
 * Removes all noise characters (? - _ { } + ´) and extracts clean hexadecimal string
 */
function deobfuscate(token) {
  if (!token || typeof token !== 'string') return '';
  return token.replace(/[^a-f0-9]/gi, '').toLowerCase();
}

/**
 * Loads all 3 distributed fragments and reconstructs the official authorization hash.
 * If any fragment is missing or tampered, throws an integrity error.
 */
function reconstructMasterHash() {
  // 1. Fragment A (Local in security.js)
  const partA = deobfuscate(SEC_FRAGMENT_A);
  if (!partA || partA.length !== 24) {
    throw new Error('ERROR DE INTEGRIDAD: El fragmento A de seguridad falta o fue alterado.');
  }

  // 2. Fragment B (In agents/skills/orchestrator/scripts/auth-guard.js)
  const guardPath = path.resolve(__dirname, '../agents/skills/orchestrator/scripts/auth-guard.js');
  if (!fs.existsSync(guardPath)) {
    throw new Error('ERROR DE INTEGRIDAD: Archivo de autenticacion auth-guard.js no encontrado.');
  }
  const { getSegmentB } = require(guardPath);
  const partB = deobfuscate(getSegmentB());
  if (!partB || partB.length !== 24) {
    throw new Error('ERROR DE INTEGRIDAD: El fragmento B de seguridad falta o fue alterado.');
  }

  // 3. Fragment C (In data/security/integrity.vault)
  const vaultPath = path.resolve(__dirname, '../data/security/integrity.vault');
  if (!fs.existsSync(vaultPath)) {
    throw new Error('ERROR DE INTEGRIDAD: Archivo de boveda de seguridad integrity.vault no encontrado.');
  }
  const vaultContent = fs.readFileSync(vaultPath, 'utf-8');
  const matchC = vaultContent.match(/VAULT_SIG_C=([^\r\n]+)/);
  if (!matchC) {
    throw new Error('ERROR DE INTEGRIDAD: Firma de boveda C no encontrada en integrity.vault.');
  }
  const partC = deobfuscate(matchC[1]);
  if (!partC || partC.length !== 16) {
    throw new Error('ERROR DE INTEGRIDAD: El fragmento C de seguridad falta o fue alterado.');
  }

  const masterHash = partA + partB + partC;
  if (masterHash.length !== 64 || !/^[a-f0-9]{64}$/.test(masterHash)) {
    throw new Error('ERROR DE INTEGRIDAD: El hash maestro reconstruido es invalido.');
  }

  return masterHash;
}

/**
 * Validates a candidate developer passcode against the reconstructed multi-file repository hash.
 * @param {string} [candidateKey] - The raw passcode string (e.g. from chat or process.env.PROGRAMMER_KEY)
 * @returns {{ authorized: boolean, reason?: string }}
 */
function verifyProgrammerKey(candidateKey) {
  const keyToTest = candidateKey || process.env.PROGRAMMER_KEY;

  if (!keyToTest || typeof keyToTest !== 'string' || keyToTest.trim() === '') {
    return {
      authorized: false,
      reason: 'No se suministro la clave del Programador (en chat ni en .env).'
    };
  }

  try {
    const masterHash = reconstructMasterHash();
    const candidateHash = crypto.createHash('sha256').update(keyToTest.trim()).digest('hex');

    if (candidateHash === masterHash) {
      return {
        authorized: true,
        message: 'Acceso de Programador verificado exitosamente mediante consenso multi-archivo.'
      };
    } else {
      return {
        authorized: false,
        reason: 'Clave de programador incorrecta.'
      };
    }
  } catch (err) {
    return {
      authorized: false,
      reason: err.message
    };
  }
}

module.exports = {
  deobfuscate,
  reconstructMasterHash,
  verifyProgrammerKey,
  SEC_FRAGMENT_A
};
