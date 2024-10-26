# Choir Technical Glossary

## Core Concepts

### Thread
A collaborative chat context owned by its co-authors, with associated token balance and message history.

### Co-author
A participant with ownership rights in a thread, gained through message approval or thread creation.

### Spec (Speculative Response)
A message submission from a non-co-author, requiring stake and approval.

## Technical Terms

### PDA (Program Derived Address)
Deterministic Solana account address derived from program and thread data.

### State Transition
A validated change in system state, such as message approval or co-author addition.

### Content Hash
Cryptographic hash of message content, stored on Solana for verification.

## Economic Terms

### CHOIR Token
Platform token used for staking, rewards, and governance.

### Stake
Tokens locked when submitting a spec message.

### Thread Balance
Accumulated tokens from approved messages and specs.

## Protocol Terms

### WebSocket Event
Real-time message for state updates and notifications.

### State Sync
Process of ensuring consistency between Solana and Qdrant states.

### Optimistic Update
UI update before blockchain confirmation.

## Security Terms

### Thread PDA
Program-derived address that owns thread tokens.

### Privacy Level
Content visibility classification (Public, ThreadOnly, Premium).

### Front-running Protection
Mechanisms to prevent transaction ordering exploitation.

## System Components

### Solana Program
On-chain code managing thread ownership and tokens.

### Qdrant
Vector database storing message content and embeddings.

### Chorus Loop
AI decision-making model for message processing.

## State Management

### State Location
Where different types of state are stored (Solana, Qdrant, Backend, Frontend).

### State Consistency
Property of all systems having aligned state representations.

### Recovery Procedure
Process for handling state inconsistencies or errors.
