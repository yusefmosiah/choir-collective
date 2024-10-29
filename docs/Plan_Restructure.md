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
│   │   ├── ChoirChat.tsx // Chat interface
│   │   ├── MessageFlow.tsx // Message display
│   │   └── types.ts      // Chat types
│   ├── ChorusPanel/      // Bottom sheet UI
│   │   ├── ChorusPanel.tsx // Panel container
│   │   ├── StepContent.tsx // Step rendering
│   │   └── types.ts      // Panel types
│   ├── AIResponse/       // AI response handling
│   │   ├── AIResponse.tsx // Response display
│   │   ├── PriorRenderer.tsx // Prior citations
│   │   └── types.ts      // Response types
│   └── ui/              // Shared UI components
```

2. **State Management**
```typescript
src/
├── hooks/
│   ├── useThread.ts     // Thread state & operations
│   ├── useWebSocket.ts  // Real-time connection
│   ├── useChorus.ts     // Chorus cycle state
│   └── useBottomSheet.ts // Mobile UI gestures
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
├── main.py              # FastAPI application
├── chorus.py            # Chorus cycle implementation
├── websocket.py         # WebSocket protocol
├── database.py          # Qdrant integration
└── models/
    ├── thread.py        # Thread state
    ├── message.py       # Message types
    └── user.py          # User session
```

2. **WebSocket Protocol**
```python
websocket.py
├── ConnectionManager    # Connection handling
├── ThreadSubscription   # Room management
└── MessageQueue        # Real-time updates
```

3. **Chorus Cycle**
```python
chorus.py
├── ChorusCycle         # Core cycle logic
├── StepProcessor       # Step handling
└── PriorIntegration    # Citation management
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

1. **Phase 1: Core Chat (Oct 29)**
- WebSocket implementation
- Real-time message flow
- Prior rendering
- Thread state management

2. **Phase 2: Mobile UI (Oct 30)**
- Bottom sheet implementation
- Tab navigation
- Gesture handling
- Safe area management

3. **Phase 3: Chorus Cycle (Oct 31)**
- Step processing
- Prior integration
- State transitions
- Real-time updates

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
