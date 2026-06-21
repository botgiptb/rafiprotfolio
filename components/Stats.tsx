"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Terminal, Cpu } from "lucide-react";

function Counter({ target, suffix = "", duration = 1600 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const stats = [
  { value: 3,    suffix: "+",  label: "Years Experience",     desc: "In Python, PostgreSQL & Odoo ERP development",   icon: Award,    color: "text-brand-purple", glow: "rgba(139,92,246,0.08)" },
  { value: 70,   suffix: "+",  label: "Projects Completed",    desc: "Delivered ERP solutions & integrations",        icon: Cpu,      color: "text-brand-cyan",   glow: "rgba(6,182,212,0.08)" },
  { value: 300,  suffix: "K+", label: "Lines of Clean Code",  desc: "Upgrade-safe PEP8 Python & clean XML views",     icon: Terminal, color: "text-brand-purple", glow: "rgba(139,92,246,0.08)" },
];

export default function Stats() {
  return (
    <section className="relative py-20 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="group relative p-8 rounded-2xl glass-panel flex flex-col items-center text-center overflow-hidden border border-white/5 hover:border-brand-purple/20 transition-all duration-300"
            >
              {/* Hover ambient glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 50%, ${s.glow} 0%, transparent 70%)` }}
              />

              <div className="mb-5 p-3 rounded-xl bg-zinc-950/60 border border-white/5 text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
                <s.icon className="w-5 h-5" />
              </div>

              <span className={`font-display text-5xl md:text-6xl font-black mb-2 tracking-tighter ${s.color}`}>
                <Counter target={s.value} suffix={s.suffix} />
              </span>

              <h4 className="font-heading font-black text-zinc-100 text-sm uppercase tracking-wider mb-1.5">
                {s.label}
              </h4>
              <p className="text-zinc-500 text-xs leading-relaxed font-sans">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
