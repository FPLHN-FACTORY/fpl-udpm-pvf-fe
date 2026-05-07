import type { RouteRecordRaw } from 'vue-router'
export const equipmentRoute: RouteRecordRaw = {
  path: 'equipment',
  name: 'student-equipment',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Dụng cụ', icon: 'BxsCategoryAlt' }
}
