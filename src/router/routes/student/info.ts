import type { RouteRecordRaw } from 'vue-router'
export const infoRoute: RouteRecordRaw = {
  path: 'info',
  name: 'student-info',
  component: () => import('../../../components/pages/student/StudentInfoPage.vue'),
  meta: { title: 'Thông tin học viên', icon: 'BxsUserDetail' }
}
