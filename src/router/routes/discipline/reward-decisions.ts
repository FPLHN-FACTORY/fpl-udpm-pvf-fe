import type { RouteRecordRaw } from 'vue-router'
export const rewardDecisionRoute: RouteRecordRaw = {
  path: 'reward-decisions',
  name: 'reward-decisions',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Quyết định khen thưởng', icon: 'BxsUserBadge' }
}
