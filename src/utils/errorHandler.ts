/**
 * Error handling utilities for consistent error management across the application
 */

export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION', 
  AUTHORIZATION = 'AUTHORIZATION',
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN',
  TIMEOUT = 'TIMEOUT',
  RATE_LIMIT = 'RATE_LIMIT',
}

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: Error;
  statusCode?: number;
  retryable?: boolean;
  details?: any;
}

/**
 * Check if the browser is online
 */
export function isOnline(): boolean {
  if (typeof navigator === "undefined") return true;
  return navigator.onLine;
}

/**
 * Request was cancelled (route change, unmount, or abort controller)
 */
export function isAbortError(error: unknown): boolean {
  if (!error) return false;
  if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
    return true;
  }
  if (error instanceof Error) {
    return error.name === "AbortError" || /aborted|abort error|the operation was aborted/i.test(error.message);
  }
  return false;
}

/**
 * Old JS chunks after a deploy — the user needs a reload, not a bug report
 */
export function isStaleClientError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return /loading chunk|chunkloaderror|failed to fetch dynamically imported|importing a module script failed/i.test(
    message
  );
}

function isTechnicalMessage(message: string): boolean {
  const value = message.toLowerCase();
  return (
    value.includes("cannot read") ||
    value.includes("undefined is not") ||
    value.includes("null is not") ||
    value.includes("unexpected token") ||
    value.includes("failed to execute") ||
    value.includes("minmax") ||
    /at\s+\S+\s+\(/.test(message) ||
    message.length > 280
  );
}

/**
 * Log failures without interrupting the UI
 */
export function logClientError(context: string, error: unknown): void {
  if (typeof console === "undefined") return;
  if (process.env.NODE_ENV === "development") {
    console.error(`[${context}]`, error);
    return;
  }
  console.error(`[${context}]`, error instanceof Error ? error.message : "Unknown error");
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('connection') ||
      message.includes('failed to fetch') ||
      message.includes('networkerror')
    );
  }
  return false;
}

/**
 * Check if error is a timeout error
 */
export function isTimeoutError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return message.includes('timeout') || message.includes('timed out');
  }
  return false;
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: unknown): boolean {
  if (isNetworkError(error)) {
    return true;
  }
  if (isTimeoutError(error)) {
    return true;
  }
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    // Retry on 5xx server errors
    if (message.includes('500') || message.includes('502') || message.includes('503') || message.includes('504')) {
      return true;
    }
  }
  return false;
}

/**
 * Parse error from API response
 */
export function parseApiError(error: unknown): AppError {
  if (isAbortError(error)) {
    return {
      type: ErrorType.CLIENT,
      message: "The request was cancelled.",
      originalError: error instanceof Error ? error : undefined,
      retryable: false,
    };
  }

  if (isStaleClientError(error)) {
    return {
      type: ErrorType.CLIENT,
      message: "The app was updated. Reload to load the latest version.",
      originalError: error instanceof Error ? error : undefined,
      retryable: true,
    };
  }

  // Network errors
  if (isNetworkError(error)) {
    return {
      type: ErrorType.NETWORK,
      message: isOnline()
        ? 'Unable to connect to the server. Please check your internet connection and try again.'
        : 'You are currently offline. Please check your internet connection.',
      originalError: error instanceof Error ? error : undefined,
      retryable: true,
    };
  }

  // Timeout errors
  if (isTimeoutError(error)) {
    return {
      type: ErrorType.TIMEOUT,
      message: 'The request took too long to complete. Please try again.',
      originalError: error instanceof Error ? error : undefined,
      retryable: true,
    };
  }

  // Error instances
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Authentication errors
    if (message.includes('401') || message.includes('unauthorized') || message.includes('authentication')) {
      return {
        type: ErrorType.AUTHENTICATION,
        message: 'Your session has expired. Please log in again.',
        originalError: error,
        statusCode: 401,
        retryable: false,
      };
    }

    // Authorization errors
    if (message.includes('403') || message.includes('forbidden') || message.includes('authorization') || message.includes('trial')) {
      const trialEnded = message.includes('trial') || (error as { code?: string }).code === "TRIAL_ENDED"
      return {
        type: ErrorType.AUTHORIZATION,
        message: trialEnded
          ? (error instanceof Error ? error.message : 'The 90-day trial has ended. You can still view and export records.')
          : 'You do not have permission to perform this action.',
        originalError: error,
        statusCode: 403,
        retryable: false,
      };
    }

    // Not found errors - check status code first
    const notFoundStatusCode = (error as any).status || extractStatusCode(message);
    
    // Handle 404 errors, especially authentication-related ones
    if (notFoundStatusCode === 404 || message.includes('404') || message.includes('not found')) {
      const isUserNotFound = message.toLowerCase().includes('user not found') ||
                            message.toLowerCase().includes('user does not exist');
      
      // If it's a user not found error, treat it as authentication error
      if (isUserNotFound) {
        return {
          type: ErrorType.AUTHENTICATION,
          message: 'No account found with this email address. Please check your email or register a new account.',
          originalError: error,
          statusCode: 404,
          retryable: false,
        };
      }
      
      return {
        type: ErrorType.NOT_FOUND,
        message: 'The requested resource was not found.',
        originalError: error,
        statusCode: 404,
        retryable: false,
      };
    }

    // Server errors (5xx) - check status code from error object if available
    const serverStatusCode = (error as any).status || extractStatusCode(message);
    if (serverStatusCode && serverStatusCode >= 500 && serverStatusCode < 600) {
      // Check for GCP permission errors
      const errorStr = JSON.stringify(error).toLowerCase();
      const isGcpPermissionError = errorStr.includes('permission denied') ||
                                   errorStr.includes('serviceusage') ||
                                   errorStr.includes('identitytoolkit') ||
                                   errorStr.includes('caller does not have required permission') ||
                                   errorStr.includes('user_project_denied');
      
      // Check if this is an authentication-related server error
      const isAuthError = message.includes('firebase') || 
                         message.includes('authentication') || 
                         message.includes('signin') ||
                         message.includes('login') ||
                         message.includes('profile');
      
      let errorMessage: string;
      if (isGcpPermissionError) {
        errorMessage = 'The authentication service is experiencing a configuration issue. This is a server-side permission problem that needs to be fixed by the backend team. Please contact your administrator.';
      } else if (isAuthError) {
        errorMessage = 'The authentication service is temporarily unavailable. Please try again in a few moments.';
      } else {
        errorMessage = 'The server encountered an error. Please try again later.';
      }
      
      return {
        type: ErrorType.SERVER,
        message: errorMessage,
        originalError: error,
        statusCode: serverStatusCode,
        retryable: !isGcpPermissionError, // Don't retry GCP permission errors
        details: (error as any).originalError || (error as any).originalMessage || message, // Preserve technical details
      };
    }
    
    // Also check for server error patterns in message
    if (message.includes('500') || message.includes('502') || message.includes('503') || message.includes('504')) {
      const extractedStatusCode = extractStatusCode(message);
      
      // Check for GCP permission errors
      const isGcpPermissionError = message.toLowerCase().includes('permission denied') ||
                                   message.toLowerCase().includes('serviceusage') ||
                                   message.toLowerCase().includes('identitytoolkit') ||
                                   message.toLowerCase().includes('caller does not have required permission') ||
                                   message.toLowerCase().includes('user_project_denied');
      
      const isAuthError = message.includes('firebase') || 
                         message.includes('authentication') || 
                         message.includes('signin') ||
                         message.includes('login') ||
                         message.includes('profile');
      
      let errorMessage: string;
      if (isGcpPermissionError) {
        errorMessage = 'The authentication service is experiencing a configuration issue. This is a server-side permission problem that needs to be fixed by the backend team. Please contact your administrator.';
      } else if (isAuthError) {
        errorMessage = 'The authentication service is temporarily unavailable. Please try again in a few moments.';
      } else {
        errorMessage = 'The server encountered an error. Please try again later.';
      }
      
      return {
        type: ErrorType.SERVER,
        message: errorMessage,
        originalError: error,
        statusCode: extractedStatusCode,
        retryable: !isGcpPermissionError, // Don't retry GCP permission errors
        details: message, // Preserve technical details
      };
    }

    // Rate limit errors - check status code first, then message
    const rateLimitStatusCode = (error as any).status || extractStatusCode(message);
    if (rateLimitStatusCode === 429 || message.includes('429') || message.includes('rate limit') || message.includes('too many')) {
      const retryAfter = (error as any).retryAfter;
      let rateLimitMessage = 'Too many requests. Please wait a moment and try again.';
      
      if (retryAfter) {
        const seconds = parseInt(retryAfter, 10);
        if (seconds < 60) {
          rateLimitMessage = `Too many requests. Please wait ${seconds} seconds and try again.`;
        } else {
          const minutes = Math.ceil(seconds / 60);
          rateLimitMessage = `Too many requests. Please wait ${minutes} minute${minutes > 1 ? 's' : ''} and try again.`;
        }
      }
      
      return {
        type: ErrorType.RATE_LIMIT,
        message: rateLimitMessage,
        originalError: error,
        statusCode: 429,
        retryable: true,
        details: { retryAfter },
      };
    }

    // Validation errors (4xx)
    if (message.includes('400') || message.includes('validation') || message.includes('invalid')) {
      return {
        type: ErrorType.VALIDATION,
        message: error.message || 'Invalid input. Please check your data and try again.',
        originalError: error,
        statusCode: 400,
        retryable: false,
      };
    }

    // Generic error — never show stack traces or engine messages to users
    const raw = error.message || "An unexpected error occurred. Please try again.";
    return {
      type: ErrorType.UNKNOWN,
      message: isTechnicalMessage(raw) ? "An unexpected error occurred. Please try again." : raw,
      originalError: error,
      retryable: isRetryableError(error),
    };
  }

  if (error && typeof error === "object" && "message" in error) {
    const wrapped = new Error(String((error as { message: unknown }).message || "An unexpected error occurred. Please try again."));
    const status = (error as { status?: number }).status;
    if (typeof status === "number") {
      (wrapped as { status?: number }).status = status;
    }
    const code = (error as { code?: string }).code;
    if (code) {
      (wrapped as { code?: string }).code = code;
    }
    return parseApiError(wrapped);
  }

  // Unknown error type
  return {
    type: ErrorType.UNKNOWN,
    message: 'An unexpected error occurred. Please try again.',
    originalError: error instanceof Error ? error : undefined,
    retryable: false,
  };
}

/**
 * Extract status code from error message
 */
function extractStatusCode(message: string): number | undefined {
  const match = message.match(/\b(\d{3})\b/);
  return match ? parseInt(match[1], 10) : undefined;
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(error: unknown): string {
  const appError = parseApiError(error);
  return appError.message;
}

/**
 * Safe localStorage operations with error handling
 */
export const storage = {
  getItem(key: string): string | null {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Failed to get item from localStorage (${key}):`, error);
      return null;
    }
  },

  setItem(key: string, value: string): boolean {
    if (typeof window === "undefined") return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Failed to set item in localStorage (${key}):`, error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded. Consider clearing old data.');
      }
      return false;
    }
  },

  removeItem(key: string): boolean {
    if (typeof window === "undefined") return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove item from localStorage (${key}):`, error);
      return false;
    }
  },

  clear(): boolean {
    if (typeof window === "undefined") return false;
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
      return false;
    }
  },
};

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry if error is not retryable
      if (!isRetryableError(error)) {
        throw error;
      }

      // Don't retry on last attempt
      if (attempt === maxRetries) {
        break;
      }

      // Calculate delay with exponential backoff
      const delay = initialDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Race a promise against a timeout without leaving an unhandled rejection
 */
export function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Request timeout after ${timeoutMs}ms`));
    }, timeoutMs);

    promise.then(
      (value) => {
        clearTimeout(timeoutId);
        resolve(value);
      },
      (error) => {
        clearTimeout(timeoutId);
        reject(error);
      }
    );
  });
}

type ErrorWithMeta = Error & { status?: number; code?: string; retryable?: boolean; type?: ErrorType }

/**
 * Convert any thrown value into a user-facing Error while keeping HTTP metadata
 */
export function toUserError(error: unknown): ErrorWithMeta {
  const appError = parseApiError(error)
  const next = new Error(appError.message) as ErrorWithMeta
  next.status = appError.statusCode ?? (typeof (error as { status?: number })?.status === "number"
    ? (error as { status: number }).status
    : undefined)
  next.code = (error as { code?: string })?.code
  next.retryable = appError.retryable
  next.type = appError.type
  return next
}

