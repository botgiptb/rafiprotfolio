"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Phone, MapPin, Code2, Server, Database, Zap, Globe, Shield } from "lucide-react";

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

const contactItems = [
  { icon: Mail, label: "mailto://", value: "rafimdev@gmail.com", href: "mailto:rafimdev@gmail.com", color: "text-brand-purple", bg: "bg-brand-purple/10 border-brand-purple/20" },
  { icon: Phone, label: "tel://", value: "+91 7736205024", href: "tel:+917736205024", color: "text-brand-cyan", bg: "bg-brand-cyan/10 border-brand-cyan/20" },
  { icon: MapPin, label: "location://", value: "Pattambi, Kerala • Remote / On-Site", href: undefined, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" }
];

const statusBadges = [
  { icon: Server, label: "Status", value: "Online", color: "text-emerald-400" },
  { icon: Zap, label: "Response", value: "< 24h", color: "text-brand-cyan" },
  { icon: Globe, label: "Mode", value: "Remote", color: "text-brand-purple" },
  { icon: Shield, label: "Avail", value: "Open", color: "text-amber-400" },
];

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
      setForm({ name: "", email: "", queryType: "odoo_custom", message: "" });
    }, 1800);
  };

  return (
    <section id="contact" className="relative py-32 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[120px]" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500/3 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-heading font-black uppercase tracking-[0.25em] text-brand-purple mb-4"
          >
            03 / Connection Socket
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-zinc-100 tracking-tight uppercase leading-none"
          >
            Establish
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-purple ml-4">
              Connection
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-sm mt-4 max-w-xl mx-auto font-sans leading-relaxed"
          >
            Need to automate business flows, deploy an Odoo instance, or consult on system architecture?
            Hit the API endpoint to initiate contact.
          </motion.p>
        </div>

        {/* ── Status Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {statusBadges.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950 border border-white/5 font-mono text-[11px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" style={{ color: 'inherit' }} />
              <Icon className={`w-3 h-3 ${color}`} />
              <span className="text-zinc-500">{label}:</span>
              <span className={`font-bold ${color}`}>{value}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Contact Cards */}
            <div className="flex flex-col gap-4">
              {contactItems.map(({ icon: Icon, label, value, href, color, bg }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-4 p-5 rounded-2xl border ${bg} transition-all duration-300 group`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-zinc-950/80 border border-white/5`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className={`text-sm font-heading font-bold text-zinc-200 hover:${color} transition-colors truncate block`}>
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-heading font-bold text-zinc-300 truncate">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* System info panel */}
            <div className="rounded-2xl bg-zinc-950/60 border border-white/5 p-5 font-mono text-[11px]">
              <div className="flex items-center gap-2 mb-4 text-zinc-500">
                <Database className="w-3.5 h-3.5 text-brand-cyan" />
                <span className="font-bold uppercase tracking-widest text-[10px]">System Info</span>
              </div>
              <div className="space-y-2 text-zinc-400">
                <div className="flex justify-between">
                  <span className="text-zinc-600">endpoint</span>
                  <span className="text-brand-cyan">api.rafi.dev/v1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">method</span>
                  <span className="text-emerald-400 font-bold">POST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">auth</span>
                  <span className="text-zinc-300">none required</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">content-type</span>
                  <span className="text-zinc-300">application/json</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">timezone</span>
                  <span className="text-zinc-300">IST (UTC+5:30)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: REST Client Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-7 w-full"
          >
            <div className="rounded-2xl bg-[#0d0d11] border border-white/5 shadow-2xl overflow-hidden font-mono text-xs">

              {/* REST Client Top Bar */}
              <div className="bg-zinc-900/80 border-b border-white/5 px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/60" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <span className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-zinc-950 border border-white/5 rounded-md px-3 py-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-black text-[10px] tracking-wider uppercase">
                      POST
                    </span>
                    <span className="text-zinc-500 text-[11px]">https://api.rafi.dev/v1/contact</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-zinc-500 font-bold hidden sm:block">CONNECTED</span>
                </div>
              </div>

              {/* Tabs bar */}
              <div className="bg-zinc-900/40 border-b border-white/5 px-5 flex items-center gap-4 text-[11px] text-zinc-600">
                <button className="py-2.5 border-b-2 border-brand-purple text-brand-purple font-bold -mb-px">Body</button>
                <button className="py-2.5 hover:text-zinc-400 transition-colors">Headers</button>
                <button className="py-2.5 hover:text-zinc-400 transition-colors">Auth</button>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">

                {/* Name + Email — side by side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <div className="text-[10px] text-zinc-600 mb-1.5">
                      <span className="text-sky-400">&quot;sender_name&quot;</span>
                      <span className="text-zinc-600">: </span>
                      <span className="text-zinc-700">string</span>
                    </div>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/20 transition-all font-mono text-xs"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-600 mb-1.5">
                      <span className="text-sky-400">&quot;sender_email&quot;</span>
                      <span className="text-zinc-600">: </span>
                      <span className="text-zinc-700">string</span>
                    </div>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/20 transition-all font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Query Type */}
                <div>
                  <div className="text-[10px] text-zinc-600 mb-1.5">
                    <span className="text-sky-400">&quot;project_scope&quot;</span>
                    <span className="text-zinc-600">: </span>
                    <span className="text-zinc-700">enum</span>
                  </div>
                  <select
                    value={form.queryType}
                    onChange={e => setForm({ ...form, queryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-zinc-300 focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/20 transition-all font-mono text-xs cursor-pointer"
                  >
                    {queryTypes.map(q => <option key={q.value} className="bg-zinc-950 text-zinc-300" value={q.value}>{q.label}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <div className="text-[10px] text-zinc-600 mb-1.5">
                    <span className="text-sky-400">&quot;project_brief&quot;</span>
                    <span className="text-zinc-600">: </span>
                    <span className="text-zinc-700">string</span>
                  </div>
                  <textarea
                    required rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe custom features, timelines, or deployment details..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/5 text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/20 transition-all font-mono text-xs resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  type="submit"
                  disabled={status !== "idle"}
                  className="w-full relative flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-heading font-black uppercase tracking-wider text-xs transition-all cursor-pointer overflow-hidden disabled:opacity-60 bg-gradient-to-r from-brand-purple to-violet-600 text-white shadow-lg shadow-brand-purple/25"
                >
                  {/* Shimmer overlay */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  {status === "idle" && (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Execute POST Request</span>
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      <span>Sending Payload...</span>
                    </>
                  )}
                  {status === "done" && (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-300" />
                      <span className="text-emerald-300">Response 200 OK</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* API Response Panel */}
              <AnimatePresence>
                {apiResponse && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5 bg-zinc-950/80 p-6 text-left overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-zinc-500 mb-3 text-[10px]">
                      <span className="font-bold flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-brand-cyan" />
                        HTTP RESPONSE BODY
                      </span>
                      <div className="flex gap-4">
                        <span>Status: <span className="text-emerald-400 font-bold">{apiResponse.status} {apiResponse.statusText}</span></span>
                        <span>Time: <span className="text-zinc-300 font-bold">{apiResponse.responseTime}</span></span>
                      </div>
                    </div>
                    <pre className="p-4 rounded-xl bg-[#070709] border border-white/5 text-zinc-400 overflow-x-auto text-[10px] leading-relaxed">
                      {JSON.stringify(apiResponse.body, null, 2)}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
