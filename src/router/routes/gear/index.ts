import type { RouteRecordRaw } from 'vue-router'
import { requestRoute } from './request'

export const gearRoutes: RouteRecordRaw[] = [
  {
    path: '/gear',
    meta: { title: 'Quản lý công cụ - dụng cụ thi đấu', icon: 'BxsCategoryAlt', isHeader: true },
    children: [
      requestRoute
    ]
  }
]
