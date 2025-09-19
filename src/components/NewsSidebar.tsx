import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { ASSETS } from '../constants/assets';
import OptimizedImage from './OptimizedImage';

const NewsSidebar: React.FC = () => {
  const organizations = [
    {
      name: 'paiN Gaming',
      image: ASSETS.news.painGaming,
      twitter: 'https://x.com/paiNGamingBR',
      instagram: 'https://www.instagram.com/paingamingbr/'
    },
    {
      name: 'Tradicionais',
      image: ASSETS.news.tot,
      twitter: 'https://x.com/TOTradicionais',
      instagram: 'https://www.instagram.com/totradicionais/'
    },
    {
      name: 'Herdeiras da Tradição',
      image: ASSETS.news.herdeiras,
      twitter: 'https://x.com/PNGHerdeiras',
      instagram: 'https://www.instagram.com/herdeirasdatradicao/'
    },
    {
      name: 'Crias da P',
      image: ASSETS.news.criasDaP,
      twitter: 'https://x.com/CriasdaP',
      instagram: 'https://www.instagram.com/criasdap/'
    }
  ];

  return (
    <div className="lg:w-80 space-y-6">
      {/* Você vai gostar de conhecer */}
      <div className="bg-black border border-red-600 p-6 sticky top-24">
        <h3 className="text-xl font-bold mb-6 text-red-600 text-center">VOCÊ VAI GOSTAR DE CONHECER</h3>
        
        <div className="space-y-6">
          {organizations.map((org, index) => (
            <div key={index} className={index < organizations.length - 1 ? "border-b border-gray-600 pb-4" : ""}>
              <div className="flex items-center mb-3">
                <OptimizedImage
                  src={org.image} 
                  alt={org.name} 
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                  width={48}
                  height={48}
                />
                <h4 className="text-white font-bold">{org.name}</h4>
              </div>
              <div className="flex space-x-2">
                <a href={org.twitter} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white hover:bg-gray-100 text-black text-xs py-2 px-3 text-center transition-colors flex items-center justify-center space-x-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Twitter</span>
                </a>
                <a href={org.instagram} target="_blank" rel="noopener noreferrer" className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-2 px-3 text-center transition-colors flex items-center justify-center space-x-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fórum de discussão */}
      <div className="bg-black border border-red-600 p-6">
        <h3 className="text-xl font-bold mb-4 text-white">Fórum de Resenhas e Discussões</h3>
        <div className="bg-black border border-red-600 p-4">
          <p className="text-white text-center mb-4">
            Compartilhe sua opinião e participe das discussões!
          </p>
          <div className="text-center">
            <a
              href={SOCIAL_LINKS.forum}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 transition-all duration-300 glow-red"
            >
              Enviar Resenha
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSidebar;