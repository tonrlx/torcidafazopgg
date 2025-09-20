import React from 'react'

interface SeloPProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SeloP: React.FC<SeloPProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src="/images/SELO P.svg" 
        alt="SELO P" 
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback se a imagem não carregar
          e.currentTarget.style.display = 'none'
          e.currentTarget.nextElementSibling?.classList.remove('hidden')
        }}
      />
      <div className="hidden w-full h-full bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
        P
      </div>
    </div>
  )
}

export default SeloP
