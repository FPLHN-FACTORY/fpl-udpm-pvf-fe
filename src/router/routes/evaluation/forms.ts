import type { RouteRecordRaw } from 'vue-router'
export const formRoute: RouteRecordRaw = {
  path: 'forms',
  name: 'evaluation-forms',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Form đánh giá', icon: 'BxFile' }
}
