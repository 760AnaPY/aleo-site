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
            <img
              src="/logo-footer.png"
              alt="Aleo Odyssey — ZK Journey"
              className="h-10 w-auto opacity-95 hover:opacity-100 transition-opacity"
            />
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
