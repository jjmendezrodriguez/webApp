// Tests for useAuth hook
// Validates proper context access

import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'

describe('useAuth', () => {
  it('should throw error when used outside AuthProvider', () => {
    // Suppress console.error for this test since we expect an error
    const originalError = console.error
    console.error = () => {}

    expect(() => {
      renderHook(() => useAuth())
    }).toThrow('useAuth must be used within an AuthProvider')

    // Restore console.error
    console.error = originalError
  })
})
