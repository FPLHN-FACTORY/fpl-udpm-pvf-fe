<template>
  <a-button
    :type="antType"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :html-type="nativeType"
    class="flex items-center justify-center gap-2 font-medium"
    @click="$emit('click')"
  >
    <template #icon v-if="icon">
      <NavIcon :name="icon" class-name="w-4 h-4" />
    </template>
    <slot />
  </a-button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NavIcon from './NavIcon.vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link' | 'default'
  size?: 'small' | 'middle' | 'large'
  loading?: boolean
  disabled?: boolean
  icon?: string
  nativeType?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'middle',
  loading: false,
  disabled: false,
  nativeType: 'button'
})

defineEmits(['click'])

// Map our custom variants to Ant Design types
const antType = computed(() => {
  switch (props.variant) {
    case 'primary': return 'primary'
    case 'danger': return 'primary' // Ant uses danger as a separate prop or specialized primary
    case 'ghost': return 'ghost'
    case 'link': return 'link'
    default: return 'default'
  }
})
</script>

<style scoped>
/* Bạn có thể ghi đè CSS của Ant ở đây nếu cần style cực kỳ đặc thù cho PVF */
.ant-btn-primary {
  background-color: #dc2626; /* Màu đỏ PVF */
  border-color: #dc2626;
}
.ant-btn-primary:hover {
  background-color: #b91c1c !important;
  border-color: #b91c1c !important;
}
</style>