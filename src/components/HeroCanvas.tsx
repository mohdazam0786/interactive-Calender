'use client';

import { useRef, useEffect } from 'react';
import { Theme } from '@/lib/types';
import styles from './HeroCanvas.module.css';

interface Props {
  theme: Theme;
  month: number;
  year: number;
}

export default function HeroCanvas({ theme, month, year }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (!W || !H) return;
      canvas.width = W;
      canvas.height = H;

      const grad = ctx.createLinearGradient(0, 0, W, H);
      theme.colors.forEach((c, i) => grad.addColorStop(i / (theme.colors.length - 1), c));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.globalAlpha = 0.07;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const y = H * (0.3 + i * 0.15) + Math.sin(t + i) * 12;
        ctx.moveTo(0, y);
        for (let x = 0; x <= W; x += 4) {
          ctx.lineTo(x, y + Math.sin((x / W) * Math.PI * 3 + t + i * 1.1) * 20);
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();
      }
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.1;
      const cx1 = W * 0.2 + Math.sin(t * 0.4) * 20;
      const cy1 = H * 0.35 + Math.cos(t * 0.3) * 15;
      const radGrad1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, W * 0.35);
      radGrad1.addColorStop(0, 'rgba(255,255,255,0.6)');
      radGrad1.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = radGrad1;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      t += 0.008;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [theme, month, year]);

  return <canvas ref={ref} className={styles.canvas} />;
}
