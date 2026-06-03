import { BirthdayForm } from '@/components/BirthdayForm';
import { StarField } from '@/components/StarField';
import AdUnit from "@/components/AdUnit";

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

const FAQ_ITEMS = [
  {
    question: 'Was I an accident?',
    answer:
      'Probably not — but the timing might raise an eyebrow. Most births happen roughly 9 months after conception, which often lands near a holiday, long weekend, or suspiciously romantic event. Birthday Facts calculates your exact conception date and reveals what was happening in the world at that moment. The results are almost always hilarious.',
  },
  {
    question: 'When was I conceived / created?',
    answer:
      'You were likely conceived approximately 266 days (38 weeks) before your birthday. Birthday Facts calculates this date and cross-references it against world events, holidays, and historical moments — so you can see exactly what was happening when your existence began.',
  },
  {
    question: 'Which celebrities were born on my birthday?',
    answer:
      'Hundreds of famous people share any given birthday. Birthday Facts pulls from Wikipedia\'s database to surface the most notable celebrities, scientists, athletes, musicians, and historical figures born on your exact date — ranked by fame and filtered to the top 12 most recognizable names.',
  },
  {
    question: 'What happened in history on my birthday?',
    answer:
      'Every date is packed with events — wars, discoveries, elections, disasters, and breakthroughs. Birthday Facts fetches real historical events from Wikipedia that occurred on your birth month and day across all of recorded history, letting you see what the world was writing on the day you arrived.',
  },
  {
    question: 'What does my birthday mean?',
    answer:
      'Your birthday determines your zodiac sign, the moon phase at the exact moment of your birth, and your numerology life path number. Each carries a different lens on your personality, tendencies, and strengths. Birthday Facts combines all three into a single cosmic profile unique to your date.',
  },
  {
    question: 'How many people share my birthday?',
    answer:
      'Statistically, about 22 million people worldwide share your exact birthday — roughly 1 in 365 of the global population. Leap-day babies are a far rarer club. Birthday Facts surfaces this number alongside other eye-opening statistics about your place in the grand timeline.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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

        <div className="section-divider mb-16" />
        <AdUnit slot="1234567890" />
        <div className="section-divider mb-16" />

        {/* FAQ section */}
        <section
          className="relative z-10 px-4 pb-28 max-w-3xl mx-auto w-full"
          aria-label="Frequently asked questions about birthdays"
        >
          <div
            className="h-px mb-16"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.35), transparent)',
            }}
          />

          <p
            className="text-center text-xs uppercase tracking-[0.3em] mb-6"
            style={{ color: 'var(--cosmic-gold)', fontFamily: 'var(--font-body)' }}
          >
            ✦ Questions ✦
          </p>

          <h2
            className="text-3xl sm:text-4xl font-black italic text-center mb-12 gold-gradient-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your Questions, Answered
          </h2>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: 'var(--cosmic-gold-light)', fontFamily: 'var(--font-display)' }}
                >
                  {item.question}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--cosmic-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {item.answer}
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
    </>
  );
}
