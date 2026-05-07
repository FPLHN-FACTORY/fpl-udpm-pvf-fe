import type { RouteRecordRaw } from 'vue-router'
export const programRoute: RouteRecordRaw = {
  path: 'program',
  name: 'training-program',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Chương trình đào tạo', icon: 'BxBookAlt' }
}
