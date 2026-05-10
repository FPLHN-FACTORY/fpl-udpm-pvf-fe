<template>
  <div class="relative w-full">
    <label 
      v-if="label" 
      class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-10 font-medium"
    >
      {{ label }}
    </label>
    
    <a-input-password
      v-if="type === 'password'"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="!h-[42px] !border-[#d9dee3] rounded-md focus:!border-[#696cff] hover:!border-[#696cff] transition-all text-[#566a7f]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
      <template v-if="prefixIcon" #prefix>
        <NavIcon :name="prefixIcon" size="18" class="text-gray-400 mr-1" />
      </template>
    </a-input-password>
    
    <a-input
      v-else
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      class="!h-[42px] !border-[#d9dee3] rounded-md focus:!border-[#696cff] hover:!border-[#696cff] transition-all text-[#566a7f]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
      <template v-if="prefixIcon" #prefix>
        <NavIcon :name="prefixIcon" size="18" class="text-gray-400 mr-1" />
      </template>
    </a-input>
  </div>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'

withDefaults(defineProps<{
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  prefixIcon?: string
}>(), {
  type: 'text',
  disabled: false
})

defineEmits(['update:modelValue'])
</script>
