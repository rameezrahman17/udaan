import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2, LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white shadow-sm border border-transparent focus-visible:ring-brand-500',
  secondary:
    'bg-brand-100 hover:bg-brand-200 active:bg-brand-300 text-brand-900 border border-brand-200 focus-visible:ring-brand-500',
  outline:
    'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-300 shadow-sm focus-visible:ring-slate-500',
  ghost:
    'bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-700 border border-transparent focus-visible:ring-slate-500',
  danger:
    'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-sm border border-transparent focus-visible:ring-rose-500',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5 min-h-[36px]',
  md: 'px-4 py-2 text-sm rounded-xl gap-2 min-h-[44px]',
  lg: 'px-6 py-3 text-base rounded-2xl gap-2.5 min-h-[50px] font-bold',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon: Icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
        ) : Icon && iconPosition === 'left' ? (
          <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
        ) : null}

        <span>{children}</span>

        {!isLoading && Icon && iconPosition === 'right' ? (
          <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
        ) : null}
      </button>
    );
  }
);

Button.displayName = 'Button';
