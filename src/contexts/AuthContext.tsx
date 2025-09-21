import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface UserProfile {
  id: string
  full_name: string
  username: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string, username: string) => Promise<{ error: any, message?: string }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  checkUsernameAvailability: (username: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) {
      console.error('Erro ao carregar perfil:', error)
      setProfile(null)
    } else {
      setProfile(data)
    }
  }

  useEffect(() => {
    // Obter sessão inicial
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, fullName: string, username: string) => {
    // Verificação de ban simplificada - por enquanto desabilitada para evitar problemas
    // TODO: Implementar verificação de ban quando necessário

    // Verificar se o username está disponível
    const isUsernameAvailable = await checkUsernameAvailability(username)
    if (!isUsernameAvailable) {
      return { error: { message: 'Nome de usuário já está em uso' } }
    }

    // Criar conta no Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://torcidafazop.com.br/auth/callback'
      }
    })

    if (error) {
      return { error }
    }

    // Se o usuário foi criado com sucesso, criar o perfil
    if (data.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: data.user.id,
          full_name: fullName,
          username: username
        })

      if (profileError) {
        console.error('Erro ao criar perfil:', profileError)
        return { error: profileError }
      }

      // Verificar se o email precisa ser confirmado
      if (data.user && !data.user.email_confirmed_at) {
        return { 
          error: null, 
          message: 'Conta criada com sucesso! Verifique seu email para confirmar a conta.' 
        }
      }
    }

    return { error: null }
  }

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    try {
      // Verificar diretamente na tabela user_profiles
      const { error } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', username)
        .single()
      
      if (error && error.code === 'PGRST116') {
        // Username não existe (erro de "não encontrado")
        return true
      }
      
      if (error) {
        console.error('Erro ao verificar username:', error)
        return false
      }
      
      // Se encontrou dados, username já existe
      return false
    } catch (error) {
      console.error('Erro ao verificar username:', error)
      return false
    }
  }

  const signIn = async (emailOrUsername: string, password: string) => {
    console.log('🔍 Tentando login com:', emailOrUsername)
    
    // Se contém @, é um email - fazer login direto
    if (emailOrUsername.includes('@')) {
      console.log('🔐 Login com email direto')
    const { error } = await supabase.auth.signInWithPassword({
      email: emailOrUsername,
      password,
    })
    
    console.log('📊 Resultado do login:', { error })
    return { error }
    }
    
    // Se é username, precisamos buscar o email correspondente
    console.log('🔍 Buscando email para username:', emailOrUsername)
    
    // Primeiro, buscar o perfil do usuário
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('id, full_name')
      .eq('username', emailOrUsername)
      .single()
    
    console.log('📊 Resultado da busca do perfil:', { profile, profileError })
    
    if (profileError || !profile) {
      console.log('❌ Perfil não encontrado')
      return { error: { message: 'Usuário não encontrado' } }
    }
    
    // Agora buscar o usuário na tabela auth.users usando a função admin
    // Como não podemos acessar auth.users diretamente, vamos tentar um approach diferente
    // Vamos usar o email que foi usado no cadastro (que deve estar no perfil)
    
    // Por enquanto, vamos retornar erro para username login até implementarmos uma solução melhor
    console.log('❌ Login com username temporariamente desabilitado')
    return { error: { message: 'Por favor, use seu email para fazer login' } }
  }

  const signOut = async () => {
    try {
      console.log('🚪 Iniciando logout...')
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('❌ Erro no logout:', error)
      } else {
        console.log('✅ Logout realizado com sucesso')
        // Limpar estados locais
        setUser(null)
        setProfile(null)
        setSession(null)
      }
    } catch (error) {
      console.error('❌ Erro no logout:', error)
    }
  }

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    checkUsernameAvailability,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
