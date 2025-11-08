import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../locales/translations';
import * as THREE from 'three';

const TheCircuit = ({ onBack, onComplete }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [missionProgress, setMissionProgress] = useState(0);
  const [circuitAnswer, setCircuitAnswer] = useState('');
  const [quizAnswer, setQuizAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const canvasRef = useRef(null);

  // Three.js setup - более сложная анимация для circuit
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
    camera.position.z = 6;

    // Создаем несколько кубов (circuit nodes)
    const cubes = [];
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const edges = new THREE.EdgesGeometry(geometry);
      const material = new THREE.LineBasicMaterial({
        color: i === 0 ? 0x00fff7 : i === 1 ? 0xc084fc : 0xff6b6b,
        transparent: true,
        opacity: 0.4
      });
      const cube = new THREE.LineSegments(edges, material);
      cube.position.x = (i - 1) * 3;
      scene.add(cube);
      cubes.push(cube);
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
      
      cubes.forEach((cube, idx) => {
        cube.rotation.x += 0.002 + idx * 0.001;
        cube.rotation.y += 0.005 + idx * 0.001;
        cube.position.y = Math.sin(Date.now() * 0.001 + idx) * 0.3;
      });

      camera.position.x = mouseX * 0.3;
      camera.position.y = mouseY * 0.3;
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
    
    if (newProgress >= 6) {
      console.log('Mission 3 complete! Calling onComplete...');
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const checkCircuitAnswer = () => {
    const correct = circuitAnswer.toLowerCase().includes('record');
    if (correct) {
      setFeedback(t.theCircuit.step3.success);
      setTimeout(() => {
        setFeedback('');
        completeMissionStep();
      }, 2000);
    } else {
      setFeedback(t.theCircuit.step3.error);
    }
  };

  const checkQuizAnswer = () => {
    if (quizAnswer === 'prover') {
      setFeedback(t.theCircuit.step4.success);
      setTimeout(() => {
        setFeedback('');
        completeMissionStep();
      }, 2000);
    } else {
      setFeedback(t.theCircuit.step4.error);
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
          backgroundImage: 'linear-gradient(#ff6b6b 1px, transparent 1px), linear-gradient(90deg, #ff6b6b 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-[#ff6b6b]/20 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#ff6b6b] hover:text-white transition-colors"
          >
            <span>←</span> {t.theCircuit.back}
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-400">{t.theCircuit.progress}</div>
            <div className="text-[#ff6b6b] font-bold">{missionProgress}/6 {t.theCircuit.steps}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Mission Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl font-bold text-[#ff6b6b]">03</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">{t.theCircuit.title}</h1>
                <p className="text-gray-400">{t.theCircuit.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-3 py-1 bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded text-[#ff6b6b] text-sm">
                {t.theCircuit.intermediate}
              </span>
              <span className="px-3 py-1 bg-[#00fff7]/10 border border-[#00fff7]/30 rounded text-[#00fff7] text-sm">
                {t.theCircuit.reward}
              </span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-8">
            {/* Step 1 - Что такое Circuit? */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 0 ? 'border-[#ff6b6b]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 1 ? 'bg-[#ff6b6b] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 1 ? '✓' : '1'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theCircuit.step1.title}</h3>
                </div>
              </div>
              
              <div className="ml-11 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t.theCircuit.step1.description}
                </p>
                
                <div className="bg-[#0a0a0f]/80 border border-[#ff6b6b]/20 rounded p-4">
                  <div className="text-sm text-[#ff6b6b] mb-2">{t.theCircuit.step1.howItWorks}</div>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-start gap-2">
                      <span className="text-[#00fff7]">1.</span>
                      <span>{t.theCircuit.step1.step1Text}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#c084fc]">2.</span>
                      <span>{t.theCircuit.step1.step2Text}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#ff6b6b]">3.</span>
                      <span>{t.theCircuit.step1.step3Text}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#00fff7]">4.</span>
                      <span>{t.theCircuit.step1.step4Text}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0f]/80 border border-[#ff6b6b]/20 rounded p-4">
                    <div className="text-[#ff6b6b] mb-2 flex items-center gap-2">
                      <span>⚙️</span> Prover
                    </div>
                    <p className="text-sm text-gray-400">
                      Generates proof based on private data
                    </p>
                  </div>
                  <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                    <div className="text-[#00fff7] mb-2 flex items-center gap-2">
                      <span>✓</span> Verifier
                    </div>
                    <p className="text-sm text-gray-400">
                      Verifies proof without accessing private data
                    </p>
                  </div>
                </div>

                {missionProgress === 0 && (
                  <button
                    onClick={completeMissionStep}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-[#ff6b6b] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                  >
                    {t.theCircuit.step1.button}
                  </button>
                )}
              </div>
            </div>

            {/* Step 2 - Структура Circuit */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 1 ? 'border-[#ff6b6b]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 2 ? 'bg-[#ff6b6b] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 2 ? '✓' : '2'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theCircuit.step2.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 1 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theCircuit.step2.description}
                  </p>
                  
                  <div className="bg-black/60 border border-[#ff6b6b]/20 rounded p-4">
                    <div className="text-xs text-[#ff6b6b] mb-3 flex items-center justify-between">
                      <span>{t.theCircuit.step2.codeTitle}</span>
                      <span className="text-gray-500">{t.theCircuit.step2.codeFile}</span>
                    </div>
                    <div className="bg-[#0a0a0f] border border-[#ff6b6b]/20 rounded-lg overflow-hidden">
                      <div className="bg-[#1a1a1a] px-4 py-2 border-b border-[#ff6b6b]/20 flex items-center gap-2">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-gray-400 text-sm">token.aleo</span>
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
                              <div>11</div>
                              <div>12</div>
                              <div>13</div>
                              <div>14</div>
                              <div>15</div>
                              <div>16</div>
                              <div>17</div>
                              <div>18</div>
                              <div>19</div>
                              <div>20</div>
                              <div>21</div>
                              <div>22</div>
                              <div>23</div>
                              <div>24</div>
                              <div>25</div>
                              <div>26</div>
                              <div>27</div>
                              <div>28</div>
                              <div>29</div>
                              <div>30</div>
                              <div>31</div>
                              <div>32</div>
                              <div>33</div>
                              <div>34</div>
                              <div>35</div>
                              <div>36</div>
                              <div>37</div>
                              <div>38</div>
                              <div>39</div>
                              <div>40</div>
                              <div>41</div>
                            </div>
                            <div className="flex-1">
                              <div><span className="text-[#ff79c6]">program</span> <span className="text-[#8be9fd]">token.aleo</span> <span className="text-gray-400">{`{`}</span></div>
                              <div className="text-gray-400">    <span className="text-[#ffb86c]">// Private token record</span></div>
                              <div>    <span className="text-[#ff79c6]">record</span> <span className="text-[#50fa7b]">Token</span> <span className="text-gray-400">{`{`}</span></div>
                              <div>        <span className="text-[#8be9fd]">owner</span>: <span className="text-[#50fa7b]">address</span>,</div>
                              <div>        <span className="text-[#8be9fd]">amount</span>: <span className="text-[#50fa7b]">u64</span>,</div>
                              <div>    <span className="text-gray-400">{`}`}</span></div>
                              <div className="text-gray-400">    </div>
                              <div className="text-gray-400">    <span className="text-[#ffb86c]">// Token creation (mint)</span></div>
                              <div>    <span className="text-[#ff79c6]">transition</span> <span className="text-[#8be9fd]">mint</span><span className="text-gray-400">(</span></div>
                              <div>        <span className="text-[#8be9fd]">receiver</span>: <span className="text-[#50fa7b]">address</span>,</div>
                              <div>        <span className="text-[#8be9fd]">amount</span>: <span className="text-[#50fa7b]">u64</span></div>
                              <div>    <span className="text-gray-400">) -&gt;</span> <span className="text-[#50fa7b]">Token</span> <span className="text-gray-400">{`{`}</span></div>
                              <div>        <span className="text-[#ff79c6]">return</span> <span className="text-[#50fa7b]">Token</span> <span className="text-gray-400">{`{`}</span></div>
                              <div>            <span className="text-[#8be9fd]">owner</span>: <span className="text-[#8be9fd]">receiver</span>,</div>
                              <div>            <span className="text-[#8be9fd]">amount</span>: <span className="text-[#8be9fd]">amount</span>,</div>
                              <div>        <span className="text-gray-400">{`}`}</span>;</div>
                              <div>    <span className="text-gray-400">{`}`}</span></div>
                              <div className="text-gray-400">    </div>
                              <div className="text-gray-400">    <span className="text-[#ffb86c]">// Token transfer</span></div>
                              <div>    <span className="text-[#ff79c6]">transition</span> <span className="text-[#8be9fd]">transfer</span><span className="text-gray-400">(</span></div>
                              <div>        <span className="text-[#8be9fd]">token</span>: <span className="text-[#50fa7b]">Token</span>,</div>
                              <div>        <span className="text-[#8be9fd]">to</span>: <span className="text-[#50fa7b]">address</span>,</div>
                              <div>        <span className="text-[#8be9fd]">amount</span>: <span className="text-[#50fa7b]">u64</span></div>
                              <div>    <span className="text-gray-400">) -&gt;</span> <span className="text-gray-400">(</span><span className="text-[#50fa7b]">Token</span>, <span className="text-[#50fa7b]">Token</span><span className="text-gray-400">) {`}`}</span></div>
                              <div>        <span className="text-[#ff79c6]">let</span> <span className="text-[#8be9fd]">difference</span>: <span className="text-[#50fa7b]">u64</span> = <span className="text-[#8be9fd]">token</span>.<span className="text-[#8be9fd]">amount</span> - <span className="text-[#8be9fd]">amount</span>;</div>
                              <div className="text-gray-400">        </div>
                              <div>        <span className="text-[#ff79c6]">let</span> <span className="text-[#8be9fd]">remaining</span>: <span className="text-[#50fa7b]">Token</span> = <span className="text-[#50fa7b]">Token</span> <span className="text-gray-400">{`{`}</span></div>
                              <div>            <span className="text-[#8be9fd]">owner</span>: <span className="text-[#8be9fd]">token</span>.<span className="text-[#8be9fd]">owner</span>,</div>
                              <div>            <span className="text-[#8be9fd]">amount</span>: <span className="text-[#8be9fd]">difference</span>,</div>
                              <div>        <span className="text-gray-400">{`}`}</span>;</div>
                              <div className="text-gray-400">        </div>
                              <div>        <span className="text-[#ff79c6]">let</span> <span className="text-[#8be9fd]">transferred</span>: <span className="text-[#50fa7b]">Token</span> = <span className="text-[#50fa7b]">Token</span> <span className="text-gray-400">{`{`}</span></div>
                              <div>            <span className="text-[#8be9fd]">owner</span>: <span className="text-[#8be9fd]">to</span>,</div>
                              <div>            <span className="text-[#8be9fd]">amount</span>: <span className="text-[#8be9fd]">amount</span>,</div>
                              <div>        <span className="text-gray-400">{`}`}</span>;</div>
                              <div className="text-gray-400">        </div>
                              <div>        <span className="text-[#ff79c6]">return</span> <span className="text-gray-400">(</span><span className="text-[#8be9fd]">remaining</span>, <span className="text-[#8be9fd]">transferred</span><span className="text-gray-400">)</span>;</div>
                              <div>    <span className="text-gray-400">{`}`}</span></div>
                              <div><span className="text-gray-400">{`}`}</span></div>
                            </div>
                          </div>
                    </pre>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded p-4">
                    <div className="text-sm text-[#ff6b6b] mb-2">{t.theCircuit.step2.keyPoints}</div>
                    <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                      <li>{t.theCircuit.step2.point1}</li>
                      <li>{t.theCircuit.step2.point2}</li>
                      <li>{t.theCircuit.step2.point3}</li>
                      <li>{t.theCircuit.step2.point4}</li>
                    </ul>
                  </div>

                  {missionProgress === 1 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#ff6b6b] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theCircuit.step2.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 3 - Компиляция в схему */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 2 ? 'border-[#ff6b6b]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 3 ? 'bg-[#ff6b6b] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 3 ? '✓' : '3'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theCircuit.step3new.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 2 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theCircuit.step3new.description}
                  </p>

                  <div className="space-y-3">
                    <div className="bg-[#0a0a0f]/80 border border-[#ff6b6b]/20 rounded p-4">
                      <div className="text-[#ff6b6b] mb-2 font-semibold flex items-center gap-2">
                        1️⃣ {t.theCircuit.step3new.step1Title}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.theCircuit.step3new.step1Text}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#c084fc]/20 rounded p-4">
                      <div className="text-[#c084fc] mb-2 font-semibold flex items-center gap-2">
                        2️⃣ {t.theCircuit.step3new.step2Title}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.theCircuit.step3new.step2Text}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#00fff7]/20 rounded p-4">
                      <div className="text-[#00fff7] mb-2 font-semibold flex items-center gap-2">
                        3️⃣ {t.theCircuit.step3new.step3Title}
                      </div>
                      <p className="text-sm text-gray-400">
                        {t.theCircuit.step3new.step3Text}
                      </p>
                    </div>
                  </div>

                  {missionProgress === 2 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#ff6b6b] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theCircuit.step3new.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 4 - Оптимизация схем */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 3 ? 'border-[#ff6b6b]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 4 ? 'bg-[#ff6b6b] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 4 ? '✓' : '4'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theCircuit.step4new.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 3 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theCircuit.step4new.description}
                  </p>

                  <div className="bg-black/60 border border-[#ff6b6b]/20 rounded p-4">
                    <div className="text-sm text-[#ff6b6b] mb-3 font-semibold">{t.theCircuit.step4new.whyTitle}</div>
                    <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                      <li>{t.theCircuit.step4new.why1}</li>
                      <li>{t.theCircuit.step4new.why2}</li>
                      <li>{t.theCircuit.step4new.why3}</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0a0a0f]/80 border border-[#ff6b6b]/20 rounded p-4">
                      <div className="text-[#ff6b6b] mb-2 font-semibold">⚡ {t.theCircuit.step4new.technique1}</div>
                      <p className="text-sm text-gray-400">
                        {t.theCircuit.step4new.technique1Text}
                      </p>
                    </div>

                    <div className="bg-[#0a0a0f]/80 border border-[#c084fc]/20 rounded p-4">
                      <div className="text-[#c084fc] mb-2 font-semibold">🔄 {t.theCircuit.step4new.technique2}</div>
                      <p className="text-sm text-gray-400">
                        {t.theCircuit.step4new.technique2Text}
                      </p>
                    </div>
                  </div>

                  {missionProgress === 3 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#ff6b6b] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theCircuit.step4new.button}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 5 - Вопрос на понимание */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 4 ? 'border-[#ff6b6b]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 5 ? 'bg-[#ff6b6b] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 5 ? '✓' : '5'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theCircuit.step3.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 4 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theCircuit.step3.description}
                  </p>
                  
                  <div className="bg-black/60 border border-[#ff6b6b]/20 rounded p-4">
                    <div className="text-xs text-gray-500 mb-3">{t.theCircuit.step3.yourAnswer}</div>
                    <input
                      type="text"
                      value={circuitAnswer}
                      onChange={(e) => setCircuitAnswer(e.target.value)}
                      placeholder={t.theCircuit.step3.placeholder}
                      className="w-full bg-[#0a0a0f] text-[#00fff7] p-3 rounded border border-[#ff6b6b]/20 font-mono text-sm focus:outline-none focus:border-[#ff6b6b]"
                    />
                    
                    {feedback && (
                      <div className={`mt-3 p-3 rounded text-sm ${
                        feedback.includes('✓') 
                          ? 'bg-[#00fff7]/10 border border-[#00fff7]/30 text-[#00fff7]' 
                          : 'bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 text-[#ff6b6b]'
                      }`}>
                        {feedback}
                      </div>
                    )}
                  </div>

                  <div className="bg-[#c084fc]/10 border border-[#c084fc]/30 rounded p-4 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-[#c084fc]">{t.theCircuit.step3.hint}</div>
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="text-xs text-[#c084fc] hover:text-white transition-colors"
                      >
                        {showHint ? t.theCircuit.step3.hintHide : t.theCircuit.step3.hintShow}
                      </button>
                    </div>
                    
                    <div className={`transition-all duration-300 ${showHint ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
                    <div className="text-sm text-gray-400">
                        {t.theCircuit.step3.hintText}
                      </div>
                    </div>
                    
                    {!showHint && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <button
                          onClick={() => setShowHint(true)}
                          className="px-4 py-2 bg-[#c084fc]/20 border border-[#c084fc]/30 rounded text-[#c084fc] text-sm hover:bg-[#c084fc]/30 transition-colors"
                        >
                          👁️ Показать подсказку
                        </button>
                      </div>
                    )}
                  </div>

                  {missionProgress === 4 && (
                    <button
                      onClick={checkCircuitAnswer}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#ff6b6b] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      {t.theCircuit.step3.check}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 6 - Финальный тест */}
            <div className={`bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-500 ${
              missionProgress >= 5 ? 'border-[#ff6b6b]/50 opacity-100' : 'border-gray-700/30 opacity-50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    missionProgress >= 6 ? 'bg-[#ff6b6b] text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {missionProgress >= 6 ? '✓' : '6'}
                  </div>
                  <h3 className="text-xl font-semibold">{t.theCircuit.step4.title}</h3>
                </div>
              </div>
              
              {missionProgress >= 5 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    {t.theCircuit.step4.description}
                  </p>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 bg-[#0a0a0f]/50 p-4 rounded border border-[#ff6b6b]/20 cursor-pointer hover:border-[#ff6b6b] transition-colors">
                      <input
                        type="radio"
                        name="quiz"
                        value="prover"
                        checked={quizAnswer === 'prover'}
                        onChange={(e) => setQuizAnswer(e.target.value)}
                        className="w-4 h-4 accent-[#ff6b6b]"
                      />
                      <span className="text-white">{t.theCircuit.step4.option1}</span>
                    </label>
                    
                    <label className="flex items-center gap-3 bg-[#0a0a0f]/50 p-4 rounded border border-[#ff6b6b]/20 cursor-pointer hover:border-[#ff6b6b] transition-colors">
                      <input
                        type="radio"
                        name="quiz"
                        value="verifier"
                        checked={quizAnswer === 'verifier'}
                        onChange={(e) => setQuizAnswer(e.target.value)}
                        className="w-4 h-4 accent-[#ff6b6b]"
                      />
                      <span className="text-white">{t.theCircuit.step4.option2}</span>
                    </label>
                    
                    <label className="flex items-center gap-3 bg-[#0a0a0f]/50 p-4 rounded border border-[#ff6b6b]/20 cursor-pointer hover:border-[#ff6b6b] transition-colors">
                      <input
                        type="radio"
                        name="quiz"
                        value="compiler"
                        checked={quizAnswer === 'compiler'}
                        onChange={(e) => setQuizAnswer(e.target.value)}
                        className="w-4 h-4 accent-[#ff6b6b]"
                      />
                      <span className="text-white">{t.theCircuit.step4.option3}</span>
                    </label>
                  </div>

                  {feedback && missionProgress === 5 && (
                    <div className={`p-3 rounded text-sm ${
                      feedback.includes('✓') 
                        ? 'bg-[#00fff7]/10 border border-[#00fff7]/30 text-[#00fff7]' 
                        : 'bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 text-[#ff6b6b]'
                    }`}>
                      {feedback}
                    </div>
                  )}

                  {missionProgress === 5 && (
                    <button
                      onClick={checkQuizAnswer}
                      disabled={!quizAnswer}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#ff6b6b] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t.theCircuit.step4.check}
                    </button>
                  )}

                  {missionProgress === 6 && (
                    <div className="mt-6 bg-gradient-to-r from-[#ff6b6b]/20 to-[#c084fc]/20 border-2 border-[#ff6b6b] rounded-lg p-6 animate-fade-in">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🎉</div>
                        <div className="text-2xl font-bold text-[#ff6b6b] mb-2">Mission complete!</div>
                        <div className="text-gray-300 mb-4">You have received: Proof of Build #3</div>
                        <div className="text-sm text-gray-400">Return to mission list...</div>
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

export default TheCircuit;