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
│   ├── __pycache__
│   │   ├── conftest.cpython-311-pytest-8.3.3.pyc
│   │   ├── main.cpython-311.pyc
│   │   ├── main.cpython-313.pyc
│   │   └── websocket.cpython-313.pyc
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
│   ├── Impl_ChorusCycle.md
│   ├── Impl_ChorusCycle_update.md
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
│   ├── Plan_FrontendArchitecture.md
│   ├── Plan_FrontendChecklist.md
│   ├── Plan_Hyperconverge.md
│   ├── Plan_Restructure.md
│   ├── Porting_Checklist.md
│   ├── Prompt_StructuredSummary.md
│   ├── Report_2024-10-28.md
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
│   ├── Theory_Chorus_Cycle.md
│   ├── Theory_HarmonicBondingCurve.md
│   ├── Theory_HarmonicMetastability.md
│   ├── Theory_HarmonicOscillator.md
│   ├── Theory_SemanticsExplained.md
│   ├── Theory_ThreadDynamics.md
│   ├── V10_Prompt_Engineering.md
│   ├── V12_Data_Engines.md
│   ├── combined
│   │   ├── Combined_Backend.md
│   │   ├── Combined_Core.md
│   │   ├── Combined_Data.md
│   │   ├── Combined_Deploy.md
│   │   ├── Combined_Dev.md
│   │   ├── Combined_Entry.md
│   │   ├── Combined_Error.md
│   │   ├── Combined_Frontend.md
│   │   ├── Combined_Harmonic.md
│   │   ├── Combined_Impl.md
│   │   ├── Combined_Implementation.md
│   │   ├── Combined_Level.md
│   │   ├── Combined_Meta.md
│   │   ├── Combined_Model.md
│   │   ├── Combined_Plan.md
│   │   ├── Combined_Porting.md
│   │   ├── Combined_Prompt.md
│   │   ├── Combined_Report.md
│   │   ├── Combined_Reward.md
│   │   ├── Combined_Solana.md
│   │   ├── Combined_State.md
│   │   ├── Combined_Tech.md
│   │   ├── Combined_Theory.md
│   │   ├── Combined_V10.md
│   │   └── Combined_V12.md
│   ├── levels
│   │   ├── level-1.md
│   │   ├── level0.md
│   │   ├── level1.md
│   │   ├── level2.md
│   │   ├── level3.md
│   │   ├── level4.md
│   │   └── level5.md
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
└── tsconfig.json

47 directories, 244 files
