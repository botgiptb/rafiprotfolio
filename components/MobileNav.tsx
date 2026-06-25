"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#services",  label: "Services" },
  { href: "#portfolio", label: "Projects" },
  { href: "#about",     label: "About" },
  { href: "#contact",   label: "Contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Close on route change / hash navigation
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* Hamburger toggle */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-16 bg-black/70 backdrop-blur-sm z-30"
            />

            {/* Drawer panel */}
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-16 left-0 right-0 z-40 bg-[#0a0a0d] border-b border-white/5 shadow-2xl px-6 py-6 flex flex-col gap-1"
            >
              {navLinks.map(({ href, label }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-heading font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all"
                >
                  <span className="text-brand-purple text-[10px] font-mono">0{i + 1}</span>
                  {label}
                </motion.a>
              ))}

              <div className="mt-4 pt-4 border-t border-white/5">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl bg-brand-purple text-white text-sm font-heading font-black uppercase tracking-wider transition-all hover:bg-brand-purple/90"
                >
                  Get in Touch
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
