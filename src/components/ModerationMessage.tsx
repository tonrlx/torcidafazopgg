import React from 'react'
import { AlertTriangle, Clock, Ban } from 'lucide-react'

interface ModerationMessageProps {
  isBanned: boolean
  isSuspended: boolean
  reason?: string
  expiresAt?: string
}

const ModerationMessage: React.FC<ModerationMessageProps> = ({
  isBanned,
  isSuspended,
  reason,
  expiresAt
}) => {
  if (!isBanned && !isSuspended) return null

  const formatExpiration = (expiresAt: string) => {
    const date = new Date(expiresAt)
    return date.toLocaleString('pt-BR')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-red-900 border-2 border-red-600 p-8 max-w-md w-full text-center">
        <div className="mb-6">
          {isBanned ? (
            <Ban className="w-16 h-16 text-red-500 mx-auto mb-4" />
          ) : (
            <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          )}
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          {isBanned ? 'VOCÊ FOI BANIDO' : 'VOCÊ FOI SILENCIADO TEMPORARIAMENTE'}
        </h2>

        <div className="text-white mb-6">
          <p className="text-lg mb-2">
            {isBanned ? 'POR UM ADM' : 'POR 24H POR UM ADM'}
          </p>
          
          {reason && (
            <p className="text-sm text-gray-300 mb-4">
              <strong>Motivo:</strong> {reason}
            </p>
          )}

          {isSuspended && expiresAt && (
            <p className="text-sm text-yellow-300">
              <strong>Expira em:</strong> {formatExpiration(expiresAt)}
            </p>
          )}
        </div>

        <div className="bg-red-800 border border-red-600 p-4 rounded">
          <p className="text-sm text-white">
            {isBanned 
              ? 'Sua conta foi permanentemente banida. Você não pode mais criar contas com este email.'
              : 'Sua conta está suspensa temporariamente. Você poderá voltar a comentar após o período de suspensão.'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default ModerationMessage
