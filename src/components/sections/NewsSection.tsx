import React, { useState } from 'react';
import { newsData } from '../../data/newsData';
import NewsSidebar from '../NewsSidebar';
import { ASSETS } from '../../constants/assets';
import OptimizedImage from '../OptimizedImage';

const NewsSection: React.FC = () => {
  const [expandedNews, setExpandedNews] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Conteúdo principal */}
        <div className="flex-1 max-h-screen overflow-y-auto pr-4">
          <div className="space-y-6">
            {newsData.map((article) => (
              <div key={article.id} className="bg-black border border-red-600">
                {/* Versão minimizada */}
                {expandedNews !== article.id && (
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <OptimizedImage
                        src={ASSETS.news.capaMateria}
                        alt="Thumbnail da matéria"
                        className="w-32 h-20 object-cover"
                        width={128}
                        height={80}
                      />
                      <div className="flex-1">
                        <button
                          onClick={() => setExpandedNews(article.id)}
                          className="text-left w-full"
                        >
                          <h2 className="text-xl font-bold text-red-600 hover:text-red-700 transition-colors duration-300 mb-2">
                            {article.title}
                          </h2>
                          <p className="text-gray-300 text-sm">
                            Clique para ler a matéria completa
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Versão expandida */}
                {expandedNews === article.id && (
                  <div>
                    <div className="mb-0">
                      <OptimizedImage
                        src={ASSETS.news.capaMateria}
                        alt="Imagem da matéria"
                        className="w-full h-64 md:h-96 object-cover border-b border-red-600"
                        priority={true}
                      />
                    </div>
                    <div className="p-6">
                      <button
                        onClick={() => setExpandedNews(null)}
                        className="w-full text-left mb-6"
                      >
                        <h2 className="text-2xl md:text-3xl font-bold text-red-600 hover:text-red-700 transition-colors duration-300">
                          {article.title}
                        </h2>
                        <p className="text-gray-300 mt-2">
                          Clique para minimizar
                        </p>
                      </button>
                      <div className="prose prose-lg max-w-none">
                        {article.content.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="text-white leading-relaxed mb-6">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <NewsSidebar />
      </div>
    </div>
  );
};

export default NewsSection;