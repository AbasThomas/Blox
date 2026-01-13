"use client";

import { motion } from "framer-motion";
import { Network, Zap, FileCheck, Layers, Cpu, Globe } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "25+ Network Integrations",
    description: "Seamlessly connect LinkedIn, GitHub, Behance, and more. Blox aggregates your digital footprint instantly."
  },
  {
    icon: Zap,
    title: "AI-Powered Automation",
    description: "No more manual updates. Our AI constantly monitors your achievements and updates your portfolio in real-time."
  },
  {
    icon: FileCheck,
    title: "ATS-Optimized",
    description: "Beat the bots. Every résumé generated is perfectly structured to pass Applicant Tracking Systems."
  },
  {
    icon: Layers,
    title: "Dynamic Templates",
    description: "Switch designs with one click. From creative to corporate, your content adapts to any style perfectly."
  },
  {
    icon: Cpu,
    title: "Skill Verification",
    description: "AI analyzes your code and projects to verify skills, giving employers confidence in your expertise."
  },
  {
    icon: Globe,
    title: "Custom Domain",
    description: "Host your professional identity on your own domain with one-click setup and free SSL."
  }
];

export default function FeaturesSection() {
  // return (
  //   <section className="py-24 bg-brand-navy relative overflow-hidden">
  //     {/* Background Decor */}
  //     <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
  //       <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl" />
  //       <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-brand-cyan-glow/5 rounded-full blur-3xl" />
        
  //       {/* Abstract Logo Grid Background */}
  //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] rotate-12">
  //           <div className="grid grid-cols-2 gap-4 w-full h-full">
  //               <div className="bg-brand-cyan rounded-3xl" />
  //               <div className="border-4 border-brand-cyan rounded-3xl" />
  //               <div className="border-4 border-brand-cyan rounded-3xl" />
  //               <div className="border-4 border-brand-cyan rounded-3xl" />
  //           </div>
  //       </div>
  //     </div>

  //     <div className="container mx-auto px-4 relative z-10">
  //       <motion.div 
  //         initial={{ opacity: 0, y: 20 }}
  //         whileInView={{ opacity: 1, y: 0 }}
  //         viewport={{ once: true }}
  //         transition={{ duration: 0.6 }}
  //         className="text-center mb-16"
  //       >
  //         <h2 className="text-3xl md:text-5xl font-bold mb-4">
  //           Powered by <span className="text-brand-cyan">Next-Gen AI</span>
  //         </h2>
  //         <p className="text-gray-400 max-w-2xl mx-auto">
  //           Blox isn't just a builder; it's your proactive career agent.
  //         </p>
  //       </motion.div>

  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //         {features.map((feature, index) => (
  //           <motion.div
  //             key={index}
  //             initial={{ opacity: 0, y: 20 }}
  //             whileInView={{ opacity: 1, y: 0 }}
  //             viewport={{ once: true }}
  //             transition={{ duration: 0.5, delay: index * 0.1 }}
  //             className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-cyan/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
  //           >
  //             <div className="w-12 h-12 mb-6 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform duration-300">
  //               <feature.icon size={24} />
  //             </div>
  //             <h3 className="text-xl font-bold mb-3 text-white group-hover:text-brand-cyan transition-colors">
  //               {feature.title}
  //             </h3>
  //             <p className="text-gray-400 leading-relaxed">
  //               {feature.description}
  //             </p>
  //           </motion.div>
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // );
}
