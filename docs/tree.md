# Choir-Collective Directory Structure
## Output of $ tree -I 'venv|node_modules|target' | pbcopy

.
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
│   │   │   ├── LOG.old.1730162495021090
│   │   │   ├── MANIFEST-000063
│   │   │   ├── OPTIONS-000069
│   │   │   └── OPTIONS-000071
│   │   ├── stake-account-keypair.json
│   │   ├── test-ledger-log.txt
│   │   ├── tower-1_9-AB359YHNRzjuDEVLAud86c8Dy86kyH3p67JBBXTQMm75.bin
│   │   ├── validator-1730162494770.log
│   │   ├── validator-keypair.json
│   │   ├── validator.log -> validator-1730162494770.log
│   │   └── vote-account-keypair.json
│   ├── tests
│   │   └── basic.spec.ts
│   └── tsconfig.json
├── api
│   ├── Dockerfile
│   ├── __pycache__
│   │   ├── conftest.cpython-311-pytest-8.3.3.pyc
│   │   ├── main.cpython-311.pyc
│   │   └── main.cpython-313.pyc
│   ├── main.py
│   ├── pyproject.toml
│   ├── requirements.txt
│   └── tests
│       ├── __pycache__
│       │   └── test_main.cpython-311-pytest-8.3.3.pyc
│       └── test_main.py
├── build
│   └── config.gypi
├── docker-compose.yml
├── docs
│   ├── Backend_Chorus.md
│   ├── Backend_Database.md
│   ├── Backend_Main.md
│   ├── Backend_Models.md
│   ├── Core_Blueprint.md
│   ├── Core_Comprehensive.md
│   ├── Core_Consistency.md
│   ├── Core_Context.md
│   ├── Core_Economics.md
│   ├── Core_Invariants.md
│   ├── Core_Ownership.md
│   ├── Core_Priors.md
│   ├── Core_ProofOfText.md
│   ├── Core_StateTransitions.md
│   ├── Core_Types.md
│   ├── Core_Whitepaper.md
│   ├── Data_Engine_Vision.md
│   ├── Deploy_Render_Checklist.md
│   ├── Deploy_Report.md
│   ├── Dev_Plan.md
│   ├── Dev_Pseudocode.md
│   ├── Entry_Business.md
│   ├── Entry_Glossary.md
│   ├── Entry_InverseEquity.md
│   ├── Entry_OrganizationalPatterns.md
│   ├── Entry_Overview.md
│   ├── Entry_Q&A.md
│   ├── Error_Correction_Layers.md
│   ├── Frontend_AIResponse.md
│   ├── Frontend_ChoirChat.md
│   ├── Frontend_ChoirChat_UI.md
│   ├── Frontend_ChoirChat_update.md
│   ├── Frontend_ChorusPanel.md
│   ├── Frontend_UserInput.md
│   ├── Harmonic_Theory.md
│   ├── Impl_API.md
│   ├── Impl_ChorusLoop.md
│   ├── Impl_ChorusLoop_update.md
│   ├── Impl_Messages.md
│   ├── Impl_Messages_update.md
│   ├── Impl_Privacy.md
│   ├── Impl_Security.md
│   ├── Impl_WebSocket.md
│   ├── Impl_WebSocket_update.md
│   ├── Implementation_Dependencies.md
│   ├── Level_0_SystemOverview.md
│   ├── Level_1_BasicMechanics.md
│   ├── Level_2_CoreMechanics.md
│   ├── Level_3_ValueCreation.md
│   ├── Level_4_MetastableEmergence.md
│   ├── Level_5_QuantumSemantics.md
│   ├── Meta_Bureaucracy.md
│   ├── Meta_Chorus.md
│   ├── Meta_Diagrams.md
│   ├── Meta_DocumentationDrivenDevelopment.md
│   ├── Meta_Emergence.md
│   ├── Meta_EmergentAIDocumentation.md
│   ├── Meta_Evolution.md
│   ├── Meta_Experience.md
│   ├── Meta_Index.md
│   ├── Meta_InvestmentObservation.md
│   ├── Meta_IronicOperations.md
│   ├── Meta_OrganizationalIrony.md
│   ├── Meta_Overview.md
│   ├── Meta_Progression.md
│   ├── Meta_ValueEvolution.md
│   ├── Model_Emergency.md
│   ├── Model_Metastability.md
│   ├── Model_Recursion.md
│   ├── Plan_Checklist.md
│   ├── Plan_Hyperconverge.md
│   ├── Porting_Checklist.md
│   ├── Prompt_StructuredSummary.md
│   ├── Reward_Explained.md
│   ├── Reward_Service.md
│   ├── Reward_Summary.md
│   ├── Solana_lib.md
│   ├── Solana_message.md
│   ├── Solana_new_message_reward.md
│   ├── Solana_new_message_reward_fuzzer.md
│   ├── Solana_new_message_reward_test.md
│   ├── Solana_prior_reward.md
│   ├── Solana_prior_reward_fuzzer.md
│   ├── Solana_prior_reward_test.md
│   ├── Solana_settlement.md
│   ├── Solana_thread.md
│   ├── Solana_thread_fuzzer.md
│   ├── Solana_thread_test.md
│   ├── Solana_validation.md
│   ├── State_Boundaries.md
│   ├── Tech_Arts_Intersection.md
│   ├── Theory_ChorusQuantum.md
│   ├── Theory_HarmonicBondingCurve.md
│   ├── Theory_HarmonicMetastability.md
│   ├── Theory_HarmonicOscillator.md
│   ├── Theory_SemanticsExplained.md
│   ├── Theory_ThreadDynamics.md
│   ├── V10_Loop_Theory.md
│   ├── V10_Prompt_Engineering.md
│   ├── V12_Data_Engines.md
│   ├── combined
│   ├── levels
│   ├── scripts
│   │   ├── combiner.sh
│   │   └── update_tree.sh
│   └── tree.md
├── jest.config.js
├── jest.setup.js
├── next-env.d.ts
├── next.config.mjs
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
├── pnpm-lock.yaml
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
│   ├── test-utils.tsx
│   └── types
│       └── jest.d.ts
├── tailwind.config.ts
├── test-ledger
│   ├── accounts
│   │   ├── run
│   │   └── snapshot
│   ├── admin.rpc
│   ├── faucet-keypair 2.json
│   ├── faucet-keypair.json
│   ├── genesis.bin
│   ├── genesis.bin 2.failed
│   ├── genesis.bin.failed
│   ├── genesis.tar.bz2
│   ├── genesis.tar.bz2 2.failed
│   ├── genesis.tar.bz2.failed
│   ├── ledger 2.lock
│   ├── ledger.lock
│   ├── rocksdb
│   │   ├── 000056.sst
│   │   ├── 000057.sst
│   │   ├── 000058.sst
│   │   ├── 000059.sst
│   │   ├── 000060.sst
│   │   ├── 000061.sst
│   │   ├── 000062.log
│   │   ├── CURRENT
│   │   ├── IDENTITY
│   │   ├── LOCK
│   │   ├── LOG
│   │   ├── LOG.old.1730134659519617
│   │   ├── MANIFEST-000063
│   │   ├── OPTIONS-000069
│   │   └── OPTIONS-000071
│   ├── rocksdb 2
│   ├── rocksdb 2.failed
│   ├── rocksdb.failed
│   │   ├── 000004.log
│   │   ├── CURRENT
│   │   ├── IDENTITY
│   │   ├── LOCK
│   │   ├── LOG
│   │   ├── MANIFEST-000005
│   │   ├── OPTIONS-000053
│   │   └── OPTIONS-000055
│   ├── stake-account-keypair.json
│   ├── tower-1_9-5d2jEey55Dp3uzLKQgBemdpAjnfHnq96S8V6Ncr55tF4.bin
│   ├── validator 2.log -> validator-1730134419000.log
│   ├── validator-1730134472827.log
│   ├── validator-1730134658729.log
│   ├── validator-keypair.json
│   ├── validator.log -> validator-1730134658729.log
│   └── vote-account-keypair.json
└── tsconfig.json

52 directories, 246 files
