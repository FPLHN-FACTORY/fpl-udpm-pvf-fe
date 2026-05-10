import type { RouteRecordRaw } from 'vue-router'
import { absenceHiddenRoute, absenceRoute } from './absence'
import { classHiddenRoute, classRoute } from './class'
import { gradeHiddenRoute, gradeRoute } from './grade'
import { subjectRoute } from './subject'
import { schoolYearRoutes } from './year'

export const culturalRoutes: RouteRecordRaw[] = [
  {
    path: '/cultural',
    meta: { title: 'Quản lý học tập văn hóa', icon: 'BxBookAlt', isHeader: true },
    children: [
      schoolYearRoutes[0],
      gradeRoute,
      subjectRoute[0],
      classRoute,
      absenceRoute
    ]
  }
]

export const culturalHiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/cultural',
    children: [
      ...schoolYearRoutes.slice(1), // Add hidden school-year routes (add, edit, detail)
      gradeHiddenRoute,
      classHiddenRoute,
      absenceHiddenRoute,
      ...subjectRoute.slice(1) // Add the hidden subject routes (detail, create, edit, deleted)
    ]
  }
]
