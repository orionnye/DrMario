# Virus Placement System Epic

**Status**: ✅ COMPLETED  
**Goal**: Implement deterministic virus placement system for initializing game board

## Overview

Players need viruses on the board to play. Without viruses, there's nothing to match and clear. This epic creates a deterministic virus placement system that distributes viruses across the board in a reproducible pattern, enabling consistent game starts and testable gameplay scenarios.

---

## Generate Virus Placements

Create function that generates virus positions and colors based on count and seed.

**Requirements**:
- Given virus count and seed, should generate array of virus placements with x, y, color
- Given same seed, should generate identical placements
- Given different seed, should generate different placements
- Given virus count, should generate exactly that many viruses
- Given virus placements, should distribute across board avoiding overlaps

---

## Place Viruses On Board

Create function that places generated viruses onto board immutably.

**Requirements**:
- Given board and virus placements, should return new board with viruses placed
- Given virus placements, should place each virus at correct coordinates
- Given virus placements, should use correct cell state for each virus color
- Given placeVirusesOnBoard operation, should not mutate original board

---

## Virus Placement Validation

Create validation to ensure viruses are placed in valid positions.

**Requirements**:
- Given virus placements, should ensure all coordinates are within board bounds
- Given virus placements, should ensure no two viruses share same position
- Given invalid placements, should throw error or return validation result

