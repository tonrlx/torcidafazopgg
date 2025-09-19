import React from 'react';

// Modular imports
import { Header, Navigation, TransitionOverlay, Footer } from './modules/ui';
import { 
  HomeSection, 
  AgendaSection, 
  LinesSection, 
  NewsSection, 
  StoreSection 
} from './modules/sections';
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
      <Header 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        activeTab={activeTab}
        onTabChange={handleTabChangeWithMenu}
      />
      
      <Navigation 
        isMenuOpen={isMenuOpen} 
        activeTab={activeTab} 
        onTabChange={handleTabChangeWithMenu} 
      />

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMenu}
        />
      )}

      <TransitionOverlay isVisible={isTransitioning} />

      {/* Conteúdo Principal - Começa exatamente na barra fixa */}
      <main className="pt-20 pb-16 w-full">
        {activeTab === TABS.HOME && <HomeSection />}
        {activeTab === TABS.AGENDA && <AgendaSection />}
        {activeTab === TABS.LINES && <LinesSection />}
        {activeTab === TABS.NEWS && <NewsSection />}
        {activeTab === TABS.SOU_PAIN && <StoreSection />}
      </main>

      <Footer />
    </div>
  );
}

export default App;