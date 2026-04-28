<template>
  <router-link
    v-if="to"
    :to="to"
    class="flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors rounded-md group"
    :class="[
      isActive 
        ? 'bg-red-50 text-red-600' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    ]"
  >
    <NavIcon :name="icon" class-name="w-5 h-5 flex-shrink-0" />
    <span v-if="!collapsed" class="truncate flex-1">{{ title }}</span>
    <NavIcon 
      v-if="!collapsed && hasSubmenu" 
      name="ChevronRightIcon" 
      class-name="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100" 
    />
  </router-link>
  <div
    v-else
    class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition-colors rounded-md group"
  >
    <NavIcon :name="icon" class-name="w-5 h-5 flex-shrink-0" />
    <span v-if="!collapsed" class="truncate flex-1">{{ title }}</span>
    <NavIcon 
      v-if="!collapsed && hasSubmenu" 
      name="ChevronRightIcon" 
      class-name="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100" 
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavIcon from '../atoms/NavIcon.vue'

const props = defineProps<{
  title: string
  icon?: string
  to?: string
  hasSubmenu?: boolean
  collapsed?: boolean
}>()

const route = useRoute()
const isActive = computed(() => props.to && route.path.startsWith(props.to))
</script>
