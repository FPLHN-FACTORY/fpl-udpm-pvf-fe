import type { RouteRecordRaw } from 'vue-router'
import { levelsRoute } from './levels'
import { disciplineDecisionRoute, disciplineSubRoutes } from './discipline-decisions' 
import { templatesHiddenRoute, templatesRoute } from './templates'
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
  },
  ...disciplineSubRoutes.map(route => ({
    ...route,
    path: `/discipline/${route.path}`
  }))
]
  

export const disciplineHiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/discipline',
    children: [templatesHiddenRoute]
  }
]
