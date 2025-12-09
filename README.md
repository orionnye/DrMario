# Dr. Mario

A Dr. Mario game built with Next.js, React, TypeScript, and Redux.

## Tech Stack

- **Next.js** - React framework
- **TypeScript** - Type safety
- **Redux** - State management (with Autodux)
- **Redux Saga** - Side effects
- **Vitest** - Testing framework
- **Riteway** - Test assertions

## Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

```bash
npm test          # Run tests once
npm run test:watch # Run tests in watch mode
npm run test:ui    # Run tests with UI
```

### Build

```bash
npm run build
npm start
```

## Project Structure

```
/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/              # Game logic and utilities
├── tasks/            # Task epics and planning
└── ai/               # AI agent rules and commands
```

## Development Principles

- **TDD** - Test-driven development
- **Functional Programming** - Pure functions, immutability
- **Modular Design** - Isolated, composable primitives
- **Frame-Perfect** - Precise timing for game mechanics

