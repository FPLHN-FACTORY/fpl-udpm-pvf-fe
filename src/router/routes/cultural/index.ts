import type { RouteRecordRaw } from 'vue-router'
import { schoolYearRoute } from './year'
import { gradeHiddenRoute, gradeRoute } from './grade'
import { schoolYearRoutes } from './year'
import { gradeRoute } from './grade'
import { subjectRoute } from './subject'
import { classHiddenRoute, classRoute } from './class'
import { absenceRoute } from './absence'
import { classHiddenRoute, classRoute } from './class'
import { gradeHiddenRoute, gradeRoute } from './grade'
import { subjectRoute } from './subject'
import { schoolYearRoutes } from './year'

export const culturalRoutes: RouteRecordRaw[] = [
  {
    path: '/cultural',
    meta: { title: 'Quản lý học tập văn hóa', icon: 'BxBookAlt', isHeader: true },
    children: [
      ...schoolYearRoutes,
      gradeRoute,
      ...subjectRoute,
      classRoute,
      absenceRoute
    ]
  }
]

export const culturalHiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/cultural',
    children: [gradeHiddenRoute]
    children: [classHiddenRoute]
    children: [gradeHiddenRoute, classHiddenRoute]
  }
]
