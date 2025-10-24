import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWalletContext } from '../../contexts/WalletContext';
import { WalletStatus, WalletModal } from '../WalletConnection';

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const { isConnected } = useWalletContext();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setShowLanguageMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-[#00fff7]/10 header-animate">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00fff7] to-[#c084fc] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">ZK</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Aleo Odyssey</h1>
              <p className="text-xs text-gray-400">ZK Journey</p>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-1.5 px-2 py-1.5 bg-black/20 border border-[#00fff7]/20 rounded-md hover:border-[#00fff7]/40 transition-colors"
              >
                <span className="text-sm">
                  {languages.find(lang => lang.code === language)?.flag}
                </span>
                <span className="text-xs text-white">
                  {languages.find(lang => lang.code === language)?.name}
                </span>
                <span className="text-[#00fff7] text-xs">▼</span>
              </button>

              {showLanguageMenu && (
                <div className="absolute top-full right-0 mt-1 bg-black/90 backdrop-blur-md border border-[#00fff7]/30 rounded-md shadow-xl min-w-[100px] overflow-hidden language-menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-3 py-2 text-left hover:bg-[#00fff7]/10 transition-colors flex items-center gap-2 ${
                        language === lang.code ? 'bg-[#00fff7]/20 text-[#00fff7]' : 'text-white'
                      }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span className="text-xs">{lang.name}</span>
                      {language === lang.code && (
                        <span className="text-[#00fff7] ml-auto text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wallet Section */}
            <div className="flex items-center gap-2">
              <WalletStatus />
              {!isConnected && (
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#c084fc] to-[#00fff7] text-black font-bold rounded-md hover:opacity-90 transition-opacity flex items-center gap-1.5 text-xs"
                >
                  💰 Connect
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Modal */}
      <WalletModal 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />

      {/* Click outside to close language menu */}
      {showLanguageMenu && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setShowLanguageMenu(false)}
        />
      )}

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .header-animate {
          animation: fadeInDown 0.6s ease-out;
        }
        
        .language-menu {
          animation: fadeInDown 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;
