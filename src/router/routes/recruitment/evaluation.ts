import type { RouteRecordRaw } from 'vue-router'

export const evaluationRoute: RouteRecordRaw = {
  path: 'evaluation-criteria',
  name: 'evaluation-criteria',
  meta: { title: 'Tiêu chí/Trọng số đánh giá', icon: 'BxSpreadsheet', hasSubmenu: true },
  children: [
    {
      path: 'master-criteria',
      name: 'master-criteria',
      component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
      meta: { title: 'Bộ tiêu chí gốc' }
    }
  ]
}
