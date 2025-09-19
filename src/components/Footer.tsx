import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t-2 border-red-600 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="text-red-600 font-bold text-xl mb-2">TFP - TORCIDA FAZ O P</div>
        <p className="text-white text-sm">
          Portal oficial da comunidade TFP - Torcida Faz o P
        </p>
        <p className="text-white text-sm mt-1">
          Desde 2020 - Ninguém torce como a gente!
        </p>
        <p className="text-gray-400 text-xs mt-2">
          © torcidafazop. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;