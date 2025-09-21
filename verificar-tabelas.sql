-- Script para verificar quais tabelas existem no seu banco
-- Execute este primeiro para ver o que você tem

-- 1. Listar todas as tabelas do schema public
SELECT 
    table_name as "Tabela",
    table_type as "Tipo"
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 2. Verificar quantos registros tem em cada tabela
SELECT 
    schemaname,
    relname as "Tabela",
    n_tup_ins as "Registros Inseridos",
    n_tup_upd as "Registros Atualizados", 
    n_tup_del as "Registros Deletados"
FROM pg_stat_user_tables 
WHERE schemaname = 'public'
ORDER BY relname;
