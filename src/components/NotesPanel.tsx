'use client';

import styles from './NotesPanel.module.css';
import { CalDate, formatShort } from '@/lib/types';

interface Props {
  rangeStart:    CalDate | null;
  rangeEnd:      CalDate | null;
  selecting:     boolean;
  noteKey:       string;
  notes:         Record<string, string>;
  onNoteChange:  (key: string, val: string) => void;
}

const NOTE_LINES = 9;

export default function NotesPanel({
  rangeStart, rangeEnd, selecting, noteKey, notes, onNoteChange,
}: Props) {

  const rangeLabel = () => {
    if (rangeStart && rangeEnd) {
      return `${formatShort(rangeStart)} → ${formatShort(rangeEnd)}`;
    }
    if (rangeStart && selecting) {
      return `From ${formatShort(rangeStart)}…`;
    }
    return null;
  };

  const label = rangeLabel();

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>Notes</span>
        {label && <span className={styles.rangeLabel}>{label}</span>}
      </div>

      <div className={styles.linesWrap}>
        {Array.from({ length: NOTE_LINES }).map((_, i) => (
          <div key={i} className={styles.line} />
        ))}
        <textarea
          className={styles.textarea}
          value={notes[noteKey] ?? ''}
          onChange={e => onNoteChange(noteKey, e.target.value)}
          placeholder={rangeStart && rangeEnd ? 'Notes for this range…' : 'Monthly notes…'}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
