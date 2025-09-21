-- Script para limpar TODOS os dados do Supabase
-- ⚠️ ATENÇÃO: Este script irá APAGAR TODOS os dados!
-- Execute apenas se tiver certeza!

-- 1. Verificar quais tabelas existem primeiro
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 2. Desabilitar RLS temporariamente para poder deletar (apenas nas tabelas que existem)
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes DISABLE ROW LEVEL SECURITY;

-- 3. Deletar todos os dados das tabelas (apenas as que existem)
DELETE FROM comment_likes;
DELETE FROM comments;
DELETE FROM user_profiles;

-- 4. Reabilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

-- 5. Verificar se está tudo limpo
SELECT 'user_profiles' as tabela, COUNT(*) as registros FROM user_profiles
UNION ALL
SELECT 'comments' as tabela, COUNT(*) as registros FROM comments
UNION ALL
SELECT 'comment_likes' as tabela, COUNT(*) as registros FROM comment_likes;
