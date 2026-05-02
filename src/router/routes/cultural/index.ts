import type { RouteRecordRaw } from 'vue-router'
import { schoolYearRoute } from './year'
import { gradeHiddenRoute, gradeRoute } from './grade'
import { subjectRoute } from './subject'
import { classRoute } from './class'
import { absenceRoute } from './absence'

export const culturalRoutes: RouteRecordRaw[] = [
  {
    path: '/cultural',
    meta: { title: 'Quản lý học tập văn hóa', icon: 'BxBookAlt', isHeader: true },
    children: [
      schoolYearRoute,
      gradeRoute,
      subjectRoute,
      classRoute,
      absenceRoute
    ]
  }
]

export const culturalHiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/cultural',
    children: [gradeHiddenRoute]
  }
]
