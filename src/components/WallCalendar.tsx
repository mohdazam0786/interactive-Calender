'use client';

import { useEffect } from 'react';
import styles from './WallCalendar.module.css';
import HeroCanvas from './HeroCanvas';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import ThemeSwitcher from './ThemeSwitcher';
import { useCalendarState } from '@/hooks/useCalendarState';
import { MONTH_LABELS , formatShort, toDateNum } from '@/lib/types';

export default function WallCalendar() {
  const state = useCalendarState();

  const {
    year, month, theme, themeIndex,
    rangeStart, rangeEnd, selecting, effectiveEnd,
    rangeNumbers, notes, activeNoteKey,
    prevMonth, nextMonth,
    handleDayClick, handleDayHover, handleDayLeave,
    clearSelection, setNote, setTheme,
  } = state;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent',       theme.accent);
    root.style.setProperty('--accent-dark',  theme.accentDark);
    root.style.setProperty('--accent-light', hexAlpha(theme.accent, 0.10));
    root.style.setProperty('--range-bg',     hexAlpha(theme.accent, 0.15));
  }, [theme]);

  const rangeLabel = () => {
    if (rangeStart && rangeEnd) {
      const lo = toDateNum(rangeStart) <= toDateNum(rangeEnd) ? rangeStart : rangeEnd;
      const hi = toDateNum(rangeStart) <= toDateNum(rangeEnd) ? rangeEnd   : rangeStart;
      return `${formatShort(lo)} – ${formatShort(hi)}`;
    }
    if (rangeStart && selecting) return `Select end date`;
    return null;
  };

  return (
    <div className={styles.outer}>
      <div className={styles.spiralBar}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className={styles.coil} />
        ))}
      </div>

      <div className={styles.calendar}>
        <div className={styles.hero}>
          <HeroCanvas theme={theme} month={month} year={year} />
          <div className={styles.heroOverlay} />

          <svg
            className={styles.heroShapes}
            viewBox="0 0 500 130"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="0,130 200,28 320,130" fill={theme.accent} opacity="0.93" />
            <polygon points="120,130 340,18 500,130" fill={theme.accentDark} opacity="0.88" />
          </svg>

          <div className={styles.heroBadge}>
            <span className={styles.heroYear}>{year}</span>
            <span className={styles.heroMonth}>{MONTH_LABELS [month].toUpperCase()}</span>
          </div>

          {rangeLabel() && (
            <div className={styles.rangePill}>{rangeLabel()}</div>
          )}

          <div className={styles.heroNav}>
            <button
              className={styles.navBtn}
              onClick={prevMonth}
              aria-label="Previous month"
            >
              ‹
            </button>
            <button
              className={styles.navBtn}
              onClick={nextMonth}
              aria-label="Next month"
            >
              ›
            </button>
          </div>
        </div>

        <ThemeSwitcher activeIndex={themeIndex} onChange={setTheme} />

        <div className={styles.body}>
          <NotesPanel
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            selecting={selecting}
            noteKey={activeNoteKey}
            notes={notes}
            onNoteChange={setNote}
          />

          <div className={styles.gridPanel}>
            <CalendarGrid
              year={year}
              month={month}
              rangeNumbers={rangeNumbers}
              notes={notes}
              onDayClick={handleDayClick}
              onDayHover={handleDayHover}
              onDayLeave={handleDayLeave}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.legend}>
            <LegendItem color={theme.accent} label="Start" />
            <LegendItem color={hexAlpha(theme.accent, 0.25)} label="In range" border={theme.accent} />
            <LegendItem color={theme.accentDark} label="End" />
            <LegendItem color={theme.accent} opacity={0.5} label="Has note" />
          </div>
          <button
            className={styles.clearBtn}
            onClick={clearSelection}
            disabled={!rangeStart}
          >
            Clear selection
          </button>
        </div>
      </div>
    </div>
  );
}

function LegendItem({
  color, label, border, opacity = 1,
}: { color: string; label: string; border?: string; opacity?: number }) {
  return (
    <div className={styles.legendItem}>
      <span
        className={styles.legendDot}
        style={{
          background: color,
          border: border ? `1.5px solid ${border}` : 'none',
          opacity,
        }}
      />
      <span>{label}</span>
    </div>
  );
}

function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
