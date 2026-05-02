<template>
  <div class="relative w-full">
    <label 
      v-if="label" 
      class="absolute -top-2 left-3 bg-white px-1 text-[12px] text-gray-400 z-10 font-medium"
    >
      {{ label }}
    </label>
    <a-select
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full custom-select"
      :allow-clear="allowClear"
      @change="$emit('update:value', $event)"
    >
      <slot />
    </a-select>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  value: any
  label?: string
  placeholder?: string
  disabled?: boolean
  allowClear?: boolean
}>(), {
  disabled: false,
  allowClear: true
})

defineEmits(['update:value'])
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 42px !important;
  display: flex !important;
  align-items: center !important;
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
  color: #566a7f !important;
}

:deep(.ant-select-selection-placeholder) {
  color: #b4bdc6 !important;
}

:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
  border-color: #696cff !important;
}

:deep(.ant-select-focused .ant-select-selector) {
  border-color: #696cff !important;
  box-shadow: 0 0 0 2px rgba(105, 108, 255, 0.2) !important;
}
</style>
