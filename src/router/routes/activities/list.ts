import type { RouteRecordRaw } from 'vue-router'
export const activityRoute: RouteRecordRaw = {
  path: 'list',
  name: 'activities-list',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Hoạt động ngoại khóa', icon: 'BxlZoom' }
}
