"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Network, Zap, FileCheck, Layers, Cpu, Globe } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: Network,
    title: "25+ Network Integrations",
    description: "Seamlessly connect LinkedIn, GitHub, Behance, and more. Blox aggregates your digital footprint instantly.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Zap,
    title: "AI-Powered Automation",
    description: "No more manual updates. Our AI constantly monitors your achievements and updates your portfolio in real-time.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: FileCheck,
    title: "ATS-Optimized",
    description: "Beat the bots. Every résumé generated is perfectly structured to pass Applicant Tracking Systems.",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: Layers,
    title: "Dynamic Templates",
    description: "Switch designs with one click. From creative to corporate, your content adapts to any style perfectly.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Cpu,
    title: "Skill Verification",
    description: "AI analyzes your code and projects to verify skills, giving employers confidence in your expertise.",
    color: "from-cyan-400 to-blue-500"
  },
  {
    icon: Globe,
    title: "Custom Domain",
    description: "Host your professional identity on your own domain with one-click setup and free SSL.",
    color: "from-purple-500 to-violet-500"
  }
];

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-32 bg-[#020617] relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-sm font-semibold mb-6"
          >
            Capabilities
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Next-Gen AI</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Blox isn't just a builder; it's your proactive career agent working 24/7 to showcase your best self.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 backdrop-blur-sm overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
      
      <div className="relative z-10">
        <div className={`w-14 h-14 mb-8 rounded-2xl bg-gradient-to-br ${feature.color} p-[1px] group-hover:scale-110 transition-transform duration-300`}>
          <div className="w-full h-full rounded-2xl bg-[#0B0E15] flex items-center justify-center">
            <feature.icon size={26} className="text-white" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-brand-cyan transition-colors">
          {feature.title}
        </h3>
        <p className="text-slate-400 leading-relaxed font-light">
          {feature.description}
        </p>
      </div>

      {/* Hover Glow */}  
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
