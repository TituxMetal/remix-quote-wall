import { validateEmail, validatePassword, validateUrl } from './validation'

describe('validation', () => {
  describe('validateEmail', () => {
    it('should be a string', () => {
      const errorMessage = 'Email must be a string.'
      expect(validateEmail(undefined)).toBe(errorMessage)
      expect(validateEmail(null)).toBe(errorMessage)
      expect(validateEmail(false)).toBe(errorMessage)
    })

    it('should have at least 3 characters', () => {
      expect(validateEmail('')).toBe('Email must not be empty.')
      expect(validateEmail('    ')).toBe('Email must not be empty.')
    })

    it('should be at least 3 characters long', () => {
      const errorMessage = `Email must be at least 3 characters long.`

      expect(validateEmail('a@  ')).toBe(errorMessage)
      expect(validateEmail('a@')).toBe(errorMessage)
      expect(validateEmail('ab')).toBe(errorMessage)
    })

    it('should include @ symbol', () => {
      expect(validateEmail('rachelATremixDOTrun')).toBe(
        'Email must be a valid email.'
      )
    })

    it('should return true for valid email', () => {
      expect(validateEmail('rachel@remix.run')).toBe(true)
    })
  })

  describe('validatePassword', () => {
    it('should be a string', () => {
      const errorMessage = 'Password must be a string.'

      expect(validatePassword(undefined)).toBe(errorMessage)
      expect(validatePassword(null)).toBe(errorMessage)
      expect(validatePassword(false)).toBe(errorMessage)
    })

    it('should not be empty', () => {
      const errorMessage = 'Password must not be empty.'

      expect(validatePassword('')).toBe(errorMessage)
      expect(validatePassword('      ')).toBe(errorMessage)
    })

    it('should be at least 6 characters long', () => {
      const errorMessage = `Password must be at least 6 characters long.`

      expect(validatePassword('aze  ')).toBe(errorMessage)
      expect(validatePassword('aze')).toBe(errorMessage)
      expect(validatePassword('aze')).toBe(errorMessage)
    })

    it('should return true for valid password', () => {
      expect(validatePassword('racheliscool')).toBe(true)
    })
  })

  describe('validateUrl', () => {
    it('should return / if invalid url', () => {
      expect(validateUrl('/login')).toBe('/')
    })

    it('should return the url if it is a valid one', () => {
      expect(validateUrl('/quote/new')).toBe('/quote/new')
    })
  })
})
