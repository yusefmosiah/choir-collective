# Reward Documentation




==
Reward_Explained
==


# Understanding Choir's Reward System

## Overview

Choir has two main ways of rewarding users:

1. **New Message Rewards**: These rewards encourage early participation but gradually decrease over time.
2. **Priors Rewards**: These are ongoing rewards for referencing existing content, funded by the Treasury.

## New Message Rewards Explained

### What Are They?
- Rewards given for contributing new messages that get approved
- Come from a fixed pool of 2.5 billion CHOIR tokens
- Designed to kickstart the platform and reward early adopters

### How Do They Work?
- Start high and decrease over time
- Half of all new message rewards are given out in the first year
- 99% are given out by the end of year 4
- After that, they effectively stop

### Why This Design?
- Encourages people to join and contribute early
- Creates initial content and activity
- Gradually shifts focus to quality over quantity
- Natural transition to sustainable long-term rewards

## Priors Rewards Explained

### Purpose

- **Reward Past Content Creation**: Authors receive rewards when their past content is referenced in new messages
- **Incentivize Forward-Thinking**: Encourage creating content that will remain relevant and valuable in the future
- **Recognize Foundational Work**: Reward authors whose work becomes the foundation for future discussions

### How They Work

1. **Original Author Rewards**
   - When content is referenced in a new message, the **original author** of that content receives the reward
   - Rewards are proportional to the relevance and impact of their referenced content
   - Multiple references to the same content can generate multiple rewards
   - Authors continue earning from their content as long as it remains relevant

2. **Long-Term Value Creation**
   - Authors are incentivized to create content with lasting value
   - Better to write one foundational piece referenced 100 times than 100 pieces never referenced
   - Quality and foresight are naturally rewarded
   - Creates incentive to "write for the future"

### Funding Source

- **Treasury-Funded**: Sustained by tokens collected from split decisions during the approval process
- **Perpetual Rewards**: Unlike new message rewards, these continue indefinitely
- **Sustainable System**: Treasury continuously replenished through split decisions

### Distribution Mechanics

1. **Reward Calculation**
   ```math
   R_{\text{prior}}(i, t) = B_t \times \frac{Q_p(i)}{\sum_{j=1}^{N(t)} Q_p(j)}
   ```
   Where:
   - **R_prior(i, t)**: Reward paid to the original author of prior **i** at time **t**
   - **B_t**: Treasury balance allocated for priors rewards
   - **Q_p(i)**: Quality/relevance score of the prior use
   - **N(t)**: Total number of priors in the period

2. **Quality Assessment**
   - AI model evaluates how meaningfully the prior content is used
   - Higher rewards for priors that significantly contribute to new discussions
   - Rewards scale with the depth and relevance of the reference

### Example

If Alice writes a message in Year 1:
- Bob references it in Year 2 → Alice receives a reward
- Carol references it in Year 3 → Alice receives another reward
- Dave references it in Year 4 → Alice receives yet another reward

Alice continues earning from her content's value over time, incentivizing the creation of lasting, reusable content.

## The Big Picture

### Early Stage (First 4 Years):
- High rewards for new messages
- Building initial content base
- Establishing community
- Creating valuable content to reference

### Long Term (After 4 Years):
- Focus shifts to priors rewards
- Encourages building on existing knowledge
- Rewards quality connections
- Sustainable through Treasury funding

### Why Two Types?
- New message rewards bootstrap the platform
- Priors rewards maintain it long-term
- Natural evolution from growth to sustainability
- Encourages both creation and connection

## Example

Imagine you join Choir:

1. **In Year 1:**
   - Your approved new messages get significant rewards
   - You can also earn by referencing others' content
   - Both reward types are available

2. **In Year 4:**
   - New message rewards are much smaller
   - But priors rewards are still strong
   - Focus shifts to quality over quantity

3. **After Year 4:**
   - New message rewards effectively end
   - Priors rewards continue indefinitely
   - System maintains itself through Treasury mechanics

## Key Points to Remember

- New message rewards are temporary but significant
- Priors rewards are permanent and sustainable
- The system naturally evolves over time
- Quality and relevance always matter
- The Treasury ensures long-term sustainability

## Tips for Maximizing Rewards

1. **Early Participation:**
   - Join early to benefit from higher new message rewards
   - Build a foundation of quality content
   - Establish yourself in the community

2. **Quality Connections:**
   - Make meaningful references to existing content
   - Focus on relevance and value
   - Build on others' ideas effectively

3. **Long-term Strategy:**
   - Shift focus to priors as new message rewards decrease
   - Build a network of interconnected content
   - Contribute to the platform's knowledge base

Remember: The goal is to create a self-sustaining ecosystem where quality content naturally emerges and evolves. The reward system is designed to support this, not to be gamed or exploited.


==
Reward_Service
==


# Reward Service Design

VERSION reward_system:
invariants: {
"Semantic value calculation",
"Thread reward distribution",
"Treasury sustainability"
}
assumptions: {
"Hot wallet security",
"Semantic embedding stability",
"Batch processing efficiency"
}
docs_version: "0.2.1"

## Core Service Types

TYPE RewardService = {
hot_wallet: HotWallet,
embeddings: EmbeddingService,
semantic_cache: Map<Hash, Vector>,
batch_queue: Queue<RewardEvent>,
distribution_log: Log<Distribution>
}

TYPE RewardEvent =
| NewMessage(message_id: str, content: str)
| Prior(source_thread: str, target_thread: str, prior_hash: str)
| ThreadValue(thread_id: str, value_delta: f64)

## Semantic Value Calculation

SEQUENCE calculate_semantic_value:

1. Content Analysis

   - Generate embedding
   - Calculate semantic distance
   - Measure uniqueness
   - Factor thread context

2. Thread Value Computation

   - Base reward = f(semantic_distance)
   - Thread quality multiplier = f(thread_value)
   - Prior impact = f(source_thread_value)
   - Final reward = base \* multiplier + impact

3. Verification
   - Validate calculations
   - Check bounds
   - Record metrics
   - Log decision

PROPERTY value_fairness:
FORALL t1 t2 IN threads:
semantic_distance(t1, t2) > threshold IMPLIES
abs(reward(t1) - reward(t2)) < epsilon

## Batch Processing

SEQUENCE process_reward_batch:

1. Batch Collection

   - Aggregate thread events
   - Group by type
   - Sort by priority
   - Validate batch

2. Value Calculation

   - Process semantic values
   - Calculate thread rewards
   - Apply modifiers
   - Verify totals

3. Distribution
   - Prepare thread transactions
   - Execute batch
   - Verify success
   - Update state

PROPERTY batch_integrity:
FORALL batch IN batches:
sum(batch.rewards) == sum(batch.distributions) AND
batch.complete OR batch.reverted

## Hot Wallet Security

TYPE HotWallet = {
authority: Keypair,
balance: TokenAmount,
nonce: u64,
security_config: SecurityConfig
}

SEQUENCE secure_distribution:

1. Authorization

   - Verify service identity
   - Check permissions
   - Validate request
   - Log attempt

2. Transaction Preparation

   - Build thread instruction set
   - Calculate fees
   - Verify treasury balance
   - Sign transaction

3. Execution
   - Submit transaction
   - Monitor status
   - Handle response
   - Update records

PROPERTY wallet_security:
wallet.balance >= minimum_reserve AND
wallet.nonce.monotonic_increasing AND
wallet.logs.complete

## Integration with Chorus Cycle

SEQUENCE reward_integration:

1. Message Processing

   ```python
   async def process_message_reward(message: Message):
     embedding = await get_embedding(message.content)
     value = calculate_semantic_value(embedding)
     reward = compute_reward(value)
     await queue_distribution(message.author, reward)
   ```

2. Prior Processing

   ```python
   async def process_prior_reward(prior: Prior):
     source_thread = get_thread_value(prior.source_thread)
     quality_score = await calculate_prior_quality(
       prior_hash=prior.hash,
       source_thread=source_thread,
       usage_context=prior.context
     )
     reward = compute_thread_reward(quality_score)
     await queue_distribution(prior.target_thread, reward)
   ```

3. Thread Value Update
   ```python
   async def update_thread_value(thread_id: str):
     messages = await get_thread_messages(thread_id)
     semantic_value = calculate_thread_semantic_value(messages)
     prior_value = calculate_thread_prior_value(thread_id)
     total_value = semantic_value + prior_value
     await update_thread_metrics(thread_id, total_value)
   ```

## Error Handling

TYPE RewardError =
| SemanticCalculationError
| InsufficientTreasuryBalance
| ThreadDistributionFailure
| BatchProcessingError
| WalletSecurityError

FUNCTION handle_reward_error(error: RewardError) -> Result<()>:
log_error(error)
revert_batch()
notify_monitoring()
trigger_recovery()
RETURN Err(error)

## Monitoring and Analytics

TYPE RewardMetrics = {
semantic_distances: Distribution,
thread_rewards: Distribution,
batch_sizes: Distribution,
processing_times: Distribution
}

SEQUENCE monitor_rewards:

1. Track Distributions

   - Record thread amounts
   - Monitor patterns
   - Detect anomalies
   - Generate reports

2. Performance Metrics

   - Measure latency
   - Track throughput
   - Monitor errors
   - Analyze trends

3. Security Monitoring
   - Watch treasury
   - Verify signatures
   - Check balances
   - Alert on issues

## Implementation Notes

The reward service maintains several critical properties:

1. Value Calculation

   - Semantic distance is primary factor
   - Thread quality affects rewards
   - Priors strengthen threads
   - Rewards are fair and predictable

2. Distribution Safety

   - Treasury is secured
   - Thread batches are atomic
   - Failures are handled
   - Everything is logged

3. Performance
   - Batching is efficient
   - Calculations are cached
   - Processing is parallel
   - Resources are managed

Through these mechanisms, the reward service provides fair and efficient token distribution to threads while maintaining security and scalability.


==
Reward_Summary
==


# Rewards Summary

VERSION rewards_system:
invariants: {
"Energy conservation",
"Incentive alignment",
"Sustainable token flow"
}
assumptions: {
"Fixed token supply",
"Thermodynamic principles",
"Adaptive distribution"
}
docs_version: "0.2.1"

## Overview

Choir's reward system incentivizes high-quality content creation and meaningful engagement through two primary reward mechanisms:

1. **New Message Rewards**: Incentivize early participation by rewarding users for contributing new messages during the initial growth phase of the platform.

2. **Priors Rewards** (formerly **Citation Rewards**): Encourage users to reference and build upon existing content, promoting a rich, interconnected knowledge network.

---

## 1. New Message Rewards

### Purpose

- **Incentivize Early Adoption**: Encourage users to contribute new messages during the formative years of the platform.

### Total Allocation

- **Fixed Allocation**: **2.5 billion** CHOIR tokens allocated from the total supply of **10 billion** tokens.

### Distribution Mechanics

1. **Time-Based Decay**

   - **Decay Function**: Rewards decrease logarithmically over four years.
   - **Milestones**:
     - **50%** of the allocated new message rewards distributed after **1 year**.
     - **99%** distributed after **4 years**.

2. **Distribution Factors**

   - **Time (t)**: Primary factor influencing reward size.
   - **Message Volume (M(t))**: The number of messages submitted at time **t** affects per-message rewards.
   - **No Direct Dependence**: Does not directly depend on treasury balance or token velocity.

### Reward Calculation

**Cumulative Reward Function**:

```math
F(t) = R_{\text{total}} \times \frac{\ln(1 + k \times t)}{\ln(1 + k \times T)}
```

- **F(t)**: Total rewards distributed up to time **t**.
- **R_total**: Total tokens allocated for new message rewards (2.5 billion).
- **k**: Decay constant (calculated to meet distribution milestones).
- **T**: Total duration (4 years).

**Instantaneous Reward Rate**:

```math
\frac{dF}{dt} = R_{\text{total}} \times \frac{k}{(1 + k \times t) \times \ln(1 + k \times T)}
```

**Per-Message Reward**:

```math
R(t) = \frac{\frac{dF}{dt}}{M(t)}
```

- **R(t)**: Reward per message at time **t**.
- **M(t)**: Number of messages submitted during the time interval at **t**.

### Key Points

- **Early Incentives**: Higher rewards at the platform's inception.
- **Predictable Decline**: Transparent decrease over time aligns with network growth.
- **Encourages Quality**: As rewards diminish, focus shifts to contributing valuable content that garners engagement.

---

## 2. Priors Rewards (formerly Citation Rewards)

### Purpose

- **Promote Knowledge Interconnectivity**: Encourage users to reference and build upon existing content, creating a rich and cohesive knowledge network.

### Funding Source

- **Treasury-Funded**: Sustained by tokens collected from **split decisions** during the approval process.

### Distribution Mechanics

1. **Treasury Accumulation**

   - **Source**: Tokens from approvers in split decisions flow into the Treasury.
   - **Sustainability**: Continuous inflow ensures perpetual reward funding.

2. **Quality-Weighted Rewards**

   - **Relevance and Impact**: Rewards are based on the relevance and impact of the prior (formerly citation).
   - **AI-Assisted Weighting**: The Chorus Cycle's AI model assigns weights to priors based on semantic analysis.

3. **Adaptive Distribution**

   - **Treasury Health Maintenance**: Adjusts distribution to maintain a healthy Treasury balance.
   - **Dynamic Scaling**: Rewards may increase or decrease based on Treasury inflows and priors' demand.

### Reward Calculation

**Priors Reward Function**:

```math
R_{\text{prior}}(i, t) = B_t \times \frac{Q_p(i)}{\sum_{j=1}^{N(t)} Q_p(j)}
```

- **R_prior(i, t)**: Reward for prior **i** at time **t**.
- **B_t**: Total Treasury balance allocated for priors rewards at time **t**.
- **Q_p(i)**: Quality metric for prior **i** assigned by the AI model.
- **N(t)**: Total number of priors in the period.

### Factors Influencing Priors Rewards

- **Treasury Balance (B_t)**: Determines total rewards available.
- **Quality Metric (Q_p)**: Higher quality priors receive larger rewards.
- **Activity Levels**: Adjusts for the number of priors to sustainably distribute rewards.

### Key Points

- **Continuous Incentives**: Unlike new message rewards, priors rewards continue indefinitely.
- **Quality Emphasis**: Rewards prioritize meaningful and impactful contributions.
- **AI Integration**: Leverages AI to assess and weight priors based on relevance.

---

## 3. Technical Implementation Details

### Decay Function for New Message Rewards

- **Decay Constant (k)**: Calculated to satisfy distribution milestones.

```math
k = \text{Derived from } \frac{\ln(1 + k \times t_1)}{\ln(1 + k \times T)} = \frac{F(t_1)}{R_{\text{total}}}
```

- **t1**: Time at first milestone (1 year).
- **F(t1)**: Reward amount at t1 (50% of R_total).

- **Example Parameters**:

  - **T**: 4 years.
  - **R_total**: 2.5 billion CHOIR tokens.
  - **Calculated k**: Approximately 2.04.

### Adaptive Reward Function for Priors

- **Treasury Allocation**:

  - A percentage of the Treasury balance is allocated periodically for priors rewards.

- **AI Weighting Mechanism**:

  - The AI model in the Chorus Cycle evaluates priors using semantic analysis and assigns a quality score.

- **Sustainable Function**:

  - The reward function adjusts to ensure the Treasury is not depleted, using a natural, sustainable mathematical function (e.g., proportional allocation based on inflow rate).

---

## 4. Additional Considerations

### Circular Token Flow

- **Energy Conservation**: The total token supply remains constant, ensuring energy conservation in the system.
- **Treasury Mechanics**:

  - **Inflows**: From split decisions.
  - **Outflows**: To fund priors rewards.
  - **Balance Maintenance**: Adjusting rewards to maintain equilibrium.

### Incentive Alignment

- **Early Adoption**: New message rewards encourage users to join and contribute early.
- **Ongoing Engagement**: Priors rewards promote continuous interaction and content enhancement.
- **Quality Focus**: Both rewards systems are designed to prioritize high-quality contributions.

---

## 5. Example Scenarios

### New Message Reward Calculation Example

- **At Time t = 1 year**:

  - **Total Messages (M(t))**: 10 million.
  - **Reward per Message (R(t))**:

```math
R(t) = \frac{\frac{dF}{dt}}{M(t)}
```

Calculate **dF/dt** using the decay function and then compute **R(t)**.

### Priors Reward Calculation Example

- **Treasury Balance (B_t)**: 100 million CHOIR tokens.
- **Total Priors (N(t))**: 50,000.
- **Quality Scores (Q_p(i))**: Assigned by AI, ranging from 0.1 to 1.0.
- **Reward for Prior i**:

```math
R_{\text{prior}}(i, t) = B_t \times \frac{Q_p(i)}{\sum_{j=1}^{N(t)} Q_p(j)}
```

Compute the sum of quality scores and allocate rewards proportionally.

---

## 6. Terminology Update

- **Priors**: The term **"Priors"** replaces **"Citations"** or **"Sources"** to better reflect the foundational nature of referenced content in the knowledge network.

---

## 7. Future Developments

- **AI Model Enhancements**:

  - Improve the Chorus Cycle's ability to assess prior relevance and impact, refining the quality metrics used in reward calculations.

- **Governance and Parameters Adjustment**:

  - Introduce community governance mechanisms to adjust reward parameters and ensure the system remains fair and sustainable.

---

## Conclusion

The reward system in Choir is thoughtfully designed to balance incentivizing early adoption with sustaining long-term engagement. By integrating thermodynamic principles and adaptive mechanisms, the platform ensures energy conservation, incentive alignment, and sustainable token flow, fostering a vibrant and collaborative ecosystem.

---
