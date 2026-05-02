<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <div class="login-form__header">
      <h1 class="login-form__title">ĐĂNG NHẬP</h1>
    </div>

    <div class="login-form__fields">
      <InputForm
        v-model="formData.username"
        label="Tài khoản"
        placeholder="Nhập tài khoản"
        :error="errors.username"
      />

      <InputForm
        v-model="formData.password"
        type="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        :error="errors.password"
      />
    </div>

    <div class="login-form__options">
      <BaseCheckbox v-model="formData.rememberMe">
        Nhớ mật khẩu
      </BaseCheckbox>
      <a href="#" class="login-form__forgot-link">Quên mật khẩu?</a>
    </div>

    <div class="login-form__actions">
      <a-button
        type="primary"
        html-type="submit"
        :loading="loading"
        class="!w-full !h-[42px] !bg-[#ff3e1d] hover:!bg-[#e6381a] !border-none !rounded-md font-bold shadow-md shadow-red-100"
      >
        {{ loading ? 'Đang đăng nhập...' : 'Đăng Nhập' }}
      </a-button>

      <div class="login-form__divider">
        <span class="login-form__divider-line"></span>
        <span class="login-form__divider-text">Hoặc</span>
        <span class="login-form__divider-line"></span>
      </div>

      <a-button
        class="!w-full !h-[42px] !bg-white hover:!bg-gray-50 !border-[#d9dee3] !rounded-md font-medium text-gray-600 flex items-center justify-center gap-2 shadow-sm"
        @click="handleGoogleLogin"
      >
        <template #icon>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5" alt="Google" />
        </template>
        Đăng nhập với Google
      </a-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseCheckbox from '../atoms/inputs/BaseCheckbox.vue'
import InputForm from '../atoms/inputs/InputForm.vue'

interface LoginData {
  username: string
  password: string
  rememberMe: boolean
}

const emit = defineEmits<{
  submit: [data: LoginData]
  googleLogin: []
}>()

const loading = ref(false)

const formData = reactive<LoginData>({
  username: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  username: '',
  password: ''
})

const validateForm = (): boolean => {
  errors.username = ''
  errors.password = ''

  if (!formData.username.trim()) {
    errors.username = 'Vui lòng nhập tài khoản'
    return false
  }

  if (!formData.password.trim()) {
    errors.password = 'Vui lòng nhập mật khẩu'
    return false
  }

  if (formData.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    return false
  }

  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    emit('submit', { ...formData })
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = () => {
  emit('googleLogin')
}
</script>

<style scoped>
.login-form {
  width: 100%;
  max-width: 400px;
}

.login-form__header {
  text-align: center;
  margin-bottom: 32px;
}

.login-form__title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  letter-spacing: 0.5px;
}

.login-form__fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.login-form__options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.login-form__forgot-link {
  color: #ef4444;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.login-form__forgot-link:hover {
  text-decoration: underline;
}

.login-form__actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-form__submit {
  width: 100%;
}

.login-form__divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
}

.login-form__divider-line {
  flex: 1;
  height: 1px;
  background-color: #e5e7eb;
}

.login-form__divider-text {
  font-size: 14px;
  color: #6b7280;
  white-space: nowrap;
}

.login-form__google {
  width: 100%;
}
</style>
