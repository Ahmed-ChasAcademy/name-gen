'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface NameContextType {
  savedNames: string[];
  addSavedName: (name: string) => void;
  removeSavedName: (name: string) => void;
  clearSavedNames: () => void;
}

const NameContext = createContext<NameContextType | undefined>(undefined);

export function NameProvider({ children }: { children: ReactNode }) {
  const [savedNames, setSavedNames] = useState<string[]>([]);

  const addSavedName = (name: string) => {
    setSavedNames(prev => {
      // Avoid duplicates
      if (!prev.includes(name)) {
        return [name, ...prev];
      }
      return prev;
    });
  };

  const removeSavedName = (name: string) => {
    setSavedNames(prev => prev.filter(n => n !== name));
  };

  const clearSavedNames = () => {
    setSavedNames([]);
  };

  return (
    <NameContext.Provider value={{ savedNames, addSavedName, removeSavedName, clearSavedNames }}>
      {children}
    </NameContext.Provider>
  );
}

export function useNameContext() {
  const context = useContext(NameContext);
  if (context === undefined) {
    throw new Error('useNameContext must be used within a NameProvider');
  }
  return context;
}