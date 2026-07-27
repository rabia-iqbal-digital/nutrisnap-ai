import { useState } from 'react';
import { Droplets, Info } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StatRing from '@/components/StatRing';
import { calculateWater, type ActivityLevel, type WaterResult } from '@/lib/calculations';

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string }[] = [
  { value: 'sedentary', label: 'Sedentary' },
  { value: 'light', label: 'Light' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'active', label: 'Active' },
];

export default function WaterPage() {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState<ActivityLevel>('light');
  const [result, setResult] = useState<WaterResult | null>(null);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    if (!w || w <= 0) {
      setError('Please enter a valid weight.');
      setResult(null);
      return;
    }
    setError('');
    setResult(calculateWater(w, activity));
  };

  // Visual glass count
  const glasses = result ? result.glasses : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 space-y-8">
      <PageHeader
        icon={<Droplets className="w-6 h-6" />}
        title="Water Intake Calculator"
        subtitle="Stay hydrated — get a daily water target tailored to your weight and activity."
      />

      <form onSubmit={submit} className="card space-y-5">
        <div>
          <label className="label">Weight (kg)</label>
          <input type="number" className="input" placeholder="e.g. 68" value={weight} onChange={(e) => setWeight(e.target.value)} inputMode="decimal" />
        </div>
        <div>
          <label className="label">Activity level</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ACTIVITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setActivity(opt.value)}
                className={`rounded-xl px-3 py-3 text-sm font-medium transition border
                  ${activity === opt.value ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-primary w-full sm:w-auto">
          <Droplets className="w-5 h-5" /> Calculate intake
        </button>
      </form>

      {result && (
        <div className="card animate-fade-up">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
            <StatRing value={`${result.liters}L`} label="Daily target" sublabel="litres" color="text-sky-500" />
            <div className="text-center sm:text-left">
              <p className="text-sm text-slate-400 uppercase tracking-wide">Glasses (250ml)</p>
              <p className="text-2xl font-extrabold text-sky-500">{result.glasses}</p>
              <div className="mt-4 flex items-start gap-2 text-sm text-slate-600 max-w-sm">
                <Info className="w-4 h-4 mt-0.5 shrink-0 text-brand-600" />
                <span>{result.tip}</span>
              </div>
            </div>
          </div>

          {/* Glass visualization */}
          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: Math.min(glasses, 16) }).map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-9 rounded-b-md rounded-t-sm border-2 border-sky-200 bg-gradient-to-b from-sky-200 to-sky-400 animate-pop"
                  style={{ animationDelay: `${i * 40}ms` }}
                  title={`Glass ${i + 1}`}
                />
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-slate-400">Each glass = 250 ml</p>
          </div>
        </div>
      )}
    </div>
  );
}
