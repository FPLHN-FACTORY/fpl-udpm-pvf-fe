<template>
  <div class="overflow-hidden rounded-lg border border-gray-100">
    <div
      v-for="(item, index) in items"
      :key="`${item.label}-${index}`"
      class="flex min-h-[50px] border-b border-gray-100 last:border-0"
    >
      <div class="flex w-1/3 items-center border-r border-gray-100 bg-[#fcfcfd] p-4 text-[13px] font-bold text-[#566a7f]">
        {{ item.label }}
      </div>
      <div class="flex w-2/3 items-center p-4 text-[13px] text-[#697a8d]">
        <slot :name="`value-${item.key}`" :item="item">
          {{ item.value }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface DetailItem {
  key?: string
  label: string
  value?: string | number
}

defineProps<{
  items: DetailItem[]
}>()
</script>
