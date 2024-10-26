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
  implementation: "0.1.0"

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
