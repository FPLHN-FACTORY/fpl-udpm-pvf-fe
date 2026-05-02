import type { RouteRecordRaw } from 'vue-router'

export const stageRoute: RouteRecordRaw = {
  path: 'stages',
  name: 'evaluation-stages',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Giai đoạn đánh giá', icon: 'BxGridAlt' }
}
