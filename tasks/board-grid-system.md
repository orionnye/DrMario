# Board Grid System Epic

**Status**: ✅ COMPLETED  
**Goal**: Implement immutable 2D grid system with cell state management for Dr. Mario game board

## Overview

The board grid is the foundation for all game mechanics. Without a reliable, immutable grid system with proper cell state management, viruses cannot be placed, pills cannot be positioned, and collision detection cannot function. This epic establishes the core data structure that all other gameplay primitives will depend on.

---

## Cell State Constants

Define cell state constants and types for board cells.

**Requirements**:
- Given a cell state definition, should export constants for EMPTY, VIRUS_RED, VIRUS_BLUE, VIRUS_YELLOW, PILL_RED, PILL_BLUE, PILL_YELLOW
- Given a cell state, should provide type definition for cell state values

---

## Board Creation

Create board data structure with configurable dimensions.

**Requirements**:
- Given width and height, should create board with all cells initialized to EMPTY
- Given invalid dimensions (zero or negative), should throw error
- Given board creation, should return immutable board structure

---

## Get Cell

Retrieve cell state at specific coordinates.

**Requirements**:
- Given valid coordinates, should return cell state at that position
- Given coordinates outside board bounds, should return boundary indicator or throw error
- Given board and coordinates, should not mutate board

---

## Set Cell

Update cell state at specific coordinates immutably.

**Requirements**:
- Given valid coordinates and state, should return new board with updated cell
- Given invalid coordinates, should return original board unchanged or throw error
- Given setCell operation, should not mutate original board

---

## Is Valid Position

Check if coordinates are within board bounds.

**Requirements**:
- Given coordinates within board bounds, should return true
- Given coordinates outside board bounds, should return false
- Given negative coordinates, should return false

---

## Is Cell Empty

Check if cell at coordinates is empty.

**Requirements**:
- Given coordinates with EMPTY cell, should return true
- Given coordinates with non-empty cell, should return false
- Given invalid coordinates, should return false or throw error

