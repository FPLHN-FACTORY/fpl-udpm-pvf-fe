<template>
  <div class="base-input">
    <label v-if="label" :for="inputId" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </label>
    <div class="base-input__wrapper">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'base-input__field',
          { 'base-input__field--error': error }
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="base-input__toggle"
        @click="togglePasswordVisibility"
      >
        <BaseIcon :name="showPassword ? 'eye-off' : 'eye'" size="16" />
      </button>
    </div>
    <span v-if="error" class="base-input__error">{{ error }}</span>
    <span v-else-if="helperText" class="base-input__helper">{{ helperText }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseIcon from './BaseIcon.vue'

interface Props {
  modelValue?: string
  type?: 'text' | 'email' | 'password' | 'number'
  label?: string
  placeholder?: string
  error?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  required: false,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const showPassword = ref(false)
const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const type = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.base-input__label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  line-height: 20px;
}

.base-input__required {
  color: #ef4444;
}

.base-input__wrapper {
  position: relative;
}

.base-input__field {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  line-height: 24px;
  color: #111827;
  background-color: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.base-input__field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.base-input__field--error {
  border-color: #ef4444;
}

.base-input__field--error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.base-input__field:disabled {
  background-color: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}

.base-input__field::placeholder {
  color: #9ca3af;
}

.base-input__toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-input__toggle:hover {
  color: #374151;
}

.base-input__error {
  font-size: 14px;
  color: #ef4444;
  line-height: 20px;
}

.base-input__helper {
  font-size: 14px;
  color: #6b7280;
  line-height: 20px;
}
</style>