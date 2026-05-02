import type { RouteRecordRaw } from 'vue-router'
export const courseEvaluationRoute: RouteRecordRaw = {
  path: 'full-course',
  name: 'evaluation-full-course',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Đánh giá toàn khóa', icon: 'BxsSchool' }
}
