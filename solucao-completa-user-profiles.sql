-- Solução completa para problemas de chave estrangeira na user_profiles

-- PASSO 1: Verificar o estado atual
SELECT '=== ESTADO ATUAL ===' as info;

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

-- PASSO 2: Verificar dados órfãos
SELECT '=== DADOS ÓRFÃOS ===' as info;

SELECT 
    up.id,
    up.full_name,
    up.username
FROM user_profiles up
LEFT JOIN auth.users au ON up.id = au.id
WHERE au.id IS NULL;

-- PASSO 3: Remover constraint problemática
SELECT '=== REMOVENDO CONSTRAINT ===' as info;

ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_id_fkey;

-- PASSO 4: Limpar dados órfãos
SELECT '=== LIMPANDO DADOS ÓRFÃOS ===' as info;

DELETE FROM user_profiles 
WHERE id NOT IN (SELECT id FROM auth.users);

-- PASSO 5: Recriar constraint corretamente
SELECT '=== RECRIANDO CONSTRAINT ===' as info;

ALTER TABLE user_profiles 
ADD CONSTRAINT user_profiles_id_fkey 
FOREIGN KEY (id) REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- PASSO 6: Verificar resultado final
SELECT '=== RESULTADO FINAL ===' as info;

SELECT 
    'user_profiles' as tabela,
    COUNT(*) as total_registros
FROM user_profiles;

-- Verificar se não há mais violações
SELECT 
    up.id,
    up.full_name,
    up.username,
    'OK' as status
FROM user_profiles up
INNER JOIN auth.users au ON up.id = au.id;
