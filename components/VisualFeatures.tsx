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
             className="md:col-span-2 relative rounded-3xl overflow-hidden bg-[#0F172A]/40 border border-white/5 group hover:border-cyan-500/30 transition-colors duration-500 backdrop-blur-sm"
             whileHover={{ y: -5 }}
           >
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             {/* Abstract Resume UI */}
             <div className="absolute inset-10 bg-[#020617] rounded-xl border border-white/5 p-6 flex flex-col gap-4 overflow-hidden shadow-2xl group-hover:shadow-cyan-900/20 transition-shadow">
                <div className="w-1/3 h-4 bg-white/10 rounded-full" />
                <div className="w-1/2 h-8 bg-white/10 rounded-lg mb-4" />
                <div className="space-y-3">
                    <div className="w-full h-2 bg-white/5 rounded-full" />
                    <div className="w-5/6 h-2 bg-white/5 rounded-full" />
                    <div className="w-4/6 h-2 bg-white/5 rounded-full" />
                </div>
                
                {/* Scanner effect */}
                <motion.div 
                    className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent pointer-events-none blur-sm"
                    animate={{ top: ["-20%", "120%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
             </div>
             
             <div className="absolute bottom-6 left-6">
                <div className="font-bold text-xl tracking-tight text-slate-100 group-hover:text-cyan-400 transition-colors">ATS Optimized</div>
                <div className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">Beat the bots</div>
             </div>
           </motion.div>

           {/* Card 2: Speed */}
           <motion.div 
             className="relative rounded-3xl overflow-hidden bg-[#0F172A]/40 border border-white/5 group flex items-center justify-center hover:border-cyan-500/30 transition-colors duration-500 backdrop-blur-sm"
             whileHover={{ y: -5 }}
           >
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-32 h-32">
                 <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                    <motion.circle 
                        cx="50" cy="50" r="40" 
                        stroke="#22D3EE" strokeWidth="8" fill="none"
                        strokeLinecap="round"
                        strokeDasharray="251.2"
                        strokeDashoffset="251.2"
                        whileInView={{ strokeDashoffset: 50 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold text-white tracking-tighter">10x</span>
                    <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider">Faster</span>
                 </div>
              </div>
           </motion.div>

           {/* Card 3: Interactive Template */}
           <motion.div 
             className="relative rounded-3xl overflow-hidden bg-[#0F172A]/40 border border-white/5 group hover:border-purple-500/30 transition-colors duration-500 backdrop-blur-sm"
             whileHover={{ y: -5 }}
           >
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative w-40 h-56 bg-white/5 rounded-xl border border-white/10 transform group-hover:rotate-6 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                 </div>
                 <div className="absolute w-40 h-56 bg-[#020617] rounded-xl border border-white/10 transform group-hover:-rotate-3 transition-transform duration-500 shadow-2xl flex flex-col p-4 gap-3 z-10 group-hover:border-purple-500/30">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500" />
                    <div className="w-20 h-2 bg-white/10 rounded-full" />
                    <div className="w-full h-16 bg-white/5 rounded-lg mt-2" />
                 </div>
              </div>
              <div className="absolute bottom-6 left-6">
                 <div className="font-bold text-xl tracking-tight text-slate-100 group-hover:text-purple-400 transition-colors">Dynamic Templates</div>
              </div>
           </motion.div>

           {/* Card 4: Global/Wide */}
           <motion.div 
             className="md:col-span-2 relative rounded-3xl overflow-hidden bg-[#0F172A]/40 border border-white/5 group bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5 hover:border-cyan-500/30 transition-colors duration-500 backdrop-blur-sm"
             whileHover={{ y: -5 }}
           >
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse" />
             
             {/* Scrolling Text/Code */}
             <div className="absolute inset-0 flex items-center overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity duration-500">
               <motion.div 
                 className="flex gap-8 whitespace-nowrap text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent"
                 animate={{ x: [0, -1000] }}
                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               >
                 <span>REACT TYPESCRIPT NEXTJS PYTHON JAVA KOTLIN RUST GO SWIFT</span>
                 <span>REACT TYPESCRIPT NEXTJS PYTHON JAVA KOTLIN RUST GO SWIFT</span>
               </motion.div>
             </div>
             
             <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                    <div className="font-bold text-xl tracking-tight text-slate-100">Skill Verification</div>
                    <div className="text-sm text-slate-500">Automated technical assessment</div>
                </div>
                <div className="px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    AI Powered
                </div>
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
                y: [y, y - 15, y],
                x: [x, x + 8, x],
                rotate: [0, 5, -5, 0]
            }}
            transition={{ 
                duration: 5, 
                delay: delay, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut" 
            }}
            className="absolute z-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#0F172A]/90 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] group hover:border-cyan-500/50 transition-colors duration-500"
            style={{ 
                left: "50%", 
                top: "50%",
                marginLeft: x > 0 ? 0 : -64, 
                marginTop: y > 0 ? 0 : -64 
            }}
        >
            <div className={`p-3 rounded-xl bg-gradient-to-br transition-all duration-300 group-hover:scale-110 ${
                icon === 'github' ? 'from-slate-700 to-slate-900' : 
                icon === 'linkedin' ? 'from-blue-600 to-blue-800' : 
                icon === 'dribbble' ? 'from-pink-500 to-rose-600' : 'from-sky-400 to-blue-500'
            }`}>
                 {icon === 'github' && (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                 )}
                 {icon === 'linkedin' && (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                 )}
                 {icon === 'dribbble' && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-5.385a15.195 15.195 0 0 1-6.914 2.957m-9.673-8.083A14.993 14.993 0 0 0 12 2.056m0 0c-4.418 0-8.243 2.502-10.153 6.223m15.895-1.517c2.532 3.656 4.148 7.377 2.298 11.238"></path></svg>
                 )}
                 {icon === 'twitter' && (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                 )}
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/5 blur-xl rounded-full -z-10 group-hover:bg-cyan-500/20 transition-colors duration-500" />
        </motion.div>
    )
}
