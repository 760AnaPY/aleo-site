import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslations } from '../../locales/translations';
import { WalletModal } from '../WalletConnection';

const HeroSection = ({ onConnected }) => {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const [command, setCommand] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isHacking, setIsHacking] = useState(false);
  const [terminalLines, setTerminalLines] = useState([]);
  const inputRef = useRef(null);
  
  // Новые состояния для разных эффектов
  const [matrixEffect, setMatrixEffect] = useState(false);
  const [cosmicEffect, setCosmicEffect] = useState(false);
  const [alertEffect, setAlertEffect] = useState(false);
  const [mysticalEffect, setMysticalEffect] = useState(false);
  const [particleEffect, setParticleEffect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  // Состояния для реакций интерфейса
  const [screenShake, setScreenShake] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);
  const [screenFlicker, setScreenFlicker] = useState(false);

  useEffect(() => {
    if (inputRef.current && !isConnecting && !isConnected) {
      inputRef.current.focus();
    }
  }, [isConnecting, isConnected]);

  const handleConnect = async () => {
    const cmd = command.toLowerCase();
    
    // ПАСХАЛКА: Matrix эффект с падающими символами
    if (cmd === 'matrix' || cmd === 'матрица') {
      setMatrixEffect(true);
      setIsConnecting(true);
      setScreenFlicker(true);
      setTerminalLines([
        `> ${command}`,
        'Wake up, Neo...',
        'The Matrix has you...',
        'Follow the white rabbit.',
        '',
        '⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿',
        '⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿',
        '01001101 01100001 01110100 01110010 01101001 01111000',
        '',
        '🐇 Type "connect" to escape the Matrix...'
      ]);
      await new Promise(resolve => setTimeout(resolve, 4000));
      setMatrixEffect(false);
      setScreenFlicker(false);
      setIsConnecting(false);
      setCommand('');
      return;
    }

    // ПАСХАЛКА: Ответ на главный вопрос с космическим эффектом
    if (cmd === '42') {
      setCosmicEffect(true);
      setIsConnecting(true);
      setTerminalLines([
        `> ${command}`,
        'Deep Thought computing...',
        '',
        '🌌 The Answer to the Ultimate Question of Life,',
        '   the Universe, and Everything is...',
        '',
        '   ██╗  ██╗██████╗ ',
        '   ██║  ██║╚════██╗',
        '   ███████║ █████╔╝',
        '   ╚════██║██╔═══╝ ',
        '        ██║███████╗',
        '        ╚═╝╚══════╝',
        '',
        '   (Now you need to figure out the Question)',
        '',
        '   P.S. Try "connect" to continue your journey'
      ]);
      await new Promise(resolve => setTimeout(resolve, 3500));
      setCosmicEffect(false);
      setIsConnecting(false);
      setCommand('');
      return;
    }

    // ПАСХАЛКА: Aleo секрет с модальным окном
    if (cmd === 'aleo' || cmd === 'алео') {
      setTerminalLines([
        `> ${command}`,
        '🔐 Opening Aleo vault...'
      ]);
      await new Promise(resolve => setTimeout(resolve, 500));
      setModalContent({
        title: '🔐 ALEO SECRETS VAULT',
        content: (
          <div className="space-y-4">
            <div className="text-center text-2xl font-bold bg-gradient-to-r from-[#00fff7] to-[#c084fc] bg-clip-text text-transparent">
              ╔══════════════════════════════════╗<br/>
              ║  A - Anonymous                   ║<br/>
              ║  L - Lightning Fast              ║<br/>
              ║  E - Encrypted                   ║<br/>
              ║  O - Open Source                 ║<br/>
              ╚══════════════════════════════════╝
            </div>
            <p className="text-[#00fff7] text-center text-lg">✨ Zero Knowledge, Infinite Possibilities ✨</p>
            <p className="text-gray-400 text-center text-sm">Aleo brings privacy to web3 through zero knowledge cryptography</p>
          </div>
        )
      });
      setShowModal(true);
      setCommand('');
      return;
    }

    // ПАСХАЛКА: Хакер с красным экраном тревоги
    if (cmd === 'hack' || cmd === 'хак') {
      setAlertEffect(true);
      setIsConnecting(true);
      setScreenFlash(true);
      setTerminalLines([
        `> ${command}`,
        'ERROR: UNAUTHORIZED ACCESS ATTEMPT DETECTED!',
        '🚨 FBI ALERT 🚨',
        'Tracing IP address...',
        'Location: 127.0.0.1 (localhost)',
        '',
        'Just kidding! 😄',
        'We are all hackers here... of the blockchain!',
        '',
        'Type "connect" to hack reality with ZK proofs'
      ]);
      await new Promise(resolve => setTimeout(resolve, 3500));
      setAlertEffect(false);
      setScreenFlash(false);
      setIsConnecting(false);
      setCommand('');
      return;
    }

    // ПАСХАЛКА: Секретное сообщение с мистическим эффектом
    if (cmd === 'secret' || cmd === 'тайна' || cmd === 'секрет') {
      setMysticalEffect(true);
      setIsConnecting(true);
      setTerminalLines([
        `> ${command}`,
        '🔮 Unveiling ancient wisdom...',
        '',
        '   ✨ "The best way to predict the future',
        '      is to invent it with Zero Knowledge" ✨',
        '',
        '   - Ancient ZK Proverb',
        '',
        '🗝️  Other mystical commands:',
        '   matrix, 42, hack, aleo, help, konami'
      ]);
      await new Promise(resolve => setTimeout(resolve, 3000));
      setMysticalEffect(false);
      setIsConnecting(false);
      setCommand('');
      return;
    }

    // ПАСХАЛКА: Помощь
    if (cmd === 'help' || cmd === 'помощь') {
      setTerminalLines([
        `> ${command}`,
        '📚 Available commands:',
        '',
        '  connect     - Enter the ZK Odyssey',
        '  matrix      - Follow the white rabbit 🐇',
        '  42          - The Ultimate Answer 🌌',
        '  aleo        - Learn about Aleo 🔐',
        '  hack        - Become a hacker 🚨',
        '  secret      - Discover hidden wisdom 🔮',
        '  konami      - Activate God Mode 🎮',
        '  help        - Show this message',
        '',
        '🎯 Ready? Type "connect" to begin!'
      ]);
      setCommand('');
      return;
    }

    // ПАСХАЛКА: Konami code с эффектом частиц
    if (cmd === 'konami' || cmd === '↑↑↓↓←→←→ba') {
      setParticleEffect(true);
      setIsConnecting(true);
      setScreenShake(true);
      setTerminalLines([
        `> ${command}`,
        '🎮 KONAMI CODE ACTIVATED!',
        '',
        '⭐⭐⭐ +30 LIVES ⭐⭐⭐',
        '',
        '╔═══════════════════════════╗',
        '║   YOU ARE NOW IN          ║',
        '║   🌟 GOD MODE 🌟          ║',
        '╚═══════════════════════════╝',
        '',
        '(At least in this terminal... 😉)',
        '',
        'Type "connect" with your newfound powers!'
      ]);
      await new Promise(resolve => setTimeout(resolve, 3000));
      setParticleEffect(false);
      setScreenShake(false);
      setIsConnecting(false);
      setCommand('');
      return;
    }
    
    // Основная команда connect
    if (cmd === 'connect') {
      setIsHacking(true);
      setIsConnecting(true);
      setScreenShake(true);
      
      // Хакерский эффект с глитчем
      setTerminalLines([
        '> connect',
        'INITIATING BREACH PROTOCOL...',
        'SCANNING NETWORK NODES...',
      ]);

      await new Promise(resolve => setTimeout(resolve, 800));
      setTerminalLines(prev => [...prev, 
        '[████████████████] 100% FIREWALL BYPASSED',
        'INJECTING ZK-PROOF PAYLOAD...'
      ]);

      await new Promise(resolve => setTimeout(resolve, 700));
      setTerminalLines(prev => [...prev,
        'DECRYPTING QUANTUM SIGNATURES...',
        '0x7F3A...B92E > ACCESS_GRANTED',
        'ESTABLISHING SECURE CHANNEL...'
      ]);

      await new Promise(resolve => setTimeout(resolve, 800));
      setTerminalLines(prev => [...prev, 
        'SYNCHRONIZING BLOCKCHAIN STATE...',
        '⚡ NEURAL LINK ESTABLISHED ⚡'
      ]);

      await new Promise(resolve => setTimeout(resolve, 600));
      setIsHacking(false);
      setScreenShake(false);
      
      setTerminalLines(prev => [...prev, '', '✓ Access granted. Welcome, Prover #001.']);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsConnected(true);
      setIsConnecting(false);

      // вызываем callback родителя для рендера Missions.jsx
      onConnected && onConnected();
    } else {
      setTerminalLines([`> ${command}`, t.hero.connectError]);
      setCommand('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConnect();
    }
  };

  return (
    <div className={`min-h-screen bg-[#0a0a0f] text-white font-mono relative overflow-hidden flex items-center justify-center ${isHacking ? 'hacking-effect' : ''} ${matrixEffect ? 'matrix-bg' : ''} ${cosmicEffect ? 'cosmic-bg' : ''} ${alertEffect ? 'alert-bg' : ''} ${mysticalEffect ? 'mystical-bg' : ''} ${particleEffect ? 'particle-bg' : ''} ${screenShake ? 'screen-shake' : ''} ${screenFlash ? 'screen-flash' : ''} ${screenFlicker ? 'screen-flicker' : ''}`}>
      
      {/* Модальное окно */}
      {showModal && modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] border-2 border-[#00fff7] rounded-2xl p-8 max-w-2xl w-full shadow-2xl shadow-[#00fff7]/50 animate-modal-appear">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#00fff7] hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#00fff7] to-[#c084fc] bg-clip-text text-transparent">
              {modalContent.title}
            </h2>
            <div className="modal-pulse">
              {modalContent.content}
            </div>
            <div className="mt-6 text-center">
              <button 
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-[#00fff7] text-black font-bold rounded-lg hover:bg-[#00fff7]/80 transition-all hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Matrix Rain Effect */}
      {matrixEffect && (
        <div className="matrix-rain absolute inset-0 pointer-events-none z-40">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="matrix-column"
              style={{
                left: `${i * 3.33}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {[...Array(20)].map((_, j) => (
                <span key={j} className="text-green-500 opacity-70">
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Cosmic Stars Effect */}
      {cosmicEffect && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="cosmic-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Alert Siren Effect */}
      {alertEffect && (
        <div className="absolute inset-0 pointer-events-none z-40">
          <div className="alert-siren"></div>
          <div className="alert-flash"></div>
        </div>
      )}

      {/* Mystical Particles Effect */}
      {mysticalEffect && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="mystical-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Game Particles Effect */}
      {particleEffect && (
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="game-particle"
              style={{
                left: '50%',
                top: '50%',
                '--angle': `${(i * 360) / 100}deg`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Glitch Overlay - только для connect */}
      {isHacking && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="glitch-overlay"></div>
          <div className="scan-line"></div>
        </div>
      )}
      
      {/* Grid Background */}
      <div className={`absolute inset-0 opacity-10 ${isHacking ? 'animate-grid-glitch' : ''}`}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#00fff7 1px, transparent 1px), linear-gradient(90deg, #00fff7 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-[#00fff7] rounded-full blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#c084fc] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Terminal */}
      <div className="w-full max-w-4xl mx-4 relative z-10">
        <div className="bg-black/60 backdrop-blur-xl border border-[#00fff7]/30 rounded-lg shadow-2xl shadow-[#00fff7]/20 overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-black/80 px-4 py-2 flex items-center gap-2 border-b border-[#00fff7]/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-[#00fff7]/60 text-sm ml-4">zk-terminal v1.0</span>
          </div>

          {/* Terminal Content */}
          <div className="p-8 min-h-[500px] flex flex-col">
            {!isConnecting && !isConnected && (
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-8 text-center animate-fade-in">
                  <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#00fff7] to-[#c084fc] bg-clip-text text-transparent">
                    THE ZK ODYSSEY
                  </h1>
                  <p className="text-xl text-[#00fff7]/80 mb-2">{t.hero.title}</p>
                  <p className="text-gray-500 text-sm">{t.hero.subtitle}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00fff7]">{'>'}</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-transparent border-none outline-none text-white caret-[#00fff7]"
                      placeholder={t.hero.placeholder}
                      autoFocus
                    />
                    <span className="animate-pulse text-[#00fff7]">_</span>
                  </div>

        

                  {terminalLines.map((line, idx) => (
                    <div
                      key={idx}
                      className={`text-gray-400 animate-fade-in ${line.includes('Prover') ? 'text-[#00fff7] text-xl font-bold' : ''}`}
                      style={{ animationDelay: `${idx * 500}ms` }}
                    >
                      {line.startsWith('>') ? (
                        <span className="flex items-center gap-2">
                          <span className="text-[#00fff7]">{'>'}</span>
                          <span>{line.substring(2)}</span>
                        </span>
                      ) : (
                        <>
                          {line.includes('...') && <span className="inline-block w-2 h-2 bg-[#00fff7] rounded-full animate-pulse mr-2" />}
                          {line}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isConnecting && (
              <div className="flex-1 flex flex-col justify-center space-y-3">
                {terminalLines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`animate-fade-in ${
                      line.includes('Prover') ? 'text-[#00fff7] text-xl font-bold' : 
                      line.includes('BREACH') || line.includes('BYPASSED') || line.includes('FIREWALL') ? 'text-red-500 font-bold' :
                      line.includes('ACCESS_GRANTED') || line.includes('NEURAL LINK') ? 'text-green-400 font-bold' :
                      line.includes('0x') ? 'text-[#c084fc] font-mono' :
                      line.includes('⚡') ? 'text-yellow-400 font-bold text-center' :
                      line.includes('✓') ? 'text-[#00fff7] text-xl font-bold text-center' :
                      'text-gray-400'
                    } ${isHacking && !line.includes('✓') ? 'text-shadow-glow' : ''}`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {line.startsWith('>') ? (
                      <span className="flex items-center gap-2">
                        <span className="text-[#00fff7]">{'>'}</span>
                        <span>{line.substring(2)}</span>
                      </span>
                    ) : (
                      <>
                        {(line.includes('...') || line.includes('SCANNING') || line.includes('DECRYPTING')) && 
                          <span className="inline-block w-2 h-2 bg-[#00fff7] rounded-full animate-pulse mr-2" />}
                        {line}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Footer Hint */}
            {!isConnecting && !isConnected && (
              <div className="mt-8 text-center text-gray-600 text-sm animate-fade-in" style={{ animationDelay: '1s' }}>
                <p>{t.hero.prompt} <span className="text-[#00fff7]">connect</span></p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Info */}
        {!isConnecting && !isConnected && (
          <div className="mt-6 text-center text-gray-600 text-xs animate-fade-in" style={{ animationDelay: '1.5s' }}>
            <p>Aleo Network • Zero Knowledge Proof Education Platform</p>
          </div>
        )}
      </div>

      {/* Global Styles */}
      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        /* Hacking Effects - только для connect */
        @keyframes screen-glitch {
          0%, 100% { 
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          10% { 
            transform: translate(-2px, 2px);
            filter: hue-rotate(90deg);
          }
          20% { 
            transform: translate(2px, -2px);
            filter: hue-rotate(180deg);
          }
          30% { transform: translate(-2px, -2px); }
          40% { transform: translate(2px, 2px); }
          50% { 
            transform: translate(-1px, 1px);
            filter: hue-rotate(270deg);
          }
          60% { transform: translate(1px, -1px); }
          70% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); }
          90% { transform: translate(0); }
        }

        @keyframes glitch-overlay {
          0% { 
            clip-path: polygon(0 0%, 100% 0%, 100% 5%, 0 5%);
            transform: translateX(0);
          }
          10% { 
            clip-path: polygon(0 15%, 100% 15%, 100% 20%, 0 20%);
            transform: translateX(-5px);
          }
          20% { 
            clip-path: polygon(0 40%, 100% 40%, 100% 45%, 0 45%);
            transform: translateX(5px);
          }
          30% { 
            clip-path: polygon(0 60%, 100% 60%, 100% 65%, 0 65%);
            transform: translateX(-3px);
          }
          40% { 
            clip-path: polygon(0 75%, 100% 75%, 100% 80%, 0 80%);
            transform: translateX(3px);
          }
          50% { 
            clip-path: polygon(0 90%, 100% 90%, 100% 95%, 0 95%);
            transform: translateX(-2px);
          }
          100% { 
            clip-path: polygon(0 0%, 100% 0%, 100% 5%, 0 5%);
            transform: translateX(0);
          }
        }

        @keyframes scan-line {
          0% { top: 0%; }
          100% { top: 100%; }
        }

        @keyframes grid-glitch {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        .hacking-effect {
          animation: screen-glitch 0.3s infinite;
        }

        .glitch-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 255, 247, 0.1) 0%,
            transparent 50%,
            rgba(192, 132, 252, 0.1) 100%
          );
          animation: glitch-overlay 0.5s infinite;
          mix-blend-mode: overlay;
        }

        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(0, 255, 247, 0.8),
            transparent
          );
          box-shadow: 0 0 10px rgba(0, 255, 247, 0.5);
          animation: scan-line 2s linear infinite;
        }

        .animate-grid-glitch {
          animation: grid-glitch 0.3s infinite;
        }

        .text-shadow-glow {
          text-shadow: 
            0 0 5px rgba(0, 255, 247, 0.5),
            0 0 10px rgba(0, 255, 247, 0.3),
            0 0 15px rgba(0, 255, 247, 0.2);
        }

        /* Modal Animations */
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-modal-appear {
          animation: modal-appear 0.3s ease-out;
        }

        .modal-pulse {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        /* Matrix Effect */
        .matrix-bg {
          background: linear-gradient(180deg, #001100 0%, #0a0a0f 100%);
        }

        @keyframes matrix-fall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        .matrix-column {
          position: absolute;
          top: -100%;
          font-family: monospace;
          font-size: 20px;
          color: #00ff00;
          animation: matrix-fall 4s linear infinite;
          white-space: pre;
          line-height: 1.2;
        }

        /* Cosmic Effect */
        .cosmic-bg {
          background: radial-gradient(ellipse at center, #1a0033 0%, #0a0a0f 100%);
        }

        @keyframes cosmic-twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .cosmic-star {
          position: absolute;
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          animation: cosmic-twinkle 2s ease-in-out infinite;
        }

        /* Alert Effect */
        .alert-bg {
          background: #0a0a0f;
        }

        @keyframes alert-pulse {
          0%, 100% {
            background: rgba(255, 0, 0, 0);
          }
          50% {
            background: rgba(255, 0, 0, 0.3);
          }
        }

        @keyframes alert-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .alert-siren {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg 90deg,
            rgba(255, 0, 0, 0.3) 90deg 180deg,
            transparent 180deg 270deg,
            rgba(255, 0, 0, 0.3) 270deg 360deg
          );
          animation: alert-rotate 1s linear infinite;
        }

        .alert-flash {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          animation: alert-pulse 0.5s ease-in-out infinite;
        }

        /* Mystical Effect */
        .mystical-bg {
          background: radial-gradient(ellipse at center, #1a0066 0%, #0a0a0f 100%);
        }

        @keyframes mystical-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
            transform: translate(calc(var(--dx) * 30px), calc(var(--dy) * 30px)) scale(1.5);
          }
        }

        .mystical-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #c084fc 0%, transparent 70%);
          border-radius: 50%;
          --dx: calc(Math.random() * 2 - 1);
          --dy: calc(Math.random() * 2 - 1);
          animation: mystical-float 3s ease-in-out infinite;
          filter: blur(1px);
        }

        /* Particle Effect */
        .particle-bg {
          background: radial-gradient(ellipse at center, #330033 0%, #0a0a0f 100%);
        }

        @keyframes particle-burst {
          0% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(300px) scale(0);
            opacity: 0;
          }
        }

        .game-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #00fff7, #c084fc);
          border-radius: 50%;
          animation: particle-burst 1s ease-out forwards;
          box-shadow: 0 0 10px currentColor;
        }

        /* Реакции интерфейса */
        @keyframes screen-shake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2px, -1px) rotate(-0.5deg); }
          20% { transform: translate(2px, 1px) rotate(0.5deg); }
          30% { transform: translate(-1px, 2px) rotate(-0.3deg); }
          40% { transform: translate(1px, -2px) rotate(0.3deg); }
          50% { transform: translate(-2px, 1px) rotate(-0.2deg); }
          60% { transform: translate(2px, -1px) rotate(0.2deg); }
          70% { transform: translate(-1px, -2px) rotate(-0.1deg); }
          80% { transform: translate(1px, 2px) rotate(0.1deg); }
          90% { transform: translate(-1px, 1px) rotate(-0.05deg); }
        }

        @keyframes screen-flash {
          0%, 100% { 
            background: rgba(255, 0, 0, 0);
            filter: brightness(1);
          }
          50% { 
            background: rgba(255, 0, 0, 0.3);
            filter: brightness(1.5);
          }
        }

        @keyframes screen-flicker {
          0%, 100% { 
            opacity: 1;
            filter: brightness(1);
          }
          1% { 
            opacity: 0.8;
            filter: brightness(0.8);
          }
          2% { 
            opacity: 1;
            filter: brightness(1.2);
          }
          3% { 
            opacity: 0.9;
            filter: brightness(0.9);
          }
          4% { 
            opacity: 1;
            filter: brightness(1);
          }
        }

        .screen-shake {
          animation: screen-shake 0.5s ease-in-out;
        }

        .screen-flash {
          animation: screen-flash 0.3s ease-in-out;
        }

        .screen-flicker {
          animation: screen-flicker 0.1s ease-in-out infinite;
        }
      `}</style>
      
      {/* Wallet Modal */}
      <WalletModal 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />
    </div>
  );
};

export default HeroSection;
