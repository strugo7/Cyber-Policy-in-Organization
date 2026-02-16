'use client';

import { useState } from 'react';
import { modules } from '@/lib/content/modules';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ModuleLesson from './ModuleLesson';

interface Props {
  moduleId: string;
}

export default function ModulePageClient({ moduleId }: Props) {
  const module = modules.find((m) => m.id === moduleId);
  const searchParams = useSearchParams();
  const startLessonParam = searchParams.get('startLesson');
  const [currentLessonIndex, setCurrentLessonIndex] = useState(
    startLessonParam ? parseInt(startLessonParam, 10) : 0
  );

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <h1 className="text-xl font-bold text-gray-100 mb-2">מודול לא נמצא</h1>
          <Link href="/" className="px-4 py-2 bg-primary text-black rounded-lg mt-4 inline-block">
            חזרה לדף הראשי
          </Link>
        </div>
      </div>
    );
  }

  const currentLesson = module.lessons[currentLessonIndex];
  const isFirst = currentLessonIndex === 0;
  const isLast = currentLessonIndex === module.lessons.length - 1;

  // If the current lesson has an htmlPage, redirect to it
  if (currentLesson?.htmlPage) {
    if (typeof window !== 'undefined') {
      window.location.href = currentLesson.htmlPage;
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-lg">טוען עמוד...</div>
      </div>
    );
  }

  const handleNext = () => {
    if (isLast) {
      window.location.href = '/';
    } else {
      const nextLesson = module.lessons[currentLessonIndex + 1];
      if (nextLesson?.htmlPage) {
        window.location.href = nextLesson.htmlPage;
      } else {
        setCurrentLessonIndex((prev) => prev + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      const prevLesson = module.lessons[currentLessonIndex - 1];
      if (prevLesson?.htmlPage) {
        window.location.href = prevLesson.htmlPage;
      } else {
        setCurrentLessonIndex((prev) => prev - 1);
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Module Header / Progress Bar */}
      <header className="sticky top-0 z-50 glass-card border-b border-primary/20 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-gray-400">
              ✕
            </Link>
            <div>
              <h1 className="text-sm font-bold text-gray-100">{module.title}</h1>
              <p className="text-xs text-gray-500">
                שיעור {currentLessonIndex + 1} מתוך {module.lessons.length}: {currentLesson.title}
              </p>
            </div>
          </div>
          <div className="w-1/3 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${((currentLessonIndex + 1) / module.lessons.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ModuleLesson
          lesson={currentLesson}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={isFirst}
          isLast={isLast}
        />
      </div>
    </div>
  );
}
