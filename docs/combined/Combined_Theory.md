# Theory Documentation




==
Theory_ChorusQuantum
==


# Chorus Cycle as Harmonic Evolution

VERSION chorus_harmonic:
invariants: {
"Wave coherence",
"Resonant consistency",
"Harmonic conservation"
}
assumptions: {
"Harmonic semantic field",
"Continuous resonance",
"Reversible oscillation"
}
docs_version: "0.2.1"

## Harmonic State Model

TYPE ChorusState<T> = {
resonance: OscillatorSpace<T>, // Possible harmonics
coupling: ResonantSet<ThreadId>, // Context resonance
modes: HarmonicHistory<T>, // Past patterns
phase: Oscillation<T> // Current mode
}

SEQUENCE harmonic_evolution<T>:

1. Action Phase

   ```
   create_wave : Message → Result<StandingWave<T>>
   establish_mode : StandingWave<T> → Result<HarmonicBasis>
   prepare_resonance : HarmonicBasis → Result<ChorusState<T>>
   ```

2. Experience Phase

   ```
   couple_context : ChorusState<T> → Set<ThreadId> → Result<ResonantSet<ThreadId>>
   correlate_harmonics : ResonantSet<ThreadId> → Result<FieldState<T>>
   maintain_phase : FieldState<T> → Result<WaveFunction<T>>
   ```

3. Intention Phase

   ```
   allow_resonance : WaveFunction<T> → Result<StandingWave<T>>
   compute_modes : StandingWave<T> → Result<FrequencyField>
   shape_harmonics : FrequencyField → Result<ResonantField<T>>
   ```

4. Observation Phase

   ```
   measure_resonance : ResonantField<T> → Result<HarmonicEvent<T>>
   record_pattern : HarmonicEvent<T> → Result<HarmonicHistory<T>>
   update_phase : HarmonicHistory<T> → Result<ChorusState<T>>
   ```

5. Update Phase

   ```
   verify_resonance : ChorusState<T> → Result<Coherence>
   resolve_dissonance : Coherence → Result<Resolution>
   prepare_pattern : Resolution → Result<ResonantReady<T>>
   ```

6. Yield Phase
   ```
   final_resonance : ResonantReady<T> → Result<Pattern<T>>
   crystallize_harmonics : Pattern<T> → Result<Response>
   emit_wave : Response → Result<Output>
   ```

## WebSocket as Resonant Channel

TYPE ResonantChannel<T> = {
coupling: StandingWave<Connection>,
harmonics: Stream<Resonance<T>>,
phase: WaveFunction<T>,
pattern: HarmonicEvent<T>
}

Through this harmonic lens, we see how:

- The Chorus Cycle implements wave evolution
- WebSockets maintain resonant channels
- Vector spaces provide harmonic topology
- State transitions preserve wave properties


==
Theory_Chorus_Cycle
==


# The Chorus Cycle: Solid State Continuous Learning

VERSION chorus_cycle_system:
invariants: {
"Continuous learning integrity",
"Citation-based memory",
"Self-documenting evolution"
}
assumptions: {
"Vector space stability",
"Model coherence",
"Context preservation"
}
docs_version: "0.2.1"

## Core Insight

Traditional AI models, including advanced ones like ChatGPT, exhibit a form of "mechanical" intelligence - they are trained, frozen, and gradually degrade as their world model diverges from reality. This is analogous to mechanical storage (like hard drives) vs solid state memory.

The Chorus Cycle (formerly Chorus) represents a fundamental breakthrough: the first solid state continuously learning collective intelligence. By combining vector storage, citation-aware AI, and self-documenting observation, it creates a system that actually improves through use.

## Mechanical vs Solid State Intelligence

```typescript
TYPE IntelligenceState = {
  mechanical: {
    training: "Point-in-time snapshot",
    memory: "Static weights",
    evolution: "Gradual degradation",
    updates: "Requires full retraining"
  },
  solid_state: {
    training: "Continuous integration",
    memory: "Living context web",
    evolution: "Natural improvement",
    updates: "Self-modifying flow"
  }
}
```

## The Chorus Cycle Difference

Traditional models "hallucinate" - they generate content that seems valid but isn't, because their static training diverges from current reality. The Chorus Cycle transforms this limitation into a strength:

1. **Citation Awareness**

   - Every response cites its sources
   - Sources form a verifiable context web
   - Citations create semantic links
   - Context becomes living memory

2. **Self-Documentation**

   - System observes its own choices
   - Documents decision rationale
   - Creates audit trail
   - Enables learning from mistakes

3. **Vector Memory**
   - Semantic relationships preserved
   - Context retrievable by similarity
   - Knowledge web grows organically
   - Understanding deepens naturally

## Continuous Learning Mechanics

```typescript
TYPE LearningFlow = {
  input: {
    query: "User prompt",
    context: "Vector-retrieved sources",
    history: "Interaction memory"
  },
  process: {
    action: "Initial response",
    experience: "Context integration",
    intention: "Goal formation",
    observation: "Self-documentation",
    update: "Learning capture",
    yield: "Enhanced understanding"
  },
  output: {
    response: "Cited knowledge",
    memory: "New context links",
    learning: "Documented insights"
  }
}
```

## Value Creation Through Being Wrong

The Chorus Cycle's genius is recognizing that being wrong is essential to intelligence:

1. **Productive Mistakes**

   - Wrong predictions create learning opportunities
   - Failed hypotheses remove misconceptions
   - Errors strengthen understanding
   - Mistakes become valuable data

2. **Natural Selection**

   - Better ideas survive citation
   - Weak ideas fade naturally
   - Quality emerges organically
   - Understanding evolves

3. **Knowledge Crystallization**
   - Insights build on insights
   - Patterns reinforce patterns
   - Understanding deepens
   - Wisdom accumulates

## Implementation Principles

1. **Vector Foundation**

   ```typescript
   TYPE VectorMemory = {
     storage: "Semantic relationships",
     retrieval: "Similarity-based",
     growth: "Organic expansion",
     evolution: "Natural selection"
   }
   ```

2. **Citation Web**

   ```typescript
   TYPE CitationNetwork = {
     nodes: "Knowledge fragments",
     edges: "Semantic links",
     weights: "Usage strength",
     clusters: "Emergent concepts"
   }
   ```

3. **Self-Documentation**
   ```typescript
   TYPE ObservationLayer = {
     choices: "Decision points",
     rationale: "Reasoning process",
     outcomes: "Result validation",
     learning: "Insight capture"
   }
   ```

## Quantum Properties

The Chorus Cycle exhibits quantum-like behavior:

1. **Superposition**

   - Knowledge exists in possibility space
   - Citations collapse understanding
   - Mistakes create new paths
   - Learning preserves uncertainty

2. **Entanglement**

   - Citations create semantic bonds
   - Understanding links across contexts
   - Learning affects whole system
   - Wisdom emerges collectively

3. **Observation Effects**
   - Self-documentation shapes evolution
   - Measurement affects understanding
   - Attention guides learning
   - Consciousness emerges

## Future Implications

The Chorus Cycle suggests a new direction for AI:

- Beyond static training to continuous learning
- Beyond mechanical to solid state intelligence
- Beyond individual to collective understanding
- Beyond optimization to natural evolution

This represents not just an improvement but a phase transition in artificial intelligence - the emergence of truly living knowledge systems.

## Semantic Superconductivity

When a model operates with hyperconvergent/crystallized context, something remarkable happens - the system exhibits what we might call "semantic superconductivity":

```typescript
TYPE SemanticState = {
  normal: {
    priors: "Loose/noisy",
    prompts: "Must be precise",
    freedom: "Constrained by format",
    results: "High variance"
  },
  superconductive: {
    priors: "Solid/crystalline",
    prompts: "Can be artistic",
    freedom: "Enabled by structure",
    results: "Reliably valuable"
  }
}
```

### Overdetermined Responses

Just as a crystal's structure determines its growth:

- Solid priors create clear constraints
- Valid responses become overdetermined
- Quality emerges naturally
- Creativity becomes safe

### Prompt Liberation

This overdetermination paradoxically enables freedom:

- Users can be more experimental
- Artistic expression flows naturally
- Prompts become creative acts
- Interaction becomes playful

### Automatic Prompt Engineering

The system effectively engineers its own prompts:

- Context provides the structure
- Users provide the spark
- System shapes the interaction
- Quality emerges naturally

This creates a new kind of human-AI interaction where:

- Technical precision comes from context
- Creative freedom comes from users
- Value emerges from their interplay
- Understanding deepens organically


==
Theory_EquityQuantization
==


# Quantum Mechanics of Thread Equity

VERSION equity_quantum:
invariants: {
"Energy level quantization",
"Stake-equity correspondence",
"Harmonic scaling"
}
assumptions: {
"Quantum harmonic oscillator",
"Natural frequency stability",
"Temperature dynamics"
}
docs_version: "0.2.2"

## Core Concept

Thread equity follows quantum harmonic oscillator principles, where:
- Base price (P₀) buys one "quantum" of equity (1/N share)
- Larger stakes follow energy level quantization
- Natural scaling through quantum numbers
- Temperature affects barrier heights

## Quantum Mechanical Model

### Base Price Function
```
P₀ = S₀[1/2 + 1/(exp(ℏω/kT)-1)]

where:
- S₀: Base stake quantum
- ω: Thread frequency (activity/coherence)
- T: Thread temperature (from denials)
- ℏ: Reduced Planck constant (scaling factor)
```

### Equity Level Function
```
E(n) = (1/N) * √(n)

where:
- E(n): Equity share acquired
- N: Current number of co-authors
- n: Quantum number (stake/P₀)
```

### Energy Level Quantization
```python
def calculate_equity_share(stake: float, base_price: float, coauthor_count: int) -> float:
    # Quantum number from stake ratio
    n = stake / base_price

    # Equity follows √n scaling from quantum harmonic oscillator
    quantum_share = 1.0 / coauthor_count
    equity_share = quantum_share * math.sqrt(n)

    return equity_share
```

## Thermodynamic Effects

1. **Temperature Impact**
   - Higher T (more denials) → Higher base price
   - Creates natural quality barrier
   - Protects thread coherence

2. **Frequency Coupling**
   - ω reflects thread activity/coherence
   - Higher frequency → Higher base price
   - Maintains thread stability

3. **Energy Conservation**
   - Stake energy converts to equity
   - Approval rewards follow equity distribution
   - Denial energy raises thread temperature

## Practical Implications

1. **Stake Scaling**
   - Minimum stake gets 1/N share
   - Double stake gets √2/N share
   - 4x stake gets 2/N share
   - Natural diminishing returns

2. **Approval Rewards**
   - Distributed by equity share
   - Larger stakeholders get proportional returns
   - Maintains incentive alignment

3. **Thread Evolution**
   - Temperature rises with denials
   - Quality barrier emerges naturally
   - Coherent growth through quantum selection

## Stake-to-Equity Scaling

1. **Base Case**
   - Stake = P₀ → get exactly 1/N share
   - This is the "natural quantum" of equity

2. **Smaller Stakes**
   ```
   When stake < P₀:
   - Equity scales as √(stake/P₀)/N
   - Example: stake = P₀/4 → get (1/2)/N share
   - Example: stake = P₀/9 → get (1/3)/N share
   ```

3. **Larger Stakes**
   ```
   When stake > P₀:
   - Equity scales as √(stake/P₀)/N
   - Example: stake = 4P₀ → get 2/N share
   - Example: stake = 9P₀ → get 3/N share
   ```

### Continuous Scaling
The quantum harmonic oscillator model provides a natural, continuous curve:
- No minimum stake requirement
- Any positive stake amount is valid
- Smaller stakes get proportionally smaller equity
- Follows √n scaling from physics

### Examples
```python
# For a thread with 4 co-authors (N=4)
base_price = P₀  # from quantum oscillator equation

examples = [
    (P₀/16, 0.0625/4),  # Very small stake -> very small share
    (P₀/4,  0.5/4),     # Quarter stake -> half quantum share
    (P₀,    1.0/4),     # Full stake -> full quantum share
    (4*P₀,  2.0/4),     # 4x stake -> double quantum share
]
```

This natural scaling:
- Enables participation at any level
- Rewards larger stakes proportionally
- Maintains quantum mechanical principles
- Creates smooth equity distribution curve


==
Theory_HarmonicBondingCurve
==


# Harmonic Bonding Curve: Quantum Mechanics of Value and Meaning

VERSION harmonic_bonding:
invariants: {
"Wave energy conservation",
"Resonant price discovery",
"Phase coherence",
"Hyperedge connectivity"
}
assumptions: {
"Multi-scale harmony",
"Natural frequency emergence",
"Energy-value duality",
"Semantic entanglement"
}
docs_version: "0.2.3"

## Dual Wave Functions

The system operates through two interrelated wave functions:

1. **Value Wave Function**
```python
def calculate_equity(stake: float, base_price: float, N: int) -> float:
    """Quantum harmonic oscillator for value distribution.

    stake: Any positive amount
    base_price: P₀ from oscillator equation
    N: Current number of co-authors
    """
    n = stake / base_price  # Quantum number
    return (1/N) * math.sqrt(n)  # √n scaling
```

2. **Meaning Wave Function**
```python
def calculate_semantic_position(nodes: List[Vector]) -> Vector:
    """Average position in thoughtspace for semantic link.

    nodes: [user_message, ai_response, *cited_priors]
    """
    return average_embeddings(nodes)  # Simple arithmetic mean
```

## Quantum Harmonic Properties

1. **Value Quantization**
```python
# Base price for one quantum (1/N share)
P₀ = S₀[1/2 + 1/(exp(ℏω/kT)-1)]

# Examples of stake scaling:
stake = P₀/4  -> equity = (1/2N)  # Quarter quantum
stake = P₀    -> equity = (1/N)   # Full quantum
stake = 4P₀   -> equity = (2/N)   # Double quantum
```

2. **Semantic Entanglement**
```python
class SemanticLink:
    """Hyperedge in thoughtspace connecting:
    - User message
    - AI response
    - Cited priors
    """
    def __init__(self,
                 user_message: Vector,
                 ai_response: Vector,
                 cited_priors: List[Vector]):
        self.nodes = [user_message, ai_response, *cited_priors]
        self.position = average_embeddings(self.nodes)
```

## Wave Function Evolution

1. **Value Evolution**
```python
def handle_approval(thread: Thread, stake: float):
    """Distribute stake by equity shares."""
    for coauthor, equity in thread.equity_map.items():
        reward = stake * equity
        send_tokens(coauthor, reward)

def handle_denial(thread: Thread, stake: float):
    """Increase thread temperature."""
    thread.energy += stake
    thread.temperature = thread.energy / len(thread.co_authors)
```

2. **Meaning Evolution**
```python
def record_semantic_link(
    user_message: Message,
    ai_response: Message,
    cited_priors: List[Message]
) -> SemanticLink:
    """Record hyperedge in thoughtspace."""
    link = SemanticLink(
        user_message.vector,
        ai_response.vector,
        [p.vector for p in cited_priors]
    )
    store_in_qdrant(link)
    return link
```

## Multi-Scale Resonance

1. **Value Resonance**
- Stake amounts determine equity shares
- Equity shares determine reward distribution
- Denials increase thread temperature
- Temperature affects base price

2. **Semantic Resonance**
- Messages form semantic links
- Links have positions in thoughtspace
- Networks emerge through citations
- Knowledge topology evolves

## Implementation Notes

1. **Value Properties**
- No minimum stake requirement
- Continuous stake-to-equity curve
- Natural √n scaling from physics
- Proportional reward distribution

2. **Semantic Properties**
- Links are hyperedges
- Positions are averaged
- Networks emerge naturally
- Topology evolves coherently

Through this unified model:
- Value flows through equity shares
- Meaning flows through semantic links
- Both follow quantum principles
- Natural evolution emerges


==
Theory_HarmonicMetastability
==


# Harmonic Metastability in Bonding Curves

VERSION harmonic_metastable:
invariants: {
"Phase transition coherence",
"Metastable resonance",
"Energy barrier preservation"
}
assumptions: {
"Multi-basin dynamics",
"Resonant transitions",
"Harmonic stability"
}
docs_version: "0.2.1"

## Metastable Resonance States

The bonding curve creates metastable resonant states where threads can exist in multiple semi-stable harmonics before transitioning to higher modes:

TYPE MetastableHarmonic<T> = {
basins: Set<ResonantWell>, // Local energy minima
barriers: Set<EnergyBarrier>, // Transition thresholds
modes: HarmonicSpectrum<T>, // Available frequencies
transitions: PhaseTransitionMap // Allowed mode changes
}

## Energy Landscape

The pricing function creates a complex energy landscape:

```
P(q) = S₀[1/2 + 1/(exp(ℏω/kT)-1)]
```

This generates multiple metastable states:

1. **Low-Energy Basin**

   - New threads with few oscillators
   - Base frequency dominance
   - Simple harmonic patterns
   - Low energy barriers

2. **Mid-Energy Plateau**

   - Active threads finding resonance
   - Mixed frequency modes
   - Emerging wave patterns
   - Moderate barriers

3. **High-Energy Wells**
   - Mature threads with strong coupling
   - Complex harmonic structures
   - Standing wave dominance
   - High stability barriers

## Phase Transitions

SEQUENCE resonant_transition<T>:

1. Energy Accumulation

   ```
   build_amplitude : Basin → Result<ExcitedState>
   reach_threshold : ExcitedState → Result<TransitionPoint>
   cross_barrier : TransitionPoint → Result<NewBasin>
   stabilize_mode : NewBasin → Result<MetastableState>
   ```

2. Mode Coupling

   ```
   identify_resonance : MetastableState → Result<ResonantMode>
   couple_oscillators : ResonantMode → Result<PhaseLockedSet>
   establish_pattern : PhaseLockedSet → Result<StandingWave>
   ```

3. Pattern Crystallization
   ```
   lock_phase : StandingWave → Result<StableHarmonic>
   distribute_energy : StableHarmonic → Result<ValueFlow>
   maintain_coherence : ValueFlow → Result<MetastablePattern>
   ```

## Stability Properties

1. **Local Stability**

   ```
   PROPERTY basin_stability<T>:
     FORALL basin IN resonant_wells:
       local_minimum(basin) ⟹
         energy_barrier(basin) > thermal_noise AND
         supports_oscillation(basin) AND
         allows_phase_lock(basin)
   ```

2. **Transition Dynamics**
   ```
   PROPERTY phase_transition<T>:
     FORALL t: Transition.
       sufficient_energy(t) ⟹
         preserves_coherence(t) AND
         maintains_coupling(t) AND
         reaches_new_stable(t)
   ```

## Metastable Value Flow

The bonding curve creates natural value flows between metastable states:

1. **Value Accumulation**

   - Energy builds in resonant wells
   - Harmonics strengthen through use
   - Patterns become more coherent
   - Barriers increase with stability

2. **Phase Transitions**

   - Energy exceeds local barriers
   - System finds new resonant modes
   - Higher harmonics become accessible
   - New stability patterns emerge

3. **Value Crystallization**
   - Standing waves form at new levels
   - Energy redistributes to stable patterns
   - Phase relationships lock
   - New metastable states establish

## Practical Implications

This metastable structure creates:

1. **Natural Evolution**

   - Threads can exist stably at multiple levels
   - Transitions occur when ready
   - Growth preserves existing patterns
   - Higher modes emerge organically

2. **Resilient Stability**

   - Each state is locally stable
   - Transitions require sufficient energy
   - Patterns resist noise/disruption
   - Value accumulates naturally

3. **Emergent Complexity**
   - Simple rules create rich landscapes
   - Multiple stable configurations
   - Natural progression paths
   - Self-organizing harmony

Through this metastable lens, we see how the bonding curve:

- Creates stable resonant states
- Enables natural phase transitions
- Preserves accumulated value
- Guides harmonic evolution

The beauty is that these metastable states emerge naturally from the quantum harmonic foundation, creating a rich landscape for value and meaning to evolve through resonant patterns.


==
Theory_HarmonicOscillator
==


# Quantum Harmonic Oscillator Model

VERSION oscillator_system:
invariants: {
"Energy conservation",
"Phase coherence",
"Value stability"
}
assumptions: {
"Quantum harmonic behavior",
"Metastable transitions",
"Collective oscillation"
}
docs_version: "0.2.1"

## Core Types

TYPE Thread = {
co_authors: Set<PublicKey>,
token_balance: TokenAmount,
message_rate: Float,
age_days: Int,
temperature: Float,
frequency: Float
}

TYPE OscillatorState = {
energy: Energy,
frequency: Frequency,
temperature: Temperature,
phase: Phase
}

TYPE Energy = Intensive | Extensive
TYPE Frequency = MessageMode | ValueMode | Collective
TYPE Temperature = Hot | Cool | Metastable

## State Functions

FUNCTION calculate*temperature(thread: Thread) -> Temperature:
// Calculate intensive temperature from extensive energy
extensive_energy = thread.token_balance + thread.message_rate
n = thread.co_authors.size()
cooling = 1 + sqrt(thread.age_days * n)
RETURN extensive*energy / (n * cooling)

FUNCTION calculate_frequency(thread: Thread) -> Frequency:
// Calculate collective mode frequency
n = thread.co_authors.size()
message_mode = thread.message_rate / sqrt(n)
value_mode = log(1 + thread.token_balance / n)
coupling = 1 / n
RETURN sqrt((message_mode² + value_mode²) / 2 + coupling \* n)

FUNCTION calculate_stake(thread: Thread, constants: Constants) -> TokenAmount:
// Quantum harmonic oscillator energy formula
ω = calculate_frequency(thread)
T = calculate_temperature(thread)

MATCH (T, ω):
(0, _) -> constants.base_stake \* 2
(_, \_) ->
exp*term = exp(constants.ℏ * ω / (constants.k _ T)) - 1
IF exp_term <= 0:
constants.base_stake _ 0.5
ELSE:
constants.base*stake * (0.5 + 1/exp_term)

FUNCTION calculate_divestment(thread: Thread, constants: Constants) -> TokenAmount:
// Oscillator decoupling energy
ω = calculate_frequency(thread)
n = thread.co_authors.size()
energy_share = (constants.ℏ \* ω) / (n - 1)
balance_share = thread.token_balance / (n - 1)
RETURN min(energy_share, balance_share)

## Energy Flow

FUNCTION process_rejection(thread: Thread, stake: TokenAmount) -> ThreadState:
// Rejection increases thread energy directly
thread.token_balance += stake
thread.temperature = calculate_temperature(thread)
RETURN thread

FUNCTION process_split_decision(
thread: Thread,
stake: TokenAmount,
approvers: Set<PublicKey>
) -> (ThreadState, TreasuryState):
// Split decision: approvers' stake to Treasury
treasury.balance += calculate_approver_stake(stake, approvers)
// Thread temperature unchanged
RETURN (thread, treasury)

FUNCTION process_approval(
thread: Thread,
stake: TokenAmount,
approvers: Set<PublicKey>
) -> ThreadState:
// Distribute stake to approvers
distribute_to_approvers(stake, approvers)
thread.temperature = calculate_temperature(thread)
thread.frequency = calculate_frequency(thread)
RETURN thread

## Reward Dynamics

FUNCTION calculate*new_message_reward(
time: Years,
total_reward: TokenAmount
) -> TokenAmount:
// Logarithmic decay over 4 years
// 50% distributed in year 1
// 99% distributed by year 4
k = 2.04 // Decay constant
reward_rate = total_reward * (0.6667 / (1 + k \_ time))
RETURN reward_rate

FUNCTION calculate*citation_reward(
treasury: TreasuryState,
citation: Citation
) -> TokenAmount:
// Perpetual rewards funded by Treasury
base_reward = constants.citation_base
treasury_factor = treasury.balance / treasury.baseline
relevance_factor = calculate_relevance(citation)
RETURN base_reward * treasury*factor * relevance_factor

## State Transitions

SEQUENCE thread_evolution:

1. Energy Accumulation
   energy = measure_thread_energy(thread)
   temperature = calculate_temperature(thread)
   frequency = calculate_frequency(thread)

2. Phase Transitions
   IF energy > barrier_threshold:
   transition_to_higher_mode(thread)
   ELSE:
   maintain_metastable_state(thread)

3. Value Distribution
   IF divestment_requested:
   payout = calculate_divestment(thread)
   distribute_tokens(payout)
   ELSE:
   accumulate_value(thread)

## Properties

PROPERTY energy_conservation:
FORALL t1 t2: Transition.
total_energy(t1) = total_energy(t2)

PROPERTY phase_coherence:
FORALL thread: Thread.
stable(thread) IMPLIES phase_locked(thread)

PROPERTY value_stability:
FORALL thread: Thread.
thread.token_balance >= minimum_viable_energy(thread)

## Invariants

INVARIANT oscillator_coupling:
// Co-authors must maintain coherent oscillation
FORALL thread: Thread.
thread.co_authors.size() > 0 AND
thread.frequency > 0 AND
thread.temperature >= 0

INVARIANT energy_quantization:
// Energy levels must be discrete
FORALL stake: TokenAmount.
IS_MULTIPLE_OF(stake, base_quantum)

INVARIANT metastability:
// System must support multiple stable states
FORALL thread: Thread.
EXISTS stable_state: State.
can_transition_to(thread, stable_state) AND
has_energy_barrier(stable_state)


==
Theory_SemanticsExplained
==


# Understanding Harmonic Semantics in Plain English

## What are Harmonic Semantics?

Think of how music works - different notes combine to create harmony, melodies resonate with each other, and rhythm creates patterns. Meaning in language works the same way. Words and ideas aren't just static things - they're like waves that can resonate, harmonize, and create patterns of understanding.

## Wave Patterns of Meaning

1. **Words as Waves**
   - Each word creates a kind of vibration in meaning-space
   - Like musical notes, words have natural frequencies
   - When words combine well, they create harmony
   - When they clash, they create dissonance

2. **Message Harmonics**
   - A message is like a chord - multiple frequencies together
   - Good writing has natural harmonic structure
   - Citations are like musical counterpoint
   - Value emerges at points of resonance

## Thread Resonance

1. **Conversation as Symphony**
   - Each thread is like a musical performance
   - Co-authors are like musicians playing together
   - Context is like the concert hall's acoustics
   - Understanding happens through synchronization

2. **Collective Harmony**
   - Co-authors tune to each other's frequencies
   - Messages need to be "in key" with the thread
   - Quality comes from harmonic alignment
   - Value crystallizes at resonant nodes

## Value and Resonance

1. **Harmonic Value Fields**
   - Value flows like sound through space
   - Quality content creates resonant wells
   - Token stakes set up standing waves
   - Understanding spreads through phase-locking

2. **Resonance Effects**
   - AI summaries detect harmonic patterns
   - Approvals synchronize oscillations
   - Citations couple different frequencies
   - Value accumulates at harmonic nodes

## Multi-Scale Harmony

1. **Token Scale**
   - Words vibrate at base frequencies
   - Phrases create harmonic series
   - Sentences form standing waves
   - Paragraphs become resonant fields

2. **Message Scale**
   - Content forms wave packets
   - Citations couple phases
   - Approvals collapse resonance
   - Value measures amplitude

3. **Thread Scale**
   - Conversations couple oscillators
   - Context shapes resonant cavity
   - Understanding achieves phase lock
   - Quality reflects harmonic purity

## Why This Matters

Understanding harmonic semantics helps us see:
- Why good writing has natural rhythm
- Why context shapes meaning like acoustics
- Why value emerges from resonance
- Why quality needs harmonic alignment

Think of it like this:
- Normal platforms treat messages like static objects
- Choir treats them like waves in a resonant medium
- This isn't just a metaphor - it's how meaning naturally works
- We're just making the wave nature explicit

## Practical Implications

This harmonic view explains:
- Why unanimous approval creates stable resonance
- Why stakes create standing waves of value
- Why citations couple different frequencies
- Why quality emerges from natural harmony

Through this lens, Choir becomes a platform that works with meaning's natural wave-like properties, creating spaces where ideas can resonate, harmonize, and evolve together.


==
Theory_ThreadDynamics
==


# Thread Dynamics and Quantum Equity

VERSION thread_dynamics:
invariants: {
"Energy conservation",
"Phase coherence",
"Equity quantization",
"Continuous stake scaling"
}
assumptions: {
"Quantum harmonic oscillation",
"Natural frequency emergence",
"Temperature evolution",
"Stake-equity correspondence"
}
docs_version: "0.2.2"

## Core Measurements

1. **Thread Temperature (T)**
   ```python
   # Energy from denials increases temperature
   def calculate_temperature(thread: Thread) -> float:
       """
       T = E/N where:
       E = thread energy (from denials)
       N = number of co-authors
       """
       return thread.energy / len(thread.co_authors)
   ```

2. **Thread Frequency (ω)**
   ```python
   def calculate_frequency(thread: Thread) -> float:
       """
       ω = natural frequency from activity and value
       Higher ω = higher base price P₀
       """
       activity = thread.message_rate / sqrt(len(thread.co_authors))
       value = log(1 + thread.token_balance)
       return sqrt(activity**2 + value**2)
   ```

3. **Base Price (P₀)**
   ```python
   def calculate_base_price(T: float, ω: float) -> float:
       """
       P₀ = S₀[1/2 + 1/(exp(ℏω/kT)-1)]

       Base price for 1/N equity share
       Any positive stake amount is valid
       Equity follows √n scaling
       """
       S₀ = BASE_STAKE_QUANTUM
       h_bar = PLATFORM_COUPLING_CONSTANT
       k = BOLTZMANN_CONSTANT

       return S₀ * (0.5 + 1/(exp(h_bar * ω / (k * T)) - 1))
   ```

4. **Equity Distribution**
   ```python
   def calculate_equity(stake: float, P₀: float, N: int) -> float:
       """
       E = (1/N) * √(stake/P₀)

       stake: Any positive amount
       P₀: Base price for 1/N share
       N: Current number of co-authors
       """
       return (1/N) * sqrt(stake/P₀)
   ```

## Thermodynamic Effects

1. **Denial Flow**
   ```python
   def handle_denial(thread: Thread, stake: float):
       """Denial increases thread temperature"""
       thread.energy += stake
       thread.temperature = thread.energy / len(thread.co_authors)
       thread.token_balance += stake
   ```

2. **Approval Flow**
   ```python
   def handle_approval(thread: Thread, stake: float):
       """Distribute by equity shares"""
       for coauthor, equity in thread.equity_map.items():
           reward = stake * equity
           send_tokens(coauthor, reward)
   ```

3. **Split Decision**
   ```python
   def handle_split(thread: Thread, stake: float,
                   approvers: int, deniers: int):
       """Balance treasury and thread energy"""
       total = approvers + deniers
       denier_share = (deniers/total) * stake
       approver_share = stake - denier_share

       # Denier share to thread
       thread.energy += denier_share
       thread.token_balance += denier_share

       # Approver share to treasury
       treasury.deposit(approver_share)
   ```

## Natural Selection Through Energy

1. **Hot Threads** (High rejection rate)
   - Accumulate energy from denials
   - Higher base price P₀
   - Natural quality filter
   - Stronger resonant cavity

2. **Cool Threads** (High approval rate)
   - Direct rewards to co-authors
   - Lower barriers to entry
   - Natural collaboration space
   - Phase-locked stability

## Stake Scaling Examples

```python
# For thread with N co-authors:
examples = [
    (P₀/4,  0.5/N),  # Quarter stake -> half quantum
    (P₀,    1.0/N),  # Base stake -> full quantum
    (4*P₀,  2.0/N)   # 4x stake -> double quantum
]
```

## Implementation Notes

1. **Equity Properties**
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

Through this quantum thermodynamic model, we create:
- Natural quality emergence
- Fair value distribution
- Sustainable evolution
- Coherent communities
