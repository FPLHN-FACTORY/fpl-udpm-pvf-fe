import type { RouteRecordRaw } from 'vue-router'

export const extracurricularRoutes: RouteRecordRaw[] = [
  {
    path: '/extracurricular/subjects',
    name: 'extracurricular-subjects',
    component: () => import('../../components/pages/DashboardPage.vue'),
    meta: { title: 'Extracurricular Subjects', icon: 'BxBookAlt' }
  },
  {
    path: '/extracurricular/rooms',
    name: 'extracurricular-rooms',
    component: () => import('../../components/pages/DashboardPage.vue'),
    meta: { title: 'Extracurricular Rooms', icon: 'BxlZoom' }
  },
  {
    path: '/extracurricular/teachers',
    name: 'extracurricular-teachers',
    component: () => import('../../components/pages/DashboardPage.vue'),
    meta: { title: 'Responsible Teachers', icon: 'BxsUserBadge' }
  },
  {
    path: '/extracurricular/classes',
    name: 'extracurricular-classes',
    component: () => import('../../components/pages/DashboardPage.vue'),
    meta: { title: 'Extracurricular Classes', icon: 'BxsSchool', hasSubmenu: true }
  }
]
