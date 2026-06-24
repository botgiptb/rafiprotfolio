import type { Metadata } from "next";
import { Syne, Space_Grotesk, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { Terminal, Send, Cpu } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const BASE_URL = "https://rafiprotfolio2nd.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Core ──────────────────────────────────────────────────────────
  title: {
    default: "Mohammed Rafi M | Python Odoo Developer & ERP Architect",
    template: "%s | Mohammed Rafi M",
  },
  description:
    "Portfolio of Mohammed Rafi M, a Python Odoo Developer & ERP Architect with 3+ years of experience. Specializing in custom Odoo modules (v14–v19), PostgreSQL optimization, third-party API integrations, and OWL frontend development.",

  keywords: [
    "Mohammed Rafi M",
    "Odoo Developer",
    "Python Odoo Developer",
    "ERP Architect",
    "Custom Odoo Modules",
    "Odoo ERP",
    "PostgreSQL Developer",
    "OWL Odoo",
    "Odoo v17",
    "Odoo v18",
    "Odoo v19",
    "Odoo Freelancer",
    "Odoo Developer India",
    "Kerala Odoo Developer",
    "ERP Integration",
    "API Integration Odoo",
  ],

  authors: [{ name: "Mohammed Rafi M", url: BASE_URL }],
  creator: "Mohammed Rafi M",
  publisher: "Mohammed Rafi M",

  // ── Canonical & Robots ────────────────────────────────────────────
  alternates: { canonical: BASE_URL },
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

  // ── Open Graph ────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Mohammed Rafi M — Odoo Developer Portfolio",
    title: "Mohammed Rafi M | Python Odoo Developer & ERP Architect",
    description:
      "3+ years building enterprise Odoo ERP systems. Custom modules, PostgreSQL optimization, OWL frontend, API integrations. Based in Kerala, India — available remote.",
    images: [
      {
        url: "/rafi_profile.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Rafi M — Python Odoo Developer & ERP Architect",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Rafi M | Python Odoo Developer & ERP Architect",
    description:
      "3+ years building enterprise Odoo ERP systems. Custom modules, PostgreSQL optimization, OWL frontend. Kerala, India — available remote.",
    images: ["/rafi_profile.png"],
    creator: "@mohammedrafim",
  },

  // ── Icons & Manifest ─────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",

  // ── Verification (add your keys once confirmed) ───────────────────
  // verification: {
  //   google: "your-google-site-verification-code",
  // },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: "Mohammed Rafi M",
        jobTitle: "Python Odoo Developer & ERP Architect",
        description:
          "Python Odoo Developer with 3+ years of experience specializing in custom Odoo modules, PostgreSQL optimization, API integrations, and OWL frontend development.",
        url: BASE_URL,
        email: "rafimdev@gmail.com",
        telephone: "+917736205024",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pattambi",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        knowsAbout: [
          "Odoo ERP",
          "Python",
          "PostgreSQL",
          "OWL (Odoo Web Library)",
          "ERP Architecture",
          "API Integration",
          "Custom Module Development",
        ],
        sameAs: [
          "https://www.linkedin.com/in/mohammedrafim",
          "https://github.com/botgiptb",
        ],
        image: {
          "@type": "ImageObject",
          url: `${BASE_URL}/rafi_profile.png`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Mohammed Rafi M — Odoo Developer Portfolio",
        description:
          "Portfolio of Mohammed Rafi M, Python Odoo Developer & ERP Architect",
        author: { "@id": `${BASE_URL}/#person` },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-dark-bg text-zinc-100 selection:bg-brand-purple selection:text-white font-sans">
        <SmoothScroll>
          <Preloader />
          <CustomCursor />

          {/* Background Grid */}
          <div className="background-grid-lines">
            <div className="grid-vertical-line" />
            <div className="grid-vertical-line" />
            <div className="grid-vertical-line" />
            <div className="grid-vertical-line" />
          </div>

          {/* Header */}
          <header className="sticky top-0 z-40 w-full border-b border-dark-border bg-black/60 backdrop-blur-md">
            <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
              <a
                href="#"
                className="flex items-center gap-2 font-display font-black text-xl tracking-tighter text-zinc-100 group"
              >
                <Terminal className="w-5 h-5 text-brand-purple group-hover:rotate-12 transition-transform duration-300" />
                <span>
                  M.RAFI<span className="text-brand-cyan">_</span>
                </span>
              </a>

              <nav className="hidden md:flex gap-8 text-xs font-heading font-bold uppercase tracking-widest text-zinc-400">
                <a href="#services" className="hover:text-zinc-100">
                  Services
                </a>
                <a href="#portfolio" className="hover:text-zinc-100">
                  Portfolio
                </a>
                <a href="#about" className="hover:text-zinc-100">
                  About
                </a>
                <a href="#contact" className="hover:text-zinc-100">
                  Contact
                </a>
              </nav>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-heading font-bold uppercase tracking-wider text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 transition-all"
              >
                <span>Hire Me</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow relative z-10">{children}</main>

          {/* Footer */}
          <footer className="border-t border-dark-border bg-[#050507] py-12 px-4 text-center text-xs text-zinc-600 relative z-10">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
              <span className="font-heading font-medium tracking-wide">
                &copy; {new Date().getFullYear()} Mohammad Rafi M. All rights
                reserved.
              </span>

              <div className="flex gap-6 font-heading font-bold uppercase tracking-widest text-zinc-500">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-300 transition-colors"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/mohammedrafim?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-300 transition-colors"
                >
                  LinkedIn
                </a>

                <a
                  href="#"
                  className="hover:text-zinc-300 transition-colors flex items-center gap-1"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  Odoo
                </a>
              </div>
            </div>
          </footer>
          <Analytics />
        </SmoothScroll>
      </body>
    </html>
  );
}