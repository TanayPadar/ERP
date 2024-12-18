export * from './navigation';
export * from './design';
export * from './business-logic';
export * from './masters';

export const APP_NAME = 'Mechanical ERP';
export const APP_DESCRIPTION = 'Enterprise Resource Planning software for mechanical companies';

export const DATE_FORMAT = 'dd/MM/yyyy';
export const DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm';
export const CURRENCY = 'INR';

export const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];
export const DEFAULT_PAGE_SIZE = 10;

export const STATUS_COLORS = {
  active: 'text-green-600 bg-green-100',
  inactive: 'text-gray-600 bg-gray-100',
  pending: 'text-yellow-600 bg-yellow-100',
  completed: 'text-blue-600 bg-blue-100',
  cancelled: 'text-red-600 bg-red-100'
} as const;

export const PRIORITY_COLORS = {
  low: 'text-gray-600 bg-gray-100',
  medium: 'text-yellow-600 bg-yellow-100',
  high: 'text-red-600 bg-red-100'
} as const;