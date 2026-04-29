import type { RouteRecordRaw } from 'vue-router'
export const withdrawalRoute: RouteRecordRaw = {
  path: 'withdrawal',
  name: 'expenses-withdrawal',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Yêu cầu rút sinh hoạt phí', icon: 'BxsContact' }
}
