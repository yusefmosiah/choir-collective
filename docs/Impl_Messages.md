# Message Lifecycle in Choir

VERSION message_system:
invariants: {
"Message immutability after approval",
"Public message approval consensus",
"Value conservation"
}
assumptions: {
"7-day approval window",
"Stake dynamics",
"State transitions"
}
implementation: "0.1.0"

## Message States

1. **Message Types**

   TYPE MessageState =
   | Draft        // Being composed
   | Submitted    // Sent to system
   | Private      // Visible to co-authors
   | Pending      // Awaiting public approval
   | Public       // Approved and public
   | Rejected     // Public visibility denied
   | Expired      // Past approval window

2. **Content States**

   TYPE ContentState = {
   content: String,
   hash: Hash,
   embedding: Vector,
   metadata: MessageMetadata,
   visibility: Visibility,
   temperature_effect: Option<TempEffect>
   }

## Lifecycle Phases

1. **Message Creation**

   SEQUENCE create_message:

   1. User composes content
   2. Frontend generates content hash
   3. Backend creates embedding
   4. System checks author status:
      - Co-author -> Private message
      - Non-co-author -> Spec submission

2. **Submission Flow**

   SEQUENCE submit_message:
   IF author IN thread.co_authors:
   store_content(qdrant)
   record_hash(solana)
   IF public_requested:
   initiate_approval_process()
   ELSE:
   mark_private()
   ELSE:
   recommended_stake = calculate_stake_requirement(thread)
   actual_stake = get_user_stake_amount()
   create_spec(actual_stake)
   start_approval_timer()

3. **Approval Process**

   SEQUENCE process_approval:
   collect_votes(7_days)

   // All approve
   IF votes.all(approved):
   make_public()
   add_co_author()
   distribute_stake_to_approvers()
   update_thread_temperature(cooling)
   update_thread_frequency(increase)

   // Mixed decisions
   ELIF votes.mixed():
   reject_public()
   send_approver_stakes_to_treasury()
   update_thread_temperature(neutral)
   update_thread_frequency(neutral)

   // All reject
   ELIF votes.all(denied):
   reject_public()
   distribute_stake_to_deniers()
   update_thread_temperature(heating)
   update_thread_frequency(decrease)

   // Timeout
   ELSE:
   expire_approval()
   return_stakes_to_treasury()

## State Transitions

1.  **Valid Transitions** `Draft -> Submitted
Submitted -> Private | Pending
Private -> Pending (public request)
Pending -> Public | Rejected | Expired  `

2.  **Transition Guards**

    FUNCTION validate_transition(from: MessageState, to: MessageState) -> Bool:
    MATCH (from, to):
    (Draft, Submitted) ->
    validate_content() AND
    verify_author()

        (Submitted, Private) ->
          verify_co_author()

        (Submitted, Pending) ->
          verify_stake() AND
          check_thread_capacity()

        (Private, Pending) ->
          verify_co_author() AND
          verify_public_request()

        (Pending, Public) ->
          verify_unanimous_approval() AND
          within_time_window()

## Temperature Effects

1. **State Impact**
   ```typescript
   TYPE TempEffect = {
     rejection: {
       temp: Increase,    // E/N rises
       freq: Unchanged    // No new coupling
     },
     approval: {
       temp: Decrease,    // New N, energy out
       freq: Increase     // New coupling
     },
     split: {
       temp: Unchanged,   // Energy to Treasury
       freq: Unchanged    // No new coupling
     }
   }
   ```

2. **Analytics**
   ```typescript
   TYPE StakeAnalytics = {
     recommended: TokenAmount,  // From quantum formula
     actual: TokenAmount,       // User choice
     ratio: Float,             // actual/recommended
     success_rate: Float       // Historical approvals
   }
   ```

## Error Handling

1. **Failure Modes**
   ```typescript
   TYPE MessageError =
     | ContentTooLarge
     | StakeTooLow
     | ThreadFull
     | ApprovalTimeout
     | StateConflict
     | TemperatureError
   ```

2. **Recovery Actions**
   ```typescript
   FUNCTION handle_error(error: MessageError):
     MATCH error:
       ContentTooLarge -> notify_size_limit()
       StakeTooLow -> suggest_minimum()
       ThreadFull -> suggest_new_thread()
       ApprovalTimeout -> expire_and_refund()
       TemperatureError -> recalculate_thread_state()
   ```

## Event Emissions

1. **Message Events**
   ```typescript
   TYPE MessageEvent =
     | MessageCreated(content_hash, author)
     | MessagePrivate(content_hash)
     | SpecSubmitted(content_hash, stake)
     | ApprovalReceived(co_author, decision)
     | MessagePublic(content_hash)
     | MessageRejected(content_hash)
     | TemperatureChanged(thread_id, delta)
     | FrequencyChanged(thread_id, delta)
   ```

2. **Event Handling**
   ```typescript
   FUNCTION process_event(event: MessageEvent):
     update_state(event)
     notify_subscribers(event)
     update_indices(event)
     update_analytics(event)
     emit_websocket_update(event)
   ```

## Performance Considerations

1. **Optimizations**
   - Batch similar operations
   - Cache temperature calculations
   - Compress content when possible
   - Use efficient indices

2. **Monitoring Points**
   - Message processing time
   - Approval response time
   - Temperature evolution
   - Stake ratio analytics
