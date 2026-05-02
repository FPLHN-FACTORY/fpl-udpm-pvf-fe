<template>
  <div class="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-white border-b border-gray-100">
    <div class="flex flex-wrap items-center gap-2">
      <slot />
    </div>
    <div class="flex items-center gap-3">
      <ButtonSearch @click="$emit('search')" />
      <ButtonReset @click="$emit('reset')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonSearch from '../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../atoms/buttons/ButtonReset.vue'

defineEmits(['search', 'reset'])
</script>
