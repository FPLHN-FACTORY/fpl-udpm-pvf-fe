import type { RouteRecordRaw } from 'vue-router'
export const scoresRoute: RouteRecordRaw = {
  path: 'scores',
  name: 'training-scores',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Điểm số', icon: 'BxFile' }
}
