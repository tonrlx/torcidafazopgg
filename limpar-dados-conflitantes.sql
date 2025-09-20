-- Limpar dados conflitantes e resetar tabelas

-- 1. Desabilitar RLS temporariamente
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_moderation DISABLE ROW LEVEL SECURITY;
ALTER TABLE special_users DISABLE ROW LEVEL SECURITY;

-- 2. Limpar todas as tabelas
DELETE FROM comment_likes;
DELETE FROM comments;
DELETE FROM user_profiles;
DELETE FROM user_moderation;
DELETE FROM special_users;

-- 3. Resetar sequências (se existirem)
-- Não há sequências para resetar neste caso

-- 4. Reabilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_moderation ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_users ENABLE ROW LEVEL SECURITY;

-- 5. Recriar políticas permissivas
DROP POLICY IF EXISTS "Permitir inserção de perfis" ON user_profiles;
DROP POLICY IF EXISTS "Permitir visualização de perfis" ON user_profiles;
DROP POLICY IF EXISTS "Permitir atualização de perfis" ON user_profiles;

CREATE POLICY "Permitir inserção de perfis" ON user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir visualização de perfis" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Permitir atualização de perfis" ON user_profiles
  FOR UPDATE USING (true);

-- 6. Políticas para comentários
CREATE POLICY "Permitir comentários" ON comments
  FOR ALL USING (true);

CREATE POLICY "Permitir curtidas" ON comment_likes
  FOR ALL USING (true);

-- 7. Políticas para moderação
CREATE POLICY "Permitir moderação" ON user_moderation
  FOR ALL USING (true);

CREATE POLICY "Permitir usuários especiais" ON special_users
  FOR ALL USING (true);

-- 8. Mensagem de sucesso
SELECT 'Dados limpos e políticas resetadas!' as status;
