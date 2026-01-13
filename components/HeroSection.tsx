"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-brand-navy">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full full opacity-40"
        style={{
          background: "radial-gradient(circle at center, rgba(49,197,244,0.25) 0%, rgba(49,197,244,0.12) 25%, rgba(49,197,244,0.06) 45%, transparent 70%)"
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(1200px 1200px at 50% 50%, transparent 60%, rgba(2,6,23,0.6) 100% blur-[100px])"
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-brand-cyan/10 rounded-full"
        style={{ filter: "blur(120px) drop-shadow(0 0 60px rgba(34,211,238,0.35))" }}
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -120, 0],
          y: [0, -80, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-brand-cyan-glow/10 rounded-full"
        style={{ filter: "blur(150px) drop-shadow(0 0 80px rgba(34,211,238,0.3))" }}
      />

      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.08]"
        style={{
          maskImage: "radial-gradient(circle, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 80%)"
        }}
      >
        <div className="grid grid-cols-2 gap-8 w-full h-full ">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="bg-[#00ccff] rounded-[40px] shadow-[0_0_80px_rgba(49,197,244,0.35)]" 
          />
          <div className="border-[4px] border-[#00ccff] rounded-[40px] shadow-[0_0_35px_rgba(49,197,244,0.2)]" />
          <div className="border-[4px] border-[#00ccff] rounded-[40px] shadow-[0_0_35px_rgba(49,197,244,0.2)]" />
          <div className="border-[4px] border-[#00ccff] rounded-[40px] shadow-[0_0_35px_rgba(49,197,244,0.2)]" />
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

     
    </div>
  );
}
