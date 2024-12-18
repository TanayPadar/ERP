export function validateRequired(value: unknown, fieldName: string): void {
  if (value === null || value === undefined) {
    throw new Error(`${fieldName} is required`);
  }

  if (typeof value === 'string' && value.trim() === '') {
    throw new Error(`${fieldName} cannot be empty`);
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
}

export function validateNumber(value: number, min?: number, max?: number): void {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('Invalid number');
  }

  if (min !== undefined && value < min) {
    throw new Error(`Value must be greater than or equal to ${min}`);
  }

  if (max !== undefined && value > max) {
    throw new Error(`Value must be less than or equal to ${max}`);
  }
}

export function validateDate(date: string): boolean {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}