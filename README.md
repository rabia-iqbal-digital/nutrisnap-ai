# NutriSnap AI

A mobile-friendly AI web application that helps users get personalised healthy meal recommendations. Built with React, TypeScript, Vite and Tailwind CSS in a clean green-and-white healthcare aesthetic.

## Features

- **Home page** — hero, feature overview and a clear path through the app.
- **BMI Calculator** — body mass index with category, tip and a visual scale.
- **BMR Calculator** — Mifflin-St Jeor equation, TDEE across activity levels, and a goal-adjusted calorie target.
- **Water Intake Calculator** — daily hydration target in litres and glasses, with a visual glass counter.
- **AI Meal Planner** — enter age, gender, height, weight, goal and available ingredients; get a meal name, calories, protein, carbs, fat and a healthy tip.
- **Responsive** — works from small phones up to large desktops.
- **Accessible & fast** — single-page app, no backend required to run.

## Tech stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- lucide-react icons

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

The app runs entirely in the browser. The meal planner uses a built-in nutrition engine (Mifflin-St Jeor + ingredient-aware templates) so it works offline and without any API keys.

## Project structure

```
src/
  components/   reusable UI (Navbar, Footer, PageHeader, StatRing)
  lib/           calculations, meal engine, nav config
  pages/         Home, BmiPage, BmrPage, WaterPage, PlannerPage
  App.tsx        page router
  main.tsx       entry point
  index.css      Tailwind + theme
```

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Vercel auto-detects Vite — set (or leave defaults):
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy.

### GitHub Pages / any static host

Run `npm run build` and serve the `dist/` folder with any static host.

## Disclaimer

NutriSnap AI is for educational purposes only and is not a substitute for professional medical or nutritional advice.

## License

MIT
