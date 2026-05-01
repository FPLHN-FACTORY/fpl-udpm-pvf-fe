<template>
  <section class="min-h-screen w-full bg-[#f5f5f9] p-6">
    <div class="flex min-h-full flex-col gap-6">
      <AppBreadcrumbs :items="breadcrumbs" />
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
