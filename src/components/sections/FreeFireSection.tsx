import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { scrapingService } from '../../services/scrapingService';
import { FreeFireLine } from '../../types';

const FreeFireSection: React.FC = () => {
  const [lines, setLines] = useState<FreeFireLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLines, setExpandedLines] = useState<{ [key: string]: boolean }>({});

  // Mapeamento de fotos dos players
  const getPlayerPhoto = (nickname: string) => {
    const photoMap: { [key: string]: string } = {
      // Free Fire Mobile
      'Gus': '/images/LINES/GUS MOBILE.jpg',
      'Motovea7': '/images/LINES/MOTOVEA MOBILE.jpg',
      'Noda': '/images/LINES/NODA MOBILE.jpeg',
      'PETERxl': '/images/LINES/PETERXL MOBILE.jpg',
      'Kauã7xp': '/images/LINES/KAUANXP MOBILE.jpeg',
      'Sbriça': '/images/LINES/SBRIÇA MOBILR.jpg',
      'PUTSGRILO': '/images/LINES/PUTSGRILLO MOBILE.jpg',
      // Free Fire Emulator
      'LUCI': '/images/LINES/LUCI EMULADOR.jpeg',
      'Fubuki': '/images/LINES/FUBUKI EMULADOR.jpg',
      'GREGHI': '/images/LINES/GREGHI EMULADOR.jpg',
      'SIX9': '/images/LINES/SIX9 EMULADOR.jpg',
      'METEBALA': '/images/LINES/METEBALA EMULADOR.jpg',
      // LoL
      'Wizer': '/images/LINES/WIZE LOL.jpg',
      'Cariok': '/images/LINES/CARIOK LOL.jpg',
      'Roamer': '/images/LINES/ROAMER LOL.jpg_large',
      'TitaN': '/images/LINES/TITAN LOL.jpg_large',
      'Kuri': '/images/LINES/KURI LOL.jpg',
      'Sarkis': '/images/LINES/SARKIS LOL.jpg',
      'Xero': '/images/LINES/XERO LOL.jpg',
      // CS2
      'BIGUZERA': '/images/LINES/BIGUZERA CS.webp',
      'NQZ': '/images/LINES/NQZ CS.webp',
      'SNOWZIN': '/images/LINES/SNOWZIN CS.webp',
      'DAV1DEUS': '/images/LINES/DAV1DEUS CS.png',
      'DGT': '/images/LINES/DGT CS.webp',
      'RIKZ': '/images/LINES/RIKZ CS.webp',
      'Bruno': '/images/LINES/BRUNO CS.webp'
    };
    return photoMap[nickname] || null;
  };

  useEffect(() => {
    fetchFreeFireData();
  }, []);

  // Manter todas as lines minimizadas por padrão quando os dados são carregados
  useEffect(() => {
    if (lines.length > 0) {
      const expandedState: { [key: string]: boolean } = {};
      lines.forEach(line => {
        expandedState[line.id] = false;
      });
      setExpandedLines(expandedState);
    }
  }, [lines]);

  const fetchFreeFireData = async () => {
    try {
      setLoading(true);
      const data = await scrapingService.getFreeFireData();
      setLines(data);
    } catch (error) {
      console.error('Erro ao buscar dados do Free Fire:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLine = (lineId: string) => {
    setExpandedLines(prev => ({
      ...prev,
      [lineId]: !prev[lineId]
    }));
  };

  const getPositionColor = (position: string) => {
    switch (position.toLowerCase()) {
      case 'player': return 'bg-white text-black';
      case 'staff': return 'bg-yellow-600';
      case 'igl': return 'bg-purple-600';
      case 'fragger': return 'bg-red-600';
      case 'support': return 'bg-blue-600';
      case 'sniper': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 fade-in">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">CARREGANDO DADOS FREE FIRE</h2>
          <p className="text-gray-400">Buscando informações da Liquipedia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 fade-in max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          LINES
        </h1>
        <p className="text-gray-400 text-lg mb-6">paiN Gaming Mobile, Emulator, LoL & CS2</p>
      </div>

      {/* Lines */}
      <div className="space-y-6">
        {lines.map((line) => (
          <div key={line.id} className={`bg-black ${!expandedLines[line.id] ? 'bg-gray-900 bg-opacity-20 border-l border-r border-gray-600 mx-8' : 'mx-4'}`}>
            {/* Line Header - Clickable */}
            <button
              onClick={() => toggleLine(line.id)}
              className="w-full p-6 text-left transition-colors duration-300"
            >
              {/* Nome da line centralizado */}
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white">
                  {line.type === 'mobile' ? 'PAIN MOBILE' : 
                   line.type === 'emulator' ? 'PAIN EMULADOR' :
                   line.type === 'lol' ? 'PAIN LOL' : 'PAIN CS2'}
                </h2>
              </div>
              
              {/* Botão de minimizar centralizado e menor */}
              <div className="flex justify-center mb-4">
                <div 
                  className="bg-red-600 px-3 py-1 cursor-pointer hover:bg-red-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLine(line.id);
                  }}
                >
                  <span className="text-white font-bold text-xs">
                    {expandedLines[line.id] ? 'MINIMIZAR' : 'CONHECER'}
                  </span>
                </div>
              </div>
              
              {/* Preview com miniaturas - apenas quando minimizado */}
              {!expandedLines[line.id] && (
                <div className="flex items-center justify-center gap-1">
                  {line.players.slice(0, 3).map((player) => (
                    <div key={player.id} className="w-8 h-8 overflow-hidden border border-red-600 rounded-full">
                      {getPlayerPhoto(player.nickname) ? (
                        <img 
                          src={getPlayerPhoto(player.nickname)!} 
                          alt={`Foto de ${player.nickname}`}
                          className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                        />
                      ) : null}
                      <div className="w-full h-full bg-black flex items-center justify-center" style={{display: getPlayerPhoto(player.nickname) ? 'none' : 'flex'}}>
                        <span className="text-xs font-bold text-gray-400">?</span>
                      </div>
                    </div>
                  ))}
                  {line.players.length > 3 && (
                    <div className="w-8 h-8 bg-black border border-red-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-400">+{line.players.length - 3}</span>
                    </div>
                  )}
                </div>
              )}
            </button>

            {/* Players Grid - Collapsible */}
            {expandedLines[line.id] && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {line.players.map((player) => (
                    <div key={player.id} className="bg-black p-6 text-center">
                      {/* Player Photo */}
                      <div className="w-24 h-24 mx-auto mb-4 overflow-hidden border-2 border-red-600 rounded-full">
                        {getPlayerPhoto(player.nickname) ? (
                          <img 
                            src={getPlayerPhoto(player.nickname)!} 
                            alt={`Foto de ${player.nickname}`}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              // Fallback caso a imagem não carregue
                              e.currentTarget.style.display = 'none';
                              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                              if (nextElement) {
                                nextElement.style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full bg-black flex items-center justify-center" style={{display: getPlayerPhoto(player.nickname) ? 'none' : 'flex'}}>
                          <span className="text-lg font-bold text-gray-400">?</span>
                        </div>
                      </div>

                      {/* Player Info */}
                      <h3 className="text-xl font-bold text-red-600 mb-2">{player.nickname}</h3>
                      <p className="text-gray-400 text-base mb-2">{player.name}</p>
                      
                      {/* Join Date */}
                      <p className="text-gray-500 text-sm mb-3">
                        Entrou em: {new Date(player.joinDate).toLocaleDateString('pt-BR')}
                      </p>
                      
                      {/* Position Badge */}
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPositionColor(player.position)}`}>
                        {player.position}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center">
        <div className="bg-black border border-red-600 p-6">
          <h3 className="text-lg font-bold text-red-600 mb-4">INFORMAÇÕES</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                     <div>
                       <h4 className="font-semibold text-white mb-2">PAIN GAMING MOBILE</h4>
                       <p>Equipe oficial de Free Fire Mobile da paiN Gaming</p>
                     </div>
                     <div>
                       <h4 className="font-semibold text-white mb-2">PAIN GAMING EMULADOR</h4>
                       <p>Equipe de Free Fire Emulator da torcida Faz o P</p>
                     </div>
                     <div>
                       <h4 className="font-semibold text-white mb-2">PAIN GAMING LOL</h4>
                       <p>Equipe oficial de League of Legends da paiN Gaming</p>
                     </div>
                     <div>
                       <h4 className="font-semibold text-white mb-2">PAIN GAMING CS2</h4>
                       <p>Equipe oficial de Counter-Strike 2 da paiN Gaming</p>
                     </div>
                   </div>
          <div className="mt-4">
            <a
              href="https://liquipedia.net/freefire/PaiN_Gaming"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
            >
              <ExternalLink size={16} />
              <span>Ver na Liquipedia</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeFireSection;
