# State History/Rewind System Epic

**Status**: 📋 PLANNED  
**Goal**: Implement state history tracking and rewind system for testing, debugging, and ensuring isolated state machine

## Overview

Developers need to test game mechanics, debug state transitions, and verify deterministic behavior. Without state history and rewind capability, it's impossible to inspect past game states, replay scenarios, or verify that state changes are isolated and reproducible. This epic creates a state snapshot system that captures game state at configurable intervals, enables rewinding to any previous frame, and provides a solid foundation for testing and debugging. This infrastructure ensures the game state machine is properly isolated and can be manipulated for validation purposes.

---

## Game State Type

Define comprehensive game state type that captures all mutable game state.

**Requirements**:
- Given game state type, should include fallingPills, lockedPills, seed, minY, fallSpeed
- Given game state type, should include frame number for snapshot identification
- Given game state type, should be readonly and immutable
- Given game state type, should be serializable to JSON for network transfer
- Given game state type, should only contain primitive types and plain objects

---

## State Snapshot Creation

Create function that captures current game state as immutable snapshot.

**Requirements**:
- Given game state, should create deep copy snapshot
- Given snapshot creation, should not mutate original state
- Given snapshot, should include frame number from current frame
- Given snapshot, should include timestamp for debugging
- Given snapshot creation, should handle all state properties

---

## State History Storage

Implement storage system for state snapshots with configurable history depth.

**Requirements**:
- Given state history, should store snapshots in chronological order
- Given history storage, should limit history to configurable depth (max frames)
- Given history limit exceeded, should remove oldest snapshots (FIFO)
- Given history storage, should support efficient frame-based lookup
- Given history storage, should support clearing all history
- Given history storage, should track total snapshots stored

---

## State History Hook

Create custom React hook that manages state history and snapshot capture.

**Requirements**:
- Given state history hook, should capture snapshots at configurable intervals
- Given hook mount, should initialize empty history
- Given hook unmount, should preserve history until explicitly cleared
- Given state changes, should capture snapshot based on interval configuration
- Given state history hook, should return history array and control functions
- Given hook, should support manual snapshot capture on demand

---

## Rewind to Frame

Create function that restores game state to a specific frame.

**Requirements**:
- Given frame number, should find snapshot at or before that frame
- Given frame number, should return state snapshot or null if not found
- Given rewind operation, should not mutate history storage
- Given rewind, should return complete game state for that frame
- Given frame before first snapshot, should return null

---

## Restore State

Create function that applies a state snapshot to current game state.

**Requirements**:
- Given state snapshot, should restore fallingPills to snapshot values
- Given state snapshot, should restore lockedPills to snapshot values
- Given state snapshot, should restore seed and minY to snapshot values
- Given restore operation, should update all state setters atomically
- Given restore, should not create new history entry
- Given invalid snapshot, should not restore state

---

## History Management Functions

Create functions for managing state history (clear, get range, etc.).

**Requirements**:
- Given clearHistory function, should remove all stored snapshots
- Given getHistoryRange function, should return snapshots between two frames
- Given getLatestSnapshot function, should return most recent snapshot
- Given getSnapshotCount function, should return total number of snapshots
- Given history management, should not affect current game state

---

## Game Loop Integration

Integrate state history system with game loop to capture snapshots automatically.

**Requirements**:
- Given game loop, should capture snapshot at configurable frame intervals
- Given snapshot interval, should default to every N frames (configurable)
- Given game loop integration, should not impact game performance
- Given pause state, should continue capturing snapshots
- Given snapshot capture failure, should not break game loop

---

## Rewind Controls Hook

Create hook that provides rewind controls and state navigation.

**Requirements**:
- Given rewind controls hook, should provide rewindToFrame function
- Given rewind controls hook, should provide restoreState function
- Given rewind controls hook, should provide canRewind boolean (history exists)
- Given rewind controls hook, should provide currentFrameInHistory
- Given rewind controls, should support forward/backward navigation
- Given rewind controls, should update game state when rewinding

---

## State Serialization

Create functions to serialize game state to JSON for storage and network transfer.

**Requirements**:
- Given game state, should serialize to JSON string
- Given serialization, should handle all state properties (fallingPills, lockedPills, seed, etc.)
- Given serialization, should preserve readonly arrays and nested structures
- Given serialization, should produce deterministic output (same state = same JSON)
- Given serialization, should handle empty arrays and undefined values
- Given serialization, should be reversible via deserialization

---

## State Deserialization

Create functions to deserialize JSON back to game state with validation.

**Requirements**:
- Given JSON string, should deserialize to game state type
- Given deserialization, should validate all required properties exist
- Given deserialization, should validate data types match expected types
- Given invalid JSON, should return error or null
- Given deserialization, should recreate immutable state structures
- Given deserialization, should restore all state properties correctly
- Given deserialized state, should be functionally equivalent to original

---

## State Validation

Create functions to validate game state structure and values.

**Requirements**:
- Given game state, should validate all required properties present
- Given game state, should validate property types are correct
- Given game state, should validate fallingPills array structure
- Given game state, should validate lockedPills array structure
- Given game state, should validate seed and minY are numbers
- Given invalid state, should return validation errors
- Given valid state, should return success

---

## State Checksum/Hash

Create functions to generate checksums or hashes for state integrity verification.

**Requirements**:
- Given game state, should generate deterministic hash/checksum
- Given same state, should produce same hash
- Given different state, should produce different hash
- Given state hash, should be suitable for integrity verification
- Given state hash, should be serializable for network transfer
- Given hash generation, should be fast and efficient

---

## State Diff/Patch

Create functions to compute state differences and apply patches for efficient synchronization.

**Requirements**:
- Given two game states, should compute difference object
- Given state diff, should only include changed properties
- Given state diff, should support nested property changes
- Given state patch, should apply diff to base state
- Given patch application, should produce same result as full state replacement
- Given invalid patch, should return error
- Given state diff, should be smaller than full state for network efficiency

---

## Frame Synchronization

Create functions to ensure all clients are synchronized to the same frame.

**Requirements**:
- Given frame number, should validate frame is within valid range
- Given frame synchronization, should track authoritative frame number
- Given frame mismatch, should detect desynchronization
- Given frame sync request, should return current frame number
- Given frame synchronization, should support frame rollback if needed
- Given frame sync, should work with state snapshots

---

## State Conflict Resolution

Create functions to resolve state conflicts when clients diverge.

**Requirements**:
- Given conflicting states, should detect conflict (different hashes at same frame)
- Given state conflict, should identify which state is authoritative
- Given conflict resolution, should support last-write-wins strategy
- Given conflict resolution, should support merge strategy for compatible changes
- Given conflict resolution, should support rollback to last known good state
- Given conflict, should log conflict details for debugging

---

## Player State Identification

Extend game state type to support player identification for multiplayer.

**Requirements**:
- Given game state type, should include optional playerId field
- Given game state type, should include optional sessionId for game session
- Given multiplayer state, should track which player owns which actions
- Given player identification, should be serializable
- Given player state, should support multiple players in same state

---

## Network State Message Format

Define message format for state synchronization over network.

**Requirements**:
- Given state message, should include state snapshot or diff
- Given state message, should include frame number
- Given state message, should include message type (full state, diff, sync request)
- Given state message, should include checksum for verification
- Given state message, should include timestamp for ordering
- Given state message, should be JSON serializable
- Given state message, should support compression for large states

---

## State Synchronization Hook

Create hook for managing state synchronization with remote clients.

**Requirements**:
- Given state sync hook, should send state updates to remote clients
- Given state sync hook, should receive state updates from remote clients
- Given state sync hook, should handle network errors gracefully
- Given state sync hook, should support reconnection and state recovery
- Given state sync hook, should detect and resolve conflicts
- Given state sync hook, should maintain frame synchronization
- Given state sync hook, should support manual sync trigger

---

## Rollback to Last Known Good State

Create functions to rollback to last verified/authoritative state.

**Requirements**:
- Given rollback request, should find last known good state (verified checksum)
- Given rollback, should restore state to last good snapshot
- Given rollback, should clear invalid state history after rollback point
- Given rollback, should log rollback reason and frame
- Given rollback, should support automatic rollback on conflict detection
- Given rollback, should maintain state integrity

---

