'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BloxLogo from './BloxLogo';
import WaitlistForm from './WaitlistForm';
import { WaitlistHeroProps, FormData, FormState } from './types';
import { Sparkles, Users, CheckCircle, ArrowRight } from 'lucide-react';

const WaitlistHero: React.FC<WaitlistHeroProps> = ({
  onSubmit,
  className = '',
  theme = 'dark',
}) => {
  const [currentState, setCurrentState] = useState<FormState>('initial');

  const handleStateChange = (state: FormState, data: Partial<FormData>) => {
    setCurrentState(state);
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      setTimeout(() => {
        setCurrentState('completed');
      }, 700);
    } catch (error) {
      console.error('Submission failed:', error);
      throw error;
    }
  };

  return (
    <div className={`relative w-full overflow-hidden flex flex-col items-center justify-center py-20 md:py-32 ${className}`}>
      {/* Enhanced Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -right-40 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/20 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-40 w-[700px] h-[700px] bg-gradient-radial from-blue-500/15 via-blue-500/5 to-transparent rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
          >
            {/* Logo */}
            <motion.div 
              className="mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BloxLogo state={currentState} size="lg" />
            </motion.div>
            
            {/* Heading */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-bold text-cyan-400 tracking-wider uppercase">Early Access</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]"
              >
                Join the{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                    Revolution
                  </span>
                  <motion.div 
                    className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed"
              >
                Be among the first to experience the future of professional identity. 
                Secure your spot and start building today.
              </motion.p>
            </div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-[#020617] ring-2 ring-cyan-500/20"
                  />
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.1 }}
                  className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#020617] ring-2 ring-slate-700/50 flex items-center justify-center text-xs font-bold text-slate-400"
                >
                  +2K
                </motion.div>
              </div>
              <div className="text-sm">
                <p className="text-white font-semibold">2,000+ developers</p>
                <p className="text-slate-500">already joined</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-lg mx-auto lg:mx-0"
          >
            <div className="relative">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 rounded-3xl blur-2xl" />
              
              {/* Form container */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-xl" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-400/50 rounded-tr-xl" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400/50 rounded-bl-xl" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400/50 rounded-br-xl" />

                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-2">Get Early Access</h3>
                  <p className="text-slate-400 mb-8">Join the waitlist and be the first to know when we launch.</p>
                  
                  <WaitlistForm
                    onStateChange={handleStateChange}
                    onSubmit={handleFormSubmit}
                    className="w-full"
                  />

                  {/* Success Message */}
                  <AnimatePresence>
                    {currentState === 'completed' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="mt-6 p-5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl backdrop-blur-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-green-400 mb-1">You&apos;re on the list!</h4>
                            <p className="text-sm text-green-300/80">Check your email for next steps and exclusive updates.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default WaitlistHero;