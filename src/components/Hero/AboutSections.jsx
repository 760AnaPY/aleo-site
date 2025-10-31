import React from 'react';
import { FiEye, FiLock, FiArrowRight } from 'react-icons/fi';

export const ProblemSection = () => {
  return (
    <section
      id="problem"
      className="px-8 pt-12 pb-4 md:pt-14 md:pb-6 bg-[#0a0a0f] text-white"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text block */}
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
            The Problem
          </div>

          <h2 className="text-5xl font-light mb-8 leading-tight">
            Everything you do<br />
            on-chain is <span className="text-gray-600">public</span>
          </h2>

          <div className="space-y-6 text-gray-400 text-base leading-relaxed">
            <p>
              Every transaction, every balance, every interaction — visible to
              anyone. Your financial history, voting choices, and personal data
              exposed forever.
            </p>
            <p>
              Traditional blockchains prioritize transparency over privacy. But
              privacy isn’t optional — it’s a fundamental right.
            </p>
          </div>
        </div>

        {/* Visual block */}
        <div className="border border-red-900/30 bg-red-950/10 p-8 rounded-xl shadow-inner">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FiEye size={12} />
            Public Blockchain
          </div>

          <div className="space-y-3 font-mono text-xs text-gray-400">
            <div className="flex justify-between border-b border-gray-900 pb-2">
              <span className="text-gray-600">From:</span>
              <span>0x742d35Cc663...</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2">
              <span className="text-gray-600">To:</span>
              <span>0x8f5b2E4A7C9...</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2">
              <span className="text-gray-600">Amount:</span>
              <span className="text-red-400">1,000.00 ETH</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2">
              <span className="text-gray-600">Balance:</span>
              <span className="text-red-400">15,234.50 ETH</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2">
              <span className="text-gray-600">History:</span>
              <span className="text-red-400">2,847 transactions</span>
            </div>

            <div className="pt-3 text-center text-red-500 text-xs">
              ⚠️ ALL DATA PUBLICLY VISIBLE FOREVER
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SolutionSection = () => {
  const scrollToSection = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="solution"
      className="px-8 pt-4 pb-12 md:pt-6 md:pb-14 bg-[#0a0a0f] text-white"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Visual block */}
        <div className="border border-green-900/30 bg-green-950/10 p-8 rounded-xl shadow-inner">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FiLock size={12} />
            Aleo Network
          </div>

          <div className="space-y-3 font-mono text-xs text-gray-400">
            <div className="flex justify-between border-b border-gray-900 pb-2">
              <span className="text-gray-600">From:</span>
              <span>aleo1x7k2m9n...</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2">
              <span className="text-gray-600">To:</span>
              <span className="text-gray-700">ENCRYPTED</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2">
              <span className="text-gray-600">Amount:</span>
              <span className="text-gray-700">ENCRYPTED</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2">
              <span className="text-gray-600">Balance:</span>
              <span className="text-gray-700">ENCRYPTED</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2">
              <span className="text-gray-600">Proof:</span>
              <span className="text-green-400">VERIFIED ✓</span>
            </div>

            <div className="pt-3 text-center text-green-500 text-xs">
              🔒 PRIVATE BY DEFAULT, VALID BY PROOF
            </div>
          </div>
        </div>

        {/* Text block */}
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
            The Solution
          </div>

          <h2 className="text-5xl font-light mb-8 leading-tight">
            Privacy without<br />compromise
          </h2>

          <div className="space-y-6 text-gray-400 text-base leading-relaxed">
            <p>
              Aleo uses zero-knowledge cryptography to prove transactions are
              valid without revealing any sensitive information.
            </p>
            <p>
              Your data stays encrypted on-chain. Always. Only you control who
              sees what.
            </p>

            <div className="pt-4">
              <button
                onClick={() => scrollToSection('how')}
                className="text-sm text-white hover:text-gray-400 transition flex items-center gap-2"
              >
                See how it works
                <FiArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSections = () => (
  <>
    <ProblemSection />
    <SolutionSection />
  </>
);

export default AboutSections;