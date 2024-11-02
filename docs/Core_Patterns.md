# Choir: Harmonic Intelligence Platform

VERSION harmonic_system:
invariants: {
"Wave resonance",
"Energy conservation",
"Pattern emergence"
}
assumptions: {
"Apple ecosystem excellence",
"Swift implementation",
"Natural harmonics"
}
docs_version: "0.3.0"  # Post-alignment vision, Nov 2024
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
