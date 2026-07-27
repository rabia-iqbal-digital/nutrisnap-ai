import { Calculator, HeartPulse, Droplets, Sparkles, ArrowRight, Leaf, Apple, Activity } from 'lucide-react';
import { NAV_ITEMS, type PageId } from '@/lib/nav';

interface HomeProps {
  onNavigate: (id: PageId) => void;
}

const FEATURES: { id: PageId; icon: typeof Calculator; title: string; desc: string }[] = [
  { id: 'bmi', icon: Calculator, title: 'BMI Calculator', desc: 'Check your body mass index and see which healthy range you fall into.' },
  { id: 'bmr', icon: HeartPulse, title: 'BMR Calculator', desc: 'Find out how many calories your body burns at rest and across activity levels.' },
  { id: 'water', icon: Droplets, title: 'Water Intake', desc: 'Get a personalised daily hydration target based on your weight and activity.' },
  { id: 'planner', icon: Sparkles, title: 'AI Meal Planner', desc: 'Enter your ingredients and goal — get a balanced meal with macros and a healthy tip.' },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-brand-100" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-200/40 blur-3xl -z-10" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-brand-300/30 blur-3xl -z-10" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="chip mb-4">
              <Leaf className="w-3.5 h-3.5" /> Powered by smart nutrition logic
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-800">
              Eat smarter with <span className="text-brand-600">NutriSnap AI</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-md">
              Personalised healthy meal recommendations, calorie insights and hydration targets — all in one
              clean, friendly place.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('planner')} className="btn-primary">
                <Sparkles className="w-5 h-5" /> Plan my meal
              </button>
              <button onClick={() => onNavigate('bmi')} className="btn-ghost">
                Try BMI calculator <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Apple className="w-4 h-4 text-brand-600" /> Balanced macros</div>
              <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-brand-600" /> Goal-aware</div>
            </div>
          </div>

          <div className="relative">
            <div className="card rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-100 text-brand-700">
                  <Sparkles className="w-6 h-6" />
                </span>
                <div>
                  <p className="font-semibold text-slate-800">Today's suggestion</p>
                  <p className="text-xs text-slate-400">Balanced · ~520 kcal</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-brand-50 p-3">
                  <div className="text-lg font-bold text-brand-700">38g</div>
                  <div className="text-[10px] uppercase text-slate-400">Protein</div>
                </div>
                <div className="rounded-xl bg-amber-50 p-3">
                  <div className="text-lg font-bold text-amber-600">52g</div>
                  <div className="text-[10px] uppercase text-slate-400">Carbs</div>
                </div>
                <div className="rounded-xl bg-rose-50 p-3">
                  <div className="text-lg font-bold text-rose-500">14g</div>
                  <div className="text-[10px] uppercase text-slate-400">Fat</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Grilled Chicken Power Bowl — load up on colourful veggies for antioxidants.
              </p>
            </div>
            <div className="absolute -bottom-5 -left-5 card !p-3 flex items-center gap-2 text-xs font-medium text-brand-700 shadow-soft">
              <Droplets className="w-4 h-4" /> 2.5L water today
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Everything you need to eat well</h2>
          <p className="mt-2 text-slate-500">Four simple tools that work together to keep you on track.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <button
              key={f.id}
              onClick={() => onNavigate(f.id)}
              className="card text-left group hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <f.icon className="w-6 h-6" />
              </span>
              <h3 className="mt-4 font-bold text-slate-800">{f.title}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{f.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                Open <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="card bg-gradient-to-br from-brand-600 to-brand-700 text-white border-0">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', t: 'Know your numbers', d: 'Use the BMI, BMR and water calculators to understand your body.' },
              { n: '02', t: 'Set your goal', d: 'Choose to lose, maintain or gain — we adjust calories automatically.' },
              { n: '03', t: 'Get your meal', d: 'Enter your ingredients and receive a balanced plan with a healthy tip.' },
            ].map((s) => (
              <div key={s.n}>
                <div className="text-brand-200 font-extrabold text-3xl">{s.n}</div>
                <h3 className="mt-1 font-bold text-lg">{s.t}</h3>
                <p className="mt-1 text-brand-100 text-sm">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button onClick={() => onNavigate('planner')} className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-700 px-5 py-3 font-semibold hover:bg-brand-50 transition">
              <Sparkles className="w-5 h-5" /> Start planning
            </button>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {NAV_ITEMS.map((n) => (
            <button key={n.id} onClick={() => onNavigate(n.id)} className="chip hover:bg-brand-200 transition">
              <n.icon className="w-3.5 h-3.5" /> {n.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
