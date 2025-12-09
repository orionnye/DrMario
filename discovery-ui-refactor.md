# UI Component Refactoring Discovery

## Problem Description

The `app/page.tsx` file has grown to 439 lines, mixing game logic, state management, and UI rendering in a single component. This creates several pain points:

1. **Maintainability**: Hard to locate and modify specific UI elements
2. **Reusability**: UI components are tightly coupled to page logic
3. **Testability**: Difficult to test UI components in isolation
4. **Readability**: Too much code in one file makes it hard to understand structure
5. **Separation of Concerns**: Business logic mixed with presentation logic

## Pain Points

### Pain Point 1: Monolithic Page Component
- **Impact**: 8/10 - High impact on developer experience
- **Frequency**: 10/10 - Affects every development session
- **Priority**: 80 (8 × 10)

**Description**: All UI elements, game state, and game loop logic are in one 439-line file, making it difficult to:
- Find specific functionality
- Make isolated changes
- Understand component boundaries
- Onboard new developers

### Pain Point 2: Inline Styles and Repeated Patterns
- **Impact**: 6/10 - Medium impact on maintainability
- **Frequency**: 8/10 - Every time styling needs to change
- **Priority**: 48 (6 × 8)

**Description**: Inline styles are repeated across multiple form components, making it:
- Hard to maintain consistent styling
- Difficult to apply theme changes
- Verbose and cluttered in JSX

### Pain Point 3: Tight Coupling Between UI and Game Logic
- **Impact**: 7/10 - High impact on testability
- **Frequency**: 7/10 - Affects testing and refactoring
- **Priority**: 49 (7 × 7)

**Description**: UI components directly access game state and logic, making it:
- Impossible to test UI in isolation
- Difficult to reuse components
- Hard to swap implementations

## User Stories

### User Story 1: Extract Game Info Display
**As a** developer  
**I want** a reusable `GameInfoDisplay` component  
**So that** I can display game metadata (seed, height offset, fall speed) in a consistent, testable way

**Functional Requirements**:
- Given game state (seed, minY, fallSpeed), should display formatted information
- Given seed value, should display both decimal and hexadecimal representation
- Given minY value, should display height offset with explanation
- Given fallSpeed value, should display frames per cell
- Given GameInfoDisplay component, should not contain game logic

**Priority**: 80

---

### User Story 2: Extract Seed Input Form
**As a** developer  
**I want** a reusable `SeedInputForm` component  
**So that** I can manage seed input with consistent styling and validation

**Functional Requirements**:
- Given seed input form, should accept numeric input
- Given invalid input, should not update seed
- Given valid input and submit, should call onSubmit callback with parsed value
- Given form submission, should clear input field
- Given SeedInputForm component, should be controlled component (value + onChange)
- Given SeedInputForm component, should not contain game logic

**Priority**: 80

---

### User Story 3: Extract Fall Speed Input Form
**As a** developer  
**I want** a reusable `FallSpeedInputForm` component  
**So that** I can manage fall speed input with consistent styling and validation

**Functional Requirements**:
- Given fall speed input form, should accept positive numeric input
- Given invalid input (NaN or <= 0), should not update fall speed
- Given valid input and submit, should call onSubmit callback with parsed value
- Given form submission, should clear input field
- Given FallSpeedInputForm component, should be controlled component
- Given FallSpeedInputForm component, should not contain game logic

**Priority**: 80

---

### User Story 4: Extract Scramble Button
**As a** developer  
**I want** a reusable `ScrambleButton` component  
**So that** I can trigger pill scrambling with consistent styling

**Functional Requirements**:
- Given scramble button, should call onClick callback when clicked
- Given ScrambleButton component, should not contain game logic
- Given ScrambleButton component, should have consistent styling with other buttons

**Priority**: 70

---

### User Story 5: Extract Game Controls Container
**As a** developer  
**I want** a `GameControls` container component  
**So that** I can group all game control UI elements in one place

**Functional Requirements**:
- Given GameControls component, should contain GameInfoDisplay, SeedInputForm, FallSpeedInputForm, and ScrambleButton
- Given GameControls component, should accept callbacks for all actions
- Given GameControls component, should accept game state as props
- Given GameControls component, should handle layout and spacing

**Priority**: 75

---

### User Story 6: Extract Custom Hooks for Game Logic
**As a** developer  
**I want** custom hooks (`useGameBoard`, `useFallingPills`, `useGameLoop`)  
**So that** I can separate game logic from UI components

**Functional Requirements**:
- Given useGameBoard hook, should return board with viruses based on seed
- Given useFallingPills hook, should manage falling pills state and initialization
- Given useGameLoop hook, should manage game loop with requestAnimationFrame
- Given custom hooks, should be testable in isolation
- Given custom hooks, should not contain UI logic

**Priority**: 65

## Component Structure

### Proposed Component Hierarchy

```
components/
├── grid/                    # Existing
│   ├── Cell.tsx
│   ├── Grid.tsx
│   └── ...
└── ui/                      # New folder
    ├── GameInfoDisplay.tsx
    ├── SeedInputForm.tsx
    ├── FallSpeedInputForm.tsx
    ├── ScrambleButton.tsx
    ├── GameControls.tsx
    └── index.ts
```

### Component Props Interfaces

```typescript
// GameInfoDisplay
type GameInfoDisplayProps = {
  seed: number
  minY: number
  fallSpeed: number
}

// SeedInputForm
type SeedInputFormProps = {
  onSubmit: (seed: number) => void
}

// FallSpeedInputForm
type FallSpeedInputFormProps = {
  onSubmit: (fallSpeed: number) => void
}

// ScrambleButton
type ScrambleButtonProps = {
  onClick: () => void
}

// GameControls
type GameControlsProps = {
  seed: number
  minY: number
  fallSpeed: number
  onSeedChange: (seed: number) => void
  onFallSpeedChange: (fallSpeed: number) => void
  onScramble: () => void
}
```

## Implementation Plan

### Phase 1: Extract UI Components (High Priority)
1. Create `components/ui/` folder
2. Extract `GameInfoDisplay` component
3. Extract `SeedInputForm` component
4. Extract `FallSpeedInputForm` component
5. Extract `ScrambleButton` component
6. Create `GameControls` container component
7. Update `app/page.tsx` to use new components

### Phase 2: Extract Game Logic Hooks (Medium Priority)
1. Create `hooks/` folder (or `lib/hooks/`)
2. Extract `useGameBoard` hook
3. Extract `useFallingPills` hook
4. Extract `useGameLoop` hook
5. Refactor `app/page.tsx` to use hooks

### Phase 3: Styling Improvements (Low Priority)
1. Create shared button styles
2. Create shared form styles
3. Consider CSS modules or styled-components for consistency

## Success Criteria

- [ ] `app/page.tsx` is under 150 lines
- [ ] All UI components are in `components/ui/` folder
- [ ] All UI components are testable in isolation
- [ ] No inline styles in extracted components (use CSS modules or shared styles)
- [ ] All components follow existing patterns (like `components/grid/`)
- [ ] Game logic is separated from UI logic
- [ ] All components have TypeScript interfaces
- [ ] Components are reusable and composable

## Questions for Clarification

1. **Styling Approach**: Should we use CSS modules (like `Grid.module.css`) or a different approach for the new UI components?

2. **Hook Location**: Should custom hooks go in `hooks/` at root, `lib/hooks/`, or `app/hooks/`?

3. **Component Testing**: Should we create test files for each new component following the existing pattern (e.g., `GameInfoDisplay.test.tsx`)?

4. **State Management**: Should we keep state in `page.tsx` and pass down as props, or move some state management to hooks?

5. **Form Validation**: Should validation logic stay in components or be extracted to utility functions?

## Next Steps

1. Get approval on component structure and approach
2. Start with Phase 1 (UI component extraction)
3. Test each component in isolation
4. Refactor `page.tsx` incrementally
5. Review and iterate

