import type { RouteRecordRaw } from 'vue-router'
export const gradeRoute: RouteRecordRaw = {
  path: 'grade',
  name: 'cultural-grade',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Khối lớp', icon: 'BxsCategoryAlt' }
}
