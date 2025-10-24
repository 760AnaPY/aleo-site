# 🚀 Быстрый старт чата ZKODYSSEY

## ⚡ За 5 минут:

### 1. Firebase Console
```
1. Откройте: https://console.firebase.google.com/
2. Создайте проект "zkodyssey-chat"
3. Включите Authentication → Anonymous
4. Создайте Realtime Database (test mode)
```

### 2. Скопируйте конфиг

В Firebase Console:
- Project Settings ⚙️
- Прокрутите вниз → "Your apps" → Web `</>`
- Скопируйте firebaseConfig

### 3. Вставьте в код

Откройте `src/config/firebase.js` и замените:

```javascript
const firebaseConfig = {
  apiKey: "ВАШ_API_KEY",
  authDomain: "ваш-проект.firebaseapp.com",
  databaseURL: "https://ваш-проект-default-rtdb.firebaseio.com",
  projectId: "ваш-проект-id",
  storageBucket: "ваш-проект.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 4. Правила безопасности

В Realtime Database → Rules:

```json
{
  "rules": {
    "messages": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "presence": {
      ".read": "auth != null",
      "$uid": {
        ".write": "$uid === auth.uid"
      }
    },
    "typing": {
      ".read": "auth != null",
      "$uid": {
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

Нажмите "Publish"

### 5. Готово! 🎉

```bash
npm run dev
```

Чат появится справа внизу экрана!

---

## 🎨 Функционал:

✅ Реальные сообщения между пользователями  
✅ Счетчик онлайн пользователей  
✅ Индикатор "печатает..."  
✅ Смена имени пользователя  
✅ Анонимная авторизация  
✅ Мультиязычность (RU/EN)  

---

## 📱 Тестирование:

1. Откройте сайт в 2+ вкладках/браузерах
2. Напишите сообщение в одной вкладке
3. Увидите его в другой в реальном времени!
4. Счетчик онлайн увеличится

---

## 🔧 Troubleshooting:

**Чат не работает?**
- Проверьте консоль на ошибки
- Убедитесь что Firebase config правильный
- Проверьте что Anonymous auth включен
- Проверьте правила безопасности

**Сообщения не отправляются?**
- Проверьте что Realtime Database создана
- Проверьте правила `.write`

---

Подробная инструкция: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

