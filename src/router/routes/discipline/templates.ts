import type { RouteRecordRaw } from 'vue-router'
export const templatesRoute: RouteRecordRaw = {
  path: 'templates',
  name: 'discipline-templates',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Mẫu biên bản', icon: 'BxFile' }
}
