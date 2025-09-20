// Script para verificar se as tabelas do Supabase estão funcionando
// Execute com: node verificar-supabase.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grgovhcblqmwsbnmjlmi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZ292aGNibHFtd3Nibm1qbG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzOTY2MjYsImV4cCI6MjA3Mzk3MjYyNn0.jRRWIFK4k3dvHn1XtJ7vGAVlszpGJmN77M1t6-ongFY'

const supabase = createClient(supabaseUrl, supabaseKey)

async function verificarTabelas() {
  console.log('🔍 Verificando conexão com Supabase...')
  
  try {
    // Testar conexão básica
    const { data: authData, error: authError } = await supabase.auth.getSession()
    console.log('✅ Conexão com Supabase estabelecida')
    
    // Verificar se as tabelas existem
    console.log('\n📋 Verificando tabelas...')
    
    // 1. Verificar user_profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1)
    
    if (profilesError) {
      console.log('❌ Tabela user_profiles não existe ou não está acessível:', profilesError.message)
    } else {
      console.log('✅ Tabela user_profiles OK')
    }
    
    // 2. Verificar comments
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('count')
      .limit(1)
    
    if (commentsError) {
      console.log('❌ Tabela comments não existe ou não está acessível:', commentsError.message)
    } else {
      console.log('✅ Tabela comments OK')
    }
    
    // 3. Verificar special_users
    const { data: special, error: specialError } = await supabase
      .from('special_users')
      .select('count')
      .limit(1)
    
    if (specialError) {
      console.log('❌ Tabela special_users não existe ou não está acessível:', specialError.message)
    } else {
      console.log('✅ Tabela special_users OK')
    }
    
    // 4. Verificar user_moderation
    const { data: moderation, error: moderationError } = await supabase
      .from('user_moderation')
      .select('count')
      .limit(1)
    
    if (moderationError) {
      console.log('❌ Tabela user_moderation não existe ou não está acessível:', moderationError.message)
    } else {
      console.log('✅ Tabela user_moderation OK')
    }
    
    // 5. Verificar comment_likes
    const { data: likes, error: likesError } = await supabase
      .from('comment_likes')
      .select('count')
      .limit(1)
    
    if (likesError) {
      console.log('❌ Tabela comment_likes não existe ou não está acessível:', likesError.message)
    } else {
      console.log('✅ Tabela comment_likes OK')
    }
    
    // 6. Verificar posts
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('count')
      .limit(1)
    
    if (postsError) {
      console.log('❌ Tabela posts não existe ou não está acessível:', postsError.message)
    } else {
      console.log('✅ Tabela posts OK')
    }
    
    console.log('\n📊 Resumo:')
    console.log('Se alguma tabela estiver com erro, execute o arquivo supabase-setup.sql no painel do Supabase')
    console.log('Vá em: SQL Editor > New Query > Cole o conteúdo do supabase-setup.sql > Run')
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message)
  }
}

verificarTabelas()
