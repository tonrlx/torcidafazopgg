-- Corrigir políticas RLS para user_profiles

-- 1. Remover políticas existentes
DROP POLICY IF EXISTS "Usuários podem ver perfis" ON user_profiles;
DROP POLICY IF EXISTS "Usuários podem criar seu próprio perfil" ON user_profiles;
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON user_profiles;

-- 2. Criar políticas mais permissivas temporariamente
CREATE POLICY "Permitir inserção de perfis" ON user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir visualização de perfis" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Permitir atualização de perfis" ON user_profiles
  FOR UPDATE USING (true);

-- 3. Verificar se RLS está habilitado
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 4. Mensagem de sucesso
SELECT 'Políticas RLS corrigidas para user_profiles!' as status;
