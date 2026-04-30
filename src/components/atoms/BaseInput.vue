<template>
  <div class="flex flex-col gap-1.5 w-full">
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
      class="hover:border-red-400 focus:border-red-500"
      @input="handleInput"
    >
      <template #prefix v-if="icon">
        <NavIcon :name="icon" class-name="w-4 h-4 text-gray-400" />
      </template>
    </a-input>

    <span v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import NavIcon from './NavIcon.vue'

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

const handleInput = (e: any) => {
  emit('update:modelValue', e.target.value)
}
</script>

<style scoped>
:deep(.ant-input:focus), 
:deep(.ant-input-focused) {
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1);
}
</style>