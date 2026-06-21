"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, GitFork, Monitor, Cpu, Terminal } from "lucide-react";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  accent: string;
  skills: string[];
}

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        setServices(d.services ?? []);
      })
      .catch(() => {});
  }, []);

  const getServiceIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("custom") || t.includes("dev")) return Code2;
    if (t.includes("api") || t.includes("integration")) return GitFork;
    if (t.includes("owl") || t.includes("frontend") || t.includes("client")) return Monitor;
    return Cpu;
  };

  return (
    <section id="services" className="relative py-28 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-purple/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-[11px] font-heading font-black uppercase tracking-[0.25em] text-brand-purple mb-4">
            02 / Services
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-100 tracking-tight leading-none uppercase">
            Solutions & Capabilities
          </h2>
          <p className="text-zinc-400 text-sm mt-3 max-w-xl mx-auto font-sans">
            Tailored software development services focusing on Odoo customization, core business flow automations, database optimization, and cloud setups.
          </p>
        </div>

        {/* Services Grid (Handles 3 or 4 services responsively) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = getServiceIcon(s.title);
            
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="group relative rounded-2xl glass-panel p-6 flex flex-col justify-between overflow-hidden border border-white/5 hover:border-brand-purple/20 transition-all duration-300"
              >
                {/* Accent Top beam */}
                <div 
                  className="absolute top-0 left-0 w-full h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-300" 
                  style={{ backgroundColor: s.accent }}
                />

                <div>
                  {/* Icon */}
                  <div 
                    className="mb-5 w-10 h-10 rounded-xl bg-zinc-950/80 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:text-white"
                    style={{ color: s.accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-heading font-black text-zinc-100 mb-2.5 tracking-tight leading-tight uppercase">
                    {s.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-xs leading-relaxed mb-6 font-sans">
                    {s.description}
                  </p>
                </div>

                {/* Sub-skills tag footer */}
                <div className="border-t border-white/5 pt-4 mt-auto">
                  <p className="text-[8px] font-mono uppercase tracking-[0.15em] text-zinc-500 mb-2.5 flex items-center gap-1">
                    <Terminal className="w-3 h-3" style={{ color: s.accent }} /> Stack / Tools
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {s.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2 py-0.5 rounded bg-zinc-950/70 border border-white/5 text-[9px] font-mono text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
