# Implementation Plan: Interactive Waitlist Hero

## Overview

This implementation plan breaks down the interactive waitlist hero component into discrete, incremental coding tasks. Each task builds on previous work to create a premium, state-driven logo animation system integrated with a minimalist waitlist form. The approach prioritizes core functionality first, with comprehensive testing to ensure the smooth, premium experience specified in the design.

## Tasks

- [x] 1. Set up project structure and core types
  - Create component directory structure under `components/waitlist-hero/`
  - Define TypeScript interfaces for form state, logo state, and component props
  - Set up Framer Motion and configure animation variants
  - _Requirements: 5.1, 6.1, 6.2, 6.3_

- [ ] 2. Implement core BloxLogo component
  - [x] 2.1 Create BloxLogo component with 2×2 grid layout
    - Build the four-block grid structure using Tailwind CSS
    - Implement responsive sizing and rounded square styling
    - Add proper semantic HTML structure and accessibility attributes
    - _Requirements: 1.1, 2.1_

  - [ ]* 2.2 Write property test for logo structure
    - **Property 1: Logo Structure Consistency**
    - **Validates: Requirements 1.1**

  - [x] 2.3 Implement block state management and styling
    - Create active/dormant state styling with cyan glow effects
    - Implement Block A as always-active brand anchor
    - Add dark surface styling for dormant blocks
    - _Requirements: 1.2, 1.3, 2.2_

  - [ ]* 2.4 Write property test for initial state
    - **Property 2: Initial State Correctness**
    - **Validates: Requirements 1.2, 1.3**

- [ ] 3. Implement logo animation system
  - [x] 3.1 Create Framer Motion animation variants
    - Define activation animations (opacity 0→1, scale 0.92→1)
    - Set animation duration (250-400ms) and easing (cubic-bezier(0.16, 1, 0.3, 1))
    - Create completion sequence with synchronization and halo effects
    - _Requirements: 3.1, 3.2, 7.1, 7.2_

  - [ ]* 3.2 Write property test for animation specifications
    - **Property 6: Animation Specification Compliance**
    - **Validates: Requirements 3.1, 3.2**

  - [x] 3.3 Implement state-driven block activation
    - Connect form state to Block B, C, D activation
    - Ensure Block A maintains prominence in final state
    - Add stable resting state without looping animations
    - _Requirements: 1.4, 1.5, 1.6, 3.4, 3.5_

  - [ ]* 3.4 Write property tests for state transitions
    - **Property 3: Email-to-Logo State Mapping**
    - **Property 4: Name-to-Logo State Mapping**
    - **Property 5: Submission Completion Sequence**
    - **Validates: Requirements 1.4, 1.5, 1.6, 4.2, 4.3, 4.4, 7.1, 7.2**

- [ ] 4. Checkpoint - Verify logo animations work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement WaitlistForm component
  - [x] 5.1 Create form structure with email and name fields
    - Build controlled form inputs with proper labeling
    - Implement required field validation
    - Add Tailwind styling consistent with premium aesthetic
    - _Requirements: 4.1, 2.1_

  - [ ]* 5.2 Write property test for form structure
    - **Property 8: Form Structure Validation**
    - **Validates: Requirements 4.1**

  - [x] 5.3 Implement real-time validation system
    - Add email validation (RFC 5322 compliant)
    - Add name validation (minimum 2 characters)
    - Implement debounced validation on input, immediate on blur
    - _Requirements: 4.2, 4.3_

  - [ ]* 5.4 Write unit tests for form validation
    - Test email validation edge cases
    - Test name validation requirements
    - Test error state handling and recovery
    - _Requirements: 4.2, 4.3_

- [ ] 6. Implement state management hooks
  - [x] 6.1 Create useFormState hook
    - Manage form values, errors, touched states, and submission status
    - Implement validation logic and error handling
    - Provide clean API for form components
    - _Requirements: 5.1, 5.2_

  - [x] 6.2 Create useLogoAnimation hook
    - Translate form states to logo animation states
    - Manage animation timing and sequencing
    - Handle completion sequence orchestration
    - _Requirements: 5.1, 5.2, 7.3_

  - [ ]* 6.3 Write property test for state machine integrity
    - **Property 9: State Machine Integrity**
    - **Validates: Requirements 5.1, 5.2**

- [ ] 7. Implement main WaitlistHero container
  - [x] 7.1 Create WaitlistHero component integration
    - Combine BloxLogo and WaitlistForm components
    - Implement responsive layout (logo above form on mobile, side-by-side on desktop)
    - Add dark background with subtle radial cyan glow
    - _Requirements: 2.1, 4.5_

  - [x] 7.2 Wire form state to logo animations
    - Connect form validation events to logo state changes
    - Implement submission flow with completion sequence
    - Ensure proper error handling doesn't affect logo state
    - _Requirements: 4.2, 4.3, 4.4, 5.1_

  - [ ]* 7.3 Write property tests for visual compliance
    - **Property 11: Visual Design Compliance**
    - **Property 10: Progress Indicator Exclusivity**
    - **Validates: Requirements 2.1, 2.2, 5.5**

- [ ] 8. Implement completion experience
  - [ ] 8.1 Add completion sequence timing
    - Implement 600-800ms timing for final state transition
    - Ensure stable final state without ongoing animations
    - Add proper cleanup of animation listeners
    - _Requirements: 7.3, 3.4_

  - [ ]* 8.2 Write property tests for completion experience
    - **Property 12: Completion Timing Accuracy**
    - **Property 13: Clean Completion Experience**
    - **Validates: Requirements 7.3, 7.4**

  - [x] 8.3 Add error handling and graceful degradation
    - Implement fallback animations for performance issues
    - Add reduced motion support for accessibility
    - Handle network errors during submission
    - _Requirements: Error handling from design_

- [ ] 9. Final integration and polish
  - [x] 9.1 Add accessibility features
    - Implement proper ARIA labels and roles
    - Add keyboard navigation support
    - Test with screen readers
    - _Requirements: 6.5_

  - [x] 9.2 Optimize performance
    - Implement animation frame rate monitoring
    - Add bundle size optimization
    - Test memory usage during long animation sequences
    - _Requirements: 6.5_

  - [ ]* 9.3 Write integration tests
    - Test complete user flow from initial load to submission
    - Test error scenarios and recovery
    - Test accessibility compliance
    - _Requirements: All requirements integration_

- [x] 10. Final checkpoint - Complete system verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties using fast-check
- Unit tests validate specific examples and edge cases
- The implementation prioritizes core functionality first, then comprehensive testing
- All animations use Framer Motion for smooth, premium feel
- Tailwind CSS provides consistent styling throughout