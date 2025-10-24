import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { useLanguage } from '../../contexts/LanguageContext';
// import { useTranslations } from '../../locales/translations';
import * as THREE from 'three';

const TheLedger = ({ onBack, onComplete }) => {
  // const { language } = useLanguage();
  // const t = useTranslations(language);
  const [missionProgress, setMissionProgress] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);
  const [blockComponents, setBlockComponents] = useState({
    header: null,
    proofs: [],
    stateRoot: null
  });
  const [quizAnswer, setQuizAnswer] = useState('');
  // const [showQuiz, setShowQuiz] = useState(false);
  const canvasRef = useRef(null);

  // Mempool simulation state
  const [mempoolTransactions, setMempoolTransactions] = useState([]);
  const [confirmedTransactions, setConfirmedTransactions] = useState([]);
  const [rejectedTransactions, setRejectedTransactions] = useState([]);
  const [hoveredTransaction, setHoveredTransaction] = useState(null);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const simulationIntervalRef = useRef(null);

  // Generate random transaction data
  const generateTransaction = useCallback(() => {
    const types = ['Transfer', 'Deploy', 'Execute', 'Record', 'Claim'];
    const priorities = ['Low', 'Medium', 'High', 'Critical'];
    
    const type = types[Math.floor(Math.random() * types.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const gasPrice = (Math.random() * 0.01 + 0.001).toFixed(4);
    const amount = (Math.random() * 1000 + 1).toFixed(2);
    
    return {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      priority,
      gasPrice: `${gasPrice} ALEO`,
      amount: `${amount} ALEO`,
      from: `aleo1${Math.random().toString(36).substr(2, 20)}`,
      to: `aleo1${Math.random().toString(36).substr(2, 20)}`,
      proof: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`,
      timestamp: new Date().toLocaleTimeString(),
      status: 'Pending',
      animationDelay: Math.random() * 2
    };
  }, []);

  // Start mempool simulation
  const startMempoolSimulation = useCallback(() => {
    if (isSimulationRunning) return;
    
    setIsSimulationRunning(true);
    
    // Add initial transactions
    const initialTxs = Array.from({ length: 5 }, generateTransaction);
    setMempoolTransactions(initialTxs);
    
    // Start simulation interval
    simulationIntervalRef.current = setInterval(() => {
      setMempoolTransactions(prev => {
        const newTx = generateTransaction();
        const updated = [...prev, newTx];
        
        // Process transactions (simulate validation)
        setTimeout(() => {
          const shouldConfirm = Math.random() > 0.3; // 70% success rate
          
          if (shouldConfirm) {
            setConfirmedTransactions(prevConfirmed => [...prevConfirmed, newTx]);
          } else {
            setRejectedTransactions(prevRejected => [...prevRejected, newTx]);
          }
          
          // Remove from mempool
          setMempoolTransactions(prevMempool => 
            prevMempool.filter(tx => tx.id !== newTx.id)
          );
        }, 2000 + Math.random() * 3000); // 2-5 seconds processing time
        
        return updated;
      });
    }, 1500 + Math.random() * 2000); // New transaction every 1.5-3.5 seconds
  }, [isSimulationRunning, generateTransaction]);

  // Stop mempool simulation
  const stopMempoolSimulation = useCallback(() => {
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current);
      simulationIntervalRef.current = null;
    }
    setIsSimulationRunning(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, []);

  // 3D Visualization for blockchain structure
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 5;

    // Create blockchain visualization
    const group = new THREE.Group();
    
    // Block structure
    const blockGeometry = new THREE.BoxGeometry(2, 3, 0.5);
    const blockMaterial = new THREE.MeshBasicMaterial({
      color: 0x00fff7,
      transparent: true,
      opacity: 0.8,
    });
    const block = new THREE.Mesh(blockGeometry, blockMaterial);
    block.position.set(0, 0, 0);
    group.add(block);

    // Merkle root
    const rootGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const rootMaterial = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.9,
    });
    const merkleRoot = new THREE.Mesh(rootGeometry, rootMaterial);
    merkleRoot.position.set(0, 1.2, 0.3);
    group.add(merkleRoot);

    // Transaction proofs
    const proofPositions = [
      { x: -0.8, y: 0.3, z: 0.3 },
      { x: 0, y: 0.3, z: 0.3 },
      { x: 0.8, y: 0.3, z: 0.3 }
    ];

    proofPositions.forEach((pos) => {
      const proofGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4, 8);
      const proofMaterial = new THREE.MeshBasicMaterial({
        color: 0x50fa7b,
        transparent: true,
        opacity: 0.8,
      });
      const proof = new THREE.Mesh(proofGeometry, proofMaterial);
      proof.position.set(pos.x, pos.y, pos.z);
      group.add(proof);
    });

    scene.add(group);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      merkleRoot.rotation.x += 0.01;
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
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

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

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (target) => {
    if (draggedItem && target) {
      setBlockComponents(prev => ({
        ...prev,
        [target]: draggedItem
      }));
    }
    setDraggedItem(null);
  };

  const handleQuizSubmit = () => {
    if (quizAnswer.toLowerCase().includes('merkle') || 
        quizAnswer.toLowerCase().includes('root') ||
        quizAnswer.toLowerCase().includes('hash')) {
      completeMissionStep();
    } else {
      alert('Incorrect! Think about what ensures block immutability...');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden relative">
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.1 }}
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
            ← BACK TO MISSIONS
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-400">Progress</div>
            <div className="text-[#00fff7] font-bold">{missionProgress}/5 Steps</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Mission Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl font-bold text-[#00fff7]">⚙️</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">Act VI — The Ledger</h1>
                <p className="text-gray-400">Inside the Aleo Blockchain</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
                ADVANCED
              </span>
              <span className="px-3 py-1 bg-[#c084fc]/10 border border-[#c084fc]/30 rounded text-[#c084fc] text-sm">
                Ledger Master Badge
              </span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-8">
            {/* Step 1 - Realistic Mempool Simulation */}
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
                  <h3 className="text-xl font-semibold">Realistic Mempool Simulation</h3>
                </div>
                <div className="flex gap-2">
                  {!isSimulationRunning ? (
                    <button
                      onClick={startMempoolSimulation}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                    >
                      ▶️ Start Simulation
                    </button>
                  ) : (
                    <button
                      onClick={stopMempoolSimulation}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                    >
                      ⏹️ Stop Simulation
                    </button>
                  )}
                </div>
              </div>

              <div className="ml-11 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Watch real-time transaction flow in the mempool. Hover over transactions to see details. 
                  Watch them get confirmed into blocks or rejected to the trash.
                </p>

                <div className="bg-gradient-to-r from-[#0a0a0f] to-[#1a1a2e] border border-[#00fff7]/30 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-[#00fff7] mb-4">📦 Live Mempool Dashboard</h4>
                  
                  {/* Mempool Transactions */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-md font-semibold text-[#50fa7b]">Pending Transactions ({mempoolTransactions.length})</h5>
                      <div className="text-xs text-gray-400">Hover to see details</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                      {mempoolTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className={`bg-black/60 border rounded p-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                            hoveredTransaction?.id === tx.id 
                              ? 'border-[#50fa7b] bg-[#50fa7b]/10' 
                              : 'border-[#50fa7b]/30'
                          }`}
                          onMouseEnter={() => setHoveredTransaction(tx)}
                          onMouseLeave={() => setHoveredTransaction(null)}
                          style={{ 
                            animationDelay: `${tx.animationDelay}s`,
                            animation: 'slideInFromRight 0.5s ease-out'
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[#50fa7b] font-bold text-sm">{tx.type}</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              tx.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                              tx.priority === 'High' ? 'bg-orange-500/20 text-orange-400' :
                              tx.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {tx.priority}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 font-mono">{tx.id.slice(0, 12)}...</div>
                          <div className="text-xs text-gray-500 mt-1">{tx.gasPrice}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Confirmed Transactions */}
                  <div className="mb-6">
                    <h5 className="text-md font-semibold text-green-400 mb-3">Confirmed Transactions ({confirmedTransactions.length})</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-32 overflow-y-auto">
                      {confirmedTransactions.slice(-6).map((tx, idx) => (
                        <div
                          key={tx.id}
                          className="bg-green-500/10 border border-green-500/30 rounded p-3 transition-all duration-500"
                          style={{ 
                            animation: 'slideToBlock 1s ease-out',
                            animationDelay: `${idx * 0.1}s`
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-green-400 font-bold text-sm">{tx.type}</span>
                            <span className="text-green-400 text-xs">✓ Confirmed</span>
                          </div>
                          <div className="text-xs text-gray-400 font-mono">{tx.id.slice(0, 12)}...</div>
                          <div className="text-xs text-gray-500 mt-1">Added to Block #{Math.floor(Math.random() * 1000) + 1000}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rejected Transactions */}
                  <div className="mb-6">
                    <h5 className="text-md font-semibold text-red-400 mb-3">Rejected Transactions ({rejectedTransactions.length})</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-32 overflow-y-auto">
                      {rejectedTransactions.slice(-6).map((tx, idx) => (
                        <div
                          key={tx.id}
                          className="bg-red-500/10 border border-red-500/30 rounded p-3 transition-all duration-500"
                          style={{ 
                            animation: 'slideToTrash 1s ease-out',
                            animationDelay: `${idx * 0.1}s`
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-red-400 font-bold text-sm">{tx.type}</span>
                            <span className="text-red-400 text-xs">✗ Rejected</span>
                          </div>
                          <div className="text-xs text-gray-400 font-mono">{tx.id.slice(0, 12)}...</div>
                          <div className="text-xs text-gray-500 mt-1">Invalid proof or insufficient gas</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transaction Details Modal */}
                  {hoveredTransaction && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setHoveredTransaction(null)}>
                      <div className="bg-[#0a0a0f] border border-[#00fff7]/30 rounded-lg p-6 max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
                        <h6 className="text-lg font-bold text-[#00fff7] mb-4">Transaction Details</h6>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">ID:</span>
                            <span className="text-white font-mono">{hoveredTransaction.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Type:</span>
                            <span className="text-white">{hoveredTransaction.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Priority:</span>
                            <span className="text-white">{hoveredTransaction.priority}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Amount:</span>
                            <span className="text-white">{hoveredTransaction.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Gas Price:</span>
                            <span className="text-white">{hoveredTransaction.gasPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">From:</span>
                            <span className="text-white font-mono text-xs">{hoveredTransaction.from}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">To:</span>
                            <span className="text-white font-mono text-xs">{hoveredTransaction.to}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Proof:</span>
                            <span className="text-white font-mono text-xs">{hoveredTransaction.proof}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Time:</span>
                            <span className="text-white">{hoveredTransaction.timestamp}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setHoveredTransaction(null)}
                          className="mt-4 w-full bg-[#00fff7] text-black font-bold py-2 rounded hover:opacity-90 transition-opacity"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="bg-black/40 border border-[#00fff7]/20 rounded p-4">
                    <div className="text-sm text-[#00fff7] mb-3">Live Transaction Flow:</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-[#50fa7b]">1.</span>
                        <span>Transaction submitted to mempool</span>
                        <span className="text-[#50fa7b] text-xs">({mempoolTransactions.length} pending)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#c084fc]">2.</span>
                        <span>Validators pick up transaction</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#00fff7]">3.</span>
                        <span>Proof verification begins</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-green-400">4.</span>
                        <span>Transaction added to block</span>
                        <span className="text-green-400 text-xs">({confirmedTransactions.length} confirmed)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-red-400">5.</span>
                        <span>Invalid transactions rejected</span>
                        <span className="text-red-400 text-xs">({rejectedTransactions.length} rejected)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {missionProgress === 0 && (
                  <button
                    onClick={completeMissionStep}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                  >
                    UNDERSTAND MEMPOOL →
                  </button>
                )}
              </div>
            </div>

            {/* Step 2 - Block Structure */}
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
                  <h3 className="text-xl font-semibold">Block Structure Analysis</h3>
                </div>
              </div>

              {missionProgress >= 1 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    Explore the interactive block structure. Click on Merkle root to see its connection to account state.
                  </p>

                  <div className="bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] border border-[#00fff7]/30 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-[#00fff7] mb-4">🧱 Interactive Block Explorer</h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Block Header */}
                      <div className="space-y-4">
                        <div className="bg-black/60 border border-[#00fff7]/30 rounded p-4">
                          <div className="text-[#00fff7] font-bold mb-3">Block Header</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Height:</span>
                              <span className="text-white">#1,234,567</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Previous Hash:</span>
                              <span className="text-white font-mono">0x4A2B...</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Timestamp:</span>
                              <span className="text-white">2024-01-15 14:30:22</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Nonce:</span>
                              <span className="text-white">42,069</span>
                            </div>
                          </div>
                        </div>

                        {/* Merkle Root */}
                        <div className="bg-black/60 border border-[#c084fc]/30 rounded p-4 cursor-pointer hover:border-[#c084fc] transition-colors">
                          <div className="text-[#c084fc] font-bold mb-3 flex items-center gap-2">
                            <span>🔗</span>
                            Merkle Root (Clickable)
                          </div>
                          <div className="text-sm text-gray-400 font-mono">0x8F7E6D5C4B3A2918</div>
                          <div className="text-xs text-gray-500 mt-1">Links to account state tree</div>
                        </div>
                      </div>

                      {/* Block Body */}
                      <div className="space-y-4">
                        <div className="bg-black/60 border border-[#50fa7b]/30 rounded p-4">
                          <div className="text-[#50fa7b] font-bold mb-3">Transaction Proofs</div>
                          <div className="space-y-2">
                            {['0x7F3A...B92E', '0x4C2D...A81F', '0x9E5B...C73D'].map((proof, idx) => (
                              <div key={idx} className="text-sm text-gray-400 font-mono bg-black/40 p-2 rounded">
                                Proof #{idx + 1}: {proof}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-black/60 border border-[#ff79c6]/30 rounded p-4">
                          <div className="text-[#ff79c6] font-bold mb-3">State Root</div>
                          <div className="text-sm text-gray-400 font-mono">0x2A1B9C8D7E6F5A4B</div>
                          <div className="text-xs text-gray-500 mt-1">Current blockchain state</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-black/40 border border-[#00fff7]/20 rounded p-4">
                      <div className="text-sm text-[#00fff7] mb-3">Block Integrity Chain:</div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>Previous Hash → Current Block → Next Hash</div>
                        <div>Merkle Root → State Commitment → Account Tree</div>
                        <div>Proofs → Validation → Consensus</div>
                      </div>
                    </div>
                  </div>

                  {missionProgress === 1 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      EXPLORE BLOCK STRUCTURE →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 3 - State Commitment */}
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
                  <h3 className="text-xl font-semibold">State Commitment</h3>
                </div>
              </div>

              {missionProgress >= 2 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    Understand how global state updates work through account tree and record tree.
                  </p>

                  <div className="bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] border border-[#00fff7]/30 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-[#00fff7] mb-4">🌳 State Tree Visualization</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Account Tree */}
                      <div className="bg-black/60 border border-[#00fff7]/30 rounded p-4">
                        <div className="text-[#00fff7] font-bold mb-4">Account Tree</div>
                        <div className="space-y-3">
                          <div className="bg-black/40 p-3 rounded">
                            <div className="text-sm font-semibold text-white">Root Node</div>
                            <div className="text-xs text-gray-400 font-mono">0x2A1B9C8D7E6F5A4B</div>
                          </div>
                          <div className="ml-4 space-y-2">
                            <div className="bg-black/40 p-2 rounded">
                              <div className="text-sm text-gray-300">Alice Account</div>
                              <div className="text-xs text-gray-500">Balance: 100 ALEO</div>
                            </div>
                            <div className="bg-black/40 p-2 rounded">
                              <div className="text-sm text-gray-300">Bob Account</div>
                              <div className="text-xs text-gray-500">Balance: 50 ALEO</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Record Tree */}
                      <div className="bg-black/60 border border-[#c084fc]/30 rounded p-4">
                        <div className="text-[#c084fc] font-bold mb-4">Record Tree</div>
                        <div className="space-y-3">
                          <div className="bg-black/40 p-3 rounded">
                            <div className="text-sm font-semibold text-white">Root Node</div>
                            <div className="text-xs text-gray-400 font-mono">0x8F7E6D5C4B3A2918</div>
                          </div>
                          <div className="ml-4 space-y-2">
                            <div className="bg-black/40 p-2 rounded">
                              <div className="text-sm text-gray-300">Record #1</div>
                              <div className="text-xs text-gray-500">Encrypted data</div>
                            </div>
                            <div className="bg-black/40 p-2 rounded">
                              <div className="text-sm text-gray-300">Record #2</div>
                              <div className="text-xs text-gray-500">Encrypted data</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-black/40 border border-[#00fff7]/20 rounded p-4">
                      <div className="text-sm text-[#00fff7] mb-3">State Update Process:</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-[#50fa7b]">1.</span>
                          <span>Transaction modifies account balances</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#c084fc]">2.</span>
                          <span>New records are created/consumed</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#00fff7]">3.</span>
                          <span>Tree roots are recalculated</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#ff79c6]">4.</span>
                          <span>State commitment is updated</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {missionProgress === 2 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      UNDERSTAND STATE COMMITMENT →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 4 - Build Block Manually */}
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
                  <h3 className="text-xl font-semibold">Build Block Manually</h3>
                </div>
              </div>

              {missionProgress >= 3 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    Drag and drop proof, header, and state root to the correct positions to build a block.
                  </p>

                  <div className="bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] border border-[#00fff7]/30 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-[#00fff7] mb-4">🧩 Block Builder Challenge</h4>
                    
                    {/* Draggable Items */}
                    <div className="mb-6">
                      <div className="text-sm text-gray-400 mb-3">Drag these components to the block:</div>
                      <div className="flex gap-4">
                        <div
                          draggable
                          onDragStart={() => handleDragStart('header')}
                          className="bg-[#00fff7]/20 border border-[#00fff7] rounded p-3 cursor-move hover:bg-[#00fff7]/30 transition-colors"
                        >
                          <div className="text-sm font-bold text-[#00fff7]">Header</div>
                          <div className="text-xs text-gray-400">Block metadata</div>
                        </div>
                        <div
                          draggable
                          onDragStart={() => handleDragStart('proofs')}
                          className="bg-[#50fa7b]/20 border border-[#50fa7b] rounded p-3 cursor-move hover:bg-[#50fa7b]/30 transition-colors"
                        >
                          <div className="text-sm font-bold text-[#50fa7b]">Proofs</div>
                          <div className="text-xs text-gray-400">Transaction proofs</div>
                        </div>
                        <div
                          draggable
                          onDragStart={() => handleDragStart('stateRoot')}
                          className="bg-[#c084fc]/20 border border-[#c084fc] rounded p-3 cursor-move hover:bg-[#c084fc]/30 transition-colors"
                        >
                          <div className="text-sm font-bold text-[#c084fc]">State Root</div>
                          <div className="text-xs text-gray-400">Merkle root</div>
                        </div>
                      </div>
                    </div>

                    {/* Block Structure */}
                    <div className="bg-black/60 border-2 border-dashed border-[#00fff7]/30 rounded-lg p-6 min-h-[200px]">
                      <div className="text-sm text-gray-400 mb-4">Drop components here to build the block:</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div
                          onDrop={() => handleDrop('header')}
                          onDragOver={(e) => e.preventDefault()}
                          className={`border-2 border-dashed rounded p-4 min-h-[100px] flex items-center justify-center ${
                            blockComponents.header ? 'border-[#00fff7] bg-[#00fff7]/10' : 'border-gray-600'
                          }`}
                        >
                          {blockComponents.header ? (
                            <div className="text-center">
                              <div className="text-[#00fff7] font-bold">✓ Header</div>
                              <div className="text-xs text-gray-400">Placed correctly</div>
                            </div>
                          ) : (
                            <div className="text-gray-500 text-sm">Drop Header here</div>
                          )}
                        </div>
                        
                        <div
                          onDrop={() => handleDrop('proofs')}
                          onDragOver={(e) => e.preventDefault()}
                          className={`border-2 border-dashed rounded p-4 min-h-[100px] flex items-center justify-center ${
                            blockComponents.proofs ? 'border-[#50fa7b] bg-[#50fa7b]/10' : 'border-gray-600'
                          }`}
                        >
                          {blockComponents.proofs ? (
                            <div className="text-center">
                              <div className="text-[#50fa7b] font-bold">✓ Proofs</div>
                              <div className="text-xs text-gray-400">Placed correctly</div>
                            </div>
                          ) : (
                            <div className="text-gray-500 text-sm">Drop Proofs here</div>
                          )}
                        </div>
                        
                        <div
                          onDrop={() => handleDrop('stateRoot')}
                          onDragOver={(e) => e.preventDefault()}
                          className={`border-2 border-dashed rounded p-4 min-h-[100px] flex items-center justify-center ${
                            blockComponents.stateRoot ? 'border-[#c084fc] bg-[#c084fc]/10' : 'border-gray-600'
                          }`}
                        >
                          {blockComponents.stateRoot ? (
                            <div className="text-center">
                              <div className="text-[#c084fc] font-bold">✓ State Root</div>
                              <div className="text-xs text-gray-400">Placed correctly</div>
                            </div>
                          ) : (
                            <div className="text-gray-500 text-sm">Drop State Root here</div>
                          )}
                        </div>
                      </div>

                      {blockComponents.header && blockComponents.proofs && blockComponents.stateRoot && (
                        <div className="mt-4 text-center">
                          <div className="text-green-400 font-bold text-lg">🎉 Block Built Successfully!</div>
                          <div className="text-sm text-gray-400">All components placed correctly</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {missionProgress === 3 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      BUILD BLOCK →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Step 5 - Knowledge Quiz */}
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
                  <h3 className="text-xl font-semibold">Knowledge Test</h3>
                </div>
              </div>

              {missionProgress >= 4 && (
                <div className="ml-11 space-y-4 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">
                    Final test: What element ensures block immutability? Prove your understanding.
                  </p>

                  <div className="bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] border border-[#00fff7]/30 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-[#00fff7] mb-4">🧠 Ultimate Knowledge Challenge</h4>
                    
                    <div className="space-y-4">
                      <div className="bg-black/60 border border-[#00fff7]/20 rounded p-4">
                        <div className="text-sm font-bold text-white mb-2">Question:</div>
                        <div className="text-gray-300">
                          What element in the blockchain structure ensures that blocks cannot be modified after they are created?
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm text-gray-400">Your answer:</div>
                        <input
                          type="text"
                          value={quizAnswer}
                          onChange={(e) => setQuizAnswer(e.target.value)}
                          placeholder="Type your answer here..."
                          className="w-full bg-black/60 border border-[#00fff7]/30 rounded p-3 text-white placeholder-gray-500 focus:border-[#00fff7] focus:outline-none"
                        />
                      </div>

                      <div className="bg-black/40 border border-[#c084fc]/20 rounded p-4">
                        <div className="text-sm text-[#c084fc] mb-2">💡 Hint:</div>
                        <div className="text-xs text-gray-400">
                          Think about cryptographic hashing and how each block references the previous one...
                        </div>
                      </div>

                      <button
                        onClick={handleQuizSubmit}
                        className="w-full bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold py-3 rounded hover:opacity-90 transition-opacity"
                      >
                        SUBMIT ANSWER
                      </button>
                    </div>
                  </div>

                  {missionProgress === 4 && (
                    <button
                      onClick={completeMissionStep}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold rounded hover:opacity-90 transition-opacity"
                    >
                      START QUIZ →
                    </button>
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
        @keyframes slideInFromRight {
          from { 
            opacity: 0; 
            transform: translateX(100px) scale(0.8); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        @keyframes slideToBlock {
          from { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
          to { 
            opacity: 0.8; 
            transform: translateX(-200px) scale(0.9); 
          }
        }
        @keyframes slideToTrash {
          from { 
            opacity: 1; 
            transform: translateX(0) scale(1) rotate(0deg); 
          }
          to { 
            opacity: 0.6; 
            transform: translateX(200px) scale(0.7) rotate(15deg); 
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default TheLedger;