# Message Lifecycle in Choir

VERSION message_system:
invariants: {
"Message immutability after approval",
"Unanimous approval requirement",
"Token stake conservation"
}
assumptions: {
"7-day approval window",
"Single-phase submission",
"Linear state transitions"
}
docs_version: "0.2.0"

## Message States

1. **Message Types**

   TYPE MessageState =
   | Draft // Being composed
   | Submitted // Sent to system
   | Pending // Awaiting approval
   | Published // Approved and visible
   | Rejected // Denied by co-authors
   | Expired // Past approval window

2. **Content States**

   TYPE ContentState = {
   content: String,
   hash: Hash,
   embedding: Vector,
   metadata: MessageMetadata,
   privacy: PrivacyLevel
   }

## Lifecycle Phases

1. **Message Creation**

   SEQUENCE create_message:

   1. User composes content
   2. Frontend generates content hash
   3. Backend creates embedding
   4. System checks author status:
      - Co-author -> Direct submission
      - Non-co-author -> Spec submission

2. **Submission Flow**

   SEQUENCE submit_message:
   IF author IN thread.co_authors:
   store_content(qdrant)
   record_hash(solana)
   notify_co_authors()
   ELSE:
   verify_stake()
   create_spec()
   start_approval_timer()

3. **Approval Process**

   SEQUENCE process_approval:
   collect_votes(7_days)
   IF votes.all(approved):
   publish_message()
   add_co_author()
   distribute_tokens_to_thread()
   ELIF votes.any(denied):
   reject_message()
   distribute_tokens_to_deniers()
   ELSE:
   expire_message()
   return_tokens_to_treasury()

## State Transitions

1.  **Valid Transitions** `Draft -> Submitted
Submitted -> Pending
Pending -> Published | Rejected | Expired  `

2.  **Transition Guards**

    FUNCTION validate_transition(from: MessageState, to: MessageState) -> Bool:
    MATCH (from, to):
    (Draft, Submitted) ->
    validate_content() AND
    verify_author()

        (Submitted, Pending) ->
          verify_stake() AND
          check_thread_capacity()

        (Pending, Published) ->
          verify_all_approved() AND
          within_time_window()

## Content Management

1. **Storage Strategy**

   FUNCTION store_message(content: Content):
   hash = generate_hash(content)
   embedding = generate_embedding(content)

   PARALLEL:
   store_in_qdrant(content, embedding)
   record_on_solana(hash)

2. **Privacy Controls**

   FUNCTION apply_privacy(message: Message, level: PrivacyLevel):
   MATCH level:
   Public ->
   index_for_search()
   Premium ->
   restrict_search_access()
   ThreadOnly ->
   restrict_to_co_authors()

## Error Handling

1. **Failure Modes**

   TYPE MessageError =
   | ContentTooLarge
   | InvalidStake
   | ThreadFull
   | ApprovalTimeout
   | StateConflict

2. **Recovery Actions**

   FUNCTION handle_error(error: MessageError):
   MATCH error:
   ContentTooLarge ->
   notify_size_limit()
   InvalidStake ->
   return_stake()
   ThreadFull ->
   suggest_new_thread()
   ApprovalTimeout ->
   expire_and_refund()

## Event Emissions

1. **Message Events**

   TYPE MessageEvent =
   | MessageCreated(content_hash, author)
   | SpecSubmitted(content_hash, stake)
   | ApprovalReceived(co_author, decision)
   | MessagePublished(content_hash)
   | MessageRejected(content_hash)

2. **Event Handling**

   FUNCTION process_event(event: MessageEvent):
   update_state(event)
   notify_subscribers(event)
   update_indices(event)
   emit_websocket_update(event)

## Performance Considerations

1. **Optimizations**

   - Batch similar operations
   - Cache frequent queries
   - Compress content when possible
   - Use efficient indices

2. **Monitoring Points**
   - Message processing time
   - Approval response time
   - Storage efficiency
   - State transition success rate
