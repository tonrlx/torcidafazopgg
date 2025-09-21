-- Verificação final após correção da chave estrangeira

-- 1. Verificar se a constraint foi recriada corretamente
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
LEFT JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.table_name = 'user_profiles'
AND tc.constraint_type = 'FOREIGN KEY';

-- 2. Verificar contagem de registros
SELECT 
    'user_profiles' as tabela,
    COUNT(*) as total_registros
FROM user_profiles;

-- 3. Verificar se não há violações de chave estrangeira
SELECT 
    up.id,
    up.full_name,
    up.username,
    'OK' as status
FROM user_profiles up
INNER JOIN auth.users au ON up.id = au.id;

-- 4. Teste de inserção (opcional - descomente se quiser testar)
-- INSERT INTO user_profiles (id, full_name, username) 
-- VALUES ('00000000-0000-0000-0000-000000000000', 'Teste', 'teste')
-- ON CONFLICT (id) DO NOTHING;
