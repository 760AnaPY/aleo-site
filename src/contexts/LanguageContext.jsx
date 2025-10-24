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
  const [language, setLanguage] = useState(() => {
    // Загружаем сохраненный язык или используем английский по умолчанию
    const saved = localStorage.getItem('aleoLanguage');
    return saved || 'en';
  });

  // Сохраняем выбранный язык
  useEffect(() => {
    localStorage.setItem('aleoLanguage', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ru' : 'en');
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isRussian: language === 'ru',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

