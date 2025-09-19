import React from 'react';
import { agendaData } from '../../data/agendaData';
import { ExternalLink, Play, Calendar, Clock, Trophy } from 'lucide-react';

const AgendaSection: React.FC = () => {
  const getGameColor = (game: string) => {
    return game === 'CS2' ? 'text-orange-400' : 'text-blue-400';
  };

  const getGameBgColor = (game: string) => {
    return game === 'CS2' ? 'bg-orange-600' : 'bg-blue-600';
  };

  return (
    <div className="container mx-auto px-4 py-8 fade-in max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        AGENDA
      </h1>
      
      <div className="space-y-6">
        {agendaData.length === 0 ? (
          <div className="bg-black border border-red-600 p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">NENHUM COMPROMISSO AGENDADO</h2>
            <p className="text-gray-300">
              Não há compromissos confirmados no momento. Acompanhe nossas redes sociais para atualizações.
            </p>
          </div>
        ) : (
          agendaData.map((event) => (
          <div key={event.id} className="bg-black border border-red-600 p-6 hover:border-red-500 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-xl font-bold text-red-600">{event.event}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold text-white rounded ${getGameBgColor(event.game)}`}>
                    {event.game}
                  </span>
                </div>
                
                <p className="text-white text-lg mb-2">{event.championship}</p>
                
                <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span className="font-semibold">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span className="font-semibold">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Play size={14} />
                    <span className="font-semibold">{event.platform}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 lg:ml-6">
                <a
                  href={event.streamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 glow-red"
                >
                  <Play size={16} />
                  <span>Assistir</span>
                </a>
                
                <a
                  href={event.hltvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-all duration-300"
                >
                  <ExternalLink size={16} />
                  <span>Ver Detalhes</span>
                </a>
              </div>
            </div>
          </div>
        ))
        )}
      </div>
    </div>
  );
};

export default AgendaSection;