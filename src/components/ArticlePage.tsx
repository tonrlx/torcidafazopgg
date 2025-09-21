import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogData';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Função para converter markdown simples para HTML
  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  // Função para obter cor da categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'noticia': return 'bg-red-600';
      case 'opiniao': return 'bg-black border border-red-600';
      case 'analise': return 'bg-red-800';
      default: return 'bg-gray-600';
    }
  };

  // Função para obter label da categoria
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'noticia': return 'Notícia';
      case 'opiniao': return 'Opinião';
      case 'analise': return 'Análise';
      default: return category;
    }
  };

  // Encontrar a matéria pelo slug
  const post = blogPosts.find(p => p.id === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Matéria não encontrada</h1>
          <p className="text-gray-400 mb-6">A matéria que você está procurando não existe.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header com botão voltar */}
      <header className="bg-black border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          <div className="h-6 w-px bg-gray-600"></div>
          <span className="text-sm text-gray-400">REDAÇÃO TFP</span>
        </div>
      </header>

      {/* Conteúdo do artigo */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-4xl">
        {/* Título */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Imagem do artigo - Responsiva para mobile */}
        {post.image && (
          <div className="mb-6 md:mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 sm:h-56 md:h-80 lg:h-[450px] object-cover rounded-lg border border-gray-600"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Categoria e tags */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6 md:mb-8">
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getCategoryColor(post.category)}`}>
            {getCategoryLabel(post.category)}
          </span>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-1 sm:px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Conteúdo do artigo */}
        <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
          <div 
            className="text-white leading-relaxed text-sm sm:text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
          
          {/* Footer da matéria */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700">
            <div className="text-center mb-4 md:mb-6">
              <p className="text-gray-400 text-xs sm:text-sm mb-3 md:mb-4">
                <strong className="text-white">Torcida Faz o P</strong> • {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} • {new Date().toLocaleDateString('pt-BR')}
              </p>
              
              {/* Botões das redes sociais */}
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                <a
                  href="https://instagram.com/torcida_faz_p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base transition-colors duration-300"
                  style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://twitter.com/torcida_faz_p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base transition-colors duration-300"
                  style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
                >
                  TWITTER
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;
