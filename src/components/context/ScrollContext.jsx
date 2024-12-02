import { createContext, useContext, useState, useCallback } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(0);
  
  const updateScene = useCallback((scene, ratio) => {
    setCurrentScene(scene);
    setScrollRatio(ratio);
  }, []);

  return (
    <ScrollContext.Provider value={{ currentScene, scrollRatio, updateScene }}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};