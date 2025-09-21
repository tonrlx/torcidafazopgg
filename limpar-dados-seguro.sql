-- Script SEGURO para limpar dados do Supabase
-- Execute um bloco por vez para ter controle total

-- ========================================
-- PASSO 1: Verificar dados atuais
-- ========================================
SELECT 'user_profiles' as tabela, COUNT(*) as registros FROM user_profiles
UNION ALL
SELECT 'comments' as tabela, COUNT(*) as registros FROM comments
UNION ALL
SELECT 'comment_likes' as tabela, COUNT(*) as registros FROM comment_likes
UNION ALL
SELECT 'posts' as tabela, COUNT(*) as registros FROM posts
UNION ALL
SELECT 'post_likes' as tabela, COUNT(*) as registros FROM post_likes;

-- ========================================
-- PASSO 2: Desabilitar RLS temporariamente
-- ========================================
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes DISABLE ROW LEVEL SECURITY;
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes DISABLE ROW LEVEL SECURITY;

-- ========================================
-- PASSO 3: Deletar dados das tabelas (em ordem)
-- ========================================
-- Primeiro: deletar likes (dependências)
DELETE FROM comment_likes;
DELETE FROM post_likes;

-- Segundo: deletar comentários
DELETE FROM comments;

-- Terceiro: deletar posts
DELETE FROM posts;

-- Quarto: deletar perfis de usuários
DELETE FROM user_profiles;

-- ========================================
-- PASSO 4: Reabilitar RLS
-- ========================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- ========================================
-- PASSO 5: Verificar se está limpo
-- ========================================
SELECT 'user_profiles' as tabela, COUNT(*) as registros FROM user_profiles
UNION ALL
SELECT 'comments' as tabela, COUNT(*) as registros FROM comments
UNION ALL
SELECT 'comment_likes' as tabela, COUNT(*) as registros FROM comment_likes
UNION ALL
SELECT 'posts' as tabela, COUNT(*) as registros FROM posts
UNION ALL
SELECT 'post_likes' as tabela, COUNT(*) as registros FROM post_likes;
