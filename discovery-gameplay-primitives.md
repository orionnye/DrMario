# 🔍 Dr. Mario Gameplay Primitives Discovery

**Status**: 📋 DISCOVERED  
**Created**: 2024  
**Target**: MVP with tight, tweakable mechanics for frame-perfect gameplay

---

## Problem Description

Build a Dr. Mario game as a birthday present with frame-perfect mechanics that can be easily tweaked and balanced. The core gameplay must feel authentic and responsive, with all mechanics built from primitive, composable building blocks.

---

## Solution Description

A modular Dr. Mario implementation where each gameplay primitive is isolated, configurable, and composable. The architecture enables easy mutation of game parameters (timing, physics, scoring) without touching core logic.

---

## User Journey

**As a player, I want to:**
1. Start a game and see viruses placed on the board
2. Control falling pills with precise keyboard input
3. Match colored pills with viruses to clear them
4. Experience frame-perfect responsiveness
5. Pause the game when needed
6. Hear satisfying sound feedback

---

## Gameplay Primitives (Priority Order)

### 🎯 **TIER 1: Core Foundation (Immediate)**

#### **1. Board Grid System**
**Primitive**: 2D grid coordinate system with cell states

**Properties**:
- Grid dimensions (width × height) - configurable
- Cell states: `EMPTY | VIRUS_RED | VIRUS_BLUE | VIRUS_YELLOW | PILL_RED | PILL_BLUE | PILL_YELLOW`
- Cell position: `{ x: number, y: number }`

**Operations**:
- `getCell(x, y)` → cell state
- `setCell(x, y, state)` → void
- `isValidPosition(x, y)` → boolean
- `isCellEmpty(x, y)` → boolean

**Why**: Foundation for all game logic. Must be pure and immutable.

---

#### **2. Virus Placement System**
**Primitive**: Deterministic virus distribution on board

**Properties**:
- Virus count (configurable)
- Virus colors: `RED | BLUE | YELLOW`
- Placement seed/pattern (for reproducibility)

**Operations**:
- `generateVirusPlacement({ count, seed })` → Array<{ x, y, color }>
- `placeVirusesOnBoard(board, placements)` → Board

**Why**: First visible game element. Must be deterministic for testing.

---

#### **3. Pill Entity System**
**Primitive**: Falling pill with rotation state

**Properties**:
- Pill segments: `[color1, color2]` (horizontal or vertical)
- Position: `{ x: number, y: number }`
- Orientation: `HORIZONTAL | VERTICAL`
- Rotation state: `0 | 90 | 180 | 270` degrees

**Operations**:
- `createPill({ colors, x, y, orientation })` → Pill
- `rotatePill(pill, direction)` → Pill (immutable)
- `getPillCells(pill)` → Array<{ x, y, color }>
- `canPlacePill(board, pill)` → boolean

**Why**: Core interactive element. Must support rotation and collision detection.

---

#### **4. Pill Movement System**
**Primitive**: Frame-based pill physics with configurable timing

**Properties**:
- Fall speed (frames per cell) - configurable
- Horizontal move speed (frames per cell) - configurable
- Frame counter per pill
- Lock delay (frames before pill locks) - configurable

**Operations**:
- `updatePillPosition(pill, deltaFrames)` → Pill
- `movePillHorizontal(pill, direction, board)` → Pill | null
- `shouldPillFall(pill, frameCount)` → boolean
- `shouldPillLock(pill, board, frameCount)` → boolean

**Why**: Frame-perfect control requires precise timing calculations.

---

#### **5. Collision Detection System**
**Primitive**: Pure collision checking functions

**Operations**:
- `checkCollision(pill, board)` → boolean
- `checkBoundaryCollision(pill, board)` → boolean
- `checkCellCollision(pill, board)` → boolean

**Why**: Prevents invalid placements. Must be fast and pure.

---

#### **6. Input Handling System**
**Primitive**: Keyboard input → game actions

**Properties**:
- Input buffer (for frame-perfect input)
- Action queue

**Operations**:
- `handleKeyPress(key, gameState)` → Action
- `processInputQueue(gameState, actions)` → GameState
- Actions: `MOVE_LEFT | MOVE_RIGHT | ROTATE | SOFT_DROP | HARD_DROP | PAUSE`

**Why**: Frame-perfect input requires buffering and queueing.

---

#### **7. Game Over Detection**
**Primitive**: Check if game should end

**Operations**:
- `checkGameOver(board, pill)` → boolean
- Conditions: Pill spawns in invalid position OR board reaches top

**Why**: Immediate requirement. Must be deterministic.

---

### 🎯 **TIER 2: Gameplay Loop (After Tier 1)**

#### **8. Matching System**
**Primitive**: Color matching logic

**Operations**:
- `findMatches(board, position)` → Array<{ x, y, color }>
- `checkMatch(pill, board)` → Array<match groups>
- Match rules: 4+ same color in row/column/diagonal (configurable)

**Why**: Core gameplay mechanic. Must be efficient for real-time.

---

#### **9. Line Clearing System**
**Primitive**: Remove matched cells and apply gravity

**Operations**:
- `clearMatches(board, matches)` → Board
- `applyGravity(board)` → Board
- `findCascades(board)` → Array<match groups>

**Why**: Visual satisfaction and cascading clears.

---

#### **10. Game State Machine**
**Primitive**: State transitions

**States**: `MENU | PLAYING | PAUSED | GAME_OVER`

**Operations**:
- `transitionState(currentState, action)` → newState
- `updateGameState(state, deltaTime)` → newState

**Why**: Manages game flow and pause functionality.

---

### 🎯 **TIER 3: Polish (Later)**

#### **11. Score Calculation**
**Primitive**: Score computation from game events

**Operations**:
- `calculateScore(matches, cascades, level)` → number
- Scoring rules (configurable multipliers)

---

#### **12. Audio System**
**Primitive**: Sound effect triggers

**Operations**:
- `playSound(soundId)` → void
- Sound events: `PILL_DROP | PILL_LOCK | MATCH | CASCADE | GAME_OVER`

---

#### **13. Rendering System**
**Primitive**: Board → visual representation

**Properties**:
- Sprite sheet support
- Cell size (pixels) - configurable
- Animation frames

**Operations**:
- `renderBoard(board, context)` → void
- `renderPill(pill, context)` → void
- `renderUI(gameState, context)` → void

**Why**: Visual feedback. Placeholder art initially.

---

## Functional Requirements

### Board Grid System
- Given a board with dimensions, should provide access to any cell by coordinates
- Given invalid coordinates, should return boundary state or error
- Given a cell update, should return new board state (immutable)

### Virus Placement
- Given a virus count and seed, should generate deterministic virus positions
- Given a board, should place viruses without overlapping
- Given placed viruses, should be visible on board

### Pill System
- Given a pill creation, should initialize with two colors and position
- Given a rotation action, should cycle through 4 orientations
- Given a pill position, should calculate all occupied cells
- Given a pill and board, should detect if placement is valid

### Movement System
- Given frame count and fall speed, should move pill down at correct intervals
- Given horizontal input, should move pill left/right immediately
- Given a pill at bottom, should trigger lock delay timer
- Given lock delay expiration, should lock pill to board

### Collision Detection
- Given a pill position, should detect boundary violations
- Given a pill position, should detect cell collisions
- Given collision detected, should prevent movement

### Input Handling
- Given keyboard input, should queue action for next frame
- Given multiple rapid inputs, should process in order
- Given pause key, should toggle pause state

### Game Over
- Given pill spawns in invalid position, should trigger game over
- Given board reaches top row, should trigger game over
- Given game over, should stop game loop

### Matching System
- Given 4+ same color in row, should identify as match
- Given 4+ same color in column, should identify as match
- Given matches, should return all matched cell positions

### Line Clearing
- Given matches, should remove matched cells
- Given cleared cells, should apply gravity to remaining cells
- Given gravity applied, should check for cascade matches

### State Machine
- Given PLAYING state and pause action, should transition to PAUSED
- Given PAUSED state and resume action, should transition to PLAYING
- Given game over condition, should transition to GAME_OVER

---

## Technical Architecture Notes

### Frame-Perfect Timing
- Use `requestAnimationFrame` for rendering
- Separate game tick from render tick
- Configurable frame scaling: `gameTick = renderTick * scaleFactor`
- Input processed at game tick, not render tick

### Modularity
- Each primitive in separate module
- Pure functions where possible
- Configuration objects for all tunable parameters
- Redux state for game state management
- Side effects (audio, rendering) isolated from game logic

### Data Flow
```
Input → Action → Redux Store → Game Logic Primitives → State Update → Render
```

### Configuration Structure
```javascript
{
  board: { width: 8, height: 16 },
  timing: { 
    fallSpeed: 30, // frames per cell
    lockDelay: 60, // frames
    moveSpeed: 5,
    frameScale: 1.0
  },
  viruses: { count: 20, seed: null },
  matching: { minMatch: 4, directions: ['horizontal', 'vertical', 'diagonal'] }
}
```

---

## Priority Implementation Order

1. ✅ Board Grid System
2. ✅ Virus Placement
3. ✅ Pill Entity & Rotation
4. ✅ Collision Detection
5. ✅ Pill Movement (fall + horizontal)
6. ✅ Input Handling
7. ✅ Game Over Detection
8. ⏳ Matching System
9. ⏳ Line Clearing
10. ⏳ State Machine
11. ⏳ Score Calculation
12. ⏳ Audio System
13. ⏳ Rendering System

---

## Success Criteria

- Player can see viruses on board
- Player can control falling pill with keyboard
- Pill rotates correctly through 4 orientations
- Pill locks to board when it lands
- Game ends when pill spawns in invalid position
- All mechanics are configurable via parameters
- Frame-perfect timing with configurable scaling
- Pause functionality works
- Code is modular and easily tweakable

