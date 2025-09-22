import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogPosts, getFeaturedPosts, BlogPost } from '../../data/blogData';


const NewsSection: React.FC = () => {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BlogPost['category']>('noticia');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Função para converter markdown simples para HTML
  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  // Função para gerar URL da matéria
  const getArticleUrl = (post: BlogPost) => {
    return `/${post.category}/${post.id}`;
  };


  const getCategoryLabel = (category: BlogPost['category']) => {
    switch (category) {
      case 'noticia': return 'Notícia';
      case 'opiniao': return 'Opinião';
      case 'analise': return 'Análise';
      default: return category;
    }
  };

  const getCategoryColor = (category: BlogPost['category']) => {
    switch (category) {
      case 'noticia': return 'bg-red-600';
      case 'opiniao': return 'bg-black border border-red-600';
      case 'analise': return 'bg-red-800';
      default: return 'bg-gray-600';
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = getFeaturedPosts();

  // Listener para abrir post específico vindo do widget
  useEffect(() => {
    const handleOpenPost = (event: CustomEvent) => {
      const { postId } = event.detail;
      setExpandedPost(postId);
    };

    window.addEventListener('openPost', handleOpenPost as EventListener);
    
    return () => {
      window.removeEventListener('openPost', handleOpenPost as EventListener);
    };
  }, []);

  // Se há um post expandido, mostrar em tela cheia
  if (expandedPost) {
    const post = blogPosts.find(p => p.id === expandedPost);
    if (!post) return null;

  return (
      <div className="min-h-screen bg-black text-white">

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
                    href="https://www.instagram.com/torcidafazop_?igsh=aDd0dHE3dm5rMm5y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base transition-colors duration-300"
                    style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
                  >
                    INSTAGRAM
                  </a>
                  <a
                    href="https://x.com/torcidafazop?s=21"
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
  }

  return (
    <div className="container mx-auto px-4 py-8 fade-in max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">REDAÇÃO TFP</h1>
        <p className="text-gray-400 text-lg">Notícias, opiniões e análises do mundo dos esports</p>
      </div>

      {/* Filtros */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory('noticia')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCategory === 'noticia' 
                ? 'bg-red-600 text-white' 
                : 'bg-black text-gray-300 hover:bg-red-600 border border-red-600'
            }`}
          >
            Notícias
          </button>
          <button
            onClick={() => setSelectedCategory('opiniao')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCategory === 'opiniao' 
                ? 'bg-red-600 text-white' 
                : 'bg-black text-gray-300 hover:bg-red-600 border border-red-600'
            }`}
          >
            Opiniões
          </button>
                        <button
            onClick={() => setSelectedCategory('analise')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCategory === 'analise' 
                ? 'bg-red-600 text-white' 
                : 'bg-black text-gray-300 hover:bg-red-600 border border-red-600'
            }`}
          >
            Análises
                        </button>
                      </div>
        
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Buscar posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
          />
        </div>
                    </div>

      {/* Posts em destaque - 3 últimos */}
      {selectedCategory === 'all' && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Últimas Publicações</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-black border border-gray-600 hover:border-red-600 transition-colors duration-300">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(post.category)}`}>
                      {getCategoryLabel(post.category)}
                    </span>
                  </div>
                  
                  {/* Foto pequena */}
                  {post.image && (
                    <div className="w-full h-32 mb-3 overflow-hidden rounded">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="text-gray-400">
                      Por: <span className="text-white font-semibold">{post.author}</span>
                    </span>
                    <span className="text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setExpandedPost(post.id)}
                    className="w-full mt-3 text-red-600 hover:text-red-700 font-semibold text-sm"
                  >
                    Ler mais
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de posts */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          {selectedCategory === 'all' ? 'Todos os Posts' : getCategoryLabel(selectedCategory)}
        </h2>
        
        {filteredPosts.length === 0 ? (
          <div className="bg-black border border-gray-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              {blogPosts.length === 0 ? 'Nenhum conteúdo publicado ainda' : 'Nenhum post encontrado'}
            </h3>
            <p className="text-gray-400">
              {blogPosts.length === 0 
                ? 'Em breve teremos novidades para compartilhar com vocês!' 
                : 'Tente ajustar os filtros ou termo de busca.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-black border border-gray-600 hover:border-red-600 transition-colors duration-300">
                {/* Versão minimizada */}
                {expandedPost !== post.id && (
                  <div className="p-3 sm:p-4">
                    <div className="space-y-3">
                      {/* Categoria */}
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(post.category)}`}>
                          {getCategoryLabel(post.category)}
                        </span>
                      </div>

                      {/* Foto pequena - Formato 16:9 */}
                      {post.image && (
                        <div className="w-full aspect-video overflow-hidden rounded">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Título */}
                      <button
                        onClick={() => setExpandedPost(post.id)}
                        className="text-left w-full"
                      >
                        <h3 className="text-xs sm:text-sm font-bold text-white hover:text-red-600 transition-colors duration-300 mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                      </button>

                      {/* 3 linhas de prévia */}
                      <div className="text-gray-300 text-xs leading-relaxed">
                        <p className="line-clamp-2 sm:line-clamp-3">{post.excerpt}</p>
                      </div>

                      {/* Por: Usuário */}
                      <div className="text-xs text-gray-400">
                        <span>
                          Por: <span className="text-white font-semibold">{post.author}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;