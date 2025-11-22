// Tests for useAuthForm hook
// Validates form state management, validation, and submission

import { describe, it, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import useAuthForm from '@/hooks/useAuthForm'
import type { FormEvent } from 'react'

// Mock form event helper
const createMockFormEvent = (): FormEvent =>
  ({
    preventDefault: vi.fn(),
  }) as unknown as FormEvent

describe('useAuthForm', () => {
  describe('initialization', () => {
    it('should initialize with empty values', () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() => useAuthForm({ onSubmit }))

      expect(result.current.formState.email).toBe('')
      expect(result.current.formState.password).toBe('')
      expect(result.current.formState.loading).toBe(false)
      expect(result.current.formState.error).toBeNull()
    })

    it('should initialize confirm password when required', () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() =>
        useAuthForm({ onSubmit, requireConfirmPassword: true })
      )

      expect(result.current.formState.confirmPassword).toBe('')
    })

    it('should initialize name fields when required', () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() =>
        useAuthForm({ onSubmit, requireNames: true })
      )

      expect(result.current.formState.firstName).toBe('')
      expect(result.current.formState.lastName).toBe('')
    })
  })

  describe('field updates', () => {
    it('should update email field', () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() => useAuthForm({ onSubmit }))

      act(() => {
        result.current.handleEmailChange('user@example.com')
      })

      expect(result.current.formState.email).toBe('user@example.com')
    })

    it('should update password field', () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() => useAuthForm({ onSubmit }))

      act(() => {
        result.current.handlePasswordChange('Password123')
      })

      expect(result.current.formState.password).toBe('Password123')
    })

    it('should update confirm password field', () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() =>
        useAuthForm({ onSubmit, requireConfirmPassword: true })
      )

      act(() => {
        result.current.handleConfirmPasswordChange('Password123')
      })

      expect(result.current.formState.confirmPassword).toBe('Password123')
    })

    it('should update first name field', () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() =>
        useAuthForm({ onSubmit, requireNames: true })
      )

      act(() => {
        result.current.handleFirstNameChange('John')
      })

      expect(result.current.formState.firstName).toBe('John')
    })

    it('should update last name field', () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() =>
        useAuthForm({ onSubmit, requireNames: true })
      )

      act(() => {
        result.current.handleLastNameChange('Doe')
      })

      expect(result.current.formState.lastName).toBe('Doe')
    })
  })

  describe('error clearing', () => {
    it('should clear email error on change', async () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() => useAuthForm({ onSubmit }))

      // Submit with invalid email to set error
      act(() => {
        result.current.handleEmailChange('invalid')
        result.current.handlePasswordChange('Password123')
      })

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent())
      })

      expect(result.current.formState.emailError).toBeTruthy()

      // Change email should clear error
      act(() => {
        result.current.handleEmailChange('user@example.com')
      })

      expect(result.current.formState.emailError).toBeNull()
    })

    it('should clear password error on change', async () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() => useAuthForm({ onSubmit }))

      // Submit with invalid password to set error
      act(() => {
        result.current.handleEmailChange('user@example.com')
        result.current.handlePasswordChange('short')
      })

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent())
      })

      expect(result.current.formState.passwordError).toBeTruthy()

      // Change password should clear error
      act(() => {
        result.current.handlePasswordChange('Password123')
      })

      expect(result.current.formState.passwordError).toBeNull()
    })
  })

  describe('validation', () => {
    it('should show error for invalid email', async () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() => useAuthForm({ onSubmit }))

      act(() => {
        result.current.handleEmailChange('invalid-email')
        result.current.handlePasswordChange('Password123')
      })

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent())
      })

      expect(result.current.formState.emailError).toBe(
        'auth.errors.invalidEmail'
      )
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('should show error for invalid password', async () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() => useAuthForm({ onSubmit }))

      act(() => {
        result.current.handleEmailChange('user@example.com')
        result.current.handlePasswordChange('short')
      })

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent())
      })

      expect(result.current.formState.passwordError).toBe(
        'auth.errors.passwordTooShort'
      )
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('should show error for non-matching passwords', async () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() =>
        useAuthForm({ onSubmit, requireConfirmPassword: true })
      )

      act(() => {
        result.current.handleEmailChange('user@example.com')
        result.current.handlePasswordChange('Password123')
        result.current.handleConfirmPasswordChange('DifferentPassword')
      })

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent())
      })

      expect(result.current.formState.confirmPasswordError).toBe(
        'auth.errors.passwordsDontMatch'
      )
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('should show error for invalid first name', async () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() =>
        useAuthForm({ onSubmit, requireNames: true })
      )

      act(() => {
        result.current.handleEmailChange('user@example.com')
        result.current.handlePasswordChange('Password123')
        result.current.handleFirstNameChange('J')
        result.current.handleLastNameChange('Doe')
      })

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent())
      })

      expect(result.current.formState.firstNameError).toBe(
        'auth.errors.nameTooShort'
      )
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })

  describe('submission', () => {
    it('should call onSubmit with valid data', async () => {
      const onSubmit = vi.fn().mockResolvedValue(undefined)
      const { result } = renderHook(() => useAuthForm({ onSubmit }))

      act(() => {
        result.current.handleEmailChange('user@example.com')
        result.current.handlePasswordChange('Password123')
      })

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent())
      })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          email: 'user@example.com',
          password: 'Password123',
          confirmPassword: undefined,
          firstName: undefined,
          lastName: undefined,
        })
      })
    })

    it('should set loading state during submission', async () => {
      const onSubmit = vi
        .fn()
        .mockImplementation(
          () => new Promise((resolve) => setTimeout(resolve, 100))
        )
      const { result } = renderHook(() => useAuthForm({ onSubmit }))

      act(() => {
        result.current.handleEmailChange('user@example.com')
        result.current.handlePasswordChange('Password123')
      })

      act(() => {
        result.current.handleSubmit(createMockFormEvent())
      })

      expect(result.current.formState.loading).toBe(true)

      await waitFor(() => {
        expect(result.current.formState.loading).toBe(false)
      })
    })

    it('should set loading to false even on submission errors', async () => {
      const errorMessage = 'Network error'
      const onSubmit = vi.fn().mockRejectedValue(new Error(errorMessage))
      const { result } = renderHook(() => useAuthForm({ onSubmit }))

      act(() => {
        result.current.handleEmailChange('user@example.com')
        result.current.handlePasswordChange('Password123')
      })

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent())
      })

      // Hook logs error but doesn't set it in state (component responsibility)
      // Verify loading is false after error
      await waitFor(() => {
        expect(result.current.formState.loading).toBe(false)
      })
    })

    it('should include all fields when all are required', async () => {
      const onSubmit = vi.fn().mockResolvedValue(undefined)
      const { result } = renderHook(() =>
        useAuthForm({
          onSubmit,
          requireConfirmPassword: true,
          requireNames: true,
        })
      )

      act(() => {
        result.current.handleEmailChange('user@example.com')
        result.current.handlePasswordChange('Password123')
        result.current.handleConfirmPasswordChange('Password123')
        result.current.handleFirstNameChange('John')
        result.current.handleLastNameChange('Doe')
      })

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent())
      })

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          email: 'user@example.com',
          password: 'Password123',
          confirmPassword: 'Password123',
          firstName: 'John',
          lastName: 'Doe',
        })
      })
    })
  })

  describe('resetForm', () => {
    it('should reset all fields and errors', async () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() =>
        useAuthForm({
          onSubmit,
          requireConfirmPassword: true,
          requireNames: true,
        })
      )

      // Fill form and create errors
      act(() => {
        result.current.handleEmailChange('invalid')
        result.current.handlePasswordChange('short')
        result.current.handleConfirmPasswordChange('different')
        result.current.handleFirstNameChange('J')
        result.current.handleLastNameChange('D')
      })

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent())
      })

      // Verify fields have values and errors
      expect(result.current.formState.email).toBe('invalid')
      expect(result.current.formState.emailError).toBeTruthy()

      // Reset form
      act(() => {
        result.current.resetForm()
      })

      // Verify everything is reset
      expect(result.current.formState.email).toBe('')
      expect(result.current.formState.password).toBe('')
      expect(result.current.formState.confirmPassword).toBe('')
      expect(result.current.formState.firstName).toBe('')
      expect(result.current.formState.lastName).toBe('')
      expect(result.current.formState.emailError).toBeNull()
      expect(result.current.formState.passwordError).toBeNull()
      expect(result.current.formState.confirmPasswordError).toBeNull()
      expect(result.current.formState.firstNameError).toBeNull()
      expect(result.current.formState.lastNameError).toBeNull()
      expect(result.current.formState.loading).toBe(false)
      expect(result.current.formState.error).toBeNull()
    })
  })

  describe('setGeneralError', () => {
    it('should set general error message', () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() => useAuthForm({ onSubmit }))

      act(() => {
        result.current.setGeneralError('Something went wrong')
      })

      expect(result.current.formState.error).toBe('Something went wrong')
    })

    it('should clear general error message', () => {
      const onSubmit = vi.fn()
      const { result } = renderHook(() => useAuthForm({ onSubmit }))

      act(() => {
        result.current.setGeneralError('Error message')
      })

      expect(result.current.formState.error).toBe('Error message')

      act(() => {
        result.current.setGeneralError(null)
      })

      expect(result.current.formState.error).toBeNull()
    })
  })
})
