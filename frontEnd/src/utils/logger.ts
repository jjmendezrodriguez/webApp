// Centralized logger for production-ready logging
// Replaces console.log/error with structured logging

const isDev = import.meta.env.DEV;

interface LogContext {
  [key: string]: unknown;
}

/**
 * Centralized logger for the application
 *
 * Usage:
 * - Development: Logs to console with emojis
 * - Production: Ready for Sentry/LogRocket integration
 *
 * @example
 * logger.error('Failed to fetch profile', error, { userId: user.id })
 * logger.warn('API rate limit approaching', { remaining: 10 })
 * logger.info('User logged in', { userId: user.id })
 */
export const logger = {
  /**
   * Log error messages
   * Always logs in production (for error tracking services)
   *
   * @param message - Human-readable error message
   * @param error - Error object or unknown error
   * @param context - Additional context (user ID, action, etc.)
   */
  error: (message: string, error?: unknown, context?: LogContext) => {
    if (isDev) {
      console.error(`❌ ${message}`, error, context);
    } else {
      // TODO: Send to Sentry/LogRocket/DataDog
      // Sentry.captureException(error, { extra: context })
      console.error(message, error, context);
    }
  },

  /**
   * Log warning messages
   * Only logs in development
   *
   * @param message - Warning message
   * @param context - Additional context
   */
  warn: (message: string, context?: LogContext) => {
    if (isDev) {
      console.warn(`⚠️ ${message}`, context);
    }
  },

  /**
   * Log info messages
   * Only logs in development
   *
   * @param message - Info message
   * @param context - Additional context
   */
  info: (message: string, context?: LogContext) => {
    if (isDev) {
      console.log(`ℹ️ ${message}`, context);
    }
  },

  /**
   * Log debug messages
   * Only logs in development
   *
   * @param message - Debug message
   * @param data - Any data to log
   */
  debug: (message: string, data?: unknown) => {
    if (isDev) {
      console.debug(`🐛 ${message}`, data);
    }
  },
};
