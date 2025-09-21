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

export const blogPosts: BlogPost[] = [
  {
    id: 'pain-ffws-br-penultima-semana',
    title: 'No melhor dia do split, paiN Gaming encerra penúltima semana do FFWS BR',
    excerpt: 'a paiN chegou à 42ª queda ocupando a 5ª colocação geral, com um total de 499 pontos e 260 eliminações até aqui.',
    content: `A equipe de Free Fire Mobile da paiN Gaming registrou neste sábado (20) sua melhor atuação no atual split do FFWS Brasil. O time encerrou a penúltima rodada da fase classificatória com 87 pontos conquistados e 56 eliminações, desempenho coroado por um Booyah na última queda do dia.

O destaque individual ficou por conta de Paulo **"PeterXL"** Roberto, que liderou as estatísticas de abates com 17 eliminações.

**Paulo "PeterXL" Roberto** – 17 eliminações
**Joabe "Motovea7"** Fernandes – 16 eliminações
**Gustavo "Gus"** Costa – 13 eliminações
**Willian "Noda"** de Oliveira – 10 eliminações

"O dia hoje foi bom, fechamos com um Booyah, deu pra atingir a meta dos 90 pontos, que era o que estava faltando pra gente", **avaliou PeterXL após os jogos**.

Com esse desempenho, a paiN chegou à 42ª queda ocupando a 5ª colocação geral, com um total de 499 pontos e 260 eliminações até aqui.

Agora, a decisão está próxima. A última rodada classificatória definirá as 12 equipes que avançam para a final.

A paiN, que já mostrou poder de reação e consistência, entra na reta final com a confiança da torcida que sempre acredita: o sonho de ser campeão e chegar ao mundial segue vivo.`,
    author: 'Redação TFP',
    publishedAt: '2024-01-20T20:00:00Z',
    category: 'noticia',
    image: '/images/LINE-MOB-PAIN-25.jpeg',
    tags: ['Free Fire', 'paiN Gaming', 'FFWS BR', 'PeterXL', 'Mobile'],
    featured: true
  }
];

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
