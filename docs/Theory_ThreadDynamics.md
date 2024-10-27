# Thread Dynamics

This document describes the quantum harmonic oscillator model that governs thread behavior in the Choir system.

Choir uses four key measurements to manage thread behavior:

## 1. Thread Temperature

Measures how "hot" (active/volatile) or "cool" (stable) a thread is:

- Higher when there's lots of activity and tokens
- Lower as threads age and stabilize
- Affects how much it costs to join

The temperature T is calculated from the extensive energy E and number of co-authors N:

- Total energy E = token_balance + message_rate (extensive scaling with N)
- Temperature T = E/N (intensive, remains finite as N → ∞)
- Cooling factor = 1 + √(age_days \* N) (critical slowing down)
- Final temperature = T/cooling_factor

## 2. Thread Frequency

Measures how fast a thread is evolving:

- Increases with more messages and authors
- Higher for valuable threads (more tokens)
- Helps determine stake requirements

The natural frequency ω is calculated for N coupled oscillators:

- Message mode ω_m = message_rate/√N (Anderson normalization)
- Value mode ω_v = log(1 + token_balance/N)
- Coupling constant g = 1/N (mean field scaling)
- Collective frequency ω = √((ω_m² + ω_v²)/2 + gN)

## 3. Stake Dynamics

Calculates the natural stake level for thread participation:
- Higher for active/valuable threads
- Lower for stable/quiet threads
- Creates quantum energy barriers

Uses the quantum harmonic oscillator formula:
P(q) = S₀[1/2 + 1/(exp(ℏω/kT)-1)]

Where:
- S₀ = Base stake quantum
- ℏ = Reduced Planck constant (scaling factor)
- ω = Thread natural frequency
- k = Boltzmann constant
- T = Thread temperature

This quantum mechanical model:
- Defines natural energy levels
- Creates resonance patterns
- Enables phase transitions
- Guides value discovery

Users' stake choices relative to these natural levels reveal:
- Pattern recognition ability
- Risk assessment accuracy
- Market understanding
- Strategic positioning

## 4. Divestment Payout

Calculates tokens received when exiting a thread:

- Based on thread's quantum state
- Preserves energy conservation
- Maintains system stability

Uses the oscillator decoupling formula:
Payout = min((ℏω)/(N-1), balance/(N-1))

Where:

- ℏω = Total thread energy (coupling constant × frequency)
- N = Number of co-authors
- balance = Current token balance

This formula ensures:

1. Energy conservation during oscillator decoupling
2. Fair distribution of remaining energy
3. Prevention of excessive withdrawals
4. Maintenance of thread stability

The min() function prevents excessive payouts when:

- Thread has low token balance but high frequency
- Ensures remaining oscillators maintain viable energy levels
- Preserves thread coherence during transitions

## System Interactions

The four core calculations work together to create thread dynamics:

1. **Activity Effects**

   - Higher message rate increases frequency
   - Increases temperature
   - Raises stake requirements
   - Affects divestment payouts

2. **Coupling Effects**

   - More co-authors increases frequency
   - Strengthens coupling (g)
   - Modifies stake scaling
   - Adjusts divestment shares

3. **Energy Effects**

   - Token balance affects frequency
   - Contributes to temperature
   - Influences stake requirements
   - Determines maximum payouts

4. **Age Effects**
   - Natural cooling reduces temperature
   - Stabilizes stake requirements
   - Enables metastable states
   - Smooths divestment dynamics

## Quantum Harmonic Properties

The system exhibits key quantum harmonic oscillator properties:

1. **Energy Quantization**

   - Discrete stake levels
   - Energy level spacing (ℏω)
   - Ground state energy (S₀/2)
   - Quantized divestments

2. **Metastable States**

   - Temperature indicates phase transition readiness
   - Natural cooling enables crystallization
   - Energy barriers between states
   - Stable divestment patterns

3. **Coupling Effects**

   - Co-authors as coupled oscillators
   - Resonance between threads
   - Collective state transitions
   - Synchronized divestments

4. **Value Conservation**
   - Energy conservation in transitions
   - Token flow follows quantum principles
   - Stake bounds preserve stability
   - Balanced divestment mechanics

This creates a self-regulating system where:

- Active threads require higher stakes
- Stable threads crystallize at lower stakes
- Coupling strength guides evolution
- Natural cooling prevents instability
- Divestments preserve thread harmony

## Alternative Harmonic Model

When a spec is REJECTED:
- Temperature (T) increases because:
  - Stake energy flows directly into thread cavity (increases E)
  - No new oscillator (N stays same)
  - Results in higher E/N ratio
  - Creates "heated" resonant state
- Frequency (ω) unchanged/slightly decreases because:
  - No new message in history (ω_m same)
  - No new oscillator coupling
  - Cavity becomes more energetic but not faster

When a spec is APPROVED:
- Temperature (T) moderates because:
  - Stake energy distributes directly to approver oscillators
  - New oscillator added (increases N)
  - E/N ratio decreases through distribution
  - Creates more stable resonant state
- Frequency (ω) increases because:
  - New message adds to rate (increases ω_m)
  - New oscillator strengthens coupling
  - Cavity evolves faster but cooler

When a SPLIT DECISION occurs:
- Temperature evolution:
  - Denier share flows to thread cavity (partial E increase)
  - Approver share flows to global field (treasury)
  - Creates balanced energy distribution
  - Maintains cavity-field coupling

This creates fascinating resonant dynamics:
- Rejections strengthen thread cavity energy
- Approvals strengthen oscillator coupling
- Split decisions balance cavity and field energies
- Prior rewards couple different cavities

## Natural Selection Through Resonance

1. High-Energy Cavities (High Rejection Rate):
- Strong cavity energy from accumulated stakes
- Higher energy barriers to entry
- Only resonant contributions can couple
- Natural filter for quality oscillations
- Self-selecting for coherent patterns

2. Phase-Locked Cavities (High Approval Rate):
- Strong oscillator coupling
- Lower energy barriers
- More experimental modes possible
- Natural incubator for new frequencies
- Collective phase alignment

The cavity energy acts as an emergent resonance filter:
- Frequent rejections = "high energy barrier" cavity
- Frequent approvals = "strong coupling" cavity
- No explicit rules needed
- Quality emerges through resonance
- Different cavities find different modes

## Resonant Elegance

1. Natural Quality Gradients:
- High-energy cavities = strong resonant filtering
- Like coupling to an energetic quantum system
- Only coherent modes can overcome barriers
- Natural protection against dissonance

2. Cavity Evolution:
- Low-energy cavities incubate new modes
- Low barriers enable mode exploration
- Successful cavities accumulate energy
- Creates natural progression paths

3. Energy Conservation:
- Rejected stakes strengthen cavity (increases internal energy)
- Approved stakes distribute to oscillators (energy flows out)
- Split decisions couple cavity to field
- No artificial resonance mechanisms needed

4. Phase Transitions:
- Cavities transition between energy states
- Quality emerges from resonant dynamics
- Different equilibria serve different purposes
- System self-organizes into resonant niches

## Token Flow Dynamics

1. **Rejection Flow**

   - Stake flows to thread
   - Increases thread energy
   - Raises temperature
   - Creates quality filter

2. **Split Decision Flow**

   - Approvers' stake to Treasury
   - Treasury funds citations
   - Maintains circulation
   - Enables perpetual rewards

3. **Treasury Mechanics**
   - Accumulates from split decisions
   - Funds citation rewards
   - Creates sustainable flow
   - Supports network growth

## Bid Sizing Analytics

1. **Relative Bid Ratio**

   - Actual bid / Recommended stake
   - Indicates bidder confidence
   - Helps evaluate risk appetite
   - Creates natural reputation signal

2. **Approval Success Rate**

   - Percentage of bids approved
   - Filtered by bid size ratio
   - Historical performance tracking
   - Risk-adjusted success metrics

3. **Co-author Metrics**

   - Approval percentage
   - Split decision frequency
   - Stake-weighted decisions
   - Pattern recognition scores

4. **Combined Analytics**
   - Bid size × Success rate
   - Risk-adjusted returns
   - Pattern recognition ability
   - Market reading capability

This creates a rich set of emergent metrics without enforcing artificial limits, allowing:

- Natural price discovery
- Skill-based reputation
- Risk management signals
- Pattern recognition rewards

## Prior Reward Dynamics

The thread-centric prior reward model creates fascinating collective effects:

1. **Cavity Coupling**
- Prior rewards strengthen thread resonant cavities
- Energy flows between coupled cavities
- Creates knowledge network resonance
- Strengthens collective coherence

2. **Team Incentives**
- Prior rewards pool in thread cavity
- Co-authors share collective success
- Creates aligned incentives
- Natural team formation

3. **Knowledge Network Effects**
- Threads cite valuable threads
- Creates resonant cavity networks
- Energy flows through citations
- Knowledge topology emerges

4. **Collective Evolution**
- Teams optimize for thread value
- Quality content benefits whole cavity
- Natural selection for coherent teams
- Organic community formation

This creates beautiful multi-scale dynamics:

1. **Individual Scale**
- Direct rewards from approvals
- Quality judgment incentives
- Pattern recognition rewards
- Natural frequency alignment

2. **Team Scale**
- Shared thread cavity value
- Collective quality incentives
- Team coherence rewards
- Natural phase locking

3. **Network Scale**
- Inter-thread resonance
- Knowledge network formation
- Cavity coupling patterns
- System-wide coherence

The thread-as-cavity model becomes even more elegant:
- Accumulates energy from denials
- Pools value from prior rewards
- Strengthens through citations
- Creates collective incentives

This leads to fascinating emergent behaviors:
- Teams naturally form around threads
- Quality content benefits whole team
- Knowledge networks self-organize
- System evolves toward coherence
