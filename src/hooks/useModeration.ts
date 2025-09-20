import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export interface ModerationAction {
  id: string
  user_id: string
  moderator_id: string
  action_type: 'ban' | 'suspend'
  reason?: string
  expires_at?: string
  created_at: string
  is_active: boolean
}

export interface UserModerationStatus {
  isBanned: boolean
  isSuspended: boolean
  banReason?: string
  suspensionExpires?: string
}

export const useModeration = () => {
  const { user } = useAuth()
  const [moderationStatus, setModerationStatus] = useState<UserModerationStatus>({
    isBanned: false,
    isSuspended: false
  })
  const [isModerator, setIsModerator] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      checkModerationStatus()
      checkModeratorStatus()
    } else {
      setLoading(false)
    }
  }, [user])

  const checkModerationStatus = async () => {
    if (!user) return

    try {
      const { data: banData } = await supabase
        .rpc('is_user_banned', { user_id_to_check: user.id })

      const { data: suspendData } = await supabase
        .rpc('is_user_suspended', { user_id_to_check: user.id })

      if (banData) {
        // Buscar detalhes do ban
        const { data: banDetails } = await supabase
          .from('user_moderation')
          .select('reason')
          .eq('user_id', user.id)
          .eq('action_type', 'ban')
          .eq('is_active', true)
          .single()

        setModerationStatus({
          isBanned: true,
          isSuspended: false,
          banReason: banDetails?.reason
        })
      } else if (suspendData) {
        // Buscar detalhes da suspensão
        const { data: suspendDetails } = await supabase
          .from('user_moderation')
          .select('reason, expires_at')
          .eq('user_id', user.id)
          .eq('action_type', 'suspend')
          .eq('is_active', true)
          .single()

        setModerationStatus({
          isBanned: false,
          isSuspended: true,
          suspensionExpires: suspendDetails?.expires_at
        })
      } else {
        setModerationStatus({
          isBanned: false,
          isSuspended: false
        })
      }
    } catch (error) {
      console.error('Erro ao verificar status de moderação:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkModeratorStatus = async () => {
    if (!user) return

    try {
      const { data } = await supabase
        .rpc('is_user_moderator', { user_id_to_check: user.id })
      
      setIsModerator(data || false)
    } catch (error) {
      console.error('Erro ao verificar status de moderador:', error)
    }
  }

  const banUser = async (userId: string, reason?: string) => {
    if (!user || !isModerator) return { error: 'Sem permissão' }

    try {
      const { error } = await supabase
        .from('user_moderation')
        .insert({
          user_id: userId,
          moderator_id: user.id,
          action_type: 'ban',
          reason: reason || 'Violação das regras da comunidade'
        })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const suspendUser = async (userId: string, reason?: string) => {
    if (!user || !isModerator) return { error: 'Sem permissão' }

    try {
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 24) // 24 horas

      const { error } = await supabase
        .from('user_moderation')
        .insert({
          user_id: userId,
          moderator_id: user.id,
          action_type: 'suspend',
          reason: reason || 'Comportamento inadequado',
          expires_at: expiresAt.toISOString()
        })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const checkEmailBanned = async (email: string) => {
    try {
      const { data } = await supabase
        .rpc('is_email_banned', { email_to_check: email })
      
      return data || false
    } catch (error) {
      console.error('Erro ao verificar email banido:', error)
      return false
    }
  }

  return {
    moderationStatus,
    isModerator,
    loading,
    banUser,
    suspendUser,
    checkEmailBanned,
    refreshStatus: checkModerationStatus
  }
}
