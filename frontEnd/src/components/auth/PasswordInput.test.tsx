// Tests for PasswordInput component
// Validates password visibility toggle and strength meter

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PasswordInput from '@/components/auth/PasswordInput'

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('PasswordInput', () => {
  describe('rendering', () => {
    it('should render password input with label', () => {
      render(
        <PasswordInput
          id="password"
          label="Password"
          value=""
          onChange={() => {}}
        />
      )

      expect(screen.getByLabelText('Password')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render with i18n label key', () => {
      render(
        <PasswordInput
          id="password"
          label="Password"
          labelKey="auth.login.password"
          value=""
          onChange={() => {}}
        />
      )

      expect(screen.getByText('auth.login.password')).toBeInTheDocument()
    })

    it('should show error message when error prop is provided', () => {
      render(
        <PasswordInput
          id="password"
          label="Password"
          value=""
          onChange={() => {}}
          error="auth.errors.passwordTooShort"
        />
      )

      expect(
        screen.getByText('auth.errors.passwordTooShort')
      ).toBeInTheDocument()
    })
  })

  describe('password visibility toggle', () => {
    it('should start with password hidden', () => {
      render(
        <PasswordInput
          id="password"
          label="Password"
          value="secret"
          onChange={() => {}}
        />
      )

      const input = screen.getByLabelText('Password') as HTMLInputElement
      expect(input.type).toBe('password')
    })

    it('should show password when toggle button clicked', () => {
      render(
        <PasswordInput
          id="password"
          label="Password"
          value="secret"
          onChange={() => {}}
        />
      )

      const input = screen.getByLabelText('Password') as HTMLInputElement
      const toggleButton = screen.getByRole('button')

      expect(input.type).toBe('password')

      fireEvent.click(toggleButton)

      expect(input.type).toBe('text')
    })

    it('should hide password when toggle button clicked again', () => {
      render(
        <PasswordInput
          id="password"
          label="Password"
          value="secret"
          onChange={() => {}}
        />
      )

      const input = screen.getByLabelText('Password') as HTMLInputElement
      const toggleButton = screen.getByRole('button')

      // Show password
      fireEvent.click(toggleButton)
      expect(input.type).toBe('text')

      // Hide password
      fireEvent.click(toggleButton)
      expect(input.type).toBe('password')
    })
  })

  describe('password strength meter', () => {
    it('should not show strength meter by default', () => {
      render(
        <PasswordInput
          id="password"
          label="Password"
          value="Password123"
          onChange={() => {}}
        />
      )

      expect(screen.queryByText(/weak|medium|strong/i)).not.toBeInTheDocument()
    })

    it('should show strength meter when enabled', () => {
      render(
        <PasswordInput
          id="password"
          label="Password"
          value="Password123"
          onChange={() => {}}
          showStrengthMeter={true}
        />
      )

      // Strength meter should be visible with strength text
      expect(
        screen.getByText(/auth\.signup\.passwordStrength/)
      ).toBeInTheDocument()
    })

    it('should not show strength meter for empty password', () => {
      render(
        <PasswordInput
          id="password"
          label="Password"
          value=""
          onChange={() => {}}
          showStrengthMeter={true}
        />
      )

      expect(
        screen.queryByText(/auth\.signup\.passwordStrength/)
      ).not.toBeInTheDocument()
    })
  })

  describe('input properties', () => {
    it('should pass through HTML input props', () => {
      render(
        <PasswordInput
          id="password"
          label="Password"
          value="test"
          onChange={() => {}}
          placeholder="Enter password"
          disabled={true}
        />
      )

      const input = screen.getByLabelText('Password') as HTMLInputElement
      expect(input.placeholder).toBe('Enter password')
      expect(input.disabled).toBe(true)
    })

    it('should apply error styles when error is present', () => {
      render(
        <PasswordInput
          id="password"
          label="Password"
          value=""
          onChange={() => {}}
          error="auth.errors.invalidValue"
        />
      )

      const input = screen.getByLabelText('Password')
      expect(input.className).toContain('border-red-500')
    })

    it('should apply normal styles when no error', () => {
      render(
        <PasswordInput
          id="password"
          label="Password"
          value=""
          onChange={() => {}}
        />
      )

      const input = screen.getByLabelText('Password')
      expect(input.className).toContain('border-gray-300')
    })
  })
})
