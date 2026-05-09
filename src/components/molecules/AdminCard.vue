<template>
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