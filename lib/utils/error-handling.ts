import { toast } from 'sonner';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown): void {
  console.error('Error:', error);

  if (error instanceof AppError) {
    toast.error(error.message);
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