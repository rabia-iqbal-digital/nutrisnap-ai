import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import BmiPage from '@/pages/BmiPage';
import BmrPage from '@/pages/BmrPage';
import WaterPage from '@/pages/WaterPage';
import PlannerPage from '@/pages/PlannerPage';
import type { PageId } from '@/lib/nav';

function App() {
  const [page, setPage] = useState<PageId>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar current={page} onNavigate={setPage} />
      <main className="flex-1">
        {page === 'home' && <Home onNavigate={setPage} />}
        {page === 'bmi' && <BmiPage />}
        {page === 'bmr' && <BmrPage />}
        {page === 'water' && <WaterPage />}
        {page === 'planner' && <PlannerPage />}
      </main>
      <Footer onNavigate={setPage} />
    </div>
  );
}

export default App;
