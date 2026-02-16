import { Suspense } from 'react';
import { modules } from '@/lib/content/modules';
import ModulePageClient from './ModulePageClient';

export function generateStaticParams() {
  return modules.map((m) => ({ moduleId: m.id }));
}

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-400 text-lg">טוען...</div></div>}>
      <ModulePageClient moduleId={params.moduleId} />
    </Suspense>
  );
}
