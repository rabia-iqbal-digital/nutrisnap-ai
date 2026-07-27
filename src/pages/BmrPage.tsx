import { useState } from 'react';
import { HeartPulse, Info, Flame } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StatRing from '@/components/StatRing';
import { calculateBmr, type ActivityLevel, type Gender, type Goal } from '@/lib/calculations';

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
  { value: 'light', label: 'Light', desc: '1–3 times/week' },
  { value: 'moderate', label: 'Moderate', desc: '3–5 times/week' },
  { value: 'active', label: 'Active', desc: '6–7 times/week' },
];

export default function BmrPage() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState<ActivityLevel>('light');
  const [goal, setGoal] = useState<Goal>('maintain');
  const [result, setResult] = useState<ReturnType<typeof calculateBmr> | null>(null);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(age, 10);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!a || !w || !h || a <= 0 || w <= 0 || h <= 0) {
      setError('Please fill in all fields with valid values.');
      setResult(null);
      return;
    }
    setError('');
    setResult(calculateBmr(a, gender, w, h, activity, goal));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 space-y-8">
      <PageHeader
        icon={<HeartPulse className="w-6 h-6" />}
        title="BMR Calculator"
        subtitle="Find out how many calories your body burns at rest and your daily energy needs."
      />

      <form onSubmit={submit} className="card space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Age (years)</label>
            <input type="number" className="input" placeholder="e.g. 28" value={age} onChange={(e) => setAge(e.target.value)} inputMode="numeric" />
          </div>
          <div>
            <label className="label">Gender</label>
            <div className="grid grid-cols-2 gap-2">
              {(['male', 'female'] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium capitalize transition border
                    ${gender === g ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Weight (kg)</label>
            <input type="number" className="input" placeholder="e.g. 68" value={weight} onChange={(e) => setWeight(e.target.value)} inputMode="decimal" />
          </div>
          <div>
            <label className="label">Height (cm)</label>
            <input type="number" className="input" placeholder="e.g. 170" value={height} onChange={(e) => setHeight(e.target.value)} inputMode="decimal" />
          </div>
        </div>

        <div>
          <label className="label">Activity level</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ACTIVITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setActivity(opt.value)}
                className={`rounded-xl p-3 text-left transition border
                  ${activity === opt.value ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-400' : 'bg-white border-slate-200 hover:border-brand-300'}`}
              >
                <div className="text-sm font-semibold text-slate-700">{opt.label}</div>
                <div className="text-[11px] text-slate-400">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Goal</label>
          <div className="grid grid-cols-3 gap-2">
            {([
              ['lose', 'Lose'],
              ['maintain', 'Maintain'],
              ['gain', 'Gain'],
            ] as [Goal, string][]).map(([g, label]) => (
              <button
                key={g}
                type="button"
                onClick={() => setGoal(g)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition border
                  ${goal === g ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-primary w-full sm:w-auto">
          <Flame className="w-5 h-5" /> Calculate BMR
        </button>
      </form>

      {result && (
        <div className="card animate-fade-up">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
            <StatRing value={result.bmr.toString()} label="BMR (rest)" sublabel="kcal/day" />
            <StatRing value={result.tdee.toString()} label="TDEE (active)" sublabel="kcal/day" color="text-amber-600" />
            <StatRing value={result.targetCalories.toString()} label="Your target" sublabel="kcal/day" color="text-brand-600" />
          </div>
          <div className="mt-6 flex items-start gap-2 text-sm text-slate-600">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-brand-600" />
            <span>
              Your BMR is what you'd burn lying still all day. TDEE adds your activity. The target adjusts calories for your
              goal — pair it with the meal planner for balanced macros.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
