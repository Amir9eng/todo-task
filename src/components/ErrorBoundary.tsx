'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#0D0D14] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-red-500/10">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mb-10 leading-relaxed font-medium">
            We've encountered an unexpected error. Don't worry, your data is safe in local storage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button
              onClick={this.handleReset}
              className="flex-1 flex items-center justify-center gap-3 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
            >
              <RefreshCw className="w-5 h-5" />
              Try again
            </button>
            <a
              href="/"
              className="flex-1 flex items-center justify-center gap-3 py-4 bg-white dark:bg-[#1E1E2D] text-gray-900 dark:text-white font-bold rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <Home className="w-5 h-5" />
              Home
            </a>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mt-12 w-full max-w-2xl bg-white dark:bg-[#1E1E2D] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 text-left overflow-auto max-h-[300px] no-scrollbar shadow-inner">
              <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4">Error Details</div>
              <pre className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                {this.state.error.message}
                {'\n'}
                {this.state.error.stack}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
