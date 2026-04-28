import type { RouteRecordRaw } from 'vue-router'

export const studentRoutes: RouteRecordRaw[] = [
  {
    path: '/student/equipment',
    name: 'student-equipment',
    component: () => import('../../components/pages/DashboardPage.vue'),
    meta: { title: 'Dụng cụ', icon: 'BxsCategoryAlt' }
  },
  {
    path: '/student/contract-type',
    name: 'contract-type',
    component: () => import('../../components/pages/DashboardPage.vue'),
    meta: { title: 'Loại hợp đồng', icon: 'BxsContact' }
  },
  {
    path: '/student/contract-version',
    name: 'contract-version',
    component: () => import('../../components/pages/DashboardPage.vue'),
    meta: { title: 'Phiên bản hợp đồng', icon: 'BxServer' }
  },
  {
    path: '/student/signed-contract',
    name: 'signed-contract',
    component: () => import('../../components/pages/DashboardPage.vue'),
    meta: { title: 'Hợp đồng đã ký', icon: 'BxsPen' }
  },
  {
    path: '/student/info',
    name: 'student-info',
    component: () => import('../../components/pages/DashboardPage.vue'),
    meta: { title: 'Thông tin học viên', icon: 'BxsUserDetail' }
  }
]
