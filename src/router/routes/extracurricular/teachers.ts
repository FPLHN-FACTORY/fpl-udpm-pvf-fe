import type { RouteRecordRaw } from 'vue-router'
export const teachersRoute: RouteRecordRaw = {
  path: 'teachers',
  name: 'extracurricular-teachers',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Giáo viên phụ trách', icon: 'BxsUserBadge' }
}
