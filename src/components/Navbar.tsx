import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, BRAND, type PageId } from '@/lib/nav';

interface NavbarProps {
  current: PageId;
  onNavigate: (id: PageId) => void;
}

export default function Navbar({ current, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: PageId) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur shadow-sm' : 'bg-white/60 backdrop-blur-sm'
      } border-b border-brand-100`}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2 font-extrabold text-brand-700 text-lg"
        >
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-brand-600 text-white shadow-soft">
            <BRAND.icon className="w-5 h-5" />
          </span>
          {BRAND.name}
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = current === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition
                    ${active ? 'bg-brand-600 text-white shadow-soft' : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700'}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid place-items-center w-10 h-10 rounded-xl text-brand-700 hover:bg-brand-50"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="px-4 pb-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = current === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                    ${active ? 'bg-brand-600 text-white' : 'text-slate-700 hover:bg-brand-50'}`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
