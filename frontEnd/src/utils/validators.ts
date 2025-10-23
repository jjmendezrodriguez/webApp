// Validation utility functions
// Pure functions for form validation (email, password, etc.)

/**
 * Validates if a value is not empty
 * @param value - String to validate
 * @returns true if valid, false if empty
 */
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validates email format using regex
 * @param email - Email string to validate
 * @returns true if valid email format, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  if (!validateRequired(email)) {
    return false;
  }

  // Standard email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates name (first name or last name)
 * Must be at least 2 characters and contain only letters
 * @param name - Name string to validate
 * @returns true if valid name format, false otherwise
 */
export const validateName = (name: string): boolean => {
  if (!validateRequired(name)) {
    return false;
  }

  // Check minimum length (2 characters)
  if (name.trim().length < 2) {
    return false;
  }

  // Only letters and spaces allowed (for compound names like "Mary Ann")
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return nameRegex.test(name);
};

/**
 * Validates password minimum length
 * @param password - Password string to validate
 * @param minLength - Minimum length required (default: 8)
 * @returns true if meets minimum length, false otherwise
 */
export const validatePasswordLength = (
  password: string,
  minLength: number = 8,
): boolean => {
  return password.length >= minLength;
};

/**
 * Validates password contains at least one uppercase letter
 * @param password - Password string to validate
 * @returns true if contains uppercase, false otherwise
 */
export const validatePasswordUppercase = (password: string): boolean => {
  return /[A-Z]/.test(password);
};

/**
 * Validates password contains at least one number
 * @param password - Password string to validate
 * @returns true if contains number, false otherwise
 */
export const validatePasswordNumber = (password: string): boolean => {
  return /\d/.test(password);
};

/**
 * Validates password contains at least one special character
 * @param password - Password string to validate
 * @returns true if contains special character, false otherwise
 */
export const validatePasswordSpecialChar = (password: string): boolean => {
  return /[!@#$%^&*(),.?":{}|<>]/.test(password);
};

/**
 * Comprehensive password validation
 * Checks: length (8+), uppercase, number
 * @param password - Password string to validate
 * @returns Object with validation results
 */
export const validatePassword = (password: string) => {
  return {
    isValid:
      validatePasswordLength(password) &&
      validatePasswordUppercase(password) &&
      validatePasswordNumber(password),
    hasMinLength: validatePasswordLength(password),
    hasUppercase: validatePasswordUppercase(password),
    hasNumber: validatePasswordNumber(password),
    hasSpecialChar: validatePasswordSpecialChar(password),
  };
};

/**
 * Validates if two passwords match
 * @param password - First password
 * @param confirmPassword - Confirmation password
 * @returns true if passwords match, false otherwise
 */
export const validatePasswordsMatch = (
  password: string,
  confirmPassword: string,
): boolean => {
  return password === confirmPassword && password.length > 0;
};

/**
 * Get validation error message key for i18n
 * @param field - Field name ('email' | 'password' | 'confirmPassword' | 'firstName' | 'lastName')
 * @param value - Value to validate
 * @param compareValue - Value to compare (for password confirmation)
 * @returns i18n key for error message or null if valid
 */
export const getValidationError = (
  field: "email" | "password" | "confirmPassword" | "firstName" | "lastName",
  value: string,
  compareValue?: string,
): string | null => {
  switch (field) {
    case "email":
      if (!validateRequired(value)) {
        return "auth.errors.invalidValue";
      }
      if (!validateEmail(value)) {
        return "auth.errors.invalidEmail";
      }
      return null;

    case "firstName":
    case "lastName":
      if (!validateRequired(value)) {
        return "auth.errors.invalidValue";
      }
      if (value.trim().length < 2) {
        return "auth.errors.nameTooShort";
      }
      if (!validateName(value)) {
        return "auth.errors.invalidName";
      }
      return null;

    case "password":
      if (!validateRequired(value)) {
        return "auth.errors.invalidValue";
      }
      if (!validatePasswordLength(value)) {
        return "auth.errors.passwordTooShort";
      }
      if (!validatePasswordUppercase(value)) {
        return "auth.errors.passwordNoUppercase";
      }
      if (!validatePasswordNumber(value)) {
        return "auth.errors.passwordNoNumber";
      }
      return null;

    case "confirmPassword":
      if (!validateRequired(value)) {
        return "auth.errors.invalidValue";
      }
      if (compareValue && !validatePasswordsMatch(compareValue, value)) {
        return "auth.errors.passwordsDontMatch";
      }
      return null;

    default:
      return null;
  }
};
