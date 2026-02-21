"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative isolate min-h-screen overflow-x-hidden bg-[#020617] text-slate-50 flex flex-col justify-center items-center">
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? "py-4" : "py-6"}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className={`relative flex items-center justify-between transition-all duration-500 ${
            isScrolled 
              ? "bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full px-6 py-3" 
              : "bg-transparent border-transparent px-0 py-2"
          }`}>
            {/* Logo - 2x2 Grid */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="grid grid-cols-2 gap-1 transition-transform duration-500 group-hover:rotate-180">
                <div className="w-4 h-4 bg-[#1ECEFA] rounded-[2px] shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                <div className="w-4 h-4 rounded-[2px] bg-[#14171D] shadow-[0_0_6px_rgba(30,206,250,0.4),inset_0_0_6px_rgba(30,206,250,0.2)]" />
                <div className="w-4 h-4 rounded-[2px] bg-[#14171D] shadow-[0_0_6px_rgba(30,206,250,0.4),inset_0_0_6px_rgba(30,206,250,0.2)]" />
                <div className="w-4 h-4 rounded-[2px] bg-[#14171D] shadow-[0_0_6px_rgba(30,206,250,0.4),inset_0_0_6px_rgba(30,206,250,0.2)]" />
              </div>
              <span className="text-white font-bold tracking-tight text-lg">blox</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { name: "Features", href: "#features" },
                { name: "How it Works", href: "#how-it-works" },
                // { name: "Testimonials", href: "#testimonials" }
              ].map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a href="#waitlist">
              <button className={`relative group overflow-hidden rounded-full transition-all ${
                isScrolled 
                  ? "bg-brand-cyan/10 border border-brand-cyan/20 hover:bg-brand-cyan/20" 
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              } px-5 py-2`}>
                <span className={`relative z-10 text-sm font-semibold transition-colors ${
                  isScrolled ? "text-brand-cyan" : "text-white"
                }`}>
                  Get Access
                </span>
              </button>
            </a>
          </div>
        </div>
      </nav>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-40"
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

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
      <HeroContent />
    </section>
  );
}

function HeroContent() {
  const [index, setIndex] = useState(0);
  const words = ["career", "brand", "identity", "future"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Floating particles for background
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="relative z-20 container mx-auto px-4 md:px-6 text-center overflow-hidden min-h-[600px] flex flex-col justify-center">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-[1px] h-[1px] bg-cyan-400/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main heading with enhanced typography */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl opacity-50 rounded-full" />
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[85px] xl:text-[96px] font-bold font-inter tracking-tighter leading-[1.05] mb-6">
          <span className="block text-white mb-2">
            Your{" "}
            <span className="inline-block min-w-[3ch] text-left">
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 inline-block"
              >
                {words[index]}
              </motion.span>
            </span>
            ,
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 via-blue-500 to-indigo-600 inline-block relative">
             assembled by AI
             <motion.span
                className="absolute -top-4 -right-8"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
              </motion.span>
          </span>
        </h1>

        {/* Subtitle with gradient border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative mt-8 md:mt-1"
        >
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto px-2 py-2 "
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
             Import once. Generate everything. Share everywhere.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Enhanced CTA buttons */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
        className="relative mt-5 md:mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
      >
        {/* Primary CTA */}
        {/* Primary CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative rounded-full bg-white/5 border border-white/10 px-8 py-4 md:px-10 md:py-5 transition-all duration-300 overflow-hidden hover:bg-brand-cyan/20 hover:border-brand-cyan/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
          onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {/* Button content */}
          <span className="relative z-10 flex items-center gap-3 text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors tracking-wide">
            Join the Waitlist
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </span>
        </motion.button>

        {/* Secondary CTA */}
        <motion.a
          href="https://chat.whatsapp.com/Fg9EqLFYJ0EF5EgpUsYRj2"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative rounded-full bg-white/5 border border-white/10 px-8 py-4 md:px-10 md:py-5 transition-all duration-300 overflow-hidden hover:bg-white/10 hover:border-white/30 cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-3 text-lg font-semibold text-slate-300 group-hover:text-white transition-colors tracking-wide">
            Join the Community
            <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </span>
        </motion.a>
      </motion.div>

      {/* Enhanced Stats Cards */}
     
    </div>
  );
}
