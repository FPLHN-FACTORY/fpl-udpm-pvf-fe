import type { RouteRecordRaw } from 'vue-router'

export const candidateRoute: RouteRecordRaw = {
  path: 'candidate-profile',
  name: 'candidate-profile',
  meta: { title: 'Hồ sơ thí sinh', icon: 'BxFile', hasSubmenu: true },
  children: [
    {
      path: 'list',
      name: 'candidate-list',
      component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
      meta: { title: 'Danh sách hồ sơ' }
    },
    {
      path: 'evaluation',
      name: 'candidate-evaluation',
      component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
      meta: { title: 'Đánh giá thí sinh' }
    }
  ]
}
