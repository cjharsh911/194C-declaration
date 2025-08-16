import { format } from 'date-fns';

export const getCurrentFinancialYear = (): string => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // Financial year starts from April (month 3, 0-indexed)
  if (currentMonth >= 3) {
    return `${currentYear}-${currentYear + 1}`;
  } else {
    return `${currentYear - 1}-${currentYear}`;
  }
};

export const formatDate = (date: Date): string => {
  return format(date, 'dd/MM/yyyy');
};

export const getTodayDate = (): string => {
  return formatDate(new Date());
};