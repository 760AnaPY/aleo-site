export const translations = {
  en: {
    // Hero Section
    hero: {
      title: "Welcome to the Aleo Network",
      subtitle: "Enter the Zero-Knowledge realm",
      prompt: "Hint: type the command",
      placeholder: "type 'connect' to begin",
      connectError: "Command not recognized. Type \"connect\" to begin your journey.",
      connecting: [
        "INITIATING BREACH PROTOCOL...",
        "SCANNING NETWORK NODES...",
        "[████████████████] 100% FIREWALL BYPASSED",
        "INJECTING ZK-PROOF PAYLOAD...",
        "DECRYPTING QUANTUM SIGNATURES...",
        "0x7F3A...B92E > ACCESS_GRANTED",
        "ESTABLISHING SECURE CHANNEL...",
        "SYNCHRONIZING BLOCKCHAIN STATE...",
        "⚡ NEURAL LINK ESTABLISHED ⚡",
        "✓ Access granted. Welcome, Prover #001."
      ]
    },

    // Missions List
    missions: {
      title: "THE ZK ODYSSEY",
      subtitle: "Prove what you learn. Unlock the hidden web.",
      statusPanel: {
        prover: "Prover #001",
        level: "Level",
        knowledge: "Knowledge",
        proofs: "Proofs"
      },
      locked: "🔒 LOCKED",
      completed: "✓ COMPLETED",
      startMission: "START MISSION",
      viewBadge: "🏆 VIEW VALIDATOR BADGE",
      bonusSection: "⚡ BONUS MISSION",
      playNow: "PLAY NOW",
      goal: "Goal",
      reward: "Reward"
    },

    // Mission Names and Goals
    missionsList: {
      genesis: {
        name: "The Genesis",
        goal: "Understand what ZK is",
        reward: "Proof of Knowledge #1",
        description: "Learn the fundamentals of zero-knowledge proofs and understand how Aleo enables private applications on the blockchain. Discover real-world use cases and the power of privacy-preserving technology."
      },
      language: {
        name: "The Language",
        goal: "Learn Leo basics",
        reward: "Proof of Mastery #2",
        description: "Master the Leo programming language - a statically-typed functional language designed for writing private applications. Learn syntax, data types, and write your first ZK program."
      },
      circuit: {
        name: "The Circuit",
        goal: "Create your first circuit",
        reward: "Proof of Build #3",
        description: "Build your first zero-knowledge circuit and understand how Leo code compiles into mathematical proofs. Learn about records, private state, and the Prover-Verifier model."
      },
      network: {
        name: "The Network",
        goal: "Deploy dApp on Aleo",
        reward: "Proof of Deployment #4",
        description: "Deploy your first decentralized application to the Aleo network. Learn about network architecture, off-chain execution, on-chain validation, and the deployment process."
      },
      validator: {
        name: "The Validator",
        goal: "Pass knowledge test",
        reward: "zk Badge: Validator",
        description: "Test your knowledge of zero-knowledge proofs, Leo language, circuits, and Aleo network. Pass the final exam to prove you've mastered the fundamentals of private blockchain development."
      },
      howAleoWorks: {
        name: "How Aleo Works",
        goal: "Understand Aleo architecture",
        reward: "Proof of Understanding #4",
        description: "Deep dive into Aleo's unique architecture, consensus mechanism, and transaction flow. Learn how off-chain execution with on-chain validation creates a scalable and private blockchain."
      },
      builder: {
        name: "Circuit Builder",
        goal: "Build ZK circuits",
        reward: "Bonus: Builder Badge",
        description: "Interactive bonus game where you build and test ZK circuits in real-time. Experiment with different circuit designs and see how they generate proofs."
      },
      ledger: {
        name: "Act VI — The Ledger",
        goal: "Inside the Aleo Blockchain",
        reward: "Ledger Master Badge",
        description: "Advanced mission exploring blockchain internals: mempool, block structure, state commitment, and block building. Master the ledger mechanics."
      }
    },

    // Circuit Builder
    circuitBuilder: {
      title: "CIRCUIT BUILDER",
      back: "BACK",
      bonus: "BONUS",
      task: "TASK",
      hint: "HINT",
      show: "Show",
      hide: "Hide",
      components: "COMPONENTS",
      run: "RUN",
      running: "⚡ SIMULATING...",
      clear: "🗑️ CLEAR",
      testCases: "TEST CASES",
      test: "Test",
      pass: "PASS",
      fail: "FAIL",
      expected: "Expected",
      got: "Got",
      runSimulation: "Run simulation",
      toCheck: "to check",
      levelComplete: "LEVEL COMPLETE!",
      nextLevel: "NEXT LEVEL →",
      allComplete: "🏆 ALL LEVELS COMPLETE!",
      stats: "STATISTICS",
      componentsCount: "Components",
      connections: "Connections",
      level: "Level",
      legend: "LEGEND",
      output: "Output",
      input: "Input",
      connection: "Connection",
      instructions: {
        drag: "Drag & drop",
        connect: "Connect dots",
        delete: "Delete"
      },
      levels: {
        equality: {
          name: "Simple Equality",
          description: "Create a circuit to check a == b",
          hint: "Use XOR and NOT gates. If a XOR b = 0, they are equal"
        },
        range: {
          name: "Range Check",
          description: "Check if value is in range [01, 11]",
          hint: "Use AND and OR to check bits"
        },
        comparison: {
          name: "Private Comparison",
          description: "a > b without revealing values",
          hint: "Use combination of AND, NOT for bitwise comparison"
        }
      },
      gates: {
        and: "logical AND",
        or: "logical OR",
        not: "inversion",
        xor: "exclusive OR"
      }
    },

    // Zero Room
    zeroRoom: {
      entering: "ENTERING ZERO ROOM",
      initializing: "Initializing quantum space...",
      generating: "GENERATING ZK-BADGE",
      scanning: "Scanning progress",
      verifying: "Verifying proofs",
      building: "Building Merkle Tree",
      signature: "Generating cryptographic signature",
      compiling: "Compiling ZK-BADGE...",
      badge: "ZK-BADGE v1.0",
      validator: "VALIDATOR",
      zkMaster: "ZK MASTER",
      missions: "Missions",
      level: "Level",
      expert: "EXPERT",
      zkScore: "ZK Score",
      uniqueId: "Unique ID",
      backToMissions: "Back to Missions",
      shareBadge: "Share Badge",
      badgeCopied: "Badge info copied to clipboard!",
      achievements: "Achievements",
      zkKnowledge: "🎓 ZK Knowledge - Mastered",
      leoMaster: "⚡ Leo Master - Mastered",
      networkPro: "🚀 Network Pro - Mastered",
      congratulations: "CONGRATULATIONS!",
      successMessage: "You have successfully completed all Aleo Odyssey missions",
      expertMessage: "You are now a certified Zero Knowledge Proof expert"
    },

    // Wallet Connection
    wallet: {
      connect: "Connect Wallet",
      chooseWallet: "Choose a wallet to connect to Aleo Odyssey",
      leoWallet: "Leo Wallet",
      puzzleWallet: "Puzzle Wallet",
      available: "Available",
      notInstalled: "Not installed",
      connecting: "Connecting...",
      disconnect: "Disconnect",
      installExtension: "Install wallet extension to connect",
      refreshPage: "💡 Refresh the page after installing the extension",
      debugConsole: "🔍 Call window.debugAleoWallets() in console for diagnostics",
      close: "Close",
      refreshStatus: "Refresh wallet status",
      errors: {
        leoNotFound: "Leo Wallet not found. Install the Leo Wallet extension.",
        leoNotSupported: "Leo Wallet does not support connection",
        puzzleNotFound: "Puzzle Wallet not found. Install the Puzzle Wallet extension.",
        unknownWallet: "Unknown wallet type",
        connectionFailed: "Failed to get address from wallet",
        notConnected: "Wallet not connected"
      },
      status: {
        available: "Available",
        notInBrowser: "Not in browser",
        leoNotFound: "Leo Wallet not found in window.leo",
        leoNoRequest: "Leo Wallet has no request method",
        puzzleAvailable: "Available (window.puzzle)",
        puzzleSdk: "Available (Puzzle SDK)",
        puzzleUnavailable: "Puzzle Wallet unavailable"
      }
    },

    // Common
    common: {
      back: "← BACK",
      next: "NEXT →",
      complete: "COMPLETE",
      submit: "SUBMIT",
      check: "CHECK",
      restart: "RESTART",
      continue: "CONTINUE"
    },

    // Individual Missions Content
    theGenesis: {
      back: "← BACK TO MISSIONS",
      progress: "Progress",
      steps: "Steps",
      title: "The Genesis",
      subtitle: "Understand what ZK is",
      beginner: "BEGINNER",
      reward: "Proof of Knowledge #1",
      step1: {
        title: "What is Zero Knowledge Proof?",
        description: "Zero Knowledge Proof (ZK-proof) is a cryptographic protocol that allows one party (prover) to prove to another party (verifier) that a statement is true, without revealing any additional information beyond the fact of its truth.",
        example: "💡 Simple example:",
        exampleText: "Imagine: you want to prove that you know the password to a safe without saying the password itself. A ZK protocol allows you to do this — open the safe without revealing the combination.",
        button: "GOT IT, CONTINUE →"
      },
      step2new: {
        title: "ZK in Real Life",
        description: "Zero Knowledge proofs are already being used in real applications and solving practical problems. Let's look at some examples:",
        useCase1Title: "Private Banking",
        useCase1Text: "Prove you have enough funds for a loan without revealing your exact balance. Banks can verify solvency without accessing your financial history.",
        useCase2Title: "Anonymous Voting",
        useCase2Text: "Prove you're eligible to vote and that you voted without revealing who you voted for. Complete anonymity with verifiability.",
        useCase3Title: "Fair Gaming",
        useCase3Text: "Prove your move is valid in a game without revealing your strategy. Prevents cheating while maintaining game intrigue.",
        button: "FASCINATING! →"
      },
      step3new: {
        title: "How ZK Math Works",
        description: "ZK-proofs are based on complex cryptographic mathematics. Let's understand the basic components without diving into formulas:",
        componentsTitle: "🔐 Three Main Components:",
        component1: "Witness",
        component1Text: "your secret data (password, private key, balance)",
        component2: "Statement",
        component2Text: "what you want to prove (\"I know the password\")",
        component3: "Proof",
        component3Text: "mathematical evidence that doesn't reveal the secret",
        protocolTitle: "⚡ zkSNARK Protocol",
        protocolText: "Aleo uses zkSNARK (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) - a protocol allowing creation of compact proofs that are quickly verified.",
        button: "UNDERSTOOD →"
      },
      step2: {
        title: "Why do we need Aleo?",
        description: "Aleo is a blockchain platform that uses Zero Knowledge technologies to create private and scalable decentralized applications.",
        privacy: "🔒 Privacy",
        privacyText: "All computations happen privately. No one sees your data.",
        speed: "⚡ Speed",
        speedText: "ZK-proofs allow fast transaction verification.",
        button: "UNDERSTOOD →"
      },
      step3: {
        title: "Real-world applications",
        description: "ZK technologies open new possibilities for private applications:",
        defi: "💰 DeFi with privacy",
        defiText: "Trading without revealing balances and strategies",
        games: "🎮 Games",
        gamesText: "Private moves, fair mechanics without cheaters",
        medicine: "🏥 Medicine",
        medicineText: "Data exchange without violating confidentiality",
        button: "COMPLETE MISSION ✓"
      }
    },
    
    theLanguage: {
      back: "← BACK TO MISSIONS",
      progress: "Progress",
      steps: "Steps",
      title: "The Language",
      subtitle: "Learn the basics of Leo language",
      intermediate: "INTERMEDIATE",
      reward: "Proof of Mastery #2",
      step1: {
        title: "What is Leo?",
        description: "Leo is a statically typed functional programming language created specifically for writing private applications on the Aleo blockchain. Leo's syntax is similar to Rust, but optimized for creating zero-knowledge circuits.",
        safety: "⚡ Safety",
        safetyText: "Strong typing prevents errors at compile time",
        privacy: "🔒 Privacy",
        privacyText: "All code is automatically compiled into ZK-proofs",
        button: "INTERESTING, SHOW ME THE SYNTAX →"
      },
      step2: {
        title: "Leo Program Structure",
        description: "Each Leo program starts with a program declaration and contains transition functions that define your application logic.",
        codeTitle: "📝 BASIC STRUCTURE",
        codeFile: "hello.aleo",
        note1: "Program declaration with unique name",
        note2: "Main function to be executed",
        note3: "Parameter with type (u32 = unsigned 32-bit integer)",
        button: "GOT IT →"
      },
      step3: {
        title: "Data Types in Leo",
        description: "Leo supports various data types for working with numbers, boolean values, addresses, and data structures.",
        numeric: "Numeric types",
        numericU: "• u8, u16, u32, u64, u128 - unsigned",
        numericI: "• i8, i16, i32, i64, i128 - signed",
        numericField: "• field - large numbers",
        other: "Other types",
        otherBool: "• bool - true/false",
        otherAddress: "• address - Aleo addresses",
        otherStruct: "• struct - custom structures",
        codeTitle: "💡 USAGE EXAMPLE",
        codeFile: "calculate.leo",
        button: "GOT IT, LET'S PRACTICE →"
      },
      step4: {
        title: "Records and Structs",
        description: "In Leo, you can create custom data structures using struct and record. Record is a special type that stores private data on-chain.",
        codeTitle: "📝 TOKEN STRUCTURE",
        codeFile: "token.leo",
        recordTitle: "🔒 What is record?",
        recordText: "Record is a special data structure in Leo that stores encrypted data on-chain. Only the record owner can decrypt and use it.",
        recordNote: "private data structure stored on blockchain",
        button: "GOT IT →"
      },
      step5: {
        title: "Visibility Modifiers",
        description: "Leo has three visibility modifiers that control how data is processed and stored: public, private, and constant.",
        publicTitle: "public",
        publicText: "Data visible to everyone on the blockchain. Used for transparent state.",
        privateTitle: "private",
        privateText: "Encrypted data, visible only to the owner. The basis of Aleo privacy.",
        constantTitle: "constant",
        constantText: "Compile-time constants that are embedded in the circuit.",
        codeTitle: "💡 EXAMPLE OF USE:",
        button: "UNDERSTOOD →"
      },
      step6: {
        title: "Practice: Write Your Code",
        description: "Write a transition function that takes two u32 numbers and returns their sum:",
        hint: "💡 HINT",
        hintShow: "Show",
        hintHide: "Hide",
        hintTitle: "Command format:",
        hintText: "transition main(a: u32, b: u32) -> u32 { ... }",
        placeholder: "Write your code here...",
        check: "CHECK CODE",
        success: "✓ Excellent! Your code is correct!",
        error: "✗ Try again. Hint: start with \"transition main\"",
        complete: "Mission Complete!",
        reward: "You received: Proof of Mastery #2",
        returning: "Returning to missions..."
      }
    },
    
    theCircuit: {
      back: "← BACK TO MISSIONS",
      progress: "Progress",
      steps: "Steps",
      title: "The Circuit",
      subtitle: "Create your first circuit",
      intermediate: "INTERMEDIATE",
      reward: "Proof of Build #3",
      step1: {
        title: "What is a ZK-Circuit?",
        description: "A ZK-Circuit (zero-knowledge proof circuit) is a mathematical representation of a computation that can be proven without revealing the input data. This is the core of any ZK application on Aleo.",
        howItWorks: "🔄 How it works:",
        step1Text: "You write a program in Leo",
        step2Text: "The compiler converts it into a circuit",
        step3Text: "The circuit generates a proof",
        step4Text: "Anyone can verify the proof",
        button: "UNDERSTOOD →"
      },
      step2: {
        title: "Creating Your First Circuit",
        description: "Let's create a simple circuit for private token storage. We'll use the record structure to store private state.",
        codeTitle: "📝 PRIVATE TOKEN",
        codeFile: "token.leo",
        keyPoints: "🔑 Key Points:",
        point1: "record - private data type",
        point2: "All data inside record is private",
        point3: "Only the owner can use their records",
        point4: "Transactions create new records, destroying old ones",
        button: "COOL, WHAT'S NEXT? →"
      },
      step3new: {
        title: "Compiling to Circuit",
        description: "Leo compiler translates your code into a ZK-circuit. Let's understand this process:",
        step1Title: "Parsing",
        step1Text: "The compiler analyzes the syntax and creates an abstract syntax tree (AST) from your code.",
        step2Title: "Circuit Generation",
        step2Text: "AST is converted into arithmetic constraints - equations that describe your computation.",
        step3Title: "Optimization",
        step3Text: "The compiler optimizes constraints to reduce proof generation time and size.",
        button: "INTERESTING →"
      },
      step4new: {
        title: "Circuit Optimization",
        description: "Optimizing ZK-circuits is crucial for performance. Smaller circuits mean faster proofs and lower costs.",
        whyTitle: "Why optimize?",
        why1: "Faster proof generation - less time to create proof",
        why2: "Smaller proof size - easier to transmit and store",
        why3: "Lower gas costs - cheaper transactions on blockchain",
        technique1: "Constraint Reduction",
        technique1Text: "Minimize the number of arithmetic constraints while maintaining computation correctness.",
        technique2: "Lookup Tables",
        technique2Text: "Use precomputed values for common operations instead of recalculating them.",
        button: "GOT IT →"
      },
      step3: {
        title: "Knowledge Check",
        description: "What is the data type in Leo used to store private state?",
        yourAnswer: "YOUR ANSWER (one word)",
        placeholder: "Enter your answer...",
        hint: "💡 HINT:",
        hintShow: "Show",
        hintHide: "Hide",
        hintText: "Look at the code above. What keyword is used before \"Token\"?",
        check: "CHECK ANSWER ✓",
        success: "✓ Correct! record is the private data type.",
        error: "✗ Incorrect. Hint: it starts with 'r'."
      },
      step4: {
        title: "Final Test",
        description: "Who in a ZK system generates the proof based on private data?",
        option1: "Prover",
        option2: "Verifier",
        option3: "Compiler",
        check: "CHECK ✓",
        success: "✓ Correct! The Prover creates the proof.",
        error: "✗ Incorrect. Who creates the proof in a ZK system?"
      }
    },
    
    theNetwork: {
      back: "← BACK TO MISSIONS",
      progress: "Progress",
      steps: "Steps",
      title: "The Network",
      subtitle: "Deploy dApp on Aleo",
      advanced: "ADVANCED",
      reward: "Proof of Deployment #4",
      step1: {
        title: "Aleo Network Architecture",
        description: "Aleo is a Layer 1 blockchain where all computations happen off-chain with proofs, and validation happens on-chain. This ensures scalability and privacy.",
        offchainTitle: "⚙️ Off-chain",
        offchainText: "Program execution and proof generation",
        onchainTitle: "⛓️ On-chain",
        onchainText: "Proof verification and state storage",
        privacyTitle: "🔒 Privacy",
        privacyText: "Privacy of data and application logic",
        networkComponents: "🌐 Network Components:",
        validators: "Validators:",
        validatorsText: "verify transactions and create blocks",
        provers: "Provers:",
        proversText: "generate ZK-proofs",
        clients: "Clients:",
        clientsText: "interact with applications",
        button: "UNDERSTOOD, HOW TO DEPLOY? →"
      },
      step2new: {
        title: "Aleo Consensus Mechanism",
        description: "Aleo uses a hybrid consensus combining Proof of Stake (PoS) for validation and Proof of Work (PoW) for proving. This ensures both network security and decentralization.",
        posTitle: "Proof of Stake (PoS)",
        posText: "Validators stake credits and verify transactions. They earn rewards for honest work and lose stake for malicious actions.",
        powTitle: "Proof of Work (PoW)",
        powText: "Provers compete to generate ZK-proofs. They use computational power to create proofs and earn rewards.",
        coinbaseTitle: "💰 Coinbase Puzzle:",
        coinbaseText: "Aleo uses a unique Coinbase Puzzle - a computational task that generates both network security and ZK-proofs simultaneously.",
        button: "UNDERSTOOD →"
      },
      step3new: {
        title: "Transactions and Records",
        description: "In Aleo, there are three types of transactions. Each serves a specific purpose in the network.",
        deployTitle: "Deploy",
        deployText: "Publishes a new program to the blockchain. The program becomes available to all users.",
        executeTitle: "Execute",
        executeText: "Calls a transition function of a deployed program. Creates new records and spends old ones.",
        feeTitle: "Fee",
        feeText: "Pays for transaction execution. Compensates validators and provers for their work.",
        recordTitle: "🔒 Records - private state:",
        recordText: "Records store private data on-chain. Only the owner can decrypt and use their records. Each transaction consumes input records and creates new output records.",
        button: "GOT IT →"
      },
      step2: {
        title: "Program Deployment Process",
        description: "To deploy a program to Aleo, you need to follow several steps: write code, compile, generate keys, and deploy to the network.",
        step1Title: "Creating a project",
        step1Command: "leo new my_app",
        step2Title: "Writing code",
        step2Command: "cd my_app && edit src/main.leo",
        step3Title: "Compilation",
        step3Command: "leo build",
        step4Title: "Deploying to network",
        step4Command: "leo deploy --network testnet",
        important: "⚠️ Important:",
        point1: "Deploying requires Aleo credits (free on testnet)",
        point2: "Each program has a unique name in the network",
        point3: "Programs cannot be changed after deployment",
        button: "GREAT, LET'S PRACTICE! →"
      },
      step3: {
        title: "Choose Deployment Network",
        description: "Aleo provides several networks for development and production. For training, we'll use testnet.",
        mainnet: "Mainnet",
        mainnetLabel: "Production",
        mainnetDesc: "Main network for production applications. Requires real Aleo credits.",
        testnet: "Testnet",
        testnetLabel: "Recommended",
        testnetDesc: "Test network for development. Free credits from faucet.",
        local: "Local",
        localLabel: "Development",
        localDesc: "Local node on your computer for fast development.",
        button: "SELECTED, LET'S DEPLOY! →"
      },
      step4: {
        title: "Deploy Program",
        description: "Enter the command to deploy your program to the selected network. Use Leo CLI command.",
        terminal: "TERMINAL",
        hint: "💡 Hint:",
        hintShow: "Show",
        hintHide: "Hide",
        hintCommand: "Command:",
        hintButton: "👁️ Show hint",
        selectedNetwork: "📋 Selected network:",
        notSelected: "Not selected",
        placeholder: "leo deploy...",
        deploy: "RUN DEPLOYMENT 🚀",
        building: "📦 Building program...",
        generating: "🔐 Generating proving key...",
        connecting: "📡 Connecting to Aleo testnet...",
        success: "✓ Program deployed successfully!",
        error: "✗ Incorrect command or network. Use \"leo deploy\" and select testnet.",
        missionComplete: "Mission Complete!",
        reward: "You received: Proof of Deployment #4",
        congratsMessage: "Your application successfully deployed to Aleo Network!",
        returning: "Returning to missions..."
      },
      step7: {
        title: "Interactive Network Visualization",
        description: "Now let's see how the Aleo network works in action. Interact with nodes and simulate the proof flow.",
        nodesTitle: "🌐 Network Nodes (click to learn more)",
        prover: "Prover",
        proverDesc: "Generates ZK-proofs from program execution",
        proverActive: "Generating computational proof...",
        validator: "Validator",
        validatorDesc: "Verifies proofs and confirms transactions",
        validatorActive: "Verifying proof validity...",
        blockchain: "Blockchain",
        blockchainDesc: "Stores confirmed transactions on-chain",
        blockchainActive: "Writing transaction to blockchain...",
        simulateTitle: "🔄 Simulate Proof Flow",
        simulateDesc: "Enter input data and watch how it transforms into a ZK-proof, gets verified, and recorded on-chain.",
        inputPlaceholder: "Enter your data (e.g., 42)",
        executeButton: "GENERATE & EXECUTE PROOF",
        generating: "Generating ZK-proof...",
        verifying: "Validator checking proof...",
        writing: "Writing to blockchain...",
        proofSuccess: "Proof successfully verified and recorded!",
        proofPrivate: "Your input data remains private, only the proof is public.",
        recordsTitle: "🔒 Private Records",
        showRecords: "Show examples",
        hideRecords: "Hide",
        record1Title: "Record #1 (Before transaction)",
        record2Title: "Record #2 (After transaction)",
        recordsNote: "Records are encrypted on-chain. Only owners can decrypt their data."
      }
    },
    
    howAleoWorks: {
      back: "← BACK TO MISSIONS",
      progress: "Progress",
      steps: "Steps",
      title: "How Aleo Works",
      subtitle: "Deep dive into Aleo's architecture and consensus mechanism",
      intermediate: "INTERMEDIATE",
      reward: "Proof of Understanding #4",
      
      step1: {
        title: "Aleo Network Architecture",
        description: "Aleo is a Layer 1 blockchain where all computations happen off-chain with proofs, and validation happens on-chain. This ensures scalability and privacy.",
        offchainTitle: "Off-chain",
        offchainText: "Program execution and proof generation",
        onchainTitle: "On-chain",
        onchainText: "Proof verification and state storage",
        componentsTitle: "🌐 Network Components:",
        prover: "Prover",
        proverText: "generates ZK-proofs from program execution",
        validator: "Validator",
        validatorText: "verifies proofs and confirms transactions",
        client: "Client",
        clientText: "interacts with applications",
        button: "UNDERSTOOD, HOW DOES CONSENSUS WORK? →"
      },
      
      step2: {
        title: "Aleo Consensus Mechanism",
        description: "Aleo uses a hybrid consensus combining Proof of Stake (PoS) for validation and Proof of Work (PoW) for proving. This ensures both network security and decentralization.",
        posTitle: "Proof of Stake (PoS)",
        posText: "Validators stake credits and verify transactions. They earn rewards for honest work and lose stake for malicious actions.",
        powTitle: "Proof of Work (PoW)",
        powText: "Provers compete to generate ZK-proofs. They use computational power to create proofs and earn rewards.",
        coinbaseTitle: "💰 Coinbase Puzzle:",
        coinbaseText: "Aleo uses a unique Coinbase Puzzle - a computational task that generates both network security and ZK-proofs simultaneously.",
        button: "UNDERSTOOD →"
      },
      
      step3: {
        title: "Transactions and Records",
        description: "In Aleo, there are three types of transactions. Each serves a specific purpose in the network.",
        deployTitle: "Deploy",
        deployText: "Publishes a new program to the blockchain. The program becomes available to all users.",
        executeTitle: "Execute",
        executeText: "Calls a transition function of a deployed program. Creates new records and spends old ones.",
        feeTitle: "Fee",
        feeText: "Pays for transaction execution. Compensates validators and provers for their work.",
        recordTitle: "🔒 Records - private state:",
        recordText: "Records store private data on-chain. Only the owner can decrypt and use their records. Each transaction consumes input records and creates new output records.",
        button: "GOT IT →"
      },
      
      step4: {
        title: "Transaction Execution Flow",
        description: "Let's understand how a transaction flows through the Aleo network from initiation to finalization.",
        step1Title: "1. Transaction Initiation",
        step1Text: "Client creates a transaction with private inputs and calls a program function.",
        step2Title: "2. Off-chain Execution",
        step2Text: "Program executes off-chain, generating ZK-proofs that prove correct execution without revealing inputs.",
        step3Title: "3. Proof Submission",
        step3Text: "Prover submits the transaction with ZK-proofs to the network for validation.",
        step4Title: "4. On-chain Validation",
        step4Text: "Validators verify the ZK-proofs and add the transaction to a block if valid.",
        button: "UNDERSTOOD →"
      },
      
      step5: {
        title: "Interactive Network Visualization",
        description: "Now let's see how the Aleo network works in action. The 3D visualization shows the network components and their interactions.",
        visualizationText: "Move your mouse to explore the 3D network. Each colored node represents a different component of the Aleo ecosystem.",
        button: "COMPLETE MISSION ✓"
      },
      oldsteps: {
        old: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-[#00fff7]/10 to-[#c084fc]/10 p-6 rounded-xl border border-[#00fff7]/20">
              <h3 class="text-2xl font-bold text-[#00fff7] mb-4">⚔️ The Privacy Battle</h3>
              <p class="text-gray-300 mb-4">
                While Ethereum revolutionized smart contracts, it has a fundamental flaw: 
                <span class="text-red-400 font-bold">everything is public</span>. 
                Aleo fixes this by making privacy the default, not an afterthought.
              </p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-gradient-to-br from-red-500/10 to-red-600/5 p-6 rounded-xl border border-red-500/20">
                <h4 class="text-xl font-bold text-red-400 mb-4 flex items-center">
                  <span class="text-2xl mr-2">🔍</span>
                  Ethereum's Problem
                </h4>
                <ul class="space-y-3 text-gray-300">
                  <li class="flex items-start">
                    <span class="text-red-400 mr-2">❌</span>
                    <span>All transaction data is public and visible</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-400 mr-2">❌</span>
                    <span>Smart contract state is transparent</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-400 mr-2">❌</span>
                    <span>User balances and transfers are exposed</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-400 mr-2">❌</span>
                    <span>Privacy requires complex workarounds (Tornado Cash)</span>
                  </li>
                </ul>
              </div>
              
              <div class="bg-gradient-to-br from-[#00fff7]/10 to-[#c084fc]/10 p-6 rounded-xl border border-[#00fff7]/20">
                <h4 class="text-xl font-bold text-[#00fff7] mb-4 flex items-center">
                  <span class="text-2xl mr-2">🛡️</span>
                  Aleo's Solution
                </h4>
                <ul class="space-y-3 text-gray-300">
                  <li class="flex items-start">
                    <span class="text-green-400 mr-2">✅</span>
                    <span>Private records by default</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-400 mr-2">✅</span>
                    <span>Zero-knowledge proofs hide computation</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-400 mr-2">✅</span>
                    <span>Only proofs are public, data stays private</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-400 mr-2">✅</span>
                    <span>Privacy is built into the protocol</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-[#c084fc]/10 to-[#00fff7]/10 p-6 rounded-xl border border-[#c084fc]/20">
              <h3 class="text-2xl font-bold text-[#c084fc] mb-4">📊 Performance Comparison</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-black/40 p-4 rounded-lg text-center">
                  <h4 class="text-[#00fff7] font-bold mb-2">Transaction Speed</h4>
                  <div class="text-2xl font-bold text-white mb-1">~100ms</div>
                  <div class="text-sm text-gray-400">Aleo (Off-chain)</div>
                  <div class="text-xs text-red-400 mt-1">vs 15s Ethereum</div>
                </div>
                <div class="bg-black/40 p-4 rounded-lg text-center">
                  <h4 class="text-[#c084fc] font-bold mb-2">Gas Costs</h4>
                  <div class="text-2xl font-bold text-white mb-1">~$0.001</div>
                  <div class="text-sm text-gray-400">Aleo (Minimal)</div>
                  <div class="text-xs text-red-400 mt-1">vs $5-50 Ethereum</div>
                </div>
                <div class="bg-black/40 p-4 rounded-lg text-center">
                  <h4 class="text-[#00fff7] font-bold mb-2">Privacy Level</h4>
                  <div class="text-2xl font-bold text-white mb-1">100%</div>
                  <div class="text-sm text-gray-400">Aleo (Native)</div>
                  <div class="text-xs text-red-400 mt-1">vs 0% Ethereum</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      oldstuff2: {
        title: "Interactive Consensus Simulator",
        description: "Experience how Aleo's hybrid consensus works in real-time",
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-[#00fff7]/10 to-[#c084fc]/10 p-6 rounded-xl border border-[#00fff7]/20">
              <h3 class="text-2xl font-bold text-[#00fff7] mb-4">🎮 Consensus Simulator</h3>
              <p class="text-gray-300 mb-4">
                Watch how validators and miners work together to secure the Aleo network. 
                Click the buttons below to trigger different consensus events!
              </p>
            </div>
            
            <div class="bg-black/60 rounded-xl p-8 min-h-[400px]">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <h4 class="text-lg font-bold text-[#c084fc] mb-3">Validators (PoS)</h4>
                  <div class="space-y-2" id="validator-list">
                    <div class="flex items-center justify-between p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                      <span class="text-white">Validator #1</span>
                      <span class="text-green-400 text-sm">Staked: 1000 ALEO</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                      <span class="text-white">Validator #2</span>
                      <span class="text-green-400 text-sm">Staked: 800 ALEO</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                      <span class="text-white">Validator #3</span>
                      <span class="text-green-400 text-sm">Staked: 1200 ALEO</span>
                    </div>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <h4 class="text-lg font-bold text-[#00fff7] mb-3">Miners (PoW)</h4>
                  <div class="space-y-2" id="miner-list">
                    <div class="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                      <span class="text-white">Miner #1</span>
                      <span class="text-blue-400 text-sm">Hash: 0x3a7f...</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                      <span class="text-white">Miner #2</span>
                      <span class="text-blue-400 text-sm">Hash: 0x8b2e...</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                      <span class="text-white">Miner #3</span>
                      <span class="text-blue-400 text-sm">Hash: 0x1c9d...</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 text-center">
                <div class="bg-gradient-to-r from-[#00fff7]/20 to-[#c084fc]/20 p-4 rounded-lg border border-[#00fff7]/30">
                  <h4 class="text-lg font-bold text-white mb-2">Current Block</h4>
                  <div class="text-sm text-gray-400 font-mono">Block #1,234,567</div>
                  <div class="text-xs text-[#00fff7] mt-1">Last updated: 2 seconds ago</div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-center space-x-4">
              <button class="px-6 py-3 bg-[#00fff7] text-black font-bold rounded-lg hover:bg-[#00fff7]/80 transition-all hover:scale-105">
                🎲 Simulate Block
              </button>
              <button class="px-6 py-3 bg-[#c084fc] text-white font-bold rounded-lg hover:bg-[#c084fc]/80 transition-all hover:scale-105">
                ⚡ Add Validator
              </button>
              <button class="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-500/80 transition-all hover:scale-105">
                ⛏️ Mine Puzzle
              </button>
            </div>
          </div>
        `
      },
      
      oldstuff3: {
        title: "Private Transaction Flow",
        description: "Step-by-step simulation of a private transaction",
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-[#00fff7]/10 to-[#c084fc]/10 p-6 rounded-xl border border-[#00fff7]/20">
              <h3 class="text-2xl font-bold text-[#00fff7] mb-4">🔐 Private Transaction Simulator</h3>
              <p class="text-gray-300 mb-4">
                Follow a private transaction from creation to confirmation. 
                Each step shows what data is visible to whom.
              </p>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/20">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">1</div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">Transaction Creation</h4>
                  <p class="text-gray-400 mb-3">Alice wants to send 5 ALEO to Bob privately</p>
                  <div class="bg-black/40 p-3 rounded border border-green-500/30">
                    <div class="text-sm text-green-400 font-mono">
                      <div>From: alice1...</div>
                      <div>To: bob1...</div>
                      <div>Amount: 5 ALEO</div>
                      <div class="text-red-400">Private Data: 🔒 ENCRYPTED</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-[#00fff7]/10 to-transparent rounded-lg border border-[#00fff7]/20">
                <div class="w-8 h-8 bg-[#00fff7] rounded-full flex items-center justify-center text-black font-bold">2</div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">Proof Generation</h4>
                  <p class="text-gray-400 mb-3">Prover generates zero-knowledge proof</p>
                  <div class="bg-black/40 p-3 rounded border border-[#00fff7]/30">
                    <div class="text-sm text-[#00fff7] font-mono">
                      <div>Proof: 0x7f3a8b2e9c1d...</div>
                      <div>Public Output: ✅ Valid</div>
                      <div>Private Input: 🔒 Hidden</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-[#c084fc]/10 to-transparent rounded-lg border border-[#c084fc]/20">
                <div class="w-8 h-8 bg-[#c084fc] rounded-full flex items-center justify-center text-black font-bold">3</div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">Network Submission</h4>
                  <p class="text-gray-400 mb-3">Only proof and public data sent to network</p>
                  <div class="bg-black/40 p-3 rounded border border-[#c084fc]/30">
                    <div class="text-sm text-[#c084fc] font-mono">
                      <div>Public: ✅ Transaction valid</div>
                      <div>Private: 🔒 Not transmitted</div>
                      <div>Size: 256 bytes (vs 1KB+ on Ethereum)</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20">
                <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">4</div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">Validation</h4>
                  <p class="text-gray-400 mb-3">Validators verify proof without seeing private data</p>
                  <div class="bg-black/40 p-3 rounded border border-yellow-500/30">
                    <div class="text-sm text-yellow-400 font-mono">
                      <div>Proof Verification: ✅ Valid</div>
                      <div>Balance Check: ✅ Sufficient</div>
                      <div>Private Data: 🔒 Never accessed</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/20">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">5</div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">Confirmation</h4>
                  <p class="text-gray-400 mb-3">Transaction confirmed and included in block</p>
                  <div class="bg-black/40 p-3 rounded border border-green-500/30">
                    <div class="text-sm text-green-400 font-mono">
                      <div>Block: #1,234,568</div>
                      <div>Status: ✅ Confirmed</div>
                      <div>Privacy: 🔒 Maintained</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      
      oldstuff4: {
        title: "Interactive 3D Network Explorer",
        description: "Explore Aleo's architecture in an interactive 3D environment",
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-[#00fff7]/10 to-[#c084fc]/10 p-6 rounded-xl border border-[#00fff7]/20">
              <h3 class="text-2xl font-bold text-[#00fff7] mb-4">🌐 3D Network Explorer</h3>
              <p class="text-gray-300 mb-4">
                Navigate through Aleo's network architecture. Click on different nodes to learn about their roles 
                and see real-time data flows between components.
              </p>
            </div>
            
            <div class="bg-black/60 rounded-xl p-8 min-h-[500px] flex items-center justify-center">
              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-r from-[#00fff7] to-[#c084fc] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span class="text-4xl">🌐</span>
                </div>
                <h4 class="text-2xl font-bold text-white mb-2">3D Network Loading...</h4>
                <p class="text-gray-400 mb-4">Interactive 3D model will appear here</p>
                <div class="flex justify-center space-x-2">
                  <div class="w-2 h-2 bg-[#00fff7] rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-[#c084fc] rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-[#00fff7] rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-black/40 p-4 rounded-lg text-center hover:bg-[#00fff7]/10 transition-colors cursor-pointer">
                <div class="w-6 h-6 bg-[#00fff7] rounded-full mx-auto mb-2"></div>
                <span class="text-sm text-gray-400">Provers</span>
                <div class="text-xs text-[#00fff7] mt-1">Generate ZK Proofs</div>
              </div>
              <div class="bg-black/40 p-4 rounded-lg text-center hover:bg-[#c084fc]/10 transition-colors cursor-pointer">
                <div class="w-6 h-6 bg-[#c084fc] rounded-full mx-auto mb-2"></div>
                <span class="text-sm text-gray-400">Validators</span>
                <div class="text-xs text-[#c084fc] mt-1">Verify & Secure</div>
              </div>
              <div class="bg-black/40 p-4 rounded-lg text-center hover:bg-green-500/10 transition-colors cursor-pointer">
                <div class="w-6 h-6 bg-green-500 rounded-full mx-auto mb-2"></div>
                <span class="text-sm text-gray-400">Clients</span>
                <div class="text-xs text-green-400 mt-1">User Interface</div>
              </div>
              <div class="bg-black/40 p-4 rounded-lg text-center hover:bg-yellow-500/10 transition-colors cursor-pointer">
                <div class="w-6 h-6 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <span class="text-sm text-gray-400">Records</span>
                <div class="text-xs text-yellow-400 mt-1">Private Data</div>
              </div>
            </div>
          </div>
        `
      },
      
      oldstuff5: {
        title: "Knowledge Challenge: The Ultimate Test",
        description: "Test your understanding with an interactive quiz",
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-[#00fff7]/10 to-[#c084fc]/10 p-6 rounded-xl border border-[#00fff7]/20">
              <h3 class="text-2xl font-bold text-[#00fff7] mb-4">🧠 Ultimate Aleo Knowledge Challenge</h3>
              <p class="text-gray-300 mb-4">
                Prove your mastery of Aleo's architecture! Answer correctly to unlock the next level. 
                Wrong answers will trigger educational explanations.
              </p>
            </div>
            
            <div class="bg-black/60 rounded-xl p-8 min-h-[400px]">
              <div class="text-center mb-8">
                <div class="text-4xl mb-4">🎯</div>
                <h4 class="text-2xl font-bold text-white mb-2">Question 1 of 5</h4>
                <div class="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div class="bg-gradient-to-r from-[#00fff7] to-[#c084fc] h-2 rounded-full" style="width: 20%"></div>
                </div>
              </div>
              
              <div class="space-y-6">
                <div class="bg-gradient-to-r from-[#c084fc]/10 to-[#00fff7]/10 p-6 rounded-xl border border-[#c084fc]/20">
                  <h4 class="text-xl font-bold text-white mb-4">
                    What is the main advantage of Aleo's off-chain execution model compared to Ethereum?
                  </h4>
                  
                  <div class="space-y-3">
                    <button class="w-full p-4 text-left bg-black/40 rounded-lg border border-gray-600 hover:border-[#00fff7] hover:bg-[#00fff7]/10 transition-all">
                      <span class="text-[#00fff7] font-bold mr-3">A)</span>
                      <span class="text-white">Faster transaction processing and lower costs</span>
                    </button>
                    
                    <button class="w-full p-4 text-left bg-black/40 rounded-lg border border-gray-600 hover:border-[#c084fc] hover:bg-[#c084fc]/10 transition-all">
                      <span class="text-[#c084fc] font-bold mr-3">B)</span>
                      <span class="text-white">Better security through proof-of-work</span>
                    </button>
                    
                    <button class="w-full p-4 text-left bg-black/40 rounded-lg border border-gray-600 hover:border-green-500 hover:bg-green-500/10 transition-all">
                      <span class="text-green-500 font-bold mr-3">C)</span>
                      <span class="text-white">More decentralized than other blockchains</span>
                    </button>
                    
                    <button class="w-full p-4 text-left bg-black/40 rounded-lg border border-gray-600 hover:border-yellow-500 hover:bg-yellow-500/10 transition-all">
                      <span class="text-yellow-500 font-bold mr-3">D)</span>
                      <span class="text-white">Uses less energy than Bitcoin</span>
                    </button>
                  </div>
                </div>
                
                <div class="flex justify-between items-center">
                  <div class="text-sm text-gray-400">
                    Score: <span class="text-[#00fff7] font-bold">0/5</span>
                  </div>
                  <div class="text-sm text-gray-400">
                    Streak: <span class="text-[#c084fc] font-bold">0</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="text-center">
              <button class="px-8 py-3 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-white font-bold rounded-lg hover:scale-105 transition-all">
                🚀 Start Challenge
              </button>
            </div>
          </div>
        `
      }
    },
    
    theValidator: {
      back: "← BACK TO MISSIONS",
      backButton: "← BACK",
      progress: "Progress",
      title: "The Validator",
      subtitle: "Test your ZK knowledge",
      advanced: "FINAL",
      reward: "zk Badge: Validator",
      questionOf: "Question {current} of {total}",
      nextQuestion: "NEXT QUESTION",
      showResults: "SHOW RESULTS",
      yourScore: "Your Score:",
      passed: "✓ Passed! You've mastered Aleo!",
      failed: "Try again to improve your score.",
      completeMission: "COMPLETE MISSION ✓",
      restart: "RESTART QUIZ",
      helpTextStart: "Answer all questions to complete the test",
      helpTextRemaining: "Remaining: {count}",
      passedMessage: "You've proven your knowledge!",
      failedMessage: "Study the material and try again",
      correct: "Correct!",
      yourAnswer: "Your answer:",
      correctAnswer: "Correct:",
      badgeReceived: "You received: zk Badge: Validator",
      congratsMessage: "Congratulations! You've completed all ZK Odyssey missions.",
      returningToMissions: "Returning to missions...",
      returnButton: "← RETURN",
      correctAnswers: "correct answers",
      questions: [
        {
          question: "What is Zero Knowledge Proof?",
          options: [
            "A method for data encryption",
            "A protocol for proving truth without revealing information",
            "A signature verification method",
            "A hashing algorithm"
          ],
          explanation: "ZK-proof allows proving the truth of a statement without revealing additional information."
        },
        {
          question: "What language are Aleo programs written in?",
          options: [
            "Solidity",
            "Rust",
            "Leo",
            "Move"
          ],
          explanation: "Leo is a special functional language for creating private applications on Aleo."
        },
        {
          question: "What is a record in Leo?",
          options: [
            "Transaction log",
            "Data type for private state",
            "Function for writing to blockchain",
            "Logging structure"
          ],
          explanation: "Record is a private data type that stores encrypted application state."
        },
        {
          question: "Where are Aleo programs executed?",
          options: [
            "In the user's browser",
            "On blockchain validators",
            "Off-chain with proof generation",
            "In Ethereum smart contracts"
          ],
          explanation: "Programs execute off-chain, while only ZK-proofs are validated on-chain."
        },
        {
          question: "What does the Prover do in a ZK system?",
          options: [
            "Verifies proofs",
            "Generates proofs based on private data",
            "Mines blocks",
            "Stores blockchain state"
          ],
          explanation: "The Prover creates ZK-proof using private input data."
        },
        {
          question: "Which command is used to deploy a program?",
          options: [
            "leo run",
            "leo build",
            "leo deploy",
            "leo execute"
          ],
          explanation: "The 'leo deploy' command is used to deploy a program to the Aleo network."
        },
        {
          question: "What does 'transition' mean in Leo?",
          options: [
            "State transition",
            "Public program function",
            "Private variable",
            "Library import"
          ],
          explanation: "Transition is a public function that can change program state."
        },
        {
          question: "What is the main advantage of Aleo?",
          options: [
            "High transaction speed",
            "Complete privacy of computations and data",
            "Low fees",
            "Ethereum compatibility"
          ],
          explanation: "Aleo provides complete privacy through ZK-proofs, hiding logic and data."
        },
        {
          question: "What is a circuit in the ZK context?",
          options: [
            "Electronic circuit",
            "Mathematical representation of computation",
            "Consensus algorithm",
            "Communication protocol"
          ],
          explanation: "Circuit is a mathematical scheme representing computation for ZK-proof."
        },
        {
          question: "What data type is used for unsigned integers in Leo?",
          options: [
            "int",
            "number",
            "u32, u64, u128",
            "integer"
          ],
          explanation: "Leo uses u8, u16, u32, u64, u128 types for unsigned integers."
        }
      ]
    }
  },

  ru: {
    // Hero Section
    hero: {
      title: "Добро пожаловать в Aleo Network",
      subtitle: "Войдите в мир Zero-Knowledge",
      prompt: "Подсказка: введите команду",
      placeholder: "введи 'connect' чтобы начать",
      connectError: "Команда не распознана. Введите \"connect\" чтобы начать путешествие.",
      connecting: [
        "ИНИЦИАЛИЗАЦИЯ ПРОТОКОЛА ВЗЛОМА...",
        "СКАНИРОВАНИЕ УЗЛОВ СЕТИ...",
        "[████████████████] 100% ФАЙРВОЛ ОБОЙДЕН",
        "ИНЪЕКЦИЯ ZK-PROOF PAYLOAD...",
        "РАСШИФРОВКА КВАНТОВЫХ ПОДПИСЕЙ...",
        "0x7F3A...B92E > ДОСТУП_РАЗРЕШЕН",
        "УСТАНОВКА ЗАЩИЩЕННОГО КАНАЛА...",
        "СИНХРОНИЗАЦИЯ СОСТОЯНИЯ БЛОКЧЕЙНА...",
        "⚡ НЕЙРОННАЯ СВЯЗЬ УСТАНОВЛЕНА ⚡",
        "✓ Доступ разрешен. Добро пожаловать, Prover #001."
      ]
    },

    // Missions List
    missions: {
      title: "ZK ОДИССЕЯ",
      subtitle: "Докажи то, что изучил. Открой скрытую сеть.",
      statusPanel: {
        prover: "Prover #001",
        level: "Уровень",
        knowledge: "Знания",
        proofs: "Доказательства"
      },
      locked: "🔒 ЗАБЛОКИРОВАНО",
      completed: "✓ ЗАВЕРШЕНО",
      startMission: "НАЧАТЬ МИССИЮ",
      viewBadge: "🏆 ПОСМОТРЕТЬ БЕЙДЖ VALIDATOR",
      bonusSection: "⚡ БОНУСНАЯ МИССИЯ",
      playNow: "ИГРАТЬ",
      goal: "Цель",
      reward: "Награда"
    },

    // Mission Names and Goals
    missionsList: {
      genesis: {
        name: "Генезис",
        goal: "Понять, что такое ZK",
        reward: "Доказательство знания #1",
        description: "Изучите основы доказательств с нулевым разглашением и поймите, как Aleo создает приватные приложения на блокчейне. Откройте для себя реальные примеры использования и силу технологий сохранения конфиденциальности."
      },
      language: {
        name: "Язык",
        goal: "Изучить основы Leo",
        reward: "Доказательство мастерства #2",
        description: "Освойте язык программирования Leo - статически типизированный функциональный язык для создания приватных приложений. Изучите синтаксис, типы данных и напишите свою первую ZK-программу."
      },
      circuit: {
        name: "Схема",
        goal: "Создать свой первый circuit",
        reward: "Доказательство сборки #3",
        description: "Создайте свою первую zero-knowledge схему и поймите, как код Leo компилируется в математические доказательства. Узнайте о records, приватном состоянии и модели Prover-Verifier."
      },
      network: {
        name: "Сеть",
        goal: "Запустить dApp на Aleo",
        reward: "Доказательство деплоя #4",
        description: "Задеплойте свое первое децентрализованное приложение в сеть Aleo. Изучите архитектуру сети, выполнение off-chain, валидацию on-chain и процесс деплоя."
      },
      validator: {
        name: "Валидатор",
        goal: "Пройти тестирование знаний",
        reward: "zk Бейдж: Валидатор",
        description: "Проверьте свои знания о zero-knowledge доказательствах, языке Leo, схемах и сети Aleo. Сдайте финальный экзамен, чтобы доказать, что вы освоили основы разработки приватного блокчейна."
      },
      builder: {
        name: "Конструктор схем",
        goal: "Построй ZK-схемы",
        reward: "Бонус: Бейдж строителя",
        description: "Интерактивная бонусная игра, где вы создаете и тестируете ZK-схемы в реальном времени. Экспериментируйте с различными дизайнами схем и смотрите, как они генерируют доказательства."
      },
      ledger: {
        name: "Акт VI — Реестр",
        goal: "Внутренности Aleo Blockchain",
        reward: "Значок Мастера Реестра",
        description: "Продвинутая миссия, исследующая внутренности блокчейна: mempool, структуру блоков, state commitment и построение блоков. Освойте механику реестра."
      }
    },

    // Circuit Builder
    circuitBuilder: {
      title: "КОНСТРУКТОР СХЕМ",
      back: "НАЗАД",
      bonus: "БОНУС",
      task: "ЗАДАНИЕ",
      hint: "ПОДСКАЗКА",
      show: "Показать",
      hide: "Скрыть",
      components: "КОМПОНЕНТЫ",
      run: "▶ ЗАПУСТИТЬ",
      running: "⚡ СИМУЛЯЦИЯ...",
      clear: "🗑️ ОЧИСТИТЬ",
      testCases: "ТЕСТ-КЕЙСЫ",
      test: "Тест",
      pass: "PASS",
      fail: "FAIL",
      expected: "Ожидалось",
      got: "Получено",
      runSimulation: "Запусти симуляцию",
      toCheck: "для проверки схемы",
      levelComplete: "УРОВЕНЬ ПРОЙДЕН!",
      nextLevel: "СЛЕДУЮЩИЙ УРОВЕНЬ →",
      allComplete: "🏆 ВСЕ УРОВНИ ПРОЙДЕНЫ!",
      stats: "СТАТИСТИКА",
      componentsCount: "Компоненты",
      connections: "Соединения",
      level: "Уровень",
      legend: "ЛЕГЕНДА",
      output: "Выход (output)",
      input: "Вход (input)",
      connection: "Соединение",
      instructions: {
        drag: "Перетаскивай",
        connect: "Соединяй точки",
        delete: "Удаляй"
      },
      levels: {
        equality: {
          name: "Простое равенство",
          description: "Создай circuit для проверки a == b",
          hint: "Используй XOR и NOT gates. Если a XOR b = 0, значит они равны"
        },
        range: {
          name: "Проверка диапазона",
          description: "Проверь, что значение в диапазоне [01, 11]",
          hint: "Используй AND и OR для проверки битов"
        },
        comparison: {
          name: "Приватное сравнение",
          description: "a > b без раскрытия значений",
          hint: "Используй комбинацию AND, NOT для побитового сравнения"
        }
      },
      gates: {
        and: "логическое И",
        or: "логическое ИЛИ",
        not: "инверсия",
        xor: "исключающее ИЛИ"
      }
    },

    // Zero Room
    zeroRoom: {
      entering: "ВХОД В ZERO ROOM",
      initializing: "Инициализация квантового пространства...",
      generating: "ГЕНЕРАЦИЯ ZK-БЕЙДЖА",
      scanning: "Сканирование прогресса",
      verifying: "Верификация доказательств",
      building: "Построение Merkle Tree",
      signature: "Генерация криптографической подписи",
      compiling: "Компиляция ZK-БЕЙДЖА...",
      badge: "ZK-БЕЙДЖ v1.0",
      validator: "ВАЛИДАТОР",
      zkMaster: "ZK МАСТЕР",
      missions: "Миссий",
      level: "Уровень",
      expert: "ЭКСПЕРТ",
      zkScore: "ZK Счет",
      uniqueId: "Уникальный ID",
      backToMissions: "Вернуться к миссиям",
      shareBadge: "Поделиться бейджем",
      badgeCopied: "Информация о бейдже скопирована!",
      achievements: "Достижения",
      zkKnowledge: "🎓 ZK Знания - Освоен",
      leoMaster: "⚡ Leo Мастер - Освоен",
      networkPro: "🚀 Network Про - Освоен",
      congratulations: "ПОЗДРАВЛЯЕМ!",
      successMessage: "Вы успешно прошли все миссии Aleo Odyssey",
      expertMessage: "Теперь вы — сертифицированный эксперт по Zero Knowledge Proof"
    },

    // Wallet Connection
    wallet: {
      connect: "Подключить кошелек",
      chooseWallet: "Выберите кошелек для подключения к Aleo Odyssey",
      leoWallet: "Leo Wallet",
      puzzleWallet: "Puzzle Wallet",
      available: "Доступен",
      notInstalled: "Не установлен",
      connecting: "Подключение...",
      disconnect: "Отключить",
      installExtension: "Установите расширение кошелька для подключения",
      refreshPage: "💡 Обновите страницу после установки расширения",
      debugConsole: "🔍 Вызовите window.debugAleoWallets() в консоли для диагностики",
      close: "Закрыть",
      refreshStatus: "Обновить статус кошельков",
      errors: {
        leoNotFound: "Leo Wallet не найден. Установите расширение Leo Wallet.",
        leoNotSupported: "Leo Wallet не поддерживает подключение",
        puzzleNotFound: "Puzzle Wallet не найден. Установите расширение Puzzle Wallet.",
        unknownWallet: "Неизвестный тип кошелька",
        connectionFailed: "Не удалось получить адрес от кошелька",
        notConnected: "Кошелек не подключен"
      },
      status: {
        available: "Доступен",
        notInBrowser: "Не в браузере",
        leoNotFound: "Leo Wallet не найден в window.leo",
        leoNoRequest: "Leo Wallet не имеет метода request",
        puzzleAvailable: "Доступен (window.puzzle)",
        puzzleSdk: "Доступен (Puzzle SDK)",
        puzzleUnavailable: "Puzzle Wallet недоступен"
      }
    },

    // Common
    common: {
      back: "← НАЗАД",
      next: "ДАЛЕЕ →",
      complete: "ЗАВЕРШИТЬ",
      submit: "ОТПРАВИТЬ",
      check: "ПРОВЕРИТЬ",
      restart: "НАЧАТЬ ЗАНОВО",
      continue: "ПРОДОЛЖИТЬ"
    },

    // Individual Missions Content
    theGenesis: {
      back: "← НАЗАД К МИССИЯМ",
      progress: "Прогресс",
      steps: "Шагов",
      title: "The Genesis",
      subtitle: "Понять, что такое ZK",
      beginner: "НАЧАЛЬНЫЙ",
      reward: "Proof of Knowledge #1",
      step1: {
        title: "Что такое Zero Knowledge Proof?",
        description: "Zero Knowledge Proof (ZK-доказательство) — это криптографический протокол, который позволяет одной стороне (prover) доказать другой стороне (verifier), что утверждение истинно, не раскрывая никакой дополнительной информации, кроме самого факта истинности.",
        example: "💡 Простой пример:",
        exampleText: "Представьте: вы хотите доказать, что знаете пароль от сейфа, не говоря сам пароль. ZK-протокол позволяет вам это сделать — открыть сейф, не раскрывая комбинацию.",
        button: "ПОНЯТНО, ПРОДОЛЖИТЬ →"
      },
      step2new: {
        title: "ZK в реальной жизни",
        description: "Zero Knowledge доказательства уже используются в реальных приложениях и решают практические задачи. Рассмотрим примеры:",
        useCase1Title: "Приватный банкинг",
        useCase1Text: "Докажите, что у вас достаточно средств для кредита, не раскрывая точный баланс. Банки могут проверить платежеспособность без доступа к финансовой истории.",
        useCase2Title: "Анонимное голосование",
        useCase2Text: "Докажите, что вы имеете право голосовать и проголосовали, не раскрывая за кого. Полная анонимность с возможностью проверки.",
        useCase3Title: "Честные игры",
        useCase3Text: "Докажите, что ваш ход валиден в игре, не раскрывая свою стратегию. Предотвращает читерство, сохраняя интригу игры.",
        button: "УВЛЕКАТЕЛЬНО! →"
      },
      step3new: {
        title: "Как работает математика ZK",
        description: "ZK-доказательства основаны на сложной криптографической математике. Разберем основные компоненты без погружения в формулы:",
        componentsTitle: "🔐 Три основных компонента:",
        component1: "Witness (Свидетель)",
        component1Text: "ваши секретные данные (пароль, приватный ключ, баланс)",
        component2: "Statement (Утверждение)",
        component2Text: "что вы хотите доказать (\"Я знаю пароль\")",
        component3: "Proof (Доказательство)",
        component3Text: "математическое подтверждение, не раскрывающее секрет",
        protocolTitle: "⚡ Протокол zkSNARK",
        protocolText: "Aleo использует zkSNARK (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) - протокол, позволяющий создавать компактные доказательства, которые быстро проверяются.",
        button: "ПОНЯЛ →"
      },
      step2: {
        title: "Зачем нужен Aleo?",
        description: "Aleo — это блокчейн-платформа, которая использует Zero Knowledge технологии для создания приватных и масштабируемых децентрализованных приложений.",
        privacy: "🔒 Приватность",
        privacyText: "Все вычисления происходят приватно. Никто не видит ваши данные.",
        speed: "⚡ Скорость",
        speedText: "ZK-доказательства позволяют быстро верифицировать транзакции.",
        button: "ПОНЯТНО →"
      },
      step3: {
        title: "Применение в реальном мире",
        description: "ZK-технологии открывают новые возможности для приватных приложений:",
        defi: "💰 DeFi с приватностью",
        defiText: "Торговля без раскрытия балансов и стратегий",
        games: "🎮 Игры",
        gamesText: "Приватные ходы, честная механика без читеров",
        medicine: "🏥 Медицина",
        medicineText: "Обмен данными без нарушения конфиденциальности",
        button: "ЗАВЕРШИТЬ МИССИЮ ✓"
      }
    },
    
    theLanguage: {
      back: "← НАЗАД К МИССИЯМ",
      progress: "Прогресс",
      steps: "Шагов",
      title: "The Language",
      subtitle: "Изучить основы языка Leo",
      intermediate: "СРЕДНИЙ",
      reward: "Proof of Mastery #2",
      step1: {
        title: "Что такое Leo?",
        description: "Leo — это статически типизированный функциональный язык программирования, созданный специально для написания приватных приложений на блокчейне Aleo. Синтаксис Leo похож на Rust, но оптимизирован для создания zero-knowledge circuits.",
        safety: "⚡ Безопасность",
        safetyText: "Строгая типизация предотвращает ошибки на этапе компиляции",
        privacy: "🔒 Приватность",
        privacyText: "Весь код компилируется в ZK-доказательства автоматически",
        button: "ИНТЕРЕСНО, ПОКАЖИТЕ СИНТАКСИС →"
      },
      step2: {
        title: "Структура программы Leo",
        description: "Каждая программа Leo начинается с объявления программы и содержит функции-переходы (transitions), которые определяют логику вашего приложения.",
        codeTitle: "📝 БАЗОВАЯ СТРУКТУРА",
        codeFile: "hello.aleo",
        note1: "Объявление программы с уникальным именем",
        note2: "Основная функция, которая будет выполняться",
        note3: "Параметр с типом (u32 = unsigned 32-bit integer)",
        button: "ПОНЯТНО →"
      },
      step3: {
        title: "Типы данных в Leo",
        description: "Leo поддерживает различные типы данных для работы с числами, булевыми значениями, адресами и структурами данных.",
        numeric: "Числовые типы",
        numericU: "• u8, u16, u32, u64, u128 - unsigned",
        numericI: "• i8, i16, i32, i64, i128 - signed",
        numericField: "• field - большие числа",
        other: "Другие типы",
        otherBool: "• bool - true/false",
        otherAddress: "• address - Aleo адреса",
        otherStruct: "• struct - кастомные структуры",
        codeTitle: "💡 ПРИМЕР ИСПОЛЬЗОВАНИЯ",
        codeFile: "calculate.leo",
        button: "ПОНЯЛ, ДАВАЙТЕ ПРАКТИКУ →"
      },
      step4: {
        title: "Records и Structs",
        description: "В Leo вы можете создавать кастомные структуры данных с помощью struct и record. Record — это особый тип, который хранит приватные данные on-chain.",
        codeTitle: "📝 СТРУКТУРА ТОКЕНА",
        codeFile: "token.leo",
        recordTitle: "🔒 Что такое record?",
        recordText: "Record — это специальная структура данных в Leo, которая хранит зашифрованные данные on-chain. Только владелец record может их расшифровать и использовать.",
        recordNote: "приватная структура данных на блокчейне",
        button: "ПОНЯТНО →"
      },
      step5: {
        title: "Модификаторы видимости",
        description: "В Leo есть три модификатора видимости, которые контролируют, как данные обрабатываются и хранятся: public, private и constant.",
        publicTitle: "public",
        publicText: "Данные видны всем в блокчейне. Используются для прозрачного состояния.",
        privateTitle: "private",
        privateText: "Зашифрованные данные, видимые только владельцу. Основа приватности Aleo.",
        constantTitle: "constant",
        constantText: "Константы времени компиляции, которые встраиваются в схему.",
        codeTitle: "💡 ПРИМЕР ИСПОЛЬЗОВАНИЯ:",
        button: "ПОНЯЛ →"
      },
      step6: {
        title: "Практика: Напишите свой код",
        description: "Напишите функцию-переход, которая принимает два числа u32 и возвращает их сумму:",
        hint: "💡 ПОДСКАЗКА",
        hintShow: "Показать",
        hintHide: "Скрыть",
        hintTitle: "Формат команды:",
        hintText: "transition main(a: u32, b: u32) -> u32 { ... }",
        placeholder: "Напишите свой код здесь...",
        check: "ПРОВЕРИТЬ КОД",
        success: "✓ Отлично! Ваш код правильный!",
        error: "✗ Попробуйте еще раз. Подсказка: начните с \"transition main\"",
        complete: "Миссия завершена!",
        reward: "Вы получили: Proof of Mastery #2",
        returning: "Возвращение к миссиям..."
      }
    },
    
    theCircuit: {
      back: "← НАЗАД К МИССИЯМ",
      progress: "Прогресс",
      steps: "Шагов",
      title: "The Circuit",
      subtitle: "Создать свой первый circuit",
      intermediate: "СРЕДНИЙ",
      reward: "Proof of Build #3",
      step1: {
        title: "Что такое ZK-Circuit?",
        description: "ZK-Circuit (схема доказательства с нулевым разглашением) — это математическое представление вычисления, которое можно доказать без раскрытия входных данных. Это ядро любого ZK-приложения на Aleo.",
        howItWorks: "🔄 Как это работает:",
        step1Text: "Вы пишете программу на Leo",
        step2Text: "Компилятор преобразует её в схему (circuit)",
        step3Text: "Схема генерирует доказательство",
        step4Text: "Любой может проверить доказательство",
        button: "ПОНЯТНО →"
      },
      step2: {
        title: "Создание первого Circuit",
        description: "Давайте создадим простой circuit для приватного хранения токенов. Используем структуру record для хранения приватного состояния.",
        codeTitle: "📝 ПРИВАТНЫЙ ТОКЕН",
        codeFile: "token.leo",
        keyPoints: "🔑 Ключевые моменты:",
        point1: "record - приватный тип данных",
        point2: "Все данные внутри record приватны",
        point3: "Только владелец может использовать свои records",
        point4: "Транзакции создают новые records, уничтожая старые",
        button: "КРУТО, ЧТО ДАЛЬШЕ? →"
      },
      step3new: {
        title: "Компиляция в схему",
        description: "Компилятор Leo переводит ваш код в ZK-схему. Давайте разберемся в этом процессе:",
        step1Title: "Парсинг",
        step1Text: "Компилятор анализирует синтаксис и создает абстрактное синтаксическое дерево (AST) из вашего кода.",
        step2Title: "Генерация схемы",
        step2Text: "AST преобразуется в арифметические ограничения - уравнения, описывающие ваши вычисления.",
        step3Title: "Оптимизация",
        step3Text: "Компилятор оптимизирует ограничения для уменьшения времени генерации и размера доказательства.",
        button: "ИНТЕРЕСНО →"
      },
      step4new: {
        title: "Оптимизация схем",
        description: "Оптимизация ZK-схем критически важна для производительности. Меньшие схемы означают более быстрые доказательства и меньшую стоимость.",
        whyTitle: "Зачем оптимизировать?",
        why1: "Быстрая генерация доказательств - меньше времени на создание proof",
        why2: "Меньший размер доказательства - проще передавать и хранить",
        why3: "Меньшая стоимость gas - дешевле транзакции в блокчейне",
        technique1: "Сокращение ограничений",
        technique1Text: "Минимизируйте количество арифметических ограничений, сохраняя корректность вычислений.",
        technique2: "Таблицы поиска",
        technique2Text: "Используйте предвычисленные значения для частых операций вместо их пересчета.",
        button: "ПОНЯЛ →"
      },
      step3: {
        title: "Проверка знаний",
        description: "Как называется тип данных в Leo, который используется для хранения приватного состояния?",
        yourAnswer: "ВАШ ОТВЕТ (одно слово)",
        placeholder: "Введите ответ...",
        hint: "💡 Подсказка:",
        hintShow: "Показать",
        hintHide: "Скрыть",
        hintText: "Посмотрите на код выше. Какое ключевое слово используется перед \"Token\"?",
        check: "ПРОВЕРИТЬ ОТВЕТ ✓",
        success: "✓ Правильно! record - это приватный тип данных.",
        error: "✗ Неправильно. Подсказка: начинается с 'r'."
      },
      step4: {
        title: "Финальный тест",
        description: "Кто в ZK-системе генерирует доказательство на основе приватных данных?",
        option1: "Prover (Доказывающий)",
        option2: "Verifier (Проверяющий)",
        option3: "Компилятор",
        check: "ПРОВЕРИТЬ ✓",
        success: "✓ Правильно! Prover создает доказательство.",
        error: "✗ Неправильно. Кто создает доказательство в ZK-системе?"
      }
    },
    
    theNetwork: {
      back: "← НАЗАД К МИССИЯМ",
      progress: "Прогресс",
      steps: "Шагов",
      title: "The Network",
      subtitle: "Запустить dApp на Aleo",
      advanced: "ПРОДВИНУТЫЙ",
      reward: "Proof of Deployment #4",
      step1: {
        title: "Архитектура сети Aleo",
        description: "Aleo — это Layer 1 блокчейн, где все вычисления происходят off-chain с доказательствами, а валидация происходит on-chain. Это обеспечивает масштабируемость и приватность.",
        offchainTitle: "⚙️ Off-chain",
        offchainText: "Выполнение программ и генерация доказательств",
        onchainTitle: "⛓️ On-chain",
        onchainText: "Валидация доказательств и хранение состояния",
        privacyTitle: "🔒 Privacy",
        privacyText: "Приватность данных и логики приложения",
        networkComponents: "🌐 Компоненты сети:",
        validators: "Validators:",
        validatorsText: "проверяют транзакции и создают блоки",
        provers: "Provers:",
        proversText: "генерируют ZK-доказательства",
        clients: "Clients:",
        clientsText: "взаимодействуют с приложениями",
        button: "ПОНЯТНО, КАК ДЕПЛОИТЬ? →"
      },
      step2new: {
        title: "Механизм консенсуса Aleo",
        description: "Aleo использует гибридный консенсус, объединяющий Proof of Stake (PoS) для валидации и Proof of Work (PoW) для доказательств. Это обеспечивает безопасность и децентрализацию сети.",
        posTitle: "Proof of Stake (PoS)",
        posText: "Валидаторы стейкают кредиты и проверяют транзакции. Они получают награды за честную работу и теряют стейк за вредоносные действия.",
        powTitle: "Proof of Work (PoW)",
        powText: "Доказывающие соревнуются в генерации ZK-доказательств. Они используют вычислительную мощность для создания доказательств и получают награды.",
        coinbaseTitle: "💰 Coinbase Puzzle:",
        coinbaseText: "Aleo использует уникальный Coinbase Puzzle - вычислительную задачу, которая одновременно генерирует безопасность сети и ZK-доказательства.",
        button: "ПОНЯЛ →"
      },
      step3new: {
        title: "Транзакции и Records",
        description: "В Aleo существует три типа транзакций. Каждый служит определенной цели в сети.",
        deployTitle: "Deploy",
        deployText: "Публикует новую программу в блокчейн. Программа становится доступна всем пользователям.",
        executeTitle: "Execute",
        executeText: "Вызывает функцию-переход задеплоенной программы. Создает новые записи и тратит старые.",
        feeTitle: "Fee",
        feeText: "Оплачивает выполнение транзакции. Компенсирует работу валидаторов и доказывающих.",
        recordTitle: "🔒 Records - приватное состояние:",
        recordText: "Records хранят приватные данные on-chain. Только владелец может расшифровать и использовать свои записи. Каждая транзакция потребляет входные записи и создает новые выходные.",
        button: "ПОНЯЛ →"
      },
      step2: {
        title: "Процесс деплоя программы",
        description: "Для деплоя программы на Aleo нужно выполнить несколько шагов: написать код, скомпилировать, сгенерировать ключи и задеплоить в сеть.",
        step1Title: "Создание проекта",
        step1Command: "leo new my_app",
        step2Title: "Написание кода",
        step2Command: "cd my_app && edit src/main.leo",
        step3Title: "Компиляция",
        step3Command: "leo build",
        step4Title: "Деплой в сеть",
        step4Command: "leo deploy --network testnet",
        important: "⚠️ Важно:",
        point1: "Для деплоя нужны Aleo credits (на testnet бесплатно)",
        point2: "Каждая программа имеет уникальное имя в сети",
        point3: "После деплоя программу нельзя изменить",
        button: "ОТЛИЧНО, К ПРАКТИКЕ! →"
      },
      step3: {
        title: "Выбор сети для деплоя",
        description: "Aleo предоставляет несколько сетей для разработки и продакшена. Для обучения мы будем использовать testnet.",
        mainnet: "Mainnet",
        mainnetLabel: "Production",
        mainnetDesc: "Основная сеть для продакшен приложений. Требует реальные Aleo credits.",
        testnet: "Testnet",
        testnetLabel: "Recommended",
        testnetDesc: "Тестовая сеть для разработки. Бесплатные credits из faucet.",
        local: "Local",
        localLabel: "Development",
        localDesc: "Локальная нода на вашем компьютере для быстрой разработки.",
        button: "ВЫБРАЛ, ДЕПЛОИМ! →"
      },
      step4: {
        title: "Деплой программы",
        description: "Введите команду для деплоя вашей программы в выбранную сеть. Используйте Leo CLI команду.",
        terminal: "ТЕРМИНАЛ",
        hint: "💡 Подсказка:",
        hintShow: "Показать",
        hintHide: "Скрыть",
        hintCommand: "Команда:",
        hintButton: "👁️ Показать подсказку",
        selectedNetwork: "📋 Выбранная сеть:",
        notSelected: "Не выбрана",
        placeholder: "leo deploy...",
        deploy: "ЗАПУСТИТЬ ДЕПЛОЙ 🚀",
        building: "📦 Building program...",
        generating: "🔐 Generating proving key...",
        connecting: "📡 Connecting to Aleo testnet...",
        success: "✓ Program deployed successfully!",
        error: "✗ Неправильная команда или сеть. Используйте \"leo deploy\" и выберите testnet.",
        missionComplete: "Миссия завершена!",
        reward: "Вы получили: Proof of Deployment #4",
        congratsMessage: "Ваше приложение успешно задеплоено в Aleo Network!",
        returning: "Возвращение к списку миссий..."
      },
      step7: {
        title: "Интерактивная визуализация сети",
        description: "Теперь давайте посмотрим, как работает сеть Aleo в действии. Взаимодействуйте с узлами и симулируйте proof flow.",
        nodesTitle: "🌐 Узлы сети (нажмите, чтобы узнать больше)",
        prover: "Prover",
        proverDesc: "Генерирует ZK-доказательства из выполнения программы",
        proverActive: "Генерация вычислительного доказательства...",
        validator: "Validator",
        validatorDesc: "Проверяет доказательства и подтверждает транзакции",
        validatorActive: "Проверка валидности доказательства...",
        blockchain: "Blockchain",
        blockchainDesc: "Хранит подтвержденные транзакции on-chain",
        blockchainActive: "Запись транзакции в блокчейн...",
        simulateTitle: "🔄 Симуляция Proof Flow",
        simulateDesc: "Введите входные данные и наблюдайте, как они превращаются в ZK-proof, проверяются и записываются on-chain.",
        inputPlaceholder: "Введите ваши данные (например, 42)",
        executeButton: "СГЕНЕРИРОВАТЬ И ВЫПОЛНИТЬ PROOF",
        generating: "Генерация ZK-proof...",
        verifying: "Validator проверяет proof...",
        writing: "Запись в blockchain...",
        proofSuccess: "Proof успешно проверен и записан!",
        proofPrivate: "Ваши входные данные остаются приватными, публичен только proof.",
        recordsTitle: "🔒 Приватные Records",
        showRecords: "Показать примеры",
        hideRecords: "Скрыть",
        record1Title: "Record #1 (До транзакции)",
        record2Title: "Record #2 (После транзакции)",
        recordsNote: "Records зашифрованы on-chain. Только владельцы могут расшифровать свои данные."
      }
    },
    
    howAleoWorks: {
      back: "← НАЗАД К МИССИЯМ",
      progress: "Прогресс",
      steps: "Шагов",
      title: "Как работает Aleo",
      subtitle: "Понять архитектуру Aleo",
      intermediate: "СРЕДНИЙ",
      reward: "Доказательство понимания #4",
      step1: {
        title: "Архитектура сети Aleo",
        description: "Aleo — это Layer 1 блокчейн, где все вычисления происходят off-chain с доказательствами, а валидация происходит on-chain. Это обеспечивает масштабируемость и приватность.",
        offchainTitle: "Off-chain",
        offchainText: "Выполнение программ и генерация доказательств",
        onchainTitle: "On-chain",
        onchainText: "Валидация доказательств и хранение состояния",
        componentsTitle: "🌐 Компоненты сети:",
        prover: "Prover",
        proverText: "генерирует ZK-доказательства из выполнения программы",
        validator: "Validator",
        validatorText: "проверяет доказательства и подтверждает транзакции",
        client: "Client",
        clientText: "взаимодействует с приложениями",
        button: "ПОНЯТНО, КАК РАБОТАЕТ КОНСЕНСУС? →"
      },
      
      step2: {
        title: "Механизм консенсуса Aleo",
        description: "Aleo использует гибридный консенсус, объединяющий Proof of Stake (PoS) для валидации и Proof of Work (PoW) для доказательств. Это обеспечивает безопасность и децентрализацию сети.",
        posTitle: "Proof of Stake (PoS)",
        posText: "Валидаторы стейкают кредиты и проверяют транзакции. Они получают награды за честную работу и теряют стейк за вредоносные действия.",
        powTitle: "Proof of Work (PoW)",
        powText: "Доказывающие соревнуются в генерации ZK-доказательств. Они используют вычислительную мощность для создания доказательств и получают награды.",
        coinbaseTitle: "💰 Coinbase Puzzle:",
        coinbaseText: "Aleo использует уникальный Coinbase Puzzle - вычислительную задачу, которая одновременно генерирует безопасность сети и ZK-доказательства.",
        button: "ПОНЯЛ →"
      },
      
      step3: {
        title: "Транзакции и Records",
        description: "В Aleo существует три типа транзакций. Каждый служит определенной цели в сети.",
        deployTitle: "Deploy",
        deployText: "Публикует новую программу в блокчейн. Программа становится доступна всем пользователям.",
        executeTitle: "Execute",
        executeText: "Вызывает функцию-переход задеплоенной программы. Создает новые записи и тратит старые.",
        feeTitle: "Fee",
        feeText: "Оплачивает выполнение транзакции. Компенсирует работу валидаторов и доказывающих.",
        recordTitle: "🔒 Records - приватное состояние:",
        recordText: "Records хранят приватные данные on-chain. Только владелец может расшифровать и использовать свои записи. Каждая транзакция потребляет входные записи и создает новые выходные.",
        button: "ПОНЯЛ →"
      },
      
      step4: {
        title: "Поток выполнения транзакций",
        description: "Давайте поймем, как транзакция проходит через сеть Aleo от инициации до финализации.",
        step1Title: "1. Инициация транзакции",
        step1Text: "Клиент создает транзакцию с приватными входами и вызывает функцию программы.",
        step2Title: "2. Off-chain выполнение",
        step2Text: "Программа выполняется off-chain, генерируя ZK-доказательства, которые доказывают корректное выполнение без раскрытия входов.",
        step3Title: "3. Отправка доказательства",
        step3Text: "Prover отправляет транзакцию с ZK-доказательствами в сеть для валидации.",
        step4Title: "4. On-chain валидация",
        step4Text: "Валидаторы проверяют ZK-доказательства и добавляют транзакцию в блок, если она валидна.",
        button: "ПОНЯЛ →"
      },
      
      step5: {
        title: "Интерактивная визуализация сети",
        description: "Теперь давайте посмотрим, как работает сеть Aleo в действии. 3D визуализация показывает компоненты сети и их взаимодействие.",
        visualizationText: "Двигайте мышью, чтобы исследовать 3D сеть. Каждый цветной узел представляет собой различный компонент экосистемы Aleo.",
        button: "ЗАВЕРШИТЬ МИССИЮ ✓"
      },
      oldsteps: {
        old: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-[#00fff7]/10 to-[#c084fc]/10 p-6 rounded-xl border border-[#00fff7]/20">
              <h3 class="text-2xl font-bold text-[#00fff7] mb-4">⚔️ Битва за приватность</h3>
              <p class="text-gray-300 mb-4">
                Хотя Ethereum революционизировал смарт-контракты, у него есть фундаментальный недостаток: 
                <span class="text-red-400 font-bold">всё публично</span>. 
                Aleo исправляет это, делая приватность по умолчанию, а не запоздалой мыслью.
              </p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-gradient-to-br from-red-500/10 to-red-600/5 p-6 rounded-xl border border-red-500/20">
                <h4 class="text-xl font-bold text-red-400 mb-4 flex items-center">
                  <span class="text-2xl mr-2">🔍</span>
                  Проблема Ethereum
                </h4>
                <ul class="space-y-3 text-gray-300">
                  <li class="flex items-start">
                    <span class="text-red-400 mr-2">❌</span>
                    <span>Все данные транзакций публичны и видны</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-400 mr-2">❌</span>
                    <span>Состояние смарт-контрактов прозрачно</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-400 mr-2">❌</span>
                    <span>Балансы и переводы пользователей раскрыты</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-400 mr-2">❌</span>
                    <span>Приватность требует сложных обходных путей (Tornado Cash)</span>
                  </li>
                </ul>
              </div>
              
              <div class="bg-gradient-to-br from-[#00fff7]/10 to-[#c084fc]/10 p-6 rounded-xl border border-[#00fff7]/20">
                <h4 class="text-xl font-bold text-[#00fff7] mb-4 flex items-center">
                  <span class="text-2xl mr-2">🛡️</span>
                  Решение Aleo
                </h4>
                <ul class="space-y-3 text-gray-300">
                  <li class="flex items-start">
                    <span class="text-green-400 mr-2">✅</span>
                    <span>Приватные записи по умолчанию</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-400 mr-2">✅</span>
                    <span>Zero-knowledge доказательства скрывают вычисления</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-400 mr-2">✅</span>
                    <span>Только доказательства публичны, данные остаются приватными</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-400 mr-2">✅</span>
                    <span>Приватность встроена в протокол</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-[#c084fc]/10 to-[#00fff7]/10 p-6 rounded-xl border border-[#c084fc]/20">
              <h3 class="text-2xl font-bold text-[#c084fc] mb-4">📊 Сравнение производительности</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-black/40 p-4 rounded-lg text-center">
                  <h4 class="text-[#00fff7] font-bold mb-2">Скорость транзакций</h4>
                  <div class="text-2xl font-bold text-white mb-1">~100мс</div>
                  <div class="text-sm text-gray-400">Aleo (Off-chain)</div>
                  <div class="text-xs text-red-400 mt-1">vs 15с Ethereum</div>
                </div>
                <div class="bg-black/40 p-4 rounded-lg text-center">
                  <h4 class="text-[#c084fc] font-bold mb-2">Стоимость газа</h4>
                  <div class="text-2xl font-bold text-white mb-1">~$0.001</div>
                  <div class="text-sm text-gray-400">Aleo (Минимальная)</div>
                  <div class="text-xs text-red-400 mt-1">vs $5-50 Ethereum</div>
                </div>
                <div class="bg-black/40 p-4 rounded-lg text-center">
                  <h4 class="text-[#00fff7] font-bold mb-2">Уровень приватности</h4>
                  <div class="text-2xl font-bold text-white mb-1">100%</div>
                  <div class="text-sm text-gray-400">Aleo (Нативная)</div>
                  <div class="text-xs text-red-400 mt-1">vs 0% Ethereum</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      
      oldstuffru2: {
        title: "Интерактивный симулятор консенсуса",
        description: "Опыт работы гибридного консенсуса Aleo в реальном времени",
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-[#00fff7]/10 to-[#c084fc]/10 p-6 rounded-xl border border-[#00fff7]/20">
              <h3 class="text-2xl font-bold text-[#00fff7] mb-4">🎮 Симулятор консенсуса</h3>
              <p class="text-gray-300 mb-4">
                Наблюдайте, как валидаторы и майнеры работают вместе для защиты сети Aleo. 
                Нажмите кнопки ниже, чтобы запустить различные события консенсуса!
              </p>
            </div>
            
            <div class="bg-black/60 rounded-xl p-8 min-h-[400px]">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <h4 class="text-lg font-bold text-[#c084fc] mb-3">Валидаторы (PoS)</h4>
                  <div class="space-y-2" id="validator-list">
                    <div class="flex items-center justify-between p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                      <span class="text-white">Валидатор #1</span>
                      <span class="text-green-400 text-sm">Стейк: 1000 ALEO</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                      <span class="text-white">Валидатор #2</span>
                      <span class="text-green-400 text-sm">Стейк: 800 ALEO</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                      <span class="text-white">Валидатор #3</span>
                      <span class="text-green-400 text-sm">Стейк: 1200 ALEO</span>
                    </div>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <h4 class="text-lg font-bold text-[#00fff7] mb-3">Майнеры (PoW)</h4>
                  <div class="space-y-2" id="miner-list">
                    <div class="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                      <span class="text-white">Майнер #1</span>
                      <span class="text-blue-400 text-sm">Хеш: 0x3a7f...</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                      <span class="text-white">Майнер #2</span>
                      <span class="text-blue-400 text-sm">Хеш: 0x8b2e...</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                      <span class="text-white">Майнер #3</span>
                      <span class="text-blue-400 text-sm">Хеш: 0x1c9d...</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 text-center">
                <div class="bg-gradient-to-r from-[#00fff7]/20 to-[#c084fc]/20 p-4 rounded-lg border border-[#00fff7]/30">
                  <h4 class="text-lg font-bold text-white mb-2">Текущий блок</h4>
                  <div class="text-sm text-gray-400 font-mono">Блок #1,234,567</div>
                  <div class="text-xs text-[#00fff7] mt-1">Обновлено: 2 секунды назад</div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-center space-x-4">
              <button class="px-6 py-3 bg-[#00fff7] text-black font-bold rounded-lg hover:bg-[#00fff7]/80 transition-all hover:scale-105">
                🎲 Симулировать блок
              </button>
              <button class="px-6 py-3 bg-[#c084fc] text-white font-bold rounded-lg hover:bg-[#c084fc]/80 transition-all hover:scale-105">
                ⚡ Добавить валидатора
              </button>
              <button class="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-500/80 transition-all hover:scale-105">
                ⛏️ Майнить головоломку
              </button>
            </div>
          </div>
        `
      },
      
      oldstuffru3: {
        title: "Поток приватных транзакций",
        description: "Пошаговая симуляция приватной транзакции",
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-[#00fff7]/10 to-[#c084fc]/10 p-6 rounded-xl border border-[#00fff7]/20">
              <h3 class="text-2xl font-bold text-[#00fff7] mb-4">🔐 Симулятор приватных транзакций</h3>
              <p class="text-gray-300 mb-4">
                Следите за приватной транзакцией от создания до подтверждения. 
                Каждый шаг показывает, какие данные видны кому.
              </p>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/20">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">1</div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">Создание транзакции</h4>
                  <p class="text-gray-400 mb-3">Алиса хочет отправить 5 ALEO Бобу приватно</p>
                  <div class="bg-black/40 p-3 rounded border border-green-500/30">
                    <div class="text-sm text-green-400 font-mono">
                      <div>От: alice1...</div>
                      <div>Кому: bob1...</div>
                      <div>Сумма: 5 ALEO</div>
                      <div class="text-red-400">Приватные данные: 🔒 ЗАШИФРОВАНЫ</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-[#00fff7]/10 to-transparent rounded-lg border border-[#00fff7]/20">
                <div class="w-8 h-8 bg-[#00fff7] rounded-full flex items-center justify-center text-black font-bold">2</div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">Генерация доказательства</h4>
                  <p class="text-gray-400 mb-3">Доказывающий генерирует zero-knowledge доказательство</p>
                  <div class="bg-black/40 p-3 rounded border border-[#00fff7]/30">
                    <div class="text-sm text-[#00fff7] font-mono">
                      <div>Доказательство: 0x7f3a8b2e9c1d...</div>
                      <div>Публичный вывод: ✅ Валидный</div>
                      <div>Приватный ввод: 🔒 Скрыт</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-[#c084fc]/10 to-transparent rounded-lg border border-[#c084fc]/20">
                <div class="w-8 h-8 bg-[#c084fc] rounded-full flex items-center justify-center text-black font-bold">3</div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">Отправка в сеть</h4>
                  <p class="text-gray-400 mb-3">Только доказательство и публичные данные отправляются в сеть</p>
                  <div class="bg-black/40 p-3 rounded border border-[#c084fc]/30">
                    <div class="text-sm text-[#c084fc] font-mono">
                      <div>Публично: ✅ Транзакция валидна</div>
                      <div>Приватно: 🔒 Не передается</div>
                      <div>Размер: 256 байт (vs 1КБ+ на Ethereum)</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/20">
                <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">4</div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">Валидация</h4>
                  <p class="text-gray-400 mb-3">Валидаторы проверяют доказательство, не видя приватных данных</p>
                  <div class="bg-black/40 p-3 rounded border border-yellow-500/30">
                    <div class="text-sm text-yellow-400 font-mono">
                      <div>Проверка доказательства: ✅ Валидное</div>
                      <div>Проверка баланса: ✅ Достаточно</div>
                      <div>Приватные данные: 🔒 Никогда не доступны</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/20">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">5</div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-white mb-2">Подтверждение</h4>
                  <p class="text-gray-400 mb-3">Транзакция подтверждена и включена в блок</p>
                  <div class="bg-black/40 p-3 rounded border border-green-500/30">
                    <div class="text-sm text-green-400 font-mono">
                      <div>Блок: #1,234,568</div>
                      <div>Статус: ✅ Подтверждено</div>
                      <div>Приватность: 🔒 Сохранена</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      
      oldstuffru4: {
        title: "Интерактивный 3D исследователь сети",
        description: "Исследуйте архитектуру Aleo в интерактивной 3D среде",
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-[#00fff7]/10 to-[#c084fc]/10 p-6 rounded-xl border border-[#00fff7]/20">
              <h3 class="text-2xl font-bold text-[#00fff7] mb-4">🌐 3D исследователь сети</h3>
              <p class="text-gray-300 mb-4">
                Навигация по архитектуре сети Aleo. Нажмите на разные узлы, чтобы узнать об их ролях 
                и увидеть потоки данных между компонентами в реальном времени.
              </p>
            </div>
            
            <div class="bg-black/60 rounded-xl p-8 min-h-[500px] flex items-center justify-center">
              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-r from-[#00fff7] to-[#c084fc] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span class="text-4xl">🌐</span>
                </div>
                <h4 class="text-2xl font-bold text-white mb-2">3D сеть загружается...</h4>
                <p class="text-gray-400 mb-4">Интерактивная 3D модель появится здесь</p>
                <div class="flex justify-center space-x-2">
                  <div class="w-2 h-2 bg-[#00fff7] rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-[#c084fc] rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-[#00fff7] rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-black/40 p-4 rounded-lg text-center hover:bg-[#00fff7]/10 transition-colors cursor-pointer">
                <div class="w-6 h-6 bg-[#00fff7] rounded-full mx-auto mb-2"></div>
                <span class="text-sm text-gray-400">Доказывающие</span>
                <div class="text-xs text-[#00fff7] mt-1">Генерируют ZK доказательства</div>
              </div>
              <div class="bg-black/40 p-4 rounded-lg text-center hover:bg-[#c084fc]/10 transition-colors cursor-pointer">
                <div class="w-6 h-6 bg-[#c084fc] rounded-full mx-auto mb-2"></div>
                <span class="text-sm text-gray-400">Валидаторы</span>
                <div class="text-xs text-[#c084fc] mt-1">Проверяют и защищают</div>
              </div>
              <div class="bg-black/40 p-4 rounded-lg text-center hover:bg-green-500/10 transition-colors cursor-pointer">
                <div class="w-6 h-6 bg-green-500 rounded-full mx-auto mb-2"></div>
                <span class="text-sm text-gray-400">Клиенты</span>
                <div class="text-xs text-green-400 mt-1">Пользовательский интерфейс</div>
              </div>
              <div class="bg-black/40 p-4 rounded-lg text-center hover:bg-yellow-500/10 transition-colors cursor-pointer">
                <div class="w-6 h-6 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <span class="text-sm text-gray-400">Записи</span>
                <div class="text-xs text-yellow-400 mt-1">Приватные данные</div>
              </div>
            </div>
          </div>
        `
      },
      
      oldstuffru5: {
        title: "Вызов знаний: Ультимативный тест",
        description: "Проверьте свои знания с помощью интерактивной викторины",
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-[#00fff7]/10 to-[#c084fc]/10 p-6 rounded-xl border border-[#00fff7]/20">
              <h3 class="text-2xl font-bold text-[#00fff7] mb-4">🧠 Ультимативный вызов знаний Aleo</h3>
              <p class="text-gray-300 mb-4">
                Докажите свое мастерство архитектуры Aleo! Отвечайте правильно, чтобы разблокировать следующий уровень. 
                Неправильные ответы запустят образовательные объяснения.
              </p>
            </div>
            
            <div class="bg-black/60 rounded-xl p-8 min-h-[400px]">
              <div class="text-center mb-8">
                <div class="text-4xl mb-4">🎯</div>
                <h4 class="text-2xl font-bold text-white mb-2">Вопрос 1 из 5</h4>
                <div class="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div class="bg-gradient-to-r from-[#00fff7] to-[#c084fc] h-2 rounded-full" style="width: 20%"></div>
                </div>
              </div>
              
              <div class="space-y-6">
                <div class="bg-gradient-to-r from-[#c084fc]/10 to-[#00fff7]/10 p-6 rounded-xl border border-[#c084fc]/20">
                  <h4 class="text-xl font-bold text-white mb-4">
                    Какое главное преимущество модели off-chain выполнения Aleo по сравнению с Ethereum?
                  </h4>
                  
                  <div class="space-y-3">
                    <button class="w-full p-4 text-left bg-black/40 rounded-lg border border-gray-600 hover:border-[#00fff7] hover:bg-[#00fff7]/10 transition-all">
                      <span class="text-[#00fff7] font-bold mr-3">А)</span>
                      <span class="text-white">Более быстрая обработка транзакций и меньшие затраты</span>
                    </button>
                    
                    <button class="w-full p-4 text-left bg-black/40 rounded-lg border border-gray-600 hover:border-[#c084fc] hover:bg-[#c084fc]/10 transition-all">
                      <span class="text-[#c084fc] font-bold mr-3">Б)</span>
                      <span class="text-white">Лучшая безопасность через proof-of-work</span>
                    </button>
                    
                    <button class="w-full p-4 text-left bg-black/40 rounded-lg border border-gray-600 hover:border-green-500 hover:bg-green-500/10 transition-all">
                      <span class="text-green-500 font-bold mr-3">В)</span>
                      <span class="text-white">Более децентрализован, чем другие блокчейны</span>
                    </button>
                    
                    <button class="w-full p-4 text-left bg-black/40 rounded-lg border border-gray-600 hover:border-yellow-500 hover:bg-yellow-500/10 transition-all">
                      <span class="text-yellow-500 font-bold mr-3">Г)</span>
                      <span class="text-white">Использует меньше энергии, чем Bitcoin</span>
                    </button>
                  </div>
                </div>
                
                <div class="flex justify-between items-center">
                  <div class="text-sm text-gray-400">
                    Счет: <span class="text-[#00fff7] font-bold">0/5</span>
                  </div>
                  <div class="text-sm text-gray-400">
                    Серия: <span class="text-[#c084fc] font-bold">0</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="text-center">
              <button class="px-8 py-3 bg-gradient-to-r from-[#00fff7] to-[#c084fc] text-white font-bold rounded-lg hover:scale-105 transition-all">
                🚀 Начать вызов
              </button>
            </div>
          </div>
        `
      }
    },
    
    theValidator: {
      back: "← НАЗАД К МИССИЯМ",
      progress: "Прогресс",
      title: "The Validator",
      subtitle: "Проверьте свои знания о ZK",
      advanced: "ФИНАЛ",
      reward: "zk Badge: Validator",
      questionOf: "Вопрос {current} из {total}",
      nextQuestion: "СЛЕДУЮЩИЙ ВОПРОС",
      showResults: "ПОКАЗАТЬ РЕЗУЛЬТАТЫ",
      yourScore: "Ваш результат:",
      passed: "✓ Поздравляем! Вы освоили Aleo!",
      failed: "Попробуйте еще раз, чтобы улучшить результат.",
      completeMission: "ЗАВЕРШИТЬ МИССИЮ ✓",
      restart: "НАЧАТЬ ЗАНОВО",
      backButton: "← НАЗАД",
      helpTextStart: "Ответьте на все вопросы, чтобы завершить тест",
      helpTextRemaining: "Осталось: {count}",
      passedMessage: "Вы доказали свои знания!",
      failedMessage: "Изучите материал и попробуйте снова",
      correct: "Правильно!",
      yourAnswer: "Ваш ответ:",
      correctAnswer: "Правильно:",
      badgeReceived: "Вы получили: zk Badge: Validator",
      congratsMessage: "Поздравляем! Вы завершили все миссии ZK Odyssey.",
      returningToMissions: "Возвращение к списку миссий...",
      returnButton: "← ВЕРНУТЬСЯ",
      correctAnswers: "правильных ответов",
      questions: [
        {
          question: "Что такое Zero Knowledge Proof?",
          options: [
            "Способ шифрования данных",
            "Протокол для доказательства истинности без раскрытия информации",
            "Метод проверки подписи",
            "Алгоритм хеширования"
          ],
          explanation: "ZK-доказательство позволяет доказать истинность утверждения без раскрытия дополнительной информации."
        },
        {
          question: "На каком языке пишутся программы для Aleo?",
          options: [
            "Solidity",
            "Rust",
            "Leo",
            "Move"
          ],
          explanation: "Leo — специальный функциональный язык для создания приватных приложений на Aleo."
        },
        {
          question: "Что такое record в Leo?",
          options: [
            "Журнал транзакций",
            "Тип данных для приватного состояния",
            "Функция для записи в блокчейн",
            "Структура для логирования"
          ],
          explanation: "Record — это приватный тип данных, который хранит зашифрованное состояние приложения."
        },
        {
          question: "Где происходит выполнение программ на Aleo?",
          options: [
            "В браузере пользователя",
            "На валидаторах блокчейна",
            "Off-chain с генерацией доказательств",
            "В смарт-контрактах Ethereum"
          ],
          explanation: "Программы выполняются off-chain, а on-chain валидируются только ZK-доказательства."
        },
        {
          question: "Что делает Prover в ZK-системе?",
          options: [
            "Проверяет доказательства",
            "Генерирует доказательства на основе приватных данных",
            "Майнит блоки",
            "Хранит состояние блокчейна"
          ],
          explanation: "Prover создает ZK-доказательство, используя приватные входные данные."
        },
        {
          question: "Какая команда используется для деплоя программы?",
          options: [
            "leo run",
            "leo build",
            "leo deploy",
            "leo execute"
          ],
          explanation: "Команда 'leo deploy' используется для развертывания программы в сеть Aleo."
        },
        {
          question: "Что означает 'transition' в Leo?",
          options: [
            "Переход между состояниями",
            "Публичная функция программы",
            "Приватная переменная",
            "Импорт библиотеки"
          ],
          explanation: "Transition — это публичная функция, которая может изменять состояние программы."
        },
        {
          question: "В чем главное преимущество Aleo?",
          options: [
            "Высокая скорость транзакций",
            "Полная приватность вычислений и данных",
            "Низкие комиссии",
            "Совместимость с Ethereum"
          ],
          explanation: "Aleo обеспечивает полную приватность через ZK-доказательства, скрывая логику и данные."
        },
        {
          question: "Что такое circuit в контексте ZK?",
          options: [
            "Электронная схема",
            "Математическое представление вычисления",
            "Алгоритм консенсуса",
            "Протокол связи"
          ],
          explanation: "Circuit — это математическая схема, представляющая вычисление для ZK-доказательства."
        },
        {
          question: "Какой тип данных используется для целых чисел без знака в Leo?",
          options: [
            "int",
            "number",
            "u32, u64, u128",
            "integer"
          ],
          explanation: "Leo использует типы u8, u16, u32, u64, u128 для беззнаковых целых чисел."
        }
      ]
    }
  }
};

// Hook для использования переводов
export const useTranslations = (language) => {
  return translations[language] || translations.en;
};

