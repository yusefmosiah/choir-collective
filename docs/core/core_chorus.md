# Core Chorus Cycle

VERSION core_chorus:
invariants: {
"Event sequence integrity",
"Effect conservation",
"Prior coherence"
}
assumptions: {
"Swift concurrency",
"Event-driven flow",
"Local-first processing"
}
docs_version: "0.3.0"

## Cycle Events

Detailed events for each step:

```swift
// Fine-grained chorus cycle events
enum ChorusEvent: DomainEvent {
    // ACTION events
    case actionStarted(input: String)
    case actionGenerated(response: String, confidence: Float)
    case actionCompleted(Effect)

    // EXPERIENCE events
    case priorSearchStarted(query: String)
    case priorsFound(count: Int, relevance: Float)
    case priorSynthesisCompleted(Effect)

    // INTENTION events
    case intentionAnalysisStarted
    case goalIdentified(goal: String, alignment: Float)
    case intentionEffectGenerated(Effect)

    // OBSERVATION events
    case linkRecordingStarted(priors: [Prior])
    case linksRecorded(count: Int)
    case observationEffectGenerated(Effect)

    // UPDATE events
    case cycleUpdateStarted
    case loopDecided(shouldLoop: Bool, reason: String)
    case updateEffectGenerated(Effect)

    // YIELD events
    case yieldStarted(effects: [Effect])
    case citationsGenerated(count: Int)
    case cycleCompleted(Response)

    var id: UUID
    var timestamp: Date
    var metadata: EventMetadata
}
```

## Cycle Manager

Event-driven cycle coordination:

```swift
// Core cycle manager
actor ChorusCycleManager {
    private let eventStore: EventStore
    private let llm: LLMActor
    private let vectors: VectorStore

    // Run cycle through event sequence
    func runCycle(_ input: String) async throws -> Response {
        // Start cycle
        try await eventStore.append(.actionStarted(input: input))

        // Process through steps
        try await withTaskCancellationHandler {
            // ACTION
            let actionEffect = try await processAction(input)
            try await eventStore.append(.actionCompleted(actionEffect))

            // EXPERIENCE
            let priorEffect = try await processExperience(input)
            try await eventStore.append(.priorSynthesisCompleted(priorEffect))

            // INTENTION
            let intentionEffect = try await processIntention(input)
            try await eventStore.append(.intentionEffectGenerated(intentionEffect))

            // OBSERVATION
            let observationEffect = try await processObservation(input)
            try await eventStore.append(.observationEffectGenerated(observationEffect))

            // UPDATE
            let updateEffect = try await processUpdate()
            try await eventStore.append(.updateEffectGenerated(updateEffect))

            // Check for loop
            if try await shouldContinue(updateEffect) {
                try await eventStore.append(.loopDecided(shouldLoop: true, reason: "Update indicates continuation"))
                return try await runCycle(input)
            }

            // YIELD
            let response = try await processYield()
            try await eventStore.append(.cycleCompleted(response))
            return response

        } onCancel: {
            Task {
                try? await cleanup()
            }
        }
    }
}

// Step implementations
extension ChorusCycleManager {
    private func processAction(_ input: String) async throws -> Effect {
        try await eventStore.append(.actionStarted(input: input))

        let response = try await llm.complete(input)
        let confidence = try await llm.getConfidence(response)

        try await eventStore.append(.actionGenerated(
            response: response,
            confidence: confidence
        ))

        return Effect(type: .action, content: response)
    }

    private func processExperience(_ input: String) async throws -> Effect {
        try await eventStore.append(.priorSearchStarted(query: input))

        let priors = try await vectors.search(input, limit: 80)
        try await eventStore.append(.priorsFound(
            count: priors.count,
            relevance: calculateRelevance(priors)
        ))

        let synthesis = try await synthesizePriors(input, priors)
        return Effect(type: .experience, content: synthesis)
    }

    // Similar implementations for other steps...
}
```

## Effect Generation

Effect creation through events:

```swift
// Effect generation with event tracking
actor EffectManager {
    private let eventStore: EventStore

    func generateEffect(
        type: EffectType,
        content: String
    ) async throws -> Effect {
        let effect = Effect(type: type, content: content)

        // Record effect generation
        try await eventStore.append(.effectGenerated(
            type: type,
            content: content
        ))

        return effect
    }
}
```

## Prior Flow

Prior handling with events:

```swift
// Prior management with event tracking
actor PriorManager {
    private let eventStore: EventStore
    private let vectors: VectorStore

    func recordPriors(_ priors: [Prior], in message: Message) async throws {
        try await eventStore.append(.priorRecordingStarted(
            count: priors.count,
            messageId: message.id
        ))

        // Store vector links
        try await vectors.storePriors(priors)

        // Record citations
        for prior in priors {
            try await eventStore.append(.citationRecorded(
                source: prior,
                target: message
            ))
        }

        try await eventStore.append(.priorsRecorded(
            count: priors.count,
            messageId: message.id
        ))
    }
}
```

This implementation provides:
1. Clear event sequence
2. Rich system history
3. Natural monitoring
4. Easy debugging
5. Clean recovery

The system ensures:
- Event integrity
- Effect tracking
- Prior coherence
- Cycle completion
- Resource cleanup
