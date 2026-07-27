import { useState } from 'react';
import { Sparkles, Plus, X, Utensils, Lightbulb, Loader2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { generateMealPlan, type MealPlan } from '@/lib/mealEngine';
import type { Gender, Goal } from '@/lib/calculations';

const SUGGESTED = ['chicken', 'egg', 'fish', 'rice', 'oats', 'lentil', 'tofu', 'tomato', 'spinach', 'broccoli'];

export default function PlannerPage() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState<Goal>('maintain');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addIngredient = () => {
    const v = ingredient.trim().toLowerCase();
    if (!v) return;
    if (ingredients.includes(v)) {
      setIngredient('');
      return;
    }
    setIngredients((prev) => [...prev, v]);
    setIngredient('');
  };

  const removeIngredient = (i: string) => setIngredients((prev) => prev.filter((x) => x !== i));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(age, 10);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!a || !w || !h || a <= 0 || w <= 0 || h <= 0) {
      setError('Please fill in age, height and weight with valid values.');
      setPlan(null);
      return;
    }
    if (ingredients.length === 0) {
      setError('Add at least one ingredient you have available.');
      setPlan(null);
      return;
    }
    setError('');
    setLoading(true);
    setPlan(null);
    // Simulate AI thinking for nicer UX
    setTimeout(() => {
      setPlan(
        generateMealPlan({
          age: a,
          gender,
          heightCm: h,
          weightKg: w,
          goal,
          ingredients,
        })
      );
      setLoading(false);
    }, 700);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 space-y-8">
      <PageHeader
        icon={<Sparkles className="w-6 h-6" />}
        title="AI Meal Planner"
        subtitle="Tell us about yourself and what's in your kitchen — we'll build a balanced meal with macros and a healthy tip."
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
            <label className="label">Height (cm)</label>
            <input type="number" className="input" placeholder="e.g. 170" value={height} onChange={(e) => setHeight(e.target.value)} inputMode="decimal" />
          </div>
          <div>
            <label className="label">Weight (kg)</label>
            <input type="number" className="input" placeholder="e.g. 68" value={weight} onChange={(e) => setWeight(e.target.value)} inputMode="decimal" />
          </div>
        </div>

        <div>
          <label className="label">Goal</label>
          <div className="grid grid-cols-3 gap-2">
            {([
              ['lose', 'Lose weight'],
              ['maintain', 'Maintain'],
              ['gain', 'Gain weight'],
            ] as [Goal, string][]).map(([g, label]) => (
              <button
                key={g}
                type="button"
                onClick={() => setGoal(g)}
                className={`rounded-xl px-3 py-3 text-sm font-medium transition border
                  ${goal === g ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Available ingredients</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="input"
              placeholder="e.g. chicken, rice…"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addIngredient();
                }
              }}
            />
            <button type="button" onClick={addIngredient} className="btn-primary !px-4">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {ingredients.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {ingredients.map((i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 text-brand-700 px-3 py-1.5 text-sm">
                  {i}
                  <button type="button" onClick={() => removeIngredient(i)} className="text-brand-500 hover:text-brand-800">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {SUGGESTED.filter((s) => !ingredients.includes(s)).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setIngredients((prev) => [...prev, s])}
                className="rounded-full bg-slate-100 hover:bg-brand-100 hover:text-brand-700 text-slate-500 px-2.5 py-1 text-xs transition"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={loading}>
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Building your meal…</> : <><Sparkles className="w-5 h-5" /> Generate meal plan</>}
        </button>
      </form>

      {plan && (
        <div className="card animate-fade-up">
          <div className="flex items-start gap-3">
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 shrink-0">
              <Utensils className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-xl font-extrabold text-slate-800">{plan.mealName}</h3>
              <p className="text-sm text-slate-500">Using: {plan.ingredients.join(', ')}</p>
            </div>
            <span className="ml-auto chip">{plan.calories} kcal</span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-brand-50 p-4">
              <div className="text-2xl font-extrabold text-brand-700">{plan.protein}g</div>
              <div className="text-xs uppercase tracking-wide text-slate-400 mt-0.5">Protein</div>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4">
              <div className="text-2xl font-extrabold text-amber-600">{plan.carbs}g</div>
              <div className="text-xs uppercase tracking-wide text-slate-400 mt-0.5">Carbs</div>
            </div>
            <div className="rounded-2xl bg-rose-50 p-4">
              <div className="text-2xl font-extrabold text-rose-500">{plan.fat}g</div>
              <div className="text-xs uppercase tracking-wide text-slate-400 mt-0.5">Fat</div>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-xl bg-brand-50 border border-brand-100 p-4">
            <Lightbulb className="w-5 h-5 mt-0.5 shrink-0 text-brand-600" />
            <p className="text-sm text-slate-700">{plan.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}
