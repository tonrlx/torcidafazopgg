-- Script SUPER SIMPLES para limpar dados
-- Execute este para limpar tudo

-- 1. Desabilitar RLS
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes DISABLE ROW LEVEL SECURITY;

-- 2. Deletar dados
DELETE FROM comment_likes;
DELETE FROM comments;
DELETE FROM user_profiles;

-- 3. Reabilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

-- 4. Verificar se está limpo
SELECT 'user_profiles' as tabela, COUNT(*) as registros FROM user_profiles
UNION ALL
SELECT 'comments' as tabela, COUNT(*) as registros FROM comments
UNION ALL
SELECT 'comment_likes' as tabela, COUNT(*) as registros FROM comment_likes;
