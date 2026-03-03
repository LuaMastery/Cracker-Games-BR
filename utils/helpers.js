/**
 * 🛠️ Cracker Games BR — Funções Auxiliares
 */

const xss = require('xss');

/**
 * Sanitizar string contra XSS
 */
function sanitize(input) {
  if (typeof input !== 'string') return input;
  return xss(input.trim());
}

/**
 * Validar username (3-30 chars, alfanumérico + espaço + ponto + underscore)
 */
function isValidUsername(username) {
  return typeof username === 'string' && /^[a-zA-Z0-9 _.]{3,30}$/.test(username);
}

/**
 * Validar senha (mínimo 4 caracteres)
 */
function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 4;
}

/**
 * Validar email
 */
function isValidEmail(email) {
  if (!email) return true; // email é opcional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Gerar slug a partir de texto
 */
function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Formatar data para exibição
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

module.exports = {
  sanitize,
  isValidUsername,
  isValidPassword,
  isValidEmail,
  generateSlug,
  formatDate
};
