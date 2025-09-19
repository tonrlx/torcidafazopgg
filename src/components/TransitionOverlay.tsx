import React from 'react';
import { TransitionOverlayProps } from '../types';
import { ASSETS } from '../constants/assets';

const TransitionOverlay: React.FC<TransitionOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-20 flex items-center justify-center">
      <img 
        src={ASSETS.transition}
        alt="Carregando..." 
        className="w-32 h-32 animate-pulse"
        loading="eager"
        onError={(e) => {
          console.error('Erro ao carregar imagem de transição');
          e.currentTarget.src = ASSETS.logo;
        }}
      />
    </div>
  );
};

export default TransitionOverlay;