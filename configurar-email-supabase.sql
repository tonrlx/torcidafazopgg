-- CONFIGURAÇÃO DE EMAIL NO SUPABASE
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar configurações atuais
SELECT 
    'Site URL' as configuracao,
    'https://torcidafazop.com.br' as valor_producao,
    'https://torcidafazop.com.br' as valor_desenvolvimento;

-- 2. Verificar tabelas de usuários
SELECT COUNT(*) as total_usuarios FROM auth.users;

-- 3. Verificar perfis de usuários
SELECT COUNT(*) as total_perfis FROM user_profiles;

-- 4. Verificar se há usuários não confirmados
SELECT 
    COUNT(*) as usuarios_nao_confirmados,
    COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as usuarios_confirmados
FROM auth.users;
