import { ASSETS } from './assets';

export const SLIDES = [
  ASSETS.slides.slide1,
  ASSETS.slides.slide2,
  ASSETS.slides.slide3
];

export const SOCIAL_LINKS = {
  whatsapp: 'https://chat.whatsapp.com/BQZYXiDXd3rBy2kEjhvPp6?mode=ac_t',
  instagram: 'https://www.instagram.com/torcidafazop_?igsh=MWRmN3prenh0NDM5eA==',
  youtube: 'https://www.youtube.com/watch?v=4HMm8Ax6WbE',
  forum: 'https://formspree.io/f/xandryna'
};

export const ANIMATION_DURATION = {
  transition: 300,
  slider: 5000
};

export const TABS = {
  HOME: 'home',
  LINES: 'lines',
  SOU_PAIN: 'sou-pain',
  NEWS: 'news',
  AGENDA: 'agenda'
} as const;