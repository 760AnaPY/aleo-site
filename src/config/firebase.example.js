// 🔥 ПРИМЕР КОНФИГУРАЦИИ FIREBASE
// 
// 1. Скопируй этот файл и переименуй в firebase.js
// 2. Замени все значения на свои из Firebase Console
// 3. НЕ коммить firebase.js в git (уже в .gitignore)

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

// ========================================
// ЗАМЕНИ ВСЕ ЗНАЧЕНИЯ НА СВОИ! ↓
// ========================================
const firebaseConfig = {
  // Твой API ключ из Firebase Console
  apiKey: "AIzaSyC_ЗАМЕНИ_НА_СВОЙ_API_KEY",
  
  // Домен авторизации (обычно: твой-проект.firebaseapp.com)
  authDomain: "твой-проект.firebaseapp.com",
  
  // URL базы данных (обычно: https://твой-проект-default-rtdb.РЕГИОН.firebasedatabase.app)
  databaseURL: "https://твой-проект-default-rtdb.europe-west1.firebasedatabase.app",
  
  // ID проекта
  projectId: "твой-проект-id",
  
  // Storage bucket
  storageBucket: "твой-проект.appspot.com",
  
  // Messaging Sender ID
  messagingSenderId: "123456789012",
  
  // App ID
  appId: "1:123456789012:web:abcdef123456789abc"
};

// ========================================
// КАК ПОЛУЧИТЬ КОНФИГУРАЦИЮ:
// ========================================
// 
// 1. Открой Firebase Console: https://console.firebase.google.com/
// 2. Выбери свой проект или создай новый
// 3. Нажми на шестеренку ⚙️ → "Project Settings"
// 4. Прокрути вниз до раздела "Your apps"
// 5. Нажми на иконку Web (</>) если еще не создал приложение
// 6. Скопируй объект firebaseConfig
// 7. Вставь сюда вместо значений "ЗАМЕНИ_НА_СВОЙ..."
//
// Подробная инструкция: см. файл НАСТРОЙКА_FIREBASE.md

// ========================================
// НЕ ТРОГАЙ КОД НИЖЕ! ↓
// ========================================

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Анонимная авторизация
export const loginAnonymously = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in anonymously:", error);
    throw error;
  }
};

export { database, auth };
export default app;


