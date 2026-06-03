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

const SITE_URL = 'https://birthday-facts.vercel.app';

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

  const monthDay = birthday.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  const year = birthday.getUTCFullYear();
  const zodiac = getZodiacSign(birthday);
  const canonicalUrl = `${SITE_URL}/birthday/${date}`;

  return {
    title: `${monthDay} Birthday Facts — Celebrities, History & ${zodiac.name} Profile (${year})`,
    description: `Who was born on ${monthDay}? Discover famous celebrities, what happened in history, your ${zodiac.name} zodiac traits, moon phase, and the story of your conception. Everything your birthday says about you — in one dossier.`,
    keywords: [
      `celebrities born on ${monthDay}`,
      `what happened on ${monthDay}`,
      `${monthDay} birthday facts`,
      `born ${formattedDate}`,
      `${monthDay} in history`,
      `${zodiac.name} birthday ${year}`,
      `famous people born ${monthDay}`,
      `who shares my birthday ${monthDay}`,
      `was I an accident born ${monthDay} ${year}`,
      `when was I conceived if born ${monthDay}`,
      `birthday meaning ${monthDay}`,
    ],
    openGraph: {
      title: `${monthDay} Birthday Facts — Celebrities, History & Cosmic Profile`,
      description: `Famous people born on ${monthDay}, historical events, ${zodiac.name} zodiac sign, moon phase, and more. What does your ${year} birthday really say about you?`,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Birthday Facts',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${monthDay} Birthday Facts — Celebrities, History & Zodiac`,
      description: `Born ${formattedDate}? See who shares your birthday, what history was doing, and whether you were an accident.`,
    },
    alternates: {
      canonical: canonicalUrl,
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
  const canonicalUrl = `${SITE_URL}/birthday/${date}`;

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': canonicalUrl,
        url: canonicalUrl,
        name: `${monthDay} Birthday Facts — Celebrities, History & ${zodiac.name} Profile (${yearStr})`,
        description: `Famous people born on ${monthDay}, historical events, ${zodiac.name} zodiac sign, moon phase, and the story of how you came to be in ${yearStr}.`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': SITE_URL,
          name: 'Birthday Facts',
          url: SITE_URL,
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: SITE_URL,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: `${monthDay} Birthday Facts`,
              item: canonicalUrl,
            },
          ],
        },
      },
    ],
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
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
