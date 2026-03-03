/**
 * 🛡️ Middleware de Autorização por Cargo
 *
 * Hierarquia: ceo > admin > moderator > member
 * Uso: authorize('ceo', 'admin') — só permite CEO e Admin
 */

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Autenticação necessária.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso negado. Cargo insuficiente.' });
    }

    next();
  };
}

module.exports = authorize;
