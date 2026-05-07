import type { RouteRecordRaw } from 'vue-router'
export const contractVersionRoute: RouteRecordRaw = {
  path: 'contract-version',
  name: 'contract-version',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Phiên bản hợp đồng', icon: 'BxServer' }
}
