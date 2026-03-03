/**
 * 🔐 Rotas de Autenticação
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { hashPassword, verifyPassword } = require('../utils/encryption');
const { sanitize, isValidUsername, isValidPassword, isValidEmail } = require('../utils/helpers');
const { authenticate } = require('../middleware/authenticate');
const { authLimiter } = require('../middleware/rateLimit');

module.exports = function(db) {

  // POST /api/auth/login
  router.post('/login', authLimiter, (req, res) => {
    try {
      const username = sanitize(req.body.username);
      const password = req.body.password;

      if (!username || !password) {
        return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
      }

      const user = db.prepare('SELECT * FROM users WHERE username = ? AND is_active = 1').get(username);

      if (!user || !verifyPassword(password, user.password_hash)) {
        return res.status(401).json({ error: 'Usuário ou senha incorretos.' });
      }

      // Atualizar last_login e is_online
      db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP, is_online = 1 WHERE id = ?').run(user.id);

      // Log de atividade
      db.prepare('INSERT INTO activity_log (user_id, action, details, ip_address) VALUES (?, ?, ?, ?)')
        .run(user.id, 'login', 'Login realizado', req.ip);

      // Gerar JWT
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role, display_name: user.display_name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || '7d' }
      );

      // Setar cookie httpOnly
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
      });

      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          display_name: user.display_name,
          role: user.role,
          steam_url: user.steam_url,
          avatar_color: user.avatar_color,
          email: user.email
        },
        token
      });
    } catch (err) {
      console.error('Erro no login:', err);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  });

  // POST /api/auth/register
  router.post('/register', authLimiter, (req, res) => {
    try {
      const username = sanitize(req.body.username);
      const display_name = sanitize(req.body.display_name || req.body.username);
      const password = req.body.password;
      const email = sanitize(req.body.email || '');
      const setup_key = req.body.setup_key;

      if (!isValidUsername(username)) {
        return res.status(400).json({ error: 'Username inválido (3-30 caracteres alfanuméricos).' });
      }
      if (!isValidPassword(password)) {
        return res.status(400).json({ error: 'Senha deve ter no mínimo 4 caracteres.' });
      }
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Email inválido.' });
      }

      const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
      if (existing) {
        return res.status(409).json({ error: 'Este nome de usuário já está em uso.' });
      }

      // Determinar role
      let role = 'member';
      if (setup_key === process.env.ADMIN_SETUP_KEY) {
        role = 'admin';
      }

      const hash = hashPassword(password);
      const result = db.prepare(`
        INSERT INTO users (username, display_name, password_hash, email, role)
        VALUES (?, ?, ?, ?, ?)
      `).run(username, display_name, hash, email, role);

      // Log
      db.prepare('INSERT INTO activity_log (user_id, action, details, ip_address) VALUES (?, ?, ?, ?)')
        .run(result.lastInsertRowid, 'register', 'Conta criada', req.ip);

      // Gerar JWT
      const token = jwt.sign(
        { id: result.lastInsertRowid, username, role, display_name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || '7d' }
      );

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({
        success: true,
        user: { id: result.lastInsertRowid, username, display_name, role, email },
        token
      });
    } catch (err) {
      console.error('Erro no registro:', err);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  });

  // POST /api/auth/logout
  router.post('/logout', authenticate, (req, res) => {
    try {
      db.prepare('UPDATE users SET is_online = 0 WHERE id = ?').run(req.user.id);
      db.prepare('INSERT INTO activity_log (user_id, action, ip_address) VALUES (?, ?, ?)')
        .run(req.user.id, 'logout', req.ip);
      res.clearCookie('jwt');
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao fazer logout.' });
    }
  });

  // GET /api/auth/me
  router.get('/me', authenticate, (req, res) => {
    try {
      const user = db.prepare('SELECT id, username, display_name, role, email, steam_url, avatar_color, created_at, last_login FROM users WHERE id = ?').get(req.user.id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
      res.json({ user });
    } catch (err) {
      res.status(500).json({ error: 'Erro interno.' });
    }
  });

  // PUT /api/auth/profile
  router.put('/profile', authenticate, (req, res) => {
    try {
      const display_name = sanitize(req.body.display_name);
      const email = sanitize(req.body.email || '');
      const steam_url = sanitize(req.body.steam_url || '');
      const avatar_color = sanitize(req.body.avatar_color || '#3B82F6');

      if (!display_name || display_name.length < 2) {
        return res.status(400).json({ error: 'Nome deve ter pelo menos 2 caracteres.' });
      }

      db.prepare(`
        UPDATE users SET display_name = ?, email = ?, steam_url = ?, avatar_color = ? WHERE id = ?
      `).run(display_name, email, steam_url, avatar_color, req.user.id);

      res.json({ success: true, message: 'Perfil atualizado!' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar perfil.' });
    }
  });

  // PUT /api/auth/password
  router.put('/password', authenticate, (req, res) => {
    try {
      const { current_password, new_password } = req.body;

      if (!current_password || !new_password) {
        return res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias.' });
      }
      if (!isValidPassword(new_password)) {
        return res.status(400).json({ error: 'Nova senha deve ter no mínimo 4 caracteres.' });
      }

      const user = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user.id);
      if (!verifyPassword(current_password, user.password_hash)) {
        return res.status(401).json({ error: 'Senha atual incorreta.' });
      }

      const newHash = hashPassword(new_password);
      db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, req.user.id);

      db.prepare('INSERT INTO activity_log (user_id, action, ip_address) VALUES (?, ?, ?)')
        .run(req.user.id, 'password_change', req.ip);

      res.json({ success: true, message: 'Senha alterada com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao alterar senha.' });
    }
  });

  return router;
};
