import type { RouteRecordRaw } from 'vue-router'

export const admissionRoute: RouteRecordRaw = {
  path: 'admission',
  name: 'admission',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Tuyển sinh', icon: 'BxsUserDetail', hasSubmenu: true }
}
