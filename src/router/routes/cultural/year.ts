import type { RouteRecordRaw } from 'vue-router'

export const schoolYearRoute: RouteRecordRaw = {
  path: 'school-year',
  name: 'cultural-year',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'N\u0103m h\u1ecdc', icon: 'BxSpreadsheet' }
}
