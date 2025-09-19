import { StoreProduct } from '../types';
import { ASSETS } from '../constants/assets';

export const storeData: StoreProduct[] = [
  {
    id: 1,
    name: 'UNIFORME OFICIAL 2025',
    price: 'R$ 199,99',
    installments: 'Ou 3x de R$ 66,66 sem juros',
    links: {
      primary: 'https://www.pain.gg/uniforme2025/p'
    },
    image: ASSETS.store.uniforme2025
  },
  {
    id: 2,
    name: 'UNIFORME OFICIAL 2025/FREE FIRE E CS2',
    price: 'R$ 199,99',
    installments: 'Ou 3x de R$ 66,66 sem juros',
    links: {
      primary: 'https://www.pain.gg/uniforme2025cs2ff/p'
    },
    image: ASSETS.store.uniformeFFCS2
  },
  {
    id: 3,
    name: 'BONÉ PAIN GAMING',
    price: 'R$ 139,00',
    installments: 'Ou 3x de R$ 46,33 sem juros',
    links: {
      primary: 'https://www.pain.gg/bonepain/p'
    },
    image: ASSETS.store.bone
  },
  {
    id: 4,
    name: 'CAMISA CASUAL',
    price: 'R$ 109,90',
    installments: 'Ou 3x de R$ 36,63 sem juros',
    links: {
      primary: 'https://www.pain.gg/camisetapretalogop/p',
      secondary: 'https://www.pain.gg/camiseta-branca-logo-p/p'
    },
    image: ASSETS.store.camisa
  }
];