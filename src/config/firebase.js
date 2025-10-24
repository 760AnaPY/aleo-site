import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Firebase конфигурация
const firebaseConfig = {
  apiKey: "AIzaSyDemoKey-ReplaceWithYourKey",
  authDomain: "zkodyssey-chat.firebaseapp.com",
  databaseURL: "https://zkodyssey-chat-default-rtdb.firebaseio.com",
  projectId: "zkodyssey-chat",
  storageBucket: "zkodyssey-chat.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

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

