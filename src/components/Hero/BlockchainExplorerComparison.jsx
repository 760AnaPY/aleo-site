import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiUnlock } from 'react-icons/fi';

const BlockchainExplorerComparison = () => {
  const [revealedFields, setRevealedFields] = useState({});
  const [hoveredField, setHoveredField] = useState(null);

  const aleoTransactions = [
    { hash: "at1qx7j8k2m9...", from: "aleo1x7k2m9n4...", to: "ENCRYPTED", amount: "ENCRYPTED", function: "transfer_private", fee: "0.0001", time: "2m ago", encryptedData: { to: "aleo1p8q9r2s3t4u5v6w7x8y9z0...", amount: "1000.00 ALEO" } },
    { hash: "at1p8q9r2s3...", from: "aleo1m4n5o6p7...", to: "ENCRYPTED", amount: "ENCRYPTED", function: "transfer_private", fee: "0.0001", time: "5m ago", encryptedData: { to: "aleo1a2b3c4d5e6f7g8h9i0j1k2...", amount: "250.50 ALEO" } },
    { hash: "at1a2b3c4d5...", from: "aleo1y9z8x7w6...", to: "aleo1j2k3l4m5...", amount: "50.00 ALEO", function: "transfer_public", fee: "0.0001", time: "8m ago", encryptedData: null }
  ];

  const ethereumTransactions = [
    { hash: "0x7f3c8d9e2a1b...", from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", to: "0x8f5b2E4A7C9D3F1B6E8A4D7C2F9B3E6A1C8D5F2", amount: "1000.00 ETH", fee: "0.0024", time: "2m ago" },
    { hash: "0x2b4e7c1f9d3a...", from: "0xA1B2C3D4E5F6789012345678901234567890ABCD", to: "0x123456789ABCDEF0123456789ABCDEF012345678", amount: "250.50 ETH", fee: "0.0019", time: "5m ago" },
    { hash: "0x9c8d7e6f5a4b...", from: "0xDEF0123456789ABCDEF0123456789ABCDEF01234", to: "0x567890ABCDEF0123456789ABCDEF0123456789AB", amount: "50.00 ETH", fee: "0.0015", time: "8m ago" }
  ];

  const toggleReveal = (chain, txHash, field) => {
    const key = `${chain}-${txHash}-${field}`;
    setRevealedFields(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isRevealed = (chain, txHash, field) => {
    return revealedFields[`${chain}-${txHash}-${field}`];
  };

  const ExplorerPanel = ({ chain, title, icon, transactions }) => {
    return (
      <div className="bg-[#0a0a0f] border border-gray-900 rounded p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="text-sm font-medium">{title}</h3>
          </div>
          <div className="text-[10px] text-gray-600">{chain === 'aleo' ? 'Private by default' : 'Fully transparent'}</div>
        </div>
        <div className="space-y-3">
          {transactions.map((tx, idx) => (
            <div key={`${chain}-${idx}`} className="border border-gray-800 hover:border-gray-700 transition rounded">
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Tx</div>
                    <div className="font-mono text-xs text-gray-300">{tx.hash}</div>
                  </div>
                  <div className="text-[10px] text-gray-600">{tx.time}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">From</div>
                    <div className="font-mono text-[11px] text-gray-400 break-all">{tx.from}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">To</div>
                    {chain === 'aleo' && tx.to === 'ENCRYPTED' ? (
                      <button
                        onClick={() => toggleReveal(chain, tx.hash, 'to')}
                        onMouseEnter={() => setHoveredField(`${chain}-${tx.hash}-to`)}
                        onMouseLeave={() => setHoveredField(null)}
                        className="group flex items-center gap-2 font-mono text-[11px] hover:text-white transition"
                      >
                        {isRevealed(chain, tx.hash, 'to') ? (
                          <span className="text-gray-400 break-all">{tx.encryptedData.to}</span>
                        ) : (
                          <>
                            <FiEyeOff size={12} className="flex-shrink-0" />
                            <span className="text-gray-600">ENCRYPTED</span>
                            {hoveredField === `${chain}-${tx.hash}-to` && (
                              <span className="text-gray-700 text-[10px] ml-2">(click to reveal)</span>
                            )}
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="font-mono text-[11px] text-gray-400 break-all">{tx.to}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Amount</div>
                    {chain === 'aleo' && tx.amount === 'ENCRYPTED' ? (
                      <button
                        onClick={() => toggleReveal(chain, tx.hash, 'amount')}
                        onMouseEnter={() => setHoveredField(`${chain}-${tx.hash}-amount`)}
                        onMouseLeave={() => setHoveredField(null)}
                        className="group flex items-center gap-2 font-mono text-[11px] hover:text-white transition"
                      >
                        {isRevealed(chain, tx.hash, 'amount') ? (
                          <span className="text-gray-400">{tx.encryptedData.amount}</span>
                        ) : (
                          <>
                            <FiEyeOff size={12} className="flex-shrink-0" />
                            <span className="text-gray-600">ENCRYPTED</span>
                            {hoveredField === `${chain}-${tx.hash}-amount` && (
                              <span className="text-gray-700 text-[10px] ml-2">(click to reveal)</span>
                            )}
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="font-mono text-[11px] text-gray-400">{tx.amount}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Fee</div>
                    <div className="font-mono text-[11px] text-gray-400">{tx.fee} {chain === 'aleo' ? 'ALEO' : 'ETH'}</div>
                  </div>
                  {chain === 'aleo' && (
                    <div className="col-span-2">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Function</div>
                      <div className="inline-flex items-center gap-2 px-2 py-1 border border-gray-800 text-[11px] font-mono rounded">
                        {tx.function === 'transfer_private' && <FiLock size={12} />}
                        {tx.function}
                      </div>
                    </div>
                  )}
                </div>
                {chain === 'aleo' && tx.to === 'ENCRYPTED' && (
                  <div className="mt-3 pt-3 border-t border-gray-900">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-600">
                        Privacy: {isRevealed(chain, tx.hash, 'to') || isRevealed(chain, tx.hash, 'amount') ? 'Partially revealed' : 'Fully encrypted'}
                      </span>
                      {(isRevealed(chain, tx.hash, 'to') || isRevealed(chain, tx.hash, 'amount')) && (
                        <span className="text-gray-700">ZK proof ✓</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div id="explorer-comparison" className="bg-[#0a0a0f] text-white px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-light tracking-wide">Blockchain Privacy</h2>
          <p className="text-gray-500 text-xs">Compare transaction visibility</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExplorerPanel
            chain="aleo"
            title="Aleo Explorer"
            icon={<FiLock size={14} />}
            transactions={aleoTransactions}
          />
          <ExplorerPanel
            chain="ethereum"
            title="Ethereum Explorer"
            icon={<FiUnlock size={14} />}
            transactions={ethereumTransactions}
          />
        </div>
        <div className="mt-12 border-t border-gray-900 pt-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-light">Key Differences</h3>
            <p className="text-xs text-gray-600">Privacy comparison</p>
          </div>
          <div className="grid grid-cols-3 gap-px bg-gray-900 rounded">
            <div className="bg-[#0a0a0f] p-4">
              <div className="text-[11px] text-gray-500 uppercase tracking-wider mb-3">Feature</div>
            </div>
            <div className="bg-[#0a0a0f] p-4">
              <div className="text-[11px] text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FiLock size={12} /> Aleo
              </div>
            </div>
            <div className="bg-[#0a0a0f] p-4">
              <div className="text-[11px] text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FiEye size={12} /> Public Chain
              </div>
            </div>
            <div className="bg-[#0a0a0f] p-4"><div className="text-[11px] text-gray-400">Transaction amount</div></div>
            <div className="bg-[#0a0a0f] p-4"><div className="text-[11px] text-gray-600">Private by default</div></div>
            <div className="bg-[#0a0a0f] p-4"><div className="text-[11px] text-gray-600">Always visible</div></div>
            <div className="bg-[#0a0a0f] p-4"><div className="text-[11px] text-gray-400">Recipient address</div></div>
            <div className="bg-[#0a0a0f] p-4"><div className="text-[11px] text-gray-600">Private by default</div></div>
            <div className="bg-[#0a0a0f] p-4"><div className="text-[11px] text-gray-600">Always visible</div></div>
            <div className="bg-[#0a0a0f] p-4"><div className="text-[11px] text-gray-400">Function calls</div></div>
            <div className="bg-[#0a0a0f] p-4"><div className="text-[11px] text-gray-600">Selective disclosure</div></div>
            <div className="bg-[#0a0a0f] p-4"><div className="text-[11px] text-gray-600">Fully transparent</div></div>
            <div className="bg-[#0a0a0f] p-4"><div className="text-[11px] text-gray-400">Proof verification</div></div>
            <div className="bg-[#0a0a0f] p-4"><div className="text-[11px] text-gray-600">ZK proofs</div></div>
            <div className="bg-[#0a0a0f] p-4"><div className="text-[11px] text-gray-600">N/A</div></div>
          </div>
          <div className="mt-10 text-center text-[11px] text-gray-700">
            * This is a simplified demonstration. Actual explorer may vary.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainExplorerComparison;