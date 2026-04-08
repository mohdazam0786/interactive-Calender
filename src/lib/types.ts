export const MONTH_LABELS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
] as const;

export const WEEKDAY_LABELS  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const;

export interface CalDate {
  year: number;
  month: number; 
  day: number;
}

export interface DateRange {
  start: CalDate;
  end: CalDate;
}

export interface Theme {
  name: string;
  colors: string[]; 
  accent: string;
  accentDark: string;
}

export const THEMES: Theme[] = [
  {
    name: 'Alpine',
    colors: ['#1a3a5c','#2d6a9f','#4a9fd4','#a8d8f0','#ddf0fb'],
    accent: '#1a7aff',
    accentDark: '#0040aa',
  },
  {
    name: 'Sunset',
    colors: ['#3d1a0a','#8b3a1a','#d4622a','#f5a87a','#fdeee5'],
    accent: '#d4622a',
    accentDark: '#993010',
  },
  {
    name: 'Forest',
    colors: ['#0a2212','#1a5c2a','#2d8a45','#7ac98a','#e2f5e8'],
    accent: '#1a8a45',
    accentDark: '#0d5528',
  },
  {
    name: 'Dusk',
    colors: ['#1a0a3d','#3d1a7a','#7a3ab5','#c8a5e5','#f2eaff'],
    accent: '#7a3ab5',
    accentDark: '#4a1a80',
  },
];

export function toDateNum(d: CalDate): number {
  return d.year * 10000 + (d.month + 1) * 100 + d.day;
}

export function dateKey(d: CalDate): string {
  return `${d.year}-${String(d.month + 1).padStart(2,'0')}-${String(d.day).padStart(2,'0')}`;
}

export function monthKey(year: number, month: number): string {
  return `month-${year}-${month}`;
}

export function rangeNoteKey(start: CalDate, end: CalDate): string {
  return `range-${dateKey(start)}-${dateKey(end)}`;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function firstDayOffset(year: number, month: number): number {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

export function clampRange(start: CalDate, end: CalDate): { lo: number; hi: number } {
  const s = toDateNum(start), e = toDateNum(end);
  return s <= e ? { lo: s, hi: e } : { lo: e, hi: s };
}

export function formatShort(d: CalDate): string {
  return `${MONTH_LABELS[d.month].slice(0,3)} ${d.day}`;
}
