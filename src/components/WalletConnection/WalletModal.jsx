import React, { useState, useEffect } from 'react';
import { useWalletContext } from '../../contexts/WalletContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslations } from '../../locales/translations';

const WalletModal = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const { connect, isWalletAvailable, getWalletStatus, refreshWalletAvailability, isLoading } = useWalletContext();
  const [error, setError] = useState('');
  const [connecting, setConnecting] = useState('');

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleConnect = async (walletType) => {
    setError('');
    setConnecting(walletType);

    try {
      await connect(walletType);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setConnecting('');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-[#0a0a0f] border border-[#00fff7]/30 rounded-xl p-4 sm:p-6 max-w-md w-full mx-4 shadow-2xl shadow-[#00fff7]/20 animate-modal-appear max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
        style={{ marginTop: 'auto', marginBottom: 'auto' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{t.wallet.connect}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={refreshWalletAvailability}
              className="text-gray-400 hover:text-white transition-colors text-sm px-2 py-1 rounded hover:bg-gray-700/50"
              title={t.wallet.refreshStatus}
            >
              🔄
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700/50"
              title={t.wallet.close}
            >
              ✕
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
            <div className="text-red-400 text-sm">{error}</div>
          </div>
        )}

        <div className="space-y-4">
          {/* Leo Wallet */}
          <button
            onClick={() => handleConnect('leo')}
            disabled={!isWalletAvailable('leo') || isLoading}
            className={`w-full p-4 rounded-lg border transition-all duration-300 ${
              isWalletAvailable('leo') && !isLoading
                ? 'border-[#00fff7]/30 hover:border-[#00fff7] hover:bg-[#00fff7]/5 cursor-pointer'
                : 'border-gray-600 bg-gray-800/50 cursor-not-allowed opacity-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">🦁</div>
              <div className="text-left">
                <div className="font-semibold text-white">{t.wallet.leoWallet}</div>
                        <div className="text-sm text-gray-400">
                          {getWalletStatus('leo').reason}
                        </div>
                {connecting === 'leo' && (
                  <div className="text-[#00fff7] text-xs mt-1">{t.wallet.connecting}</div>
                )}
              </div>
            </div>
          </button>

          {/* Puzzle Wallet */}
          <button
            onClick={() => handleConnect('puzzle')}
            disabled={!isWalletAvailable('puzzle') || isLoading}
            className={`w-full p-4 rounded-lg border transition-all duration-300 ${
              isWalletAvailable('puzzle') && !isLoading
                ? 'border-[#c084fc]/30 hover:border-[#c084fc] hover:bg-[#c084fc]/5 cursor-pointer'
                : 'border-gray-600 bg-gray-800/50 cursor-not-allowed opacity-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">🧩</div>
              <div className="text-left">
                <div className="font-semibold text-white">{t.wallet.puzzleWallet}</div>
                        <div className="text-sm text-gray-400">
                          {getWalletStatus('puzzle').reason}
                        </div>
                        {getWalletStatus('puzzle').available && (
                          <div className="text-xs text-green-400 mt-1">
                            ✓ Puzzle SDK
                          </div>
                        )}
                {connecting === 'puzzle' && (
                  <div className="text-[#c084fc] text-xs mt-1">{t.wallet.connecting}</div>
                )}
              </div>
            </div>
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>{t.wallet.installExtension}</p>
          <div className="flex justify-center gap-4 mt-2">
            <a
              href="https://leo.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00fff7] hover:underline"
            >
              {t.wallet.leoWallet}
            </a>
            <a
              href="https://puzzle.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c084fc] hover:underline"
            >
              {t.wallet.puzzleWallet}
            </a>
          </div>
          <div className="mt-3 p-3 bg-gray-800/30 rounded-lg">
            <p className="text-gray-400 text-xs">
              {t.wallet.refreshPage}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {t.wallet.debugConsole}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes modal-bg-appear {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-modal-appear {
          animation: modal-appear 0.3s ease-out;
        }
        
        .modal-bg {
          animation: modal-bg-appear 0.3s ease-out;
          z-index: 9999 !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        @media (max-height: 600px) {
          .modal-bg {
            align-items: flex-start !important;
            padding-top: 2rem !important;
          }
        }
        
        @media (max-width: 640px) {
          .modal-bg {
            padding: 1rem !important;
          }
        }
        
        /* Дополнительные стили для гарантии правильного отображения */
        .modal-bg * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default WalletModal;
