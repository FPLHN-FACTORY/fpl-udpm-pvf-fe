import type { RouteRecordRaw } from 'vue-router'
<<<<<<< HEAD
import { levelsRoute } from './levels'
import { templatesRoute } from './templates'
import { disciplineDecisionRoute } from './discipline-decisions'
import { rewardDecisionRoutes } from './reward-decisions'
=======
import { levelsRoute, levelsHiddenRoute } from './levels'
import { disciplineDecisionRoute, disciplineSubRoutes } from './discipline-decisions' 
import { templatesHiddenRoute, templatesRoute } from './templates'
import { rewardDecisionRoute } from './reward-decisions'
>>>>>>> e0d8881dc330515d3cd946714453e1d0a3cc6f4d

export const disciplineRoutes: RouteRecordRaw[] = [
  {
    path: '/discipline',
    meta: { title: 'Quản lý kỷ luật - khen thưởng', icon: 'BxInfoCircle', isHeader: true },
    children: [
<<<<<<< HEAD
      levelsRoute,
      templatesRoute,
      disciplineDecisionRoute,
      ...rewardDecisionRoutes
=======
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
    children: [
      templatesHiddenRoute,
      levelsHiddenRoute
>>>>>>> e0d8881dc330515d3cd946714453e1d0a3cc6f4d
    ]
  }
]
