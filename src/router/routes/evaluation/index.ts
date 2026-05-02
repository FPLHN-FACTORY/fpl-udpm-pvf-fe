import type { RouteRecordRaw } from 'vue-router'
import { criteriaRoute } from './criteria'
import { formRoute } from './forms'
import { stageRoute } from './stages'
import {
  studentEvaluationCreateRoute,
  studentEvaluationDeletedRoute,
  studentEvaluationEditRoute,
  studentEvaluationDetailRoute,
  studentEvaluationRoute
} from './student'
import { courseEvaluationDetailRoute, courseEvaluationRoute } from './full-course'

const evaluationVisibleChildren: RouteRecordRaw[] = [
  criteriaRoute,
  formRoute,
  stageRoute,
  studentEvaluationRoute,
  courseEvaluationRoute
]

const evaluationHiddenChildren: RouteRecordRaw[] = [
  studentEvaluationCreateRoute,
  studentEvaluationDeletedRoute,
  studentEvaluationEditRoute,
  studentEvaluationDetailRoute,
  courseEvaluationDetailRoute
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
