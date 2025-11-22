// Tests for logger utility
// Verifies logging behavior with emoji prefixes

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { logger } from '@/utils/logger'

describe('logger', () => {
  // Mock console methods
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>
  let consoleLogSpy: ReturnType<typeof vi.spyOn>
  let consoleDebugSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Spy on console methods
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
  })

  afterEach(() => {
    // Restore console methods
    consoleErrorSpy.mockRestore()
    consoleWarnSpy.mockRestore()
    consoleLogSpy.mockRestore()
    consoleDebugSpy.mockRestore()
  })

  describe('error', () => {
    it('should log error messages with emoji', () => {
      logger.error('Test error message')

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '❌ Test error message',
        undefined,
        undefined
      )
    })

    it('should log error messages with error object and context', () => {
      const error = new Error('Something went wrong')
      const context = { userId: '123', action: 'login' }

      logger.error('Login failed', error, context)

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '❌ Login failed',
        error,
        context
      )
    })
  })

  describe('warn', () => {
    it('should log warning messages with emoji', () => {
      logger.warn('Test warning')

      expect(consoleWarnSpy).toHaveBeenCalledWith('⚠️ Test warning', undefined)
    })

    it('should log warnings with context', () => {
      const context = { attemptCount: 3 }

      logger.warn('Retry limit approaching', context)

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '⚠️ Retry limit approaching',
        context
      )
    })
  })

  describe('info', () => {
    it('should log info messages with emoji', () => {
      logger.info('User logged in')

      expect(consoleLogSpy).toHaveBeenCalledWith('ℹ️ User logged in', undefined)
    })

    it('should log info with context', () => {
      const context = { timestamp: '2025-01-30' }

      logger.info('Session started', context)

      expect(consoleLogSpy).toHaveBeenCalledWith('ℹ️ Session started', context)
    })
  })

  describe('debug', () => {
    it('should log debug messages with emoji', () => {
      logger.debug('Debug info')

      expect(consoleDebugSpy).toHaveBeenCalledWith('🐛 Debug info', undefined)
    })

    it('should log debug with data', () => {
      const data = { variable: 'value', count: 42 }

      logger.debug('Variable state', data)

      expect(consoleDebugSpy).toHaveBeenCalledWith('🐛 Variable state', data)
    })
  })

  describe('integration', () => {
    it('should log all levels correctly', () => {
      logger.error('Error message')
      logger.warn('Warning message')
      logger.info('Info message')
      logger.debug('Debug message')

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
      expect(consoleLogSpy).toHaveBeenCalledTimes(1)
      expect(consoleDebugSpy).toHaveBeenCalledTimes(1)
    })
  })
})
