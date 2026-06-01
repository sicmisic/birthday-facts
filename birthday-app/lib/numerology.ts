const MEANINGS: Record<number, string> = {
  1: 'The Leader — independent, driven, and original',
  2: 'The Mediator — intuitive, sensitive, and cooperative',
  3: 'The Communicator — creative, expressive, and social',
  4: 'The Builder — disciplined, practical, and grounded',
  5: 'The Adventurer — dynamic, freedom-loving, and versatile',
  6: 'The Nurturer — caring, responsible, and harmonious',
  7: 'The Seeker — analytical, spiritual, and introspective',
  8: 'The Powerhouse — ambitious, authoritative, and pragmatic',
  9: 'The Humanitarian — compassionate, wise, and idealistic',
  11: 'The Illuminator — intuitive, visionary, and inspirational (Master Number)',
  22: 'The Master Builder — ambitious, disciplined, and transformative (Master Number)',
  33: 'The Master Teacher — compassionate, nurturing, and wise (Master Number)',
};

export function getLifePathNumber(dateStr: string): { number: number; meaning: string } {
  const digits = dateStr.replace(/-/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum)
      .split('')
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }

  return {
    number: sum,
    meaning: MEANINGS[sum] || 'A unique and winding path',
  };
}
