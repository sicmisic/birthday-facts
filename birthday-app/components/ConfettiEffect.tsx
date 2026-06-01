'use client';
import { useEffect, useState } from 'react';

const COLORS = ['#D4AF37', '#F0C566', '#FF6B6B', '#4ECDC4', '#A855F7', '#EC4899', '#60A5FA'];

function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export function ConfettiEffect() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setActive(false), 5500);
    return () => clearTimeout(t);
  }, []);

  if (!active) return null;

  const rand = lcg(777);
  const particles = Array.from({ length: 70 }, (_, i) => {
    const color = COLORS[Math.floor(rand() * COLORS.length)];
    const x = rand() * 100;
    const size = rand() * 9 + 4;
    const duration = (rand() * 3 + 2.5).toFixed(2);
    const delay = (rand() * 2.5).toFixed(2);
    const isCircle = rand() > 0.6;
    const isLong = !isCircle && rand() > 0.5;
    const rotate = Math.floor(rand() * 360);
    return { id: i, color, x, size, duration, delay, isCircle, isLong, rotate };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '-12px',
            width: p.isLong ? p.size * 2.5 : p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.isCircle ? '50%' : '2px',
            transform: `rotate(${p.rotate}deg)`,
            animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}
