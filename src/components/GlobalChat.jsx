import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { database, auth, loginAnonymously } from '../config/firebase';
import { ref, push, onValue, off, set, onDisconnect, serverTimestamp } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const GlobalChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState(null);
  const [onlineCount, setOnlineCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState({});
  const [userName, setUserName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const { language } = useLanguage();

  // Генерация имени пользователя
  const generateUsername = React.useCallback(() => {
    const adjectives = language === 'ru' 
      ? ['Быстрый', 'Умный', 'Крутой', 'Тайный', 'Анонимный', 'Загадочный']
      : ['Swift', 'Smart', 'Cool', 'Secret', 'Anonymous', 'Mysterious'];
    const nouns = language === 'ru'
      ? ['Доказатель', 'Кодер', 'Хакер', 'Валидатор', 'Строитель', 'Исследователь']
      : ['Prover', 'Coder', 'Hacker', 'Validator', 'Builder', 'Explorer'];
    
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 999);
    
    return `${adj}${noun}${num}`;
  }, [language]);

  // Авторизация пользователя
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const defaultName = generateUsername();
        setUserName(defaultName);
        
        // Обновляем presence в Firebase
        const userStatusRef = ref(database, `presence/${currentUser.uid}`);
        const connectedRef = ref(database, '.info/connected');
        
        onValue(connectedRef, (snapshot) => {
          if (snapshot.val() === true) {
            // Когда подключен
            set(userStatusRef, {
              online: true,
              name: defaultName,
              lastSeen: serverTimestamp()
            });
            
            // Когда отключается
            onDisconnect(userStatusRef).set({
              online: false,
              name: defaultName,
              lastSeen: serverTimestamp()
            });
          }
        });
      } else {
        // Автоматическая анонимная авторизация
        loginAnonymously().catch(console.error);
      }
    });

    return () => unsubscribe();
  }, [generateUsername]);

  // Подсчет онлайн пользователей
  useEffect(() => {
    const presenceRef = ref(database, 'presence');
    
    const unsubscribe = onValue(presenceRef, (snapshot) => {
      const presence = snapshot.val();
      if (presence) {
        const online = Object.values(presence).filter(p => p.online).length;
        setOnlineCount(online);
      } else {
        setOnlineCount(0);
      }
    });

    return () => off(presenceRef, 'value', unsubscribe);
  }, []);

  // Загрузка сообщений
  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([id, msg]) => ({
          id,
          ...msg,
          isOwn: msg.userId === user?.uid
        })).sort((a, b) => a.timestamp - b.timestamp);
        
        setMessages(messageList);
      } else {
        setMessages([]);
      }
    });

    return () => off(messagesRef, 'value', unsubscribe);
  }, [user]);

  // Отслеживание печатающих пользователей
  useEffect(() => {
    const typingRef = ref(database, 'typing');
    
    const unsubscribe = onValue(typingRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Фильтруем только тех, кто не текущий пользователь
        const filtered = Object.entries(data)
          .filter(([uid]) => uid !== user?.uid)
          .reduce((acc, [uid, info]) => {
            if (Date.now() - info.timestamp < 3000) { // Показываем только если < 3 сек
              acc[uid] = info;
            }
            return acc;
          }, {});
        
        setTypingUsers(filtered);
      } else {
        setTypingUsers({});
      }
    });

    return () => off(typingRef, 'value', unsubscribe);
  }, [user]);

  // Автоскролл
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  // Обработка ввода (для индикатора "печатает")
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    if (!user) return;
    
    // Устанавливаем "печатает"
    const typingRef = ref(database, `typing/${user.uid}`);
    set(typingRef, {
      name: userName,
      timestamp: Date.now()
    });

    // Очищаем предыдущий таймаут
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Убираем "печатает" через 2 секунды
    typingTimeoutRef.current = setTimeout(() => {
      set(typingRef, null);
    }, 2000);
  };

  // Отправка сообщения
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !user) return;

    const messagesRef = ref(database, 'messages');
    const newMessage = {
      text: inputValue.trim(),
      userName: userName,
      userId: user.uid,
      timestamp: Date.now(),
      language: language
    };

    try {
      await push(messagesRef, newMessage);
      setInputValue('');
      
      // Убираем индикатор "печатает"
      const typingRef = ref(database, `typing/${user.uid}`);
      set(typingRef, null);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Изменение имени пользователя
  const handleNameChange = () => {
    if (!user) return;
    
    const userStatusRef = ref(database, `presence/${user.uid}`);
    set(userStatusRef, {
      online: true,
      name: userName,
      lastSeen: serverTimestamp()
    });
    
    setShowNamePrompt(false);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Форматирование времени
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(language === 'ru' ? 'ru-RU' : 'en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Кнопка открытия чата */}
      <button
        onClick={toggleChat}
        className={`fixed right-6 bottom-6 z-50 group transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open chat"
      >
        <div className="relative">
          {/* Пульсирующий эффект */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00fff7] to-[#c084fc] rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
          
          {/* Основная кнопка */}
          <div className="relative bg-gradient-to-r from-[#00fff7] to-[#c084fc] p-4 rounded-full shadow-2xl hover:shadow-[#00fff7]/50 transition-all duration-300 hover:scale-110">
            <svg 
              className="w-6 h-6 text-black" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
          </div>

          {/* Индикатор новых сообщений */}
          {messages.length > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center">
              <span className="text-xs text-white font-bold">{messages.length}</span>
            </div>
          )}
        </div>
      </button>

      {/* Окно чата */}
      <div
        className={`fixed right-6 bottom-6 z-50 transition-all duration-500 ease-out ${
          isOpen 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="w-96 h-[600px] bg-[#0a0a0f]/95 backdrop-blur-xl border-2 border-[#00fff7] rounded-2xl shadow-2xl shadow-[#00fff7]/20 flex flex-col overflow-hidden">
          {/* Заголовок */}
          <div className="bg-gradient-to-r from-[#00fff7]/20 to-[#c084fc]/20 border-b border-[#00fff7]/30 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h3 className="text-[#00fff7] font-bold text-lg">
                  {language === 'ru' ? 'Глобальный Чат' : 'Global Chat'}
                </h3>
                <p className="text-xs text-gray-400">
                  {language === 'ru' ? 'Онлайн' : 'Online'}: {onlineCount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNamePrompt(!showNamePrompt)}
                className="text-gray-400 hover:text-[#00fff7] transition-colors p-2 hover:bg-white/5 rounded-lg"
                title={language === 'ru' ? 'Сменить имя' : 'Change name'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              
              <button
                onClick={toggleChat}
                className="text-gray-400 hover:text-[#00fff7] transition-colors p-2 hover:bg-white/5 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Форма смены имени */}
          {showNamePrompt && (
            <div className="bg-[#00fff7]/10 border-b border-[#00fff7]/30 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={language === 'ru' ? 'Введите имя...' : 'Enter name...'}
                  className="flex-1 bg-gray-900/50 border border-[#00fff7]/20 rounded-lg px-3 py-1 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00fff7]"
                  onKeyPress={(e) => e.key === 'Enter' && handleNameChange()}
                />
                <button
                  onClick={handleNameChange}
                  className="bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black px-3 py-1 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  ✓
                </button>
              </div>
            </div>
          )}

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {/* Приветственное сообщение */}
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p className="text-sm">
                  {language === 'ru' 
                    ? '👋 Будьте первым, кто напишет сообщение!' 
                    : '👋 Be the first to send a message!'}
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`max-w-[80%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.isOwn && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00fff7] to-[#c084fc] flex items-center justify-center text-xs font-bold text-black">
                        {msg.userName[0].toUpperCase()}
                      </div>
                    )}
                    <span className={`text-xs ${msg.isOwn ? 'text-[#c084fc]' : 'text-[#00fff7]'}`}>
                      {msg.userName}
                    </span>
                    <span className="text-xs text-gray-600">{formatTime(msg.timestamp)}</span>
                  </div>
                  
                  <div className={`rounded-2xl p-3 ${
                    msg.isOwn
                      ? 'bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black'
                      : 'bg-gray-800/50 text-gray-300'
                  }`}>
                    <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Индикатор печатающих */}
            {Object.keys(typingUsers).length > 0 && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-[#00fff7]/10 border border-[#00fff7]/30 rounded-2xl p-3 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#00fff7] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-[#00fff7] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-[#00fff7] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {Object.values(typingUsers)[0]?.name} {language === 'ru' ? 'печатает...' : 'is typing...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Форма ввода */}
          <form 
            onSubmit={handleSendMessage}
            className="border-t border-[#00fff7]/30 p-4 bg-[#0a0a0f]/80"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={language === 'ru' ? 'Написать сообщение...' : 'Type a message...'}
                className="flex-1 bg-gray-900/50 border border-[#00fff7]/20 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00fff7] focus:ring-1 focus:ring-[#00fff7] transition-all"
                disabled={!user}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || !user}
                className="bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-black p-2 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Стили */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 255, 247, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00fff7 0%, #c084fc 100%);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #00fff7 50%, #c084fc 100%);
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default GlobalChat;
