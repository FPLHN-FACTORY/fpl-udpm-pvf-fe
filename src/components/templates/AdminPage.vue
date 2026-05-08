<template>
  <section class="min-h-screen w-full bg-[#f5f5f9] px-4 py-0">
    <div class="flex min-h-full flex-col gap-1">
      <div class="py-2">
        <AppBreadcrumbs :items="breadcrumbs" />
      </div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import AppBreadcrumbs, { type BreadcrumbItem } from '../molecules/AppBreadcrumbs.vue'

defineProps<{
  breadcrumbs?: BreadcrumbItem[]
}>()
</script>
