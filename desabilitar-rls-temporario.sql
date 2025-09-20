-- Solução temporária: desabilitar RLS nas tabelas problemáticas
-- Execute este SQL no Supabase

-- 1. Desabilitar RLS temporariamente
ALTER TABLE special_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_moderation DISABLE ROW LEVEL SECURITY;

-- 2. Verificar se funcionou
SELECT 'special_users' as tabela, COUNT(*) as registros FROM special_users;
SELECT 'user_moderation' as tabela, COUNT(*) as registros FROM user_moderation;

-- 3. Testar inserção (opcional)
-- INSERT INTO special_users (user_id, role) VALUES ('00000000-0000-0000-0000-000000000000', 'coringa');
