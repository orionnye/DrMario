# Pill Entity System Epic

**Status**: ✅ COMPLETED  
**Goal**: Implement pill entity system with rotation and cell position calculation

## Overview

Players need to control falling pills to match and clear viruses. Without a pill entity system that tracks position, orientation, and rotation, pills cannot be moved, rotated, or checked for collisions. This epic creates the core pill data structure and operations needed for all pill interactions in the game.

---

## Pill Data Structure

Define pill type with colors, position, orientation, and rotation state.

**Requirements**:
- Given pill definition, should include two colors, position coordinates, orientation, and rotation degrees
- Given pill type, should support HORIZONTAL and VERTICAL orientations
- Given pill type, should support rotation states 0, 90, 180, 270 degrees

---

## Create Pill

Create function that initializes a pill with colors, position, and orientation.

**Requirements**:
- Given colors array and position, should create pill with specified properties
- Given createPill operation, should return immutable pill structure
- Given invalid colors (not two colors), should throw error

---

## Rotate Pill

Create function that rotates pill immutably through 4 orientations.

**Requirements**:
- Given pill and rotation direction, should return new pill with updated rotation
- Given rotation operation, should cycle through 0, 90, 180, 270 degrees
- Given rotation operation, should not mutate original pill
- Given rotation, should update orientation based on rotation state

---

## Get Pill Cells

Create function that calculates which board cells a pill occupies.

**Requirements**:
- Given pill, should return array of cell positions with colors
- Given horizontal pill, should return two adjacent cells horizontally
- Given vertical pill, should return two adjacent cells vertically
- Given rotated pill, should calculate cells based on rotation state

---

## Can Place Pill

Create function that checks if pill can be placed on board without collision.

**Requirements**:
- Given pill and board, should return true if all pill cells are empty and within bounds
- Given pill overlapping occupied cells, should return false
- Given pill outside board bounds, should return false
- Given canPlacePill check, should not mutate board or pill

