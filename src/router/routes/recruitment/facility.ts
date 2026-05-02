import type { RouteRecordRaw } from 'vue-router'

export const facilityRoute: RouteRecordRaw = {
  path: 'facility-info',
  name: 'facility-info',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Thông tin cơ sở', icon: 'BxInfoCircle' }
}
