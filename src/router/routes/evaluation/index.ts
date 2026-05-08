import type { RouteRecordRaw } from 'vue-router'

import { criteriaRoute } from './criteria'
import { formRoutes } from './forms'
import { stageRoute } from './stages'
import {
  studentEvaluationCreateRoute,
  studentEvaluationDeletedRoute,
  studentEvaluationEditRoute,
  studentEvaluationDetailRoute,
  studentEvaluationRoute
} from './student'
import { courseEvaluationRoute } from './full-course'

const evaluationVisibleChildren: RouteRecordRaw[] = [
  ...criteriaRoutes,
  formRoute,
  criteriaRoute,
  ...formRoutes,
>>>>>>> c60b489d91ed18c810e28706d8058cedce49c778
  stageRoute,
  studentEvaluationRoute,
  ...courseEvaluationRoute
]

const evaluationHiddenChildren: RouteRecordRaw[] = [
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