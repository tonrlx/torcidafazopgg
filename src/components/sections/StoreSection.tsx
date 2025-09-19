import React from 'react';
import { storeData } from '../../data/storeData';
import OptimizedImage from '../OptimizedImage';

const StoreSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">LOJA OFICIAL</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {storeData.map((product) => (
          <div key={product.id} className="bg-black border border-red-600 p-6 text-center">
            {/* Imagem do produto */}
            <div className="w-full aspect-square mb-4 overflow-hidden">
              <OptimizedImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>
            
            {/* Nome do produto */}
            <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
            
            {/* Preço */}
            <div className="mb-4">
              <p className="text-xl font-bold text-red-600">{product.price}</p>
              <p className="text-sm text-gray-300">{product.installments}</p>
            </div>
            
            {/* Botões */}
            <div className="space-y-2">
              <a
                href={product.links.primary}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 transition-all duration-300 glow-red"
              >
                {product.links.secondary ? 'VER PRODUTO PRETO' : 'VER PRODUTO NA LOJA'}
              </a>
              
              {product.links.secondary && (
                <a
                  href={product.links.secondary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white hover:bg-gray-100 text-black font-bold py-3 px-4 transition-all duration-300"
                >
                  VER PRODUTO BRANCO
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreSection;