import type { RouteRecordRaw } from 'vue-router'

export const centerRoute: RouteRecordRaw = {
  path: 'affiliated-center',
  name: 'affiliated-center',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Trung tâm liên kết', icon: 'BxBuildingHouse' }
}
