import type { RouteRecordRaw } from 'vue-router'
import { levelsRoute } from './levels'
import { templatesRoute } from './templates'
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
