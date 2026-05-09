import type { RouteRecordRaw } from 'vue-router'

export const listRoute: RouteRecordRaw = {
  path: 'list',
  name: 'student-list',
  component: () => import('../../../components/pages/student/StudentListPage.vue'),
  meta: { title: 'Danh sách học viên', icon: 'BxListUl' }
}