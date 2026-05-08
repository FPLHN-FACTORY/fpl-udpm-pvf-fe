<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center gap-2 text-xs text-[#b4bdc6]">
      <span v-for="(item, index) in breadcrumbs" :key="`${item}-${index}`" class="flex items-center gap-2">
        <span :class="index === breadcrumbs.length - 1 ? 'text-[#697a8d]' : ''">{{ item }}</span>
        <span v-if="index < breadcrumbs.length - 1">/</span>
      </span>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import '../ky-tuyen-sinh.css'

defineProps<{
  breadcrumbs: string[]
}>()
</script>
