# Level 1 Documentation



=== File: docs/Tech_Arts_Intersection.md ===



==
Tech_Arts_Intersection
==


# Choir: Harmonic Intelligence Platform

VERSION harmonic_system:
invariants: {
"Wave resonance",
"Energy conservation",
"Pattern emergence"
}
assumptions: {
"Apple ecosystem excellence",
"Swift implementation",
"Natural harmonics"
}
docs_version: "0.4.1"

# The Intersection of Technology and Art in Documentation

## Overview

Documentation, like art, is about conveying meaning through carefully chosen representations. This document explores how artistic principles can enhance technical documentation.

## Core Principles

### Information Density

1. **High-Impact Tokens**

   - Single insights that reframe understanding
   - Metaphors that collapse complexity
   - Images worth thousands of words
   - Stories that rewrite context

2. **Plot Structure**
   - Documentation as narrative journey
   - Meaning evolves through time
   - Understanding develops in stages
   - Resolution reframes initial context

### Compression Methods

1. **Artistic Compression**

   ```typescript
   TYPE ArtisticCompression = {
     metaphor: "Collapse complex patterns into simple images",
     story: "Encode meaning in narrative structure",
     resonance: "Leverage shared human experience",
     whitespace: "Let meaning emerge from gaps"
   }
   ```

2. **Technical Compression**
   ```typescript
   TYPE TechnicalCompression = {
     abstraction: "Factor out common patterns",
     hierarchy: "Organize by relationships",
     modularity: "Separate concerns",
     interfaces: "Define clean boundaries"
   }
   ```

### Communication Bandwidth

1. **Explicit Channels**

   - Written specifications
   - Code examples
   - Configuration details
   - Step-by-step procedures

2. **Implicit Channels**
   - Narrative structure
   - Emotional resonance
   - Pattern recognition
   - Shared context

## Implementation Guidelines

1. **Document Structure**

   - Begin with human story
   - Build technical foundation
   - Weave between levels
   - End with transformed understanding

2. **Language Use**

   - Mix technical precision with artistic clarity
   - Use metaphors to bridge concepts
   - Let structure mirror meaning
   - Create space for insight

3. **Visual Elements**
   - Diagrams that tell stories
   - Code that teaches principles
   - Screenshots that guide intuition
   - Whitespace that enables comprehension

## Principles in Practice

1. **Plot Development**

   - Start with familiar ground
   - Introduce tension/complexity
   - Guide through resolution
   - Transform understanding

2. **Meaning Evolution**
   - Initial context setting
   - Challenge assumptions
   - Reveal deeper patterns
   - Crystallize new understanding

## Conclusion

Great documentation, like great art, doesn't just transfer information—it transforms understanding. By weaving together technical precision with artistic sensibility, we can create documentation that resonates at multiple levels and enables deeper comprehension.

=== File: docs/core_architecture.md ===



==
core_architecture
==


# Core System Architecture

VERSION core_architecture:
invariants: {
"Event integrity",
"Network coherence",
"Distributed consensus"
}
assumptions: {
"Swift concurrency",
"Actor isolation",
"Distributed intelligence"
}
docs_version: "0.4.1"

## Domain Events

Core event types that drive the distributed system:

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

SwiftData event logging with network synchronization:

```swift
// Event store with distributed coordination
actor EventStore {
    // Local event log
    @Model private var events: [DomainEvent] = []
    private var subscribers: [EventSubscriber] = []

    // Network coordination
    private let networkSync: NetworkSyncService
    private let vectorStore: VectorStoreService
    private let chain: ChainService

    // Store and distribute events
    func append(_ event: DomainEvent) async throws {
        // Log locally
        events.append(event)

        // Distribute to network
        try await withThrowingTaskGroup(of: Void.self) { group in
            // Sync with distributed services
            group.addTask { try await self.networkSync.broadcast(event) }
            group.addTask { try await self.vectorStore.process(event) }
            group.addTask { try await self.chain.verify(event) }

            // Notify local subscribers
            for subscriber in subscribers {
                group.addTask {
                    try await subscriber.handle(event)
                }
            }
            try await group.waitForAll()
        }
    }

    // Event replay with network verification
    func replay(from: Date) async throws {
        let localEvents = events.filter { $0.timestamp >= from }
        let networkEvents = try await networkSync.getEvents(from: from)

        // Reconcile local and network events
        let reconciledEvents = try await reconcileEvents(local: localEvents, network: networkEvents)

        for event in reconciledEvents {
            try await broadcast(event)
        }
    }
}
```

## Event Handlers

Domain-specific event processing with network coordination:

```swift
// Event handling protocol
protocol EventHandler: Actor {
    func handle(_ event: DomainEvent) async throws
}

// Chorus cycle handler
actor ChorusHandler: EventHandler {
    private let cycle: ChorusCycleManager
    private let ai: AIService
    private let vectors: VectorStoreService

    func handle(_ event: DomainEvent) async throws {
        guard let chorusEvent = event as? ChorusEvent else { return }

        switch chorusEvent {
        case .cycleStarted(let input):
            // Coordinate with AI service
            try await ai.beginProcessing(input)
            try await cycle.beginCycle(input)

        case .priorsFound(let count, let relevance):
            // Coordinate with vector store
            try await vectors.processPriors(count, relevance)
            try await cycle.processPriors(count, relevance)

        case .cycleCompleted(let response):
            // Finalize across services
            try await ai.completeProcessing(response)
            try await vectors.updateIndices(for: response)
            try await cycle.finalizeCycle(response)
        }
    }
}

// Economic handler with chain coordination
actor EconomicHandler: EventHandler {
    private let engine: EconomicEngine
    private let chain: ChainService

    func handle(_ event: DomainEvent) async throws {
        guard let economicEvent = event as? EconomicEvent else { return }

        switch economicEvent {
        case .stakeDeposited(let amount):
            try await chain.verifyStake(amount)
            try await engine.processStake(amount)

        case .temperatureChanged(let delta):
            try await chain.recordTemperature(delta)
            try await engine.updateTemperature(delta)
        }
    }
}
```

## System Coordination

Distributed system integration:

```swift
// Central coordinator
actor SystemCoordinator {
    private let eventStore: EventStore
    private let handlers: [EventHandler]
    private let networkSync: NetworkSyncService
    private let ai: AIService
    private let vectors: VectorStoreService
    private let chain: ChainService

    // Process input through distributed system
    func processInput(_ input: String) async throws {
        // Generate initial event
        let startEvent = ChorusEvent.cycleStarted(input: input)
        try await eventStore.append(startEvent)

        // System evolves through distributed processing
        try await withTaskCancellationHandler {
            // Coordinate event flow across services
            for try await event in eventStream(for: input) {
                try await processDistributedEvent(event)
            }
        } onCancel: {
            Task {
                try? await cleanupDistributedResources(input)
            }
        }
    }

    // Distributed event stream
    private func eventStream(for input: String) -> AsyncStream<DomainEvent> {
        AsyncStream { continuation in
            Task {
                // Coordinate across services
                async let aiEvents = ai.streamEvents(for: input)
                async let vectorEvents = vectors.streamEvents(for: input)
                async let chainEvents = chain.streamEvents(for: input)

                // Merge event streams
                try await for event in merge(aiEvents, vectorEvents, chainEvents) {
                    continuation.yield(event)
                }
                continuation.finish()
            }
        }
    }
}
```

## Analytics & Monitoring

Distributed system insights:

```swift
// Analytics handler
actor AnalyticsHandler: EventHandler {
    private let metrics: MetricsService

    func handle(_ event: DomainEvent) async throws {
        switch event {
        case let e as ChorusEvent:
            try await metrics.trackAIMetrics(e)
        case let e as EconomicEvent:
            try await metrics.trackChainMetrics(e)
        case let e as KnowledgeEvent:
            try await metrics.trackVectorMetrics(e)
        default:
            break
        }
    }
}

// Monitoring handler
actor MonitoringHandler: EventHandler {
    private let monitor: SystemMonitor

    func handle(_ event: DomainEvent) async throws {
        // Track distributed system health
        try await monitor.recordLatency(event)
        try await monitor.checkServiceHealth(event)
        try await monitor.updateNetworkStatus(event)
    }
}
```

This architecture provides:

1. Distributed event processing
2. Network coordination
3. Service integration
4. System monitoring
5. Scalable evolution

The system ensures:

- Event integrity
- Network coherence
- Service boundaries
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
"Network synchronization",
"Distributed effects"
}
assumptions: {
"Swift concurrency",
"Service coordination",
"Collective intelligence"
}
docs_version: "0.4.1"

## Cycle Events

Detailed events for distributed cycle coordination:

```swift
// Distributed chorus cycle events
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

Distributed cycle coordination:

```swift
// Core cycle manager
actor ChorusCycleManager {
    // Event logging
    private let eventStore: EventStore

    // Distributed services
    private let llm: FoundationModelActor
    private let vectors: VectorStoreActor
    private let embeddings: EmbeddingActor
    private let chain: ChainActor

    // Run cycle through distributed system
    func runCycle(_ input: String) async throws -> Response {
        // Start cycle
        try await eventStore.append(.actionStarted(input: input))

        // Process through distributed steps
        try await withTaskCancellationHandler {
            // ACTION - Foundation model processing
            let actionEffect = try await processAction(input)
            try await eventStore.append(.actionCompleted(actionEffect))

            // EXPERIENCE - Vector search and embedding
            let priorEffect = try await processExperience(input)
            try await eventStore.append(.priorSynthesisCompleted(priorEffect))

            // INTENTION - Goal analysis
            let intentionEffect = try await processIntention(input)
            try await eventStore.append(.intentionEffectGenerated(intentionEffect))

            // OBSERVATION - Network knowledge update
            let observationEffect = try await processObservation(input)
            try await eventStore.append(.observationEffectGenerated(observationEffect))

            // UPDATE - System state evaluation
            let updateEffect = try await processUpdate()
            try await eventStore.append(.updateEffectGenerated(updateEffect))

            // Check for continuation
            if try await shouldContinue(updateEffect) {
                try await eventStore.append(.loopDecided(shouldLoop: true, reason: "Update indicates continuation"))
                return try await runCycle(input)
            }

            // YIELD - Finalize across network
            let response = try await processYield()
            try await eventStore.append(.cycleCompleted(response))
            return response

        } onCancel: {
            Task {
                try? await cleanupDistributedResources()
            }
        }
    }
}

// Step implementations
extension ChorusCycleManager {
    private func processAction(_ input: String) async throws -> Effect {
        try await eventStore.append(.actionStarted(input: input))

        // Coordinate with AI service
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

        // Coordinate vector search
        let embedding = try await embeddings.embed(input)
        let priors = try await vectors.search(embedding, limit: 80)

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

Distributed effect coordination:

```swift
// Effect generation with network coordination
actor EffectManager {
    private let eventStore: EventStore
    private let ai: FoundationModelActor
    private let vectors: VectorStoreActor

    func generateEffect(
        type: EffectType,
        content: String
    ) async throws -> Effect {
        let effect = Effect(type: type, content: content)

        // Generate embedding
        let embedding = try await ai.embed(content)

        // Store in vector database
        try await vectors.store(embedding, metadata: effect.metadata)

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

Network knowledge coordination:

```swift
// Prior management with distributed coordination
actor PriorManager {
    private let eventStore: EventStore
    private let vectors: VectorStoreActor
    private let embeddings: EmbeddingActor
    private var activePriors: [UUID: Prior] = [:]

    func recordPriors(_ priors: [Prior], in message: Message) async throws {
        try await eventStore.append(.priorRecordingStarted(
            count: priors.count,
            messageId: message.id
        ))

        // Generate and store embeddings
        for prior in priors {
            let embedding = try await embeddings.embed(prior.content)
            try await vectors.store(embedding, metadata: prior.metadata)

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

1. Distributed cycle processing
2. Network service coordination
3. Knowledge synchronization
4. Effect propagation
5. System resilience

The system ensures:

- Event sequence integrity
- Network coherence
- Effect distribution
- Knowledge growth
- Resource management

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
docs_version: "0.4.1"

The Choir system is built around a clear hierarchy of truth and a natural flow of events. At its foundation, the Solana blockchain serves as the authoritative source for all ownership and economic state - thread ownership, token balances, message hashes, and co-author lists. This ensures that the economic model, with its harmonic equity distribution and thermodynamic thread evolution, has an immutable and verifiable foundation.

Alongside the blockchain, Qdrant acts as the authoritative source for all content and semantic relationships. It stores the actual message content, embeddings, and the growing network of citations and semantic links. This separation of concerns allows the system to maintain both economic integrity through the blockchain and rich semantic relationships through the vector database.

The AEIOU-Y chorus cycle sits at the heart of the interaction model, processing user input through a series of well-defined steps. Each step generates events that flow through the system, coordinating state updates and UI feedback. The cycle begins with pure response in the Action step, enriches it with prior knowledge in the Experience step, aligns with user intent in the Intention step, records semantic connections in the Observation step, decides on continuation in the Update step, and produces the final response in the Yield step.

Events serve as the coordination mechanism between these components. When a user submits input, it triggers a cascade of events that flow through the system. The chorus cycle generates events as it processes the input. These events are used to coordinate UI updates, track system state, and maintain synchronization between components. However, these events are not the source of truth - they are merely the means by which the system coordinates updates and maintains consistency.

The economic model uses harmonic principles to govern thread evolution and value distribution. Thread temperature rises with rejections and moderates with approvals, creating natural quality barriers. Equity is distributed according to harmonic formulas, ensuring fair value attribution while maintaining mathematical elegance.

The knowledge system builds a growing semantic network through citations and prior references. Each message can reference previous messages as priors, creating a web of semantic relationships. These relationships are stored in Qdrant and help inform future responses through the Experience step of the chorus cycle.

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
docs_version: "0.4.1"

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
"Network consensus",
"Distributed learning"
}
assumptions: {
"Distributed vector storage",
"Collective embeddings",
"Network intelligence"
}
docs_version: "0.4.1"

## Vector Space

Distributed vector operations with proper concurrency:

```swift
// Vector operations with network coordination
actor VectorStore {
    private let qdrant: QdrantService
    private let embeddings: EmbeddingActor
    private let cache: CacheActor

    // Distributed vector search
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

            // Return cached or search network
            if cached.count >= limit {
                return Array(cached.prefix(limit))
            }

            // Network search with cancellation support
            return try await withTaskCancellationHandler {
                let results = try await qdrant.search(
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

Network-aware prior handling:

```swift
// Prior operations with distributed coordination
actor PriorManager {
    private let vectors: VectorStore
    private let storage: StorageActor
    private let network: NetworkSyncService
    private var activePriors: [UUID: Prior] = [:]

    // Distributed prior processing
    func processPriors(for content: String) async throws -> [Prior] {
        try await withThrowingTaskGroup(of: [Prior].self) { group in
            // Network vector search
            group.addTask {
                try await self.vectors.search(content)
            }

            // Get network metadata
            group.addTask {
                try await self.network.getPriorMetadata(content)
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

    // Citation recording with network sync
    func recordCitation(_ source: Prior, in target: Message) async throws {
        guard let prior = activePriors[source.id] else {
            throw PriorError.notFound
        }

        try await withTaskCancellationHandler {
            // Record in network
            try await network.recordCitation(source: prior, target: target)

            // Update vector indices
            try await vectors.updateEmbeddings(for: target)

            // Store locally
            try await storage.recordCitation(source: prior, target: target)
        } onCancel: {
            Task {
                try? await network.cleanup(target.id)
            }
        }
    }
}
```

## Semantic Network

Distributed knowledge graph:

```swift
// Semantic operations with network coordination
actor SemanticNetwork {
    private let graph: GraphActor
    private let vectors: VectorStore
    private let network: NetworkSyncService

    // Distributed semantic processing
    func processSemanticLinks(_ message: Message) async throws {
        try await withThrowingTaskGroup(of: Void.self) { group in
            // Update network graph
            group.addTask {
                try await self.network.addNode(message)
            }

            // Process citations across network
            for prior in message.priors {
                group.addTask {
                    try await self.network.addEdge(from: prior, to: message)
                }
            }

            // Update distributed embeddings
            group.addTask {
                try await self.vectors.updateEmbeddings(for: message)
            }

            try await group.waitForAll()
        }
    }

    // Network graph queries with cancellation
    func findRelatedContent(_ content: String) async throws -> [Message] {
        try await withTaskCancellationHandler {
            let embedding = try await vectors.embed(content)
            let nodes = try await network.findSimilar(embedding)
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

Distributed multimodal processing:

```swift
// Multimodal handling with network coordination
actor ModalityManager {
    private let imageBind: ImageBindService
    private let vectors: VectorStore
    private let network: NetworkSyncService

    // Process different modalities across network
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

            // Combine network embeddings
            var embeddings: [[Float]] = []
            for try await embedding in group {
                embeddings.append(embedding)
            }

            return try await network.combineEmbeddings(embeddings)
        }
    }
}
```

## Implementation Strategy

Progressive network enhancement:

```swift
struct KnowledgeStrategy {
    // Phase 1: Core network
    let foundation = [
        "Distributed Qdrant",
        "Network embeddings",
        "Citation network",
        "Text processing"
    ]

    // Phase 2: Enhanced network
    let enhancement = [
        "Multimodal processing",
        "Distributed search",
        "Network citations",
        "Knowledge graph"
    ]

    // Phase 3: Network effects
    let network = [
        "Collective learning",
        "Network intelligence",
        "Cross-modal search",
        "Emergent patterns"
    ]
}
```

This knowledge architecture provides:

1. Distributed vector operations
2. Network coordination
3. Progressive enhancement
4. Multimodal support
5. Collective intelligence

The system ensures:

- Semantic coherence
- Network consensus
- Resource efficiency
- Knowledge emergence
- System evolution

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
docs_version: "0.4.1"

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
docs_version: "0.4.1"

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

Qdrant content storage:

```swift
// Vector content state
actor VectorState {
    private let Qdrant: Qdrant
    private let eventStore: LocalEventStore

    // Get content and embeddings
    func getMessage(_ hash: MessageHash) async throws -> Message {
        // Get authoritative content from Qdrant
        let content = try await Qdrant.getMessage(hash)

        // Emit local event for UI
        try await eventStore.append(.contentLoaded(hash))

        return content
    }

    // Store new content
    func storeMessage(_ message: Message) async throws {
        // Store in Qdrant first
        try await Qdrant.store(message)

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
