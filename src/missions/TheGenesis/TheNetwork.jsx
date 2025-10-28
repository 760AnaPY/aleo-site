import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../locales/translations';
import * as THREE from 'three';

const TheNetwork = ({ onBack, onComplete }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [missionProgress, setMissionProgress] = useState(0);
  const [deployCommand, setDeployCommand] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [proofInput, setProofInput] = useState('');
  const [proofFlow, setProofFlow] = useState('idle'); // idle, generating, verifying, onchain
  const [recordsVisible, setRecordsVisible] = useState(false);
  const canvasRef = useRef(null);

  // Three.js setup - сеть из связанных узлов
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
    camera.position.z = 10;

    // Создаем сеть узлов
    const nodes = [];
    const lines = [];
    const nodePositions = [
      { x: 0, y: 0, z: 0 },
      { x: -3, y: 2, z: -2 },
      { x: 3, y: 2, z: -2 },
      { x: -3, y: -2, z: 2 },
      { x: 3, y: -2, z: 2 },
    ];

    // Создаем узлы
    nodePositions.forEach((pos, idx) => {
      const geometry = new THREE.SphereGeometry(0.3, 16, 16);
      const edges = new THREE.EdgesGeometry(geometry);
      const material = new THREE.LineBasicMaterial({
        color: idx === 0 ? 0x00ff88 : 0x00fff7,
        transparent: true,
        opacity: 0.6
      });
      const node = new THREE.LineSegments(edges, material);
      node.position.set(pos.x, pos.y, pos.z);
      scene.add(node);
      nodes.push(node);
    });

    // Создаем связи между узлами
    for (let i = 1; i < nodePositions.length; i++) {
      const points = [
        new THREE.Vector3(nodePositions[0].x, nodePositions[0].y, nodePositions[0].z),
        new THREE.Vector3(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.2
      });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      lines.push(line);
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      
      nodes.forEach((node, idx) => {
        node.rotation.x += 0.01;
        node.rotation.y += 0.01;
        if (idx > 0) {
          node.position.y += Math.sin(Date.now() * 0.001 + idx) * 0.002;
        }
      });

      scene.rotation.y += 0.002;
      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.5;
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

  const completeMissionStep = () => {
    const newProgress = missionProgress + 1;
    setMissionProgress(newProgress);
    
    if (newProgress >= 7) {
      console.log('Mission 4 complete! Calling onComplete...');
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const simulateDeployment = async () => {
    if (deployCommand.toLowerCase().includes('leo deploy') && selectedNetwork === 'testnet') {
      setIsDeploying(true);
      setDeploymentStatus(t.theNetwork.step4.building);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDeploymentStatus(t.theNetwork.step4.generating);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDeploymentStatus(t.theNetwork.step4.connecting);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDeploymentStatus(t.theNetwork.step4.success);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsDeploying(false);
      completeMissionStep();
    } else {
      setDeploymentStatus(t.theNetwork.step4.error);
    }
  };

  const simulateProofFlow = async () => {
    if (!proofInput.trim()) return;
    
    setProofFlow('generating');
    setActiveNode('prover');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProofFlow('verifying');
    setActiveNode('validator');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProofFlow('onchain');
    setActiveNode('blockchain');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProofFlow('complete');
    setActiveNode(null);
    setTimeout(() => {
      setProofFlow('idle');
      completeMissionStep();
    }, 1500);
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
          backgroundImage: 'linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-[#00ff88]/20 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#00ff88] hover:text-white transition-colors"
          >
            <span>←</span> {t.theNetwork.back}
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-400">{t.theNetwork.progress}</div>
            <div className="text-[#00ff88] font-bold">{missionProgress}/7 {t.theNetwork.steps}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Mission Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl font-bold text-[#00ff88]">04</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">{t.theNetwork.title}</h1>
                <p className="text-gray-400">{t.theNetwork.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded text-[#00ff88] text-sm">
                {t.theNetwork.advanced}
              </span>
              <span className="px-3 py-1 bg-[#00fff7]/10 border border-[#00fff7]/30 rounded text-[#00fff7] text-sm">
                {t.theNetwork.reward}
              </span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-8">
            {/* Step 1 - Архитектура Aleo */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 0 ? 'border-[#00ff88]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 1 ? 'bg-[#00ff88] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 1 ? '✓' : '1'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theNetwork.step1.title}</h3>
                </div>
              </div>
              
              <div className="ml-11 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t.theNetwork.step1.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#0a0a0f]/80 border border-[#00ff88]/20 rounded p-4">
                    <div className="text-[#00ff88] mb-2 flex items-center gap-2 font-semibold">
                      {t.theNetwork.step1.offchainTitle}
                    </div>
                    <p className="text-sm text-gray-400">
                      {t.theNetwork.step1.offchainText}
                    </p>
                  </div>
                  
                  <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                    <div className="text-[#00fff7] mb-2 flex items-center gap-2 font-semibold">
                      {t.theNetwork.step1.onchainTitle}
                    </div>
                    <p className="text-sm text-gray-400">
                      {t.theNetwork.step1.onchainText}
                    </p>
                  </div>
                  
                  <div className="bg-[#0a0a0f]/80 border border-[#c084fc]/20 rounded p-4">
                    <div className="text-[#c084fc] mb-2 flex items-center gap-2 font-semibold">
                      {t.theNetwork.step1.privacyTitle}
                    </div>
                    <p className="text-sm text-gray-400">
                      {t.theNetwork.step1.privacyText}
                    </p>
                  </div>
                </div>

                <div className="bg-[#0a0a0f]/80 border border-[#00ff88]/20 rounded p-4">
                  <div className="text-sm text-[#00ff88] mb-3">{t.theNetwork.step1.networkComponents}</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-[#00ff88]">•</span>
                      <div>
                        <span className="text-white font-semibold">{t.theNetwork.step1.validators}</span>
                        <span className="text-gray-400"> {t.theNetwork.step1.validatorsText}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#00fff7]">•</span>
                      <div>
                        <span className="text-white font-semibold">{t.theNetwork.step1.provers}</span>
                        <span className="text-gray-400"> {t.theNetwork.step1.proversText}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#c084fc]">•</span>
                      <div>
                        <span className="text-white font-semibold">{t.theNetwork.step1.clients}</span>
                        <span className="text-gray-400"> {t.theNetwork.step1.clientsText}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {missionProgress === 0 && (
                  <button
                    onClick={completeMissionStep}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00ff88] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity"
                  >
                    {t.theNetwork.step1.button}
                  </button>
                )}
              </div>
            </div>

            {/* Step 2 - Консенсус Aleo */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 1 ? 'border-[#00ff88]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 2 ? 'bg-[#00ff88] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 2 ? '✓' : '2'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theNetwork.step2new.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 1 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theNetwork.step2new.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0a0a0f]/80 border border-[#00ff88]/20 rounded p-4">
                      <div className="text-[#00ff88] mb-2 font-semibold flex items-center gap-2">
                        🏗️ {t.theNetwork.step2new.posTitle}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.theNetwork.step2new.posText}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                      <div className="text-[#00fff7] mb-2 font-semibold flex items-center gap-2">
                        ⚡ {t.theNetwork.step2new.powTitle}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.theNetwork.step2new.powText}
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-[#00ff88]/20 rounded p-4">
                    <div className="text-sm text-[#00ff88] mb-3">{t.theNetwork.step2new.coinbaseTitle}</div>
                    <div className="text-sm text-gray-400 leading-relaxed">
                      {t.theNetwork.step2new.coinbaseText}
                    </div>
                  </div>

                  {missionProgress === 1 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00ff88] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theNetwork.step2new.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 3 - Транзакции и Records */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 2 ? 'border-[#00ff88]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 3 ? 'bg-[#00ff88] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 3 ? '✓' : '3'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theNetwork.step3new.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 2 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theNetwork.step3new.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-[#0a0a0f]/80 border border-[#00ff88]/20 rounded p-4">
                      <div className="text-[#00ff88] mb-2 font-semibold">1. {t.theNetwork.step3new.deployTitle}</div>
                      <p className="text-sm text-gray-400">
                        {t.theNetwork.step3new.deployText}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                      <div className="text-[#00fff7] mb-2 font-semibold">2. {t.theNetwork.step3new.executeTitle}</div>
                      <p className="text-sm text-gray-400">
                        {t.theNetwork.step3new.executeText}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#c084fc]/20 rounded p-4">
                      <div className="text-[#c084fc] mb-2 font-semibold">3. {t.theNetwork.step3new.feeTitle}</div>
                      <p className="text-sm text-gray-400">
                        {t.theNetwork.step3new.feeText}
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-[#00ff88]/20 rounded p-4">
                    <div className="text-sm text-[#00ff88] mb-2 font-semibold">{t.theNetwork.step3new.recordTitle}</div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {t.theNetwork.step3new.recordText}
                    </p>
                  </div>

                  {missionProgress === 2 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00ff88] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theNetwork.step3new.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 4 - Процесс деплоя */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 3 ? 'border-[#00ff88]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 4 ? 'bg-[#00ff88] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 4 ? '✓' : '4'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theNetwork.step2.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 3 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theNetwork.step2.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-[#0a0a0f]/80 border border-[#00ff88]/20 rounded p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl text-[#00ff88]">1</span>
                        <span className="text-white font-semibold">{t.theNetwork.step2.step1Title}</span>
                      </div>
                      <pre className="text-sm text-[#00fff7] ml-8">{t.theNetwork.step2.step1Command}</pre>
                    </div>
                    
                    <div className="bg-[#0a0a0f]/80 border border-[#00ff88]/20 rounded p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl text-[#00ff88]">2</span>
                        <span className="text-white font-semibold">{t.theNetwork.step2.step2Title}</span>
                      </div>
                      <pre className="text-sm text-[#00fff7] ml-8">{t.theNetwork.step2.step2Command}</pre>
                    </div>
                    
                    <div className="bg-[#0a0a0f]/80 border border-[#00ff88]/20 rounded p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl text-[#00ff88]">3</span>
                        <span className="text-white font-semibold">{t.theNetwork.step2.step3Title}</span>
                      </div>
                      <pre className="text-sm text-[#00fff7] ml-8">{t.theNetwork.step2.step3Command}</pre>
                    </div>
                    
                    <div className="bg-[#0a0a0f]/80 border border-[#00ff88]/20 rounded p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl text-[#00ff88]">4</span>
                        <span className="text-white font-semibold">{t.theNetwork.step2.step4Title}</span>
                      </div>
                      <pre className="text-sm text-[#00fff7] ml-8">{t.theNetwork.step2.step4Command}</pre>
                    </div>
                  </div>

                  <div className="bg-[#00ff88]/10 border border-[#00ff88]/30 rounded p-4">
                    <div className="text-sm text-[#00ff88] mb-2">{t.theNetwork.step2.important}</div>
                    <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                      <li>{t.theNetwork.step2.point1}</li>
                      <li>{t.theNetwork.step2.point2}</li>
                      <li>{t.theNetwork.step2.point3}</li>
                    </ul>
                  </div>

                  {missionProgress === 3 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00ff88] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theNetwork.step2.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 5 - Выбор сети */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 4 ? 'border-[#00ff88]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 5 ? 'bg-[#00ff88] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 5 ? '✓' : '5'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theNetwork.step3.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 4 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theNetwork.step3.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className={`bg-[#0a0a0f]/50 p-4 rounded border cursor-pointer transition-all ${
                      selectedNetwork === 'mainnet' 
                        ? 'border-[#00ff88] bg-[#00ff88]/10' 
                        : 'border-[#00ff88]/20 hover:border-[#00ff88]/50'
                    }`} onClick={() => setSelectedNetwork('mainnet')}>
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="radio"
                          name="network"
                          value="mainnet"
                          checked={selectedNetwork === 'mainnet'}
                          onChange={() => setSelectedNetwork('mainnet')}
                          className="w-4 h-4 accent-[#00ff88]"
                        />
                        <span className="text-white font-semibold">{t.theNetwork.step3.mainnet}</span>
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">{t.theNetwork.step3.mainnetLabel}</span>
                      </div>
                      <p className="text-sm text-gray-400 ml-7">
                        {t.theNetwork.step3.mainnetDesc}
                      </p>
                    </div>
                    
                    <div className={`bg-[#0a0a0f]/50 p-4 rounded border cursor-pointer transition-all ${
                      selectedNetwork === 'testnet' 
                        ? 'border-[#00ff88] bg-[#00ff88]/10' 
                        : 'border-[#00ff88]/20 hover:border-[#00ff88]/50'
                    }`} onClick={() => setSelectedNetwork('testnet')}>
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="radio"
                          name="network"
                          value="testnet"
                          checked={selectedNetwork === 'testnet'}
                          onChange={() => setSelectedNetwork('testnet')}
                          className="w-4 h-4 accent-[#00ff88]"
                        />
                        <span className="text-white font-semibold">{t.theNetwork.step3.testnet}</span>
                        <span className="text-xs bg-[#00ff88]/20 text-[#00ff88] px-2 py-1 rounded">{t.theNetwork.step3.testnetLabel}</span>
                      </div>
                      <p className="text-sm text-gray-400 ml-7">
                        {t.theNetwork.step3.testnetDesc}
                      </p>
                    </div>
                    
                    <div className={`bg-[#0a0a0f]/50 p-4 rounded border cursor-pointer transition-all ${
                      selectedNetwork === 'local' 
                        ? 'border-[#00ff88] bg-[#00ff88]/10' 
                        : 'border-[#00ff88]/20 hover:border-[#00ff88]/50'
                    }`} onClick={() => setSelectedNetwork('local')}>
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="radio"
                          name="network"
                          value="local"
                          checked={selectedNetwork === 'local'}
                          onChange={() => setSelectedNetwork('local')}
                          className="w-4 h-4 accent-[#00ff88]"
                        />
                        <span className="text-white font-semibold">{t.theNetwork.step3.local}</span>
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">{t.theNetwork.step3.localLabel}</span>
                      </div>
                      <p className="text-sm text-gray-400 ml-7">
                        {t.theNetwork.step3.localDesc}
                      </p>
                    </div>
                  </div>

                  {selectedNetwork && missionProgress === 4 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00ff88] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theNetwork.step3.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 6 - Симуляция деплоя */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 5 ? 'border-[#00ff88]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 6 ? 'bg-[#00ff88] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 6 ? '✓' : '6'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theNetwork.step4.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 5 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theNetwork.step4.description}
                  </p>
                  
                  <div className="bg-black/60 border border-[#00ff88]/20 rounded p-4">
                    <div className="text-xs text-gray-500 mb-3">{t.theNetwork.step4.terminal}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[#00ff88]">$</span>
                      <input
                        type="text"
                        value={deployCommand}
                        onChange={(e) => setDeployCommand(e.target.value)}
                        placeholder={t.theNetwork.step4.placeholder}
                        className="flex-1 bg-[#0a0a0f] text-[#00fff7] p-2 rounded border border-[#00ff88]/20 font-mono text-sm focus:outline-none focus:border-[#00ff88]"
                        disabled={isDeploying}
                      />
                    </div>
                    
                    {deploymentStatus && (
                      <div className={`mt-3 p-3 rounded text-sm ${
                        deploymentStatus.includes('✓') 
                          ? 'bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88]' 
                          : deploymentStatus.includes('✗')
                          ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                          : 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                      }`}>
                        {deploymentStatus}
                      </div>
                    )}
                  </div>

                  <div className="bg-[#c084fc]/10 border border-[#c084fc]/30 rounded p-4 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-[#c084fc]">{t.theNetwork.step4.hint}</div>
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="text-xs text-[#c084fc] hover:text-white transition-colors"
                      >
                        {showHint ? t.theNetwork.step4.hintHide : t.theNetwork.step4.hintShow}
                      </button>
                    </div>
                    
                    <div className={`transition-all duration-300 ${showHint ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
                    <div className="text-sm text-gray-400">
                        {t.theNetwork.step4.hintCommand} <code className="text-[#00fff7]">leo deploy --network {selectedNetwork || 'testnet'}</code>
                    </div>
                    </div>
                    
                    {!showHint && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <button
                          onClick={() => setShowHint(true)}
                          className="px-4 py-2 bg-[#c084fc]/20 border border-[#c084fc]/30 rounded text-[#c084fc] text-sm hover:bg-[#c084fc]/30 transition-colors"
                        >
                          {t.theNetwork.step4.hintButton}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="bg-[#00ff88]/10 border border-[#00ff88]/30 rounded p-4">
                    <div className="text-sm text-[#00ff88] mb-2">{t.theNetwork.step4.selectedNetwork}</div>
                    <div className="text-sm text-white">
                      {selectedNetwork ? selectedNetwork.toUpperCase() : t.theNetwork.step4.notSelected}
                    </div>
                  </div>

                  {missionProgress === 5 && !isDeploying && (
                    <button
                      onClick={simulateDeployment}
                      disabled={!deployCommand || !selectedNetwork}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00ff88] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t.theNetwork.step4.deploy}
                    </button>
                  )}

                </div>
              )}
            </div>

            {/* Step 7 - Интерактивная визуализация сети */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 6 ? 'border-[#00ff88]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 7 ? 'bg-[#00ff88] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 7 ? '✓' : '7'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theNetwork.step7.title}</h3>
                </div>
              </div>

              {missionProgress >= 6 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theNetwork.step7.description}
                  </p>

                  {/* Визуализация узлов сети */}
                  <div className="bg-black/60 border border-[#00ff88]/20 rounded p-4">
                    <div className="text-sm text-[#00ff88] mb-4 font-semibold">{t.theNetwork.step7.nodesTitle}</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div 
                        onClick={() => setActiveNode(activeNode === 'prover' ? null : 'prover')}
                        className={`p-3 rounded border cursor-pointer transition-all ${
                          activeNode === 'prover' || proofFlow === 'generating'
                            ? 'border-[#c084fc] bg-[#c084fc]/10' 
                            : 'border-[#00ff88]/20 hover:border-[#00ff88]/50'
                        }`}
                      >
                        <div className="text-[#c084fc] mb-1 font-semibold">⚡ {t.theNetwork.step7.prover}</div>
                        <div className="text-xs text-gray-400">{t.theNetwork.step7.proverDesc}</div>
                        {activeNode === 'prover' && (
                          <div className="mt-2 text-xs text-[#c084fc] animate-pulse">
                            {t.theNetwork.step7.proverActive}
                          </div>
                        )}
                      </div>

                      <div 
                        onClick={() => setActiveNode(activeNode === 'validator' ? null : 'validator')}
                        className={`p-3 rounded border cursor-pointer transition-all ${
                          activeNode === 'validator' || proofFlow === 'verifying'
                            ? 'border-[#00fff7] bg-[#00fff7]/10' 
                            : 'border-[#00ff88]/20 hover:border-[#00ff88]/50'
                        }`}
                      >
                        <div className="text-[#00fff7] mb-1 font-semibold">✓ {t.theNetwork.step7.validator}</div>
                        <div className="text-xs text-gray-400">{t.theNetwork.step7.validatorDesc}</div>
                        {activeNode === 'validator' && (
                          <div className="mt-2 text-xs text-[#00fff7] animate-pulse">
                            {t.theNetwork.step7.validatorActive}
                          </div>
                        )}
                      </div>

                      <div 
                        onClick={() => setActiveNode(activeNode === 'blockchain' ? null : 'blockchain')}
                        className={`p-3 rounded border cursor-pointer transition-all ${
                          activeNode === 'blockchain' || proofFlow === 'onchain'
                            ? 'border-[#00ff88] bg-[#00ff88]/10' 
                            : 'border-[#00ff88]/20 hover:border-[#00ff88]/50'
                        }`}
                      >
                        <div className="text-[#00ff88] mb-1 font-semibold">🔗 {t.theNetwork.step7.blockchain}</div>
                        <div className="text-xs text-gray-400">{t.theNetwork.step7.blockchainDesc}</div>
                        {activeNode === 'blockchain' && (
                          <div className="mt-2 text-xs text-[#00ff88] animate-pulse">
                            {t.theNetwork.step7.blockchainActive}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Симуляция Proof Flow */}
                  <div className="bg-black/60 border border-[#c084fc]/20 rounded p-4">
                    <div className="text-sm text-[#c084fc] mb-3 font-semibold">{t.theNetwork.step7.simulateTitle}</div>
                    <p className="text-xs text-gray-400 mb-3">{t.theNetwork.step7.simulateDesc}</p>
                    
                    <input
                      type="text"
                      value={proofInput}
                      onChange={(e) => setProofInput(e.target.value)}
                      placeholder={t.theNetwork.step7.inputPlaceholder}
                      disabled={proofFlow !== 'idle'}
                      className="w-full bg-[#0a0a0f] border border-[#c084fc]/30 rounded px-3 py-2 text-sm mb-3 focus:outline-none focus:border-[#c084fc] disabled:opacity-50"
                    />

                    {proofFlow !== 'idle' && proofFlow !== 'complete' && (
                      <div className="mb-3 p-3 rounded bg-[#c084fc]/10 border border-[#c084fc]/30">
                        <div className="text-xs text-[#c084fc] font-semibold mb-2">
                          {proofFlow === 'generating' && `⚡ ${t.theNetwork.step7.generating}`}
                          {proofFlow === 'verifying' && `✓ ${t.theNetwork.step7.verifying}`}
                          {proofFlow === 'onchain' && `🔗 ${t.theNetwork.step7.writing}`}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-[#0a0a0f] rounded overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#c084fc] to-[#00fff7] animate-pulse" 
                                 style={{width: proofFlow === 'generating' ? '33%' : proofFlow === 'verifying' ? '66%' : '100%'}}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {proofFlow === 'complete' && (
                      <div className="mb-3 p-3 rounded bg-[#00ff88]/10 border border-[#00ff88]/30 animate-fade-in">
                        <div className="text-sm text-[#00ff88] font-semibold">✓ {t.theNetwork.step7.proofSuccess}</div>
                        <div className="text-xs text-gray-400 mt-1">{t.theNetwork.step7.proofPrivate}</div>
                      </div>
                    )}

                    <button
                      onClick={simulateProofFlow}
                      disabled={!proofInput.trim() || proofFlow !== 'idle'}
                      className="w-full px-4 py-2 bg-gradient-to-r from-[#c084fc] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t.theNetwork.step7.executeButton}
                    </button>
                  </div>

                  {/* Records Visualization */}
                  <div className="bg-black/60 border border-[#00fff7]/20 rounded p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-[#00fff7] font-semibold">{t.theNetwork.step7.recordsTitle}</div>
                      <button
                        onClick={() => setRecordsVisible(!recordsVisible)}
                        className="text-xs text-[#00fff7] hover:underline"
                      >
                        {recordsVisible ? t.theNetwork.step7.hideRecords : t.theNetwork.step7.showRecords}
                      </button>
                    </div>

                    {recordsVisible && (
                      <div className="space-y-2 animate-fade-in">
                        <div className="p-2 rounded bg-[#0a0a0f] border border-[#00fff7]/20">
                          <div className="text-xs text-[#00fff7] mb-1">{t.theNetwork.step7.record1Title}</div>
                          <div className="text-xs text-gray-500 font-mono">owner: aleo1xxx...xxx</div>
                          <div className="text-xs text-gray-500 font-mono">amount: 100u64 (encrypted)</div>
                        </div>
                        <div className="p-2 rounded bg-[#0a0a0f] border border-[#c084fc]/20">
                          <div className="text-xs text-[#c084fc] mb-1">{t.theNetwork.step7.record2Title}</div>
                          <div className="text-xs text-gray-500 font-mono">owner: aleo1yyy...yyy</div>
                          <div className="text-xs text-gray-500 font-mono">amount: 50u64 (encrypted)</div>
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          💡 {t.theNetwork.step7.recordsNote}
                        </div>
                      </div>
                    )}
                  </div>

                  {missionProgress === 7 && (
                    <div className="mt-6 bg-gradient-to-r from-[#00ff88]/20 to-[#00fff7]/20 border-2 border-[#00ff88] rounded-lg p-6 animate-fade-in">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🎉</div>
                        <div className="text-2xl font-bold text-[#00ff88] mb-2">{t.theNetwork.step4.missionComplete}</div>
                        <div className="text-gray-300 mb-2">{t.theNetwork.step4.reward}</div>
                        <div className="text-sm text-[#00fff7] mb-4">
                          {t.theNetwork.step4.congratsMessage}
                        </div>
                        <div className="text-sm text-gray-400">{t.theNetwork.step4.returning}</div>
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

export default TheNetwork;