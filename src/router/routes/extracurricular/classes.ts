import type { RouteRecordRaw } from 'vue-router'

export const classesRoute: RouteRecordRaw = {
  path: 'classes',
  name: 'extracurricular-classes',
  meta: { title: 'Lớp học ngoại khóa', icon: 'BxsSchool', hasSubmenu: true },
  children: [
    {
      path: 'list',
      name: 'extracurricular-classes-list',
      component: () => import('../../../components/pages/DashboardPage.vue'),
      meta: { title: 'Danh sách' }
    },
    {
      path: 'attendance',
      name: 'extracurricular-classes-attendance',
      component: () => import('../../../components/pages/DashboardPage.vue'),
      meta: { title: 'Điểm danh' }
    },
    {
      path: 'grades',
      name: 'extracurricular-classes-grades',
      component: () => import('../../../components/pages/DashboardPage.vue'),
      meta: { title: 'Bảng điểm' }
    }
  ]
}
