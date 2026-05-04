import type { RouteRecordRaw } from 'vue-router'
import { schoolYearRoutes } from './year'
import { gradeHiddenRoute, gradeRoute } from './grade'
import { subjectRoute } from './subject'
import { classHiddenRoute, classRoute } from './class'
import { absenceRoute } from './absence'

export const culturalRoutes: RouteRecordRaw[] = [
  {
    path: '/cultural',
    meta: { title: 'Quản lý học tập văn hóa', icon: 'BxBookAlt', isHeader: true },
    children: [
      ...schoolYearRoutes,
      gradeRoute,
      subjectRoute,
      classRoute,
      absenceRoute, // Thêm dấu phẩy ở đây để dễ mở rộng sau này
    ],
  },
]

export const culturalHiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/cultural',
    children: [
      gradeHiddenRoute, 
      classHiddenRoute,
    ],
  },
]