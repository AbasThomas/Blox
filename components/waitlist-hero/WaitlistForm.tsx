'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { WaitlistFormProps, FormData, FormErrors, FormState } from './types';
import { formFieldVariants } from './styles/animations';

/**
 * WaitlistForm Component
 * 
 * Minimalist form with email and name fields that drives the logo state changes.
 * Features real-time validation and premium styling consistent with the dark aesthetic.
 */
const WaitlistForm: React.FC<WaitlistFormProps> = ({
  onStateChange,
  onSubmit,
  className = '',
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    email: false,
    name: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Memoized validation functions for performance
  const validateEmail = useMemo(() => (email: string): string | undefined => {
    if (!email.trim()) {
      return 'Email is required';
    }
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    return undefined;
  }, []);

  // Memoized name validation
  const validateName = useMemo(() => (name: string): string | undefined => {
    if (!name.trim()) {
      return 'Name is required';
    }
    
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    
    return undefined;
  }, []);

  // Determine current form state for logo
  const getCurrentFormState = useCallback((email?: string, name?: string): FormState => {
    const currentEmail = email ?? formData.email;
    const currentName = name ?? formData.name;
    
    const emailValid = !validateEmail(currentEmail);
    const nameValid = !validateName(currentName);

    if (nameValid && emailValid) {
      return 'name_entered';
    } else if (emailValid) {
      return 'email_valid';
    }
    
    return 'initial';
  }, [formData.email, formData.name, validateEmail, validateName]);

  // Debounced validation for input changes
  const debouncedValidationCallback = useCallback((field: keyof FormData, value: string) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      const validator = field === 'email' ? validateEmail : validateName;
      const error = validator(value);
      
      if (touched[field]) {
        setErrors(prev => ({ ...prev, [field]: error }));
      }

      // Update logo state based on validation result
      const newFormData = { ...formData, [field]: value };
      const currentState = getCurrentFormState(newFormData.email, newFormData.name);
      onStateChange(currentState, newFormData);
    }, 300); // 300ms debounce

    setDebounceTimer(timer);
  }, [debounceTimer, formData, touched, getCurrentFormState, onStateChange, validateEmail, validateName]);

  // Handle input changes with debounced validation
  const handleInputChange = (field: keyof FormData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Immediate logo state update for better UX
    const immediateState = getCurrentFormState(newFormData.email, newFormData.name);
    onStateChange(immediateState, newFormData);

    // Debounced validation
    debouncedValidationCallback(field, value);
  };

  // Handle field blur for immediate validation
  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    // Clear any pending debounced validation
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }

    // Immediate validation on blur
    const validator = field === 'email' ? validateEmail : validateName;
    const error = validator(formData[field]);
    
    setErrors(prev => ({ ...prev, [field]: error }));

    // Update logo state
    const currentState = getCurrentFormState();
    onStateChange(currentState, formData);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow form submission with Enter key when focused on submit button
    if (e.key === 'Enter' && e.target === e.currentTarget) {
      e.preventDefault();
      handleSubmit(e as any);
    }
    
    // Escape key clears current field
    if (e.key === 'Escape') {
      const target = e.target as HTMLInputElement;
      if (target.tagName === 'INPUT') {
        target.blur();
      }
    }
  };

  // Announce form state changes to screen readers
  const announceStateChange = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  // Announce logo state changes
  React.useEffect(() => {
    const currentState = getCurrentFormState();
    
    switch (currentState) {
      case 'email_valid':
        announceStateChange('Email validated. Logo block activated.');
        break;
      case 'name_entered':
        announceStateChange('Name entered. Additional logo block activated.');
        break;
      case 'submitted':
        announceStateChange('Form submitted. Logo completion sequence started.');
        break;
    }
  }, [formData.email, formData.name, getCurrentFormState]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const emailError = validateEmail(formData.email);
    const nameError = validateName(formData.name);
    
    if (emailError || nameError) {
      setErrors({ email: emailError, name: nameError });
      setTouched({ email: true, name: true });
      return;
    }

    setIsSubmitting(true);
    onStateChange('submitted', formData);

    try {
      await onSubmit(formData);
      // Success state would be handled by parent component
    } catch (error) {
      console.error('Submission error:', error);
      // Error handling would reset to previous state
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get field animation state
  const getFieldState = (field: keyof FormData) => {
    if (errors[field] && touched[field]) return 'error';
    if (field === 'email' && !validateEmail(formData[field])) return 'valid';
    if (field === 'name' && !validateName(formData[field])) return 'valid';
    return 'idle';
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      onKeyDown={handleKeyDown}
      className={`space-y-6 ${className}`}
      noValidate
      role="form"
      aria-label="Join waitlist form"
    >
      {/* Email Field */}
      <div className="space-y-2">
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-300"
        >
          Email <span className="text-red-400" aria-label="required">*</span>
        </label>
        <motion.input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          onFocus={() => {
            // Announce form field focus to screen readers
            if (errors.email && touched.email) {
              // Screen reader will announce the error via aria-describedby
            }
          }}
          variants={formFieldVariants}
          animate={getFieldState('email')}
          className="w-full px-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-0 transition-colors"
          placeholder="Enter your email"
          required
          disabled={isSubmitting}
          aria-invalid={errors.email && touched.email ? 'true' : 'false'}
          aria-describedby={errors.email && touched.email ? 'email-error' : 'email-help'}
          autoComplete="email"
        />
        <div id="email-help" className="sr-only">
          Enter a valid email address to join the waitlist
        </div>
        {errors.email && touched.email && (
          <motion.p
            id="email-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-400"
            role="alert"
            aria-live="polite"
          >
            {errors.email}
          </motion.p>
        )}
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-gray-300"
        >
          Name <span className="text-red-400" aria-label="required">*</span>
        </label>
        <motion.input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          onFocus={() => {
            // Announce form field focus to screen readers
            if (errors.name && touched.name) {
              // Screen reader will announce the error via aria-describedby
            }
          }}
          variants={formFieldVariants}
          animate={getFieldState('name')}
          className="w-full px-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-0 transition-colors"
          placeholder="Enter your name"
          required
          disabled={isSubmitting}
          aria-invalid={errors.name && touched.name ? 'true' : 'false'}
          aria-describedby={errors.name && touched.name ? 'name-error' : 'name-help'}
          autoComplete="given-name"
        />
        <div id="name-help" className="sr-only">
          Enter your name (minimum 2 characters)
        </div>
        {errors.name && touched.name && (
          <motion.p
            id="name-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-400"
            role="alert"
            aria-live="polite"
          >
            {errors.name}
          </motion.p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || !!validateEmail(formData.email) || !!validateName(formData.name)}
        className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-describedby="submit-help"
      >
        {isSubmitting ? (
          <>
            <span className="sr-only">Submitting form, please wait</span>
            <span aria-hidden="true">Joining...</span>
          </>
        ) : (
          'Join Waitlist'
        )}
      </motion.button>
      <div id="submit-help" className="sr-only">
        Submit the form to join the waitlist. Button will be enabled when all required fields are valid.
      </div>
    </form>
  );
};

export default WaitlistForm;