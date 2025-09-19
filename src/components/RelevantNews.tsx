import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Clock, Globe, RefreshCw } from 'lucide-react';
import { scrapingService, NewsItem } from '../services/scrapingService';

const RelevantNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [expandedNews, setExpandedNews] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      const latestNews = await scrapingService.getLatestNews();
      setNews(latestNews);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Atualização automática a cada 5 minutos
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Agora mesmo';
    } else if (diffInHours < 24) {
      return `Há ${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Mais Esports':
        return 'bg-blue-600';
      case 'The Radioativo':
        return 'bg-green-600';
      case 'UOL Esporte':
        return 'bg-yellow-600';
      case 'Free Fire Mania':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="bg-black border border-red-600 p-6">
        <h3 className="text-xl font-bold mb-4 text-red-600 flex items-center">
          <Newspaper className="mr-2" size={20} />
          NOTÍCIAS RELEVANTES
        </h3>
        <div className="text-center text-gray-400">
          Carregando notícias...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-red-600 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-red-600">
          NOTÍCIAS RELEVANTES
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={fetchNews}
            disabled={loading}
            className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            title="Atualizar notícias"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <span className="text-xs text-gray-500">
            Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
          </span>
        </div>
      </div>
      
      <div className="space-y-6">
        {news.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <Newspaper size={48} className="mx-auto mb-4 text-gray-600" />
            <p>Nenhuma notícia relevante encontrada nos últimos 30 dias</p>
          </div>
        ) : (
          news.map((item) => (
            <div key={item.id} className="bg-black border border-red-600">
              {/* Versão minimizada */}
              {expandedNews !== item.id && (
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-20 bg-gray-800 border border-gray-600 flex items-center justify-center">
                      <Newspaper size={24} className="text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <button
                        onClick={() => setExpandedNews(item.id)}
                        className="text-left w-full"
                      >
                        <h4 className="text-xl font-bold text-red-600 hover:text-red-700 transition-colors duration-300 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-sm mb-2">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span className={`px-2 py-1 text-xs font-semibold text-white rounded ${getSourceColor(item.source)}`}>
                            {item.source}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{formatTimeAgo(item.publishedAt)}</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Versão expandida */}
              {expandedNews === item.id && (
                <div>
                  <div className="p-6">
                    <button
                      onClick={() => setExpandedNews(null)}
                      className="w-full text-left mb-6"
                    >
                      <h4 className="text-2xl md:text-3xl font-bold text-red-600 hover:text-red-700 transition-colors duration-300 mb-4">
                        {item.title}
                      </h4>
                      <p className="text-gray-300 mb-4">
                        Clique para minimizar
                      </p>
                    </button>
                    
                    <div className="prose prose-lg max-w-none mb-6">
                      <p className="text-white leading-relaxed mb-6 text-lg">
                        {item.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 text-sm font-semibold text-white rounded ${getSourceColor(item.source)}`}>
                          {item.source}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-400 text-sm">
                          <Clock size={14} />
                          <span>{formatTimeAgo(item.publishedAt)}</span>
                        </div>
                      </div>
                      
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 transition-all duration-300 glow-red"
                      >
                        <ExternalLink size={16} />
                        <span>Ler matéria completa</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 text-center">
        <div className="flex justify-center space-x-4 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Globe size={12} />
            <span>Mais Esports</span>
          </div>
          <div className="flex items-center space-x-1">
            <Globe size={12} />
            <span>The Radioativo</span>
          </div>
          <div className="flex items-center space-x-1">
            <Globe size={12} />
            <span>UOL Esporte</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelevantNews;
