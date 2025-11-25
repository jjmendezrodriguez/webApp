// Tests for password strength calculator

import { describe, it, expect } from 'vitest'
import {
  calculatePasswordStrength,
  getStrengthColor,
  getStrengthTextColor,
  type PasswordStrength,
} from '@/utils/passwordStrength'

describe('calculatePasswordStrength', () => {
  it('should return weak for empty passwords', () => {
    const result = calculatePasswordStrength('')
    expect(result.strength).toBe('weak')
    expect(result.score).toBe(0)
    expect(result.feedback).toContain('auth.errors.invalidValue')
  })

  it('should return weak for short passwords', () => {
    const result = calculatePasswordStrength('abc')
    expect(result.strength).toBe('weak')
    expect(result.score).toBeLessThan(40)
  })

  it('should return medium for passwords with basic requirements', () => {
    const result = calculatePasswordStrength('Password123')
    expect(result.strength).toBe('medium')
    expect(result.score).toBeGreaterThanOrEqual(40)
    expect(result.score).toBeLessThan(70)
  })

  it('should return strong for passwords with all criteria', () => {
    const result = calculatePasswordStrength('MySecure@Password123')
    expect(result.strength).toBe('strong')
    expect(result.score).toBeGreaterThanOrEqual(70)
  })

  it('should provide feedback for missing uppercase', () => {
    const result = calculatePasswordStrength('password123')
    expect(result.feedback).toContain('auth.errors.passwordNoUppercase')
  })

  it('should provide feedback for missing numbers', () => {
    const result = calculatePasswordStrength('Password')
    expect(result.feedback).toContain('auth.errors.passwordNoNumber')
  })

  it('should provide feedback for short passwords', () => {
    const result = calculatePasswordStrength('Pass1')
    expect(result.feedback).toContain('auth.errors.passwordTooShort')
  })

  it('should increase score with length', () => {
    const short = calculatePasswordStrength('Password1')
    const medium = calculatePasswordStrength('Password123456')
    const long = calculatePasswordStrength('Password1234567890123')

    expect(medium.score).toBeGreaterThan(short.score)
    expect(long.score).toBeGreaterThan(medium.score)
  })

  it('should increase score with special characters', () => {
    const noSpecial = calculatePasswordStrength('Password123')
    const withSpecial = calculatePasswordStrength('Password123!')

    expect(withSpecial.score).toBeGreaterThan(noSpecial.score)
  })

  it('should provide empty feedback for strong passwords', () => {
    const result = calculatePasswordStrength('MySecure@Pass123')
    expect(result.feedback).toHaveLength(0)
  })
})

describe('getStrengthColor', () => {
  it('should return red for weak passwords', () => {
    const color = getStrengthColor('weak')
    expect(color).toBe('bg-red-500')
  })

  it('should return yellow for medium passwords', () => {
    const color = getStrengthColor('medium')
    expect(color).toBe('bg-yellow-500')
  })

  it('should return green for strong passwords', () => {
    const color = getStrengthColor('strong')
    expect(color).toBe('bg-green-500')
  })

  it('should return gray for unknown strength', () => {
    const color = getStrengthColor('unknown' as PasswordStrength)
    expect(color).toBe('bg-gray-300')
  })
})

describe('getStrengthTextColor', () => {
  it('should return red text for weak passwords', () => {
    const color = getStrengthTextColor('weak')
    expect(color).toBe('text-red-600')
  })

  it('should return yellow text for medium passwords', () => {
    const color = getStrengthTextColor('medium')
    expect(color).toBe('text-yellow-600')
  })

  it('should return green text for strong passwords', () => {
    const color = getStrengthTextColor('strong')
    expect(color).toBe('text-green-600')
  })

  it('should return gray text for unknown strength', () => {
    const color = getStrengthTextColor('unknown' as PasswordStrength)
    expect(color).toBe('text-gray-600')
  })
})
