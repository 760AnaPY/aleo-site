import React, { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiRotateCcw, FiChevronRight, FiLock, FiUnlock, FiEye } from 'react-icons/fi';

const TransactionFlowComparison = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedChain, setSelectedChain] = useState('zkrollup');

  const zkRollupSteps = [
    { title: 'User Transaction', active: ['user'], data: { user: 'Amount: 100 ETH\nTo: 0xABC...' } },
    { title: 'Encryption', active: ['user','encryption'], data: { user: '████', encryption: 'Temp encrypted' } },
    { title: 'Sequencer', active: ['encryption','sequencer'], data: { sequencer: 'Batch #12345' } },
    { title: 'Submit to L1', active: ['sequencer','l1'], data: { l1: 'Calldata revealed ⚠️' } },
    { title: 'L1 Verification', active: ['l1'], data: { l1: '✓ Proof verified, data PUBLIC' } },
  ];

  const aleoSteps = [
    { title: 'User Transaction', active: ['user'], data: { user: 'Amount: 100 ALEO\nTo: aleo1...' } },
    { title: 'Private Execution', active: ['user','execution'], data: { execution: 'transfer_private()' } },
    { title: 'ZK Proof Generation', active: ['execution','proof'], data: { proof: 'π generated privately' } },
    { title: 'Submit to Network', active: ['proof','network'], data: { network: 'Only proof π submitted' } },
    { title: 'Network Verification', active: ['network'], data: { network: '✓ Proof verified, data PRIVATE' } },
  ];

  const steps = selectedChain === 'zkrollup' ? zkRollupSteps : aleoSteps;

  useEffect(() => {
    let interval;
    if (isPlaying && step < steps.length - 1) {
      interval = setInterval(() => setStep(s => s + 1), 2400);
    } else if (step >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step, steps.length]);

  const currentStep = steps[step];
  const isActive = node => currentStep.active.includes(node);

  const switchChain = chain => { setSelectedChain(chain); setStep(0); setIsPlaying(false); };
  const next = () => { if (step < steps.length - 1) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };
  const reset = () => { setStep(0); setIsPlaying(false); };
  const playPause = () => { if (step >= steps.length - 1) setStep(0); setIsPlaying(p => !p); };

  return (
    <section id="flow" className="bg-[#0a0a0f] text-white px-8 pt-2 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#0a0a0f] p-8 rounded-lg border border-[#c084fc]/20 backdrop-blur-sm">
          <div className="text-center mb-8">
          <h2 className="text-4xl font-light mb-2 tracking-wide">Transaction Privacy Flow</h2>
          <p className="text-gray-500 text-sm">Compare how data moves through different systems</p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => switchChain('zkrollup')}
            className={`px-8 py-3 border transition ${selectedChain==='zkrollup' ? 'border-white bg-white text-black' : 'border-gray-900 hover:border-gray-800'}`}
          >
            <div className="flex items-center gap-2"><FiEye size={16} /><span className="text-sm">zkRollup (L2 → L1)</span></div>
          </button>
          <button
            onClick={() => switchChain('aleo')}
            className={`px-8 py-3 border transition ${selectedChain==='aleo' ? 'border-white bg-white text-black' : 'border-gray-900 hover:border-gray-800'}`}
          >
            <div className="flex items-center gap-2"><FiLock size={16} /><span className="text-sm">Aleo (Private)</span></div>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((_, idx) => (
            <div key={idx} className={`h-px transition-all duration-500 ${idx<=step ? 'w-16 bg-white' : 'w-8 bg-gray-900'}`} />
          ))}
        </div>

        {selectedChain === 'zkrollup' ? (
          <div className="mb-8">
            <div className="grid grid-cols-7 gap-4 items-center">
              <div className={`transition-all duration-500 ${isActive('user') ? 'opacity-100 scale-105' : 'opacity-40 scale-100'}`}>
                <div className="border border-gray-900 p-6 rounded min-h-[140px] flex flex-col justify-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">User</div>
                  <div className="text-xs text-gray-400 font-mono whitespace-pre-line">{currentStep.data.user || ''}</div>
                  {step>=0 && <div className="mt-3 flex items-center gap-1 text-xs text-gray-600"><FiUnlock size={10}/> Plain</div>}
                </div>
              </div>
              <div className={`flex justify-center transition-opacity duration-500 ${step>=1 ? 'opacity-100' : 'opacity-20'}`}>
                <FiChevronRight size={16} className="text-gray-800"/>
              </div>
              <div className={`transition-all duration-500 ${isActive('encryption') ? 'opacity-100 scale-105' : 'opacity-40 scale-100'}`}>
                <div className="border border-gray-900 p-6 rounded min-h-[140px] flex flex-col justify-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Encrypt</div>
                  <div className="text-xs text-gray-400 font-mono whitespace-pre-line">{step>=1 ? '████' : ''}</div>
                  {step>=1 && <div className="mt-3 flex items-center gap-1 text-xs text-gray-600"><FiLock size={10}/> Temp</div>}
                </div>
              </div>
              <div className={`flex justify-center transition-opacity duration-500 ${step>=2 ? 'opacity-100' : 'opacity-20'}`}>
                <FiChevronRight size={16} className="text-gray-800"/>
              </div>
              <div className={`transition-all duration-500 ${isActive('sequencer') ? 'opacity-100 scale-105' : 'opacity-40 scale-100'}`}>
                <div className="border border-gray-900 p-6 rounded min-h-[140px] flex flex-col justify-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">L2 Sequencer</div>
                  <div className="text-xs text-gray-400 font-mono whitespace-pre-line">{currentStep.data.sequencer || ''}</div>
                </div>
              </div>
              <div className={`flex justify-center transition-opacity duration-500 ${step>=3 ? 'opacity-100' : 'opacity-20'}`}>
                <FiChevronRight size={16} className="text-gray-700"/>
              </div>
              <div className={`transition-all duration-500 ${isActive('l1') ? 'opacity-100 scale-105' : 'opacity-40 scale-100'}`}>
                <div className={`border p-6 min-h-[140px] flex flex-col justify-center ${currentStep.data.l1 ? 'border-red-900/50 bg-red-950/10' : 'border-gray-900'}`}>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Ethereum L1</div>
                  <div className="text-xs text-gray-400 font-mono whitespace-pre-line">{currentStep.data.l1 || ''}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="grid grid-cols-5 gap-6 items-center max-w-4xl mx-auto">
              <div className={`transition-all duration-500 ${isActive('user') ? 'opacity-100 scale-105' : 'opacity-40 scale-100'}`}>
                <div className="border border-gray-900 p-6 rounded min-h-[160px] flex flex-col justify-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">User</div>
                  <div className="text-xs text-gray-400 font-mono whitespace-pre-line">{currentStep.data.user || ''}</div>
                  {step>=0 && <div className="mt-3 flex items-center gap-1 text-xs text-gray-600"><FiLock size={10}/> Local</div>}
                </div>
              </div>
              <div className={`flex justify-center transition-opacity duration-500 ${step>=1 ? 'opacity-100' : 'opacity-20'}`}>
                <FiChevronRight size={16} className="text-gray-800"/>
              </div>
              <div className={`transition-all duration-500 ${isActive('execution') ? 'opacity-100 scale-105' : 'opacity-40 scale-100'}`}>
                <div className="border border-gray-900 p-6 rounded min-h-[160px] flex flex-col justify-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Execute</div>
                  <div className="text-xs text-gray-400 font-mono whitespace-pre-line">{currentStep.data.execution || ''}</div>
                  {step>=1 && <div className="mt-3 flex items-center gap-1 text-xs text-green-600"><FiLock size={10}/> Private</div>}
                </div>
              </div>
              <div className={`flex justify-center transition-opacity duration-500 ${step>=3 ? 'opacity-100' : 'opacity-20'}`}>
                <FiChevronRight size={16} className="text-gray-800"/>
              </div>
              <div className={`transition-all duration-500 ${isActive('network') ? 'opacity-100 scale-105' : 'opacity-40 scale-100'}`}>
                <div className="border border-gray-900 p-6 rounded min-h-[160px] flex flex-col justify-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Aleo Network</div>
                  <div className="text-xs text-gray-400 font-mono whitespace-pre-line">{currentStep.data.network || ''}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-6 mt-8 max-w-4xl mx-auto">
              <div className="col-start-2"></div>
              <div className={`transition-all duration-500 ${isActive('proof') ? 'opacity-100 scale-105' : 'opacity-40 scale-100'}`}>
                <div className="border border-gray-900 p-6 rounded min-h-[140px] flex flex-col justify-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">ZK Proof π</div>
                  <div className="text-xs text-gray-400 font-mono whitespace-pre-line">{currentStep.data.proof || ''}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-8 min-h-[60px]">
          <div className="text-sm text-gray-500 mb-2">Step {step + 1} / {steps.length}</div>
          <h3 className="text-xl font-light">{currentStep.title}</h3>
        </div>

        <div className="flex justify-center items-center gap-4 mb-8">
          <button onClick={reset} className="p-2 hover:bg-white/5 border border-gray-900 transition" title="Reset">
            <FiRotateCcw size={18} />
          </button>
          <button onClick={prev} disabled={step===0} className="p-2 hover:bg-white/5 border border-gray-900 transition disabled:opacity-30 disabled:cursor-not-allowed">
            <FiChevronRight size={18} className="rotate-180" />
          </button>
          <button onClick={playPause} className="px-6 py-2 border border-white hover:bg-white hover:text-black transition flex items-center gap-2">
            {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
            <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button onClick={next} disabled={step===steps.length-1} className="p-2 hover:bg-white/5 border border-gray-900 transition disabled:opacity-30 disabled:cursor-not-allowed">
            <FiChevronRight size={18} />
          </button>
        </div>

        <div className="border-t border-gray-900 pt-8">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-light mb-2">Privacy Comparison</h4>
            <p className="text-xs text-gray-600">What happens to your transaction data</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-900 p-6 rounded">
              <div className="flex items-center gap-2 mb-4"><FiEye size={16} /><h5 className="text-sm font-light uppercase tracking-wider">zkRollup</h5></div>
              <div className="space-y-4 text-xs text-gray-400">
                <div><div className="text-gray-500 mb-1">L2 Phase:</div>Transactions encrypted temporarily</div>
                <div><div className="text-gray-500 mb-1">L1 Settlement:</div><span className="text-red-500">Calldata published publicly ⚠️</span></div>
                <div><div className="text-gray-500 mb-1">Final State:</div><span className="text-red-500">All data visible on L1</span></div>
                <div className="pt-4 border-t border-gray-900"><div className="text-gray-500 mb-1">Privacy:</div>Temporary, revealed at settlement</div>
              </div>
            </div>
            <div className="border border-gray-900 p-6 rounded">
              <div className="flex items-center gap-2 mb-4"><FiLock size={16} /><h5 className="text-sm font-light uppercase tracking-wider">Aleo</h5></div>
              <div className="space-y-4 text-xs text-gray-400">
                <div><div className="text-gray-500 mb-1">Execution:</div>Private by design, local execution</div>
                <div><div className="text-gray-500 mb-1">Network:</div><span className="text-green-500">Only ZK proof submitted 🔒</span></div>
                <div><div className="text-gray-500 mb-1">Final State:</div><span className="text-green-500">Data never revealed</span></div>
                <div className="pt-4 border-t border-gray-900"><div className="text-gray-500 mb-1">Privacy:</div>Permanent, end-to-end encrypted</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionFlowComparison;