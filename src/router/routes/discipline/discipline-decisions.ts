import type { RouteRecordRaw } from 'vue-router'
export const disciplineDecisionRoute: RouteRecordRaw = {
  path: 'discipline-decisions',
  name: 'discipline-decisions',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Quyết định kỷ luật', icon: 'BxsPen' }
}
