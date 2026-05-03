<template>
  <div class="relative w-full">
    <label 
      v-if="label" 
      class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-10 font-medium"
    >
      {{ label }}
    </label>
    <a-textarea
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      class="!border-[#d9dee3] rounded-md focus:!border-[#696cff] hover:!border-[#696cff] transition-all text-[#566a7f] !p-3"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  rows?: number
  disabled?: boolean
}>(), {
  rows: 4,
  disabled: false
})

defineEmits(['update:modelValue'])
</script>
