import React, { useState } from 'react';
import { blogPosts, getFeaturedPosts, BlogPost } from '../../data/blogData';
import { Twitter, Instagram, ArrowLeft } from 'lucide-react';

// Dados dos autores
const authors = {
  'Redação TFP': {
    name: 'Redação TFP',
    avatar: '/images/PERFIL TOT.jpeg',
    twitter: 'https://twitter.com/torcida_faz_p',
    instagram: 'https://instagram.com/torcida_faz_p'
  },
  'Analista TFP': {
    name: 'Analista TFP',
    avatar: '/images/PERFIL PAIN GAMING.jpeg',
    twitter: 'https://twitter.com/torcida_faz_p',
    instagram: 'https://instagram.com/torcida_faz_p'
  },
  'Equipe de Análise TFP': {
    name: 'Equipe de Análise TFP',
    avatar: '/images/PERFIL PAIN GAMING.jpeg',
    twitter: 'https://twitter.com/torcida_faz_p',
    instagram: 'https://instagram.com/torcida_faz_p'
  },
  'Editorial TFP': {
    name: 'Editorial TFP',
    avatar: '/images/PERFIL TOT.jpeg',
    twitter: 'https://twitter.com/torcida_faz_p',
    instagram: 'https://instagram.com/torcida_faz_p'
  }
};

const NewsSection: React.FC = () => {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BlogPost['category'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

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
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = getFeaturedPosts();

  // Se há um post expandido, mostrar em tela cheia
  if (expandedPost) {
    const post = blogPosts.find(p => p.id === expandedPost);
    if (!post) return null;

    const author = authors[post.author as keyof typeof authors] || authors['Redação TFP'];

  return (
      <div className="min-h-screen bg-black text-white">
        {/* Header fixo */}
        <header className="bg-black border-b border-gray-600 p-4 sticky top-0 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={() => setExpandedPost(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Voltar
            </button>
            <div className="flex items-center gap-3">
              <img
                src="/images/TORCIDA.png.png"
                alt="Torcida Faz o P"
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h1 className="text-xl font-bold text-white">REDAÇÃO TFP</h1>
            </div>
            <div className="w-20"></div> {/* Espaçador para centralizar */}
          </div>
        </header>

        {/* Conteúdo do artigo */}
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Imagem do artigo */}
          {post.image && (
            <div className="mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg border border-gray-600"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Categoria e tags */}
          <div className="flex items-center gap-4 mb-8">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(post.category)}`}>
              {getCategoryLabel(post.category)}
            </span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Layout com conteúdo e perfil do autor */}
          <div className="flex gap-8">
            {/* Conteúdo do artigo */}
            <div className="flex-1">
              <div className="prose prose-lg max-w-none">
                <div className="text-white leading-relaxed text-lg whitespace-pre-line">
                  {post.content}
                </div>
              </div>
            </div>

            {/* Mini perfil do autor - lado direito */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 sticky top-24">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-600"
                    onError={(e) => {
                      e.currentTarget.src = '/images/PERFIL TOT.jpeg';
                    }}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{author.name}</h3>
                    <p className="text-gray-400 text-xs">
                      {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={author.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-center"
                    title="Twitter"
                  >
                    <Twitter size={16} className="text-white mx-auto" />
                  </a>
                  <a
                    href={author.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-center"
                    title="Instagram"
                  >
                    <Instagram size={16} className="text-white mx-auto" />
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
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-red-600 text-white' 
                : 'bg-black text-gray-300 hover:bg-red-600 border border-red-600'
            }`}
          >
            Todas
          </button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-black border border-gray-600 hover:border-red-600 transition-colors duration-300">
                {/* Versão minimizada */}
                {expandedPost !== post.id && (
                  <div className="p-4">
                    <div className="space-y-3">
                      {/* Categoria */}
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(post.category)}`}>
                          {getCategoryLabel(post.category)}
                        </span>
                      </div>

                      {/* Foto pequena */}
                      {post.image && (
                        <div className="w-full h-32 overflow-hidden rounded">
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
                        <h3 className="text-sm font-bold text-white hover:text-red-600 transition-colors duration-300 mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                      </button>

                      {/* 3 linhas de prévia */}
                      <div className="text-gray-300 text-xs leading-relaxed">
                        <p className="line-clamp-3">{post.excerpt}</p>
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