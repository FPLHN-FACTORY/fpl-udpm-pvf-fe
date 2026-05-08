<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
    <article
      v-for="item in items"
      :key="item.label"
      class="kyts-surface rounded-2xl bg-white p-5"
    >
      <div class="flex items-start justify-between gap-4">
        <div class="space-y-2">
          <p class="text-xs font-medium text-[#a1acb8]">{{ item.label }}</p>
          <div class="flex items-end gap-2">
            <span class="text-2xl font-bold text-[#566a7f]">{{ item.value }}</span>
            <span v-if="item.change" class="text-xs font-semibold text-[#71dd37]">{{ item.change }}</span>
          </div>
        </div>

        <span
          :class="[item.iconBackground, item.iconColor]"
          class="flex h-10 w-10 items-center justify-center rounded-xl"
        >
          <NavIcon :name="item.icon" class-name="h-5 w-5" :size="20" />
        </span>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import type { MetricCardItem } from '../../../../types'

defineProps<{
  items: MetricCardItem[]
}>()
</script>
