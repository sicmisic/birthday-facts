import { BirthdayForm } from '@/components/BirthdayForm';
import { StarField } from '@/components/StarField';
import Link from 'next/link';

const TEASERS = [
  {
    emoji: '🌟',
    title: 'Your Famous Companions',
    body: 'Discover which celebrities, scientists, and legends were born on your exact date.',
  },
  {
    emoji: '🌙',
    title: 'Were You an Accident?',
    body: 'We calculated your conception date. The answer might surprise you.',
  },
  {
    emoji: '📜',
    title: 'History Began With You',
    body: 'Explore every major event that happened on your birthday throughout history.',
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <StarField />

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Wordmark */}
        <div
          className="mb-12 flex items-center gap-2 text-xs uppercase tracking-[0.3em]"
          style={{ color: 'var(--cosmic-gold)', fontFamily: 'var(--font-body)' }}
        >
          <span>✦</span>
          <span>Birthday Facts</span>
          <span>✦</span>
        </div>

        {/* Headline */}
        <div className="text-center mb-4 max-w-2xl">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-black italic leading-[1.05] gold-gradient-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What does your
            <br />
            birthday say
            <br />
            about you?
          </h1>
        </div>

        <p
          className="text-center text-base md:text-lg max-w-md mb-12 leading-relaxed"
          style={{ color: 'var(--cosmic-muted)', fontFamily: 'var(--font-body)' }}
        >
          Celebrities, history, your conception story, zodiac, moon phase, and more — all in one
          dossier.
        </p>

        {/* Form card */}
        <div className="w-full max-w-md">
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow:
                '0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            <p
              className="text-sm font-medium mb-4 text-center"
              style={{ color: 'var(--cosmic-muted)', fontFamily: 'var(--font-body)' }}
            >
              Enter your birthday to begin
            </p>
            <BirthdayForm />
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="mt-16 flex flex-col items-center gap-2 animate-bounce"
          style={{ color: 'var(--cosmic-muted)' }}
        >
          <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-body)' }}>
            Preview
          </span>
          <span className="text-lg">↓</span>
        </div>
      </main>

      {/* Teaser section */}
      <section className="relative z-10 px-4 pb-24 max-w-5xl mx-auto w-full">
        <div
          className="h-px mb-16"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.35), transparent)',
          }}
        />

        <p
          className="text-center text-xs uppercase tracking-[0.3em] mb-10"
          style={{ color: 'var(--cosmic-gold)', fontFamily: 'var(--font-body)' }}
        >
          ✦ What you&apos;ll discover ✦
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEASERS.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl p-6 text-center"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="text-4xl mb-4">{t.emoji}</div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--cosmic-text)', fontFamily: 'var(--font-display)' }}
              >
                {t.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--cosmic-muted)', fontFamily: 'var(--font-body)' }}
              >
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 text-center pb-8 text-xs"
        style={{ color: 'var(--cosmic-muted)', fontFamily: 'var(--font-body)' }}
      >
        <p>All data from Wikimedia &amp; public APIs. No accounts. No tracking.</p>
      </footer>
    </div>
  );
}
