# Core System Architecture

VERSION core_architecture:
invariants: {
"Event integrity",
"Domain isolation",
"Local-first data"
}
assumptions: {
"Swift concurrency",
"Actor isolation",
"Event-driven flow"
}
docs_version: "0.3.0"

## Domain Events

Core event types that drive the system:

```swift
// Base event protocol
protocol DomainEvent: Sendable {
    var id: UUID { get }
    var timestamp: Date { get }
    var metadata: EventMetadata { get }
}

// Chorus cycle events
enum ChorusEvent: DomainEvent {
    case cycleStarted(input: String)
    case actionGenerated(response: String, confidence: Float)
    case priorsFound(count: Int, relevance: Float)
    case intentionIdentified(goal: String)
    case linksRecorded(count: Int)
    case cycleCompleted(Response)

    var id: UUID
    var timestamp: Date
    var metadata: EventMetadata
}

// Economic events
enum EconomicEvent: DomainEvent {
    case stakeDeposited(amount: TokenAmount)
    case temperatureChanged(delta: Float)
    case equityDistributed(shares: [PublicKey: Float])
    case rewardsIssued(amount: TokenAmount)

    var id: UUID
    var timestamp: Date
    var metadata: EventMetadata
}

// Knowledge events
enum KnowledgeEvent: DomainEvent {
    case vectorStored(embedding: [Float])
    case citationRecorded(source: Prior, target: Message)
    case linkStrengthened(from: Prior, to: Prior, weight: Float)
    case graphUpdated(nodes: Int, edges: Int)

    var id: UUID
    var timestamp: Date
    var metadata: EventMetadata
}
```

## Event Store

Thread-safe event persistence and distribution:

```swift
// Central event store
actor EventStore {
    private var events: [DomainEvent] = []
    private var subscribers: [EventSubscriber] = []

    // Store and distribute events
    func append(_ event: DomainEvent) async throws {
        events.append(event)

        try await withThrowingTaskGroup(of: Void.self) { group in
            // Notify all subscribers
            for subscriber in subscribers {
                group.addTask {
                    try await subscriber.handle(event)
                }
            }
            try await group.waitForAll()
        }
    }

    // Event replay capability
    func replay(from: Date) async throws {
        let relevantEvents = events.filter { $0.timestamp >= from }
        for event in relevantEvents {
            try await broadcast(event)
        }
    }
}
```

## Event Handlers

Domain-specific event processing:

```swift
// Event handling protocol
protocol EventHandler: Actor {
    func handle(_ event: DomainEvent) async throws
}

// Chorus cycle handler
actor ChorusHandler: EventHandler {
    private let cycle: ChorusCycleManager

    func handle(_ event: DomainEvent) async throws {
        guard let chorusEvent = event as? ChorusEvent else { return }

        switch chorusEvent {
        case .cycleStarted(let input):
            try await cycle.beginCycle(input)
        case .priorsFound(let count, let relevance):
            try await cycle.processPriors(count, relevance)
        case .cycleCompleted(let response):
            try await cycle.finalizeCycle(response)
        }
    }
}

// Economic handler
actor EconomicHandler: EventHandler {
    private let engine: EconomicEngine

    func handle(_ event: DomainEvent) async throws {
        guard let economicEvent = event as? EconomicEvent else { return }

        switch economicEvent {
        case .stakeDeposited(let amount):
            try await engine.processStake(amount)
        case .temperatureChanged(let delta):
            try await engine.updateTemperature(delta)
        }
    }
}
```

## System Coordination

Event-driven system integration:

```swift
// Central coordinator
actor SystemCoordinator {
    private let eventStore: EventStore
    private let handlers: [EventHandler]

    // Process user input through events
    func processInput(_ input: String) async throws {
        // Generate initial event
        let startEvent = ChorusEvent.cycleStarted(input: input)
        try await eventStore.append(startEvent)

        // System evolves through event chain
        try await withTaskCancellationHandler {
            // Events flow through system
            for try await event in eventStream(for: input) {
                try await eventStore.append(event)
            }
        } onCancel: {
            Task {
                try? await cleanup(input)
            }
        }
    }

    // Event stream processing
    private func eventStream(for input: String) -> AsyncStream<DomainEvent> {
        AsyncStream { continuation in
            // Events emerge from domain interactions
            Task {
                // System evolution through events
                // Continuation completes when cycle ends
            }
        }
    }
}
```

## Analytics & Monitoring

Event-based system insights:

```swift
// Analytics handler
actor AnalyticsHandler: EventHandler {
    func handle(_ event: DomainEvent) async throws {
        switch event {
        case let e as ChorusEvent:
            try await trackChorusMetrics(e)
        case let e as EconomicEvent:
            try await trackEconomicMetrics(e)
        case let e as KnowledgeEvent:
            try await trackKnowledgeMetrics(e)
        default:
            break
        }
    }
}

// Monitoring handler
actor MonitoringHandler: EventHandler {
    func handle(_ event: DomainEvent) async throws {
        // Track system health metrics
        try await recordLatency(event)
        try await checkThresholds(event)
        try await updateDashboards(event)
    }
}
```

This architecture provides:
1. Clear event-driven flow
2. Domain isolation
3. Rich system history
4. Natural monitoring
5. Easy extension

The system ensures:
- Event integrity
- Domain boundaries
- Audit capability
- Analytics insights
- System evolution
