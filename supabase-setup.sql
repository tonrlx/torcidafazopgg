-- Tabelas para o sistema de comentários da Torcida Faz o P

-- 1. Tabela de posts (matérias) - se não existir
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  author TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Tabela de perfis de usuários (extensão da auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT username_length CHECK (length(username) >= 3 AND length(username) <= 20),
  CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$')
);

-- 3. Tabela de comentários
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- Para respostas
  content TEXT NOT NULL CHECK (length(content) <= 100),
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Tabela de curtidas de comentários
CREATE TABLE IF NOT EXISTS comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(comment_id, user_id) -- Evita curtidas duplicadas
);

-- 4. Políticas de segurança (Row Level Security)

-- Habilitar RLS nas tabelas
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

-- Políticas para perfis de usuários
CREATE POLICY "Usuários podem ver perfis" ON user_profiles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários podem criar seu próprio perfil" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Política para comentários: usuários autenticados podem ler e criar
CREATE POLICY "Usuários autenticados podem ver comentários" ON comments
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem criar comentários" ON comments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários podem editar seus próprios comentários" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios comentários" ON comments
  FOR DELETE USING (auth.uid() = user_id);

-- Política para curtidas: usuários autenticados podem curtir
CREATE POLICY "Usuários autenticados podem ver curtidas" ON comment_likes
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem curtir" ON comment_likes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários podem remover suas curtidas" ON comment_likes
  FOR DELETE USING (auth.uid() = user_id);

-- 5. Função para atualizar contagem de curtidas automaticamente
CREATE OR REPLACE FUNCTION update_comment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE comments 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.comment_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE comments 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.comment_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 6. Triggers para atualizar contagem automaticamente
CREATE TRIGGER update_likes_count_on_insert
  AFTER INSERT ON comment_likes
  FOR EACH ROW EXECUTE FUNCTION update_comment_likes_count();

CREATE TRIGGER update_likes_count_on_delete
  AFTER DELETE ON comment_likes
  FOR EACH ROW EXECUTE FUNCTION update_comment_likes_count();

-- 7. Função para verificar se username é único
CREATE OR REPLACE FUNCTION is_username_unique(username_to_check TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE username = username_to_check
  );
END;
$$ LANGUAGE plpgsql;

-- 8. Função para criar perfil automaticamente após registro
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Esta função será chamada quando um novo usuário se registrar
  -- O perfil será criado manualmente pelo frontend
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Trigger para novos usuários (opcional - pode ser removido se criar perfil manualmente)
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 10. Inserir alguns posts de exemplo (opcional)
INSERT INTO posts (id, title, content, author, category) VALUES
  (gen_random_uuid(), 'Título da Matéria 1', 'Conteúdo da matéria...', 'Redação TFP', 'noticias'),
  (gen_random_uuid(), 'Título da Matéria 2', 'Conteúdo da matéria...', 'Redação TFP', 'noticias')
ON CONFLICT (id) DO NOTHING;
