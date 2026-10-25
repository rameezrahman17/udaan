import { HTMLAttributes, forwardRef } from 'react';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  label?: string;
  subLabel?: string;
  showPercent?: boolean;
  color?: 'brand' | 'amber' | 'emerald' | 'sky';
}

const colorMap = {
  brand: 'bg-brand-600',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-600',
  sky: 'bg-sky-600',
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      label,
      subLabel,
      showPercent = true,
      color = 'brand',
      className = '',
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, Math.round(value)));

    return (
      <div ref={ref} className={`w-full flex flex-col gap-1.5 ${className}`} {...props}>
        {(label || showPercent) && (
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>
              {label}
              {subLabel && <span className="ml-1 text-slate-400 font-normal">({subLabel})</span>}
            </span>
            {showPercent && <span className="font-bold text-slate-800">{clampedValue}%</span>}
          </div>
        )}

        <div
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label || 'ਤਰੱਕੀ ਬਾਰ • Progress'}
          className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden"
        >
          <div
            className={`h-full transition-all duration-300 rounded-full ${colorMap[color]}`}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
