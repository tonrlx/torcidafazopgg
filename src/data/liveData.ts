export interface LiveChannel {
  id: string;
  name: string;
  platform: 'twitch' | 'youtube' | 'konect';
  url: string;
  photo: string;
  specification: string;
}

export const liveChannels: LiveChannel[] = [
  {
    id: 'sabrinoca',
    name: 'Sabrinoca',
    platform: 'twitch',
    url: 'https://twitch.tv/sabrinoca',
    photo: '/images/SABRINOCA.jpeg',
    specification: 'CREATOR'
  },
  {
    id: 'babs',
    name: 'Babs',
    platform: 'twitch',
    url: 'https://m.twitch.tv/pain_babs/home',
    photo: '/images/BABS.jpeg',
    specification: 'CREATOR'
  },
  {
    id: 'metebala021',
    name: 'Metebala021',
    platform: 'youtube',
    url: 'https://www.youtube.com/@metebala021',
    photo: '/images/LINES/METEBALA EMULADOR.jpg',
    specification: 'TÉCNICO'
  },
  {
    id: 'snowzin',
    name: 'Snowzin',
    platform: 'twitch',
    url: 'https://twitch.tv/snowzin_cs',
    photo: '/images/LINES/SNOWZIN CS.webp',
    specification: 'JOGADOR'
  },
  {
    id: 'motovea',
    name: 'Motovea',
    platform: 'youtube',
    url: 'https://www.youtube.com/@MotoveaFF',
    photo: '/images/LINES/MOTOVEA MOBILE.jpg',
    specification: 'JOGADOR'
  },
  {
    id: 'dynquedo',
    name: 'dyNquedo',
    platform: 'youtube',
    url: 'https://www.youtube.com/@dyNquedo1',
    photo: '/images/DYNKAS.jpeg',
    specification: 'CREATOR'
  },
  {
    id: 'titan',
    name: 'TitaN',
    platform: 'twitch',
    url: 'https://m.twitch.tv/titanlol1',
    photo: '/images/LINES/TITAN LOL.jpg_large',
    specification: 'JOGADOR'
  },
  {
    id: 'six',
    name: 'Six',
    platform: 'youtube',
    url: 'https://www.youtube.com/@sixzada9ff',
    photo: '/images/LINES/SIX9 EMULADOR.jpg',
    specification: 'JOGADOR'
  },
  {
    id: 'fubuki',
    name: 'Fubuki',
    platform: 'youtube',
    url: 'https://www.youtube.com/@fubukizada',
    photo: '/images/LINES/FUBUKI EMULADOR.jpg',
    specification: 'JOGADOR'
  },
  {
    id: 'kami',
    name: 'Kami',
    platform: 'twitch',
    url: 'https://twitch.tv/kamikat',
    photo: '/images/KAMI.jpeg',
    specification: 'CREATOR'
  }
];

