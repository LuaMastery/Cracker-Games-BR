/**
 * 🔐 Cracker Games BR — Utilitários de Criptografia
 */

const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

const SALT_ROUNDS = 12;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'CrackerVaultKey2024SecureX32Ch!!';

/**
 * Hashear senha com bcrypt
 */
function hashPassword(password) {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

/**
 * Verificar senha contra hash bcrypt
 */
function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

/**
 * Criptografar texto com AES-256 (para o cofre de senhas)
 */
function encryptVault(text, userId) {
  const key = ENCRYPTION_KEY + '-' + userId;
  return CryptoJS.AES.encrypt(text, key).toString();
}

/**
 * Descriptografar texto AES-256
 */
function decryptVault(ciphertext, userId) {
  try {
    const key = ENCRYPTION_KEY + '-' + userId;
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return '***erro ao descriptografar***';
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  encryptVault,
  decryptVault
};
