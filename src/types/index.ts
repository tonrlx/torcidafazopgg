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