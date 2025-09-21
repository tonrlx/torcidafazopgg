import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { X, Eye, EyeOff } from 'lucide-react'
import EmailConfirmationModal from './EmailConfirmationModal'

interface RegisterFormProps {
  onClose: () => void
  onSwitchToLogin: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose, onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const { signUp, checkUsernameAvailability } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validações
    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setLoading(false)
      return
    }

    if (username.length < 3) {
      setError('O username deve ter pelo menos 3 caracteres')
      setLoading(false)
      return
    }

    // Verificar disponibilidade do username
    const isUsernameAvailable = await checkUsernameAvailability(username)
    if (!isUsernameAvailable) {
      setError('Este username já está em uso')
      setLoading(false)
      return
    }

    const result = await signUp(email, password, fullName, username)
    
    if (result.error) {
      setError(result.error.message || 'Erro ao criar conta')
    } else if (result.message) {
      // Mostrar modal de confirmação de email
      setUserEmail(email)
      setShowEmailConfirmation(true)
    } else {
      onClose()
    }
    
    setLoading(false)
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-black border border-red-600 p-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">CRIAR CONTA</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:border-red-600"
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:border-red-600"
              placeholder="seuusuario"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:border-red-600"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:border-red-600 pr-12"
                placeholder="Mínimo 6 caracteres"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Confirmar Senha
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:border-red-600 pr-12"
                placeholder="Confirme sua senha"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Criando conta...' : 'CRIAR CONTA'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Já tem conta?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-red-600 hover:text-red-500 font-semibold"
            >
              Entrar
            </button>
          </p>
        </div>
      </div>

      {/* Modal de confirmação de email */}
      {showEmailConfirmation && (
        <EmailConfirmationModal
          email={userEmail}
          onClose={() => {
            setShowEmailConfirmation(false)
            onClose()
          }}
          onResendEmail={() => {
            // TODO: Implementar reenvio de email
            console.log('Reenviar email para:', userEmail)
          }}
        />
      )}
    </div>
  )
}

export default RegisterForm
