import type { Metadata } from "next";
import { Syne, Space_Grotesk, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { Terminal, Send, Cpu } from "lucide-react";
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

export const metadata: Metadata = {
  title: "Mohammad Rafi M| Python Odoo Developer & ERP Architect",
  description: "Portfolio of Mohammed Rafi M, Python Odoo developer with 3+ years of experience specializing in custom modules, PostgreSQL optimizations, API integrations, and OWL frontend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-dark-bg text-zinc-100 selection:bg-brand-purple selection:text-white font-sans">
        <SmoothScroll>
          <Preloader />
          <CustomCursor />

          {/* Thin Background Vertical Grid Lines */}
          <div className="background-grid-lines">
            <div className="grid-vertical-line" />
            <div className="grid-vertical-line" />
            <div className="grid-vertical-line" />
            <div className="grid-vertical-line" />
          </div>

          {/* Header */}
          <header className="sticky top-0 z-40 w-full border-b border-dark-border bg-black/60 backdrop-blur-md">
            <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
              <a href="#" className="flex items-center gap-2 font-display font-black text-xl tracking-tighter text-zinc-100 group">
                <Terminal className="w-5 h-5 text-brand-purple group-hover:rotate-12 transition-transform duration-300" />
                <span>M.RAFI<span className="text-brand-cyan">_</span></span>
              </a>

              <nav className="hidden md:flex gap-8 text-xs font-heading font-bold uppercase tracking-widest text-zinc-400">
                <a href="#services" className="hover:text-zinc-100 transition-colors">Services</a>
                <a href="#portfolio" className="hover:text-zinc-100 transition-colors">Portfolio</a>
                <a href="#about" className="hover:text-zinc-100 transition-colors">About</a>
                <a href="#contact" className="hover:text-zinc-100 transition-colors">Contact</a>
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

          {/* Main content */}
          <div className="flex-grow relative z-10">{children}</div>

          {/* Footer */}
          <footer className="border-t border-dark-border bg-[#050507] py-12 px-4 text-center text-xs text-zinc-600 relative z-10">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
              <span className="font-heading font-medium tracking-wide">
                &copy; {new Date().getFullYear()} Mohammed Rafi M. All rights reserved.
              </span>
              <div className="flex gap-6 font-heading font-bold uppercase tracking-widest text-zinc-500">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" width="14" height="14">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" width="14" height="14">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="#" className="hover:text-zinc-300 transition-colors flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" /> Odoo
                </a>
              </div>
            </div>
          </footer>
        </SmoothScroll>
      </body>
    </html>
  );
}
