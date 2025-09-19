export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: 'noticia' | 'opiniao' | 'analise';
  image?: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [];

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);
};

export const getPostsByCategory = (category: BlogPost['category']): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};
