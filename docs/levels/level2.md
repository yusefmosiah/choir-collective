# Level 2 Documentation



=== File: docs/core_architecture.md ===



==
core_architecture
==


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

=== File: docs/core_chorus.md ===



==
core_chorus
==


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

=== File: docs/core_core.md ===



==
core_core
==


# Core System Overview

VERSION core_system:
invariants: {
"System coherence",
"Data authority",
"Event flow"
}
docs_version: "0.3.0"

The Choir system is built around a clear hierarchy of truth and a natural flow of events. At its foundation, the Solana blockchain serves as the authoritative source for all ownership and economic state - thread ownership, token balances, message hashes, and co-author lists. This ensures that the economic model, with its harmonic equity distribution and thermodynamic thread evolution, has an immutable and verifiable foundation.

Alongside the blockchain, LanceDB acts as the authoritative source for all content and semantic relationships. It stores the actual message content, embeddings, and the growing network of citations and semantic links. This separation of concerns allows the system to maintain both economic integrity through the blockchain and rich semantic relationships through the vector database.

The AEIOU-Y chorus cycle sits at the heart of the interaction model, processing user input through a series of well-defined steps. Each step generates events that flow through the system, coordinating state updates and UI feedback. The cycle begins with pure response in the Action step, enriches it with prior knowledge in the Experience step, aligns with user intent in the Intention step, records semantic connections in the Observation step, decides on continuation in the Update step, and produces the final response in the Yield step.

Events serve as the coordination mechanism between these components. When a user submits input, it triggers a cascade of events that flow through the system. The chorus cycle generates events as it processes the input. These events are used to coordinate UI updates, track system state, and maintain synchronization between components. However, these events are not the source of truth - they are merely the means by which the system coordinates updates and maintains consistency.

The economic model uses harmonic principles to govern thread evolution and value distribution. Thread temperature rises with rejections and moderates with approvals, creating natural quality barriers. Equity is distributed according to harmonic formulas, ensuring fair value attribution while maintaining mathematical elegance.

The knowledge system builds a growing semantic network through citations and prior references. Each message can reference previous messages as priors, creating a web of semantic relationships. These relationships are stored in LanceDB and help inform future responses through the Experience step of the chorus cycle.

State management follows the natural hierarchy of truth. The chain state is authoritative for ownership and economics. The vector state is authoritative for content and semantics. Local state serves only to coordinate UI updates and handle temporary synchronization needs. This clear hierarchy ensures system consistency while enabling responsive user interaction.

All of this is implemented using Swift's modern concurrency system. Actors provide thread-safe state isolation. Async/await enables clean asynchronous code. Structured concurrency through task groups ensures proper resource management. The event-driven architecture allows for loose coupling between components while maintaining system coherence.

The result is a system that combines economic incentives, semantic knowledge, and natural interaction patterns into a coherent whole. The blockchain provides economic integrity. The vector database enables semantic richness. The chorus cycle creates natural interaction. Events coordinate the pieces. And Swift's concurrency model keeps it all running smoothly and safely.

This architecture enables the system to evolve naturally. New event types can be added to handle new features. The semantic network grows organically through usage. The economic model creates emergent quality barriers. And the whole system maintains consistency through its clear hierarchy of truth and well-defined patterns of event flow.

=== File: docs/core_economics.md ===



==
core_economics
==


# Core Economic Model

VERSION core_economics:
invariants: {
"Chain state authority",
"Energy conservation",
"Harmonic distribution"
}
assumptions: {
"Swift concurrency",
"Event-driven flow",
"Solana source of truth"
}
docs_version: "0.3.0"

## Economic Events

Chain-driven economic events:

```swift
// Economic domain events
enum EconomicEvent: DomainEvent {
    // Stake events (from chain)
    case stakeDeposited(threadId: ThreadID, amount: TokenAmount)
    case stakeWithdrawn(threadId: ThreadID, amount: TokenAmount)

    // Temperature events (from chain)
    case temperatureIncreased(threadId: ThreadID, delta: Float)
    case temperatureDecreased(threadId: ThreadID, delta: Float)

    // Equity events (from chain)
    case equityDistributed(threadId: ThreadID, shares: [PublicKey: Float])
    case equityDiluted(threadId: ThreadID, newShares: [PublicKey: Float])

    // Reward events (from chain)
    case rewardsIssued(amount: TokenAmount, recipients: [PublicKey])
    case treasuryUpdated(newBalance: TokenAmount)

    var id: UUID
    var timestamp: Date
    var metadata: EventMetadata
}
```

## Chain State Authority

Solana as source of truth:

```swift
// Economic state from chain
actor ChainStateManager {
    private let solana: SolanaConnection
    private let eventStore: EventStore

    // Get thread economics from chain
    func getThreadEconomics(_ id: ThreadID) async throws -> ThreadEconomics {
        // Get authoritative state from chain
        let account = try await solana.getThreadAccount(id)

        return ThreadEconomics(
            temperature: account.temperature,
            energy: account.energy,
            tokenBalance: account.balance,
            equityShares: account.equityMap
        )
    }

    // Submit economic transaction
    func submitTransaction(_ tx: Transaction) async throws {
        // Submit to chain first
        let signature = try await solana.submitTransaction(tx)

        // Then emit events based on transaction type
        switch tx.instruction {
        case .depositStake(let amount):
            try await eventStore.append(.stakeDeposited(
                threadId: tx.threadId,
                amount: amount
            ))

        case .updateTemperature(let delta):
            try await eventStore.append(.temperatureIncreased(
                threadId: tx.threadId,
                delta: delta
            ))

        case .distributeEquity(let shares):
            try await eventStore.append(.equityDistributed(
                threadId: tx.threadId,
                shares: shares
            ))
        }
    }
}
```

## Harmonic Calculations

Pure calculation functions:

```swift
// Economic calculations (pure functions)
struct EconomicCalculator {
    // Base price using harmonic oscillator
    static func calculateBasePrice(
        temperature: Double,
        frequency: Double
    ) -> TokenAmount {
        // P₀ = S₀[1/2 + 1/(exp(ℏω/kT)-1)]
        let baseStake = Constants.baseStakeQuantum
        let reducedPlanck = Constants.reducedPlanck
        let boltzmann = Constants.boltzmann

        let exponent = (reducedPlanck * frequency) / (boltzmann * temperature)
        let occupation = 1.0 / (exp(exponent) - 1.0)

        return baseStake * (0.5 + occupation)
    }

    // Equity share calculation
    static func calculateEquityShare(
        stake: TokenAmount,
        basePrice: TokenAmount,
        coauthorCount: Int
    ) -> Double {
        // E(s) = (1/N) * √(s/P₀)
        let quantumNumber = Double(stake) / Double(basePrice)
        let quantumShare = 1.0 / Double(coauthorCount)
        return quantumShare * sqrt(quantumNumber)
    }
}
```

## Economic Handler

Event-driven economic processing:

```swift
// Economic event handling
actor EconomicHandler: EventHandler {
    private let chain: ChainStateManager
    private let calculator: EconomicCalculator

    func handle(_ event: DomainEvent) async throws {
        guard let economicEvent = event as? EconomicEvent else { return }

        switch economicEvent {
        case .stakeDeposited(let threadId, let amount):
            // Calculate new equity shares
            let thread = try await chain.getThreadEconomics(threadId)
            let basePrice = calculator.calculateBasePrice(
                temperature: thread.temperature,
                frequency: thread.frequency
            )
            let equity = calculator.calculateEquityShare(
                stake: amount,
                basePrice: basePrice,
                coauthorCount: thread.equityShares.count
            )

            // Submit equity distribution to chain
            let tx = Transaction.distributeEquity(
                threadId: threadId,
                shares: [event.author: equity]
            )
            try await chain.submitTransaction(tx)

        case .temperatureIncreased(let threadId, let delta):
            // Update thread temperature on chain
            let tx = Transaction.updateTemperature(
                threadId: threadId,
                delta: delta
            )
            try await chain.submitTransaction(tx)

        // Handle other economic events...
        }
    }
}
```

## Analytics & Monitoring

Economic event tracking:

```swift
// Economic analytics
actor EconomicAnalytics: EventHandler {
    func handle(_ event: DomainEvent) async throws {
        guard let economicEvent = event as? EconomicEvent else { return }

        switch economicEvent {
        case .stakeDeposited(let threadId, let amount):
            try await trackStakeMetric(threadId, amount)

        case .temperatureIncreased(let threadId, let delta):
            try await trackTemperatureMetric(threadId, delta)

        case .equityDistributed(let threadId, let shares):
            try await trackEquityMetric(threadId, shares)

        case .rewardsIssued(let amount, let recipients):
            try await trackRewardMetric(amount, recipients)
        }
    }
}
```

This implementation provides:
1. Chain state authority
2. Event-driven updates
3. Pure calculations
4. Clean analytics
5. Proper event flow

The system ensures:
- Economic integrity
- Harmonic distribution
- Temperature evolution
- Value conservation
- Natural emergence

=== File: docs/core_knowledge.md ===



==
core_knowledge
==


# Core Knowledge Architecture

VERSION core_knowledge:
invariants: {
"Semantic coherence",
"Citation integrity",
"Vector stability"
}
assumptions: {
"Local-first vectors",
"Multimodal embeddings",
"Progressive enhancement"
}
docs_version: "0.3.0"

## Vector Space

Core vector operations with proper concurrency:

```swift
// Vector operations with isolation
actor VectorStore {
    private let lanceDB: LanceDB
    private let embeddings: EmbeddingActor
    private let cache: CacheActor

    // Concurrent vector search
    func search(_ content: String, limit: Int = 80) async throws -> [Prior] {
        try await withThrowingTaskGroup(of: ([Prior], [Float]).self) { group in
            // Parallel embedding and cache check
            group.addTask {
                async let embedding = self.embeddings.embed(content)
                async let cached = self.cache.getPriors(content)
                return (try await cached ?? [], try await embedding)
            }

            // Get result
            guard let (cached, embedding) = try await group.next() else {
                throw VectorError.searchFailed
            }

            // Return cached or search
            if cached.count >= limit {
                return Array(cached.prefix(limit))
            }

            // Search with cancellation support
            return try await withTaskCancellationHandler {
                let results = try await lanceDB.search(
                    vector: embedding,
                    limit: limit
                )
                try await cache.store(content, results)
                return results
            } onCancel: {
                Task { try? await cache.cleanup(content) }
            }
        }
    }
}
```

## Prior Management

Thread-safe prior handling:

```swift
// Prior operations with proper isolation
actor PriorManager {
    private let vectors: VectorStore
    private let storage: StorageActor
    private var activePriors: [UUID: Prior] = [:]

    // Concurrent prior processing
    func processPriors(for content: String) async throws -> [Prior] {
        try await withThrowingTaskGroup(of: [Prior].self) { group in
            // Search vectors
            group.addTask {
                try await self.vectors.search(content)
            }

            // Get metadata
            group.addTask {
                try await self.storage.getPriorMetadata(content)
            }

            // Combine results
            var allPriors: [Prior] = []
            for try await priors in group {
                allPriors.append(contentsOf: priors)
            }

            // Store active priors
            for prior in allPriors {
                activePriors[prior.id] = prior
            }

            return allPriors
        }
    }

    // Citation recording with error handling
    func recordCitation(_ source: Prior, in target: Message) async throws {
        guard let prior = activePriors[source.id] else {
            throw PriorError.notFound
        }

        try await withTaskCancellationHandler {
            try await storage.recordCitation(source: prior, target: target)
            try await vectors.updateEmbeddings(for: target)
        } onCancel: {
            Task {
                try? await storage.cleanup(target.id)
            }
        }
    }
}
```

## Semantic Network

Knowledge graph management:

```swift
// Semantic operations with proper isolation
actor SemanticNetwork {
    private let graph: GraphActor
    private let vectors: VectorStore

    // Concurrent semantic processing
    func processSemanticLinks(_ message: Message) async throws {
        try await withThrowingTaskGroup(of: Void.self) { group in
            // Update graph
            group.addTask {
                try await self.graph.addNode(message)
            }

            // Process citations
            for prior in message.priors {
                group.addTask {
                    try await self.graph.addEdge(from: prior, to: message)
                }
            }

            // Update embeddings
            group.addTask {
                try await self.vectors.updateEmbeddings(for: message)
            }

            try await group.waitForAll()
        }
    }

    // Graph queries with cancellation
    func findRelatedContent(_ content: String) async throws -> [Message] {
        try await withTaskCancellationHandler {
            let embedding = try await vectors.embed(content)
            let nodes = try await graph.findSimilar(embedding)
            return nodes.map(\.message)
        } onCancel: {
            Task { @MainActor in
                // Clear any cached results
            }
        }
    }
}
```

## Multimodal Support

Progressive enhancement for different modalities:

```swift
// Multimodal handling with isolation
actor ModalityManager {
    private let imageBind: ImageBindActor
    private let vectors: VectorStore

    // Process different modalities
    func processContent(_ content: MultimodalContent) async throws -> Embedding {
        try await withThrowingTaskGroup(of: [Float].self) { group in
            switch content {
            case .text(let text):
                group.addTask {
                    try await self.vectors.embed(text)
                }

            case .image(let image):
                group.addTask {
                    try await self.imageBind.embedImage(image)
                }

            case .audio(let audio):
                group.addTask {
                    try await self.imageBind.embedAudio(audio)
                }
            }

            // Combine embeddings
            var embeddings: [[Float]] = []
            for try await embedding in group {
                embeddings.append(embedding)
            }

            return try await combineEmbeddings(embeddings)
        }
    }
}
```

## Implementation Strategy

Progressive knowledge enhancement:

```swift
struct KnowledgeStrategy {
    // Phase 1: Local vectors
    let foundation = [
        "Local LanceDB",
        "Basic embeddings",
        "Simple citations",
        "Text only"
    ]

    // Phase 2: Enhanced vectors
    let enhancement = [
        "Multimodal support",
        "Distributed search",
        "Rich citations",
        "Knowledge graph"
    ]

    // Phase 3: Network effects
    let network = [
        "P2P vector sync",
        "Collective knowledge",
        "Cross-modal search",
        "Emergent patterns"
    ]
}
```

This knowledge architecture provides:
1. Thread-safe vector operations
2. Proper concurrency handling
3. Progressive enhancement
4. Multimodal support
5. Local-first approach

The system ensures:
- Semantic coherence
- Citation integrity
- Resource efficiency
- Knowledge emergence
- Natural evolution

=== File: docs/core_patterns.md ===



==
core_patterns
==


# Core Implementation Patterns

VERSION core_patterns:
invariants: {
"Source of truth clarity",
"Event-driven coordination",
"Actor isolation"
}
assumptions: {
"Swift concurrency",
"Proper data hierarchy",
"Event-based sync"
}
docs_version: "0.3.0"

## Source of Truth Pattern

Respect data authority hierarchy:

```swift
// Chain state authority pattern
protocol ChainStateProvider {
    // Authoritative state
    func getThreadState(_ id: ThreadID) async throws -> ThreadState
    func getTokenBalance(_ owner: PublicKey) async throws -> UInt64

    // State transitions
    func submitTransaction(_ tx: Transaction) async throws -> Signature
}

// Vector state authority pattern
protocol VectorStateProvider {
    // Authoritative content
    func getMessage(_ hash: MessageHash) async throws -> Message
    func searchPriors(_ query: String) async throws -> [Prior]

    // Content storage
    func storeMessage(_ message: Message) async throws
    func recordCitation(_ source: Prior, _ target: Message) async throws
}

// Example implementation
actor StateManager {
    private let chain: ChainStateProvider
    private let vectors: VectorStateProvider

    func processMessage(_ content: String) async throws {
        // Store content first
        let message = Message(content: content)
        try await vectors.storeMessage(message)

        // Then record on chain
        let tx = Transaction.recordMessage(message.hash)
        try await chain.submitTransaction(tx)
    }
}
```

## Event Coordination Pattern

Events for state synchronization:

```swift
// Event types by purpose
enum SystemEvent {
    // State sync events
    case chainStateChanged(ThreadID)
    case contentStored(MessageHash)

    // UI coordination events
    case uiStateChanged(ViewState)
    case loadingStateChanged(Bool)

    // Error events
    case errorOccurred(Error)
    case syncFailed(reason: String)
}

// Event handling pattern
protocol EventHandler: Actor {
    // Handle specific event types
    func handle(_ event: SystemEvent) async throws
}

// Example implementation
actor UICoordinator: EventHandler {
    func handle(_ event: SystemEvent) async throws {
        switch event {
        case .chainStateChanged(let threadId):
            try await refreshThread(threadId)
        case .contentStored(let hash):
            try await refreshContent(hash)
        }
    }
}
```

## Actor Isolation Pattern

Clean actor boundaries:

```swift
// Domain-specific actors
actor ThreadActor {
    private let chain: ChainStateProvider
    private let events: EventEmitter

    func getThread(_ id: ThreadID) async throws -> Thread {
        // Get authoritative state
        let state = try await chain.getThreadState(id)

        // Emit UI event
        try await events.emit(.threadStateLoaded(id))

        return state
    }
}

// Resource management pattern
actor ResourcePool {
    private var resources: Set<Resource> = []

    func withResource<T>(_ work: (Resource) async throws -> T) async throws -> T {
        let resource = try await acquireResource()
        defer { releaseResource(resource) }
        return try await work(resource)
    }
}
```

## Error Recovery Pattern

Clean error handling with events:

```swift
// Error types by source
enum SystemError: Error {
    // Chain errors
    case chainUnavailable
    case transactionFailed(reason: String)

    // Vector errors
    case contentNotFound(MessageHash)
    case storageError(reason: String)

    // Sync errors
    case syncFailed(reason: String)
    case stateInconsistent
}

// Recovery pattern
actor ErrorRecovery {
    func recover(from error: SystemError) async throws {
        switch error {
        case .chainUnavailable:
            try await queueForRetry()
        case .syncFailed:
            try await resyncState()
        }
    }
}
```

## Testing Pattern

Protocol-based testing:

```swift
// Test implementations
class MockChainProvider: ChainStateProvider {
    var mockState: [ThreadID: ThreadState] = [:]

    func getThreadState(_ id: ThreadID) async throws -> ThreadState {
        guard let state = mockState[id] else {
            throw SystemError.chainUnavailable
        }
        return state
    }
}

// Test scenarios
class SystemTests: XCTestCase {
    var sut: StateManager!
    var mockChain: MockChainProvider!

    override func setUp() {
        mockChain = MockChainProvider()
        sut = StateManager(chain: mockChain)
    }

    func testStateSync() async throws {
        // Given
        let threadId = ThreadID()
        let state = ThreadState(id: threadId)
        mockChain.mockState[threadId] = state

        // When
        let result = try await sut.getThread(threadId)

        // Then
        XCTAssertEqual(result, state)
    }
}
```

These patterns ensure:
1. Clear data authority
2. Clean event flow
3. Safe state sync
4. Error resilience
5. Testability

The system maintains:
- Source of truth clarity
- Event-driven coordination
- Actor isolation
- Error recovery
- Testing simplicity

=== File: docs/core_state.md ===



==
core_state
==


# Core State Management

VERSION core_state:
invariants: {
"Chain state authority",
"Vector content authority",
"Local coordination"
}
assumptions: {
"Swift concurrency",
"Actor isolation",
"Event-driven sync"
}
docs_version: "0.3.0"

## Chain State (Source of Truth)

Solana program state:

```swift
// Core chain state
actor ChainState {
    private let solana: SolanaConnection
    private let eventStore: LocalEventStore

    // Thread state from chain
    func getThreadState(_ id: ThreadID) async throws -> ThreadState {
        // Get authoritative state from chain
        let account = try await solana.getThreadAccount(id)

        return ThreadState(
            id: id,
            coAuthors: account.coAuthors,
            tokenBalance: account.balance,
            messageHashes: account.messageHashes
        )
    }

    // Submit state changes to chain
    func submitStateChange(_ transaction: Transaction) async throws {
        // Submit to chain first
        let signature = try await solana.submitTransaction(transaction)

        // Then emit local event for UI updates
        try await eventStore.append(.chainStateChanged(signature))
    }
}
```

## Vector State (Source of Truth)

LanceDB content storage:

```swift
// Vector content state
actor VectorState {
    private let lanceDB: LanceDB
    private let eventStore: LocalEventStore

    // Get content and embeddings
    func getMessage(_ hash: MessageHash) async throws -> Message {
        // Get authoritative content from LanceDB
        let content = try await lanceDB.getMessage(hash)

        // Emit local event for UI
        try await eventStore.append(.contentLoaded(hash))

        return content
    }

    // Store new content
    func storeMessage(_ message: Message) async throws {
        // Store in LanceDB first
        try await lanceDB.store(message)

        // Then emit local event
        try await eventStore.append(.contentStored(message.hash))
    }
}
```

## Local Events (Coordination Only)

Temporary state for UI and sync:

```swift
// Local event coordination
actor LocalEventStore {
    // Event types for local coordination
    enum LocalEvent: Codable {
        // UI updates
        case contentLoaded(MessageHash)
        case chainStateChanged(Signature)

        // Sync status
        case syncStarted
        case syncCompleted
        case syncFailed(Error)

        // Offline queue
        case transactionQueued(Transaction)
        case transactionSent(Signature)
    }

    private var events: [LocalEvent] = []
    private var subscribers: [LocalEventSubscriber] = []

    // Emit coordination events
    func append(_ event: LocalEvent) async throws {
        events.append(event)

        // Notify UI subscribers
        for subscriber in subscribers {
            try await subscriber.handle(event)
        }

        // Cleanup old events
        try await pruneOldEvents()
    }
}
```

## UI State Management

React to authoritative state changes:

```swift
@MainActor
class ThreadViewModel: ObservableObject {
    @Published private(set) var thread: ThreadState?
    @Published private(set) var messages: [Message] = []

    private let chainState: ChainState
    private let vectorState: VectorState
    private let eventStore: LocalEventStore

    // Load thread state
    func loadThread(_ id: ThreadID) async throws {
        // Get authoritative state
        thread = try await chainState.getThreadState(id)

        // Load messages from vector DB
        messages = try await loadMessages(thread.messageHashes)

        // Subscribe to local events for updates
        subscribeToEvents()
    }

    // Handle local events
    private func handleEvent(_ event: LocalEvent) async {
        switch event {
        case .chainStateChanged:
            // Refresh chain state
            if let id = thread?.id {
                thread = try? await chainState.getThreadState(id)
            }
        case .contentLoaded:
            // Refresh messages if needed
            if let hashes = thread?.messageHashes {
                messages = try? await loadMessages(hashes)
            }
        }
    }
}
```

This implementation ensures:
1. Chain state authority
2. Vector content authority
3. Local coordination
4. Clean UI updates
5. Proper sync

The system maintains:
- Clear data hierarchy
- Proper authority
- UI responsiveness
- Sync coordination
- Debug capability

=== File: docs/goal_architecture.md ===



==
goal_architecture
==


# System Architecture

VERSION architecture_vision:
invariants: {
"Event integrity",
"Actor isolation",
"Chain authority"
}
assumptions: {
"Swift concurrency",
"Local-first design",
"Natural flow"
}
docs_version: "0.3.0"

## Core Architecture

The system operates through natural event flows and clear authority boundaries:

Event Foundation
- Events capture all system changes
- State transitions flow as events
- Components communicate via events
- Security verifies through events
- Recovery enabled by event history

Actor Isolation
- Each domain lives in its own actor
- Actors communicate through events
- State remains properly isolated
- Resources cleanly managed
- Patterns emerge naturally

Chain Authority
- Solana state authoritative for:
  - Thread ownership
  - Token balances
  - Message hashes
  - Co-author lists

Local Authority
- LanceDB authoritative for:
  - Message content
  - Embeddings
  - Citations
  - Semantic links

## Event Flow

Events flow naturally through system boundaries:

State Events
- Chain state changes
- Content updates
- Local coordination
- UI updates
- System health

Economic Events
- Stake deposits
- Temperature changes
- Equity distribution
- Reward issuance
- Value flow

Knowledge Events
- Content storage
- Citation recording
- Link strengthening
- Pattern emergence
- Network growth

## System Boundaries

Clear domain separation through:

State Authority
- Chain state for ownership/tokens
- Vector state for content/embeddings
- Local state for coordination
- Event state for flow
- Pattern state for emergence

Resource Boundaries
- Actor isolation for safety
- Event flow for coordination
- State isolation for clarity
- Resource management for efficiency
- Pattern emergence for evolution

Security Boundaries
- Chain verification
- Event integrity
- Actor isolation
- Pattern validation
- Natural flow

## Natural Patterns

System patterns emerge through:

Event Flow
- State changes flow naturally
- Components coordinate through events
- Patterns emerge from flow
- Recovery enabled by history
- Evolution guided by events

Actor Organization
- Natural domain separation
- Clean state isolation
- Event-based communication
- Resource containment
- Pattern-based structure

Value Distribution
- Chain-based ownership
- Event-driven rewards
- Pattern-based value
- Natural flow
- Emergent worth

## Implementation Foundation

Built on natural foundations:

Swift Concurrency
- Actor-based isolation
- Structured concurrency
- Async/await flow
- Resource safety
- Pattern support

Local First
- Chain authority respected
- Content locally verified
- Events locally tracked
- Patterns locally recognized
- Evolution locally enabled

Event Driven
- Natural state flow
- Clean coordination
- Pattern emergence
- Value distribution
- System evolution

This architecture enables:
1. Clear authority boundaries
2. Natural event flow
3. Clean actor isolation
4. Pattern emergence
5. System evolution

The system ensures:
- State integrity
- Event coherence
- Resource safety
- Pattern recognition
- Natural growth

=== File: docs/goal_evolution.md ===



==
goal_evolution
==


# Platform Evolution

VERSION evolution_vision:
invariants: {
"Natural growth",
"Pattern emergence",
"Value flow"
}
assumptions: {
"Progressive enhancement",
"Local-first evolution",
"Event-driven growth"
}
docs_version: "0.3.0"

## Core Evolution

The platform evolves through natural phases:

Text Foundation
- Pure text interaction
- Natural message flow
- Citation patterns
- Value recognition
- Team formation

The foundation enables:
- Clear communication patterns
- Natural quality emergence
- Team crystallization
- Value accumulation
- Network growth

Voice Enhancement
- Natural voice input
- Audio embeddings
- Multimodal understanding
- Pattern recognition
- Flow evolution

The voice layer creates:
- Richer interaction patterns
- Natural communication flow
- Enhanced understanding
- Pattern amplification
- Network deepening

Knowledge Evolution
- Cross-modal understanding
- Deep semantic networks
- Pattern recognition
- Value emergence
- Network intelligence

## Progressive Enhancement

Natural capability growth:

Local Enhancement
- On-device embeddings
- Local search
- Pattern recognition
- Value calculation
- Natural evolution

Edge Enhancement
- Distributed search
- Pattern sharing
- Value flow
- Network formation
- Natural scaling

Network Enhancement
- P2P capabilities
- Pattern emergence
- Value distribution
- Network effects
- Natural growth

## Value Distribution

Natural value flow evolution:

Individual Value
- Quality recognition
- Pattern rewards
- Natural incentives
- Growth opportunities
- Value accumulation

Team Value
- Collective recognition
- Pattern strengthening
- Natural alignment
- Growth sharing
- Value crystallization

Network Value
- Pattern emergence
- Value flow
- Natural coupling
- Growth amplification
- Network effects

## Platform Capabilities

Progressive capability emergence:

Interaction Capabilities
- Text to voice
- Multimodal understanding
- Pattern recognition
- Natural flow
- Evolution support

Knowledge Capabilities
- Semantic networks
- Pattern formation
- Value recognition
- Natural growth
- Network effects

Economic Capabilities
- Value distribution
- Pattern rewards
- Natural incentives
- Growth sharing
- Network effects

## Future Vision

Natural system evolution toward:

Collective Intelligence
- Pattern recognition
- Value emergence
- Natural alignment
- Growth amplification
- Network effects

Team Formation
- Natural crystallization
- Pattern strengthening
- Value sharing
- Growth enablement
- Network formation

Knowledge Networks
- Pattern emergence
- Value flow
- Natural coupling
- Growth support
- Network intelligence

This evolution enables:
1. Natural capability growth
2. Progressive enhancement
3. Value distribution
4. Pattern emergence
5. Network effects

The system ensures:
- Natural evolution
- Pattern recognition
- Value flow
- Growth support
- Network intelligence

=== File: docs/goal_implementation.md ===



==
goal_implementation
==


# Implementation Strategy

VERSION implementation_vision:
invariants: {
"Clear phases",
"Resource efficiency",
"Pattern emergence"
}
assumptions: {
"Swift foundation",
"Actor isolation",
"Event-driven flow"
}
docs_version: "0.3.0"

## Development Phases

Natural system evolution through clear phases:

Foundation Phase
- Core event system
- Actor isolation
- Local storage
- Chain integration
- Basic UI

The foundation establishes:
- Event-driven patterns
- Actor boundaries
- State authority
- Resource management
- Testing patterns

Knowledge Phase
- Vector storage
- Prior system
- Citation network
- Semantic links
- Pattern recognition

The knowledge layer enables:
- Content organization
- Natural citations
- Link formation
- Pattern emergence
- Network growth

Economic Phase
- Token integration
- Temperature evolution
- Equity distribution
- Value flow
- Pattern rewards

The economic layer creates:
- Natural incentives
- Value recognition
- Team formation
- Pattern strengthening
- Network effects

## Implementation Patterns

Core patterns that guide development:

Event Patterns
- Clear event types
- Natural event flow
- State transitions
- Pattern recognition
- System evolution

Actor Patterns
- Domain isolation
- Resource safety
- Event handling
- Pattern emergence
- Natural boundaries

Testing Patterns
- Event verification
- Actor isolation
- State consistency
- Pattern validation
- Natural flow

## Resource Management

Clean resource handling through:

State Resources
- Chain state authority
- Vector state integrity
- Local state efficiency
- Event state flow
- Pattern state emergence

Memory Resources
- Actor isolation
- Event efficiency
- State management
- Pattern recognition
- Natural cleanup

Network Resources
- Chain interaction
- Content synchronization
- Event distribution
- Pattern formation
- Natural flow

## Testing Strategy

Comprehensive testing through:

Unit Testing
- Actor isolation
- Event handling
- State transitions
- Pattern recognition
- Resource management

Integration Testing
- Event flow
- Actor communication
- State consistency
- Pattern validation
- System coherence

System Testing
- End-to-end flow
- Resource efficiency
- Pattern emergence
- Value distribution
- Natural evolution

## Development Flow

Natural implementation flow:

Pattern Recognition
- Identify core patterns
- Establish boundaries
- Enable flow
- Support emergence
- Guide evolution

Resource Optimization
- Efficient state management
- Clean event flow
- Actor isolation
- Pattern support
- Natural growth

Quality Emergence
- Clear patterns
- Clean implementation
- Natural flow
- Pattern validation
- System evolution

This strategy enables:
1. Clear development phases
2. Clean implementation patterns
3. Efficient resource use
4. Comprehensive testing
5. Natural system evolution

The implementation ensures:
- Pattern clarity
- Resource efficiency
- System quality
- Natural growth
- Sustainable evolution
