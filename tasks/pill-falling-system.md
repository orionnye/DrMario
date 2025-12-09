# Pill Falling System Epic

**Status**: 📋 PLANNED  
**Goal**: Implement frame-based pill falling mechanics with configurable timing

## Overview

Players need to see pills fall naturally to create engaging gameplay. Without falling mechanics, pills remain static and the game lacks the core challenge of timing and positioning. This epic creates frame-based falling physics that enable smooth, configurable pill descent with proper collision detection and lock timing.

---

## Pill Fall State

Add frame counter and fall timing state to pill entity.

**Requirements**:
- Given pill entity, should include frame counter for fall timing
- Given pill entity, should support configurable fall speed (frames per cell)
- Given pill fall state, should track when pill last moved

---

## Update Pill Position

Create function that moves pill down one cell after fall speed frames elapsed.

**Requirements**:
- Given pill and frame count, should return new pill one cell lower when fall speed elapsed
- Given pill and frame count, should return unchanged pill if fall speed not elapsed
- Given updatePillPosition operation, should not mutate original pill
- Given pill at bottom, should not move below board bounds

---

## Should Pill Fall

Create function that determines if pill should fall based on frame count and fall speed.

**Requirements**:
- Given pill frame count and fall speed, should return true when frames elapsed
- Given pill frame count and fall speed, should return false when frames not elapsed
- Given shouldPillFall check, should not mutate pill

---

## Check Pill Landing

Create function that detects if pill has landed on occupied cell or bottom.

**Requirements**:
- Given pill and board, should return true if pill would collide moving down
- Given pill at bottom row, should return true
- Given pill above empty cells, should return false
- Given checkPillLanding, should not mutate board or pill

---

## Pill Lock Delay

Create function that implements lock delay before pill locks to board.

**Requirements**:
- Given pill has landed, should start lock delay timer
- Given lock delay frames elapsed, should return true to lock pill
- Given lock delay not elapsed, should return false
- Given lock delay, should be configurable frames count

