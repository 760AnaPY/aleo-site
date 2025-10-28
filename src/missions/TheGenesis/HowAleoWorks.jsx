import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../locales/translations';
import * as THREE from 'three';

const HowAleoWorks = ({ onBack, onComplete }) => {
  const { language } = useLanguage();
  const t = translations[language];
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

    // Создаем интерактивную 3D модель Aleo сети
    const group = new THREE.Group();
    
    // Центральный узел (Aleo Network)
    const centerGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const centerMaterial = new THREE.MeshBasicMaterial({
      color: 0x00fff7,
      transparent: true,
      opacity: 0.8,
    });
    const centerNode = new THREE.Mesh(centerGeometry, centerMaterial);
    centerNode.position.set(0, 0, 0);
    group.add(centerNode);

    // Узлы сети
    const nodePositions = [
      { x: 2, y: 1, z: 0, type: 'prover' },
      { x: -2, y: 1, z: 0, type: 'validator' },
      { x: 0, y: 2, z: 0, type: 'client' },
      { x: 1, y: -1.5, z: 0, type: 'blockchain' },
      { x: -1, y: -1.5, z: 0, type: 'record' },
    ];

    const nodes = [];
    nodePositions.forEach((pos, index) => {
      const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
      const material = new THREE.MeshBasicMaterial({
        color: pos.type === 'prover' ? 0xc084fc : 
               pos.type === 'validator' ? 0xff79c6 :
               pos.type === 'client' ? 0x50fa7b :
               pos.type === 'blockchain' ? 0xf1fa8c : 0x8be9fd,
        transparent: true,
        opacity: 0.7,
      });
      const node = new THREE.Mesh(geometry, material);
      node.position.set(pos.x, pos.y, pos.z);
      group.add(node);
      nodes.push({ mesh: node, ...pos });
    });

    // Соединительные линии
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00fff7,
      transparent: true,
      opacity: 0.3,
    });

    nodes.forEach(node => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(node.x, node.y, node.z)
      ]);
      const line = new THREE.Line(geometry, lineMaterial);
      group.add(line);
    });

    scene.add(group);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Вращение всей группы
      group.rotation.y += 0.005;
      
      // Вращение центрального узла
      centerNode.rotation.x += 0.01;
      centerNode.rotation.y += 0.01;
      
      // Вращение узлов
      nodes.forEach((node, index) => {
        node.mesh.rotation.x += 0.005 * (index + 1);
        node.mesh.rotation.y += 0.005 * (index + 1);
      });
      
      // Движение камеры за мышью
      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.5;
      
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
      console.log('Mission complete! Calling onComplete...');
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden relative">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.15 }}
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
            {t.common.back}
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
              <span className="text-5xl font-bold text-[#00fff7]">04</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">{t.howAleoWorks.title}</h1>
                <p className="text-gray-400">{t.howAleoWorks.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-3 py-1 bg-[#00fff7]/10 border border-[#00fff7]/30 rounded text-[#00fff7] text-sm">
                {t.howAleoWorks.intermediate}
              </span>
              <span className="px-3 py-1 bg-[#c084fc]/10 border border-[#c084fc]/30 rounded text-[#c084fc] text-sm">
                {t.howAleoWorks.reward}
              </span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-8">
            {/* Step 1 - Архитектура Aleo */}
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
                  <h3 className="text-xl font-semibold">{t.howAleoWorks.step1.title}</h3>
                </div>
              </div>

              <div className="ml-11 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t.howAleoWorks.step1.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                    <div className="text-[#00fff7] mb-2 font-semibold flex items-center gap-2">
                      ⚙️ {t.howAleoWorks.step1.offchainTitle}
                    </div>
                    <p className="text-sm text-gray-400">
                      {t.howAleoWorks.step1.offchainText}
                    </p>
                  </div>
                  <div className="bg-[#0a0a0f]/80 border border-[#c084fc]/20 rounded p-4">
                    <div className="text-[#c084fc] mb-2 font-semibold flex items-center gap-2">
                      ⛓️ {t.howAleoWorks.step1.onchainTitle}
                    </div>
                    <p className="text-sm text-gray-400">
                      {t.howAleoWorks.step1.onchainText}
                    </p>
                  </div>
                </div>

                <div className="bg-black/60 border border-[#00fff7]/20 rounded p-4">
                  <div className="text-sm text-[#00fff7] mb-3 font-semibold">{t.howAleoWorks.step1.componentsTitle}</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-[#00fff7]">•</span>
                      <div>
                        <span className="text-white font-semibold">{t.howAleoWorks.step1.prover}</span>
                        <span className="text-gray-400"> - {t.howAleoWorks.step1.proverText}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#c084fc]">•</span>
                      <div>
                        <span className="text-white font-semibold">{t.howAleoWorks.step1.validator}</span>
                        <span className="text-gray-400"> - {t.howAleoWorks.step1.validatorText}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#50fa7b]">•</span>
                      <div>
                        <span className="text-white font-semibold">{t.howAleoWorks.step1.client}</span>
                        <span className="text-gray-400"> - {t.howAleoWorks.step1.clientText}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {missionProgress === 0 && (
                  <button
                    onClick={completeMissionStep}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                  >
                    {t.howAleoWorks.step1.button}
                  </button>
                )}
              </div>
            </div>

            {/* Step 2 - Консенсус */}
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
                  <h3 className="text-xl font-semibold">{t.howAleoWorks.step2.title}</h3>
                </div>
              </div>

              {missionProgress >= 1 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.howAleoWorks.step2.description}
                  </p>

                  <div className="space-y-4">
                    <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                      <div className="text-[#00fff7] mb-2 font-semibold flex items-center gap-2">
                        🏛️ {t.howAleoWorks.step2.posTitle}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.howAleoWorks.step2.posText}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#c084fc]/20 rounded p-4">
                      <div className="text-[#c084fc] mb-2 font-semibold flex items-center gap-2">
                        ⚡ {t.howAleoWorks.step2.powTitle}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.howAleoWorks.step2.powText}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#ff79c6]/20 rounded p-4">
                      <div className="text-[#ff79c6] mb-2 font-semibold flex items-center gap-2">
                        {t.howAleoWorks.step2.coinbaseTitle}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.howAleoWorks.step2.coinbaseText}
                      </p>
                    </div>
                  </div>

                  {missionProgress === 1 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.howAleoWorks.step2.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 3 - Транзакции */}
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
                  <h3 className="text-xl font-semibold">{t.howAleoWorks.step3.title}</h3>
                </div>
              </div>

              {missionProgress >= 2 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.howAleoWorks.step3.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-[#0a0a0f]/50 p-3 rounded border border-[#00fff7]/10">
                      <span className="text-[#00fff7]">📦</span>
                      <div>
                        <div className="font-semibold text-white">{t.howAleoWorks.step3.deployTitle}</div>
                        <div className="text-sm text-gray-400">{t.howAleoWorks.step3.deployText}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#0a0a0f]/50 p-3 rounded border border-[#c084fc]/10">
                      <span className="text-[#c084fc]">⚡</span>
                      <div>
                        <div className="font-semibold text-white">{t.howAleoWorks.step3.executeTitle}</div>
                        <div className="text-sm text-gray-400">{t.howAleoWorks.step3.executeText}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#0a0a0f]/50 p-3 rounded border border-[#ff79c6]/10">
                      <span className="text-[#ff79c6]">💰</span>
                      <div>
                        <div className="font-semibold text-white">{t.howAleoWorks.step3.feeTitle}</div>
                        <div className="text-sm text-gray-400">{t.howAleoWorks.step3.feeText}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-[#00fff7]/20 rounded p-4">
                    <div className="text-[#00fff7] mb-2 font-semibold">{t.howAleoWorks.step3.recordTitle}</div>
                    <p className="text-sm text-gray-400">
                      {t.howAleoWorks.step3.recordText}
                    </p>
                  </div>

                  {missionProgress === 2 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.howAleoWorks.step3.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 4 - Процесс выполнения */}
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
                  <h3 className="text-xl font-semibold">{t.howAleoWorks.step4.title}</h3>
                </div>
              </div>

              {missionProgress >= 3 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.howAleoWorks.step4.description}
                  </p>

                  <div className="space-y-4">
                    <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                      <div className="text-[#00fff7] mb-2 font-semibold">{t.howAleoWorks.step4.step1Title}</div>
                      <p className="text-sm text-gray-400">
                        {t.howAleoWorks.step4.step1Text}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#c084fc]/20 rounded p-4">
                      <div className="text-[#c084fc] mb-2 font-semibold">{t.howAleoWorks.step4.step2Title}</div>
                      <p className="text-sm text-gray-400">
                        {t.howAleoWorks.step4.step2Text}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#ff79c6]/20 rounded p-4">
                      <div className="text-[#ff79c6] mb-2 font-semibold">{t.howAleoWorks.step4.step3Title}</div>
                      <p className="text-sm text-gray-400">
                        {t.howAleoWorks.step4.step3Text}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#50fa7b]/20 rounded p-4">
                      <div className="text-[#50fa7b] mb-2 font-semibold">{t.howAleoWorks.step4.step4Title}</div>
                      <p className="text-sm text-gray-400">
                        {t.howAleoWorks.step4.step4Text}
                      </p>
                    </div>
                  </div>

                  {missionProgress === 3 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.howAleoWorks.step4.button}
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
                  <h3 className="text-xl font-semibold">{t.howAleoWorks.step5.title}</h3>
                </div>
              </div>

              {missionProgress >= 4 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.howAleoWorks.step5.description}
                  </p>

                  {/* Interactive Network Visualization */}
                  <div className="bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] border border-[#00fff7]/30 rounded-xl p-6 relative overflow-hidden">
                    {/* Animated background */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 20% 50%, #00fff7 0%, transparent 50%), radial-gradient(circle at 80% 80%, #c084fc 0%, transparent 50%)',
                        animation: 'pulse-glow 3s ease-in-out infinite'
                      }} />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-bold text-[#00fff7]">🌐 Interactive Network Visualization</h4>
                        <div className="text-xs text-gray-500">Real-time simulation</div>
                      </div>

                      {/* Network Nodes Visualization */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Prover Node */}
                        <div className="group bg-black/40 border border-[#c084fc]/30 rounded-lg p-4 hover:border-[#c084fc] transition-all hover:scale-105 cursor-pointer relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#c084fc]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c084fc] to-[#ff79c6] flex items-center justify-center animate-pulse-slow">
                                <span className="text-2xl">⚙️</span>
                              </div>
                              <div>
                                <div className="font-bold text-[#c084fc]">PROVER</div>
                                <div className="text-xs text-gray-500">Computation Layer</div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-400 space-y-1">
                              <div>• Executes programs off-chain</div>
                              <div>• Generates ZK-proofs</div>
                              <div>• Proves correctness</div>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                              <span className="text-xs text-green-400">Active</span>
                            </div>
                          </div>
                        </div>

                        {/* Validator Node */}
                        <div className="group bg-black/40 border border-[#00fff7]/30 rounded-lg p-4 hover:border-[#00fff7] transition-all hover:scale-105 cursor-pointer relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#00fff7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00fff7] to-[#8be9fd] flex items-center justify-center animate-pulse-slow" style={{animationDelay: '0.5s'}}>
                                <span className="text-2xl">🛡️</span>
                              </div>
                              <div>
                                <div className="font-bold text-[#00fff7]">VALIDATOR</div>
                                <div className="text-xs text-gray-500">Consensus Layer</div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-400 space-y-1">
                              <div>• Verifies ZK-proofs</div>
                              <div>• Validates transactions</div>
                              <div>• Maintains consensus</div>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                              <span className="text-xs text-green-400">Synced</span>
                            </div>
                          </div>
                        </div>

                        {/* Client Node */}
                        <div className="group bg-black/40 border border-[#50fa7b]/30 rounded-lg p-4 hover:border-[#50fa7b] transition-all hover:scale-105 cursor-pointer relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#50fa7b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#50fa7b] to-[#8be9fd] flex items-center justify-center animate-pulse-slow" style={{animationDelay: '1s'}}>
                                <span className="text-2xl">👤</span>
                              </div>
                              <div>
                                <div className="font-bold text-[#50fa7b]">CLIENT</div>
                                <div className="text-xs text-gray-500">Application Layer</div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-400 space-y-1">
                              <div>• Initiates transactions</div>
                              <div>• Interacts with dApps</div>
                              <div>• Holds private keys</div>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                              <span className="text-xs text-green-400">Connected</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Transaction Flow Animation */}
                      <div className="bg-black/60 border border-[#00fff7]/20 rounded-lg p-4">
                        <div className="text-sm font-semibold text-[#00fff7] mb-4 flex items-center gap-2">
                          <span className="animate-pulse">⚡</span>
                          Transaction Flow in Real-time
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 animate-slide-in" style={{animationDelay: '0s'}}>
                            <div className="w-8 h-8 rounded-full bg-[#50fa7b]/20 border border-[#50fa7b] flex items-center justify-center text-xs font-bold">1</div>
                            <div className="flex-1 h-2 bg-gradient-to-r from-[#50fa7b] to-transparent rounded-full relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
                            </div>
                            <div className="text-xs text-gray-400 w-32">Client initiates</div>
                          </div>
                          <div className="flex items-center gap-3 animate-slide-in" style={{animationDelay: '0.3s'}}>
                            <div className="w-8 h-8 rounded-full bg-[#c084fc]/20 border border-[#c084fc] flex items-center justify-center text-xs font-bold">2</div>
                            <div className="flex-1 h-2 bg-gradient-to-r from-[#c084fc] to-transparent rounded-full relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" style={{animationDelay: '0.3s'}} />
                            </div>
                            <div className="text-xs text-gray-400 w-32">Prover generates</div>
                          </div>
                          <div className="flex items-center gap-3 animate-slide-in" style={{animationDelay: '0.6s'}}>
                            <div className="w-8 h-8 rounded-full bg-[#00fff7]/20 border border-[#00fff7] flex items-center justify-center text-xs font-bold">3</div>
                            <div className="flex-1 h-2 bg-gradient-to-r from-[#00fff7] to-transparent rounded-full relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" style={{animationDelay: '0.6s'}} />
                            </div>
                            <div className="text-xs text-gray-400 w-32">Validator confirms</div>
                          </div>
                          <div className="flex items-center gap-3 animate-slide-in" style={{animationDelay: '0.9s'}}>
                            <div className="w-8 h-8 rounded-full bg-green-400/20 border border-green-400 flex items-center justify-center text-xs font-bold">✓</div>
                            <div className="flex-1 h-2 bg-gradient-to-r from-green-400 to-transparent rounded-full" />
                            <div className="text-xs text-green-400 w-32">Transaction final</div>
                          </div>
                        </div>
                      </div>

                      {/* Network Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                        <div className="bg-black/40 border border-[#00fff7]/20 rounded p-3 text-center">
                          <div className="text-2xl font-bold text-[#00fff7]">~100ms</div>
                          <div className="text-xs text-gray-500">Avg. Proof Time</div>
                        </div>
                        <div className="bg-black/40 border border-[#c084fc]/20 rounded p-3 text-center">
                          <div className="text-2xl font-bold text-[#c084fc]">100%</div>
                          <div className="text-xs text-gray-500">Privacy Level</div>
                        </div>
                        <div className="bg-black/40 border border-[#50fa7b]/20 rounded p-3 text-center">
                          <div className="text-2xl font-bold text-[#50fa7b]">$0.001</div>
                          <div className="text-xs text-gray-500">Avg. Fee</div>
                        </div>
                        <div className="bg-black/40 border border-[#ff79c6]/20 rounded p-3 text-center">
                          <div className="text-2xl font-bold text-[#ff79c6]">∞</div>
                          <div className="text-xs text-gray-500">Scalability</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {missionProgress === 4 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.howAleoWorks.step5.button}
                    </button>
                  )}

                  {missionProgress === 5 && (
                    <div className="mt-6 bg-gradient-to-r from-[#00fff7]/20 to-[#c084fc]/20 border-2 border-[#00fff7] rounded-lg p-6 animate-fade-in">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🎉</div>
                        <div className="text-2xl font-bold text-[#00fff7] mb-2">Mission Complete!</div>
                        <div className="text-gray-300 mb-4">You received: Proof of Understanding #4</div>
                        <div className="text-sm text-gray-400">Returning to missions...</div>
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
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes slide-in {
          from { 
            opacity: 0; 
            transform: translateX(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HowAleoWorks;
