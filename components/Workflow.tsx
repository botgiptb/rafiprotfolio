"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "REQUIREMENTS & ARCHITECTURE",
    description: "Gathering business scopes, mapping client departments, analyzing document workflows, and designing the entity-relationship diagrams (ERD) to ensure the core ERP architecture is clean and robust.",
    color: "from-purple-500 to-pink-500",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  },
  {
    num: "02",
    title: "DATABASE & ORM SCHEMAS",
    description: "Defining relational models in Python, setting database indexes for fast query executions, configuring Odoo security groups, access control lists (ir.model.access.csv), and record rules.",
    color: "from-amber-500 to-yellow-500",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
  },
  {
    num: "03",
    title: "BUSINESS LOGIC & APIS",
    description: "Writing upgrade-safe Python logic, custom wizards, actions, and automatic cron schedulers. Building REST, XML-RPC, or JSON-RPC endpoints to integrate external eCommerce, shipping, or payment services.",
    color: "from-rose-500 to-pink-500",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
  },
  {
    num: "04",
    title: "OWL FRONTEND & VIEWS",
    description: "Extending the Odoo Web Client using OWL (Odoo Web Library) and JavaScript. Building customized XML views, Kanban cards, interactive dashboards, and design layouts using QWeb templates.",
    color: "from-purple-500 to-cyan-500",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  },
  {
    num: "05",
    title: "TESTING & CLOUD DEPLOYMENT",
    description: "Writing automated python unittest validation cases. Containerizing environments using Docker, and configuring staging-to-production deployment cycles on Odoo.sh or AWS cloud servers using Nginx reverse proxy.",
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  }
];

export default function Workflow() {
  return (
    <section className="relative pt-36 pb-32 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">
      {/* Top & Bottom Glowing Dividers */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />

      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-purple/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-xs md:text-sm font-heading font-black uppercase tracking-widest text-brand-cyan mb-3 block">
            03 / Process
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-100 tracking-tight leading-none uppercase">
            Development Lifecycle
          </h2>
        </div>

        {/* Workflow steps container */}
        <div className="relative flex flex-col gap-12 md:gap-16">
          {/* Vertical connecting neon timeline track */}
          <div className="absolute left-[34px] md:left-[52px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-brand-purple via-brand-cyan to-brand-amber/80 opacity-20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex gap-6 md:gap-12 items-start max-w-[800px] mx-auto w-full"
            >
              {/* Left Column: Glowing Node & Number */}
              <div className="relative flex flex-col items-center select-none">
                {/* Outlined text step number in Syne font */}
                <span className="font-display text-5xl md:text-7xl font-black text-transparent -webkit-text-stroke-[1px] -webkit-text-stroke-zinc-800 group-hover:-webkit-text-stroke-brand-purple transition-all duration-500 leading-none group-hover:text-glow-purple">
                  {step.num}
                </span>

                {/* Micro timeline node dot */}
                <div className="absolute -left-1 md:-left-2 bottom-0 w-3 h-3 rounded-full bg-zinc-950 border-2 border-zinc-800 group-hover:border-brand-purple group-hover:bg-brand-purple transition-colors duration-500 shadow-[0_0_10px_rgba(139,92,246,0.3)] z-10" />
              </div>

              {/* Right Column: Content Card */}
              <div className="flex-1 glass-panel rounded-2xl p-6 md:p-8 hover:border-brand-purple/20 transition-all duration-500 group-hover:bg-zinc-900/20">
                <div className="mb-3">
                  <h3 className="font-heading text-lg md:text-xl font-black text-zinc-300 group-hover:text-zinc-50 group-hover:text-glow-purple transition-all duration-300">
                    {step.title}
                  </h3>
                </div>

                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 text-xs md:text-sm leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
