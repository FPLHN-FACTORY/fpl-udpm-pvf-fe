import type { RouteRecordRaw } from 'vue-router'

export const criteriaRoute: RouteRecordRaw = {
  path: 'criteria',
  name: 'evaluation-criteria-list',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Tiêu chí đánh giá', icon: 'BxSpreadsheet' }
}
