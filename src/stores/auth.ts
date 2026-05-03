import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, LoginCredentials } from '../types'
import { authService } from '../services/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null

    try {
      const response = await authService.login(credentials)
      user.value = response.user
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Đăng nhập thất bại'
      throw err
    } finally {
      loading.value = false
    }
  }

  const loginWithGoogle = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await authService.loginWithGoogle()
      user.value = response.user
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Đăng nhập Google thất bại'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      user.value = null
      error.value = null
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    loginWithGoogle,
    logout,
    clearError
  }
})
