// Core type definitions for the Interactive Waitlist Hero component

export type FormState = 'initial' | 'email_valid' | 'name_entered' | 'submitted' | 'completed';

export interface FormData {
  email: string;
  name: string;
}

export interface FormErrors {
  email?: string;
  name?: string;
}

export interface FormTouched {
  email: boolean;
  name: boolean;
}

export interface FormStateData {
  values: FormData;
  errors: FormErrors;
  touched: FormTouched;
  isValid: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export type BlockState = 'active' | 'dormant' | 'activating';

export interface LogoState {
  blockA: BlockState;
  blockB: BlockState;
  blockC: BlockState;
  blockD: BlockState;
  isCompleting: boolean;
}

export interface AnimationState {
  currentPhase: FormState;
  blocks: {
    A: DetailedBlockState;
    B: DetailedBlockState;
    C: DetailedBlockState;
    D: DetailedBlockState;
  };
  completionAnimation: {
    isActive: boolean;
    progress: number;
  };
}

export interface DetailedBlockState {
  isActive: boolean;
  glowIntensity: number; // 0-1 scale
  animationPhase: 'dormant' | 'activating' | 'active' | 'synchronizing';
}

// Component Props Interfaces
export interface WaitlistHeroProps {
  onSubmit?: (data: FormData) => Promise<void>;
  className?: string;
  theme?: 'dark' | 'light'; // Default: 'dark'
}

export interface BloxLogoProps {
  state: FormState;
  className?: string;
  size?: 'sm' | 'md' | 'lg'; // Default: 'md'
}

export interface WaitlistFormProps {
  onStateChange: (state: FormState, data: Partial<FormData>) => void;
  onSubmit: (data: FormData) => Promise<void>;
  className?: string;
}