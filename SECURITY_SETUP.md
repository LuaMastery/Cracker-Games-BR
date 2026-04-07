# 🔐 Guia de Configuração de Segurança - Cracker Games BR

> **IMPORTANTE:** Este documento contém instruções para configurar senhas seguras no sistema após as correções de segurança.

## Resumo das Correções de Segurança

As seguintes vulnerabilidades foram corrigidas:

1. ✅ **Senhas hardcoded removidas** - As senhas em texto puro foram substituídas por hashes SHA-256
2. ✅ **Rate limiting implementado** - Máximo de 5 tentativas de login a cada 15 minutos
3. ✅ **Criptografia AES adicionada** - Dados sensíveis podem ser criptografados no localStorage
4. ✅ **.gitignore criado** - Arquivos sensíveis (.env, tokens) são ignorados pelo Git
5. ✅ **README.md atualizado** - Credenciais removidas da documentação pública

## Configurando Novas Senhas

### Senha Padrão Temporária

Todas as contas padrão agora usam a senha temporária: `Cracker2024!`

**Contas padrão:**
- **Doom Reaper** (CEO)
- **Muguetos** (Admin)
- **Mr. Suco** (Admin)

### Alterando Senhas (Método 1 - Interface)

1. Faça login na Área de Trabalho com a senha temporária
2. Abra o app **Config** (⚙️)
3. Vá para a seção **"🔑 Alterar Senha"**
4. Informe:
   - Senha Atual: `Cracker2024!`
   - Nova Senha: (sua senha segura)
   - Confirmar: (repita a nova senha)
5. Clique em **"🔐 Alterar"**

### Alterando Senhas (Método 2 - Console)

Para administradores, é possível configurar senhas via console do navegador:

```javascript
// Alterar senha de um usuário
await changeUserPassword('Nome do Usuário', 'SenhaAtual', 'NovaSenhaSegura123!');

// Criar novo usuário com senha hasheada
await setupNewUser('NovoUsuario', 'SenhaSegura123!', 'Moderador', 'Nome de Exibição');
```

## Recomendações de Segurança

### Para Senhas

- ✅ Use senhas com **mínimo de 12 caracteres**
- ✅ Combine **letras maiúsculas, minúsculas, números e símbolos**
- ✅ Evite senhas comuns como "123456", "password", "admin"
- ✅ Use um **gerenciador de senhas** (Bitwarden, 1Password, etc.)
- ✅ **Nunca compartilhe** sua senha com ninguém
- ✅ **Altere senhas** periodicamente (a cada 3-6 meses)

### Para GitHub Tokens

- ✅ Nunca commite tokens no código
- ✅ Use variáveis de ambiente (`.env`)
- ✅ Revogue tokens antigos no GitHub
- ✅ Use tokens com escopo mínimo necessário

### Para o Workspace

- ✅ Faça logout quando terminar (botão **"Sair"**)
- ✅ Não salve credenciais em navegadores públicos
- ✅ Use HTTPS sempre que possível
- ✅ Mantenha o navegador atualizado

## Estrutura de Segurança Implementada

### 1. Rate Limiting

```javascript
SECURITY.canAttemptLogin()     // Verifica se pode tentar login
SECURITY.recordAttempt(true)   // Registra login bem-sucedido
SECURITY.recordAttempt(false)  // Registra tentativa falha
```

**Configurações:**
- Máximo: 5 tentativas
- Bloqueio: 15 minutos
- Reset automático após período de bloqueio

### 2. Hash SHA-256

```javascript
const hash = await SECURITY.hashPassword('senha');
// Retorna: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
```

### 3. Criptografia AES-GCM

```javascript
// Criptografar dados
const encrypted = await SECURITY.encrypt(dados, senha);

// Descriptografar dados
const decrypted = await SECURITY.decrypt(encrypted, senha);
```

**Recursos:**
- Derivação de chave com PBKDF2 (100.000 iterações)
- IV aleatório para cada criptografia
- Salt fixo para sessão (pode ser melhorado)

### 4. Sessão Criptografada

```javascript
// Salvar sessão criptografada
await SECURITY.saveEncryptedSession(userData, senha);

// Carregar sessão criptografada
const user = await SECURITY.loadEncryptedSession(senha);

// Limpar sessão
SECURITY.clearSession();
```

## Próximos Passos Recomendados

1. **Alterar todas as senhas padrão** imediatamente
2. **Configurar backend seguro** com autenticação JWT
3. **Implementar HTTPS** no servidor de produção
4. **Adicionar 2FA** (autenticação de dois fatores) quando possível
5. **Fazer backup** dos dados antes de migrar

## Troubleshooting

### "Muitas tentativas! Aguarde X minutos."

- Aguarde o tempo indicado (15 minutos)
- O bloqueio é resetado automaticamente
- Não tente fazer login repetidamente

### "Usuário ou senha incorretos"

- Verifique se está usando a senha correta
- Tente a senha temporária `Cracker2024!` se ainda não alterou
- Verifique se o Caps Lock está ativado

### Dados não aparecem após login

- Verifique se há uma sessão anterior: `localStorage.getItem('os_session')`
- Limpe o localStorage se necessário: `localStorage.clear()`
- Recarregue a página

## Contato

Em caso de problemas de segurança, entre em contato: **rhuancillo@gmail.com**

---

**Data da última atualização:** 2025-01-28  
**Versão da segurança:** 2.0
