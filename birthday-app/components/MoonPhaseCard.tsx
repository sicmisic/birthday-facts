import type { MoonPhaseResult } from '@/types';

interface Props {
  moonPhase: MoonPhaseResult;
}

const PHASE_DESCRIPTIONS: Record<string, string> = {
  'New Moon': 'A time of new beginnings, intentions, and inner reflection.',
  'Waxing Crescent': 'Seeds of intention set, energy building toward growth.',
  'First Quarter': 'Momentum and action — challenges overcome with determination.',
  'Waxing Gibbous': 'Refinement and effort, almost at peak illumination.',
  'Full Moon': 'Peak energy, heightened emotions, and illumination of truth.',
  'Waning Gibbous': 'Gratitude and sharing — giving back what the full moon revealed.',
  'Last Quarter': 'Release and forgiveness — letting go to make room for new.',
  'Waning Crescent': 'Rest, surrender, and quiet wisdom before the next cycle.',
};

export function MoonPhaseCard({ moonPhase }: Props) {
  const description = PHASE_DESCRIPTIONS[moonPhase.name] || '';
  const pct = moonPhase.illumination;

  return (
    <div
      className="glass-card rounded-2xl p-6 flex flex-col items-center text-center h-full"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Blue glow behind moon */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full blur-3xl pointer-events-none"
        style={{
          width: '120px',
          height: '120px',
          background: 'rgba(180,200,255,0.25)',
          opacity: 0.6,
        }}
      />

      {/* Moon emoji */}
      <div
        className="relative text-8xl leading-none mb-3 select-none"
        style={{ filter: 'drop-shadow(0 0 20px rgba(200,220,255,0.5))' }}
      >
        {moonPhase.emoji}
      </div>

      {/* Name */}
      <h3
        className="text-2xl font-bold mb-1"
        style={{ color: 'var(--cosmic-text)', fontFamily: 'var(--font-display)' }}
      >
        {moonPhase.name}
      </h3>

      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--cosmic-muted)' }}>
        Moon Phase at Birth
      </p>

      {/* Illumination bar */}
      <div className="w-full mb-5">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--cosmic-muted)' }}>
          <span>Illumination</span>
          <span style={{ color: 'var(--cosmic-gold)' }}>{pct}%</span>
        </div>
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(to right, #B8D4FF, #FFFFFF)',
              boxShadow: '0 0 8px rgba(200,220,255,0.6)',
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{
          background: 'rgba(180,200,255,0.05)',
          border: '1px solid rgba(180,200,255,0.1)',
          color: 'var(--cosmic-text)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {description}
      </div>
    </div>
  );
}
