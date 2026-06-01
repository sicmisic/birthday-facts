// Deterministic star field using seeded LCG — no hydration mismatch
function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export function StarField() {
  const rand = lcg(42);
  const stars = Array.from({ length: 180 }, (_, i) => {
    const x = rand() * 100;
    const y = rand() * 100;
    const r = rand() * 1.6 + 0.2;
    const opacity = rand() * 0.65 + 0.1;
    const twinkle = rand() > 0.75;
    const twinkleDuration = (rand() * 4 + 2).toFixed(1);
    const twinkleDelay = (rand() * 6).toFixed(1);
    return { id: i, x, y, r, opacity, twinkle, twinkleDuration, twinkleDelay };
  });

  // A few "bright" accent stars
  const brightStars = Array.from({ length: 12 }, (_, i) => {
    const x = rand() * 100;
    const y = rand() * 100;
    return { id: `b${i}`, x, y };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {/* Nebula gradient blobs */}
      <div
        className="absolute rounded-full blur-[120px] opacity-20"
        style={{
          width: '600px',
          height: '400px',
          top: '-10%',
          right: '-5%',
          background: 'radial-gradient(ellipse, rgba(100,140,255,0.6) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-[160px] opacity-15"
        style={{
          width: '500px',
          height: '500px',
          bottom: '5%',
          left: '-10%',
          background: 'radial-gradient(ellipse, rgba(180,100,255,0.5) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-[200px] opacity-10"
        style={{
          width: '700px',
          height: '300px',
          top: '50%',
          left: '20%',
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.4) 0%, transparent 70%)',
        }}
      />

      {/* Star SVG */}
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
      >
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.r}
            fill="white"
            opacity={star.opacity}
            style={
              star.twinkle
                ? {
                    animation: `twinkle ${star.twinkleDuration}s ${star.twinkleDelay}s ease-in-out infinite`,
                  }
                : undefined
            }
          />
        ))}
        {brightStars.map((star) => (
          <g key={star.id}>
            <circle cx={`${star.x}%`} cy={`${star.y}%`} r={2.5} fill="white" opacity={0.9} />
            <circle
              cx={`${star.x}%`}
              cy={`${star.y}%`}
              r={6}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={1}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
