import type { RouteRecordRaw } from 'vue-router'
export const schoolYearRoute: RouteRecordRaw = {
  path: 'school-year',
  name: 'cultural-year',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Năm học', icon: 'BxSpreadsheet' }
}
