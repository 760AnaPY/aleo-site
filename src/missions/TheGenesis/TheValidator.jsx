import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../locales/translations';
import * as THREE from 'three';

const TheValidator = ({ onBack, onComplete }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const canvasRef = useRef(null);

  // Получаем вопросы из переводов с правильными индексами ответов
  const questions = t.theValidator.questions.map((q, idx) => ({
    id: idx + 1,
    question: q.question,
    options: q.options,
    correct: idx === 0 ? 1 : idx === 1 ? 2 : idx === 2 ? 1 : idx === 3 ? 2 : idx === 4 ? 1 : idx === 5 ? 2 : idx === 6 ? 1 : idx === 7 ? 1 : idx === 8 ? 1 : 2,
    explanation: q.explanation
  }));

  // Three.js setup - вращающиеся кольца валидации
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 8;

    // Создаем концентрические кольца
    const rings = [];
    for (let i = 0; i < 5; i++) {
      const radius = 2 + i * 0.8;
      const geometry = new THREE.TorusGeometry(radius, 0.05, 8, 32);
      const edges = new THREE.EdgesGeometry(geometry);
      const colors = [0xffd700, 0x00fff7, 0xc084fc, 0xff6b6b, 0x00ff88];
      const material = new THREE.LineBasicMaterial({
        color: colors[i],
        transparent: true,
        opacity: 0.4
      });
      const ring = new THREE.LineSegments(edges, material);
      ring.rotation.x = Math.PI / 2 + i * 0.1;
      scene.add(ring);
      rings.push(ring);
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      
      rings.forEach((ring, idx) => {
        ring.rotation.z += 0.001 * (idx + 1);
        ring.rotation.x += 0.0005 * (5 - idx);
      });

      camera.position.x = mouseX * 0.3;
      camera.position.y = mouseY * 0.3;
      camera.lookAt(scene.position);

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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitTest = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);

    // Если набрано >= 70%, миссия пройдена
    if (correctCount >= 7) {
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden relative">
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 pointer-events-none z-0"
          style={{ opacity: 0.15 }}
        />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="max-w-3xl w-full">
            <div className={`bg-black/60 backdrop-blur-xl border-2 rounded-lg p-8 ${
              passed ? 'border-[#ffd700]' : 'border-[#ff6b6b]'
            }`}>
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{passed ? '🏆' : '📚'}</div>
                <h2 className={`text-4xl font-bold mb-2 ${passed ? 'text-[#ffd700]' : 'text-[#ff6b6b]'}`}>
                  {passed ? t.theValidator.passed : t.theValidator.failed}
                </h2>
                <p className="text-gray-400">
                  {passed ? t.theValidator.passedMessage : t.theValidator.failedMessage}
                </p>
              </div>

              {/* Счет */}
              <div className="mb-8">
                <div className="bg-[#0a0a0f]/80 rounded-lg p-6 border border-[#ffd700]/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">{t.theValidator.yourScore}</span>
                    <span className="text-3xl font-bold text-[#ffd700]">{score}/{questions.length}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        passed ? 'bg-gradient-to-r from-[#ffd700] to-[#00ff88]' : 'bg-gradient-to-r from-[#ff6b6b] to-[#c084fc]'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-center mt-2 text-sm text-gray-400">
                    {percentage.toFixed(0)}% {t.theValidator.correctAnswers}
                  </div>
                </div>
              </div>

              {/* Разбор ответов */}
              <div className="mb-8 max-h-96 overflow-y-auto space-y-4">
                {questions.map((q, idx) => {
                  const userAnswer = answers[q.id];
                  const isCorrect = userAnswer === q.correct;

                  return (
                    <div key={q.id} className={`bg-[#0a0a0f]/50 rounded-lg p-4 border ${
                      isCorrect ? 'border-[#00ff88]/30' : 'border-[#ff6b6b]/30'
                    }`}>
                      <div className="flex items-start gap-3 mb-2">
                        <span className={`text-xl ${isCorrect ? 'text-[#00ff88]' : 'text-[#ff6b6b]'}`}>
                          {isCorrect ? '✓' : '✗'}
                        </span>
                        <div className="flex-1">
                          <div className="text-white font-semibold mb-2">
                            {idx + 1}. {q.question}
                          </div>
                          <div className="text-sm text-gray-400">
                            {isCorrect ? (
                              <span className="text-[#00ff88]">{t.theValidator.correct}</span>
                            ) : (
                              <>
                                <span className="text-[#ff6b6b]">{t.theValidator.yourAnswer} {q.options[userAnswer]}</span>
                                <br />
                                <span className="text-[#00ff88]">{t.theValidator.correctAnswer} {q.options[q.correct]}</span>
                              </>
                            )}
                          </div>
                          <div className="text-xs text-[#00fff7] mt-2">
                            💡 {q.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Кнопки */}
              <div className="flex gap-4">
                {passed ? (
                  <div className="flex-1 bg-gradient-to-r from-[#ffd700]/20 to-[#00ff88]/20 border-2 border-[#ffd700] rounded-lg p-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#ffd700] mb-2">
                        {t.theValidator.badgeReceived}
                      </div>
                      <div className="text-sm text-gray-400">
                        {t.theValidator.congratsMessage}
                      </div>
                      <div className="text-sm text-[#00fff7] mt-4">
                        {t.theValidator.returningToMissions}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={onBack}
                      className="flex-1 border border-[#ff6b6b]/30 rounded hover:border-[#ff6b6b] transition-colors py-3"
                    >
                      {t.theValidator.returnButton}
                    </button>
                    <button
                      onClick={restartTest}
                      className="flex-1 bg-gradient-to-r from-[#c084fc] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity py-3"
                    >
                      {t.theValidator.restart}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden relative">
      {/* Three.js Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.15 }}
      />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#ffd700 1px, transparent 1px), linear-gradient(90deg, #ffd700 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-[#ffd700]/20 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#ffd700] hover:text-white transition-colors"
          >
            <span>←</span> {t.theValidator.back}
          </button>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm text-gray-400">Отвечено</div>
              <div className="text-[#ffd700] font-bold">{answeredCount}/{questions.length}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">{t.theValidator.progress}</div>
              <div className="text-[#ffd700] font-bold">{t.theValidator.questionOf.replace('{current}', currentQuestion + 1).replace('{total}', questions.length)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Mission Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl font-bold text-[#ffd700]">05</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">{t.theValidator.title}</h1>
                <p className="text-gray-400">{t.theValidator.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-3 py-1 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded text-[#ffd700] text-sm">
                {t.theValidator.advanced}
              </span>
              <span className="px-3 py-1 bg-[#00fff7]/10 border border-[#00fff7]/30 rounded text-[#00fff7] text-sm">
                {t.theValidator.reward}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#ffd700] to-[#00fff7] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-black/40 backdrop-blur-md border border-[#ffd700]/50 rounded-lg p-8 mb-8">
            <div className="mb-6">
              <div className="text-sm text-[#ffd700] mb-2">
                {t.theValidator.questionOf.replace('{current}', currentQuestion + 1).replace('{total}', questions.length)}
              </div>
              <h2 className="text-2xl font-semibold text-white leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-4 bg-[#0a0a0f]/50 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    answers[currentQ.id] === idx
                      ? 'border-[#ffd700] bg-[#ffd700]/10'
                      : 'border-[#ffd700]/20 hover:border-[#ffd700]/50'
                  }`}
                  onClick={() => handleAnswer(currentQ.id, idx)}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    answers[currentQ.id] === idx
                      ? 'border-[#ffd700] bg-[#ffd700]'
                      : 'border-gray-600'
                  }`}>
                    {answers[currentQ.id] === idx && (
                      <div className="w-3 h-3 rounded-full bg-black" />
                    )}
                  </div>
                  <span className="flex-1 text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 border border-[#ffd700]/30 rounded hover:border-[#ffd700] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {t.theValidator.backButton}
            </button>

            <div className="flex gap-2">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentQuestion
                      ? 'bg-[#ffd700] w-8'
                      : answers[questions[idx].id] !== undefined
                      ? 'bg-[#00ff88]'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={submitTest}
                disabled={answeredCount < questions.length}
                className="px-6 py-3 bg-gradient-to-r from-[#ffd700] to-[#00ff88] text-black font-bold rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.theValidator.showResults}
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-3 bg-gradient-to-r from-[#ffd700] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-opacity"
              >
                {t.theValidator.nextQuestion}
              </button>
            )}
          </div>

          {/* Help Text */}
          {answeredCount < questions.length && (
            <div className="mt-6 text-center text-sm text-gray-500">
              {answeredCount === 0 ? (
                t.theValidator.helpTextStart
              ) : (
                t.theValidator.helpTextRemaining.replace('{count}', questions.length - answeredCount)
              )}
            </div>
          )}
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
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TheValidator;