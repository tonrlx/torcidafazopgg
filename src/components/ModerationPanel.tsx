import React, { useState } from 'react'
import { useModeration } from '../hooks/useModeration'
import { supabase } from '../lib/supabase'
import SeloP from './SeloP'
import { Ban, Clock, User, Shield } from 'lucide-react'

interface ModerationPanelProps {
  onClose: () => void
}

const ModerationPanel: React.FC<ModerationPanelProps> = ({ onClose }) => {
  const { isModerator } = useModeration()
  const [targetUserId, setTargetUserId] = useState('')
  const [reason, setReason] = useState('')
  const [action, setAction] = useState<'ban' | 'suspend'>('suspend')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  if (!isModerator) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-black border border-red-600 p-8 max-w-md text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Acesso Negado</h2>
          <p className="text-gray-300 mb-6">
            Apenas moderadores podem acessar este painel.
          </p>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition-colors duration-300"
          >
            Fechar
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!targetUserId.trim()) return

    setLoading(true)
    setMessage('')

    try {
      // Buscar usuário por email ou username
      const { data: userData, error: userError } = await supabase
        .from('user_profiles')
        .select('id')
        .or(`username.eq.${targetUserId},full_name.ilike.%${targetUserId}%`)
        .single()

      if (userError || !userData) {
        setMessage('Usuário não encontrado')
        setLoading(false)
        return
      }

      const { banUser, suspendUser } = useModeration()
      
      const result = action === 'ban' 
        ? await banUser(userData.id, reason)
        : await suspendUser(userData.id, reason)

      if (result.error) {
        setMessage('Erro ao aplicar moderação')
      } else {
        setMessage(`${action === 'ban' ? 'Banimento' : 'Suspensão'} aplicado com sucesso!`)
        setTargetUserId('')
        setReason('')
      }
    } catch (error) {
      setMessage('Erro ao processar solicitação')
    }

    setLoading(false)
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-black border border-red-600 p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <SeloP size="md" />
            <h2 className="text-2xl font-bold text-white">Painel de Moderação</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Ação
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="suspend"
                  checked={action === 'suspend'}
                  onChange={(e) => setAction(e.target.value as 'ban' | 'suspend')}
                  className="text-red-600"
                />
                <span className="text-white flex items-center">
                  <Clock size={16} className="mr-1" />
                  Suspender (24h)
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="ban"
                  checked={action === 'ban'}
                  onChange={(e) => setAction(e.target.value as 'ban' | 'suspend')}
                  className="text-red-600"
                />
                <span className="text-white flex items-center">
                  <Ban size={16} className="mr-1" />
                  Banir
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Usuário (username ou nome)
            </label>
            <input
              type="text"
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:border-red-600"
              placeholder="Digite o username ou nome"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Motivo (opcional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:border-red-600 resize-none"
              rows={3}
              placeholder="Motivo da moderação..."
            />
          </div>

          {message && (
            <div className={`p-3 rounded text-sm ${
              message.includes('sucesso') 
                ? 'bg-green-900 text-green-300 border border-green-600'
                : 'bg-red-900 text-red-300 border border-red-600'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !targetUserId.trim()}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Processando...' : `${action === 'ban' ? 'Banir' : 'Suspender'} Usuário`}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModerationPanel
