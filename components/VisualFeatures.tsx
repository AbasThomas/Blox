"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function VisualFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#020617] overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Speed</span>
          </motion.h2>
        </div>

        {/* Feature 1: The Assembly Core */}
        <div className="mb-32 flex flex-col items-center">
          <div className="relative w-full max-w-4xl h-[400px] md:h-[600px] flex items-center justify-center">
            {/* Rotating Rings */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                style={{ 
                    rotate: i % 2 === 0 ? rotate : useTransform(scrollYProgress, [0, 1], [360, 0]),
                    scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])
                }}
                className={`absolute rounded-full border border-cyan-500/${20 - i * 5}`}
                initial={{ width: 200 * i, height: 200 * i }}
              />
            ))}

            {/* Central Core */}
            <motion.div
              style={{ y }}
              className="relative w-32 h-32 md:w-48 md:h-48 bg-black rounded-3xl border border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.2)] flex items-center justify-center z-10 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-xl animate-pulse" />
              
              {/* Scanline */}
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              />
            </motion.div>

            {/* Floating Integrations */}
            <FloatingIcon delay={0} x={-150} y={-100} icon="github" />
            <FloatingIcon delay={1} x={150} y={-50} icon="linkedin" />
            <FloatingIcon delay={2} x={-100} y={150} icon="dribbble" />
            <FloatingIcon delay={1.5} x={120} y={120} icon="twitter" />
          </div>
          <p className="sr-only">Visual representation of data aggregation</p>
        </div>

        {/* Feature 2: Bento Grid Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
           {/* Card 1: Resume Scanning - Wide */}
           <motion.div 
             className="md:col-span-2 relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 group"
             whileHover={{ scale: 1.02 }}
           >
             <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
             
             {/* Abstract Resume UI */}
             <div className="absolute inset-10 bg-slate-900 rounded-xl border border-white/5 p-6 flex flex-col gap-4 overflow-hidden">
                <div className="w-1/3 h-4 bg-white/10 rounded-full" />
                <div className="w-1/2 h-8 bg-white/10 rounded-lg mb-4" />
                <div className="space-y-2">
                    <div className="w-full h-2 bg-white/5 rounded-full" />
                    <div className="w-5/6 h-2 bg-white/5 rounded-full" />
                    <div className="w-4/6 h-2 bg-white/5 rounded-full" />
                </div>
                
                {/* Scanner effect */}
                <motion.div 
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none"
                    animate={{ translateY: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
             </div>
             
             <div className="absolute bottom-6 left-6 font-bold text-xl tracking-tight">ATS Optimized</div>
           </motion.div>

           {/* Card 2: Speed */}
           <motion.div 
             className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 group flex items-center justify-center"
             whileHover={{ scale: 1.02 }}
           >
              <div className="relative w-32 h-32">
                 <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                    <motion.circle 
                        cx="50" cy="50" r="40" 
                        stroke="#22D3EE" strokeWidth="8" fill="none"
                        strokeDasharray="251.2"
                        strokeDashoffset="251.2"
                        whileInView={{ strokeDashoffset: 50 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold">10x</span>
                    <span className="text-xs text-gray-400">Faster</span>
                 </div>
              </div>
           </motion.div>

           {/* Card 3: Interactive Template - Tall ? No, keeps row height */}
           <motion.div 
             className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 group"
             whileHover={{ scale: 1.02 }}
           >
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative w-40 h-56 bg-white/5 rounded-xl border border-white/10 transform group-hover:rotate-6 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                 </div>
                 <div className="absolute w-40 h-56 bg-slate-900 rounded-xl border border-white/10 transform group-hover:-rotate-3 transition-transform duration-500 shadow-2xl flex flex-col p-3 gap-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20" />
                    <div className="w-20 h-2 bg-white/20 rounded-full" />
                 </div>
              </div>
              <div className="absolute bottom-6 left-6 font-bold text-xl tracking-tight">Dynamic Templates</div>
           </motion.div>

           {/* Card 4: Global/Wide */}
           <motion.div 
             className="md:col-span-2 relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 group bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-10"
             whileHover={{ scale: 1.02 }}
           >
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse" />
             
             {/* Scrolling Text/Code */}
             <div className="absolute inset-0 flex items-center overflow-hidden opacity-30">
               <motion.div 
                 className="flex gap-8 whitespace-nowrap text-4xl font-black text-white/5"
                 animate={{ x: [0, -1000] }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               >
                 <span>REACT TYPE SCRIPT NEXTJS PYTHON JAVA KOTLIN RUST GO SWIFT</span>
                 <span>REACT TYPE SCRIPT NEXTJS PYTHON JAVA KOTLIN RUST GO SWIFT</span>
               </motion.div>
             </div>
             
             <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <span className="font-bold text-xl tracking-tight">Skill Verification</span>
                <span className="text-cyan-400">AI Powered</span>
             </div>
           </motion.div>

        </div>
      </div>
    </section>
  );
}

function FloatingIcon({ delay, x, y, icon }: { delay: number; x: number; y: number; icon: string }) {
    return (
        <motion.div
            animate={{ 
                y: [y, y - 20, y],
                x: [x, x + 10, x],
                rotate: [0, 10, -10, 0]
            }}
            transition={{ 
                duration: 4, 
                delay: delay, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut" 
            }}
            className="absolute z-0 w-16 h-16 rounded-2xl bg-slate-800/80 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-xl"
            style={{ 
                left: "50%", 
                top: "50%",
                marginLeft: -32, // Half width
                marginTop: -32   // Half height
            }}
        >
            <div className={`w-8 h-8 ${
                icon === 'github' ? 'bg-white' : 
                icon === 'linkedin' ? 'bg-[#0077b5]' : 
                icon === 'dribbble' ? 'bg-[#ea4c89]' : 'bg-[#1DA1F2]'
            } rounded-md mask-icon`} style={{
                maskImage: 'url(...)', // Simplified, just using color blocks for 'visual' impact logic 
                WebkitMaskImage: 'url(...)'
            }} />
            {/* Simple colored blocks for abstract representation since we don't have icon svgs handy instantly */}
             <div className={`w-6 h-6 rounded-sm ${
                icon === 'github' ? 'bg-white' : 
                icon === 'linkedin' ? 'bg-[#0077b5]' : 
                icon === 'dribbble' ? 'bg-[#ea4c89]' : 'bg-sky-400'
            }`} />
        </motion.div>
    )
}
