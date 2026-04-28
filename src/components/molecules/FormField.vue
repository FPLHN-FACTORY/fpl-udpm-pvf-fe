<template>
  <div class="form-field">
    <BaseInput
      :model-value="modelValue"
      :type="type"
      :label="label"
      :placeholder="placeholder"
      :error="error"
      :helper-text="helperText"
      :required="required"
      :disabled="disabled"
      @update:model-value="$emit('update:modelValue', $event)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import BaseInput from '../atoms/BaseInput.vue'

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

withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  required: false,
  disabled: false
})

defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()
</script>

<style scoped>
.form-field {
  width: 100%;
}
</style>