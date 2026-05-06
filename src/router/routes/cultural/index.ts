import type { RouteRecordRaw } from 'vue-router'
import { absenceRoute } from './absence'
import { classHiddenRoute, classRoute } from './class'
import { gradeHiddenRoute, gradeRoute } from './grade'
import { subjectRoute } from './subject'
import { schoolYearRoutes } from './year'

export const culturalRoutes: RouteRecordRaw[] = [
  {
    path: '/cultural',
    meta: { title: 'Qu\u1ea3n l\u00fd h\u1ecdc t\u1eadp v\u0103n h\u00f3a', icon: 'BxBookAlt', isHeader: true },
    children: [
      ...schoolYearRoutes,
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
    children: [gradeHiddenRoute, classHiddenRoute]
  }
]
