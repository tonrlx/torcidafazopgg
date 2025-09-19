export interface Player {
  position: string;
  nick: string;
  name: string;
  birthdate?: string;
  age?: string;
}

export interface PlayersData {
  lol: Player[];
  cs: Player[];
}

export interface AgendaEvent {
  id: number;
  date: string;
  time: string;
  event: string;
  platform: string;
  championship: string;
  game: 'CS2' | 'LoL';
  streamUrl: string;
  hltvUrl: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  content: string;
}

export interface StoreProduct {
  id: number;
  name: string;
  price: string;
  installments: string;
  links: {
    primary: string;
    secondary?: string;
  };
  image: string;
}

export interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface NavigationProps {
  isMenuOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface ImageSliderProps {
  slides: string[];
  autoPlay?: boolean;
  interval?: number;
}

export interface TransitionOverlayProps {
  isVisible: boolean;
}

export interface LiveChannel {
  id: string;
  name: string;
  platform: 'twitch' | 'youtube' | 'konect';
  url: string;
  photo: string;
}

export interface FreeFirePlayer {
  id: string;
  name: string;
  nickname: string;
  position: string;
  line: 'mobile' | 'emulator' | 'lol' | 'cs2';
  stats: {
    kills: number;
    deaths: number;
    assists: number;
    kd: number;
    matches: number;
    wins: number;
    winRate: number;
    avgDamage: number;
    headshots: number;
    headshotRate: number;
    avgSurvivalTime: number;
    topFinishes: number;
    tournaments: number;
    prizeMoney: number;
  };
  achievements: string[];
  socialMedia: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  joinDate: string;
  lastUpdate: string;
}

export interface FreeFireLine {
  id: string;
  name: string;
  type: 'mobile' | 'emulator' | 'lol' | 'cs2';
  players: FreeFirePlayer[];
  totalStats: {
    totalKills: number;
    totalMatches: number;
    totalWins: number;
    avgWinRate: number;
    totalPrizeMoney: number;
  };
}