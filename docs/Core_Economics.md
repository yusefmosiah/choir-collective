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
