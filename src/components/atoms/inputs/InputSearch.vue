<template>
  <a-input
    :value="modelValue"
    :placeholder="placeholder"
    class="!h-[38px] !border-[#d9dee3] rounded-md focus:!border-[#696cff] hover:!border-[#696cff] transition-all"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
    <template #prefix>
      <NavIcon name="BxSearch" size="18" class="text-gray-400" />
    </template>
  </a-input>
</template>

<script setup lang="ts">
import NavIcon from '../icons/NavIcon.vue'

defineProps<{
  modelValue: string
  placeholder?: string
}>()

defineEmits(['update:modelValue'])
</script>

<style scoped>
:deep(.ant-input-prefix) {
  margin-right: 8px;
}
</style>
