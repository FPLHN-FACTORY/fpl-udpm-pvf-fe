<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      { 'base-button--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot name="icon-left" />
    <span v-if="$slots.default" class="base-button__text">
      <slot />
    </span>
    <slot name="icon-right" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 6px;
  font-family: 'Public Sans', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  outline: none;
}

.base-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Sizes */
.base-button--small {
  padding: 8px 12px;
  font-size: 14px;
  line-height: 20px;
}

.base-button--medium {
  padding: 12px 16px;
  font-size: 16px;
  line-height: 24px;
}

.base-button--large {
  padding: 16px 24px;
  font-size: 18px;
  line-height: 28px;
}

/* Variants */
.base-button--primary {
  background-color: #ef4444;
  color: white;
}

.base-button--primary:hover:not(:disabled) {
  background-color: #dc2626;
}

.base-button--secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.base-button--secondary:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.base-button--outline {
  background-color: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.base-button--outline:hover:not(:disabled) {
  background-color: #fef2f2;
}

.base-button--ghost {
  background-color: transparent;
  color: #374151;
}

.base-button--ghost:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.base-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-button__text {
  white-space: nowrap;
}
</style>