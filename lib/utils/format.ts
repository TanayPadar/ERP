import { format } from 'date-fns';

export const formatDate = (date: string | Date) => {
  return format(new Date(date), 'dd/MM/yyyy');
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};