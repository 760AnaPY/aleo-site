import React from "react";

const HowItWorksSection = () => {
  return (
    <section id="how" className="bg-[#0a0a0f] text-white px-8 pt-12 pb-2">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
            Technology
          </div>
          <h2 className="text-5xl font-light mb-4">How zkSNARK Works</h2>
          <p className="text-gray-500">
            Prove knowledge without revealing secrets
          </p>
        </div>

        {/* Info Block */}
        <div className="max-w-3xl mx-auto mb-2 border border-gray-900 p-8 rounded">
          <div className="space-y-6 text-sm text-gray-400">
            <p className="leading-relaxed">
              <span className="text-white font-light">
                Zero-Knowledge Succinct Non-Interactive Argument of Knowledge
              </span>{" "}
              is a cryptographic method that allows one party (the prover) to
              prove to another party (the verifier) that a statement is true,
              without revealing any information beyond the validity of the
              statement itself.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">
                  Zero-Knowledge
                </div>
                <div className="text-xs text-gray-500">
                  No secrets revealed during proof
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">
                  Succinct
                </div>
                <div className="text-xs text-gray-500">
                  Small proof, fast verification
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">
                  Non-Interactive
                </div>
                <div className="text-xs text-gray-500">
                  One message, no back-and-forth
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;