# Choir Ownership Model

VERSION ownership_system:
  invariants: {
    "Thread must have at least one co-author",
    "Co-author rights are non-transferable",
    "Thread token balance integrity"
  }
  assumptions: {
    "Co-authorship approval model",
    "Divestment mechanics",
    "Thread token distribution"
  }
  implementation: "0.1.0"

## Core Ownership Concepts

ASSUMPTION co_authorship:
  "Unanimous approval for new co-authors"
  "May introduce weighted voting in future"
  "Must maintain quality control"

ASSUMPTION divestment:
  "Equal share distribution on divestment"
  "May introduce vesting periods"
  "Must preserve token conservation"

## Thread Ownership

1. **Ownership Properties**
   - Messages owned by creators
   - Threads owned by co-authors collectively
   - Token balances owned by thread PDA

2. **Co-authorship Rules**
   - Initial thread creator is first co-author
   - New co-authors added through spec approval
   - Co-authors can divest their share

## Token Integration

ASSUMPTION token_mechanics:
  "Simple token distribution model"
  "May introduce complex reward structures"
  "Must maintain economic incentives"

1. **Token Flow**
   - Approved messages add to thread balance
   - Denied specs distribute to deniers
   - Mixed decisions return to treasury

2. **Divestment Process**
   - Co-authors can divest at any time
   - Receive (1 / n-1) share of balance
   - Remaining co-authors maintain thread

## Access Control

ASSUMPTION access_model:
  "Binary co-author/non-co-author distinction"
  "May introduce graduated access levels"
  "Must maintain clear ownership boundaries"

1. **Co-author Rights**
   - Full read-write access
   - Approval/denial rights
   - Divestment rights

2. **Non-co-author Access**
   - Read public content
   - Submit specs with stake
   - View AI summaries

## State Management

ASSUMPTION state_handling:
  "Solana as ownership source of truth"
  "May introduce caching layers"
  "Must maintain state consistency"

1. **Ownership State**
   - Stored on Solana
   - Thread PDA contains co-authors
   - Token balances in PDAs

2. **Content State**
   - Content in Qdrant
   - Hashes on Solana
   - Metadata distributed

## Implementation Notes

NOTE future_extensions:
  "Current model focuses on basic ownership"
  "May add governance features"
  "Must maintain ownership clarity"

NOTE scalability:
  "Current design optimized for clarity"
  "May optimize for high transaction volume"
  "Must preserve ownership guarantees"
