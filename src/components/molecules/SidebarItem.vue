<template>
  <div class="flex flex-col">
    <!-- Main Item -->
    <div
      @click="toggleExpand"
      class="flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors rounded-md group cursor-pointer"
      :class="[
        isActive && !hasSubmenu
          ? 'bg-red-50 text-red-600' 
          : isSubmenuActive
            ? 'text-red-600'
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
      ]"
    >
      <NavIcon :name="icon" class-name="w-5 h-5 flex-shrink-0" />
      <span v-if="!collapsed" class="truncate flex-1">
        <router-link v-if="to && !hasSubmenu" :to="to" class="block w-full">{{ title }}</router-link>
        <span v-else>{{ title }}</span>
      </span>
      <NavIcon 
        v-if="!collapsed && hasSubmenu" 
        name="BxChevronRight" 
        class-name="w-4 h-4 ml-auto transition-transform duration-200" 
        :class="{ 'rotate-90': expanded }"
      />
    </div>

    <!-- Submenu items -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <div v-if="expanded && hasSubmenu && !collapsed" class="mt-1 ml-6 space-y-1">
        <router-link
          v-for="sub in subItems"
          :key="sub.path"
          :to="to + '/' + sub.path"
          class="flex items-center gap-3 py-1.5 px-4 text-[13px] rounded-md transition-colors"
          :class="[
            currentPath === (to + '/' + sub.path)
              ? 'text-red-600 font-semibold'
              : 'text-gray-500 hover:text-gray-900'
          ]"
        >
          <NavIcon 
            :name="(sub.meta?.icon as string) || 'BxRadioCircle'" 
            class-name="w-4 h-4 flex-shrink-0" 
          />
          <span class="truncate">{{ sub.meta?.title }}</span>
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavIcon from '../atoms/NavIcon.vue'

const props = defineProps<{
  title: string
  icon?: string
  to?: string
  hasSubmenu?: boolean
  subItems?: any[]
  collapsed?: boolean
}>()

const route = useRoute()
const currentPath = computed(() => route.path)
const isActive = computed(() => props.to && route.path === props.to)
const isSubmenuActive = computed(() => props.to && route.path.startsWith(props.to))

const expanded = ref(false)

const toggleExpand = () => {
  if (props.hasSubmenu) {
    expanded.value = !expanded.value
  }
}

// Keep expanded if child is active
watch(() => route.path, (newPath) => {
  if (props.to && newPath.startsWith(props.to)) {
    expanded.value = true
  }
}, { immediate: true })

// Reset expanded if sidebar collapses
watch(() => props.collapsed, (val) => {
  if (val) expanded.value = false
})
</script>
