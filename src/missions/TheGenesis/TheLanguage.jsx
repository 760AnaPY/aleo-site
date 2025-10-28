import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../locales/translations';
import * as THREE from 'three';

const TheLanguage = ({ onBack, onComplete }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [missionProgress, setMissionProgress] = useState(0);
  const [codeInput, setCodeInput] = useState('');
  const [codeResult, setCodeResult] = useState('');
  const [showHint, setShowHint] = useState(false);
  const canvasRef = useRef(null);

  // Three.js setup
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
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.3
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
      cube.rotation.x += 0.003;
      cube.rotation.y += 0.007;
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

  const completeMissionStep = () => {
    const newProgress = missionProgress + 1;
    setMissionProgress(newProgress);
    
    if (newProgress >= 6) {
      console.log('Mission 2 complete! Calling onComplete...');
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };


  const checkCode = () => {
    const correctCode = 'transition main';
    if (codeInput.toLowerCase().includes(correctCode)) {
      setCodeResult(t.theLanguage.step4.success);
      setTimeout(() => {
        completeMissionStep();
      }, 1500);
    } else {
      setCodeResult(t.theLanguage.step4.error);
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
          backgroundImage: 'linear-gradient(#c084fc 1px, transparent 1px), linear-gradient(90deg, #c084fc 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-[#c084fc]/20 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#c084fc] hover:text-white transition-colors"
          >
            <span>←</span> {t.theLanguage.back}
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-400">{t.theLanguage.progress}</div>
            <div className="text-[#c084fc] font-bold">{missionProgress}/6 {t.theLanguage.steps}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Mission Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl font-bold text-[#c084fc]">02</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">{t.theLanguage.title}</h1>
                <p className="text-gray-400">{t.theLanguage.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-3 py-1 bg-[#c084fc]/10 border border-[#c084fc]/30 rounded text-[#c084fc] text-sm">
                {t.theLanguage.intermediate}
              </span>
              <span className="px-3 py-1 bg-[#00fff7]/10 border border-[#00fff7]/30 rounded text-[#00fff7] text-sm">
                {t.theLanguage.reward}
              </span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-8">
            {/* Step 1 - Что такое Leo? */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 0 ? 'border-[#c084fc]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 1 ? 'bg-[#c084fc] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 1 ? '✓' : '1'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theLanguage.step1.title}</h3>
                </div>
              </div>
              
              <div className="ml-11 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t.theLanguage.step1.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0f]/80 border border-[#c084fc]/20 rounded p-4">
                    <div className="text-[#c084fc] mb-2 flex items-center gap-2">
                      {t.theLanguage.step1.safety}
                    </div>
                    <p className="text-sm text-gray-400">
                      {t.theLanguage.step1.safetyText}
                    </p>
                  </div>
                  <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                    <div className="text-[#00fff7] mb-2 flex items-center gap-2">
                      {t.theLanguage.step1.privacy}
                    </div>
                    <p className="text-sm text-gray-400">
                      {t.theLanguage.step1.privacyText}
                    </p>
                  </div>
                </div>

                {missionProgress === 0 && (
                  <button
                    onClick={completeMissionStep}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-[#c084fc] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity"
                  >
                    {t.theLanguage.step1.button}
                  </button>
                )}
              </div>
            </div>

            {/* Step 2 - Структура программы */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 1 ? 'border-[#c084fc]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 2 ? 'bg-[#c084fc] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 2 ? '✓' : '2'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theLanguage.step2.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 1 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theLanguage.step2.description}
                  </p>
                  
                  <div className="bg-black/60 border border-[#c084fc]/20 rounded p-4">
                    <div className="text-xs text-[#c084fc] mb-3 flex items-center justify-between">
                      <span>{t.theLanguage.step2.codeTitle}</span>
                      <span className="text-gray-500">{t.theLanguage.step2.codeFile}</span>
                    </div>
                    
                    <div className="bg-[#0a0a0f] border border-[#c084fc]/20 rounded-lg overflow-hidden">
                      <div className="bg-[#1a1a1a] px-4 py-2 border-b border-[#c084fc]/20 flex items-center gap-2">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-gray-400 text-sm">hello.leo</span>
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
                              <div>6</div>
                            </div>
                            <div className="flex-1">
                              <div><span className="text-[#ff79c6]">program</span> <span className="text-[#8be9fd]">hello.aleo</span> <span className="text-gray-400">{`{`}</span></div>
                              <div>    <span className="text-[#6272a4]">// Функция-переход (публичная)</span></div>
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

                  <div className="space-y-2">
                    <div className="flex items-start gap-3 bg-[#0a0a0f]/50 p-3 rounded border border-[#c084fc]/10">
                      <span className="text-[#c084fc] text-xl">1</span>
                      <div>
                        <div className="font-semibold text-white">program hello.aleo</div>
                        <div className="text-sm text-gray-400">{t.theLanguage.step2.note1}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-[#0a0a0f]/50 p-3 rounded border border-[#c084fc]/10">
                      <span className="text-[#c084fc] text-xl">2</span>
                      <div>
                        <div className="font-semibold text-white">transition main(...)</div>
                        <div className="text-sm text-gray-400">{t.theLanguage.step2.note2}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-[#0a0a0f]/50 p-3 rounded border border-[#c084fc]/10">
                      <span className="text-[#c084fc] text-xl">3</span>
                      <div>
                        <div className="font-semibold text-white">public a: u32</div>
                        <div className="text-sm text-gray-400">{t.theLanguage.step2.note3}</div>
                      </div>
                    </div>
                  </div>

                  {missionProgress === 1 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#c084fc] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theLanguage.step2.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 3 - Типы данных */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 2 ? 'border-[#c084fc]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 3 ? 'bg-[#c084fc] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 3 ? '✓' : '3'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theLanguage.step3.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 2 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theLanguage.step3.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/60 border border-[#c084fc]/20 rounded p-4">
                      <div className="text-[#c084fc] font-semibold mb-2">{t.theLanguage.step3.numeric}</div>
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-400"><span className="text-[#00fff7]">{t.theLanguage.step3.numericU}</span></div>
                        <div className="text-gray-400"><span className="text-[#00fff7]">{t.theLanguage.step3.numericI}</span></div>
                        <div className="text-gray-400"><span className="text-[#00fff7]">{t.theLanguage.step3.numericField}</span></div>
                      </div>
                    </div>
                    
                    <div className="bg-black/60 border border-[#c084fc]/20 rounded p-4">
                      <div className="text-[#c084fc] font-semibold mb-2">{t.theLanguage.step3.other}</div>
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-400"><span className="text-[#00fff7]">{t.theLanguage.step3.otherBool}</span></div>
                        <div className="text-gray-400"><span className="text-[#00fff7]">{t.theLanguage.step3.otherAddress}</span></div>
                        <div className="text-gray-400"><span className="text-[#00fff7]">{t.theLanguage.step3.otherStruct}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-[#c084fc]/20 rounded p-4">
                    <div className="text-xs text-[#c084fc] mb-3 flex items-center justify-between">
                      <span>{t.theLanguage.step3.codeTitle}</span>
                      <span className="text-gray-500">{t.theLanguage.step3.codeFile}</span>
                    </div>
                    
                    <div className="bg-[#0a0a0f] border border-[#c084fc]/20 rounded-lg overflow-hidden">
                      <div className="bg-[#1a1a1a] px-4 py-2 border-b border-[#c084fc]/20 flex items-center gap-2">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-gray-400 text-sm">calculate.leo</span>
                      </div>
                      
                      <div className="p-4 overflow-x-auto">
                        <pre className="text-sm leading-relaxed">
                          <div className="flex">
                            <div className="text-gray-500 pr-4 select-none">
                              <div>1</div>
                              <div>2</div>
                              <div>3</div>
                              <div>4</div>
                            </div>
                            <div className="flex-1">
                              <div><span className="text-[#ff79c6]">transition</span> <span className="text-[#8be9fd]">calculate</span><span className="text-gray-400">(</span><span className="text-[#8be9fd]">a</span>: <span className="text-[#50fa7b]">u32</span>, <span className="text-[#8be9fd]">b</span>: <span className="text-[#50fa7b]">u32</span><span className="text-gray-400">) -&gt;</span> <span className="text-[#50fa7b]">u32</span> <span className="text-gray-400">{`{`}</span></div>
                              <div>    <span className="text-[#ff79c6]">let</span> <span className="text-[#8be9fd]">sum</span>: <span className="text-[#50fa7b]">u32</span> = <span className="text-[#8be9fd]">a</span> + <span className="text-[#8be9fd]">b</span>;</div>
                              <div>    <span className="text-[#ff79c6]">return</span> <span className="text-[#8be9fd]">sum</span>;</div>
                              <div><span className="text-gray-400">{`}`}</span></div>
                            </div>
                          </div>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {missionProgress === 2 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#c084fc] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theLanguage.step3.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 4 - Records и Structs */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 3 ? 'border-[#c084fc]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 4 ? 'bg-[#c084fc] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 4 ? '✓' : '4'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theLanguage.step4.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 3 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theLanguage.step4.description}
                  </p>
                  
                  <div className="bg-black/60 border border-[#c084fc]/20 rounded p-4">
                    <div className="text-xs text-[#c084fc] mb-3 flex items-center justify-between">
                      <span>{t.theLanguage.step4.codeTitle}</span>
                      <span className="text-gray-500">{t.theLanguage.step4.codeFile}</span>
                    </div>
                    
                    <div className="bg-[#0a0a0f] border border-[#c084fc]/20 rounded-lg overflow-hidden">
                      <div className="bg-[#1a1a1a] px-4 py-2 border-b border-[#c084fc]/20 flex items-center gap-2">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-gray-400 text-sm">token.leo</span>
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
                              <div>6</div>
                              <div>7</div>
                              <div>8</div>
                              <div>9</div>
                              <div>10</div>
                            </div>
                            <div className="flex-1">
                              <div><span className="text-[#6272a4]">// Определение структуры</span></div>
                              <div><span className="text-[#ff79c6]">struct</span> <span className="text-[#8be9fd]">Token</span> <span className="text-gray-400">{`{`}</span></div>
                              <div>    <span className="text-[#8be9fd]">owner</span>: <span className="text-[#50fa7b]">address</span>,</div>
                              <div>    <span className="text-[#8be9fd]">amount</span>: <span className="text-[#50fa7b]">u64</span></div>
                              <div><span className="text-gray-400">{`}`}</span></div>
                              <div></div>
                              <div><span className="text-[#6272a4]">// Использование в функции</span></div>
                              <div><span className="text-[#ff79c6]">transition</span> <span className="text-[#8be9fd]">create_token</span><span className="text-gray-400">(</span><span className="text-[#8be9fd]">owner</span>: <span className="text-[#50fa7b]">address</span><span className="text-gray-400">) -&gt;</span> <span className="text-[#50fa7b]">Token</span> <span className="text-gray-400">{`{`}</span></div>
                              <div>    <span className="text-[#ff79c6]">return</span> <span className="text-[#50fa7b]">Token</span> <span className="text-gray-400">{`{`}</span> <span className="text-[#8be9fd]">owner</span>: <span className="text-[#8be9fd]">owner</span>, <span className="text-[#8be9fd]">amount</span>: <span className="text-[#f1fa8c]">100u64</span> <span className="text-gray-400">{`}`}</span>;</div>
                              <div><span className="text-gray-400">{`}`}</span></div>
                            </div>
                          </div>
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                    <div className="text-[#00fff7] mb-2 font-semibold">{t.theLanguage.step4.recordTitle}</div>
                    <p className="text-sm text-gray-400 mb-3">
                      {t.theLanguage.step4.recordText}
                    </p>
                    <div className="text-xs text-gray-500 bg-black/50 p-2 rounded">
                      <code className="text-[#00fff7]">record</code> = {t.theLanguage.step4.recordNote}
                    </div>
                  </div>

                  {missionProgress === 3 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#c084fc] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theLanguage.step4.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 5 - Модификаторы видимости */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 4 ? 'border-[#c084fc]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 5 ? 'bg-[#c084fc] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 5 ? '✓' : '5'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theLanguage.step5.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 4 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theLanguage.step5.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                      <div className="text-[#00fff7] mb-2 flex items-center gap-2 font-semibold">
                        🔓 {t.theLanguage.step5.publicTitle}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.theLanguage.step5.publicText}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#c084fc]/20 rounded p-4">
                      <div className="text-[#c084fc] mb-2 flex items-center gap-2 font-semibold">
                        🔒 {t.theLanguage.step5.privateTitle}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.theLanguage.step5.privateText}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#ff79c6]/20 rounded p-4">
                      <div className="text-[#ff79c6] mb-2 flex items-center gap-2 font-semibold">
                        ⚡ {t.theLanguage.step5.constantTitle}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.theLanguage.step5.constantText}
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/60 border border-[#c084fc]/20 rounded p-4">
                    <div className="text-xs text-[#c084fc] mb-3">{t.theLanguage.step5.codeTitle}</div>
                    
                    <div className="bg-[#0a0a0f] border border-[#c084fc]/20 rounded-lg overflow-hidden">
                      <div className="p-4 overflow-x-auto">
                        <pre className="text-sm leading-relaxed">
                          <div className="flex">
                            <div className="text-gray-500 pr-4 select-none">
                              <div>1</div>
                              <div>2</div>
                              <div>3</div>
                              <div>4</div>
                            </div>
                            <div className="flex-1">
                              <div><span className="text-[#ff79c6]">transition</span> <span className="text-[#8be9fd]">transfer</span><span className="text-gray-400">(</span></div>
                              <div>    <span className="text-[#ff79c6]">public</span> <span className="text-[#8be9fd]">receiver</span>: <span className="text-[#50fa7b]">address</span>,</div>
                              <div>    <span className="text-[#ff79c6]">private</span> <span className="text-[#8be9fd]">amount</span>: <span className="text-[#50fa7b]">u64</span></div>
                              <div><span className="text-gray-400">) -&gt;</span> <span className="text-[#50fa7b]">u64</span> <span className="text-gray-400">{`{ ... }`}</span></div>
                            </div>
                          </div>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {missionProgress === 4 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#c084fc] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theLanguage.step5.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 6 - Практическое задание */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 5 ? 'border-[#c084fc]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 6 ? 'bg-[#c084fc] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 6 ? '✓' : '6'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theLanguage.step6.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 5 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theLanguage.step6.description}
                  </p>
                  
                  <div className="bg-black/60 border border-[#c084fc]/20 rounded p-4">
                    <div className="text-xs text-gray-500 mb-3">ВАШЕ РЕШЕНИЕ</div>
                    <textarea
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      placeholder={t.theLanguage.step6.placeholder}
                      className="w-full bg-[#0a0a0f] text-[#00fff7] p-3 rounded border border-[#c084fc]/20 font-mono text-sm focus:outline-none focus:border-[#c084fc] resize-none"
                      rows={5}
                    />
                    
                    {codeResult && (
                      <div className={`mt-3 p-3 rounded text-sm ${
                        codeResult.includes('✓') 
                          ? 'bg-[#00fff7]/10 border border-[#00fff7]/30 text-[#00fff7]' 
                          : 'bg-red-500/10 border border-red-500/30 text-red-400'
                      }`}>
                        {codeResult}
                      </div>
                    )}
                  </div>

                  <div className="bg-[#c084fc]/10 border border-[#c084fc]/30 rounded p-4 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-[#c084fc]">{t.theLanguage.step6.hint}</div>
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="text-xs text-[#c084fc] hover:text-white transition-colors"
                      >
                        {showHint ? t.theLanguage.step6.hintHide : t.theLanguage.step6.hintShow}
                      </button>
                    </div>
                    
                    <div className={`transition-all duration-300 ${showHint ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
                      <div className="text-sm text-gray-400">
                        {t.theLanguage.step6.hintTitle} <code className="text-[#00fff7]">{t.theLanguage.step6.hintText}</code>
                      </div>
                    </div>
                    
                    {!showHint && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <button
                          onClick={() => setShowHint(true)}
                          className="px-4 py-2 bg-[#c084fc]/20 border border-[#c084fc]/30 rounded text-[#c084fc] text-sm hover:bg-[#c084fc]/30 transition-colors"
                        >
                          👁️ {t.theLanguage.step6.hintShow}
                        </button>
                      </div>
                    )}
                  </div>

                  {missionProgress === 5 && (
                    <button
                      onClick={checkCode}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#c084fc] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theLanguage.step6.check}
                    </button>
                  )}

                  {missionProgress === 6 && (
                    <div className="mt-6 bg-gradient-to-r from-[#c084fc]/20 to-[#00fff7]/20 border-2 border-[#c084fc] rounded-lg p-6 animate-fade-in">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🎉</div>
                        <div className="text-2xl font-bold text-[#c084fc] mb-2">{t.theLanguage.step6.complete}</div>
                        <div className="text-gray-300 mb-4">{t.theLanguage.step6.reward}</div>
                        <div className="text-sm text-gray-400">{t.theLanguage.step6.returning}</div>
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

export default TheLanguage;