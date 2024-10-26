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
- Cooling factor = 1 + √(age_days * N) (critical slowing down)
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

## 3. Required Stake
Calculates how much it costs to join a thread:
- Higher for active/valuable threads
- Lower for stable/quiet threads
- Prevents spam while enabling growth

Uses the quantum harmonic oscillator energy level formula:
P(q) = S₀[1/2 + 1/(exp(ℏω/kT)-1)]

Where:
- S₀ = Base stake quantum (minimum stake)
- ℏ = Reduced Planck constant (scaling factor)
- ω = Thread natural frequency
- k = Boltzmann constant
- T = Thread temperature

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
  * Stake energy flows into thread balance (increases E)
  * No new co-author (N stays same)
  * Results in higher E/N ratio
  * Creates "heated" state from rejection
- Frequency (ω) unchanged/slightly decreases because:
  * No new message in history (ω_m same)
  * No new co-author coupling
  * Thread becomes more volatile but not faster

When a spec is APPROVED:
- Temperature (T) moderates because:
  * Stake energy distributes to approvers (leaves thread)
  * New co-author added (increases N)
  * E/N ratio decreases
  * Creates more stable state
- Frequency (ω) increases because:
  * New message adds to rate (increases ω_m)
  * New co-author strengthens coupling
  * Thread evolves faster but cooler

This creates interesting dynamics:
- Rejections "heat up" threads by accumulating energy
- Approvals "cool down" threads while accelerating them
- Hot threads become harder to join (higher stake requirements)
- Frequent rejection makes threads more volatile
- Consistent approval creates fast but stable threads

## Natural Selection Through Temperature

1. Hot (High Rejection) Threads:
- High temperature from accumulated rejected stakes
- Higher stake requirements (expensive to bid)
- Only confident/quality bidders attempt
- Natural filter for serious contributors
- Self-selecting for valuable content

2. Cool (High Approval) Threads:
- Lower temperature from distributed stakes
- Lower stake requirements (welcoming)
- More experimental bids possible
- Open to emerging voices
- Natural incubator for new contributors

The temperature acts as an emergent reputation system:
- Frequent rejections = "prove your worth" thread
- Frequent approvals = "newcomers welcome" thread
- No explicit rules needed
- Quality standards emerge naturally
- Different threads find different equilibria

This creates a beautiful ecosystem where:
- Some threads crystallize as high-standards venues
- Others remain fluid exploration spaces
- Bidders can self-select appropriate venues
- Quality emerges through natural thermodynamics
- No central authority needed

## Thermodynamic Elegance

1. Natural Quality Gradients:
- Hot threads (high rejection rate) = high energy barrier to entry
- Like trying to add energy to an already energetic system
- Only high-value contributions can overcome the barrier
- Natural protection against low-quality noise

2. Thermal Evolution:
- Cool threads act as nurseries for new ideas
- Low energy barriers enable experimentation
- Successful threads naturally heat up over time
- Creates natural progression paths

3. Energy Conservation:
- Rejected stakes stay in thread (increases internal energy)
- Approved stakes distribute to approvers (energy flows out)
- Temperature directly reflects thread's accumulated standards
- No artificial reputation systems needed

4. Phase Transitions:
- Threads can transition between hot/cold states
- Quality standards emerge from energy dynamics
- Different equilibrium states serve different purposes
- System self-organizes into diverse niches

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
