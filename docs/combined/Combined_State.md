# State Documentation - State Management




==
State_Boundaries
==


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


==
State_Transitions
==


# Core State Transitions

VERSION state_transition_map:
  invariants: {
    "State consistency across systems",
    "Token conservation",
    "Ownership integrity"
  }
  assumptions: {
    "Two-phase updates",
    "Eventual consistency",
    "Optimistic UI"
  }
  implementation: "0.1.0"

## 1. Thread Creation

SEQUENCE create_thread:
  1. Solana State     ```
     thread_pda = derive_thread_pda(thread_id)
     initial_state = {
       co_authors: [creator],
       token_balance: 0,
       created_at: now()
     }     ```

  2. Qdrant State     ```
     collection = {
       id: thread_id,
       metadata: {
         owner: creator,
         created_at: now()
       }
     }     ```

  3. Backend State     ```
     websocket_room = create_room(thread_id)
     cache_entry = init_thread_cache(thread_id)     ```

  4. Frontend State     ```
     optimistic_update = {
       thread_id: thread_id,
       status: 'creating',
       local_state: initial_state
     }     ```

## 2. Message Submission

SEQUENCE submit_message:
  1. Content Processing     ```
     embedding = generate_embedding(content)
     content_hash = hash(content)     ```

  2. Author Check     ```
     IF author IN thread.co_authors:
       direct_submission()
     ELSE:
       spec_submission()     ```

  3. State Updates     ```
     qdrant: store_content(content, embedding)
     solana: record_hash(content_hash)
     backend: notify_co_authors()
     frontend: optimistic_display()     ```

## 3. Approval Processing

SEQUENCE process_approval:
  1. Collect Votes     ```
     approvals = get_thread_approvals(hash)
     co_authors = get_thread_co_authors(thread_id)     ```

  2. Check Consensus     ```
     IF unanimous_approval(approvals, co_authors):
       publish_message()
       add_co_author()
       distribute_to_thread()
     ELIF any_denial(approvals):
       reject_message()
       distribute_to_deniers()
     ELSE:
       // Still pending     ```

  3. State Updates     ```
     solana: update_thread_state()
     qdrant: update_content_status()
     backend: broadcast_result()
     frontend: update_ui()     ```

## 4. Token Distribution

SEQUENCE distribute_tokens:
  1. Calculate Shares     ```
     recipients = get_recipients(outcome)
     share = amount / recipients.length     ```

  2. Process Transfers     ```
     solana: {
       IF approved:
         transfer_to_thread(amount)
       ELIF denied:
         distribute_to_deniers(amount)
       ELSE:
         return_to_treasury(amount)
     }     ```

  3. Update States     ```
     backend: record_distribution()
     frontend: update_balances()     ```

## 5. Divestment

SEQUENCE process_divestment:
  1. Calculate Share     ```
     thread_balance = get_thread_balance()
     co_author_count = get_co_author_count()
     share = thread_balance / (co_author_count - 1)     ```

  2. Process Transfer     ```
     solana: {
       transfer_from_thread(share, author)
       remove_co_author(author)
       update_thread_state()
     }     ```

  3. Update States     ```
     qdrant: update_metadata()
     backend: notify_co_authors()
     frontend: update_ui()     ```

## State Verification

FUNCTION verify_state_consistency():  ```
  solana_state = get_solana_state(thread_id)
  qdrant_state = get_qdrant_state(thread_id)

  VERIFY:
    solana_state.co_authors = qdrant_state.metadata.co_authors
    solana_state.content_hashes ⊆ qdrant_state.content_hashes
    solana_state.token_balance = sum(all_distributions) - sum(all_divested)  ```

## Error Recovery

SEQUENCE handle_inconsistency:
  1. Detect Issue     ```
     diff = compare_states(solana, qdrant)     ```

  2. Resolve Conflict     ```
     MATCH diff:
       HashMismatch -> recompute_hash()
       OwnershipMismatch -> use_solana_state()
       TokenMismatch -> audit_transfers()     ```

  3. Repair State     ```
     reconcile_states()
     verify_consistency()
     notify_monitoring()     ```
