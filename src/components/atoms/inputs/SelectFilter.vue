<template>
  <a-select
    :value="value"
    :placeholder="placeholder"
    class="custom-filter-select"
    :allow-clear="allowClear"
    @change="$emit('update:value', $event)"
  >
    <slot />
  </a-select>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  value: any
  placeholder?: string
  allowClear?: boolean
}>(), {
  allowClear: true
})

defineEmits(['update:value'])
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 38px !important;
  display: flex !important;
  align-items: center !important;
  border-color: #d9dee3 !important;
  border-radius: 6px !important;
}
:deep(.ant-select-selection-placeholder) {
  line-height: 38px !important;
  color: #b4bdc6 !important;
}
</style>
