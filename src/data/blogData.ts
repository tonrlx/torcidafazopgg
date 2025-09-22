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
    id: 'fazop-copa-nobru-final',
    title: 'Com 2 booyahs, FazoP avança para a final da Copa Nobru',
    excerpt: 'A FazoP garantiu a classificação para a grande final da Copa Nobru com uma atuação consistente e decisiva, somando 252 pontos e 86 abates.',
    content: `A FazoP garantiu a classificação para a grande final da Copa Nobru com uma atuação consistente e decisiva. No último dia da fase de grupos, o time somou 252 pontos e 86 abates, conquistando 2 booyahs importantes (Queda 2 e Queda 4) que confirmaram a vaga.

**Resumo da rodada:**

**Queda 1:** 40 pts – 14 kills (Luci 7)
**Queda 2 (Booyah):** 58 pts – 19 kills (Luci 6, Six 6)
**Queda 3:** 43 pts – 14 kills (Six 5)
**Queda 4 (Booyah):** 54 pts – 17 kills (Luci 8)
**Queda 5:** 11 pts – 5 kills (destaque para Fubuki e Luci com 2 cada)
**Queda 6:** 46 pts – 17 kills (Greghi 6)

➡️ **Pontuação final:** 252
➡️ **Total de abates:** 86

**Abates no total:**

**Luci:** 31
**Six:** 20
**Greghi:** 19
**Fubuki:** 16

**Agora é final!**

Com 2 booyahs na conta e muita regularidade, a FazoP chega embalada para a decisão.

A final acontece nos dias 26, 27 e 28 de setembro, ao vivo no YouTube do Nobru TV.

⚫🔴 **A FazoP tá na final. Dois booyahs, moral lá em cima, e foco na final.**`,
    author: 'Redação TFP',
    publishedAt: '2024-09-25T20:00:00Z',
    category: 'noticia',
    image: '/images/DOBRADINHA.png.png',
    tags: ['Free Fire', 'FazoP', 'Copa Nobru', 'Booyah', 'Final'],
    featured: true
  },
  {
    id: 'pain-ffws-br-penultima-semana',
    title: 'No melhor dia do split, paiN Gaming encerra penúltima rodada do FFWS BR',
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
    featured: false
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
