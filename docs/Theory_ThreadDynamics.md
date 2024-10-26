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
