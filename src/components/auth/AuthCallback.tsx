import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

const AuthCallback: React.FC = () => {
  const { user } = useAuth()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Verificar se há parâmetros de confirmação na URL
        const urlParams = new URLSearchParams(window.location.search)
        const accessToken = urlParams.get('access_token')
        const refreshToken = urlParams.get('refresh_token')
        const error = urlParams.get('error')
        const errorDescription = urlParams.get('error_description')

        if (error) {
          setStatus('error')
          setMessage(errorDescription || 'Erro na confirmação do email')
          return
        }

        if (accessToken && refreshToken) {
          // Tokens recebidos, confirmação bem-sucedida
          setStatus('success')
          setMessage('Conta autorizada')
          
          // Redirecionar para torcidafazop.com.br após 3 segundos
          setTimeout(() => {
            window.location.href = 'https://torcidafazop.com.br'
          }, 3000)
        } else if (user && user.email_confirmed_at) {
          // Usuário já confirmado
          setStatus('success')
          setMessage('Conta autorizada')
          
          setTimeout(() => {
            window.location.href = 'https://torcidafazop.com.br'
          }, 2000)
        } else {
          // Aguardando confirmação
          setStatus('loading')
          setMessage('Aguardando confirmação...')
        }
      } catch (error) {
        console.error('Erro no callback de autenticação:', error)
        setStatus('error')
        setMessage('Erro interno. Tente novamente.')
      }
    }

    handleAuthCallback()
  }, [user])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 w-full max-w-md text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 text-red-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold mb-4">Confirmando Email...</h2>
            <p className="text-gray-300">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-green-500">{message}</h2>
            <p className="text-sm text-gray-400">
              Redirecionando para torcidafazop.com.br...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-red-500">Erro na Confirmação</h2>
            <p className="text-gray-300 mb-4">{message}</p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition-colors duration-300"
            >
              Voltar ao Início
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default AuthCallback
