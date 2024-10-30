# Plan To Be Continued

## Current Status

### Frontend
1. Layout structure complete:
   - 3-column layout with ThreadList, MessageFlow, and PriorPanel
   - Fixed input at bottom of center column
   - Proper height constraints and overflow handling

2. Component Structure:
   - AIResponse component ready to display chorus cycle steps
   - MessageFlow handling both user and AI messages
   - Proper TypeScript interfaces for all components

3. State Management:
   - useWebSocket hook with wallet integration
   - useThread hook for managing thread state
   - useChorusCycle hook for managing chorus cycle state

### Backend
1. Database Setup:
   - Qdrant collections configured:
     - messages (1536d vectors)
     - chat_threads (1536d vectors)
     - users (1536d vectors)
   - Collection operations implemented in DatabaseClient

2. Initial Structure:
   - WebSocket handler ready
   - Basic chorus cycle implementation
   - Database client with vector search

## Next Steps

### 1. Backend Implementation

#### Chorus Cycle (AEIOU-Y)
The Chorus Cycle inverts traditional AI agent design, starting with action and focusing on self-reflection:

1. **Action (A)**
   - Initial response with "beginner's mind"
   - Pure, unfiltered response without context
   - Purpose: Generate authentic, unbiased initial thoughts
   - Implementation:
     - [ ] Direct LLM call with minimal prompt
     - [ ] Structure response as markdown with confidence level
     - [ ] Add error handling and retry logic
     - [ ] Emit WebSocket events for step progress

2. **Experience (E)**
   - Search for relevant prior context (n=80 priors)
   - Vector similarity search in Qdrant
   - Purpose: Ground the response in existing knowledge
   - Implementation:
     - [ ] Implement vector search with proper ranking
     - [ ] Add semantic deduplication of results
     - [ ] Format priors for LLM context
     - [ ] Send prior preview events to frontend

3. **Intention (I)**
   - Analyze planned actions and consequences
   - Select most relevant priors from search_limit = 80
   - Purpose: Understand implications and align with goals
   - Implementation:
     - [ ] Create structured output format for selected priors
     - [ ] Add intent analysis with clear criteria
     - [ ] Track prior selection reasoning
     - [ ] Update frontend with selection state

4. **Observation (O)**
   - Self-reflection on analysis and intentions
   - Identify gaps and biases
   - Purpose: Critical examination of the process
   - Implementation:
     - [ ] Add structured gap analysis format
     - [ ] Enhance prompt for critical thinking
     - [ ] Store observations in Qdrant
     - [ ] Stream reflection to frontend

5. **Update (U)**
   - Binary decision: loop or proceed
   - Based on confidence and completeness
   - Purpose: Quality control gate
   - Implementation:
     - [ ] Define clear confidence thresholds
     - [ ] Add loop counter with limits
     - [ ] Track decision criteria
     - [ ] Notify frontend of loop/proceed

6. **Yield (Y)**
   - Final response synthesis
   - Include inline citations to priors
   - Purpose: Deliver comprehensive, grounded response
   - Implementation:
     - [ ] Format citations with prior links
     - [ ] Assemble final markdown response
     - [ ] Add quality verification checks
     - [ ] Stream final response to frontend

#### Database Integration
- [ ] Update database.py:
  - [ ] Thread management methods
  - [ ] User authentication
  - [ ] Thread history retrieval
  - [ ] Vector storage optimization

#### WebSocket Handler
- [ ] Enhance websocket_handler.py:
  - [ ] Message routing for each step
  - [ ] Connection management
  - [ ] Real-time updates
  - [ ] Error recovery

### 2. Frontend Integration
- [ ] Complete MessageFlow:
  - [ ] Add proper step transitions
  - [ ] Implement prior citation display
  - [ ] Add loading states

- [ ] Enhance ThreadList:
  - [ ] Add thread creation
  - [ ] Add thread selection
  - [ ] Show thread status

- [ ] Update PriorPanel:
  - [ ] Show relevant priors during experience step
  - [ ] Add prior selection
  - [ ] Add prior filtering

### 3. Wallet Integration
- [ ] Add user authentication:
  - [ ] Connect wallet to backend
  - [ ] Manage user sessions
  - [ ] Handle wallet changes

- [ ] Thread ownership:
  - [ ] Link threads to wallets
  - [ ] Manage thread permissions
  - [ ] Handle co-authors

### 4. Testing
- [ ] Add backend tests:
  - [ ] Test database operations
  - [ ] Test chorus cycle
  - [ ] Test WebSocket handling

- [ ] Add frontend tests:
  - [ ] Test components
  - [ ] Test hooks
  - [ ] Test wallet integration

### 5. Deployment
- [ ] Update Docker configuration:
  - [ ] Add environment variables
  - [ ] Configure production settings
  - [ ] Add health checks

- [ ] Add monitoring:
  - [ ] Add logging
  - [ ] Add error tracking
  - [ ] Add performance monitoring

## Immediate Next Tasks
1. Complete chorus_cycle.py implementation with litellm integration
2. Add proper WebSocket message handling
3. Implement thread creation and management
4. Add wallet authentication flow
5. Test the complete message flow from frontend to backend

## Notes
- Keep the quantum semantic model in mind when implementing the chorus cycle
- Ensure proper error handling throughout
- Maintain type safety between frontend and backend
- Document all major components and flows
