import { useState } from 'react';
import { Calculator, Info } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StatRing from '@/components/StatRing';
import { calculateBmi, type BmiResult } from '@/lib/calculations';

export default function BmiPage() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0) {
      setError('Please enter valid weight and height.');
      setResult(null);
      return;
    }
    setError('');
    setResult(calculateBmi(w, h));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 space-y-8">
      <PageHeader
        icon={<Calculator className="w-6 h-6" />}
        title="BMI Calculator"
        subtitle="Body Mass Index shows whether your weight is in a healthy range for your height."
      />

      <form onSubmit={submit} className="card space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Weight (kg)</label>
            <input
              type="number"
              className="input"
              placeholder="e.g. 68"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              inputMode="decimal"
            />
          </div>
          <div>
            <label className="label">Height (cm)</label>
            <input
              type="number"
              className="input"
              placeholder="e.g. 170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              inputMode="decimal"
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-primary w-full sm:w-auto">
          <Calculator className="w-5 h-5" /> Calculate BMI
        </button>
      </form>

      {result && (
        <div className="card animate-fade-up">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
            <StatRing value={result.bmi.toString()} label="Your BMI" sublabel="kg/m²" color={result.color} />
            <div className="text-center sm:text-left">
              <p className="text-sm text-slate-400 uppercase tracking-wide">Category</p>
              <p className={`text-2xl font-extrabold ${result.color}`}>{result.category}</p>
              <div className="mt-4 flex items-start gap-2 text-sm text-slate-600 max-w-sm">
                <Info className="w-4 h-4 mt-0.5 shrink-0 text-brand-600" />
                <span>{result.tip}</span>
              </div>
            </div>
          </div>

          {/* Scale */}
          <div className="mt-8">
            <div className="flex h-3 rounded-full overflow-hidden text-[10px]">
              <div className="flex-1 bg-amber-300" title="Underweight" />
              <div className="flex-1 bg-brand-400" title="Normal" />
              <div className="flex-1 bg-orange-400" title="Overweight" />
              <div className="flex-1 bg-red-400" title="Obese" />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-slate-400">
              <span>&lt;18.5</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
