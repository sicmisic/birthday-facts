import type { HistoryEvent } from '@/types';
import { SectionHeading } from './SectionHeading';

interface Props {
  events: HistoryEvent[];
}

export function HistoryEvents({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <section>
      <SectionHeading
        title="This Day in History"
        subtitle="What the world was busy with on your birthday"
        ornament="📜"
      />

      <div className="flex flex-col gap-4">
        {events.map((event, i) => (
          <div
            key={i}
            className="glass-card glass-card-hover rounded-xl p-5 flex gap-4 items-start"
          >
            {/* Year */}
            <div
              className="shrink-0 rounded-lg px-3 py-2 text-center min-w-[60px]"
              style={{
                background: 'rgba(212,175,55,0.12)',
                border: '1px solid rgba(212,175,55,0.25)',
              }}
            >
              <span
                className="text-sm font-bold block"
                style={{ color: 'var(--cosmic-gold)', fontFamily: 'var(--font-display)' }}
              >
                {event.year}
              </span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--cosmic-text)', fontFamily: 'var(--font-body)' }}
              >
                {event.text}
              </p>
              {event.pages && event.pages[0]?.description && (
                <p className="text-xs mt-1" style={{ color: 'var(--cosmic-muted)' }}>
                  {event.pages[0].description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
