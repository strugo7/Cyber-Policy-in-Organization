# CLAUDE.md - AI Agent Instructions for CyberScape Academy

This document provides comprehensive instructions for AI coding agents (Claude, Cursor, etc.) working on the CyberScape Academy project.

## Project Context

**CyberScape Academy** is a client-side only, gamified exam preparation platform for the "Cyber Policy in Organization" academic course. Built with Next.js 14, it features:

- 11 learning modules covering NIST CSF 2.0, Risk Management, and Cyber Policy
- 2 interactive simulations (Ransomware Wargame, Social Engineering)
- 20-question final exam with timer and instant grading
- Certificate generation (PDF download)
- Hebrew RTL support throughout
- localStorage-based progress tracking
- No backend, no authentication, no database

**Timeline**: Weekend sprint (48 hours)
**Deployment**: Vercel (static export)
**Target Audience**: Israeli university students preparing for final exam

## Core Principles

### 1. Client-Side Only Architecture
- **NEVER** create API routes, server actions, or backend code
- **NEVER** use `getServerSideProps` or `getStaticProps`
- **ALWAYS** use `'use client'` directive for interactive components
- **ALWAYS** handle state with React hooks and localStorage

### 2. Hebrew-First Development
- **ALL user-facing text MUST be in Hebrew**
- Technical terms (NIST, CIA Triad, XP) remain in English
- Use proper RTL layout: `dir="rtl"` on root HTML element
- Test text alignment, margins, and padding for RTL
- Dates formatted with `toLocaleDateString('he-IL')`

### 3. Type Safety
- **NEVER** use `any` type unless absolutely necessary
- **ALWAYS** define interfaces in `lib/types.ts`
- **ALWAYS** validate localStorage data with type guards
- Use strict TypeScript config (no implicit any)

### 4. Performance First
- **LAZY LOAD** heavy components (jsPDF, Framer Motion animations)
- **CODE SPLIT** by route (Next.js does this automatically)
- **OPTIMIZE** images (WebP, compressed, lazy loaded)
- Keep bundle size under 500KB gzipped
- Target 60fps for all animations

### 5. Immersive Cyberpunk Aesthetic
- **MATCH** the design from HTML prototypes in Pages/
- Dark mode only (no light theme)
- Glassmorphism panels with backdrop blur
- Neon cyan (#3dd6f5) and purple (#7f13ec) accents
- Smooth transitions and hover effects
- Terminal-style logs for simulations

## Project Structure

```
cyberscape-academy/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx          # Root layout (RTL, fonts, metadata)
│   ├── page.tsx            # Dashboard
│   ├── modules/            # Learning modules
│   ├── simulations/        # War room simulations
│   └── exam/               # Exam and results
├── components/             # React components
│   ├── dashboard/          # Dashboard-specific
│   ├── learning/           # Module/lesson components
│   ├── simulations/        # Simulation components
│   ├── exam/               # Exam components
│   └── ui/                 # Reusable UI (buttons, cards)
├── lib/
│   ├── content/            # Hardcoded content (modules, questions)
│   ├── utils/              # Utilities (progress, xp, shuffle)
│   ├── hooks/              # Custom React hooks
│   └── types.ts            # TypeScript interfaces
└── public/
    └── images/             # Static images
```

## Coding Standards

### File Naming
- Components: `PascalCase.tsx` (e.g., `IsometricMap.tsx`)
- Utilities: `camelCase.ts` (e.g., `progress.ts`)
- Pages: `page.tsx` (Next.js convention)
- Types: `types.ts` (singular, not `types.ts`)

### Component Structure
```typescript
'use client';

import { useState } from 'react';
import { SomeType } from '@/lib/types';

interface Props {
  title: string;
  onComplete: (data: SomeType) => void;
}

export default function ComponentName({ title, onComplete }: Props) {
  const [state, setState] = useState<SomeType | null>(null);

  // Helper functions
  const handleAction = () => {
    // Logic here
  };

  // Render
  return (
    <div className="glass-card p-6">
      {/* Content */}
    </div>
  );
}
```

### Styling Conventions
- **ALWAYS** use Tailwind utility classes
- **NEVER** write inline styles (use `className`)
- Use custom classes from `globals.css`:
  - `.glass-card` - Glassmorphism panels
  - `.cyber-button` - Themed buttons
  - `.glow-primary` - Cyan glow effect
  - `.glow-danger` - Red glow effect
  - `.terminal-log` - Terminal-style text
- Use Framer Motion for complex animations
- Use CSS transitions for simple hover/focus states

### localStorage Usage
```typescript
// ALWAYS wrap localStorage calls in try-catch
try {
  const data = localStorage.getItem('key');
  if (data) {
    const parsed = JSON.parse(data);
    // Validate before using
    if (validateData(parsed)) {
      return parsed;
    }
  }
} catch (error) {
  console.error('localStorage error:', error);
  return defaultValue;
}

// ALWAYS check if window exists (for SSR)
if (typeof window !== 'undefined') {
  localStorage.setItem('key', JSON.stringify(data));
}
```

## Content Guidelines

### Module Content
- Extract from lecture PDFs in `Lectures/` folder
- Each lesson: 3-5 minutes reading time (300-600 words)
- Structure: Heading → Paragraphs → Key Takeaways
- Use bullet points for lists
- Highlight key terms in **bold**

### Exam Questions
- **Format**: Multiple choice (4 options, 1 correct)
- **Language**: Hebrew for question and all options
- **Distribution**:
  - Module 1 (Foundations): 4-5 questions
  - Module 2 (Governance): 3-4 questions
  - Module 3 (NIST): 5-6 questions
  - Module 4 (Risk): 3-4 questions
  - Module 5 (Defense): 3-4 questions
  - Module 6 (IR/Recovery): 3-4 questions
- **Explanations**: Every answer needs "why it's correct/incorrect" explanation
- **Difficulty**: Mix of easy (40%), medium (40%), hard (20%)

### Question Example
```typescript
{
  id: 'nist-functions-q1',
  moduleId: 'nist',
  text: 'אילו מהפונקציות הבאות של NIST CSF 2.0 מתמקדת בזיהוי נכסים ארגוניים?',
  options: [
    'Govern - ממשל',
    'Identify - זהה',
    'Protect - הגן',
    'Detect - זהה איומים'
  ],
  correctIndex: 1,
  explanation: 'הפונקציה Identify (זהה) עוסקת בזיהוי וניהול נכסים, מערכות ונתונים ארגוניים. זוהי הפונקציה הראשונה בתהליך הגנת הסייבר.',
  difficulty: 'easy'
}
```

## Common Tasks

### Adding a New Module
1. Define module in `lib/content/modules.ts`:
```typescript
{
  id: 'new-module',
  title: 'שם המודול',
  description: 'תיאור קצר',
  icon: 'icon-name',
  order: 7,
  lessons: [...],
  xpReward: 100
}
```

2. Create lessons with Hebrew content
3. Add module sector to dashboard (update `IsometricMap.tsx`)
4. Create module page in `app/modules/[moduleId]/page.tsx`

### Adding a New Exam Question
1. Open `lib/content/questions.ts`
2. Add question object with Hebrew text
3. Ensure `correctIndex` points to right option (0-based)
4. Write detailed `explanation` in Hebrew
5. Assign appropriate `difficulty` level

### Adding Interactive Diagram
1. Create SVG file in `public/images/diagrams/`
2. Define diagram in lesson content:
```typescript
diagrams: [{
  id: 'cia-triad',
  type: 'cia-triad',
  interactiveElements: [
    {
      id: 'confidentiality',
      label: 'סודיות (Confidentiality)',
      definition: 'הגנה על מידע מפני גישה לא מורשית',
      position: { x: 100, y: 50 }
    }
  ]
}]
```
3. Render in `InteractiveDiagram.tsx` component

### Testing Progress Tracking
```typescript
// Manually test in browser console
localStorage.clear(); // Reset progress
window.location.reload();

// Check stored data
JSON.parse(localStorage.getItem('cyberscape_progress'));

// Manually set progress
const progress = {
  modulesCompleted: ['foundations', 'nist'],
  totalXP: 200,
  currentRank: 'Specialist'
};
localStorage.setItem('cyberscape_progress', JSON.stringify(progress));
```

### Debugging localStorage Issues
```typescript
// Add this to useEffect for debugging
useEffect(() => {
  console.log('Progress loaded:', progress);
}, [progress]);

// Check quota
const estimate = await navigator.storage.estimate();
console.log(`Using ${estimate.usage} / ${estimate.quota} bytes`);
```

## Hebrew RTL Best Practices

### Text Direction
```tsx
// Root layout
<html dir="rtl" lang="he">

// Mixed content (Hebrew + English)
<div className="text-right">
  <span>פונקציית</span> <span className="font-mono">Identify</span> <span>של NIST</span>
</div>
```

### Layout Adjustments
```css
/* Use logical properties */
.element {
  margin-inline-start: 1rem;  /* Instead of margin-left */
  padding-inline-end: 2rem;   /* Instead of padding-right */
}

/* Tailwind RTL utilities */
<div className="mr-4 rtl:ml-4 rtl:mr-0">  /* Conditional margins */
```

### Navigation
```tsx
// Reverse flex order for RTL
<div className="flex flex-row-reverse gap-4">
  <button>הבא →</button>  {/* "Next" on right in RTL */}
  <button>← הקודם</button>  {/* "Previous" on left in RTL */}
</div>
```

### Icons and Arrows
- Use Unicode arrows: `←` `→` (they flip automatically in RTL)
- **AVOID** hardcoded left/right in icon components
- Test all directional elements (breadcrumbs, navigation, sliders)

## Things to AVOID

### ❌ NEVER Do This
```typescript
// ❌ Don't use server-side features
export async function getServerSideProps() { }
export async function generateStaticParams() { }

// ❌ Don't create API routes
// app/api/whatever/route.ts

// ❌ Don't use 'any' type
const data: any = localStorage.getItem('key');

// ❌ Don't write English user-facing text
<button>Continue</button>  // Should be: המשך

// ❌ Don't use inline styles
<div style={{ color: 'red' }}>  // Use className instead

// ❌ Don't forget 'use client' for interactive components
import { useState } from 'react';
export default function Component() { }  // Missing 'use client'

// ❌ Don't access localStorage directly in components
const data = localStorage.getItem('key');  // Might break SSR
```

### ✅ DO This Instead
```typescript
// ✅ Use client-side only
'use client';
export default function Component() { }

// ✅ Use proper types
const data: UserProgress | null = loadProgress();

// ✅ Use Hebrew
<button>המשך</button>

// ✅ Use Tailwind classes
<div className="text-red-500">

// ✅ Safe localStorage access
useEffect(() => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('key');
  }
}, []);
```

## Error Handling

### localStorage Errors
```typescript
try {
  localStorage.setItem('key', JSON.stringify(data));
} catch (error) {
  if (error instanceof DOMException && error.name === 'QuotaExceededError') {
    alert('אחסון מלא. אנא נקה נתונים ישנים.');
  } else {
    console.error('Failed to save:', error);
  }
}
```

### Simulation Errors
```typescript
// Always validate node exists
const currentNode = simulation.nodes.find(n => n.id === currentNodeId);
if (!currentNode) {
  console.error(`Node not found: ${currentNodeId}`);
  return <ErrorFallback />;
}
```

### Exam Timer Edge Cases
```typescript
// Handle negative time
const timeRemaining = Math.max(0, timeLimit - elapsed);

// Auto-submit when time runs out
useEffect(() => {
  if (timeRemaining <= 0) {
    handleSubmit();
  }
}, [timeRemaining]);
```

## Testing Checklist

Before committing, manually test:
- [ ] Dashboard renders correctly in RTL
- [ ] Module navigation (next/prev) works
- [ ] Progress saves to localStorage
- [ ] Progress persists after page refresh
- [ ] Exam timer counts down correctly
- [ ] Exam auto-submits at 0:00
- [ ] Certificate downloads as PDF
- [ ] All Hebrew text displays correctly
- [ ] No console errors
- [ ] Works in Chrome, Firefox, Safari

## Deployment

### Pre-Deployment Checklist
```bash
# 1. Type check
npm run type-check

# 2. Lint
npm run lint

# 3. Build for production
npm run build

# 4. Check output directory
ls -la out/

# 5. Test static export locally
npx serve out
```

### Vercel Deployment
```bash
# Install Vercel CLI (if needed)
npm i -g vercel

# Deploy
vercel --prod

# Environment variables (none needed for this project)
```

### Post-Deployment Testing
- [ ] Visit deployed URL
- [ ] Test localStorage works on production
- [ ] Test all routes accessible
- [ ] Check mobile responsiveness
- [ ] Verify Hebrew RTL layout
- [ ] Test certificate download
- [ ] Check Lighthouse score (target: 90+)

## Performance Optimization

### Code Splitting
```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const CertificateGenerator = dynamic(
  () => import('@/components/exam/CertificateGenerator'),
  { ssr: false }
);
```

### Image Optimization
```bash
# Compress images
npx @squoosh/cli --webp -d public/images/compressed public/images/*.png

# Use lazy loading
<img loading="lazy" src="..." alt="..." />
```

### Bundle Analysis
```bash
# Add to package.json
"analyze": "ANALYZE=true npm run build"

# Run
npm run analyze
```

## Debugging Tips

### localStorage Inspector
```javascript
// Paste in browser console
console.table(JSON.parse(localStorage.getItem('cyberscape_progress')));

// Export progress
copy(localStorage.getItem('cyberscape_progress'));

// Import progress
const progress = JSON.parse(prompt('Paste progress JSON'));
localStorage.setItem('cyberscape_progress', JSON.stringify(progress));
```

### React DevTools
- Use React DevTools to inspect component state
- Check props passed to children
- Monitor re-renders with Profiler

### Network Tab
- Verify no API calls are made (should be 0)
- Check bundle sizes (target: <500KB gzipped)
- Ensure static assets load from CDN

## Content Extraction from PDFs

When extracting content from lecture PDFs:

1. **Read PDF first**: Always read the PDF before extracting
2. **Identify key concepts**: Look for main topics, definitions, frameworks
3. **Summarize concisely**: Aim for 300-600 words per lesson
4. **Structure hierarchically**: Heading → Sections → Bullet points
5. **Extract diagrams**: Note any visual frameworks (CIA Triad, NIST Cycle, etc.)
6. **Create questions**: Generate 3-5 questions per major topic
7. **Translate terminology**: Keep English for NIST, CIA, XSS, etc.
8. **Add examples**: Include Israeli context where relevant

## Working with Existing HTML Prototypes

The `Pages/` folder contains HTML prototypes showing the desired UI. When implementing:

1. **Extract design tokens**: Colors, fonts, spacing, shadows
2. **Replicate layouts**: Match component structure
3. **Preserve animations**: Keep hover effects, transitions
4. **Convert to React**: Break down into reusable components
5. **Make it dynamic**: Replace hardcoded content with props
6. **Improve accessibility**: Add ARIA labels, keyboard navigation

## Questions or Issues?

If you encounter:
- **Unclear requirements**: Check `Docs/prd.md` for details
- **Technical questions**: Reference `Docs/technical_specifications.md`
- **Design questions**: Look at HTML prototypes in `Pages/`
- **Content questions**: Review lecture PDFs in `Lectures/`

When in doubt:
1. Follow the HTML prototypes for design
2. Prioritize Hebrew RTL support
3. Keep it client-side (no backend)
4. Test in localStorage
5. Ask the user if truly stuck

---

**Remember**: This is a weekend sprint project. Prioritize working features over perfect code. Ship early, iterate if needed. The goal is to help students pass their exam! 🎯

**Version**: 1.0
**Last Updated**: 2026-02-11
**Status**: Ready for Development
