# Frontend Documentation - UI Components




==
Frontend_AIResponse
==


# AIResponse Component Specification

VERSION ai_response_system:
invariants: {
"Step sequence integrity",
"Source coherence",
"Markdown rendering fidelity"
}
assumptions: {
"Step completeness",
"Source availability",
"Markdown safety"
}
docs_version: "0.2.1"

## Core State Model

TYPE AIResponseState = {
// Message State
message: {
content: string,
steps: Array<Step>,
sources: Array<Source>,
status: ResponseStatus
},

// Display State
display: {
activeStep: StepId,
expandedSources: Set<SourceId>,
renderState: RenderState,
error: Option<Error>
},

// Animation State
animation: {
stepTransitions: Map<StepId, AnimationState>,
contentFade: AnimationState,
sourceReveal: AnimationState
}
}

## Step Management

```typescript
TYPE StepState = {
  step: {
    id: StepId,
    type: StepType,
    content: string,
    status: StepStatus
  },
  display: {
    active: boolean,
    complete: boolean,
    error: Option<Error>
  },
  sources: Option<Array<Source>>
}

FUNCTION manage_steps(steps: Array<Step>): Result<StepState[]> {
  validate_step_sequence(steps)
  initialize_step_states(steps)
  handle_step_transitions(steps)
  maintain_step_coherence(steps)
}
```

## Markdown Rendering

```typescript
TYPE MarkdownConfig = {
  sanitize: {
    allowed_tags: Set<string>,
    url_schemes: Set<string>,
    max_depth: number
  },
  plugins: {
    syntax_highlighting: boolean,
    math_rendering: boolean,
    link_preview: boolean
  },
  fallback: {
    render: ReactNode,
    error: ReactNode
  }
}

FUNCTION render_markdown(
  content: string,
  config: MarkdownConfig
): Result<ReactNode> {
  sanitized = sanitize_markdown(content)
  parsed = parse_with_plugins(sanitized)
  enhanced = add_interactivity(parsed)
  validated = verify_output(enhanced)
  RETURN validated
}
```

## Source Integration

```typescript
TYPE SourceDisplay = {
  preview: {
    height: "h-24",
    transition: "transition-all duration-200",
    overflow: "overflow-hidden"
  },
  expanded: {
    height: "auto",
    transition: "transition-all duration-300",
    overflow: "visible"
  }
}

FUNCTION integrate_sources(
  sources: Array<Source>,
  step: StepState
): Result<ReactNode> {
  relevant = filter_relevant_sources(sources, step)
  ordered = sort_by_relevance(relevant)
  rendered = map_to_components(ordered)
  interactive = add_source_interactions(rendered)
  RETURN interactive
}
```

## Error States

```typescript
TYPE AIResponseError =
  | StepSequenceError(step: Step)
  | MarkdownRenderError(content: string)
  | SourceLoadError(source: Source)
  | AnimationError(transition: Transition)
  | StateError(state: AIResponseState)

FUNCTION handle_response_error(error: AIResponseError): Recovery {
  log_detailed_error(error)
  update_error_state(error)
  attempt_graceful_recovery(error)
  notify_parent_component(error)
  render_fallback_ui(error)
}
```

## Component Structure

```typescript
COMPONENT AIResponse(props: AIResponseProps):
  // State management
  state = use_response_state<AIResponseState>()
  steps = use_step_management(props.steps)
  sources = use_source_integration(props.sources)

  // Content processing
  processed_content = useMemo(() =>
    pipe(
      validate_content,
      render_markdown,
      enhance_interactivity,
      add_error_boundaries
    )(props.message.content)
  , [props.message.content])

  // Step transitions
  handle_step_change = (step: StepId) => {
    validate_transition(state.activeStep, step)
    animate_transition(state.activeStep, step)
    update_active_step(step)
    load_step_content(step)
  }

  // Render structure
  RETURN (
    <ResponseContainer>
      <Header>AI</Header>
      <Content>{processed_content}</Content>
      <StepNavigation
        steps={steps}
        active={state.display.activeStep}
        onChange={handle_step_change}
      />
      <StepContent>
        {render_active_step(state.display.activeStep)}
        {state.display.activeStep === 'experience' && (
          <SourceList
            sources={sources}
            expanded={state.display.expandedSources}
          />
        )}
      </StepContent>
      {state.display.error && (
        <ErrorDisplay error={state.display.error} />
      )}
    </ResponseContainer>
  )
```

## Animation Patterns

```typescript
TYPE ResponseAnimation = {
  step_transition: {
    exit: "fade-out slide-left",
    enter: "fade-in slide-right",
    duration: "300ms",
    easing: "ease-in-out"
  },
  content_reveal: {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
    duration: "200ms"
  },
  source_expand: {
    initial: "h-0 opacity-0",
    animate: "h-auto opacity-100",
    duration: "250ms"
  }
}
```

## Performance Optimizations

```typescript
SEQUENCE optimize_response:
  1. Virtualize source list
  2. Lazy load markdown renderer
  3. Cache processed content
  4. Debounce step transitions
  5. Preload adjacent steps
```

## State Verification

```typescript
PROPERTY response_invariants:
  // Step integrity
  FORALL step IN steps:
    step.sequence_valid AND
    step.content_present AND
    step.transitions_smooth

  // Source coherence
  FORALL source IN sources:
    source.metadata_complete AND
    source.content_valid AND
    source.display_consistent

  // Render consistency
  FORALL render IN displays:
    render.markdown_safe AND
    render.animations_smooth AND
    render.interactions_responsive
```


==
Frontend_ChoirChat
==


# ChoirChat Component Specification

VERSION choir_chat_system:
invariants: {
"State coherence",
"Message ordering",
"Thread integrity"
}
assumptions: {
"WebSocket availability",
"Wallet connectivity",
"Thread persistence"
}
docs_version: "0.2.1"

## Core State Model

TYPE ChoirChatState = {
// Thread State
threads: {
all: Map<ThreadId, Thread>,
selected: Option<ThreadId>,
creating: boolean,
error: Option<string>
},

// Message State
messages: {
history: Array<Message>,
pending: Option<Message>,
streaming: boolean,
input: string
},

// Connection State
connection: {
websocket: Option<WebSocket>,
user: Option<User>,
status: ConnectionStatus,
retryCount: number
},

// UI State
display: {
panelVisible: boolean,
sortOption: SortOption,
sources: Array<Source>
}
}

## State Transitions

1. **Thread Management**

   ```
   SEQUENCE thread_operations:
     create_thread : UserId → Result<Thread>
     select_thread : ThreadId → Result<ThreadState>
     load_messages : ThreadId → Result<Array<Message>>
     handle_error : ThreadError → Result<Recovery>
   ```

2. **Message Handling**

   ```
   SEQUENCE message_operations:
     submit_message : (ThreadId, string) → Result<Message>
     process_response : WebSocketResponse → Result<StateUpdate>
     handle_stream : StreamEvent → Result<MessageUpdate>
     update_history : MessageUpdate → Result<void>
   ```

3. **Connection Management**
   ```
   SEQUENCE connection_lifecycle:
     establish : () → Result<WebSocket>
     authenticate : PublicKey → Result<User>
     maintain : WebSocket → Result<void>
     recover : ConnectionError → Result<void>
   ```

## Effect Handlers

1. **WebSocket Effects**

   ```
   TYPE WebSocketEffect =
     | Connect(config: WebSocketConfig)
     | Send(message: OutgoingMessage)
     | Close(reason: string)
     | Reconnect(attempt: number)

   HANDLER handle_websocket_effect:
     Connect → establish_connection()
     Send → transmit_message()
     Close → cleanup_connection()
     Reconnect → attempt_reconnection()
   ```

2. **Thread Effects**

   ```
   TYPE ThreadEffect =
     | Create(name: string)
     | Select(id: ThreadId)
     | Load(id: ThreadId)
     | Update(state: ThreadState)

   HANDLER handle_thread_effect:
     Create → initiate_thread()
     Select → switch_thread()
     Load → fetch_messages()
     Update → sync_thread_state()
   ```

## Error Recovery

1. **Connection Recovery**

   ```
   SEQUENCE handle_connection_error:
     1. log_error(error)
     2. update_connection_state(error)
     3. attempt_recovery:
        MATCH error:
          Disconnect → reconnect_with_backoff()
          AuthError → reauthenticate_user()
          Timeout → retry_operation()
          _ → notify_user()
   ```

2. **State Recovery**
   ```
   SEQUENCE handle_state_error:
     1. capture_error_state()
     2. rollback_to_last_valid()
     3. replay_missed_events()
     4. verify_consistency()
   ```

## Component Structure

```typescript
COMPONENT ChoirChat():
  // State initialization
  state = use_choir_state<ChoirChatState>()
  effects = use_effect_handler()

  // Lifecycle management
  useEffect(() => {
    establish_connection()
    return cleanup_connection
  }, [])

  // Event handlers
  handle_message = (input: string) => {
    validate_input(input)
    prepare_message(input)
    submit_message(input)
  }

  handle_thread_select = (id: ThreadId) => {
    validate_thread(id)
    switch_thread(id)
    load_messages(id)
  }

  // Render structure
  RETURN (
    <ChatContainer>
      <ThreadList
        threads={state.threads.all}
        selected={state.threads.selected}
        onSelect={handle_thread_select}
        onCreate={handle_thread_create}
      />
      <MessageArea
        messages={state.messages.history}
        streaming={state.messages.streaming}
        onSubmit={handle_message}
      />
      <ChorusPanel
        visible={state.display.panelVisible}
        sources={state.display.sources}
        sortOption={state.display.sortOption}
      />
    </ChatContainer>
  )
```

## State Verification

```typescript
PROPERTY state_invariants:
  // Thread integrity
  FORALL thread IN state.threads:
    thread.messages.ordered
    thread.co_authors.non_empty
    thread.token_balance.non_negative

  // Message ordering
  FORALL msg IN state.messages:
    msg.timestamp.monotonic_increasing
    msg.thread_id.exists_in_threads
    msg.author.authenticated

  // Connection consistency
  state.connection.websocket.connected IMPLIES
    state.connection.user.authenticated AND
    state.connection.status.active
```

## Performance Optimizations

1. **Message Batching**

   ```
   SEQUENCE batch_messages:
     collect_pending(timeout)
     group_by_thread()
     order_within_group()
     transmit_batch()
   ```

2. **State Updates**
   ```
   SEQUENCE optimize_updates:
     debounce_rapid_changes()
     batch_related_updates()
     prioritize_visible_content()
     defer_background_updates()
   ```

This specification provides a complete functional model for the ChoirChat component, with clear state management, effect handling, and error recovery patterns. The implementation should maintain these invariants while providing a smooth user experience.


==
Frontend_ChoirChat_UI
==


# ChoirChat UI Patterns

VERSION choir_ui_system:
invariants: {
"Visual hierarchy",
"Interaction consistency",
"State reflection"
}
assumptions: {
"Responsive design",
"Mobile compatibility",
"Theme consistency"
}
docs_version: "0.2.1"

## Layout Structure

```typescript
TYPE LayoutStructure = {
  container: "flex flex-col h-[calc(100vh-5rem)]",
  main_area: "flex overflow-hidden flex-1",
  components: {
    thread_list: "w-1/4 bg-gray-800",
    chat_area: "flex-1 flex flex-col",
    chorus_panel: "w-1/4 bg-gray-800"
  }
}
```

## Visual Hierarchy

1. **Thread List**

   ```
   SEQUENCE thread_display:
     1. Header ("Chats")
     2. New Chat Button (Primary CTA)
     3. Error Message (if present)
     4. Thread List (scrollable)
        - Selected thread highlighted
        - Hover states for interaction
   ```

2. **Chat Area**

   ```
   SEQUENCE chat_layout:
     1. Message History (scrollable)
        - User messages (right-aligned)
        - AI responses (left-aligned)
        - Step indicators
     2. Input Area (fixed bottom)
        - Expandable textarea
        - Send button
   ```

3. **Chorus Panel**
   ```
   SEQUENCE panel_structure:
     1. Step Navigation
     2. Content Display
     3. Source List (when relevant)
     4. Sort Controls
   ```

## Interaction Patterns

1. **Message Input**

   ```
   SEQUENCE input_interaction:
     1. Focus → Show active state
     2. Type → Auto-resize
     3. Submit →
        - Disable input
        - Show loading state
        - Enable on completion
     4. Error → Show inline error
   ```

2. **Thread Selection**

   ```
   SEQUENCE thread_interaction:
     1. Click → Highlight thread
     2. Load → Show loading state
     3. Complete →
        - Update messages
        - Scroll to bottom
        - Focus input
     4. Error → Show error state
   ```

3. **Panel Visibility**
   ```
   SEQUENCE panel_responsive:
     Desktop:
       Always visible
       Fixed width
     Mobile:
       Toggle button (fixed position)
       Slide animation
       Overlay mode
   ```

## State Reflection

1. **Loading States**

   ```
   TYPE LoadingIndicator =
     | ThreadCreation: "Creating..."
     | MessageSending: "Disabled input + animation"
     | ThreadLoading: "Loading skeleton"
     | ConnectionRetry: "Reconnecting..."
   ```

2. **Error States**

   ```
   TYPE ErrorDisplay =
     | Connection: "Banner with retry"
     | ThreadError: "Inline with action"
     | MessageError: "Toast notification"
     | ValidationError: "Field-level feedback"
   ```

3. **Success States**
   ```
   TYPE SuccessIndicator =
     | MessageSent: "Checkmark animation"
     | ThreadCreated: "Auto-select"
     | ActionComplete: "Brief feedback"
   ```

## Responsive Behavior

1. **Breakpoint Patterns**

   ```
   TYPE ResponsiveLayout =
     | Desktop: "Three-column layout"
     | Tablet: "Two-column with panel toggle"
     | Mobile: "Single-column with navigation"
   ```

2. **Component Adaptation**
   ```
   SEQUENCE responsive_adaptation:
     Desktop:
       Full feature set
       Side-by-side panels
     Tablet:
       Collapsible panels
       Touch-optimized
     Mobile:
       Stack layout
       Bottom navigation
       Floating action buttons
   ```

## Animation Patterns

1. **Transitions**

   ```
   TYPE AnimationPattern =
     | PanelToggle: "slide transform"
     | MessageAppear: "fade-in"
     | LoadingState: "pulse"
     | ErrorShake: "horizontal shake"
   ```

2. **Timing**
   ```
   CONST animation_timing = {
     instant: "0ms",
     quick: "150ms",
     normal: "300ms",
     smooth: "500ms"
   }
   ```

## Theme Integration

1. **Color Patterns**

   ```
   TYPE ColorScheme = {
     primary: "cyan-500",
     surface: "gray-800/900",
     text: "white",
     accent: "teal-700",
     error: "red-500"
   }
   ```

2. **Typography**
   ```
   TYPE Typography = {
     heading: "text-xl font-semibold",
     body: "text-sm",
     input: "text-base",
     button: "font-semibold"
   }
   ```

## Accessibility Patterns

1. **Keyboard Navigation**

   ```
   SEQUENCE keyboard_support:
     Tab: Navigate interactive elements
     Enter: Select/Submit
     Escape: Close/Cancel
     Arrow Keys: Navigate lists
   ```

2. **Screen Reader Support**
   ```
   TYPE AriaAttributes = {
     thread_list: "navigation",
     messages: "log",
     input: "textbox",
     status: "status"
   }
   ```

These UI patterns provide a consistent, accessible, and responsive user experience while maintaining the quantum semantic properties of the underlying system.


==
Frontend_ChorusPanel
==


# ChorusPanel Component Specification

VERSION chorus_panel_system:
invariants: {
"Step coherence",
"Source ordering",
"State verification"
}
assumptions: {
"Step sequence validity",
"Source availability",
"Sort stability"
}
docs_version: "0.2.1"

## Core State Model

TYPE ChorusPanelState = {
// Step State
steps: {
current: Step,
sequence: Array<Step>,
display: Map<Step, DisplayState>
},

// Source State
sources: {
items: Array<Source>,
sortOption: SortOption,
sortOrder: SortOrder,
filters: Set<Filter>
},

// Display State
view: {
expanded: Set<StepId>,
activeTab: TabOption,
scrollPosition: number
}
}

## Step Display Normalization

```typescript
TYPE StepDisplay = {
  action: {
    icon: "→",
    color: "cyan",
    animation: "slide-right"
  },
  experience: {
    icon: "○",
    color: "blue",
    animation: "pulse"
  },
  intention: {
    icon: "◇",
    color: "purple",
    animation: "fade"
  },
  observation: {
    icon: "□",
    color: "green",
    animation: "scale"
  },
  update: {
    icon: "△",
    color: "yellow",
    animation: "rotate"
  },
  yield: {
    icon: "✓",
    color: "teal",
    animation: "complete"
  }
}
```

## State Verification

```typescript
PROPERTY step_verification:
  // Step sequence validity
  FORALL steps IN panel.steps:
    steps.ordered_by_sequence AND
    steps.all_required_present AND
    steps.no_duplicates

  // Source integrity
  FORALL source IN panel.sources:
    source.metadata.complete AND
    source.embedding.valid AND
    source.content.non_empty

  // Display consistency
  FORALL step IN panel.steps:
    step.display.matches_state AND
    step.animations.complete AND
    step.interactions.responsive
```

## Component Structure

```typescript
COMPONENT ChorusPanel(props: ChorusPanelProps):
  // State management
  state = use_panel_state<ChorusPanelState>()

  // Step rendering
  render_step = (step: Step) => {
    validate_step(step)
    apply_step_style(step)
    handle_step_interaction(step)
    display_step_content(step)
  }

  // Source handling
  handle_sources = (sources: Array<Source>) => {
    validate_sources(sources)
    apply_sort_option(state.sources.sortOption)
    filter_sources(state.sources.filters)
    display_sources()
  }

  // Render structure
  RETURN (
    <PanelContainer>
      <StepSequence>
        {state.steps.sequence.map(render_step)}
      </StepSequence>
      <SourceList
        sources={state.sources.items}
        sortOption={state.sources.sortOption}
        onSort={handle_sort_change}
      />
    </PanelContainer>
  )
```

## Sort Management

```typescript
TYPE SortFunction = {
  date: (a: Source, b: Source) => Date.compare(a.created_at, b.created_at),
  similarity: (a: Source, b: Source) => b.similarity - a.similarity,
  tokens: (a: Source, b: Source) => b.token_value - a.token_value,
  custom: (a: Source, b: Source) => a.custom_order - b.custom_order
}

FUNCTION apply_sort(
  sources: Array<Source>,
  option: SortOption
): Array<Source> {
  validate_sort_option(option)
  sort_function = get_sort_function(option)
  sorted = sources.sort(sort_function)
  verify_sort_result(sorted)
  RETURN sorted
}
```

## Animation Patterns

```typescript
TYPE StepAnimation = {
  enter: {
    from: "opacity-0 scale-95",
    to: "opacity-100 scale-100",
    duration: "300ms"
  },
  exit: {
    from: "opacity-100 scale-100",
    to: "opacity-0 scale-95",
    duration: "200ms"
  },
  transition: "ease-in-out"
}
```

## Error States

```typescript
TYPE PanelError =
  | InvalidStep(step: Step)
  | SourceLoadFailure(source: Source)
  | SortError(option: SortOption)
  | DisplayFailure(component: Component)

FUNCTION handle_panel_error(error: PanelError): Recovery {
  log_error(error)
  update_error_state(error)
  attempt_recovery(error)
  notify_parent(error)
}
```

## Performance Optimizations

```typescript
SEQUENCE optimize_panel:
  1. Virtualize source list
  2. Memoize sort functions
  3. Debounce sort changes
  4. Cache step renders
  5. Lazy load content
```

This specification provides a complete model for the ChorusPanel component, with normalized step display, state verification, and clear interaction patterns. The implementation should maintain these patterns while providing smooth visualization of the Chorus process.


==
Frontend_UserInput
==


# UserInput Component Specification

VERSION user_input_system:
invariants: {
"Message immutability",
"Display consistency",
"Accessibility compliance"
}
assumptions: {
"Content sanitization",
"Theme consistency",
"Responsive layout"
}
docs_version: "0.2.1"

## Core State Model

TYPE UserInputState = {
// Message State
message: {
content: string,
timestamp: DateTime,
author: Author,
id: MessageId
},

// Display State
display: {
theme: ThemeVariant,
layout: LayoutPosition,
animation: AnimationState
}
}

## Display Properties

```typescript
TYPE DisplayConfig = {
  container: {
    base: "p-2 mb-2 w-full",
    background: "bg-cyan-800",
    border: "rounded-lg border border-cyan-700"
  },

  header: {
    alignment: "text-right",
    typography: "text-lg font-semibold",
    color: "text-white"
  },

  content: {
    typography: "text-sm",
    color: "text-white",
    padding: "mt-1"
  }
}
```

## Component Structure

```typescript
COMPONENT UserInput(props: UserInputProps):
  // Props validation
  REQUIRE valid_message(props.content)
  REQUIRE valid_author(props.author)

  // Content processing
  processed_content = useMemo(() =>
    pipe(
      sanitize_content,
      apply_markdown,
      wrap_mentions,
      format_links
    )(props.content)
  , [props.content])

  // Render structure
  RETURN (
    <MessageContainer config={DisplayConfig.container}>
      <Header config={DisplayConfig.header}>
        User
      </Header>
      <Content
        config={DisplayConfig.content}
        content={processed_content}
      />
    </MessageContainer>
  )
```

## Content Processing

```typescript
TYPE ContentProcessor = {
  sanitize: (content: string) => string,
  markdown: (content: string) => ReactNode,
  mentions: (content: string) => ReactNode,
  links: (content: string) => ReactNode
}

FUNCTION process_content(content: string): ReactNode {
  REQUIRE non_empty(content)

  sanitized = remove_unsafe_content(content)
  formatted = apply_formatting(sanitized)
  enhanced = enhance_interactive(formatted)

  ENSURE valid_output(enhanced)
  RETURN enhanced
}
```

## Accessibility Support

```typescript
TYPE AccessibilityProps = {
  role: "article",
  aria: {
    label: "User message",
    live: "polite",
    atomic: true
  },
  semantic: {
    article: true,
    header: true,
    time: true
  }
}

FUNCTION enhance_accessibility(node: ReactNode): ReactNode {
  add_aria_attributes(node)
  ensure_semantic_structure(node)
  verify_accessibility(node)
  RETURN node
}
```

## Animation Patterns

```typescript
TYPE MessageAnimation = {
  enter: {
    from: "opacity-0 translateY(10px)",
    to: "opacity-1 translateY(0)",
    duration: "200ms",
    easing: "ease-out"
  }
}

FUNCTION animate_message(node: ReactNode): ReactNode {
  apply_animation(node, MessageAnimation)
  ensure_smooth_transition(node)
  RETURN node
}
```

## Error Handling

```typescript
TYPE UserInputError =
  | InvalidContent(content: string)
  | ProcessingFailure(error: Error)
  | RenderError(component: Component)

FUNCTION handle_error(error: UserInputError): Recovery {
  log_error(error)
  fallback_to_safe_render(error)
  notify_parent(error)
}
```

## Performance Optimizations

```typescript
SEQUENCE optimize_rendering:
  1. Memoize processed content
  2. Lazy load markdown processor
  3. Cache sanitization results
  4. Debounce animations
```

## State Verification

```typescript
PROPERTY message_invariants:
  // Content integrity
  FORALL message IN messages:
    message.content.non_empty AND
    message.content.sanitized AND
    message.timestamp.valid

  // Display consistency
  FORALL display IN renders:
    display.theme.matches_system AND
    display.layout.responsive AND
    display.animation.smooth
```
