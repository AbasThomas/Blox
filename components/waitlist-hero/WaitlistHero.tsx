'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BloxLogo from './BloxLogo';
import WaitlistForm from './WaitlistForm';
import { WaitlistHeroProps, FormData, FormState } from './types';
import { backgroundGlowVariants } from './styles/animations';

/**
 * WaitlistHero Component
 * 
 * Main container that orchestrates the entire hero section experience.
 * Combines the interactive BloxLogo with the WaitlistForm and manages
 * the overall layout, responsive behavior, and state coordination.
 */
const WaitlistHero: React.FC<WaitlistHeroProps> = ({
  onSubmit,
  className = '',
  theme = 'dark',
}) => {
  const [currentState, setCurrentState] = React.useState<FormState>('initial');

  // Handle form state changes - this is the key integration point
  const handleStateChange = React.useCallback((state: FormState, data: Partial<FormData>) => {
    setCurrentState(state);
  }, []);

  // Handle form submission with proper state management
  const handleFormSubmit = React.useCallback(async (data: FormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      
      // The form will set state to 'submitted', then we transition to 'completed'
      // after the completion animation sequence (600-800ms as per requirements)
      setTimeout(() => {
        setCurrentState('completed');
      }, 700); // 700ms matches the COMPLETION_SEQUENCE duration
      
    } catch (error) {
      console.error('Submission failed:', error);
      throw error;
    }
  }, [onSubmit]);

  // Memoized components for performance
  const MemoizedBloxLogo = React.memo(BloxLogo);
  const MemoizedWaitlistForm = React.memo(WaitlistForm);

  return (
    <div className={`min-h-screen relative overflow-hidden ${className}`}>
      {/* Background with subtle radial cyan glow */}
      <div className="absolute inset-0 bg-gray-950">
        <motion.div
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 209, 255, 0.15) 0%, rgba(0, 209, 255, 0.05) 40%, transparent 70%)',
          }}
          variants={backgroundGlowVariants}
          initial="initial"
          animate="active"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md mx-auto">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-12">
            <MemoizedBloxLogo 
              state={currentState}
              size="lg"
              className="mb-8"
            />
            
            {/* Brand Text */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-white tracking-tight">
                blox
              </h1>
              <p className="text-gray-400 text-lg">
                Building the future, one block at a time
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full">
            <MemoizedWaitlistForm
              onStateChange={handleStateChange}
              onSubmit={handleFormSubmit}
              className="w-full"
            />
          </div>

          {/* Success Message */}
          {currentState === 'completed' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <div className="p-6 bg-gray-900/50 border border-cyan-500/20 rounded-xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-cyan-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Welcome to the waitlist!
                </h3>
                <p className="text-gray-400">
                  We'll notify you when blox is ready to launch.
                </p>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              Join thousands of others building the future
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Layout for Desktop */}
      <style jsx>{`
        @media (min-width: 1024px) {
          .desktop-layout {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .desktop-logo {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .desktop-form {
            flex: 1;
            max-width: 400px;
          }
        }
      `}</style>

      {/* Desktop Layout (hidden on mobile) */}
      <div className="hidden lg:block absolute inset-0 z-10">
        <div className="flex items-center justify-center min-h-screen px-12">
          <div className="desktop-layout">
            
            {/* Logo Side */}
            <div className="desktop-logo">
              <MemoizedBloxLogo 
                state={currentState}
                size="lg"
                className="mb-8"
              />
              
              <div className="text-center space-y-4">
                <h1 className="text-6xl font-bold text-white tracking-tight">
                  blox
                </h1>
                <p className="text-gray-400 text-xl max-w-md">
                  Building the future, one block at a time. 
                  Join our waitlist to be the first to experience the next generation of tools.
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="desktop-form">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Join the Waitlist
                </h2>
                
                <MemoizedWaitlistForm
                  onStateChange={handleStateChange}
                  onSubmit={handleFormSubmit}
                  className="w-full"
                />

                {/* Success Message for Desktop */}
                {currentState === 'completed' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-6"
                  >
                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <svg 
                            className="w-4 h-4 text-cyan-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M5 13l4 4L19 7" 
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            Welcome to the waitlist!
                          </h3>
                          <p className="text-gray-400 text-sm">
                            We'll notify you when blox is ready.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistHero;