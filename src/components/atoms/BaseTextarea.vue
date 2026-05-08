<template>
  <div class="flex w-full flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-sm font-semibold text-[#566a7f]">
      {{ label }}
    </label>

    <a-textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :status="error ? 'error' : ''"
      class="rounded-md p-3 hover:border-red-400 focus:border-red-500 focus:shadow-none !border-[#d9dee3]"
      @input="handleInput"
    />

    <span v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</span>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  rows?: number
  error?: string
  disabled?: boolean
  id?: string
}

withDefaults(defineProps<Props>(), {
  rows: 4,
  disabled: false
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}
</script>

<style scoped>
:deep(.ant-input:focus),
:deep(.ant-input-focused) {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1) !important;
}
</style>
