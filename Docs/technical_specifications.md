# Technical Specifications: CyberScape Academy

## 1. System Architecture

**CyberScape Academy** is a client-side only Single Page Application (SPA) built with Next.js 14 in static export mode. There is **no backend server, no database, and no authentication system**. All functionality runs in the browser, with localStorage providing data persistence.

### 1.1 Architecture Diagram

```
┌──────────────────────────────────────────────────────────┐
│                   Browser Environment                     │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │         Next.js 14 App Router (Static)             │  │
│  │                                                     │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────┐  │  │
│  │  │ Dashboard   │  │   Modules    │  │  Exam    │  │  │
│  │  │  (/)        │  │ (/modules/*) │  │ (/exam)  │  │  │
│  │  └─────────────┘  └──────────────┘  └──────────┘  │  │
│  │          │                │                │        │  │
│  │          └────────────────┴────────────────┘        │  │
│  │                         │                           │  │
│  │          ┌──────────────▼──────────────┐            │  │
│  │          │   React Components          │            │  │
│  │          │  (Tailwind + Framer Motion) │            │  │
│  │          └──────────────┬──────────────┘            │  │
│  │                         │                           │  │
│  │          ┌──────────────▼──────────────┐            │  │
│  │          │  TypeScript Content Layer   │            │  │
│  │          │  • modules.ts                │            │  │
│  │          │  • questions.ts              │            │  │
│  │          │  • simulations.ts            │            │  │
│  │          └──────────────┬──────────────┘            │  │
│  │                         │                           │  │
│  │          ┌──────────────▼──────────────┐            │  │
│  │          │  localStorage Manager        │            │  │
│  │          │  • Progress tracking         │            │  │
│  │          │  • User preferences          │            │  │
│  │          │  • Exam scores               │            │  │
│  │          └─────────────────────────────┘            │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
└──────────────────────────────────────────────────────────┘
                            │
                            │ Static Assets (HTML/CSS/JS)
                            ▼
              ┌─────────────────────────────┐
              │    Vercel CDN (Global)      │
              │  • Automatic HTTPS          │
              │  • Edge caching             │
              │  • Zero config deployment   │
              └─────────────────────────────┘
```

### 1.2 Tech Stack

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Framework** | Next.js 14 (App Router) | Static export support, optimal React DX, built-in routing |
| **Language** | TypeScript 5.x | Type safety, better IDE support, catch bugs at compile time |
| **Styling** | Tailwind CSS 3.x | Rapid development, consistent design tokens, small bundle |
| **Animations** | Framer Motion 11.x | Production-ready, declarative, smooth 60fps animations |
| **PDF Generation** | jsPDF 2.x | Client-side certificate generation, no server required |
| **State Management** | React Context + useReducer | Built-in, no external library needed for simple state |
| **Persistence** | Web Storage API (localStorage) | Native browser API, no dependencies, 5-10MB storage |
| **Deployment** | Vercel | Zero-config Next.js deployment, global CDN, auto HTTPS |
| **Package Manager** | npm | Standard, reliable, well-documented |

### 1.3 Why No Backend?

**Benefits**:
- ✅ Instant deployment (no server setup)
- ✅ Zero hosting costs (static hosting is free)
- ✅ Infinite scalability (CDN handles traffic)
- ✅ Perfect Lighthouse scores (no server latency)
- ✅ Offline-capable (PWA ready)
- ✅ Privacy-first (no user data collected)
- ✅ Simple maintenance (no database migrations, no API versioning)

**Trade-offs**:
- ❌ No cross-device sync (localStorage is browser-bound)
- ❌ No analytics (unless client-side tracking added)
- ❌ No leaderboards (would require backend)
- ❌ Content updates require redeployment (acceptable for course material)

**Decision**: For a weekend exam prep tool with anonymous users, the benefits far outweigh the trade-offs.

## 2. Project Structure

```
cyberscape-academy/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx                # Root layout (Hebrew RTL, fonts, metadata)
│   ├── page.tsx                  # Dashboard (3D isometric map)
│   ├── globals.css               # Tailwind imports + custom CSS
│   ├── modules/
│   │   ├── [moduleId]/
│   │   │   ├── page.tsx          # Module overview
│   │   │   └── [lessonId]/
│   │   │       └── page.tsx      # Individual lesson
│   ├── simulations/
│   │   ├── ransomware/
│   │   │   └── page.tsx          # Ransomware Wargame
│   │   └── social-engineering/
│   │       └── page.tsx          # Social Engineering Sim
│   ├── exam/
│   │   ├── page.tsx              # Exam interface
│   │   └── results/
│   │       └── page.tsx          # Results + certificate download
│   └── not-found.tsx             # 404 page
│
├── components/                   # React components
│   ├── dashboard/
│   │   ├── IsometricMap.tsx      # 3D clickable city map
│   │   ├── ProgressStats.tsx     # XP, rank, completion %
│   │   └── QuickActions.tsx      # Resume/Exam buttons
│   ├── learning/
│   │   ├── LessonViewer.tsx      # Theory content display
│   │   ├── InteractiveDiagram.tsx # SVG-based diagrams
│   │   └── ModuleNav.tsx         # Next/Prev navigation
│   ├── simulations/
│   │   ├── WarRoom.tsx           # Simulation container
│   │   ├── DecisionTree.tsx      # Branching logic
│   │   └── TerminalLog.tsx       # Scrolling log display
│   ├── exam/
│   │   ├── QuizEngine.tsx        # Question display + selection
│   │   ├── Timer.tsx             # Countdown timer
│   │   └── CertificateGenerator.tsx # PDF generation
│   └── ui/                       # Reusable UI components
│       ├── GlassCard.tsx         # Glassmorphism panel
│       ├── CyberButton.tsx       # Themed button
│       ├── ProgressBar.tsx       # Progress indicator
│       └── Breadcrumb.tsx        # Navigation breadcrumb
│
├── lib/                          # Utility functions and data
│   ├── content/
│   │   ├── modules.ts            # 6 modules with lessons
│   │   ├── questions.ts          # 25-30 exam questions
│   │   └── simulations.ts        # 2 simulation scenarios
│   ├── utils/
│   │   ├── progress.ts           # localStorage CRUD operations
│   │   ├── xp.ts                 # XP calculation logic
│   │   └── shuffle.ts            # Question randomization
│   ├── hooks/
│   │   ├── useProgress.ts        # Progress tracking hook
│   │   └── useTimer.ts           # Timer hook for exam/sims
│   └── types.ts                  # TypeScript interfaces
│
├── public/                       # Static assets
│   ├── images/
│   │   ├── isometric/            # Dashboard sector graphics
│   │   ├── diagrams/             # SVG diagrams
│   │   └── logo.svg              # Academy logo
│   └── fonts/                    # Custom fonts (if needed)
│
├── tailwind.config.ts            # Tailwind configuration
├── next.config.mjs               # Next.js config (output: 'export')
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
└── README.md                     # Student instructions
```

## 3. Data Models (TypeScript Interfaces)

### 3.1 Content Models

```typescript
// lib/types.ts

export interface Module {
  id: string;                   // 'foundations', 'nist', etc.
  title: string;                // Hebrew: 'יסודות הסייבר'
  description: string;
  icon: string;                 // Icon name or path
  order: number;
  lessons: Lesson[];
  xpReward: number;             // XP earned upon completion
}

export interface Lesson {
  id: string;                   // 'cia-triad', 'threat-landscape'
  moduleId: string;
  title: string;                // Hebrew: 'משולש ה-CIA'
  content: LessonContent;
  order: number;
  estimatedTime: number;        // Minutes
}

export interface LessonContent {
  sections: Section[];
  diagrams?: Diagram[];
  keyTakeaways: string[];       // Bullet points in Hebrew
}

export interface Section {
  heading: string;
  paragraphs: string[];         // Hebrew text
  subsections?: Section[];
}

export interface Diagram {
  id: string;
  type: 'cia-triad' | 'nist-cycle' | 'risk-matrix' | 'defense-layers';
  interactiveElements?: DiagramElement[];
}

export interface DiagramElement {
  id: string;
  label: string;
  definition: string;           // Shown on hover/click
  position: { x: number; y: number };
}

export interface Question {
  id: string;
  moduleId: string;
  text: string;                 // Hebrew question
  options: string[];            // 4 options (Hebrew)
  correctIndex: number;         // 0-3
  explanation: string;          // Why answer is correct/incorrect
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Simulation {
  id: 'ransomware' | 'social-engineering';
  title: string;
  description: string;
  startNodeId: string;
  nodes: SimulationNode[];
  timeLimit?: number;           // Seconds (for ransomware)
}

export interface SimulationNode {
  id: string;
  type: 'decision' | 'outcome';
  content: string;              // Hebrew text
  terminalLog?: string;         // Terminal-style log message
  options?: {
    label: string;              // Hebrew
    nextNodeId: string;
  }[];
  outcome?: {
    type: 'success' | 'partial' | 'failure';
    feedback: string;           // Educational explanation
    xpReward: number;
  };
}
```

### 3.2 State Models

```typescript
// lib/types.ts

export interface UserProgress {
  agentName: string;            // Optional, for certificate
  currentRank: Rank;
  totalXP: number;
  modulesCompleted: string[];   // Module IDs
  lessonsCompleted: string[];   // Lesson IDs
  simulationScores: {
    [simulationId: string]: {
      score: number;
      attempts: number;
      bestOutcome: 'success' | 'partial' | 'failure';
    };
  };
  examAttempts: ExamAttempt[];
  lastActive: string;           // ISO timestamp
  preferences: {
    soundEnabled: boolean;
    reducedMotion: boolean;
  };
}

export type Rank = 'Analyst' | 'Specialist' | 'Expert' | 'CISO';

export interface ExamAttempt {
  timestamp: string;
  questions: string[];          // Question IDs (20 selected)
  answers: number[];            // User's selected option indices
  score: number;                // 0-20
  passed: boolean;              // >= 14 correct
  timeSpent: number;            // Seconds
}

export const RANK_THRESHOLDS = {
  Analyst: 0,
  Specialist: 100,              // Complete 2 modules
  Expert: 300,                  // Complete 5 modules
  CISO: 500,                    // Complete all + pass exam
};
```

## 4. Core Features Implementation

### 4.1 localStorage Management

```typescript
// lib/utils/progress.ts

const STORAGE_KEY = 'cyberscape_progress';

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return getDefaultProgress();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultProgress();
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load progress:', error);
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert('אחסון מלא. אנא נקה נתונים ישנים.');
    }
  }
}

export function getDefaultProgress(): UserProgress {
  return {
    agentName: '',
    currentRank: 'Analyst',
    totalXP: 0,
    modulesCompleted: [],
    lessonsCompleted: [],
    simulationScores: {},
    examAttempts: [],
    lastActive: new Date().toISOString(),
    preferences: {
      soundEnabled: false,
      reducedMotion: false,
    },
  };
}

export function completeLesson(
  progress: UserProgress,
  lessonId: string,
  moduleId: string,
  xpReward: number
): UserProgress {
  const updated = { ...progress };

  if (!updated.lessonsCompleted.includes(lessonId)) {
    updated.lessonsCompleted.push(lessonId);
    updated.totalXP += xpReward;
  }

  // Check if module is complete
  const module = modules.find(m => m.id === moduleId);
  if (module) {
    const allLessonsComplete = module.lessons.every(l =>
      updated.lessonsCompleted.includes(l.id)
    );
    if (allLessonsComplete && !updated.modulesCompleted.includes(moduleId)) {
      updated.modulesCompleted.push(moduleId);
      updated.totalXP += module.xpReward;
      updated.currentRank = calculateRank(updated.totalXP);
    }
  }

  updated.lastActive = new Date().toISOString();
  saveProgress(updated);
  return updated;
}

export function calculateRank(xp: number): Rank {
  if (xp >= RANK_THRESHOLDS.CISO) return 'CISO';
  if (xp >= RANK_THRESHOLDS.Expert) return 'Expert';
  if (xp >= RANK_THRESHOLDS.Specialist) return 'Specialist';
  return 'Analyst';
}
```

### 4.2 Simulation Engine

```typescript
// components/simulations/DecisionTree.tsx

'use client';

import { useState, useEffect } from 'react';
import { Simulation, SimulationNode } from '@/lib/types';

interface Props {
  simulation: Simulation;
  onComplete: (outcome: 'success' | 'partial' | 'failure', xp: number) => void;
}

export default function DecisionTree({ simulation, onComplete }: Props) {
  const [currentNodeId, setCurrentNodeId] = useState(simulation.startNodeId);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(simulation.timeLimit || 0);

  const currentNode = simulation.nodes.find(n => n.id === currentNodeId);

  useEffect(() => {
    if (!simulation.timeLimit) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChoice = (nextNodeId: string) => {
    if (currentNode?.terminalLog) {
      setTerminalLogs(prev => [...prev, currentNode.terminalLog!]);
    }

    const nextNode = simulation.nodes.find(n => n.id === nextNodeId);

    if (nextNode?.type === 'outcome') {
      onComplete(
        nextNode.outcome!.type,
        nextNode.outcome!.xpReward
      );
    } else {
      setCurrentNodeId(nextNodeId);
    }
  };

  const handleTimeOut = () => {
    // Find timeout outcome node
    const timeoutNode = simulation.nodes.find(n =>
      n.id === 'timeout' || n.outcome?.type === 'failure'
    );
    if (timeoutNode?.outcome) {
      onComplete(timeoutNode.outcome.type, timeoutNode.outcome.xpReward);
    }
  };

  if (!currentNode) return null;

  return (
    <div className="space-y-6">
      {/* Timer (if applicable) */}
      {simulation.timeLimit && (
        <div className="text-center">
          <div className={`text-4xl font-mono ${timeRemaining < 60 ? 'text-red-500' : 'text-cyan-400'}`}>
            {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
          </div>
        </div>
      )}

      {/* Terminal Logs */}
      {terminalLogs.length > 0 && (
        <div className="bg-black/80 p-4 rounded-lg font-mono text-sm text-green-400 max-h-40 overflow-y-auto">
          {terminalLogs.map((log, i) => (
            <div key={i}>> {log}</div>
          ))}
        </div>
      )}

      {/* Current Scenario */}
      <div className="glass-card p-6">
        <p className="text-lg leading-relaxed">{currentNode.content}</p>
      </div>

      {/* Decision Options */}
      {currentNode.type === 'decision' && (
        <div className="grid gap-4">
          {currentNode.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleChoice(option.nextNodeId)}
              className="cyber-button p-4 text-right hover:scale-105 transition-transform"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Outcome Display */}
      {currentNode.type === 'outcome' && (
        <div className={`glass-card p-6 border-2 ${
          currentNode.outcome?.type === 'success'
            ? 'border-green-500'
            : currentNode.outcome?.type === 'partial'
            ? 'border-yellow-500'
            : 'border-red-500'
        }`}>
          <h3 className="text-2xl font-bold mb-4">
            {currentNode.outcome?.type === 'success' ? '✅ הצלחה!' :
             currentNode.outcome?.type === 'partial' ? '⚠️ הצלחה חלקית' :
             '❌ כישלון'}
          </h3>
          <p className="text-lg leading-relaxed">{currentNode.outcome?.feedback}</p>
          <p className="mt-4 text-cyan-400">
            +{currentNode.outcome?.xpReward} XP
          </p>
        </div>
      )}
    </div>
  );
}
```

### 4.3 Quiz Engine

```typescript
// components/exam/QuizEngine.tsx

'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/lib/types';

interface Props {
  questions: Question[];
  timeLimit: number;            // Seconds
  onSubmit: (answers: number[], timeSpent: number) => void;
}

export default function QuizEngine({ questions, timeLimit, onSubmit }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (optionIndex: number) => {
    const updated = [...answers];
    updated[currentIndex] = optionIndex;
    setAnswers(updated);
  };

  const handleFlag = () => {
    const updated = new Set(flagged);
    if (flagged.has(currentIndex)) {
      updated.delete(currentIndex);
    } else {
      updated.add(currentIndex);
    }
    setFlagged(updated);
  };

  const handleSubmit = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    onSubmit(answers as number[], timeSpent);
  };

  const currentQuestion = questions[currentIndex];
  const answeredCount = answers.filter(a => a !== null).length;
  const progress = (currentIndex + 1) / questions.length * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-sm">
          שאלה {currentIndex + 1} מתוך {questions.length}
        </div>
        <div className={`text-2xl font-mono ${timeRemaining < 300 ? 'text-red-500 animate-pulse' : ''}`}>
          {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-cyan-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="glass-card p-8">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold leading-relaxed flex-1">
            {currentQuestion.text}
          </h2>
          <button
            onClick={handleFlag}
            className={`mr-4 ${flagged.has(currentIndex) ? 'text-yellow-500' : 'text-gray-500'}`}
          >
            🚩
          </button>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-4 text-right rounded-lg border-2 transition-all ${
                answers[currentIndex] === index
                  ? 'border-cyan-500 bg-cyan-500/20'
                  : 'border-gray-600 hover:border-gray-400'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="cyber-button"
        >
          ← הקודם
        </button>

        <div className="text-sm">
          נענו: {answeredCount} / {questions.length}
        </div>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className="cyber-button"
          >
            הבא →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < questions.length}
            className="cyber-button bg-green-600 hover:bg-green-500"
          >
            סיים מבחן
          </button>
        )}
      </div>
    </div>
  );
}
```

### 4.4 Certificate Generation

```typescript
// components/exam/CertificateGenerator.tsx

'use client';

import { jsPDF } from 'jspdf';
import { UserProgress, ExamAttempt } from '@/lib/types';

export function generateCertificate(
  progress: UserProgress,
  exam: ExamAttempt
): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Background
  doc.setFillColor(10, 22, 24);
  doc.rect(0, 0, 297, 210, 'F');

  // Border (Cyberpunk style)
  doc.setDrawColor(61, 214, 245);
  doc.setLineWidth(2);
  doc.rect(10, 10, 277, 190);

  // Title
  doc.setFontSize(32);
  doc.setTextColor(61, 214, 245);
  doc.text('CyberScape Academy', 148.5, 40, { align: 'center' });

  // Certificate type
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('Cyber Policy Specialist Certificate', 148.5, 60, { align: 'center' });

  // Student name
  doc.setFontSize(28);
  doc.setTextColor(127, 19, 236);
  const name = progress.agentName || 'Cyber Agent';
  doc.text(name, 148.5, 90, { align: 'center' });

  // Body text
  doc.setFontSize(14);
  doc.setTextColor(200, 200, 200);
  doc.text('has successfully completed the comprehensive training program covering:', 148.5, 105, { align: 'center' });

  // Topics
  doc.setFontSize(11);
  const topics = [
    'NIST Cybersecurity Framework 2.0',
    'Risk Management & Supply Chain Security',
    'Incident Response & Business Continuity',
    'Defense in Depth & Access Control',
    'Cyber Governance & Corporate Strategy',
  ];
  topics.forEach((topic, i) => {
    doc.text(`• ${topic}`, 148.5, 120 + i * 7, { align: 'center' });
  });

  // Score
  doc.setFontSize(16);
  doc.setTextColor(61, 214, 245);
  doc.text(`Final Score: ${exam.score}/20 (${Math.round(exam.score / 20 * 100)}%)`, 148.5, 165, { align: 'center' });

  // Date and ID
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  const date = new Date(exam.timestamp).toLocaleDateString('he-IL');
  doc.text(`Date: ${date}`, 30, 190);
  doc.text(`Certificate ID: ${generateCertId(exam.timestamp)}`, 267, 190, { align: 'right' });

  // Signature
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('Academy Director', 148.5, 180, { align: 'center' });
  doc.setLineWidth(0.5);
  doc.line(120, 177, 177, 177);

  // Download
  doc.save(`CyberScape_Certificate_${name.replace(/\s+/g, '_')}.pdf`);
}

function generateCertId(timestamp: string): string {
  const hash = btoa(timestamp).slice(0, 12).toUpperCase();
  return `CSA-${hash}`;
}
```

## 5. Styling & Design System

### 5.1 Tailwind Configuration

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3dd6f5',
          light: '#6ee7ff',
          dark: '#00a8cc',
        },
        secondary: {
          DEFAULT: '#7f13ec',
          light: '#9f54f0',
          dark: '#5e0eb3',
        },
        danger: '#f20d0d',
        background: {
          light: '#f7f6f8',
          dark: '#191022',
          deeper: '#0a1618',
        },
        surface: {
          dark: '#231530',
          glass: 'rgba(35, 21, 48, 0.6)',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        body: ['Heebo', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'cyber-grid': `
          radial-gradient(circle at center, transparent 0%, #191022 100%),
          linear-gradient(rgba(127, 19, 236, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(127, 19, 236, 0.05) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'cyber-grid': '100% 100%, 40px 40px, 40px 40px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 5.2 Global Styles

```css
/* app/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply bg-background-deeper text-white;
  }

  body {
    @apply font-body antialiased;
  }

  /* Hebrew RTL support */
  [dir="rtl"] {
    direction: rtl;
  }
}

@layer components {
  .glass-card {
    @apply bg-surface-glass backdrop-blur-xl border border-primary/20 rounded-xl;
  }

  .cyber-button {
    @apply px-6 py-3 bg-primary text-black font-bold rounded-lg
           transition-all duration-300
           hover:bg-primary-light hover:shadow-[0_0_20px_rgba(61,214,245,0.5)]
           active:scale-95;
  }

  .glow-primary {
    @apply shadow-[0_0_15px_rgba(61,214,245,0.4)];
  }

  .glow-danger {
    @apply shadow-[0_0_15px_rgba(242,13,13,0.4)];
  }

  .terminal-log {
    @apply font-mono text-sm text-green-400 bg-black/80 p-4 rounded;
  }
}

@layer utilities {
  .text-shadow-glow {
    text-shadow: 0 0 10px currentColor;
  }

  /* Scanline effect for terminals */
  .scanlines {
    background: linear-gradient(
      to bottom,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0) 50%,
      rgba(0,0,0,0.2) 50%,
      rgba(0,0,0,0.2) 100%
    );
    background-size: 100% 4px;
    pointer-events: none;
  }
}
```

## 6. Deployment Configuration

### 6.1 Next.js Config

```javascript
// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',              // Static export mode
  images: {
    unoptimized: true,           // Required for static export
  },
  trailingSlash: true,           // Better compatibility with static hosts
};

export default nextConfig;
```

### 6.2 Vercel Deployment

```json
// vercel.json (optional - Vercel auto-detects Next.js)

{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, immutable"
        }
      ]
    }
  ]
}
```

### 6.3 Package.json

```json
{
  "name": "cyberscape-academy",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^11.0.0",
    "jspdf": "^2.5.1"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.1.0"
  }
}
```

## 7. Performance Optimization

### 7.1 Code Splitting
- Next.js automatically code-splits by route
- Lazy load heavy components (e.g., jsPDF only on exam results page)
- Use `dynamic` import for simulations

### 7.2 Image Optimization
- Use WebP format for isometric graphics
- Compress images with tinypng.com or imagemin
- Lazy load dashboard sector images

### 7.3 Bundle Size
- Tree-shake unused Tailwind classes with PurgeCSS
- Avoid large dependencies (use jsPDF instead of heavier PDF libs)
- Total bundle target: <500KB gzipped

## 8. Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 100+ | ✅ Full support |
| Firefox | 100+ | ✅ Full support |
| Safari | 15+ | ✅ Full support |
| Edge | 100+ | ✅ Full support |
| Mobile Safari | 15+ | ⚠️ Limited (text/quiz only) |
| Mobile Chrome | 100+ | ⚠️ Limited (text/quiz only) |

### 8.1 Polyfills Not Required
Modern API usage:
- localStorage: Supported since IE8
- CSS Grid: Supported in all target browsers
- Flexbox: Supported in all target browsers
- ES6+: Next.js transpiles automatically

## 9. Security Considerations

### 9.1 XSS Prevention
- React automatically escapes user input
- Use `dangerouslySetInnerHTML` only for trusted content
- Sanitize localStorage reads (validate JSON schema)

### 9.2 localStorage Integrity
```typescript
// Validate localStorage data on read
function validateProgress(data: any): data is UserProgress {
  return (
    typeof data === 'object' &&
    typeof data.currentRank === 'string' &&
    typeof data.totalXP === 'number' &&
    Array.isArray(data.modulesCompleted)
  );
}
```

### 9.3 Content Security Policy (CSP)
```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  img-src 'self' data:;
```

## 10. Testing Strategy (Weekend Scope)

### 10.1 Manual Testing Checklist
- [ ] Dashboard renders with all sectors visible
- [ ] Module navigation works (next/prev)
- [ ] Progress persists after page refresh
- [ ] Exam timer counts down correctly
- [ ] Certificate downloads as PDF
- [ ] Hebrew RTL layout displays properly
- [ ] Works in Chrome, Firefox, Safari
- [ ] localStorage survives browser close/reopen

### 10.2 No Automated Tests (Time Constraint)
For a weekend project, manual testing is sufficient. If time allows:
- Add Playwright E2E test for exam flow
- Add Jest unit tests for XP calculation logic

## 11. Future Enhancements (Post-Weekend)

### 11.1 Progressive Web App (PWA)
- Add service worker for offline access
- Add manifest.json for "Add to Home Screen"
- Cache static assets for instant load

### 11.2 Analytics (Client-Side)
- Track module completion rates
- Measure average exam scores
- Identify difficult questions
- Use localStorage to store analytics (no server needed)

### 11.3 Accessibility Improvements
- Full keyboard navigation
- Screen reader optimization
- WCAG AAA compliance
- High contrast mode

---

**Document Version**: 2.0 (Weekend Sprint Edition)
**Last Updated**: 2026-02-11
**Status**: Architecture Locked, Ready to Build
