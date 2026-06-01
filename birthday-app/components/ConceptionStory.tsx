import type { ConceptionContext } from '@/types';
import { SectionHeading } from './SectionHeading';

interface Props {
  conception: ConceptionContext;
  conceptionKicker?: string;
}

const SEASON_ICON: Record<string, string> = {
  spring: '🌸',
  summer: '☀️',
  fall: '🍂',
  winter: '❄️',
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function ConceptionStory({ conception, conceptionKicker }: Props) {
  const seasonIcon = SEASON_ICON[conception.season];
  const dayName = DAY_NAMES[conception.dayOfWeek];

  // Layer 1 intro: "You were likely conceived around Wednesday, September 23"
  const cDate = new Date(conception.conceptionDate);
  const introDate = cDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section>
      <SectionHeading
        title="The Night You Were Created"
        subtitle="266 days before your birthday, something happened..."
        ornament="🌙"
      />

      {/* Main story card — three layers */}
      <div
        className="rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden flex flex-col gap-5"
        style={{
          background:
            'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(100,80,20,0.05) 100%)',
          border: '1px solid rgba(212,175,55,0.2)',
        }}
      >
        {/* Decorative quote mark */}
        <div
          className="absolute top-4 left-6 text-6xl leading-none select-none pointer-events-none"
          style={{ color: 'rgba(212,175,55,0.12)', fontFamily: 'var(--font-display)' }}
          aria-hidden
        >
          "
        </div>

        {/* Layer 1: Intro */}
        <p
          className="text-sm pl-4"
          style={{ color: 'var(--cosmic-muted)', fontFamily: 'var(--font-body)' }}
        >
          You were likely conceived around{' '}
          <span style={{ color: 'var(--cosmic-gold-light)' }}>{introDate}</span>.
        </p>

        {/* Layer 2: Holiday / weekend line */}
        <p
          className="relative text-lg md:text-xl leading-relaxed font-medium italic pl-4"
          style={{ color: 'var(--cosmic-text)', fontFamily: 'var(--font-display)' }}
        >
          {conception.funMessage}
        </p>

        {/* Layer 3: Historical event kicker (the punchline) */}
        {conceptionKicker && (
          <>
            <div
              className="h-px"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.25), transparent)',
              }}
            />
            <p
              className="text-sm leading-relaxed pl-4"
              style={{ color: 'var(--cosmic-text)', fontFamily: 'var(--font-body)', opacity: 0.85 }}
            >
              {conceptionKicker}
            </p>
          </>
        )}
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">{seasonIcon}</div>
          <div className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--cosmic-muted)' }}>
            Season
          </div>
          <div
            className="text-sm font-semibold capitalize"
            style={{ color: 'var(--cosmic-text)', fontFamily: 'var(--font-display)' }}
          >
            {conception.season}
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">{conception.isWeekend ? '🎉' : '😴'}</div>
          <div className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--cosmic-muted)' }}>
            Day
          </div>
          <div
            className="text-sm font-semibold"
            style={{ color: 'var(--cosmic-text)', fontFamily: 'var(--font-display)' }}
          >
            {dayName}
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 text-center col-span-2 sm:col-span-1">
          <div className="text-2xl mb-1">📅</div>
          <div className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--cosmic-muted)' }}>
            Conception Date
          </div>
          <div
            className="text-xs font-medium"
            style={{ color: 'var(--cosmic-gold-light)', fontFamily: 'var(--font-body)' }}
          >
            {conception.conceptionDateFormatted}
          </div>
        </div>
      </div>

      {(conception.nearHoliday || conception.nearPublicHoliday) && (
        <div
          className="mt-4 rounded-xl p-4 flex items-center gap-3"
          style={{
            background: 'rgba(212,175,55,0.06)',
            border: '1px solid rgba(212,175,55,0.15)',
          }}
        >
          <span className="text-xl">🎊</span>
          <p className="text-sm" style={{ color: 'var(--cosmic-muted)' }}>
            Conceived near{' '}
            <span style={{ color: 'var(--cosmic-gold-light)' }}>
              {conception.nearHoliday || conception.nearPublicHoliday}
            </span>
          </p>
        </div>
      )}
    </section>
  );
}
