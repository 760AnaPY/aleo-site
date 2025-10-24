import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslations } from '../../locales/translations';
import * as THREE from 'three';

const TheGenesis = ({ onBack, onComplete }) => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [missionProgress, setMissionProgress] = useState(0);
  const canvasRef = useRef(null);

  // Инициализация three.js сцены
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0x00fff7,
      transparent: true,
      opacity: 0.3,
    });
    const cube = new THREE.LineSegments(edges, material);
    scene.add(cube);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      cube.position.x = mouseX * 0.5;
      cube.position.y = mouseY * 0.5;
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

  // Прогресс миссии
  const completeMissionStep = () => {
    const newProgress = missionProgress + 1;
    setMissionProgress(newProgress);

    if (newProgress >= 5) {
      console.log('Mission complete! Calling onComplete...'); // Для отладки
      setTimeout(() => {
        onComplete(); // ← Вызываем callback
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden relative">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.2 }}
      />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#00fff7 1px, transparent 1px), linear-gradient(90deg, #00fff7 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-[#00fff7]/20 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#00fff7] hover:text-white transition-colors"
          >
            {t.theGenesis.back}
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-400">{t.theGenesis.progress}</div>
            <div className="text-[#00fff7] font-bold">{missionProgress}/5 {t.theGenesis.steps}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Mission Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl font-bold text-[#00fff7]">01</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">{t.theGenesis.title}</h1>
                <p className="text-gray-400">{t.theGenesis.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-3 py-1 bg-[#00fff7]/10 border border-[#00fff7]/30 rounded text-[#00fff7] text-sm">
                {t.theGenesis.beginner}
              </span>
              <span className="px-3 py-1 bg-[#c084fc]/10 border border-[#c084fc]/30 rounded text-[#c084fc] text-sm">
                {t.theGenesis.reward}
              </span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 0 ? 'border-[#00fff7]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 1 ? 'bg-[#00fff7] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 1 ? '✓' : '1'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theGenesis.step1.title}</h3>
                </div>
              </div>

              <div className="ml-11 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t.theGenesis.step1.description}
                </p>

                <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                  <div className="text-sm text-[#00fff7] mb-2">{t.theGenesis.step1.example}</div>
                  <p className="text-sm text-gray-400">
                    {t.theGenesis.step1.exampleText}
                  </p>
                </div>

                {missionProgress === 0 && (
                  <button
                    onClick={completeMissionStep}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                  >
                    {t.theGenesis.step1.button}
                  </button>
                )}
              </div>
            </div>

            {/* Step 2 - ZK в реальной жизни */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 1 ? 'border-[#00fff7]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 2 ? 'bg-[#00fff7] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 2 ? '✓' : '2'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theGenesis.step2new.title}</h3>
                </div>
              </div>

              {missionProgress >= 1 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theGenesis.step2new.description}
                  </p>

                  <div className="space-y-3">
                    <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                      <div className="text-[#00fff7] mb-2 font-semibold flex items-center gap-2">
                        🏦 {t.theGenesis.step2new.useCase1Title}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.theGenesis.step2new.useCase1Text}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#c084fc]/20 rounded p-4">
                      <div className="text-[#c084fc] mb-2 font-semibold flex items-center gap-2">
                        🗳️ {t.theGenesis.step2new.useCase2Title}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.theGenesis.step2new.useCase2Text}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#ff79c6]/20 rounded p-4">
                      <div className="text-[#ff79c6] mb-2 font-semibold flex items-center gap-2">
                        🎮 {t.theGenesis.step2new.useCase3Title}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.theGenesis.step2new.useCase3Text}
                      </p>
                    </div>
                  </div>

                  {missionProgress === 1 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theGenesis.step2new.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 3 - Математика ZK */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 2 ? 'border-[#00fff7]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 3 ? 'bg-[#00fff7] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 3 ? '✓' : '3'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theGenesis.step3new.title}</h3>
                </div>
              </div>

              {missionProgress >= 2 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theGenesis.step3new.description}
                  </p>

                  <div className="bg-black/60 border border-[#00fff7]/20 rounded p-4">
                    <div className="text-sm text-[#00fff7] mb-3 font-semibold">{t.theGenesis.step3new.componentsTitle}</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-3">
                        <span className="text-[#00fff7]">1.</span>
                        <div>
                          <span className="text-white font-semibold">{t.theGenesis.step3new.component1}</span>
                          <span className="text-gray-400"> - {t.theGenesis.step3new.component1Text}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[#c084fc]">2.</span>
                        <div>
                          <span className="text-white font-semibold">{t.theGenesis.step3new.component2}</span>
                          <span className="text-gray-400"> - {t.theGenesis.step3new.component2Text}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[#ff79c6]">3.</span>
                        <div>
                          <span className="text-white font-semibold">{t.theGenesis.step3new.component3}</span>
                          <span className="text-gray-400"> - {t.theGenesis.step3new.component3Text}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0f]/80 border border-[#c084fc]/20 rounded p-4">
                    <div className="text-[#c084fc] mb-2 font-semibold">{t.theGenesis.step3new.protocolTitle}</div>
                    <p className="text-sm text-gray-400">
                      {t.theGenesis.step3new.protocolText}
                    </p>
                  </div>

                  {missionProgress === 2 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theGenesis.step3new.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 4 - Применение в Aleo */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 3 ? 'border-[#00fff7]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 4 ? 'bg-[#00fff7] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 4 ? '✓' : '4'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theGenesis.step2.title}</h3>
                </div>
              </div>

              {missionProgress >= 3 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theGenesis.step2.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                      <div className="text-[#00fff7] mb-2">{t.theGenesis.step2.privacy}</div>
                      <p className="text-sm text-gray-400">
                        {t.theGenesis.step2.privacyText}
                      </p>
                    </div>
                    <div className="bg-[#0a0a0f]/80 border border-[#c084fc]/20 rounded p-4">
                      <div className="text-[#c084fc] mb-2">{t.theGenesis.step2.speed}</div>
                      <p className="text-sm text-gray-400">
                        {t.theGenesis.step2.speedText}
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-[#00fff7]/20 rounded p-4">
                    <div className="text-xs text-[#00fff7] mb-3 flex items-center justify-between">
                      <span>📝 БАЗОВЫЙ ПРИМЕР</span>
                      <span className="text-gray-500">hello.aleo</span>
                    </div>
                    
                    <div className="bg-[#0a0a0f] border border-[#00fff7]/20 rounded-lg overflow-hidden">
                      <div className="bg-[#1a1a1a] px-4 py-2 border-b border-[#00fff7]/20 flex items-center gap-2">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-gray-400 text-sm">hello.aleo</span>
                      </div>
                      
                      <div className="p-4 overflow-x-auto">
                        <pre className="text-sm leading-relaxed">
                          <div className="flex">
                            <div className="text-gray-500 pr-4 select-none">
                              <div>1</div>
                              <div>2</div>
                              <div>3</div>
                              <div>4</div>
                              <div>5</div>
                            </div>
                            <div className="flex-1">
                              <div><span className="text-[#ff79c6]">program</span> <span className="text-[#8be9fd]">hello.aleo</span> <span className="text-gray-400">{`{`}</span></div>
                              <div>    <span className="text-[#ff79c6]">transition</span> <span className="text-[#8be9fd]">main</span><span className="text-gray-400">(</span><span className="text-[#ff79c6]">public</span> <span className="text-[#8be9fd]">a</span>: <span className="text-[#50fa7b]">u32</span><span className="text-gray-400">) -&gt;</span> <span className="text-[#50fa7b]">u32</span> <span className="text-gray-400">{`{`}</span></div>
                              <div>        <span className="text-[#ff79c6]">return</span> <span className="text-[#8be9fd]">a</span> + <span className="text-[#f1fa8c]">1u32</span>;</div>
                              <div>    <span className="text-gray-400">{`}`}</span></div>
                              <div><span className="text-gray-400">{`}`}</span></div>
                            </div>
                          </div>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {missionProgress === 3 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theGenesis.step2.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 5 - Практика */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 4 ? 'border-[#00fff7]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 5 ? 'bg-[#00fff7] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 5 ? '✓' : '5'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theGenesis.step3.title}</h3>
                </div>
              </div>

              {missionProgress >= 4 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theGenesis.step3.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-[#0a0a0f]/50 p-3 rounded border border-[#00fff7]/10">
                      <span className="text-[#00fff7]">💰</span>
                      <div>
                        <div className="font-semibold text-white">{t.theGenesis.step3.defi}</div>
                        <div className="text-sm text-gray-400">{t.theGenesis.step3.defiText}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#0a0a0f]/50 p-3 rounded border border-[#00fff7]/10">
                      <span className="text-[#c084fc]">🎮</span>
                      <div>
                        <div className="font-semibold text-white">{t.theGenesis.step3.games}</div>
                        <div className="text-sm text-gray-400">{t.theGenesis.step3.gamesText}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#0a0a0f]/50 p-3 rounded border border-[#00fff7]/10">
                      <span className="text-[#00fff7]">🏥</span>
                      <div>
                        <div className="font-semibold text-white">{t.theGenesis.step3.medicine}</div>
                        <div className="text-sm text-gray-400">{t.theGenesis.step3.medicineText}</div>
                      </div>
                    </div>
                  </div>

                  {missionProgress === 4 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theGenesis.step3.button}
                    </button>
                  )}

                  {missionProgress === 5 && (
                    <div className="mt-6 bg-gradient-to-r from-[#00fff7]/20 to-[#c084fc]/20 border-2 border-[#00fff7] rounded-lg p-6 animate-fade-in">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🎉</div>
                        <div className="text-2xl font-bold text-[#00fff7] mb-2">Миссия завершена!</div>
                        <div className="text-gray-300 mb-4">Вы получили: Proof of Knowledge #1</div>
                        <div className="text-sm text-gray-400">Возвращение к списку миссий...</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TheGenesis;