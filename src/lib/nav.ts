import { Home, Calculator, HeartPulse, Droplets, Sparkles, Leaf } from 'lucide-react';

export type PageId = 'home' | 'bmi' | 'bmr' | 'water' | 'planner';

export const NAV_ITEMS: { id: PageId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'bmi', label: 'BMI', icon: Calculator },
  { id: 'bmr', label: 'BMR', icon: HeartPulse },
  { id: 'water', label: 'Water', icon: Droplets },
  { id: 'planner', label: 'Meal Planner', icon: Sparkles },
];

export const BRAND = {
  name: 'NutriSnap AI',
  tagline: 'Smart nutrition, personalised for you.',
  icon: Leaf,
};
