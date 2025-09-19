import React from 'react';
import { TransitionOverlayProps } from '../types';

const TransitionOverlay: React.FC<TransitionOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-20 transition-opacity duration-500">
    </div>
  );
};

export default TransitionOverlay;