import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../locales/translations';

const WalletConnection = ({ onConnected, onDisconnected }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isConnected, setIsConnected] = useState(false);
  const [walletType, setWalletType] = useState(null);
  const [address, setAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  // Check if wallets are available
  const [leoWalletAvailable, setLeoWalletAvailable] = useState(false);
  const [puzzleWalletAvailable, setPuzzleWalletAvailable] = useState(false);

  useEffect(() => {
    // Check for Leo Wallet
    if (typeof window !== 'undefined' && window.leo) {
      setLeoWalletAvailable(true);
    }

    // Check for Puzzle Wallet
    if (typeof window !== 'undefined' && window.puzzle) {
      setPuzzleWalletAvailable(true);
    }

    // Check for existing connection
    const savedConnection = localStorage.getItem('aleoWalletConnection');
    if (savedConnection) {
      try {
        const connection = JSON.parse(savedConnection);
        setIsConnected(true);
        setWalletType(connection.type);
        setAddress(connection.address);
        if (onConnected) onConnected(connection);
      } catch (e) {
        localStorage.removeItem('aleoWalletConnection');
      }
    }
  }, [onConnected]);

  const connectLeoWallet = async () => {
    // Show stub error instead of actual connection
    alert('Кошелек временно недоступен. Функция подключения будет добавлена в следующем обновлении.');
    return;
  };

  const connectPuzzleWallet = async () => {
    // Show stub error instead of actual connection
    alert('Кошелек временно недоступен. Функция подключения будет добавлена в следующем обновлении.');
    return;
  };

  const disconnect = () => {
    setIsConnected(false);
    setWalletType(null);
    setAddress('');
    setError('');
    
    // Clear localStorage
    localStorage.removeItem('aleoWalletConnection');
    
    if (onDisconnected) onDisconnected();
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
  };

  if (isConnected) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <div className="text-green-400 font-semibold">
                {walletType === 'leo' ? `🦁 ${t.wallet.leoWallet}` : `🧩 ${t.wallet.puzzleWallet}`}
              </div>
              <div className="text-gray-400 text-sm font-mono">
                {formatAddress(address)}
              </div>
            </div>
          </div>
          <button
            onClick={disconnect}
            className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded hover:bg-red-500/30 transition-colors text-sm"
          >
            {t.wallet.disconnect}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <div className="text-red-400 text-sm">{error}</div>
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">{t.wallet.connect}</h3>
        <p className="text-gray-400 text-sm">{t.wallet.chooseWallet}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Leo Wallet */}
        <button
          onClick={connectLeoWallet}
          disabled={!leoWalletAvailable || isConnecting}
          className={`p-4 rounded-lg border transition-all duration-300 ${
            leoWalletAvailable && !isConnecting
              ? 'border-[#00fff7]/30 hover:border-[#00fff7] hover:bg-[#00fff7]/5 cursor-pointer'
              : 'border-gray-600 bg-gray-800/50 cursor-not-allowed opacity-50'
          }`}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">🦁</div>
            <div className="font-semibold text-white mb-1">{t.wallet.leoWallet}</div>
            <div className="text-sm text-gray-400">
              {leoWalletAvailable ? t.wallet.available : t.wallet.notInstalled}
            </div>
            {isConnecting && walletType === 'leo' && (
              <div className="text-[#00fff7] text-xs mt-2">{t.wallet.connecting}</div>
            )}
          </div>
        </button>

        {/* Puzzle Wallet */}
        <button
          onClick={connectPuzzleWallet}
          disabled={!puzzleWalletAvailable || isConnecting}
          className={`p-4 rounded-lg border transition-all duration-300 ${
            puzzleWalletAvailable && !isConnecting
              ? 'border-[#c084fc]/30 hover:border-[#c084fc] hover:bg-[#c084fc]/5 cursor-pointer'
              : 'border-gray-600 bg-gray-800/50 cursor-not-allowed opacity-50'
          }`}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">🧩</div>
            <div className="font-semibold text-white mb-1">{t.wallet.puzzleWallet}</div>
            <div className="text-sm text-gray-400">
              {puzzleWalletAvailable ? t.wallet.available : t.wallet.notInstalled}
            </div>
            {isConnecting && walletType === 'puzzle' && (
              <div className="text-[#c084fc] text-xs mt-2">{t.wallet.connecting}</div>
            )}
          </div>
        </button>
      </div>

      <div className="text-center text-xs text-gray-500">
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
            href="https://puzzle.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c084fc] hover:underline"
          >
            {t.wallet.puzzleWallet}
          </a>
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;
