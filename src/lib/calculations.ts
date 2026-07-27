export type Gender = 'male' | 'female';

export type Goal = 'lose' | 'maintain' | 'gain';

export interface BmiResult {
  bmi: number;
  category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
  color: string;
  tip: string;
}

export function calculateBmi(weightKg: number, heightCm: number): BmiResult {
  const heightM = heightCm / 100;
  const bmi = +(weightKg / (heightM * heightM)).toFixed(1);

  let category: BmiResult['category'];
  let color: string;
  let tip: string;

  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'text-amber-600';
    tip = 'Focus on nutrient-dense meals with healthy fats and proteins to reach a balanced weight.';
  } else if (bmi < 25) {
    category = 'Normal';
    color = 'text-brand-600';
    tip = 'Great range! Keep a balanced diet and stay active to maintain it.';
  } else if (bmi < 30) {
    category = 'Overweight';
    color = 'text-orange-600';
    tip = 'Aim for portion control, more fibre and regular movement to trend toward the normal range.';
  } else {
    category = 'Obese';
    color = 'text-red-600';
    tip = 'Consider a calorie deficit, higher protein intake and daily activity. Consult a professional for a tailored plan.';
  }

  return { bmi, category, color, tip };
}

export interface BmrResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
}

const ACTIVITY_FACTOR: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active';

export function calculateBmr(
  age: number,
  gender: Gender,
  weightKg: number,
  heightCm: number,
  activity: ActivityLevel,
  goal: Goal
): BmrResult {
  // Mifflin-St Jeor Equation
  const base =
    10 * weightKg + 6.25 * heightCm - 5 * age + (gender === 'male' ? 5 : -161);
  const bmr = Math.round(base);
  const tdee = Math.round(bmr * ACTIVITY_FACTOR[activity]);

  let targetCalories = tdee;
  if (goal === 'lose') targetCalories = Math.round(tdee * 0.8);
  if (goal === 'gain') targetCalories = Math.round(tdee * 1.15);

  return { bmr, tdee, targetCalories };
}

export interface WaterResult {
  liters: number;
  glasses: number;
  tip: string;
}

export function calculateWater(weightKg: number, activity: ActivityLevel): WaterResult {
  // ~35 ml per kg baseline + activity bonus
  const baselineMl = weightKg * 35;
  const bonusMl =
    activity === 'sedentary'
      ? 0
      : activity === 'light'
      ? 250
      : activity === 'moderate'
      ? 500
      : 750;
  const liters = +((baselineMl + bonusMl) / 1000).toFixed(1);
  const glasses = Math.round((liters * 1000) / 250);
  return {
    liters,
    glasses,
    tip: 'Spread intake through the day. A glass before meals helps with portion control and digestion.',
  };
}
