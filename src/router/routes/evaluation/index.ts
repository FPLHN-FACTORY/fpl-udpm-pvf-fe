import type { RouteRecordRaw } from 'vue-router'

import { 
  criteriaRoute,
  criteriaCreateRoute,
  criteriaDeletedRoute,
  criteriaDetailRoute,
  criteriaEditRoute
} from './criteria'
import { formRoutes } from './forms'
import { 
  stageRoute,
  stageCreateRoute,
  stageDeletedRoute,
  stageDetailRoute,
  stageEditRoute
} from './stages'
import {
  studentEvaluationCreateRoute,
  studentEvaluationDeletedRoute,
  studentEvaluationEditRoute,
  studentEvaluationDetailRoute,
  studentEvaluationRoute
} from './student'
import { courseEvaluationRoute } from './full-course'

const evaluationVisibleChildren: RouteRecordRaw[] = [
  criteriaRoute,
  ...formRoutes,
  stageRoute,
  studentEvaluationRoute,
  ...courseEvaluationRoute
]

const evaluationHiddenChildren: RouteRecordRaw[] = [
  criteriaCreateRoute,
  criteriaDeletedRoute,
  criteriaDetailRoute,
  criteriaEditRoute,
  stageDetailRoute,
  stageCreateRoute,
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