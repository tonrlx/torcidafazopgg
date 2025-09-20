-- Desabilitar RLS na tabela user_profiles para resolver o erro de registro
-- Execute este SQL no Supabase

-- Desabilitar RLS na tabela user_profiles
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- Verificar se funcionou
SELECT 'user_profiles' as tabela, COUNT(*) as registros FROM user_profiles;
