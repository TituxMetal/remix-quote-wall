export const validateEmail = (email: unknown) => {
  if (typeof email !== 'string') {
    return `Email must be a string.`
  }

  if (email.trim().length === 0) {
    return `Email must not be empty.`
  }

  if (email.trim().length < 3) {
    return `Email must be at least 3 characters long.`
  }

  if (!email.trim().includes('@')) {
    return `Email must be a valid email.`
  }

  return true
}

export const validatePassword = (password: unknown) => {
  if (typeof password !== 'string') {
    return `Password must be a string.`
  }

  if (password.trim().length === 0) {
    return `Password must not be empty.`
  }

  if (password.trim().length < 6) {
    return `Password must be at least 6 characters long.`
  }

  return true
}

export const validateUrl = (url: string) => {
  const urls = ['/', '/quote/new']

  if (urls.includes(url)) {
    return url
  }

  return '/'
}
