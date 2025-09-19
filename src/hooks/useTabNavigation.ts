import { useState, useCallback } from 'react';

export const useTabNavigation = (initialTab: string = 'home') => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = useCallback((tab: string) => {
    if (tab === activeTab) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  }, [activeTab]);

  return {
    activeTab,
    isTransitioning,
    handleTabChange
  };
};