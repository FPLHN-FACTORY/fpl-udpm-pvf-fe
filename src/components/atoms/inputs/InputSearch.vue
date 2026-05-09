<template>
  <a-input
    :value="modelValue"
    :placeholder="placeholder"
    class="!inline-flex !h-[38px] !items-center !border-[#d9dee3] rounded-md transition-all focus:!border-[#696cff] hover:!border-[#696cff]"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
    <template #prefix>
      <NavIcon name="BxSearch" size="20" class-name="text-gray-400" />
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
:deep(.ant-input-affix-wrapper) {
  display: inline-flex !important;
  align-items: center !important;
}

:deep(.ant-input-prefix) {
  margin-right: 8px;
}
</style>
