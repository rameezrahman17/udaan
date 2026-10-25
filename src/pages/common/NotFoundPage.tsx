import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-2xl mb-4">
        404
      </div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
        ਪੰਨਾ ਨਹੀਂ ਮਿਲਿਆ • Page Not Found
      </h1>
      <p className="text-slate-600 max-w-md mb-8">
        ਜੋ ਪੰਨਾ ਤੁਸੀਂ ਲੱਭ ਰਹੇ ਹੋ ਉਹ ਮੌਜੂਦ ਨਹੀਂ ਹੈ ਜਾਂ ਹਟਾ ਦਿੱਤਾ ਗਿਆ ਹੈ।
        <br />
        <span className="text-sm text-slate-500">
          The page you are looking for does not exist or may have been moved.
        </span>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          <Home className="w-4 h-4" />
          <span>ਮੁੱਖ ਪੰਨਾ • Home</span>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ਪਿੱਛੇ ਜਾਓ • Go Back</span>
        </button>
      </div>
    </div>
  );
};
