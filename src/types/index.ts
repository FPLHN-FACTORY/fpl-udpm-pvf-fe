// Common types for the application

export interface User {
  id: string
  username: string
  email: string
  fullName: string
  role: 'admin' | 'teacher' | 'student'
  avatar?: string
}

export interface LoginCredentials {
  username: string
  password: string
  rememberMe?: boolean
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}
