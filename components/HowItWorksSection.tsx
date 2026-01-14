"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    step: "01",
    title: "Connect Your World",
    description: "Link your existing accounts—LinkedIn, GitHub, Dribbble, Medium. Blox securely imports your history.",
    tags: ["OAuth 2.0", "Secure", "Instant"],
    color: "from-blue-500 to-indigo-500"
  },
  {
    step: "02",
    title: "AI Synthesis",
    description: "Our engine analyzes your data, identifying key skills, achievements, and career milestones automatically.",
    tags: ["LLM Analysis", "Skill Graph", "Semantic Search"],
    color: "from-cyan-400 to-teal-400"
  },
  {
    step: "03",
    title: "Design Generation",
    description: "Blox generates stunning, professional portfolios and résumés tailored to your specific industry standards.",
    tags: ["React", "Tailwind", "Framer Motion"],
    color: "from-purple-500 to-pink-500"
  },
  {
    step: "04",
    title: "Launch & Grow",
    description: "Publish instantly. Receive analytics on who's viewing your profile and get AI suggestions for improvement.",
    tags: ["Analytics", "SEO", "Optimization"],
    color: "from-orange-400 to-red-500"
  }
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="py-32 bg-[#020617] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-32"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6"
          >
            Workflow
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Blox</span> Works
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            From scattered data to a unified professional identity in minutes.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 transform -translate-x-1/2 hidden md:block">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-brand-cyan shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              style={{ height: useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]) }}
            />
          </div>

          {steps.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }: { item: any, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex flex-col md:flex-row items-center justify-between mb-24 relative ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Content Card */}
      <div className={`w-full md:w-5/12 ${isEven ? "md:text-left" : "md:text-right"}`}>
        <div className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm overflow-hidden">
          <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          <span className={`text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b ${item.color} opacity-20 mb-4 block`}>
            {item.step}
          </span>
          
          <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
          <p className="text-slate-400 leading-relaxed mb-6">
            {item.description}
          </p>

          <div className={`flex flex-wrap gap-2 ${isEven ? "justify-start" : "justify-end"}`}>
            {item.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-slate-300 border border-white/5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center Node */}
      <div className="relative z-10 w-12 h-12 rounded-full bg-[#020617] border-2 border-white/10 flex items-center justify-center my-6 md:my-0 shadow-[0_0_20px_rgba(0,0,0,0.5)] group">
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-20 blur-lg group-hover:opacity-60 transition-opacity duration-500`} />
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} shadow-[0_0_10px_currentColor]`} />
      </div>

      {/* Empty Side */}
      <div className="w-full md:w-5/12 hidden md:block" />
    </motion.div>
  );
}
