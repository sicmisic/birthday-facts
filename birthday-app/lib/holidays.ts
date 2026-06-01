import type { Holiday } from '@/types';

export async function fetchHolidays(year: number, countryCode: string): Promise<Holiday[]> {
  try {
    const res = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`,
      { next: { revalidate: 60 * 60 * 24 * 30 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
