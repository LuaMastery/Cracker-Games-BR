/**
 * 🎮 Cracker Games BR — Inicialização do Banco de Dados
 * Cria todas as tabelas e insere dados iniciais (seed)
 */

const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'cracker.db');

function initializeDatabase(Database) {
  const db = new Database(DB_PATH);

  // Habilitar WAL mode para melhor performance
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  console.log('📦 Inicializando banco de dados...');

  // ═══════════════════════════════════════
  //  CRIAÇÃO DAS TABELAS
  // ═══════════════════════════════════════

  db.exec(`
    -- Tabela de Usuários
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      display_name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      email TEXT,
      role TEXT NOT NULL DEFAULT 'member',
      steam_url TEXT,
      avatar_color TEXT DEFAULT '#3B82F6',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME,
      is_active INTEGER DEFAULT 1,
      is_online INTEGER DEFAULT 0
    );

    -- Tabela de Mensagens do Chat
    CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      message TEXT NOT NULL,
      message_type TEXT DEFAULT 'text',
      channel TEXT DEFAULT 'general',
      is_deleted INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- Tabela de Tarefas
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      assigned_to INTEGER,
      created_by INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      priority TEXT DEFAULT 'normal',
      signed_by TEXT,
      signed INTEGER DEFAULT 0,
      due_date TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME,
      FOREIGN KEY (assigned_to) REFERENCES users(id),
      FOREIGN KEY (created_by) REFERENCES users(id)
    );

    -- Tabela de Documentos
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      author_id INTEGER NOT NULL,
      is_public INTEGER DEFAULT 0,
      category TEXT DEFAULT 'general',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id)
    );

    -- Tabela do Cofre de Senhas
    CREATE TABLE IF NOT EXISTS vault_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      service_name TEXT NOT NULL,
      username TEXT,
      password_encrypted TEXT NOT NULL,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- Tabela de Notas Rápidas
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      color TEXT DEFAULT '#DBEAFE',
      position_x INTEGER DEFAULT 100,
      position_y INTEGER DEFAULT 100,
      width INTEGER DEFAULT 200,
      height INTEGER DEFAULT 150,
      is_shared INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- Tabela de Artigos da Wiki
    CREATE TABLE IF NOT EXISTS wiki_articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      author_id INTEGER NOT NULL,
      category TEXT DEFAULT 'general',
      is_published INTEGER DEFAULT 1,
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id)
    );

    -- Tabela de Log de Atividades
    CREATE TABLE IF NOT EXISTS activity_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      action TEXT NOT NULL,
      details TEXT,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- Tabela de Anúncios
    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author_id INTEGER NOT NULL,
      is_active INTEGER DEFAULT 1,
      priority TEXT DEFAULT 'normal',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id)
    );

    -- Índices para performance
    CREATE INDEX IF NOT EXISTS idx_chat_channel ON chat_messages(channel, created_at);
    CREATE INDEX IF NOT EXISTS idx_chat_user ON chat_messages(user_id);
    CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
    CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks(assigned_to);
    CREATE INDEX IF NOT EXISTS idx_documents_author ON documents(author_id);
    CREATE INDEX IF NOT EXISTS idx_vault_user ON vault_entries(user_id);
    CREATE INDEX IF NOT EXISTS idx_notes_user ON notes(user_id);
    CREATE INDEX IF NOT EXISTS idx_wiki_slug ON wiki_articles(slug);
    CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_log(user_id);
  `);

  console.log('✅ Tabelas criadas com sucesso!');

  // ═══════════════════════════════════════
  //  DADOS INICIAIS (SEED)
  // ═══════════════════════════════════════

  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;

  if (userCount === 0) {
    console.log('🌱 Inserindo dados iniciais...');

    const SALT_ROUNDS = 12;
    const insertUser = db.prepare(`
      INSERT INTO users (username, display_name, password_hash, role, steam_url, avatar_color)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const users = [
      {
        username: 'Doom Reaper',
        display_name: 'Doom Reaper',
        password: 'Rhu@an1730',
        role: 'ceo',
        steam_url: 'https://steamcommunity.com/id/deusacimadetodosamem',
        color: '#1E40AF'
      },
      {
        username: 'Muguetos',
        display_name: "MUGUETO's",
        password: 'Senha123',
        role: 'admin',
        steam_url: 'https://steamcommunity.com/profiles/76561197967635459/',
        color: '#2563EB'
      },
      {
        username: 'Mr. Suco',
        display_name: 'Mr. Suco',
        password: 'Senha123',
        role: 'admin',
        steam_url: 'https://steamcommunity.com/id/Sucow_ou_o_inutil/',
        color: '#3B82F6'
      }
    ];

    const insertMany = db.transaction((users) => {
      for (const user of users) {
        const hash = bcrypt.hashSync(user.password, SALT_ROUNDS);
        insertUser.run(user.username, user.display_name, hash, user.role, user.steam_url, user.color);
      }
    });

    insertMany(users);
    console.log('👤 Usuários padrão criados!');

    // Mensagem de boas-vindas no chat
    const systemUser = db.prepare('SELECT id FROM users WHERE role = ?').get('ceo');
    if (systemUser) {
      db.prepare(`
        INSERT INTO chat_messages (user_id, message, message_type, channel)
        VALUES (?, ?, ?, ?)
      `).run(
        systemUser.id,
        '🎮 Bem-vindo ao chat da Cracker Games BR! Respeite as regras e divirta-se! 💙',
        'system',
        'general'
      );
      console.log('💬 Mensagem de boas-vindas criada!');
    }

    // Artigos da Wiki
    const insertWiki = db.prepare(`
      INSERT INTO wiki_articles (title, content, slug, author_id, category)
      VALUES (?, ?, ?, ?, ?)
    `);

    const wikiArticles = [
      {
        title: '📄 História da Cracker Games BR',
        slug: 'historia',
        category: 'about',
        content: `<p>Tudo começou em meados de 2023, quando um jogador conhecido como <a href="https://steamcommunity.com/id/deusacimadetodosamem" target="_blank" style="color:#2563EB;font-weight:700">Doom Reaper</a> decidiu que estava cansado de jogar sozinho. Não que faltassem jogos — faltava aquela galera parceira, sabe? Gente pra rir junto, pra morrer junto no Garry's Mod, pra desenhar coisas absurdas no Gartic Phone.</p>
<p>Então ele criou um grupo na Steam. Simples assim. Sem pretensão de ser algo grande. Era só pra reunir uns amigos e jogar. Mas aí aconteceu o inesperado: o grupo começou a crescer. Pessoas de São Paulo, Rio de Janeiro, Minas Gerais, Bahia, Rio Grande do Sul... de todos os cantos do Brasil, jogadores foram chegando.</p>
<p>O próximo passo natural foi criar um servidor no Discord. E foi aí que o MUGUETO's entrou em cena. Com experiência em moderação e uma dedicação fora do comum, ele assumiu a administração do Discord e trouxe organização e estrutura pro que antes era um caos divertido.</p>
<p>Mr. Suco veio logo depois, trazendo sua experiência como admin veterano e se tornando uma das pessoas mais confiáveis da comunidade. Com o tempo, mais membros foram se destacando: Ric, mr.dan, jão da obra, Punkeleto, DAVID;), Deividsonboy — cada um contribuindo do seu jeito.</p>
<p>A Cracker Games BR passou por desafios, claro. Teve época que o servidor ficou vazio, que houve desentendimentos, que projetos não deram certo. Mas a comunidade sempre se manteve unida pelo que importa: a vontade de jogar e se divertir juntos.</p>
<p>Hoje, com mais de 500 membros ativos, 20+ jogos na lista e representantes de mais de 15 estados brasileiros (e até de outros países!), a Cracker Games BR é uma das comunidades gamers mais acolhedoras do Brasil. E o melhor: tudo isso é gratuito, feito por jogadores, para jogadores. 💙</p>`
      },
      {
        title: '📄 Regras da Comunidade',
        slug: 'regras',
        category: 'rules',
        content: `<ul>
<li><strong>Regra 1:</strong> Respeite todos os membros. Sem exceção. 🤝</li>
<li><strong>Regra 2:</strong> Nada de toxicidade. Crítica construtiva sim, xingamento não. 🚫</li>
<li><strong>Regra 3:</strong> Sem spam ou flood nos chats. 📵</li>
<li><strong>Regra 4:</strong> Conteúdo NSFW é proibido. 🔞❌</li>
<li><strong>Regra 5:</strong> Sem hacks, cheats ou trapaças nos jogos. 🎮</li>
<li><strong>Regra 6:</strong> Respeite a hierarquia (Admins e Mods existem pra ajudar, não pra enfeitar). 👮</li>
<li><strong>Regra 7:</strong> Divirta-se! Essa é obrigatória. 😄</li>
<li><strong>Regra 8:</strong> Problemas? Fale com um Admin. Não faça justiça com as próprias mãos. ⚖️</li>
<li><strong>Regra 9:</strong> Contas falsas ou secundárias para burlar bans resultam em ban permanente. 🔨</li>
<li><strong>Regra 10:</strong> O <a href="https://steamcommunity.com/id/deusacimadetodosamem" target="_blank" style="color:#2563EB;font-weight:700">Doom Reaper</a> tem a palavra final. 👑</li>
</ul>`
      },
      {
        title: '📄 Como Entrar na Comunidade',
        slug: 'como-entrar',
        category: 'guide',
        content: `<p><strong>Passo 1:</strong> Acesse o grupo da Steam pelo link ou pelo perfil do <a href="https://steamcommunity.com/id/deusacimadetodosamem" target="_blank" style="color:#2563EB;font-weight:700">Doom Reaper</a> e solicite entrada. ✅</p>
<p><strong>Passo 2:</strong> Entre no nosso servidor do Discord: <a href="https://discord.gg/FqBfC9kvDR" target="_blank" style="color:#2563EB;font-weight:700">discord.gg/FqBfC9kvDR</a> 💬</p>
<p><strong>Passo 3:</strong> Apresente-se no canal de boas-vindas! Diga seu nome, de onde é e o que gosta de jogar. 👋</p>
<p><strong>Passo 4:</strong> Leia as regras (sim, é importante!). 📖</p>
<p><strong>Passo 5:</strong> Jogue com a gente e divirta-se! É simples assim. 🎮</p>
<p>Não precisa pagar nada, não precisa ter convite especial, não precisa ser pro gamer. Basta ter vontade de se divertir! 😄</p>`
      },
      {
        title: '📄 Lista de Admins e Mods Atuais',
        slug: 'staff',
        category: 'staff',
        content: `<p><strong>👑 CEO & Fundador:</strong></p>
<ul><li><a href="https://steamcommunity.com/id/deusacimadetodosamem" target="_blank" style="color:#2563EB;font-weight:700">Doom Reaper</a> — Fundador, CEO & Criador</li></ul>
<p><strong>⭐ Administradores:</strong></p>
<ul>
<li><a href="https://steamcommunity.com/profiles/76561197967635459/" target="_blank" style="color:#2563EB;font-weight:700">MUGUETO's</a> — Admin & Ex-CEO de Projetos (Moderador do Discord)</li>
<li><a href="https://steamcommunity.com/id/Sucow_ou_o_inutil/" target="_blank" style="color:#2563EB;font-weight:700">Mr. Suco</a> — Administrador Veterano</li>
</ul>
<p><strong>🛡️ Moderadores:</strong></p>
<p>Estamos recrutando! Confira a seção de Vagas para saber como se candidatar. 🚀</p>`
      },
      {
        title: '📄 Projetos em Andamento',
        slug: 'projetos',
        category: 'projects',
        content: `<p><strong>🔧 Servidor de Garry's Mod:</strong> Estamos trabalhando em um servidor próprio de GMod com modos customizados! Em breve mais novidades. 🚧</p>
<p><strong>🎮 Eventos Semanais:</strong> Jogatinas organizadas toda semana com jogos variados. Fique ligado no Discord para participar! 📅</p>
<p><strong>🌐 Site Oficial v2.0:</strong> Agora com backend real, chat em tempo real e workspace completo! ✨</p>
<p><strong>📺 Canal de Conteúdo:</strong> Estamos planejando criar conteúdo em vídeo com os melhores momentos da comunidade. Em breve! 🎬</p>
<p><strong>🤝 Expansão de Parcerias:</strong> Buscando novas comunidades parceiras para eventos conjuntos e crossovers! 🌟</p>`
      },
      {
        title: '📄 FAQ — Perguntas Frequentes',
        slug: 'faq',
        category: 'faq',
        content: `<p><strong>🌎 Posso entrar mesmo sendo de outro país?</strong><br>Claro! Só lembre que a maioria fala português. Mas a gente se vira!</p>
<p><strong>💰 Precisa pagar algo?</strong><br>NADA! A Cracker Games BR é 100% gratuita. Sempre foi, sempre será. 💙</p>
<p><strong>🛡️ Como viro Admin/Mod?</strong><br>Confira a seção de Vagas!</p>
<p><strong>🎮 Preciso ser bom em jogos pra entrar?</strong><br>De jeito nenhum! Aqui a gente joga por diversão. Se você é competitivo, ótimo. Se não, também é ótimo. O importante é se divertir!</p>
<p><strong>📱 Funciona no celular?</strong><br>O Discord funciona no celular e no PC. A Steam também! Então sim, pode participar de qualquer lugar.</p>
<p><strong>👥 Quantos membros têm?</strong><br>Mais de 500 membros ativos entre Steam e Discord!</p>
<p><strong>🕐 Tem horário fixo pras jogatinas?</strong><br>A gente costuma jogar mais à noite e nos finais de semana, mas sempre tem alguém online!</p>
<p><strong>🚫 Fui banido injustamente, o que faço?</strong><br>Entre em contato com um Admin pelo email rhuancillo@gmail.com e explique a situação. A gente revisa!</p>
<p><strong>🎂 A comunidade existe desde quando?</strong><br>Desde 2023! E estamos crescendo todo dia.</p>
<p><strong>❤️ Como posso ajudar a comunidade?</strong><br>Sendo ativo, convidando amigos, participando dos eventos e sendo uma pessoa legal! É simples assim. 😄</p>`
      }
    ];

    const insertWikiMany = db.transaction((articles) => {
      for (const article of articles) {
        insertWiki.run(article.title, article.content, article.slug, systemUser.id, article.category);
      }
    });

    insertWikiMany(wikiArticles);
    console.log('📚 Artigos wiki criados!');

    console.log('🌱 Dados iniciais inseridos com sucesso!');
  } else {
    console.log('📦 Banco de dados já possui dados, pulando seed.');
  }

  return db;
}

module.exports = { initializeDatabase, DB_PATH };
