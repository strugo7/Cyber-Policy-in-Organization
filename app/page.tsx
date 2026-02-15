'use client';

import { useState, useEffect } from 'react';
import { modules } from '@/lib/content/modules';
import { loadProgress } from '@/lib/utils/progress';
import type { UserProgress, Module } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';
import ProgressBar from '@/components/ui/ProgressBar';
import Link from 'next/link';

const MODULE_COLORS = [
  { border: 'border-cyan-400/30', glow: 'hover:border-cyan-400/60', accent: 'text-cyan-400', bg: 'module-card-gradient-1', tag: 'bg-cyan-400/10 text-cyan-400' },
  { border: 'border-purple-400/30', glow: 'hover:border-purple-400/60', accent: 'text-purple-400', bg: 'module-card-gradient-2', tag: 'bg-purple-400/10 text-purple-400' },
  { border: 'border-blue-400/30', glow: 'hover:border-blue-400/60', accent: 'text-blue-400', bg: 'module-card-gradient-3', tag: 'bg-blue-400/10 text-blue-400' },
  { border: 'border-amber-400/30', glow: 'hover:border-amber-400/60', accent: 'text-amber-400', bg: 'module-card-gradient-4', tag: 'bg-amber-400/10 text-amber-400' },
  { border: 'border-emerald-400/30', glow: 'hover:border-emerald-400/60', accent: 'text-emerald-400', bg: 'module-card-gradient-5', tag: 'bg-emerald-400/10 text-emerald-400' },
  { border: 'border-red-400/30', glow: 'hover:border-red-400/60', accent: 'text-red-400', bg: 'module-card-gradient-6', tag: 'bg-red-400/10 text-red-400' },
  { border: 'border-rose-400/30', glow: 'hover:border-rose-400/60', accent: 'text-rose-400', bg: 'module-card-gradient-7', tag: 'bg-rose-400/10 text-rose-400' },
  { border: 'border-indigo-400/30', glow: 'hover:border-indigo-400/60', accent: 'text-indigo-400', bg: 'module-card-gradient-8', tag: 'bg-indigo-400/10 text-indigo-400' },
];

function getModuleProgress(module: Module, progress: UserProgress) {
  const completedLessons = module.lessons.filter((l) =>
    progress.lessonsCompleted.includes(l.id)
  ).length;
  return {
    completed: completedLessons,
    total: module.lessons.length,
    isComplete: progress.modulesCompleted.includes(module.id),
  };
}

function getStatusLabel(isComplete: boolean, completedCount: number) {
  if (isComplete) return { text: 'הושלם', class: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30' };
  if (completedCount > 0) return { text: 'בתהליך', class: 'bg-amber-400/10 text-amber-400 border-amber-400/30' };
  return { text: 'טרם התחיל', class: 'bg-white/5 text-gray-400 border-white/10' };
}

export default function HomePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = progress?.lessonsCompleted.length ?? 0;
  const completedModules = progress?.modulesCompleted.length ?? 0;
  const overallPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-primary">
              CyberScape Academy
            </h1>
            <p className="text-gray-400 text-sm mt-1">מדיניות סייבר בארגון</p>
          </div>
          {progress && (
            <div className="flex items-center gap-4">
              <div className="text-left">
                <span className="text-xs text-gray-500 block">דרגה</span>
                <span className="text-sm font-semibold text-primary">{progress.currentRank}</span>
              </div>
              <div className="w-px h-8 bg-primary/20" />
              <div className="text-left">
                <span className="text-xs text-gray-500 block">XP</span>
                <span className="text-sm font-semibold text-primary">{progress.totalXP}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Progress Section */}
        <GlassCard className="p-6 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-100 mb-1">התקדמות כללית</h2>
              <p className="text-sm text-gray-400">
                {completedModules} מתוך {modules.length} מודולים הושלמו · {completedLessons} מתוך {totalLessons} שיעורים
              </p>
              <ProgressBar value={completedLessons} max={totalLessons} className="mt-3 max-w-md" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-primary">{overallPercentage}%</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Section Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h2 className="text-xl font-display font-bold text-gray-100">מודולי הלימוד</h2>
          <span className="text-sm text-gray-500">({modules.length} מודולים)</span>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const colors = MODULE_COLORS[index % MODULE_COLORS.length];
            const moduleProgress = progress
              ? getModuleProgress(module, progress)
              : { completed: 0, total: module.lessons.length, isComplete: false };
            const status = getStatusLabel(moduleProgress.isComplete, moduleProgress.completed);

            return (
              <Link
                key={module.id}
                href={`/modules/${module.id}`}
                className="block group"
              >
                <div
                  className={`
                    ${colors.bg} rounded-2xl border ${colors.border} ${colors.glow}
                    backdrop-blur-xl p-6 transition-all duration-300
                    hover:translate-y-[-4px] hover:shadow-lg
                  `}
                >
                  {/* Header row: icon + status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{module.icon}</div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${status.class}`}>
                      {status.text}
                    </span>
                  </div>

                  {/* Module number tag */}
                  <span className={`text-xs px-2 py-0.5 rounded-md ${colors.tag} font-mono`}>
                    מודול {module.order}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-100 mt-2 mb-2 group-hover:text-white transition-colors">
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {module.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      📚 {module.lessons.length} שיעורים
                    </span>
                    <span className="flex items-center gap-1">
                      ⚡ {module.xpReward} XP
                    </span>
                    <span className="flex items-center gap-1">
                      ⏱️ {module.lessons.reduce((sum, l) => sum + l.estimatedTime, 0)} דק׳
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>התקדמות</span>
                      <span>{moduleProgress.completed}/{moduleProgress.total}</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          moduleProgress.isComplete ? 'bg-emerald-400' : 'bg-primary'
                        }`}
                        style={{
                          width: `${moduleProgress.total > 0 ? (moduleProgress.completed / moduleProgress.total) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassCard className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-2xl">
              🎯
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-100">סימולציות מבצעיות</h3>
              <p className="text-xs text-gray-400 mt-0.5">2 תרחישים: תוכנת כופר והנדסה חברתית</p>
            </div>
            <span className="text-primary text-sm">בקרוב</span>
          </GlassCard>

          <GlassCard className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center text-2xl">
              📝
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-100">מבחן סיום</h3>
              <p className="text-xs text-gray-400 mt-0.5">20 שאלות · 30 דקות · 70% לעבור</p>
            </div>
            <span className="text-primary text-sm">בקרוב</span>
          </GlassCard>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-primary/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-gray-600">
          CyberScape Academy © {new Date().getFullYear()} · מדיניות סייבר בארגון
        </div>
      </footer>
    </main>
  );
}
