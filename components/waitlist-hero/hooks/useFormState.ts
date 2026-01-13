import { useState, useCallback, useEffect } from 'react';
import { FormData, FormErrors, FormTouched, FormStateData, FormState } from '../types';

/**
 * useFormState Hook
 * 
 * Manages form state, validation, and submission logic for the waitlist form.
 * Provides a clean API for form components and handles state transitions.
 */
export const useFormState = () => {
  const [values, setValues] = useState<FormData>({
    email: '',
    name: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({
    email: false,
    name: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Email validation (RFC 5322 compliant)
  const validateEmail = useCallback((email: string): string | undefined => {
    if (!email.trim()) {
      return 'Email is required';
    }
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    return undefined;
  }, []);

  // Name validation (minimum 2 characters)
  const validateName = useCallback((name: string): string | undefined => {
    if (!name.trim()) {
      return 'Name is required';
    }
    
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    
    return undefined;
  }, []);

  // Validate all fields
  const validateAll = useCallback((): FormErrors => {
    return {
      email: validateEmail(values.email),
      name: validateName(values.name),
    };
  }, [values.email, values.name, validateEmail, validateName]);

  // Check if form is valid
  const isValid = useCallback((): boolean => {
    const allErrors = validateAll();
    return !allErrors.email && !allErrors.name;
  }, [validateAll]);

  // Get current form state for logo
  const getCurrentFormState = useCallback((): FormState => {
    if (isSubmitted) return 'completed';
    if (isSubmitting) return 'submitted';
    
    const emailValid = !validateEmail(values.email);
    const nameValid = !validateName(values.name);

    if (nameValid && emailValid) {
      return 'name_entered';
    } else if (emailValid) {
      return 'email_valid';
    }
    
    return 'initial';
  }, [values.email, values.name, isSubmitting, isSubmitted, validateEmail, validateName]);

  // Update field value
  const updateField = useCallback((field: keyof FormData, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  // Mark field as touched
  const touchField = useCallback((field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  // Validate single field
  const validateField = useCallback((field: keyof FormData) => {
    const validator = field === 'email' ? validateEmail : validateName;
    const error = validator(values[field]);
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  }, [values, validateEmail, validateName]);

  // Debounced field validation
  const debouncedValidateField = useCallback((field: keyof FormData, delay: number = 300) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      if (touched[field]) {
        validateField(field);
      }
    }, delay);

    setDebounceTimer(timer);
  }, [debounceTimer, touched, validateField]);

  // Handle field blur (immediate validation)
  const handleBlur = useCallback((field: keyof FormData) => {
    touchField(field);
    
    // Clear any pending debounced validation
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }

    validateField(field);
  }, [touchField, validateField, debounceTimer]);

  // Handle field change (with debounced validation)
  const handleChange = useCallback((field: keyof FormData, value: string) => {
    updateField(field, value);
    debouncedValidateField(field);
  }, [updateField, debouncedValidateField]);

  // Submit form
  const submit = useCallback(async (onSubmit: (data: FormData) => Promise<void>) => {
    // Validate all fields first
    const allErrors = validateAll();
    setErrors(allErrors);
    setTouched({ email: true, name: true });

    if (allErrors.email || allErrors.name) {
      return false;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(values);
      setIsSubmitted(true);
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateAll]);

  // Reset form
  const reset = useCallback(() => {
    setValues({ email: '', name: '' });
    setErrors({});
    setTouched({ email: false, name: false });
    setIsSubmitting(false);
    setIsSubmitted(false);
    
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }
  }, [debounceTimer]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  // Form state data
  const formState: FormStateData = {
    values,
    errors,
    touched,
    isValid: isValid(),
    isSubmitting,
    isSubmitted,
  };

  return {
    formState,
    currentState: getCurrentFormState(),
    handleChange,
    handleBlur,
    submit,
    reset,
    validateField,
    validateAll,
  };
};