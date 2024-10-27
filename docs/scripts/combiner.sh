#!/bin/bash

# Documentation Combiner Script
# ===========================
#
# This script combines Markdown documentation files in the docs/ directory in two ways:
#
# 1. By Prefix: Combines files sharing common prefixes (e.g., Core_, Theory_) into
#    Combined_{prefix}.md files in docs/combined/
#
# 2. By Abstraction Level: Creates level{0-5}.md files representing different levels
#    of abstraction, from most concrete (0) to most abstract (5):
#
#    - Level 0: Implementation details (code, deployment, technical specs)
#    - Level 1: Getting started guides and development documentation
#    - Level 2: Core system implementation and state management
#    - Level 3: Economic and game theoretical foundations
#    - Level 4: Meta-level system concepts and models
#    - Level 5: Abstract theoretical foundations and quantum semantics
#
# Special handling is implemented for level0.md to ensure critical system files
# (tree.md, combiner.sh, update_tree.sh) appear first.
#
# Usage:
#   ./combiner.sh
#
# Output:
#   - docs/combined/Combined_{prefix}.md files
#   - docs/combined/level{0-5}.md files
#
# Note: This script expects to be run from the project root directory
# and requires the docs/ directory structure to be present.
#
# @abstraction_level: 0 - Implementation/Scripts

# Function to add separator and header
add_separator() {
    echo -e "\n"
    echo "=="
    echo "$1"
    echo "=="
    echo -e "\n"
}

# First phase: Combine by prefix
prefixes=$(ls docs/*_*.md | grep -v 'tree' | cut -d'_' -f1 | sed 's/docs\///g' | sort -u)

for prefix in $prefixes; do
    # Create title from prefix
    title="${prefix} Documentation"
    case $prefix in
        "Core") subtitle="- Fundamental Concepts" ;;
        "Dev") subtitle="- Building Choir" ;;
        "Entry") subtitle="- Getting Started" ;;
        "Impl") subtitle="- Technical Details" ;;
        "Level") subtitle="- Understanding Progression" ;;
        "Meta") subtitle="- Documentation About Documentation" ;;
        "Model") subtitle="- System Patterns" ;;
        "Theory") subtitle="- Mathematical Foundations" ;;
        "Crystallization") subtitle="- Development Milestones" ;;
        "Data") subtitle="- Data Management" ;;
        "Deploy") subtitle="- Deployment Guidelines" ;;
        "Error") subtitle="- Error Handling" ;;
        "Frontend") subtitle="- UI Components" ;;
        "Backend") subtitle="- Server Implementation" ;;
        "Solana") subtitle="- Blockchain Integration" ;;
        "Reward") subtitle="- Incentive Systems" ;;
        "State") subtitle="- State Management" ;;
        "Tech") subtitle="- Technical Architecture" ;;
        "Plan") subtitle="- Project Planning" ;;
        "Harmonic") subtitle="- System Harmony" ;;
        *) subtitle="" ;;
    esac

    # Create combined file with correct path
    {
        echo "# ${title} ${subtitle}"
        echo -e "\n"

        # Concatenate all files with this prefix, excluding tree
        for file in docs/${prefix}_*.md; do
            if [ -f "$file" ] && ! grep -q "tree" <<< "$file"; then
                add_separator "$(basename "$file" .md)"
                cat "$file"
            fi
        done
    } > "docs/combined/Combined_${prefix}.md"

    echo "Created Combined_${prefix}.md"
done

# Update file finding patterns to look directly in docs/
all_docs=$(find docs -maxdepth 1 -name "*.md" ! -name "tree.md")

# Base patterns that define the core structure of each level
base_patterns=(
    "Level_0_ tree.md scripts/ Solana_ Frontend_ Backend_ Deploy_ Implementation_ Data_ Error_ Reward_"
    "Level_1_ Entry_ Dev_ Plan_ Tech_ Crystallization_ Thread Porting_"
    "Level_2_ Core_State Core_Types Core_Blueprint Impl_ State_"
    "Level_3_ Core_Economics Theory_Game Theory_Implementation V10_ V12_"
    "Level_4_ Core_Convergence Theory_Stake Model_ Meta_Overview Emergence_ Prompt_"
    "Level_5_ Theory_Quantum Theory_Semantic Harmonic_ Meta_ Theory_"
)

# Additional patterns for each level that follow the concrete->abstract progression
core_patterns=(
    ""  # Level 0 has no Core_ docs
    ""  # Level 1 has no Core_ docs
    "Core_Proof Core_Comprehensive Core_Context Core_Consistency Core_Invariants Core_Ownership Core_Persuasion Core_ProofOfText Core_StateTransitions Core_Whitepaper"
    "Core_Economics Core_Moat"
    "Core_Convergence"
    ""  # Level 5 has no Core_ docs
)

theory_patterns=(
    ""  # Level 0 has no Theory_ docs
    ""  # Level 1 has no Theory_ docs
    ""  # Level 2 has no Theory_ docs
    "Theory_Game Theory_Implementation Theory_Integration Theory_StakeEntanglement Theory_StateAlgebra Theory_Topology"
    "Theory_Stake"
    "Theory_Quantum Theory_Semantic Theory_Algebra Theory_ApprovalMeasurement Theory_ChorusQuantum Theory_SemanticGameTopology Theory_SemanticsExplained Theory_StateAlgebraExplained Theory_TopologyExplained"
)

meta_patterns=(
    ""  # Level 0 has no Meta_ docs
    ""  # Level 1 has no Meta_ docs
    ""  # Level 2 has no Meta_ docs
    ""  # Level 3 has no Meta_ docs
    "Meta_Overview Meta_Index Meta_Navigation Meta_Network Meta_Progression"
    "Meta_Bridges Meta_Density Meta_Diagrams Meta_Emergence Meta_Evolution Meta_Experience Meta_Layers"
)

# Function to combine patterns for a level
get_level_patterns() {
    level=$1
    echo "${base_patterns[$level]} ${core_patterns[$level]} ${theory_patterns[$level]} ${meta_patterns[$level]}"
}

# Function to process files for a level
process_level() {
    level=$1
    patterns=$2

    # Handle negative level number in filename
    if [ "$level" -eq -1 ]; then
        output_file="docs/levels/level-1.md"
    else
        output_file="docs/levels/level${level}.md"
    fi

    echo "# Level ${level} Documentation" > "$output_file"
    echo -e "\n" >> "$output_file"

    # Special handling for level -1 (system files)
    if [ "$level" -eq -1 ]; then
        for special_file in "docs/tree.md" "docs/scripts/combiner.sh" "docs/scripts/update_tree.sh"; do
            if [ -f "$special_file" ]; then
                add_separator "$(basename "$special_file")" >> "$output_file"
                cat "$special_file" >> "$output_file"
            fi
        done
        echo "Created level-1.md"
        return
    fi

    # Process patterns
    for pattern in $patterns; do
        for file in docs/*${pattern}*.md; do
            if [ -f "$file" ]; then
                add_separator "$(basename "$file" .md)" >> "$output_file"
                cat "$file" >> "$output_file"
                echo "$file" >> "/tmp/processed_files.txt"
            fi
        done
    done

    echo "Created level${level}.md"
}

# Clear processed files tracking
> "/tmp/processed_files.txt"

# Process level -1 first for system files
process_level -1 ""

# Process levels 0-5
for level in {0..5}; do
    process_level $level "$(get_level_patterns $level)"
done

# Verify all files were processed
echo -e "\nVerifying document coverage:"
uncategorized=0
for doc in $all_docs; do
    if ! grep -q "^$doc$" "/tmp/processed_files.txt"; then
        echo "Warning: $doc was not categorized into any level"
        uncategorized=$((uncategorized + 1))
    fi
done

if [ "$uncategorized" -gt 0 ]; then
    echo "Warning: $uncategorized files were not categorized into any level"
    echo "Please update level patterns to include these files"
fi

# Cleanup
rm -f "/tmp/processed_files.txt"

echo "Documentation combination complete"
