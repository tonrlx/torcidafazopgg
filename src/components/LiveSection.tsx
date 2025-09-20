import React from 'react';
import { ExternalLink } from 'lucide-react';
import { liveChannels } from '../data/liveData';

const LiveSection: React.FC = () => {
  const openChannel = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">
        CANAIS OFICIAIS
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-6xl mx-auto">
        {liveChannels.map((channel) => (
          <div key={channel.id} className="bg-black border border-gray-600 p-3 md:p-6 hover:border-red-600 transition-colors duration-300 text-center">
            {/* Foto do canal */}
            <div className="w-12 h-12 md:w-24 md:h-24 rounded-full mx-auto mb-2 md:mb-4 overflow-hidden border-2 border-gray-600">
              <img 
                src={channel.photo} 
                alt={`Foto de ${channel.name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback caso a imagem não carregue
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gray-800 flex items-center justify-center" style={{display: 'none'}}>
                <span className="text-gray-400 text-xs md:text-2xl">?</span>
              </div>
            </div>
            
            <h3 className="text-xs md:text-lg font-bold text-white mb-1 md:mb-2 truncate">{channel.name}</h3>
            <p className="text-red-600 text-xs md:text-sm font-semibold mb-1 md:mb-2">{channel.specification}</p>
            <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-4 capitalize hidden md:block">{channel.platform}</p>
            
            <button
              onClick={() => openChannel(channel.url)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-1 md:py-2 px-2 md:px-4 transition-all duration-300 flex items-center justify-center space-x-1 md:space-x-2 text-xs md:text-sm"
            >
              <ExternalLink size={12} className="md:w-4 md:h-4" />
              <span className="hidden md:inline">ACESSAR CANAL</span>
              <span className="md:hidden">ACESSAR</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveSection;
