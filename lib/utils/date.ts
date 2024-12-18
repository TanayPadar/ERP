import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '';
  
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsed) ? format(parsed, 'dd/MM/yyyy') : '';
};

export const formatDateTime = (date: string | Date | null | undefined): string => {
  if (!date) return '';
  
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsed) ? format(parsed, 'dd/MM/yyyy HH:mm') : '';
};

export const toISODate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};