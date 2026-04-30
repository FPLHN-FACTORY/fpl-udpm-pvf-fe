import type { RouteRecordRaw } from 'vue-router'

export const scoreTypesRoute: RouteRecordRaw = {
  path: 'score-types',
  name: 'extracurricular-score-types',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Quản lý loại điểm', icon: 'BxSpreadsheet' }
}
