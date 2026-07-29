# NutriSnap AI

A mobile-friendly AI web application that helps users get personalised healthy meal recommendations. Built with React, TypeScript, Vite and Tailwind CSS in a clean green-and-white healthcare aesthetic.

## Problem it solves

Many people struggle with understanding their daily nutrition needs, calorie requirements, hydration goals, and meal planning. NutriSnap AI helps users make better nutrition decisions through simple calculators and AI-powered personalised meal recommendations.
## Features

- **Home page** — hero, feature overview and a clear path through the app.
- **BMI Calculator** — body mass index with category, tip and a visual scale.
- **BMR Calculator** — Mifflin-St Jeor equation, TDEE across activity levels, and a goal-adjusted calorie target.
- **Water Intake Calculator** — daily hydration target in litres and glasses, with a visual glass counter.
- **AI Meal Planner** — enter age, gender, height, weight, goal and available ingredients; get a meal name, calories, protein, carbs, fat and a healthy tip.
- **Responsive** — works from small phones up to large desktops.
- **Accessible & fast** — single-page React application with AI API integration for personalised meal generation.

## 🤖 AI Feature

NutriSnap AI includes an AI-powered Meal Planner integrated with a Large Language Model (LLM).

The AI Meal Planner generates personalised nutrition recommendations based on:
- User age
- Gender
- Height
- Weight
- Fitness goal
- Available ingredients

AI Workflow:
User health profile + ingredients
→ AI prompt generation
→ LLM processing
→ Structured meal plan output

The generated response includes:
- Meal recommendation
- Estimated calories
- Protein
- Carbohydrates
- Fat
- Healthy nutrition tips

The system uses evidence-based nutrition principles to provide practical and personalised meal guidance.
## AI Nutrition Guidelines

The AI nutrition engine follows evidence-based nutrition principles to suggest balanced meals with estimated calories, protein, carbohydrates, fats, and healthy recommendations.

The system is designed to provide practical meal guidance while keeping recommendations personalised and user-friendly.

## Project structure

```
src/
  components/   reusable UI (Navbar, Footer, PageHeader, StatRing)
  lib/
    calculations
    AI meal generation
    nav config
    LLM integration
  pages/         Home, BmiPage, BmrPage, WaterPage, PlannerPage
  App.tsx        page router
  main.tsx       entry point
  index.css      Tailwind + theme
```


## Tech stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- lucide-react icons
- Groq API
- Llama 3.1 8B Instant
- groq-sdk

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
## Environment Setup

Create a `.env` file:

VITE_GROQ_API_KEY=your_api_key_here

The API key is required for AI Meal Planner functionality.

Never expose API keys publicly. Store API keys securely using environment variables.

## Deployment
The application runs as a React single-page application and uses an LLM API integration for AI-powered meal generation.

### Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Vercel auto-detects Vite — set (or leave defaults):
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy.
## 🌐 Live Application

🔗 **Live URL:** https://nutrisnap-ai-liard.vercel.app/

Anyone can access and use the NutriSnap AI application through this link.

### GitHub Pages / any static host

Run `npm run build` and serve the `dist/` folder with any static host.

## Disclaimer

NutriSnap AI is for educational purposes only and is not a substitute for professional medical or nutritional advice.

## License

MIT
