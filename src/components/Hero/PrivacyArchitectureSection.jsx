import React from "react";

const PrivacyArchitectureSection = () => {
  return (
    <section id="architecture" className="bg-[#0a0a0f] text-white px-8 pt-12 pb-2">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
            Architecture
          </div>
          <h2 className="text-5xl font-light mb-4">End-to-End Privacy</h2>
          <p className="text-gray-500">
            Compare zkRollup vs Aleo transaction flow
          </p>
        </div>

        {/* Info Block (aligned styling with adjacent sections) */}
        <div className="max-w-4xl mx-auto mb-12 border border-gray-900 p-8 rounded-lg">
          <div className="space-y-6 text-sm text-gray-400">
            <p className="leading-relaxed">
              <span className="text-white font-light">
                Not all “zero-knowledge” solutions are truly private.
              </span>{" "}
              Many zkRollups use ZK proofs only for scalability, not privacy.
              Transaction data still gets published publicly to L1 for data
              availability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-900">
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  zkRollup (L2 → L1)
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  Temporary encryption on L2, but calldata (amounts, addresses)
                  revealed when settling to Ethereum L1. Privacy is temporary,
                  transparency is permanent.
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Aleo (Private L1)
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  End-to-end encryption. Only ZK proofs submitted to network, no
                  calldata, no amounts, no addresses. Privacy is permanent, by
                  design.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagram removed per request */}
      </div>
    </section>
  );
};

export default PrivacyArchitectureSection;