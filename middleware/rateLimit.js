/**
 * ⏱️ Rate Limiting — Prevenir spam e abuso
 */

const rateLimit = require('express-rate-limit');

// Rate limit global: 200 requests por minuto por IP
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  message: { error: 'Muitas requisições. Tente novamente em 1 minuto.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limit para autenticação: 15 tentativas por 15 minutos
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limit para chat: 60 mensagens por minuto
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Muitas mensagens. Calma! 😅' },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { globalLimiter, authLimiter, chatLimiter };
