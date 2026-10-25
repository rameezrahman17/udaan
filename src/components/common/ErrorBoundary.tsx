import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ ਹੈ • Something went wrong
          </h2>
          <p className="text-sm text-slate-600 max-w-md mb-6">
            ਐਪ ਵਿੱਚ ਅਣਕਿਆਸੀ ਗਲਤੀ ਆਈ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਪੰਨਾ ਮੁੜ ਲੋਡ ਕਰੋ।
            <br />
            <span className="text-xs text-slate-500">
              An unexpected error occurred. Please reload the page to continue.
            </span>
          </p>
          <button
            onClick={this.handleReload}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ • Try Again</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
