"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    // Add newsletter subscription logic here
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail("");
      alert("Thanks for subscribing!");
    }, 1000);
  };

  return (
    <footer className="relative py-16 bg-[#020617] border-t border-white/5 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1f]/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-3 h-3 bg-[#1ECEFA] rounded-[2px] shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                <div className="w-3 h-3 rounded-[2px] bg-[#14171D] shadow-[0_0_6px_rgba(30,206,250,0.4),inset_0_0_6px_rgba(30,206,250,0.2)]" />
                <div className="w-3 h-3 rounded-[2px] bg-[#14171D] shadow-[0_0_6px_rgba(30,206,250,0.4),inset_0_0_6px_rgba(30,206,250,0.2)]" />
                <div className="w-3 h-3 rounded-[2px] bg-[#14171D] shadow-[0_0_6px_rgba(30,206,250,0.4),inset_0_0_6px_rgba(30,206,250,0.2)]" />
              </div>
              <span className="text-white font-bold text-xl">blox</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Next-generation AI-powered platform for professional branding.
            </p>
            <div className="pt-2">
              <p className="text-slate-500 text-xs">Get Support:</p>
              <a 
                href="mailto:corporate.blox@gmail.com" 
                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center gap-2 mt-1"
              >
                <Mail className="w-4 h-4" />
                corporate.blox@gmail.com
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Navigate</h3>
            <ul className="space-y-3">
              {['Home', 'Features', 'How It Works', 'Waitlist'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Stay Updated</h3>
            <p className="text-slate-400 text-sm">
              Get the latest updates and news delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2.5 bg-[#14171D] border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
              />
              <motion.button
                type="submit"
                disabled={isSubscribing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 text-sm"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-sm">Follow us:</span>
            <div className="flex gap-6 sm:gap-3">
              <motion.a
                href="https://twitter.com/bloxplatform"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X (Twitter)"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <svg className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <svg className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Blox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
