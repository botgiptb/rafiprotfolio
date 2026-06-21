"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database, ShieldCheck, Terminal, ExternalLink, Code2, X,
  FileCode, Search, ArrowLeft, Filter
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  software: string[];
  thumbnail: string;
  description: string;
}

export default function ProjectsPage() {
  const [projects, setProjects]         = useState<Project[]>([]);
  const [categories, setCategories]     = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery]   = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFormTab, setActiveFormTab] = useState<"desc" | "tech" | "logs">("desc");
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        setProjects(d.portfolio ?? []);
        const uniqCats = Array.from(new Set<string>(d.portfolio?.map((p: Project) => p.category) ?? []));
        setCategories(["All", ...uniqCats]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.software.some((s) => s.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#050507]">
      {/* Hero Banner */}
      <section className="relative pt-20 pb-16 px-4 md:px-8 border-b border-white/5 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-cyan/5 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Back link */}
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-xs font-heading font-bold uppercase tracking-widest transition-colors mb-10 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Portfolio
          </Link>

          <span className="text-xs font-heading font-black uppercase tracking-widest text-brand-purple mb-4 block">
            Complete Work History
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-black text-zinc-100 tracking-tight leading-none uppercase mb-5">
            All Projects
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl font-sans leading-relaxed">
            Every ERP implementation, vertical solution, and system integration Rafi has delivered —
            spanning 10+ industry sectors across healthcare, education, logistics, retail, and more.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { value: "17+", label: "Projects Delivered" },
              { value: "10+", label: "Industry Sectors" },
              { value: "3+", label: "Years Experience" },
              { value: "100%", label: "Client Satisfaction" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-display font-black text-zinc-100">{value}</div>
                <div className="text-[10px] font-heading font-bold uppercase tracking-widest text-zinc-600 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-16 z-30 bg-[#050507]/95 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 bg-zinc-950/80 border border-white/5 p-1 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-1.5 rounded-lg text-[11px] font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-brand-purple text-zinc-100 shadow-lg"
                    : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tech..."
              className="w-64 pl-9 pr-4 py-2 rounded-lg bg-zinc-950 border border-white/8 text-zinc-300 placeholder-zinc-700 text-xs font-mono focus:outline-none focus:border-brand-purple/50 transition-colors"
            />
          </div>

        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">

          {/* Result count */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-zinc-600 text-xs font-mono">
              <span className="text-zinc-300 font-bold">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? "s" : ""} found
            </span>
            <span className="flex items-center gap-1.5 text-zinc-600 text-xs font-mono">
              <Filter className="w-3 h-3" /> filtered by: <span className="text-brand-purple">{activeCategory}</span>
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-zinc-950/40 border border-white/5 animate-pulse h-72" />
              ))}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative rounded-2xl overflow-hidden bg-zinc-950/40 border border-white/5 shadow-md flex flex-col justify-between hover:border-brand-purple/25 transition-all duration-300"
                  >
                    {/* Number badge */}
                    <span className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-[10px] font-mono font-bold text-zinc-500">
                      {String(project.id).padStart(2, "0")}
                    </span>

                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 border-b border-white/5">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                      <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-zinc-950/90 border border-white/5 text-[9px] font-mono font-bold text-brand-purple tracking-wider uppercase">
                        {project.category}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 block">
                        Client: {project.client}
                      </span>
                      <h3 className="text-base font-heading font-black text-zinc-100 mb-2 leading-tight group-hover:text-brand-purple transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed mb-5 font-sans flex-grow">
                        {project.description.slice(0, 130)}...
                      </p>

                      {/* Footer */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mt-auto items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {project.software.slice(0, 3).map((tool) => (
                            <span key={tool} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5 text-[9px] font-mono text-zinc-400">
                              {tool}
                            </span>
                          ))}
                          {project.software.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5 text-[9px] font-mono text-zinc-500 font-bold">
                              +{project.software.length - 3}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => { setSelectedProject(project); setActiveFormTab("desc"); }}
                          className="text-[10px] font-heading font-black uppercase text-brand-cyan hover:text-white flex items-center gap-1 transition-all cursor-pointer"
                        >
                          Inspect <Code2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-3 py-24 text-center"
                >
                  <p className="text-zinc-600 font-mono text-sm">No projects match your search.</p>
                  <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-4 text-brand-purple text-xs font-heading font-bold uppercase tracking-wider hover:underline cursor-pointer">
                    Clear filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Detail Modal — same Odoo form view style as homepage */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 md:p-8 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-3xl rounded-xl bg-[#0f0f13] border border-white/10 shadow-2xl overflow-hidden flex flex-col font-sans"
            >
              {/* Header */}
              <div className="bg-[#18181f] border-b border-white/10 py-3 px-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-brand-purple" /> ir.model.project
                  </span>
                  <span className="text-zinc-600 text-xs">/</span>
                  <span className="text-xs font-mono text-zinc-200">id={selectedProject.id}</span>
                </div>
                <div className="flex items-center text-[10px] font-heading font-bold uppercase tracking-wider select-none border border-white/5 rounded-lg overflow-hidden">
                  <span className="px-3 py-1 bg-zinc-900/60 text-zinc-500 border-r border-white/5">Draft</span>
                  <span className="px-3 py-1 bg-zinc-900/60 text-zinc-500 border-r border-white/5">In Testing</span>
                  <span className="px-3 py-1 bg-brand-purple text-zinc-100 font-black shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">Deployed</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex-grow flex flex-col gap-6 overflow-y-auto max-h-[75vh] select-none text-left">
                <div>
                  <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest">Project Form View</span>
                  <h2 className="text-xl md:text-2xl font-heading font-black text-zinc-100 tracking-tight mt-1">
                    {selectedProject.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs border-y border-white/5 py-6 font-mono text-zinc-400">
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-3 items-center">
                      <span className="text-zinc-600 font-bold">Client:</span>
                      <span className="col-span-2 text-zinc-200">{selectedProject.client}</span>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <span className="text-zinc-600 font-bold">Module Code:</span>
                      <span className="col-span-2 text-brand-purple">x_odoo_rafi_{selectedProject.id}</span>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <span className="text-zinc-600 font-bold">Odoo Version:</span>
                      <span className="col-span-2 text-zinc-200">
                        {selectedProject.software.find((s) => s.startsWith("Odoo")) || "Odoo v17.0"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-3 items-center">
                      <span className="text-zinc-600 font-bold">Status:</span>
                      <span className="col-span-2 flex items-center gap-1.5 text-emerald-400">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" /> Upgrade-Safe
                      </span>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <span className="text-zinc-600 font-bold">Database:</span>
                      <span className="col-span-2 flex items-center gap-1 text-zinc-200">
                        <Database className="w-3.5 h-3.5 text-brand-cyan" /> PostgreSQL
                      </span>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <span className="text-zinc-600 font-bold">Git status:</span>
                      <span className="col-span-2 text-zinc-300">origin/master:clean</span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-col gap-4">
                  <div className="flex border-b border-white/5 text-[11px] font-heading font-bold uppercase tracking-wider text-zinc-500">
                    {(["desc", "tech", "logs"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveFormTab(tab)}
                        className={`pb-2.5 px-4 relative transition-all cursor-pointer ${activeFormTab === tab ? "text-zinc-100 font-black" : "hover:text-zinc-300"}`}
                      >
                        {activeFormTab === tab && (
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-purple" />
                        )}
                        {tab === "desc" ? "Description" : tab === "tech" ? "Tech Stack" : "Automated Logs"}
                      </button>
                    ))}
                  </div>

                  <div className="min-h-[120px] text-zinc-300 text-xs md:text-sm leading-relaxed font-sans py-2">
                    {activeFormTab === "desc" && <p>{selectedProject.description}</p>}
                    {activeFormTab === "tech" && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {selectedProject.software.map((sw) => (
                          <div key={sw} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 flex items-center gap-1.5 text-xs font-mono text-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                            {sw}
                          </div>
                        ))}
                      </div>
                    )}
                    {activeFormTab === "logs" && (
                      <div className="p-4 rounded-lg bg-black/50 border border-white/5 font-mono text-[10.5px] leading-relaxed text-zinc-400 flex flex-col gap-1">
                        <div><span className="text-zinc-600">[$]</span> python3 -m unittest x_odoo_rafi_{selectedProject.id}/tests/test_flow.py</div>
                        <div className="text-zinc-500">2026-06-17 19:20:00 INFO  odoo: Setup mock database environments...</div>
                        <div className="text-zinc-500">2026-06-17 19:20:01 INFO  odoo.tests: Running transaction tests for user flows...</div>
                        <div className="text-emerald-400 font-bold">OK &mdash; Checked 4 assertions. 0 errors. 0 failures.</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#18181f] border-t border-white/10 py-3 px-6 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white rounded-lg text-xs font-heading font-bold transition-all cursor-pointer"
                  >
                    Close Sheet
                  </button>
                  <button
                    onClick={() => { setActiveFormTab("logs"); }}
                    className="px-4 py-2 bg-brand-purple/10 border border-brand-purple/20 hover:bg-brand-purple/20 text-brand-purple rounded-lg text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Terminal className="w-3.5 h-3.5" /> Run Test
                  </button>
                </div>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-purple hover:bg-brand-purple/90 text-zinc-100 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  Source Code <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Close X */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                aria-label="Close sheet"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
