import React from 'react'
import { X, Mail, CheckCircle } from 'lucide-react'

interface EmailConfirmationModalProps {
  email: string
  onClose: () => void
  onResendEmail: () => void
}

const EmailConfirmationModal: React.FC<EmailConfirmationModalProps> = ({ 
  email, 
  onClose, 
  onResendEmail 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-red-600 p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <CheckCircle className="text-green-500 mr-2" size={28} />
            CONTA CRIADA!
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <div className="bg-red-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Mail className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Verifique seu email
            </h3>
            <p className="text-gray-300 text-sm">
              Enviamos um link de confirmação para:
            </p>
            <p className="text-red-500 font-semibold mt-1">
              {email}
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-2">📧 Próximos passos:</h4>
            <ol className="text-gray-300 text-sm space-y-1">
              <li>1. Abra seu email</li>
              <li>2. Procure por "Torcida Faz o P"</li>
              <li>3. Clique no link de confirmação</li>
              <li>4. Volte aqui e faça login</li>
            </ol>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-xs mb-4">
              Não recebeu o email? Verifique sua caixa de spam
            </p>
            <button
              onClick={onResendEmail}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 text-sm transition-colors duration-300 mr-2"
            >
              Reenviar Email
            </button>
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 text-sm transition-colors duration-300"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailConfirmationModal
