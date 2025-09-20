import React, { useCallback } from 'react';
import { playersData } from '../../data/playersData';
import { Player } from '../../types';

const LinesSection: React.FC = () => {
  const renderPlayerCard = useCallback((player: Player, index: number) => (
    <div key={index} className="bg-black border border-gray-600 p-6 text-center">
      <div className="w-20 h-20 bg-red-600 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
        {player.position.charAt(0)}
      </div>
      <h3 className="text-xl font-bold text-red-600 mb-1">{player.nick}</h3>
      <p className="text-white mb-2">{player.name}</p>
      <p className="text-sm text-gray-300">{player.birthdate || player.age}</p>
      <span className="inline-block bg-red-600 text-white px-3 py-1 text-xs mt-3">
        {player.position}
      </span>
    </div>
  ), []);

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Lines</h1>
      
      {/* LOL */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-red-600">League of Legends</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playersData.lol.map(renderPlayerCard)}
        </div>
      </section>

      {/* CS */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-red-600">Counter-Strike</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playersData.cs.map(renderPlayerCard)}
        </div>
      </section>

      {/* Free Fire */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-red-600">Free Fire (Mobile e Emulador)</h2>
        <div className="bg-black border border-red-600 p-12 text-center">
          <div className="text-6xl mb-4">🔧</div>
          <h3 className="text-2xl font-bold text-red-600 mb-2">EM MANUTENÇÃO</h3>
          <p className="text-white">Esta seção está sendo atualizada.</p>
        </div>
      </section>
    </div>
  );
};

export default LinesSection;