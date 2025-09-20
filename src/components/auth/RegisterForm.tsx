import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { X, Eye, EyeOff, CheckCircle } from 'lucide-react'

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
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { signUp, checkUsernameAvailability } = useAuth()

  const handleUsernameChange = async (value: string) => {
    setUsername(value)
    if (value.length >= 3) {
      setCheckingUsername(true)
      const isAvailable = await checkUsernameAvailability(value)
      setCheckingUsername(false)
      if (!isAvailable) {
        setError('Nome de usuário já está em uso')
      } else {
        setError('')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!fullName.trim()) {
      setError('Nome completo é obrigatório')
      setLoading(false)
      return
    }

    if (!username.trim() || username.length < 3) {
      setError('Nome de usuário deve ter pelo menos 3 caracteres')
      setLoading(false)
      return
    }

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

    const { error } = await signUp(email, password, fullName, username)
    
    if (error) {
      setError(error.message || 'Erro ao criar conta. Tente novamente.')
    } else {
      setSuccess(true)
    }
    
    setLoading(false)
  }

  if (success) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div 
          className="bg-black border border-red-600 p-8 w-full max-w-md text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Conta Criada!</h2>
          <p className="text-gray-300 mb-6">
            Verifique seu email para confirmar a conta e poder comentar nas matérias.
          </p>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded transition-colors duration-300"
          >
            Fechar
          </button>
        </div>
      </div>
    )
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
              Nome de Usuário
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:border-red-600 pr-12"
                placeholder="seu_usuario"
                required
                minLength={3}
                maxLength={20}
              />
              {checkingUsername && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Apenas letras, números e _ (3-20 caracteres)
            </div>
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
                placeholder="Digite a senha novamente"
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
    </div>
  )
}

export default RegisterForm
