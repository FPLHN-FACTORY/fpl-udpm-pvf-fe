import type { RouteRecordRaw } from 'vue-router'

export const transferRoute: RouteRecordRaw = {
  path: 'transfer-request',
  name: 'student-transfer',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Đơn xin chuyển trường', icon: 'BxLogInWrapper' }
}
