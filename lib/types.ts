// Content Models

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  lessons: Lesson[];
  xpReward: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: LessonContent;
  order: number;
  estimatedTime: number;
}

export interface LessonContent {
  sections: Section[];
  diagrams?: Diagram[];
  keyTakeaways: string[];
}

export interface Section {
  heading: string;
  paragraphs: string[];
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
  definition: string;
  position: { x: number; y: number };
}

export interface Question {
  id: string;
  moduleId: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Simulation {
  id: 'ransomware' | 'social-engineering';
  title: string;
  description: string;
  startNodeId: string;
  nodes: SimulationNode[];
  timeLimit?: number;
}

export interface SimulationNode {
  id: string;
  type: 'decision' | 'outcome';
  content: string;
  terminalLog?: string;
  options?: {
    label: string;
    nextNodeId: string;
  }[];
  outcome?: {
    type: 'success' | 'partial' | 'failure';
    feedback: string;
    xpReward: number;
  };
}

// State Models

export type Rank = 'Analyst' | 'Specialist' | 'Expert' | 'CISO';

export interface UserProgress {
  agentName: string;
  currentRank: Rank;
  totalXP: number;
  modulesCompleted: string[];
  lessonsCompleted: string[];
  simulationScores: {
    [simulationId: string]: {
      score: number;
      attempts: number;
      bestOutcome: 'success' | 'partial' | 'failure';
    };
  };
  examAttempts: ExamAttempt[];
  lastActive: string;
  preferences: {
    soundEnabled: boolean;
    reducedMotion: boolean;
  };
}

export interface ExamAttempt {
  timestamp: string;
  questions: string[];
  answers: number[];
  score: number;
  passed: boolean;
  timeSpent: number;
}

export const RANK_THRESHOLDS: Record<Rank, number> = {
  Analyst: 0,
  Specialist: 100,
  Expert: 300,
  CISO: 500,
};
