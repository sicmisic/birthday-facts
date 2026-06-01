'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  date: string;
  formattedDate: string;
}

export function ShareButton({ date, formattedDate }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* fallback: select + execCommand not needed for modern browsers */
    }
  }

  const tweetText = encodeURIComponent(
    `Just discovered my birthday dossier — who shares my birthday, what happened in history, and the truth about how I came to be. Check yours! 🌟`
  );
  const tweetUrl = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.href : `https://birthday-facts.app/birthday/${date}`
  );
  const twitterHref = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={copyLink}
        className="flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200"
        style={{
          background: copied ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.06)',
          border: copied ? '1px solid rgba(212,175,55,0.5)' : '1px solid rgba(255,255,255,0.12)',
          color: copied ? 'var(--cosmic-gold)' : 'var(--cosmic-text)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>

      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200"
        style={{
          background: 'rgba(29,161,242,0.12)',
          border: '1px solid rgba(29,161,242,0.3)',
          color: '#60B4F8',
          fontFamily: 'var(--font-body)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(29,161,242,0.2)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(29,161,242,0.12)';
        }}
      >
        𝕏 Share on Twitter
      </a>
    </div>
  );
}
