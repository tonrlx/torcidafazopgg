// External assets repository URLs
export const ASSETS_BASE_URL = 'https://cdn.jsdelivr.net/gh/torcidafazop/assets@main';

// CDN configuration for optimized delivery
export const CDN_CONFIG = {
  quality: {
    high: 85,
    medium: 75,
    low: 60
  },
  formats: {
    modern: 'webp',
    fallback: 'jpg'
  },
  sizes: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
    xlarge: 1920
  },
  // Lazy loading configuration
  lazyLoading: {
    rootMargin: '50px 0px',
    threshold: 0.01,
    enableIntersectionObserver: true
  },
  // Preload configuration
  preload: {
    critical: ['logo', 'slide1'],
    prefetch: ['slide2', 'slide3']
  }
};

export const ASSETS = {
  // Logos and branding
  logo: '/TORCIDA.png',
  transition: '/images/TRAN1.png',
  
  // Slider images
  slides: {
    slide1: '/images/slides/slide1.svg',
    slide2: '/images/slides/slide2.svg',
    slide3: '/images/slides/slide3.svg',
  },
  
  // News images
  news: {
    capaMateria: '/images/CAPA MATÉRIA NEWS.jpeg',
    criasDaP: '/images/PERFIL CRIAS DA P.jpeg',
    herdeiras: '/images/PERFIL HERDEIRAS.jpeg',
    painGaming: '/images/PERFIL PAIN GAMING.jpeg',
    tot: '/images/PERFIL TOT.jpeg',
  },
  
  // Store images
  store: {
    bone: '/images/BONÉ PAIN GAMING.svg',
    camisa: '/images/CAMISA CASUAL.svg',
    uniforme2025: '/images/UNIFORME OFICIAL 2025.svg',
    uniformeFFCS2: '/images/UNIFORME OFICIAL FREE FIRE E CS2.svg',
  },
  
  // Placeholder images from Pexels (high quality stock photos)
  placeholders: {
    esports: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    gaming: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    team: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    community: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    jersey: 'https://images.pexels.com/photos/8844307/pexels-photo-8844307.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    cap: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    shirt: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
  }
};