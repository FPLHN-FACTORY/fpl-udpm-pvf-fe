import type { RouteRecordRaw } from 'vue-router'

export const candidateRoute: RouteRecordRaw = {
  path: 'candidate-profile',
  name: 'candidate-profile',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Hồ sơ thí sinh', icon: 'BxFile', hasSubmenu: true }
}
