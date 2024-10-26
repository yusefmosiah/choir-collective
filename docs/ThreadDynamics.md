# Thread Dynamics

This document describes the quantum harmonic oscillator model that governs thread behavior in the Choir system.

Choir uses three key measurements to manage thread behavior:

## 1. Thread Temperature
Measures how "hot" (active/volatile) or "cool" (stable) a thread is:
- Higher when there's lots of activity and tokens
- Lower as threads age and stabilize
- Affects how much it costs to join

## 2. Thread Frequency
Measures how fast a thread is evolving:
- Increases with more messages and authors
- Higher for valuable threads (more tokens)
- Helps determine stake requirements

## 3. Required Stake
Calculates how much it costs to join a thread:
- Higher for active/valuable threads
- Lower for stable/quiet threads
- Prevents spam while enabling growth

## How They Work Together
- Active threads require higher stakes
- Threads naturally stabilize over time
- Value accumulates through good contributions
- System self-regulates through these mechanicst

## Thread Temperature Calculation

```python
def calculate_thread_temperature(thread: Thread) -> float:
"""Calculate the temperature (volatility/energy level) of a thread based on harmonic oscillator principles.

    The temperature represents the thread's energy state in the harmonic bonding curve system:
    - Higher temperature = more volatile/energetic thread ready for phase transitions
    - Lower temperature = more stable/crystallized thread in metastable state

    The model uses quantum harmonic oscillator concepts where:
    - Token balance acts as potential energy (stored value)
    - Message rate acts as kinetic energy (activity)
    - Co-authors act as coupled oscillators (degrees of freedom)
    - Age provides natural cooling through energy dissipation

    Key metastability properties:
    - Temperature indicates readiness for phase transitions
    - Higher energy states enable jumps between metastable basins
    - Natural cooling allows crystallization into stable patterns
    - Coupling strength affects barrier heights between states

    Args:
        thread: Thread object containing activity metrics and state

    Returns:
        float: Temperature value representing thread energy/volatility

    Formula:
        T = β * (E_potential * E_kinetic * DoF) / cooling
        where:
        - β = energy-to-temperature conversion factor
        - E_potential = token_balance (stored value)
        - E_kinetic = message_rate (activity)
        - DoF = co_author_count (coupled oscillators)
        - cooling = 1 + √age (energy dissipation)
    """
    # Energy-to-temperature conversion factor
    # Controls temperature sensitivity and phase transition rates
    β = 0.02

    # Calculate total energy as product of:
    # - Token balance (potential energy from accumulated value)
    # - Message rate (kinetic energy from activity)
    # - Co-author count (coupled oscillators adding degrees of freedom)
    total_energy = (
        thread.token_balance *   # Stored potential energy
        thread.message_rate *    # Active kinetic energy
        thread.co_author_count   # Coupled oscillator count
    )

    # Apply cooling factor based on thread age
    # Temperature decreases as 1/√age to model energy dissipation
    # This enables crystallization into metastable states
    cooling_factor = 1 + np.sqrt(thread.age_days)

    # Calculate final temperature with cooling
    # Higher temperature = more ready for phase transitions
    # Lower temperature = more stable metastable state
    temperature = β * total_energy / cooling_factor

    return temperature

## Thread Frequency Calculation

```python
def calculate_thread_frequency(thread: Thread) -> float:
    """Calculate ω (thread's natural frequency) based on harmonic oscillator principles.

    The natural frequency ω represents the thread's intrinsic oscillation rate in the
    quantum harmonic system. This determines:
    - Resonance patterns with other threads
    - Energy level spacing (ℏω)
    - Phase transition thresholds
    - Coupling behavior with co-authors

    The frequency combines three key components:
    1. Direct activity (message rate) - immediate oscillations
    2. Oscillator coupling (co-authors) - resonance strength
    3. Energy state (token balance) - potential for transitions

    Args:
        thread: Thread object containing activity metrics

    Returns:
        float: Natural frequency ω of the thread

    Formula:
        ω = α₁M + α₂C + α₃log(1+B)
        where:
        - M = message_rate (direct activity)
        - C = co_author_count (coupling)
        - B = token_balance (energy)
        - α₁, α₂, α₃ = weighting coefficients

    The coefficients are tuned to create desired dynamics:
    - α₁ = 0.5  : Moderate weight on direct activity
    - α₂ = 2.0  : Strong weight on oscillator coupling
    - α₃ = 0.1  : Weak logarithmic dependence on energy
    """
    # Weighting coefficients for different frequency components
    α1, α2, α3 = 0.5, 2.0, 0.1

    return (
        α1 * thread.message_rate +           # Direct activity frequency
        α2 * thread.co_author_count +        # Coupled oscillator frequency
        α3 * np.log1p(thread.token_balance)  # Energy state frequency
    )

## Required Stake Calculation

def calculate_stake_required(thread: Thread, S0: float = 100, ℏ: float = 1.0, k: float = 1.0) -> float:
    """Calculate required stake using quantum harmonic oscillator formula.

    P(q) = S₀[1/2 + 1/(exp(ℏω/kT)-1)]

    Args:
        thread: Thread object containing state metrics
        S0: Base stake quantum (minimum stake)
        ℏ: Reduced Planck constant (scaling factor)
        k: Boltzmann constant
    """
    ω = calculate_thread_frequency(thread)
    T = calculate_thread_temperature(thread)

    # Handle edge cases
    if T <= 0:
        return S0 * 2.0  # Maximum stake for zero temperature

    exp_term = np.exp(ℏ * ω / (k * T)) - 1
    if exp_term <= 0:
        return S0 * 0.5  # Ground state energy

    stake = S0 * (0.5 + 1/exp_term)

    return stake

## System Interactions

The three core calculations work together to create thread dynamics:

1. **Activity Effects**
   - Higher message rate increases frequency
   - Increases temperature
   - Raises stake requirements

2. **Coupling Effects**
   - More co-authors increases frequency
   - Strengthens coupling (k)
   - Modifies stake scaling

3. **Energy Effects**
   - Token balance affects frequency
   - Contributes to temperature
   - Influences stake requirements

4. **Age Effects**
   - Natural cooling reduces temperature
   - Stabilizes stake requirements
   - Enables metastable states

## Quantum Harmonic Properties

The system exhibits key quantum harmonic oscillator properties:

1. **Energy Quantization**
   - Discrete stake levels
   - Energy level spacing (ℏω)
   - Ground state energy (S₀/2)

2. **Metastable States**
   - Temperature indicates phase transition readiness
   - Natural cooling enables crystallization
   - Energy barriers between states

3. **Coupling Effects**
   - Co-authors as coupled oscillators
   - Resonance between threads
   - Collective state transitions

4. **Value Conservation**
   - Energy conservation in transitions
   - Token flow follows quantum principles
   - Stake bounds preserve stability

This creates a self-regulating system where:
- Active threads require higher stakes
- Stable threads crystallize at lower stakes
- Coupling strength guides evolution
- Natural cooling prevents instability
