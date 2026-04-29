import type { RouteRecordRaw } from 'vue-router'

export const evaluationRoute: RouteRecordRaw = {
  path: 'evaluation-criteria',
  name: 'evaluation-criteria',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Tiêu chí/Trọng số đánh giá', icon: 'BxSpreadsheet', hasSubmenu: true }
}
