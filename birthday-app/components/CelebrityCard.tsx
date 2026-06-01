import Image from 'next/image';
import type { Celebrity } from '@/types';

interface Props {
  celebrity: Celebrity;
}

export function CelebrityCard({ celebrity }: Props) {
  return (
    <div className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col gap-3">
      {/* Photo */}
      <div className="relative mx-auto">
        {celebrity.thumbnail ? (
          <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-[rgba(212,175,55,0.3)]">
            <Image
              src={celebrity.thumbnail}
              alt={celebrity.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        ) : (
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl ring-2 ring-[rgba(212,175,55,0.2)]"
            style={{ background: 'rgba(212,175,55,0.1)' }}
          >
            ✦
          </div>
        )}
        {/* Year badge */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-semibold rounded-full px-2 py-0.5 whitespace-nowrap"
          style={{
            background: 'rgba(212,175,55,0.15)',
            border: '1px solid rgba(212,175,55,0.35)',
            color: 'var(--cosmic-gold-light)',
            fontFamily: 'var(--font-body)',
          }}
        >
          b. {celebrity.year}
        </div>
      </div>

      {/* Info */}
      <div className="mt-2 text-center">
        <p
          className="font-semibold text-sm leading-tight mb-1"
          style={{ color: 'var(--cosmic-text)', fontFamily: 'var(--font-display)' }}
        >
          {celebrity.name}
        </p>
        <p
          className="text-xs leading-relaxed line-clamp-2"
          style={{ color: 'var(--cosmic-muted)' }}
        >
          {celebrity.description}
        </p>
      </div>
    </div>
  );
}
