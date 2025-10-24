import React, { useState, useRef, useEffect } from 'react';

const CircuitBuilder = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [placedComponents, setPlacedComponents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [draggedGate, setDraggedGate] = useState(null);
  const [draggingComponent, setDraggingComponent] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [connecting, setConnecting] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const canvasRef = useRef(null);

  // Уровни
  const levels = [
    {
      id: 0,
      name: "Простое равенство",
      description: "Создай circuit для проверки a == b",
      hint: "Используй XOR и NOT gates. Если a XOR b = 0, значит они равны",
      inputs: [
        { id: 'input_a', label: 'INPUT A', x: 50, y: 150, type: 'input', fixed: true },
        { id: 'input_b', label: 'INPUT B', x: 50, y: 250, type: 'input', fixed: true }
      ],
      outputs: [
        { id: 'output', label: 'EQUAL?', x: 650, y: 200, type: 'output', fixed: true }
      ],
      availableGates: ['XOR', 'NOT', 'AND', 'OR'],
      testCases: [
        { a: 1, b: 1, expected: 1 },
        { a: 0, b: 0, expected: 1 },
        { a: 1, b: 0, expected: 0 },
        { a: 0, b: 1, expected: 0 }
      ]
    },
    {
      id: 1,
      name: "Проверка диапазона",
      description: "Проверь, что значение в диапазоне [01, 11]",
      hint: "Используй AND и OR для проверки битов",
      inputs: [
        { id: 'bit1', label: 'BIT 1', x: 50, y: 150, type: 'input', fixed: true },
        { id: 'bit0', label: 'BIT 0', x: 50, y: 250, type: 'input', fixed: true }
      ],
      outputs: [
        { id: 'output', label: 'IN RANGE?', x: 650, y: 200, type: 'output', fixed: true }
      ],
      availableGates: ['AND', 'OR', 'NOT'],
      testCases: [
        { bit1: 0, bit0: 1, expected: 1 }, // 01
        { bit1: 1, bit0: 0, expected: 1 }, // 10
        { bit1: 1, bit0: 1, expected: 1 }, // 11
        { bit1: 0, bit0: 0, expected: 0 }  // 00
      ]
    },
    {
      id: 2,
      name: "Приватное сравнение",
      description: "a > b без раскрытия значений",
      hint: "Используй комбинацию AND, NOT для побитового сравнения",
      inputs: [
        { id: 'a_bit', label: 'A BIT', x: 50, y: 150, type: 'input', fixed: true },
        { id: 'b_bit', label: 'B BIT', x: 50, y: 250, type: 'input', fixed: true }
      ],
      outputs: [
        { id: 'output', label: 'A > B?', x: 650, y: 200, type: 'output', fixed: true }
      ],
      availableGates: ['AND', 'OR', 'NOT', 'XOR'],
      testCases: [
        { a_bit: 1, b_bit: 0, expected: 1 },
        { a_bit: 0, b_bit: 1, expected: 0 },
        { a_bit: 1, b_bit: 1, expected: 0 },
        { a_bit: 0, b_bit: 0, expected: 0 }
      ]
    }
  ];

  const level = levels[currentLevel];

  // Инициализация уровня
  useEffect(() => {
    setPlacedComponents([...level.inputs, ...level.outputs]);
    setConnections([]);
    setSimulation(null);
    setLevelComplete(false);
    setShowHint(false);
  }, [currentLevel, level.inputs, level.outputs]);

  // Логика гейтов
  const evaluateGate = (type, inputs) => {
    switch (type) {
      case 'AND':
        return inputs.every(v => v === 1) ? 1 : 0;
      case 'OR':
        return inputs.some(v => v === 1) ? 1 : 0;
      case 'NOT':
        return inputs[0] === 1 ? 0 : 1;
      case 'XOR':
        return inputs.reduce((a, b) => a ^ b, 0);
      default:
        return 0;
    }
  };

  // Симуляция схемы
  const runSimulation = () => {
    setIsSimulating(true);
    
    const results = level.testCases.map(testCase => {
      const values = {};
      
      // Установка входных значений
      level.inputs.forEach(input => {
        const key = input.id.replace('input_', '');
        values[input.id] = testCase[key] ?? testCase[input.id];
      });

      // Вычисление значений гейтов (топологическая сортировка)
      const gates = placedComponents.filter(c => c.type === 'gate');
      let changed = true;
      let iterations = 0;
      
      while (changed && iterations < 100) {
        changed = false;
        iterations++;
        
        gates.forEach(gate => {
          const inputs = connections
            .filter(c => c.to === gate.id)
            .map(c => values[c.from])
            .filter(v => v !== undefined);
          
          if (inputs.length > 0) {
            const newValue = evaluateGate(gate.gateType, inputs);
            if (values[gate.id] !== newValue) {
              values[gate.id] = newValue;
              changed = true;
            }
          }
        });
      }

      // Получение выходного значения
      const outputId = level.outputs[0].id;
      const outputConnections = connections.filter(c => c.to === outputId);
      const output = outputConnections.length > 0 ? values[outputConnections[0].from] : undefined;
      
      return {
        ...testCase,
        output,
        passed: output === testCase.expected
      };
    });

    setSimulation(results);
    
    // Проверка успешности
    if (results.every(r => r.passed)) {
      setLevelComplete(true);
    }
    
    setTimeout(() => setIsSimulating(false), 500);
  };

  // Drag & Drop для новых компонентов из панели
  const handleDragStart = (gateType, e) => {
    console.log('Drag started:', gateType);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', gateType); // Для совместимости
    setDraggedGate(gateType);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    console.log('Drop event:', draggedGate);
    if (!draggedGate || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 60;
    const y = e.clientY - rect.top - 30;
    
    const newComponent = {
      id: `gate_${Date.now()}`,
      type: 'gate',
      gateType: draggedGate,
      x: Math.max(0, Math.min(x, rect.width - 120)),
      y: Math.max(0, Math.min(y, rect.height - 60)),
      fixed: false
    };
    
    console.log('Adding component:', newComponent);
    setPlacedComponents([...placedComponents, newComponent]);
    setDraggedGate(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Перемещение существующих компонентов
  const handleComponentMouseDown = (component, e) => {
    if (component.fixed) return;
    e.preventDefault();
    e.stopPropagation();
    
    const rect = canvasRef.current.getBoundingClientRect();
    setDraggingComponent(component);
    setDragOffset({
      x: e.clientX - rect.left - component.x,
      y: e.clientY - rect.top - component.y
    });
  };

  const handleCanvasMouseMove = (e) => {
    if (!draggingComponent || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;
    
    setPlacedComponents(placedComponents.map(c => 
      c.id === draggingComponent.id 
        ? { 
            ...c, 
            x: Math.max(0, Math.min(newX, rect.width - 120)),
            y: Math.max(0, Math.min(newY, rect.height - 60))
          }
        : c
    ));
  };

  const handleCanvasMouseUp = () => {
    setDraggingComponent(null);
  };

  // Соединение компонентов
  const startConnection = (componentId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setConnecting(componentId);
  };

  const completeConnection = (toId, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (connecting && connecting !== toId) {
      // Проверяем, нет ли уже такого соединения
      const exists = connections.some(c => c.from === connecting && c.to === toId);
      if (!exists) {
        const newConnection = {
          id: `conn_${Date.now()}`,
          from: connecting,
          to: toId
        };
        setConnections([...connections, newConnection]);
      }
    }
    setConnecting(null);
  };

  // Удаление компонента
  const removeComponent = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setPlacedComponents(placedComponents.filter(c => c.id !== id));
    setConnections(connections.filter(c => c.from !== id && c.to !== id));
  };

  // Очистка схемы
  const clearCircuit = () => {
    setPlacedComponents([...level.inputs, ...level.outputs]);
    setConnections([]);
    setSimulation(null);
    setLevelComplete(false);
  };

  // Следующий уровень
  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-mono relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#00fff7 1px, transparent 1px), linear-gradient(90deg, #00fff7 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-[#00fff7]/20 bg-black/60 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#00fff7] hover:text-white transition-colors"
          >
            <span>←</span> НАЗАД
          </button>
          <div className="text-center">
            <div className="text-[#00fff7] text-2xl font-bold">CIRCUIT BUILDER</div>
            <div className="text-gray-400 text-sm">Level {currentLevel + 1}: {level.name}</div>
          </div>
          <div className="text-gray-400 text-sm px-4 py-2 bg-[#c084fc]/20 rounded border border-[#c084fc]/30">
            BONUS
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Panel - Tools */}
          <div className="col-span-3 space-y-4">
            {/* Level Info */}
            <div className="bg-black/60 border border-[#00fff7]/30 rounded-lg p-4 backdrop-blur-md">
              <h3 className="text-[#00fff7] font-bold mb-2">ЗАДАНИЕ</h3>
              <p className="text-gray-300 text-sm mb-4">{level.description}</p>
              
              {/* Hint */}
              <div className="bg-[#c084fc]/10 border border-[#c084fc]/30 rounded p-3 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-[#c084fc]">💡 ПОДСКАЗКА</div>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs text-[#c084fc] hover:text-white transition-colors px-2 py-1"
                  >
                    {showHint ? 'Скрыть' : 'Показать'}
                  </button>
                </div>
                
                <div className={`transition-all duration-300 text-xs text-gray-400 ${showHint ? 'opacity-100 blur-0' : 'opacity-30 blur-sm'}`}>
                  {level.hint}
                </div>
                
                {!showHint && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer" onClick={() => setShowHint(true)}>
                    <button className="px-3 py-1 bg-[#c084fc]/20 border border-[#c084fc]/30 rounded text-[#c084fc] text-xs">
                      👁️ Показать
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Available Gates */}
            <div className="bg-black/60 border border-[#00fff7]/30 rounded-lg p-4 backdrop-blur-md">
              <h3 className="text-[#00fff7] font-bold mb-3">КОМПОНЕНТЫ</h3>
              <div className="space-y-2">
                {level.availableGates.map(gate => (
                  <div
                    key={gate}
                    draggable
                    onDragStart={(e) => handleDragStart(gate, e)}
                    className="bg-gradient-to-r from-[#c084fc]/20 to-[#00fff7]/20 border border-[#00fff7]/30 rounded p-3 cursor-move hover:border-[#00fff7] hover:scale-105 transition-all"
                  >
                    <div className="text-center">
                      <div className="text-[#00fff7] font-bold">{gate}</div>
                      <div className="text-xs text-gray-500">
                        {gate === 'AND' && '& логическое И'}
                        {gate === 'OR' && '| логическое ИЛИ'}
                        {gate === 'NOT' && '! инверсия'}
                        {gate === 'XOR' && '⊕ исключающее ИЛИ'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-2">
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="w-full px-4 py-3 bg-gradient-to-r from-[#00ff88] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isSimulating ? '⚡ СИМУЛЯЦИЯ...' : '▶ ЗАПУСТИТЬ'}
              </button>
              <button
                onClick={clearCircuit}
                className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded hover:bg-red-500/30 transition-all"
              >
                🗑️ ОЧИСТИТЬ
              </button>
            </div>
          </div>

          {/* Center - Canvas */}
          <div className="col-span-6">
            <div 
              className={`bg-black/80 border-4 rounded-lg overflow-hidden relative ${draggedGate ? 'border-[#00ff88]/80' : 'border-[#00fff7]/40'}`}
              style={{ height: '600px', userSelect: 'none' }}
              ref={canvasRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            >
              
              {/* Grid */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(rgba(0,255,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,247,0.05) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />

              {/* Connections */}
              <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00fff7" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
                {connections.map(conn => {
                  const from = placedComponents.find(c => c.id === conn.from);
                  const to = placedComponents.find(c => c.id === conn.to);
                  if (!from || !to) return null;
                  
                  const x1 = from.x + 120;
                  const y1 = from.y + 30;
                  const x2 = to.x;
                  const y2 = to.y + 30;
                  
                  return (
                    <line
                      key={conn.id}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      strokeDasharray={isSimulating ? "5,5" : "0"}
                    />
                  );
                })}
                
                {/* Connecting line preview */}
                {connecting && (
                  <line
                    x1={placedComponents.find(c => c.id === connecting)?.x + 120}
                    y1={placedComponents.find(c => c.id === connecting)?.y + 30}
                    x2={placedComponents.find(c => c.id === connecting)?.x + 150}
                    y2={placedComponents.find(c => c.id === connecting)?.y + 30}
                    stroke="#00fff7"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    className="animate-pulse"
                  />
                )}
              </svg>

              {/* Components */}
              {placedComponents.map(component => (
                <div
                  key={component.id}
                  className={`absolute ${!component.fixed && 'cursor-move'} transition-shadow hover:shadow-lg hover:shadow-[#00fff7]/30`}
                  style={{
                    left: component.x,
                    top: component.y,
                    width: '120px',
                    height: '60px',
                    zIndex: draggingComponent?.id === component.id ? 1000 : 1
                  }}
                  onMouseDown={(e) => handleComponentMouseDown(component, e)}
                >
                  {/* Component Box */}
                  <div className={`relative w-full h-full border-2 rounded-lg flex items-center justify-center font-bold transition-all ${
                    component.type === 'input' 
                      ? 'bg-[#00fff7]/20 border-[#00fff7] text-[#00fff7]'
                      : component.type === 'output'
                      ? 'bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88]'
                      : 'bg-[#c084fc]/20 border-[#c084fc] text-[#c084fc]'
                  } ${draggingComponent?.id === component.id ? 'scale-110 opacity-80' : ''}`}>
                    <div className="text-center text-sm">
                      {component.label || component.gateType}
                    </div>

                    {/* Connection Points */}
                    {component.type !== 'output' && (
                      <div
                        className="absolute -right-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#00fff7] rounded-full border-2 border-[#0a0a0f] cursor-pointer hover:scale-125 transition-transform z-10"
                        onMouseDown={(e) => startConnection(component.id, e)}
                        title="Output"
                      />
                    )}
                    {component.type !== 'input' && (
                      <div
                        className="absolute -left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#c084fc] rounded-full border-2 border-[#0a0a0f] cursor-pointer hover:scale-125 transition-transform z-10"
                        onMouseDown={(e) => completeConnection(component.id, e)}
                        title="Input"
                      />
                    )}

                    {/* Delete Button */}
                    {!component.fixed && (
                      <button
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-sm flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                        onMouseDown={(e) => removeComponent(component.id, e)}
                        title="Удалить"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Instruction */}
              {placedComponents.filter(c => c.type === 'gate').length === 0 && !simulation && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4 animate-bounce">⚡</div>
                    <div className="text-lg">Перетащи компоненты сюда</div>
                    <div className="text-sm mt-2">Затем соедини точки</div>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-4 bg-black/40 border border-[#00fff7]/20 rounded-lg p-3 text-sm text-gray-400">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-[#00fff7]">🖱️</span> Перетаскивай
                </div>
                <div>
                  <span className="text-[#c084fc]">⚡</span> Соединяй точки
                </div>
                <div>
                  <span className="text-red-400">×</span> Удаляй
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="col-span-3 space-y-4">
            {/* Test Cases */}
            <div className="bg-black/60 border border-[#00fff7]/30 rounded-lg p-4 backdrop-blur-md">
              <h3 className="text-[#00fff7] font-bold mb-3">ТЕСТ-КЕЙСЫ</h3>
              <div className="space-y-2">
                {simulation ? (
                  simulation.map((result, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded border transition-all ${
                        result.passed
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-red-500/10 border-red-500/30'
                      }`}
                    >
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Test {idx + 1}</span>
                        <span className={result.passed ? 'text-green-400' : 'text-red-400'}>
                          {result.passed ? '✓ PASS' : '✗ FAIL'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        {Object.keys(result).filter(k => k !== 'expected' && k !== 'output' && k !== 'passed')
                          .map(k => `${k}=${result[k]}`).join(', ')}
                      </div>
                      <div className="text-xs mt-1">
                        <span className="text-gray-500">Expected: {result.expected}</span>
                        {' | '}
                        <span className={result.passed ? 'text-green-400' : 'text-red-400'}>
                          Got: {result.output ?? '?'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <div className="text-3xl mb-2">📊</div>
                    <div className="text-sm">Запусти симуляцию</div>
                    <div className="text-xs mt-1 text-gray-600">для проверки схемы</div>
                  </div>
                )}
              </div>
            </div>

            {/* Level Complete */}
            {levelComplete && (
              <div className="bg-gradient-to-r from-green-500/20 to-[#00ff88]/20 border-2 border-green-500 rounded-lg p-4 animate-pulse">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <div className="text-green-400 font-bold mb-2">УРОВЕНЬ ПРОЙДЕН!</div>
                  {currentLevel < levels.length - 1 ? (
                    <button
                      onClick={nextLevel}
                      className="mt-2 px-6 py-2 bg-gradient-to-r from-[#00ff88] to-[#00fff7] text-black font-bold rounded hover:opacity-90 transition-all"
                    >
                      СЛЕДУЮЩИЙ УРОВЕНЬ →
                    </button>
                  ) : (
                    <div className="mt-2 text-[#00ff88] text-lg">
                      🏆 ВСЕ УРОВНИ ПРОЙДЕНЫ!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="bg-black/60 border border-[#00fff7]/30 rounded-lg p-4 backdrop-blur-md">
              <h3 className="text-[#00fff7] font-bold mb-3">СТАТИСТИКА</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Компоненты:</span>
                  <span className="text-white">{placedComponents.filter(c => c.type === 'gate').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Соединения:</span>
                  <span className="text-white">{connections.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Уровень:</span>
                  <span className="text-[#00fff7]">{currentLevel + 1} / {levels.length}</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-black/60 border border-[#00fff7]/30 rounded-lg p-4 backdrop-blur-md">
              <h3 className="text-[#00fff7] font-bold mb-3">ЛЕГЕНДА</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#00fff7] rounded-full"></div>
                  <span className="text-gray-400">Выход (output)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#c084fc] rounded-full"></div>
                  <span className="text-gray-400">Вход (input)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#00fff7] to-[#c084fc]"></div>
                  <span className="text-gray-400">Соединение</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitBuilder;
