<template>
  <header class="z-20 px-6 pt-4 pb-2 bg-[#f5f5f9]">
    <div class="bg-white shadow-sm h-16 flex items-center justify-between px-8 border-b border-gray-100">
      <div class="flex items-center h-full">
        <AppTitle />
      </div>

      <div class="flex items-center h-full">
        <HeaderActions />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppTitle from '../atoms/display/AppTitle.vue'
import HeaderActions from '../molecules/HeaderActions.vue'
</script>
