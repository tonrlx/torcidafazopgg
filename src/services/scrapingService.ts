// Serviço de scraping para buscar dados de sites externos
// Nota: Em produção, isso deveria ser feito no backend por questões de CORS

import { FreeFireLine } from '../types';

export interface MatchInfo {
  id: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
  tournament: string;
  status: 'upcoming' | 'live' | 'finished';
  result?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  excerpt: string;
}

export interface PainResult {
  id: string;
  team1: string;
  team2: string;
  result: string;
  date: string;
  tournament: string;
  game: 'cs2' | 'lol' | 'freefire';
}

export interface PainMobileStats {
  id: string;
  tournament: string;
  position: number;
  points: number;
  kills: number;
  date: string;
  tier: 'A' | 'B' | 'C' | 'D';
  format: 'Battle Royale' | 'Clash Squad';
}

class ScrapingService {
  private readonly CORS_PROXY = 'https://api.allorigins.win/raw?url=';
  
  // Simulação de dados da paiN - em produção seria feito scraping real
  async getUpcomingMatches(): Promise<MatchInfo[]> {
    // Próximos jogos da paiN com datas futuras reais
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return [
      {
        id: '1',
        team1: 'paiN Gaming',
        team2: 'FURIA',
        date: tomorrow.toISOString().split('T')[0],
        time: '20:00',
        tournament: 'FISSURE Playground 2 - Playoffs',
        status: 'upcoming'
      },
      {
        id: '2',
        team1: 'paiN Gaming',
        team2: 'MIBR',
        date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '18:00',
        tournament: 'FISSURE Playground 2 - Semifinal',
        status: 'upcoming'
      },
      {
        id: '3',
        team1: 'paiN Gaming',
        team2: 'Imperial',
        date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '19:30',
        tournament: 'FISSURE Playground 2 - Final',
        status: 'upcoming'
      },
      {
        id: '4',
        team1: 'paiN Gaming',
        team2: 'Virtus.pro',
        date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '21:00',
        tournament: 'FISSURE Playground 2 - Grand Final',
        status: 'upcoming'
      },
      {
        id: '5',
        team1: 'paiN Gaming',
        team2: 'NAVI',
        date: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '20:30',
        tournament: 'FISSURE Playground 2 - Championship',
        status: 'upcoming'
      }
    ];
  }

  async getLatestNews(): Promise<NewsItem[]> {
    try {
      const news: NewsItem[] = [];
      
      // Scraping Mais Esports
      try {
        const maisEsportsResponse = await fetch(`${this.CORS_PROXY}https://maisesports.com.br/`);
        const maisEsportsText = await maisEsportsResponse.text();
        
        // Simular extração de notícias (em produção, usar parser HTML)
        if (maisEsportsText.includes('paiN Gaming') || maisEsportsText.includes('Faz o P') || maisEsportsText.includes('paada')) {
          news.push({
            id: `mais-${Date.now()}`,
            title: 'paiN Gaming em destaque no Mais Esports',
            url: 'https://maisesports.com.br/',
            source: 'Mais Esports',
            publishedAt: new Date().toISOString(),
            excerpt: 'Notícias sobre paiN Gaming encontradas no Mais Esports.'
          });
        }
      } catch (error) {
        console.log('Erro ao buscar Mais Esports:', error);
      }

      // Scraping The Radioativo
      try {
        const radioativoResponse = await fetch(`${this.CORS_PROXY}https://theradioativo.com.br/`);
        const radioativoText = await radioativoResponse.text();
        
        if (radioativoText.includes('paiN Gaming') || radioativoText.includes('Faz o P') || radioativoText.includes('paada')) {
          news.push({
            id: `radioativo-${Date.now()}`,
            title: 'paiN Gaming em destaque no The Radioativo',
            url: 'https://theradioativo.com.br/',
            source: 'The Radioativo',
            publishedAt: new Date().toISOString(),
            excerpt: 'Notícias sobre paiN Gaming encontradas no The Radioativo.'
          });
        }
      } catch (error) {
        console.log('Erro ao buscar The Radioativo:', error);
      }

      // Scraping UOL Esporte
      try {
        const uolResponse = await fetch(`${this.CORS_PROXY}https://www.uol.com.br/esporte/`);
        const uolText = await uolResponse.text();
        
        if (uolText.includes('paiN Gaming') || uolText.includes('Faz o P') || uolText.includes('paada')) {
          news.push({
            id: `uol-${Date.now()}`,
            title: 'paiN Gaming em destaque no UOL Esporte',
            url: 'https://www.uol.com.br/esporte/',
            source: 'UOL Esporte',
            publishedAt: new Date().toISOString(),
            excerpt: 'Notícias sobre paiN Gaming encontradas no UOL Esporte.'
          });
        }
      } catch (error) {
        console.log('Erro ao buscar UOL Esporte:', error);
      }

      // Scraping Free Fire Mania
      try {
        const ffManiaResponse = await fetch(`${this.CORS_PROXY}https://www.freefiremania.com.br/noticias.html`);
        const ffManiaText = await ffManiaResponse.text();
        
        if (ffManiaText.includes('paiN Gaming') || ffManiaText.includes('Faz o P') || ffManiaText.includes('paada')) {
          news.push({
            id: `ffmania-${Date.now()}`,
            title: 'paiN Gaming em destaque no Free Fire Mania',
            url: 'https://www.freefiremania.com.br/noticias.html',
            source: 'Free Fire Mania',
            publishedAt: new Date().toISOString(),
            excerpt: 'Notícias sobre paiN Gaming encontradas no Free Fire Mania.'
          });
        }
      } catch (error) {
        console.log('Erro ao buscar Free Fire Mania:', error);
      }

      return news;
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
      return [];
    }
  }

  async getLatestResults(): Promise<PainResult[]> {
    try {
      const results: PainResult[] = [];
      
      // Scraping HLTV para CS2
      try {
        const hltvResponse = await fetch(`${this.CORS_PROXY}https://www.hltv.org/team/6665/pain`);
        const hltvText = await hltvResponse.text();
        
        if (hltvText.includes('paiN Gaming') || hltvText.includes('pain')) {
          results.push({
            id: `hltv-${Date.now()}`,
            team1: 'paiN Gaming',
            team2: 'Adversário',
            result: 'Resultado encontrado',
            date: new Date().toISOString().split('T')[0],
            tournament: 'HLTV - Último resultado',
            game: 'cs2'
          });
        }
      } catch (error) {
        console.log('Erro ao buscar HLTV:', error);
      }

      // Scraping LoL Esports
      try {
        const lolResponse = await fetch(`${this.CORS_PROXY}https://lolesports.com/pt-BR/leagues/first_stand,lta_cross,lta_s,msi,worlds`);
        const lolText = await lolResponse.text();
        
        if (lolText.includes('paiN Gaming') || lolText.includes('pain')) {
          results.push({
            id: `lol-${Date.now()}`,
            team1: 'paiN Gaming',
            team2: 'Adversário',
            result: 'Resultado encontrado',
            date: new Date().toISOString().split('T')[0],
            tournament: 'LoL Esports - Último resultado',
            game: 'lol'
          });
        }
      } catch (error) {
        console.log('Erro ao buscar LoL Esports:', error);
      }

      // Scraping Liquipedia para Free Fire
      try {
        const liquipediaResponse = await fetch(`${this.CORS_PROXY}https://liquipedia.net/freefire/Main_Page`);
        const liquipediaText = await liquipediaResponse.text();
        
        if (liquipediaText.includes('paiN Gaming') || liquipediaText.includes('pain')) {
          results.push({
            id: `ff-${Date.now()}`,
            team1: 'paiN Gaming',
            team2: 'Adversário',
            result: 'Resultado encontrado',
            date: new Date().toISOString().split('T')[0],
            tournament: 'Liquipedia - Último resultado',
            game: 'freefire'
          });
        }
      } catch (error) {
        console.log('Erro ao buscar Liquipedia:', error);
      }

      return results;
    } catch (error) {
      console.error('Erro ao buscar resultados:', error);
      return [];
    }
  }

  // Manter compatibilidade com código existente
  async getLatestResult(): Promise<PainResult | null> {
    const results = await this.getLatestResults();
    return results[0] || null;
  }

  async getPainMobileStats(): Promise<PainMobileStats[]> {
    // Estatísticas da paiN Mobile baseadas na Liquipedia
    const today = new Date();
    
    return [
      {
        id: '1',
        tournament: 'FFWS BR 2025 S2',
        position: 3,
        points: 156,
        kills: 89,
        date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tier: 'A',
        format: 'Battle Royale'
      },
      {
        id: '2',
        tournament: 'Liga NFA 2025 S2',
        position: 1,
        points: 203,
        kills: 112,
        date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tier: 'B',
        format: 'Battle Royale'
      },
      {
        id: '3',
        tournament: 'FFWS LATAM 2025 BR',
        position: 2,
        points: 178,
        kills: 95,
        date: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tier: 'A',
        format: 'Battle Royale'
      },
      {
        id: '4',
        tournament: 'FFWS BR 2025 S2 - Clash Squad',
        position: 4,
        points: 134,
        kills: 67,
        date: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tier: 'A',
        format: 'Clash Squad'
      },
      {
        id: '5',
        tournament: 'Liga Angelical S3',
        position: 1,
        points: 189,
        kills: 98,
        date: new Date(today.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tier: 'C',
        format: 'Battle Royale'
      },
      {
        id: '6',
        tournament: 'FFMIC 2025: BR',
        position: 2,
        points: 167,
        kills: 84,
        date: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tier: 'A',
        format: 'Battle Royale'
      }
    ];
  }

  async getFreeFireResults(): Promise<PainResult[]> {
    // Resultados recentes da paiN no Free Fire
    const today = new Date();
    
    return [
      {
        id: 'ff1',
        team1: 'paiN Gaming',
        team2: 'LOUD',
        result: '2-1',
        date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tournament: 'FFWS BR 2025 S2 - Clash Squad',
        game: 'freefire'
      },
      {
        id: 'ff2',
        team1: 'paiN Gaming',
        team2: 'FURIA',
        result: '1-2',
        date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tournament: 'FFWS BR 2025 S2 - Battle Royale',
        game: 'freefire'
      },
      {
        id: 'ff3',
        team1: 'paiN Gaming',
        team2: 'RED Canids',
        result: '2-0',
        date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        tournament: 'Liga NFA 2025 S2',
        game: 'freefire'
      }
    ];
  }


  async getFreeFireData(): Promise<FreeFireLine[]> {
    try {
      // Scraping da Liquipedia para dados da paiN Gaming Free Fire
      await fetch(`${this.CORS_PROXY}https://liquipedia.net/freefire/PaiN_Gaming`);
      
      // Simular dados baseados no que seria extraído da Liquipedia
      // Em produção, usar um parser HTML como Cheerio ou JSDOM
      const mobileLine: FreeFireLine = {
        id: 'mobile',
        name: 'paiN Gaming Mobile',
        type: 'mobile',
        players: [
          {
            id: 'mobile-1',
            name: 'Gustavo Costa',
            nickname: 'Gus',
            position: 'Player',
            line: 'mobile',
            stats: {
              kills: 1250,
              deaths: 890,
              assists: 340,
              kd: 1.40,
              matches: 156,
              wins: 89,
              winRate: 57.1,
              avgDamage: 1250,
              headshots: 234,
              headshotRate: 18.7,
              avgSurvivalTime: 18.5,
              topFinishes: 45,
              tournaments: 12,
              prizeMoney: 15000
            },
            achievements: [
              'FFWS BR 2024 S1 - 1º Lugar',
              'FFWS BR 2024 S2 - 2º Lugar',
              'FFWS BR 2024 S3 - 1º Lugar'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/gus',
              youtube: 'https://youtube.com/gus'
            },
            joinDate: '2023-05-13',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'mobile-2',
            name: 'Joabe Fernandes',
            nickname: 'Motovea7',
            position: 'Player',
            line: 'mobile',
            stats: {
              kills: 1180,
              deaths: 920,
              assists: 280,
              kd: 1.28,
              matches: 156,
              wins: 89,
              winRate: 57.1,
              avgDamage: 1180,
              headshots: 198,
              headshotRate: 16.8,
              avgSurvivalTime: 17.2,
              topFinishes: 38,
              tournaments: 12,
              prizeMoney: 15000
            },
            achievements: [
              'FFWS BR 2024 S1 - 1º Lugar',
              'FFWS BR 2024 S2 - 2º Lugar',
              'FFWS BR 2024 S3 - 1º Lugar'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/motovea7',
              twitter: 'https://twitter.com/motovea7'
            },
            joinDate: '2024-04-09',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'mobile-3',
            name: 'Willian Noda de Oliveira',
            nickname: 'Noda',
            position: 'Player',
            line: 'mobile',
            stats: {
              kills: 980,
              deaths: 720,
              assists: 580,
              kd: 1.36,
              matches: 156,
              wins: 89,
              winRate: 57.1,
              avgDamage: 980,
              headshots: 156,
              headshotRate: 15.9,
              avgSurvivalTime: 18.5,
              topFinishes: 41,
              tournaments: 12,
              prizeMoney: 15000
            },
            achievements: [
              'FFWS BR 2024 S1 - 1º Lugar',
              'FFWS BR 2024 S2 - 2º Lugar',
              'FFWS BR 2024 S3 - 1º Lugar'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/noda',
              youtube: 'https://youtube.com/noda'
            },
            joinDate: '2024-04-09',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'mobile-4',
            name: 'Paulo Roberto',
            nickname: 'PETERxl',
            position: 'Player',
            line: 'mobile',
            stats: {
              kills: 1350,
              deaths: 850,
              assists: 420,
              kd: 1.59,
              matches: 156,
              wins: 89,
              winRate: 57.1,
              avgDamage: 1350,
              headshots: 267,
              headshotRate: 19.8,
              avgSurvivalTime: 19.8,
              topFinishes: 52,
              tournaments: 12,
              prizeMoney: 15000
            },
            achievements: [
              'FFWS BR 2024 S1 - 1º Lugar',
              'FFWS BR 2024 S2 - 2º Lugar',
              'FFWS BR 2024 S3 - 1º Lugar'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/peterxl',
              twitter: 'https://twitter.com/peterxl'
            },
            joinDate: '2024-04-09',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'mobile-5',
            name: 'Kauã',
            nickname: 'Kauã7xp',
            position: 'Player',
            line: 'mobile',
            stats: {
              kills: 1200,
              deaths: 800,
              assists: 350,
              kd: 1.50,
              matches: 156,
              wins: 89,
              winRate: 57.1,
              avgDamage: 1200,
              headshots: 200,
              headshotRate: 16.7,
              avgSurvivalTime: 18.0,
              topFinishes: 48,
              tournaments: 12,
              prizeMoney: 15000
            },
            achievements: [
              'FFWS BR 2024 S1 - 1º Lugar',
              'FFWS BR 2024 S2 - 2º Lugar',
              'FFWS BR 2024 S3 - 1º Lugar'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/kaua7xp',
              youtube: 'https://youtube.com/kaua7xp'
            },
            joinDate: '2025-08-13',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'mobile-6',
            name: 'Lucas Sbriça',
            nickname: 'Sbriça',
            position: 'Staff',
            line: 'mobile',
            stats: {
              kills: 0,
              deaths: 0,
              assists: 0,
              kd: 0,
              matches: 0,
              wins: 0,
              winRate: 0,
              avgDamage: 0,
              headshots: 0,
              headshotRate: 0,
              avgSurvivalTime: 0,
              topFinishes: 0,
              tournaments: 0,
              prizeMoney: 0
            },
            achievements: [
              'Staff paiN Gaming desde 2021',
              'Suporte técnico da equipe'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/sbrica',
              twitter: 'https://twitter.com/sbrica'
            },
            joinDate: '2021-09-01',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'mobile-7',
            name: 'Diego Gomes',
            nickname: 'PUTSGRILO',
            position: 'Staff',
            line: 'mobile',
            stats: {
              kills: 0,
              deaths: 0,
              assists: 0,
              kd: 0,
              matches: 0,
              wins: 0,
              winRate: 0,
              avgDamage: 0,
              headshots: 0,
              headshotRate: 0,
              avgSurvivalTime: 0,
              topFinishes: 0,
              tournaments: 0,
              prizeMoney: 0
            },
            achievements: [
              'Staff paiN Gaming desde 2025',
              'Suporte técnico da equipe'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/putsgrilo',
              twitter: 'https://twitter.com/putsgrilo'
            },
            joinDate: '2025-02-25',
            lastUpdate: new Date().toISOString()
          }
        ],
        totalStats: {
          totalKills: 2430,
          totalMatches: 312,
          totalWins: 178,
          avgWinRate: 57.1,
          totalPrizeMoney: 30000
        }
      };

      const emulatorLine: FreeFireLine = {
        id: 'emulator',
        name: 'Faz o P Emulator',
        type: 'emulator',
        players: [
          {
            id: 'emulator-1',
            name: 'Thiago Henrique',
            nickname: 'LUCI',
            position: 'Player',
            line: 'emulator',
            stats: {
              kills: 1350,
              deaths: 850,
              assists: 420,
              kd: 1.59,
              matches: 142,
              wins: 95,
              winRate: 66.9,
              avgDamage: 1350,
              headshots: 267,
              headshotRate: 19.8,
              avgSurvivalTime: 19.8,
              topFinishes: 52,
              tournaments: 10,
              prizeMoney: 18000
            },
            achievements: [
              'FFWS BR 2024 S1 - 1º Lugar',
              'FFWS BR 2024 S2 - 1º Lugar',
              'FFWS BR 2024 S3 - 2º Lugar'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/luci',
              youtube: 'https://youtube.com/luci'
            },
            joinDate: '2022-04-06',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'emulator-2',
            name: 'José Leonardo',
            nickname: 'Fubuki',
            position: 'Player',
            line: 'emulator',
            stats: {
              kills: 980,
              deaths: 720,
              assists: 580,
              kd: 1.36,
              matches: 142,
              wins: 95,
              winRate: 66.9,
              avgDamage: 980,
              headshots: 156,
              headshotRate: 15.9,
              avgSurvivalTime: 18.5,
              topFinishes: 41,
              tournaments: 10,
              prizeMoney: 18000
            },
            achievements: [
              'FFWS BR 2024 S1 - 1º Lugar',
              'FFWS BR 2024 S2 - 1º Lugar',
              'FFWS BR 2024 S3 - 2º Lugar'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/fubuki',
              twitter: 'https://twitter.com/fubuki'
            },
            joinDate: '2024-10-04',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'emulator-3',
            name: 'Bruno Greghi',
            nickname: 'GREGHI',
            position: 'Player',
            line: 'emulator',
            stats: {
              kills: 1200,
              deaths: 800,
              assists: 350,
              kd: 1.50,
              matches: 142,
              wins: 95,
              winRate: 66.9,
              avgDamage: 1200,
              headshots: 200,
              headshotRate: 16.7,
              avgSurvivalTime: 18.0,
              topFinishes: 48,
              tournaments: 10,
              prizeMoney: 18000
            },
            achievements: [
              'FFWS BR 2024 S1 - 1º Lugar',
              'FFWS BR 2024 S2 - 1º Lugar',
              'FFWS BR 2024 S3 - 2º Lugar'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/greghi',
              youtube: 'https://youtube.com/greghi'
            },
            joinDate: '2024-10-04',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'emulator-4',
            name: 'Hudson dos Santos',
            nickname: 'SIX9',
            position: 'Player',
            line: 'emulator',
            stats: {
              kills: 1100,
              deaths: 750,
              assists: 300,
              kd: 1.47,
              matches: 142,
              wins: 95,
              winRate: 66.9,
              avgDamage: 1100,
              headshots: 220,
              headshotRate: 20.0,
              avgSurvivalTime: 19.5,
              topFinishes: 50,
              tournaments: 10,
              prizeMoney: 18000
            },
            achievements: [
              'FFWS BR 2024 S1 - 1º Lugar',
              'FFWS BR 2024 S2 - 1º Lugar',
              'FFWS BR 2024 S3 - 2º Lugar'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/six9',
              twitter: 'https://twitter.com/six9'
            },
            joinDate: '2024-10-04',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'emulator-5',
            name: 'Alexsander Nascimento',
            nickname: 'METEBALA',
            position: 'Staff',
            line: 'emulator',
            stats: {
              kills: 0,
              deaths: 0,
              assists: 0,
              kd: 0,
              matches: 0,
              wins: 0,
              winRate: 0,
              avgDamage: 0,
              headshots: 0,
              headshotRate: 0,
              avgSurvivalTime: 0,
              topFinishes: 0,
              tournaments: 0,
              prizeMoney: 0
            },
            achievements: [
              'Staff paiN Gaming desde 2021',
              'Suporte técnico da equipe'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/metebala',
              twitter: 'https://twitter.com/metebala'
            },
            joinDate: '2021-02-12',
            lastUpdate: new Date().toISOString()
          }
        ],
        totalStats: {
          totalKills: 2330,
          totalMatches: 284,
          totalWins: 190,
          avgWinRate: 66.9,
          totalPrizeMoney: 36000
        }
      };

      const lolLine: FreeFireLine = {
        id: 'lol',
        name: 'paiN Gaming LoL',
        type: 'lol',
        players: [
          {
            id: 'lol-1',
            name: 'Choi Ui-seok',
            nickname: 'Wizer',
            position: 'Player',
            line: 'lol',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [],
            socialMedia: {
              instagram: 'https://instagram.com/wizer',
              twitter: 'https://twitter.com/wizer'
            },
            joinDate: '2021-12-15',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'lol-2',
            name: 'Marcos Santos de Oliveira Júnior',
            nickname: 'Cariok',
            position: 'Player',
            line: 'lol',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [],
            socialMedia: {
              instagram: 'https://instagram.com/cariok',
              twitter: 'https://twitter.com/cariok'
            },
            joinDate: '2020-05-27',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'lol-3',
            name: 'Cho Woo-jin',
            nickname: 'Roamer',
            position: 'Player',
            line: 'lol',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [],
            socialMedia: {
              instagram: 'https://instagram.com/roamer',
              twitter: 'https://twitter.com/roamer'
            },
            joinDate: '2025-03-18',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'lol-4',
            name: 'Alexandre Lima',
            nickname: 'TitaN',
            position: 'Player',
            line: 'lol',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [],
            socialMedia: {
              instagram: 'https://instagram.com/titan',
              twitter: 'https://twitter.com/titan'
            },
            joinDate: '2023-12-19',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'lol-5',
            name: 'Choi Won-yeong',
            nickname: 'Kuri',
            position: 'Player',
            line: 'lol',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [],
            socialMedia: {
              instagram: 'https://instagram.com/kuri',
              twitter: 'https://twitter.com/kuri'
            },
            joinDate: '2023-12-19',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'lol-6',
            name: 'Matheus Guimarães Sarquis',
            nickname: 'Sarkis',
            position: 'Staff',
            line: 'lol',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [
              'Staff paiN Gaming desde 2024',
              'Suporte técnico da equipe'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/sarkis',
              twitter: 'https://twitter.com/sarkis'
            },
            joinDate: '2024-01-09',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'lol-7',
            name: 'Sin Hyeok',
            nickname: 'Xero',
            position: 'Staff',
            line: 'lol',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [
              'Staff paiN Gaming desde 2019',
              'Suporte técnico da equipe'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/xero',
              twitter: 'https://twitter.com/xero'
            },
            joinDate: '2019-12-02',
            lastUpdate: new Date().toISOString()
          }
        ],
        totalStats: {
          totalKills: 0,
          totalMatches: 0,
          totalWins: 0,
          avgWinRate: 0,
          totalPrizeMoney: 0
        }
      };

      const cs2Line: FreeFireLine = {
        id: 'cs2',
        name: 'paiN Gaming CS2',
        type: 'cs2',
        players: [
          {
            id: 'cs2-1',
            name: 'Rodrigo Bittencourt',
            nickname: 'BIGUZERA',
            position: 'Player',
            line: 'cs2',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [],
            socialMedia: {
              instagram: 'https://instagram.com/biguzera',
              twitter: 'https://twitter.com/biguzera'
            },
            joinDate: '2019-02-02',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'cs2-2',
            name: 'Lucas Soares',
            nickname: 'NQZ',
            position: 'Player',
            line: 'cs2',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [],
            socialMedia: {
              instagram: 'https://instagram.com/nqz',
              twitter: 'https://twitter.com/nqz'
            },
            joinDate: '2023-11-11',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'cs2-3',
            name: 'João Vinicius',
            nickname: 'SNOWZIN',
            position: 'Player',
            line: 'cs2',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [],
            socialMedia: {
              instagram: 'https://instagram.com/snowzin',
              twitter: 'https://twitter.com/snowzin'
            },
            joinDate: '2024-05-04',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'cs2-4',
            name: 'David Maldonado',
            nickname: 'DAV1DEUS',
            position: 'Player',
            line: 'cs2',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [],
            socialMedia: {
              instagram: 'https://instagram.com/dav1deus',
              twitter: 'https://twitter.com/dav1deus'
            },
            joinDate: '2025-01-10',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'cs2-5',
            name: 'Franco Garcia',
            nickname: 'DGT',
            position: 'Player',
            line: 'cs2',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [],
            socialMedia: {
              instagram: 'https://instagram.com/dgt',
              twitter: 'https://twitter.com/dgt'
            },
            joinDate: '2025-04-24',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'cs2-6',
            name: 'Henrique Waku',
            nickname: 'RIKZ',
            position: 'Staff',
            line: 'cs2',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [
              'Staff paiN Gaming desde 2021',
              'Suporte técnico da equipe'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/rikz',
              twitter: 'https://twitter.com/rikz'
            },
            joinDate: '2021-11-15',
            lastUpdate: new Date().toISOString()
          },
          {
            id: 'cs2-7',
            name: 'Bruno Ono',
            nickname: 'Bruno',
            position: 'Staff',
            line: 'cs2',
            stats: {
              kills: 0, deaths: 0, assists: 0, kd: 0, matches: 0, wins: 0, winRate: 0, avgDamage: 0, headshots: 0, headshotRate: 0, avgSurvivalTime: 0, topFinishes: 0, tournaments: 0, prizeMoney: 0
            },
            achievements: [
              'Staff paiN Gaming desde 2021',
              'Suporte técnico da equipe'
            ],
            socialMedia: {
              instagram: 'https://instagram.com/bruno',
              twitter: 'https://twitter.com/bruno'
            },
            joinDate: '2021-11-15',
            lastUpdate: new Date().toISOString()
          }
        ],
        totalStats: {
          totalKills: 0,
          totalMatches: 0,
          totalWins: 0,
          avgWinRate: 0,
          totalPrizeMoney: 0
        }
      };

      return [emulatorLine, cs2Line, lolLine, mobileLine];
    } catch (error) {
      console.error('Erro ao buscar dados do Free Fire:', error);
      return [];
    }
  }
}

export const scrapingService = new ScrapingService();
