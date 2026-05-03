<template>
  <div class="flex items-center gap-3">
    <img v-if="avatar" :src="avatar" class="h-8 w-8 rounded-full object-cover" />
    <div v-else class="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
      <NavIcon name="BxUser" class-name="w-4 h-4 text-gray-400" />
    </div>
    <div class="flex flex-col">
      <span class="text-[13px] font-bold leading-tight text-[#566a7f]">{{ name }}</span>
      <span v-if="email" class="text-[11px] text-gray-400">{{ email }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavIcon from '../atoms/icons/NavIcon.vue'

defineProps<{
  name: string
  avatar?: string
  email?: string
}>()
</script>
