import type { Metadata } from "next";

const BASE_URL = "https://itsmerafi.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "All Projects | Mohammed Rafi M — Odoo ERP Developer",
  description:
    "Browse 70+ Odoo ERP projects delivered by Mohammed Rafi M across healthcare, dental, education, logistics, retail, and manufacturing industry verticals.",
  alternates: { canonical: `${BASE_URL}/projects` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/projects`,
    title: "All Projects | Mohammed Rafi M — Odoo ERP Developer",
    description:
      "Browse 70+ Odoo ERP projects delivered by Mohammed Rafi M — custom modules, API integrations, and ERP implementations.",
    images: [{ url: "/rafi_profile.png", width: 1200, height: 630, alt: "Mohammed Rafi M Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Projects | Mohammed Rafi M — Odoo ERP Developer",
    description: "Browse 70+ Odoo ERP projects by Mohammed Rafi M.",
    images: ["/rafi_profile.png"],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

