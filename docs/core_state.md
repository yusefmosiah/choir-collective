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
