-- Script para transformar usuário tonrlx em coringa
-- Execute este SQL no Supabase

-- 1. Verificar se o usuário tonrlx existe
SELECT 
  id, 
  email, 
  created_at 
FROM auth.users 
WHERE email LIKE '%tonrlx%' 
OR id IN (
  SELECT id FROM user_profiles WHERE username = 'tonrlx'
);

-- 2. Se o usuário existir, torná-lo coringa
-- (Substitua 'USER_ID_AQUI' pelo ID real do usuário encontrado acima)

-- Primeiro, inserir o perfil se não existir
INSERT INTO user_profiles (id, full_name, username) 
SELECT 
  au.id,
  'Tonrlx Coringa',
  'tonrlx'
FROM auth.users au
WHERE au.email LIKE '%tonrlx%'
ON CONFLICT (id) DO UPDATE SET
  full_name = 'Tonrlx Coringa',
  username = 'tonrlx';

-- Tornar ele Usuário Coringa
INSERT INTO special_users (user_id, role) 
SELECT 
  au.id,
  'coringa'
FROM auth.users au
WHERE au.email LIKE '%tonrlx%'
ON CONFLICT (user_id) DO UPDATE SET
  role = 'coringa';

-- 3. Verificar se criou corretamente
SELECT 
  up.username,
  up.full_name,
  su.role,
  au.email
FROM user_profiles up
JOIN special_users su ON up.id = su.user_id
JOIN auth.users au ON up.id = au.id
WHERE up.username = 'tonrlx';
