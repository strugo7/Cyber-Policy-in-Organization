# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CyberScape Academy is a client-side only, gamified exam preparation platform for "Cyber Policy in Organization" course. Built with Next.js 14 (static export), TypeScript, Tailwind CSS, targeting Israeli university students.

**Critical constraints**:
- No backend, no authentication, no database
- All state in browser localStorage
- Hebrew RTL throughout UI
- Static export to Vercel (no server-side features)

## Development Commands

```bash
# Development
npm run dev              # Start dev server

# Production build
npm run build            # Build static site to out/
npm run type-check       # TypeScript validation

# Linting
npm run lint            # ESLint check
```

## Architecture

### Static-Only Design
- **App Router** (`app/`) - All pages use Next.js 14 App Router with `output: 'export'` in next.config
- **No API routes** - All logic runs client-side
- **All interactive components** require `'use client'` directive
- **localStorage is the database** - See `lib/utils/progress.ts` for persistence layer

### Content System
Content is **hardcoded** in TypeScript files (not CMS, not database):
- `lib/content/modules.ts` - 6 learning modules with Hebrew lessons
- `lib/content/questions.ts` - 25-30 exam questions (20 randomly selected per exam)
- `lib/content/simulations.ts` - 2 decision-tree simulations (Ransomware, Social Engineering)

**When adding content**: All user-facing text MUST be in Hebrew. Technical terms (NIST, CIA Triad) stay English.

### State Management
- **Progress tracking**: localStorage via `lib/utils/progress.ts`
  - Wrap all localStorage calls in `try-catch` (QuotaExceededError)
  - Always check `typeof window !== 'undefined'` before access
  - Validate schema with type guards when reading
- **No Redux/Zustand** - Use React Context + useReducer for component state
- **User data**: `UserProgress` interface in `lib/types.ts`

### Hebrew RTL Implementation
- Root layout has `dir="rtl" lang="he"` on `<html>`
- Use Tailwind logical properties: `ms-4` (margin-inline-start) instead of `ml-4`
- Dates formatted with `toLocaleDateString('he-IL')`
- Design reference: HTML prototypes in `Pages/` folder show desired RTL layout

### Component Organization
```
components/
├── dashboard/        # Isometric 3D map, stats, quick actions
├── learning/         # Module/lesson viewers, interactive diagrams
├── simulations/      # Decision tree engine, terminal logs
├── exam/            # Quiz engine, timer, certificate generation
└── ui/              # Reusable components (GlassCard, CyberButton)
```

**Lazy loading**: Heavy libraries (jsPDF, complex Framer Motion) must use `dynamic` import to reduce initial bundle.

### Styling System
- **Tailwind only** - No inline styles, no styled-components
- **Custom classes** in `app/globals.css`:
  - `.glass-card` - Glassmorphism panels (backdrop-blur)
  - `.cyber-button` - Themed buttons with glow effect
  - `.terminal-log` - Monospace green text for simulations
- **Color palette**: Cyan (#3dd6f5) primary, Purple (#7f13ec) secondary, Red (#f20d0d) danger
- **Dark mode only** - No light theme

## Key Data Flows

### Exam Flow
1. `app/exam/page.tsx` renders `QuizEngine` component
2. Quiz selects 20 random questions from `lib/content/questions.ts` (proportional distribution across modules)
3. 30-minute timer (`useTimer` hook) auto-submits at 0:00
4. Grading: `score >= 14` (70%) = pass
5. Results saved to localStorage as `ExamAttempt`
6. If passed: `CertificateGenerator` creates PDF (jsPDF)

### Progress Tracking
1. User completes lesson → `completeLesson()` in `lib/utils/progress.ts`
2. Updates `lessonsCompleted[]` array
3. Checks if all module lessons complete → add to `modulesCompleted[]`
4. Calculate XP and rank (Analyst → Specialist → Expert → CISO)
5. Persist entire `UserProgress` object to localStorage
6. Trigger UI updates via Context/setState

### Simulation Flow
1. Simulation data loaded from `lib/content/simulations.ts`
2. `DecisionTree` component traverses nodes based on user choices
3. Each decision updates `terminalLogs` (for immersion)
4. Outcome node triggers XP reward and feedback
5. Score saved to `simulationScores` in localStorage

## Critical Rules

### Client-Side Architecture
- **NEVER** create files in `app/api/` (API routes)
- **NEVER** use `getServerSideProps`, `getStaticProps`, or server actions
- **NEVER** import server-only packages in client components
- **ALWAYS** verify `next.config.mjs` has `output: 'export'`

### TypeScript
- **NEVER** use `any` - define interfaces in `lib/types.ts`
- **ALWAYS** validate localStorage data with type guards before use
- Example:
  ```typescript
  function validateProgress(data: any): data is UserProgress {
    return typeof data === 'object' &&
           typeof data.currentRank === 'string' &&
           Array.isArray(data.modulesCompleted);
  }
  ```

### Hebrew Content
- **ALL UI text** in Hebrew: buttons, labels, questions, explanations
- **Keep English** for: NIST, CIA Triad, XP, technical abbreviations
- **Question format** in `questions.ts`:
  ```typescript
  {
    text: 'השאלה בעברית?',
    options: ['תשובה 1', 'תשובה 2', 'תשובה 3', 'תשובה 4'],
    correctIndex: 0,
    explanation: 'הסבר בעברית למה התשובה נכונה'
  }
  ```

## Reference Documentation

- `Docs/technical_specifications.md` - Full architecture, TypeScript interfaces, code examples
- `Docs/prd.md` - Feature requirements and scope
- `Pages/` - HTML prototypes showing desired UI design (cyberpunk aesthetic, glassmorphism)
- `Lectures/` - Source PDFs for extracting Hebrew course content

## Deployment

Build produces static files in `out/` directory:
```bash
npm run build
# Deploy to Vercel (vercel --prod)
```

Verify in `out/`:
- No `_next/data/` folder (would indicate SSR)
- All routes exported as HTML files
- No server-side code in bundle
