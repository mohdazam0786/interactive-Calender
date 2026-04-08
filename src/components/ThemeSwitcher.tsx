'use client';

import styles from './ThemeSwitcher.module.css';
import { THEMES } from '@/lib/types';

interface Props {
  activeIndex: number;
  onChange:    (idx: number) => void;
}

export default function ThemeSwitcher({ activeIndex, onChange }: Props) {
  return (
    <div className={styles.row}>
      {THEMES.map((t, i) => (
        <button
          key={t.name}
          className={`${styles.chip} ${i === activeIndex ? styles.active : ''}`}
          onClick={() => onChange(i)}
          style={i === activeIndex ? { backgroundColor: t.accent, borderColor: t.accent, color: '#fff' } : {}}
        >
          <span
            className={styles.dot}
            style={{ background: t.accent }}
          />
          {t.name}
        </button>
      ))}
    </div>
  );
}
