-- Desabilitar RLS em todas as tabelas para resolver problemas de registro
-- Execute este SQL no Supabase

-- Desabilitar RLS em todas as tabelas
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_moderation DISABLE ROW LEVEL SECURITY;
ALTER TABLE special_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;

-- Verificar status das tabelas
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('user_profiles', 'comments', 'comment_likes', 'user_moderation', 'special_users', 'posts')
ORDER BY tablename;