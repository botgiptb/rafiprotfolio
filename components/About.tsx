"use client";

import { useState, ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileCode, Terminal, FileJson, FileText, ChevronRight, 
  Play, Copy, Check, MapPin, Briefcase, Calendar, Award
} from "lucide-react";

interface FileItem {
  name: string;
  icon: ElementType;
  lang: "python" | "json" | "config";
  runnable: boolean;
  content: React.ReactNode;
  rawCode: string;
  output: string;
}

export default function About() {
  const [activeFile, setActiveFile] = useState<string>("about_me.py");
  const [copied, setCopied] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const files: Record<string, FileItem> = {
    "about_me.py": {
      name: "about_me.py",
      icon: FileCode,
      lang: "python",
      runnable: true,
      rawCode: `class OdooDeveloper:
    def __init__(self):
        self.name = "Mohammed Rafi M"
        self.role = "Python Odoo Developer & ERP Architect"
        self.experience_years = 3
        self.location = "Pattambi, Kerala, India"
        self.status = "Employed | Open to Professional Networking"

    def get_mission(self):
        return (
            "Building robust enterprise architectures, customizing native Odoo ERP workflows, "
            "and developing third-party integrations that drive business automation and efficiency."
        )

    def get_summary(self):
        return (
            "I write clean, modular, and upgrade-safe Odoo custom modules. "
            "Over my 3-year career, I have customized modules for Inventory, Manufacturing, "
            "Sales, Accounting, and HR, integrating external APIs and optimizing PostgreSQL "
            "queries on database clusters containing millions of records."
        )`,
      output: `>>> python3 about_me.py
[System] Initializing Odoo Developer Class...
Name: Mohammed Rafi M
Role: Python Odoo Developer & ERP Architect
Experience: 3 Years
Mission: Building robust enterprise architectures, customizing native Odoo ERP...
Status: Ready to deploy code to production.`,
      content: (
        <code className="text-zinc-300 font-mono text-xs leading-relaxed">
          <span className="text-pink-400">class</span> <span className="text-emerald-400">OdooDeveloper</span>:<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-sky-400">__init__</span>(<span className="text-orange-400">self</span>):<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">self</span>.name = <span className="text-teal-300">"Mohammed Rafi M"</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">self</span>.role = <span className="text-teal-300">"Python Odoo Developer & ERP Architect"</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">self</span>.experience_years = <span className="text-violet-400">3</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">self</span>.location = <span className="text-teal-300">"Pattambi, Kerala, India"</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">self</span>.status = <span className="text-teal-300">"Open to Remote / Relocation"</span><br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-sky-400">get_mission</span>(<span className="text-orange-400">self</span>):<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> (<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Building robust enterprise architectures, customizing native Odoo ERP workflows, "</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"and developing third-party integrations that drive business automation and efficiency."</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-sky-400">get_summary</span>(<span className="text-orange-400">self</span>):<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> (<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"I write clean, modular, and upgrade-safe Odoo custom modules. "</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Over my 3-year career, I have customized modules for Inventory, Manufacturing, "</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Sales, Accounting, and HR, integrating external APIs and optimizing PostgreSQL "</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"queries on database clusters containing millions of records."</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
        </code>
      )
    },
    "skills.json": {
      name: "skills.json",
      icon: FileJson,
      lang: "json",
      runnable: true,
      rawCode: `{
  "languages": ["Python", "JavaScript", "SQL", "HTML5", "CSS3"],
  "erp_framework": {
    "name": "Odoo ERP",
    "versions": ["12", "v14", "v15", "v16", "v17", "v18", "19"],
    "expertise": [
      "Custom Module Architecture",
      "Odoo ORM & Models",
      "XML Views & Inheritances",
      "Automated Actions & Crons",
      "Odoo Web Library (OWL)",
      "QWeb Reports Development",
      "PDF & Excel Report Generation",
      "Custom Report Templates",
      "Report Inheritance & Customization",
      "Dynamic Report Data Processing"
    ]
      },
  "database": ["PostgreSQL", "Database Sharding/Indexing", "Query Optimization"],
  "devops": ["Linux (Ubuntu Server)", "Git", "Odoo.sh"]
}`,
      output: `>>> cat skills.json
{
  "languages": ["Python", "JavaScript", "SQL", "Odoo ORM"],
  "frameworks": ["Odoo v14-v18", "OWL (Odoo Web Library)"],
  "database": ["PostgreSQL (Query Tuning)"],
  "deployment": ["Docker", "Odoo.sh", "Linux", "AWS"]
}`,
      content: (
        <code className="text-zinc-300 font-mono text-xs leading-relaxed">
          &#123;<br />
          &nbsp;&nbsp;<span className="text-sky-400">"languages"</span>: [<span className="text-teal-300">"Python"</span>, <span className="text-teal-300">"JavaScript"</span>, <span className="text-teal-300">"SQL"</span>, <span className="text-teal-300">"HTML5"</span>, <span className="text-teal-300">"CSS3"</span>],<br />
          &nbsp;&nbsp;<span className="text-sky-400">"erp_framework"</span>: &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-400">"name"</span>: <span className="text-teal-300">"Odoo ERP"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-400">"versions"</span>: [<span className="text-teal-300">"v14"</span>, <span className="text-teal-300">"v15"</span>, <span className="text-teal-300">"v16"</span>, <span className="text-teal-300">"v17"</span>, <span className="text-teal-300">"v18"</span>],<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-400">"expertise"</span>: [<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Custom Module Architecture"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Odoo ORM & Models"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"XML Views & Inheritances"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Automated Actions & Crons"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Odoo Web Library (OWL)"</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;]<br />
          &nbsp;&nbsp;&#125;,<br />
          &nbsp;&nbsp;<span className="text-sky-400">"database"</span>: [<span className="text-teal-300">"PostgreSQL"</span>, <span className="text-teal-300">"Database Sharding/Indexing"</span>, <span className="text-teal-300">"Query Optimization"</span>],<br />
          &nbsp;&nbsp;<span className="text-sky-400">"devops"</span>: [<span className="text-teal-300">"Docker"</span>, <span className="text-teal-300">"Linux (Ubuntu Server)"</span>, <span className="text-teal-300">"Nginx"</span>, <span className="text-teal-300">"Git"</span>, <span className="text-teal-300">"Odoo.sh"</span>, <span className="text-teal-300">"AWS EC2"</span>]<br />
          &#125;
        </code>
      )
    },
    "experience.py": {
      name: "experience.py",
      icon: FileCode,
      lang: "python",
      runnable: true,
      rawCode: `def get_experience():
    return [
        {
            "years": "2023 - Present",
            "role": "Senior Odoo & Python Developer",
            "company": "Pragmatic Techsoft Pvt Ltd",
            "achievements": [
                "Designed a real-time biometric database bridge serving 5000+ daily employee check-ins.",
                "Refactored stock allocation logic, speeding up inventory workflow computations by 30%.",
                "Led multiple migrations of complex systems from Odoo 14 to Odoo 19."
            ]
        },
    ]`,
      output: `>>> python3 experience.py
Parsing experience timeline:
* Senior Odoo & Python Developer (2023 - Present)
  - Designed biometric sync systems
  - Refactored inventory picking bottlenecks
* Junior Odoo Developer (2021 - 2023)
  - Custom API integrations & PDF reports (QWeb)`,
      content: (
        <code className="text-zinc-300 font-mono text-xs leading-relaxed">
          <span className="text-pink-400">def</span> <span className="text-sky-400">get_experience</span>():<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> [<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"years"</span>: <span className="text-teal-300">"2023 - Present"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"role"</span>: <span className="text-teal-300">"Senior Odoo & Python Developer"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"company"</span>: <span className="text-teal-300">"Enterprise Tech Solutions"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"achievements"</span>: [<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Designed a real-time biometric database bridge serving 5000+ daily employee check-ins."</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Refactored stock allocation logic, speeding up inventory workflow computations by 30%."</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Led multiple migrations of complex systems from Odoo 15 to Odoo 17."</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"years"</span>: <span className="text-teal-300">"2021 - 2023"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"role"</span>: <span className="text-teal-300">"Junior Python Odoo Developer"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"company"</span>: <span className="text-teal-300">"ERP Pioneers Studio"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"achievements"</span>: [<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Developed customized Odoo reports, print wizards, and PDF invoice templates using QWeb."</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Integrated API endpoints for local shipping carriers and online payment gateways."</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">"Managed deployment patches, backups, and staging servers on AWS EC2."</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
          &nbsp;&nbsp;&nbsp;]
        </code>
      )
    },
    "odoo_modules.config": {
      name: "odoo_modules.config",
      icon: FileText,
      lang: "config",
      runnable: false,
      rawCode: `[custom_modules]
biometric_attendance = "Syncs hardware attendance clocks into HR modules"
warehouse_routing    = "Automates dropshipping picking routes"
owl_pos_extension   = "Custom POS screens using Odoo Web Library (OWL)"
mrp_wizard_scheduler = "Capacity constraints machine scheduling"
payment_bridge_api  = "Secure gateway checking double-spend attempts"`,
      output: ``,
      content: (
        <code className="text-zinc-300 font-mono text-xs leading-relaxed">
          <span className="text-pink-400">[custom_modules]</span><br />
          <span className="text-sky-400">biometric_attendance</span> = <span className="text-teal-300">"Syncs hardware attendance clocks into HR modules"</span><br />
          <span className="text-sky-400">warehouse_routing</span>    = <span className="text-teal-300">"Automates dropshipping picking routes"</span><br />
          <span className="text-sky-400">owl_pos_extension</span>   = <span className="text-teal-300">"Custom POS screens using Odoo Web Library (OWL)"</span><br />
          <span className="text-sky-400">mrp_wizard_scheduler</span> = <span className="text-teal-300">"Capacity constraints machine scheduling"</span><br />
          <span className="text-sky-400">payment_bridge_api</span>  = <span className="text-teal-300">"Secure gateway checking double-spend attempts"</span>
        </code>
      )
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(files[activeFile].rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalLogs(prev => [...prev, `[System] Executing ${activeFile}...`]);
    
    setTimeout(() => {
      setTerminalLogs(prev => [...prev, files[activeFile].output]);
      setIsRunning(false);
    }, 850);
  };

  return (
    <section id="about" className="relative py-28 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">
      {/* Subtle ambient glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-purple/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 text-center lg:text-left">
          <p className="text-[11px] font-heading font-black uppercase tracking-[0.25em] text-brand-purple mb-4">
            01 / Interactive Workspace
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-100 tracking-tight uppercase leading-none">
            Developer Console & Bio
          </h2>
          <p className="text-zinc-400 text-sm mt-3 max-w-xl font-sans">
            Explore my developer environment. Click the source code files in the sidebar tree, view my skills/experience structured as code, and hit "Run Code" to execute them.
          </p>
        </div>

        {/* ── IDE Core Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* File Explorer Tree Sidebar (3 columns on lg) */}
          <div className="lg:col-span-3 rounded-2xl bg-zinc-950/80 border border-white/5 p-5 flex flex-col gap-6 backdrop-blur-xl">
            <div>
              <p className="text-[10px] font-heading font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500 rotate-90" /> Rafi_Workspace
              </p>
              <div className="flex flex-col gap-1.5">
                {Object.keys(files).map((fileName) => {
                  const FileIcon = files[fileName].icon;
                  const isActive = activeFile === fileName;
                  
                  return (
                    <button
                      key={fileName}
                      onClick={() => setActiveFile(fileName)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-all text-left group cursor-pointer ${
                        isActive 
                          ? "bg-brand-purple/10 text-brand-purple border border-brand-purple/20 font-bold" 
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <FileIcon className={`w-4 h-4 ${isActive ? "text-brand-purple" : "text-zinc-500 group-hover:text-zinc-400"}`} />
                        {fileName}
                      </span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick profile card embedded inside file tree */}
            <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {/* <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center relative">
                  <img src="" alt="Mohammed Rafi M" className="w-full h-full object-cover" />
                </div> */}
                <div>
                  <h4 className="text-xs font-heading font-black text-zinc-200 uppercase tracking-wider">Mohammed Rafi M</h4>
                  <p className="text-[9px] font-mono text-zinc-500">Odoo v14-v19 dev</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-[10px] font-heading text-zinc-400">
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-brand-cyan" /> Pattambi, Kerala</span>
                <span className="flex items-center gap-1.5"><Briefcase className="w-3 h-3 text-brand-purple" /> 3+ Years Exp</span>
              </div>
            </div>

          </div>

          {/* Code Editor Pane (9 columns on lg) */}
          <div className="lg:col-span-9 rounded-2xl bg-zinc-950/80 border border-white/5 overflow-hidden flex flex-col backdrop-blur-xl shadow-2xl">
            
            {/* Editor Top Bar Toolbar */}
            <div className="bg-zinc-900/60 border-b border-white/5 px-4 py-2.5 flex items-center justify-between">
              
              {/* Active Tab */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 inline-block" />
                <span className="text-xs font-mono text-zinc-400 font-bold px-3 py-1 bg-zinc-950 border border-white/5 rounded-md flex items-center gap-2">
                  {activeFile}
                </span>
              </div>

              {/* Utility actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                  title="Copy code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {files[activeFile].runnable && (
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold font-heading flex items-center gap-1.5 transition-all cursor-pointer ${
                      isRunning 
                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                        : "bg-brand-purple text-zinc-100 hover:bg-brand-purple/95 shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                    }`}
                  >
                    <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? "animate-pulse" : ""}`} />
                    <span>{isRunning ? "Running..." : "Run Code"}</span>
                  </button>
                )}
              </div>

            </div>

            {/* Code lines container */}
            <div className="p-6 flex-grow flex items-start gap-4 overflow-x-auto min-h-[300px]">
              
              {/* Line numbers column */}
              <div className="text-right text-zinc-600 font-mono text-xs leading-relaxed select-none border-r border-white/5 pr-4 flex flex-col">
                {Array.from({ length: files[activeFile].rawCode.split("\n").length }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>

              {/* Editor Content Area */}
              <pre className="flex-grow overflow-x-auto select-text outline-none text-left">
                {files[activeFile].content}
              </pre>

            </div>

            {/* Terminal Console Output Overlay */}
            <AnimatePresence>
              {terminalLogs.length > 0 && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="bg-zinc-950 border-t border-white/5 flex flex-col font-mono text-[10.5px] leading-relaxed text-zinc-400"
                >
                  <div className="bg-zinc-900/40 px-5 py-2 border-b border-white/5 flex items-center justify-between text-zinc-500">
                    <span className="flex items-center gap-1.5 font-bold"><Terminal className="w-3 h-3 text-brand-cyan" /> TERMINAL OUTPUT</span>
                    <button 
                      onClick={() => setTerminalLogs([])}
                      className="hover:text-zinc-300 font-bold transition-all cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="p-5 max-h-[140px] overflow-y-auto flex flex-col gap-1 select-none">
                    {terminalLogs.map((log, i) => (
                      <pre key={i} className="whitespace-pre-wrap text-left">{log}</pre>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* ── Certifications / Tech Highlights ── */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              title: "3+ Years Active Exp",
              desc: "Building real-world module customizations, reports, integrations, and database schemas for companies.",
              accent: "border-brand-purple/20 shadow-[0_0_20px_rgba(139,92,246,0.02)]"
            },
            {
              icon: Calendar,
              title: "Odoo Versions v14 - v19",
              desc: "Deep knowledge of Odoo core changes, API modifications, OWL migration tracks, and framework API enhancements.",
              accent: "border-brand-cyan/20 shadow-[0_0_20px_rgba(6,182,212,0.02)]"
            },
            {
              icon: FileText,
              title: "70+ Projects Completed",
              desc: "Delivered custom Odoo ERP verticals and third-party API integrations for healthcare, e-commerce, and logistics.",
              accent: "border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.02)]"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-2xl bg-zinc-950/40 border glass-panel ${item.accent}`}
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-zinc-300" />
              </div>
              <h4 className="text-sm font-heading font-black text-zinc-200 uppercase tracking-wider mb-2">{item.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
