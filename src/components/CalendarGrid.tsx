'use client';

import styles from './CalendarGrid.module.css';
import DayCell from './DayCell';
import {
  WEEKDAY_LABELS, CalDate, daysInMonth, firstDayOffset,
  dateKey, toDateNum,
} from '@/lib/types';

interface Props {
  year: number;
  month: number;
  rangeNumbers: { lo: number; hi: number } | null;
  notes: Record<string, string>;
  onDayClick:    (day: number) => void;
  onDayHover:    (day: number) => void;
  onDayLeave:    () => void;
}

export default function CalendarGrid({
  year, month, rangeNumbers, notes,
  onDayClick, onDayHover, onDayLeave,
}: Props) {
  const today = new Date();
  const offset  = firstDayOffset(year, month);
  const numDays = daysInMonth(year, month);
  const prevDays = daysInMonth(year, month === 0 ? 11 : month - 1);
  const total = offset + numDays;
  const rows  = Math.ceil(total / 7);
  const cells = rows * 7;

  const items: JSX.Element[] = [];

  for (let i = 0; i < cells; i++) {
    const col = i % 7;
    if (i < offset) {
      const d = prevDays - offset + i + 1;
      items.push(
        <DayCell key={`prev-${i}`} day={d} colIndex={col} isOtherMonth
          rangeNumbers={null}
          currentDate={{ year, month, day: 0 }}
          onClick={() => {}} onMouseEnter={() => {}} onMouseLeave={() => {}}
        />
      );
    } else if (i >= offset + numDays) {
      const d = i - offset - numDays + 1;
      items.push(
        <DayCell key={`next-${i}`} day={d} colIndex={col} isOtherMonth
          rangeNumbers={null}
          currentDate={{ year, month, day: 0 }}
          onClick={() => {}} onMouseEnter={() => {}} onMouseLeave={() => {}}
        />
      );
    } else {
      const day = i - offset + 1;
      const cd: CalDate = { year, month, day };
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
      const nKey = dateKey(cd);
      const hasNote = !!(notes[nKey]?.trim());

      items.push(
        <DayCell
          key={`day-${day}`}
          day={day}
          colIndex={col}
          isToday={isToday}
          hasNote={hasNote}
          rangeNumbers={rangeNumbers}
          currentDate={cd}
          onClick={onDayClick}
          onMouseEnter={onDayHover}
          onMouseLeave={onDayLeave}
        />
      );
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.weekdays}>
        {WEEKDAY_LABELS .map((w, i) => (
          <div
            key={w}
            className={`${styles.wd} ${i === 5 ? styles.sat : i === 6 ? styles.sun : ''}`}
          >
            {w}
          </div>
        ))}
      </div>
      <div className={styles.grid}>
        {items}
      </div>
    </div>
  );
}
