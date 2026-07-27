import type { Gender, Goal } from './calculations';

export interface MealPlan {
  mealName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tip: string;
  ingredients: string[];
}

export interface MealInput {
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  goal: Goal;
  ingredients: string[];
}

interface MealTemplate {
  base: string;
  proteinPerKcal: number;
  carbPerKcal: number;
  fatPerKcal: number;
  tip: string;
}

const TEMPLATES: Record<string, MealTemplate> = {
  chicken: {
    base: 'Grilled Chicken Power Bowl',
    proteinPerKcal: 0.18,
    carbPerKcal: 0.08,
    fatPerKcal: 0.03,
    tip: 'Grill instead of fry and pair with colourful veggies for antioxidants.',
  },
  egg: {
    base: 'Veggie Protein Scramble',
    proteinPerKcal: 0.1,
    carbPerKcal: 0.1,
    fatPerKcal: 0.07,
    tip: 'Add spinach and tomato to boost fibre and micronutrients.',
  },
  fish: {
    base: 'Baked Fish Delight',
    proteinPerKcal: 0.16,
    carbPerKcal: 0.07,
    fatPerKcal: 0.04,
    tip: 'Fish gives you omega-3s — bake with lemon and herbs instead of breading.',
  },
  rice: {
    base: 'Wholesome Rice & Veg Bowl',
    proteinPerKcal: 0.06,
    carbPerKcal: 0.16,
    fatPerKcal: 0.03,
    tip: 'Use brown or parboiled rice for steadier energy and more fibre.',
  },
  oats: {
    base: 'Energy Oat Bowl',
    proteinPerKcal: 0.07,
    carbPerKcal: 0.15,
    fatPerKcal: 0.05,
    tip: 'Top with fruit and seeds — slow-release carbs keep you full longer.',
  },
  lentil: {
    base: 'Hearty Lentil Stew',
    proteinPerKcal: 0.09,
    carbPerKcal: 0.14,
    fatPerKcal: 0.02,
    tip: 'Lentils are rich in plant protein and iron — soak them to improve digestion.',
  },
  tofu: {
    base: 'Tofu & Veggie Stir-Fry',
    proteinPerKcal: 0.1,
    carbPerKcal: 0.08,
    fatPerKcal: 0.06,
    tip: 'Use minimal oil and load up on crunchy vegetables for volume.',
  },
  default: {
    base: 'Balanced Veggie Plate',
    proteinPerKcal: 0.08,
    carbPerKcal: 0.12,
    fatPerKcal: 0.04,
    tip: 'Fill half your plate with vegetables for satiety and micronutrients.',
  },
};

function pickTemplate(ingredients: string[]): MealTemplate {
  const list = ingredients.map((i) => i.toLowerCase());
  for (const key of Object.keys(TEMPLATES)) {
    if (key === 'default') continue;
    if (list.some((i) => i.includes(key))) return TEMPLATES[key];
  }
  return TEMPLATES.default;
}

function targetCalories(input: MealInput): number {
  // Mifflin-St Jeor
  const base =
    10 * input.weightKg +
    6.25 * input.heightCm -
    5 * input.age +
    (input.gender === 'male' ? 5 : -161);
  const tdee = base * 1.4; // light-moderate default
  if (input.goal === 'lose') return Math.round(tdee * 0.8);
  if (input.goal === 'gain') return Math.round(tdee * 1.15);
  return Math.round(tdee);
}

export function generateMealPlan(input: MealInput): MealPlan {
  const calories = targetCalories(input);
  const tpl = pickTemplate(input.ingredients);

  const protein = Math.round(calories * tpl.proteinPerKcal);
  const carbs = Math.round(calories * tpl.carbPerKcal);
  const fat = Math.round(calories * tpl.fatPerKcal);

  const goalLabel =
    input.goal === 'lose'
      ? 'Light'
      : input.goal === 'gain'
      ? 'Energy'
      : 'Balanced';

  const mealName = `${goalLabel} ${tpl.base}`;

  return {
    mealName,
    calories,
    protein,
    carbs,
    fat,
    tip: tpl.tip,
    ingredients: input.ingredients,
  };
}
