# React Hooks Order Violation Fix Epic

**Status**: 📋 PLANNED  
**Goal**: Fix React Hooks order violation errors and optimize re-render performance

## Overview

React is detecting hooks being called in different orders between renders, causing runtime errors. The root cause is that `currentFrame` updates every frame, causing `currentGameState` to be recreated every frame, which triggers excessive re-renders and hook order instability. Additionally, `useGameLoop` is missing `fallingPills` in its dependency array, which can cause stale closures. This epic fixes the dependency issues, optimizes memoization to prevent unnecessary re-renders, and ensures hooks are always called in a stable order.

---

## Fix Missing Dependency in useGameLoop

Add `fallingPills` to the useEffect dependency array in `useGameLoop`.

**Requirements**:
- Given useGameLoop hook, should include fallingPills in dependency array
- Given dependency array, should prevent stale closure issues
- Given dependency fix, should not cause infinite loops

---

## Optimize currentGameState Memoization

Prevent `currentGameState` from being recreated every frame to reduce re-renders.

**Requirements**:
- Given currentGameState useMemo, should not recreate object on every frame update
- Given frame updates, should use stable reference when state hasn't actually changed
- Given memoization, should reduce unnecessary re-renders of useStateHistory
- Given optimization, should maintain correct state tracking

---

## Verify Hook Order Stability

Ensure all hooks are called in consistent order and verify no conditional hook calls exist.

**Requirements**:
- Given component render, should call hooks in same order every time
- Given hook calls, should be unconditional and at top level
- Given hook order, should not change between renders
- Given verification, should pass React's hooks rules

