-- Script INTELIGENTE para limpar dados do Supabase
-- Este script verifica quais tabelas existem antes de tentar limpá-las

-- 1. Verificar tabelas existentes
SELECT 'Verificando tabelas existentes...' as status;

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 2. Desabilitar RLS nas tabelas que existem
DO $$
DECLARE
    table_name text;
BEGIN
    -- Desabilitar RLS em todas as tabelas do schema public
    FOR table_name IN 
        SELECT t.table_name 
        FROM information_schema.tables t
        WHERE t.table_schema = 'public' 
        AND t.table_type = 'BASE TABLE'
    LOOP
        BEGIN
            EXECUTE format('ALTER TABLE %I DISABLE ROW LEVEL SECURITY', table_name);
            RAISE NOTICE 'RLS desabilitado na tabela: %', table_name;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'Erro ao desabilitar RLS na tabela %: %', table_name, SQLERRM;
        END;
    END LOOP;
END $$;

-- 3. Limpar dados das tabelas (em ordem de dependência)
DO $$
DECLARE
    table_name text;
BEGIN
    -- Primeiro: limpar tabelas de likes (dependências)
    FOR table_name IN 
        SELECT t.table_name 
        FROM information_schema.tables t
        WHERE t.table_schema = 'public' 
        AND t.table_type = 'BASE TABLE'
        AND t.table_name LIKE '%like%'
    LOOP
        BEGIN
            EXECUTE format('DELETE FROM %I', table_name);
            RAISE NOTICE 'Dados deletados da tabela: %', table_name;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'Erro ao deletar da tabela %: %', table_name, SQLERRM;
        END;
    END LOOP;
    
    -- Segundo: limpar tabelas de comentários
    FOR table_name IN 
        SELECT t.table_name 
        FROM information_schema.tables t
        WHERE t.table_schema = 'public' 
        AND t.table_type = 'BASE TABLE'
        AND t.table_name LIKE '%comment%'
    LOOP
        BEGIN
            EXECUTE format('DELETE FROM %I', table_name);
            RAISE NOTICE 'Dados deletados da tabela: %', table_name;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'Erro ao deletar da tabela %: %', table_name, SQLERRM;
        END;
    END LOOP;
    
    -- Terceiro: limpar tabelas de posts
    FOR table_name IN 
        SELECT t.table_name 
        FROM information_schema.tables t
        WHERE t.table_schema = 'public' 
        AND t.table_type = 'BASE TABLE'
        AND t.table_name LIKE '%post%'
    LOOP
        BEGIN
            EXECUTE format('DELETE FROM %I', table_name);
            RAISE NOTICE 'Dados deletados da tabela: %', table_name;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'Erro ao deletar da tabela %: %', table_name, SQLERRM;
        END;
    END LOOP;
    
    -- Quarto: limpar tabelas de usuários
    FOR table_name IN 
        SELECT t.table_name 
        FROM information_schema.tables t
        WHERE t.table_schema = 'public' 
        AND t.table_type = 'BASE TABLE'
        AND t.table_name LIKE '%user%'
    LOOP
        BEGIN
            EXECUTE format('DELETE FROM %I', table_name);
            RAISE NOTICE 'Dados deletados da tabela: %', table_name;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'Erro ao deletar da tabela %: %', table_name, SQLERRM;
        END;
    END LOOP;
END $$;

-- 4. Reabilitar RLS nas tabelas que existem
DO $$
DECLARE
    table_name text;
BEGIN
    FOR table_name IN 
        SELECT t.table_name 
        FROM information_schema.tables t
        WHERE t.table_schema = 'public' 
        AND t.table_type = 'BASE TABLE'
    LOOP
        BEGIN
            EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', table_name);
            RAISE NOTICE 'RLS reabilitado na tabela: %', table_name;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'Erro ao reabilitar RLS na tabela %: %', table_name, SQLERRM;
        END;
    END LOOP;
END $$;

-- 5. Verificar resultado final
SELECT 'Verificando resultado final...' as status;

SELECT 
    table_name as "Tabela",
    (xpath('/row/cnt/text()', xml_count))[1]::text::int as "Registros"
FROM (
    SELECT 
        table_name,
        query_to_xml(format('SELECT COUNT(*) as cnt FROM %I', table_name), false, true, '') as xml_count
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
) t
ORDER BY table_name;
