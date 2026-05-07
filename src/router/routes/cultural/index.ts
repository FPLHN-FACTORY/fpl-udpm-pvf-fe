import type { RouteRecordRaw } from 'vue-router'
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
      absenceRoute, // Thêm dấu phẩy ở đây để dễ mở rộng sau này
    ],
  },
]

export const culturalHiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/cultural',
    children: [gradeHiddenRoute, classHiddenRoute]
  }
]
