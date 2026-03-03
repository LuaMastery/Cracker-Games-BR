/**
 * 💬 Rotas REST do Chat
 */

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const { chatLimiter } = require('../middleware/rateLimit');

module.exports = function(db) {

  // GET /api/chat/messages?channel=general&limit=50&before=id
  router.get('/messages', authenticate, authorize('ceo', 'admin', 'moderator'), (req, res) => {
    try {
      const channel = req.query.channel || 'general';
      const limit = Math.min(parseInt(req.query.limit) || 50, 100);
      const before = parseInt(req.query.before) || null;

      // Canal admin é restrito
      if (channel === 'admin' && !['ceo', 'admin'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Acesso negado ao canal admin.' });
      }

      let query, params;
      if (before) {
        query = `
          SELECT m.*, u.username, u.display_name, u.role, u.avatar_color
          FROM chat_messages m
          JOIN users u ON m.user_id = u.id
          WHERE m.channel = ? AND m.is_deleted = 0 AND m.id < ?
          ORDER BY m.created_at DESC LIMIT ?
        `;
        params = [channel, before, limit];
      } else {
        query = `
          SELECT m.*, u.username, u.display_name, u.role, u.avatar_color
          FROM chat_messages m
          JOIN users u ON m.user_id = u.id
          WHERE m.channel = ? AND m.is_deleted = 0
          ORDER BY m.created_at DESC LIMIT ?
        `;
        params = [channel, limit];
      }

      const messages = db.prepare(query).all(...params);
      res.json({ messages: messages.reverse() });
    } catch (err) {
      console.error('Erro ao buscar mensagens:', err);
      res.status(500).json({ error: 'Erro ao buscar mensagens.' });
    }
  });

  // DELETE /api/chat/messages/:id
  router.delete('/messages/:id', authenticate, authorize('ceo', 'admin', 'moderator'), (req, res) => {
    try {
      const msg = db.prepare('SELECT * FROM chat_messages WHERE id = ?').get(req.params.id);
      if (!msg) return res.status(404).json({ error: 'Mensagem não encontrada.' });

      // Apenas autor, admin ou ceo pode deletar
      if (msg.user_id !== req.user.id && !['ceo', 'admin'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Sem permissão para deletar esta mensagem.' });
      }

      db.prepare('UPDATE chat_messages SET is_deleted = 1 WHERE id = ?').run(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar mensagem.' });
    }
  });

  // GET /api/chat/channels
  router.get('/channels', authenticate, authorize('ceo', 'admin', 'moderator'), (req, res) => {
    const channels = [
      { id: 'general', name: '# geral', description: 'Chat principal da equipe', icon: '💬' },
      { id: 'games', name: '# jogos', description: 'Discussões sobre jogos', icon: '🎮' },
      { id: 'offtopic', name: '# off-topic', description: 'Conversa livre', icon: '☕' }
    ];

    if (['ceo', 'admin'].includes(req.user.role)) {
      channels.push({ id: 'admin', name: '# admin', description: 'Canal restrito da administração', icon: '🔒' });
    }

    res.json({ channels });
  });

  return router;
};
