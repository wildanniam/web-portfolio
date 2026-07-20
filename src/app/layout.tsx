import type { Metadata, Viewport } from "next";

import { EntryGate } from "@/components/layout/entry-gate";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteContent } from "@/content/site";
import { getSiteUrl, isIndexableDeployment, serializeJsonLd } from "@/lib/seo/site-url";

import "./globals.css";

const metadataBase = getSiteUrl();
const indexable = isIndexableDeployment();

const entryGateBootstrap = `
  try {
    var hasSeenEntry = window.sessionStorage.getItem("wildan-entry-seen") === "1";
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.dataset.entryGate = hasSeenEntry || prefersReducedMotion ? "skip" : "show";
    if (!hasSeenEntry && !prefersReducedMotion) {
      window.setTimeout(function () {
        if (document.documentElement.dataset.entryGate === "show") {
          document.documentElement.dataset.entryGate = "fallback-leaving";
        }
      }, 920);
      window.setTimeout(function () {
        if (document.documentElement.dataset.entryGate === "fallback-leaving") {
          window.sessionStorage.setItem("wildan-entry-seen", "1");
          document.documentElement.dataset.entryGate = "complete";
        }
      }, 1400);
    }
  } catch (error) {
    document.documentElement.dataset.entryGate = "show";
  }
`;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteContent.seo.title,
    template: `%s | ${siteContent.name}`,
  },
  description: siteContent.seo.description,
  applicationName: "Wildan Syukri Niam Portfolio",
  authors: [{ name: siteContent.name, url: siteContent.contact.github }],
  creator: siteContent.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    siteName: siteContent.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.title,
    description: siteContent.seo.description,
  },
  robots: {
    index: indexable,
    follow: indexable,
    googleBot: {
      index: indexable,
      follow: indexable,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f5f0e8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = metadataBase.toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": new URL("/#website", siteUrl).toString(),
        url: siteUrl,
        name: siteContent.name,
        description: siteContent.seo.description,
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": new URL("/#person", siteUrl).toString(),
        name: siteContent.name,
        jobTitle: siteContent.role,
        description: siteContent.positioning,
        url: siteUrl,
        sameAs: [siteContent.contact.github],
      },
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: entryGateBootstrap }} />
        <EntryGate />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
        <a
          href="#main-content"
          className="fixed top-3 left-3 z-[60] -translate-y-24 bg-ink-900 px-4 py-3 text-sm font-semibold text-paper-0 transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
