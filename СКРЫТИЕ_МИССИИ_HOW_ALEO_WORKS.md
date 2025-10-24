# 🔒 Миссия "How Aleo Works" скрыта

## ✅ Что сделано

Миссия "How Aleo Works" убрана из списка миссий, но файлы сохранены на случай, если понадобится в будущем.

## 📝 Изменения

### 1. **Закомментирован импорт** (`src/AleoShowcase.jsx`)
```javascript
// import HowAleoWorks from "./missions/TheGenesis/HowAleoWorks";
```

### 2. **Удалена из списка миссий**
```javascript
// { 
//   id: 4, 
//   name: t.missionsList.howAleoWorks.name, 
//   ...
// },
```

### 3. **Обновлена нумерация миссий**

**Было:**
- ID 1: The Genesis
- ID 2: The Language
- ID 3: The Circuit
- ID 4: **How Aleo Works** ← убрана
- ID 5: The Network
- ID 6: The Validator
- ID 7: Circuit Builder (bonus)

**Стало:**
- ID 1: The Genesis
- ID 2: The Language
- ID 3: The Circuit
- ID 4: The Network ← теперь ID 4
- ID 5: The Validator ← теперь ID 5
- ID 6: Circuit Builder (bonus) ← теперь ID 6

### 4. **Закомментирован рендеринг компонента**
```javascript
// if (activeMission === 4) {
//   return (
//     <HowAleoWorks
//       onBack={handleBackToMissions}
//       onComplete={() => handleMissionComplete(4)}
//     />
//   );
// }
```

### 5. **Обновлен список для ZeroRoom**
```javascript
const mainMissionIds = [1, 2, 3, 4, 5]; // было [1, 2, 3, 4, 5, 6]
```

## 📁 Сохраненные файлы

Файлы миссии НЕ удалены, только скрыты:
- ✅ `src/missions/TheGenesis/HowAleoWorks.jsx`
- ✅ Переводы в `src/locales/translations.js`
- ✅ Документация

## 🎯 Результат

- ✅ **Миссия не отображается** в списке миссий
- ✅ **Не учитывается** при подсчете прогресса
- ✅ **ZeroRoom открывается** после 5 основных миссий (вместо 6)
- ✅ **Нумерация обновлена** для всех последующих миссий
- ✅ **Нет ошибок линтера**

## 🔄 Как вернуть миссию в будущем

Если понадобится вернуть миссию, просто:
1. Раскомментировать импорт
2. Раскомментировать объект миссии в массиве
3. Раскомментировать блок рендеринга
4. Обновить нумерацию обратно

---

**Миссия "How Aleo Works" успешно скрыта!** 🔒


