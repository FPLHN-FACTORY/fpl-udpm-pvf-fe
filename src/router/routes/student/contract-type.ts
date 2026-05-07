import type { RouteRecordRaw } from 'vue-router'
export const contractTypeRoute: RouteRecordRaw = {
  path: 'contract-type',
  name: 'contract-type',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Loại hợp đồng', icon: 'BxsContact' }
}
