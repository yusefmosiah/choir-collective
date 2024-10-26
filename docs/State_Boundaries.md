# State Distribution Across Systems

VERSION state_boundaries:
  invariants: {
    "Clear ownership of state",
    "Consistent data flow",
    "Verifiable boundaries"
  }
  assumptions: {
    "System availability",
    "Network reliability",
    "Cache coherence"
  }
  implementation: "0.1.0"

## 1. Solana State (Source of Truth for Ownership)

TYPE SolanaState = {
  thread: {
    co_authors: Set<PublicKey>,      // Thread ownership
    token_balance: u64,              // Thread value
    content_hashes: Set<Hash>,       // Content verification
    created_at: i64                  // Thread timestamp
  },

  approvals: {
    pending: Map<Hash, Set<PublicKey>>,  // Active votes
    decisions: Map<Hash, Decision>,      // Final outcomes
    expiry: Map<Hash, i64>              // Timeout tracking
  },

  tokens: {
    stakes: Map<Hash, TokenAmount>,     // Locked stakes
    escrow: Map<Hash, TokenAmount>,     // Pending distribution
    treasury: TokenAmount               // System reserve
  }
}

## 2. Qdrant State (Source of Truth for Content)

TYPE QdrantState = {
  content: {
    messages: Map<Hash, String>,        // Raw content
    embeddings: Map<Hash, Vector>,      // Semantic vectors
    metadata: Map<Hash, Metadata>       // Content properties
  },

  indices: {
    semantic: VectorIndex,              // Similarity search
    temporal: TimeIndex,                // Time-based access
    author: AuthorIndex                 // Creator lookup
  },

  search: {
    filters: Set<Filter>,               // Access control
    rankings: Map<Hash, Score>,         // Relevance scores
    cache: Map<Query, Results>          // Search optimization
  }
}

## 3. Backend State (Session and Cache Management)

TYPE BackendState = {
  session: {
    connections: Map<ClientId, WebSocket>,  // Active clients
    subscriptions: Map<ThreadId, Set<ClientId>>, // Room membership
    heartbeats: Map<ClientId, Timestamp>    // Connection health
  },

  cache: {
    threads: Map<ThreadId, ThreadCache>,    // Hot thread data
    messages: Map<Hash, MessageCache>,      // Recent messages
    users: Map<PublicKey, UserCache>        // Active user data
  },

  websocket: {
    rooms: Map<ThreadId, Room>,            // Chat rooms
    events: Queue<Event>,                  // Message queue
    state: Map<ClientId, ClientState>      // Connection state
  }
}

## 4. Frontend State (UI and Optimistic Updates)

TYPE FrontendState = {
  ui: {
    threads: Map<ThreadId, ThreadUI>,      // Thread display
    messages: Map<Hash, MessageUI>,        // Message display
    notifications: Queue<Notification>      // User alerts
  },

  optimistic: {
    pending: Map<Hash, OptimisticUpdate>,  // Unconfirmed changes
    rollbacks: Map<Hash, RollbackState>,   // Recovery data
    conflicts: Set<StateConflict>          // Sync issues
  },

  local: {
    wallet: WalletState,                   // Connection state
    preferences: UserPreferences,          // Settings
    drafts: Map<ThreadId, Draft>          // Unsent messages
  }
}

## State Flow Patterns

1. **Ownership Flow**
   ```
   Solana -> Backend -> Frontend
   PROPERTY: ownership_flow
     solana.thread.co_authors = backend.cache.thread.co_authors
     backend.cache.thread.co_authors = frontend.ui.thread.co_authors
   ```

2. **Content Flow**
   ```
   Frontend -> Backend -> Qdrant
   PROPERTY: content_flow
     frontend.messages[hash].content = backend.cache.messages[hash].content
     backend.cache.messages[hash].content = qdrant.content.messages[hash]
   ```

3. **Token Flow**
   ```
   Solana -> Backend -> Frontend
   PROPERTY: token_flow
     solana.tokens.balances = backend.cache.tokens
     backend.cache.tokens = frontend.ui.balances
   ```

## Boundary Enforcement

1. **State Authority**
   ```
   RULE state_ownership:
     ownership_changes MUST originate from Solana
     content_changes MUST flow through Qdrant
     session_state MUST be managed by Backend
     ui_state MUST be managed by Frontend
   ```

2. **Update Propagation**
   ```
   SEQUENCE state_update:
     1. Update authoritative source
     2. Await confirmation
     3. Propagate to dependent systems
     4. Verify consistency
   ```

3. **Conflict Resolution**
   ```
   FUNCTION resolve_conflict(conflict: StateConflict):
     MATCH conflict:
       OwnershipConflict -> use_solana_state()
       ContentConflict -> use_qdrant_state()
       CacheConflict -> rebuild_cache()
       UIConflict -> refresh_frontend()
   ```

## Monitoring and Verification

1. **Health Checks**
   ```
   FUNCTION verify_boundaries():
     check_solana_consistency()
     verify_qdrant_integrity()
     validate_cache_coherence()
     confirm_ui_state()
   ```

2. **Metrics Collection**
   ```
   MEASURE boundary_health:
     state_sync_delay
     propagation_time
     conflict_rate
     recovery_success
   ```
