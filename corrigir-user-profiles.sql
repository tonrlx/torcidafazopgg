-- Script para corrigir problemas de chave estrangeira na tabela user_profiles

-- 1. Primeiro, vamos verificar se a constraint existe
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

-- 2. Se a constraint existir, vamos removê-la temporariamente
-- (Execute apenas se a constraint existir)
-- ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_id_fkey;

-- 3. Verificar se a tabela auth.users existe e tem dados
SELECT COUNT(*) as auth_users_count FROM auth.users;

-- 4. Verificar se há IDs órfãos na user_profiles
SELECT 
    up.id,
    up.full_name,
    up.username,
    CASE 
        WHEN au.id IS NULL THEN 'ÓRFÃO'
        ELSE 'OK'
    END as status
FROM user_profiles up
LEFT JOIN auth.users au ON up.id = au.id;

-- 5. Se houver IDs órfãos, vamos removê-los
-- DELETE FROM user_profiles 
-- WHERE id NOT IN (SELECT id FROM auth.users);

-- 6. Recriar a constraint corretamente
-- ALTER TABLE user_profiles 
-- ADD CONSTRAINT user_profiles_id_fkey 
-- FOREIGN KEY (id) REFERENCES auth.users(id) 
-- ON DELETE CASCADE;
