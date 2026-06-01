interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  ornament?: string;
}

export function SectionHeading({ title, subtitle, ornament = '✦' }: SectionHeadingProps) {
  return (
    <div className="mb-8 md:mb-10">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(212,175,55,0.5)]" />
        <span
          className="text-xs uppercase tracking-[0.25em]"
          style={{ color: 'var(--cosmic-gold)', fontFamily: 'var(--font-body)' }}
        >
          {ornament}
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(212,175,55,0.5)]" />
      </div>
      <h2
        className="text-3xl md:text-4xl font-bold"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--cosmic-text)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm md:text-base" style={{ color: 'var(--cosmic-muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
