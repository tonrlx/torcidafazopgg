-- Script direto para corrigir a chave estrangeira da tabela user_profiles

-- 1. Remover a constraint problemática
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_id_fkey;

-- 2. Limpar dados órfãos (IDs que não existem em auth.users)
DELETE FROM user_profiles 
WHERE id NOT IN (SELECT id FROM auth.users);

-- 3. Recriar a constraint corretamente
ALTER TABLE user_profiles 
ADD CONSTRAINT user_profiles_id_fkey 
FOREIGN KEY (id) REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- 4. Verificar se a correção funcionou
SELECT 
    'user_profiles' as tabela,
    COUNT(*) as total_registros
FROM user_profiles;

-- 5. Verificar se não há mais violações
SELECT 
    up.id,
    up.full_name,
    up.username,
    'OK' as status
FROM user_profiles up
INNER JOIN auth.users au ON up.id = au.id;
