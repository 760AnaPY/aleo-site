# План добавления мультиязычности в ZeroRoom.jsx

## Обзор задачи
Добавить поддержку английского языка для страницы бейджа (ZeroRoom.jsx), чтобы все тексты переводились в зависимости от выбранного языка.

## Текущая ситуация
- Компонент ZeroRoom.jsx содержит hardcoded русские тексты
- В проекте используется кастомная система переводов с `useLanguage` и `useTranslations`
- Переводы для ZeroRoom уже существуют в `src/locales/translations.js`
- Другие компоненты миссий уже используют систему переводов

## Шаги реализации

### 1. Добавить импорты в ZeroRoom.jsx
```jsx
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslations } from '../../locales/translations';
```

### 2. Добавить хуки в компонент
```jsx
const { language } = useLanguage();
const t = useTranslations(language);
```

### 3. Заменить hardcoded тексты на переводные ключи

#### Stage 0: Вход в ZeroRoom
- `"ZERO ROOM"` → `t.zeroRoom.entering`
- `"Зона нулевых знаний"` → `t.zeroRoom.initializing`
- `"Инициализация квантового пространства..."` → `t.zeroRoom.initializing`

#### Stage 1: Генерация бейджа
- `"ГЕНЕРАЦИЯ ZK-BADGE"` → `t.zeroRoom.generating`
- `"СКАНИРОВАНИЕ ПРОГРЕССА... ✓"` → `t.zeroRoom.scanning + " ... ✓"`
- `"ВЕРИФИКАЦИЯ ДОКАЗАТЕЛЬСТВ... ✓"` → `t.zeroRoom.verifying + " ... ✓"`
- `"ПОСТРОЕНИЕ MERKLE TREE... ✓"` → `t.zeroRoom.building + " ... ✓"`
- `"ГЕНЕРАЦИЯ КРИПТОГРАФИЧЕСКОЙ ПОДПИСИ... ✓"` → `t.zeroRoom.signature + " ... ✓"`
- `"КОМПИЛЯЦИЯ ZK-BADGE..."` → `t.zeroRoom.compiling`

#### Stage 2: Финальный бейдж
- `"ZK-BADGE v1.0"` → `t.zeroRoom.badge`
- `"VALIDATOR"` → `t.zeroRoom.validator`
- `"ZERO KNOWLEDGE MASTER"` → `t.zeroRoom.zkMaster`
- `"Миссий завершено:"` → `t.zeroRoom.missions + ":"`
- `"Уровень мастерства:"` → `t.zeroRoom.level + ":"`
- `"ZK Proof Score:"` → `t.zeroRoom.zkScore + ":"`
- `"ПОЗДРАВЛЯЕМ!"` → `t.zeroRoom.congratulations` (нужно добавить)
- `"Вы успешно прошли все миссии Aleo Odyssey"` → `t.zeroRoom.successMessage` (нужно добавить)
- `"Теперь вы — сертифицированный эксперт по Zero Knowledge Proof"` → `t.zeroRoom.expertMessage` (нужно добавить)

#### Достижения
- `"Достижения"` → `t.zeroRoom.achievements`
- `"ZK Knowledge"`, `"Leo Master"`, `"Network Pro"` → использовать существующие переводы

#### Кнопки
- `"ВЕРНУТЬСЯ К МИССИЯМ"` → `t.zeroRoom.backToMissions`
- `"ПОДЕЛИТЬСЯ БЕЙДЖЕМ 📋"` → `t.zeroRoom.shareBadge + " 📋"`

### 4. Добавить недостающие переводы в translations.js

#### Английские переводы (добавить к существующим):
```javascript
zeroRoom: {
  // ... существующие переводы
  congratulations: "CONGRATULATIONS!",
  successMessage: "You have successfully completed all Aleo Odyssey missions",
  expertMessage: "You are now a certified Zero Knowledge Proof expert"
}
```

#### Русские переводы (добавить к существующим):
```javascript
zeroRoom: {
  // ... существующие переводы
  congratulations: "ПОЗДРАВЛЯЕМ!",
  successMessage: "Вы успешно прошли все миссии Aleo Odyssey",
  expertMessage: "Теперь вы — сертифицированный эксперт по Zero Knowledge Proof"
}
```

### 5. Обновить alert сообщение
Заменить:
```jsx
alert('Информация о бейдже скопирована в буфер обмена!');
```
На:
```jsx
alert(t.zeroRoom.badgeCopied);
```

## Текст для замены в ZeroRoom.jsx

### Полный список замен:
1. Строка ~162: `"ZERO ROOM"` → `{t.zeroRoom.entering}`
2. Строка ~165: `"Зона нулевых знаний"` → `{t.zeroRoom.initializing}`
3. Строка ~168: `"Инициализация квантового пространства..."` → `{t.zeroRoom.initializing}`
4. Строка ~191: `"ГЕНЕРАЦИЯ ZK-BADGE"` → `{t.zeroRoom.generating}`
5. Строка ~195: `"СКАНИРОВАНИЕ ПРОГРЕССА... ✓"` → `{t.zeroRoom.scanning}... ✓`
6. Строка ~198: `"ВЕРИФИКАЦИЯ ДОКАЗАТЕЛЬСТВ... ✓"` → `{t.zeroRoom.verifying}... ✓`
7. Строка ~201: `"ПОСТРОЕНИЕ MERKLE TREE... ✓"` → `{t.zeroRoom.building}... ✓`
8. Строка ~204: `"ГЕНЕРАЦИЯ КРИПТОГРАФИЧЕСКОЙ ПОДПИСИ... ✓"` → `{t.zeroRoom.signature}... ✓`
9. Строка ~207: `"КОМПИЛЯЦИЯ ZK-BADGE..."` → `{t.zeroRoom.compiling}`
10. Строка ~233: `"ZK-BADGE v1.0"` → `{t.zeroRoom.badge}`
11. Строка ~239: `"VALIDATOR"` → `{t.zeroRoom.validator}`
12. Строка ~241: `"ZERO KNOWLEDGE MASTER"` → `{t.zeroRoom.zkMaster}`
13. Строка ~247: `"Миссий завершено:"` → `{t.zeroRoom.missions}:`
14. Строка ~251: `"Уровень мастерства:"` → `{t.zeroRoom.level}:`
15. Строка ~255: `"ZK Proof Score:"` → `{t.zeroRoom.zkScore}:`
16. Строка ~278: `"ПОЗДРАВЛЯЕМ!"` → `{t.zeroRoom.congratulations}`
17. Строка ~281: `"Вы успешно прошли все миссии Aleo Odyssey"` → `{t.zeroRoom.successMessage}`
18. Строка ~284: `"Теперь вы — сертифицированный эксперт по Zero Knowledge Proof"` → `{t.zeroRoom.expertMessage}`
19. Строка ~313: `"ВЕРНУТЬСЯ К МИССИЯМ"` → `{t.zeroRoom.backToMissions}`
20. Строка ~322: `"ПОДЕЛИТЬСЯ БЕЙДЖЕМ 📋"` → `{t.zeroRoom.shareBadge} 📋`
21. Строка ~318: `alert('Информация о бейдже скопирована в буфер обмена!');` → `alert(t.zeroRoom.badgeCopied);`

## Проверка
После реализации нужно проверить:
1. При переключении на английский язык все тексты меняются на английский
2. При переключении на русский язык все тексты остаются на русском
3. Анимации и функциональность не нарушены
4. Корректное отображение текстов разной длины

## Примечания
- Некоторые тексты в achievements уже имеют переводы в `t.zeroRoom.zkKnowledge`, `t.zeroRoom.leoMaster`, `t.zeroRoom.networkPro`
- Нужно аккуратно обработать тексты с переменными (например, количество миссий)
- При замене текстов сохранить существующее форматирование и CSS классы