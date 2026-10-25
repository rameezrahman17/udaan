import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowLeft } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';

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
    <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-xl mx-auto my-auto w-full">
      <Card className="text-center w-full flex flex-col items-center p-6 sm:p-8">
        <Badge variant="warning" className="mb-4">
          {badgeText}
        </Badge>
        
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-4 shadow-sm">
          <Icon className="w-8 h-8" aria-hidden="true" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          {titlePa}
        </h2>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 mb-3">
          {titleEn}
        </p>

        <p className="text-slate-600 text-sm mb-1 leading-relaxed max-w-md">
          {descriptionPa}
        </p>
        <p className="text-slate-400 text-xs mb-8 leading-relaxed max-w-md">
          {descriptionEn}
        </p>

        <Link to={backTo}>
          <Button variant="primary" size="md" icon={ArrowLeft} iconPosition="left">
            {backLabel}
          </Button>
        </Link>
      </Card>
    </div>
  );
};
