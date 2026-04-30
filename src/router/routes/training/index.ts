import type { RouteRecordRaw } from 'vue-router'
import { scheduleRoute } from './schedule'
import { scoresRoute } from './scores'
import { programRoute } from './program'

export const trainingRoutes: RouteRecordRaw[] = [
  {
    path: '/training',
    meta: { title: 'Quản lý đào tạo', icon: 'BxsSchool', isHeader: true },
    children: [
      scheduleRoute,
      scoresRoute,
      programRoute
    ]
  }
]
