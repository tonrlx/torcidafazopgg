-- Criar usuário Coringa após limpeza

-- 1. Inserir usuário Coringa na tabela special_users
-- (Você precisa substituir o UUID pelo ID real do usuário após criar a conta)
INSERT INTO special_users (user_id, role) VALUES 
  ('00000000-0000-0000-0000-000000000000', 'coringa')
ON CONFLICT (user_id) DO NOTHING;

-- 2. Mensagem explicativa
SELECT 'Execute este script APÓS criar a conta do usuário Coringa no site!' as instrucao;