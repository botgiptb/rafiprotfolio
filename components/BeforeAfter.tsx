"use client";

import { useState } from "react";
import { Code, Zap, Flame } from "lucide-react";

interface OptimizationScenario {
  id: string;
  title: string;
  description: string;
  beforeStats: { time: string; queries: string; status: string };
  afterStats: { time: string; queries: string; status: string };
  beforeCode: React.ReactNode;
  afterCode: React.ReactNode;
}

export default function BeforeAfter() {
  const [activeScenario, setActiveScenario] = useState<"database" | "batch">("database");

  const scenarios: Record<string, OptimizationScenario> = {
    database: {
      id: "database",
      title: "ORM prefetching (N+1 Database Query Issue)",
      description: "Iterating through warehouse orders and running individual SQL SELECT queries for each record causes huge latency. Prefetching fields in batch cuts query counts to a single fetch.",
      beforeStats: { time: "4.82s", queries: "151 SQL reads", status: "Bottleneck" },
      afterStats: { time: "0.05s", queries: "2 SQL reads", status: "Optimized" },
      beforeCode: (
        <code className="text-zinc-400 font-mono text-[11px] leading-relaxed">
          <span className="text-zinc-600"># Inefficient: Triggers a SQL read in every loop iteration</span><br />
          <span className="text-pink-400">def</span> <span className="text-sky-400">calculate_order_totals</span>(<span className="text-orange-400">self</span>, orders):<br />
          &nbsp;&nbsp;&nbsp;&nbsp;results = []<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">for</span> order <span className="text-pink-400">in</span> orders:<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500"># CRITICAL: Accessing foreign keys triggers new SQL SELECT query</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partner_name = order.partner_id.name<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currency_rate = order.currency_id.rate<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total = order.amount_untaxed * currency_rate<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;results.append(&#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">'partner'</span>: partner_name,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">'total'</span>: total<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> results
        </code>
      ),
      afterCode: (
        <code className="text-zinc-300 font-mono text-[11px] leading-relaxed">
          <span className="text-emerald-500 font-bold"># Optimized: Prefetches relational data in batch database reads</span><br />
          <span className="text-pink-400">def</span> <span className="text-sky-400">calculate_order_totals</span>(<span className="text-orange-400">self</span>, orders):<br />
          &nbsp;&nbsp;&nbsp;&nbsp;results = []<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500"># prefetch partner_id and currency_id fields on all order records</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;orders = orders.<span className="text-emerald-400">with_prefetch</span>(<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orders.ids<br />
          &nbsp;&nbsp;&nbsp;&nbsp;)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">for</span> order <span className="text-pink-400">in</span> orders:<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partner_name = order.partner_id.name<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currency_rate = order.currency_id.rate<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;total = order.amount_untaxed * currency_rate<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;results.append(&#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">'partner'</span>: partner_name,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">'total'</span>: total<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> results
        </code>
      )
    },
    batch: {
      id: "batch",
      title: "Batch writes vs loop creations",
      description: "Executing individual `model.create()` writes inside a loop causes Odoo to repeatedly trigger cache invalidations and compute fields. Accumulating dicts and calling `create` once runs a single batch SQL INSERT.",
      beforeStats: { time: "3.12s", queries: "100 INSERT queries", status: "Slow DB Write" },
      afterStats: { time: "0.18s", queries: "1 batch INSERT query", status: "Upgrade-Safe" },
      beforeCode: (
        <code className="text-zinc-400 font-mono text-[11px] leading-relaxed">
          <span className="text-zinc-600"># Inefficient: Triggers individual database writes inside loop</span><br />
          <span className="text-pink-400">def</span> <span className="text-sky-400">import_partner_records</span>(<span className="text-orange-400">self</span>, api_data):<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">for</span> item <span className="text-pink-400">in</span> api_data:<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500"># Triggers recomputes & DB commits 100x times</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">self</span>.env[<span className="text-teal-300">'res.partner'</span>].<span className="text-sky-400">create</span>(&#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">'name'</span>: item[<span className="text-teal-300">'name'</span>],<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">'email'</span>: item[<span className="text-teal-300">'email'</span>],<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">'phone'</span>: item[<span className="text-teal-300">'phone'</span>],<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;)
        </code>
      ),
      afterCode: (
        <code className="text-zinc-300 font-mono text-[11px] leading-relaxed">
          <span className="text-emerald-500 font-bold"># Optimized: Aggregates list of dictionaries and inserts in bulk</span><br />
          <span className="text-pink-400">def</span> <span className="text-sky-400">import_partner_records</span>(<span className="text-orange-400">self</span>, api_data):<br />
          &nbsp;&nbsp;&nbsp;&nbsp;partner_vals = []<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">for</span> item <span className="text-pink-400">in</span> api_data:<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partner_vals.append(&#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">'name'</span>: item[<span className="text-teal-300">'name'</span>],<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">'email'</span>: item[<span className="text-teal-300">'email'</span>],<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-300">'phone'</span>: item[<span className="text-teal-300">'phone'</span>],<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500"># Single batch SQL insert, triggers computes only once</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">self</span>.env[<span className="text-teal-300">'res.partner'</span>].<span className="text-emerald-400">create</span>(partner_vals)
        </code>
      )
    }
  };

  return (
    <section className="relative py-24 bg-dark-bg px-4 md:px-8 border-t border-dark-border overflow-hidden">
      {/* Background glow spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs md:text-sm font-heading font-black uppercase tracking-widest text-brand-cyan mb-3 block">
            Optimization Showcase
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-100 mb-4 tracking-tight uppercase">
            Performance Tuning & Refactoring
          </h2>
          <p className="max-w-xl mx-auto text-zinc-400 text-sm font-sans leading-relaxed">
            Comparing typical slow python/database setups against refactored, highly optimized configurations to speed up Odoo processes.
          </p>

          {/* Scenario Toggles */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveScenario("database")}
              className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeScenario === "database"
                  ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                  : "bg-zinc-950 border border-white/5 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              N+1 DB Query Fix
            </button>
            <button
              onClick={() => setActiveScenario("batch")}
              className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeScenario === "batch"
                  ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                  : "bg-zinc-950 border border-white/5 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Batch Write Optimization
            </button>
          </div>
        </div>

        {/* Comparison grid code panes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Suboptimal Box */}
          <div className="rounded-2xl bg-[#0f0f13] border border-red-500/10 overflow-hidden flex flex-col shadow-lg">
            
            {/* Header */}
            <div className="bg-[#18181f] border-b border-white/5 px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-500" /> suboptimal_code.py
              </span>
              <span className="px-2 py-0.5 rounded bg-red-950/40 border border-red-900/30 text-[9px] font-mono text-red-400">
                {scenarios[activeScenario].beforeStats.status}
              </span>
            </div>

            {/* Performance Stats */}
            <div className="bg-black/20 px-5 py-3 border-b border-white/5 grid grid-cols-2 gap-4 text-xs font-mono text-zinc-500">
              <div>Execution Time: <span className="text-zinc-300 font-bold">{scenarios[activeScenario].beforeStats.time}</span></div>
              <div>Database Queries: <span className="text-zinc-300 font-bold">{scenarios[activeScenario].beforeStats.queries}</span></div>
            </div>

            {/* Code */}
            <div className="p-6 overflow-x-auto min-h-[220px] bg-[#070709]/50 flex items-start gap-3">
              <div className="text-right text-zinc-700 font-mono text-xs select-none pr-3 border-r border-white/5">
                {Array.from({ length: 11 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <pre className="text-left font-mono text-xs leading-relaxed overflow-x-auto">
                {scenarios[activeScenario].beforeCode}
              </pre>
            </div>

          </div>

          {/* Optimized Box */}
          <div className="rounded-2xl bg-[#0f0f13] border border-emerald-500/15 overflow-hidden flex flex-col shadow-lg">
            
            {/* Header */}
            <div className="bg-[#18181f] border-b border-white/5 px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400" /> optimized_odoo_code.py
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-900/30 text-[9px] font-mono text-emerald-400">
                {scenarios[activeScenario].afterStats.status}
              </span>
            </div>

            {/* Performance Stats */}
            <div className="bg-black/20 px-5 py-3 border-b border-white/5 grid grid-cols-2 gap-4 text-xs font-mono text-zinc-500">
              <div>Execution Time: <span className="text-emerald-400 font-bold">{scenarios[activeScenario].afterStats.time}</span></div>
              <div>Database Queries: <span className="text-emerald-400 font-bold">{scenarios[activeScenario].afterStats.queries}</span></div>
            </div>

            {/* Code */}
            <div className="p-6 overflow-x-auto min-h-[220px] bg-[#070709]/50 flex items-start gap-3">
              <div className="text-right text-zinc-700 font-mono text-xs select-none pr-3 border-r border-white/5">
                {Array.from({ length: 11 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <pre className="text-left font-mono text-xs leading-relaxed overflow-x-auto">
                {scenarios[activeScenario].afterCode}
              </pre>
            </div>

          </div>

        </div>

        {/* Explain Card */}
        <div className="mt-8 p-5 rounded-xl bg-[#0f0f13] border border-white/5 flex gap-4 items-start text-left font-sans text-xs md:text-sm text-zinc-400 leading-relaxed shadow-sm">
          <div className="p-2.5 rounded-lg bg-zinc-900 border border-white/5 text-brand-purple mt-0.5">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-heading font-black text-zinc-200 uppercase tracking-wider mb-1">Refactoring Context</h5>
            <p>{scenarios[activeScenario].description}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
