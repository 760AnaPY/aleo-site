import React from 'react';
import { FiChevronDown, FiLock, FiArrowRight } from 'react-icons/fi';

const FirstSections = () => {
  const scrollToSection = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero-top" className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Glowing Orbs (subtle to match site) */}
      <div className="absolute top-24 left-16 w-64 h-64 bg-[#00fff7] rounded-full blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-24 w-96 h-96 bg-[#c084fc] rounded-full blur-[140px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-5xl mx-auto px-8 pt-24 pb-24 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#00fff7]/40 mb-8 text-xs uppercase tracking-wider text-[#00fff7]/80 rounded-md bg-black/30 backdrop-blur">
          <FiLock size={12} className="text-[#00fff7]" />
          Privacy-First Blockchain
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight leading-tight">
          Your transactions
          <br />
          <span className="text-gray-400">should be</span>{' '}
          <span className="bg-gradient-to-r from-[#00fff7] to-[#c084fc] bg-clip-text text-transparent">private</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Aleo is the first platform that enables private applications at scale. Build dApps where data stays encrypted, always.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => scrollToSection('missions')}
            className="px-8 py-4 border border-white/80 hover:bg-white hover:text-black transition flex items-center gap-2 rounded-md"
          >
            THE ZK ODYSSEY
            <FiArrowRight size={16} />
          </button>
          <button
            onClick={() => scrollToSection('about-aleo')}
            className="px-8 py-4 border border-[#00fff7]/40 hover:border-[#00fff7] transition rounded-md"
          >
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-12 border-t border-[#00fff7]/20 pt-12 max-w-3xl mx-auto">
          <div>
            <div className="text-3xl font-light mb-2">100%</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Privacy</div>
          </div>
          <div>
            <div className="text-3xl font-light mb-2">{'<1s'}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Verification</div>
          </div>
          <div>
            <div className="text-3xl font-light mb-2">∞</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Scalability</div>
          </div>
        </div>
      </div>

      {/* Brief Aleo Sections */}
      <div id="about-aleo" className="relative z-10 max-w-6xl mx-auto px-8 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group bg-black/40 backdrop-blur-md border border-[#00fff7]/30 rounded-lg p-6 transition-all hover:border-[#00fff7] hover:shadow-lg hover:shadow-[#00fff7]/20">
            <div className="text-sm text-[#00fff7]/80 mb-2">What is Aleo</div>
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] bg-clip-text text-transparent">
              Privacy-first Layer 1
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Aleo brings zero-knowledge privacy to Web3, enabling applications where sensitive data is encrypted by default.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-black/40 backdrop-blur-md border border-[#00fff7]/30 rounded-lg p-6 transition-all hover:border-[#00fff7] hover:shadow-lg hover:shadow-[#00fff7]/20">
            <div className="text-sm text-[#00fff7]/80 mb-2">How it works</div>
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] bg-clip-text text-transparent">
              Zero-Knowledge Proofs
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Provers generate proofs; verifiers check correctness without seeing your data. Fast verification keeps the network scalable.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-black/40 backdrop-blur-md border border-[#00fff7]/30 rounded-lg p-6 transition-all hover:border-[#00fff7] hover:shadow-lg hover:shadow-[#00fff7]/20">
            <div className="text-sm text-[#00fff7]/80 mb-2">Build at scale</div>
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#00fff7] to-[#c084fc] bg-clip-text text-transparent">
              Encrypted-by-default dApps
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Design user experiences that don't leak information. Compose circuits, deploy applications, and keep privacy intact.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Down to Missions */}
      <button
        onClick={() => scrollToSection('missions')}
        className="absolute left-1/2 -translate-x-1/2 bottom-10 animate-bounce"
        aria-label="Scroll to Missions"
      >
        <FiChevronDown size={28} className="text-gray-500 hover:text-white transition-colors" />
      </button>

      {/* Local styles for minimal animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default FirstSections;