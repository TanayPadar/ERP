import { toast } from 'sonner';
import { AppError } from './AppError';

export function handleError(error: unknown): void {
  console.error('Error:', error);

  if (error instanceof AppError) {
    toast.error(error.message);
    // Log additional error details if needed
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Details:', error.toJSON());
    }
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error('An unexpected error occurred');
  }
}

export function assertNonNull<T>(
  value: T | null | undefined,
  message = 'Value is null or undefined'
): T {
  if (value === null || value === undefined) {
    throw new AppError(message);
  }
  return value;
}

export function handleApiError(error: unknown): never {
  if (error instanceof AppError) {
    throw error;
  }
  throw new AppError('API request failed');
}