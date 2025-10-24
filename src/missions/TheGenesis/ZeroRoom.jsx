import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslations } from '../../locales/translations';
import * as THREE from 'three';

const ZeroRoom = ({ onBack, completedMissions, skipAnimation = false }) => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [stage, setStage] = useState(skipAnimation ? 2 : 0); // Если skipAnimation - сразу финальная стадия
  const [badgeGenerated, setBadgeGenerated] = useState(skipAnimation); // Если skipAnimation - бейдж уже сгенерирован
  const [glitchActive, setGlitchActive] = useState(false);
  const canvasRef = useRef(null);

  // Three.js - эпичная 3D анимация
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 15;

    // Создаем вращающийся додекаэдр (символ ZK)
    const geometry = new THREE.DodecahedronGeometry(3, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0x00fff7,
      transparent: true,
      opacity: 0.8
    });
    const dodecahedron = new THREE.LineSegments(edges, material);
    scene.add(dodecahedron);

    // Частицы
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xc084fc,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Вращение додекаэдра
      dodecahedron.rotation.x += 0.005;
      dodecahedron.rotation.y += 0.008;
      dodecahedron.rotation.z += 0.003;

      // Пульсация
      const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
      dodecahedron.scale.set(scale, scale, scale);

      // Вращение частиц
      particlesMesh.rotation.y += 0.0005;

      // Следование за мышью
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Автоматическая последовательность (только если не skipAnimation)
  useEffect(() => {
    if (skipAnimation) return; // Пропускаем анимацию

    const timer1 = setTimeout(() => {
      setGlitchActive(true);
      setStage(1);
    }, 2000);

    const timer2 = setTimeout(() => {
      setGlitchActive(false);
    }, 4000);

    const timer3 = setTimeout(() => {
      setBadgeGenerated(true);
      setStage(2);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [skipAnimation]);

  return (
    <div className={`min-h-screen bg-[#0a0a0f] text-white font-mono relative overflow-hidden ${glitchActive ? 'glitch-screen' : ''}`}>
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Glitch Overlay */}
      {glitchActive && (
        <div className="absolute inset-0 pointer-events-none z-40">
          <div className="glitch-overlay-badge"></div>
          <div className="scan-line-badge"></div>
        </div>
      )}

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#00fff7 1px, transparent 1px), linear-gradient(90deg, #00fff7 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Stage 0: Вход в ZeroRoom */}
          {stage === 0 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-[#00fff7] via-[#c084fc] to-[#00ff88] bg-clip-text text-transparent animate-pulse">
                  {t.zeroRoom.entering}
                </h1>
                <div className="text-xl text-[#00fff7]/80 mb-4">
                  {t.zeroRoom.initializing}
                </div>
                <div className="text-gray-500 text-sm">
                  {t.zeroRoom.initializing}
                </div>
              </div>

              <div className="flex justify-center gap-2 mb-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-[#00fff7]"
                    style={{
                      animation: `pulse-wave 1.5s ease-in-out ${i * 0.2}s infinite`
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Stage 1: Генерация бейджа */}
          {stage === 1 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <div className="text-3xl font-bold mb-6 text-[#00fff7] glitch-text">
                  {t.zeroRoom.generating}
                </div>
                <div className="space-y-3 text-left max-w-2xl mx-auto">
                  <div className="text-green-400 animate-fade-in">
                    ▸ {t.zeroRoom.scanning}... ✓
                  </div>
                  <div className="text-green-400 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    ▸ {t.zeroRoom.verifying}... ✓
                  </div>
                  <div className="text-green-400 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    ▸ {t.zeroRoom.building}... ✓
                  </div>
                  <div className="text-green-400 animate-fade-in" style={{ animationDelay: '0.9s' }}>
                    ▸ {t.zeroRoom.signature}... ✓
                  </div>
                  <div className="text-yellow-400 animate-fade-in font-bold" style={{ animationDelay: '1.2s' }}>
                    ▸ {t.zeroRoom.compiling}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stage 2: Финальный бейдж */}
          {stage === 2 && badgeGenerated && (
            <div className="text-center animate-scale-in">
              {/* Бейдж */}
              <div className="relative mb-8 mx-auto" style={{ width: '300px', height: '400px' }}>
                {/* Свечение вокруг бейджа */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00fff7] via-[#c084fc] to-[#00ff88] rounded-lg blur-3xl opacity-30 animate-pulse"></div>
                
                {/* Сам бейдж */}
                <div className="relative bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] border-4 border-transparent rounded-lg p-8 h-full flex flex-col justify-between badge-glow">
                  {/* Голографический эффект */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="holographic-effect"></div>
                  </div>

                  <div className="relative z-10">
                    {/* Иконка */}
                    <div className="mb-6">
                      <div className="text-6xl mb-2 animate-float">🏆</div>
                      <div className="text-xs text-[#00fff7]/60 font-mono">{t.zeroRoom.badge}</div>
                    </div>

                    {/* Заголовок */}
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#00fff7] to-[#c084fc] bg-clip-text text-transparent mb-2">
                        {t.zeroRoom.validator}
                      </h2>
                      <div className="text-xs text-gray-500">{t.zeroRoom.zkMaster}</div>
                    </div>

                    {/* Статистика */}
                    <div className="space-y-2 text-left mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">{t.zeroRoom.missions}:</span>
                        <span className="text-[#00ff88] font-bold">{completedMissions?.length || 5}/5</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">{t.zeroRoom.level}:</span>
                        <span className="text-[#c084fc] font-bold">{t.zeroRoom.expert}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">{t.zeroRoom.zkScore}:</span>
                        <span className="text-[#00fff7] font-bold">100%</span>
                      </div>
                    </div>

                    {/* Прогресс бар */}
                    <div className="mb-4">
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00fff7] via-[#c084fc] to-[#00ff88] animate-progress"></div>
                      </div>
                    </div>

                    {/* ID */}
                    <div className="text-xs text-gray-600 font-mono border-t border-gray-800 pt-3">
                      ID: 0x{Math.random().toString(16).substr(2, 8).toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Поздравление */}
              <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00fff7] via-[#c084fc] to-[#00ff88] bg-clip-text text-transparent">
                  {t.zeroRoom.congratulations}
                </h3>
                <p className="text-xl text-gray-300 mb-2">
                  {t.zeroRoom.successMessage}
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {t.zeroRoom.expertMessage}
                </p>

                {/* Достижения */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
                  <div className="bg-black/40 border border-[#00fff7]/30 rounded-lg p-4">
                    <div className="text-2xl mb-2">🎓</div>
                    <div className="text-sm text-[#00fff7]">{t.zeroRoom.zkKnowledge}</div>
                    <div className="text-xs text-gray-500">{language === 'ru' ? 'Освоен' : 'Mastered'}</div>
                  </div>
                  <div className="bg-black/40 border border-[#c084fc]/30 rounded-lg p-4">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-sm text-[#c084fc]">{t.zeroRoom.leoMaster}</div>
                    <div className="text-xs text-gray-500">{language === 'ru' ? 'Освоен' : 'Mastered'}</div>
                  </div>
                  <div className="bg-black/40 border border-[#00ff88]/30 rounded-lg p-4">
                    <div className="text-2xl mb-2">🚀</div>
                    <div className="text-sm text-[#00ff88]">{t.zeroRoom.networkPro}</div>
                    <div className="text-xs text-gray-500">{language === 'ru' ? 'Освоен' : 'Mastered'}</div>
                  </div>
                </div>
              </div>

              {/* Кнопки */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={onBack}
                  className="px-8 py-3 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-all transform hover:scale-105"
                >
                  {t.zeroRoom.backToMissions}
                </button>
                <button
                  onClick={() => {
                    const badgeText = language === 'ru'
                      ? `🏆 Я прошел Aleo Odyssey и получил ZK-BADGE: VALIDATOR! ID: 0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`
                      : `🏆 I completed Aleo Odyssey and earned ZK-BADGE: VALIDATOR! ID: 0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`;
                    navigator.clipboard.writeText(badgeText);
                    alert(t.zeroRoom.badgeCopied);
                  }}
                  className="px-8 py-3 bg-black/60 border border-[#00fff7]/30 text-[#00fff7] font-bold rounded hover:bg-[#00fff7]/10 transition-all transform hover:scale-105"
                >
                  {t.zeroRoom.shareBadge} 📋
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes pulse-wave {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 1s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-progress {
          animation: progress 2s ease-out forwards;
        }

        .glitch-screen {
          animation: screen-shake 0.3s infinite;
        }

        @keyframes screen-shake {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, 2px); }
          20% { transform: translate(2px, -2px); }
          30% { transform: translate(-2px, -2px); }
          40% { transform: translate(2px, 2px); }
          50% { transform: translate(-1px, 1px); }
          60% { transform: translate(1px, -1px); }
          70% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); }
        }

        .glitch-text {
          animation: glitch-anim 0.3s infinite;
        }

        @keyframes glitch-anim {
          0% { text-shadow: 0 0 0 transparent; }
          25% { text-shadow: -2px 0 0 #00fff7, 2px 0 0 #c084fc; }
          50% { text-shadow: 2px 0 0 #00fff7, -2px 0 0 #c084fc; }
          75% { text-shadow: -2px 0 0 #c084fc, 2px 0 0 #00fff7; }
          100% { text-shadow: 0 0 0 transparent; }
        }

        .glitch-overlay-badge {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 255, 247, 0.2) 0%,
            transparent 50%,
            rgba(192, 132, 252, 0.2) 100%
          );
          animation: glitch-overlay-anim 0.4s infinite;
          mix-blend-mode: overlay;
        }

        @keyframes glitch-overlay-anim {
          0% { clip-path: polygon(0 0%, 100% 0%, 100% 5%, 0 5%); }
          20% { clip-path: polygon(0 20%, 100% 20%, 100% 25%, 0 25%); }
          40% { clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%); }
          60% { clip-path: polygon(0 75%, 100% 75%, 100% 80%, 0 80%); }
          80% { clip-path: polygon(0 90%, 100% 90%, 100% 95%, 0 95%); }
          100% { clip-path: polygon(0 0%, 100% 0%, 100% 5%, 0 5%); }
        }

        .scan-line-badge {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(0, 255, 247, 0.8),
            transparent
          );
          box-shadow: 0 0 15px rgba(0, 255, 247, 0.7);
          animation: scan-line-move 1.5s linear infinite;
        }

        @keyframes scan-line-move {
          0% { top: 0%; }
          100% { top: 100%; }
        }

        .badge-glow {
          box-shadow: 
            0 0 20px rgba(0, 255, 247, 0.3),
            0 0 40px rgba(192, 132, 252, 0.2),
            0 0 60px rgba(0, 255, 136, 0.1),
            inset 0 0 20px rgba(0, 255, 247, 0.1);
          border: 4px solid transparent;
          background: linear-gradient(#0a0a0f, #0a0a0f) padding-box,
                      linear-gradient(135deg, #00fff7, #c084fc, #00ff88, #00fff7) border-box;
          animation: border-glow 3s ease-in-out infinite;
        }

        @keyframes border-glow {
          0%, 100% { 
            filter: brightness(1);
            box-shadow: 
              0 0 20px rgba(0, 255, 247, 0.3),
              0 0 40px rgba(192, 132, 252, 0.2),
              0 0 60px rgba(0, 255, 136, 0.1);
          }
          50% { 
            filter: brightness(1.2);
            box-shadow: 
              0 0 30px rgba(0, 255, 247, 0.5),
              0 0 60px rgba(192, 132, 252, 0.4),
              0 0 90px rgba(0, 255, 136, 0.3);
          }
        }

        .holographic-effect {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(0, 255, 247, 0.1) 50%,
            transparent 70%
          );
          animation: holographic-sweep 4s linear infinite;
        }

        @keyframes holographic-sweep {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
      `}</style>
    </div>
  );
};

export default ZeroRoom;

