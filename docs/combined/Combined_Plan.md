# Plan Documentation




==
Plan_Checklist
==


# Development Checklist & Status

VERSION plan_status:
invariants: {
"Documentation-driven development",
"Prior flow integrity",
"Effect coherence"
}
assumptions: {
"AI code generation capabilities",
"Vector space stability",
"WebSocket reliability"
}
docs_version: "0.2.3"

## Progress So Far

### Backend Development
- [x] Initial FastAPI application setup
- [x] WebSocket handler implementation
- [x] Database client (Qdrant) integration
- [x] Basic chorus cycle structure
- [x] Vector search implementation
- [x] Effect system foundation

### Frontend Development
- [x] Three-panel layout
- [x] WebSocket connection
- [x] Basic message display
- [x] Step visualization
- [x] Prior panel structure

## Next Steps

### Chorus Cycle Implementation
- [ ] Step Prompts
  - [ ] ACTION: "Beginner's mind" prompt
  - [ ] EXPERIENCE: Context integration prompt
  - [ ] INTENTION: Goal analysis prompt
  - [ ] OBSERVATION: Semantic recording prompt
  - [ ] UPDATE: Loop decision prompt
  - [ ] YIELD: Citation integration prompt

- [ ] Prior Flow
  - [ ] EXPERIENCE: Get n=80 priors
  - [ ] INTENTION: Analyze for user goal
  - [ ] OBSERVATION: Record in Qdrant
  - [ ] YIELD: Natural citations

- [ ] Effect System
  - [ ] Clean effect types
  - [ ] Proper accumulation
  - [ ] UI synchronization
  - [ ] Error handling

### Frontend Components
- [ ] AIResponse
  - [ ] Step visualization
  - [ ] Prior display
  - [ ] Citation rendering
  - [ ] Loading states

- [ ] PriorPanel
  - [ ] Prior list display
  - [ ] Citation preview
  - [ ] Prior filtering
  - [ ] Selection handling

### Database Integration
- [ ] Semantic Recording
  - [ ] Design link schema
  - [ ] Implement recording
  - [ ] Enable retrieval
  - [ ] Track metadata

- [ ] Vector Search
  - [ ] Optimize parameters
  - [ ] Handle errors
  - [ ] Add caching
  - [ ] Improve ranking

### Testing
- [ ] Backend Tests
  - [ ] Step functions
  - [ ] Prior flow
  - [ ] Effect system
  - [ ] Semantic recording

- [ ] Frontend Tests
  - [ ] Component rendering
  - [ ] Effect handling
  - [ ] Prior display
  - [ ] Citation integration

## Immediate Priorities

1. **Prior Flow**
   - Complete EXPERIENCE step
   - Implement semantic recording
   - Add citation integration
   - Test prior handling

2. **Effect System**
   - Clean up effect types
   - Fix accumulation
   - Add error handling
   - Test effect flow

3. **UI Components**
   - Update AIResponse
   - Enhance PriorPanel
   - Add loading states
   - Test interactions

## Notes
- Keep prior flow simple and clean
- Focus on semantic recording
- Maintain effect coherence
- Enable natural citations


==
Plan_FrontendChecklist
==


# Frontend Development Checklist

## Completed Tasks
- [x] Three-panel layout (ThreadList, ChoirChat, PriorPanel)
- [x] WebSocket connection
- [x] Basic message display
- [x] Step visualization structure
- [x] Prior panel foundation

## Next Steps

### AIResponse Component
- [ ] Step Visualization
  - [ ] ACTION: Show initial response
  - [ ] EXPERIENCE: Show priors panel
  - [ ] INTENTION: Show goal analysis
  - [ ] OBSERVATION: Show semantic links
  - [ ] UPDATE: Show loop decision
  - [ ] YIELD: Show cited response

- [ ] Loading States
  - [ ] Step transitions
  - [ ] Prior loading
  - [ ] Effect processing
  - [ ] Citation rendering

### PriorPanel Component
- [ ] Prior Display
  - [ ] Show all priors in EXPERIENCE
  - [ ] Prior preview cards
  - [ ] Citation tooltips
  - [ ] Source navigation

- [ ] Prior Interaction
  - [ ] Preview hover
  - [ ] Source navigation
  - [ ] Citation links
  - [ ] Thread context

### Effect Handling
- [ ] Effect Processing
  - [ ] Step responses
  - [ ] Prior updates
  - [ ] State transitions
  - [ ] Error handling

- [ ] UI Updates
  - [ ] Step visualization
  - [ ] Prior panel
  - [ ] Message flow
  - [ ] Loading states

### State Management
- [ ] Thread State
  - [ ] Message history
  - [ ] Current thread
  - [ ] Co-authors
  - [ ] Thread status

- [ ] Chorus State
  - [ ] Current step
  - [ ] Step responses
  - [ ] Prior tracking
  - [ ] Effect accumulation

### Error Handling
- [ ] Error Boundaries
  - [ ] Component recovery
  - [ ] State recovery
  - [ ] WebSocket reconnection
  - [ ] Effect replay

- [ ] User Feedback
  - [ ] Error messages
  - [ ] Loading indicators
  - [ ] Step progress
  - [ ] Action feedback

### Testing
- [ ] Component Tests
  - [ ] AIResponse rendering
  - [ ] Prior display
  - [ ] Effect handling
  - [ ] State updates

- [ ] Integration Tests
  - [ ] WebSocket flow
  - [ ] Effect processing
  - [ ] Prior handling
  - [ ] Citation display

## Immediate Focus
1. Complete AIResponse step visualization
2. Implement prior display in PriorPanel
3. Add effect handling
4. Add loading states

## Notes
- Keep prior flow simple
- Focus on effect handling
- Maintain state coherence
- Enable natural citations


==
Plan_Hyperconverge
==


# Development Pattern Convergence

VERSION convergence_system:
invariants: {
"Documentation-code alignment",
"Test-implementation coherence",
"Pattern emergence preservation",
"Quantum equity scaling"
}
assumptions: {
"AI code generation capabilities",
"Documentation completeness",
"Test framework stability",
"Continuous stake distribution"
}
docs_version: "0.2.3"

## Core Development Patterns

1. **Chorus Cycle Pattern**
```python
# Flow through cycle
EXPERIENCE:
    priors = get_n80_priors()      # Vector search
    return synthesis, priors        # No filtering

INTENTION:
    analyze_for_user_goal(priors)   # Goal context
    return intent_analysis          # No filtering

OBSERVATION:
    record_semantic_link(          # Record hyperedge
        source=user_message,
        response=ai_response,
        priors=cited_priors
    )
    return observation             # Build network

YIELD:
    generate_with_citations(priors)  # Natural integration
    return cited_response           # Final synthesis
```

2. **Quantum Equity Pattern**
```python
# Quantum harmonic scaling
def calculate_equity(stake: float, base_price: float, N: int) -> float:
    """
    stake: Any positive amount
    base_price: P₀ from quantum oscillator
    N: Current number of co-authors
    """
    return (1/N) * math.sqrt(stake/base_price)

# Examples:
stake = P₀/4  -> equity = (1/2N)  # Quarter stake
stake = P₀    -> equity = (1/N)   # Base quantum
stake = 4P₀   -> equity = (2/N)   # Double quantum
```

3. **Semantic Link Pattern**
```python
class SemanticLink:
    """Hyperedge in thoughtspace"""
    def __init__(self, source, response, priors):
        self.nodes = [source, response, *priors]
        self.position = average_embeddings(self.nodes)
        self.thread_id = source.thread_id
        self.created_at = datetime.now(UTC)

def record_semantic_link(source, response, priors):
    """Record in Qdrant"""
    link = SemanticLink(source, response, priors)
    store_in_qdrant(link)
    return link
```

4. **Thread Thermodynamics Pattern**
```python
def handle_denial(thread: Thread, stake: float):
    """Denial increases thread temperature"""
    thread.energy += stake
    thread.temperature = thread.energy / len(thread.co_authors)
    thread.token_balance += stake

def handle_approval(thread: Thread, stake: float):
    """Distribute by equity shares"""
    for coauthor, equity in thread.equity_map.items():
        reward = stake * equity
        coauthor.balance += reward
```

## Implementation Structure

1. **Backend Core**
```python
api/
├── app/
│   ├── chorus_cycle.py   # AEIOU-Y steps
│   ├── database.py      # Vector storage + semantic links
│   ├── quantum.py       # Equity calculation
│   ├── websocket.py     # Effect channel
│   └── models/
│       ├── thread.py    # Thread state + equity
│       ├── semantic.py  # Semantic link types
│       └── effect.py    # Effect types
```

2. **Frontend Core**
```typescript
src/
├── components/
│   ├── AIResponse/      // Step display
│   ├── PriorPanel/      // Prior display
│   ├── SemanticView/    // Link visualization
│   └── MessageFlow/     // Message flow
├── hooks/
│   ├── useThread.ts     // Thread + equity state
│   ├── useQuantum.ts    // Equity calculations
│   └── useSemantics.ts  // Link handling
```

## Next Steps

1. **Quantum Implementation**
   - Implement equity calculation
   - Add stake validation
   - Update reward distribution
   - Test quantum mechanics

2. **Semantic Integration**
   - Complete link recording
   - Add link visualization
   - Update search/retrieval
   - Test semantic integrity

3. **Thermodynamic Tracking**
   - Implement temperature evolution
   - Add frequency calculation
   - Update base price computation
   - Test energy conservation

The key realization is that both value distribution and semantic meaning follow quantum mechanical principles, creating a unified system for knowledge and value evolution.


==
Plan_Restructure
==


# Codebase Restructuring Plan

VERSION restructure_plan:
invariants: {
"Documentation-code alignment",
"Mobile-first architecture",
"Clear state boundaries"
}
assumptions: {
"create-solana-dapp base",
"Documentation completeness",
"Test infrastructure stability"
}
docs_version: "0.2.1"

## Current Status (Oct 28)

Starting from create-solana-dapp template with:
- Next.js frontend
- FastAPI backend
- Anchor program
- Basic testing setup

## Frontend Restructuring (src/)

1. **Core Components**
```typescript
src/
├── components/
│   ├── ChoirChat/        // Main chat container
│   │   ├── ChoirChat.tsx // Three-panel layout
│   │   ├── MessageFlow.tsx // Message & step display
│   │   └── types.ts      // Chat types
│   ├── AIResponse/       // Step visualization
│   │   ├── AIResponse.tsx // Step display
│   │   ├── StepContent.tsx // Step-specific content
│   │   └── types.ts      // Step types
│   ├── PriorPanel/       // Prior handling
│   │   ├── PriorPanel.tsx // Prior display
│   │   ├── PriorCard.tsx  // Prior preview
│   │   └── types.ts      // Prior types
│   └── ui/              // Shared components
```

2. **State Management**
```typescript
src/
├── hooks/
│   ├── useThread.ts      // Thread state
│   ├── useWebSocket.ts   // Real-time comms
│   ├── useChorusCycle.ts // Cycle state & effects
│   └── usePriors.ts      // Prior handling
```

3. **Mobile-First UI**
```typescript
src/
├── styles/
│   ├── BottomSheet.module.css  // Sheet animations
│   ├── MessageFlow.module.css  // Message display
│   └── ChorusPanel.module.css  // Panel layout
```

## Backend Restructuring (api/)

1. **Core Services**
```python
api/
├── app/
│   ├── chorus_cycle.py   # AEIOU-Y cycle
│   ├── database.py      # Qdrant operations
│   ├── websocket.py     # Real-time comms
│   └── models/
│       ├── message.py   # Message types
│       ├── prior.py     # Prior types
│       └── effect.py    # Effect types
```

2. **Chorus Cycle**
```python
chorus_cycle.py
├── ChorusCycle         # Core cycle
│   ├── run_action      # Beginner's mind
│   ├── run_experience  # Get n=80 priors
│   ├── run_intention   # Analyze for goal
│   ├── run_observation # Record in Qdrant
│   ├── run_update      # Loop decision
│   └── run_yield       # Natural citations
```

## Solana Program Restructuring (anchor/)

1. **Core Program**
```rust
programs/basic/src/
├── lib.rs              # Program entry point
├── state/
│   ├── thread.rs       # Thread account
│   ├── message.rs      # Message state
│   └── token.rs        # Token handling
├── instructions/
│   ├── create.rs       # Thread creation
│   ├── submit.rs       # Message submission
│   └── approve.rs      # Approval processing
└── error.rs            # Custom errors
```

2. **Testing Infrastructure**
```typescript
tests/
├── thread.ts           # Thread tests
├── message.ts          # Message tests
└── token.ts           # Token tests
```

## Implementation Priority

1. **Phase 1: Prior Flow (Oct 29)**
   - Vector search implementation
   - Prior display components
   - Semantic recording
   - Citation integration

2. **Phase 2: Effect System (Oct 30)**
   - Effect type cleanup
   - Effect accumulation
   - UI synchronization
   - Error handling

3. **Phase 3: Step Processing (Oct 31)**
   - Step prompts
   - State transitions
   - Real-time updates
   - Loading states

## Testing Strategy

1. **Frontend Tests**
```typescript
// Jest + React Testing Library
- Component rendering
- Hook behavior
- WebSocket interactions
- Mobile gestures
```

2. **Backend Tests**
```python
# Pytest
- WebSocket protocol
- Chorus cycle logic
- State management
- Real-time updates
```

3. **Program Tests**
```rust
// Anchor tests
- Thread operations
- Message flow
- Token distribution
```

## Migration Steps

1. **Frontend Migration**
- Create new component structure
- Implement mobile-first UI
- Set up WebSocket hooks
- Add Chorus cycle state

2. **Backend Migration**
- Set up WebSocket protocol
- Implement Chorus cycle
- Add Qdrant integration
- Configure real-time updates

3. **Program Migration**
- Structure program accounts
- Implement instructions
- Add state management
- Set up tests

## Success Metrics

- Clean component hierarchy
- Mobile-first functionality
- Real-time responsiveness
- Test coverage
- Documentation alignment

Through this restructuring, we'll create a foundation that:
- Enables rapid iteration
- Maintains clear boundaries
- Supports mobile-first design
- Preserves testing integrity


==
Plan_ToBeContinued
==


# Plan To Be Continued

## Current Status

### Frontend
1. Layout structure complete:
   - 3-column layout with ThreadList, MessageFlow, and PriorPanel
   - Fixed input at bottom of center column
   - Proper height constraints and overflow handling

2. Component Structure:
   - AIResponse component ready for step visualization
   - MessageFlow handling user/AI messages
   - PriorPanel ready for prior display

3. State Management:
   - useWebSocket hook for real-time updates
   - useThread hook for thread state
   - useChorusCycle hook for cycle state

### Backend
1. Database Setup:
   - Qdrant collections configured:
     - messages (1536d vectors)
     - chat_threads (1536d vectors)
     - users (1536d vectors)
   - Collection operations implemented

2. Initial Structure:
   - WebSocket handler ready
   - Basic chorus cycle implemented
   - Database client with vector search

## Next Steps

### 1. Chorus Cycle Implementation

1. **ACTION**
   - [ ] Implement "beginner's mind" prompt
   - [ ] Add confidence scoring
   - [ ] Setup effect generation
   - [ ] Add error handling

2. **EXPERIENCE**
   - [ ] Implement vector search (n=80)
   - [ ] Format priors for context
   - [ ] Return both synthesis and priors
   - [ ] No filtering at this stage

3. **INTENTION**
   - [ ] Analyze priors for user's goal
   - [ ] Consider how priors support intent
   - [ ] Return intent analysis
   - [ ] No filtering yet

4. **OBSERVATION**
   - [ ] Record semantic links in Qdrant
   - [ ] Store which priors were cited
   - [ ] Build knowledge graph
   - [ ] Return observation analysis

5. **UPDATE**
   - [ ] Implement loop/proceed decision
   - [ ] Add confidence threshold
   - [ ] Track decision reasoning
   - [ ] Handle state transitions

6. **YIELD**
   - [ ] Natural citation integration
   - [ ] Markdown formatting
   - [ ] Citation quality checks
   - [ ] Final response synthesis

### 2. Prior Flow Implementation

1. **Vector Search**
   - [ ] Optimize search parameters
   - [ ] Handle embedding errors
   - [ ] Add result caching
   - [ ] Improve ranking

2. **Semantic Recording**
   - [ ] Design semantic links schema
   - [ ] Implement recording in Qdrant
   - [ ] Add metadata tracking
   - [ ] Enable future retrieval

3. **Citation Integration**
   - [ ] Design citation format
   - [ ] Implement natural integration
   - [ ] Add citation previews
   - [ ] Handle citation navigation

### 3. Effect System

1. **Effect Generation**
   - [ ] Clean up effect types
   - [ ] Implement accumulation
   - [ ] Add error effects
   - [ ] Handle state updates

2. **Effect Handling**
   - [ ] Update UI components
   - [ ] Handle WebSocket events
   - [ ] Add error recovery
   - [ ] Maintain state coherence

### 4. Frontend Components

1. **AIResponse**
   - [ ] Step visualization
   - [ ] Prior display
   - [ ] Citation rendering
   - [ ] Loading states

2. **PriorPanel**
   - [ ] Prior list display
   - [ ] Citation preview
   - [ ] Prior filtering
   - [ ] Selection handling

## Immediate Focus
1. Complete prior flow implementation
2. Add semantic recording
3. Clean up effect system
4. Enhance citation handling

## Notes
- Keep prior flow clean and simple
- Focus on semantic recording
- Maintain effect coherence
- Enable natural citations
