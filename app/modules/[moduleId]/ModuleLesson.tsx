'use client';

import { Lesson } from '@/lib/types';
import { motion } from 'framer-motion';

interface Props {
    lesson: Lesson;
    onNext?: () => void;
    onPrev?: () => void;
    isFirst: boolean;
    isLast: boolean;
}

export default function ModuleLesson({ lesson, onNext, onPrev, isFirst, isLast }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            {/* Lesson Header */}
            <div className="border-b border-white/10 pb-6">
                <h2 className="text-3xl font-display font-bold text-gray-100 mb-2">{lesson.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>⏱️ {lesson.estimatedTime} דקות קריאה</span>
                </div>
            </div>

            {/* Content: HTML Page (iframe) or Structured Sections */}
            {lesson.htmlPage ? (
                <div className="w-full rounded-xl overflow-hidden border border-white/10">
                    <iframe
                        src={lesson.htmlPage}
                        className="w-full border-0"
                        style={{ minHeight: '80vh' }}
                        title={lesson.title}
                    />
                </div>
            ) : (
                <>
                    {/* Content Sections */}
                    <div className="space-y-8">
                        {lesson.content.sections.map((section, idx) => (
                            <section key={idx} className="glass-card p-6 bg-white/5 border-l-4 border-l-primary/50">
                                <h3 className="text-xl font-bold text-primary mb-4">{section.heading}</h3>
                                <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                                    {section.paragraphs.map((p, pIdx) => (
                                        <p key={pIdx}>{p}</p>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Key Takeaways */}
                    {lesson.content.keyTakeaways && (
                        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="text-2xl">💡</span> נקודות מפתח
                            </h3>
                            <ul className="space-y-2">
                                {lesson.content.keyTakeaways.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-200">
                                        <span className="text-primary mt-1">•</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-8 border-t border-white/10">
                <button
                    onClick={onPrev}
                    disabled={isFirst}
                    className={`
            px-6 py-3 rounded-lg flex items-center gap-2 transition-all
            ${isFirst
                            ? 'opacity-50 cursor-not-allowed text-gray-500'
                            : 'hover:bg-white/10 text-gray-300 hover:text-white'}
          `}
                >
                    <span className="text-lg">→</span> הקודם
                </button>

                <button
                    onClick={onNext}
                    className="bg-primary hover:bg-cyan-400 text-background-dark font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
                >
                    {isLast ? 'סיום מודול' : 'השיעור הבא'} <span className="text-lg">←</span>
                </button>
            </div>
        </motion.div>
    );
}
