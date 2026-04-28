<template>
  <div class="min-h-screen w-full relative overflow-hidden" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);">
    <!-- Decorative dots scattered around -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Top right corner - 6x2 grid pattern -->
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 8%; right: calc(50% - 256px - 30px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 8%; right: calc(50% - 256px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 8%; right: calc(50% - 256px + 30px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 8%; right: calc(50% - 256px + 60px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 8%; right: calc(50% - 256px + 90px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 8%; right: calc(50% - 256px + 120px);"></div>
      
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 12%; right: calc(50% - 256px - 30px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 12%; right: calc(50% - 256px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 12%; right: calc(50% - 256px + 30px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 12%; right: calc(50% - 256px + 60px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 12%; right: calc(50% - 256px + 90px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 12%; right: calc(50% - 256px + 120px);"></div>
      
      <!-- Additional vertical dots along the right edge of form -->
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 16%; right: calc(50% - 256px - 30px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 20%; right: calc(50% - 256px - 30px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 24%; right: calc(50% - 256px - 30px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="top: 28%; right: calc(50% - 256px - 30px);"></div>
      
      <!-- Bottom left corner - horizontal row of dots -->
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="bottom: 12%; left: calc(50% - 256px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="bottom: 12%; left: calc(50% - 256px + 30px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="bottom: 12%; left: calc(50% - 256px + 60px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="bottom: 12%; left: calc(50% - 256px + 90px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="bottom: 12%; left: calc(50% - 256px + 120px);"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-70" style="bottom: 12%; left: calc(50% - 256px + 150px);"></div>
      
      <!-- Additional scattered dots on right side -->
      <div class="absolute w-1.5 h-1.5 bg-red-300 rounded-full opacity-60" style="top: 18%; right: 5%;"></div>
      <div class="absolute w-2 h-2 bg-red-400 rounded-full opacity-50" style="top: 22%; right: 15%;"></div>
      <div class="absolute w-1 h-1 bg-red-300 rounded-full opacity-70" style="top: 26%; right: 10%;"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-60" style="top: 30%; right: 18%;"></div>
      <div class="absolute w-2 h-2 bg-red-200 rounded-full opacity-40" style="top: 34%; right: 6%;"></div>
      
      <!-- Bottom right dots -->
      <div class="absolute w-1 h-1 bg-red-400 rounded-full opacity-50" style="bottom: 25%; right: 15%;"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-300 rounded-full opacity-60" style="bottom: 20%; right: 18%;"></div>
      <div class="absolute w-2 h-2 bg-red-200 rounded-full opacity-40" style="bottom: 15%; right: 12%;"></div>
      
      <!-- Left side dots -->
      <div class="absolute w-1.5 h-1.5 bg-red-300 rounded-full opacity-50" style="top: 20%; left: 8%;"></div>
      <div class="absolute w-1 h-1 bg-red-400 rounded-full opacity-60" style="top: 30%; left: 12%;"></div>
      <div class="absolute w-2 h-2 bg-red-200 rounded-full opacity-40" style="top: 40%; left: 6%;"></div>
      
      <!-- Bottom left dots -->
      <div class="absolute w-1 h-1 bg-red-300 rounded-full opacity-70" style="bottom: 30%; left: 10%;"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-50" style="bottom: 25%; left: 15%;"></div>
      <div class="absolute w-1 h-1 bg-red-200 rounded-full opacity-60" style="bottom: 20%; left: 8%;"></div>
      <div class="absolute w-2 h-2 bg-red-300 rounded-full opacity-40" style="bottom: 15%; left: 12%;"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-50" style="bottom: 10%; left: 18%;"></div>
      
      <!-- Additional scattered dots -->
      <div class="absolute w-1 h-1 bg-red-300 rounded-full opacity-50" style="top: 60%; left: 20%;"></div>
      <div class="absolute w-1.5 h-1.5 bg-red-200 rounded-full opacity-40" style="top: 70%; right: 25%;"></div>
      <div class="absolute w-1 h-1 bg-red-400 rounded-full opacity-60" style="top: 80%; left: 25%;"></div>
    </div>

    <!-- Main content centered -->
    <div class="w-full h-screen flex items-center justify-center relative z-10">
      <!-- Decorative background elements -->
      <div class="absolute -z-10 w-full max-w-lg h-full flex items-center justify-center pointer-events-none">
        <!-- Bottom-left pink decorative box -->
        <div class="absolute w-64 h-72 bg-red-50 rounded-[2.5rem] -translate-x-40 translate-y-60 opacity-60 flex items-start p-8">
          <div class="flex gap-3">
            <div v-for="i in 6" :key="i" class="w-1.5 h-1.5 bg-red-300 rounded-full"></div>
          </div>
        </div>
        <!-- Bottom-center transparent decorative box -->
        <div class="absolute w-52 h-60 bg-white bg-opacity-10 border-2 border-gray-300/60 rounded-[2rem] -translate-x-20 translate-y-[280px]"></div>
        <!-- Gray border only decorative box -->
        <div class="absolute w-60 h-68 border border-gray-300/40 rounded-[2.2rem] -translate-x-20 translate-y-80"></div>
      </div>

      <!-- Main login card -->
      <div class="bg-white rounded-lg shadow-xl p-12 w-full max-w-lg mx-4 relative">
        <!-- Logo section -->
        <div class="flex justify-center mb-8">
          <img 
            src="/src/assets/login.png" 
            alt="PVF Football Academy" 
            class="h-36 w-auto object-contain"
          />
        </div>

        <!-- Login heading -->
        <h1 class="text-2xl font-semibold text-center mb-8 text-gray-700 tracking-wider">
          ĐĂNG NHẬP
        </h1>

        <!-- Login form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username input -->
          <div>
            <input
              v-model="username"
              type="text"
              placeholder="Tài khoản"
              class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm placeholder-gray-400"
              required
            />
          </div>

          <!-- Password input -->
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Mật khẩu"
              class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-12 placeholder-gray-400"
              required
            />
            <button 
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              @click="togglePassword"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            </button>
          </div>

          <!-- Remember me and forgot password -->
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center">
              <input 
                v-model="rememberMe"
                type="checkbox" 
                class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
              />
              <span class="ml-2 text-gray-600">Nhớ mật khẩu</span>
            </label>
            <a href="#" class="text-red-500 hover:text-red-600 font-medium transition-colors">
              Quên mật khẩu?
            </a>
          </div>

          <!-- Login button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {{ loading ? 'Đang đăng nhập...' : 'Đăng Nhập' }}
          </button>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Hoặc</span>
            </div>
          </div>

          <!-- Google login button -->
          <button
            type="button"
            @click="handleGoogleLogin"
            class="w-full bg-white border border-red-300 text-red-600 font-medium py-3 px-4 rounded hover:bg-red-50 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Đăng nhập với Google
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showPassword = ref(false)
const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  if (!username.value || !password.value) {
    alert('Vui lòng nhập đầy đủ thông tin')
    return
  }

  loading.value = true
  
  try {
    // TODO: Implement actual login logic
    console.log('Login:', { 
      username: username.value, 
      password: password.value,
      rememberMe: rememberMe.value 
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to dashboard
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
    alert('Đăng nhập thất bại')
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = async () => {
  try {
    // TODO: Implement Google OAuth login
    console.log('Google login clicked')
    
    // Simulate Google login
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to dashboard
    router.push('/dashboard')
  } catch (error) {
    console.error('Google login failed:', error)
    alert('Đăng nhập Google thất bại')
  }
}
</script>