import React, { useState, useEffect, useCallback, useMemo } from "react";
import HeroSection from "./components/Hero/HeroSection";
import Missions from "./components/Hero/Missions";
import TheGenesis from "./missions/TheGenesis/TheGenesis";
import TheLanguage from "./missions/TheGenesis/TheLanguage";
import TheCircuit from "./missions/TheGenesis/TheCircuit";
import TheNetwork from "./missions/TheGenesis/TheNetwork";
// import HowAleoWorks from "./missions/TheGenesis/HowAleoWorks";
import TheValidator from "./missions/TheGenesis/TheValidator";
import ZeroRoom from "./missions/TheGenesis/ZeroRoom";
import CircuitBuilder from "./missions/TheGenesis/CircuitBuilder";
// import TheLedger from "./missions/TheGenesis/TheLedger";
import { useLanguage } from "./contexts/LanguageContext";
import { useTranslations } from "./locales/translations";
import { WalletProvider } from "./contexts/WalletContext";
import { WalletModal } from "./components/WalletConnection";
import { Header } from "./components/Header";

const AleoShowcaseInner = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  // Загрузка сохраненного прогресса из localStorage
  const [completedMissions, setCompletedMissions] = useState(() => {
    try {
      const saved = localStorage.getItem('aleoCompletedMissions');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading saved progress:', error);
      return [];
    }
  });

  // Динамический список миссий с переводами
  const missions = useMemo(() => [
    { 
      id: 1, 
      name: t.missionsList.genesis.name, 
      goal: t.missionsList.genesis.goal, 
      reward: t.missionsList.genesis.reward, 
      description: t.missionsList.genesis.description,
      locked: false, 
      key: 'genesis' 
    },
    { 
      id: 2, 
      name: t.missionsList.language.name, 
      goal: t.missionsList.language.goal, 
      reward: t.missionsList.language.reward, 
      description: t.missionsList.language.description,
      locked: true, 
      key: 'language' 
    },
    { 
      id: 3, 
      name: t.missionsList.circuit.name, 
      goal: t.missionsList.circuit.goal, 
      reward: t.missionsList.circuit.reward, 
      description: t.missionsList.circuit.description,
      locked: true, 
      key: 'circuit' 
    },
    // { 
    //   id: 4, 
    //   name: t.missionsList.howAleoWorks.name, 
    //   goal: t.missionsList.howAleoWorks.goal, 
    //   reward: t.missionsList.howAleoWorks.reward, 
    //   description: t.missionsList.howAleoWorks.description,
    //   locked: true, 
    //   key: 'howAleoWorks' 
    // },
    { 
      id: 4, 
      name: t.missionsList.network.name, 
      goal: t.missionsList.network.goal, 
      reward: t.missionsList.network.reward, 
      description: t.missionsList.network.description,
      locked: true, 
      key: 'network' 
    },
    { 
      id: 5, 
      name: t.missionsList.validator.name, 
      goal: t.missionsList.validator.goal, 
      reward: t.missionsList.validator.reward, 
      description: t.missionsList.validator.description,
      locked: true, 
      key: 'validator' 
    },
    { 
      id: 6, 
      name: t.missionsList.builder.name, 
      goal: t.missionsList.builder.goal, 
      reward: t.missionsList.builder.reward, 
      description: t.missionsList.builder.description,
      locked: false, 
      key: 'builder', 
      isBonus: true 
    }
  ], [t]);

  const [activeMission, setActiveMission] = useState(null);
  const [showZeroRoom, setShowZeroRoom] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  // Загрузка состояния showMissions из localStorage
  const [showMissions, setShowMissions] = useState(() => {
    try {
      const saved = localStorage.getItem('aleoShowMissions');
      return saved ? JSON.parse(saved) : false;
    } catch (error) {
      console.error('Error loading showMissions state:', error);
      return false;
    }
  });

  // Сохранение завершенных миссий в localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aleoCompletedMissions', JSON.stringify(completedMissions));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [completedMissions]);

  // Сохранение состояния showMissions в localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aleoShowMissions', JSON.stringify(showMissions));
    } catch (error) {
      console.error('Error saving showMissions state:', error);
    }
  }, [showMissions]);

  // Разблокировка миссий на основе прогресса
  const unlockedMissions = useMemo(() => 
    missions.map((m, idx) => ({
      ...m,
      locked: idx !== 0 && !m.isBonus && !completedMissions.includes(missions[idx - 1]?.id)
    })),
  [missions, completedMissions]);

  // Больше НЕ открываем ZeroRoom автоматически
  // Пользователь должен сам нажать кнопку "Посмотреть бейдж"

  // Callback после успешного connect
  const handleConnected = () => {
    setShowMissions(true);
  };

  // Сброс прогресса (доступна из консоли: window.resetAleoProgress())
  const resetProgress = useCallback(() => {
    if (window.confirm('Вы уверены, что хотите сбросить весь прогресс? Это действие необратимо.')) {
      localStorage.removeItem('aleoCompletedMissions');
      localStorage.removeItem('aleoShowMissions');
      setCompletedMissions([]);
      setShowMissions(false);
      setShowZeroRoom(false);
      setActiveMission(null);
      console.log('✓ Прогресс успешно сброшен');
    }
  }, []);

  // Просмотр прогресса (доступна из консоли: window.viewAleoProgress())
  const viewProgress = useCallback(() => {
    console.log('📊 Прогресс в Aleo Odyssey:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Завершено миссий: ${completedMissions.length} из ${missions.length}`);
    console.log(`Прогресс: ${Math.round((completedMissions.length / missions.length) * 100)}%`);
    console.log('\nЗавершенные миссии:');
    completedMissions.forEach(id => {
      const mission = missions.find(m => m.id === id);
      if (mission) {
        console.log(`  ✓ ${mission.name} - ${mission.reward}`);
      }
    });
    if (completedMissions.length < missions.length) {
      console.log('\nДоступные миссии:');
      missions.forEach(mission => {
        if (!mission.locked && !completedMissions.includes(mission.id)) {
          console.log(`  → ${mission.name} - ${mission.goal}`);
        }
      });
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }, [completedMissions, missions]);

  // 🔐 Секретная функция разработчика для завершения всех миссий
  const devCompleteAll = useCallback((password) => {
    const DEV_PASSWORD = 'aleo2024'; // Секретный пароль
    
    if (!password) {
      console.log('🔐 Требуется пароль разработчика');
      console.log('Использование: window.aleoDevCompleteAll("пароль")');
      return false;
    }

    if (password !== DEV_PASSWORD) {
      console.error('❌ Неверный пароль разработчика');
      return false;
    }

    // Завершаем все основные миссии (кроме бонусных)
    const allMainMissionIds = missions
      .filter(m => !m.isBonus)
      .map(m => m.id);
    
    setCompletedMissions(allMainMissionIds);
    setShowMissions(true);
    setShowZeroRoom(false); // Сбрасываем ZeroRoom, чтобы можно было протестировать
    setActiveMission(null);

    console.log('🎉 DEV MODE: Все основные миссии завершены!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✓ Завершено миссий: ${allMainMissionIds.length}`);
    allMainMissionIds.forEach(id => {
      const mission = missions.find(m => m.id === id);
      if (mission) {
        console.log(`  ✓ ${mission.name}`);
      }
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💡 Подсказка: Теперь вы можете открыть ZeroRoom');
    
    return true;
  }, [missions]);

  // Делаем функции доступными глобально
  useEffect(() => {
    window.resetAleoProgress = resetProgress;
    window.viewAleoProgress = viewProgress;
    window.aleoDevCompleteAll = devCompleteAll;
    
    // Логируем доступные команды при первом запуске
    console.log('🎮 Aleo Odyssey - console command:');
    console.log('  • window.viewAleoProgress() - ');
    console.log('  • window.resetAleoProgress() - ');
    console.log('  • window.aleoDevCompleteAll("password") -  ');
    
    return () => {
      delete window.resetAleoProgress;
      delete window.viewAleoProgress;
      delete window.aleoDevCompleteAll;
    };
  }, [resetProgress, viewProgress, devCompleteAll]);

  // Запуск миссии
  const handleStartMission = (missionId) => {
    setActiveMission(missionId);
  };

  // Завершение миссии
  const handleMissionComplete = (missionId) => {
    console.log('Mission completed:', missionId); // Для отладки

    if (!completedMissions.includes(missionId)) {
      setCompletedMissions(prev => {
        const updated = [...prev, missionId];
        console.log('Updated completed missions:', updated); // Для отладки
        return updated;
      });
    }

    // Возврат к списку миссий
    setActiveMission(null);
    setShowMissions(true);
  };

  // Возврат к списку миссий без завершения
  const handleBackToMissions = () => {
    setActiveMission(null);
    setShowZeroRoom(false);
    setShowMissions(true);
  };

  // Если активна миссия - показываем её
  if (activeMission === 1) {
    return (
      <TheGenesis
        onBack={handleBackToMissions}
        onComplete={() => handleMissionComplete(1)}
      />
    );
  }

  if (activeMission === 2) {
    return (
      <TheLanguage
        onBack={handleBackToMissions}
        onComplete={() => handleMissionComplete(2)}
      />
    );
  }

  if (activeMission === 3) {
    return (
      <TheCircuit
        onBack={handleBackToMissions}
        onComplete={() => handleMissionComplete(3)}
      />
    );
  }

  // if (activeMission === 4) {
  //   return (
  //     <HowAleoWorks
  //       onBack={handleBackToMissions}
  //       onComplete={() => handleMissionComplete(4)}
  //     />
  //   );
  // }

  if (activeMission === 4) {
    return (
      <TheNetwork
        onBack={handleBackToMissions}
        onComplete={() => handleMissionComplete(4)}
      />
    );
  }

  if (activeMission === 5) {
    return (
      <TheValidator
        onBack={handleBackToMissions}
        onComplete={() => handleMissionComplete(5)}
      />
    );
  }

  if (activeMission === 6) {
    return (
      <CircuitBuilder
        onBack={handleBackToMissions}
      />
    );
  }

  // if (activeMission === 7) {
  //   return (
  //     <TheLedger
  //       onBack={handleBackToMissions}
  //       onComplete={() => handleMissionComplete(7)}
  //     />
  //   );
  // }

  // Если showZeroRoom активен и все основные миссии завершены - показываем ZeroRoom
  if (showZeroRoom) {
    const mainMissionIds = [1, 2, 3, 4, 5];
    const completedMainMissions = completedMissions.filter(id => mainMissionIds.includes(id));
    
    if (completedMainMissions.length === mainMissionIds.length) {
      return (
        <ZeroRoom
          onBack={handleBackToMissions}
          completedMissions={completedMainMissions}
          skipAnimation={true}
        />
      );
    }
  }

  // Если подключились - показываем список миссий
  if (showMissions) {
    return (
      <>
        <Missions
          missions={unlockedMissions}
          completedMissions={completedMissions}
          onStartMission={handleStartMission}
          onShowZeroRoom={() => setShowZeroRoom(true)}
        />
        <WalletModal 
          isOpen={showWalletModal} 
          onClose={() => setShowWalletModal(false)} 
        />
      </>
    );
  }

  // Иначе показываем терминал
  return (
    <>
      <HeroSection onConnected={handleConnected} />
      <WalletModal 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />
    </>
  );
};

const AleoShowcase = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-[#0a0a0f]">
        <Header />
        <div className="pt-16">
          <AleoShowcaseInner />
        </div>
      </div>
    </WalletProvider>
  );
};

export default AleoShowcase;