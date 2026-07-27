interface StatRingProps {
  value: string;
  label: string;
  sublabel?: string;
  color?: string;
}

export default function StatRing({ value, label, sublabel, color = 'text-brand-600' }: StatRingProps) {
  return (
    <div className="text-center animate-pop">
      <div className="mx-auto grid place-items-center w-28 h-28 rounded-full bg-brand-50 border-4 border-brand-100">
        <div>
          <div className={`text-2xl font-extrabold ${color}`}>{value}</div>
          {sublabel && <div className="text-[10px] uppercase tracking-wide text-slate-400">{sublabel}</div>}
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}
