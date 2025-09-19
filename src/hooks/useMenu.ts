import { useState } from 'react';

export const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return {
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
    closeMenu
  };
};