import type { RouteRecordRaw } from 'vue-router'

export const recruitmentRoutes: RouteRecordRaw[] = [
  {
    path: '/recruitment/facility-info',
    name: 'facility-info',
    component: () => import('../../components/pages/DashboardPage.vue'), // Placeholder
    meta: { title: 'Thông tin cơ sở', icon: 'BxInfoCircle' }
  },
  {
    path: '/recruitment/affiliated-center',
    name: 'affiliated-center',
    component: () => import('../../components/pages/DashboardPage.vue'), // Placeholder
    meta: { title: 'Trung tâm liên kết', icon: 'BxBuildingHouse' }
  },
  {
    path: '/recruitment/admission',
    name: 'admission',
    component: () => import('../../components/pages/DashboardPage.vue'), // Placeholder
    meta: { title: 'Tuyển sinh', icon: 'BxsUserDetail', hasSubmenu: true }
  },
  {
    path: '/recruitment/evaluation-criteria',
    name: 'evaluation-criteria',
    component: () => import('../../components/pages/DashboardPage.vue'), // Placeholder
    meta: { title: 'Tiêu chí/Trọng số đánh giá', icon: 'BxSpreadsheet', hasSubmenu: true }
  },
  {
    path: '/recruitment/candidate-profile',
    name: 'candidate-profile',
    component: () => import('../../components/pages/DashboardPage.vue'), // Placeholder
    meta: { title: 'Hồ sơ thí sinh', icon: 'BxFile', hasSubmenu: true }
  }
]
