import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import ImageSlider from '../ImageSlider';
import LiveSection from '../LiveSection';
import FloatingNewsWidget from '../FloatingNewsWidget';
import { SLIDES, SOCIAL_LINKS } from '../../constants';

const HomeSection: React.FC = () => {

  return (
    <div className="fade-in">
      {/* Widget flutuante de notícias */}
      <FloatingNewsWidget />
      
      <ImageSlider slides={SLIDES} />

      {/* Slogan */}
      <section className="container mx-auto px-4 py-12 text-center">
        {/* Estrelas do tetracampeonato */}
        <div className="flex justify-center items-center space-x-1 mb-6">
          {[...Array(4)].map((_, index) => (
            <span key={index} className="text-white text-4xl leading-none">★</span>
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          <span className="text-2xl md:text-3xl">Ninguém torce como a gente</span>
        </h1>
      </section>

      {/* Botões */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-md mx-auto space-y-4">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 transition-all duration-300 flex items-center justify-center space-x-3 glow-red"
          >
            <MessageCircle size={24} />
            <span>Entrar na Comunidade</span>
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-white hover:bg-gray-100 text-black font-bold py-4 px-6 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <Instagram size={24} />
            <span>Nos siga no Instagram</span>
          </a>
        </div>
      </section>

      {/* Canal YouTube */}
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-black border border-red-600 p-6 glow-red max-w-4xl mx-auto">
          <h2 className="text-xl mb-4 text-center text-white">
            MELITTA XP por BABS | EP3: NEVE
          </h2>
          <div className="w-full h-0 pb-[56.25%] relative bg-black overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/4HMm8Ax6WbE?rel=0&modestbranding=1&autoplay=0"
              title="MELITTA XP por BABS | EP3: NEVE"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          <div className="text-center mt-4">
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 transition-all duration-300 glow-red"
            >
              Ver Canal Completo
            </a>
          </div>
        </div>
      </section>

      {/* Seção de Canais */}
      <LiveSection />
    </div>
  );
};

export default HomeSection;