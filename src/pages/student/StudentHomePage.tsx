import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Users,
  WifiOff,
  Sparkles,
  ArrowRight,
  FileQuestion,
} from 'lucide-react';
import { config } from '@/config/env';

export const StudentHomePage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
      {/* Welcome Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 via-brand-600 to-emerald-800 text-white p-6 sm:p-8 shadow-md mb-8">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ਡਿਜੀਟਲ ਸਾਖਰਤਾ ਮਿਸ਼ਨ • Digital Literacy</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            ਜੀ ਆਇਆਂ ਨੂੰ, ਵਿਦਿਆਰਥੀਓ!
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6">
            ਕੰਪਿਊਟਰ ਚਲਾਉਣਾ ਸਿੱਖੋ, ਇੰਟਰਨੈੱਟ ਸੁਰੱਖਿਆ ਬਾਰੇ ਜਾਣੋ ਅਤੇ ਮਜ਼ੇਦਾਰ ਕੁਇਜ਼ ਹੱਲ ਕਰੋ।
            ਬਿਨਾਂ ਇੰਟਰਨੈੱਟ ਦੇ ਵੀ ਪੜ੍ਹੋ!
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/lessons"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-brand-800 hover:bg-emerald-50 rounded-xl font-bold text-sm transition shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-700"
            >
              <BookOpen className="w-4 h-4" />
              <span>ਪਾਠ ਸ਼ੁਰੂ ਕਰੋ • Start Lessons</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/quizzes"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-800/60 hover:bg-brand-800/80 text-white border border-brand-500/50 rounded-xl font-semibold text-sm transition"
            >
              <FileQuestion className="w-4 h-4" />
              <span>ਕੁਇਜ਼ ਲਓ • Take Quiz</span>
            </Link>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute -right-8 -bottom-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </section>

      {/* Quick Action Cards Grid */}
      <section aria-labelledby="quick-actions-heading" className="mb-8">
        <h2 id="quick-actions-heading" className="text-lg font-bold text-slate-800 mb-4 flex items-center justify-between">
          <span>ਤੁਰੰਤ ਪਹੁੰਚ • Quick Navigation</span>
          <span className="text-xs text-slate-500 font-normal">{config.appTitle}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            to="/lessons"
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-brand-500 hover:shadow-md transition-all group flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                ਕੰਪਿਊਟਰ ਬੁਨਿਆਦ, ਕੀਬੋਰਡ, ਮਾਊਸ, ਅਤੇ ਇੰਟਰਨੈੱਟ ਸੁਰੱਖਿਆ ਦੇ ਪਾਠ।
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600">
              <span>ਪਾਠ ਵੇਖੋ</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/progress"
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-brand-500 hover:shadow-md transition-all group flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                ਮੇਰੀ ਤਰੱਕੀ ਅਤੇ ਸਕੋਰ
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                ਤੁਹਾਡੇ ਮੁਕੰਮਲ ਕੀਤੇ ਪਾਠ ਅਤੇ ਕੁਇਜ਼ਾਂ ਦੇ ਅੰਕੜੇ ਇੱਥੇ ਦਿਖਾਈ ਦਿੰਦੇ ਹਨ।
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
              <span>ਤਰੱਕੀ ਦੇਖੋ</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/teacher"
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-brand-500 hover:shadow-md transition-all group flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                ਜਮਾਤ ਦੀ ਸਮੁੱਚੀ ਕਾਰਗੁਜ਼ਾਰੀ ਅਤੇ ਲੋੜਵੰਦ ਵਿਦਿਆਰਥੀਆਂ ਦੀ ਜਾਣਕਾਰੀ।
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700">
              <span>ਡੈਸ਼ਬੋਰਡ ਖੋਲ੍ਹੋ</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Offline Feature Callout */}
      <section className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-white text-slate-700 shrink-0 shadow-sm">
          <WifiOff className="w-5 h-5" />
        </div>
        <div className="text-xs text-slate-600">
          <strong className="text-slate-800 block text-sm mb-0.5">
            ਆਫ਼ਲਾਈਨ ਪੜ੍ਹਾਈ ਦੀ ਸਹੂਲਤ (Offline Learning Enabled)
          </strong>
          ਇੰਟਰਨੈੱਟ ਬੰਦ ਹੋਣ ’ਤੇ ਵੀ ਤੁਸੀਂ ਪਾਠ ਪੜ੍ਹ ਸਕਦੇ ਹੋ ਅਤੇ ਕੁਇਜ਼ ਹੱਲ ਕਰ ਸਕਦੇ ਹੋ। ਨੈੱਟ ਆਉਣ ’ਤੇ ਨਤੀਜੇ ਆਪਣੇ ਆਪ ਸਿੰਕ ਹੋ ਜਾਣਗੇ।
        </div>
      </section>
    </div>
  );
};
