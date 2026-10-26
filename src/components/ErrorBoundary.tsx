"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useTranslations } from "next-intl";
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State { 
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          message={this.state.error?.message}
          stack={this.state.error?.stack}
          componentStack={this.state.errorInfo?.componentStack}
          onReset={this.handleReset}
          onReload={this.handleReload}
          onGoHome={this.handleGoHome}
        />
      );
    }

    return this.props.children;
  }
}

function ErrorFallback({
  message,
  stack,
  componentStack,
  onReset,
  onReload,
  onGoHome,
}: {
  message?: string
  stack?: string
  componentStack?: string
  onReset: () => void
  onReload: () => void
  onGoHome: () => void
}) {
  const t = useTranslations("common")
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle>{t("somethingWentWrong")}</CardTitle>
          </div>
          <CardDescription>
            {t("unexpectedError")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t("errorDetails")}</AlertTitle>
            <AlertDescription className="mt-2">
              <p className="font-mono text-sm break-all">
                {message || t("unknownError")}
              </p>
              {process.env.NODE_ENV === "development" && componentStack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Stack Trace (Development Only)
                  </summary>
                  <pre className="mt-2 text-xs overflow-auto max-h-48 p-2 bg-muted rounded">
                    {stack}
                    {'\n\n'}
                    {componentStack}
                  </pre>
                </details>
              )}
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-2">
            <Button onClick={onReset} variant="outline">
              <RefreshCw className="me-2 h-4 w-4" />
              {t("retry")}
            </Button>
            <Button onClick={onReload} variant="outline">
              <RefreshCw className="me-2 h-4 w-4" />
              {t("reload")}
            </Button>
            <Button onClick={onGoHome} variant="default">
              <Home className="me-2 h-4 w-4" />
              {t("goHome")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ErrorBoundary;

