import type { RouteRecordRaw } from 'vue-router'
export const settingsRoute: RouteRecordRaw = {
  path: 'settings',
  name: 'system-settings',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Cấu hình hệ thống', icon: 'BxExtensionWrapper' }
}
