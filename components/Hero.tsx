"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, ArrowRight, Code, Database, Server, Settings } from "lucide-react";

interface Particle { x: number; y: number; vx: number; vy: number; r: number; a: number; }

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.3 + 0.1,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener("resize", resize);
    canvas.parentElement?.addEventListener("mousemove", onMove as EventListener);
    canvas.parentElement?.addEventListener("mouseleave", onLeave as EventListener);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const d  = Math.hypot(dx, dy);
        let alpha = p.a;
        if (d < 120) {
          const f = (120 - d) / 120;
          p.x -= (dx / d) * f * 1.2;
          p.y -= (dy / d) * f * 1.2;
          alpha = Math.min(1, p.a + f * 0.4);
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${alpha})`; // Purple particles
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ld = Math.hypot(p.x - q.x, p.y - q.y);
          if (ld < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(6,182,212,${(100 - ld) / 100 * 0.08})`; // Cyan links
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onMove as EventListener);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave as EventListener);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Interactive terminal logs simulation ── */
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    const rawLogs = [
      "python3 odoo-bin -c odoo.conf",
      "INFO: odoo: Odoo version 17.0 Community Edition starting...",
      "INFO: odoo: Loading addons database modules...",
      "INFO: odoo.modules.loading: Loading module sale (28/86)",
      "INFO: odoo.modules.loading: Loading module stock (45/86)",
      "INFO: odoo.modules.loading: Loading custom biometric_sync_hr (82/86)",
      "INFO: odoo.modules.loading: Loading custom route_optimizer (83/86)",
      "SUCCESS: odoo: All ERP modules initialized correctly.",
      "INFO: odoo.service.server: HTTP service running on port 8069 (HTTP multiprocess)",
      "INFO: odoo: Ready to handle requests. Database 'rafi_prod' loaded."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < rawLogs.length) {
        const nextLog = rawLogs[currentLogIndex];
        setLogs(prev => [...prev, nextLog]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070709] py-24 px-4 md:px-8 border-b border-dark-border">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />

      {/* Radial glow background lights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[150px] pointer-events-none z-0 animate-float-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[150px] pointer-events-none z-0" style={{ animationDelay: "2.5s" }} />

      <div className="relative max-w-6xl mx-auto z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Developer Tag & Name Details */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">          
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-xs font-heading font-bold text-zinc-300 mb-8 tracking-wider border border-white/5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Odoo Expert &mdash; Available for Custom Integrations
          </motion.div>

          {/* Developer Names */}
          <div className="mb-2 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,7vw,5rem)] font-display font-black tracking-tight leading-none text-zinc-100"
            >
              Mohammed
            </motion.h1>
          </div>
          <div className="mb-6 overflow-hidden w-full">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,7vw,5rem)] font-display font-black tracking-tighter leading-none bg-gradient-to-r from-brand-purple via-brand-cyan to-teal-400 bg-clip-text text-transparent animate-gradient-text text-glow-purple"
            >
              RAFI
            </motion.h1>
          </div>

          {/* Core Roles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] md:text-xs font-heading font-black uppercase tracking-widest text-zinc-500 mb-6"
          >
            {["Python Developer", "Odoo Expert", "ERP Architect", "API Integrator"].map((t, i) => (
              <span key={t} className="flex items-center gap-4">
                <span className="text-zinc-300">{t}</span>
                {i < 3 && <span className="text-brand-purple/60">/</span>}
              </span>
            ))}
          </motion.div>

          {/* Profile Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-xl text-zinc-400 text-sm md:text-base leading-relaxed mb-10 font-sans"
          >
            Specialized in designing enterprise ERP structures, developing customized Odoo models, optimizing PostgreSQL databases, and crafting modern user clients with Odoo's OWL framework. 3 years of building production-ready apps.
          </motion.p>

          {/* Action triggers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#about"
              className="group relative flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-brand-purple text-zinc-100 font-heading font-bold text-sm overflow-hidden shadow-[0_0_35px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] transition-all duration-300"
            >
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-50 group-hover:w-full transition-all duration-500 ease-out" />
              <span className="relative flex items-center gap-2">
                <Code className="w-4 h-4" />
                Launch IDE Workspace
              </span>
            </a>

            <a
              href="#portfolio"
              className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl glass-panel text-zinc-300 font-heading font-bold text-sm hover:text-white transition-all duration-300"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>

        </div>

        {/* Right Side: Floating Interactive Terminal Emulator */}
        <div className="lg:col-span-4 w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="w-full max-w-[450px] rounded-2xl bg-zinc-950/90 border border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-[11px] leading-relaxed text-zinc-300 box-glow-purple"
          >
            
            {/* Terminal Window Header bar */}
            <div className="bg-zinc-900/60 border-b border-white/5 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              </div>
              <span className="text-[10px] text-zinc-500 tracking-wider flex items-center gap-1.5">
                <TerminalIcon className="w-3 h-3 text-brand-purple" /> bash &bull; odoo-bin
              </span>
              <div className="flex gap-2">
                <Settings className="w-3 h-3 text-zinc-600 animate-spin" style={{ animationDuration: "12s" }} />
              </div>
            </div>

            {/* Terminal Panel Content */}
            <div className="p-5 h-[280px] overflow-y-auto flex flex-col gap-1.5 scrollbar-thin select-none">
              {logs.map((log, index) => {
                if (!log) return null;
                const isCmd = log.startsWith("python3");
                const isErr = log.startsWith("ERROR");
                const isSuccess = log.startsWith("SUCCESS");
                
                return (
                  <div key={index} className="flex items-start gap-1">
                    {isCmd && <span className="text-zinc-500 font-bold">$</span>}
                    <span className={`
                      ${isCmd ? "text-brand-cyan font-bold" : ""} 
                      ${isErr ? "text-red-400" : ""} 
                      ${isSuccess ? "text-emerald-400 font-bold" : ""}
                      ${!isCmd && !isErr && !isSuccess ? "text-zinc-400" : ""}
                    `}>
                      {log}
                    </span>
                  </div>
                );
              })}
              
              <div className="flex items-center gap-1 mt-1">
                <span className="text-zinc-500 font-bold">$</span>
                <span className="w-2 h-4 bg-brand-purple animate-pulse inline-block" />
              </div>
            </div>

            {/* Mock Server Info Footer */}
            <div className="bg-zinc-900/40 border-t border-white/5 py-2.5 px-4 flex justify-between items-center text-[10px] text-zinc-500">
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3 text-brand-purple" /> postgres://127.0.0.1:5432
              </span>
              <span className="flex items-center gap-1">
                <Server className="w-3 h-3 text-brand-cyan" /> odoo.sh:active
              </span>
            </div>

          </motion.div>
        </div>

      </div>

      {/* Scroll mouse indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none select-none">
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-zinc-600 to-transparent" />
        <span className="text-[8px] font-heading font-black tracking-[0.35em] text-zinc-600 uppercase">EXPLORE IDE</span>
      </div>

    </section>
  );
}
