# Choir Tokenomics Whitepaper

## Abstract

Choir introduces an innovative socioeconomic media network that leverages blockchain technology to redefine collaborative communication and content curation. Central to Choir's ecosystem is the **Choir Token (CHOIR)**, a cryptocurrency meticulously designed to incentivize meaningful contributions, foster high-quality interactions, and promote collaborative decision-making within chat threads. This whitepaper delineates the comprehensive tokenomics of Choir, elucidating the mechanisms of token staking, message approval, and economic incentives that underpin user engagement and platform sustainability.

## Introduction

The digital communication landscape often faces challenges related to content quality, spam, and lack of meaningful collaboration. Traditional platforms struggle with moderation and incentive alignment, leading to environments where high-quality discourse is undervalued.

**Choir** addresses these challenges by creating a decentralized chat-based platform where users engage in collaborative discussions, and co-authors collectively manage content through an approval mechanism. By integrating blockchain technology and a thoughtfully designed token economy, Choir incentivizes users to contribute valuable messages, engage responsibly, and invest in the platform's growth.

## Token Overview

- **Token Name**: Choir Token
- **Token Symbol**: CHOIR
- **Total Supply**: 10,000,000,000 (10 billion) tokens (Hard Cap)
- **Token Standard**: Solana Program Library (SPL) Token
- **Initial Allocation**: All 10 billion tokens minted to the Choir Treasury at genesis

## Key Entities in the Choir Ecosystem

### 1. Choir Treasury

- **Description**: The central repository holding the entire initial supply of CHOIR tokens.
- **Functionality**:
  - Distributes tokens as rewards and handles token recapture from split decisions.
  - Maintains the economic balance of the platform by controlling token flow.

### 2. Users

- **Description**: Participants who contribute messages to chat threads and engage in the collaborative ecosystem.
- **Functionality**:
  - Stake tokens to contribute messages to threads where they are not co-authors.
  - Become co-authors upon approval of their messages, gaining rights and token shares.
  - Submit speculative responses ("specs") to threads they're not co-authors of.

### 3. Chat Threads

- **Description**: Collaborative spaces where users engage in discussions.
- **Functionality**:
  - Managed by co-authors who approve or deny incoming messages and specs.
  - Accumulate tokens through contributions and approvals.
  - Have dedicated Solana accounts for token storage.

### 4. Message Approval Mechanism

- **Description**: A consensus system where co-authors collectively decide on the inclusion of messages.
- **Functionality**:
  - Messages require unanimous approval from co-authors to be published.
  - Denied messages result in staked tokens being distributed among rejecting co-authors.

## Token Flow Mechanics

### 1. Message Contribution and Staking

- **Process**:
  - A user wishes to contribute a message to a chat thread where they are not a co-author.
  - The user stakes a predefined amount of CHOIR tokens as part of the message submission.
- **Token Allocation**:
  - Staked tokens are held in an escrow contract during the approval process.

### 2. Message Approval Process

- **Review Window**: Co-authors have a 7-day period to review and decide on the message.
- **Approval Mechanism**:
  - **Unanimous Approval**: All co-authors approve; the message is published.
    - **Token Distribution**:
      - The staked tokens are added to the thread's token balance.
      - The message author becomes a co-author, sharing in the thread's token balance and approval rights.
  - **Denial**:
    - Any co-author rejects; the message is denied.
    - **Token Distribution**:
      - Rejecting co-authors split the staked tokens equally.
  - **Split Decision**:
    - If there is a mix of approvals and denials, tokens intended for approving co-authors are returned to the Choir Treasury.
    - The message is denied.

### 3. Tokens and Co-authorship

- **Co-authorship Rights**:
  - Upon becoming a co-author, users share in the thread's token balance and have the power to approve or deny future messages.
- **Divestment Mechanism**:
  - Co-authors can choose to divest their share of tokens from a thread at any time.
  - **Token Retrieval**: An author receives a proportional share of the thread's token balance upon divestment.

### 4. Messages as Assets

- **Content Ownership**:
  - Messages and threads are treated as valuable assets within the platform.
- **Economic Incentives**:
  - Users are motivated to contribute high-quality messages to become co-authors.
  - The staking requirement discourages spam and ensures users have a vested interest in the thread's quality.

## Preventing Token Inflation and Ensuring Sustainability

### Fixed Token Supply

- **Hard Cap**: The total supply of 10 billion CHOIR tokens ensures scarcity and maintains token value.

### Token Recapture

- **Mechanism**: Tokens from split decisions (where messages are denied with mixed approvals) are returned to the Choir Treasury.
- **Purpose**: Sustains future distributions and prevents unchecked token circulation.

### Dynamic Staking Requirements

- **Adjustments**:
  - Staking amounts may vary based on platform activity levels.
  - Helps maintain accessibility while discouraging low-quality contributions.

## Citation Mechanics and Source Linking

### Message Citations

- **Citation Notifications**:
  - When a message is cited as a source elsewhere, a special notification message appears in the original thread.
- **Source Linking**:
  - Cited messages include a link to their original chat thread.
  - Enhances interconnectivity and acknowledgment of contributors.

### AI-Generated Summaries

- **Public Accessibility**:
  - Non-co-authors view AI-generated summaries of chat threads.
- **Privacy and Accuracy**:
  - Summaries are designed to convey key points without revealing sensitive information.
  - Co-authors have oversight of the summaries to ensure they accurately reflect the thread content.

## Governance and Community Participation

### Decentralized Decision-Making

- **Community Governance**:
  - Future integration of governance mechanisms allowing token holders to influence platform policies.
- **Token Holder Participation**:
  - Proposing and voting on changes related to tokenomics, platform features, and community guidelines.

### Implementation Phases

1. **Framework Development**: Design governance structures and voting mechanisms.
2. **Community Engagement**: Introduce governance models and encourage active participation.
3. **Integration**: Implement governance features post-MVP launch.

## Business Model and Financial Sustainability

### Revenue Generation Strategies

1. **Membership Plans**

   - Offer premium features or enhanced services for subscribers.
   - Provide benefits such as reduced staking requirements or priority message review.

2. **Transaction Fees**

   - Apply minimal fees on token transactions or message staking to support platform operations.

3. **Enterprise Solutions**
   - Offer customized versions of the platform for organizations seeking collaborative communication tools with blockchain integration.

### Fundraising Initiatives

- **Capital Raising Goals**:
  - **Target Date**: December
  - **Use of Funds**:
    - Expand the development team.
    - Invest in AI technologies and infrastructure.
    - Enhance platform features and scalability.
- **Corporate Integration**:
  - Choir Inc. aims to own CHOIR tokens and align corporate interests with the decentralized community.
  - The Choir Treasury may hold tokenized corporate stock in the future.

## AI Integration: Harnessing the Token-Scored Dataset

### Dataset Creation

- **High-Signal Data**:
  - The collaborative approval mechanism ensures that only high-quality messages are published.
  - The resulting dataset is rich in valuable human interactions.

### AI Model Training

- **Reinforcement Learning**:
  - Use the token-scored dataset to train AI models
  - Target Release: April 2025

## Conclusion

Choir's transition to a chat-based platform with integrated tokenomics fosters a collaborative environment where users are incentivized to contribute meaningfully. The approval mechanism ensures content quality, while the staking model aligns user interests with the platform's success. By leveraging this high-quality dataset, Choir is positioned to develop advanced AI models that excel in generating nuanced, impactful content.

This innovative approach combines blockchain technology, collaborative communication, and AI advancement, setting a new standard for decentralized platforms and content generation.
