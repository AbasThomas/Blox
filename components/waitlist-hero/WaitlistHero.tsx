'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BloxLogo from './BloxLogo';
import WaitlistForm from './WaitlistForm';
import { WaitlistHeroProps, FormData, FormState } from './types';
import { backgroundGlowVariants } from './styles/animations';

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
    <div className={`relative w-full overflow-hidden flex flex-col items-center justify-center py-24 md:py-32 ${className}`}>
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 max-w-6xl">
        
        {/* Left Side: Brand/Logo */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="mb-8 scale-125 lg:scale-150">
            <BloxLogo state={currentState} size="lg" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Join the <span className="text-brand-cyan">Revolution</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed mb-8">
            Be among the first to experience the future of professional identity.
            Secure your spot and start building today.
          </p>

          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-800 borderborder-slate-900 ring-2 ring-[#020617]" />
                ))}
             </div>
             <span>Joined by 2,000+ developers</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 w-full max-w-md">
          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-brand-cyan/5">
             {/* Glow behind form */}
             <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-transparent opacity-50 rounded-3xl pointer-events-none" />
             
             <div className="relative z-10">
               <h3 className="text-2xl font-semibold text-white mb-6">Get Early Access</h3>
               <WaitlistForm
                onStateChange={handleStateChange}
                onSubmit={handleFormSubmit}
                className="w-full"
              />
              
              {currentState === 'completed' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400"
                >
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-xs">✓</div>
                  <p className="font-medium">You're on the list!</p>
                </motion.div>
              )}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WaitlistHero;
