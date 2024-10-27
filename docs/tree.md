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
│   ├── programs
│   │   └── basic
│   │       ├── Cargo.toml
│   │       ├── Xargo.toml
│   │       └── src
│   │           └── lib.rs
│   ├── src
│   │   ├── basic-exports.ts
│   │   └── index.ts
│   ├── tests
│   │   └── basic.spec.ts
│   └── tsconfig.json
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
│   ├── Frontend_ChorusPanel.md
│   ├── Frontend_UserInput.md
│   ├── Harmonic_Theory.md
│   ├── Impl_API.md
│   ├── Impl_ChorusLoop.md
│   ├── Impl_Messages.md
│   ├── Impl_Privacy.md
│   ├── Impl_Security.md
│   ├── Impl_WebSocket.md
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
│   ├── Meta_IronicOperations.md
│   ├── Meta_OrganizationalIrony.md
│   ├── Meta_Overview.md
│   ├── Meta_Progression.md
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
│   │   ├── Combined_Backend.md
│   │   ├── Combined_Core.md
│   │   ├── Combined_Data.md
│   │   ├── Combined_Deploy.md
│   │   ├── Combined_Dev.md
│   │   ├── Combined_Emergence.md
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
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   └── logo.png
├── src
│   ├── app
│   │   ├── account
│   │   │   ├── [address]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── api
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
│   └── components
│       ├── account
│       │   ├── account-data-access.tsx
│       │   ├── account-detail-feature.tsx
│       │   ├── account-list-feature.tsx
│       │   └── account-ui.tsx
│       ├── basic
│       │   ├── basic-data-access.tsx
│       │   ├── basic-feature.tsx
│       │   └── basic-ui.tsx
│       ├── cluster
│       │   ├── cluster-data-access.tsx
│       │   ├── cluster-feature.tsx
│       │   └── cluster-ui.tsx
│       ├── dashboard
│       │   └── dashboard-feature.tsx
│       ├── solana
│       │   └── solana-provider.tsx
│       └── ui
│           └── ui-layout.tsx
├── tailwind.config.ts
└── tsconfig.json

28 directories, 173 files
