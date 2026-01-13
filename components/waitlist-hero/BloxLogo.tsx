'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BloxLogoProps, FormState } from './types';
import { blockVariants, logoContainerVariants, haloVariants, fallbackStyles, monitorAnimationPerformance } from './styles/animations';
import { usePerformanceMonitoring } from './utils/performance';

/**
 * BloxLogo Component
 * 
 * Interactive 2×2 grid logo that serves as a state-driven progress indicator.
 * Each block represents a different stage of the waitlist form completion:
 * - Block A (top-left): Always active, brand anchor
 * - Block B (top-right): Activates when name is entered
 * - Block C (bottom-left): Activates when valid email is entered
 * - Block D (bottom-right): Activates on form submission
 */
const BloxLogo: React.FC<BloxLogoProps> = ({ 
  state = 'initial', 
  className = '', 
  size = 'md' 
}) => {
  const [hasAnimationError, setHasAnimationError] = React.useState(false);
  const { frameRate, isOptimized } = usePerformanceMonitoring();

  // Start performance monitoring on mount
  React.useEffect(() => {
    monitorAnimationPerformance();
  }, []);

  // Switch to fallback mode if performance is poor
  React.useEffect(() => {
    if (!isOptimized && frameRate && frameRate < 20) {
      console.warn('Switching to fallback mode due to poor performance');
      setHasAnimationError(true);
    }
  }, [isOptimized, frameRate]);

  // Error boundary for animation failures
  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      if (error.message.includes('framer-motion') || error.message.includes('animation')) {
        console.warn('Animation error detected, falling back to CSS transitions:', error);
        setHasAnimationError(true);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Determine which blocks should be active based on form state
  const getBlockState = (blockId: 'A' | 'B' | 'C' | 'D') => {
    switch (blockId) {
      case 'A':
        // Block A is always active (brand anchor) and maintains prominence
        if (state === 'completed') return 'brandAnchor'; // Stable final state
        return 'brandAnchor';
      case 'B':
        // Block B activates when name is entered
        if (state === 'completed') return 'active'; // Stable final state
        if (state === 'submitted') return 'synchronizing'; // Brief sync during completion
        if (state === 'name_entered') return 'active';
        return 'dormant';
      case 'C':
        // Block C activates when valid email is entered
        if (state === 'completed') return 'active'; // Stable final state
        if (state === 'submitted') return 'synchronizing'; // Brief sync during completion
        if (state === 'email_valid' || state === 'name_entered') return 'active';
        return 'dormant';
      case 'D':
        // Block D activates on form submission
        if (state === 'completed') return 'active'; // Stable final state
        if (state === 'submitted') return 'synchronizing'; // Brief sync during completion
        return 'dormant';
      default:
        return 'dormant';
    }
  };

  // Get CSS fallback styles for when animations fail
  const getFallbackStyle = (blockId: 'A' | 'B' | 'C' | 'D') => {
    const blockState = getBlockState(blockId);
    const isActive = blockState === 'active' || blockState === 'brandAnchor' || blockState === 'synchronizing';
    
    return {
      ...fallbackStyles.block,
      ...(isActive ? fallbackStyles.blockActive : fallbackStyles.blockDormant),
      backgroundColor: isActive ? '#00d1ff' : '#1f2937',
      borderColor: isActive ? '#00d1ff' : '#374151',
    };
  };

  // Trigger completion sequence after submission
  React.useEffect(() => {
    if (state === 'submitted') {
      // After completion sequence duration, transition to stable completed state
      const timer = setTimeout(() => {
        // This would typically be handled by parent component state management
        // The parent should transition from 'submitted' to 'completed' after the animation
      }, 700); // Match COMPLETION_SEQUENCE duration

      return () => clearTimeout(timer);
    }
  }, [state]);

  // Size configurations
  const sizeClasses = {
    sm: 'w-16 h-16 gap-1',
    md: 'w-24 h-24 gap-2',
    lg: 'w-32 h-32 gap-3',
  };

  const blockSizeClasses = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  };

  const shouldShowHalo = state === 'submitted';

  // Render with fallback if animations fail
  if (hasAnimationError) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div
          className={`grid grid-cols-2 ${sizeClasses[size]}`}
          role="img"
          aria-label="Blox logo - interactive progress indicator"
        >
          {/* Fallback blocks without Framer Motion */}
          {(['A', 'B', 'C', 'D'] as const).map((blockId, index) => (
            <div
              key={blockId}
              className={`${blockSizeClasses[size]} relative overflow-hidden`}
              style={getFallbackStyle(blockId)}
              aria-label={`Block ${blockId} - ${
                blockId === 'A' ? 'Brand anchor, always active' :
                blockId === 'B' ? 'Activates when name is entered' :
                blockId === 'C' ? 'Activates when valid email is entered' :
                'Activates on form submission'
              }`}
            >
              {/* Inner glow effect for active state */}
              {(getBlockState(blockId) !== 'dormant') && (
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(0, 209, 255, 0.8) 0%, transparent 70%)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Halo effect for completion */}
      {shouldShowHalo && (
        <motion.div
          className="absolute inset-0 rounded-full border border-cyan-400/20"
          variants={haloVariants}
          initial="hidden"
          animate="expanding"
          style={{
            background: 'radial-gradient(circle, rgba(0, 209, 255, 0.1) 0%, transparent 70%)',
          }}
          onAnimationComplete={() => {
            // Cleanup after halo animation
          }}
        />
      )}

      {/* Logo container */}
      <motion.div
        className={`grid grid-cols-2 ${sizeClasses[size]}`}
        variants={logoContainerVariants}
        initial="initial"
        animate={state === 'submitted' ? 'completing' : 'initial'}
        role="img"
        aria-label="Blox logo - interactive progress indicator"
      >
        {/* Block A - Top Left (Brand Anchor) */}
        <motion.div
          className={`${blockSizeClasses[size]} relative overflow-hidden`}
          variants={blockVariants}
          animate={getBlockState('A')}
          style={{
            backgroundColor: getBlockState('A') === 'brandAnchor' || getBlockState('A') === 'synchronizing' 
              ? '#00d1ff' 
              : '#1f2937',
            borderColor: getBlockState('A') === 'brandAnchor' || getBlockState('A') === 'synchronizing'
              ? '#00d1ff'
              : '#374151',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
          aria-label="Block A - Brand anchor, always active"
        >
          {/* Inner glow effect for active state */}
          {(getBlockState('A') === 'brandAnchor' || getBlockState('A') === 'synchronizing') && (
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: 'radial-gradient(circle at center, rgba(0, 209, 255, 0.8) 0%, transparent 70%)',
              }}
            />
          )}
        </motion.div>

        {/* Block B - Top Right (Name Entry) */}
        <motion.div
          className={`${blockSizeClasses[size]} relative overflow-hidden`}
          variants={blockVariants}
          animate={getBlockState('B')}
          style={{
            backgroundColor: getBlockState('B') === 'active' || getBlockState('B') === 'synchronizing'
              ? '#00d1ff'
              : '#1f2937',
            borderColor: getBlockState('B') === 'active' || getBlockState('B') === 'synchronizing'
              ? '#00d1ff'
              : '#374151',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
          aria-label="Block B - Activates when name is entered"
        >
          {/* Inner glow effect for active state */}
          {(getBlockState('B') === 'active' || getBlockState('B') === 'synchronizing') && (
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: 'radial-gradient(circle at center, rgba(0, 209, 255, 0.8) 0%, transparent 70%)',
              }}
            />
          )}
        </motion.div>

        {/* Block C - Bottom Left (Email Entry) */}
        <motion.div
          className={`${blockSizeClasses[size]} relative overflow-hidden`}
          variants={blockVariants}
          animate={getBlockState('C')}
          style={{
            backgroundColor: getBlockState('C') === 'active' || getBlockState('C') === 'synchronizing'
              ? '#00d1ff'
              : '#1f2937',
            borderColor: getBlockState('C') === 'active' || getBlockState('C') === 'synchronizing'
              ? '#00d1ff'
              : '#374151',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
          aria-label="Block C - Activates when valid email is entered"
        >
          {/* Inner glow effect for active state */}
          {(getBlockState('C') === 'active' || getBlockState('C') === 'synchronizing') && (
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: 'radial-gradient(circle at center, rgba(0, 209, 255, 0.8) 0%, transparent 70%)',
              }}
            />
          )}
        </motion.div>

        {/* Block D - Bottom Right (Submission) */}
        <motion.div
          className={`${blockSizeClasses[size]} relative overflow-hidden`}
          variants={blockVariants}
          animate={getBlockState('D')}
          style={{
            backgroundColor: getBlockState('D') === 'active' || getBlockState('D') === 'synchronizing'
              ? '#00d1ff'
              : '#1f2937',
            borderColor: getBlockState('D') === 'active' || getBlockState('D') === 'synchronizing'
              ? '#00d1ff'
              : '#374151',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
          aria-label="Block D - Activates on form submission"
        >
          {/* Inner glow effect for active state */}
          {(getBlockState('D') === 'active' || getBlockState('D') === 'synchronizing') && (
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: 'radial-gradient(circle at center, rgba(0, 209, 255, 0.8) 0%, transparent 70%)',
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BloxLogo;