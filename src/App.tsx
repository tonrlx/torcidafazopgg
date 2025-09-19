
// Versão funcional - com todas as seções
import { HomeSection, NewsSection, FreeFireSection, AgendaSection, StoreSection } from './modules/sections';
import { useTabNavigation, useMenu, TABS } from './modules/core';

function App() {
  const { activeTab, isTransitioning, handleTabChange } = useTabNavigation();
  const { isMenuOpen, setIsMenuOpen, closeMenu } = useMenu();

  const handleTabChangeWithMenu = (tab: string) => {
    handleTabChange(tab);
    closeMenu();
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <header className="bg-black fixed top-0 left-0 right-0 z-50 py-3 w-full">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/images/TORCIDA.png.png"
              alt="Torcida Faz o P" 
              className="h-14 w-auto object-contain"
              onError={(e) => {
                console.error('Erro ao carregar logo');
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjUwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VE9SQ0lEQTwvdGV4dD4KPC9zdmc+';
              }}
            />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleTabChangeWithMenu('home')}
              className={`font-semibold text-lg transition-colors duration-300 ${
                activeTab === 'home' ? 'text-red-600' : 'text-white hover:text-red-600'
              }`}
            >
              HOME
            </button>
            <button 
              onClick={() => handleTabChangeWithMenu('lines')}
              className={`font-semibold text-lg transition-colors duration-300 ${
                activeTab === 'lines' ? 'text-red-600' : 'text-white hover:text-red-600'
              }`}
            >
              LINES
            </button>
            <button 
              onClick={() => handleTabChangeWithMenu('sou-pain')}
              className={`font-semibold text-lg transition-colors duration-300 ${
                activeTab === 'sou-pain' ? 'text-red-600' : 'text-white hover:text-red-600'
              }`}
            >
              LOJA
            </button>
            <button 
              onClick={() => handleTabChangeWithMenu('news')}
              className={`font-semibold text-lg transition-colors duration-300 ${
                activeTab === 'news' ? 'text-red-600' : 'text-white hover:text-red-600'
              }`}
            >
              NOTÍCIAS
            </button>
            <button 
              onClick={() => handleTabChangeWithMenu('agenda')}
              className={`font-semibold text-lg transition-colors duration-300 ${
                activeTab === 'agenda' ? 'text-red-600' : 'text-white hover:text-red-600'
              }`}
            >
              AGENDA
            </button>
          </nav>
        </div>
      </header>
      
      <main className="pt-20 pb-16 w-full">
        {activeTab === TABS.HOME && <HomeSection />}
        {activeTab === TABS.LINES && <FreeFireSection />}
        {activeTab === TABS.SOU_PAIN && <StoreSection />}
        {activeTab === TABS.NEWS && <NewsSection />}
        {activeTab === TABS.AGENDA && <AgendaSection />}
      </main>
    </div>
  );
}

export default App;