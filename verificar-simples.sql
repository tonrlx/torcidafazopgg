-- Script SIMPLES para verificar tabelas e dados
-- Execute este primeiro

-- 1. Listar todas as tabelas
SELECT table_name as "Tabela"
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 2. Contar registros em cada tabela (se existir)
SELECT 'user_profiles' as tabela, COUNT(*) as registros FROM user_profiles
UNION ALL
SELECT 'comments' as tabela, COUNT(*) as registros FROM comments
UNION ALL
SELECT 'comment_likes' as tabela, COUNT(*) as registros FROM comment_likes;
