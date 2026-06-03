import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://birthday-facts.vercel.app";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Birthday Facts",
  url: SITE_URL,
  description:
    "Discover celebrities born on your birthday, historical events, zodiac sign, moon phase, and your conception story. Find out what your birthday really says about you.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/birthday/{search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Birthday Facts — What does your birthday say about you?",
    template: "%s | Birthday Facts",
  },
  description:
    "Discover celebrities born on your birthday, what happened in history, your zodiac sign, moon phase, and the story of how you came to be. Find out if you were an accident — and who shares your special day.",
  keywords: [
    "birthday facts",
    "was I an accident",
    "when was I created",
    "my birthday meaning",
    "celebrities on my birthday",
    "who was born on my birthday",
    "what happened on my birthday",
    "birthday history",
    "conception date calculator",
    "birthday zodiac sign",
    "moon phase birthday",
    "how many people share my birthday",
    "celebrities born on same day",
    "birthday life path number",
    "birthday personality",
    "famous people born on my birthday",
  ],
  openGraph: {
    title: "Birthday Facts — What does your birthday say about you?",
    description:
      "Celebrities, history, zodiac, moon phase, conception story — all in one birthday dossier. Find out if you were an accident and who shares your day.",
    type: "website",
    url: SITE_URL,
    siteName: "Birthday Facts",
  },
  twitter: {
    card: "summary_large_image",
    title: "Birthday Facts — What does your birthday say about you?",
    description:
      "Celebrities, history, zodiac, moon phase, conception story — all in one birthday dossier.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${lora.variable} dark h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
