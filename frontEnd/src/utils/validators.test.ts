// Tests for validation utility functions

import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validatePassword,
  getValidationError,
} from '@/utils/validators'

describe('validateEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true)
    expect(validateEmail('test.user@domain.co.uk')).toBe(true)
    expect(validateEmail('name+tag@example.com')).toBe(true)
  })

  it('should return false for invalid email addresses', () => {
    expect(validateEmail('invalid')).toBe(false)
    expect(validateEmail('no@domain')).toBe(false)
    expect(validateEmail('@example.com')).toBe(false)
    expect(validateEmail('user@')).toBe(false)
    expect(validateEmail('')).toBe(false)
  })
})

describe('validatePassword', () => {
  it('should return isValid true for valid passwords', () => {
    expect(validatePassword('Password123').isValid).toBe(true)
    expect(validatePassword('MyP@ssw0rd').isValid).toBe(true)
    expect(validatePassword('Secure123!').isValid).toBe(true)
  })

  it('should return hasMinLength false for passwords shorter than 8 characters', () => {
    expect(validatePassword('Pass1').hasMinLength).toBe(false)
    expect(validatePassword('Abc123').hasMinLength).toBe(false)
  })

  it('should return hasUppercase false for passwords without uppercase letters', () => {
    expect(validatePassword('password123').hasUppercase).toBe(false)
    expect(validatePassword('mypassword1').hasUppercase).toBe(false)
  })

  it('should return hasNumber false for passwords without numbers', () => {
    expect(validatePassword('Password').hasNumber).toBe(false)
    expect(validatePassword('MyPassword').hasNumber).toBe(false)
  })

  it('should return isValid false for empty passwords', () => {
    expect(validatePassword('').isValid).toBe(false)
  })

  it('should detect special characters', () => {
    expect(validatePassword('Password123!').hasSpecialChar).toBe(true)
    expect(validatePassword('Password123').hasSpecialChar).toBe(false)
  })
})

describe('getValidationError', () => {
  it('should return null for valid emails', () => {
    expect(getValidationError('email', 'user@example.com')).toBeNull()
  })

  it('should return error key for invalid emails', () => {
    const error = getValidationError('email', 'invalid-email')
    expect(error).toBe('auth.errors.invalidEmail')
  })

  it('should return error key for empty emails', () => {
    const error = getValidationError('email', '')
    expect(error).toBe('auth.errors.invalidValue')
  })

  it('should return null for valid passwords', () => {
    expect(getValidationError('password', 'Password123')).toBeNull()
  })

  it('should return error key for short passwords', () => {
    const error = getValidationError('password', 'short')
    expect(error).toBe('auth.errors.passwordTooShort')
  })

  it('should return error key for passwords without uppercase', () => {
    const error = getValidationError('password', 'password123')
    expect(error).toBe('auth.errors.passwordNoUppercase')
  })

  it('should return error key for passwords without numbers', () => {
    const error = getValidationError('password', 'Password')
    expect(error).toBe('auth.errors.passwordNoNumber')
  })

  it('should return null for valid first names', () => {
    expect(getValidationError('firstName', 'John')).toBeNull()
  })

  it('should return error key for invalid names (too short)', () => {
    const error = getValidationError('firstName', 'J')
    expect(error).toBe('auth.errors.nameTooShort')
  })

  it('should return null for matching passwords', () => {
    expect(
      getValidationError('confirmPassword', 'Password123', 'Password123')
    ).toBeNull()
  })

  it('should return error key for non-matching passwords', () => {
    const error = getValidationError(
      'confirmPassword',
      'Password123',
      'Different'
    )
    expect(error).toBe('auth.errors.passwordsDontMatch')
  })
})
