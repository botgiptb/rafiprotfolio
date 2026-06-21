"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Phone, MapPin, Code2, Server, Database } from "lucide-react";

const queryTypes = [
  { value: "odoo_custom", label: "Odoo Custom Module Dev" },
  { value: "api_integration", label: "Third-Party API Integration" },
  { value: "db_optimization", label: "PostgreSQL Database Tuning" },
  { value: "full_erp_setup", label: "Full ERP Implementation" },
  { value: "general", label: "General Consulting / Job Offer" }
];

interface ApiResponse {
  status: number;
  statusText: string;
  responseTime: string;
  body: {
    success: boolean;
    message: string;
    timestamp: string;
    details: {
      sender: string;
      queue_status: string;
    };
  };
}

export default function Contact() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    queryType: "odoo_custom", 
    message: "" 
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setApiResponse(null);
    
    setTimeout(() => {
      setStatus("done");
      setApiResponse({
        status: 200,
        statusText: "OK",
        responseTime: "142ms",
        body: {
          success: true,
          message: "Transmission received. Rafi's Odoo background daemon will process this query shortly.",
          timestamp: new Date().toISOString(),
          details: {
            sender: form.name,
            queue_status: "pending_manual_review"
          }
        }
      });
      // Clear form
      setForm({ name: "", email: "", queryType: "odoo_custom", message: "" });
    }, 1800);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">
      {/* Background glow ambient light */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-cyan/4 blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Contact credentials */}
          <div className="lg:col-span-5 flex flex-col gap-10 text-left">
            <div>
              <p className="text-[11px] font-heading font-black uppercase tracking-[0.25em] text-brand-purple mb-4">
                03 / Connection Socket
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-100 tracking-tight uppercase leading-none mb-6">
                Establish<br />Connection
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                Need to automate business flows, deploy an Odoo instance, optimize slow databases, or consult on a system architecture? Hit the API endpoint to initiate contact.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "mailto://", value: "rafimdev@gmail.com", href: "mailto:rafimdev@gmail.com", color: "text-brand-purple" },
                { icon: Phone, label: "tel://", value: "+91 7736205024", href: "tel:+917736205024", color: "text-brand-cyan" },
                { icon: MapPin, label: "location://", value: "Pattambi, Kerala, India • Remote / On-Site", href: undefined, color: "text-brand-purple" }
              ].map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="group flex items-start gap-4 font-mono text-xs">
                  <div className={`p-3 rounded-xl bg-zinc-950/80 border border-white/5 group-hover:border-zinc-800 ${color} transition-all duration-300`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-heading font-black uppercase tracking-widest text-zinc-600 mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-zinc-300 hover:text-white hover:underline transition-colors font-bold">{value}</a>
                    ) : (
                      <p className="text-zinc-400 font-bold">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 items-center text-[10px] text-zinc-600 border-t border-white/5 pt-6 font-mono">
              <span className="flex items-center gap-1"><Server className="w-3 h-3 text-brand-purple" /> Status: Online</span>
              <span className="flex items-center gap-1"><Database className="w-3 h-3 text-brand-cyan" /> Latency: 42ms</span>
            </div>
          </div>

          {/* Right Column: REST Client styled form */}
          <div className="lg:col-span-7 w-full">
            <div className="rounded-2xl bg-[#0f0f13] border border-white/5 shadow-2xl overflow-hidden font-mono text-xs text-left">
              
              {/* REST Client Top bar */}
              <div className="bg-zinc-900/60 border-b border-white/5 px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px] tracking-wider uppercase">
                    POST
                  </span>
                  <span className="text-zinc-400 text-[11px] font-bold">
                    https://api.rafi.dev/v1/contact
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-800" />
                  <span className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                
                {/* Name */}
                <div>
                  <div className="text-[10px] text-zinc-500 mb-1.5 flex items-center gap-1">
                    <span className="text-brand-purple">"sender_name"</span>:
                  </div>
                  <input
                    type="text" required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4.5 py-3 rounded-lg bg-zinc-950 border border-white/5 text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-purple/40 focus:ring-1 focus:ring-brand-purple/20 transition-all font-mono"
                  />
                </div>

                {/* Email */}
                <div>
                  <div className="text-[10px] text-zinc-500 mb-1.5 flex items-center gap-1">
                    <span className="text-brand-purple">"sender_email"</span>:
                  </div>
                  <input
                    type="email" required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full px-4.5 py-3 rounded-lg bg-zinc-950 border border-white/5 text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-purple/40 focus:ring-1 focus:ring-brand-purple/20 transition-all font-mono"
                  />
                </div>

                {/* Query Type */}
                <div>
                  <div className="text-[10px] text-zinc-500 mb-1.5 flex items-center gap-1">
                    <span className="text-brand-purple">"project_scope"</span>:
                  </div>
                  <select
                    value={form.queryType}
                    onChange={e => setForm({ ...form, queryType: e.target.value })}
                    className="w-full px-4.5 py-3 rounded-lg bg-zinc-950 border border-white/5 text-zinc-300 focus:outline-none focus:border-brand-purple/40 focus:ring-1 focus:ring-brand-purple/20 transition-all font-mono cursor-pointer"
                  >
                    {queryTypes.map(q => <option key={q.value} className="bg-zinc-950 text-zinc-300" value={q.value}>{q.label}</option>)}
                  </select>
                </div>

                {/* Message / Details */}
                <div>
                  <div className="text-[10px] text-zinc-500 mb-1.5 flex items-center gap-1">
                    <span className="text-brand-purple">"project_brief"</span>:
                  </div>
                  <textarea
                    required rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe custom features, timelines, or deployment details..."
                    className="w-full px-4.5 py-3 rounded-lg bg-zinc-950 border border-white/5 text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-purple/40 focus:ring-1 focus:ring-brand-purple/20 transition-all font-mono resize-none"
                  />
                </div>

                {/* Execute/Send Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status !== "idle"}
                  className="w-full relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-heading font-black uppercase tracking-wider text-xs transition-all cursor-pointer overflow-hidden disabled:opacity-60 bg-brand-purple text-white shadow-md shadow-brand-purple/10"
                >
                  {status === "idle" && (
                    <>
                      <span>Execute POST Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                  {status === "sending" && (
                    <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  )}
                  {status === "done" && (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Response 200 OK</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* API Response Display panel overlay */}
              <AnimatePresence>
                {apiResponse && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="border-t border-white/5 bg-[#070709] p-6 text-left"
                  >
                    <div className="flex items-center justify-between text-zinc-500 mb-3 text-[10px]">
                      <span className="font-bold flex items-center gap-1"><Code2 className="w-3.5 h-3.5 text-brand-cyan" /> HTTP RESPONSE BODY</span>
                      <div className="flex gap-4">
                        <span>Status: <span className="text-emerald-400 font-bold">{apiResponse.status} {apiResponse.statusText}</span></span>
                        <span>Time: <span className="text-zinc-300 font-bold">{apiResponse.responseTime}</span></span>
                      </div>
                    </div>
                    <pre className="p-4 rounded-lg bg-zinc-950 border border-white/5 text-zinc-400 overflow-x-auto text-[10px] leading-relaxed">
                      {JSON.stringify(apiResponse.body, null, 2)}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
