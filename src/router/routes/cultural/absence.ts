import type { RouteRecordRaw } from 'vue-router'
export const absenceRoute: RouteRecordRaw = {
  path: 'absence',
  name: 'cultural-absence',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Đơn xin phép nghỉ học', icon: 'BxLogInWrapper' }
}
