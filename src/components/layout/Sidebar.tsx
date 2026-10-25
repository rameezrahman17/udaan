import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  FileQuestion,
  HelpCircle,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside
      aria-label="ਡੈਸਕਟੌਪ ਨੇਵੀਗੇਸ਼ਨ • Sidebar Navigation"
      className="hidden lg:flex w-64 border-r border-slate-200 bg-white flex-col shrink-0 p-4"
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
        ਵਿਦਿਆਰਥੀ ਮੇਨੂ • Student
      </div>
      <nav className="space-y-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isActive
                ? 'bg-brand-50 text-brand-800 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <Home className="w-4 h-4 text-brand-600" />
          <span>ਮੁੱਖ ਪੰਨਾ (Home)</span>
        </NavLink>

        <NavLink
          to="/lessons"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isActive
                ? 'bg-brand-50 text-brand-800 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <BookOpen className="w-4 h-4 text-brand-600" />
          <span>ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ (Lessons)</span>
        </NavLink>

        <NavLink
          to="/quizzes"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isActive
                ? 'bg-brand-50 text-brand-800 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <FileQuestion className="w-4 h-4 text-brand-600" />
          <span>ਕੁਇਜ਼ ਅਭਿਆਸ (Quizzes)</span>
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isActive
                ? 'bg-brand-50 text-brand-800 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <Award className="w-4 h-4 text-brand-600" />
          <span>ਮੇਰੀ ਤਰੱਕੀ (Progress)</span>
        </NavLink>
      </nav>

      <div className="pt-6 my-4 border-t border-slate-100" />

      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
        ਅਧਿਆਪਨ ਅਤੇ ਪ੍ਰਬੰਧਨ • Staff
      </div>
      <nav className="space-y-1">
        <NavLink
          to="/teacher"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isActive
                ? 'bg-brand-50 text-brand-800 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <Users className="w-4 h-4 text-slate-500" />
          <span>ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ</span>
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isActive
                ? 'bg-brand-50 text-brand-800 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <ShieldCheck className="w-4 h-4 text-slate-500" />
          <span>ਪ੍ਰਬੰਧਕੀ ਪੋਰਟਲ</span>
        </NavLink>
      </nav>

      <div className="mt-auto pt-4">
        <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <div className="text-xs text-brand-900">
            <span className="font-semibold block mb-0.5">ਆਫ਼ਲਾਈਨ ਮੋਡ</span>
            ਸਾਰੇ ਡਾਊਨਲੋਡ ਕੀਤੇ ਪਾਠ ਬਿਨਾਂ ਇੰਟਰਨੈੱਟ ਦੇ ਚੱਲਦੇ ਹਨ।
          </div>
        </div>
      </div>
    </aside>
  );
};
