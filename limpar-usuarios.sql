-- CUIDADO: Isso apaga TODOS os usuários e dados!
-- Execute apenas se quiser começar do zero

-- 1. Apagar dados relacionados
DELETE FROM comment_likes;
DELETE FROM comments;
DELETE FROM user_moderation;
DELETE FROM special_users;
DELETE FROM user_profiles;

-- 2. Apagar usuários do auth (isso pode não funcionar via SQL)
-- Você pode precisar apagar manualmente no painel do Supabase
-- Vá em Authentication > Users e delete todos

-- 3. Verificar se limpou
SELECT COUNT(*) as total_usuarios FROM user_profiles;
SELECT COUNT(*) as total_auth_users FROM auth.users;
