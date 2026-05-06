import type { RouteRecordRaw } from 'vue-router'
import { facilityRoute } from './facility'
import { centerRoute } from './center'
import { admissionRoute } from './admission'
import { evaluationHiddenRoute, evaluationRoute } from './evaluation'
import { candidateHiddenRoutes, candidateRoute } from './candidate'

export const recruitmentRoutes: RouteRecordRaw[] = [
  {
    path: '/recruitment',
    meta: { title: 'Quản lý tuyển sinh', icon: 'BxInfoCircle', isHeader: true },
    children: [
      facilityRoute,
      ...centerRoute,
      admissionRoute,
      evaluationRoute,
      candidateRoute,
      ...candidateHiddenRoutes,
    ]
  }
]

export const recruitmentHiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/recruitment',
    children: [evaluationHiddenRoute]
  }
]
