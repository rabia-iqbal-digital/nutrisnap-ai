import { Leaf, Github } from 'lucide-react';
import { NAV_ITEMS, BRAND, type PageId } from '@/lib/nav';

interface FooterProps {
  onNavigate: (id: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-brand-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-brand-700">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-brand-600 text-white">
              <Leaf className="w-5 h-5" />
            </span>
            {BRAND.name}
          </div>
          <p className="mt-3 text-sm text-slate-500 max-w-xs">{BRAND.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Explore</h4>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className="text-sm text-slate-500 hover:text-brand-700 transition"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Project</h4>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-700 transition"
          >
            <Github className="w-4 h-4" /> View on GitHub
          </a>
          <p className="mt-3 text-xs text-slate-400">
            For educational purposes. Not a substitute for professional medical advice.
          </p>
        </div>
      </div>
      <div className="border-t border-brand-100 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {BRAND.name}. Built with care.
      </div>
    </footer>
  );
}
