/**
 * 🔒 Middleware de Autenticação JWT
 */

const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  // Buscar token no cookie OU no header Authorization
  let token = req.cookies?.jwt;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Autenticação necessária. Faça login.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
      display_name: decoded.display_name
    };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      res.clearCookie('jwt');
      return res.status(401).json({ error: 'Sessão expirada. Faça login novamente.' });
    }
    return res.status(401).json({ error: 'Token inválido.' });
  }
}

/**
 * Middleware opcional — não bloqueia se não estiver autenticado
 */
function optionalAuth(req, res, next) {
  let token = req.cookies?.jwt;
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    }
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role,
        display_name: decoded.display_name
      };
    } catch (e) { /* sem autenticação, tudo bem */ }
  }
  next();
}

module.exports = { authenticate, optionalAuth };
