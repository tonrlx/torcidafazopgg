import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Bell } from 'lucide-react';
import { getRecentPosts } from '../data/blogData';

const FloatingNewsWidget: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [latestPost, setLatestPost] = useState<any>(null);

  useEffect(() => {
    const recentPosts = getRecentPosts(1);
    if (recentPosts.length > 0) {
      setLatestPost(recentPosts[0]);
    } else {
      // Se não há notícias, não mostrar o widget
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsMinimized(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  const getPreviewText = (text: string) => {
    const words = text.split(' ').slice(0, 5);
    return words.join(' ') + (text.split(' ').length > 5 ? '...' : '');
  };

  const handleReadComplete = () => {
    // Simular abertura da notícia completa
    // Em uma implementação real, isso abriria o modal de notícia
    console.log('Abrir notícia:', latestPost.id);
  };

  return (
    <div className={`fixed top-1/2 left-4 z-40 -translate-y-1/2 transition-all duration-1000 ease-in-out ${
      isMinimized ? 'max-w-16' : 'max-w-xs'
    }`}>
      {isMinimized ? (
        // Versão minimizada - bola preta com sino branco
        <div 
          className="w-12 h-12 bg-black rounded-full shadow-lg cursor-pointer hover:bg-gray-900 transition-all duration-700 hover:scale-105 flex items-center justify-center"
          onClick={() => setIsMinimized(false)}
        >
          <Bell size={20} className="text-white" />
        </div>
      ) : (
        // Versão expandida - widget completo
        <div className="relative bg-black border border-red-600 rounded-lg shadow-lg overflow-hidden transition-all duration-1000">
          {/* Logo TORCIDA como fundo */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img 
              src="/TORCIDA.png.png" 
              alt="TORCIDA" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          {/* Header */}
          <div className="relative bg-red-600 px-3 py-2 flex items-center justify-between transition-all duration-700">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-white animate-pulse transition-all duration-700" />
              <div className="w-2 h-2 bg-white rounded-full animate-pulse transition-all duration-700"></div>
              <span className="text-white text-xs font-semibold transition-all duration-700">ÚLTIMA NOTÍCIA</span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-red-200 transition-all duration-700"
            >
              <X size={14} />
            </button>
          </div>

          {/* Content */}
          <div className="relative p-3 transition-all duration-1000">
            {latestPost ? (
              <>
                {/* Image */}
                {latestPost.image && (
                  <div className="w-full h-24 mb-2 rounded overflow-hidden transition-all duration-1000">
                    <img
                      src={latestPost.image}
                      alt={latestPost.title}
                      className="w-full h-full object-cover transition-all duration-1000"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-white font-bold text-xs mb-2 line-clamp-2 transition-all duration-1000">
                  {latestPost.title}
                </h3>

                {/* Preview */}
                <p className="text-gray-300 text-xs mb-2 transition-all duration-1000">
                  {getPreviewText(latestPost.excerpt)}
                </p>

                {/* Category Badge */}
                <div className="flex items-center justify-between mb-2 transition-all duration-1000">
                  <span className={`text-xs px-2 py-1 rounded-full transition-all duration-700 ${
                    latestPost.category === 'noticia' 
                      ? 'bg-red-600 text-white' 
                      : latestPost.category === 'opiniao'
                      ? 'bg-black text-white border border-red-600'
                      : 'bg-red-800 text-white'
                  }`}>
                    {latestPost.category === 'noticia' ? 'NOTÍCIA' : 
                     latestPost.category === 'opiniao' ? 'OPINIÃO' : 'ANÁLISE'}
                  </span>
                  <span className="text-gray-400 text-xs transition-all duration-700">
                    {new Date(latestPost.publishedAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                {/* Read Button */}
                <button
                  onClick={handleReadComplete}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-3 rounded transition-all duration-1000 flex items-center justify-center gap-2"
                >
                  <ExternalLink size={10} />
                  LER COMPLETO
                </button>
              </>
            ) : (
              // Estado sem conteúdo
              <div className="text-center py-8">
                <Bell size={32} className="text-red-500 mx-auto mb-3 transition-all duration-1000" />
                <h3 className="text-red-400 font-semibold text-sm mb-2 transition-all duration-1000">
                  SEM NOVO CONTEÚDO
                </h3>
                <p className="text-gray-400 text-xs transition-all duration-1000">
                  Aguarde novas publicações da REDAÇÃO TFP
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingNewsWidget;