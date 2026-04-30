<template>
  <a-checkbox
    :checked="modelValue"
    :disabled="disabled"
    class="base-checkbox"
    @change="$emit('update:modelValue', ($event.target as any).checked)"
  >
    <slot />
  </a-checkbox>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<style scoped>
:deep(.ant-checkbox-checked .ant-checkbox-inner) {
  background-color: #dc2626; /* Màu đỏ PVF */
  border-color: #dc2626;
}
:deep(.ant-checkbox-wrapper:hover .ant-checkbox-inner),
:deep(.ant-checkbox-input:focus + .ant-checkbox-inner) {
  border-color: #dc2626;
}
</style>