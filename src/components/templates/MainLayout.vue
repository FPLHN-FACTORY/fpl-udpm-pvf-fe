<template>
  <div class="flex h-screen bg-[#f5f5f9] overflow-hidden">
    <!-- Sidebar Organism -->
    <Sidebar v-if="!hideMenu" />

    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Header Organism -->
      <AppHeader v-if="!hideMenu" />

      <!-- Main Content template area -->
      <main :class="['flex-1 overflow-y-auto p-6 bg-[#f5f5f9]', hideMenu ? 'w-full h-screen' : '']">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <!-- Footer Organism -->
      <AppFooter v-if="!hideMenu" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '../organisms/Sidebar.vue'
import AppHeader from '../organisms/AppHeader.vue'
import AppFooter from '../organisms/AppFooter.vue'

const route = useRoute()
const hideMenu = computed(() => route.meta.hideMenu === true)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
