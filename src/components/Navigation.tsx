import React from 'react';
import { Home, Calendar, Newspaper, Smartphone, ShoppingBag } from 'lucide-react';
import { NavigationProps } from '../types';

const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, activeTab, onTabChange }) => {
  return (
    <div className={`fixed top-0 right-0 h-full bg-black border-l-2 border-gray-600 z-40 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} w-80 slide-in-right md:hidden`}>
      <div className="pt-20 p-6">
        <nav className="space-y-4">
          <button
            onClick={() => onTabChange('home')}
            className={`w-full text-left p-4 border transition-all duration-300 flex items-center space-x-3 font-semibold ${
              activeTab === 'home' 
                ? 'bg-red-600 border-red-600 text-white' 
                : 'bg-black border-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <Home size={20} />
            <span>HOME</span>
          </button>
          <button
            onClick={() => onTabChange('lines')}
            className={`w-full text-left p-4 border transition-all duration-300 flex items-center space-x-3 font-semibold ${
              activeTab === 'lines' 
                ? 'bg-red-600 border-red-600 text-white' 
                : 'bg-black border-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <Smartphone size={20} />
            <span>LINES</span>
          </button>
          <button
            onClick={() => onTabChange('sou-pain')}
            className={`w-full text-left p-4 border transition-all duration-300 flex items-center space-x-3 font-semibold ${
              activeTab === 'sou-pain' 
                ? 'bg-red-600 border-red-600 text-white' 
                : 'bg-black border-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <ShoppingBag size={20} />
            <span>LOJA</span>
          </button>
          <button
            onClick={() => onTabChange('news')}
            className={`w-full text-left p-4 border transition-all duration-300 flex items-center space-x-3 font-semibold ${
              activeTab === 'news' 
                ? 'bg-red-600 border-red-600 text-white' 
                : 'bg-black border-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <Newspaper size={20} />
            <span>NOTÍCIAS</span>
          </button>
          <button
            onClick={() => onTabChange('agenda')}
            className={`w-full text-left p-4 border transition-all duration-300 flex items-center space-x-3 font-semibold ${
              activeTab === 'agenda' 
                ? 'bg-red-600 border-red-600 text-white' 
                : 'bg-black border-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <Calendar size={20} />
            <span>AGENDA</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;