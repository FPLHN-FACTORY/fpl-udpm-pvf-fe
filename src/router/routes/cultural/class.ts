import type { RouteRecordRaw } from 'vue-router'
export const classRoute: RouteRecordRaw = {
  path: 'class',
  name: 'cultural-class',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Lớp học văn hóa', icon: 'BxsSchool' }
}
