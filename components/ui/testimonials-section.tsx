"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    { text: "Blox saved me hours on my portfolio! It literally built itself.", author: "Sarah J.", role: "Product Designer" },
    { text: "The ATS optimization feature helped me land interviews at top tech firms.", author: "Mike T.", role: "Senior Developer" },
    { text: "Finally, a branding tool that feels like it's from the future.", author: "Jessica L.", role: "Tech Lead" }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-cyan/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Builders</span>
        </h2>
        <p className="text-slate-400">Join thousands of professionals accelerating their careers.</p>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white/[0.03] border border-white/5 p-8 rounded-3xl relative backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
          >
            <div className="flex gap-1 mb-6 text-yellow-500/80">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light">"{t.text}"</p>
            <div>
                <div className="text-white font-semibold text-lg">{t.author}</div>
                <div className="text-slate-500 text-sm">{t.role}</div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
