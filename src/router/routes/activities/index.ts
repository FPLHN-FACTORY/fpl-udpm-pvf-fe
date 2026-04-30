import type { RouteRecordRaw } from 'vue-router'
import { activityRoute } from './list'

export const activitiesRoutes: RouteRecordRaw[] = [
  {
    path: '/activities',
    meta: { title: 'Quản lý hoạt động ngoại khóa', icon: 'BxlZoom', isHeader: true },
    children: [
      activityRoute
    ]
  }
]
