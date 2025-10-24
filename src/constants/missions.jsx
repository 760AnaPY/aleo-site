import React, { useState } from 'react';

const Missions = ({ missions, completedMissions }) => {
  const [currentMission, setCurrentMission] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#00fff7 1px, transparent 1px), linear-gradient(90deg, #00fff7 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Status Panel */}
      <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md border border-[#00fff7]/30 rounded-lg p-4 shadow-lg shadow-[#00fff7]/10">
        <div className="text-sm space-y-1">
          <div className="text-[#00fff7]">Prover #001</div>
          <div className="text-gray-400">Level: <span className="text-white">1</span></div>
          <div className="text-gray-400">Knowledge: <span className="text-[#c084fc]">20%</span></div>
          <div className="text-gray-400">Proofs: <span className="text-white">{completedMissions.length}/{missions.length}</span></div>
        </div>
        <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00fff7] to-[#c084fc] w-1/5 animate-pulse" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#00fff7] to-[#c084fc] bg-clip-text text-transparent">
            THE ZK ODYSSEY
          </h1>
          <p className="text-xl text-[#00fff7]/80">Prove what you learn. Unlock the hidden web.</p>
        </div>

        {/* Missions Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl text-[#00fff7] mb-6 flex items-center gap-3">
            <span className="animate-pulse">▶</span> ZK LEVELS
          </h2>

          {missions.map((mission, idx) => (
            <div
              key={mission.id}
              className={`group bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                mission.locked
                  ? 'border-gray-700/50 opacity-50'
                  : 'border-[#00fff7]/30 hover:border-[#00fff7] hover:shadow-lg hover:shadow-[#00fff7]/20'
              }`}
              style={{ animationDelay: `${idx * 150}ms` }}
              onClick={() => !mission.locked && setCurrentMission(mission)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-[#00fff7] text-2xl font-bold">0{mission.id}</span>
                    <span className={`text-xl font-semibold ${mission.locked ? 'text-gray-600' : 'text-white'}`}>
                      {mission.name}
                    </span>
                    {mission.locked && <span className="text-gray-600 text-sm">🔒 LOCKED</span>}
                  </div>
                  <div className="text-gray-400 text-sm ml-12">{mission.goal}</div>
                </div>
                <div className="text-right">
                  <div className="text-[#c084fc] text-sm">{mission.reward}</div>
                  {!mission.locked && (
                    <div className="text-[#00fff7] text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      START MISSION →
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Detail Modal */}
        {currentMission && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={() => setCurrentMission(null)}>
            <div className="bg-[#0a0a0f] border-2 border-[#00fff7] rounded-lg p-8 max-w-2xl mx-4 shadow-2xl shadow-[#00fff7]/30" onClick={e => e.stopPropagation()}>
              <h3 className="text-3xl font-bold text-[#00fff7] mb-4">{currentMission.name}</h3>
              <p className="text-gray-300 mb-6">{currentMission.goal}</p>
              <div className="bg-black/60 p-4 rounded border border-[#00fff7]/20 mb-6">
                <div className="text-sm text-gray-400 mb-2">Mission Objective:</div>
                <div className="text-white">Learn the fundamentals of zero-knowledge proofs and understand how Aleo enables private applications on the blockchain.</div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold py-3 rounded hover:opacity-90 transition-opacity">
                  START MISSION
                </button>
                <button
                  className="px-6 border border-[#00fff7]/30 rounded hover:border-[#00fff7] transition-colors"
                  onClick={() => setCurrentMission(null)}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Missions;
