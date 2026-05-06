import type { LoginCredentials, AuthResponse, ApiResponse } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const result: ApiResponse<AuthResponse> = await response.json()

    if (!result.success || !result.data) {
      throw new Error(result.message || 'Đăng nhập thất bại')
    }

    // Store tokens
    localStorage.setItem('access_token', result.data.token)
    localStorage.setItem('refresh_token', result.data.refreshToken)
    
    if (credentials.rememberMe) {
      localStorage.setItem('remember_me', 'true')
    }

    return result.data
  }

  async loginWithGoogle(): Promise<AuthResponse> {
    // TODO: Implement Google OAuth login
    throw new Error('Google login not implemented yet')
  }

  async logout(): Promise<void> {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('remember_me')
  }

  getToken(): string | null {
    return localStorage.getItem('access_token')
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authService = new AuthService()
