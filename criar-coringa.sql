-- Criar conta do Usuário Coringa diretamente
-- Execute este SQL no Supabase

-- 1. Primeiro, limpe os dados existentes
DELETE FROM comment_likes;
DELETE FROM comments;
DELETE FROM user_moderation;
DELETE FROM special_users;
DELETE FROM user_profiles;

-- 2. Criar usuário no auth.users (você precisa fazer isso manualmente)
-- Vá em Authentication > Users > Add user
-- Email: tonrlx@exemplo.com (ou qualquer email)
-- Password: Notliada2003

-- 3. Depois de criar o usuário, pegue o ID dele e execute:
-- (Substitua 'USER_ID_AQUI' pelo ID real do usuário)

-- Inserir perfil do usuário
INSERT INTO user_profiles (id, full_name, username) 
VALUES ('USER_ID_AQUI', 'Tonrlx Coringa', 'tonrlx');

-- Tornar ele Usuário Coringa
INSERT INTO special_users (user_id, role) 
VALUES ('USER_ID_AQUI', 'coringa');

-- Verificar se criou
SELECT 
  up.username,
  up.full_name,
  su.role
FROM user_profiles up
JOIN special_users su ON up.id = su.user_id
WHERE up.username = 'tonrlx';

