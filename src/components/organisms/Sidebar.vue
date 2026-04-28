<template>
  <aside 
    class="bg-white border-right border-gray-200 h-full flex flex-col transition-all duration-300 relative z-30"
    :class="[collapsed ? 'w-20' : 'w-72']"
  >
    <!-- Logo Section -->
    <BaseLogo :collapsed="collapsed" />

    <!-- Collapse Toggle Button -->
    <button 
      @click="collapsed = !collapsed"
      class="absolute top-6 -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-red-600 shadow-sm hover:bg-gray-50 z-40"
    >
      <NavIcon 
        :name="collapsed ? 'ChevronRightIcon' : 'ChevronLeftIcon'" 
        class-name="w-4 h-4" 
      />
    </button>

    <!-- Search Section -->
    <SidebarSearch v-if="!collapsed" />

    <!-- Navigation Menu -->
    <nav class="flex-1 overflow-y-auto px-2 py-4 space-y-6 custom-scrollbar">
      <!-- Dashboards -->
      <div>
        <SidebarItem 
          title="Dashboards" 
          icon="BxGridAlt" 
          to="/dashboard" 
          :collapsed="collapsed" 
        />
      </div>

      <!-- Recruitment Management -->
      <div class="space-y-1">
        <h3 v-if="!collapsed" class="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Quản lý tuyển sinh
        </h3>
        <SidebarItem 
          v-for="route in recruitmentRoutes" 
          :key="route.name"
          :title="route.meta?.title as string"
          :icon="route.meta?.icon as string"
          :to="route.path"
          :has-submenu="route.meta?.hasSubmenu as boolean"
          :collapsed="collapsed"
        />
      </div>

      <!-- Student Management -->
      <div class="space-y-1">
        <h3 v-if="!collapsed" class="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Quản lý học viên
        </h3>
        <SidebarItem 
          v-for="route in studentRoutes" 
          :key="route.name"
          :title="route.meta?.title as string"
          :icon="route.meta?.icon as string"
          :to="route.path"
          :has-submenu="route.meta?.hasSubmenu as boolean"
          :collapsed="collapsed"
        />
      </div>

      <!-- Extracurricular Management -->
      <div class="space-y-1">
        <h3 v-if="!collapsed" class="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Quản lý học tập ngoại khóa
        </h3>
        <SidebarItem 
          v-for="route in extracurricularRoutes" 
          :key="route.name"
          :title="route.meta?.title as string"
          :icon="route.meta?.icon as string"
          :to="route.path"
          :has-submenu="route.meta?.hasSubmenu as boolean"
          :collapsed="collapsed"
        />
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseLogo from '../atoms/BaseLogo.vue'
import NavIcon from '../atoms/NavIcon.vue'
import SidebarItem from '../molecules/SidebarItem.vue'
import SidebarSearch from '../molecules/SidebarSearch.vue'
import { recruitmentRoutes } from '../../router/routes/recruitment'
import { studentRoutes } from '../../router/routes/student'
import { extracurricularRoutes } from '../../router/routes/extracurricular'

const collapsed = ref(false)
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
