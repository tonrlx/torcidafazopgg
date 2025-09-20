import React from 'react'

interface UserAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, size = 'md', className = '' }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg'
  }

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        bg-red-600 
        text-white 
        rounded-full 
        flex items-center justify-center 
        font-semibold
        ${className}
      `}
    >
      {getInitials(name)}
    </div>
  )
}

export default UserAvatar
