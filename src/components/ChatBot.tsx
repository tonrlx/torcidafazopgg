import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Instagram, Twitter, Bell } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'community';
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'BOM DIA';
    if (hour < 18) return 'BOA TARDE';
    return 'BOA NOITE';
  };

  const getRandomGreeting = () => {
    const greetings = [
      'Oi! Como posso te ajudar hoje? 😊',
      'Olá! Tudo bem? Em que posso ajudar?',
      'E aí! O que você gostaria de saber?',
      'Oi! Estou aqui pra te ajudar! 😄',
      'Olá! Como posso te auxiliar hoje?'
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      const greeting = getGreeting();
      const randomGreeting = getRandomGreeting();
      const initialMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `${greeting}! ${randomGreeting}`,
        isBot: true,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([initialMessage]);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        isBot: true,
        timestamp: new Date(),
        type: botResponse.type
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): { text: string; type?: 'text' | 'suggestion' | 'community' } => {
    const input = userInput.toLowerCase();

    // Respostas sobre campeonatos
    if (input.includes('campeonato') || input.includes('próximo') || input.includes('competição') || input.includes('jogo') || input.includes('partida') || input.includes('torneio')) {
      return {
        text: 'Ah, quer saber sobre os campeonatos da paiN! 😊\n\nPara ficar por dentro de tudo, acompanha:\n\n🏆 Liquipedia: https://liquipedia.net/freefire/PaiN_Gaming\n🐦 Twitter: https://x.com/paiNGamingBR\n📱 Instagram: https://www.instagram.com/paingamingbr/',
        type: 'community'
      };
    }

    // Respostas sobre YouTube
    if (input.includes('youtube') || input.includes('canal') || input.includes('vídeo') || input.includes('video') || input.includes('stream')) {
      return {
        text: 'O canal da paiN é incrível! 🎮\n\nCanal oficial: https://www.youtube.com/@paingamingbr\n\nLá tem transmissões ao vivo, highlights dos jogos e muito mais! Vale a pena seguir! 😄',
        type: 'community'
      };
    }

    // Respostas sobre lives
    if (input.includes('live') || input.includes('streaming') || input.includes('transmissão') || input.includes('transmissao')) {
      return {
        text: 'As lives da galera são demais! 🔥\n\nConfere os canais oficiais:\n\n📺 Twitch: https://www.twitch.tv/paingamingbr\n📱 YouTube: https://www.youtube.com/@paingamingbr\n\nE não esquece de seguir os jogadores individuais também!',
        type: 'community'
      };
    }

    // Respostas sobre Free Fire
    if (input.includes('free fire') || input.includes('freefire') || input.includes('ff')) {
      return {
        text: 'Free Fire é nossa paixão! 🔥\n\nA paiN tem uma das melhores equipes do mundo no Free Fire!\n\nPara acompanhar:\n🏆 Liquipedia: https://liquipedia.net/freefire/PaiN_Gaming\n📱 Instagram: https://www.instagram.com/paingamingbr/',
        type: 'community'
      };
    }

    // Respostas sobre CS/CS2
    if (input.includes('cs') || input.includes('cs2') || input.includes('counter-strike') || input.includes('counter strike')) {
      return {
        text: 'CS2 é pura estratégia! 🎯\n\nA equipe de CS da paiN está sempre evoluindo!\n\nAcompanha:\n🏆 Liquipedia: https://liquipedia.net/counterstrike/PaiN_Gaming\n🐦 Twitter: https://x.com/paiNGamingBR',
        type: 'community'
      };
    }

    // Respostas sobre LoL
    if (input.includes('lol') || input.includes('league') || input.includes('league of legends')) {
      return {
        text: 'LoL é estratégia pura! ⚔️\n\nA equipe de LoL da paiN está sempre buscando a vitória!\n\nPara acompanhar:\n🏆 Liquipedia: https://liquipedia.net/leagueoflegends/PaiN_Gaming\n📱 Instagram: https://www.instagram.com/paingamingbr/',
        type: 'community'
      };
    }

    // Respostas sobre Torcida Faz o P
    if (input.includes('torcida') || input.includes('faz o p') || input.includes('fazop') || input.includes('tfp')) {
      return {
        text: 'Torcida Faz o P é a nossa paixão! ❤️\n\nSiga a gente nas redes:\n\n📱 Instagram: https://www.instagram.com/torcidafazop_/\n🐦 Twitter: https://x.com/torcidafazop\n\nVamos juntos fazer o P! 🔥',
        type: 'community'
      };
    }

    // Respostas sobre fundador
    if (input.includes('quem criou') || input.includes('quem fundou') || input.includes('fundador') || input.includes('criador')) {
      return {
        text: 'A Torcida Faz o P foi criada por Adailton "Ton" Serra (@tonrlx) no dia 26/08/2024! 🎉\n\nFoi ele quem teve a ideia de unir a galera para torcer pela paiN!',
        type: 'text'
      };
    }

    // Respostas sobre horários
    if (input.includes('horário') || input.includes('horario') || input.includes('hora') || input.includes('quando')) {
      return {
        text: 'Para saber os horários dos jogos, acompanha:\n\n🏆 Liquipedia: https://liquipedia.net/freefire/PaiN_Gaming\n🐦 Twitter: https://x.com/paiNGamingBR\n📱 Instagram: https://www.instagram.com/paingamingbr/\n\nLá sempre tem as informações mais atualizadas!',
        type: 'community'
      };
    }

    // Respostas sobre resultados
    if (input.includes('resultado') || input.includes('vitória') || input.includes('vitoria') || input.includes('derrota') || input.includes('placar')) {
      return {
        text: 'Para ver os resultados mais recentes:\n\n🏆 Liquipedia: https://liquipedia.net/freefire/PaiN_Gaming\n🐦 Twitter: https://x.com/paiNGamingBR\n\nLá você encontra tudo sobre as partidas!',
        type: 'community'
      };
    }

    // Respostas sobre jogadores
    if (input.includes('jogador') || input.includes('player') || input.includes('roster') || input.includes('equipe')) {
      return {
        text: 'Nossa equipe é incrível! 💪\n\nPara conhecer os jogadores:\n\n🏆 Liquipedia: https://liquipedia.net/freefire/PaiN_Gaming\n📱 Instagram: https://www.instagram.com/paingamingbr/\n\nLá tem as informações de todos os players!',
        type: 'community'
      };
    }

    // Respostas sobre como está
    if (input.includes('como está') || input.includes('como esta') || input.includes('status') || input.includes('situação') || input.includes('situacao')) {
      return {
        text: 'A paiN está sempre evoluindo! 🚀\n\nPara ficar por dentro de tudo:\n\n🏆 Liquipedia: https://liquipedia.net/freefire/PaiN_Gaming\n🐦 Twitter: https://x.com/paiNGamingBR\n📱 Instagram: https://www.instagram.com/paingamingbr/',
        type: 'community'
      };
    }

    // Respostas sobre ajuda
    if (input.includes('ajuda') || input.includes('help') || input.includes('o que') || input.includes('que')) {
      return {
        text: 'Posso te ajudar com informações sobre:\n\n🏆 Campeonatos e jogos\n📺 Lives e transmissões\n👥 Jogadores e equipes\n📱 Redes sociais\n\nO que você gostaria de saber?',
        type: 'text'
      };
    }

    // Resposta padrão para perguntas não reconhecidas
    return {
      text: 'Desculpa, não consegui entender sua pergunta! 😅\n\nMas você pode entrar em contato com a Torcida Faz o P:\n\n📱 Instagram: https://www.instagram.com/torcidafazop_/\n🐦 Twitter: https://x.com/torcidafazop\n\nA galera vai te ajudar!',
      type: 'community'
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 bg-black hover:bg-gray-800 text-white p-2 rounded-full shadow-lg transition-all duration-300 z-50 group hover:scale-110 border border-gray-600"
      >
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <Bell size={16} className="text-gray-300" />
        </div>
      </button>

      {/* Chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-gray-900 border border-gray-600 rounded-lg shadow-xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gray-800 p-3 rounded-t-lg lg:rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/TORCIDA.png.png" 
                  alt="TORCIDA" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">TFP</span>
                </div>
              </div>
              <div>
                <div className="text-white text-sm font-bold">TFP</div>
                <div className="text-gray-300 text-xs">Torcidafazop</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-700 text-white'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-600">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-red-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;