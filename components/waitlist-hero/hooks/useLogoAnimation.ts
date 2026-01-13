import { useState, useEffect, useCallback } from 'react';
import { FormState, AnimationState, DetailedBlockState } from '../types';

/**
 * useLogoAnimation Hook
 * 
 * Manages logo animation state and timing based on form state changes.
 * Handles the completion sequence orchestration and stable final state.
 */
export const useLogoAnimation = (formState: FormState) => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    currentPhase: 'initial',
    blocks: {
      A: { isActive: true, glowIntensity: 0.6, animationPhase: 'active' },
      B: { isActive: false, glowIntensity: 0, animationPhase: 'dormant' },
      C: { isActive: false, glowIntensity: 0, animationPhase: 'dormant' },
      D: { isActive: false, glowIntensity: 0, animationPhase: 'dormant' },
    },
    completionAnimation: {
      isActive: false,
      progress: 0,
    },
  });

  const [completionTimer, setCompletionTimer] = useState<NodeJS.Timeout | null>(null);

  // Get block state based on form state
  const getBlockState = useCallback((blockId: 'A' | 'B' | 'C' | 'D', currentFormState: FormState): DetailedBlockState => {
    switch (blockId) {
      case 'A':
        // Block A is always active (brand anchor) with higher prominence
        return {
          isActive: true,
          glowIntensity: currentFormState === 'completed' ? 0.8 : 0.6,
          animationPhase: currentFormState === 'submitted' ? 'synchronizing' : 'active',
        };
      
      case 'B':
        // Block B activates when name is entered
        const bActive = ['name_entered', 'submitted', 'completed'].includes(currentFormState);
        return {
          isActive: bActive,
          glowIntensity: bActive ? 0.4 : 0,
          animationPhase: currentFormState === 'submitted' ? 'synchronizing' : 
                          bActive ? 'active' : 'dormant',
        };
      
      case 'C':
        // Block C activates when valid email is entered
        const cActive = ['email_valid', 'name_entered', 'submitted', 'completed'].includes(currentFormState);
        return {
          isActive: cActive,
          glowIntensity: cActive ? 0.4 : 0,
          animationPhase: currentFormState === 'submitted' ? 'synchronizing' : 
                          cActive ? 'active' : 'dormant',
        };
      
      case 'D':
        // Block D activates on form submission
        const dActive = ['submitted', 'completed'].includes(currentFormState);
        return {
          isActive: dActive,
          glowIntensity: dActive ? 0.4 : 0,
          animationPhase: currentFormState === 'submitted' ? 'synchronizing' : 
                          dActive ? 'active' : 'dormant',
        };
      
      default:
        return { isActive: false, glowIntensity: 0, animationPhase: 'dormant' };
    }
  }, []);

  // Update animation state when form state changes
  useEffect(() => {
    const newBlocks = {
      A: getBlockState('A', formState),
      B: getBlockState('B', formState),
      C: getBlockState('C', formState),
      D: getBlockState('D', formState),
    };

    setAnimationState(prev => ({
      ...prev,
      currentPhase: formState,
      blocks: newBlocks,
      completionAnimation: {
        isActive: formState === 'submitted',
        progress: formState === 'submitted' ? 0 : prev.completionAnimation.progress,
      },
    }));

    // Handle completion sequence timing (600-800ms as per requirements)
    if (formState === 'submitted') {
      // Clear any existing timer
      if (completionTimer) {
        clearTimeout(completionTimer);
      }

      // Start completion sequence
      const timer = setTimeout(() => {
        setAnimationState(prev => ({
          ...prev,
          currentPhase: 'completed',
          blocks: {
            A: getBlockState('A', 'completed'),
            B: getBlockState('B', 'completed'),
            C: getBlockState('C', 'completed'),
            D: getBlockState('D', 'completed'),
          },
          completionAnimation: {
            isActive: false,
            progress: 1,
          },
        }));
      }, 700); // 700ms matches COMPLETION_SEQUENCE duration

      setCompletionTimer(timer);
    }
  }, [formState, getBlockState, completionTimer]);

  // Get animation variant for a specific block
  const getBlockVariant = useCallback((blockId: 'A' | 'B' | 'C' | 'D'): string => {
    const block = animationState.blocks[blockId];
    
    if (block.animationPhase === 'synchronizing') {
      return 'synchronizing';
    }
    
    if (blockId === 'A' && block.isActive) {
      return 'brandAnchor'; // Block A has stronger glow
    }
    
    if (block.isActive) {
      return 'active';
    }
    
    return 'dormant';
  }, [animationState.blocks]);

  // Check if halo effect should be shown
  const shouldShowHalo = useCallback((): boolean => {
    return animationState.completionAnimation.isActive;
  }, [animationState.completionAnimation.isActive]);

  // Get logo container animation state
  const getLogoContainerVariant = useCallback((): string => {
    if (animationState.currentPhase === 'submitted') {
      return 'completing';
    }
    if (animationState.currentPhase === 'completed') {
      return 'completed';
    }
    return 'initial';
  }, [animationState.currentPhase]);

  // Check if animations are stable (no ongoing animations)
  const isStable = useCallback((): boolean => {
    return animationState.currentPhase === 'completed' && 
           !animationState.completionAnimation.isActive;
  }, [animationState.currentPhase, animationState.completionAnimation.isActive]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (completionTimer) {
        clearTimeout(completionTimer);
      }
    };
  }, [completionTimer]);

  return {
    animationState,
    getBlockVariant,
    shouldShowHalo,
    getLogoContainerVariant,
    isStable,
  };
};