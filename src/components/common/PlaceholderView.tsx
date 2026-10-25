import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowLeft } from 'lucide-react';

interface PlaceholderViewProps {
  titlePa: string;
  titleEn: string;
  descriptionPa: string;
  descriptionEn: string;
  icon: LucideIcon;
  badgeText?: string;
  backTo?: string;
  backLabel?: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({
  titlePa,
  titleEn,
  descriptionPa,
  descriptionEn,
  icon: Icon,
  badgeText = 'ਨਿਰਮਾਣ ਅਧੀਨ • Coming Soon',
  backTo = '/',
  backLabel = 'ਮੁੱਖ ਪੰਨਾ • Home',
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto my-auto">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium mb-4">
        {badgeText}
      </div>
      <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        {titlePa}
      </h2>
      <p className="text-sm font-medium text-brand-700 mb-3">
        {titleEn}
      </p>
      <p className="text-slate-600 text-sm mb-1 leading-relaxed">
        {descriptionPa}
      </p>
      <p className="text-slate-500 text-xs mb-8 leading-relaxed">
        {descriptionEn}
      </p>
      <Link
        to={backTo}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{backLabel}</span>
      </Link>
    </div>
  );
};
