import type { RouteRecordRaw } from 'vue-router'
// Sửa lại import: chỉ lấy những gì file nguồn có
import { criteriaRoutes } from './criteria'
import { formRoutes } from './forms'
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
  ...criteriaRoutes, // Dùng toán tử spread vì đây là mảng
  ...formRoutes,     // Dùng toán tử spread vì đây là mảng
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