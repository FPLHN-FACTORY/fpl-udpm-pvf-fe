<template>
  <div class="flex items-center justify-center p-6 border-b border-gray-100">
    <div class="flex-shrink-0 transition-all duration-300" :class="[collapsed ? 'scale-75' : 'scale-100']">
      <img 
        src="/src/assets/login.png" 
        alt="PVF Logo" 
        class="w-auto object-contain transition-all duration-300" 
        :class="[collapsed ? 'h-8' : 'h-20']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  collapsed?: boolean
}>()
</script>
