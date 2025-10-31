import React, { useState } from 'react';
import { useWalletContext } from '../../contexts/WalletContext';
import { WalletStatus, WalletModal } from '../WalletConnection';

const Header = () => {
  const { isConnected } = useWalletContext();
  const [showWalletModal, setShowWalletModal] = useState(false);

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
            {/* Wallet Section */}
            <div className="flex items-center gap-2">
              <WalletStatus />
              {!isConnected && (
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#c084fc] to-[#00fff7] text-black font-bold rounded-md hover:opacity-90 transition-opacity flex items-center gap-1.5 text-xs"
                >
                  Connect
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
      `}</style>
    </header>
  );
};

export default Header;
