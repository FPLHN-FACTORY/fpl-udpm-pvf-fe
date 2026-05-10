import type { RouteRecordRaw } from 'vue-router'
import { levelsRoute, levelsHiddenRoute } from './levels'
import { templatesRoute, templatesHiddenRoute } from './templates'
import { disciplineDecisionRoute, disciplineSubRoutes } from './discipline-decisions'
import { rewardDecisionRoutes } from './reward-decisions'

export const disciplineRoutes: RouteRecordRaw[] = [
  {
    path: '/discipline',
    meta: { title: 'Quản lý kỷ luật - khen thưởng', icon: 'BxInfoCircle', isHeader: true },
    children: [
      levelsRoute,
      templatesRoute,
      disciplineDecisionRoute,
      ...rewardDecisionRoutes
    ]
  },
  ...disciplineSubRoutes.map(route => ({
    ...route,
    path: `/discipline/${route.path}`
  }))
]

export const disciplineHiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/discipline',
    children: [
      templatesHiddenRoute,
      levelsHiddenRoute
    ]
  }
]
