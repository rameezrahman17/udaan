import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  X,
  FileQuestion,
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 md:hidden bg-slate-900/50 backdrop-blur-sm flex"
      role="dialog"
      aria-modal="true"
      aria-label="ਮੋਬਾਈਲ ਨੇਵੀਗੇਸ਼ਨ ਮੀਨੂ"
      onClick={onClose}
    >
      <div
        className="w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col p-4 animate-in slide-in-from-left duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">
              ਉ
            </div>
            <span className="font-bold text-slate-800">ਪ੍ਰੋਜੈਕਟ ਉਡਾਨ</span>
          </div>
          <button
            onClick={onClose}
            aria-label="ਮੀਨੂ ਬੰਦ ਕਰੋ"
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav aria-label="ਮੋਬਾਈਲ ਨੇਵੀਗੇਸ਼ਨ" className="flex-1 py-4 space-y-1">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-50 text-brand-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            <Home className="w-5 h-5 text-brand-600" />
            <div>
              <p className="leading-tight">ਮੁੱਖ ਪੰਨਾ</p>
              <span className="text-[11px] text-slate-400 font-normal">Home</span>
            </div>
          </NavLink>

          <NavLink
            to="/lessons"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-50 text-brand-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            <BookOpen className="w-5 h-5 text-brand-600" />
            <div>
              <p className="leading-tight">ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ</p>
              <span className="text-[11px] text-slate-400 font-normal">Lessons</span>
            </div>
          </NavLink>

          <NavLink
            to="/quizzes"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-50 text-brand-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            <FileQuestion className="w-5 h-5 text-brand-600" />
            <div>
              <p className="leading-tight">ਕੁਇਜ਼ ਅਭਿਆਸ</p>
              <span className="text-[11px] text-slate-400 font-normal">Quizzes</span>
            </div>
          </NavLink>

          <NavLink
            to="/progress"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-50 text-brand-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            <Award className="w-5 h-5 text-brand-600" />
            <div>
              <p className="leading-tight">ਮੇਰੀ ਤਰੱਕੀ</p>
              <span className="text-[11px] text-slate-400 font-normal">My Progress</span>
            </div>
          </NavLink>

          <div className="pt-2 my-2 border-t border-slate-100" />

          <NavLink
            to="/teacher"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-50 text-brand-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            <Users className="w-5 h-5 text-slate-600" />
            <div>
              <p className="leading-tight">ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ</p>
              <span className="text-[11px] text-slate-400 font-normal">Teacher Dashboard</span>
            </div>
          </NavLink>

          <NavLink
            to="/admin"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-50 text-brand-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            <ShieldCheck className="w-5 h-5 text-slate-600" />
            <div>
              <p className="leading-tight">ਪ੍ਰਬੰਧਕੀ ਪੋਰਟਲ</p>
              <span className="text-[11px] text-slate-400 font-normal">Administration</span>
            </div>
          </NavLink>
        </nav>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center">
          ਪੇਂਡੂ ਨਾਭਾ ਡਿਜੀਟਲ ਲਰਨਿੰਗ ਮਿਸ਼ਨ
        </div>
      </div>
    </div>
  );
};
