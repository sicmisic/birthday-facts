import type { MoonPhaseResult } from '@/types';

function julianDate(date: Date): number {
  let Y = date.getUTCFullYear();
  let M = date.getUTCMonth() + 1;
  const D = date.getUTCDate();
  if (M <= 2) {
    Y--;
    M += 12;
  }
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5;
}

export function getMoonPhase(date: Date): MoonPhaseResult {
  const JD = julianDate(date);
  // Jan 6, 2000 at 18:14 UTC was a new moon (JD 2451549.5)
  const knownNewMoon = 2451549.5;
  const synodicMonth = 29.53058867;
  const daysSinceNew = JD - knownNewMoon;
  const phase = ((daysSinceNew % synodicMonth) + synodicMonth) % synodicMonth;
  const normalized = phase / synodicMonth;
  const illumination = Math.round((normalized < 0.5 ? normalized * 2 : (1 - normalized) * 2) * 100);

  if (normalized < 0.0625 || normalized >= 0.9375) {
    return { phase: normalized, name: 'New Moon', emoji: '🌑', illumination };
  } else if (normalized < 0.1875) {
    return { phase: normalized, name: 'Waxing Crescent', emoji: '🌒', illumination };
  } else if (normalized < 0.3125) {
    return { phase: normalized, name: 'First Quarter', emoji: '🌓', illumination };
  } else if (normalized < 0.4375) {
    return { phase: normalized, name: 'Waxing Gibbous', emoji: '🌔', illumination };
  } else if (normalized < 0.5625) {
    return { phase: normalized, name: 'Full Moon', emoji: '🌕', illumination };
  } else if (normalized < 0.6875) {
    return { phase: normalized, name: 'Waning Gibbous', emoji: '🌖', illumination };
  } else if (normalized < 0.8125) {
    return { phase: normalized, name: 'Last Quarter', emoji: '🌗', illumination };
  } else {
    return { phase: normalized, name: 'Waning Crescent', emoji: '🌘', illumination };
  }
}
