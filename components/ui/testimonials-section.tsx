"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    { text: "Blox saved me hours on my portfolio! It literally built itself.", author: "Sarah J., Designer" },
    { text: "The ATS optimization feature helped me land interviews at top tech firms.", author: "Mike T., Developer" },
    { text: "Finally, a branding tool that feels like it's from the future.", author: "Jessica L., Product Manager" }
  ];

  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-white mb-12">What Early Users Are <span className="text-brand-cyan">Saying</span></h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="bg-brand-navy-light/40 border border-white/5 p-6 rounded-2xl relative"
          >
            <div className="flex gap-1 mb-4 text-yellow-400">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-gray-300 italic mb-4">"{t.text}"</p>
            <div className="text-brand-cyan font-bold text-sm">{t.author}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
