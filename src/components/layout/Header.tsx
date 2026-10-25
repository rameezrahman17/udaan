import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  Home,
  Wifi,
  WifiOff,
  Menu,
  X,
} from 'lucide-react';

interface HeaderProps {
  isOnline: boolean;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isOnline,
  onToggleMobileMenu,
  isMobileMenuOpen,
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'ਨੇਵੀਗੇਸ਼ਨ ਮੀਨੂ ਬੰਦ ਕਰੋ' : 'ਨੇਵੀਗੇਸ਼ਨ ਮੀਨੂ ਖੋਲ੍ਹੋ'}
          aria-expanded={isMobileMenuOpen}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <NavLink
          to="/"
          className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
            ਉ
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 text-base leading-none">
              ਉਡਾਨ <span className="text-xs text-brand-700 font-bold ml-0.5">Udaan</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              ਨਾਭਾ ਡਿਜੀਟਲ ਲਰਨਿੰਗ
            </span>
          </div>
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <nav aria-label="ਮੁੱਖ ਨੇਵੀਗੇਸ਼ਨ • Main Navigation" className="hidden md:flex items-center gap-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isActive
                ? 'bg-brand-50 text-brand-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`
          }
        >
          <Home className="w-4 h-4" />
          <span>ਮੁੱਖ ਪੰਨਾ</span>
        </NavLink>

        <NavLink
          to="/lessons"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isActive
                ? 'bg-brand-50 text-brand-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`
          }
        >
          <BookOpen className="w-4 h-4" />
          <span>ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ</span>
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isActive
                ? 'bg-brand-50 text-brand-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`
          }
        >
          <Award className="w-4 h-4" />
          <span>ਤਰੱਕੀ</span>
        </NavLink>

        <NavLink
          to="/teacher"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isActive
                ? 'bg-brand-50 text-brand-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`
          }
        >
          <Users className="w-4 h-4" />
          <span>ਅਧਿਆਪਕ</span>
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isActive
                ? 'bg-brand-50 text-brand-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`
          }
        >
          <ShieldCheck className="w-4 h-4" />
          <span>ਪ੍ਰਬੰਧਕ</span>
        </NavLink>
      </nav>

      {/* Online / Offline status badge */}
      <div className="flex items-center gap-2">
        <div
          role="status"
          aria-label={isOnline ? 'ਔਨਲਾਈਨ • Online' : 'ਆਫ਼ਲਾਈਨ • Offline'}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            isOnline
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">ਔਨਲਾਈਨ</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-600" />
              <span>ਆਫ਼ਲਾਈਨ</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
