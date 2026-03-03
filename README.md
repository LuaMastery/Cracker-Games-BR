# 🎮 Cracker Games BR — Site Oficial da Comunidade

<div align="center">

![Cracker Games BR](https://img.shields.io/badge/Cracker%20Games%20BR-Comunidade%20Gamer-1E40AF?style=for-the-badge&logo=gamepad&logoColor=white)
![Status](https://img.shields.io/badge/Status-Online%20✅-3B82F6?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-1.0.0-60A5FA?style=for-the-badge)
![Licença](https://img.shields.io/badge/Licença-Todos%20os%20Direitos%20Reservados-1D4ED8?style=for-the-badge)

**O site oficial da comunidade gamer brasileira onde você faz amizades, joga junto e se diverte!**

[🌐 Acessar o Site](#) · [💬 Discord](https://discord.gg/FqBfC9kvDR) · [🔵 Steam](https://steamcommunity.com/id/deusacimadetodosamem) · [📧 Contato](mailto:rhuancillo@gmail.com)

</div>

---

## 📋 Índice

- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🏗️ Estrutura do Site](#️-estrutura-do-site)
- [🖥️ CrackerOS — Área de Trabalho](#️-crackeros--área-de-trabalho)
- [🌐 Sistema de Idiomas](#-sistema-de-idiomas)
- [🎨 Design e Estilo](#-design-e-estilo)
- [📱 Responsividade](#-responsividade)
- [🔧 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🚀 Como Usar](#-como-usar)
- [🔐 Contas de Acesso (Workspace)](#-contas-de-acesso-workspace)
- [🗂️ Armazenamento de Dados](#️-armazenamento-de-dados)
- [🥚 Easter Eggs](#-easter-eggs)
- [🤝 Equipe](#-equipe)
- [📞 Contato](#-contato)
- [👑 Créditos](#-créditos)

---

## 📖 Sobre o Projeto

A **Cracker Games BR** é uma comunidade brasileira de jogadores fundada por **[Doom Reaper](https://steamcommunity.com/id/deusacimadetodosamem)**. O site foi desenvolvido como uma **Single Page Application (SPA)** completa em um **único arquivo HTML**, contendo todo o CSS e JavaScript embutidos.

O objetivo do site é servir como a presença online oficial da comunidade, oferecendo:

- 📌 Informações sobre a comunidade e como participar
- 🎮 Catálogo dos jogos que a comunidade joga
- 👥 Apresentação da equipe e membros veteranos
- 📚 Wiki com documentos públicos (regras, FAQ, história)
- 🚀 Seção de recrutamento para novas vagas
- 🖥️ Sistema de gestão interna (CrackerOS) para admins e moderadores

### 🎯 Filosofia do Projeto

> *"Aqui a gente joga, ri, e faz amizade de verdade. Não importa de onde você é — se curtir jogar, seu lugar é aqui! 😄"*

O site foi projetado para transmitir uma vibe **amigável, acolhedora e divertida** — como um servidor de Discord bem organizado transformado em site. Nada de linguagem corporativa; aqui é tudo na base da amizade.

---

## ✨ Funcionalidades

### 🌟 Funcionalidades Públicas (Site Principal)

| Funcionalidade | Descrição |
|---|---|
| 🎬 **Tela de Loading** | Animação de carregamento com logo e barra de progresso ao abrir o site |
| 📢 **Banner Ticker** | Banner scrollante no topo anunciando vagas abertas (clicável) |
| 🧭 **Navbar Fixa** | Navegação fixa no topo com efeito glassmorphism e blur |
| 🌐 **10 Idiomas** | Sistema completo de tradução dinâmica com persistência |
| 🌙 **Modo Claro/Escuro** | Alternância de tema com salvamento automático |
| 🎆 **Partículas Animadas** | Efeito de partículas flutuantes no hero section |
| 📊 **Estatísticas** | Cards com números da comunidade (500+ membros, 20+ jogos, etc.) |
| 🎮 **Catálogo de Jogos** | 20 jogos com cards interativos e sistema "mostrar mais" |
| 👥 **Página da Equipe** | Cards da equipe com hierarquia visual e links para Steam |
| 🤝 **Parcerias** | Seção dedicada a comunidades parceiras |
| 📚 **Wiki Interativa** | 6 documentos expansíveis com busca em tempo real |
| 🚀 **Recrutamento** | Seção de vagas com destaque visual e botão de candidatura |
| ⬆️ **Voltar ao Topo** | Botão flutuante que aparece ao scrollar |
| 🎉 **Easter Egg** | Animação secreta de confetes (descubra como ativar!) |
| 👁️ **Animações de Scroll** | Elementos aparecem com fade-in ao scrollar (Intersection Observer) |
| 📈 **Contador de Visitantes** | Contador simulado no rodapé |

### 🔒 Funcionalidades Privadas (CrackerOS)

| App | Descrição |
|---|---|
| 📋 **Tarefas** | Lista completa de tarefas com status, responsáveis e filtros |
| 📄 **Documentos** | Editor e gerenciador de documentos internos |
| 🔑 **Cofre de Senhas** | Gerenciador de senhas com mostrar/ocultar e copiar |
| 💬 **Chat Interno** | Sistema de chat com emojis rápidos |
| 📊 **Painel de Status** | Dashboard com resumo de atividades e gráficos |
| 📝 **Notas Rápidas** | Post-its virtuais arrastáveis no desktop |
| ⚙️ **Configurações** | Personalização do workspace e gerenciamento de dados |

---

## 🏗️ Estrutura do Site

O site é organizado nas seguintes seções, todas acessíveis via navegação na navbar:

```
🎮 Cracker Games BR
│
├── 📢 Banner Ticker (topo — vagas abertas)
├── 🧭 Navbar (fixa, glassmorphism)
│   ├── Logo
│   ├── Links de navegação (8 seções)
│   ├── Seletor de idioma (10 idiomas)
│   ├── Toggle de tema (claro/escuro)
│   └── Botão "Entrar" (login)
│
├── 🏠 Seção 1: Hero / Início
│   ├── Título e subtítulo animados
│   ├── Partículas de fundo
│   ├── Botões (Discord + Steam)
│   └── Badge de vagas abertas
│
├── 🤔 Seção 2: Sobre Nós
│   ├── Texto da história
│   └── Cards de estatísticas (4 cards)
│
├── 🎮 Seção 3: Jogos Populares
│   ├── 20 cards de jogos
│   ├── 3 jogos em destaque
│   └── Botão "mostrar todos"
│
├── ✨ Seção 4: Nossa Equipe
│   ├── 👑 Fundador & CEO (Doom Reaper)
│   ├── ⭐ Administradores (MUGUETO's, Mr. Suco)
│   └── 🎮 Jogadores Veteranos (6 membros)
│
├── 📍 Seção 5: Comunidade / Grupos
│   ├── Card do Grupo Steam
│   └── Card do Servidor Discord
│
├── 🤝 Seção 6: Parcerias
│   ├── Server Beta Tester
│   ├── Grupo de Projetos
│   └── GMOD MAGMA (parceria histórica)
│
├── 📚 Seção 7: Wiki / Documentos
│   ├── Barra de busca
│   ├── 📄 História da Cracker Games BR
│   ├── 📄 Regras da Comunidade
│   ├── 📄 Como Entrar na Comunidade
│   ├── 📄 Lista de Admins e Mods
│   ├── 📄 Projetos em Andamento
│   └── 📄 FAQ — Perguntas Frequentes
│
├── 🚀 Seção 8: Vagas / Recrutamento
│   ├── Banner destacado
│   ├── Vaga: Moderador
│   ├── Vaga: Administrador
│   └── Botão de candidatura (mailto)
│
├── 📎 Rodapé
│   ├── Links rápidos
│   ├── Créditos
│   └── Contador de visitantes
│
└── 🔒 Modal de Login → CrackerOS (ver seção abaixo)
```

---

## 🖥️ CrackerOS — Área de Trabalho

O **CrackerOS** é um mini sistema operacional que roda dentro do navegador, acessível apenas por login. Ele foi projetado para servir como ferramenta de gestão interna da equipe da Cracker Games BR.

### 🔄 Fluxo de Acesso

```
Clicar em "Área de Trabalho 🔒" ou "Entrar"
        │
        ▼
   Modal de Login
   (Usuário + Senha)
        │
        ▼
  ┌─ Autenticação ─┐
  │                 │
  ❌ Erro          ✅ Sucesso
  │                 │
  Mensagem          ▼
  de erro     CrackerOS Desktop
              (site principal oculto)
```

### 🖥️ Interface do CrackerOS

```
┌──────────────────────────────────────────────────┐
│          🎮 Cracker Games BR (watermark)         │
│                                                  │
│  📋 Tarefas    📄 Documentos    🔑 Cofre         │
│                                                  │
│  💬 Chat       📊 Painel       📝 Notas          │
│                                                  │
│  ⚙️ Config                                       │
│                                                  │
│  ┌─── Janela Aberta ──────────────────┐          │
│  │ ▄▄▄ Título                 _ □ ✕  │          │
│  │                                    │          │
│  │   (Conteúdo do App)                │          │
│  │                                    │          │
│  └────────────────────────────────────┘          │
│                                                  │
├──────────────────────────────────────────────────┤
│ ☰ Início │ [apps abertos] │ User (Cargo) │ 🕐  │
└──────────────────────────────────────────────────┘
```

### 📋 Apps Disponíveis

#### 1. Lista de Tarefas
- ➕ Criar tarefas com título, descrição e responsável
- 🔄 Alterar status: Pendente → Em Progresso → Concluído
- 🗑️ Excluir tarefas
- 🔍 Filtrar por status
- 💾 Dados persistentes no localStorage

#### 2. Documentos
- ✍️ Criar e editar documentos com título e conteúdo
- 📅 Data e autor automáticos
- 🗑️ Excluir documentos
- 💾 Dados persistentes no localStorage

#### 3. Cofre de Senhas
- 🔐 Armazenar credenciais (serviço, usuário, senha, notas)
- 👁️ Mostrar/ocultar senhas
- 📋 Copiar senha para clipboard
- ⚠️ Aviso de demonstração incluído
- 💾 Dados persistentes no localStorage

#### 4. Chat Interno
- 💬 Enviar mensagens com nome de usuário e horário
- 😀 Painel de emojis rápidos (👍 ❤️ 😂 🎮 ✅ ❌ 🔥 👋)
- 📜 Histórico de mensagens
- 💾 Dados persistentes no localStorage
- 📜 [Log de desenvolvimento do chat](development_chat_log.md)

#### 5. Painel de Status (Dashboard)
- 📊 Cards com resumo: tarefas pendentes, em progresso, concluídas, documentos
- 📈 Gráfico de barras CSS mostrando distribuição de tarefas
- 👥 Lista da equipe com status

#### 6. Notas Rápidas
- 📝 Criar post-its coloridos no desktop
- 🖱️ Arrastar livremente pela tela
- ✏️ Editar conteúdo em tempo real
- 🗑️ Excluir notas
- 💾 Posição e conteúdo salvos no localStorage

#### 7. Configurações
- ✏️ Alterar nome de exibição
- 🎨 Alternar tema claro/escuro
- 🗑️ Limpar todos os dados do localStorage
- ℹ️ Informações sobre o CrackerOS

### 🪟 Sistema de Janelas

Todas as janelas do CrackerOS possuem:

| Recurso | Descrição |
|---|---|
| 🖱️ **Arrastar** | Clique na barra de título e arraste para mover |
| ➖ **Minimizar** | Botão amarelo — oculta a janela (visível na taskbar) |
| 🔲 **Maximizar** | Botão verde — expande para tela cheia |
| ❌ **Fechar** | Botão vermelho — fecha a janela completamente |
| 📌 **Z-Index** | Clicar em uma janela traz ela para frente |
| 📱 **Responsivo** | Em mobile, janelas ocupam tela cheia automaticamente |

---

## 🌐 Sistema de Idiomas

O site suporta **10 idiomas** com tradução dinâmica de todos os textos da interface:

| Idioma | Código | Bandeira |
|---|---|---|
| Português (Brasil) | `pt` | 🇧🇷 |
| English | `en` | 🇺🇸 |
| Español | `es` | 🇪🇸 |
| Français | `fr` | 🇫🇷 |
| Deutsch | `de` | 🇩🇪 |
| 日本語 (Japonês) | `ja` | 🇯🇵 |
| 한국어 (Coreano) | `ko` | 🇰🇷 |
| 中文 (Chinês) | `zh` | 🇨🇳 |
| Русский (Russo) | `ru` | 🇷🇺 |
| Italiano | `it` | 🇮🇹 |

### Como funciona:
1. Os textos traduzíveis possuem o atributo `data-i18n="chave"`
2. Um objeto JavaScript `T` contém todas as traduções organizadas por idioma
3. A função `setLang(código)` atualiza todos os textos dinamicamente
4. A preferência de idioma é salva no `localStorage`
5. O idioma padrão é Português (Brasil)

---

## 🎨 Design e Estilo

### Paleta de Cores

O site utiliza **exclusivamente** tons de branco e azul:

| Cor | Hex | Uso |
|---|---|---|
| Azul 900 | `#1E3A8A` | Backgrounds escuros, gradientes |
| Azul 800 | `#1E40AF` | Navbar, elementos primários |
| Azul 700 | `#1D4ED8` | Botões, acentos principais |
| Azul 600 | `#2563EB` | Botões hover, links |
| Azul 500 | `#3B82F6` | Destaques, ícones |
| Azul 400 | `#60A5FA` | Elementos secundários |
| Azul 300 | `#93C5FD` | Textos no modo escuro |
| Azul 200 | `#BFDBFE` | Badges, fundos suaves |
| Azul 100 | `#DBEAFE` | Hover states, backgrounds |
| Azul 50 | `#EFF6FF` | Fundos muito claros |
| Branco | `#FFFFFF` | Fundo principal (modo claro) |
| Cinza 50 | `#F8FAFC` | Fundo alternativo |
| Cinza 900 | `#0F172A` | Fundo principal (modo escuro) |

### Princípios de Design

- **Glassmorphism** — Cards com `backdrop-filter: blur(20px)` e fundo semi-transparente
- **Bordas arredondadas** — `border-radius: 16px` a `24px`
- **Sombras suaves** — Box-shadows com tons de azul
- **Gradientes** — Do azul escuro ao azul claro
- **Animações sutis** — Hover effects, fade-in no scroll, transições suaves
- **Tipografia** — Google Fonts [Nunito](https://fonts.google.com/specimen/Nunito) (400, 600, 700, 800, 900)

### Temas

| Aspecto | ☀️ Modo Claro | 🌙 Modo Escuro |
|---|---|---|
| Fundo | `#FFFFFF` | `#0F172A` |
| Texto | `#0F172A` | `#FFFFFF` |
| Cards | `rgba(255,255,255,0.7)` | `rgba(30,58,138,0.4)` |
| Bordas | `rgba(59,130,246,0.2)` | `rgba(96,165,250,0.3)` |
| Navbar | `rgba(255,255,255,0.8)` | `rgba(15,23,42,0.85)` |

---

## 📱 Responsividade

O site é totalmente responsivo e funciona em todos os dispositivos:

### Breakpoints

| Dispositivo | Largura | Adaptações |
|---|---|---|
| 📱 **Mobile** | < 768px | Menu hambúrguer, cards empilhados, janelas tela cheia |
| 📱 **Tablet** | 768px — 1024px | Menu hambúrguer, 2 colunas, fontes reduzidas |
| 💻 **Desktop** | > 1024px | Layout completo, todas as features visíveis |

### Adaptações Mobile

- ☰ Menu hambúrguer substitui links da navbar
- 📱 Cards empilham em coluna única
- 🖥️ Janelas do CrackerOS ocupam tela cheia automaticamente
- 📊 Grids adaptam para menos colunas
- 🔤 Fontes reduzem proporcionalmente

---

## 🔧 Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica do site |
| **CSS3** | Estilização completa (variáveis CSS, grid, flexbox, animações, glassmorphism) |
| **JavaScript (Vanilla)** | Toda a lógica (sem frameworks) |
| **Google Fonts** | Tipografia (Nunito) |
| **localStorage** | Persistência de dados no navegador |
| **Intersection Observer API** | Animações de scroll |
| **CSS Animations** | Partículas, ticker, fade-in, hover effects |
| **Drag & Drop (JS)** | Janelas e notas arrastáveis |

### 📦 Zero Dependências Externas

O site funciona com **zero frameworks ou bibliotecas externas**. Tudo foi desenvolvido em HTML, CSS e JavaScript puro (vanilla). A única dependência externa é o Google Fonts, que possui fallback para `sans-serif`.

---

## 🚀 Como Usar

### Visualizar o Site

1. **Abra o arquivo** `index.html` em qualquer navegador moderno
2. Pronto! O site funciona 100% offline (exceto Google Fonts)

```bash
# Opção 1: Abrir diretamente
# Dê um duplo clique no arquivo index.html

# Opção 2: Usar um servidor local (recomendado)
# Com Python:
python -m http.server 8000

# Com Node.js (npx):
npx serve .

# Com PHP:
php -S localhost:8000
```

3. Acesse `http://localhost:8000` no navegador

### Navegação do Site

1. 🖱️ Use a **navbar** fixa no topo para navegar entre seções
2. 🌐 Clique no ícone **🌐** para mudar o idioma
3. 🌙 Clique no ícone **🌙/☀️** para alternar o tema
4. 📢 Clique no **banner ticker** para ir à seção de vagas
5. 🔒 Clique em **"Entrar"** para acessar o CrackerOS

### Acessar o CrackerOS

1. Clique em **"Entrar"** ou **"Área de Trabalho 🔒"**
2. Insira um usuário e senha válidos (ver tabela abaixo)
3. Explore os apps do sistema!
4. Clique em **"Sair"** na taskbar para voltar ao site

---

## 🔐 Contas de Acesso (Workspace)

> ⚠️ **Nota:** Estas contas são hardcoded para fins de demonstração. Em um ambiente de produção, a autenticação seria feita via backend seguro.

### Contas de Administrador

| Usuário | Senha | Cargo | Nome |
|---|---|---|---|
| `DoomReaper` | `cracker2024` | CEO | Doom Reaper |
| `Muguetos` | `admin2024` | Admin | MUGUETO's |
| `MrSuco` | `admin2024` | Admin | Mr. Suco |

### Contas de Moderador

| Usuário | Senha | Cargo | Nome |
|---|---|---|---|
| `Moderador1` | `mod2024` | Moderador | Moderador 1 |
| `Moderador2` | `mod2024` | Moderador | Moderador 2 |

### Persistência de Sessão

- ✅ A sessão é salva no `localStorage`
- ✅ O usuário permanece logado ao recarregar a página
- ✅ Para sair, clique no botão **"Sair"** na taskbar do CrackerOS
- ✅ Os dados do workspace (tarefas, documentos, etc.) são persistentes

---

## 🗂️ Armazenamento de Dados

Todos os dados são armazenados no **localStorage** do navegador:

| Chave | Tipo | Descrição |
|---|---|---|
| `lang` | `string` | Idioma selecionado (`pt`, `en`, `es`, etc.) |
| `theme` | `string` | Tema ativo (`light` ou `dark`) |
| `os_session` | `JSON` | Dados da sessão do usuário logado |
| `os_tasks` | `JSON` | Lista de tarefas do workspace |
| `os_docs` | `JSON` | Documentos salvos no workspace |
| `os_vault` | `JSON` | Entradas do cofre de senhas |
| `os_chat` | `JSON` | Histórico de mensagens do chat |
| `os_notes` | `JSON` | Notas rápidas (conteúdo + posição) |
| `visitors` | `number` | Contador de visitantes simulado |

### ⚠️ Avisos Importantes

- Os dados ficam **apenas no navegador** do usuário
- **Limpar os dados do navegador** apaga tudo permanentemente
- O cofre de senhas é **apenas demonstrativo** — não use para senhas reais
- O chat funciona apenas **localmente** (sem backend/servidor)
- Use a opção **"Limpar Todos os Dados"** nas Configurações do CrackerOS para resetar

---

## 🥚 Easter Eggs

O site contém surpresas escondidas! Aqui vai uma dica:

> 💡 **Dica:** Tente digitar algo especial no teclado enquanto navega pelo site... Talvez o nome da comunidade? 🤫

<details>
<summary>🔓 Clique para revelar o Easter Egg</summary>

### 🎉 Confetes!

Digite **"cracker"** em qualquer momento enquanto estiver no site (não precisa estar em nenhum campo de texto). Uma animação de confetes azuis e brancos aparecerá com a mensagem:

**"Você é Cracker! 🎉"**

A animação dura 3 segundos e pode ser ativada quantas vezes quiser!

**Como funciona tecnicamente:**
- Um event listener no `document` captura todas as teclas digitadas
- As letras são acumuladas em um buffer
- Quando o buffer contém "cracker", a animação é disparada
- Confetes são criados como `div` elements com CSS animation

</details>

---

## 🤝 Equipe

### 👑 Fundador & CEO

<table>
<tr>
<td align="center">
<strong>Doom Reaper</strong><br>
Fundador, CEO & Criador<br>
<a href="https://steamcommunity.com/id/deusacimadetodosamem">🔵 Perfil Steam</a><br>
<a href="mailto:rhuancillo@gmail.com">📧 Email</a>
</td>
</tr>
</table>

### ⭐ Administradores

<table>
<tr>
<td align="center">
<strong>MUGUETO's</strong><br>
Administrador & Ex-CEO de Projetos<br>
Moderador do Discord<br>
<a href="https://steamcommunity.com/profiles/76561197967635459/">🔵 Steam</a>
</td>
<td align="center">
<strong>Mr. Suco</strong><br>
Administrador Veterano<br>
🏅 Veterano<br>
<a href="https://steamcommunity.com/id/Sucow_ou_o_inutil/">🔵 Steam</a>
</td>
</tr>
</table>

### 🎮 Jogadores Veteranos

| Membro | Perfil Steam |
|---|---|
| Ric | [🔵 Steam](https://steamcommunity.com/profiles/76561199226967525/) |
| mr.dan | [🔵 Steam](https://steamcommunity.com/profiles/76561199857142196/) |
| jão da obra | [🔵 Steam](https://steamcommunity.com/profiles/76561199530889900/) |
| Punkeleto | [🔵 Steam](https://steamcommunity.com/profiles/76561199504328383/) |
| DAVID;) | [🔵 Steam](https://steamcommunity.com/profiles/76561199529161759/) |
| Deividsonboy | [🔵 Steam](https://steamcommunity.com/profiles/76561199831520349/) |

---

## 📞 Contato

| Canal | Link |
|---|---|
| 💬 **Discord** | [discord.gg/FqBfC9kvDR](https://discord.gg/FqBfC9kvDR) |
| 🔵 **Steam (Doom Reaper)** | [steamcommunity.com/id/deusacimadetodosamem](https://steamcommunity.com/id/deusacimadetodosamem) |
| 📧 **Email** | [rhuancillo@gmail.com](mailto:rhuancillo@gmail.com) |

### 🚀 Quer fazer parte da equipe?

Estamos recrutando **Administradores** e **Moderadores**! Envie um email para [rhuancillo@gmail.com](mailto:rhuancillo@gmail.com) com:

1. 📝 Seu nome/apelido
2. 🔵 Seu perfil Steam
3. 🎯 Vaga desejada (Moderador ou Administrador)
4. 💬 Por que quer fazer parte da equipe
5. 📋 Sua experiência com comunidades

---

## 🗺️ Roadmap Futuro

- [ ] 🔧 Servidor próprio de Garry's Mod com modos customizados
- [ ] 📅 Sistema de eventos semanais organizados
- [ ] 📺 Canal de conteúdo em vídeo com melhores momentos
- [ ] 🤝 Expansão de parcerias com outras comunidades
- [ ] 🔐 Backend real para autenticação e dados
- [ ] 📱 App mobile nativo (PWA aprimorado)
- [ ] 🤖 Bot do Discord integrado ao site
- [ ] 📊 Sistema de ranking e conquistas para membros

---

## 📄 Estrutura de Arquivos

```
cracker-games-br/
│
├── index.html          # 🎮 Site completo (HTML + CSS + JS)
├── README.md           # 📖 Este arquivo
└── (sem outras dependências!)
```

> **Sim, é sério.** Todo o site — com 10 idiomas, 9 seções, mini sistema operacional, 7 apps, sistema de login, animações, glassmorphism e tudo mais — está em **um único arquivo HTML**. 🤯

---

## 👑 Créditos

<div align="center">

### 🎮 Cracker Games BR

**Fundada e liderada por [Doom Reaper](https://steamcommunity.com/id/deusacimadetodosamem) 👑**

Todo o crédito vai para **Doom Reaper**, o fundador, CEO e criador da Cracker Games BR.
Sem ele, nada disso existiria. 💙👑

---

**CEO & Fundador:** [Doom Reaper](https://steamcommunity.com/id/deusacimadetodosamem)
**Administração:** [MUGUETO's](https://steamcommunity.com/profiles/76561197967635459/) · [Mr. Suco](https://steamcommunity.com/id/Sucow_ou_o_inutil/)
**Comunidade:** Todos os membros incríveis! 💙

---

Cracker Games BR © 2024-2025 — Todos os direitos reservados

*Feito com 💙 para a melhor comunidade do Brasil*

</div>
