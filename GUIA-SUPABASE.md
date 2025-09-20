# 🔧 Guia para Configurar o Supabase

## ❌ Problema Identificado
As tabelas necessárias não existem no seu banco de dados Supabase. Por isso está dando "usuário existente" sempre.

## ✅ Solução Passo a Passo

### 1. Acesse o Painel do Supabase
1. Vá para [https://supabase.com](https://supabase.com)
2. Faça login na sua conta
3. Selecione o projeto: `grgovhcblqmwsbnmjlmi`

### 2. Execute o Script SQL
1. No painel do Supabase, vá em **SQL Editor** (ícone de código)
2. Clique em **New Query**
3. Copie TODO o conteúdo do arquivo `supabase-setup.sql` (que está na raiz do projeto)
4. Cole no editor SQL
5. Clique em **Run** (botão verde)

### 3. Verificar se Funcionou
1. Após executar o SQL, vá em **Table Editor**
2. Você deve ver as seguintes tabelas:
   - `user_profiles`
   - `comments`
   - `comment_likes`
   - `user_moderation`
   - `special_users`
   - `posts`

### 4. Testar a Aplicação
1. Execute: `npm run dev`
2. Tente criar uma conta nova
3. O erro "usuário existente" deve ter desaparecido

## 🚨 Se Ainda Der Erro

### Opção 1: Limpar e Recriar
1. Execute o arquivo `limpar-usuarios.sql` no SQL Editor
2. Depois execute o `supabase-setup.sql` novamente

### Opção 2: Verificar Permissões
1. Vá em **Authentication** > **Policies**
2. Verifique se as políticas RLS estão ativas
3. Se não estiverem, execute o `supabase-setup.sql` novamente

## 📋 Arquivos Importantes
- `supabase-setup.sql` - Script principal para criar as tabelas
- `criar-coringa.sql` - Para criar usuário administrador
- `limpar-usuarios.sql` - Para limpar dados (use com cuidado)

## 🔍 Verificação
Após configurar, execute novamente:
```bash
node verificar-supabase.js
```

Todas as tabelas devem aparecer com ✅
