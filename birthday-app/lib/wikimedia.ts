import type { Celebrity, HistoryEvent } from '@/types';

type WikiBirth = {
  year: number;
  text: string;
  pages: Array<{
    titles: { normalized: string };
    description?: string;
    thumbnail?: { source: string };
    content_urls?: { desktop?: { page: string } };
  }>;
};

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

    return births
      .filter((b) => b.pages && b.pages.length > 0)
      .map((b) => ({
        name: b.pages[0].titles.normalized,
        description: b.pages[0].description || b.text,
        year: b.year,
        thumbnail: b.pages[0].thumbnail?.source,
      }))
      .slice(0, 12);
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
