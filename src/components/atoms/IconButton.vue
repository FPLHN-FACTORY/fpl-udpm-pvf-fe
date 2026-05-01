<template>
  <button
    type="button"
    class="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#a1acb8] transition-colors hover:bg-gray-50"
    :class="danger ? 'hover:text-red-500' : 'hover:text-[#566a7f]'"
    :aria-label="label"
    @click="$emit('click')"
  >
    <NavIcon :name="icon" class-name="w-[18px] h-[18px]" />
  </button>
</template>

<script setup lang="ts">
import NavIcon from './NavIcon.vue'

defineProps<{
  icon: string
  label: string
  danger?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>
