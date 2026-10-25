import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  FileQuestion,
  HelpCircle,
  LogIn,
  LogOut,
  User,
} from 'lucide-react';
import { useAuth } from '@/context';
import { Badge } from '@/components/ui';

export const Sidebar: React.FC = () => {
  const { user, profile, role, signOut } = useAuth();

  return (
    <aside
      aria-label="ਡੈਸਕਟੌਪ ਨੇਵੀਗੇਸ਼ਨ • Sidebar Navigation"
      className="hidden lg:flex w-64 border-r border-slate-200 bg-white flex-col shrink-0 p-4"
    >
      {/* User profile widget */}
      <div className="mb-4 pb-4 border-b border-slate-100">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
                {profile?.display_name ? profile.display_name[0].toUpperCase() : 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {profile?.display_name || user.email}
                </p>
                <Badge variant="brand" size="sm" className="mt-0.5 capitalize">
                  {role || 'Student'}
                </Badge>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              title="ਸਾਈਨ ਆਊਟ • Sign Out"
              aria-label="ਸਾਈਨ ਆਊਟ"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition"
          >
            <div className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-500">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-800">ਲਾਗਇਨ ਨਹੀਂ ਹੋ</p>
              <span className="text-[10px] text-brand-600">ਸਾਈਨ ਇਨ ਕਰੋ &rarr;</span>
            </div>
            <LogIn className="w-4 h-4 text-slate-400" />
          </Link>
        )}
      </div>

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

      {/* Role-based Staff Navigation */}
      {(role === 'teacher' || role === 'admin') && (
        <>
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

            {role === 'admin' && (
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
            )}
          </nav>
        </>
      )}

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
