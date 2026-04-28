<template>
  <label class="base-checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="base-checkbox__input"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span class="base-checkbox__checkmark"></span>
    <span v-if="$slots.default" class="base-checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<style scoped>
.base-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.base-checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.base-checkbox__checkmark {
  position: relative;
  height: 16px;
  width: 16px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 3px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.base-checkbox__checkmark::after {
  content: "";
  position: absolute;
  display: none;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.base-checkbox__input:checked ~ .base-checkbox__checkmark {
  background-color: #ef4444;
  border-color: #ef4444;
}

.base-checkbox__input:checked ~ .base-checkbox__checkmark::after {
  display: block;
}

.base-checkbox__input:focus ~ .base-checkbox__checkmark {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.base-checkbox__input:disabled ~ .base-checkbox__checkmark {
  background-color: #f9fafb;
  border-color: #d1d5db;
  cursor: not-allowed;
}

.base-checkbox__input:disabled ~ .base-checkbox__label {
  color: #9ca3af;
  cursor: not-allowed;
}

.base-checkbox__label {
  font-size: 14px;
  line-height: 20px;
  color: #374151;
}
</style>