import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslations } from '../locales/translations';

export const useWallet = () => {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const [isConnected, setIsConnected] = useState(false);
  const [walletType, setWalletType] = useState(null);
  const [address, setAddress] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load wallet connection from localStorage
  useEffect(() => {
    const loadWalletConnection = () => {
      try {
        const savedConnection = localStorage.getItem('aleoWalletConnection');
        if (savedConnection) {
          const connection = JSON.parse(savedConnection);
          setIsConnected(true);
          setWalletType(connection.type);
          setAddress(connection.address);
          setPublicKey(connection.publicKey || '');
        }
      } catch (error) {
        console.error('Error loading wallet connection:', error);
        localStorage.removeItem('aleoWalletConnection');
      } finally {
        setIsLoading(false);
      }
    };

    loadWalletConnection();
  }, []);

  // Check for wallet availability changes
  useEffect(() => {
    // Removed automatic checking to prevent performance issues
    // Components will check availability when needed
  }, []);

  // Make debug function globally available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const debugFunction = () => {
        if (typeof window === 'undefined') {
          console.log('Not in browser environment');
          return;
        }
        
        console.log('=== WALLET DEBUG INFO ===');
        console.log('window.leo:', window.leo);
        console.log('window.puzzle:', window.puzzle);
        console.log('window.leo?.request:', window.leo?.request);
        console.log('window.puzzle?.request:', window.puzzle?.request);
        console.log('=== END WALLET DEBUG ===');
      };
      
      window.debugAleoWallets = debugFunction;
      return () => {
        if (window.debugAleoWallets) {
          delete window.debugAleoWallets;
        }
      };
    }
  }, []);

  // Connect to wallet
  const connect = useCallback(async (type) => {
    setIsLoading(true);
    
    try {
      let response;
      
      if (type === 'leo') {
        if (!window.leo) {
          throw new Error(t.wallet.errors.leoNotFound);
        }
        
        // Try different connection methods
        if (window.leo.request) {
          response = await window.leo.request({ method: 'connect' });
        } else if (window.leo.connect) {
          response = await window.leo.connect();
        } else {
          throw new Error(t.wallet.errors.leoNotSupported);
        }
      } else if (type === 'puzzle') {
        // Try multiple approaches for Puzzle Wallet
        try {
          // First try: Official Puzzle SDK
          try {
            const puzzleModule = await import('@puzzlehq/sdk');
            console.log('Puzzle module:', puzzleModule);
            
            // Try different ways to access PuzzleSDK
            const PuzzleSDK = puzzleModule.PuzzleSDK || puzzleModule.default || puzzleModule;
            console.log('PuzzleSDK:', PuzzleSDK);
            
            if (typeof PuzzleSDK === 'function') {
              const puzzleSDK = new PuzzleSDK();
              const connection = await puzzleSDK.connect();
              
              if (connection && connection.address) {
                response = {
                  address: connection.address,
                  publicKey: connection.publicKey || ''
                };
              } else {
                throw new Error(t.wallet.errors.connectionFailed);
              }
            } else {
              throw new Error('PuzzleSDK is not a constructor');
            }
          } catch (sdkError) {
            console.log('Puzzle SDK failed, trying window.puzzle:', sdkError);
            
            // Fallback: Try window.puzzle
            if (window.puzzle && window.puzzle.request) {
              response = await window.puzzle.request({ method: 'connect' });
            } else if (window.puzzle && window.puzzle.connect) {
              response = await window.puzzle.connect();
            } else {
              throw new Error(t.wallet.errors.puzzleNotFound);
            }
          }
        } catch (error) {
          throw new Error(`Puzzle Wallet: ${error.message}`);
        }
      } else {
        throw new Error(t.wallet.errors.unknownWallet);
      }

      if (response && response.address) {
        const connection = {
          type,
          address: response.address,
          publicKey: response.publicKey || ''
        };

        setIsConnected(true);
        setWalletType(type);
        setAddress(response.address);
        setPublicKey(response.publicKey || '');
        
        // Save to localStorage
        localStorage.setItem('aleoWalletConnection', JSON.stringify(connection));
        
        return connection;
      } else {
        throw new Error(t.wallet.errors.connectionFailed);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    setIsConnected(false);
    setWalletType(null);
    setAddress('');
    setPublicKey('');
    
    // Clear localStorage
    localStorage.removeItem('aleoWalletConnection');
  }, []);

  // Check if wallet is available
  const isWalletAvailable = useCallback((type) => {
    if (typeof window === 'undefined') return false;
    
    if (type === 'leo') {
      // Check multiple possible API patterns for Leo Wallet
      return !!(
        (window.leo && window.leo.request) ||
        (window.leo && window.leo.connect) ||
        (window.leo && typeof window.leo === 'object')
      );
    } else if (type === 'puzzle') {
      // Check if Puzzle Wallet is available (SDK or window.puzzle)
      try {
        // Check window.puzzle first (more reliable)
        if (window.puzzle && (window.puzzle.request || window.puzzle.connect)) {
          return true;
        }
        // If no window.puzzle, assume SDK might be available
        return true;
      } catch (error) {
        return false;
      }
    }
    
    return false;
  }, []);

  // Get wallet availability status
  const getWalletStatus = useCallback((type) => {
    if (typeof window === 'undefined') return { available: false, reason: t.wallet.status.notInBrowser };
    
    if (type === 'leo') {
      if (!window.leo) {
        return { available: false, reason: t.wallet.status.leoNotFound };
      }
      if (!window.leo.request) {
        return { available: false, reason: t.wallet.status.leoNoRequest };
      }
      return { available: true, reason: t.wallet.status.available };
    } else if (type === 'puzzle') {
      try {
        if (window.puzzle && (window.puzzle.request || window.puzzle.connect)) {
          return { available: true, reason: t.wallet.status.puzzleAvailable };
        } else {
          return { available: true, reason: t.wallet.status.puzzleSdk };
        }
      } catch (error) {
        return { available: false, reason: t.wallet.status.puzzleUnavailable };
      }
    }
    
    return { available: false, reason: t.wallet.errors.unknownWallet };
  }, [t]);

  // Force refresh wallet availability
  const refreshWalletAvailability = useCallback(() => {
    // This function can be called to force a re-check of wallet availability
    // The components will automatically re-render when this is called
  }, []);

  // Debug function to check all available wallets
  const debugWallets = useCallback(() => {
    if (typeof window === 'undefined') {
      console.log('Not in browser environment');
      return;
    }
    
    console.log('=== WALLET DEBUG INFO ===');
    console.log('window.leo:', window.leo);
    console.log('window.puzzle:', window.puzzle);
    console.log('window.leo?.request:', window.leo?.request);
    console.log('window.puzzle?.request:', window.puzzle?.request);
    console.log('=== END WALLET DEBUG ===');
  }, []);

  // Get wallet balance (placeholder - would need actual implementation)
  const getBalance = useCallback(async () => {
    if (!isConnected || !address) return null;
    
    try {
      // This would need actual implementation based on wallet type
      // For now, return a placeholder
      return {
        aleo: '0.0',
        credits: '0'
      };
    } catch (error) {
      console.error('Error getting balance:', error);
      return null;
    }
  }, [isConnected, address]);

  // Sign message (placeholder - would need actual implementation)
  const signMessage = useCallback(async (message) => {
    if (!isConnected) {
      throw new Error(t.wallet.errors.notConnected);
    }

    try {
      let response;
      
      if (walletType === 'leo') {
        response = await window.leo.request({
          method: 'signMessage',
          params: { message }
        });
      } else if (walletType === 'puzzle') {
        // Use Puzzle SDK for signing with dynamic import
        const puzzleModule = await import('@puzzlehq/sdk');
        const PuzzleSDK = puzzleModule.PuzzleSDK || puzzleModule.default || puzzleModule;
        const puzzleSDK = new PuzzleSDK();
        response = await puzzleSDK.signMessage(message);
      } else {
        throw new Error(t.wallet.errors.unknownWallet);
      }

      return response;
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  }, [isConnected, walletType]);

  return {
    isConnected,
    walletType,
    address,
    publicKey,
    isLoading,
    connect,
    disconnect,
    isWalletAvailable,
    getWalletStatus,
    refreshWalletAvailability,
    getBalance,
    signMessage
  };
};
