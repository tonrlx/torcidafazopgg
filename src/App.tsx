
// Versão funcional - com todas as seções
import { HomeSection, NewsSection, FreeFireSection, AgendaSection, StoreSection } from './modules/sections';
import { useTabNavigation, useMenu, TABS } from './modules/core';
import { Menu, X } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import UserAvatar from './components/UserAvatar';
import ModerationMessage from './components/ModerationMessage';
import ModerationPanel from './components/ModerationPanel';
import SeloP from './components/SeloP';
import { useModeration } from './hooks/useModeration';
import { useState } from 'react';

function AppContent() {
  const { activeTab, isTransitioning, handleTabChange } = useTabNavigation();
  const { isMenuOpen, setIsMenuOpen, closeMenu } = useMenu();
  const { user, profile, signOut } = useAuth();
  const { moderationStatus, isModerator } = useModeration();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showModerationPanel, setShowModerationPanel] = useState(false);

  const handleTabChangeWithMenu = (tab: string) => {
    handleTabChange(tab);
    closeMenu();
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <header className="bg-black fixed top-0 left-0 right-0 z-50 py-2 w-full">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/images/TORCIDA.png.png"
              alt="Torcida Faz o P" 
              className="h-11 w-auto object-contain"
              onError={(e) => {
                console.error('Erro ao carregar logo');
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjUwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VE9SQ0lEQTwvdGV4dD4KPC9zdmc+';
              }}
            />
          </div>
          
          {/* Navegação desktop - Centralizada */}
          <nav className="hidden md:flex items-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
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

          {/* Botões de autenticação - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <UserAvatar 
                  name={profile?.full_name || user.email || 'Usuário'} 
                  size="sm"
                />
                <span className="text-white text-sm">
                  Olá, {profile?.username || user.email?.split('@')[0]}
                </span>
                {isModerator && (
                  <button
                    onClick={() => setShowModerationPanel(true)}
                    className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1.5 text-sm transition-colors duration-300"
                    title="Painel de Moderação"
                  >
                    <SeloP size="sm" />
                    <span>MOD</span>
                  </button>
                )}
                <button 
                  onClick={signOut}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-1.5 text-sm transition-colors duration-300"
                >
                  SAIR
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setShowLogin(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1.5 text-sm transition-colors duration-300"
                >
                  ENTRAR
                </button>
                <button 
                  onClick={() => setShowRegister(true)}
                  className="bg-white hover:bg-gray-100 text-black font-semibold px-4 py-1.5 text-sm transition-colors duration-300"
                >
                  CRIAR CONTA
                </button>
              </>
            )}
          </div>

          {/* Menu Hamburger (mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 bg-transparent transition-all duration-300 hover:bg-gray-800"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Mobile */}
      <div className={`fixed inset-0 z-40 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
      {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={closeMenu}
        />
        
        {/* Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-black border-l border-gray-700 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6">
            {/* Header da sidebar */}
            <div className="flex items-center justify-between mb-8">
              <img 
                src="/images/TORCIDA.png.png"
                alt="Torcida Faz o P" 
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  console.error('Erro ao carregar logo');
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjUwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VE9SQ0lEQTwvdGV4dD4KPC9zdmc+';
                }}
              />
              <button
                onClick={closeMenu}
                className="p-2 hover:bg-gray-800 rounded transition-colors duration-200"
                aria-label="Fechar menu"
              >
                <X size={24} color="white" />
              </button>
            </div>

            {/* Menu items */}
            <nav className="space-y-4">
              <button 
                onClick={() => handleTabChangeWithMenu('home')}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'home' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                HOME
              </button>
              <button 
                onClick={() => handleTabChangeWithMenu('lines')}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'lines' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                LINES
              </button>
              <button 
                onClick={() => handleTabChangeWithMenu('sou-pain')}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'sou-pain' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                LOJA
              </button>
              <button 
                onClick={() => handleTabChangeWithMenu('news')}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'news' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                NOTÍCIAS
              </button>
              <button 
                onClick={() => handleTabChangeWithMenu('agenda')}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'agenda' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                AGENDA
              </button>
            </nav>

            {/* Botões de autenticação - Mobile */}
            <div className="mt-8 space-y-3">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-white text-sm">
                    <UserAvatar 
                      name={profile?.full_name || user.email || 'Usuário'} 
                      size="sm"
                    />
                    <span>
                      Olá, {profile?.username || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button 
                    onClick={signOut}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 text-sm transition-colors duration-300"
                  >
                    SAIR
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setShowLogin(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 text-sm transition-colors duration-300"
                  >
                    ENTRAR
                  </button>
                  <button 
                    onClick={() => setShowRegister(true)}
                    className="w-full bg-white hover:bg-gray-100 text-black font-semibold px-4 py-2 text-sm transition-colors duration-300"
                  >
                    CRIAR CONTA
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <main className="pt-16 pb-16 w-full">
        {activeTab === TABS.HOME && <HomeSection />}
        {activeTab === TABS.LINES && <FreeFireSection />}
        {activeTab === TABS.SOU_PAIN && <StoreSection />}
        {activeTab === TABS.NEWS && <NewsSection />}
        {activeTab === TABS.AGENDA && <AgendaSection />}
      </main>

      {/* Modais de autenticação */}
      {showLogin && (
        <LoginForm 
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false)
            setShowRegister(true)
          }}
        />
      )}
      
      {showRegister && (
        <RegisterForm 
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false)
            setShowLogin(true)
          }}
        />
      )}

      {/* Painel de Moderação */}
      {showModerationPanel && (
        <ModerationPanel 
          onClose={() => setShowModerationPanel(false)}
        />
      )}

      {/* Mensagem de Ban/Suspensão */}
      <ModerationMessage
        isBanned={moderationStatus.isBanned}
        isSuspended={moderationStatus.isSuspended}
        reason={moderationStatus.banReason || moderationStatus.suspensionExpires}
        expiresAt={moderationStatus.suspensionExpires}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;