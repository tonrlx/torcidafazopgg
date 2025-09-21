# 🗑️ Guia para Limpar Dados do Supabase

## ⚠️ **ATENÇÃO: Este processo irá APAGAR TODOS os dados!**

### **Opção 1: Limpeza Completa (Recomendada)**

1. **Acesse o Supabase Dashboard:**
   - Vá para: https://supabase.com/dashboard/project/grgovhcblqmwsbnmjlmi
   - Clique em **"SQL Editor"** no menu lateral

2. **Execute o script completo:**
   - Copie todo o conteúdo do arquivo `limpar-todos-dados.sql`
   - Cole no SQL Editor
   - Clique em **"Run"**

3. **Verifique se está limpo:**
   - O script mostrará uma tabela com contagem de registros
   - Todos devem estar com **0 registros**

### **Opção 2: Limpeza Segura (Passo a Passo)**

1. **Acesse o Supabase Dashboard:**
   - Vá para: https://supabase.com/dashboard/project/grgovhcblqmwsbnmjlmi
   - Clique em **"SQL Editor"**

2. **Execute cada bloco separadamente:**

   **Bloco 1 - Verificar dados atuais:**
   ```sql
   SELECT 'user_profiles' as tabela, COUNT(*) as registros FROM user_profiles
   UNION ALL
   SELECT 'comments' as tabela, COUNT(*) as registros FROM comments
   UNION ALL
   SELECT 'comment_likes' as tabela, COUNT(*) as registros FROM comment_likes
   UNION ALL
   SELECT 'posts' as tabela, COUNT(*) as registros FROM posts
   UNION ALL
   SELECT 'post_likes' as tabela, COUNT(*) as registros FROM post_likes;
   ```

   **Bloco 2 - Desabilitar RLS:**
   ```sql
   ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
   ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
   ALTER TABLE comment_likes DISABLE ROW LEVEL SECURITY;
   ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
   ALTER TABLE post_likes DISABLE ROW LEVEL SECURITY;
   ```

   **Bloco 3 - Deletar dados:**
   ```sql
   DELETE FROM comment_likes;
   DELETE FROM post_likes;
   DELETE FROM comments;
   DELETE FROM posts;
   DELETE FROM user_profiles;
   ```

   **Bloco 4 - Reabilitar RLS:**
   ```sql
   ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
   ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
   ```

   **Bloco 5 - Verificar limpeza:**
   ```sql
   SELECT 'user_profiles' as tabela, COUNT(*) as registros FROM user_profiles
   UNION ALL
   SELECT 'comments' as tabela, COUNT(*) as registros FROM comments
   UNION ALL
   SELECT 'comment_likes' as tabela, COUNT(*) as registros FROM comment_likes
   UNION ALL
   SELECT 'posts' as tabela, COUNT(*) as registros FROM posts
   UNION ALL
   SELECT 'post_likes' as tabela, COUNT(*) as registros FROM post_likes;
   ```

### **Opção 3: Limpeza via Interface (Mais Fácil)**

1. **Acesse o Supabase Dashboard**
2. **Vá em "Table Editor"**
3. **Para cada tabela:**
   - Clique na tabela (user_profiles, comments, etc.)
   - Clique no ícone de **"..."** (três pontos)
   - Selecione **"Delete all rows"**
   - Confirme a exclusão

### **⚠️ IMPORTANTE:**

- **Backup:** Se quiser fazer backup, exporte os dados antes
- **Usuários:** Os usuários da autenticação serão mantidos (apenas dados das tabelas)
- **Estrutura:** As tabelas e colunas permanecem intactas
- **Configurações:** RLS e políticas são mantidas

### **✅ Após a Limpeza:**

1. **Teste o cadastro** de um novo usuário
2. **Verifique se o email** de confirmação funciona
3. **Teste o login** com o usuário criado
4. **Confirme que tudo** está funcionando

### **🚀 Pronto para Produção:**

Após limpar os dados, seu site estará pronto para:
- Deploy em produção
- Cadastros de usuários reais
- Dados limpos e organizados
