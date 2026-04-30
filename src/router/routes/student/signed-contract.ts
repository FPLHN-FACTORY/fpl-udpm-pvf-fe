import type { RouteRecordRaw } from 'vue-router'
export const signedContractRoute: RouteRecordRaw = {
  path: 'signed-contract',
  name: 'signed-contract',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Hợp đồng đã ký', icon: 'BxsPen' }
}
