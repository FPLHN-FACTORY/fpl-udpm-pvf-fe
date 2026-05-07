<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <div class="login-form__header">
      <h1 class="login-form__title">ĐĂNG NHẬP</h1>
    </div>

    <div class="login-form__fields">
      <FormField
        v-model="formData.username"
        label="Tài khoản"
        placeholder="Nhập tài khoản"
        required
        :error="errors.username"
      />

      <FormField
        v-model="formData.password"
        type="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        required
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
      <BaseButton
        type="submit"
        variant="primary"
        size="medium"
        :disabled="loading"
        class="login-form__submit"
      >
        {{ loading ? 'Đang đăng nhập...' : 'Đăng Nhập' }}
      </BaseButton>

      <div class="login-form__divider">
        <span class="login-form__divider-line"></span>
        <span class="login-form__divider-text">Hoặc</span>
        <span class="login-form__divider-line"></span>
      </div>

      <BaseButton
        variant="outline"
        size="medium"
        class="login-form__google"
        @click="handleGoogleLogin"
      >
        <template #icon-left>
          <BaseIcon name="google" size="20" />
        </template>
        Đăng nhập với Google
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseButton from '../atoms/BaseButton.vue'
import BaseCheckbox from '../atoms/BaseCheckbox.vue'
import BaseIcon from '../atoms/BaseIcon.vue'
import FormField from './FormField.vue'

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