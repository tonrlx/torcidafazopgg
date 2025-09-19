import React, { useState, useEffect } from 'react';
import { Smartphone, Trophy, Target, Zap, Calendar, Award } from 'lucide-react';
import { scrapingService, PainMobileStats } from '../services/scrapingService';

const MobileStats: React.FC = () => {
  const [stats, setStats] = useState<PainMobileStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const mobileStats = await scrapingService.getPainMobileStats();
        setStats(mobileStats);
      } catch (error) {
        console.error('Erro ao buscar estatísticas mobile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'A':
        return 'text-red-400 bg-red-900';
      case 'B':
        return 'text-orange-400 bg-orange-900';
      case 'C':
        return 'text-yellow-400 bg-yellow-900';
      case 'D':
        return 'text-gray-400 bg-gray-900';
      default:
        return 'text-gray-400 bg-gray-900';
    }
  };

  const getPositionColor = (position: number) => {
    if (position === 1) return 'text-yellow-400';
    if (position === 2) return 'text-gray-300';
    if (position === 3) return 'text-orange-400';
    return 'text-gray-400';
  };

  const getFormatColor = (format: string) => {
    return format === 'Battle Royale' ? 'text-blue-400' : 'text-purple-400';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-black border border-red-600 p-6">
        <h3 className="text-xl font-bold mb-4 text-red-600">
          ESTATÍSTICAS PAIN MOBILE
        </h3>
        <div className="text-center text-gray-400">
          Carregando estatísticas...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-red-600 p-6">
      <h3 className="text-xl font-bold mb-4 text-red-600">
        ESTATÍSTICAS PAIN MOBILE
      </h3>
      
      <div className="space-y-4">
        {stats.length === 0 ? (
          <div className="text-center text-gray-400 py-4">
            Nenhuma estatística disponível
          </div>
        ) : (
          stats.map((stat) => (
            <div key={stat.id} className="bg-gray-900 border border-gray-700 p-4 rounded hover:border-red-600 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getTierColor(stat.tier)}`}>
                    {stat.tier}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{stat.tournament}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Calendar size={12} />
                      <span>{formatDate(stat.date)}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`text-2xl font-bold ${getPositionColor(stat.position)}`}>
                  #{stat.position}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-400 text-sm mb-1">
                    <Trophy size={14} />
                    <span>Pontos</span>
                  </div>
                  <div className="text-xl font-bold text-green-400">{stat.points}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-400 text-sm mb-1">
                    <Target size={14} />
                    <span>Kills</span>
                  </div>
                  <div className="text-xl font-bold text-red-400">{stat.kills}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-400 text-sm mb-1">
                    <Zap size={14} />
                    <span>Formato</span>
                  </div>
                  <div className={`text-sm font-semibold ${getFormatColor(stat.format)}`}>
                    {stat.format}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Award size={12} />
                  <span>Tier {stat.tier}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Smartphone size={12} />
                  <span>Free Fire Mobile</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-xs text-gray-500 mb-2">
          Dados atualizados da Liquipedia Free Fire
        </div>
        <a
          href="https://liquipedia.net/freefire/Main_Page"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-red-400 hover:text-red-300 text-sm transition-colors"
        >
          <Smartphone size={14} />
          <span>Ver na Liquipedia</span>
        </a>
      </div>
    </div>
  );
};

export default MobileStats;
