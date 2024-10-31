# Dev Documentation - Building Choir




==
Dev_Plan
==


# Development Plan

VERSION dev_plan:
invariants: {
"Prior flow integrity",
"Effect coherence",
"Semantic recording"
}
assumptions: {
"Vector space stability",
"WebSocket reliability",
"LLM capability"
}
docs_version: "0.2.2"

## Current Status

### Backend Progress
- FastAPI application setup ✓
- WebSocket handler ready ✓
- Qdrant integration ✓
- Basic chorus cycle ✓
- Vector search working ✓

### Frontend Progress
- Three-panel layout ✓
- WebSocket connection ✓
- Message display ✓
- Step visualization ✓
- Prior panel structure ✓

## Implementation Schedule

### Phase 1: Prior Flow (Oct 29)

1. **Vector Search**
   ```python
   # Get n=80 priors
   priors = await search_similar(input, limit=80)
   ```

2. **Semantic Recording**
   ```python
   # Record in Qdrant
   await record_semantic_links(
     message=input,
     cited_priors=priors
   )
   ```

3. **Citation Integration**
   ```python
   # Natural citations
   return generate_response_with_citations(input, priors)
   ```

### Phase 2: Effect System (Oct 30)

1. **Effect Types**
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

2. **Effect Accumulation**
   ```python
   effects = []
   while True:
       new_state, step_effects = await run_step(state, input)
       effects.extend(step_effects)
       if new_state.current_step == StepEnum.YIELD:
           break
   ```

### Phase 3: Step Processing (Oct 31)

1. **Step Prompts**
   - ACTION: Beginner's mind
   - EXPERIENCE: Context integration
   - INTENTION: Goal analysis
   - OBSERVATION: Semantic recording
   - UPDATE: Loop decision
   - YIELD: Citation integration

2. **State Transitions**
   ```python
   if step == UPDATE:
       if response["loop"]:
           next_step = ACTION
       else:
           next_step = YIELD
   else:
       next_step = steps[current_index + 1]
   ```

## Testing Strategy

1. **Prior Flow Tests**
   ```python
   def test_prior_flow():
       # Test vector search
       priors = search_similar(input)
       assert len(priors) == 80

       # Test semantic recording
       record_semantic_links(input, priors)
       verify_links_recorded()

       # Test citation integration
       response = generate_with_citations(input, priors)
       verify_citations_natural(response)
   ```

2. **Effect Tests**
   ```typescript
   test("effect accumulation", () => {
     const effects = [];
     // Run cycle
     expect(effects).toMatchPattern({
       experience: { priors: expect.arrayLength(80) },
       yield: { citations: expect.any(Array) }
     });
   });
   ```

3. **Step Tests**
   ```python
   def test_step_sequence():
       state = run_chorus_cycle(input)
       verify_step_sequence(state.effects)
       verify_prior_flow(state.effects)
       verify_semantic_recording(state)
   ```

## Implementation Notes

1. **Prior Flow**
   - Keep EXPERIENCE simple
   - No filtering until citations
   - Record semantic links
   - Natural integration

2. **Effect System**
   - Clean effect types
   - Proper accumulation
   - UI synchronization
   - Error handling

3. **Step Processing**
   - Clear step roles
   - Proper transitions
   - State coherence
   - Effect generation

Through this approach, we'll build a system that:
- Maintains prior flow integrity
- Preserves effect coherence
- Builds semantic knowledge
- Enables natural citations


==
Dev_Pseudocode
==


# Choir Pseudocode Conventions

VERSION pseudocode_system:
invariants: {
"Functional clarity",
"Type safety",
"Pattern consistency"
}
assumptions: {
"Reader familiarity with functional concepts",
"Implementation language agnostic",
"Documentation-first development"
}
docs_version: "0.2.1"

## Core Philosophy

Our pseudocode serves as a bridge between formal specification and implementation. It combines functional programming's precision with readable syntax to create unambiguous yet accessible descriptions of system behavior.

## Type Declarations

Type declarations define the shape of data and enforce semantic boundaries. We use the TYPE keyword followed by the type name and its definition. Simple types can be records with named fields, each with its own type. Sum types (variants) use the pipe symbol to separate cases, each optionally containing data.

For example, a thread state would declare co-authors as a Set of PublicKeys, a token balance as a TokenAmount, and messages as a List of Message types. Results are typically wrapped in a Result type that can be either Ok with success data or Error with error information.

## Function Signatures

Functions declare their types explicitly to make data flow clear. The FUNCTION keyword introduces a function, followed by its name, input parameters with their types, and return type after an arrow. Parameter lists maintain clear type annotations for each parameter.

## Pattern Matching

Pattern matching expresses complex conditional logic through the MATCH keyword, followed by the value being matched and a series of patterns and their corresponding actions. Each pattern can destructure complex data types and bind variables for use in the result expression.

## Monadic Operations

For operations that involve state or effects, we use monadic notation. The BIND operator (often written as >>=) chains operations, while RETURN lifts pure values into the effect context. This makes side effects explicit and composable.

## Invariant Declarations

System invariants use the INVARIANT keyword followed by a name and a predicate that must hold. These can appear in type definitions, function specifications, or standalone assertions about system properties.

## Property Specifications

Properties about the system use the PROPERTY keyword followed by a name and a specification. These often use quantifiers (FORALL, EXISTS) and logical operators to express complex requirements.

## Sequence Declarations

For ordered operations, the SEQUENCE keyword introduces a named sequence of steps. Each step can reference results from previous steps and produce values for subsequent ones.

## Verification Conditions

When specifying correctness conditions, the VERIFY keyword introduces properties that must be checked. These can appear within functions or as standalone proof obligations.

## Error Handling

Error cases use the REQUIRE keyword for preconditions and the ENSURE keyword for postconditions. The Result type explicitly handles success and failure cases in return values.

## State Transitions

State machine transitions use arrow notation (→) with optional conditions in square brackets. The before and after states are explicitly labeled, with transition conditions when needed.

## Documentation Comments

Each construct should be documented with its purpose, assumptions, and any special considerations. These appear as prose before the construct they describe.

## Implementation Notes

The NOTE keyword introduces implementation-specific details or considerations that don't affect the formal specification but are important for developers.

## Evolution Patterns

The ASSUMPTION keyword documents aspects of the system that may change, including rationale for current choices and constraints on future changes.

## Usage Guidelines

This pseudocode style should be used consistently across all technical documentation. It provides a common language for expressing both formal properties and practical implementations while maintaining readability for all stakeholders.

Through these conventions, we create documentation that serves as both specification and guide, bridging the gap between formal methods and practical development.
