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

## Mobile-First Component Structure

```typescript
COMPONENT AIResponse(props: AIResponseProps):
  // State & Gestures
  const [state, dispatch] = useResponseState()
  const bottomSheetGestures = useBottomSheetGestures({
    onDrag: handleSheetDrag,
    onSnap: handleSheetSnap,
    snapPoints: ["50vh", "85vh", "0vh"]
  })

  // Mobile-optimized render
  return (
    <div className={styles.response.container}>
      {/* Main Response Content */}
      <div className={styles.response.content}>
        <div className={styles.response.header}>AI</div>
        <div className={styles.response.body}>
          {processedContent}
        </div>
      </div>

      {/* Step Navigation Tabs */}
      <div className={styles.tabs.container}>
        {STEPS.map(step => (
          <Tab
            key={step.id}
            active={state.display.activeStep === step.id}
            icon={step.icon}
            label={step.label}
            onClick={() => handleStepChange(step.id)}
          />
        ))}
      </div>

      {/* Bottom Sheet for Step Details */}
      <BottomSheet
        isOpen={state.display.bottomSheetOpen}
        height={state.display.sheetHeight}
        {...bottomSheetGestures}
      >
        <StepContent
          step={state.display.activeStep}
          sources={state.sources}
          onCitationClick={handleCitationClick}
        />
      </BottomSheet>

      {/* Citation Preview */}
      {state.display.citationPreview && (
        <CitationPreview
          citation={state.display.citationPreview}
          onExpand={handleExpandCitation}
          onDismiss={() => dispatch({ type: "CLEAR_PREVIEW" })}
        />
      )}
    </div>
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


# ChoirChat UI Specification

VERSION choir_ui_system:
invariants: {
"Visual hierarchy",
"Interaction consistency",
"State reflection",
"Responsive adaptation"
}
assumptions: {
"Mobile-first design",
"Desktop enhancement",
"Theme consistency"
}
docs_version: "0.2.1"

## Layout Structure

```typescript
TYPE LayoutStructure = {
  // Base container (mobile-first)
  container: {
    default: "flex flex-col h-screen bg-gray-900",
    withPanel: "h-[calc(100vh-env(safe-area-inset-bottom))]", // iOS safe area
    desktop: "flex h-screen bg-gray-900" // Side-by-side on desktop
  },

  // Message thread view
  messageThread: {
    container: "flex-1 flex flex-col overflow-hidden",
    header: "px-4 py-3 border-b border-gray-800 flex items-center",
    content: "flex-1 overflow-y-auto",
    input: "border-t border-gray-800 p-4 pb-safe", // iOS safe area padding
    desktop: {
      container: "flex-1 flex flex-col",
      sidePanel: "w-80 border-l border-gray-800" // Desktop side panel
    }
  },

  // Response visualization
  responseView: {
    // Mobile: Bottom sheet with tabs
    mobile: {
      tabs: {
        container: "border-t border-gray-800 bg-gray-900",
        scroll: "flex overflow-x-auto hide-scrollbar",
        tab: {
          base: "px-4 py-2 whitespace-nowrap",
          active: "border-b-2 border-cyan-500 text-cyan-500",
          inactive: "text-gray-400"
        }
      },
      sheet: {
        overlay: "fixed inset-0 bg-black/50 z-40",
        container: {
          base: "fixed inset-x-0 bottom-0 z-50 bg-gray-900 rounded-t-xl",
          expanded: "h-[85vh]",
          collapsed: "h-[50vh]"
        },
        handle: "w-12 h-1 bg-gray-600 rounded-full mx-auto my-3",
        content: "px-4 overflow-y-auto h-full pb-safe"
      }
    },
    // Desktop: Side panel with fixed tabs
    desktop: {
      container: "w-80 border-l border-gray-800 flex flex-col",
      tabs: {
        container: "flex border-b border-gray-800",
        tab: {
          base: "flex-1 px-4 py-2 text-center",
          active: "bg-gray-800 text-cyan-500",
          inactive: "text-gray-400 hover:bg-gray-800/50"
        }
      },
      content: "flex-1 overflow-y-auto p-4"
    }
  }
}
```

## Step Visualization

```typescript
TYPE StepDisplay = {
  // Common step styling
  step: {
    action: {
      icon: "→",
      label: "Action",
      color: "cyan-500"
    },
    experience: {
      icon: "○",
      label: "Experience",
      color: "blue-500"
    },
    intention: {
      icon: "◇",
      label: "Intention",
      color: "purple-500"
    },
    observation: {
      icon: "□",
      label: "Observation",
      color: "green-500"
    },
    update: {
      icon: "△",
      label: "Update",
      color: "yellow-500"
    }
  },

  // Content display variants
  content: {
    mobile: {
      container: "space-y-4 px-4",
      header: "text-sm font-medium text-gray-400",
      body: "prose dark:prose-invert"
    },
    desktop: {
      container: "space-y-6",
      header: "text-base font-medium text-gray-300",
      body: "prose dark:prose-invert max-w-none"
    }
  }
}
```

## Citation Display

```typescript
TYPE CitationDisplay = {
  // Inline citation styling
  inline: {
    marker: "text-blue-500 hover:underline cursor-pointer",
    icon: "text-blue-400 text-sm ml-1"
  },

  // Mobile preview & modal
  mobile: {
    preview: {
      container: "fixed bottom-16 inset-x-4 bg-gray-800 rounded-lg p-4 shadow-xl",
      enter: "animate-slide-up",
      exit: "animate-slide-down"
    },
    modal: {
      overlay: "fixed inset-0 bg-black/50 z-50",
      container: "fixed inset-x-0 bottom-0 bg-gray-900 rounded-t-xl z-50",
      handle: "w-12 h-1 bg-gray-600 rounded-full mx-auto my-3",
      content: "px-4 pb-safe overflow-y-auto"
    }
  },

  // Desktop side panel
  desktop: {
    container: "border-l border-gray-800 w-80",
    header: "p-4 border-b border-gray-800",
    content: "p-4 prose dark:prose-invert",
    footer: "p-4 border-t border-gray-800"
  }
}
```

## Interaction Patterns

```typescript
TYPE Interactions = {
  // Mobile gestures
  mobile: {
    bottomSheet: {
      drag: {
        threshold: 50,
        animation: "spring(1, 0.9, 0)",
        snapPoints: ["50vh", "85vh", "0vh"]
      },
      dismiss: {
        velocity: 500,
        distance: "25vh"
      }
    },
    tabs: {
      swipe: {
        threshold: 30,
        animation: "ease-out",
        resistance: 0.2
      }
    }
  },

  // Desktop interactions
  desktop: {
    panel: {
      resize: {
        handle: "w-1 hover:bg-gray-700 cursor-col-resize",
        min: 320,
        max: 480
      },
      collapse: {
        button: "absolute -left-3 top-1/2 transform -translate-y-1/2",
        animation: "slide-x"
      }
    }
  },

  // Common transitions
  transitions: {
    content: {
      enter: "animate-fade-in",
      exit: "animate-fade-out",
      duration: 200
    },
    tab: {
      switch: "transition-all duration-200"
    }
  }
}
```

## Navigation Structure

```typescript
TYPE Navigation = {
  // Mobile navigation
  mobile: {
    menu: {
      button: "fixed left-4 top-4 z-30 rounded-full bg-gray-800 p-2",
      drawer: {
        enter: "slide-in-from-left",
        exit: "slide-out-to-left",
        container: "fixed inset-y-0 left-0 w-80 bg-gray-900 z-40"
      }
    },
    actions: {
      container: "fixed bottom-4 right-4 z-30 flex flex-col gap-2",
      button: "rounded-full bg-gray-800 p-3 shadow-lg"
    }
  },

  // Desktop navigation
  desktop: {
    sidebar: {
      container: "w-64 border-r border-gray-800",
      header: "p-4 border-b border-gray-800",
      content: "overflow-y-auto"
    },
    toolbar: {
      container: "h-12 border-b border-gray-800",
      actions: "flex items-center px-4 gap-4"
    }
  }
}
```

## Responsive Adaptations

```typescript
TYPE ResponsiveUI = {
  // Core breakpoints
  breakpoints: {
    sm: "640px",   // Mobile breakpoint
    lg: "1024px"   // Desktop breakpoint
  },

  // Feature adaptations
  features: {
    steps: {
      mobile: "bottom-sheet with tabs",
      desktop: "side-panel fixed"
    },
    citations: {
      mobile: "modal with preview",
      desktop: "side-panel"
    },
    navigation: {
      mobile: "floating buttons + drawer",
      desktop: "persistent sidebar"
    }
  }
}
```

This comprehensive UI specification provides:
- Mobile-first design with bottom sheets and gestures
- Enhanced desktop experience with side panels
- Smooth transitions between viewports
- Consistent visual hierarchy
- Natural interactions on all devices
- Accessibility across platforms


==
Frontend_ChoirChat_update
==


# ChoirChat Component with Mobile-First Design

VERSION choir_chat_system:
invariants: {
"State coherence",
"Message ordering",
"Thread integrity",
"Mobile optimization"
}
assumptions: {
"WebSocket availability",
"Gesture support",
"Bottom sheet interactions"
}
docs_version: "0.2.1"

## Core State Model

```typescript
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

  // Chorus Loop State
  chorus: {
    activeStep: StepEnum,
    bottomSheet: {
      isOpen: boolean,
      height: "collapsed" | "expanded",
      dragStartY: number
    },
    steps: {
      action: StepData,
      experience: StepData,
      intention: StepData,
      observation: StepData,
      update: StepData
    }
  },

  // Mobile UI State
  ui: {
    menuOpen: boolean,
    activeTab: TabId,
    bottomSheetOpen: boolean,
    citationPreview: Option<Citation>,
    safeAreaInsets: EdgeInsets
  }
}
```

## Component Structure

```typescript
COMPONENT ChoirChat():
  // State & Gestures
  const [state, dispatch] = useChoirState()
  const bottomSheetGestures = useBottomSheetGestures({
    onDrag: handleSheetDrag,
    onSnap: handleSheetSnap,
    snapPoints: ["50vh", "85vh", "0vh"]
  })

  // Mobile Layout
  return (
    <div className={styles.container.default}>
      {/* Thread List Menu */}
      <MobileMenu
        isOpen={state.ui.menuOpen}
        threads={state.threads.all}
        onSelect={handleThreadSelect}
      />

      {/* Main Chat Area */}
      <div className={styles.messageThread.container}>
        <Header />
        <MessageList messages={state.messages.history} />
        <ResponseTabs
          activeTab={state.ui.activeTab}
          onTabChange={handleTabChange}
        />
        <MessageInput />
      </div>

      {/* Bottom Sheet for Step Content */}
      <BottomSheet
        isOpen={state.ui.bottomSheetOpen}
        height={state.chorus.bottomSheet.height}
        {...bottomSheetGestures}
      >
        <StepContent
          step={state.chorus.steps[state.ui.activeTab]}
          onCitationClick={handleCitationClick}
        />
      </BottomSheet>

      {/* Citation Preview */}
      {state.ui.citationPreview && (
        <CitationPreview
          citation={state.ui.citationPreview}
          onExpand={handleExpandCitation}
          onDismiss={() => dispatch({ type: "CLEAR_CITATION_PREVIEW" })}
        />
      )}
    </div>
  )
```

## Mobile Interaction Handlers

```typescript
// Bottom Sheet Gestures
FUNCTION handleSheetDrag(event: DragEvent):
  const newHeight = calculateDraggedHeight(event)
  dispatch({ type: "UPDATE_SHEET_HEIGHT", height: newHeight })

FUNCTION handleSheetSnap(point: string):
  dispatch({ type: "SNAP_SHEET_TO", point })

// Tab Navigation
FUNCTION handleTabChange(tab: TabId):
  dispatch({ type: "SET_ACTIVE_TAB", tab })
  if (!state.ui.bottomSheetOpen) {
    dispatch({ type: "OPEN_BOTTOM_SHEET" })
  }

// Citation Handling
FUNCTION handleCitationClick(citation: Citation):
  if (window.innerWidth < 640) {
    dispatch({ type: "SHOW_CITATION_PREVIEW", citation })
  } else {
    dispatch({ type: "EXPAND_CITATION", citation })
  }
```

## Mobile-Optimized Components

```typescript
// Response Tabs Component
COMPONENT ResponseTabs({ activeTab, onTabChange }):
  return (
    <div className={styles.responseTabs.container}>
      <div className={styles.responseTabs.tabs}>
        {STEPS.map(step => (
          <Tab
            key={step.id}
            active={activeTab === step.id}
            icon={step.icon}
            label={step.label}
            onClick={() => onTabChange(step.id)}
          />
        ))}
      </div>
    </div>
  )

// Bottom Sheet Component
COMPONENT BottomSheet({ children, isOpen, height, ...gestures }):
  return (
    <>
      {isOpen && <div className={styles.bottomSheet.overlay} />}
      <div
        className={styles.bottomSheet.container[height]}
        {...gestures}
      >
        <div className={styles.bottomSheet.handle} />
        <div className={styles.bottomSheet.content}>
          {children}
        </div>
      </div>
    </>
  )
```

## Mobile State Updates

```typescript
TYPE MobileAction =
  | { type: "OPEN_BOTTOM_SHEET" }
  | { type: "CLOSE_BOTTOM_SHEET" }
  | { type: "UPDATE_SHEET_HEIGHT", height: string }
  | { type: "SNAP_SHEET_TO", point: string }
  | { type: "SET_ACTIVE_TAB", tab: TabId }
  | { type: "SHOW_CITATION_PREVIEW", citation: Citation }
  | { type: "CLEAR_CITATION_PREVIEW" }
  | { type: "TOGGLE_MENU" }

FUNCTION mobileReducer(state: State, action: MobileAction): State {
  switch (action.type) {
    case "OPEN_BOTTOM_SHEET":
      return { ...state, ui: { ...state.ui, bottomSheetOpen: true }}
    case "UPDATE_SHEET_HEIGHT":
      return {
        ...state,
        chorus: {
          ...state.chorus,
          bottomSheet: { ...state.chorus.bottomSheet, height: action.height }
        }
      }
    // ... handle other mobile actions
  }
}
```

This mobile-first component structure provides:
- Smooth bottom sheet interactions
- Natural tab navigation
- Optimized citation handling
- iOS safe area support
- Responsive adaptations
- Clean state management


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

// Bottom Sheet State
sheet: {
isOpen: boolean,
height: "collapsed" | "expanded",
dragStartY: number,
animation: AnimationState
},

// Source State
sources: {
items: Array<Source>,
sortOption: SortOption,
sortOrder: SortOrder,
filters: Set<Filter>,
preview: Option<Source>
},

// Mobile UI State
ui: {
activeTab: TabOption,
safeAreaInsets: EdgeInsets,
scrollLock: boolean
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

## Mobile Interactions

```typescript
TYPE MobileGestures = {
  // Bottom sheet gestures
  sheet: {
    drag: {
      threshold: 50,
      animation: "spring(1, 0.9, 0)",
      snapPoints: ["50vh", "85vh", "0vh"]
    },
    dismiss: {
      velocity: 500,
      distance: "25vh"
    }
  },

  // Source preview
  preview: {
    press: {
      delay: 200,
      feedback: "opacity",
      haptics: true
    },
    expand: {
      animation: "slide-up",
      duration: 300
    }
  }
}
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

## Mobile-First Component Structure

```typescript
COMPONENT UserInput(props: UserInputProps):
  // Mobile input state
  const [state, dispatch] = useInputState()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const safeAreaInsets = useSafeAreaInsets()

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [state.message.content])

  return (
    <div
      className={styles.input.container}
      style={{ paddingBottom: safeAreaInsets.bottom }}
    >
      <textarea
        ref={inputRef}
        value={state.message.content}
        onChange={e => dispatch({ type: "UPDATE_CONTENT", content: e.target.value })}
        className={styles.input.textarea}
        placeholder="Type your message..."
        rows={1}
      />
      <button
        onClick={handleSubmit}
        className={styles.input.button}
        disabled={!state.message.content.trim()}
      >
        Send
      </button>
    </div>
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
