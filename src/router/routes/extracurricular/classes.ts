import type { RouteRecordRaw } from 'vue-router'
export const classesRoute: RouteRecordRaw = {
  path: 'classes',
  name: 'extracurricular-classes',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Lớp học ngoại khóa', icon: 'BxsSchool', hasSubmenu: true }
}
