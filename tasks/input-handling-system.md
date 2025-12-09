# Input Handling System Epic

**Status**: 📋 PLANNED  
**Goal**: Implement keyboard input handling system with frame-perfect input buffering and action queue

## Overview

Players need precise control over falling pills to create engaging gameplay. Without input handling, pills fall automatically without player interaction, making the game unplayable. This epic creates a custom React hook that captures keyboard input, buffers actions for frame-perfect timing, and queues actions for processing by the game loop. The hook manages its own state (including pause state) using React's state management and provides a clean interface for the game to consume player actions. Only one pill is controlled at a time until it lands.

---

## Input Action Types

Define action types and constants for all player input actions.

**Requirements**:
- Given input system, should define action types: MOVE_LEFT, MOVE_RIGHT, ROTATE, SOFT_DROP, HARD_DROP, PAUSE
- Given action types, should be TypeScript union type for type safety
- Given action types, should export constants for each action

---

## Key Mapping Configuration

Define key code to action mapping for standard keyboard bindings.

**Requirements**:
- Given key mapping, should map ArrowLeft to MOVE_LEFT
- Given key mapping, should map ArrowRight to MOVE_RIGHT
- Given key mapping, should map ArrowUp to ROTATE
- Given key mapping, should map ArrowDown to SOFT_DROP
- Given key mapping, should map Space to HARD_DROP
- Given key mapping, should map 'p' or 'P' to PAUSE
- Given key mapping, should be configurable object

---

## Input Handler Hook

Create custom React hook that captures keyboard events and converts them to game actions.

**Requirements**:
- Given hook mount, should attach keyboard event listeners to window
- Given hook unmount, should remove keyboard event listeners
- Given keyboard event, should map key codes to game actions using key mapping
- Given key press, should prevent default browser behavior for game keys
- Given input handler hook, should manage its own pause state using React useState
- Given PAUSE action, should toggle internal pause state
- Given paused state, should ignore all input except PAUSE toggle
- Given input handler hook, should return action queue and pause state

---

## Input Buffer and Queue

Implement input buffering and action queue system for frame-perfect input timing.

**Requirements**:
- Given key press, should buffer action for next game frame
- Given buffered action, should add to FIFO action queue
- Given multiple rapid inputs, should queue actions in order
- Given action queue, should limit queue size to prevent overflow
- Given action processing, should return next action or null if empty
- Given action queue, should clear processed actions
- Given action queue, should support peeking at next action without removal

---

## Horizontal Movement Functions

Create functions to move pills left and right with collision detection.

**Requirements**:
- Given pill and MOVE_LEFT action, should return new pill one cell left if valid
- Given pill and MOVE_RIGHT action, should return new pill one cell right if valid
- Given horizontal movement, should check collision before moving
- Given invalid position (collision or boundary), should return null
- Given movePillHorizontal operation, should not mutate original pill
- Given horizontal movement, should work for both HORIZONTAL and VERTICAL orientations

---

## Action Application Functions

Create functions to apply actions to falling pills (rotate, soft drop, hard drop).

**Requirements**:
- Given pill and ROTATE action, should rotate pill using existing rotatePill function
- Given rotation, should check if rotated position is valid before applying
- Given invalid rotation (collision), should not apply rotation
- Given SOFT_DROP action, should temporarily increase fall speed for active pill
- Given HARD_DROP action, should calculate landing position and move pill instantly
- Given hard drop, should check collision at each cell during drop
- Given action application, should return updated pill or null if invalid

---

## Active Pill Selection

Create logic to select which falling pill receives input (only one at a time).

**Requirements**:
- Given multiple falling pills, should select first pill in array as active
- Given active pill lands, should select next falling pill as active
- Given no falling pills, should not process any actions
- Given active pill selection, should only apply actions to active pill

---

## Game Loop Integration

Integrate input handler hook with game loop to process actions and update game state.

**Requirements**:
- Given input handler hook, should connect to game loop via callback
- Given action from queue, should apply to active falling pill only
- Given action applied successfully, should update falling pills state
- Given invalid action (collision), should not update state
- Given game loop frame, should process one action per frame from queue
- Given pause state active, should pause game loop updates

---

