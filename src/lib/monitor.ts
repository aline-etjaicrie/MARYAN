// Simple error monitoring — logs to console and integrates with Sentry when configured
// Import Sentry.captureException in place of captureException when DSN is set

export function captureException(error: Error | unknown, context?: Record<string, unknown>): void {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error('[MARYAN ERROR]', err.message, context || '');
  // TODO: Replace with Sentry.captureException(err) when DSN is configured
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): void {
  console.log(`[MARYAN ${level.toUpperCase()}]`, message);
}
