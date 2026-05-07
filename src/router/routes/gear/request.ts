import type { RouteRecordRaw } from 'vue-router'
export const requestRoute: RouteRecordRaw = {
  path: 'request',
  name: 'gear-request',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Yêu cầu cấp phát', icon: 'BxsCategoryAlt' }
}
