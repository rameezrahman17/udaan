import React, { HTMLAttributes } from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  titlePa: string;
  titleEn: string;
  descriptionPa: string;
  descriptionEn: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  titlePa,
  titleEn,
  descriptionPa,
  descriptionEn,
  icon: Icon = Inbox,
  actionLabel,
  onAction,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto ${className}`}
      {...props}
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-0.5">{titlePa}</h3>
      <p className="text-xs font-semibold text-slate-400 mb-2">{titleEn}</p>
      <p className="text-sm text-slate-600 mb-1">{descriptionPa}</p>
      <p className="text-xs text-slate-500 mb-6">{descriptionEn}</p>

      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
