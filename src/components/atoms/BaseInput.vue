<template>
  <div class="flex w-full flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-sm font-semibold text-gray-700">
      {{ label }}
    </label>

    <a-input
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      :status="error ? 'error' : ''"
      :class="['hover:border-red-400 focus:border-red-500', $attrs.class]"
      @input="handleInput"
    >
      <template v-if="icon" #prefix>
        <NavIcon :name="icon" class-name="h-4 w-4 text-gray-400" />
      </template>
    </a-input>

    <span v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</span>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import NavIcon from './icons/NavIcon.vue'

interface Props {
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: string
  icon?: string
  error?: string
  disabled?: boolean
  id?: string
}

defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
:deep(.ant-input:focus),
:deep(.ant-input-focused) {
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1);
}
</style>
