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
