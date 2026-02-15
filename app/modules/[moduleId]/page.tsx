import { modules } from '@/lib/content/modules';
import ModulePageClient from './ModulePageClient';

export function generateStaticParams() {
  return modules.map((m) => ({ moduleId: m.id }));
}

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  return <ModulePageClient moduleId={params.moduleId} />;
}
