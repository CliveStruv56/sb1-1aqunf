import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { addDays, format, setHours, setMinutes } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTimeSlots(date: Date): string[] {
  const slots: string[] = [];
  let current = setHours(setMinutes(date, 45), 10); // 10:45
  const end = setHours(setMinutes(date, 30), 15); // 15:30

  while (current <= end) {
    slots.push(format(current, 'HH:mm'));
    current = addMinutes(current, 15);
  }

  return slots;
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

export function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    dates.push(addDays(today, i));
  }
  
  return dates;
}