<template>
  <aside 
    class="bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300 relative z-30"
    :class="[collapsed ? 'w-20' : 'w-72']"
  >
    <!-- Logo Section -->
    <BaseLogo :collapsed="collapsed" />

    <!-- Collapse Toggle Button -->
    <button 
      @click="collapsed = !collapsed"
      class="absolute top-10 -right-[13px] w-[26px] h-[26px] bg-[#ff3e1d] rounded-full flex items-center justify-center text-white shadow-md hover:bg-[#e6381a] z-40 border-[3px] border-white transition-all"
    >
      <NavIcon 
        :name="collapsed ? 'BxChevronRight' : 'BxChevronLeft'"
        class-name="w-3.5 h-3.5" 
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

      <!-- Modular Sections -->
      <div v-for="module in menuModules" :key="module[0].path" class="space-y-1">
        <h3 v-if="!collapsed" class="px-4 text-[10px] font-bold text-[#b4bdc6] uppercase tracking-wider mb-2 mt-4">
          {{ module[0].meta?.title }}
        </h3>
        <SidebarItem 
          v-for="subRoute in (module[0].children || []).filter(r => !r.meta?.hidden)" 
          :key="subRoute.name"
          :title="subRoute.meta?.title as string"
          :icon="subRoute.meta?.icon as string"
          :to="module[0].path + (subRoute.path ? '/' + subRoute.path : '')"
          :has-submenu="!!subRoute.children"
          :sub-items="(subRoute.children || []).filter(r => !r.meta?.hidden)"
          :collapsed="collapsed"
        />
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseLogo from '../atoms/BaseLogo.vue'
import NavIcon from '../atoms/NavIcon.vue'
import SidebarItem from '../molecules/SidebarItem.vue'
import SidebarSearch from '../molecules/SidebarSearch.vue'
import { recruitmentRoutes } from '../../router/routes/recruitment/index'
import { studentRoutes } from '../../router/routes/student/index'
import { culturalRoutes } from '../../router/routes/cultural/index'
import { extracurricularRoutes } from '../../router/routes/extracurricular/index'
import { trainingRoutes } from '../../router/routes/training/index'
import { expensesRoutes } from '../../router/routes/expenses/index'
import { activitiesRoutes } from '../../router/routes/activities/index'
import { gearRoutes } from '../../router/routes/gear/index'
import { disciplineRoutes } from '../../router/routes/discipline/index'
import { evaluationRoutes } from '../../router/routes/evaluation/index'
import { systemRoutes } from '../../router/routes/system/index'

const collapsed = ref(false)

const menuModules = computed(() => [
  recruitmentRoutes,
  studentRoutes,
  culturalRoutes,
  extracurricularRoutes,
  trainingRoutes,
  expensesRoutes,
  activitiesRoutes,
  gearRoutes,
  disciplineRoutes,
  evaluationRoutes,
  systemRoutes
])
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
