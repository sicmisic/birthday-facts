export interface Celebrity {
  name: string;
  description: string;
  year: number;
  thumbnail?: string;
}

export interface HistoryEvent {
  year: number;
  text: string;
  pages?: Array<{
    titles: { normalized: string };
    description?: string;
    thumbnail?: { source: string };
  }>;
}

export interface ZodiacSign {
  name: string;
  symbol: string;
  dateRange: string;
  traits: string[];
  element: string;
  color: string;
}

export interface MoonPhaseResult {
  phase: number;
  name: string;
  emoji: string;
  illumination: number;
}

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  types: string[];
}

export interface ConceptionContext {
  conceptionDate: string;
  conceptionDateFormatted: string;
  nearHoliday: string | null;
  nearPublicHoliday: string | null;
  isWeekend: boolean;
  dayOfWeek: number;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  funMessage: string;
}

export interface BirthdayStats {
  ageInDays: number;
  heartbeats: number;
  lifePercentLived: string;
  peopleShareBirthday: number;
  lifePathNumber: number;
  lifePathMeaning: string;
  nextBirthdayDays: number;
}
