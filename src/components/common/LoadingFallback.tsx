import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingFallbackProps {
  message?: string;
  subMessage?: string;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
  subMessage = 'Loading content...',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex-1 min-h-[40vh] flex flex-col items-center justify-center p-6 text-center"
    >
      <Loader2 className="w-10 h-10 text-brand-600 animate-spin mb-3" />
      <p className="text-base font-semibold text-slate-800">{message}</p>
      <p className="text-xs text-slate-500 mt-0.5">{subMessage}</p>
      <span className="sr-only">Loading</span>
    </div>
  );
};
