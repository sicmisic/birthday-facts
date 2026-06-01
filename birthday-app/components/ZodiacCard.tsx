import type { ZodiacSign } from '@/types';

interface Props {
  zodiac: ZodiacSign;
}

const ELEMENT_ICON: Record<string, string> = {
  Fire: '🔥',
  Earth: '🌍',
  Air: '💨',
  Water: '💧',
};

export function ZodiacCard({ zodiac }: Props) {
  return (
    <div
      className="glass-card rounded-2xl p-6 flex flex-col items-center text-center h-full"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Glow orb behind symbol */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full blur-3xl pointer-events-none"
        style={{
          width: '120px',
          height: '120px',
          background: zodiac.color,
          opacity: 0.12,
        }}
      />

      {/* Symbol */}
      <div
        className="relative text-7xl leading-none mb-3 select-none"
        style={{ color: zodiac.color, filter: `drop-shadow(0 0 16px ${zodiac.color}60)` }}
      >
        {zodiac.symbol}
      </div>

      {/* Name */}
      <h3
        className="text-2xl font-bold mb-1"
        style={{ color: 'var(--cosmic-text)', fontFamily: 'var(--font-display)' }}
      >
        {zodiac.name}
      </h3>
      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--cosmic-muted)' }}>
        {zodiac.dateRange}
      </p>

      {/* Element */}
      <div
        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full mb-5"
        style={{
          background: `${zodiac.color}18`,
          border: `1px solid ${zodiac.color}35`,
          color: zodiac.color,
        }}
      >
        {ELEMENT_ICON[zodiac.element]} {zodiac.element} Sign
      </div>

      {/* Traits */}
      <div className="flex flex-col gap-2 w-full">
        {zodiac.traits.map((trait) => (
          <div
            key={trait}
            className="flex items-center gap-2 text-sm rounded-lg px-3 py-2"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: 'var(--cosmic-text)',
              fontFamily: 'var(--font-body)',
            }}
          >
            <span style={{ color: 'var(--cosmic-gold)' }}>✦</span>
            {trait}
          </div>
        ))}
      </div>
    </div>
  );
}
