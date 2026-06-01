import type { ZodiacSign } from '@/types';

const SIGNS: ZodiacSign[] = [
  {
    name: 'Aries',
    symbol: '♈',
    dateRange: 'Mar 21 – Apr 19',
    traits: ['Courageous', 'Energetic', 'Adventurous'],
    element: 'Fire',
    color: '#FF6B6B',
  },
  {
    name: 'Taurus',
    symbol: '♉',
    dateRange: 'Apr 20 – May 20',
    traits: ['Reliable', 'Patient', 'Devoted'],
    element: 'Earth',
    color: '#4ECDC4',
  },
  {
    name: 'Gemini',
    symbol: '♊',
    dateRange: 'May 21 – Jun 20',
    traits: ['Adaptable', 'Curious', 'Witty'],
    element: 'Air',
    color: '#FFE66D',
  },
  {
    name: 'Cancer',
    symbol: '♋',
    dateRange: 'Jun 21 – Jul 22',
    traits: ['Intuitive', 'Emotional', 'Protective'],
    element: 'Water',
    color: '#C3B1E1',
  },
  {
    name: 'Leo',
    symbol: '♌',
    dateRange: 'Jul 23 – Aug 22',
    traits: ['Confident', 'Creative', 'Generous'],
    element: 'Fire',
    color: '#F0C566',
  },
  {
    name: 'Virgo',
    symbol: '♍',
    dateRange: 'Aug 23 – Sep 22',
    traits: ['Analytical', 'Practical', 'Diligent'],
    element: 'Earth',
    color: '#95E1A3',
  },
  {
    name: 'Libra',
    symbol: '♎',
    dateRange: 'Sep 23 – Oct 22',
    traits: ['Diplomatic', 'Charming', 'Social'],
    element: 'Air',
    color: '#F8BBD9',
  },
  {
    name: 'Scorpio',
    symbol: '♏',
    dateRange: 'Oct 23 – Nov 21',
    traits: ['Passionate', 'Resourceful', 'Brave'],
    element: 'Water',
    color: '#FF8C69',
  },
  {
    name: 'Sagittarius',
    symbol: '♐',
    dateRange: 'Nov 22 – Dec 21',
    traits: ['Adventurous', 'Optimistic', 'Philosophical'],
    element: 'Fire',
    color: '#9B59B6',
  },
  {
    name: 'Capricorn',
    symbol: '♑',
    dateRange: 'Dec 22 – Jan 19',
    traits: ['Ambitious', 'Disciplined', 'Patient'],
    element: 'Earth',
    color: '#7F8C8D',
  },
  {
    name: 'Aquarius',
    symbol: '♒',
    dateRange: 'Jan 20 – Feb 18',
    traits: ['Independent', 'Innovative', 'Humanitarian'],
    element: 'Air',
    color: '#3498DB',
  },
  {
    name: 'Pisces',
    symbol: '♓',
    dateRange: 'Feb 19 – Mar 20',
    traits: ['Empathetic', 'Intuitive', 'Artistic'],
    element: 'Water',
    color: '#1ABC9C',
  },
];

export function getZodiacSign(date: Date): ZodiacSign {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return SIGNS[9]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return SIGNS[10]; // Aquarius
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return SIGNS[11]; // Pisces
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return SIGNS[0]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return SIGNS[1]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return SIGNS[2]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return SIGNS[3]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return SIGNS[4]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return SIGNS[5]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return SIGNS[6]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return SIGNS[7]; // Scorpio
  return SIGNS[8]; // Sagittarius: Nov 22 - Dec 21
}
