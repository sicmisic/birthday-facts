import type { BirthdayStats } from '@/types';
import { SectionHeading } from './SectionHeading';

interface Props {
  stats: BirthdayStats;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

interface StatCardProps {
  emoji: string;
  value: string | number;
  label: string;
  sublabel?: string;
  accent?: boolean;
}

function StatCard({ emoji, value, label, sublabel, accent }: StatCardProps) {
  return (
    <div
      className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col gap-2"
      style={
        accent
          ? {
              border: '1px solid rgba(212,175,55,0.25)',
              background: 'rgba(212,175,55,0.06)',
            }
          : undefined
      }
    >
      <span className="text-2xl">{emoji}</span>
      <div>
        <div
          className="text-2xl md:text-3xl font-bold leading-none"
          style={{
            color: accent ? 'var(--cosmic-gold)' : 'var(--cosmic-text)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {typeof value === 'number' ? formatNumber(value) : value}
        </div>
        <div
          className="text-xs uppercase tracking-wide mt-1.5"
          style={{ color: 'var(--cosmic-muted)' }}
        >
          {label}
        </div>
        {sublabel && (
          <div className="text-xs mt-0.5" style={{ color: 'var(--cosmic-muted)', opacity: 0.7 }}>
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
}

export function StatsGrid({ stats }: Props) {
  return (
    <section>
      <SectionHeading
        title="By The Numbers"
        subtitle="The raw data of your existence"
        ornament="🔢"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          emoji="🌍"
          value={stats.peopleShareBirthday}
          label="people share your birthday"
          sublabel="~1/365 of the world"
        />
        <StatCard
          emoji="📅"
          value={stats.ageInDays.toLocaleString()}
          label="days you've been alive"
          sublabel={`${(stats.ageInDays / 365.25).toFixed(1)} years`}
        />
        <StatCard
          emoji="💓"
          value={stats.heartbeats}
          label="heartbeats since birth"
          sublabel="at ~1.2 beats/sec avg"
        />
        <StatCard
          emoji="⏳"
          value={`${stats.lifePercentLived}%`}
          label="of average life lived"
          sublabel="based on 72yr expectancy"
        />
        <StatCard
          emoji="🔢"
          value={stats.lifePathNumber}
          label="life path number"
          sublabel={stats.lifePathMeaning.split(' — ')[0]}
          accent
        />
        {stats.nextBirthdayDays > 0 && (
          <StatCard
            emoji="🎂"
            value={stats.nextBirthdayDays}
            label="days until next birthday"
            sublabel="mark your calendar"
          />
        )}
      </div>

      {/* Life path meaning */}
      <div
        className="mt-4 rounded-xl p-4"
        style={{
          background: 'rgba(212,175,55,0.05)',
          border: '1px solid rgba(212,175,55,0.15)',
        }}
      >
        <span
          className="text-xs uppercase tracking-widest mr-2"
          style={{ color: 'var(--cosmic-gold)' }}
        >
          Life Path {stats.lifePathNumber}
        </span>
        <span className="text-sm" style={{ color: 'var(--cosmic-text)', fontFamily: 'var(--font-body)' }}>
          {stats.lifePathMeaning}
        </span>
      </div>
    </section>
  );
}
