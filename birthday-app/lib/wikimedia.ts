import type { Celebrity, HistoryEvent } from '@/types';

type WikiBirth = {
  year: number;
  text: string;
  pages: Array<{
    titles: { normalized: string };
    description?: string;
    thumbnail?: { source: string };
    extract?: string;
    content_urls?: { desktop?: { page: string } };
  }>;
};

function rankBirths(births: WikiBirth[]): WikiBirth[] {
  return births
    .filter((b) => b.pages?.[0]?.thumbnail?.source) // no photo = not famous enough
    .map((b) => ({
      ...b,
      _score:
        (b.pages?.[0]?.thumbnail ? 10 : 0) +
        (b.pages?.[0]?.description ? 5 : 0) +
        ((b.pages?.[0]?.extract?.length ?? 0) / 100) +
        (b.year && b.year > 1900 ? 2 : 0),
    }))
    .sort((a, b) => (b as typeof b & { _score: number })._score - (a as typeof a & { _score: number })._score)
    .slice(0, 12);
}

type WikiEvent = {
  year: number;
  text: string;
  pages: Array<{
    titles: { normalized: string };
    description?: string;
    thumbnail?: { source: string };
  }>;
};

const HEADERS = {
  'User-Agent': 'BirthdayFacts/1.0 (contact@birthday-facts.app)',
  Accept: 'application/json',
};

export async function fetchBirths(month: string, day: string): Promise<Celebrity[]> {
  try {
    const res = await fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`,
      { headers: HEADERS, next: { revalidate: 60 * 60 * 24 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const births: WikiBirth[] = data.births || [];
    const ranked = rankBirths(births);

    return ranked.map((b) => ({
      name: b.pages[0].titles.normalized,
      description: b.pages[0].description || b.text,
      year: b.year,
      thumbnail: b.pages[0].thumbnail?.source,
    }));
  } catch {
    return [];
  }
}

export async function fetchEvents(month: string, day: string): Promise<HistoryEvent[]> {
  try {
    const res = await fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${month}/${day}`,
      { headers: HEADERS, next: { revalidate: 60 * 60 * 24 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const events: WikiEvent[] = data.events || [];

    return events.slice(0, 8).map((e) => ({
      year: e.year,
      text: e.text,
      pages: e.pages,
    }));
  } catch {
    return [];
  }
}
