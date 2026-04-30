import type { RouteRecordRaw } from 'vue-router'
export const levelsRoute: RouteRecordRaw = {
  path: 'levels',
  name: 'discipline-levels',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Mức độ khen thưởng/kỷ luật', icon: 'BxInfoCircle' }
}
