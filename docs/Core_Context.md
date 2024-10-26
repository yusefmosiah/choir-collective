# Choir Project Context

VERSION context_system:
  invariants: {
    "Collaborative ownership model",
    "Token-driven quality control",
    "Dual-state architecture"
  }
  assumptions: {
    "Chat-based interaction model",
    "Token incentive structure",
    "State distribution patterns"
  }
  implementation: "0.1.0"

## Overview

ASSUMPTION platform_model:
  "Chat-based collaborative platform"
  "May expand to other interaction models"
  "Must maintain quality-first approach"

**Choir** is an innovative socioeconomic media network that leverages blockchain technology to redefine collaborative communication and content curation. The platform operates as **choir.chat**, where users engage in collaborative discussions, and co-authors collectively manage the approval of messages.

## Current State

### Core Components

ASSUMPTION component_architecture:
  "Clean separation of concerns"
  "May introduce additional components"
  "Must maintain clear boundaries"

1. **State Distribution**
   - Solana: Ownership, approvals, token balances
   - Qdrant: Message content, embeddings, search
   - Backend: WebSocket state, session management
   - Frontend: UI state, optimistic updates

2. **Chat-Based Interface**
   - Users write chat messages/responses within threads
   - Co-authors collectively decide to approve or deny messages
   - Non-co-authors can submit speculative responses ("specs")
   - Approved specs result in co-authorship

3. **Thread Accessibility**
   - All threads accessible at `choir.chat/<thread_id>`
   - Co-authors: Full read-write access
   - Other users: AI-generated summaries
   - Citations include links to original threads

4. **Token Mechanics**
   - CHOIR tokens for staking and rewards
   - Thread PDAs store token balances
   - Approved messages: tokens to thread
   - Denied messages: tokens to deniers

5. **AI-Generated Summaries**
   - Designed to create interest and stimulate engagement
   - Compress content to tease the full discussion
   - Will improve over time but are not intended as strict privacy measures

### Database and Configuration

- Qdrant vector database integration for storing and retrieving chat messages
- Users own chat threads containing messages, all stored on Qdrant
- Configuration management using environment variables and Pydantic
- Utility functions for embeddings and chat completions using Azure OpenAI

### Tokenomics

- CHOIR token defined with a total supply of 10 billion
- Token mechanics integrated into message approval and thread economics
- Co-authorship dynamics:
  - Authors of approved messages become co-authors of the thread.
  - Co-authors share in the thread's token balance and have approval rights.
  - Co-authors can divest their token share at any time, taking a (1 / n - 1) share of the thread's tokens.

### AI Model Development
- Target date for the first AI model release: April 2025
- Plan to use Reinforcement Learning with the token-scored dataset
- Focus on enhancing qualitative aspects such as stylistic nuance and artistic expression

## Development Status

ASSUMPTION development_priorities:
  "Core functionality first"
  "May add advanced features later"
  "Must maintain system stability"

1. **Core Infrastructure**
   - **Solana Integration**: Basic wallet connectivity functional
   - **Qdrant Integration**: Message storage and retrieval implemented
   - **WebSocket Layer**: Real-time updates operational
   - **State Management**: Dual-state architecture established

2. **User Interface**
   - **Chat Interface**: Thread-based messaging implemented
   - **Ownership Display**: Co-authorship indicators added
   - **Token Integration**: Basic balance and stake displays
   - **Responsive Design**: Mobile-first approach implemented

3. **AI Components**
   - **Chorus Loop**: Enhanced with source citations
   - **Embeddings**: Vector storage operational
   - **Summaries**: Basic AI summary generation working
   - **Privacy Controls**: Content visibility rules implemented

4. **Token Mechanics**
   - **Staking**: Spec submission staking implemented
   - **Distribution**: Approval-based token flow working
   - **Thread Balances**: PDA-based token storage setup
   - **Treasury**: Basic treasury operations functional

## Next Steps

ASSUMPTION implementation_sequence:
  "Prioritize security and stability"
  "May adjust based on user feedback"
  "Must maintain backward compatibility"

1. **Security Hardening**
   - Comprehensive security audit
   - Penetration testing
   - Error recovery procedures
   - State consistency verification

2. **Token System Completion**
   - Finalize divestment mechanics
   - Implement treasury management
   - Add token analytics
   - Optimize gas costs

3. **User Experience Enhancement**
   - Improve onboarding flow
   - Add progressive disclosure
   - Enhance error messaging
   - Optimize performance

4. **AI System Refinement**
   - Improve summary quality
   - Optimize embedding generation
   - Enhance privacy controls
   - Add content analytics

## Testing Strategy

- **Unit and Integration Tests**:
  - Python backend components
  - TypeScript frontend components
- **Solana Program Testing**:
  - Utilize Ackee Trident for fuzz testing of Solana smart contracts
- **End-to-End Testing**:
  - Simulate user interactions with message approvals and token transactions
  - Validate AI summarization and citation features

## Corporate Structure and Fundraising Plans

- **Dual Structure**: Choir operates both as a corporate entity with stock and a decentralized community with the CHOIR token
- **Fundraising Initiative**:
  - **Target Date**: December
  - **Purpose**:
    - Hire talent across various domains
    - Invest in AI model training and platform infrastructure
  - **Strategic Goals**:
    - Corporate ownership of CHOIR tokens
    - Choir Treasury to eventually hold tokenized corporate stock

## Conclusion

By transitioning to a chat-based platform with collaborative message approvals and integrated tokenomics, Choir enhances user engagement and maintains its goal of fostering high-quality content creation. This shift aligns with the original vision while adapting to a more interactive and accessible format. Continued development will focus on refining these mechanics, ensuring scalability, and preparing for the AI model release in April 2025.
