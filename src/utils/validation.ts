// Validation utilities

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 6
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validateUsername = (username: string): boolean => {
  return username.trim().length >= 3
}

export interface ValidationRule {
  test: (value: string) => boolean
  message: string
}

export const createValidator = (rules: ValidationRule[]) => {
  return (value: string): string | null => {
    for (const rule of rules) {
      if (!rule.test(value)) {
        return rule.message
      }
    }
    return null
  }
}

// Common validation rules
export const usernameRules: ValidationRule[] = [
  {
    test: validateRequired,
    message: 'Vui lòng nhập tài khoản'
  },
  {
    test: validateUsername,
    message: 'Tài khoản phải có ít nhất 3 ký tự'
  }
]

export const passwordRules: ValidationRule[] = [
  {
    test: validateRequired,
    message: 'Vui lòng nhập mật khẩu'
  },
  {
    test: validatePassword,
    message: 'Mật khẩu phải có ít nhất 6 ký tự'
  }
]

export const emailRules: ValidationRule[] = [
  {
    test: validateRequired,
    message: 'Vui lòng nhập email'
  },
  {
    test: validateEmail,
    message: 'Email không hợp lệ'
  }
]