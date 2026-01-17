'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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

  const [count, setCount] = useState<number>(500); // Start with base count
  
  // Fetch real count
  React.useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/waitlist/count');
        if (response.ok) {
          const data = await response.json();
          // Ensure we don't show less than the base "marketing" number if real count is low
          setCount(Math.max(500, data.count));
        }
      } catch (error) {
        console.error('Failed to fetch waitlist count:', error);
      }
    };

    fetchCount();
  }, []);

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
        // Optimistically increment count
        setCount(prev => prev + 1);
      }, 700);
    } catch (error) {
      console.error('Submission failed:', error);
      throw error;
    }
  };

  return (
    <div className={`relative w-full overflow-hidden flex flex-col items-center justify-center py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 ${className}`}>
      {/* Enhanced Background */}
      {/* Background - Clean */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle dark gradient for depth if needed, or just clean */}
      </div>

      <div className="container mx-auto px-0 sm:px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8 px-4 sm:px-0"
          >
            {/* Logo */}
            <motion.div 
              className="mb-2 sm:mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BloxLogo state={currentState} size="lg" />
            </motion.div>
            
            {/* Heading */}
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm"
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-cyan-400 tracking-wider uppercase">Early Access</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]"
              >
                Join the{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 via-blue-500 to-indigo-600 ">
                    Revolution
                  </span>
                  <motion.div 
                    className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-600"
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
                className="text-slate-400 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mx-auto lg:mx-0"
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
              className="flex items-center gap-3 sm:gap-4"
            >
              <div className="flex -space-x-3">
                {[
                  '/profile1.jpeg',
                  '/profile2.jpeg',
                  '/profile3.jpeg',
                  '/profile4.jpeg'
                ].map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#020617] ring-2 ring-cyan-500/20 overflow-hidden relative"
                  >
                    <Image
                      src={src}
                      alt={`Member ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.1 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-800 border-2 border-[#020617] ring-2 ring-slate-700/50 flex items-center justify-center text-[10px] sm:text-xs font-bold text-slate-400"
                >
                  {count >= 1000 ? `+${Math.floor(count / 1000)}K` : `+${count}`}
                </motion.div>
              </div>
              <div className="text-xs sm:text-sm text-left">
                <p className="text-white font-semibold">{count.toLocaleString()}+ developers</p>
                <p className="text-slate-500">already joined</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-lg mx-auto lg:mx-0 px-2 sm:px-0"
          >
            <div className="relative">
            <div className="relative">
              
              {/* Form container - Ultra Glass & Shiny */}
              <div className="relative bg-white/[0.01] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.3)] overflow-hidden group">
                
                {/* Static Shine (Top-Left Light Source) */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />
                
                {/* Animated Shimmer - "Beating" shine like the button but subtle and large */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -skew-x-12"
                  animate={{ translateX: ['-200%', '200%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                />

                {/* Border Highlight (Top & Left) */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/10 pointer-events-none opacity-50" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70" />

                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Get Early Access</h3>
                  <p className="text-slate-400 text-sm sm:text-base mb-6 sm:mb-8">Join the waitlist and be the first to know when we launch.</p>
                  
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
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default WaitlistHero;
