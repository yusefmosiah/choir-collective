# Choir System Re-Entry Guide

VERSION reentry_guide:
invariants: {
"System coherence",
"Prior flow",
"Effect propagation"
}
docs_version: "0.2.1"

## Core Components

1. **Chorus Cycle (Backend)**
```python
# api/app/chorus_cycle.py
- AEIOU-Y step sequence:
  ACTION: Initial "beginner's mind" response
  EXPERIENCE: Gets n=80 priors, uses for context
  INTENTION: Analyzes in context of user's goal
  OBSERVATION: Records semantic links in Qdrant
  UPDATE: Loop or proceed decision
  YIELD: Natural citation integration

- Effect accumulation pattern
- Prior flow through steps
- JSON responses from OpenAI
```

2. **Three-Panel UI (Frontend)**
```typescript
// src/components/ChoirChat/ChoirChat.tsx
<div className="flex w-full h-full">
  <ThreadList />      // Left (w-64): Navigation
  <MessageFlow />     // Center (flex-1): Messages
  <PriorPanel />      // Right (w-80): Priors
</div>
```

3. **Vector Storage (Qdrant)**
```python
# api/app/database.py
- Messages with embeddings
- Semantic link recording
- Prior search (n=80)
- Thread organization
```

## Current Development Priorities

1. **Prior Flow**
   - EXPERIENCE gets priors
   - INTENTION analyzes for user goal
   - OBSERVATION records links
   - YIELD integrates citations

2. **Effect System**
   - Clear effect types
   - Proper accumulation
   - UI synchronization
   - Error handling

3. **State Management**
   - Thread state
   - Chorus state
   - UI state
   - WebSocket state

## Key Files & Responsibilities

```
api/
├── app/
│   ├── chorus_cycle.py   # Core cycle, effects, priors
│   ├── database.py       # Vector storage, semantic links
│   ├── models.py         # Data models, state types
│   └── websocket.py      # Real-time communication

src/
├── components/
│   ├── ChoirChat/        # Layout, coordination
│   ├── AIResponse/       # Step visualization
│   └── PriorPanel/       # Prior display
├── hooks/
│   ├── useThread.ts      # Thread state
│   ├── useChorusCycle.ts # Cycle state
│   └── useWebSocket.ts   # WebSocket state
└── types/
    └── index.ts          # Type definitions
```

## Data Flow Patterns

1. **Prior Flow**
```python
# EXPERIENCE
priors = await search_similar(input, limit=80)
return synthesis, priors  # All priors

# INTENTION
analyze_for_user_goal(priors, intent)

# OBSERVATION
record_semantic_links(input, cited_priors)

# YIELD
generate_with_citations(input, priors)
```

2. **Effect Flow**
```typescript
type Effect = {
  type: "chorus_response" | "error" | "state_update";
  payload: {
    step: ChorusStep;
    content: string;
    priors?: Prior[];  // Only in EXPERIENCE
  };
}
```

3. **State Flow**
```typescript
ThreadState -> ChorusState -> WebSocket -> UI State
```

## Implementation Details

1. **Chorus Cycle Implementation**
```python
# Current step functions:
async def run_action(input: str):
    # Initial "beginner's mind" response
    # No priors, pure response

async def run_experience(input: str):
    # Get n=80 priors
    # Use for context enrichment
    # Return (response, all_priors)

async def run_intention(input: str):
    # Analyze in context of user's goal
    # Consider how priors support intent
    # No filtering yet

async def run_observation(input: str):
    # Record semantic links in Qdrant
    # Store which priors were cited
    # Build knowledge graph

async def run_yield(input: str):
    # Generate final response
    # Natural citation integration
    # Markdown formatting
```

2. **Effect System**
```typescript
// Effect accumulation
effects = []
while (currentStep !== "yield") {
  const [newState, stepEffects] = await runStep(state, input)
  effects.push(...stepEffects)
}

// Effect types
type Effect = {
  type: "chorus_response",
  payload: {
    step: ChorusStep,
    content: string,
    priors?: Prior[]  // Only in EXPERIENCE
  }
}
```

3. **Prior Flow**
```python
# EXPERIENCE
priors = await search_similar(input, limit=80)
return synthesis, priors  # All priors

# INTENTION
analyze_for_user_goal(priors, intent)

# OBSERVATION
record_semantic_links(input, cited_priors)

# YIELD
generate_with_citations(input, priors)
```

## Current Priorities

1. **Prior Integration**
   - Proper flow through cycle
   - Natural citation integration
   - Semantic link recording
   - Knowledge graph building

2. **Effect System**
   - Clean effect types
   - Proper accumulation
   - UI synchronization
   - Error handling

3. **UI Components**
   - Three-panel layout
   - Step visualization
   - Prior display
   - Citation rendering

## Next Steps

1. **Immediate**
   - Update step prompts
   - Implement semantic recording
   - Clean up effect types
   - Fix prior flow

2. **Short Term**
   - Enhance citation UI
   - Improve error handling
   - Add loading states
   - Polish animations

3. **Medium Term**
   - Knowledge graph visualization
   - Enhanced search capabilities
   - Thread analytics
   - Performance optimization

## Development Patterns

1. **Documentation First**
   - Update docs before code
   - Clear type definitions
   - Step documentation
   - Flow diagrams

2. **Testing Strategy**
   - Unit test steps
   - Integration test cycle
   - UI component tests
   - Effect handling tests

3. **Code Organization**
   - Clear module boundaries
   - Consistent patterns
   - Type safety
   - Error handling

The system is evolving toward a coherent implementation of the quantum semantic model while maintaining practical usability.
