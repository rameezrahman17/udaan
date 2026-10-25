import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Award, Users } from 'lucide-react';

export const BottomNav: React.FC = () => {
  return (
    <nav
      aria-label="ਮੋਬਾਈਲ ਹੇਠਲਾ ਨੇਵੀਗੇਸ਼ਨ • Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 flex items-center justify-around px-2"
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg ${
            isActive ? 'text-brand-700 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`
        }
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>ਮੁੱਖ ਪੰਨਾ</span>
      </NavLink>

      <NavLink
        to="/lessons"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg ${
            isActive ? 'text-brand-700 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`
        }
      >
        <BookOpen className="w-5 h-5 mb-0.5" />
        <span>ਪਾਠ</span>
      </NavLink>

      <NavLink
        to="/progress"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg ${
            isActive ? 'text-brand-700 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`
        }
      >
        <Award className="w-5 h-5 mb-0.5" />
        <span>ਤਰੱਕੀ</span>
      </NavLink>

      <NavLink
        to="/teacher"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg ${
            isActive ? 'text-brand-700 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`
        }
      >
        <Users className="w-5 h-5 mb-0.5" />
        <span>ਅਧਿਆਪਕ</span>
      </NavLink>
    </nav>
  );
};
