import type { RouteRecordRaw } from 'vue-router'
import { criteriaRoute } from './criteria'
import { formRoute } from './forms'
import { stageCreateRoute, stageDeletedRoute, stageDetailRoute, stageEditRoute, stageRoute } from './stages'
import { studentEvaluationRoute } from './student'
import { courseEvaluationRoute } from './full-course'

export const evaluationRoutes: RouteRecordRaw[] = [
  {
    path: '/evaluation',
    meta: { title: 'Quản lý đánh giá học viên', icon: 'BxSpreadsheet', isHeader: true },
    children: [
      criteriaRoute,
      formRoute,
      stageRoute,
      stageDetailRoute,
      stageCreateRoute,
      stageEditRoute,
      stageDeletedRoute,
      studentEvaluationRoute,
      courseEvaluationRoute
    ]
  }
]
