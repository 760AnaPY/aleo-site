import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../locales/translations';

const Missions = ({ missions, onStartMission, completedMissions, onShowZeroRoom }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentMission, setCurrentMission] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Рассчитываем прогресс только по основным миссиям (без бонусной и продвинутых)
  const mainMissions = missions.filter(m => !m.isBonus && !m.isAdvanced);
  const mainMissionIds = mainMissions.map(m => m.id);
  const completedMainMissions = completedMissions.filter(id => mainMissionIds.includes(id));
  const progressPercentage = Math.round((completedMainMissions.length / mainMissions.length) * 100);
  const progressWidth = `${progressPercentage}%`;

  // Отслеживание мыши
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Анимация фона с частицами
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Частицы с более медленным и плавным движением
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.2; // Уменьшили скорость
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.5 + 0.5; // Меньше размер
        this.color = Math.random() > 0.5 ? '#00fff7' : '#c084fc';
        this.alpha = Math.random() * 0.3 + 0.15; // Меньше прозрачность
        this.oscillation = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.3 + 0.1; // Очень медленная скорость
      }

      update() {
        // Только медленное колебательное движение без реакции на мышь
        this.oscillation += 0.005; // Еще медленнее
        const offsetX = Math.sin(this.oscillation) * 30;
        const offsetY = Math.cos(this.oscillation * 0.8) * 30;

        // Плавный возврат к базовой позиции с колебанием
        this.vx += (this.baseX - this.x + offsetX) * 0.0005;
        this.vy += (this.baseY - this.y + offsetY) * 0.0005;

        this.x += this.vx;
        this.y += this.vy;

        // Сильное затухание скорости
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Мягкие границы
        if (this.x < 0 || this.x > canvas.width) this.vx *= -0.5;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -0.5;

        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        // Мягкое свечение
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    // Меньше частиц для более упорядоченного вида
    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle());
    }

    // Анимация
    let animationId;
    const animate = () => {
      // Полная очистка без следа
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Обновляем и рисуем частицы
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Соединяем близкие частицы (реже и тоньше)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Увеличили дистанцию, уменьшили прозрачность
          if (dist < 120) {
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);
            
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = (1 - dist / 120) * 0.1; // Очень прозрачные линии
            ctx.lineWidth = 0.5; // Тоньше
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden relative">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f] pointer-events-none" />

      {/* Radial gradient following mouse */}
      <div 
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(0,255,247,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      {/* Status Panel */}
      <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md border border-[#00fff7]/30 rounded-lg p-4 shadow-lg shadow-[#00fff7]/10">
        <div className="text-sm space-y-1">
          <div className="text-[#00fff7]">{t.missions.statusPanel.prover}</div>
          <div className="text-gray-400">{t.missions.statusPanel.level}: <span className="text-white">1</span></div>
          <div className="text-gray-400">{t.missions.statusPanel.knowledge}: <span className="text-[#c084fc]">{progressPercentage}%</span></div>
          <div className="text-gray-400">{t.missions.statusPanel.proofs}: <span className="text-white">{completedMainMissions.length}/{mainMissions.length}</span></div>
        </div>
        <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00fff7] to-[#c084fc] transition-all duration-500 animate-pulse" 
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#00fff7] to-[#c084fc] bg-clip-text text-transparent">
            {t.missions.title}
          </h1>
          <p className="text-xl text-[#00fff7]/80">{t.missions.subtitle}</p>
          
          {/* Кнопка для просмотра ZeroRoom если все основные миссии завершены */}
          {completedMainMissions.length === mainMissions.length && completedMainMissions.length > 0 && onShowZeroRoom && (
            <div className="mt-6">
              <button
                onClick={onShowZeroRoom}
                className="px-8 py-3 bg-gradient-to-r from-[#00fff7] via-[#c084fc] to-[#00ff88] text-black font-bold rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-[#00fff7]/30 animate-pulse"
              >
                {t.missions.viewBadge}
              </button>
            </div>
          )}
        </div>

        {/* Missions Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl text-[#00fff7] mb-6 flex items-center gap-3">
            <span className="animate-pulse">▶</span> ZK LEVELS
          </h2>

          {missions.filter(m => !m.isBonus && !m.isAdvanced).map((mission, idx) => (
            <div
              key={mission.id}
              className={`group bg-black/40 backdrop-blur-md border rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                completedMissions.includes(mission.id)
                  ? 'border-green-400/50 bg-green-400/5'
                  : mission.locked
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
                    {completedMissions.includes(mission.id) && (
                      <span className="text-green-400 text-sm">{t.missions.completed}</span>
                    )}
                    {mission.locked && !completedMissions.includes(mission.id) && (
                      <span className="text-gray-600 text-sm">{t.missions.locked}</span>
                    )}
                  </div>
                  <div className="text-gray-400 text-sm ml-12">{mission.goal}</div>
                </div>
                <div className="text-right">
                  <div className="text-[#c084fc] text-sm">{mission.reward}</div>
                  {!mission.locked && (
                    <div className="text-[#00fff7] text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.missions.startMission} →
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advanced Missions Section */}
        {missions.filter(m => m.isAdvanced).length > 0 && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              <h2 className="text-xl text-red-400 flex items-center gap-2">
                ⚙️ ADVANCED MISSIONS
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            </div>

            {missions.filter(m => m.isAdvanced).map((mission) => (
              <div
                key={mission.id}
                className={`group bg-gradient-to-br from-red-500/10 to-red-600/5 backdrop-blur-md border-2 border-red-500/50 rounded-lg p-6 transition-all duration-300 ${
                  mission.locked 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-[1.02] cursor-pointer hover:shadow-lg hover:shadow-red-500/30'
                }`}
                onClick={() => !mission.locked && setCurrentMission(mission)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-red-400 text-2xl font-bold">⚙️</span>
                      <span className="text-xl font-semibold text-white">
                        {mission.name}
                      </span>
                      <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full text-red-400 text-xs font-bold">
                        ADVANCED
                      </span>
                      {mission.locked && (
                        <span className="px-3 py-1 bg-gray-500/20 border border-gray-500/50 rounded-full text-gray-400 text-xs font-bold">
                          LOCKED
                        </span>
                      )}
                    </div>
                    <div className="text-gray-300 text-sm ml-12">{mission.goal}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400 text-sm font-bold">{mission.reward}</div>
                    <div className="text-red-400 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      START CHALLENGE →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bonus Mission Section */}
        {missions.filter(m => m.isBonus).length > 0 && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c084fc] to-transparent"></div>
              <h2 className="text-xl text-[#c084fc] flex items-center gap-2">
                {t.missions.bonusSection}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#c084fc] to-transparent"></div>
            </div>

            {missions.filter(m => m.isBonus).map((mission) => (
              <div
                key={mission.id}
                className="group bg-gradient-to-br from-[#c084fc]/10 to-[#00ff88]/10 backdrop-blur-md border-2 border-[#c084fc]/50 rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer hover:shadow-lg hover:shadow-[#c084fc]/30 animate-pulse-slow"
                onClick={() => setCurrentMission(mission)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-[#c084fc] text-2xl font-bold">🎮</span>
                      <span className="text-xl font-semibold text-white">
                        {mission.name}
                      </span>
                      <span className="px-3 py-1 bg-[#c084fc]/20 border border-[#c084fc]/50 rounded-full text-[#c084fc] text-xs font-bold">
                        BONUS
                      </span>
                    </div>
                    <div className="text-gray-300 text-sm ml-12">{mission.goal}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#00ff88] text-sm font-bold">{mission.reward}</div>
                    <div className="text-[#c084fc] text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.missions.playNow} →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mission Detail Modal */}
        {currentMission && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={() => setCurrentMission(null)}>
            <div className="bg-[#0a0a0f] border-2 border-[#00fff7] rounded-lg p-8 max-w-2xl mx-4 shadow-2xl shadow-[#00fff7]/30" onClick={e => e.stopPropagation()}>
              <h3 className="text-3xl font-bold text-[#00fff7] mb-4">{currentMission.name}</h3>
              <p className="text-gray-300 mb-6">{currentMission.goal}</p>
              <div className="bg-black/60 p-4 rounded border border-[#00fff7]/20 mb-6">
                <div className="text-sm text-gray-400 mb-2">{t.missions.goal}:</div>
                <div className="text-white">{currentMission.goal}</div>
              </div>
              <div className="flex gap-4">
                <button
                  className="flex-1 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black font-bold py-3 rounded hover:opacity-90 transition-opacity"
                  onClick={() => {
                    onStartMission(currentMission.id);
                    setCurrentMission(null);
                  }}
                >
                  {t.missions.startMission}
                </button>
                <button
                  className="px-6 border border-[#00fff7]/30 rounded hover:border-[#00fff7] transition-colors"
                  onClick={() => setCurrentMission(null)}
                >
                  {t.common.back.replace('← ', '')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#00fff7]/20 bg-black/40 backdrop-blur-md mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">Follow me:</span>
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/760AnaPY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#00fff7] transition-colors group"
                >
                  <span className="text-xl">🐙</span>
                  <span className="text-sm group-hover:underline">GitHub</span>
                </a>
                <a 
                  href="https://twitter.com/AnaPY__" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#00fff7] transition-colors group"
                >
                  <span className="text-xl">🐦</span>
                  <span className="text-sm group-hover:underline">Twitter</span>
                </a>
              </div>
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm">Made with</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span className="text-sm">by</span>
              <span className="text-[#00fff7] font-bold">AnaPY</span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-[#00fff7]/10">
            <div className="text-center text-xs text-gray-500">
              <p>Exploring the future of privacy-preserving blockchain technology</p>
              <p className="mt-1">Built with React, Three.js, and lots of ☕</p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Missions;
