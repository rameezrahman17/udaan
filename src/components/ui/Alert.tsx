import React, { HTMLAttributes } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  onDismiss?: () => void;
}

const alertConfig: Record<AlertVariant, { container: string; iconClass: string; Icon: typeof Info }> = {
  info: {
    container: 'bg-sky-50 border-sky-200 text-sky-900',
    iconClass: 'text-sky-600',
    Icon: Info,
  },
  success: {
    container: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    iconClass: 'text-emerald-600',
    Icon: CheckCircle2,
  },
  warning: {
    container: 'bg-amber-50 border-amber-300 text-amber-950',
    iconClass: 'text-amber-600',
    Icon: AlertTriangle,
  },
  error: {
    container: 'bg-rose-50 border-rose-200 text-rose-950',
    iconClass: 'text-rose-600',
    Icon: AlertCircle,
  },
};

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  onDismiss,
  className = '',
  ...props
}) => {
  const { container, iconClass, Icon } = alertConfig[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`relative w-full rounded-2xl border p-4 flex items-start gap-3 text-sm ${container} ${className}`}
      {...props}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconClass}`} aria-hidden="true" />
      <div className="flex-1">
        {title && <h4 className="font-bold mb-0.5 leading-snug">{title}</h4>}
        <div className="text-xs sm:text-sm leading-relaxed">{children}</div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="ਸੂਚਨਾ ਬੰਦ ਕਰੋ • Dismiss alert"
          className="p-1 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
