import React, { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiRotateCcw, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const ZKSnarkDiagram = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: "Secret Input",
      description: "Alice has a secret solution",
      prover: { status: "active", text: "Secret: [5,3,4...]" },
      circuit: { status: "idle", text: "" },
      verifier: { status: "idle", text: "" }
    },
    {
      title: "Public Input",
      description: "Bob sees only the puzzle",
      prover: { status: "idle", text: "Secret: [5,3,4...]" },
      circuit: { status: "idle", text: "" },
      verifier: { status: "active", text: "Public: Empty board" }
    },
    {
      title: "Circuit Creation",
      description: "Rules become equations",
      prover: { status: "idle", text: "Secret: [5,3,4...]" },
      circuit: { status: "active", text: "R1CS\nConstraints" },
      verifier: { status: "idle", text: "Public: Empty board" }
    },
    {
      title: "Proof Generation",
      description: "Creating compact proof",
      prover: { status: "active", text: "Generating π..." },
      circuit: { status: "active", text: "Computing\nPolynomials" },
      verifier: { status: "idle", text: "Waiting..." }
    },
    {
      title: "Proof Ready",
      description: "128 bytes, no secrets revealed",
      prover: { status: "complete", text: "π sent →" },
      circuit: { status: "complete", text: "Proof: π\n128 bytes" },
      verifier: { status: "idle", text: "Waiting..." }
    },
    {
      title: "Verification",
      description: "Bob checks the proof",
      prover: { status: "complete", text: "" },
      circuit: { status: "idle", text: "Proof: π" },
      verifier: { status: "active", text: "Verifying..." }
    },
    {
      title: "Complete",
      description: "Valid proof, secret preserved",
      prover: { status: "complete", text: "" },
      circuit: { status: "complete", text: "✓" },
      verifier: { status: "complete", text: "Valid: ✓\nSecret: Unknown" }
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && step < steps.length - 1) {
      interval = setInterval(() => {
        setStep(s => s + 1);
      }, 2500);
    } else if (step >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step]);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (step >= steps.length - 1) {
      setStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const currentStep = steps[step];

  const getBoxStyle = (status) => {
    switch(status) {
      case 'active':
        return 'border-[#00fff7] bg-[#00fff7]/5';
      case 'complete':
        return 'border-[#c084fc] bg-[#c084fc]/10';
      default:
        return 'border-gray-700 bg-black/20';
    }
  };

  return (
    <div className="bg-[#0a0a0f] text-white p-8 rounded-lg border border-[#00fff7]/20 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-light mb-2 tracking-wide bg-gradient-to-r from-[#00fff7] to-[#c084fc] bg-clip-text text-transparent">zkSNARK</h2>
        <p className="text-gray-500 text-xs">Zero-Knowledge Succinct Non-Interactive Argument of Knowledge</p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center gap-1 mb-8">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={`h-px transition-all duration-500 ${
              idx <= step ? 'w-8 bg-[#00fff7]' : 'w-4 bg-gray-800'
            }`}
          />
        ))}
      </div>

      {/* Main Flow */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        
        {/* Prover */}
        <div className="space-y-3">
          <div className="text-center text-xs text-gray-500 uppercase tracking-wider mb-4">
            Prover
          </div>
          <div className={`border ${getBoxStyle(currentStep.prover.status)} transition-all duration-500 p-4 min-h-[120px] flex items-center justify-center rounded`}>
            <div className="text-center">
              <div className="text-xs text-gray-400 font-mono whitespace-pre-line">
                {currentStep.prover.text}
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-600">
            Alice
          </div>
        </div>

        {/* Circuit/Proof */}
        <div className="space-y-3">
          <div className="text-center text-xs text-gray-500 uppercase tracking-wider mb-4">
            Circuit
          </div>
          <div className={`border ${getBoxStyle(currentStep.circuit.status)} transition-all duration-500 p-4 min-h-[120px] flex items-center justify-center relative rounded`}>
            <div className="text-center">
              <div className="text-xs text-gray-400 font-mono whitespace-pre-line">
                {currentStep.circuit.text}
              </div>
            </div>
            
            {/* Flow arrows */}
            {step >= 4 && step < 6 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6">
                <div className="flex items-center">
                  <div className="w-8 h-px bg-[#00fff7]/30" />
                  <FiChevronRight size={10} className="text-[#00fff7]/30" />
                </div>
              </div>
            )}
          </div>
          <div className="text-center text-xs text-gray-600">
            ZK Magic
          </div>
        </div>

        {/* Verifier */}
        <div className="space-y-3">
          <div className="text-center text-xs text-gray-500 uppercase tracking-wider mb-4">
            Verifier
          </div>
          <div className={`border ${getBoxStyle(currentStep.verifier.status)} transition-all duration-500 p-4 min-h-[120px] flex items-center justify-center rounded`}>
            <div className="text-center">
              <div className="text-xs text-gray-400 font-mono whitespace-pre-line">
                {currentStep.verifier.text}
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-600">
            Bob
          </div>
        </div>
      </div>

      {/* Step Info */}
      <div className="text-center mb-8 min-h-[60px]">
        <div className="text-sm text-gray-500 mb-1">
          Step {step + 1} / {steps.length}
        </div>
        <h3 className="text-lg font-light mb-1">{currentStep.title}</h3>
        <p className="text-gray-500 text-xs">{currentStep.description}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={handleReset}
          className="p-2 hover:bg-white/5 border border-gray-800 transition rounded"
          title="Reset"
        >
          <FiRotateCcw size={14} />
        </button>
        
        <button
          onClick={handlePrev}
          disabled={step === 0}
          className="p-2 hover:bg-white/5 border border-gray-800 transition rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FiChevronLeft size={14} />
        </button>

        <button
          onClick={togglePlay}
          className="px-4 py-2 border border-[#00fff7] hover:bg-[#00fff7] hover:text-black transition flex items-center gap-2 rounded text-sm"
        >
          {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <button
          onClick={handleNext}
          disabled={step === steps.length - 1}
          className="p-2 hover:bg-white/5 border border-gray-800 transition rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FiChevronRight size={14} />
        </button>
      </div>

      {/* Key Properties */}
      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-900 pt-6">
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Zero-Knowledge</div>
          <p className="text-xs text-gray-600">No secrets revealed</p>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Succinct</div>
          <p className="text-xs text-gray-600">Fast verification</p>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Sound</div>
          <p className="text-xs text-gray-600">Cannot fake proof</p>
        </div>
      </div>
    </div>
  );
};

export default ZKSnarkDiagram;