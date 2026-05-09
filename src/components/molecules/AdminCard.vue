<template>
<<<<<<< HEAD
  <div class="bg-white rounded-lg shadow-sm border border-gray-100">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      <div class="flex items-center gap-3">
        <h2 class="text-[16px] font-semibold text-[#566a7f]">{{ title }}</h2>
        <div v-if="badge" class="flex items-center gap-2">
          <span class="bg-[#696cff] text-white px-3 py-1 rounded-md text-[13px] font-medium">
            {{ badge }}
          </span>
          <NavIcon name="BxInfoCircle" size="16" class="text-orange-500" />
        </div>
      </div>
      <div class="flex items-center gap-2">
=======
  <section
    class="bg-white shadow-sm border border-gray-100 overflow-hidden"
    :class="[padded ? 'rounded-xl p-8' : 'rounded-xl']"
  >
    <header
      v-if="title || $slots.actions"
      class="flex items-center justify-between gap-4 border-gray-100"
      :class="padded ? 'mb-8' : 'border-b p-4'"
    >
      <h1 :class="titleClass">{{ title }}</h1>
      <div v-if="$slots.actions" class="flex items-center gap-2">
>>>>>>> e0d8881dc330515d3cd946714453e1d0a3cc6f4d
        <slot name="actions" />
      </div>
    </div>
    
    <!-- Content -->
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavIcon from '../atoms/icons/NavIcon.vue'

defineProps<{
  title: string
  badge?: string
}>()
</script>