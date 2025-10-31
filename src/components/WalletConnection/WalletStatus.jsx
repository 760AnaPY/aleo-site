import React from 'react';
import { useWalletContext } from '../../contexts/WalletContext';

const WalletStatus = () => {
  const { isConnected, walletType, address, disconnect } = useWalletContext();

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
  };

  const getWalletIcon = (type) => {
    switch (type) {
      case 'leo':
        return '🦁';
      case 'puzzle':
        return '🧩';
      default:
        return '💰';
    }
  };

  const getWalletName = (type) => {
    switch (type) {
      case 'leo':
        return 'Leo Wallet';
      case 'puzzle':
        return 'Puzzle Wallet';
      default:
        return 'Unknown Wallet';
    }
  };

  if (!isConnected) {
    return (
      <div className="flex items-center gap-1.5 text-gray-400">
        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
        <span className="text-xs"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-green-400">
          {getWalletIcon(walletType)} {getWalletName(walletType)}
        </span>
      </div>
      <div className="text-xs text-gray-400 font-mono">
        {formatAddress(address)}
      </div>
      <button
        onClick={disconnect}
        className="text-xs text-red-400 hover:text-red-300 transition-colors ml-1"
        title="Disconnect Wallet"
      >
        ✕
      </button>
    </div>
  );
};

export default WalletStatus;
