import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        hero: {
          title: "Privacy-First Blockchain",
          subtitle: "Built on",
          subtitle2: "technologies for private and secure applications.",
          explore: "Explore Aleo",
          learn: "Learn More",
        },
        features: {
          title: "Features",
          items: {
            privacy: {
              title: "Full Privacy",
              desc: "All transactions are hidden using ZK-proof.",
            },
            wallet: {
              title: "Asset Management",
              desc: "Secure management of cryptocurrency and tokens.",
            },
            network: {
              title: "Decentralized Network",
              desc: "Transparent and secure network without central control.",
            },
          },
        },
        network: {
          title: "Aleo Network Stats",
          description:
            "Main network indicators: staked token percentage, transactions, and social media audience.",
          staked: "Tokens Staked",
          transactions: "Transactions",
          twitter_followers: "Twitter Followers",
          discord_followers: "Discord Followers",
        },
        projects: {
          title: "Partners",
          view: "View",
          categories: {
            partnerships: "Partnerships",
          },
          items: {
            request: {
              title: "Request Finance",
              description: "Finance platform for stablecoins.",
            },
            globaldollar: {
              title: "Global Dollar Network",
              description:
                "An open network aimed at accelerating stablecoin adoption in the global economy.",
            },
            revolut: {
              title: "Revolut",
              description: "UK-based fintech company / neo-bank.",
            },
          },
        },
        privateDemo: {
          title: "Sending a Private Transaction",
          description:
            "In Bitcoin and Ethereum all transactions are visible, but in Aleo data remains private. Only a proof of correctness is sent to the network.",
        },
        transactions: {
          bitcoin: [
            "Alice (2 BTC) → Bob (0.5 BTC)",
            "Charlie (1 BTC) → Dave (0.7 BTC)",
          ],
          ethereum: [
            "Alice (3 ETH) → Bob (1.2 ETH)",
            "Charlie (5 ETH) → Dave (2.3 ETH)",
          ],
          aleo: ["x5gF2gf90dd32g...", "gY9d02kl21Az..."],
        },
        transactionDemo: {
          title: "What is a private transaction?",
          description:
            "A private transaction allows you to send funds or data so that no one in the network sees the details — only the proof of correctness. Using zk-proof (zero-knowledge proof), the network validates the transaction without revealing sender, recipient, or amount.",
          steps: [
            "Form a transaction with sender, recipient and amount",
            "Locally generate a zk-proof — proof of transaction correctness",
            "Send only the proof of the transaction to the network",
            "Get the response from the server with the result",
          ],
        },
        transactionProcess: {
          title: "What happens after sending a transaction?",
          description:
            "After sending a private transaction with zk-proof, the Aleo network checks the proof, validates correctness, and updates balances. All details remain private.",
          steps: [
            "Sender has sufficient funds",
            "Transaction does not violate network rules",
            "Smart contract actions are correct"
          ],
          zkCheck: "zk-proof Verification",
          sendProof: "Sending zk-proof to blockchain",
          inBlock: "Included in block",
          proofValid: "proof valid",
          proofInvalid: "proof invalid"
        },
        consensus: {
          title: "How Consensus Works in Aleo",
          description:
            "In Aleo, consensus is based on a hybrid approach: like PoW, computational work is used, but it is special — not hash mining, but SNARK-proof generation.",
          note:
            "In classical Bitcoin-style, miners compete for the correct hash, while in Aleo provers perform useful computations: building cryptographic proofs of transaction correctness.",
          roles: {
            Provers:
              "Provers perform computational work — generating SNARK proofs that validate transactions.",
            Validators:
              "Validators check the submitted proofs and include transactions in the blockchain.",
            Stakers:
              "Stakers secure the network by staking their tokens and participating in validator selection.",
          },
        },
        block: {
          title: "Block Composition",
          description: "Each block in the Aleo blockchain contains a header, transactions, and the network state. Below is a visual example of a block.",
          imageAlt: "Block Placeholder",
          header: {
            title: "Block Header:",
            items: [
              "Previous block hash",
              "Timestamp",
              "State Merkle root",
              "Other metadata"
            ]
          },
          transactions: {
            title: "Transactions:",
            items: [
              "zk-proof transactions",
              "Sender signatures"
            ]
          },
          state: {
            title: "State:",
            items: [
              "Current network state"
            ]
          },
          structure: {
            title: "Block Structure in Aleo",
            paragraph1: "Blocks in Aleo are designed to guarantee privacy and verifiability. Each block contains a header, a list of transactions, and the network state.",
            paragraph2: "Unlike traditional blockchains, Aleo does not store transactions in plaintext. Instead, blocks contain only proofs of correctness, combining privacy and security."
          }
        },
        // часть resources.en.translation
        leo: {
          title: "Leo — language for private applications",
          description: "Leo enables writing programs for Aleo with zero-knowledge proofs, ensuring data privacy and security.",
          privacy: {
            title: "Privacy by Design",
            code: `// Transfer function hides the amount
        function transfer(amount: u64, to: address) {
            // Check that balance is sufficient
            assert(amount <= balance);
            // Decrease sender balance
            balance -= amount;
            // Send funds
            send(to, amount);
        }`
          },
          typing: {
            title: "Strong Typing",
            code: `// All variables have strict types
        let balance: u64 = 1000;   // user's balance
        let recipient: address;    // recipient address`
          },
          structures: {
            title: "Structures and Functions",
            code: `// User structure
        struct User {
            name: string;
            balance: u64;
        }

        // Function to create a new user
        function create_user(name: string) -> User {
            return User { name, balance: 0 };
        }`
          },
          snark: {
            title: "Compiled to SNARK",
            code: `// Leo code is compiled to a SNARK proof
        // Simple balance check example
        function check_balance(user: User, amount: u64) {
            assert(user.balance >= amount);
        }`
          },
          integration: {
            title: "Integration with Aleo",
            code: `// Leo works directly with Aleo
        // Transactions are automatically turned into zk-proofs
        function send_private(amount: u64, to: address) {
            assert(amount <= balance);
            balance -= amount;
            send(to, amount); // zk-proof is generated under the hood
        }`
          }
        },
        compare: {
          intro_pre: "Let's compare two approaches:",
          intro_mid: "— a language for private applications on",
          intro_post: "— the standard for smart contracts.",
          leo: {
            name: "Leo",
            platform: "Aleo",
            desc: "Leo is designed from the ground up for Zero-Knowledge Proofs. Privacy is built into the language.",
            code: `// Addition function in Leo
        function add(a: u32, b: u32) -> u32 {
            // addition is performed privately
            return a + b;
        }

        // the result can be proven via a zk-proof
        // without revealing inputs`
          },
          solidity: {
            name: "Solidity",
            platform: "Ethereum",
            desc: "Solidity is built for public computation. Data and function calls are visible on-chain.",
            code: `// Addition contract in Solidity
        pragma solidity ^0.8.0;

        contract Calculator {
            function add(uint a, uint b) public pure returns (uint) {
                // result and arguments will be public
                return a + b;
            }
        }`
          }
        },

        avm: {
          title: "Aleo Virtual Machine (AVM)",
          description: "The Aleo Virtual Machine (AVM) executes programs written in Leo. Unlike the Ethereum Virtual Machine (EVM), the AVM generates a cryptographic proof (SNARK) that verifies the correctness of computations while keeping data private.",
          flow: {
            leo_program: "Leo Program",
            avm: "AVM",
            snark: "SNARK Proof",
            blockchain: "Blockchain"
          },
          table: {
            feature: "Feature",
            execution: "Execution model",
            privacy: "Privacy",
            performance: "Performance",
            language: "Language",
            scalability: "Scalability",
            evm: {
              execution: "Each node executes code",
              privacy: "All data is public",
              performance: "Slow (every node recomputes)",
              scalability: "Limited (everyone computes everything)"
            },
            avm: {
              execution: "Proof is generated, nodes only verify",
              privacy: "Data is private, only proof is revealed",
              performance: "Fast (cheap proof verification)",
              scalability: "High (nodes only verify)"
            }
          },
          devtools: {
            title: "Developer Tools",
            description: "AVM integrates with Aleo Studio and Aleo Package Manager, allowing developers to build private and verifiable dApps. You can use local testnets to debug proofs before deploying to mainnet.",
            playground: {
              title: "Leo Playground",
              desc: "An IDE for writing private apps in Leo."
            },
            manager: {
              title: "Aleo Package Manager",
              desc: "Manage dependencies and project builds."
            },
            deploy: {
              title: "Deploy dApp",
              desc: "Build private DeFi, games, and DAOs on Aleo."
            }
          }
        },
faq: {
          title: "Frequently Asked Questions — Aleo",
          items: [
            {
              q: "Can my transactions be tracked in Aleo?",
              a: "No, if it’s a private transaction. In Aleo, they are confirmed with zk-proofs instead of open data. Even validators only see the proof, not the transaction details."
            },
            {
              q: "How is Aleo different from Monero or Zcash?",
              a: "Zcash and Monero only provide privacy for transfers. Aleo goes further — here you can build full-fledged private applications (DeFi, games, voting) in the Leo language."
            },
            {
              q: "Why is the Leo language unique?",
              a: "Leo was designed specifically for zero-knowledge. Developers write normal code, and the compiler automatically converts it into a cryptographic circuit with zk-proof generation."
            },
            {
              q: "What role do miners and validators play in Aleo?",
              a: "They don’t re-execute transactions, only verify zk-proofs. This shifts the load to cryptographic proofs and makes the network more scalable."
            },
            {
              q: "Can Aleo compete with Ethereum?",
              a: "Aleo doesn’t replace Ethereum but complements it. Ethereum is for open smart contracts, Aleo is for private computations. In the future, they may work together through bridges."
            },
            {
              q: "Where can Aleo actually be applied?",
              a: "Examples: private DeFi protocols, sealed-bid auctions, corporate settlements, private messengers and social networks. Anywhere confidentiality and verifiability are important."
            }
          ]
        },

        footer: {
          text: "All rights reserved",
        },
      },
    },
    ru: {
      translation: {
        hero: {
          title: "Блокчейн с приоритетом приватности",
          subtitle: "Построен на",
          subtitle2: "технологиях для приватных и безопасных приложений.",
          explore: "Изучить Aleo",
          learn: "Узнать больше",
        },
        features: {
          title: "Функционал",
          items: {
            privacy: {
              title: "Полная приватность",
              desc: "Все транзакции скрыты с использованием ZK-proof.",
            },
            wallet: {
              title: "Управление активами",
              desc: "Безопасное управление криптовалютой и токенами.",
            },
            network: {
              title: "Децентрализованная сеть",
              desc: "Прозрачная и безопасная сеть без центрального контроля.",
            },
          },
        },
        network: {
          title: "Статистика сети Aleo",
          description:
            "Основные показатели сети Aleo: процент застейканных токенов, транзакции и аудитория в социальных сетях.",
          staked: "Застейкано токенов",
          transactions: "Транзакции",
          twitter_followers: "Подписчики в Twitter",
          discord_followers: "Подписчики в Discord",
        },
        projects: {
          title: "Партнеры",
          view: "Смотреть",
          categories: {
            all: "Все",
            partnerships: "Партнёрства",
          },
          items: {
            request: {
              title: "Request Finance",
              description: "Платформа для работы со стейблкоинами.",
            },
            globaldollar: {
              title: "Global Dollar Network",
              description:
                "Открытая сеть, цель которой — ускорить внедрение стейблкоинов в глобальной экономике.",
            },
            revolut: {
              title: "Revolut",
              description: "Британская финтех-компания / нео-банк.",
            },
          },
        },
        projects: {
          categories: {},
        },
        privateDemo: {
          title: "Отправка приватной транзакции",
          description:
            "В Bitcoin и Ethereum все транзакции видимы, а в Aleo данные остаются приватными. В сеть отправляется только доказательство корректности.",
        },
        transactions: {
          bitcoin: [
            "Alice (2 BTC) → Bob (0.5 BTC)",
            "Charlie (1 BTC) → Dave (0.7 BTC)",
          ],
          ethereum: [
            "Alice (3 ETH) → Bob (1.2 ETH)",
            "Charlie (5 ETH) → Dave (2.3 ETH)",
          ],
          aleo: ["x5gF2gf90dd32g...", "gY9d02kl21Az..."],
        },
        transactionDemo: {
          title: "Что такое приватная транзакция?",
          description:
            "Приватная транзакция позволяет отправлять средства или данные так, чтобы никто в сети не видел конкретные детали — только доказательство корректности. Используя zk-proof (zero-knowledge proof), сеть подтверждает, что транзакция действительна, не раскрывая отправителя, получателя или сумму.",
          steps: [
            "Формируем транзакцию с указанием отправителя, получателя и суммы",
            "Локально создаем zk-proof — доказательство корректности транзакции",
            "Отправляем только proof транзакции в сеть",
            "Получаем ответ от сервера с результатом отправки",
          ],
        },
        transactionProcess: {
          title: "Что происходит после отправки транзакции?",
          description:
            "После отправки приватной транзакции с zk-proof сеть Aleo проверяет доказательство, подтверждает корректность и обновляет баланс. Все детали остаются приватными.",
          steps: [
            "У отправителя есть нужные средства",
            "Транзакция не нарушает правила сети",
            "Действия смарт-контракта корректны"
          ],
          zkCheck: "Проверка zk-proof",
          sendProof: "Отправка zk-proof в блокчейн",
          inBlock: "Включение в блок",
          proofValid: "proof валиден",
          proofInvalid: "proof невалиден"
        },
        consensus: {
          title: "Как работает консенсус в Aleo",
          description:
            "У Aleo он основан на гибриде: как в PoW — используется вычислительная работа, но работа особая — не поиск хэша, а генерация SNARK-доказательств.",
          note:
            "В классическом Bitcoin-стиле майнеры гоняются за правильным хэшом, в Aleo же provers выполняют полезные вычисления: строят криптографические доказательства корректности транзакций.",
          rol: {prov: "Provers", val: "Validators", st: "Stakers"},
          roles: {
            Provers:
              "Provers выполняют вычислительную работу — создают SNARK-доказательства, подтверждающие корректность транзакций.",
            Validators:
              "Validators проверяют полученные доказательства и включают транзакции в блокчейн.",
            Stakers:
              "Stakers обеспечивают безопасность сети, замораживая свои токены и участвуя в выборе валидаторов.",
          },
        },
        block: {
          title: "Из чего состоит блок",
          description: "Каждый блок в блокчейне Aleo содержит заголовок, транзакции и состояние сети. Ниже показан визуальный пример блока.",
          imageAlt: "Block Placeholder",
          header: {
            title: "Block Header:",
            items: [
              "Хеш предыдущего блока",
              "Метка времени (timestamp)",
              "Root Merkle-дерева состояния",
              "Другие метаданные"
            ]
          },
          transactions: {
            title: "Transactions:",
            items: [
              "zk-proof транзакции",
              "Сигнатуры отправителей"
            ]
          },
          state: {
            title: "State:",
            items: [
              "Текущее состояние сети"
            ]
          },
          structure: {
            title: "Структура блока в Aleo",
            paragraph1: "Блоки в Aleo спроектированы так, чтобы гарантировать приватность и проверяемость. Каждый блок включает заголовок, список транзакций и состояние сети.",
            paragraph2: "В отличие от традиционных блокчейнов, Aleo не хранит транзакции в открытом виде. Вместо этого блоки содержат только доказательства корректности, что сочетает приватность и безопасность."
          }
        },
        // часть resources.ru.translation
        leo: {
          title: "Leo — язык для приватных приложений",
          description: "Leo позволяет писать программы для Aleo с zero-knowledge доказательствами, обеспечивая приватность данных и безопасность.",
          privacy: {
            title: "Приватность встроена",
            code: `// Функция перевода, скрывающая сумму
        function transfer(amount: u64, to: address) {
            // Проверка, что баланс достаточен
            assert(amount <= balance);
            // Уменьшаем баланс отправителя
            balance -= amount;
            // Отправляем средства
            send(to, amount);
        }`
          },
          typing: {
            title: "Сильная типизация",
            code: `// Все переменные имеют строгие типы
        let balance: u64 = 1000;   // баланс пользователя
        let recipient: address;    // адрес получателя`
          },
          structures: {
            title: "Структуры и функции",
            code: `// Структура пользователя
        struct User {
            name: string;
            balance: u64;
        }

        // Функция для создания нового пользователя
        function create_user(name: string) -> User {
            return User { name, balance: 0 };
        }`
          },
          snark: {
            title: "Компиляция в SNARK",
            code: `// Leo код компилируется в SNARK proof
        // Пример простой проверки баланса
        function check_balance(user: User, amount: u64) {
            assert(user.balance >= amount);
        }`
          },
          integration: {
            title: "Интеграция с Aleo",
            code: `// Leo работает напрямую с Aleo
        // Транзакции автоматически превращаются в zk-proof
        function send_private(amount: u64, to: address) {
            assert(amount <= balance);
            balance -= amount;
            send(to, amount); // zk-proof создается под капотом
        }`
          }
        },
        compare: {
          intro_pre: "Сравним два подхода:",
          intro_mid: "— язык для приватных приложений на",
          intro_post: "— стандарт для смарт-контрактов.",
          leo: {
            name: "Leo",
            platform: "Aleo",
            desc: "Leo изначально разработан для Zero-Knowledge Proofs. Приватность встроена на уровне языка.",
            code: `// Функция сложения в Leo
        function add(a: u32, b: u32) -> u32 {
            // сложение выполняется приватно
            return a + b;
        }

        // результат можно доказать через zk-proof,
        // не раскрывая входные значения`
          },
          solidity: {
            name: "Solidity",
            platform: "Ethereum",
            desc: "Solidity ориентирован на публичные вычисления. Все данные и вызовы функций видны в блокчейне.",
            code: `// Контракт сложения в Solidity
        pragma solidity ^0.8.0;

        contract Calculator {
            function add(uint a, uint b) public pure returns (uint) {
                // результат и аргументы будут публичны
                return a + b;
            }
        }`
          }
        },
        avm: {
          title: "Aleo Virtual Machine (AVM)",
          description: "Aleo Virtual Machine (AVM) — это движок, который выполняет программы на языке Leo. В отличие от Ethereum Virtual Machine (EVM), AVM генерирует криптографическое доказательство (SNARK), подтверждающее корректность вычислений и сохраняющее данные приватными.",
          flow: {
            leo_program: "Программа на Leo",
            avm: "AVM",
            snark: "SNARK-доказательство",
            blockchain: "Блокчейн"
          },
          table: {
            feature: "Характеристика",
            execution: "Модель исполнения",
            privacy: "Приватность",
            performance: "Производительность",
            language: "Язык",
            scalability: "Масштабируемость",
            evm: {
              execution: "Каждый узел выполняет код",
              privacy: "Все данные публичны",
              performance: "Медленно (каждый узел считает заново)",
              scalability: "Ограничена (все считают всё)"
            },
            avm: {
              execution: "Генерируется доказательство, узлы только проверяют",
              privacy: "Данные приватны, раскрывается только proof",
              performance: "Быстро (дешёвая проверка proof)",
              scalability: "Высокая (узлы только проверяют)"
            }
          },
          devtools: {
            title: "Возможности для разработчиков",
            description: "AVM интегрируется с Aleo Studio и Aleo Package Manager, что позволяет создавать приватные и проверяемые dApp. Можно использовать локальные тестовые сети для отладки proof перед деплоем в основную сеть.",
            playground: {
              title: "Leo Playground",
              desc: "IDE для написания приватных приложений на языке Leo."
            },
            manager: {
              title: "Aleo Package Manager",
              desc: "Управление зависимостями и сборкой проектов."
            },
            deploy: {
              title: "Деплой dApp",
              desc: "Создавайте приватные DeFi, игры и DAO в сети Aleo."
            }
          }
        },
faq: {
          title: "Часто задаваемые вопросы — Aleo",
          items: [
            {
              q: "Можно ли в Aleo отследить мои транзакции?",
              a: "Нет, если это приватная транзакция. В Aleo они подтверждаются zk-proof'ами, а не открытыми данными. Даже валидаторы видят только доказательство, но не содержимое перевода."
            },
            {
              q: "Чем Aleo отличается от Monero или Zcash?",
              a: "Zcash и Monero дают приватность только для переводов. Aleo идёт дальше — здесь можно создавать полноценные приватные приложения (DeFi, игры, голосования) на языке Leo."
            },
            {
              q: "Почему язык Leo уникален?",
              a: "Leo создан специально для zero-knowledge. Разработчик пишет обычный код, а компилятор автоматически превращает его в криптографическую схему с генерацией zk-proof."
            },
            {
              q: "Какая роль у майнеров и валидаторов в Aleo?",
              a: "Они не пересчитывают транзакции, а лишь проверяют zk-proof'ы. Это переносит нагрузку на криптографические доказательства и делает сеть более масштабируемой."
            },
            {
              q: "Сможет ли Aleo конкурировать с Ethereum?",
              a: "Aleo не заменяет Ethereum, а дополняет его. Ethereum — это открытые смарт-контракты, Aleo — приватные вычисления. В будущем возможна работа вместе через мосты."
            },
            {
              q: "Где реально можно применить Aleo?",
              a: "Примеры: приватные DeFi-протоколы, аукционы с скрытыми ставками, корпоративные расчёты, приватные мессенджеры и соцсети. Всё, где важны конфиденциальность и проверяемость."
            }
          ]
        },

        footer: {
          text: "Все права защищены",
        },
      },
    },
  },
  lng: "en", // язык по умолчанию
  fallbackLng: "en", // запасной язык
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
