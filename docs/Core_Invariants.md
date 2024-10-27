# Choir Core Invariants

VERSION core_system:
invariants: {
"System-wide state consistency",
"Economic conservation laws",
"Security boundaries"
}
assumptions: {
"Invariant verification methods",
"Recovery procedures",
"Monitoring approaches"
}
docs_version: "0.2.0"

## System Invariants

ASSUMPTION invariant_checking:
"Real-time invariant verification"
"May introduce async verification"
"Must catch all violations"

1. **Thread Ownership**

   - A thread MUST always have at least one co-author
   - Co-authors MUST be unique within a thread
   - Only co-authors MAY approve or deny specs
   - Thread token balance MUST equal sum of all successful stakes minus distributions

2. **Message Integrity**

   - Each message MUST have a unique content hash
   - Content hash on Solana MUST match content hash in Qdrant
   - Message author MUST be either co-author or spec submitter
   - Message timestamp MUST be after thread creation time

3. **Token Economics**
   - Total token supply MUST remain constant (10 billion)
   - Thread token balance MUST never be negative
   - Stake amount MUST meet minimum requirement
   - Token distributions MUST be atomic and complete

## State Transition Rules

ASSUMPTION state_transitions:
"Synchronous transition verification"
"May introduce batched transitions"
"Must maintain atomicity"

1. **Thread Creation**
   INVARIANT create_thread(creator) -> thread:

   - thread.co_authors = [creator]
   - thread.token_balance = 0
   - thread.created_at <= now()
   - EMITS ThreadCreated

2. **Spec Submission**
   INVARIANT submit_spec(author, thread, stake) -> spec:

   - author NOT IN thread.co_authors
   - stake >= MINIMUM_STAKE
   - spec.expires_at = now() + 7 days
   - EMITS SpecSubmitted

3. **Approval Processing**
   INVARIANT process_approval(co_author, spec, decision) -> result:

   - co_author IN thread.co_authors
   - spec.expires_at > now()
   - NOT already_voted(co_author, spec)
   - EMITS ApprovalProcessed

4. **Token Distribution**
   INVARIANT distribute_tokens(thread, recipients, amount):
   - amount <= thread.token_balance
   - recipients.all IN thread.co_authors
   - sum(distributions) = amount
   - EMITS TokensDistributed

## Security Properties

ASSUMPTION security_verification:
"Continuous security property verification"
"May introduce formal verification"
"Must catch all violations immediately"

1. **Access Control**

   - Only co-authors MAY modify thread state
   - Only spec author MAY cancel unexpired spec
   - Only Choir Treasury MAY mint tokens
   - Only thread PDA MAY hold thread tokens

2. **Temporal Constraints**

   - Specs MUST be processed within 7 days
   - Approvals MUST be processed in order
   - State updates MUST be atomic
   - Events MUST be ordered

3. **Economic Security**
   - Stake MUST be locked until decision
   - Divestment MUST be proportional
   - Rejecting co-authors MUST split stakes equally
   - Treasury MUST recapture split decision tokens

## Data Integrity

ASSUMPTION data_verification:
"Hash-based integrity verification"
"May introduce additional verification methods"
"Must maintain perfect accuracy"

1. **Content Storage**

   - Message content MUST be stored in Qdrant
   - Content hash MUST be stored on Solana
   - Premium user content MAY be unsearchable
   - Content MUST be immutable once approved

2. **State Consistency**
   - Solana state MUST be source of truth for ownership
   - Qdrant state MUST be source of truth for content
   - State transitions MUST be reversible
   - State MUST be recoverable from events

## Implementation Notes

NOTE verification_implementation:
"Current implementation uses direct checking"
"May introduce automated verification"
"Must maintain real-time guarantees"

NOTE recovery_procedures:
"Current recovery uses checkpointing"
"May introduce continuous backup"
"Must guarantee complete recovery"
