// Framer Motion animation variants for the Interactive Waitlist Hero

import { Variants } from 'framer-motion';

// Premium easing curve for smooth, intentional animations
export const PREMIUM_EASING = [0.16, 1, 0.3, 1] as const;

// Animation durations in milliseconds
export const ANIMATION_DURATIONS = {
  BLOCK_ACTIVATION: 300,
  COMPLETION_SEQUENCE: 700,
  HALO_EXPANSION: 800,
} as const;

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

// Fallback durations for reduced motion
const REDUCED_MOTION_DURATIONS = {
  BLOCK_ACTIVATION: 150,
  COMPLETION_SEQUENCE: 300,
  HALO_EXPANSION: 400,
} as const;

// Use appropriate durations based on user preference
const DURATIONS = prefersReducedMotion ? REDUCED_MOTION_DURATIONS : ANIMATION_DURATIONS;

// Block activation animation variants with fallback support
export const blockVariants: Variants = {
  dormant: {
    opacity: 0.4,
    scale: 1,
    boxShadow: '0 0 0 rgba(0, 209, 255, 0)',
    transition: {
      duration: DURATIONS.BLOCK_ACTIVATION / 1000,
      ease: prefersReducedMotion ? 'easeOut' : PREMIUM_EASING,
    },
  },
  activating: {
    opacity: prefersReducedMotion ? 1 : [0.4, 1],
    scale: prefersReducedMotion ? 1 : [0.92, 1],
    boxShadow: prefersReducedMotion 
      ? '0 0 20px rgba(0, 209, 255, 0.4), 0 0 40px rgba(0, 209, 255, 0.2)'
      : [
          '0 0 0 rgba(0, 209, 255, 0)',
          '0 0 20px rgba(0, 209, 255, 0.4), 0 0 40px rgba(0, 209, 255, 0.2)',
        ],
    transition: {
      duration: DURATIONS.BLOCK_ACTIVATION / 1000,
      ease: prefersReducedMotion ? 'easeOut' : PREMIUM_EASING,
    },
  },
  active: {
    opacity: 1,
    scale: 1,
    boxShadow: '0 0 20px rgba(0, 209, 255, 0.4), 0 0 40px rgba(0, 209, 255, 0.2)',
    transition: {
      duration: DURATIONS.BLOCK_ACTIVATION / 1000,
      ease: prefersReducedMotion ? 'easeOut' : PREMIUM_EASING,
    },
  },
  // Block A (brand anchor) has stronger glow - maintains prominence
  brandAnchor: {
    opacity: 1,
    scale: 1,
    boxShadow: '0 0 25px rgba(0, 209, 255, 0.6), 0 0 50px rgba(0, 209, 255, 0.3), 0 0 75px rgba(0, 209, 255, 0.1)',
    transition: {
      duration: DURATIONS.BLOCK_ACTIVATION / 1000,
      ease: prefersReducedMotion ? 'easeOut' : PREMIUM_EASING,
    },
  },
  // Synchronized glow for completion sequence - brief intensification
  synchronizing: {
    opacity: 1,
    scale: 1,
    boxShadow: prefersReducedMotion
      ? '0 0 25px rgba(0, 209, 255, 0.6), 0 0 50px rgba(0, 209, 255, 0.3), 0 0 75px rgba(0, 209, 255, 0.1)'
      : [
          '0 0 20px rgba(0, 209, 255, 0.4), 0 0 40px rgba(0, 209, 255, 0.2)',
          '0 0 35px rgba(0, 209, 255, 0.8), 0 0 70px rgba(0, 209, 255, 0.4), 0 0 105px rgba(0, 209, 255, 0.2)',
          '0 0 25px rgba(0, 209, 255, 0.6), 0 0 50px rgba(0, 209, 255, 0.3), 0 0 75px rgba(0, 209, 255, 0.1)',
        ],
    transition: {
      duration: DURATIONS.COMPLETION_SEQUENCE / 1000,
      ease: prefersReducedMotion ? 'easeOut' : PREMIUM_EASING,
      times: prefersReducedMotion ? undefined : [0, 0.4, 1],
    },
  },
};

// Halo effect animation for completion with reduced motion support
export const haloVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  expanding: {
    opacity: prefersReducedMotion ? [0, 0.3, 0] : [0, 0.6, 0],
    scale: prefersReducedMotion ? [0.8, 1.5, 2] : [0.8, 2.5, 3],
    transition: {
      duration: DURATIONS.HALO_EXPANSION / 1000,
      ease: prefersReducedMotion ? 'easeOut' : PREMIUM_EASING,
      times: prefersReducedMotion ? undefined : [0, 0.3, 1],
    },
  },
};

// Container animation for the entire logo with error recovery
export const logoContainerVariants: Variants = {
  initial: {
    opacity: 1,
  },
  completing: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion ? 0.05 : 0.1,
      delayChildren: prefersReducedMotion ? 0.1 : 0.2,
    },
  },
  completed: {
    opacity: 1,
    transition: {
      duration: prefersReducedMotion ? 0.15 : 0.3,
      ease: prefersReducedMotion ? 'easeOut' : PREMIUM_EASING,
    },
  },
  // Error state for graceful degradation
  error: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

// Form field animation variants with error handling
export const formFieldVariants: Variants = {
  idle: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 0 0 rgba(0, 209, 255, 0)',
    transition: {
      duration: 0.2,
      ease: prefersReducedMotion ? 'easeOut' : PREMIUM_EASING,
    },
  },
  focused: {
    borderColor: 'rgba(0, 209, 255, 0.5)',
    boxShadow: '0 0 0 1px rgba(0, 209, 255, 0.2)',
    transition: {
      duration: 0.2,
      ease: prefersReducedMotion ? 'easeOut' : PREMIUM_EASING,
    },
  },
  valid: {
    borderColor: 'rgba(0, 209, 255, 0.3)',
    boxShadow: '0 0 0 1px rgba(0, 209, 255, 0.1)',
    transition: {
      duration: 0.2,
      ease: prefersReducedMotion ? 'easeOut' : PREMIUM_EASING,
    },
  },
  error: {
    borderColor: 'rgba(239, 68, 68, 0.5)',
    boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.2)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

// Background glow animation with performance monitoring
export const backgroundGlowVariants: Variants = {
  initial: {
    opacity: 0.3,
    scale: 1,
  },
  active: {
    opacity: prefersReducedMotion ? 0.3 : [0.3, 0.5, 0.3],
    scale: prefersReducedMotion ? 1 : [1, 1.05, 1],
    transition: {
      duration: prefersReducedMotion ? 0 : 4,
      ease: 'easeInOut',
      repeat: prefersReducedMotion ? 0 : Infinity,
      repeatType: 'reverse',
    },
  },
};

// CSS fallback styles for when Framer Motion fails
export const fallbackStyles = {
  block: {
    transition: 'all 0.3s ease-out',
  },
  blockActive: {
    opacity: 1,
    boxShadow: '0 0 20px rgba(0, 209, 255, 0.4), 0 0 40px rgba(0, 209, 255, 0.2)',
  },
  blockDormant: {
    opacity: 0.4,
    boxShadow: 'none',
  },
  formField: {
    transition: 'border-color 0.2s ease-out, box-shadow 0.2s ease-out',
  },
};

// Performance monitoring for animations
export const monitorAnimationPerformance = () => {
  if (typeof window === 'undefined') return;
  
  let frameCount = 0;
  let lastTime = performance.now();
  
  const checkFrameRate = () => {
    const currentTime = performance.now();
    frameCount++;
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      
      // If frame rate drops below 30fps, consider disabling complex animations
      if (fps < 30) {
        console.warn('Low frame rate detected:', fps, 'fps. Consider reducing animation complexity.');
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(checkFrameRate);
  };
  
  requestAnimationFrame(checkFrameRate);
};