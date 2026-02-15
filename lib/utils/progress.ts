import { UserProgress, Rank, RANK_THRESHOLDS } from '@/lib/types';
import { modules } from '@/lib/content/modules';

const STORAGE_KEY = 'cyberscape_progress';

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

function isValidProgress(data: unknown): data is UserProgress {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.currentRank === 'string' &&
    typeof obj.totalXP === 'number' &&
    Array.isArray(obj.modulesCompleted) &&
    Array.isArray(obj.lessonsCompleted) &&
    Array.isArray(obj.examAttempts)
  );
}

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return getDefaultProgress();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultProgress();
    const parsed: unknown = JSON.parse(stored);
    if (!isValidProgress(parsed)) return getDefaultProgress();
    return parsed;
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert('אחסון מלא. אנא נקה נתונים ישנים.');
    }
  }
}

export function calculateRank(xp: number): Rank {
  if (xp >= RANK_THRESHOLDS.CISO) return 'CISO';
  if (xp >= RANK_THRESHOLDS.Expert) return 'Expert';
  if (xp >= RANK_THRESHOLDS.Specialist) return 'Specialist';
  return 'Analyst';
}

export function completeLesson(
  progress: UserProgress,
  lessonId: string,
  moduleId: string,
  xpReward: number
): UserProgress {
  const updated = { ...progress };

  if (!updated.lessonsCompleted.includes(lessonId)) {
    updated.lessonsCompleted = [...updated.lessonsCompleted, lessonId];
    updated.totalXP += xpReward;
  }

  const module = modules.find((m) => m.id === moduleId);
  if (module) {
    const allLessonsComplete = module.lessons.every((l) =>
      updated.lessonsCompleted.includes(l.id)
    );
    if (allLessonsComplete && !updated.modulesCompleted.includes(moduleId)) {
      updated.modulesCompleted = [...updated.modulesCompleted, moduleId];
      updated.totalXP += module.xpReward;
      updated.currentRank = calculateRank(updated.totalXP);
    }
  }

  updated.lastActive = new Date().toISOString();
  saveProgress(updated);
  return updated;
}
