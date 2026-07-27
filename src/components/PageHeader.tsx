import type { ReactNode } from 'react';

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export default function PageHeader({ icon, title, subtitle }: PageHeaderProps) {
  return (
    <div className="flex items-start gap-4 animate-fade-up">
      <div className="shrink-0 grid place-items-center w-12 h-12 rounded-2xl bg-brand-600 text-white shadow-soft">
        {icon}
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">{title}</h1>
        <p className="mt-1 text-slate-500 text-sm sm:text-base">{subtitle}</p>
      </div>
    </div>
  );
}
