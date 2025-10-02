import { parse, isValid, format, parseISO } from 'date-fns';

export function formatDue(due: string) {
  try {
    const date = parseISO(due);
    return isValid(date) ? format(date, 'dd/MM/yyyy') : due;
  } catch {
    return due;
  }
}

export const CREATED_REGEX = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY

export function validCreatedDate(value: string): boolean {
  if (!CREATED_REGEX.test(value)) return false;
  const date = parse(value, 'dd/MM/yyyy', new Date());
  return isValid(date) && format(date, 'dd/MM/yyyy') === value;
}

export function validISODate(value: string): boolean {
  if (!value) return false;
  try {
    const date = parseISO(value);
    return isValid(date);
  } catch {
    return false;
  }
}
