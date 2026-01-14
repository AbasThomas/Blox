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
  Sparkles
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
    <section ref={containerRef} className="relative py-32 bg-gradient-to-b from-[#020617] via-[#0B1120] to-[#020617] overflow-hidden text-white">
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
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-transparent rounded-full blur-3xl"
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

        <div className="text-center mb-32">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
                Speed
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full"
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
        <div className="mb-40 flex flex-col items-center">
          <motion.div 
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
                className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
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
              style={{ y }}
              whileHover={{ scale: 1.05 }}
              className="relative w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-[#0a0e1f] to-[#020617] rounded-3xl border-2 border-cyan-500/40 shadow-[0_0_80px_rgba(34,211,238,0.3)] flex items-center justify-center z-10 overflow-hidden group cursor-pointer"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-500/20 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Inner core with pulse */}
              <motion.div 
                className="relative w-20 h-20 md:w-28 md:h-28 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.6)]"
                animate={{ 
                  boxShadow: [
                    '0 0 40px rgba(34,211,238,0.6)',
                    '0 0 80px rgba(34,211,238,0.8)',
                    '0 0 40px rgba(34,211,238,0.6)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Enhanced scanline */}
              <motion.div 
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)]"
              />
              
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-cyan-400 rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-cyan-400 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-cyan-400 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-cyan-400 rounded-br-lg" />
            </motion.div>

            {/* Floating Icons - Enhanced */}
            <FloatingIcon delay={0} x={-180} y={-120} icon="github" />
            <FloatingIcon delay={1} x={180} y={-80} icon="linkedin" />
            <FloatingIcon delay={2} x={-120} y={180} icon="dribbble" />
            <FloatingIcon delay={1.5} x={150} y={150} icon="twitter" />
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
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-800/50 p-8 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
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
                    className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
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
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-800/50 p-8 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full -translate-x-16 translate-y-16" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
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
                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">10x</span>
                    <span className="text-sm text-slate-400 uppercase tracking-wider mt-2">Performance Boost</span>
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
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white">
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
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-800/50 p-8 backdrop-blur-sm hover:border-green-500/30 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
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
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
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
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
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
      <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${color} border border-white/10 backdrop-blur-md flex flex-col items-center justify-center shadow-2xl group-hover:shadow-cyan-500/20 transition-all duration-500`}>
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
      className={`${span} relative rounded-[2rem] overflow-hidden bg-slate-900/40 border border-white/5 group transition-all duration-500 backdrop-blur-md flex flex-col justify-center items-center ${accentColors[accent]}`}
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      
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
      whileHover={{ scale: 1.15, rotate: 15 }}
      className="absolute z-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] border-2 border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] group cursor-pointer hover:border-cyan-500/50 transition-all duration-500"
      style={{ 
        left: "50%", 
        top: "50%",
        marginLeft: x > 0 ? 0 : -80, 
        marginTop: y > 0 ? 0 : -80 
      }}
    >
      <motion.div 
        className={`p-3 md:p-4 rounded-xl bg-gradient-to-br transition-all duration-500 ${
          icon === 'github' ? 'from-slate-700 to-slate-900 group-hover:from-slate-600 group-hover:to-slate-800' : 
          icon === 'linkedin' ? 'from-blue-600 to-blue-800 group-hover:from-blue-500 group-hover:to-blue-700' : 
          icon === 'dribbble' ? 'from-pink-500 to-rose-600 group-hover:from-pink-400 group-hover:to-rose-500' : 
          'from-sky-400 to-blue-500 group-hover:from-sky-300 group-hover:to-blue-400'
        }`}
        whileHover={{ rotate: -15 }}
      >
        {icon === 'github' && (
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        )}
        {icon === 'linkedin' && (
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        )}
        {icon === 'dribbble' && (
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-5.385a15.195 15.195 0 0 1-6.914 2.957m-9.673-8.083A14.993 14.993 0 0 0 12 2.056m0 0c-4.418 0-8.243 2.502-10.153 6.223m15.895-1.517c2.532 3.656 4.148 7.377 2.298 11.238"></path></svg>
        )}
        {icon === 'twitter' && (
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
        )}
      </motion.div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-white/5 blur-xl rounded-full -z-10 group-hover:bg-cyan-500/20 transition-colors duration-500" />
    </motion.div>
  )
}