import { isToday } from 'date-fns';

export function formatDate(date: Date) {
  return isToday(date) ? 'It is today' : 'it is not today';
}
