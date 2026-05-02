import type { RouteRecordRaw } from 'vue-router'
import { schoolYearRoute } from './year'
import { gradeHiddenRoute, gradeRoute } from './grade'
import { schoolYearRoutes } from './year'
import { gradeRoute } from './grade'
import { subjectRoute } from './subject'
import { classHiddenRoute, classRoute } from './class'
import { absenceRoute } from './absence'

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
    children: [gradeHiddenRoute]
    children: [classHiddenRoute]
  }
]
