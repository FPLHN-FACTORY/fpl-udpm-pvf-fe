import type { RouteRecordRaw } from 'vue-router'
<<<<<<< HEAD
// Sửa lại import: chỉ lấy những gì file nguồn có
import { criteriaRoutes } from './criteria'
=======
import { criteriaRoute } from './criteria'
>>>>>>> c60b489d91ed18c810e28706d8058cedce49c778
import { formRoutes } from './forms'
import { stageCreateRoute, stageDeletedRoute, stageDetailRoute, stageEditRoute, stageRoute } from './stages'
import {
  studentEvaluationCreateRoute,
  studentEvaluationDeletedRoute,
  studentEvaluationEditRoute,
  studentEvaluationDetailRoute,
  studentEvaluationRoute
} from './student'
import { courseEvaluationRoute } from './full-course'

const evaluationVisibleChildren: RouteRecordRaw[] = [
<<<<<<< HEAD
  ...criteriaRoutes, // Dùng toán tử spread vì đây là mảng
  ...formRoutes,     // Dùng toán tử spread vì đây là mảng
=======
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