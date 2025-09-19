import React from 'react';
import { Menu, X } from 'lucide-react';
import { HeaderProps } from '../types';
import { ASSETS } from '../constants/assets';

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, activeTab, onTabChange }) => {
  return (
    <header className="bg-black fixed top-0 left-0 right-0 z-50 py-3 w-full">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo à esquerda */}
        <div className="flex items-center">
          <img 
            src={ASSETS.logo}
            alt="Torcida Faz o P" 
            className="h-14 w-auto object-contain"
            loading="eager"
            onError={(e) => {
              console.error('Erro ao carregar logo');
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjUwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VE9SQ0lEQTwvdGV4dD4KPC9zdmc+';
            }}
          />
        </div>
        
        {/* Navegação central */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => onTabChange('home')}
            className={`font-semibold text-lg transition-colors duration-300 ${
              activeTab === 'home' ? 'text-red-600' : 'text-white hover:text-red-600'
            }`}
          >
            HOME
          </button>
          <button
            onClick={() => onTabChange('agenda')}
            className={`font-semibold text-lg transition-colors duration-300 ${
              activeTab === 'agenda' ? 'text-red-600' : 'text-white hover:text-red-600'
            }`}
          >
            AGENDA
          </button>
          <button
            onClick={() => onTabChange('news')}
            className={`font-semibold text-lg transition-colors duration-300 ${
              activeTab === 'news' ? 'text-red-600' : 'text-white hover:text-red-600'
            }`}
          >
            NOTÍCIAS
          </button>
          <button
            onClick={() => onTabChange('sou-pain')}
            className={`font-semibold text-lg transition-colors duration-300 ${
              activeTab === 'sou-pain' ? 'text-red-600' : 'text-white hover:text-red-600'
            }`}
          >
            LOJA
          </button>
        </nav>
        
        {/* Menu Hamburger (mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 bg-black border border-gray-600 transition-all duration-300 hover:bg-gray-700"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;