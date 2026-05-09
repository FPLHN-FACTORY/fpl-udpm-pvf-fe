import type { RouteRecordRaw } from 'vue-router'
export const rewardDecisionRoutes: RouteRecordRaw[] = [
  {
    path: 'reward-decisions',
    name: 'reward-decisions',
    component: () => import('../../../components/pages/discipline/RewardDecisionsPage.vue'),
    meta: { title: 'Quyết định khen thưởng', icon: 'BxsUserBadge' }
  },
  {
    path: 'reward-decisions/create',
    name: 'reward-decisions-create',
    component: () => import('../../../components/pages/discipline/RewardDecisionCreatePage.vue'),
    meta: { title: 'Thêm mới Quyết định khen thưởng' }
  },
  {
    path: 'reward-decisions/edit/:id',
    name: 'reward-decisions-edit',
    component: () => import('../../../components/pages/discipline/RewardDecisionEditPage.vue'),
    meta: { title: 'Chỉnh sửa Quyết định khen thưởng' }
  },
  {
    path: 'reward-decisions/detail/:id',
    name: 'reward-decisions-detail',
    component: () => import('../../../components/pages/discipline/RewardDecisionDetailPage.vue'),
    meta: { title: 'Chi tiết Quyết định khen thưởng' }
  }
]
