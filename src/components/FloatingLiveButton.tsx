import React, { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import { checkLiveStatus, LiveChannel } from '../data/liveData';

interface FloatingLiveButtonProps {
  onScrollToLives: () => void;
}

const FloatingLiveButton: React.FC<FloatingLiveButtonProps> = ({ onScrollToLives }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [liveCount, setLiveCount] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const checkLives = async () => {
      try {
        const channels = await checkLiveStatus();
        const liveChannels = channels.filter(channel => channel.isLive);
        setLiveCount(liveChannels.length);
        setIsVisible(liveChannels.length > 0);
      } catch (error) {
        console.error('Erro ao verificar lives:', error);
      }
    };

    checkLives();
    
    // Verificar a cada 30 segundos
    const interval = setInterval(checkLives, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isMinimized ? (
        <div className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg shadow-lg cursor-pointer transition-all duration-300 glow-red">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="font-bold text-sm">AO VIVO</span>
            </div>
            <div className="text-xs bg-red-800 px-2 py-1 rounded-full">
              {liveCount}
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <button
            onClick={onScrollToLives}
            className="mt-2 w-full bg-white text-red-600 font-bold py-2 px-3 rounded text-sm hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-1"
          >
            <Play size={14} />
            <span>VER LIVES</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 glow-red"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-bold text-sm">AO VIVO</span>
            <div className="text-xs bg-red-800 px-2 py-1 rounded-full">
              {liveCount}
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default FloatingLiveButton;
