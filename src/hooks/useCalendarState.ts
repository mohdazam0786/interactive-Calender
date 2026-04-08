'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  CalDate, DateRange, Theme, THEMES,
  toDateNum, dateKey, monthKey, rangeNoteKey, clampRange,
} from '@/lib/types';

interface CalendarState {
  year: number;
  month: number;
  rangeStart: CalDate | null;
  rangeEnd:   CalDate | null;
  hoverDay:   CalDate | null;
  selecting:  boolean;
  notes:      Record<string, string>;
  themeIndex: number;
  theme:      Theme;
}

interface CalendarActions {
  prevMonth:     () => void;
  nextMonth:     () => void;
  handleDayClick:(day: number) => void;
  handleDayHover:(day: number) => void;
  handleDayLeave:() => void;
  clearSelection:() => void;
  setNote:       (key: string, value: string) => void;
  setTheme:      (idx: number) => void;
  activeNoteKey: string;
  rangeNumbers:  { lo: number; hi: number } | null;
  effectiveEnd:  CalDate | null;
}

export function useCalendarState(): CalendarState & CalendarActions {
  const today = new Date();

  const [{ year, month }, setYearMonth] = useState({
    year:  today.getFullYear(),
    month: today.getMonth(),
  });
  const [rangeStart, setRangeStart] = useState<CalDate | null>(null);
  const [rangeEnd,   setRangeEnd]   = useState<CalDate | null>(null);
  const [hoverDay,   setHoverDay]   = useState<CalDate | null>(null);
  const [selecting,  setSelecting]  = useState(false);
  const [notes,      setNotes]      = useState<Record<string, string>>({});
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wc-notes');
      if (saved) setNotes(JSON.parse(saved));
    } catch {}
  }, []);

  const setNote = useCallback((key: string, value: string) => {
    setNotes(prev => {
      const next = { ...prev, [key]: value };
      try { localStorage.setItem('wc-notes', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const prevMonth = useCallback(() => {
    setYearMonth(({ year: y, month: m }) =>
      m === 0 ? { year: y - 1, month: 11 } : { year: y, month: m - 1 }
    );
  }, []);
  const nextMonth = useCallback(() => {
    setYearMonth(({ year: y, month: m }) =>
      m === 11 ? { year: y + 1, month: 0 } : { year: y, month: m + 1 }
    );
  }, []);

  const handleDayClick = useCallback((day: number) => {
    const clicked: CalDate = { year, month, day };
    if (!rangeStart || rangeEnd) {
      setRangeStart(clicked);
      setRangeEnd(null);
      setSelecting(true);
    } else {
      const sN = toDateNum(rangeStart), eN = toDateNum(clicked);
      if (eN < sN) {
        setRangeEnd(rangeStart);
        setRangeStart(clicked);
      } else {
        setRangeEnd(clicked);
      }
      setSelecting(false);
      setHoverDay(null);
    }
  }, [year, month, rangeStart, rangeEnd]);

  const handleDayHover = useCallback((day: number) => {
    if (selecting) setHoverDay({ year, month, day });
  }, [selecting, year, month]);

  const handleDayLeave = useCallback(() => {
    if (selecting) setHoverDay(null);
  }, [selecting]);

  const clearSelection = useCallback(() => {
    setRangeStart(null); setRangeEnd(null);
    setSelecting(false); setHoverDay(null);
  }, []);

  const effectiveEnd: CalDate | null = rangeEnd ?? (selecting ? hoverDay : null);

  const rangeNumbers = (rangeStart && effectiveEnd)
    ? clampRange(rangeStart, effectiveEnd)
    : null;

  const activeNoteKey = (rangeStart && rangeEnd)
    ? rangeNoteKey(
        toDateNum(rangeStart) <= toDateNum(rangeEnd) ? rangeStart : rangeEnd,
        toDateNum(rangeStart) <= toDateNum(rangeEnd) ? rangeEnd   : rangeStart,
      )
    : monthKey(year, month);

  return {
    year, month,
    rangeStart, rangeEnd, hoverDay, selecting,
    notes, themeIndex,
    theme: THEMES[themeIndex],
    prevMonth, nextMonth,
    handleDayClick, handleDayHover, handleDayLeave,
    clearSelection, setNote,
    setTheme: setThemeIndex,
    activeNoteKey, rangeNumbers,
    effectiveEnd,
  };
}
