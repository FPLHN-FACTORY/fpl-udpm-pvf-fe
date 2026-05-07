import type { RouteRecordRaw } from 'vue-router'
<<<<<<< HEAD
import { criteriaRoutes } from './criteria'
import { formRoute } from './forms'
=======
import { criteriaRoute } from './criteria'
import { formRoutes } from './forms'
>>>>>>> 274c58d1810e0336e8c32d095feebeb50a40f675
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
  ...criteriaRoutes,
  formRoute,
  criteriaRoute,
  ...formRoutes,
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
<<<<<<< Updated upstream
    children: evaluationVisibleChildren
  }
]

export const evaluationHiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/evaluation',
    children: evaluationHiddenChildren
=======
    children: [
      criteriaRoute,
      formRoute,
      stageRoute,
      studentEvaluationRoute,
      ...courseEvaluationRoute
    ]
>>>>>>> Stashed changes
  }
]
