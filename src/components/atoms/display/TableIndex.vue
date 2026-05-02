<template>
  <span class="text-blue-500 font-medium">{{ index }}</span>
</template>

<script setup lang="ts">
defineProps<{
  index: number | string
}>()
</script>
