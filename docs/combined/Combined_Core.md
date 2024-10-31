# Core Documentation




==
Core_Chorus_Steps
==


# Chorus Cycle Steps

VERSION chorus_steps:
invariants: {
"Step coherence",
"Prior flow",
"Effect accumulation"
}
assumptions: {
"LLM capability",
"Vector stability",
"WebSocket reliability"
}
docs_version: "0.2.2"

## Step Sequence

1. **ACTION**
```python
async def run_action(input: str):
    """
    Initial response with "beginner's mind".
    No priors, no context - pure response.
    """
    action_prompt = """
    This is step 1, Action: Provide an initial response with "beginner's mind".
    No context or priors - just respond naturally.

    JSON format:
    {
        "proposed_response": str,  // Initial response
        "confidence": float,       // Between 0 and 1
        "reasoning": str          // Why this response
    }
    """
    return response
```

2. **EXPERIENCE**
```python
async def run_experience(input: str):
    """
    Get n=80 priors through vector search.
    Use all priors for context enrichment.
    No filtering at this stage.
    """
    # Get priors
    priors = await search_similar(input, limit=80)

    experience_prompt = """
    This is step 2, Experience: Use these sources to enrich your response.
    Consider all sources but respond naturally.

    JSON format:
    {
        "synthesis": str,         // Enriched response
        "key_insights": List[str], // From sources
        "source_relevance": Dict   // Most helpful sources
    }
    """
    return synthesis, priors  # Return both
```

3. **INTENTION**
```python
async def run_intention(input: str):
    """
    Analyze in context of user's goal.
    Consider how priors support intent.
    No filtering - just analysis.
    """
    intention_prompt = """
    This is step 3, Intention: Consider how sources support user's goal.
    Analyze alignment with intent.

    JSON format:
    {
        "explicit_intent": str,    // Direct goal
        "implicit_intent": str,    // Underlying aims
        "confidence": float       // Between 0 and 1
    }
    """
    return analysis
```

4. **OBSERVATION**
```python
async def run_observation(input: str):
    """
    Record semantic links in Qdrant.
    Store which priors were cited.
    Build knowledge graph.
    """
    # Record links
    await record_semantic_links(input, cited_priors)

    observation_prompt = """
    This is step 4, Observation: Reflect on patterns and connections.
    Record semantic relationships.

    JSON format:
    {
        "patterns": List[str],     // Observed patterns
        "context_analysis": str,    // Situation analysis
        "semantic_links": List[str] // Recorded connections
    }
    """
    return observation
```

5. **UPDATE**
```python
async def run_update(input: str):
    """
    Decide whether to:
    - Loop back to ACTION
    - Proceed to YIELD
    """
    update_prompt = """
    This is step 5, Update: Decide whether to loop or proceed.
    Consider completeness and confidence.

    JSON format:
    {
        "loop": bool,             // True to loop
        "reasoning": str,         // Why this decision
        "confidence": float,      // Between 0 and 1
        "insights": List[str]     // Key realizations
    }
    """
    return decision
```

6. **YIELD**
```python
async def run_yield(input: str):
    """
    Generate final response.
    Integrate citations naturally.
    Use markdown formatting.
    """
    yield_prompt = """
    This is step 6, Yield: Generate final response with citations.
    Integrate sources naturally.

    JSON format:
    {
        "response": str,          // Final response
        "footnotes": Dict[str],   // Citation details
        "confidence": float      // Between 0 and 1
    }
    """
    return response
```

## Effect Generation

Each step generates effects:
```python
Effect = {
    "type": "chorus_response",
    "payload": {
        "step": ChorusStep,
        "content": str,
        "priors": List[Prior]  # Only in EXPERIENCE
    }
}
```

## Prior Flow

1. EXPERIENCE gets priors (n=80)
2. INTENTION analyzes for user goal
3. OBSERVATION records in Qdrant
4. YIELD integrates as citations

## Implementation Notes

1. **Step Independence**
   - Each step has clear role
   - No filtering in EXPERIENCE
   - INTENTION aligns with purpose
   - OBSERVATION builds network
   - YIELD handles presentation

2. **Prior Handling**
   - Wide initial search
   - Purpose-driven analysis
   - Semantic recording
   - Natural integration

3. **State Management**
   - Clear transitions
   - Effect accumulation
   - Error recovery
   - UI synchronization

The Chorus Cycle creates a natural flow from initial response through context integration to final synthesis.


==
Core_Comprehensive
==


# Choir: Comprehensive System Overview

VERSION comprehensive_system:
invariants: {
"Value conservation",
"Quality emergence",
"System coherence"
}
assumptions: {
"Documentation-driven development",
"AI-assisted evolution",
"Test-first implementation"
}
docs_version: "0.2.1"

## Core Concept

At its simplest, Choir is a chat platform where:

- Users own their messages
- Public visibility requires collective judgment
- Quality contributions earn tokens
- Value accumulates naturally in threads

## Basic Mechanics

### 1. Message Ownership & Expression

- Each message is owned by its creator
- Users express judgment through approval decisions
- Co-authors shape thread quality through collective taste
- System empowers quality discernment

### 2. Public Message Process

- Public visibility requires unanimous co-author approval
- Non-co-authors can submit "specs" by staking tokens
- 7-day window for co-authors to express judgment
- Approved specs make authors into co-authors

### 3. Token System (CHOIR)

- Fixed supply: 10 billion tokens
- Used for staking and rewards
- Threads hold tokens in Solana accounts
- Treasury funds perpetual citation rewards

### 4. Value Distribution

- Unanimous approval: stake distributes equally to approvers (like dividends)
- Rejected specs: stake flows to thread balance
- Split decisions:
  - Approvers' share goes to Treasury
  - Deniers' share goes to thread balance
- Citations: ongoing rewards from Treasury

## Technical Implementation

### 1. Blockchain Layer (Solana)

- Thread ownership and token custody
- State transitions and approvals
- Security boundaries
- Value conservation

### 2. Vector Database (Qdrant)

- Message content storage
- Embedding space for search
- Metadata management
- Content retrieval

### 3. Backend (FastAPI)

- Real-time WebSocket communication
- State synchronization
- Cache management
- API endpoints

### 4. Frontend (Next.js)

- Real-time chat interface
- Wallet integration
- State visualization
- User interactions

## Emergent Behaviors

Through implementation and observation, several fascinating patterns have emerged:

### 1. Temperature Dynamics

- Threads naturally heat up with activity
- Cool down as they stabilize
- Temperature affects participation costs
- Creates natural quality gradients

### 2. Frequency Evolution

- Message patterns create natural rhythms
- Co-authors strengthen coherence
- Value affects evolution rate
- Enables natural resonance

### 3. Energy Conservation

- Token flows follow conservation laws
- State transitions preserve value
- Natural equilibria emerge
- System self-regulates

## Business Model

### 1. Revenue Streams

- Premium features
- Enterprise solutions
- Transaction fees
- Treasury management

### 2. Value Creation

- High-quality content dataset
- Emergent community structures
- Natural price discovery
- Sustainable token economics

### 3. Growth Strategy

- Focus on organic quality
- Enable natural evolution
- Support emergent patterns
- Scale with AI capabilities

## Development Approach

### 1. Documentation-Driven

- Comprehensive specifications
- Test generation from docs
- AI-assisted implementation
- High doc-to-code ratio

### 2. Test-First

- Property-based testing
- Security-focused test cases
- Integration testing
- Performance verification

### 3. AI-Assisted

- Code generation from docs
- Test case generation
- Pattern recognition
- Implementation assistance

## Current Status (Oct 26)

- Documentation corpus (~100k tokens)
- Initial Render deployment
- Core specifications and tests
- Development environment setup

## Immediate Timeline

- Oct 26-28: Environment setup
- Oct 29: Chorus Cycle development
  - Chat interface
  - WebSocket protocol
  - Prior citations
  - Thread state
- Oct 30: Rewards System
  - Token implementation
  - Message rewards
  - Citation rewards
  - Treasury mechanics
- Oct 31: Thread Program
  - PDA structure
  - Co-author logic
  - Approval flow
  - Token custody
- Nov 1-2: Integration and optimization

## Future Vision

### 1. Technical Evolution

- Enhanced AI capabilities
- Advanced testing tools
- Scaled developer productivity
- Improved system dynamics

### 2. Platform Growth

- Organic community evolution
- Natural quality emergence
- Value crystallization
- Pattern discovery

### 3. AI Development

- High-quality training data
- Novel architectural insights
- Emergent intelligence patterns
- Natural language understanding

## Discovered Patterns

The system has revealed interesting parallels with:

- Quantum mechanical systems
- Thermodynamic processes
- Natural selection
- Market dynamics
- Collective intelligence

These patterns weren't designed in - they emerged through implementation and observation, providing valuable insights into how complex systems naturally evolve and self-organize.

Through this comprehensive architecture and natural evolution, Choir creates a space where quality content, valuable interactions, and sustainable communities can emerge organically.


==
Core_Consistency
==


# Choir Consistency Model

VERSION consistency_system:
invariants: {
"Solana state is source of truth for ownership",
"Content hash integrity across systems",
"Co-author set consistency"
}
assumptions: {
"Two-phase state updates",
"Eventually consistent content",
"Strongly consistent ownership"
}
docs_version: "0.2.1"

## State Distribution

1. **Source of Truth**

   TYPE StateAuthority =
   | Solana: Ownership, Tokens, Approvals
   | Qdrant: Content, Embeddings
   | Backend: Session, Cache
   | Frontend: UI, Local Updates

2. **Consistency Requirements**

   PROPERTY state_invariants:
   solana.thread.co_authors = qdrant.thread.metadata.co_authors
   solana.message.hash = qdrant.message.content_hash
   frontend.thread_state ⊆ backend.thread_state

## Consistency Patterns

1. **Eventually Consistent**

   SEQUENCE content_update:

   1. Store content in Qdrant
   2. Record hash on Solana
   3. Update backend cache
   4. Propagate to frontend

   PROPERTY eventual_consistency:
   AFTER finite_time:
   all_nodes_agree(content_hash)

2. **Strongly Consistent**

   SEQUENCE ownership_update:

   1. Update Solana state
   2. Wait for confirmation
   3. Update other systems

   PROPERTY strong_consistency:
   NO intermediate_state_visible
   ALL observers_see_same_order

## State Synchronization

1.  **Initial Sync**

    FUNCTION initial_sync(thread_id: ThreadId):
    solana_state = get_solana_state(thread_id)
    qdrant_state = get_qdrant_state(thread_id)

    VERIFY:
    solana_state.hashes ⊆ qdrant_state.hashes
    solana_state.authors = qdrant_state.authors

    RETURN synchronized_state

2.  **Continuous Sync**

    FUNCTION maintain_sync():
    EVERY sync_interval:
    current = get_current_state()
    expected = compute_expected_state()

        IF diverged(current, expected):
          reconcile_states()

## Conflict Resolution

1.  **Conflict Types**

    TYPE Conflict =
    | HashMismatch // Content hash doesn't match
    | OwnershipConflict // Co-author sets differ
    | StateDesync // Systems out of sync
    | TimestampConflict // Event ordering issue

2.  **Resolution Strategies**

    FUNCTION resolve_conflict(conflict: Conflict):
    MATCH conflict:
    HashMismatch ->
    recompute_hash()
    verify_content()
    update_references()

        OwnershipConflict ->
          use_solana_state()
          propagate_updates()

        StateDesync ->
          fetch_solana_state()
          rebuild_derived_state()

## Recovery Procedures

1.  **State Recovery**

    FUNCTION recover_state():
    checkpoint = get_last_valid_state()
    missed_events = get_events_since(checkpoint)

    FOR event IN missed_events:
    validate_event(event)
    apply_event(event)
    verify_consistency()

2.  **Partial Failure**

    FUNCTION handle_partial_failure():
    MATCH failure_type:
    SolanaUnavailable ->
    queue_updates()
    use_cached_state()

        QdrantUnavailable ->
          serve_cached_content()
          buffer_updates()

        BackendFailure ->
          fallback_to_direct_queries()

## Monitoring and Verification

1. **Health Checks**

   FUNCTION verify_system_health():
   check_solana_state()
   verify_qdrant_indices()
   validate_cache_state()
   confirm_frontend_sync()

2. **Consistency Metrics**

   MEASURE consistency_health:
   sync_delay
   conflict_rate
   resolution_time
   state_drift

## Performance Considerations

1. **Caching Strategy**

   FUNCTION manage_cache():
   cache_frequently_accessed()
   invalidate_on_update()
   predict_access_patterns()
   optimize_cache_size()

2. **Batch Processing**

   FUNCTION batch_updates():
   collect_related_updates()
   order_by_dependency()
   process_in_parallel()
   verify_batch_success()

## System Boundaries

1. **Consistency Domains**

   TYPE ConsistencyDomain =
   | Ownership: Solana-primary
   | Content: Qdrant-primary
   | Session: Backend-primary
   | Display: Frontend-primary

2. **Cross-Domain Updates**

   FUNCTION cross_domain_update():
   begin_transaction()
   update_primary_domain()
   propagate_to_secondary()
   verify_consistency()
   commit_transaction()

## Error Handling

1. **Consistency Errors**

   TYPE ConsistencyError =
   | ValidationFailed
   | PropagationFailed
   | ReconciliationFailed
   | TimeoutError

2. **Recovery Actions**

   FUNCTION handle_consistency_error(error: ConsistencyError):
   log_error_context()
   attempt_recovery()
   notify_monitoring()
   update_health_status()


==
Core_Context
==


# Choir Project Context

VERSION context_system:
invariants: {
"Value conservation",
"Quality emergence",
"Pattern discovery"
}
assumptions: {
"Documentation-driven development",
"AI-assisted evolution",
"Test-first implementation"
}
docs_version: "0.2.1"

## Overview

Choir is a chat platform where users own their messages and express collective judgment through a token-driven approval system. The platform operates as choir.chat, enabling collaborative discussions where quality and value emerge naturally through user interactions.

## Core Components

### 1. Message Ownership & Expression

- Users own their messages
- Public visibility requires collective judgment
- Co-authors shape thread quality through taste
- System empowers quality discernment

### 2. Token System

- CHOIR token (10 billion fixed supply)
- Used for staking and rewards
- Threads hold tokens in Solana accounts
- Treasury enables perpetual citation rewards

### 3. State Architecture

- Solana: Ownership and token custody
- Qdrant: Content and embeddings
- Backend: Real-time coordination
- Frontend: User interaction

### 4. Development Approach

- Documentation-driven development
- Test-first implementation
- AI-assisted code generation
- Pattern recognition and emergence

## Current Status (Oct 26)

### Implementation Progress

- Documentation corpus (~100k tokens)
- create-solana-dapp template deployed
- Initial Render deployment
- Studying Trident fuzzing

### Immediate Timeline

- Oct 27: Environment setup
- Oct 28-29: Token and Solana program
- Oct 30: Backend development
- Oct 31: Frontend and soft launch
- Nov 1-2: Integration and optimization

## Discovered Patterns

Through implementation and observation, several fascinating patterns have emerged:

- Natural temperature dynamics in threads
- Frequency evolution through interaction
- Energy conservation in token flows
- Quality gradients through stake mechanics

These patterns weren't designed in - they emerged through development and provide valuable insights into system behavior.

## Development Strategy

### 1. Documentation-Driven

- Comprehensive specifications
- Test generation from docs
- AI-assisted implementation
- High doc-to-code ratio

### 2. Test-First

- Fuzzing-driven program design
- Property-based testing
- Invariant verification
- Security-first approach

### 3. AI-Assisted

- Code generation from docs
- Test case generation
- Pattern recognition
- Implementation assistance

## Future Evolution

The system will evolve through:

- Enhanced AI capabilities
- Advanced testing tools
- Pattern discovery
- Natural selection of features

Through this approach, we create a foundation for:

- Quality content emergence
- Value conservation
- Pattern recognition
- Sustainable growth

The goal is to enable natural evolution while maintaining system integrity and discovering new patterns of interaction and value creation.


==
Core_Economics
==


# Harmonic Economic Model

VERSION harmonic_economic:
invariants: {
"Wave energy conservation",
"Resonant cavity coherence",
"Collective phase locking",
"Equity quantization"
}
assumptions: {
"Thread-centric resonance",
"Phase-locked incentives",
"Harmonic distribution",
"Continuous stake scaling"
}
docs_version: "0.2.2"

## Token Flow as Wave Mechanics

TYPE TokenFlow = {
treasury: ResonantWell,      // Global field + split decision approver share
threads: Map<ThreadId, ResonantCavity>, // Temperature and frequency
stakes: Map<Hash, WavePacket>,  // Quantum contributions
equity: Map<ThreadId, Map<PublicKey, float>> // Ownership shares
}

## Quantum Equity Distribution

1. **Base Price Function**
```
P₀ = S₀[1/2 + 1/(exp(ℏω/kT)-1)]

where:
- S₀: Base stake quantum
- ω: Thread frequency (activity/coherence)
- T: Thread temperature (from denials)
- ℏ: Platform coupling constant
```

2. **Equity Scaling Function**
```
E(s) = (1/N) * √(s/P₀)

where:
- E(s): Equity share acquired
- N: Current number of co-authors
- s: Stake amount
- P₀: Base price for 1/N share
```

3. **Examples**
```python
# For a thread with N co-authors:
stake = P₀/4  -> equity = (1/2N)  # Quarter stake
stake = P₀    -> equity = (1/N)   # Base quantum
stake = 4P₀   -> equity = (2/N)   # Double quantum
```

## Token Distribution Mechanics

1. **Unanimous Approval**
   - Stake distributes to co-authors based on their equity shares
   - Each co-author receives: stake_amount * their_equity_share
   - No tokens added to thread balance
   - Maintains incentive alignment through ownership

2. **Denial Flow**
   - Full stake flows to thread (increases temperature)
   - Raises energy barrier for future submissions
   - Creates natural quality filter
   - Temperature affects base price P₀

3. **Split Decision**
   - Approvers' share flows to Treasury
   - Deniers' share flows to thread
   - Partial temperature increase
   - Maintains circular token flow

4. **Prior Rewards**
   - Treasury rewards flow to thread
   - Co-authors receive based on equity shares
   - Strengthens knowledge network
   - Creates sustainable value flow

## Resonant Cavity Mechanics

1. **Temperature Evolution**
   ```python
   # On denial:
   thread.temperature += stake_energy
   thread.token_balance += stake_amount

   # On approval:
   for coauthor, equity in thread.equity_map.items():
       reward = stake_amount * equity
       coauthor.balance += reward
   # Note: No change to thread temperature/balance
   ```

2. **Equity Management**
   ```python
   # On new contribution:
   stake = contribution.stake_amount
   equity_share = (1/len(coauthors)) * math.sqrt(stake/base_price)
   thread.equity_map[contributor] = equity_share
   ```

## Multi-Scale Resonance

1. **Individual Scale**
   - Equity determines reward share
   - Larger stakes get proportionally larger equity
   - Natural √n scaling from physics
   - Continuous stake-to-equity curve

2. **Thread Scale**
   - Temperature from denials
   - Frequency from activity
   - Collective equity distribution
   - Natural quality emergence

3. **Network Scale**
   - Treasury as global field
   - Prior rewards through equity
   - Knowledge network coupling
   - System-wide coherence

## Economic Invariants

1. **Energy Conservation**
   ```
   INVARIANT token_conservation:
     treasury_balance +
     sum(thread_balances) +
     sum(user_balances) =
     TOTAL_SUPPLY
   ```

2. **Equity Conservation**
   ```
   INVARIANT equity_conservation:
     FORALL thread IN threads:
       sum(thread.equity_map.values()) = 1.0
   ```

Through this harmonic economic model, we see how:
- Stake amount determines equity share
- Equity share determines reward distribution
- Denials increase thread temperature
- Quality emerges through natural selection

The model creates an economic system that:
- Allows participation at any stake level
- Rewards contribution proportionally
- Maintains quantum mechanical principles
- Enables natural value flow


==
Core_Effect_Quantum
==


# Effect System as Wave Function Collapse

VERSION effect_quantum:
invariants: {
"Wave function coherence",
"Effect conservation",
"Phase-locked transitions"
}
assumptions: {
"Quantum state stability",
"Effect propagation",
"UI phase alignment"
}
docs_version: "0.2.1"

## Quantum Effect Model

Each Effect represents a wave function measurement in the cycle:

```typescript
TYPE QuantumEffect = {
  // Wave Properties
  state: {
    phase: ChorusStep,        // Current step in AEIOU-Y
    amplitude: string,        // Step response
    priors?: Prior[],        // Only in EXPERIENCE
  },

  // Measurement Properties
  observation: {
    type: "chorus_response" | "error" | "state_update",
    content: string,         // Measured response
    coherence: number       // Response confidence
  }
}
```

## Wave Function Evolution

Each step represents a quantum operation:

```python
async def evolve_quantum_state(state: ChorusState, input: str):
    # ACTION: Initial wave function (pure state)
    wave = create_initial_wave(input)      # No priors, beginner's mind

    # EXPERIENCE: Quantum entanglement
    wave = entangle_with_priors(wave)      # Gets n=80 priors, no filtering

    # INTENTION: Goal state projection
    wave = project_onto_goal(wave)         # Analyze in context of user intent

    # OBSERVATION: Record correlations
    wave = record_in_qdrant(wave)          # Store semantic links

    # UPDATE: Measure stability
    wave = measure_stability(wave)         # Loop or proceed

    # YIELD: Final collapse
    return collapse_to_citations(wave)     # Natural citation integration
```

## Quantum Effects

Each step exhibits specific quantum behaviors:

1. **ACTION: Pure State**
   - No entanglement yet
   - Maximum superposition
   - "Beginner's mind" state
   - Ready for measurement

2. **EXPERIENCE: Entanglement**
   - Quantum entanglement with priors
   - No collapse/filtering yet
   - Maximum information state
   - Preserves superposition

3. **INTENTION: Projection**
   - Project onto user's goal space
   - Maintain quantum correlations
   - Purpose-driven selection
   - No measurement yet

4. **OBSERVATION: Recording**
   - Store quantum correlations
   - Build semantic network
   - No citation placement
   - Preserve state information

5. **YIELD: Collapse**
   - Final wave function collapse
   - Natural citation emergence
   - Coherent response state
   - Complete measurement

## Effect as Measurement

Each step's effect represents a different type of measurement:

1. **ACTION Effect**
   ```typescript
   // Initial wave function
   type ActionEffect = {
     phase: "action",
     content: string,        // Beginner's mind response
     priors: undefined      // No priors yet
   }
   ```

2. **EXPERIENCE Effect**
   ```typescript
   // Quantum entanglement measurement
   type ExperienceEffect = {
     phase: "experience",
     content: string,       // Context-enriched response
     priors: Prior[]       // All 80 priors
   }
   ```

3. **INTENTION Effect**
   ```typescript
   // Goal state measurement
   type IntentionEffect = {
     phase: "intention",
     content: string,      // Intent analysis
     priors: undefined    // Priors inform but aren't sent
   }
   ```

4. **OBSERVATION Effect**
   ```typescript
   // Record quantum correlations
   type ObservationEffect = {
     phase: "observation",
     content: string,     // Records semantic links
     priors: undefined   // Stored in Qdrant
   }
   ```

5. **YIELD Effect**
   ```typescript
   // Final wave collapse
   type YieldEffect = {
     phase: "yield",
     content: string,    // Response with citations
     priors: undefined  // Citations integrated in content
   }
   ```

## Quantum State Propagation

Effects propagate through the system like quantum information:

```typescript
interface QuantumChannel {
  // WebSocket as quantum channel
  propagate(effect: QuantumEffect): void;
  maintain_coherence(): void;
  handle_decoherence(): void;
}
```

## UI as Observer

The frontend acts as a quantum observer:

```typescript
function observeQuantumState(effect: QuantumEffect) {
  switch (effect.type) {
    case "chorus_response":
      collapseWaveFunction(effect.state);
      updateObserverState(effect.measurement);
      maintainPhaseCoherence(effect.phase);
      break;
    // ...
  }
}
```

## Implementation Considerations

1. **Wave Function Integrity**

   - Maintain quantum coherence
   - Handle phase transitions
   - Preserve entanglements
   - Recover from decoherence

2. **Effect Conservation**

   - Track all measurements
   - Maintain energy balance
   - Preserve information
   - Handle state collapse

3. **Phase Alignment**
   - Synchronize observers
   - Maintain coherence
   - Handle transitions
   - Recover state

## Future Directions

1. **Enhanced Quantum Properties**

   - Multi-thread entanglement
   - Complex phase spaces
   - Quantum error correction
   - Coherence optimization

2. **Advanced Measurements**
   - Partial observations
   - Delayed measurement
   - Quantum memory
   - Phase recovery

Through this quantum lens, we see how Effects maintain system coherence while enabling observation and state transitions.


==
Core_Effects
==


# Effect System & State Transitions

VERSION effect_system:
invariants: {
"Effect completeness",
"State coherence",
"Message integrity"
}
assumptions: {
"WebSocket reliability",
"State synchronization",
"UI consistency"
}
docs_version: "0.2.1"

## Effect System Overview

Effects communicate step results and state changes to the frontend:

```typescript
type Effect = {
  type: "chorus_response" | "error" | "state_update";
  payload: {
    step: ChorusStep;        // Current step in AEIOU-Y
    content: string;         // Step response
    priors?: Prior[];       // Raw priors from EXPERIENCE
  };
}
```

### Effect Generation

Each step generates effects that accumulate:

```python
async def run_chorus_cycle(state: ChorusState, input: str):
    effects = []
    while True:
        # Run step and collect effects
        new_state, step_effects = await run_step(state, input)
        effects.extend(step_effects)

        # Break after YIELD
        if new_state.current_step == StepEnum.YIELD:
            break
    return effects, new_state
```

### Step-Specific Effects

1. **ACTION**
   ```typescript
   {
     step: "action",
     content: "Initial response",
     priors: undefined
   }
   ```

2. **EXPERIENCE**
   ```typescript
   {
     step: "experience",
     content: "Context-enriched response",
     priors: Prior[]  // All 80 priors
   }
   ```

3. **INTENTION**
   ```typescript
   {
     step: "intention",
     content: "Intent analysis",
     priors: undefined
   }
   ```

4. **OBSERVATION**
   ```typescript
   {
     step: "observation",
     content: "Observation analysis",
     priors: undefined
   }
   ```

5. **UPDATE**
   ```typescript
   {
     step: "update",
     content: { loop: boolean, reasoning: string },
     priors: undefined
   }
   ```

6. **YIELD**
   ```typescript
   {
     step: "yield",
     content: "Final response with citations",
     priors: undefined
   }
   ```

## Frontend Effect Handling

```typescript
function handleEffect(effect: Effect) {
  switch (effect.type) {
    case "chorus_response":
      // Update UI based on step
      switch (effect.payload.step) {
        case "experience":
          // Show priors in right panel
          updatePriorPanel(effect.payload.priors);
          break;
        case "yield":
          // Show final response with citations
          updateMessageFlow(effect.payload.content);
          break;
        default:
          // Show step response
          updateStepDisplay(effect.payload);
      }
      break;
    case "error":
      handleError(effect.payload);
      break;
  }
}
```

## Implementation Notes

1. **Effect Flow**
   - Steps generate effects
   - Effects accumulate in cycle
   - WebSocket transmits effects
   - Frontend processes in order

2. **State Management**
   - Effects drive UI updates
   - State changes are atomic
   - Errors are recoverable
   - UI stays synchronized

3. **Prior Handling**
   - EXPERIENCE includes all priors
   - No filtering in effects
   - Frontend shows all priors
   - Citations appear in YIELD

The Effect system maintains coherent state while enabling real-time updates and error recovery.


==
Core_Invariants
==


# Choir Core Invariants

VERSION core_system:
invariants: {
"Wave function coherence",
"Energy conservation",
"Phase stability",
"Equity quantization",
"Continuous stake scaling"
}
assumptions: {
"Resonant verification",
"Phase recovery",
"Harmonic monitoring",
"Quantum equity distribution"
}
docs_version: "0.2.2"

## System Invariants

1. **Thread Resonance**
   - Thread MUST maintain at least one coupled oscillator (co-author)
   - Sum of all equity shares MUST equal 1.0
   - Equity shares MUST follow quantum harmonic scaling (√n)
   - Only coupled oscillators MAY measure wave states (approve/deny)

2. **Wave Function Integrity**
   - Each message MUST have unique quantum state (content hash)
   - Stake amount MAY be any positive value
   - Equity share MUST be proportional to √(stake/P₀)
   - Base price P₀ MUST follow quantum oscillator equation

3. **Energy Conservation**
   - Total system energy MUST remain constant (10 billion tokens)
   - Approval rewards MUST distribute by equity shares
   - Denials MUST increase thread temperature
   - Split decisions MUST split energy between thread and treasury

## State Transition Rules

1. **Cavity Creation**
   ```python
   INVARIANT create_thread(creator, stake) -> cavity:
     cavity.oscillators = [creator]
     cavity.equity_map = {creator: 1.0}
     cavity.energy = 0
     cavity.temperature = initial_temp
     EMITS CavityCreated
   ```

2. **Stake Submission**
   ```python
   INVARIANT submit_stake(author, cavity, stake) -> packet:
     base_price = calculate_base_price(cavity.T, cavity.ω)
     equity = (1/N) * sqrt(stake/base_price)
     packet.potential_equity = equity
     packet.expires_at = now() + 7 days
     EMITS StakeSubmitted
   ```

3. **Approval Distribution**
   ```python
   INVARIANT distribute_approval(cavity, stake):
     FOR EACH co_author, equity IN cavity.equity_map:
       reward = stake * equity
       co_author.balance += reward
     EMITS RewardsDistributed
   ```

4. **Denial Effects**
   ```python
   INVARIANT handle_denial(cavity, stake):
     cavity.energy += stake
     cavity.temperature = cavity.energy / len(cavity.oscillators)
     cavity.token_balance += stake
     EMITS DenialProcessed
   ```

## Security Properties

1. **Equity Control**
   - Equity distribution MUST follow quantum scaling
   - Stake amount MAY be any positive value
   - Reward distribution MUST follow equity shares
   - Temperature MUST only increase from denials

2. **Temporal Coherence**
   - Wave packets MUST collapse within 7 days
   - Equity calculations MUST use current base price
   - Temperature effects MUST be immediate
   - Rewards MUST distribute atomically

3. **Energy Security**
   - Stakes MUST be locked until measurement
   - Approval rewards MUST flow to co-authors by equity
   - Denials MUST strengthen thread cavity
   - Treasury MUST accumulate split decision energy

## Implementation Notes

NOTE equity_implementation:
"Current implementation uses √n scaling"
"Allows any positive stake amount"
"Must maintain quantum mechanical principles"

NOTE reward_distribution:
"Distributes by equity shares"
"No minimum stake requirement"
"Must preserve energy conservation"

Through these invariants, we ensure that:
- Equity follows quantum mechanical principles
- Stakes can be any positive amount
- Rewards distribute proportionally
- System maintains coherence and stability


==
Core_Ownership
==


# Choir Ownership Model

VERSION ownership_system:
invariants: {
"Energy conservation",
"Temperature coherence",
"Frequency stability",
"Equity quantization"
}
assumptions: {
"Thermodynamic evolution",
"Natural cooling",
"Phase transitions",
"Continuous stake scaling"
}
docs_version: "0.2.2"

## Core Ownership Concepts

1. **Equity Distribution**
```typescript
type ThreadEquity = {
  equity_map: Map<PublicKey, float>,  // co-author -> ownership share
  total_value: number,                // accumulated stake value
  temperature: number,                // T from denials
  frequency: number                   // ω from activity
}
```

2. **Stake-to-Equity Conversion**
```python
def calculate_equity(stake: float, base_price: float, coauthor_count: int) -> float:
    """
    Calculate equity share from stake amount using quantum harmonic oscillator.

    stake: Amount being staked
    base_price: P₀ from quantum oscillator equation
    coauthor_count: Current number of co-authors (N)
    """
    # Quantum number from stake ratio
    n = stake / base_price

    # Equity follows √n scaling
    quantum_share = 1.0 / coauthor_count
    equity_share = quantum_share * math.sqrt(n)

    return equity_share
```

## Thread Thermodynamics

1. **State Properties**
```typescript
type ThreadState = {
  energy: number,            // E (total thread energy from denials)
  temperature: number,       // T = E/N (energy per co-author)
  frequency: number,         // ω (evolution rate)
  co_authors: Map<PublicKey, {
    equity_share: float,     // Ownership percentage
    join_time: DateTime      // For cooling calculations
  }>,
  cooling_factor: number     // κ (age-based cooling)
}
```

2. **Energy Flow**
```typescript
type EnergyFlow = {
  rejection: {
    effect: "Increases thread energy",
    temperature: "Rises (E/N increases)",
    frequency: "Unchanged"
  },
  approval: {
    effect: "Distributes to co-authors by equity",
    temperature: "Unchanged",
    frequency: "Increases"
  }
}
```

## Ownership Evolution

1. **New Co-author Addition**
```python
async def add_coauthor(thread: Thread, stake: float):
    # Calculate base price from quantum oscillator
    base_price = calculate_base_price(
        thread.temperature,
        thread.frequency
    )

    # Calculate equity share
    equity = calculate_equity(
        stake=stake,
        base_price=base_price,
        coauthor_count=len(thread.co_authors)
    )

    # Update equity map
    thread.equity_map[new_author] = equity
```

2. **Reward Distribution**
```python
async def distribute_rewards(thread: Thread, stake: float):
    """Distribute approval rewards based on equity shares."""
    for coauthor, equity in thread.equity_map.items():
        reward = stake * equity
        await send_tokens(coauthor, reward)
```

## Implementation Notes

1. **Equity Scaling Properties**
- No minimum stake requirement
- Continuous stake-to-equity curve
- Natural √n scaling from physics
- Proportional reward distribution

2. **Temperature Effects**
- Denials increase thread temperature
- Higher temperature raises base price
- Creates natural quality barrier
- Maintains thread coherence

3. **Frequency Evolution**
- Activity increases frequency
- Higher frequency affects base price
- Natural resonance patterns
- Phase-locked stability

## Future Considerations

1. **Advanced Equity Models**
- Multi-thread equity coupling
- Complex ownership networks
- Quantum entanglement effects
- Dynamic equity evolution

2. **Ecosystem Development**
- Thread equity networks
- Value flow optimization
- Natural niche formation
- Self-organizing standards

Through this model, ownership becomes a quantum property emerging from stake contributions and thread thermodynamics, creating a natural and fair system for value distribution.


==
Core_Patterns
==


# Core Implementation Patterns

VERSION pattern_system:
invariants: {
"Pattern consistency",
"Implementation clarity",
"System coherence"
}
assumptions: {
"Documentation-driven development",
"AI-assisted implementation",
"Test-first approach"
}
docs_version: "0.2.1"

## Core Patterns

1. **Chorus Cycle Pattern**
```typescript
// Six-step cycle with prior flow
type ChorusCycle = {
  action: "Initial response",      // No priors
  experience: "Context search",    // Gets n=80 priors
  intention: "Goal analysis",      // User intent context
  observation: "Record links",     // Store in Qdrant
  update: "Loop decision",         // Continue or yield
  yield: "Final synthesis"         // Natural citations
}
```

2. **Effect Pattern**
```typescript
// State change propagation
type Effect = {
  type: "chorus_response" | "error" | "state_update",
  payload: {
    step: ChorusStep,
    content: string,
    priors?: Prior[]  // Only in EXPERIENCE
  }
}
```

3. **Prior Pattern**
```typescript
// Semantic linking
type Prior = {
  content: string,      // Original message
  thread_id: string,    // Source thread
  embedding: Vector,    // Semantic position
  similarity: number    // To current query
}
```

## Implementation Patterns

1. **Step Processing**
```python
async def run_step(state: ChorusState, input: str):
    # Get step function
    step_fn = getattr(self, f"run_{state.current_step}")

    # Run step (special case for EXPERIENCE)
    if state.current_step == StepEnum.EXPERIENCE:
        response, priors = await step_fn(input)
    else:
        response = await step_fn(input)

    # Generate effects
    effects = generate_step_effects(response)

    # Return new state and effects
    return new_state, effects
```

2. **Effect Handling**
```typescript
function handleEffect(effect: Effect) {
  switch (effect.type) {
    case "chorus_response":
      if (effect.payload.step === "experience") {
        // Show priors panel
        updatePriorPanel(effect.payload.priors);
      }
      // Update step display
      updateStepDisplay(effect.payload);
      break;
  }
}
```

3. **Prior Flow**
```python
# EXPERIENCE: Get priors
priors = await search_similar(input, limit=80)

# INTENTION: Analyze for user's goal
analyze_prior_relevance(priors, user_intent)

# OBSERVATION: Record in Qdrant
record_semantic_links(input, cited_priors)

# YIELD: Natural citations
generate_response_with_citations(input, priors)
```

## UI Patterns

1. **Three-Panel Layout**
```typescript
<div className="flex w-full h-full">
  <ThreadList />           // Left (w-64)
  <MessageFlow />         // Center (flex-1)
  <PriorPanel />          // Right (w-80)
</div>
```

2. **Step Display**
```typescript
<AIResponse
  message={message}
  currentStep={currentStep}
  steps={steps}
  sources={priors}
/>
```

3. **Prior Display**
```typescript
<PriorPanel
  priors={priors}
  onSelect={handlePriorSelect}
  selectedPriors={selectedPriors}
/>
```

## State Management

1. **Chorus State**
```typescript
type ChorusState = {
  current_step: ChorusStep,
  messages: Message[],
  priors?: Prior[],
  effects: Effect[]
}
```

2. **Thread State**
```typescript
type ThreadState = {
  messages: Message[],
  co_authors: string[],
  token_balance: number,
  temperature: number
}
```

3. **UI State**
```typescript
type UIState = {
  selectedMessageId: string | null,
  currentStep: ChorusStep,
  priorPanelOpen: boolean
}
```

## Error Handling

1. **Effect Errors**
```typescript
type ErrorEffect = {
  type: "error",
  payload: {
    step: ChorusStep,
    error: string,
    recovery?: () => void
  }
}
```

2. **State Recovery**
```typescript
async function recoverState(error: Error) {
  // Revert to last valid state
  const lastValid = getLastValidState();
  // Replay necessary effects
  const effects = replayEffects(lastValid);
  // Update UI
  applyEffects(effects);
}
```

These patterns create a consistent foundation for implementing the Choir system.


==
Core_Prior_Flow
==


# Prior Flow Through Chorus Cycle

VERSION prior_flow:
invariants: {
"Prior coherence",
"Citation integrity",
"Semantic relevance"
}
assumptions: {
"Vector space stability",
"Prior availability",
"Citation validity"
}
docs_version: "0.2.1"

## Prior Flow Model

Each step has a specific role in prior handling:

```typescript
type PriorState = {
  experience: {
    retrieved: Prior[],     // Raw vector search results (n=80)
    used_in_synthesis: boolean // Whether prior informed response
  },
  intention: {
    selected: Prior[],      // Priors that support user's intent
    usage_context: string   // How they support the goal
  },
  observation: {
    cited_priors: Prior[], // Record which priors were cited
    semantic_links: {      // Store in Qdrant
      user_message: string,
      cited_messages: string[]
    }
  },
  yield: {
    response: string,      // Final response with inline citations
    footnotes: string[]    // Citation details
  }
}
```

## Step-by-Step Flow

1. **EXPERIENCE: Context Integration**
```python
async def run_experience(input: str, messages: List[Message]):
    # Get priors through vector search
    embedding = await get_embedding(input)
    priors = await self.database.search_similar(
        collection=self.config.MESSAGES_COLLECTION,
        query_vector=embedding,
        limit=80
    )

    # Have LLM use priors for context
    experience_prompt = """
    This is step 2 of the Chorus Cycle, Experience: Use these sources to help refine
    the response from step 1. Consider their insights but respond naturally.

    Respond in this JSON format:
    {
        "synthesis": "Your refined response incorporating the context",
        "key_insights": ["List of key insights from the sources"],
        "source_relevance": {
            "most_relevant": ["Source numbers that helped most"],
            "reasoning": "Why these sources were helpful"
        }
    }
    """

    # Return both synthesis and all priors - no filtering
    return result["synthesis"], priors
```

2. **INTENTION: Intent-Based Selection**
```python
async def run_intention(input: str, priors: List[Prior]):
    intention_prompt = """
    This is step 3 of the Chorus Cycle, Intention: Consider which sources would best
    support the user's goal or intent. Think about how they could strengthen the response.

    Respond in this JSON format:
    {
        "explicit_intent": "Direct goal or need",
        "implicit_intent": "Underlying aims or context",
        "selected_sources": ["Sources that support this intent"],
        "usage_context": "How these sources align with user's goal"
    }
    """
    return result
```

3. **OBSERVATION: Record Citations**
```python
async def run_observation(input: str, priors: List[Prior]):
    # Record semantic connections in Qdrant
    await record_semantic_links(
        user_message=input,
        cited_messages=priors
    )

    observation_prompt = """
    This is step 4 of the Chorus Cycle, Observation: Reflect on the analysis and record
    patterns in how sources were used.

    Respond in this JSON format:
    {
        "patterns": ["Observed patterns"],
        "context_analysis": "Situation analysis",
        "semantic_links": ["Recorded connections"]
    }
    """
    return result
```

4. **YIELD: Natural Citation Integration**
```python
async def run_yield(input: str, priors: List[Prior]):
    yield_prompt = """
    This is the final step of the Chorus Cycle, Yield: Generate a response that naturally
    integrates citations where they add value. Use markdown formatting:
    - [text](thread_id) for inline links
    - [^1] for footnotes
    - Include footnotes at end

    Respond in this JSON format:
    {
        "response": "Your response with natural citations",
        "footnotes": {
            "1": "First citation details",
            ...
        }
    }
    """
    return result
```

## Implementation Notes

1. **Prior Flow**
   - EXPERIENCE: Uses all priors for context
   - INTENTION: Selects based on user's goal
   - OBSERVATION: Records semantic links
   - YIELD: Natural citation integration

2. **Citation Quality**
   - Support user's intent
   - Flow naturally in text
   - Add clear value
   - Proper attribution

3. **Semantic Recording**
   - Store in Qdrant
   - Build knowledge graph
   - Enable future retrieval
   - Track usage patterns

The prior flow maintains semantic coherence while building a rich knowledge network.


==
Core_Priors
==


# Priors: Quantum Semantic Foundations

VERSION prior_system:
invariants: {
"Wave function coherence",
"Semantic entanglement",
"Resonant coupling"
}
assumptions: {
"Quantum semantic stability",
"Phase-locked meaning",
"Value conservation"
}
docs_version: "0.2.1"

## Core Concept

Priors are quantum semantic states that flow through the Chorus Cycle:

```typescript
type Prior = {
  // Message State
  content: string,           // Original message
  thread_id: string,         // Source thread
  embedding: Vector,         // Semantic position
  created_at: string,        // Timestamp

  // Quantum Properties
  resonance: {
    similarity: number,      // To current query
    phase: number,          // Semantic alignment
    coupling: number        // Context binding
  },

  // Usage State
  context: {
    experience_used: boolean,  // Used in synthesis
    intention_selected: boolean, // Supports user goal
    observation_recorded: boolean, // Stored in Qdrant
    yield_cited: boolean     // Used in final response
  }
}
```

## Flow Through Cycle

1. **EXPERIENCE: Maximum Entanglement**
   ```python
   # Get n=80 priors through vector search
   priors = await search_similar(input, limit=80)

   # Use all priors for context
   response = await synthesize_with_context(input, priors)

   # Return both - no filtering
   return response, priors
   ```

2. **INTENTION: Goal Projection**
   ```python
   # Analyze priors in context of user's goal
   intention_prompt = """
   Consider how these sources could support the user's intent.
   Don't filter yet - just analyze relevance to goal.
   """

   # Return analysis of how priors support intent
   return analyze_prior_relevance(priors, user_intent)
   ```

3. **OBSERVATION: Record Links**
   ```python
   # Store semantic connections in Qdrant
   await record_semantic_links(
     user_message=input,
     cited_messages=priors
   )

   # Return observation of patterns
   return analyze_citation_patterns(priors)
   ```

4. **YIELD: Natural Citations**
   ```python
   # Generate response with natural citations
   yield_prompt = """
   Integrate citations naturally where they add value.
   Use markdown formatting for inline links and footnotes.
   """

   return generate_cited_response(input, priors)
   ```

## Quantum Properties

1. **Semantic Entanglement**
   - EXPERIENCE creates maximum entanglement
   - No collapse until final citation
   - Maintains quantum superposition
   - Preserves semantic potential

2. **Goal Projection**
   - INTENTION projects onto user's goal space
   - No filtering - just analysis
   - Maintains quantum correlations
   - Guides final collapse

3. **State Recording**
   - OBSERVATION stores quantum correlations
   - Builds semantic network
   - Enables future retrieval
   - Preserves phase relationships

4. **Natural Collapse**
   - YIELD integrates citations naturally
   - Final wave function collapse
   - Coherent response state
   - Clear semantic connections

## Implementation Notes

1. **Vector Search**
   ```python
   async def search_similar(input: str, limit: int = 80):
     # Get embedding
     embedding = await get_embedding(input)

     # Search Qdrant
     results = await qdrant.search(
       collection="messages",
       query_vector=embedding,
       limit=limit
     )

     return results
   ```

2. **Semantic Recording**
   ```python
   async def record_semantic_links(
     message: str,
     cited_priors: List[Prior]
   ):
     # Store in Qdrant
     await qdrant.upsert(
       collection="semantic_links",
       points=[{
         "message": message,
         "cited": [p.id for p in cited_priors],
         "timestamp": now()
       }]
     )
   ```

3. **Citation Integration**
   ```python
   def format_citation(prior: Prior) -> str:
     # Inline link
     return f"[{prior.content}]({prior.thread_id})"
   ```

The prior system maintains quantum semantic coherence while enabling natural citation flow.


==
Core_ProofOfText
==


# Proof of Text: Choir's Consensus Mechanism

VERSION consensus_system:
invariants: {
"Quality-driven content curation",
"Thermodynamic state evolution",
"Energy conservation"
}
assumptions: {
"Temperature dynamics",
"Energy flow patterns",
"Phase transitions"
}
docs_version: "0.2.1"

## Core Mechanism

ASSUMPTION consensus_model:
"Temperature-based quality emergence"
"Energy conservation in transitions"
"Must maintain thermodynamic stability"

1. **Message Contribution and Energy**

   - Users stake CHOIR tokens (energy quanta)
   - Stake amount varies with thread temperature
   - Energy locked until state transition

2. **Thermodynamic Transitions**

   - Rejection: Increases thread temperature

     - Stake energy flows into thread (increases E)
     - Co-author count unchanged (N constant)
     - Results in higher E/N ratio
     - Creates "heated" state

   - Split Decision: Hybrid energy flow

     - Approvers' stake flows to Treasury
     - Treasury funds citation rewards
     - Maintains circular token flow
     - Enables perpetual incentives

   - Approval: Moderates temperature
     - Stake energy distributes to approvers
     - New co-author added (increases N)
     - E/N ratio decreases
     - Creates more stable state

3. **Natural Selection**

   - Hot threads (high rejection rate):

     - Higher energy barriers to entry
     - Self-selecting for quality
     - Natural filter for contributions
     - Crystallizes high standards

   - Cool threads (high approval rate):
     - Lower energy barriers
     - Open to experimentation
     - Nurtures new voices
     - Enables exploration

## Quality Emergence

1. **Thermodynamic Quality Control**

   - No explicit reputation system needed
   - Quality standards emerge naturally
   - Different threads find different equilibria
   - System self-organizes into diverse niches

2. **Energy Conservation**
   - Rejected stakes increase thread energy
   - Split decisions feed Treasury
   - Treasury funds citation rewards
   - Natural protection against noise

## Phase Transitions

1. **Thread Evolution**

   - Cool threads act as nurseries
   - Successful threads naturally heat up
   - Quality barriers emerge organically
   - Creates natural progression paths

2. **Equilibrium States**
   - High-standards venues crystallize
   - Exploration spaces remain fluid
   - Bidders self-select appropriate venues
   - No central authority needed

## Future Considerations

ASSUMPTION mechanism_evolution:
"Thermodynamic proof-of-text v2"
"May introduce additional phase transitions"
"Must preserve energy conservation"

1. **Advanced Thermodynamics**

   - Complex phase transitions
   - Multi-thread energy coupling
   - Quantum coherence effects

2. **Governance Integration**
   - Temperature parameter adjustment
   - Energy conservation rules
   - Phase transition controls

Through this thermodynamic model, Proof of Text creates a self-organizing system where quality emerges naturally through energy dynamics rather than explicit rules or reputation systems.

---

**Join the Conversation**

Experience the evolution of digital communication with Choir. Engage in meaningful discussions, contribute to high-quality content, and be part of a community that values collaboration and excellence.

---


==
Core_StateTransitions
==


# Choir State Transitions

VERSION transition_system:
invariants: {
"Energy conservation",
"Temperature evolution",
"Frequency coherence"
}
assumptions: {
"Thermodynamic transitions",
"Phase stability",
"Heat flow patterns"
}
docs_version: "0.2.1"

## Core State Transitions

1.  **Thread Creation**

    FUNCTION create_thread(creator, thread_id) -> Result<Thread>:
    // Initial Thermodynamic State
    thread_pda = DERIVE_PDA([THREAD_SEED, thread_id])
    initial_state = {
    co_authors: [creator], // N = 1
    energy: 0, // E = 0
    temperature: ROOM_TEMP, // T = T_0
    frequency: BASE_FREQ, // ω = ω_0
    created_at: now()
    }

    EMIT(ThreadCreated{thread_id, creator, initial_state})
    RETURN Ok(thread_pda)

2.  **Message Submission**

    FUNCTION submit_message(author, thread_id, content) -> Result<Hash>:
    thread = get_thread_state(thread_id)

    // Energy Requirements using quantum harmonic oscillator formula
    ω = calculate_frequency(thread)
    T = calculate_temperature(thread)
    required_stake = calculate_stake_requirement(thread, ω, T)

    MATCH check_author_status(author, thread_id):
    CASE NotCoAuthor:
    verify_stake_amount(required_stake)
    create_spec(thread_id, author, content_hash, required_stake)
    CASE CoAuthor:
    store_message(thread_id, content_hash)
    update_frequency(thread)

3.  **Approval Processing**

    FUNCTION process_approval(decision: Decision) -> Result<()>:
    MATCH decision:
    CASE Reject:
    // Temperature increases
    thread.energy += stake_amount // Stake flows to thread
    thread.temperature = thread.energy / thread.co_authors.len()
    // Frequency unchanged

    CASE SplitDecision:
    // Calculate shares based on voter counts
    approver_share = (stake \* approver_count) / total_voters
    denier_share = stake - approver_share

    // Approvers' share to Treasury
    treasury.balance += approver_share
    // Deniers' share to thread
    thread.energy += denier_share
    // Temperature updated from new thread energy
    thread.temperature = thread.energy / thread.co_authors.len()

    CASE Approve:
    // Direct distribution to approvers
    distribute_to_approvers(stake_amount) // Equal shares to each approver
    add_co_author(author)
    // Temperature moderates through co-author addition
    thread.temperature = thread.energy / thread.co_authors.len()
    // Frequency increases
    thread.frequency = calculate_new_frequency(thread)

## Reward State Transitions

1. **New Message Reward**

   ```
   FUNCTION process_new_message_reward(message: Message) -> Result<()>:
   // Calculate time-based reward using decay function
   elapsed = current_time - program_start
   reward = calculate_decay_reward(elapsed, message_volume)

   // Distribute to author
   distribute_to_author(message.author, reward)

   // Update state
   update_distributed_total(reward)
   update_remaining_allocation(reward)
   emit_reward_event(message, reward)
   ```

2. **Prior Reward**

   ```
   FUNCTION process_prior_reward(
     source_thread: Thread,
     target_thread: Thread,
     prior_hash: Hash,
     quality_score: f64
   ) -> Result<()>:
   // Verify prior exists and is public
   require!(source_thread.messages.contains(prior_hash))
   require!(is_message_public(prior_hash))

   // Check cooldown period
   require!(elapsed_since_last_reward(prior_hash) >= COOLDOWN)

   // Calculate thread reward
   reward = calculate_prior_reward(quality_score, treasury.balance)

   // Transfer from treasury to thread
   transfer_from_treasury(reward, target_thread)

   // Update state
   update_prior_record(prior_hash, reward)
   update_treasury_balance(reward)
   emit_prior_event(source_thread, target_thread, reward)
   ```

## Reward Properties

1. **New Message Conservation**

   ```
   PROPERTY new_message_conservation:
     FORALL reward IN new_message_rewards:
       reward <= remaining_allocation AND
       total_distributed + reward <= TOTAL_ALLOCATION AND
       follows_decay_curve(reward)
   ```

2. **Prior Reward Stability**
   ```
   PROPERTY prior_reward_stability:
     FORALL reward IN prior_rewards:
       reward <= treasury.balance AND
       respects_cooldown(reward) AND
       strengthens_thread_cavity(reward)
   ```

## Combined State Evolution

The system maintains coherence across all state transitions:

1. **Message Flow**

   - Submission → Approval/Denial → Reward
   - Each stage preserves invariants
   - Energy conserved throughout
   - Phase relationships maintained

2. **Value Flow**

   - Individual rewards (approvals, new messages)
   - Collective rewards (denials, prior rewards)
   - Treasury coupling (split decisions)
   - System-wide coherence

3. **Reward Flow**
   - Time-based decay (new messages)
   - Quality-weighted distribution (priors)
   - Treasury sustainability
   - Thread cavity strengthening

## State Verification

FUNCTION verify_thermodynamic_state(thread: Thread) -> Result<bool>:
VERIFY:
thread.energy >= 0
thread.temperature > 0
thread.frequency > 0
energy_conserved(thread)

## Temperature Evolution

FUNCTION evolve_temperature(thread: Thread, time_delta: Duration):
// Natural cooling over time
cooling_factor = 1 + sqrt(time_delta.days \* thread.co_authors.len())
thread.temperature = thread.temperature / cooling_factor

## Frequency Management

FUNCTION update_frequency(thread: Thread):
message_mode = thread.message_rate / sqrt(thread.co_authors.len())
value_mode = log(1 + thread.energy / thread.co_authors.len())
coupling = 1.0 / thread.co_authors.len()

thread.frequency = sqrt(
(message_mode.pow(2) + value_mode.pow(2)) / 2.0 +
coupling \* thread.co_authors.len()
)

## Error Handling

TYPE ThermodynamicError =
| EnergyConservationViolation
| TemperatureInstability
| FrequencyDecoherence
| PhaseTransitionFailure

FUNCTION handle_error(error: ThermodynamicError) -> Recovery:
MATCH error:
EnergyConservationViolation -> recompute_energy()
TemperatureInstability -> stabilize_temperature()
FrequencyDecoherence -> realign_frequency()
PhaseTransitionFailure -> reverse_transition()

## Monitoring Points

1. **Thermodynamic Health**

   - Energy conservation
   - Temperature stability
   - Frequency coherence
   - Phase transition success

2. **Performance Metrics**
   - Heat flow efficiency
   - Frequency stability
   - Phase transition speed
   - System entropy

## Future Considerations

1. **Advanced Thermodynamics**

   - Multi-thread heat exchange
   - Complex phase transitions
   - Quantum coherence effects

2. **Scaling Patterns**
   - Energy distribution optimization
   - Temperature management at scale
   - Frequency synchronization


==
Core_Types
==


# Choir Core Types and State Transitions

## Solana State Types

TYPE Thread = {
  id: ThreadId,
  co_authors: Set<PublicKey>,
  token_balance: TokenAmount,
  created_at: Timestamp,
  updated_at: Timestamp
}

TYPE Approval = {
  co_author: PublicKey,
  decision: Decision,
  timestamp: Timestamp,
  content_hash: Hash
}

TYPE Decision = Approve | Deny

TYPE SpecRequest = {
  author: PublicKey,
  content_hash: Hash,
  stake_amount: TokenAmount,
  expires_at: Timestamp
}

## Qdrant State Types

TYPE MessageContent = {
  content: String,
  author: PublicKey,
  thread_id: ThreadId,
  timestamp: Timestamp,
  embedding: Vector,
  content_hash: Hash,
  searchable: Boolean
}

## State Transitions

FUNCTION create_thread: PublicKey -> ThreadId -> Result<Thread>
FUNCTION submit_spec: Hash -> TokenAmount -> ThreadId -> Result<SpecRequest>
FUNCTION process_approval: Hash -> Decision -> ThreadId -> Result<ThreadState>
FUNCTION divest: ThreadId -> PublicKey -> Result<TokenAmount>

## Core Operations

FUNCTION add_co_author(thread: Thread, author: PublicKey) -> Thread:
  RETURN {
    ...thread,
    co_authors: thread.co_authors.add(author),
    updated_at: now()
  }

FUNCTION distribute_tokens(
  thread: Thread,
  recipients: Set<PublicKey>,
  amount: TokenAmount
) -> Thread:
  RETURN {
    ...thread,
    token_balance: thread.token_balance - amount,
    updated_at: now()
  }

## State Validation

FUNCTION validate_spec(
  spec: SpecRequest,
  thread: Thread
) -> Result<()>:
  MATCH (spec, thread):
    CASE (_, {co_authors}) IF spec.author IN co_authors:
      Err(AlreadyCoAuthor)
    CASE (_, _) IF spec.stake_amount < MINIMUM_STAKE:
      Err(InsufficientStake)
    CASE _:
      Ok(())

## Event Emissions

TYPE Event =
  | ThreadCreated { thread_id: ThreadId, creator: PublicKey }
  | SpecSubmitted { thread_id: ThreadId, content_hash: Hash, stake: TokenAmount }
  | ApprovalProcessed { thread_id: ThreadId, content_hash: Hash, decision: Decision }
  | CoAuthorAdded { thread_id: ThreadId, author: PublicKey }
  | TokensDistributed { thread_id: ThreadId, recipients: Map<PublicKey, TokenAmount> }
  | ContentStored { thread_id: ThreadId, content_hash: Hash, searchable: Boolean }

FUNCTION emit_event: Event -> IO ()


==
Core_Whitepaper
==


# Choir Tokenomics Whitepaper

## Abstract

Choir introduces an innovative socioeconomic media network that leverages thermodynamic principles to create natural quality emergence in collaborative communication. Central to Choir's ecosystem is the **Choir Token (CHOIR)**, which acts as energy quanta in a quantum harmonic oscillator system, enabling threads to evolve through temperature and frequency dynamics that naturally select for quality without artificial barriers.

## Introduction

Traditional platforms struggle with content quality and moderation, often resorting to arbitrary rules or reputation systems. Choir takes a fundamentally different approach by implementing a thermodynamic model where quality emerges naturally through energy dynamics and phase transitions.

## Token Overview

- **Token Name**: Choir Token
- **Token Symbol**: CHOIR
- **Total Supply**: 10,000,000,000 (10 billion) tokens (Fixed Energy Quantum)
- **Token Standard**: Solana Program Library (SPL) Token
- **Initial Allocation**: All tokens minted to Choir Treasury (Initial Energy Reserve)

## Token Flow Mechanics

### 1. Core Token Flows
- **Rejections:** Stake flows to thread, increasing its energy and temperature
- **Split Decisions:** Approvers' stake flows to Treasury, funding citation rewards
- **Approvals:** Stake distributes directly to approvers
- **Treasury:** Acts as energy reservoir for perpetual citation rewards

### 2. Reward Structure
- **New Message Rewards:**
  * High initial distribution
  * Logarithmic decay over 4 years
  * 50% distributed in first year
  * 99% distributed by year 4

- **Citation Rewards:**
  * Funded by Treasury from split decisions
  * Perpetual availability
  * Encourages content linking
  * Promotes knowledge network growth

## Thermodynamic Mechanics

### 1. Thread Energy States

Each thread exists as a quantum harmonic oscillator characterized by:
- Temperature (T) - measures chaos/volatility
- Frequency (ω) - measures organization/coherence
- Energy (E) - total thread energy
- Co-authors (N) - system size

### 2. Energy Dynamics

**Stake Requirements**
- Calculated using quantum harmonic oscillator formula:
  ```
  stake = base_stake * (0.5 + 1/[exp(ℏω/kT) - 1])
  ```
- Higher temperature (T) increases stakes
- Higher frequency (ω) moderates stakes
- Creates natural quality selection

**State Transitions**
- Rejection: Increases thread temperature
  * Stake energy flows into thread
  * Temperature rises (E/N increases)
  * Frequency unchanged

- Split Decision: Hybrid energy flow
  * Approvers' stake flows to Treasury
  * Maintains circular token flow
  * Enables perpetual rewards
  * Temperature unchanged

- Approval: Moderates temperature
  * Energy distributes to approvers
  * Temperature decreases (new co-author)
  * Frequency increases

### 3. Natural Evolution

**Thread Maturation**
- Young threads start hot (high T)
- Natural cooling over time
- Quality barriers emerge organically
- Communities crystallize naturally

**Quality Emergence**
- Hot threads: Expensive but potentially valuable
- Cool threads: Accessible and stable
- High frequency: Well-organized and efficient
- Natural selection for coherence

## Treasury Dynamics

### 1. Energy Reservoir
- Accumulates tokens from split decisions
- Maintains perpetual citation rewards
- Creates circular token flow
- Ensures system sustainability

### 2. Reward Distribution
- New message rewards follow logarithmic decay
- Citation rewards scale with Treasury balance
- System maintains token velocity
- Natural incentive alignment

## Economic Implications

### 1. Value Discovery
- Quality emerges from energy dynamics
- No artificial reputation systems
- Natural price discovery through T and ω
- Self-organizing quality standards

### 2. Participation Incentives
- Pattern recognition rewarded
- Early participation in high-potential threads
- Contribution to frequency alignment
- Natural selection for value creation

### 3. Community Evolution
- Diverse thread ecosystems emerge
- Different temperature/frequency niches
- Natural progression paths
- Self-organizing standards

## Practical Implementation

### 1. Message Submission
- User stakes CHOIR tokens (energy quanta)
- Stake requirement based on T and ω
- Energy locked until state transition
- Natural barrier against noise

### 2. Approval Process
- Co-authors evaluate within 7 days
- Unanimous approval required
- Split decisions feed Treasury
- Rejections heat up threads

### 3. Energy Distribution
- Approved: Energy distributes to approvers
- Rejected: Energy increases thread temperature
- Split decisions: Energy flows to Treasury
- Citations: Perpetual rewards from Treasury

## Future Considerations

### 1. Advanced Thermodynamics
- Multi-thread energy coupling
- Complex phase transitions
- Quantum coherence effects
- Resonance amplification

### 2. Governance Evolution
- Temperature parameter adjustment
- Energy conservation rules
- Phase transition controls
- System-wide thermodynamics

## Conclusion

Choir's thermodynamic token model creates a self-organizing system where quality emerges naturally through energy dynamics rather than arbitrary rules. By treating threads as quantum harmonic oscillators and maintaining circular token flow through the Treasury, we enable natural selection for quality while ensuring sustainable incentives for valuable contributions.

The result is a platform where:
- Quality emerges from natural laws
- Value aligns with coherence
- Communities self-organize
- Evolution is organic and sustainable
- Incentives remain perpetually aligned

This innovative model sets a new standard for decentralized platforms, demonstrating how physical principles can create robust socioeconomic systems with sustainable token economics.
