import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AdminErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Admin Runtime Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background dark flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-card border border-border rounded-xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-destructive" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-destructive/10 rounded-lg text-destructive">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-xl font-bold text-foreground">Admin Runtime Error</h2>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Something went wrong while rendering the dashboard. This could be a configuration issue or a temporary data sync error.
            </p>

            {this.state.error && (
              <div className="bg-muted/50 rounded-lg p-4 mb-8 font-mono text-xs overflow-auto max-h-40 border border-border/50 text-destructive-foreground/80">
                {this.state.error.name}: {this.state.error.message}
                {this.state.error.stack && (
                  <pre className="mt-2 text-[10px] opacity-50 whitespace-pre-wrap">
                    {this.state.error.stack.split('\n').slice(0, 3).join('\n')}
                  </pre>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="gap-2"
              >
                <RefreshCcw size={16} />
                Retry
              </Button>
              <Button 
                variant="default" 
                onClick={() => window.location.href = '/'}
                className="gap-2"
              >
                <Home size={16} />
                Home
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.children;
  }
}
