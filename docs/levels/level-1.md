# Level -1 Documentation



=== File: docs/tree.md ===



==
tree.md
==


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
│   ├── Impl_Security.md
│   ├── Model_Metastability.md
│   ├── Prompt_DocumentationTransform.md
│   ├── Prompt_Reentry.md
│   ├── Prompt_StructuredSummary.md
│   ├── combined
│   ├── core_architecture.md
│   ├── core_chorus.md
│   ├── core_core.md
│   ├── core_economics.md
│   ├── core_knowledge.md
│   ├── core_patterns.md
│   ├── core_state.md
│   ├── data_engine_model.md
│   ├── e_business.md
│   ├── e_concept.md
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
│   ├── reward_model.md
│   ├── scripts
│   │   ├── archive_web_stack.sh
│   │   ├── combiner.sh
│   │   ├── update_harmonic_vision.sh
│   │   └── update_tree.sh
│   ├── theory_dynamics.md
│   ├── theory_economics.md
│   ├── theory_foundation.md
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

62 directories, 190 files

=== File: docs/scripts/combiner.sh ===



==
combiner.sh
==


#!/bin/bash

# Define level prefixes as simple arrays
level0_prefixes=("Solana" "Frontend" "Backend" "Deploy" "Implementation" "data" "Error" "reward" "Impl")
level1_prefixes=("e" "Entry" "Dev" "Plan" "Tech" "Level" "Current" "Prompt")
level2_prefixes=("core" "State" "Summary" "Pivot" "goal")
level3_prefixes=("theory" "V10" "V12")
level4_prefixes=("Model" "Emergence" "Meta")
level5_prefixes=("harmonic")

# Function to add separator and header
add_separator() {
    echo -e "\n"
    echo "=="
    echo "$1"
    echo "=="
    echo -e "\n"
}

# Function to get level for a file
get_level_for_file() {
    filename=$(basename "$1")
    prefix=$(echo "$filename" | cut -d'_' -f1)

    for p in "${level0_prefixes[@]}"; do [[ "$prefix" == "$p" ]] && echo 0 && return; done
    for p in "${level1_prefixes[@]}"; do [[ "$prefix" == "$p" ]] && echo 1 && return; done
    for p in "${level2_prefixes[@]}"; do [[ "$prefix" == "$p" ]] && echo 2 && return; done
    for p in "${level3_prefixes[@]}"; do [[ "$prefix" == "$p" ]] && echo 3 && return; done
    for p in "${level4_prefixes[@]}"; do [[ "$prefix" == "$p" ]] && echo 4 && return; done
    for p in "${level5_prefixes[@]}"; do [[ "$prefix" == "$p" ]] && echo 5 && return; done

    echo -1
}

# Function to process files for a level
process_level() {
    level=$1
    output_file="docs/levels/level${level}.md"

    echo "# Level ${level} Documentation" > "$output_file"
    echo -e "\n" >> "$output_file"

    # Special handling for level -1 (system files)
    if [ "$level" -eq -1 ]; then
        for special_file in "docs/tree.md" "docs/scripts/combiner.sh" "docs/scripts/update_tree.sh"; do
            if [ -f "$special_file" ]; then
                echo -e "\n=== File: $special_file ===\n" >> "$output_file"
                add_separator "$(basename "$special_file")" >> "$output_file"
                cat "$special_file" >> "$output_file"
                echo "$special_file" >> "/tmp/processed_files.txt"
            fi
        done
        return
    fi

    # Process all docs to find ones for this level
    for file in docs/*.md; do
        if [ -f "$file" ] && [ "$(get_level_for_file "$file")" -eq "$level" ]; then
            echo -e "\n=== File: $file ===\n" >> "$output_file"
            add_separator "$(basename "$file" .md)" >> "$output_file"
            cat "$file" >> "$output_file"
            echo "$file" >> "/tmp/processed_files.txt"
        fi
    done
}

# Create temporary file for tracking
touch /tmp/processed_files.txt

# Process all levels
echo "Processing documentation..."
process_level -1
for level in {0..5}; do
    process_level $level
done

# Check for uncategorized files
echo -e "\nUncategorized files:"
uncategorized=0
for doc in docs/*.md; do
    if ! grep -q "^$doc$" "/tmp/processed_files.txt"; then
        echo "$doc"
        uncategorized=$((uncategorized + 1))
    fi
done

if [ "$uncategorized" -gt 0 ]; then
    echo -e "\nTotal uncategorized: $uncategorized files"
fi

# Cleanup
rm -f "/tmp/processed_files.txt"

echo "Documentation combination complete"

=== File: docs/scripts/update_tree.sh ===



==
update_tree.sh
==


#!/bin/bash

# Get the tree output, excluding venv and node_modules
tree_output=$(tree -I 'venv|node_modules|target|archive')

# Create a temporary file with the new content
cat > docs/tree.md.tmp << EOL
# Choir-Collective Directory Structure
## Output of $ tree -I 'venv|node_modules|target|archive' | pbcopy

$tree_output
EOL

# Replace the old file with the new one
mv docs/tree.md.tmp docs/tree.md
