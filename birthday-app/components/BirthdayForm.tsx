'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Sparkles } from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1899 }, (_, i) => CURRENT_YEAR - i);

interface SelectWrapProps {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
}

function CosmicSelect({ value, onChange, children, className = '' }: SelectWrapProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cosmic-select w-full rounded-xl px-4 py-3.5 pr-10 text-sm cursor-pointer focus:outline-none"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {children}
      </select>
      <ChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none size-4"
        style={{ color: 'var(--cosmic-gold)' }}
      />
    </div>
  );
}

export function BirthdayForm() {
  const router = useRouter();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [country, setCountry] = useState('US');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!day || !month || !year) {
      setError('Please fill in your complete birthday.');
      return;
    }

    const monthIndex = MONTHS.indexOf(month);
    const testDate = new Date(parseInt(year), monthIndex, parseInt(day));
    if (testDate.getMonth() !== monthIndex) {
      setError(`${month} doesn't have ${day} days.`);
      return;
    }
    if (testDate > new Date()) {
      setError("That date is in the future — unless you're from there?");
      return;
    }

    const mm = String(monthIndex + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    router.push(`/birthday/${year}-${mm}-${dd}?country=${country}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      {/* Day / Month / Year row */}
      <div className="grid grid-cols-3 gap-2">
        <CosmicSelect value={day} onChange={setDay}>
          <option value="" disabled>Day</option>
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </CosmicSelect>

        <CosmicSelect value={month} onChange={setMonth} className="col-span-1">
          <option value="" disabled>Month</option>
          {MONTHS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </CosmicSelect>

        <CosmicSelect value={year} onChange={setYear}>
          <option value="" disabled>Year</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </CosmicSelect>
      </div>

      {/* Country */}
      <CosmicSelect value={country} onChange={setCountry}>
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </CosmicSelect>

      {error && (
        <p className="text-sm text-center" style={{ color: '#FF8080' }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        className="relative w-full rounded-xl py-4 px-6 text-base font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 overflow-hidden group"
        style={{
          background: 'linear-gradient(135deg, #D4AF37, #F0C566, #D4AF37)',
          backgroundSize: '200% auto',
          color: '#06091A',
          fontFamily: 'var(--font-display)',
          boxShadow: '0 4px 24px rgba(212, 175, 55, 0.35)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundPosition = 'right center';
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            '0 6px 32px rgba(212, 175, 55, 0.55)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundPosition = 'left center';
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            '0 4px 24px rgba(212, 175, 55, 0.35)';
        }}
      >
        <Sparkles className="size-4" />
        Discover Your Birthday Story
      </button>
    </form>
  );
}
