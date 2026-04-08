'use client';

import styles from './DayCell.module.css';
import { CalDate, toDateNum } from '@/lib/types';

interface Props {
  day: number;
  colIndex: number;     
  isOtherMonth?: boolean;
  isToday?: boolean;
  hasNote?: boolean;
  rangeNumbers: { lo: number; hi: number } | null;
  currentDate: CalDate;
  onClick: (day: number) => void;
  onMouseEnter: (day: number) => void;
  onMouseLeave: () => void;
}

export default function DayCell({
  day, colIndex, isOtherMonth, isToday, hasNote,
  rangeNumbers, currentDate, onClick, onMouseEnter, onMouseLeave,
}: Props) {

  if (isOtherMonth) {
    return <div className={styles.empty}>{day > 0 ? day : ''}</div>;
  }

  const dNum = toDateNum(currentDate);
  const { lo, hi } = rangeNumbers ?? { lo: -1, hi: -1 };

  const isStart   = dNum === lo;
  const isEnd     = dNum === hi;
  const inRange   = dNum > lo && dNum < hi;
  const isRowStart = colIndex === 0;
  const isRowEnd   = colIndex === 6;

  const isSat = colIndex === 5;
  const isSun = colIndex === 6;

  const cls = [
    styles.cell,
    isToday   ? styles.today   : '',
    isSat     ? styles.sat     : '',
    isSun     ? styles.sun     : '',
    isStart   ? styles.rangeStart : '',
    isEnd     ? styles.rangeEnd   : '',
    inRange   ? styles.inRange    : '',
    inRange && isRowStart ? styles.rowStart : '',
    inRange && isRowEnd   ? styles.rowEnd   : '',
    isStart && isEnd      ? styles.single   : '',
    hasNote   ? styles.hasNote : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cls}
      onClick={() => onClick(day)}
      onMouseEnter={() => onMouseEnter(day)}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`${currentDate.day} ${currentDate.month + 1} ${currentDate.year}`}
      onKeyDown={e => e.key === 'Enter' && onClick(day)}
    >
      <span className={styles.num}>{day}</span>
      {hasNote && <span className={styles.noteDot} aria-hidden />}
    </div>
  );
}
