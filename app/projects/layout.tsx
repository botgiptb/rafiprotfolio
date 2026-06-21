import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects | Mohammed Rafi M — Odoo ERP Developer",
  description: "Complete list of 70+ Odoo ERP projects delivered by Mohammed Rafi M across healthcare, education, logistics, retail, and more industry verticals.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
