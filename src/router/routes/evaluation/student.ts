import type { RouteRecordRaw } from 'vue-router'
export const studentEvaluationRoute: RouteRecordRaw = {
  path: 'student',
  name: 'evaluation-student',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Đánh giá học viên', icon: 'BxsUserDetail' }
}
