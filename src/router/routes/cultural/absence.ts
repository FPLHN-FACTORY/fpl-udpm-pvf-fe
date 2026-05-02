import type { RouteRecordRaw } from 'vue-router'

export const absenceRoute: RouteRecordRaw = {
  path: 'absence',
  name: 'cultural-absence',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: '\u0110\u01a1n xin ph\u00e9p ngh\u1ec9 h\u1ecdc', icon: 'BxLogInWrapper' }
}
