'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaitlistFormProps, FormData, FormErrors, FormState } from './types';

// Enhanced Form Component
const WaitlistForm: React.FC<WaitlistFormProps> = ({
  onStateChange,
  onSubmit,
  className = '',
}) => {
  const [formData, setFormData] = useState<FormData>({ email: '', name: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({ email: false, name: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateEmail = useMemo(() => (email: string): string | undefined => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  }, []);

  const validateName = useMemo(() => (name: string): string | undefined => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    return undefined;
  }, []);

  const getCurrentFormState = useCallback((email?: string, name?: string): FormState => {
    const currentEmail = email ?? formData.email;
    const currentName = name ?? formData.name;
    const emailValid = !validateEmail(currentEmail);
    const nameValid = !validateName(currentName);

    if (nameValid && emailValid) return 'name_entered';
    if (emailValid) return 'email_valid';
    return 'initial';
  }, [formData, validateEmail, validateName]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    const immediateState = getCurrentFormState(newFormData.email, newFormData.name);
    onStateChange(immediateState, newFormData);
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setFocusedField(null);
    const validator = field === 'email' ? validateEmail : validateName;
    const error = validator(formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async () => {
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
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isFormValid) {
        handleSubmit();
      }
    }
  };

  const isFormValid = !validateEmail(formData.email) && !validateName(formData.name);

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Email Field */}
      <div className="space-y-2">
        <label 
          htmlFor="email" 
          className="block text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors duration-300"
        >
          Email Address
        </label>
        <div className="relative group">
          <motion.div
            animate={{
              scale: focusedField === 'email' ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => handleBlur('email')}
              onKeyPress={handleKeyPress}
              className={`w-full px-5 py-4 bg-white/5 border-2 rounded-2xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300 ${
                errors.email && touched.email
                  ? 'border-red-500/50 focus:border-red-500 bg-red-500/5'
                  : focusedField === 'email'
                  ? 'border-cyan-500/50 bg-cyan-500/5 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                  : 'border-white/10 hover:border-white/20'
              }`}
              placeholder="you@example.com"
              disabled={isSubmitting}
              autoComplete="email"
            />
          </motion.div>

          {/* Enhanced focus glow */}
          <motion.div 
            className="absolute inset-0 rounded-2xl -z-10 blur-xl"
            animate={{
              opacity: focusedField === 'email' ? 0.3 : 0,
              scale: focusedField === 'email' ? 1.1 : 1,
            }}
            style={{
              background: errors.email && touched.email 
                ? 'rgba(239, 68, 68, 0.3)' 
                : 'rgba(34, 211, 238, 0.3)'
            }}
          />

          {/* Success checkmark */}
          <AnimatePresence>
            {!errors.email && formData.email && touched.email && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {errors.email && touched.email && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="text-sm text-red-400 pl-1 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <label 
          htmlFor="name" 
          className="block text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors duration-300"
        >
          Full Name
        </label>
        <div className="relative group">
          <motion.div
            animate={{
              scale: focusedField === 'name' ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => handleBlur('name')}
              onKeyPress={handleKeyPress}
              className={`w-full px-5 py-4 bg-white/5 border-2 rounded-2xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300 ${
                errors.name && touched.name
                  ? 'border-red-500/50 focus:border-red-500 bg-red-500/5'
                  : focusedField === 'name'
                  ? 'border-cyan-500/50 bg-cyan-500/5 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                  : 'border-white/10 hover:border-white/20'
              }`}
              placeholder="John Doe"
              disabled={isSubmitting}
              autoComplete="name"
            />
          </motion.div>

          {/* Enhanced focus glow */}
          <motion.div 
            className="absolute inset-0 rounded-2xl -z-10 blur-xl"
            animate={{
              opacity: focusedField === 'name' ? 0.3 : 0,
              scale: focusedField === 'name' ? 1.1 : 1,
            }}
            style={{
              background: errors.name && touched.name 
                ? 'rgba(239, 68, 68, 0.3)' 
                : 'rgba(34, 211, 238, 0.3)'
            }}
          />

          {/* Success checkmark */}
          <AnimatePresence>
            {!errors.name && formData.name && touched.name && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {errors.name && touched.name && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="text-sm text-red-400 pl-1 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={isSubmitting || !isFormValid}
        className="relative w-full mt-8 group"
        whileHover={{ scale: isFormValid && !isSubmitting ? 1.02 : 1 }}
        whileTap={{ scale: isFormValid && !isSubmitting ? 0.98 : 1 }}
      >
        <div className={`relative px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden ${
          isSubmitting || !isFormValid
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]'
        }`}>
          {/* Animated shimmer */}
          {isFormValid && !isSubmitting && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Button content */}
          <div className="relative flex items-center justify-center gap-3">
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-slate-600 border-t-slate-400 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Joining Waitlist...</span>
              </>
            ) : (
              <>
                <span>Join the Waitlist</span>
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: isFormValid ? [0, 4, 0] : 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </>
            )}
          </div>
        </div>

        {/* Glow effect */}
        {isFormValid && !isSubmitting && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 blur-xl opacity-50 group-hover:opacity-70 transition-opacity -z-10" />
        )}
      </motion.button>

      {/* Privacy note */}
      <p className="text-xs text-slate-500 text-center mt-4 leading-relaxed">
        By joining, you agree to receive updates. We respect your privacy.
      </p>
    </div>
  );
};

export default WaitlistForm;