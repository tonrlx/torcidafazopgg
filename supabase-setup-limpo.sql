-- Script limpo para configurar Supabase - Remove políticas existentes primeiro

-- 1. REMOVER POLÍTICAS EXISTENTES (se existirem)
DROP POLICY IF EXISTS "Usuários podem ver perfis" ON user_profiles;
DROP POLICY IF EXISTS "Usuários podem criar seu próprio perfil" ON user_profiles;
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON user_profiles;
DROP POLICY IF EXISTS "Usuários autenticados podem ver comentários" ON comments;
DROP POLICY IF EXISTS "Usuários autenticados podem criar comentários" ON comments;
DROP POLICY IF EXISTS "Usuários podem editar seus próprios comentários" ON comments;
DROP POLICY IF EXISTS "Usuários podem deletar seus próprios comentários" ON comments;
DROP POLICY IF EXISTS "Usuários autenticados podem ver curtidas" ON comment_likes;
DROP POLICY IF EXISTS "Usuários autenticados podem curtir" ON comment_likes;
DROP POLICY IF EXISTS "Usuários podem remover suas curtidas" ON comment_likes;
DROP POLICY IF EXISTS "Usuários podem ver moderação própria" ON user_moderation;
DROP POLICY IF EXISTS "Moderadores podem ver todas as moderações" ON user_moderation;
DROP POLICY IF EXISTS "Moderadores podem criar moderações" ON user_moderation;
DROP POLICY IF EXISTS "Usuários especiais podem ver roles" ON special_users;
DROP POLICY IF EXISTS "Apenas admins podem gerenciar usuários especiais" ON special_users;

-- 2. REMOVER FUNÇÕES EXISTENTES (se existirem)
DROP FUNCTION IF EXISTS update_comment_likes_count();
DROP FUNCTION IF EXISTS is_username_unique(TEXT);
DROP FUNCTION IF EXISTS is_user_banned(UUID);
DROP FUNCTION IF EXISTS is_user_suspended(UUID);
DROP FUNCTION IF EXISTS is_email_banned(TEXT);
DROP FUNCTION IF EXISTS is_user_moderator(UUID);
DROP FUNCTION IF EXISTS handle_new_user();

-- 3. REMOVER TRIGGERS EXISTENTES (se existirem)
DROP TRIGGER IF EXISTS update_likes_count_on_insert ON comment_likes;
DROP TRIGGER IF EXISTS update_likes_count_on_delete ON comment_likes;

-- 4. CRIAR TABELAS (se não existirem)
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  author TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT username_length CHECK (length(username) >= 3 AND length(username) <= 20),
  CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$')
);

CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (length(content) <= 100),
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

CREATE TABLE IF NOT EXISTS user_moderation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  moderator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL CHECK (action_type IN ('ban', 'suspend')),
  reason TEXT,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS special_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('coringa', 'admin')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. HABILITAR RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_moderation ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_users ENABLE ROW LEVEL SECURITY;

-- 6. CRIAR POLÍTICAS
CREATE POLICY "Usuários podem ver perfis" ON user_profiles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários podem criar seu próprio perfil" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Usuários autenticados podem ver comentários" ON comments
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem criar comentários" ON comments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários podem editar seus próprios comentários" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios comentários" ON comments
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem ver curtidas" ON comment_likes
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem curtir" ON comment_likes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários podem remover suas curtidas" ON comment_likes
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem ver moderação própria" ON user_moderation
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Moderadores podem ver todas as moderações" ON user_moderation
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM special_users 
      WHERE user_id = auth.uid() 
      AND role IN ('coringa', 'admin')
    )
  );

CREATE POLICY "Moderadores podem criar moderações" ON user_moderation
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM special_users 
      WHERE user_id = auth.uid() 
      AND role IN ('coringa', 'admin')
    )
  );

CREATE POLICY "Usuários especiais podem ver roles" ON special_users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas admins podem gerenciar usuários especiais" ON special_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM special_users 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- 7. CRIAR FUNÇÕES
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

CREATE OR REPLACE FUNCTION is_username_unique(username_to_check TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE username = username_to_check
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION is_user_banned(user_id_to_check UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_moderation 
    WHERE user_id = user_id_to_check 
    AND action_type = 'ban' 
    AND is_active = TRUE
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION is_user_suspended(user_id_to_check UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_moderation 
    WHERE user_id = user_id_to_check 
    AND action_type = 'suspend' 
    AND is_active = TRUE
    AND expires_at > NOW()
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION is_email_banned(email_to_check TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_moderation um
    JOIN auth.users au ON um.user_id = au.id
    WHERE au.email = email_to_check 
    AND um.action_type = 'ban' 
    AND um.is_active = TRUE
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION is_user_moderator(user_id_to_check UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM special_users 
    WHERE user_id = user_id_to_check 
    AND role IN ('coringa', 'admin')
  );
END;
$$ LANGUAGE plpgsql;

-- 8. CRIAR TRIGGERS
CREATE TRIGGER update_likes_count_on_insert
  AFTER INSERT ON comment_likes
  FOR EACH ROW EXECUTE FUNCTION update_comment_likes_count();

CREATE TRIGGER update_likes_count_on_delete
  AFTER DELETE ON comment_likes
  FOR EACH ROW EXECUTE FUNCTION update_comment_likes_count();

-- 9. INSERIR POSTS DE EXEMPLO
INSERT INTO posts (id, title, content, author, category) VALUES
  (gen_random_uuid(), 'Título da Matéria 1', 'Conteúdo da matéria...', 'Redação TFP', 'noticias'),
  (gen_random_uuid(), 'Título da Matéria 2', 'Conteúdo da matéria...', 'Redação TFP', 'noticias')
ON CONFLICT (id) DO NOTHING;

-- 10. MENSAGEM DE SUCESSO
SELECT 'Configuração do Supabase concluída com sucesso!' as status;
