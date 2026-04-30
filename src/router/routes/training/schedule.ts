import type { RouteRecordRaw } from 'vue-router'
export const scheduleRoute: RouteRecordRaw = {
  path: 'schedule',
  name: 'training-schedule',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Lịch học', icon: 'BxSpreadsheet' }
}
