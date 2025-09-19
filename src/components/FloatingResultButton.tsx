import React, { useState, useEffect } from 'react';
import { Trophy, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';
import { scrapingService, PainResult } from '../services/scrapingService';

const FloatingResultButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [latestResults, setLatestResults] = useState<PainResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestResults = async () => {
      try {
        const results = await scrapingService.getLatestResults();
        setLatestResults(results);
      } catch (error) {
        console.error('Erro ao buscar últimos resultados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestResults();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-red-600 text-white p-4 rounded-full shadow-lg flex items-center space-x-2">
          <Trophy size={20} />
          <span className="font-bold">CARREGANDO...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botão principal */}
      <div className="relative">
        <button
          onClick={handleToggle}
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
        >
          <Trophy size={20} />
          <span className="font-bold">ÚLTIMOS RESULTADOS</span>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
        
        {/* Badge de notificação */}
        {latestResults.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            {latestResults.length}
          </div>
        )}
      </div>

      {/* Card expandido */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-black border-2 border-red-600 rounded-lg p-4 w-96 shadow-xl max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-red-600 flex items-center">
              <Trophy className="mr-2" size={18} />
              ÚLTIMOS RESULTADOS
            </h3>
            <button
              onClick={handleToggle}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ChevronDown size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            {latestResults.length === 0 ? (
              <div className="text-center text-gray-400 py-4">
                <Trophy size={48} className="mx-auto mb-4 text-gray-600" />
                <p>Nenhum resultado encontrado</p>
                <p className="text-sm">Tentando buscar dados...</p>
              </div>
            ) : (
              latestResults.map((result) => (
                <div key={result.id} className="bg-gray-900 border border-gray-700 p-3 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">
                      {result.team1}
                    </span>
                    <span className="text-gray-400 mx-2">vs</span>
                    <span className="text-white font-semibold">
                      {result.team2}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {result.result}
                    </div>
                    <div className="text-sm text-gray-400">
                      {result.tournament}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(result.date)}
                    </div>
                    <div className={`text-xs mt-1 font-semibold ${
                      result.game === 'cs2' ? 'text-orange-400' : 
                      result.game === 'lol' ? 'text-blue-400' : 'text-green-400'
                    }`}>
                      {result.game.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <a
                      href={
                        result.game === 'cs2' ? 'https://www.hltv.org/team/6665/pain' : 
                        result.game === 'lol' ? 'https://lolesports.com/pt-BR/leagues/first_stand,lta_cross,lta_s,msi,worlds' :
                        'https://liquipedia.net/freefire/Main_Page'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 px-3 rounded text-sm font-semibold transition-colors flex items-center justify-center space-x-1"
                    >
                      <ExternalLink size={14} />
                      <span>Ver no {
                        result.game === 'cs2' ? 'HLTV' : 
                        result.game === 'lol' ? 'LoL Esports' : 'Liquipedia'
                      }</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="pt-2 border-t border-gray-700">
            <button
              onClick={handleToggle}
              className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            >
              Minimizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingResultButton;
