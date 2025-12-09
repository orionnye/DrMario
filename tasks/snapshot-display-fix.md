# Snapshot Display and Copy Button Fix Epic

**Status**: 📋 PLANNED  
**Goal**: Fix snapshot display and copy button visibility, ensure snapshots are captured and displayed correctly

## Overview

Users need to see and export game state snapshots for debugging and testing. Currently, the snapshot controls component exists but snapshots may not be captured or displayed because the frame number is not properly tracked from the game loop. This epic fixes the frame tracking integration, ensures snapshots are captured, and verifies the copy button and snapshot display are visible and functional.

---

## Frame Number Integration

Connect game loop frame counter to state history tracking.

**Requirements**:
- Given game loop, should expose current frame number
- Given state history hook, should receive actual frame number from game loop
- Given frame number, should be included in GameState for snapshot capture
- Given frame tracking, should update when game loop advances

---

## Snapshot Capture Verification

Ensure snapshots are being captured and stored correctly.

**Requirements**:
- Given state history hook, should capture snapshots at configured intervals
- Given snapshot capture, should store snapshots in history
- Given snapshot storage, should be accessible via getLatestSnapshot
- Given no snapshots, should display appropriate message

---

## Snapshot Display Visibility

Ensure snapshot controls are visible and functional.

**Requirements**:
- Given snapshot exists, should display snapshot information
- Given snapshot display, should show copy button
- Given copy button, should be visible and clickable
- Given snapshot display, should show formatted or JSON view
- Given no snapshot, should show "No snapshot available" message

---

## Copy Button Functionality

Verify copy button works and provides feedback.

**Requirements**:
- Given copy button click, should copy snapshot JSON to clipboard
- Given copy operation, should show success feedback
- Given clipboard API, should handle errors gracefully
- Given copy button, should be styled consistently with other buttons

---

## Board State Recreation Display

Show visual representation of board state from snapshot.

**Requirements**:
- Given snapshot, should display board state visually
- Given board display, should show viruses, falling pills, and locked pills
- Given board recreation, should match snapshot state exactly
- Given board display, should update when snapshot changes

