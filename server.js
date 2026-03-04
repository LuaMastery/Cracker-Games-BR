const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Configuração CORS (permite GitHub Pages acessar o backend)
app.use(cors({ origin: '*' }));
app.use(express.json());

// Inicia Socket.IO para Chat em Tempo Real
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Inicializar Banco de Dados SQLite
const db = new sqlite3.Database('./cracker.db', (err) => {
  if (err) console.error("Erro ao conectar no banco:", err.message);
  else console.log("Conectado ao SQLite!");
});

// Criar Tabelas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender TEXT,
    content TEXT,
    type TEXT,
    role TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    assignedTo TEXT,
    status TEXT,
    signedBy TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    title TEXT,
    content TEXT,
    author TEXT,
    date TEXT
  )`);

  // Inserir Admin Padrão
  db.get(`SELECT * FROM users WHERE username = 'Doom Reaper'`, (err, row) => {
    if (!row) {
      const hash = bcrypt.hashSync('Rhu@an1730', 10);
      db.run(`INSERT INTO users (username, password, role) VALUES ('Doom Reaper', ?, 'CEO')`, hash);
    }
  });
});

// ================= ROTAS DE AUTENTICAÇÃO =================
app.post('/api/register', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Dados inválidos" });
  
  const hash = bcrypt.hashSync(password, 10);
  const userRole = role || 'Moderador'; // Cargo padrão para novas contas

  db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`, [username, hash, userRole], function(err) {
    if (err) return res.status(400).json({ error: "Usuário já existe" });
    res.json({ success: true, user: { username, role: userRole } });
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
    if (err || !row) return res.status(401).json({ error: "Usuário não encontrado" });
    
    if (bcrypt.compareSync(password, row.password)) {
      res.json({ success: true, user: { username: row.username, role: row.role } });
    } else {
      res.status(401).json({ error: "Senha incorreta" });
    }
  });
});

// ================= ROTAS DE DADOS (WORKSPACE) =================
// Tarefas
app.get('/api/tasks', (req, res) => {
  db.all(`SELECT * FROM tasks`, (err, rows) => {
    res.json(rows || []);
  });
});

app.post('/api/tasks', (req, res) => {
  const t = req.body;
  db.run(`INSERT OR REPLACE INTO tasks (id, title, description, assignedTo, status, signedBy) VALUES (?, ?, ?, ?, ?, ?)`, 
    [t.id, t.title, t.description, t.assignedTo, t.status, t.signedBy], 
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      io.emit('workspaceUpdate', { type: 'tasks' });
      res.json({ success: true });
    }
  );
});

// Documentos
app.get('/api/documents', (req, res) => {
  db.all(`SELECT * FROM documents`, (err, rows) => {
    res.json(rows || []);
  });
});

app.post('/api/documents', (req, res) => {
  const d = req.body;
  db.run(`INSERT OR REPLACE INTO documents (id, title, content, author, date) VALUES (?, ?, ?, ?, ?)`, 
    [d.id, d.title, d.content, d.author, d.date], 
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      io.emit('workspaceUpdate', { type: 'documents' });
      res.json({ success: true });
    }
  );
});

// ================= WEBSOCKET CHAT =================
io.on('connection', (socket) => {
  console.log('Um usuário conectou ao CrackerOS:', socket.id);

  // Enviar histórico ao conectar
  db.all(`SELECT * FROM messages ORDER BY timestamp ASC LIMIT 100`, (err, rows) => {
    socket.emit('chatHistory', rows || []);
  });

  // Receber nova mensagem
  socket.on('sendMessage', (msgData) => {
    // msgData: { sender, content, type, role }
    const { sender, content, type, role } = msgData;
    db.run(`INSERT INTO messages (sender, content, type, role) VALUES (?, ?, ?, ?)`, 
      [sender, content, type, role], 
      function(err) {
        if (!err) {
          const newMsg = { id: this.lastID, sender, content, type, role, timestamp: new Date().toISOString() };
          io.emit('newMessage', newMsg); // Envia para TODOS (multiplayer/real-time)
        }
      }
    );
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`🎮 Servidor Cracker Games BR rodando na porta \${PORT}\`);
  console.log(\`Acesse a API em: http://localhost:\${PORT}/api\`);
});
