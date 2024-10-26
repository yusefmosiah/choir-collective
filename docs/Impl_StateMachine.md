# Choir State Machine

VERSION state_machine:
  invariants: {
    "State transition atomicity",
    "Ownership state consistency",
    "Content state integrity"
  }
  assumptions: {
    "Dual-state architecture",
    "Event ordering",
    "Cache strategies"
  }
  implementation: "0.1.0"

## State Types

1. **System State**

   TYPE SystemState = {
     threads: Map<ThreadId, Thread>,
     token_supply: TokenAmount,
     treasury_balance: TokenAmount
   }

2. **Thread State**

   TYPE ThreadState = {
     thread: Thread,
     pending_specs: Map<Hash, SpecRequest>,
     pending_approvals: Map<Hash, Set<Approval>>
   }

## State Transitions

ASSUMPTION transition_model:
  "Two-phase state updates"
  "May introduce batching"
  "Must maintain consistency"

1. **Thread Lifecycle**

   TRANSITION create_thread:
     PRE:
       treasury_balance >= THREAD_CREATION_COST
       NOT threads.contains(thread_id)

     ACTION:
       // Solana State
       thread = new Thread{
         id: thread_id,
         co_authors: Set[creator],
         token_balance: 0
       }
       threads.insert(thread_id, thread)

       // Qdrant State
       create_collection(thread_id)

     POST:
       threads.contains(thread_id)
       thread.co_authors.size == 1
       INVARIANT token_conservation

2. **Message Submission**

   TRANSITION submit_message:
     PRE:
       // Solana Checks
       thread = threads.get(thread_id)
       author_balance >= stake_amount

       // Qdrant Checks
       content_valid(message)
       embedding_generated(message)

     ACTION:
       // Qdrant First
       store_content(message, embedding)
       content_hash = hash(message)

       // Then Solana
       record_hash(content_hash)
       update_thread_state()

     POST:
       content_stored(message)
       hash_recorded(content_hash)
       INVARIANT state_consistency

3. **Approval Processing**

   TRANSITION process_approval:
     PRE:
       thread = threads.get(thread_id)
       co_author IN thread.co_authors
       NOT already_voted(co_author, hash)

     ACTION:
       // Solana First
       record_approval(co_author, hash)
       update_token_state()

       // Then Qdrant
       update_content_status(hash)

     POST:
       approval_recorded(co_author, hash)
       tokens_distributed()
       INVARIANT token_conservation

## State Verification

1. **Consistency Checks**

   FUNCTION verify_state(thread: Thread) -> Bool:
     solana_state = get_solana_state(thread.id)
     qdrant_state = get_qdrant_state(thread.id)

     VERIFY:
       solana_state.hashes ⊆ qdrant_state.content_hashes
       solana_state.co_authors = qdrant_state.metadata.co_authors
       solana_state.token_balance >= 0

2. **Recovery Procedures**

   FUNCTION recover_state(thread: Thread):
     source = get_solana_state(thread.id)  // Source of truth
     rebuild_derived_state(source)
     verify_state(thread)

## Error States

TYPE StateError =
  | ThreadNotFound
  | InvalidTransition
  | InconsistentState
  | TokenConservationViolation
  | ApprovalViolation
  | ExpirationViolation

FUNCTION handle_error(error: StateError) -> Recovery:
  MATCH error:
    InconsistentState -> reconcile_state()
    TokenConservationViolation -> halt_and_report()
    _ -> log_and_retry()

## Performance Optimizations

1. **Batching**

   FUNCTION batch_transitions(transitions: List<Transition>):
     group = group_by_thread(transitions)
     order = topological_sort(group)

     FOR batch IN order:
       execute_batch(batch)
       verify_state()

2. **Caching**

   FUNCTION cache_state(thread: Thread):
     hot_state = compute_hot_state(thread)
     cache_duration = compute_cache_ttl(thread)

     cache.store(thread.id, hot_state, cache_duration)
