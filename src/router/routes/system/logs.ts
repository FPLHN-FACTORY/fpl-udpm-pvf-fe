import type { RouteRecordRaw } from 'vue-router'
export const logsRoute: RouteRecordRaw = {
  path: 'logs',
  name: 'system-logs',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Logs hệ thống', icon: 'BxFile' }
}
