/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Force English by default and for the entire session/site
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Persist English to avoid any previously saved RU state
    localStorage.setItem('aleoLanguage', 'en');
  }, []);

  // Enforce English regardless of external calls
  const enforceEnglish = () => setLanguage('en');

  const value = {
    language,
    setLanguage: enforceEnglish,
    toggleLanguage: enforceEnglish,
    isRussian: false,
    isEnglish: true
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

