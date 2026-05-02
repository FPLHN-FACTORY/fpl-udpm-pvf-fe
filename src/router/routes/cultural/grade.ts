import type { RouteRecordRaw } from 'vue-router'

export const gradeRoute: RouteRecordRaw = {
  path: 'grade',
  name: 'cultural-grade',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Kh\u1ed1i l\u1edbp', icon: 'BxsCategoryAlt' }
}
