# Core State Transitions

VERSION core_state_transitions:
invariants: {
"Energy conservation",
"Temperature evolution",
"Frequency coherence"
}
assumptions: {
"Thermodynamic transitions",
"Phase stability",
"Heat flow patterns"
}
docs_version: "0.5.0"

## Core State Transitions

### 1. Thread Creation

```swift
func createThread(creator: PublicKey, threadID: UUID) throws -> Thread {
    // Initial Thermodynamic State
    let threadPDA = derivePDA(seed: [THREAD_SEED, threadID])
    let initialState = Thread(
        coAuthors: [creator],          // N = 1
        energy: 0,                     // E = 0
        temperature: T0,               // Initial temperature
        frequency: ω0,                 // Initial frequency
        createdAt: Date()
    )

    emit(ThreadCreated(threadID: threadID, creator: creator, initialState: initialState))
    return threadPDA
}
```

### 2. Message Submission

```swift
func submitMessage(author: PublicKey, threadID: UUID, content: String) throws -> Hash {
    let thread = getThreadState(threadID)

    // Energy Requirements using quantum harmonic oscillator formula
    let ω = calculateFrequency(thread)
    let T = calculateTemperature(thread)
    let requiredStake = calculateStakeRequirement(thread, ω, T)

    switch checkAuthorStatus(author, threadID) {
    case .notCoAuthor:
        verifyStakeAmount(requiredStake)
        createSpec(threadID, author, contentHash, requiredStake)
    case .coAuthor:
        storeMessage(threadID, contentHash)
        updateFrequency(thread)
    }
}
```

### 3. Approval Processing

```swift
func processApproval(decision: Decision) throws {
    switch decision {
    case .reject:
        // Temperature increases
        thread.energy += stakeAmount // Stake flows to thread
        thread.temperature = thread.energy / thread.coAuthors.count
        // Frequency unchanged

    case .splitDecision:
        // Calculate shares based on voter counts
        let totalVoters = decision.approvers.count + decision.deniers.count
        let approverShare = (stakeAmount * decision.approvers.count) / totalVoters
        let denierShare = stakeAmount - approverShare

        // Approvers' share to Treasury
        treasury.balance += approverShare
        // Deniers' share to thread
        thread.energy += denierShare
        // Temperature updated from new thread energy
        thread.temperature = thread.energy / thread.coAuthors.count

    case .approve:
        // Distribute stake to approvers
        distributeToApprovers(stakeAmount)
        addCoAuthor(author)
        // Temperature moderates through co-author addition
        thread.temperature = thread.energy / thread.coAuthors.count
        // Frequency increases
        thread.frequency = calculateFrequency(thread)
    }
}
```

## Reward State Transitions

### 1. New Message Reward

```swift
func processNewMessageReward(message: Message) throws {
    // Calculate time-based reward using decay function
    let elapsed = currentTime - programStart
    let reward = calculateDecayReward(elapsed, messageVolume)

    // Distribute to author
    distributeToAuthor(message.author, reward)

    // Update state
    updateDistributedTotal(reward)
    updateRemainingAllocation(reward)
    emitRewardEvent(message, reward)
}
```

### 2. Prior Reward

```swift
func processPriorReward(
    sourceThread: Thread,
    targetThread: Thread,
    priorHash: Hash,
    qualityScore: Double
) throws {
    // Verify prior exists and is public
    require(sourceThread.messages.contains(priorHash))
    require(isMessagePublic(priorHash))

    // Check cooldown period
    require(elapsedSinceLastReward(priorHash) >= COOLDOWN)

    // Calculate thread reward
    let reward = calculatePriorReward(qualityScore, treasury.balance)

    // Transfer from treasury to thread
    transferFromTreasury(reward, to: targetThread)

    // Update state
    updatePriorRecord(priorHash, reward)
    updateTreasuryBalance(reward)
    emitPriorEvent(sourceThread, targetThread, reward)
}
```

## Reward Properties

### 1. New Message Conservation

```
PROPERTY new_message_conservation:
  FORALL reward IN new_message_rewards:
    reward <= remaining_allocation AND
    total_distributed + reward <= TOTAL_ALLOCATION AND
    follows_decay_curve(reward)
```

### 2. Prior Reward Stability

```
PROPERTY prior_reward_stability:
  FORALL reward IN prior_rewards:
    reward <= treasury.balance AND
    respects_cooldown(reward) AND
    strengthens_thread_cavity(reward)
```

## Combined State Evolution

The system maintains coherence across all state transitions:

1. **Message Flow**
   - Submission → Approval/Denial → Reward
   - Each stage preserves invariants
   - Energy conserved throughout
   - Phase relationships maintained

2. **Value Flow**
   - Individual rewards (approvals, new messages)
   - Collective rewards (denials, prior rewards)
   - Treasury coupling (split decisions)
   - System-wide coherence

3. **Reward Flow**
   - Time-based decay (new messages)
   - Quality-weighted distribution (priors)
   - Treasury sustainability
   - Thread cavity strengthening

## State Verification

```swift
func verifyThermodynamicState(thread: Thread) throws -> Bool {
    guard thread.energy >= 0 else { throw ThermodynamicError.energyConservationViolation }
    guard thread.temperature > 0 else { throw ThermodynamicError.temperatureInstability }
    guard thread.frequency > 0 else { throw ThermodynamicError.frequencyDecoherence }
    guard energyConserved(thread) else { throw ThermodynamicError.energyConservationViolation }
    return true
}
```

## Temperature Evolution

```swift
func evolveTemperature(thread: Thread, timeDelta: TimeInterval) {
    // Natural cooling over time
    let coolingFactor = 1 + sqrt(timeDelta / (86400) * Double(thread.coAuthors.count))
    thread.temperature /= coolingFactor
}
```

## Frequency Management

```swift
func updateFrequency(thread: Thread) {
    let messageMode = thread.messageRate / sqrt(Double(thread.coAuthors.count))
    let valueMode = log(1 + thread.energy / Double(thread.coAuthors.count))
    let coupling = 1.0 / Double(thread.coAuthors.count)

    thread.frequency = sqrt(
        (pow(messageMode, 2) + pow(valueMode, 2)) / 2.0 +
        coupling * Double(thread.coAuthors.count)
    )
}
```

## Error Handling

```swift
enum ThermodynamicError: Error {
    case energyConservationViolation
    case temperatureInstability
    case frequencyDecoherence
    case phaseTransitionFailure
}

func handleError(_ error: ThermodynamicError) -> Recovery {
    switch error {
    case .energyConservationViolation:
        recomputeEnergy()
    case .temperatureInstability:
        stabilizeTemperature()
    case .frequencyDecoherence:
        realignFrequency()
    case .phaseTransitionFailure:
        reverseTransition()
    }
}
```

## Monitoring Points

1. **Thermodynamic Health**
   - Energy conservation
   - Temperature stability
   - Frequency coherence
   - Phase transition success

2. **Performance Metrics**
   - Heat flow efficiency
   - Frequency stability
   - Phase transition speed
   - System entropy
