"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Github, 
  Linkedin, 
  Dribbble, 
  Twitter,
  Zap,
  Globe,
  FileText,
  Layout,
  CheckCircle,
  Cpu,
  LayoutTemplate,
  Sparkles,
  User
} from "lucide-react";

export default function VisualFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <section ref={containerRef} className="relative py-32 bg-linear-to-b from-[#020617] via-[#0B1120] to-[#020617] overflow-hidden text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        
        {/* Gradient Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-linear-to-r from-cyan-500/5 via-blue-500/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-linear-to-r from-purple-500/5 via-pink-500/5 to-transparent rounded-full blur-3xl"
        />

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] h-[1px] bg-cyan-400/30 rounded-full"
              animate={{
                y: [0, -100],
                x: [0, Math.sin(i) * 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}

        <div className="text-center ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-medium text-cyan-400 tracking-wider">NEXT-GEN TECHNOLOGY</span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
          >
            Built for{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
                Speed
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Harness cutting-edge technology to transform your workflow
          </motion.p>
        </div>

        {/* Feature 1: The Assembly Core */}
    <div className="mb-10 flex flex-col items-center">
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-4xl h-[500px] md:h-[700px] flex items-center justify-center"
          >
            {/* Rotating Rings with enhanced effects */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2"
                style={{
                  rotate: i % 2 === 0 ? rotate : useTransform(scrollYProgress, [0, 1], [360, 0]),
                  scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.15, 0.9]),
                  width: 180 * i + 40,
                  height: 180 * i + 40,
                  borderColor: `rgba(34, 211, 238, ${0.15 - i * 0.03})`,
                  boxShadow: `0 0 ${20 + i * 10}px rgba(34, 211, 238, ${0.1 - i * 0.02})`
                }}
              />
            ))}

            {/* Orbital particles */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-3 h-3 rounded-full bg-linear-to-r from-cyan-400 to-blue-500"
                style={{
                  top: '50%',
                  left: '50%',
                  marginLeft: -6,
                  marginTop: -6,
                }}
                animate={{
                  rotate: 360,
                  x: Math.cos((i * Math.PI) / 2) * 200,
                  y: Math.sin((i * Math.PI) / 2) * 200,
                }}
                transition={{
                  rotate: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" },
                  x: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" },
                  y: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" },
                }}
              >
                <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-50" />
              </motion.div>
            ))}

            {/* Central Core - Enhanced */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-40 h-40 md:w-56 md:h-56 bg-linear-to-br from-[#0a0e1f] to-[#020617] rounded-3xl border-2 border-cyan-500/40 shadow-[0_0_80px_rgba(34,211,238,0.3)] flex items-center justify-center z-10 overflow-hidden group cursor-pointer"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-blue-600/20 to-purple-500/20 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
             
              {/* Inner core with pulse */}
              <motion.div
                className="relative w-20 h-20 md:w-28 md:h-28 bg-linear-to-tr from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.6)] flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(34,211,238,0.6)',
                    '0 0 80px rgba(34,211,238,0.8)',
                    '0 0 40px rgba(34,211,238,0.6)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <User className="w-10 h-10 md:w-14 md:h-14 text-white/90" />
              </motion.div>
             
              {/* Enhanced scanline */}
              <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                className="absolute left-0 right-0 h-1 bg-linear-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)]"
              />
             
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-cyan-400 rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-cyan-400 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-cyan-400 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-cyan-400 rounded-br-lg" />
            </motion.div>

            {/* Floating Icons - Enhanced & Distributed (7 items) */}
            <FloatingIcon delay={0} x={0} y={-220} icon="github" />
            <FloatingIcon delay={1} x={190} y={-100} icon="linkedin" />
            <FloatingIcon delay={2} x={200} y={80} icon="dribbble" />
            <FloatingIcon delay={1.5} x={80} y={200} icon="behance" />
            <FloatingIcon delay={3} x={-80} y={200} icon="fiverr" />
            <FloatingIcon delay={2.5} x={-200} y={80} icon="upwork" />
            <FloatingIcon delay={0.5} x={-190} y={-100} icon="twitter" />
          </motion.div>
         
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-500 text-sm mt-8 tracking-wide"
          >
            Unified data aggregation engine
          </motion.p>
        </div>
        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Card 1: ATS Optimization */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-slate-900/50 to-slate-950/50 border border-slate-800/50 p-8 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-cyan-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                    <FileText className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">ATS Optimized</h3>
                    <p className="text-sm text-slate-500">Intelligent parsing</p>
                  </div>
                </div>

                {/* Resume Visualization */}
                <div className="relative h-48 rounded-xl bg-slate-900/50 border border-slate-800/50 overflow-hidden mb-6">
                  <div className="absolute inset-0 p-4 space-y-3">
                    <div className="h-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full w-3/4" />
                    <div className="h-3 bg-slate-800 rounded-full w-1/2" />
                    <div className="space-y-2 mt-4">
                      <div className="h-2 bg-slate-800 rounded-full" />
                      <div className="h-2 bg-slate-800 rounded-full w-5/6" />
                      <div className="h-2 bg-slate-800 rounded-full w-2/3" />
                    </div>
                  </div>
                  
                  {/* Scanner Effect */}
                  <motion.div
                    className="absolute inset-x-0 h-20 bg-linear-to-b from-transparent via-cyan-400/10 to-transparent"
                    animate={{ top: ["-20%", "120%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-slate-400">Keyword analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-slate-400">Format detection</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Performance Metrics */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-slate-900/50 to-slate-950/50 border border-slate-800/50 p-8 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-linear-to-tr from-blue-500/10 to-transparent rounded-full -translate-x-16 translate-y-16" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">10x Faster Processing</h3>
                    <p className="text-sm text-slate-500">Real-time analysis</p>
                  </div>
                </div>

                {/* Speed Gauge */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                    <motion.circle 
                      cx="50" cy="50" r="45" 
                      stroke="url(#speedGradient)" 
                      strokeWidth="8" 
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset="283"
                      initial={{ strokeDashoffset: 283 }}
                      whileInView={{ strokeDashoffset: 70 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">10x</span>
                    <span className="text-[12px] text-slate-400 uppercase tracking-wider mt-2">Performance Boost</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-slate-900/50">
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-xs text-slate-400">Accuracy</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-slate-900/50">
                    <div className="text-2xl font-bold text-white">50ms</div>
                    <div className="text-xs text-slate-400">Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 3: Templates */}
{/* Card 3: Templates */}
          <BentoCard 
            title="Dynamic Templates" 
            description="Start from 50+ pro layouts."
            accent="purple"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-32 h-44 bg-purple-500/10 rounded-xl border border-purple-500/20 rotate-12 group-hover:rotate-[20deg] transition-transform duration-500 absolute" />
              <div className="w-32 h-44 bg-slate-900 rounded-xl border border-white/10 -rotate-6 group-hover:-rotate-12 transition-transform duration-500 z-10 flex flex-col p-4 gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white">
                  <LayoutTemplate size={20} />
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full" />
                <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                <div className="mt-auto h-8 w-full bg-purple-500/20 rounded-lg border border-purple-500/30" />
              </div>
            </div>
          </BentoCard>

          {/* Card 4: AI Skills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-slate-900/50 to-slate-950/50 border border-slate-800/50 p-8 backdrop-blur-sm hover:border-green-500/30 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <Cpu className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">AI Skill Verification</h3>
                  <p className="text-sm text-slate-500">Automated assessment</p>
                </div>
              </div>

              {/* Skills Visualization */}
              <div className="space-y-4">
                {['React', 'TypeScript', 'Python', 'Rust'].map((skill, i) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-300">{skill}</span>
                      <span className="text-sm text-green-400 font-semibold">{90 - i * 15}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-linear-to-r from-green-500 to-emerald-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${90 - i * 15}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Badge */}
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                AI Powered
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingPlatform({ delay, x, y, icon: Icon, label, color }: { 
  delay: number; 
  x: number; 
  y: number; 
  icon: any;
  label: string;
  color: string;
}) {
  return (
    <motion.div
      animate={{ 
        y: [y, y - 20, y],
        x: [x, x + 5, x],
        rotate: [0, 2, -2, 0]
      }}
      transition={{ 
        duration: 4, 
        delay: delay, 
        repeat: Infinity, 
        repeatType: "reverse", 
        ease: "easeInOut" 
      }}
      className="absolute z-0 group cursor-pointer"
      style={{ 
        left: "50%", 
        top: "50%",
        transform: `translate(${x}px, ${y}px)`
      }}
      whileHover={{ scale: 1.1 }}
    >
      <div className={`relative w-20 h-20 rounded-2xl bg-linear-to-br ${color} border border-white/10 backdrop-blur-md flex flex-col items-center justify-center shadow-2xl group-hover:shadow-cyan-500/20 transition-all duration-500`}>
        <Icon className="w-8 h-8 text-white mb-2" />
        <span className="text-xs font-semibold text-white/90 tracking-wide">{label}</span>
        
        {/* Connection Line */}
        <div className="absolute -top-2 -right-2 w-16 h-16 border-t border-r border-cyan-500/30 rounded-tr-2xl" />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-white/5 blur-xl rounded-full -z-10 group-hover:bg-cyan-500/20 transition-colors duration-500" />
      </div>
    </motion.div>
  );
}
function BentoCard({ children, title, description, span = "", accent = "cyan" }: any) {
  const accentColors: any = {
    cyan: "group-hover:border-cyan-500/50",
    blue: "group-hover:border-blue-500/50",
    purple: "group-hover:border-purple-500/50",
    indigo: "group-hover:border-indigo-500/50",
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={`${span} relative rounded-4xl overflow-hidden bg-slate-900/40 border border-white/5 group transition-all duration-500 backdrop-blur-md flex flex-col justify-center items-center ${accentColors[accent]}`}
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-white/[0.03] to-transparent pointer-events-none" />
      
      {children}

      <div className="absolute bottom-8 left-8 right-8">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">{description}</p>
      </div>
    </motion.div>
  );
}



function FloatingIcon({ delay, x, y, icon }: { delay: number; x: number; y: number; icon: string }) {
  return (
    <motion.div
      animate={{
        y: [y, y - 20, y],
        x: [x, x + 10, x],
        rotate: [0, 8, -8, 0]
      }}
      transition={{
        duration: 6,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.15, rotate: 0 }}
      className="absolute z-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-linear-to-br from-[#0F172A] to-[#1E293B] border-2 border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] group cursor-pointer hover:border-cyan-500/50 transition-all duration-500"
      style={{
        left: "50%",
        top: "50%",
        marginLeft: -40, // Centered (w-20 = 80px / 2 = 40)
        marginTop: -40
      }}
    >
      <motion.div
        className={`p-3 md:p-4 rounded-xl bg-linear-to-br transition-all duration-500 ${
          icon === 'github' ? 'from-slate-700 to-slate-900 group-hover:from-slate-600 group-hover:to-slate-800' :
          icon === 'linkedin' ? 'from-blue-600 to-blue-800 group-hover:from-blue-500 group-hover:to-blue-700' :
          icon === 'dribbble' ? 'from-pink-500 to-rose-600 group-hover:from-pink-400 group-hover:to-rose-500' :
          icon === 'behance' ? 'from-blue-600 to-blue-800 group-hover:from-blue-500 group-hover:to-blue-700' :
          icon === 'upwork' ? 'from-lime-500 to-green-600 group-hover:from-lime-400 group-hover:to-green-500' :
          icon === 'fiverr' ? 'from-green-500 to-emerald-600 group-hover:from-green-400 group-hover:to-emerald-500' :
          'from-slate-800 to-black group-hover:from-slate-700 group-hover:to-gray-900' // X (Twitter)
        }`}
        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
      >
        {icon === 'github' && (
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192 .694.801 .576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        )}
        {icon === 'linkedin' && (
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        )}
        {icon === 'dribbble' && (
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"/></svg>
        )}
        {icon === 'behance' && (
          <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" width="24px" height="24px" viewBox="0 0 24 24">
            <path d="M20.07,6.35H15V7.76h5.09ZM19,16.05a2.23,2.23,0,0,1-1.3.37A2.23,2.23,0,0,1,16,15.88a2.49,2.49,0,0,1-.62-1.76H22a6.47,6.47,0,0,0-.17-2,5.08,5.08,0,0,0-.8-1.73,4.17,4.17,0,0,0-1.42-1.21,4.37,4.37,0,0,0-2-.45,4.88,4.88,0,0,0-1.9.37,4.51,4.51,0,0,0-1.47,1,4.4,4.4,0,0,0-.95,1.52,5.4,5.4,0,0,0-.33,1.91,5.52,5.52,0,0,0,.32,1.94A4.46,4.46,0,0,0,14.16,17a4,4,0,0,0,1.46,1,5.2,5.2,0,0,0,1.94.34,4.77,4.77,0,0,0,2.64-.7,4.21,4.21,0,0,0,1.63-2.35H19.62A1.54,1.54,0,0,1,19,16.05Zm-3.43-4.12a1.87,1.87,0,0,1,1-1.14,2.28,2.28,0,0,1,1-.2,1.73,1.73,0,0,1,1.36.49,2.91,2.91,0,0,1,.63,1.45H15.41A3,3,0,0,1,15.52,11.93Zm-5.29-.48a3.06,3.06,0,0,0,1.28-1,2.72,2.72,0,0,0,.43-1.58,3.28,3.28,0,0,0-.29-1.48,2.4,2.4,0,0,0-.82-1,3.24,3.24,0,0,0-1.27-.52,7.54,7.54,0,0,0-1.64-.16H2V18.29H8.1a6.55,6.55,0,0,0,1.65-.21,4.55,4.55,0,0,0,1.43-.65,3.13,3.13,0,0,0,1-1.14,3.41,3.41,0,0,0,.37-1.65,3.47,3.47,0,0,0-.57-2A3,3,0,0,0,10.23,11.45ZM4.77,7.86H7.36a4.17,4.17,0,0,1,.71.06,1.64,1.64,0,0,1,.61.22,1.05,1.05,0,0,1,.42.44,1.42,1.42,0,0,1,.16.72,1.36,1.36,0,0,1-.47,1.15,2,2,0,0,1-1.22.35H4.77ZM9.61,15.3a1.28,1.28,0,0,1-.45.5,2,2,0,0,1-.65.26,3.33,3.33,0,0,1-.78.08h-3V12.69h3a2.4,2.4,0,0,1,1.45.41,1.65,1.65,0,0,1,.54,1.39A1.77,1.77,0,0,1,9.61,15.3Z"/>
          </svg>
        )}
        {icon === 'upwork' && (
          <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" width="24px" height="24px" viewBox="0 0 24 24">
            <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
          </svg>
        )}
        {icon === 'fiverr' && (
          <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" width="24px" height="24px" viewBox="0 0 192 192">
            <path d="M0 0h192v192H0z" style={{fill: 'none'}}/>
            <path d="M121.1 170h34.75V67.04H90.21v-7.72s0-9.01 9.01-9.01h21.88V22H99.22s-43.76 0-43.76 37.32v7.72h-19.3v28.31h19.3v74.64h34.75V95.36h30.89V170Z" style={{strokeLinejoin: 'round', strokeWidth: '12px', fill: 'none'}}/>
          </svg>
        )}
        {icon === 'twitter' && (
          <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        )}
      </motion.div>
     
      {/* Glow effect */}
      <div className="absolute inset-0 bg-white/5 blur-xl rounded-full -z-10 group-hover:bg-cyan-500/20 transition-colors duration-500" />
    </motion.div>
  )
}