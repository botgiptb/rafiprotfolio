"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, ShieldCheck, Terminal, ExternalLink, Code2, X, FileCode } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  software: string[]; // represents the tech stack
  thumbnail: string;
  description: string;
}

export default function Portfolio() {
  const [projects, setProjects]     = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFormTab, setActiveFormTab] = useState<"desc" | "tech" | "logs">("desc");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        setProjects(d.portfolio ?? []);
        // Make sure "All" is first, and filter out duplicates or empty categories
        const uniqCats = Array.from(new Set<string>(d.portfolio?.map((p: Project) => p.category) ?? []));
        setCategories(["All", ...uniqCats]);
      })
      .catch(() => {});
  }, []);

  const filteredProjects = projects.filter((project) =>
    activeCategory === "All" ? true : project.category === activeCategory
  ).slice(0, 6);

  return (
    <section id="portfolio" className="relative py-28 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[350px] bg-brand-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs md:text-sm font-heading font-black uppercase tracking-widest text-brand-purple mb-3 block">
              Odoo Projects
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-100 tracking-tight leading-none uppercase">
              Projects & Solutions
            </h2>
            <p className="text-zinc-400 text-sm mt-3 max-w-lg font-sans">
              A collection of 18 custom ERP implementations, integrations, and industry verticals delivered over 3+ years.
            </p>
          </div>

          {/* Pill tabs category selector */}
          <div className="flex flex-wrap gap-2 mt-8 md:mt-0 bg-zinc-950/80 border border-white/5 p-1 rounded-xl relative z-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="relative px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-100 transition-colors duration-300 cursor-pointer"
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-brand-purple rounded-lg -z-10 shadow-lg"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className={activeCategory === category ? "text-zinc-100 font-bold" : ""}>
                  {category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl overflow-hidden bg-zinc-950/40 border border-white/5 shadow-md flex flex-col justify-between hover:border-brand-purple/20 transition-all duration-300"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 border-b border-white/5">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-zinc-950/90 border border-white/5 text-[9px] font-mono font-bold text-brand-purple tracking-wider uppercase">
                    {project.category}
                  </span>
                </div>

                {/* Content details info */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 block">
                      Client: {project.client}
                    </span>
                    <h3 className="text-lg font-heading font-black text-zinc-100 mb-2 leading-tight group-hover:text-brand-purple transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-6 font-sans">
                      {project.description.slice(0, 115)}...
                    </p>
                  </div>

                  {/* Software used badges */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mt-auto items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.software.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5 text-[9px] font-mono text-zinc-400"
                        >
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
                      onClick={() => {
                        setSelectedProject(project);
                        setActiveFormTab("desc");
                      }}
                      className="text-[10px] font-heading font-black uppercase text-brand-cyan hover:text-white flex items-center gap-1 transition-all cursor-pointer"
                    >
                      Inspect <Code2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">
            Showing 6 of 18 modules
          </p>
          <a
            href="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-zinc-950 border border-white/10 hover:border-brand-purple/50 text-zinc-300 hover:text-zinc-100 font-heading font-black text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
          >
            <span>View All Modules</span>
            <ExternalLink className="w-4 h-4 text-brand-purple group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>


      {/* Odoo Custom Form View Modal */}
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
              
              {/* Odoo Form Header status stages bar */}
              <div className="bg-[#18181f] border-b border-white/10 py-3 px-6 flex flex-wrap items-center justify-between gap-4">
                
                {/* Breadcrumbs / Actions */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-brand-purple" /> ir.model.project
                  </span>
                  <span className="text-zinc-600 text-xs">/</span>
                  <span className="text-xs font-mono text-zinc-200">id={selectedProject.id}</span>
                </div>

                {/* Progress Workflow States */}
                <div className="flex items-center text-[10px] font-heading font-bold uppercase tracking-wider select-none border border-white/5 rounded-lg overflow-hidden">
                  <span className="px-3 py-1 bg-zinc-900/60 text-zinc-500 border-r border-white/5">Draft</span>
                  <span className="px-3 py-1 bg-zinc-900/60 text-zinc-500 border-r border-white/5">In Testing</span>
                  <span className="px-3 py-1 bg-brand-purple text-zinc-100 font-black shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">Deployed</span>
                </div>

              </div>

              {/* Odoo Sheet Form Layout */}
              <div className="p-6 md:p-8 flex-grow flex flex-col gap-6 overflow-y-auto max-h-[75vh] select-none text-left">
                
                {/* Title */}
                <div>
                  <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest">Project Form View</span>
                  <h1 className="text-xl md:text-2xl font-heading font-black text-zinc-100 tracking-tight mt-1">
                    {selectedProject.title}
                  </h1>
                </div>

                {/* Odoo Sheet Grid fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs border-y border-white/5 py-6 font-mono text-zinc-400">
                  
                  {/* Left Column Fields */}
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-3 items-center">
                      <span className="text-zinc-600 font-bold">Client:</span>
                      <span className="col-span-2 text-zinc-200">{selectedProject.client}</span>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <span className="text-zinc-600 font-bold">Module Code:</span>
                      <span className="col-span-2 text-brand-purple">x_odoo_afi_{selectedProject.id}</span>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <span className="text-zinc-600 font-bold">Odoo Version:</span>
                      <span className="col-span-2 text-zinc-200">
                        {selectedProject.software.find(s => s && s.startsWith("Odoo")) || "Odoo v17.0"}
                      </span>
                    </div>
                  </div>

                  {/* Right Column Fields */}
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

                {/* Notebook section tabs */}
                <div className="flex flex-col gap-4">
                  
                  {/* Tabs header */}
                  <div className="flex border-b border-white/5 text-[11px] font-heading font-bold uppercase tracking-wider text-zinc-500">
                    <button
                      onClick={() => setActiveFormTab("desc")}
                      className={`pb-2.5 px-4 relative transition-all cursor-pointer ${
                        activeFormTab === "desc" ? "text-zinc-100 font-black" : "hover:text-zinc-300"
                      }`}
                    >
                      {activeFormTab === "desc" && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-purple" />
                      )}
                      Description
                    </button>
                    <button
                      onClick={() => setActiveFormTab("tech")}
                      className={`pb-2.5 px-4 relative transition-all cursor-pointer ${
                        activeFormTab === "tech" ? "text-zinc-100 font-black" : "hover:text-zinc-300"
                      }`}
                    >
                      {activeFormTab === "tech" && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-purple" />
                      )}
                      Tech Stack
                    </button>
                    <button
                      onClick={() => setActiveFormTab("logs")}
                      className={`pb-2.5 px-4 relative transition-all cursor-pointer ${
                        activeFormTab === "logs" ? "text-zinc-100 font-black" : "hover:text-zinc-300"
                      }`}
                    >
                      {activeFormTab === "logs" && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-purple" />
                      )}
                      Automated Logs
                    </button>
                  </div>

                  {/* Tab contents */}
                  <div className="min-h-[120px] text-zinc-300 text-xs md:text-sm leading-relaxed font-sans py-2">
                    {activeFormTab === "desc" && (
                      <p>{selectedProject.description}</p>
                    )}
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
                        <div><span className="text-zinc-600">[$]</span> python3 -m unittest x_odoo_afi_{selectedProject.id}/tests/test_flow.py</div>
                        <div className="text-zinc-500">2026-06-17 19:20:00 INFO ? odoo: Setup mock database environments...</div>
                        <div className="text-zinc-500">2026-06-17 19:20:01 INFO ? odoo.tests: Running transaction tests for user flows...</div>
                        <div className="text-emerald-400 font-bold">OK &mdash; Checked 4 assertions. 0 errors. 0 failures.</div>
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* Odoo Form Footer Action Bar */}
              <div className="bg-[#18181f] border-t border-white/10 py-3 px-6 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white rounded-lg text-xs font-heading font-bold transition-all cursor-pointer"
                  >
                    Close Sheet
                  </button>
                  <button 
                    onClick={() => {
                      alert("Integration test running... check test logs tab!");
                      setActiveFormTab("logs");
                    }}
                    className="px-4 py-2 bg-brand-purple/10 border border-brand-purple/20 hover:bg-brand-purple/20 text-brand-purple rounded-lg text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Terminal className="w-3.5 h-3.5" /> Run Test
                  </button>
                </div>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-purple hover:bg-brand-purple/95 text-zinc-100 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  Source Code <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Absolute Close Icon */}
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

    </section>
  );
}
