import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Award, Users, WifiOff } from 'lucide-react';
import { config } from '@/config/env';

export const HomePage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-sm font-medium mb-4">
        <WifiOff className="w-4 h-4" />
        <span>Offline Ready • ਆਫ਼ਲਾਈਨ ਲਈ ਤਿਆਰ</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
        {config.appTitle}
      </h1>
      <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8">
        ਪੇਂਡੂ ਨਾਭਾ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਅਤੇ ਅਧਿਆਪਕਾਂ ਲਈ ਡਿਜੀਟਲ ਸਿੱਖਿਆ ਪਲੇਟਫਾਰਮ।
        <br />
        <span className="text-base text-slate-500">
          Digital education platform for rural Nabha students and teachers.
        </span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
        <Link
          to="/library"
          className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-brand-500 hover:shadow-md transition-all flex flex-col items-center text-center group"
        >
          <div className="p-3 bg-brand-50 text-brand-600 rounded-lg group-hover:bg-brand-600 group-hover:text-white transition-colors mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="font-semibold text-slate-900">ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ</span>
          <span className="text-xs text-slate-500">Lesson Library</span>
        </Link>

        <Link
          to="/progress"
          className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-brand-500 hover:shadow-md transition-all flex flex-col items-center text-center group"
        >
          <div className="p-3 bg-brand-50 text-brand-600 rounded-lg group-hover:bg-brand-600 group-hover:text-white transition-colors mb-3">
            <Award className="w-6 h-6" />
          </div>
          <span className="font-semibold text-slate-900">ਮੇਰੀ ਤਰੱਕੀ</span>
          <span className="text-xs text-slate-500">My Progress</span>
        </Link>

        <Link
          to="/teacher"
          className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-brand-500 hover:shadow-md transition-all flex flex-col items-center text-center group"
        >
          <div className="p-3 bg-brand-50 text-brand-600 rounded-lg group-hover:bg-brand-600 group-hover:text-white transition-colors mb-3">
            <Users className="w-6 h-6" />
          </div>
          <span className="font-semibold text-slate-900">ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ</span>
          <span className="text-xs text-slate-500">Teacher Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export const PlaceholderPage: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => (
  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
    <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
    <p className="text-slate-500 mb-6">{subtitle}</p>
    <Link
      to="/"
      className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
    >
      ਮੁੱਖ ਪੰਨਾ • Back to Home
    </Link>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6">
        <Link to="/" className="font-bold text-brand-700 text-lg flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-black">
            ਉ
          </span>
          Udaan
        </Link>
        <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
          Nabha, Punjab
        </span>
      </header>

      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/library"
            element={
              <PlaceholderPage
                title="ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ (Lesson Library)"
                subtitle="Lessons will be available offline and online in coming phases."
              />
            }
          />
          <Route
            path="/progress"
            element={
              <PlaceholderPage
                title="ਮੇਰੀ ਤਰੱਕੀ (My Progress)"
                subtitle="Quiz attempts and completed lessons will be tracked here."
              />
            }
          />
          <Route
            path="/teacher"
            element={
              <PlaceholderPage
                title="ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ (Teacher Dashboard)"
                subtitle="Class analytics and learner performance will appear here."
              />
            }
          />
        </Routes>
      </main>

      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-100">
        Project Udaan • Rural Digital Literacy Initiative
      </footer>
    </BrowserRouter>
  );
};
export default App;
