# Choir-Collective Directory Structure
## Output of $ tree -I 'venv|node_modules|target|archive' | pbcopy

.
├── AIResponse-old.tsx.old
├── ChoirChat-old.tsx.old
├── ChorusPanel-old.tsx.old
├── Dockerfile
├── LICENSE
├── README.md
├── anchor
│   ├── Anchor.toml
│   ├── Cargo.lock
│   ├── Cargo.toml
│   ├── migrations
│   │   └── deploy.ts
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── programs
│   │   └── basic
│   │       ├── Cargo.toml
│   │       ├── Xargo.toml
│   │       └── src
│   │           └── lib.rs
│   ├── src
│   │   ├── basic-exports.ts
│   │   ├── index.ts
│   │   └── types.ts
│   ├── test-ledger
│   │   ├── accounts
│   │   │   ├── run
│   │   │   └── snapshot
│   │   ├── admin.rpc
│   │   ├── faucet-keypair.json
│   │   ├── genesis.bin
│   │   ├── genesis.tar.bz2
│   │   ├── ledger.lock
│   │   ├── rocksdb
│   │   │   ├── 000056.sst
│   │   │   ├── 000057.sst
│   │   │   ├── 000058.sst
│   │   │   ├── 000059.sst
│   │   │   ├── 000060.sst
│   │   │   ├── 000061.sst
│   │   │   ├── 000062.log
│   │   │   ├── CURRENT
│   │   │   ├── IDENTITY
│   │   │   ├── LOCK
│   │   │   ├── LOG
│   │   │   ├── LOG.old.1730235246365507
│   │   │   ├── MANIFEST-000063
│   │   │   ├── OPTIONS-000069
│   │   │   └── OPTIONS-000071
│   │   ├── stake-account-keypair.json
│   │   ├── test-ledger-log.txt
│   │   ├── tower-1_9-6PvKseNJdTZ6VHz8ArDBiQLbEi3fbBf3T5J8PkMebmPz.bin
│   │   ├── validator-1730235246106.log
│   │   ├── validator-keypair.json
│   │   ├── validator.log -> validator-1730235246106.log
│   │   └── vote-account-keypair.json
│   ├── tests
│   │   └── basic.spec.ts
│   ├── trident-tests
│   │   └── fuzz_tests
│   │       └── fuzz_0
│   │           └── test_fuzz.rs
│   └── tsconfig.json
├── api
│   ├── Dockerfile
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-311.pyc
│   │   ├── chorus_cycle.cpython-313.pyc
│   │   ├── config.cpython-313.pyc
│   │   ├── conftest.cpython-311-pytest-8.3.3.pyc
│   │   ├── database.cpython-313.pyc
│   │   ├── main.cpython-311.pyc
│   │   ├── main.cpython-313.pyc
│   │   ├── models.cpython-313.pyc
│   │   ├── websocket.cpython-313.pyc
│   │   └── websocket_handler.cpython-313.pyc
│   ├── app
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   ├── __init__.cpython-311.pyc
│   │   │   ├── __init__.cpython-313.pyc
│   │   │   ├── chorus_cycle.cpython-311.pyc
│   │   │   ├── chorus_cycle.cpython-313.pyc
│   │   │   ├── config.cpython-311.pyc
│   │   │   ├── config.cpython-313.pyc
│   │   │   ├── database.cpython-311.pyc
│   │   │   ├── database.cpython-313.pyc
│   │   │   ├── models.cpython-311.pyc
│   │   │   ├── models.cpython-313.pyc
│   │   │   ├── utils.cpython-311.pyc
│   │   │   ├── utils.cpython-313.pyc
│   │   │   ├── websocket_handler.cpython-311.pyc
│   │   │   └── websocket_handler.cpython-313.pyc
│   │   ├── chorus_cycle.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── utils.py
│   │   └── websocket_handler.py
│   ├── main.py
│   ├── pyproject.toml
│   ├── requirements.txt
│   └── tests
│       ├── __pycache__
│       │   ├── test_main.cpython-311-pytest-8.3.3.pyc
│       │   ├── test_main.cpython-313-pytest-8.0.0.pyc
│       │   └── test_websocket.cpython-313-pytest-8.0.0.pyc
│       └── test_main.py
├── build
│   └── config.gypi
├── docker-compose.yml
├── docs
│   ├── Deploy_Render_Checklist.md
│   ├── Impl_Security.md
│   ├── Meta_Evolution.md
│   ├── Model_Foundation_Evolution.md
│   ├── Model_Metastability.md
│   ├── combined
│   ├── core_architecture.md
│   ├── core_chorus.md
│   ├── core_core.md
│   ├── core_economics.md
│   ├── core_knowledge.md
│   ├── core_patterns.md
│   ├── core_state.md
│   ├── core_state_transitions.md
│   ├── data_engine_model.md
│   ├── e_business.md
│   ├── e_concept.md
│   ├── e_questions.md
│   ├── e_reference.md
│   ├── goal_architecture.md
│   ├── goal_evolution.md
│   ├── goal_implementation.md
│   ├── harmonic_intelligence.md
│   ├── levels
│   │   ├── level-1.md
│   │   ├── level0.md
│   │   ├── level1.md
│   │   ├── level2.md
│   │   ├── level3.md
│   │   ├── level4.md
│   │   ├── level5.md
│   │   └── level_organization.md
│   ├── prompt_getting_started.md
│   ├── prompt_reentry.md
│   ├── prompt_summary_prompt.md
│   ├── prompt_wake_up.md
│   ├── reward_model.md
│   ├── scripts
│   │   ├── archive_web_stack.sh
│   │   ├── combiner.sh
│   │   ├── update_harmonic_vision.sh
│   │   └── update_tree.sh
│   ├── theory_choir_harmonics.md
│   ├── theory_dynamics.md
│   ├── theory_economics.md
│   ├── theory_foundation.md
│   ├── theory_harmonic_intelligence.md
│   ├── theory_oscillator_cooling.md
│   ├── theory_theory.md
│   └── tree.md
├── jest.config.js
├── jest.setup.js
├── next-env.d.ts
├── next.config.mjs
├── notebooks
│   └── qdrant.ipynb
├── old-api
│   └── api
│       ├── __init__.py
│       ├── chorus.py
│       ├── config.py
│       ├── database.py
│       ├── main.py
│       ├── models.py
│       ├── requirements.txt
│       └── utils.py
├── package.json
├── postcss.config.mjs
├── public
│   └── logo.png
├── src
│   ├── app
│   │   ├── __tests__
│   │   │   └── page.test.tsx
│   │   ├── account
│   │   │   ├── [address]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── api
│   │   │   ├── env-info
│   │   │   │   └── route.ts
│   │   │   └── hello
│   │   │       └── route.ts
│   │   ├── basic
│   │   │   └── page.tsx
│   │   ├── clusters
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── react-query-provider.tsx
│   ├── components
│   │   ├── AIResponse
│   │   │   └── AIResponse.tsx
│   │   ├── ChoirChat
│   │   │   ├── ChoirChat.tsx
│   │   │   └── MessageFlow.tsx
│   │   ├── ChorusPanel
│   │   │   └── ChorusPanel.tsx
│   │   ├── MessageFlow
│   │   ├── PriorCard
│   │   │   └── PriorCard.tsx
│   │   ├── PriorPanel
│   │   │   └── PriorPanel.tsx
│   │   ├── ThreadList
│   │   │   └── ThreadList.tsx
│   │   ├── UserInput
│   │   │   └── UserInput.tsx
│   │   ├── account
│   │   │   ├── account-data-access.tsx
│   │   │   ├── account-detail-feature.tsx
│   │   │   ├── account-list-feature.tsx
│   │   │   └── account-ui.tsx
│   │   ├── basic
│   │   │   ├── basic-data-access.tsx
│   │   │   ├── basic-feature.tsx
│   │   │   └── basic-ui.tsx
│   │   ├── cluster
│   │   │   ├── cluster-data-access.tsx
│   │   │   ├── cluster-feature.tsx
│   │   │   └── cluster-ui.tsx
│   │   ├── dashboard
│   │   │   └── dashboard-feature.tsx
│   │   ├── solana
│   │   │   └── solana-provider.tsx
│   │   └── ui
│   │       └── ui-layout.tsx
│   ├── config
│   │   └── index.ts
│   ├── contexts
│   │   └── WalletContextProvider.tsx
│   ├── hooks
│   │   ├── useChorusCycle.ts
│   │   ├── useSolana.ts
│   │   ├── useThread.ts
│   │   └── useWebSocket.ts
│   ├── mocks
│   │   └── mockWebSocket.ts
│   ├── pages
│   │   └── _app.tsx
│   ├── test-utils.tsx
│   └── types
│       ├── index.ts
│       └── jest.d.ts
├── tailwind.config.ts
└── tsconfig.json

62 directories, 199 files
