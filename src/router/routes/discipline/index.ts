import type { RouteRecordRaw } from 'vue-router'
import { levelsRoute, levelsHiddenRoute } from './levels'
import { templatesHiddenRoute, templatesRoute } from './templates'
import { disciplineDecisionRoute } from './discipline-decisions'
import { rewardDecisionRoute } from './reward-decisions'

export const disciplineRoutes: RouteRecordRaw[] = [
  {
    path: '/discipline',
    meta: { title: 'Quản lý kỷ luật - khen thưởng', icon: 'BxInfoCircle', isHeader: true },
    children: [
      levelsRoute,
      templatesRoute,
      disciplineDecisionRoute,
      rewardDecisionRoute
    ]
  }
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
