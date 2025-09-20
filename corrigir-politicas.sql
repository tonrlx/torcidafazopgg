-- Script para corrigir políticas RLS com recursão infinita
-- Execute este SQL no Supabase

-- 1. Remover políticas problemáticas
DROP POLICY IF EXISTS "Usuários podem ver moderação própria" ON user_moderation;
DROP POLICY IF EXISTS "Moderadores podem ver todas as moderações" ON user_moderation;
DROP POLICY IF EXISTS "Moderadores podem criar moderações" ON user_moderation;
DROP POLICY IF EXISTS "Usuários especiais podem ver roles" ON special_users;
DROP POLICY IF EXISTS "Apenas admins podem gerenciar usuários especiais" ON special_users;

-- 2. Recriar políticas mais simples e funcionais

-- Políticas para user_moderation (mais simples)
CREATE POLICY "Usuários podem ver suas próprias moderações" ON user_moderation
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Moderadores podem ver todas as moderações" ON user_moderation
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM special_users 
      WHERE user_id = auth.uid() 
      AND role = 'coringa'
    )
  );

CREATE POLICY "Moderadores podem criar moderações" ON user_moderation
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM special_users 
      WHERE user_id = auth.uid() 
      AND role = 'coringa'
    )
  );

-- Políticas para special_users (mais simples)
CREATE POLICY "Todos podem ver roles" ON special_users
  FOR SELECT USING (true);

CREATE POLICY "Apenas coringas podem gerenciar usuários especiais" ON special_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM special_users 
      WHERE user_id = auth.uid() 
      AND role = 'coringa'
    )
  );

-- 3. Verificar se as tabelas estão funcionando
SELECT 'user_moderation' as tabela, COUNT(*) as registros FROM user_moderation
UNION ALL
SELECT 'special_users' as tabela, COUNT(*) as registros FROM special_users;
