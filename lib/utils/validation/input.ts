export function validateRequired(value: unknown, fieldName: string): void {
  if (value === null || value === undefined) {
    throw new Error(`${fieldName} is required`);
  }

  if (typeof value === 'string' && value.trim() === '') {
    throw new Error(`${fieldName} cannot be empty`);
  }
}

export function validateLength(value: string, min: number, max: number, fieldName: string): void {
  if (value.length < min) {
    throw new Error(`${fieldName} must be at least ${min} characters`);
  }
  if (value.length > max) {
    throw new Error(`${fieldName} cannot exceed ${max} characters`);
  }
}

export function validateNumber(value: number, min?: number, max?: number, fieldName?: string): void {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error(`${fieldName || 'Value'} must be a valid number`);
  }

  if (min !== undefined && value < min) {
    throw new Error(`${fieldName || 'Value'} must be at least ${min}`);
  }

  if (max !== undefined && value > max) {
    throw new Error(`${fieldName || 'Value'} must not exceed ${max}`);
  }
}