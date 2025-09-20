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
  signUp: (email: string, password: string, fullName: string, username: string) => Promise<{ error: any }>
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
    }

    return { error: null }
  }

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    try {
      // Verificar diretamente na tabela user_profiles
      const { data, error } = await supabase
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
    // Primeiro, verificar se é um username ou email
    let email = emailOrUsername
    
    // Se não contém @, é um username - buscar o email correspondente
    if (!emailOrUsername.includes('@')) {
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('username', emailOrUsername)
        .single()
      
      if (profileError || !profile) {
        return { error: { message: 'Usuário não encontrado' } }
      }
      
      // Buscar o email do usuário na tabela auth.users
      const { data: userData, error: userError } = await supabase
        .from('auth.users')
        .select('email')
        .eq('id', profile.id)
        .single()
      
      if (userError || !userData) {
        return { error: { message: 'Usuário não encontrado' } }
      }
      
      email = userData.email
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
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
