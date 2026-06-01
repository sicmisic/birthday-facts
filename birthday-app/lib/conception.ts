import type { Holiday, ConceptionContext } from '@/types';

const HARDCODED_EVENTS = [
  { name: "Valentine's Day", month: 1, day: 14 },
  { name: "New Year's Eve", month: 11, day: 31 },
  { name: "Christmas", month: 11, day: 25 },
  { name: "Halloween", month: 9, day: 31 },
  { name: "St. Patrick's Day", month: 2, day: 17 },
];

export function getConceptionDate(birthday: Date): Date {
  const conception = new Date(birthday);
  conception.setDate(conception.getDate() - 266);
  return conception;
}

function daysApart(m1: number, d1: number, m2: number, d2: number): number {
  const base = 2001;
  const date1 = new Date(base, m1, d1);
  const date2 = new Date(base, m2, d2);
  const diff = Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
  return Math.min(diff, 365 - diff);
}

function getSeason(month: number): 'spring' | 'summer' | 'fall' | 'winter' {
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

function getFunMessage(ctx: {
  nearHoliday: string | null;
  nearPublicHoliday: string | null;
  isWeekend: boolean;
  dayOfWeek: number;
  season: 'spring' | 'summer' | 'fall' | 'winter';
}): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  if (ctx.nearHoliday === "Valentine's Day") {
    return "Conceived on Valentine's Day. Your existence was planned... or very unplanned.";
  }
  if (ctx.nearHoliday === "New Year's Eve") {
    return "Your parents rang in the new year in the most festive way possible.";
  }
  if (ctx.nearHoliday === 'Christmas') {
    return "A gift was exchanged that holiday season — and it wasn't under the tree.";
  }
  if (ctx.nearHoliday === 'Halloween') {
    return "Something wicked this way came. Namely, you.";
  }
  if (ctx.nearHoliday === "St. Patrick's Day") {
    return "Someone had a bit too much green beer. You're welcome.";
  }
  if (ctx.nearPublicHoliday) {
    return `It was ${ctx.nearPublicHoliday}. The holiday spirit was clearly in full effect.`;
  }
  if (ctx.isWeekend) {
    return `A ${days[ctx.dayOfWeek]}. No work, no excuses, and apparently no restraint.`;
  }
  if (ctx.season === 'summer') {
    return "Peak summer energy. The heat wasn't just outside.";
  }
  if (ctx.season === 'winter') {
    return "Cold nights, warm company. You do the math.";
  }
  if (ctx.season === 'spring') {
    return "Spring was in the air. And apparently so was something else.";
  }
  if (ctx.season === 'fall') {
    return "A crisp autumn evening led to something... unexpected.";
  }
  return `An unremarkable ${days[ctx.dayOfWeek]}. You were clearly a surprise.`;
}

export function getConceptionContext(conceptionDate: Date, holidays: Holiday[]): ConceptionContext {
  const month = conceptionDate.getMonth(); // 0-indexed
  const day = conceptionDate.getDate();
  const dayOfWeek = conceptionDate.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const season = getSeason(month);

  let nearHoliday: string | null = null;
  for (const event of HARDCODED_EVENTS) {
    if (daysApart(month, day, event.month, event.day) <= 3) {
      nearHoliday = event.name;
      break;
    }
  }

  let nearPublicHoliday: string | null = null;
  if (!nearHoliday) {
    for (const holiday of holidays) {
      const parts = holiday.date.split('-').map(Number);
      const hMonth = parts[1] - 1; // 0-indexed
      const hDay = parts[2];
      if (daysApart(month, day, hMonth, hDay) <= 3) {
        nearPublicHoliday = holiday.name;
        break;
      }
    }
  }

  const funMessage = getFunMessage({ nearHoliday, nearPublicHoliday, isWeekend, dayOfWeek, season });

  const conceptionDateFormatted = conceptionDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    conceptionDate: conceptionDate.toISOString(),
    conceptionDateFormatted,
    nearHoliday,
    nearPublicHoliday,
    isWeekend,
    dayOfWeek,
    season,
    funMessage,
  };
}
