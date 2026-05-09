<template>
  <button
    :type="nativeType"
    :class="buttonClass"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60"
    @click="$emit('click', $event)"
  >
    <NavIcon v-if="icon" :name="icon" :class-name="iconClass" :size="18" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'

interface Props {
  label?: string
  icon?: string
  tone?: 'primary' | 'secondary' | 'warning' | 'neutral' | 'light' | 'success'
  square?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'light',
  square: false,
  nativeType: 'button',
  disabled: false
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const toneMap: Record<NonNullable<Props['tone']>, string> = {
  primary: 'bg-[#ef2b2d] text-white shadow-sm hover:bg-[#d91f24]',
  secondary: 'bg-[#696cff] text-white shadow-sm hover:bg-[#5f62e9]',
  warning: 'bg-[#ffab00] text-white shadow-sm hover:bg-[#f09f00]',
  neutral: 'bg-[#8592a3] text-white shadow-sm hover:bg-[#717d8c]',
  light: 'bg-[#f5f5f9] text-[#8592a3] hover:bg-[#edf1f5]',
  success: 'bg-[#71dd37] text-white shadow-sm hover:bg-[#5ac825]'
}

const buttonClass = computed(() => [
  toneMap[props.tone],
  props.square ? 'h-10 w-10 px-0' : 'min-h-10'
])

const iconClass = computed(() => (props.label ? 'h-[18px] w-[18px]' : 'h-5 w-5'))
</script>
