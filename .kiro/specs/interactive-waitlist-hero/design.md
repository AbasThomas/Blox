# Design Document: Interactive Waitlist Hero

## Overview

The Interactive Waitlist Hero is a premium React component that combines a minimalist waitlist form with a state-driven logo animation system. The component creates an emotionally satisfying user experience where the blox logo (a 2×2 grid of rounded blocks) progressively activates in response to form interactions, serving as both brand identity and progress indicator.

The design emphasizes calm, confident aesthetics inspired by Apple setup screens, Linear, and Vercel onboarding experiences, using a dark theme with strategic cyan accents to create a premium, trustworthy feel.

## Architecture

### Component Hierarchy

```
InteractiveWaitlistHero/
├── WaitlistHero.tsx          # Main container component
├── BloxLogo.tsx              # Interactive logo component
├── WaitlistForm.tsx          # Form component with validation
├── hooks/
│   ├── useFormState.ts       # Form state management
│   └── useLogoAnimation.ts   # Logo animation orchestration
├── types/
│   └── index.ts              # TypeScript interfaces
└── styles/
    └── animations.ts         # Framer Motion variants
```

### State Management Architecture

The component uses a centralized state machine pattern with clear separation between form logic and animation logic:

1. **Form State Layer**: Manages input validation, submission status, and user interactions
2. **Animation State Layer**: Translates form states into logo animation states
3. **Visual Layer**: Renders the UI based on current state

### State Machine Design

```typescript
type FormState = 'initial' | 'email_valid' | 'name_entered' | 'submitted' | 'completed';

interface LogoState {
  blockA: 'active' | 'dormant';
  blockB: 'active' | 'dormant' | 'activating';
  blockC: 'active' | 'dormant' | 'activating';
  blockD: 'active' | 'dormant' | 'activating';
  isCompleting: boolean;
}
```

## Components and Interfaces

### WaitlistHero Component

**Purpose**: Main container that orchestrates the entire hero section experience.

**Props Interface**:
```typescript
interface WaitlistHeroProps {
  onSubmit?: (data: FormData) => Promise<void>;
  className?: string;
  theme?: 'dark' | 'light'; // Default: 'dark'
}
```

**Responsibilities**:
- Coordinate between form and logo components
- Manage overall layout and responsive behavior
- Handle submission success/error states
- Provide context for shared state

### BloxLogo Component

**Purpose**: Renders the interactive 2×2 logo grid with state-driven animations.

**Props Interface**:
```typescript
interface BloxLogoProps {
  state: FormState;
  className?: string;
  size?: 'sm' | 'md' | 'lg'; // Default: 'md'
}
```

**Block Structure**:
- **Block A** (top-left): Always active, brand anchor with strongest glow
- **Block B** (top-right): Activates when name is entered
- **Block C** (bottom-left): Activates when valid email is detected
- **Block D** (bottom-right): Activates on form submission

**Animation Specifications**:
- **Activation Animation**: Opacity 0→1, Scale 0.92→1, Duration 300ms
- **Easing**: cubic-bezier(0.16, 1, 0.3, 1) for premium feel
- **Glow Layers**: Multiple box-shadow layers for depth
- **Completion Sequence**: Synchronized glow + expanding halo effect

### WaitlistForm Component

**Purpose**: Handles user input, validation, and form submission.

**Props Interface**:
```typescript
interface WaitlistFormProps {
  onStateChange: (state: FormState, data: Partial<FormData>) => void;
  onSubmit: (data: FormData) => Promise<void>;
  className?: string;
}

interface FormData {
  email: string;
  name: string;
}
```

**Validation Rules**:
- **Email**: RFC 5322 compliant validation with real-time feedback
- **Name**: Minimum 2 characters, no special validation beyond presence
- **State Triggers**: Immediate validation on blur, debounced on input

## Data Models

### Form State Model

```typescript
interface FormState {
  values: {
    email: string;
    name: string;
  };
  errors: {
    email?: string;
    name?: string;
  };
  touched: {
    email: boolean;
    name: boolean;
  };
  isValid: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
}
```

### Animation State Model

```typescript
interface AnimationState {
  currentPhase: 'initial' | 'email_entered' | 'name_entered' | 'submitting' | 'completed';
  blocks: {
    A: BlockState;
    B: BlockState;
    C: BlockState;
    D: BlockState;
  };
  completionAnimation: {
    isActive: boolean;
    progress: number;
  };
}

interface BlockState {
  isActive: boolean;
  glowIntensity: number; // 0-1 scale
  animationPhase: 'dormant' | 'activating' | 'active' | 'synchronizing';
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated to eliminate redundancy:

- Properties 1.2 and 1.3 can be combined into a single "initial state" property
- Properties 4.2 and 4.3 can be combined with 1.4 and 1.5 into comprehensive "form-to-logo state mapping" properties
- Properties 3.1 and 3.2 can be combined into a single "animation specification" property

### Core Properties

**Property 1: Logo Structure Consistency**
*For any* rendered BloxLogo component, it should contain exactly 4 blocks arranged in a 2×2 grid with rounded square styling
**Validates: Requirements 1.1**

**Property 2: Initial State Correctness**
*For any* component mount, Block A should be active with cyan styling while Blocks B, C, and D should be dormant with dark surfaces
**Validates: Requirements 1.2, 1.3**

**Property 3: Email-to-Logo State Mapping**
*For any* valid email input, Block C should activate with the specified fade-in and scale animation
**Validates: Requirements 1.4, 4.2**

**Property 4: Name-to-Logo State Mapping**
*For any* valid name input, Block B should activate with smooth transition animation
**Validates: Requirements 1.5, 4.3**

**Property 5: Submission Completion Sequence**
*For any* successful form submission, Block D should activate and all blocks should synchronize with glow intensification followed by halo effect
**Validates: Requirements 1.6, 4.4, 7.1, 7.2**

**Property 6: Animation Specification Compliance**
*For any* block activation, the animation should use opacity 0→1, scale 0.92→1, duration 250-400ms, and cubic-bezier(0.16, 1, 0.3, 1) easing
**Validates: Requirements 3.1, 3.2**

**Property 7: Final State Stability**
*For any* completed logo state, all animations should stop and Block A should maintain higher prominence than other blocks
**Validates: Requirements 3.4, 3.5**

**Property 8: Form Structure Validation**
*For any* rendered WaitlistForm component, it should contain exactly email and name fields as required inputs
**Validates: Requirements 4.1**

**Property 9: State Machine Integrity**
*For any* component instance, the state machine should have exactly the states: Initial, Email_Entered, Name_Entered, and Submitted, and all states should be reachable
**Validates: Requirements 5.1, 5.2**

**Property 10: Progress Indicator Exclusivity**
*For any* rendered component, it should not contain progress bars, percentages, or other progress indicators beyond the logo
**Validates: Requirements 5.5**

**Property 11: Visual Design Compliance**
*For any* rendered component, it should use dark background with cyan accent color (#00d1ff) appearing only in glow effects and active states
**Validates: Requirements 2.1, 2.2**

**Property 12: Completion Timing Accuracy**
*For any* completion sequence, the logo should settle into stable state within 600-800ms after Block D activation
**Validates: Requirements 7.3**

**Property 13: Clean Completion Experience**
*For any* completion state, the component should not render confetti, celebratory gimmicks, or explanatory text
**Validates: Requirements 7.4**

<function_calls>
<invoke name="prework">
<parameter name="featureName">interactive-waitlist-hero

## Error Handling

### Form Validation Errors

**Email Validation**:
- Invalid format: Display subtle red border with fade-in animation
- Empty field: Show validation message on blur
- Network validation: Handle async validation with loading states

**Name Validation**:
- Empty field: Show validation message on blur
- Minimum length: Require at least 2 characters

**Error State Management**:
- Errors should not trigger logo state changes
- Invalid states should prevent progression to next logo phase
- Clear error styling when field becomes valid

### Animation Error Handling

**Performance Degradation**:
- Graceful fallback to CSS transitions if Framer Motion fails
- Reduced motion support for accessibility preferences
- Frame rate monitoring for smooth 60fps animations

**State Synchronization Errors**:
- Logo state should always reflect current form state
- Recovery mechanism if state becomes desynchronized
- Fallback to manual state reset if needed

### Network and Submission Errors

**Submission Failures**:
- Maintain form data on network errors
- Show error message without resetting logo state
- Retry mechanism with exponential backoff
- Timeout handling for slow networks

**Graceful Degradation**:
- Component should work without JavaScript (basic form submission)
- Progressive enhancement for animation features
- Fallback styling for unsupported browsers

## Testing Strategy

### Dual Testing Approach

The testing strategy combines unit tests for specific scenarios with property-based tests for comprehensive coverage:

**Unit Tests**:
- Specific form validation scenarios (valid/invalid emails, edge cases)
- Animation timing verification with specific inputs
- Error state handling and recovery
- Component integration points
- Accessibility compliance (keyboard navigation, screen readers)

**Property-Based Tests**:
- Universal properties across all valid inputs using **fast-check** library
- Each test configured for minimum 100 iterations
- Comprehensive input coverage through randomization
- State machine property verification across all possible transitions

### Property Test Configuration

Each property-based test will:
- Run minimum 100 iterations for statistical confidence
- Use smart generators that constrain to valid input spaces
- Reference specific design document properties
- Tag format: **Feature: interactive-waitlist-hero, Property {number}: {property_text}**

### Testing Framework Selection

- **Unit Testing**: Jest + React Testing Library for component testing
- **Property Testing**: fast-check for property-based test generation
- **Animation Testing**: Custom utilities for Framer Motion animation verification
- **Visual Testing**: Chromatic or similar for visual regression testing

### Test Organization

```
__tests__/
├── unit/
│   ├── BloxLogo.test.tsx
│   ├── WaitlistForm.test.tsx
│   └── WaitlistHero.test.tsx
├── properties/
│   ├── logo-structure.property.test.ts
│   ├── state-transitions.property.test.ts
│   └── animation-compliance.property.test.ts
└── integration/
    └── hero-flow.integration.test.tsx
```

### Performance Testing

- Animation frame rate monitoring during state transitions
- Memory leak detection for long-running animations
- Bundle size impact measurement
- Lighthouse performance scoring for the complete hero section