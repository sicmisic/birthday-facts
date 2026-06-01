import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { fetchBirths, fetchEvents } from '@/lib/wikimedia';
import { fetchHolidays } from '@/lib/holidays';
import { getZodiacSign } from '@/lib/zodiac';
import { getMoonPhase } from '@/lib/moonphase';
import { getConceptionDate, getConceptionContext } from '@/lib/conception';
import { getLifePathNumber } from '@/lib/numerology';

import { StarField } from '@/components/StarField';
import { ConfettiEffect } from '@/components/ConfettiEffect';
import { SectionHeading } from '@/components/SectionHeading';
import { CelebrityCard } from '@/components/CelebrityCard';
import { HistoryEvents } from '@/components/HistoryEvents';
import { ConceptionStory } from '@/components/ConceptionStory';
import { StatsGrid } from '@/components/StatsGrid';
import { ZodiacCard } from '@/components/ZodiacCard';
import { MoonPhaseCard } from '@/components/MoonPhaseCard';
import { ShareButton } from '@/components/ShareButton';

type Props = {
  params: Promise<{ date: string }>;
  searchParams: Promise<{ country?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const birthday = new Date(date + 'T12:00:00Z');
  if (isNaN(birthday.getTime())) return { title: 'Birthday Facts' };

  const formattedDate = birthday.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return {
    title: `Birthday Facts for ${formattedDate}`,
    description: `Celebrities, history, and the truth about how you came to be on ${formattedDate}.`,
    openGraph: {
      title: `Birthday Facts for ${formattedDate}`,
      description: `Find out who shares your birthday, what happened in history, your moon phase, and more!`,
      type: 'website',
    },
  };
}

export default async function BirthdayPage({ params, searchParams }: Props) {
  const { date } = await params;
  const { country = 'US' } = await searchParams;

  const birthday = new Date(date + 'T12:00:00Z');
  if (isNaN(birthday.getTime())) notFound();

  const month = String(birthday.getUTCMonth() + 1).padStart(2, '0');
  const day = String(birthday.getUTCDate()).padStart(2, '0');

  // Parallel data fetch
  const [celebrities, events] = await Promise.all([
    fetchBirths(month, day),
    fetchEvents(month, day),
  ]);

  const conceptionDate = getConceptionDate(birthday);
  const conceptionMonth = String(conceptionDate.getMonth() + 1).padStart(2, '0');
  const conceptionDay = String(conceptionDate.getDate()).padStart(2, '0');

  const [holidays, rawConceptionEvents] = await Promise.all([
    fetchHolidays(conceptionDate.getFullYear(), country),
    fetchEvents(conceptionMonth, conceptionDay),
  ]);
  const conception = getConceptionContext(conceptionDate, holidays);

  // Build event-based kicker (year > 1900 only, most recent first for specificity)
  const goodConceptionEvents = rawConceptionEvents
    .filter((e) => e.year > 1900)
    .sort((a, b) => b.year - a.year)
    .slice(0, 1);

  let conceptionKicker: string | undefined;
  if (goodConceptionEvents.length > 0) {
    const e = goodConceptionEvents[0];
    const text = e.text.replace(/\.$/, '');
    conceptionKicker =
      text.length < 90
        ? `Meanwhile, in ${e.year}: ${text}. The world had no idea what else was about to happen.`
        : `While your parents were busy, the world was dealing with ${text.charAt(0).toLowerCase() + text.slice(1)} (${e.year}).`;
  }

  const zodiac = getZodiacSign(birthday);
  const moonPhase = getMoonPhase(birthday);
  const lifePathResult = getLifePathNumber(date);

  const today = new Date();
  const ageInDays = Math.max(0, Math.floor((today.getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24)));
  const heartbeats = Math.round(ageInDays * 24 * 60 * 60 * 1.2);
  const lifeExpectancy = 72 * 365;
  const lifePercentLived = ((ageInDays / lifeExpectancy) * 100).toFixed(1);
  const worldPopulation = 8_100_000_000;
  const peopleShareBirthday = Math.round(worldPopulation / 365);

  // Days until next birthday
  const nextBirthday = new Date(today.getUTCFullYear(), birthday.getUTCMonth(), birthday.getUTCDate());
  if (nextBirthday <= today) nextBirthday.setFullYear(today.getFullYear() + 1);
  const nextBirthdayDays = Math.ceil(
    (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const stats = {
    ageInDays,
    heartbeats,
    lifePercentLived,
    peopleShareBirthday,
    lifePathNumber: lifePathResult.number,
    lifePathMeaning: lifePathResult.meaning,
    nextBirthdayDays,
  };

  const formattedDate = birthday.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  const dayName = birthday.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
  const monthDay = birthday.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const yearStr = birthday.getUTCFullYear().toString();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <StarField />
      <ConfettiEffect />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10">
        {/* Nav */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors hover:opacity-80"
          style={{ color: 'var(--cosmic-muted)', fontFamily: 'var(--font-body)' }}
        >
          ← Back to Home
        </Link>

        {/* ── HERO ── */}
        <section className="mb-20 text-center">
          <p
            className="text-sm uppercase tracking-[0.25em] mb-4"
            style={{ color: 'var(--cosmic-gold)', fontFamily: 'var(--font-body)' }}
          >
            ✦ Your Birthday Dossier ✦
          </p>
          <p
            className="text-lg mb-3"
            style={{ color: 'var(--cosmic-muted)', fontFamily: 'var(--font-body)' }}
          >
            You were born on
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black italic leading-tight gold-gradient-text mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {dayName},
            <br />
            {monthDay}
          </h1>
          <p
            className="text-2xl font-semibold mb-8"
            style={{ color: 'var(--cosmic-text)', fontFamily: 'var(--font-display)' }}
          >
            {yearStr}
          </p>

          {/* Zodiac + Moon quick pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm"
              style={{
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.25)',
                color: 'var(--cosmic-gold-light)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {zodiac.symbol} {zodiac.name}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm"
              style={{
                background: 'rgba(180,200,255,0.08)',
                border: '1px solid rgba(180,200,255,0.2)',
                color: '#B8D4FF',
                fontFamily: 'var(--font-body)',
              }}
            >
              {moonPhase.emoji} {moonPhase.name}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--cosmic-muted)',
                fontFamily: 'var(--font-body)',
              }}
            >
              🔢 Life Path {lifePathResult.number}
            </span>
          </div>
        </section>

        <div className="section-divider mb-16" />

        {/* ── CELEBRITIES ── */}
        {celebrities.length > 0 && (
          <section className="mb-16">
            <SectionHeading
              title="Your Celestial Companions"
              subtitle={`${celebrities.length} notable people share your birthday`}
              ornament="⭐"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {celebrities.map((celebrity, i) => (
                <CelebrityCard key={i} celebrity={celebrity} />
              ))}
            </div>
          </section>
        )}

        <div className="section-divider mb-16" />

        {/* ── HISTORY ── */}
        {events.length > 0 && (
          <section className="mb-16">
            <HistoryEvents events={events} />
          </section>
        )}

        <div className="section-divider mb-16" />

        {/* ── CONCEPTION ── */}
        <section className="mb-16">
          <ConceptionStory conception={conception} conceptionKicker={conceptionKicker} />
        </section>

        <div className="section-divider mb-16" />

        {/* ── STATS ── */}
        <section className="mb-16">
          <StatsGrid stats={stats} />
        </section>

        <div className="section-divider mb-16" />

        {/* ── ZODIAC + MOON ── */}
        <section className="mb-16">
          <SectionHeading
            title="Written in the Stars"
            subtitle="Your cosmic fingerprint at the moment of birth"
            ornament="🌌"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ZodiacCard zodiac={zodiac} />
            <MoonPhaseCard moonPhase={moonPhase} />
          </div>
        </section>

        <div className="section-divider mb-16" />

        {/* ── SHARE ── */}
        <section className="mb-16 text-center">
          <SectionHeading
            title="Share Your Dossier"
            subtitle="Let the world know what your birthday says about you"
            ornament="🔗"
          />
          <ShareButton date={date} formattedDate={formattedDate} />
        </section>

        {/* Footer */}
        <footer
          className="text-center text-xs pb-8"
          style={{ color: 'var(--cosmic-muted)', fontFamily: 'var(--font-body)' }}
        >
          <p>
            Data from{' '}
            <a
              href="https://api.wikimedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              Wikimedia
            </a>{' '}
            &amp;{' '}
            <a
              href="https://date.nager.at"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              Nager.Date
            </a>
            . No accounts. No tracking.
          </p>
        </footer>
      </div>
    </div>
  );
}
