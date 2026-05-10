import type { RouteRecordRaw } from 'vue-router'

import { 
  criteriaRoute,
  criteriaCreateRoute,
  criteriaDeletedRoute,
  criteriaDetailRoute,
  criteriaEditRoute
} from './criteria'
import { formRoutes } from './forms'
import { stageRoute, stageCreateRoute, stageDetailRoute, stageEditRoute, stageDeletedRoute } from './stages'
import {
  studentEvaluationCreateRoute,
  studentEvaluationDeletedRoute,
  studentEvaluationEditRoute,
  studentEvaluationDetailRoute,
  studentEvaluationRoute
} from './student'

const evaluationVisibleChildren: RouteRecordRaw[] = [
  criteriaRoute,
  ...formRoutes,
  stageRoute,
  studentEvaluationRoute
  // courseEvaluationRoute[0] // TODO: Fix this route
]

const evaluationHiddenChildren: RouteRecordRaw[] = [
  criteriaCreateRoute,
  criteriaDeletedRoute,
  criteriaDetailRoute,
  criteriaEditRoute,
  stageCreateRoute,
  stageDetailRoute,
  stageEditRoute,
  stageDeletedRoute,
  studentEvaluationCreateRoute,
  studentEvaluationDeletedRoute,
  studentEvaluationEditRoute,
  studentEvaluationDetailRoute
]

export const evaluationRoutes: RouteRecordRaw[] = [
  {
    path: '/evaluation',
    meta: { title: 'Quản lý đánh giá học viên', icon: 'BxSpreadsheet', isHeader: true },
    children: evaluationVisibleChildren
  }
]

export const evaluationHiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/evaluation',
    children: evaluationHiddenChildren
  }
]
