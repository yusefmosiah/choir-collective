# Reward System Model

VERSION reward_model:
invariants: {
"Energy conservation",
"Value resonance",
"Pattern emergence"
}
assumptions: {
"Event-driven flow",
"Local-first verification",
"Chain authority"
}
docs_version: "0.3.0"

## Reward Events

Value flows through natural event sequences:

New Message Events
```swift
enum MessageRewardEvent: Event {
    case messageApproved(MessageHash, TokenAmount)
    case rewardCalculated(TokenAmount, TimeDecay)
    case rewardDistributed(PublicKey, TokenAmount)
}
```

Prior Events
```swift
enum PriorRewardEvent: Event {
    case priorReferenced(PriorHash, MessageHash)
    case valueCalculated(TokenAmount, Relevance)
    case rewardIssued(PublicKey, TokenAmount)
}
```

Treasury Events
```swift
enum TreasuryEvent: Event {
    case splitDecisionProcessed(TokenAmount)
    case priorRewardFunded(TokenAmount)
    case balanceUpdated(TokenAmount)
}
```

## Value Calculation

Reward value emerges through natural formulas:

New Message Decay
```
R(t) = R_total × k/(1 + kt)ln(1 + kT)

where:
- R_total: Total reward allocation (2.5B)
- k: Decay constant (~2.04)
- t: Current time
- T: Total period (4 years)
```

Prior Value
```
V(p) = B_t × Q(p)/∑Q(i)

where:
- B_t: Treasury balance
- Q(p): Prior quality score
- ∑Q(i): Sum of all quality scores
```

## Event Processing

Local-first reward handling:

```swift
// Reward processor
actor RewardProcessor {
    private let chain: ChainAuthority
    private let eventLog: LocalEventLog

    func process(_ event: RewardEvent) async throws {
        // Calculate reward locally
        let reward = try await calculate(event)

        // Log event
        try await eventLog.append(event)

        // Submit to chain
        try await submitToChain(reward)

        // Emit value update
        try await updateValue(event)
    }
}
```

Value Tracking
```swift
// Value tracker
actor ValueTracker {
    private var threadValues: [ThreadID: TokenAmount]
    private let eventLog: EventLog

    func trackValue(_ event: RewardEvent) async throws {
        // Update value state
        try await updateValue(event)

        // Log value change
        try await eventLog.append(.valueChanged(event))
    }
}
```

## Implementation Notes

1. Event Storage
```swift
// Local event storage
@Model
class RewardEventLog {
    let events: [RewardEvent]
    let values: [ThreadID: TokenAmount]
    let timestamp: Date

    // Sync with chain
    func sync() async throws {
        try await chain.verifyRewards(events)
    }
}
```

2. Value Evolution
```swift
// Value evolution
actor ValueManager {
    private var currentValues: [ThreadID: TokenAmount]
    private let eventLog: EventLog

    func evolveValue(_ event: RewardEvent) async throws {
        // Update values
        try await updateValues(event)

        // Record evolution
        try await eventLog.append(.valueEvolved(currentValues))
    }
}
```

This model ensures:
1. Event-driven rewards
2. Local-first verification
3. Chain authority
4. Value evolution
5. Pattern emergence

The system maintains:
- Energy conservation
- Value resonance
- Pattern recognition
- Natural flow
- System evolution
